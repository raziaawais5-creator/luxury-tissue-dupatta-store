/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CustomDesignerPage } from './pages/CustomDesignerPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { StoryPage } from './pages/StoryPage';
import { CraftsmanshipPage } from './pages/CraftsmanshipPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AccountPage } from './pages/AccountPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { PoliciesPage } from './pages/PoliciesPage';

const AppContent: React.FC = () => {
  const { currentPage, toastMessage } = useStore();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'custom-designer':
        return <CustomDesignerPage />;
      case 'collections':
        return <CollectionsPage />;
      case 'story':
        return <StoryPage />;
      case 'craftsmanship':
        return <CraftsmanshipPage />;
      case 'contact':
        return <ContactPage />;
      case 'cart':
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'account':
      case 'orders':
      case 'wishlist':
        return <AccountPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'policies':
        return <PoliciesPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C2420]">
      {/* Primary Top Bar */}
      <Header />

      {/* Main Page Viewport */}
      <main className="flex-1">{renderCurrentPage()}</main>

      {/* Boutique Footer */}
      <Footer />

      {/* Floating Drawers & Modals */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none animate-bounce">
          <div className="bg-[#241B16] text-[#EDE4D5] text-xs font-medium px-5 py-2.5 rounded-full shadow-2xl border border-[#48382E] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
