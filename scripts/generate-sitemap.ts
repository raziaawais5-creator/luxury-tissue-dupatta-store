import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUCTS, FEATURED_COLLECTIONS_DATA } from '../src/data/products.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');

// Resolve production domain
const rawDomain =
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  'https://luxury-tissue-dupatta-store.vercel.app';

// Ensure proper protocol and strip trailing slash
const domain = (
  rawDomain.startsWith('http') ? rawDomain : `https://${rawDomain}`
).replace(/\/+$/, '');

const today = new Date().toISOString().split('T')[0];

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  images?: Array<{
    loc: string;
    title: string;
    caption?: string;
  }>;
}

const urls: SitemapUrl[] = [
  // 1. Core Public Landing & Storefront
  {
    loc: `${domain}/`,
    lastmod: today,
    changefreq: 'daily',
    priority: '1.0',
    images: [
      {
        loc: `${domain}/assets/aistudio/Elegant_Embroidered_Dupatta_Portrait_24f2dee4.png`,
        title: 'Zaib Than Collection - Luxury Hand-Painted Tissue Dupattas',
        caption: 'Signature ivory tissue dupatta with hand-painted roses, freshwater pearls, and golden sitara',
      },
    ],
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

  // 2. Curated Collection Category Routes
  ...FEATURED_COLLECTIONS_DATA.map((col): SitemapUrl => ({
    loc: `${domain}/collections/${col.id}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.8',
    images: [
      {
        loc: `${domain}${col.image}`,
        title: `${col.title} | Zaib Than Collection`,
        caption: col.subtitle,
      },
    ],
  })),

  // 3. Dynamic Product Routes (with Google Image Sitemap extensions)
  ...PRODUCTS.map((prod): SitemapUrl => {
    const images = [
      {
        loc: `${domain}${prod.images.primary}`,
        title: `${prod.name} - Hand-Painted Tissue Dupatta`,
        caption: prod.tagline,
      },
      {
        loc: `${domain}${prod.images.modelWearing}`,
        title: `${prod.name} - Model Drape View`,
        caption: `Pakistani luxury fashion shoot wearing ${prod.name}`,
      },
      {
        loc: `${domain}${prod.images.floralCloseUp}`,
        title: `${prod.name} - Hand-Painted Floral Artistry Close-Up`,
        caption: `Artisanal brush strokes and fine pigment work on metallic tissue`,
      },
      {
        loc: `${domain}${prod.images.borderDetail}`,
        title: `${prod.name} - Embellished Border & Kiran Detail`,
        caption: prod.borderStyle,
      },
    ];

    return {
      loc: `${domain}/products/${prod.slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9',
      images,
    };
  }),

  // 4. Atelier, Bespoke Studio, and Brand Pages
  {
    loc: `${domain}/custom-designer`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.8',
    images: [
      {
        loc: `${domain}/assets/aistudio/9b6b89f0-ad30-4a2a-b536-a50d80f1b78e_94496726.jpeg`,
        title: 'Bespoke Custom Dupatta Studio',
        caption: 'Customize fabric, dye hues, floral paintings, sitara, and pearl density',
      },
    ],
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
    images: [
      {
        loc: `${domain}/assets/aistudio/638cc19f-7425-4c05-9527-dff561da788a_1c233d70.jpeg`,
        title: 'Master Artisans at Work - Sitara & Needlework',
        caption: 'Traditional handcrafting techniques of Pakistani heirloom dupattas',
      },
    ],
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

// Generate valid XML string
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
    for (const img of u.images) {
      xmlLines.push('    <image:image>');
      xmlLines.push(`      <image:loc>${xmlEscape(img.loc)}</image:loc>`);
      xmlLines.push(`      <image:title>${xmlEscape(img.title)}</image:title>`);
      if (img.caption) {
        xmlLines.push(`      <image:caption>${xmlEscape(img.caption)}</image:caption>`);
      }
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
console.log(`[SEO] sitemap.xml successfully written to ${sitemapPath} (${urls.length} public URLs indexed for domain: ${domain})`);

// Also synchronize public/robots.txt with the canonical Sitemap directive
const robotsContent = `# Robots.txt for Zaib Than Collection
# Production Domain: ${domain}

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

# Disallow private user account, checkout, and admin routes
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
