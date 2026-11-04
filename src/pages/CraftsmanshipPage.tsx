import React from 'react';
import { Sparkles, Layers, Scissors, CheckCircle, ArrowRight, Video } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CraftsmanshipPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-16 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#A87B2E] font-semibold">
          The Atelier Archive
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif-luxury font-medium text-[#251E1A]">
          The Art of Hand-Painted Tissue
        </h1>
        <p className="text-xs sm:text-sm text-[#736355] leading-relaxed">
          An intimate look at the ancient techniques, pure metallic silks, and meditative needlework that define every Zaib Than Collection creation.
        </p>
      </div>

      {/* Feature 1: The Fabric */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 space-y-4 text-xs sm:text-sm text-[#5C4D41]">
          <span className="text-xs font-mono font-semibold text-[#A87B2E]">01 · Foundation</span>
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#251E1A]">
            Pure Metallic Tissue & Organza
          </h2>
          <p className="leading-relaxed">
            Unlike synthetic polyesters that feel stiff and lack air, our tissue is woven with gossamer-thin metallic zari threads interlaced with sheer silk fibers. The result is a luminous fabric that weighs under 200 grams, drapes like liquid light, and allows the woman wearing it to move effortlessly.
          </p>
          <div className="space-y-1.5 text-xs text-[#4A3B31]">
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#A87B2E]" />
              <span>Tested tensile strength to hold thousands of hand-sewn beads</span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#A87B2E]" />
              <span>Non-scratchy, gentle against bare skin and delicate lace sleeves</span>
            </p>
          </div>
        </div>

        <div className="md:col-span-6">
          <img
            src="/assets/aistudio/9b6b89f0-ad30-4a2a-b536-a50d80f1b78e_94496726.jpeg"
            alt="Metallic tissue fabric with mirror work and sitara"
            className="w-full aspect-[4/3] object-cover rounded-2xl shadow-lg border border-[#DDD0BC]"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Feature 2: Hand-Painting */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 order-2 md:order-1">
          <img
            src="/assets/aistudio/54bde74e-4ee7-417c-824e-d724af23349e_1992fceb.jpeg"
            alt="Hand-painted floral botanicals on tissue"
            className="w-full aspect-[4/3] object-cover rounded-2xl shadow-lg border border-[#DDD0BC]"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="md:col-span-6 space-y-4 text-xs sm:text-sm text-[#5C4D41] order-1 md:order-2">
          <span className="text-xs font-mono font-semibold text-[#A87B2E]">02 · Artistry</span>
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#251E1A]">
            Freehand Watercolor Pigments
          </h2>
          <p className="leading-relaxed">
            The tissue is secured taut onto large wooden embroidery stands (Karchob). Master painters sketch botanical outlines with evanescent chalk lines before blending custom non-bleeding pigments. Shading layers are painted petal by petal, allowing natural watercolor bleeds that cannot be imitated by mechanical rollers.
          </p>
          <div className="space-y-1.5 text-xs text-[#4A3B31]">
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#A87B2E]" />
              <span>Heat-cured waterproof dyes that do not smudge with perspiration</span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#A87B2E]" />
              <span>Original color mixes custom blended for each seasonal drop</span>
            </p>
          </div>
        </div>
      </div>

      {/* Feature 3: Needlework & Kiran Lace */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 space-y-4 text-xs sm:text-sm text-[#5C4D41]">
          <span className="text-xs font-mono font-semibold text-[#A87B2E]">03 · Embellishment</span>
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#251E1A]">
            Micro Sitara, Seed Pearls & Kiran Fringe
          </h2>
          <p className="leading-relaxed">
            Every sparkling point of light is secured by hand. Our artisans sew micro gold sitaras along floral veins to catch overhead chandeliers, while cluster-stitched moti form the tactile stamens of each blossom. The piece is crowned with authentic cascading gold kiran fringe lace—the timeless hallmark of Pakistani bridal dupattas.
          </p>
          <div className="space-y-1.5 text-xs text-[#4A3B31]">
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#A87B2E]" />
              <span>Individual backstitching prevents unraveling if a single bead catches</span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#A87B2E]" />
              <span>Antique-finish gota and kiran with genuine metallic luster</span>
            </p>
          </div>
        </div>

        <div className="md:col-span-6">
          <img
            src="/assets/aistudio/69e152b9-04c3-42b2-a312-b30b86bd59b5_7836dd34.jpeg"
            alt="Gold kiran lace fringe border and sitara handwork"
            className="w-full aspect-[4/3] object-cover rounded-2xl shadow-lg border border-[#DDD0BC]"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Atelier Video Reel */}
      <div className="bg-[#241B16] text-white p-8 sm:p-12 rounded-3xl border border-[#3E2F26] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              Raw Atelier Footage
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-luxury font-medium">
              See the Dupatta in Real Motion
            </h3>
          </div>
          <button
            onClick={() => setCurrentPage('custom-designer')}
            className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#241B16] font-semibold text-xs rounded-xl self-start sm:self-auto cursor-pointer"
          >
            Commission a Dupatta
          </button>
        </div>

        <div className="aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
          <video
            src="/assets/aistudio/109bc8be-e306-4810-b745-5d2ab33c9e87_f843f5e8.mp4"
            className="w-full h-full object-cover"
            controls
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </div>
  );
};
