import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DupattaProduct,
  CartItem,
  Order,
  CustomDupattaRequest,
  CurrencyCode,
  StoreSettings,
} from '../types';
import { PRODUCTS, CURRENCIES } from '../data/products';

interface StoreContextType {
  // Navigation & Routing
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedCategoryFilter: string | null;
  setSelectedCategoryFilter: (cat: string | null) => void;
  activePolicyTab: string;
  setActivePolicyTab: (tab: string) => void;

  // Products
  products: DupattaProduct[];
  getProductById: (id: string) => DupattaProduct | undefined;
  addProduct: (product: DupattaProduct) => void;
  updateProduct: (product: DupattaProduct) => void;
  deleteProduct: (id: string) => void;

  // Currency & Formatting
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (pricePKR: number) => string;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalPKR: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Promo Code
  appliedDiscount: { code: string; percent: number } | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Orders
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  lastCompletedOrder: Order | null;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;

  // Custom Dupatta Designer Requests
  customRequests: CustomDupattaRequest[];
  submitCustomRequest: (req: Omit<CustomDupattaRequest, 'id' | 'status' | 'createdAt'>) => CustomDupattaRequest;
  updateCustomRequestStatus: (id: string, status: CustomDupattaRequest['status']) => void;

  // Store Settings (Admin editable)
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // Quick View & Search Modals
  quickViewProduct: DupattaProduct | null;
  setQuickViewProduct: (product: DupattaProduct | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'ren_cart_v4',
  WISHLIST: 'ren_wishlist_v4',
  ORDERS: 'ren_orders_v4',
  CUSTOM_REQUESTS: 'ren_custom_requests_v4',
  SETTINGS: 'ren_settings_v5',
  PRODUCTS: 'ren_products_v4',
  CURRENCY: 'ren_currency_v4',
};

const DEFAULT_SETTINGS: StoreSettings = {
  brandName: 'Zaib Than Collection',
  tagline: 'Every Dupatta Tells a Story.',
  whatsappNumber: '923404124380',
  contactPhone: '03404124380',
  contactEmail: 'Kasma2486@gmail.com',
  announcementText: 'Handcrafted with Love | Custom Orders Available | Worldwide Express Shipping',
  freeShippingThresholdPKR: 15000,
};

const SEED_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'RN-89412',
    createdAt: '2026-10-24T14:30:00Z',
    items: [
      {
        productId: 'prod-gulab-e-noor',
        name: 'Gulab-e-Noor',
        pricePKR: 8200,
        quantity: 1,
        selectedColor: 'Warm Ivory',
        selectedFabric: 'Pure Tissue',
        image: '/assets/aistudio/54bde74e-4ee7-417c-824e-d724af23349e_1992fceb.jpeg',
      },
    ],
    subtotalPKR: 8200,
    discountPKR: 820,
    shippingPKR: 350,
    totalPKR: 7730,
    currency: 'PKR',
    currencyRate: 1,
    paymentMethod: 'cod',
    paymentStatus: 'Cash on Delivery',
    orderStatus: 'Handcrafting',
    customer: {
      fullName: 'Ayesha Siddiqui',
      email: 'ayesha.s@example.com',
      phone: '+92 300 9876543',
      address: 'House 42, Street 7, Phase 5, DHA',
      city: 'Lahore',
      country: 'Pakistan',
      postalCode: '54792',
      deliveryNotes: 'Please ring bell twice upon arrival',
    },
    trackingCode: 'TCS-92841094',
  },
];

const SEED_CUSTOM_REQUESTS: CustomDupattaRequest[] = [
  {
    id: 'req-201',
    customerName: 'Zainab Tariq',
    customerEmail: 'zainab.t@example.com',
    customerPhone: '+92 321 4455667',
    customerCity: 'Karachi',
    country: 'Pakistan',
    baseFabric: 'Pure Tissue',
    baseColor: 'Blush Pink',
    artworkStyle: 'Roses and floral vines',
    handworkTypes: ['Gold sitara', 'White moti', 'Embellished borders'],
    embellishmentDensity: 'Heavy Bridal',
    dimensions: '3.0 meters x 1.15 meters (Bridal Length)',
    borderStyle: 'Double Gold Kiran Fringe',
    occasion: 'Nikkah Ceremony',
    budgetRange: 'Rs. 8,000 - 9,000',
    requiredDate: '2026-11-20',
    specialInstructions: 'Need custom blush matching my Elan bridal peshwas. Extra pearl moti on both pallus please.',
    estimatedPricePKR: 8500,
    status: 'Artisan Assessing',
    createdAt: '2026-10-25T11:00:00Z',
  },
];

