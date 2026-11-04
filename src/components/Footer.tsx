import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Phone,
  MapPin,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCategoryFilter, setActivePolicyTab, settings, showToast } =
    useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.');
      return;
    }
    showToast('Welcome to the Zaib Than Collection circle. You will receive private previews.');
    setNewsletterEmail('');
  };

  const navigateTo = (page: string, category: string | null = null) => {
    setSelectedCategoryFilter(category);
    setCurrentPage(page);
  };

  const navigatePolicy = (tab: string) => {
    setActivePolicyTab(tab);
    setCurrentPage('policies');
  };

  return (
    <footer className="bg-[#241B16] text-[#D8CBBE] border-t border-[#3B2C24]">
      {/* Brand Pillars Trust Strip */}
      <div className="border-b border-[#352820] py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-[#C5B4A2]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#352820] flex items-center justify-center shrink-0 text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">100% Handcrafted</p>
              <p className="text-[11px] text-[#A69483]">Original painted florals & hand-placed sitara</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#352820] flex items-center justify-center shrink-0 text-[#D4AF37]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Express Delivery</p>
              <p className="text-[11px] text-[#A69483]">Courier across Pakistan & DHL Worldwide</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#352820] flex items-center justify-center shrink-0 text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Bespoke Dyeing & Matching</p>
              <p className="text-[11px] text-[#A69483]">Custom shades to match your bridal peshwas</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#352820] flex items-center justify-center shrink-0 text-[#D4AF37]">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Artisan WhatsApp Support</p>
              <p className="text-[11px] text-[#A69483]">Direct consultation on color & motifs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Brand & Tagline */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-white tracking-wide">
            {settings.brandName}
          </h2>
          <p className="text-sm italic text-[#D4AF37] font-serif-luxury">{settings.tagline}</p>
          <p className="text-xs text-[#B5A493] leading-relaxed max-w-sm">
            Exquisite Pakistani handmade fashion specializing in custom hand-painted sheer tissue dupattas
            embellished with micro sitara, pearl moti, cutdana, and delicate gold kiran lace borders.
          </p>

          {/* WhatsApp Direct Chat Button */}
          <div className="pt-2">
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                'Hello Zaib Than Collection! I would like to inquire about a custom hand-painted tissue dupatta.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#73E598] border border-[#25D366]/30 rounded-lg text-xs font-semibold tracking-wide transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Artisan WhatsApp Inquiry</span>
            </a>
          </div>
        </div>

        {/* Col 2: Collections */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
            Collections
          </h3>
          <ul className="space-y-2 text-xs text-[#B5A493]">
            <li>
              <button
                onClick={() => navigateTo('shop', 'hand-painted')}
                className="hover:text-white transition-colors"
              >
                Hand-Painted Tissue
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('shop', 'sitara-collection')}
                className="hover:text-white transition-colors"
              >
                Golden Sitara Jaal
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('shop', 'pearl-moti')}
                className="hover:text-white transition-colors"
              >
                Pearl & Moti Elegance
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('shop', 'wedding-nikkah')}
                className="hover:text-white transition-colors"
              >
                Wedding & Nikkah Dupattas
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('shop', 'festive-eid')}
                className="hover:text-white transition-colors"
              >
                Festive & Eid Drop
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('custom-designer')}
                className="text-[#D4AF37] hover:underline"
              >
                Design Your Own Dupatta →
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Brand & Atelier */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
            The Atelier
          </h3>
          <ul className="space-y-2 text-xs text-[#B5A493]">
            <li>
              <button onClick={() => navigateTo('story')} className="hover:text-white transition-colors">
                Our Story
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('craftsmanship')} className="hover:text-white transition-colors">
                The Craftsmanship
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('account')} className="hover:text-white transition-colors">
                Track Order
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('wishlist')} className="hover:text-white transition-colors">
                My Wishlist
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                Contact Studio
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter & Customer Care */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
            Private Atelier Circle
          </h3>
          <p className="text-xs text-[#B5A493] leading-relaxed">
            Receive exclusive early access to limited edition festive drops and bespoke color launches.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex rounded-lg overflow-hidden border border-[#4A3B31] bg-[#1A130F]">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs text-white bg-transparent placeholder-[#7D6B5D] focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 bg-[#A87B2E] hover:bg-[#BF8F3A] text-white transition-colors cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          <div className="pt-2 space-y-1.5 text-xs text-[#8C7A6B]">
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Lahore & Islamabad, Pakistan</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <a href="tel:03404124380" className="hover:text-white transition-colors font-mono">03404124380</a>
            </p>
            <p className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
              <a href="mailto:Kasma2486@gmail.com" className="hover:text-white transition-colors">Kasma2486@gmail.com</a>
            </p>
          </div>
        </div>
      </div>

      {/* Legal & Policy Row */}
      <div className="border-t border-[#352820] py-6 px-4 sm:px-8 text-xs text-[#8C7A6B]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {settings.brandName}. All rights reserved. Handcrafted in Pakistan.</p>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <button onClick={() => navigatePolicy('shipping')} className="hover:text-white transition-colors">
              Shipping & Delivery
            </button>
            <span>·</span>
            <button onClick={() => navigatePolicy('returns')} className="hover:text-white transition-colors">
              Returns & Custom Orders
            </button>
            <span>·</span>
            <button onClick={() => navigatePolicy('privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => navigatePolicy('terms')} className="hover:text-white transition-colors">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
