import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Globe,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CURRENCIES } from '../data/products';
import { CurrencyCode } from '../types';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    setSelectedCategoryFilter,
    cartCount,
    wishlist,
    currency,
    setCurrency,
    setIsCartOpen,
    setIsSearchOpen,
    settings,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Shop Dupattas', page: 'shop', category: null },
    { label: 'Collections', page: 'collections' },
    { label: 'Custom Design', page: 'custom-designer' },
    { label: 'Our Story', page: 'story' },
    { label: 'Craftsmanship', page: 'craftsmanship' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: string, category: string | null = null) => {
    setSelectedCategoryFilter(category);
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE1D2] transition-colors">
      {/* Announcement Bar */}
      <div className="bg-[#2D231E] text-[#EDE4D5] text-[12px] py-1.5 px-4 sm:px-8 border-b border-[#3D312A]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-2 text-[#C9BAA7]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{settings.tagline}</span>
          </div>

          <div className="flex-1 text-center font-medium tracking-wide truncate">
            {settings.announcementText}
          </div>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="flex items-center gap-1.5 text-xs font-medium text-[#EDE4D5] hover:text-[#D4AF37] transition-colors py-0.5 px-2 rounded cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-mono">{currency}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {isCurrencyDropdownOpen && (
              <div
                className="absolute right-0 mt-1 w-40 bg-[#241C18] border border-[#44352D] rounded-lg shadow-xl py-1 z-50 animate-fadeIn"
                onMouseLeave={() => setIsCurrencyDropdownOpen(false)}
              >
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrency(c.code as CurrencyCode);
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#342923] transition-colors cursor-pointer ${
                      currency === c.code ? 'text-[#D4AF37] font-semibold' : 'text-[#D9CCBE]'
                    }`}
                  >
                    <span>{c.code}</span>
                    <span className="font-mono text-white/60">{c.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Top Bar: Top Bar Contract (Wordmark - Nav links - Primary action/icons) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex flex-col text-left whitespace-nowrap shrink-0 cursor-pointer focus:outline-none"
        >
          <span className="text-2xl sm:text-3xl font-serif-luxury font-medium tracking-tight text-[#2D231E] group-hover:text-[#A87B2E] transition-colors">
            {settings.brandName}
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#8A7768] font-sans -mt-1 font-medium">
            Handmade Tissue Boutique
          </span>
        </button>

        {/* Zone 2: Concise Single-Line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide text-[#5C4D42]">
          {navLinks.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page, item.category)}
                className={`whitespace-nowrap transition-colors relative py-1 cursor-pointer hover:text-[#A87B2E] ${
                  isActive ? 'text-[#2D231E] font-semibold' : ''
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#A87B2E] rounded-full"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Interactive Affordances & Shopping Bag */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search Catalog"
            className="p-2 text-[#5C4D42] hover:text-[#2D231E] hover:bg-[#F3EBE0] rounded-full transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => handleNavClick('wishlist')}
            aria-label="Wishlist"
            className="relative p-2 text-[#5C4D42] hover:text-[#2D231E] hover:bg-[#F3EBE0] rounded-full transition-colors cursor-pointer"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#A87B2E] text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Bag"
            className="flex items-center gap-2 px-3 py-2 bg-[#2D231E] hover:bg-[#42342D] text-white rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <ShoppingBag className="w-4 h-4 text-[#E5D7C5]" />
            <span className="text-xs font-semibold font-mono tracking-tight">{cartCount}</span>
          </button>

          {/* Admin Back-Office Toggle */}
          <button
            onClick={() => handleNavClick('admin')}
            title="Merchant Admin Back-Office"
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              currentPage === 'admin'
                ? 'bg-[#EAD8B7] border-[#C7AA76] text-[#3D2C1E]'
                : 'border-[#E2D5C3] text-[#786657] hover:bg-[#F4EFE6]'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 text-[#5C4D42] hover:bg-[#F3EBE0] rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE1D2] bg-[#FAF7F2] px-6 py-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page, item.category)}
                className="text-left py-2 text-base font-medium text-[#4A3B31] hover:text-[#A87B2E] border-b border-[#F0E6D8] transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('account')}
              className="text-left py-2 text-base font-medium text-[#4A3B31] hover:text-[#A87B2E] border-b border-[#F0E6D8]"
            >
              My Account & Orders
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-left py-2 text-base font-medium text-[#A87B2E] flex items-center justify-between"
            >
              <span>Merchant Admin Portal</span>
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
