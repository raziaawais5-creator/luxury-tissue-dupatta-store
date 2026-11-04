import React from 'react';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const StoryPage: React.FC = () => {
  const { setCurrentPage, settings } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 space-y-16 animate-fadeIn">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#A87B2E] font-semibold">
          The Heritage of Zaib Than Collection
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif-luxury font-medium text-[#251E1A] leading-tight">
          Crafted by Hand, Made for You.
        </h1>
        <p className="text-sm italic text-[#8B6420] font-serif-luxury">
          "{settings.tagline}"
        </p>
      </div>

      {/* Main Editorial Narrative */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6 space-y-4 text-xs sm:text-sm text-[#5C4D41] leading-relaxed">
          <p className="font-serif-luxury text-lg text-[#251E1A] leading-snug">
            Every dupatta begins with an idea and becomes something special through color, creativity, and intricate handwork.
          </p>
          <p>
            From delicate hand-painted flowers to shimmering sitara and carefully placed moti, each piece celebrates the beauty of South Asian craftsmanship. Our collections bring together traditional inspiration and individual expression, creating dupattas for moments worth remembering.
          </p>
          <p>
            Born in the historic artistic heart of Lahore, our atelier was founded to restore the intimate connection between the woman wearing the garment and the artisan holding the needle. In an era of hurried digital fast-fashion prints, we remain uncompromising in our dedication to slow, deliberate, meditative art.
          </p>
        </div>

        <div className="md:col-span-6">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-[#D9CDB7] shadow-xl bg-[#ECE3D2]">
            <img
              src="/assets/aistudio/515d46bd-8945-4625-b03f-aef7121db609_fcb4da40.jpeg"
              alt="Artisan holding hand-painted dupatta with sitara and moti"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#E8DEC8]">
        <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DEC8] space-y-2">
          <span className="text-xs font-mono font-semibold text-[#A87B2E]">01</span>
          <h3 className="font-serif-luxury text-lg font-medium text-[#251E1A]">
            Zero Mass-Printing
          </h3>
          <p className="text-xs text-[#786658] leading-relaxed">
            Every floral vine, rose bud, and leaf is hand-painted directly onto stretched sheer tissue with artist brushes, ensuring no two dupattas are identical.
          </p>
        </div>

        <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DEC8] space-y-2">
          <span className="text-xs font-mono font-semibold text-[#A87B2E]">02</span>
          <h3 className="font-serif-luxury text-lg font-medium text-[#251E1A]">
            Ethical Women-Led Atelier
          </h3>
          <p className="text-xs text-[#786658] leading-relaxed">
            Our intricate sitara and pearl moti needlework supports skilled women artisans across Punjab, providing fair living wages and preserving ancestral crafts.
          </p>
        </div>

        <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DEC8] space-y-2">
          <span className="text-xs font-mono font-semibold text-[#A87B2E]">03</span>
          <h3 className="font-serif-luxury text-lg font-medium text-[#251E1A]">
            Heirloom Durability
          </h3>
          <p className="text-xs text-[#786658] leading-relaxed">
            We use non-tarnishing micro sequins, glass pearls, and secure lock-stitching so your dupatta can be treasured across generations.
          </p>
        </div>
      </div>

      {/* Action Banner */}
      <div className="text-center p-8 bg-[#FAF4EA] rounded-2xl border border-[#E2D5BF] space-y-4">
        <h3 className="font-serif-luxury text-2xl font-medium text-[#251E1A]">
          Ready to Wear an Original Piece of Art?
        </h3>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setCurrentPage('shop')}
            className="px-6 py-3 bg-[#251E1A] hover:bg-[#3D3027] text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Explore The Dupattas
          </button>
          <button
            onClick={() => setCurrentPage('custom-designer')}
            className="px-6 py-3 bg-[#A87B2E] hover:bg-[#8F6724] text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Design Your Own
          </button>
        </div>
      </div>
    </div>
  );
};
