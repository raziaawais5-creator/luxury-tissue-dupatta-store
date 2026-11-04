import React, { useState } from 'react';
import {
  Sparkles,
  ZoomIn,
  Sun,
  Flame,
  Moon,
  ShoppingBag,
  Check,
  Eye,
  MessageCircle,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ZoomModal } from './ZoomModal';

interface EditorialCampaignLookbookProps {
  onOrderNow?: () => void;
}

export const EditorialCampaignLookbook: React.FC<EditorialCampaignLookbookProps> = () => {
  const { formatPrice, addToCart, setCurrentPage, setSelectedProductId, settings } = useStore();

  const [lightingMode, setLightingMode] = useState<'studio' | 'golden' | 'candlelight'>('studio');
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [activeInspectTab, setActiveInspectTab] = useState<'full' | 'roses' | 'border' | 'moti'>('full');

  // Authoritative uploaded fashion campaign model reference
  const modelShoot = {
    id: 'prod-gulab-e-noor',
    name: 'Gulab-e-Noor · Champagne Ivory Tissue',
    tagline: 'Hand-painted watercolor roses, micro gold sitara, pearl moti stamen, and handcrafted metallic border.',
    pricePKR: 8200,
    fabric: 'Pure Metallic Tissue Silk',
    modelPhoto: '/assets/aistudio/Elegant_Embroidered_Dupatta_Portrait_24f2dee4.png',
    rosesMacro: '/assets/aistudio/54bde74e-4ee7-417c-824e-d724af23349e_1992fceb.jpeg',
    motiMacro: '/assets/aistudio/638cc19f-7425-4c05-9527-dff561da788a_1c233d70.jpeg',
    borderMacro: '/assets/aistudio/69e152b9-04c3-42b2-a312-b30b86bd59b5_7836dd34.jpeg',
  };

  const lightingConfigs = {
    studio: {
      filter: 'brightness-100 contrast-100',
      label: 'Soft Natural Studio Light',
      desc: 'True-to-life studio illumination revealing natural tissue transparency and pigment tones.',
    },
    golden: {
      filter: 'sepia-[0.18] brightness-105 contrast-105 saturate-110',
      label: 'Golden Hour Sunlight',
      desc: 'Warm sunbeam reflecting golden sitara sequins and champagne metallic threads.',
    },
    candlelight: {
      filter: 'brightness-95 contrast-115 saturate-110',
      label: 'Evening Ambient Glow',
      desc: 'Atmospheric formal celebration warmth highlighting the glistening border.',
    },
  };

  const handleAddToCart = () => {
    addToCart({
      productId: modelShoot.id,
      name: modelShoot.name,
      slug: 'gulab-e-noor-ivory-tissue-dupatta',
      image: modelShoot.modelPhoto,
      pricePKR: modelShoot.pricePKR,
      quantity: 1,
      selectedColor: 'Warm Ivory & Champagne',
      selectedFabric: 'Pure Tissue',
    });
  };

  const currentLighting = lightingConfigs[lightingMode];

  const currentInspectImage =
    activeInspectTab === 'full'
      ? modelShoot.modelPhoto
      : activeInspectTab === 'roses'
      ? modelShoot.rosesMacro
      : activeInspectTab === 'border'
      ? modelShoot.borderMacro
      : modelShoot.motiMacro;

  return (
    <div className="w-full bg-[#FAF7F2] rounded-3xl border border-[#E8DEC8] shadow-xl overflow-hidden">
      {/* Editorial Header */}
      <div className="px-6 py-4 bg-[#F4EFE6] border-b border-[#E2D5BE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-[#A87B2E]" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#251E1A] block">
              Haute Couture Campaign · Model Lookbook
            </span>
            <span className="text-[11px] text-[#786658]">
              Featuring the South Asian fashion model wearing our exact hand-painted tissue dupatta
            </span>
          </div>
        </div>

        {/* Studio Lighting Controller */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#DDD0BC] self-start sm:self-auto">
          <button
            onClick={() => setLightingMode('studio')}
            className={`px-2.5 py-1 text-xs rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
              lightingMode === 'studio'
                ? 'bg-[#251E1A] text-white shadow-xs'
                : 'text-[#69584B] hover:text-[#251E1A]'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Natural Studio</span>
          </button>
          <button
            onClick={() => setLightingMode('golden')}
            className={`px-2.5 py-1 text-xs rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
              lightingMode === 'golden'
                ? 'bg-[#A87B2E] text-white shadow-xs'
                : 'text-[#69584B] hover:text-[#251E1A]'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Golden Hour</span>
          </button>
          <button
            onClick={() => setLightingMode('candlelight')}
            className={`px-2.5 py-1 text-xs rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
              lightingMode === 'candlelight'
                ? 'bg-[#3D2516] text-[#EAD8B7] shadow-xs'
                : 'text-[#69584B] hover:text-[#251E1A]'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Evening Glow</span>
          </button>
        </div>
      </div>

      {/* Main Editorial Canvas (4:5 Aspect Ratio vertical portrait) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
        {/* Left: 4:5 Vertical Campaign Model Portrait */}
        <div className="lg:col-span-7 p-4 sm:p-8 flex justify-center bg-[#201A16]">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10 select-none group bg-[#2A221C]">
            {/* The Photorealistic Luxury Model Photograph */}
            <img
              src={modelShoot.modelPhoto}
              alt="Pakistani fashion model wearing original hand-painted tissue dupatta with sitara and moti"
              className={`w-full h-full object-cover transition-all duration-700 ${currentLighting.filter} group-hover:scale-102`}
              referrerPolicy="no-referrer"
            />

            {/* Subtle Gradient Scrim at Bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none"></div>

            {/* Campaign Branding Badge */}
            <div className="absolute top-4 left-4 z-30 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="text-[11px] font-semibold tracking-wider uppercase font-serif-luxury">
                Campaign Shoot · 4:5 Vertical
              </span>
            </div>

            {/* Zoom Inspection Trigger */}
            <button
              onClick={() => setZoomImage(modelShoot.modelPhoto)}
              className="absolute top-4 right-4 z-30 bg-white/90 hover:bg-white text-[#251E1A] p-2 rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center gap-1 text-xs font-medium px-3"
            >
              <ZoomIn className="w-3.5 h-3.5 text-[#A87B2E]" />
              <span className="hidden sm:inline">Macro Zoom</span>
            </button>

            {/* Bottom Floating Card inside portrait */}
            <div className="absolute bottom-4 left-4 right-4 z-30 bg-black/75 backdrop-blur-md px-4 py-3 rounded-xl border border-white/15 text-white flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#D4AF37] font-medium font-serif-luxury">
                  Authoritative Product Reference
                </p>
                <p className="text-sm font-medium text-white/95">
                  Natural Oval Face · Pearl Chandelier Earrings · Champagne Peshwas
                </p>
              </div>
              <span className="text-[11px] text-white/70 font-mono hidden sm:inline">
                4:5 Editorial Portrait
              </span>
            </div>
          </div>
        </div>

        {/* Right: Product Narrative, Specs & Direct Order CTAs */}
        <div className="lg:col-span-5 p-6 sm:p-10 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFE7DA] border border-[#DDD0BC] rounded-full text-[11px] font-semibold uppercase tracking-wider text-[#7A6451] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#A87B2E]" />
              <span>Original Handcrafted Model Look</span>
            </div>

            <h2 className="text-3xl font-serif-luxury font-medium text-[#251E1A] leading-tight">
              {modelShoot.name}
            </h2>
            <p className="text-xs text-[#786658] mt-1 leading-relaxed">{modelShoot.tagline}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-[#E8DEC8]">
            <span className="text-3xl font-mono font-semibold text-[#8B6420]">
              {formatPrice(modelShoot.pricePKR)}
            </span>
            <span className="text-xs text-[#5E8357] font-medium ml-auto">
              Ready to Dispatch · Express Courier
            </span>
          </div>

          {/* Model Styling Details */}
          <div className="p-4 bg-[#F4EFE6] rounded-xl text-xs space-y-2.5 border border-[#E5DAC6] text-[#524135]">
            <p className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#A87B2E] shrink-0 mt-0.5" />
              <span>
                <strong>Model Styling:</strong> Dressed in a minimalist champagne raw-silk shalwar kameez with gold-and-pearl chandelier earrings and sophisticated loose low bun.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#A87B2E] shrink-0 mt-0.5" />
              <span>
                <strong>Draping Flow:</strong> Draped gracefully over both shoulders, with one end flowing down the front and the other falling naturally beside her arm, displaying the complete border.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#A87B2E] shrink-0 mt-0.5" />
              <span>
                <strong>Embellishment Preservation:</strong> Exact original hand-painted blush pink watercolor roses, shimmering gold sitara sequins, and delicate pearl moti stamen.
              </span>
            </p>
          </div>

          {/* Macro Inspection Thumbnails */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#635345] block mb-2">
              Inspect Authentic Handwork Details
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setZoomImage(modelShoot.modelPhoto)}
                className="aspect-square rounded-lg overflow-hidden border border-[#DDD0BC] hover:border-[#A87B2E] relative group cursor-pointer"
                title="Full Model Portrait"
              >
                <img src={modelShoot.modelPhoto} alt="Full Model" className="w-full h-full object-cover" />
                <span className="absolute inset-x-0 bottom-0 bg-black/60 text-[9px] text-white py-0.5 text-center">
                  Model
                </span>
              </button>

              <button
                onClick={() => setZoomImage(modelShoot.rosesMacro)}
                className="aspect-square rounded-lg overflow-hidden border border-[#DDD0BC] hover:border-[#A87B2E] relative group cursor-pointer"
                title="Hand-Painted Roses"
              >
                <img src={modelShoot.rosesMacro} alt="Roses Macro" className="w-full h-full object-cover" />
                <span className="absolute inset-x-0 bottom-0 bg-black/60 text-[9px] text-white py-0.5 text-center">
                  Painted Roses
                </span>
              </button>

              <button
                onClick={() => setZoomImage(modelShoot.motiMacro)}
                className="aspect-square rounded-lg overflow-hidden border border-[#DDD0BC] hover:border-[#A87B2E] relative group cursor-pointer"
                title="Sitara & Moti"
              >
                <img src={modelShoot.motiMacro} alt="Moti Macro" className="w-full h-full object-cover" />
                <span className="absolute inset-x-0 bottom-0 bg-black/60 text-[9px] text-white py-0.5 text-center">
                  Sitara & Moti
                </span>
              </button>

              <button
                onClick={() => setZoomImage(modelShoot.borderMacro)}
                className="aspect-square rounded-lg overflow-hidden border border-[#DDD0BC] hover:border-[#A87B2E] relative group cursor-pointer"
                title="Border Lace"
              >
                <img src={modelShoot.borderMacro} alt="Border Lace" className="w-full h-full object-cover" />
                <span className="absolute inset-x-0 bottom-0 bg-black/60 text-[9px] text-white py-0.5 text-center">
                  Border Lace
                </span>
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-[#251E1A] hover:bg-[#3D3027] text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={() => {
                  setSelectedProductId(modelShoot.id);
                  setCurrentPage('product-detail');
                }}
                className="px-4 py-3.5 border border-[#DDD0BC] bg-white hover:bg-[#FAF8F5] text-[#251E1A] font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Full Details</span>
              </button>
            </div>

            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                `Hello Zaib Than Collection! I would like to order the Gulab-e-Noor hand-painted tissue dupatta as worn by the model in your fashion campaign shoot (${formatPrice(
                  modelShoot.pricePKR
                )}).`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order Model Look via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {zoomImage && (
        <ZoomModal
          isOpen={!!zoomImage}
          onClose={() => setZoomImage(null)}
          imageUrl={zoomImage}
          title={modelShoot.name}
        />
      )}
    </div>
  );
};
