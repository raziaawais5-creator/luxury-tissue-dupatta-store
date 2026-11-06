import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUCTS, FEATURED_COLLECTIONS_DATA } from '../src/data/products.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');

// Strict Canonical Production Base URL
const OFFICIAL_PRODUCTION_URL = 'https://luxury-tissue-dupatta-store.vercel.app';

// Resolve domain: Prioritize official production domain.
// Only use VITE_SITE_URL / SITE_URL if explicitly defined AND not a temporary preview deployment URL.
function resolveCanonicalDomain(): string {
  const envUrl = process.env.VITE_SITE_URL || process.env.SITE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    const trimmed = envUrl.trim();
    // Ignore internal ephemeral preview URLs with hash IDs
    if (!trimmed.includes('-mqpz') && !trimmed.includes('.run.app') && !trimmed.includes('-git-')) {
      return (trimmed.startsWith('http') ? trimmed : `https://${trimmed}`).replace(/\/+$/, '');
    }
  }
  return OFFICIAL_PRODUCTION_URL;
}

const domain = resolveCanonicalDomain();
const today = new Date().toISOString().split('T')[0];

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  images?: string[];
}

// Clean and deduplicate image URLs; filter out any undefined/null/empty values
function sanitizeImages(rawImageUrls: Array<string | undefined | null>): string[] {
  const cleaned: string[] = [];
  const seen = new Set<string>();

  for (const img of rawImageUrls) {
    if (!img || typeof img !== 'string') continue;
    const trimmed = img.trim();
    if (trimmed === '' || trimmed.includes('undefined') || trimmed.includes('null')) continue;

    const fullUrl = trimmed.startsWith('http') ? trimmed : `${domain}${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
    if (!seen.has(fullUrl)) {
      seen.add(fullUrl);
      cleaned.push(fullUrl);
    }
  }

  return cleaned;
}

const urls: SitemapUrl[] = [
  // 1. Core Public Landing & Storefront
  {
    loc: `${domain}/`,
    lastmod: today,
    changefreq: 'daily',
    priority: '1.0',
    images: sanitizeImages([
      '/assets/aistudio/Elegant_Embroidered_Dupatta_Portrait_24f2dee4.png',
    ]),
  },
  {
    loc: `${domain}/shop`,
    lastmod: today,
    changefreq: 'daily',
    priority: '0.9',
  },
  {
    loc: `${domain}/collections`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.8',
  },

  // 2. Curated Collection Category Routes (8 Collections)
  ...FEATURED_COLLECTIONS_DATA.map((col): SitemapUrl => ({
    loc: `${domain}/collections/${col.id}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.8',
    images: sanitizeImages([col.image]),
  })),

  // 3. Dynamic Product Routes (6 Products with deduplicated, valid images)
  ...PRODUCTS.map((prod): SitemapUrl => {
    const rawImages = [
      prod.images.primary,
      prod.images.modelWearing,
      prod.images.floralCloseUp,
      prod.images.borderDetail,
      prod.images.macroSitaraMoti,
      prod.images.transparencyDrape,
    ];

    return {
      loc: `${domain}/products/${prod.slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9',
      images: sanitizeImages(rawImages),
    };
  }),

  // 4. Atelier, Bespoke Studio, and Brand Pages
  {
    loc: `${domain}/custom-designer`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.8',
    images: sanitizeImages([
      '/assets/aistudio/9b6b89f0-ad30-4a2a-b536-a50d80f1b78e_94496726.jpeg',
    ]),
  },
  {
    loc: `${domain}/story`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    loc: `${domain}/craftsmanship`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.7',
    images: sanitizeImages([
      '/assets/aistudio/638cc19f-7425-4c05-9527-dff561da788a_1c233d70.jpeg',
    ]),
  },
  {
    loc: `${domain}/contact`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.6',
  },
  {
    loc: `${domain}/policies`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.5',
  },
];

// Helper to escape XML entities
function xmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate valid XML conforming to Google's official sitemap specification
const xmlLines: string[] = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
];

for (const u of urls) {
  xmlLines.push('  <url>');
  xmlLines.push(`    <loc>${xmlEscape(u.loc)}</loc>`);
  xmlLines.push(`    <lastmod>${u.lastmod}</lastmod>`);
  xmlLines.push(`    <changefreq>${u.changefreq}</changefreq>`);
  xmlLines.push(`    <priority>${u.priority}</priority>`);

  if (u.images && u.images.length > 0) {
    for (const imgUrl of u.images) {
      xmlLines.push('    <image:image>');
      xmlLines.push(`      <image:loc>${xmlEscape(imgUrl)}</image:loc>`);
      xmlLines.push('    </image:image>');
    }
  }

  xmlLines.push('  </url>');
}

xmlLines.push('</urlset>');
xmlLines.push('');

const sitemapContent = xmlLines.join('\n');
const sitemapPath = path.resolve(publicDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');
console.log(`[SEO] sitemap.xml successfully written to ${sitemapPath} (${urls.length} URLs for canonical domain: ${domain})`);

// Synchronize public/robots.txt with canonical sitemap URL
const robotsContent = `# Robots.txt for Zaib Than Collection
# Official Production Domain: ${domain}

User-agent: *
Allow: /
Allow: /shop
Allow: /collections
Allow: /collections/*
Allow: /products/*
Allow: /custom-designer
Allow: /story
Allow: /craftsmanship
Allow: /contact
Allow: /policies

# Disallow private user flows, checkout, and admin routes
Disallow: /admin
Disallow: /admin/*
Disallow: /cart
Disallow: /checkout
Disallow: /order-confirmation
Disallow: /account
Disallow: /orders
Disallow: /wishlist

# Crawl delay
Crawl-delay: 1

# XML Sitemap Location for Google Search Console & Bing Webmaster Tools
Sitemap: ${domain}/sitemap.xml
`;

const robotsPath = path.resolve(publicDir, 'robots.txt');
fs.writeFileSync(robotsPath, robotsContent, 'utf-8');
console.log(`[SEO] robots.txt successfully updated at ${robotsPath}`);