const parseRouteFromLocation = (): {
  page: string;
  productId: string | null;
  categoryFilter: string | null;
} => {
  if (typeof window === 'undefined') {
    return { page: 'home', productId: null, categoryFilter: null };
  }

  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path === '/' || path === '') {
    return { page: 'home', productId: null, categoryFilter: null };
  }
  if (path === '/shop') {
    return { page: 'shop', productId: null, categoryFilter: null };
  }
  if (path.startsWith('/products/')) {
    const slugOrId = path.replace('/products/', '');
    const found = PRODUCTS.find((p) => p.slug === slugOrId || p.id === slugOrId);
    if (found) {
      return { page: 'product-detail', productId: found.id, categoryFilter: null };
    }
    return { page: 'shop', productId: null, categoryFilter: null };
  }
  if (path === '/collections') {
    return { page: 'collections', productId: null, categoryFilter: null };
  }
  if (path.startsWith('/collections/')) {
    const catId = path.replace('/collections/', '');
    return { page: 'shop', productId: null, categoryFilter: catId };
  }
  if (path === '/custom-designer') {
    return { page: 'custom-designer', productId: null, categoryFilter: null };
  }
  if (path === '/story') {
    return { page: 'story', productId: null, categoryFilter: null };
  }
  if (path === '/craftsmanship') {
    return { page: 'craftsmanship', productId: null, categoryFilter: null };
  }
  if (path === '/contact') {
    return { page: 'contact', productId: null, categoryFilter: null };
  }
  if (path === '/policies') {
    return { page: 'policies', productId: null, categoryFilter: null };
  }
  if (path === '/admin') {
    return { page: 'admin', productId: null, categoryFilter: null };
  }
  if (path === '/cart') {
    return { page: 'cart', productId: null, categoryFilter: null };
  }
  if (path === '/checkout') {
    return { page: 'checkout', productId: null, categoryFilter: null };
  }
  if (path === '/account' || path === '/orders' || path === '/wishlist') {
    return { page: 'account', productId: null, categoryFilter: null };
  }

  return { page: 'home', productId: null, categoryFilter: null };
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialRoute = parseRouteFromLocation();
  const [currentPage, setCurrentPage] = useState<string>(initialRoute.page);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(initialRoute.productId);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(initialRoute.categoryFilter);
  const [activePolicyTab, setActivePolicyTab] = useState<string>('shipping');

  const [products, setProducts] = useState<DupattaProduct[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENCY) as CurrencyCode;
      return saved || 'PKR';
    } catch {
      return 'PKR';
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['prod-gulab-e-noor'];
    } catch {
      return ['prod-gulab-e-noor'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : SEED_ORDERS;
    } catch {
      return SEED_ORDERS;
    }
  });

  const [customRequests, setCustomRequests] = useState<CustomDupattaRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_REQUESTS);
      return saved ? JSON.parse(saved) : SEED_CUSTOM_REQUESTS;
    } catch {
      return SEED_CUSTOM_REQUESTS;
    }
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<DupattaProduct | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_REQUESTS, JSON.stringify(customRequests));
  }, [customRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENCY, currency);
  }, [currency]);

  // Scroll to top upon page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProductId]);

  // Synchronize state with browser URL
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let targetPath = '/';
    if (currentPage === 'home') {
      targetPath = '/';
    } else if (currentPage === 'shop') {
      targetPath = selectedCategoryFilter ? `/collections/${selectedCategoryFilter}` : '/shop';
    } else if (currentPage === 'product-detail') {
      const prod = selectedProductId ? products.find((p) => p.id === selectedProductId) : null;
      targetPath = prod ? `/products/${prod.slug}` : '/shop';
    } else if (currentPage === 'collections') {
      targetPath = '/collections';
    } else if (currentPage === 'custom-designer') {
      targetPath = '/custom-designer';
    } else if (currentPage === 'story') {
      targetPath = '/story';
    } else if (currentPage === 'craftsmanship') {
      targetPath = '/craftsmanship';
    } else if (currentPage === 'contact') {
      targetPath = '/contact';
    } else if (currentPage === 'policies') {
      targetPath = '/policies';
    } else if (currentPage === 'admin') {
      targetPath = '/admin';
    } else if (currentPage === 'cart') {
      targetPath = '/cart';
    } else if (currentPage === 'checkout') {
      targetPath = '/checkout';
    } else if (currentPage === 'order-confirmation') {
      targetPath = '/order-confirmation';
    } else if (currentPage === 'account' || currentPage === 'orders' || currentPage === 'wishlist') {
      targetPath = '/account';
    }

    if (window.location.pathname !== targetPath) {
      window.history.pushState(
        { page: currentPage, selectedProductId, selectedCategoryFilter },
        '',
        targetPath
      );
    }
  }, [currentPage, selectedProductId, selectedCategoryFilter, products]);

  // Handle browser back and forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseRouteFromLocation();
      setCurrentPage(parsed.page);
      setSelectedProductId(parsed.productId);
      setSelectedCategoryFilter(parsed.categoryFilter);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  const addProduct = (product: DupattaProduct) => {
    setProducts((prev) => [product, ...prev]);
    showToast(`"${product.name}" added to boutique catalog.`);
  };

  const updateProduct = (updated: DupattaProduct) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Updated "${updated.name}" details.`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog.');
  };

  const formatPrice = (pricePKR: number) => {
    const cur = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
    const converted = pricePKR * cur.rateAgainstPKR;

    if (currency === 'PKR') {
      return `${cur.symbol}${Math.round(converted).toLocaleString('en-PK')}`;
    }
    return `${cur.symbol}${converted.toFixed(cur.code === 'AED' ? 0 : 2)}`;
  };

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.productId === item.productId &&
          i.selectedColor === item.selectedColor &&
          i.selectedFabric === item.selectedFabric
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += item.quantity;
        return next;
      }
      const newItem: CartItem = {
        ...item,
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      };
      return [...prev, newItem];
    });
    showToast(`Added "${item.name}" to your shopping bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
    showToast('Item removed from shopping bag.');
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity } : i)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotalPKR = cart.reduce((acc, item) => acc + item.pricePKR * item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from your wishlist.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist.');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'EID2026') {
      setAppliedDiscount({ code: 'EID2026', percent: 15 });
      showToast('Promo code applied: 15% off festive orders!');
      return { success: true, message: '15% Festive Discount applied.' };
    }
    if (cleaned === 'NOOR10') {
      setAppliedDiscount({ code: 'NOOR10', percent: 10 });
      showToast('Promo code applied: 10% off your order!');
      return { success: true, message: '10% Welcome Discount applied.' };
    }
    return { success: false, message: 'Invalid or expired promo code.' };
  };

  const removePromoCode = () => {
    setAppliedDiscount(null);
    showToast('Promo code removed.');
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => {
    const orderNumber = `RN-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      orderStatus: 'Confirmed',
    };
    setOrders((prev) => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);
    clearCart();
    setAppliedDiscount(null);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o)));
    showToast(`Order status updated to: ${status}`);
  };

  const submitCustomRequest = (req: Omit<CustomDupattaRequest, 'id' | 'status' | 'createdAt'>) => {
    const newReq: CustomDupattaRequest = {
      ...req,
      id: `req-${Date.now()}`,
      status: 'Pending Review',
      createdAt: new Date().toISOString(),
    };
    setCustomRequests((prev) => [newReq, ...prev]);
    showToast('Your custom dupatta commission request has been received!');
    return newReq;
  };

  const updateCustomRequestStatus = (id: string, status: CustomDupattaRequest['status']) => {
    setCustomRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    showToast(`Commission request status updated: ${status}`);
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Boutique store settings updated.');
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProductId,
        setSelectedProductId,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        activePolicyTab,
        setActivePolicyTab,
        products,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        currency,
        setCurrency,
        formatPrice,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotalPKR,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        appliedDiscount,
        applyPromoCode,
        removePromoCode,
        orders,
        placeOrder,
        lastCompletedOrder,
        updateOrderStatus,
        customRequests,
        submitCustomRequest,
        updateCustomRequestStatus,
        settings,
        updateSettings,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
