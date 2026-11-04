import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FabricType } from '../types';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCurrentPage,
    setSelectedProductId,
  } = useStore();

  const [selectedFabric, setSelectedFabric] = useState<FabricType>('Pure Tissue');
  const [activeImageKey, setActiveImageKey] = useState<'primary' | 'border' | 'floral' | 'macro'>('primary');

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart({
      productId: quickViewProduct.id,
      name: quickViewProduct.name,
      slug: quickViewProduct.slug,
      image: quickViewProduct.images.primary,
      pricePKR: quickViewProduct.pricePKR,
      quantity: 1,
      selectedColor: quickViewProduct.baseColor,
      selectedFabric: selectedFabric,
    });
    setQuickViewProduct(null);
  };

  const handleFullDetails = () => {
    setSelectedProductId(quickViewProduct.id);
    setCurrentPage('product-detail');
    setQuickViewProduct(null);
  };

  const currentDisplayImage =
    activeImageKey === 'primary'
      ? quickViewProduct.images.primary
      : activeImageKey === 'border'
      ? quickViewProduct.images.borderDetail
      : activeImageKey === 'floral'
      ? quickViewProduct.images.floralCloseUp
      : quickViewProduct.images.macroSitaraMoti;

  const fabrics: FabricType[] = ['Pure Tissue', 'Sheer Organza', 'Silk Organza'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E2D5C0] overflow-hidden flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-[#7A695B] hover:text-[#2C2420] bg-white/80 hover:bg-white rounded-full transition-colors cursor-pointer shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-[#F4EFE6] border-r border-[#E5DAC6]">
          <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#ECE3D2] border border-[#DDD0B9] relative mb-4">
            <img
              src={currentDisplayImage}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {quickViewProduct.isReadyToShip ? (
              <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase bg-[#2C2420] text-white px-2.5 py-1 rounded-md shadow-xs">
                Ready to Ship
              </span>
            ) : (
              <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase bg-[#A87B2E] text-white px-2.5 py-1 rounded-md shadow-xs">
                Made to Order ({quickViewProduct.productionTimeDays} Days)
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => setActiveImageKey('primary')}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                activeImageKey === 'primary' ? 'border-[#A87B2E] shadow-sm' : 'border-transparent opacity-70'
              }`}
            >
              <img src={quickViewProduct.images.primary} alt="Primary" className="w-full h-full object-cover" />
            </button>
            <button
              onClick={() => setActiveImageKey('border')}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                activeImageKey === 'border' ? 'border-[#A87B2E] shadow-sm' : 'border-transparent opacity-70'
              }`}
            >
              <img src={quickViewProduct.images.borderDetail} alt="Border" className="w-full h-full object-cover" />
            </button>
            <button
              onClick={() => setActiveImageKey('floral')}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                activeImageKey === 'floral' ? 'border-[#A87B2E] shadow-sm' : 'border-transparent opacity-70'
              }`}
            >
              <img src={quickViewProduct.images.floralCloseUp} alt="Floral" className="w-full h-full object-cover" />
            </button>
            <button
              onClick={() => setActiveImageKey('macro')}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                activeImageKey === 'macro' ? 'border-[#A87B2E] shadow-sm' : 'border-transparent opacity-70'
              }`}
            >
              <img src={quickViewProduct.images.macroSitaraMoti} alt="Macro Sitara" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        {/* Right Side: Details & Action */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#A87B2E] font-semibold mb-1">
                Hand-Painted & Embroidered
              </p>
              <h2 className="text-2xl font-serif-luxury font-medium text-[#2C2420]">
                {quickViewProduct.name}
              </h2>
              <p className="text-xs text-[#7B6A5B] mt-1 leading-relaxed">{quickViewProduct.tagline}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-mono font-semibold text-[#8B6420]">
                {formatPrice(quickViewProduct.pricePKR)}
              </span>
              {quickViewProduct.originalPricePKR && (
                <span className="text-sm font-mono text-[#A8988B] line-through">
                  {formatPrice(quickViewProduct.originalPricePKR)}
                </span>
              )}
            </div>

            {/* Fabric Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#635345] mb-2">
                Select Base Fabric
              </label>
              <div className="grid grid-cols-3 gap-2">
                {fabrics.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFabric(f)}
                    className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                      selectedFabric === f
                        ? 'border-[#A87B2E] bg-[#FAF5EB] text-[#3D2C1E] shadow-xs'
                        : 'border-[#E2D5BF] hover:border-[#C4B29A] text-[#69584B]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Key Specs */}
            <div className="p-3 bg-[#F4EFE6] rounded-xl text-xs space-y-1.5 text-[#5C4D41]">
              <div className="flex justify-between">
                <span>Base Color:</span>
                <span className="font-medium text-[#2C2420]">{quickViewProduct.baseColor}</span>
              </div>
              <div className="flex justify-between">
                <span>Dimensions:</span>
                <span className="font-medium text-[#2C2420]">{quickViewProduct.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span>Handwork:</span>
                <span className="font-medium text-[#2C2420]">
                  {quickViewProduct.embellishments.join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 space-y-2 border-t border-[#E8DEC9] mt-6">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-[#2C2420] hover:bg-[#3D322B] text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#E5D7C5]" />
                <span>Add to Shopping Bag</span>
              </button>
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                  isInWishlist(quickViewProduct.id)
                    ? 'bg-[#FEE2E2] border-[#FCA5A5] text-[#DC2626]'
                    : 'border-[#E2D5BF] hover:bg-white text-[#69584B]'
                }`}
                title="Save to Wishlist"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>

            <button
              onClick={handleFullDetails}
              className="w-full py-2.5 text-xs font-semibold text-[#A87B2E] hover:text-[#8B6420] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Full Craftsmanship & Virtual Drape Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
