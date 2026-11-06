import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { FEATURED_COLLECTIONS_DATA } from '../data/products';

export const SEO: React.FC = () => {
  const { currentPage, selectedProductId, selectedCategoryFilter, products, settings } = useStore();

  useEffect(() => {
    // Resolve dynamic origin
    const CANONICAL_PRODUCTION_URL = 'https://luxury-tissue-dupatta-store.vercel.app';
    const isPreviewUrl =
      typeof window !== 'undefined' &&
      (window.location.origin.includes('localhost') ||
        window.location.origin.includes('.run.app') ||
        window.location.origin.includes('-git-') ||
        window.location.origin.includes('-mqpz') ||
        /luxury-tissue-dupatta-store-.*\.vercel\.app/.test(window.location.origin));

    const origin =
      typeof window !== 'undefined' && !isPreviewUrl && window.location.origin
        ? window.location.origin
        : CANONICAL_PRODUCTION_URL;

    // Active product if on product detail page
    const currentProduct = selectedProductId ? products.find((p) => p.id === selectedProductId) : null;

    // Active collection if filtered
    const currentCollection = selectedCategoryFilter
      ? FEATURED_COLLECTIONS_DATA.find((c) => c.id === selectedCategoryFilter)
      : null;

    // Determine SEO properties per page
    let pageTitle = 'Zaib Than Collection | Luxury Hand-Painted Tissue Dupatta Boutique';
    let metaDescription =
      'Zaib Than Collection - Exquisite Pakistani handcrafted tissue dupattas adorned with hand-painted florals, golden sitara, pearl moti, beads, and mirror work. Every dupatta tells a story.';
    let canonicalPath = '/';
    let ogType = 'website';
    let ogImage = `${origin}/assets/aistudio/Elegant_Embroidered_Dupatta_Portrait_24f2dee4.png`;
    let isPrivate = false;

    switch (currentPage) {
      case 'home':
        pageTitle = 'Zaib Than Collection | Luxury Hand-Painted Tissue Dupatta Boutique';
        metaDescription =
          'Discover Pakistani heirloom hand-painted tissue dupattas embellished with fine sitara, moti, and mirror work. Handcrafted on pure metallic tissue silk for festive and bridal occasions.';
        canonicalPath = '/';
        break;

      case 'shop':
        if (currentCollection) {
          pageTitle = `${currentCollection.title} | Zaib Than Collection`;
          metaDescription = `Shop ${currentCollection.title.toLowerCase()} handcrafted in Pakistan. ${currentCollection.subtitle}. Worldwide express delivery available.`;
          canonicalPath = `/collections/${currentCollection.id}`;
        } else {
          pageTitle = 'Shop Hand-Painted Tissue Dupattas | Online Boutique | Zaib Than Collection';
          metaDescription =
            'Explore our full collection of hand-painted and embroidered tissue dupattas. Custom colors, delicate pearl moti, gold sitara, and luxury kiran borders.';
          canonicalPath = '/shop';
        }
        break;

      case 'product-detail':
        if (currentProduct) {
          pageTitle = `${currentProduct.name} Hand-Painted Tissue Dupatta | Zaib Than Collection`;
          metaDescription = `${currentProduct.description.slice(0, 150)}... Handcrafted in Lahore with pure tissue silk and genuine sitara moti work.`;
          canonicalPath = `/products/${currentProduct.slug}`;
          ogType = 'product';
          ogImage = `${origin}${currentProduct.images.primary}`;
        }
        break;

      case 'collections':
        pageTitle = 'Curated Dupatta Collections | Bridal, Festive & Sitara | Zaib Than Collection';
        metaDescription =
          'Explore our eight curated artisanal collections of Pakistani tissue dupattas, including Wedding & Nikkah, Golden Sitara, Pearl Moti, and Limited Edition designs.';
        canonicalPath = '/collections';
        break;

      case 'custom-designer':
        pageTitle = 'Bespoke Custom Dupatta Studio | Zaib Than Collection';
        metaDescription =
          'Design your own hand-painted tissue dupatta. Choose custom fabric, personalized color palettes, floral motifs, sitara density, and bridal borders with our master artisans.';
        canonicalPath = '/custom-designer';
        ogImage = `${origin}/assets/aistudio/9b6b89f0-ad30-4a2a-b536-a50d80f1b78e_94496726.jpeg`;
        break;

      case 'story':
        pageTitle = 'Our Atelier Story & Heritage | Zaib Than Collection';
        metaDescription =
          'Learn the story behind Zaib Than Collection. Preserving authentic South Asian textile heritage through traditional hand-painted floral artistry and delicate needlework.';
        canonicalPath = '/story';
        break;

      case 'craftsmanship':
        pageTitle = 'Artisanal Craftsmanship & Embroidery Techniques | Zaib Than Collection';
        metaDescription =
          'Discover our handcrafted process: freehand fabric painting, needlework with freshwater pearls and micro-sequins, and heirloom kiran finishing on metallic tissue.';
        canonicalPath = '/craftsmanship';
        ogImage = `${origin}/assets/aistudio/638cc19f-7425-4c05-9527-dff561da788a_1c233d70.jpeg`;
        break;

      case 'contact':
        pageTitle = 'Concierge & Customer Care | Zaib Than Collection';
        metaDescription =
          'Contact the Zaib Than Collection atelier. Direct WhatsApp concierge, custom color consultation, and international shipping inquiries.';
        canonicalPath = '/contact';
        break;

      case 'policies':
        pageTitle = 'Shipping, Returns & Care Guide | Zaib Than Collection';
        metaDescription =
          'Read our domestic and international express shipping rates, heirloom exchange policy, privacy terms, and delicate tissue garment care instructions.';
        canonicalPath = '/policies';
        break;

      case 'admin':
        pageTitle = 'Atelier Management Portal | Zaib Than Collection';
        isPrivate = true;
        break;

      case 'cart':
      case 'checkout':
        pageTitle = 'Shopping Bag & Checkout | Zaib Than Collection';
        isPrivate = true;
        break;

      case 'order-confirmation':
        pageTitle = 'Order Confirmed | Zaib Than Collection';
        isPrivate = true;
        break;

      case 'account':
      case 'orders':
      case 'wishlist':
        pageTitle = 'My Account & Saved Wishlist | Zaib Than Collection';
        isPrivate = true;
        break;

      default:
        pageTitle = 'Zaib Than Collection | Luxury Hand-Painted Tissue Dupatta Boutique';
        break;
    }

    const canonicalUrl = `${origin}${canonicalPath}`;

    // 1. Update Document Title
    document.title = pageTitle;

    // 2. Helper to set or create meta tags
    const setMetaTag = (attr: 'name' | 'property', key: string, value: string) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    };

    // 3. Meta Description
    setMetaTag('name', 'description', metaDescription);

    // 4. Meta Robots (Exclude private flows from index)
    if (isPrivate) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag(
        'name',
        'robots',
        'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      );
    }

    // 5. Canonical Link Tag
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. Open Graph Tags
    setMetaTag('property', 'og:site_name', settings.brandName || 'Zaib Than Collection');
    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', metaDescription);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:locale', 'en_US');

    if (currentProduct && currentPage === 'product-detail') {
      setMetaTag('property', 'product:price:amount', String(currentProduct.pricePKR));
      setMetaTag('property', 'product:price:currency', 'PKR');
      setMetaTag('property', 'product:availability', currentProduct.isReadyToShip ? 'in stock' : 'preorder');
    }

    // 7. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', pageTitle);
    setMetaTag('name', 'twitter:description', metaDescription);
    setMetaTag('name', 'twitter:image', ogImage);

    // 8. Inject Schema.org JSON-LD Structured Data
    const schemas: object[] = [];

    // Organization / ClothingStore Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ClothingStore',
      name: settings.brandName || 'Zaib Than Collection',
      url: origin,
      logo: `${origin}/assets/aistudio/Elegant_Embroidered_Dupatta_Portrait_24f2dee4.png`,
      description:
        'Pakistani luxury fashion brand specializing in custom hand-painted tissue dupattas decorated with golden sitara, moti, and delicate hand embroidery.',
      telephone: settings.whatsappNumber ? `+${settings.whatsappNumber}` : '+923404124380',
      email: settings.contactEmail || 'Kasma2486@gmail.com',
      priceRange: 'Rs. 7,800 - Rs. 9,500',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lahore',
        addressCountry: 'PK',
      },
    });

    // WebSite with Potential Action
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: settings.brandName || 'Zaib Than Collection',
      url: origin,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${origin}/shop?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    });

    // BreadcrumbList Schema
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${origin}/`,
      },
    ];

    if (currentPage === 'shop' || currentPage === 'product-detail' || currentPage === 'collections') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Shop Dupattas',
        item: `${origin}/shop`,
      });
    }

    if (currentProduct && currentPage === 'product-detail') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: currentProduct.name,
        item: canonicalUrl,
      });
    } else if (currentCollection && currentPage === 'shop') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: currentCollection.title,
        item: canonicalUrl,
      });
    }

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    });

    // Product Schema (for Product Detail Page)
    if (currentProduct && currentPage === 'product-detail') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: currentProduct.name,
        image: [
          `${origin}${currentProduct.images.primary}`,
          `${origin}${currentProduct.images.modelWearing}`,
          `${origin}${currentProduct.images.floralCloseUp}`,
          `${origin}${currentProduct.images.borderDetail}`,
        ],
        description: currentProduct.description,
        sku: currentProduct.id,
        brand: {
          '@type': 'Brand',
          name: settings.brandName || 'Zaib Than Collection',
        },
        offers: {
          '@type': 'Offer',
          url: canonicalUrl,
          priceCurrency: 'PKR',
          price: currentProduct.pricePKR,
          priceValidUntil: '2027-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          availability: currentProduct.isReadyToShip
            ? 'https://schema.org/InStock'
            : 'https://schema.org/PreOrder',
          seller: {
            '@type': 'Organization',
            name: settings.brandName || 'Zaib Than Collection',
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: currentProduct.rating,
          reviewCount: currentProduct.reviewsCount,
          bestRating: '5',
          worstRating: '1',
        },
      });
    }

    // ItemList Schema (for Shop Catalog and Collections)
    if (currentPage === 'shop' || currentPage === 'collections') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: products.map((p, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: p.name,
          url: `${origin}/products/${p.slug}`,
        })),
      });
    }

    // Update Script Tag in Document Head
    let scriptTag = document.getElementById('zaib-seo-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'zaib-seo-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemas, null, 2);
  }, [currentPage, selectedProductId, selectedCategoryFilter, products, settings]);

  return null;
};
