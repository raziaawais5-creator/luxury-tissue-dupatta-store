export type CurrencyCode = 'PKR' | 'USD' | 'GBP' | 'AED' | 'CAD' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateAgainstPKR: number; // e.g. 1 USD = 280 PKR => 1/280 = 0.00357
  label: string;
}

export type FabricType = 'Pure Tissue' | 'Sheer Organza' | 'Silk Organza' | 'Chiffon Organza';

export type EmbellishmentType = 'Sitara (Sequins)' | 'Moti (Pearls)' | 'Cutdana & Beads' | 'Mirror Work (Aabla)' | 'Gota & Kiran Lace';

export type CollectionCategory = 
  | 'hand-painted'
  | 'sitara-collection'
  | 'pearl-moti'
  | 'floral-handwork'
  | 'wedding-nikkah'
  | 'festive-eid'
  | 'custom-creations'
  | 'limited-edition';

export interface DupattaProduct {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  pricePKR: number;
  originalPricePKR?: number;
  category: CollectionCategory[];
  baseColor: string;
  colorFamily: 'ivory' | 'champagne' | 'blush' | 'peach' | 'fuchsia' | 'emerald' | 'blue' | 'maroon';
  fabric: FabricType;
  dimensions: string; // e.g., "2.75 meters x 1.0 meter (3 yards)"
  embellishments: EmbellishmentType[];
  borderStyle: string;
  isReadyToShip: boolean;
  productionTimeDays: number;
  featured: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  craftsmanshipNotes: string;
  careInstructions: string[];
  images: {
    primary: string;
    modelWearing?: string;
    borderDetail: string;
    floralCloseUp: string;
    macroSitaraMoti: string;
    transparencyDrape?: string;
  };
  videoUrl?: string;
  accentHex: string;
}

export interface CartItem {
  id: string; // generated unique cart item id
  productId: string;
  name: string;
  slug: string;
  image: string;
  pricePKR: number;
  quantity: number;
  selectedColor: string;
  selectedFabric: FabricType;
  customNotes?: string;
}

export interface CustomDupattaRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCity: string;
  country: string;
  baseFabric: string;
  baseColor: string;
  customHex?: string;
  artworkStyle: string;
  handworkTypes: string[];
  embellishmentDensity: 'Light' | 'Medium' | 'Heavy Bridal';
  dimensions: string;
  borderStyle: string;
  occasion: string;
  budgetRange: string;
  requiredDate: string;
  specialInstructions?: string;
  referenceImageName?: string;
  estimatedPricePKR: number;
  status: 'Pending Review' | 'Artisan Assessing' | 'Approved' | 'In Production' | 'Dispatched';
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  pricePKR: number;
  quantity: number;
  selectedColor: string;
  selectedFabric: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: OrderItem[];
  subtotalPKR: number;
  discountPKR: number;
  shippingPKR: number;
  totalPKR: number;
  currency: CurrencyCode;
  currencyRate: number;
  paymentMethod: 'cod' | 'bank_transfer' | 'card';
  paymentStatus: 'Pending' | 'Paid' | 'Cash on Delivery';
  orderStatus: 'Confirmed' | 'Handcrafting' | 'Quality Check' | 'Dispatched' | 'Delivered';
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    deliveryNotes?: string;
  };
  trackingCode?: string;
}

export interface StoreSettings {
  brandName: string;
  tagline: string;
  whatsappNumber: string; // e.g. "923404124380"
  contactPhone: string; // "03404124380"
  contactEmail: string; // "Kasma2486@gmail.com"
  announcementText: string;
  freeShippingThresholdPKR: number;
}
