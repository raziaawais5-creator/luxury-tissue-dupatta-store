import React, { useState } from 'react';
import {
  Heart,
  ShoppingBag,
  Sparkles,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Star,
  MessageCircle,
  ZoomIn,
  Video,
  Eye,
  Info,
  Calendar,
  Layers,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FabricType } from '../types';
import { ModelDrapeViewer } from '../components/ModelDrapeViewer';
import { FashionPoseCollection } from '../components/FashionPoseCollection';
import { ZoomModal } from '../components/ZoomModal';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    getProductById,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCurrentPage,
    setSelectedProductId,
    settings,
  } = useStore();

  const product = getProductById(selectedProductId || 'prod-gulab-e-noor') || getProductById('prod-gulab-e-noor')!;

  // Tabs for Gallery: 'photos' | 'model' | 'video'
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'model' | 'video'>('photos');
  const [activeImageKey, setActiveImageKey] = useState<string>('primary');
  const [selectedFabric, setSelectedFabric] = useState<FabricType>(product.fabric);
  const [selectedDimensions, setSelectedDimensions] = useState<string>(product.dimensions);
  const [quantity, setQuantity] = useState<number>(1);
  const [zoomModalImage, setZoomModalImage] = useState<string | null>(null);

  const isFavorited = isInWishlist(product.id);

  const galleryItems = [
    ...(product.images.modelWearing
      ? [{ key: 'modelWearing', label: 'Campaign Model', url: product.images.modelWearing }]
      : []),
    { key: 'primary', label: 'Full Dupatta', url: product.images.primary },
    { key: 'border', label: 'Border & Kiran', url: product.images.borderDetail },
    { key: 'floral', label: 'Hand-Painted Flora', url: product.images.floralCloseUp },
    { key: 'macro', label: 'Sitara & Moti Macro', url: product.images.macroSitaraMoti },
    { key: 'transparency', label: 'Fabric Drape', url: product.images.transparencyDrape || product.images.primary },
  ];

  const currentDisplayUrl =
    galleryItems.find((item) => item.key === activeImageKey)?.url || product.images.primary;

  const fabrics: FabricType[] = ['Pure Tissue', 'Sheer Organza', 'Silk Organza'];
  const dimensionOptions = [
    product.dimensions,
    '3.0 meters x 1.15 meters (Bridal Extra Grace)',
  ];

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images.primary,
      pricePKR: product.pricePKR,
      quantity,
      selectedColor: product.baseColor,
      selectedFabric: selectedFabric,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setCurrentPage('checkout');
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Zaib Than Collection! I am interested in ordering "${product.name}" (${selectedFabric}, ${product.baseColor}, ${formatPrice(product.pricePKR)}). Could you please confirm production schedule and custom color options?`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-[#8C7A6B]">
        <button
          onClick={() => setCurrentPage('shop')}
          className="flex items-center gap-1.5 hover:text-[#251E1A] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </button>
        <div className="hidden sm:flex items-center gap-2">
          <span>Home</span>
          <ChevronRight className="w-3 h-3 text-[#C7B5A3]" />
          <span>Shop</span>
          <ChevronRight className="w-3 h-3 text-[#C7B5A3]" />
          <span className="text-[#251E1A] font-medium">{product.name}</span>
        </div>
      </div>

      {/* Main Grid: Gallery on Left (Col 7) + Contiguous Purchase Module on Right (Col 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Gallery, Model Drape Studio, Video */}
        <div className="lg:col-span-7 space-y-4">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-between border-b border-[#E8DEC8] pb-2">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveMediaTab('photos')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeMediaTab === 'photos'
                    ? 'bg-[#251E1A] text-white shadow-xs'
                    : 'text-[#69584B] hover:bg-[#F3EFE7]'
                }`}
              >
                <span>Macro Photos</span>
              </button>
              <button
                onClick={() => setActiveMediaTab('model')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeMediaTab === 'model'
                    ? 'bg-[#A87B2E] text-white shadow-xs'
                    : 'text-[#69584B] hover:bg-[#F3EFE7]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Model Drape Studio</span>
              </button>
              {product.videoUrl && (
                <button
                  onClick={() => setActiveMediaTab('video')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeMediaTab === 'video'
                      ? 'bg-[#251E1A] text-white shadow-xs'
                      : 'text-[#69584B] hover:bg-[#F3EFE7]'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Video In Motion</span>
                </button>
              )}
            </div>

            {activeMediaTab === 'photos' && (
              <button
                onClick={() => setZoomModalImage(currentDisplayUrl)}
                className="text-xs text-[#A87B2E] hover:text-[#7D5B1E] flex items-center gap-1 font-medium cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Click to Zoom</span>
              </button>
            )}
          </div>

          {/* Media Viewport */}
          {activeMediaTab === 'photos' && (
            <div className="space-y-3">
              <div
                onClick={() => setZoomModalImage(currentDisplayUrl)}
                className="group relative aspect-[4/5] sm:aspect-[3/4] bg-[#ECE3D2] rounded-2xl overflow-hidden border border-[#E2D6C0] shadow-md cursor-zoom-in"
              >
                <img
                  src={currentDisplayUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white/90 border border-white/20 flex items-center gap-1.5 pointer-events-none">
                  <ZoomIn className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Tap to inspect sitara & moti</span>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="grid grid-cols-5 gap-2.5">
                {galleryItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveImageKey(item.key)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer relative bg-[#ECE3D2] ${
                      activeImageKey === item.key
                        ? 'border-[#A87B2E] shadow-sm ring-1 ring-[#A87B2E]/40'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={item.url} alt={item.label} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-white py-0.5 text-center truncate px-1">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeMediaTab === 'model' && (
            <ModelDrapeViewer
              product={product}
              onOpenZoom={(url) => setZoomModalImage(url)}
            />
          )}

          {activeMediaTab === 'video' && product.videoUrl && (
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-black border border-[#3D2F26] shadow-xl relative flex items-center justify-center">
              <video
                src={product.videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                controls
                playsInline
              />
            </div>
          )}
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] shadow-sm space-y-6 lg:sticky lg:top-28">
          {/* Header & Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A87B2E]">
                Atelier Handcrafted
              </span>
              <div className="flex items-center gap-1 text-[#A87B2E]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-mono text-xs font-semibold">{product.rating}</span>
                <span className="text-xs text-[#8C7A6B]">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#251E1A]">
              {product.name}
            </h1>
            <p className="text-xs text-[#7B6A5B] mt-1 leading-relaxed">{product.tagline}</p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-[#E8DEC8]">
            <span className="text-3xl font-mono font-semibold text-[#8B6420]">
              {formatPrice(product.pricePKR)}
            </span>
            {product.originalPricePKR && (
              <span className="text-sm font-mono text-[#A8988B] line-through">
                {formatPrice(product.originalPricePKR)}
              </span>
            )}
            <span className="text-xs text-[#5E8357] font-medium ml-auto">Taxes Included</span>
          </div>

          {/* Craftsmanship Highlights */}
          <p className="text-xs text-[#524135] leading-relaxed">
            {product.description}
          </p>

          {/* Fabric Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#635345]">
              <span>Select Base Fabric</span>
              <span className="text-[#8C7A6B] normal-case text-xs font-normal">
                {selectedFabric === 'Pure Tissue' ? 'Metallic sheer sheen' : 'Crisp translucent silk'}
              </span>
            </div>
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

          {/* Length & Dimensions Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#635345] block">
              Dupatta Length & Width
            </label>
            <div className="space-y-1.5">
              {dimensionOptions.map((dim) => (
                <button
                  key={dim}
                  onClick={() => setSelectedDimensions(dim)}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    selectedDimensions === dim
                      ? 'border-[#A87B2E] bg-[#FAF5EB] text-[#251E1A] font-medium'
                      : 'border-[#E2D5BF] text-[#69584B] hover:bg-white'
                  }`}
                >
                  <span>{dim}</span>
                  {selectedDimensions === dim && <Check className="w-3.5 h-3.5 text-[#A87B2E]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Production Timeline & Stock Status */}
          <div className="p-3.5 bg-[#F4EFE6] rounded-xl text-xs space-y-2 border border-[#E5DAC6]">
            <div className="flex items-center gap-2 text-[#4A3B31]">
              <Calendar className="w-4 h-4 text-[#A87B2E]" />
              {product.isReadyToShip ? (
                <span>
                  <strong>Ready to Dispatch:</strong> Ships in 2 to 3 business days via Express Courier.
                </span>
              ) : (
                <span>
                  <strong>Hand-Crafted on Order:</strong> {product.productionTimeDays} days production time + express shipping.
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-[#4A3B31]">
              <Sparkles className="w-4 h-4 text-[#A87B2E]" />
              <span>
                <strong>Embellishments:</strong> {product.embellishments.join(', ')}.
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#4A3B31]">
              <Layers className="w-4 h-4 text-[#A87B2E]" />
              <span>
                <strong>Border Detail:</strong> {product.borderStyle}.
              </span>
            </div>
          </div>

          {/* Quantity Selector & CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[#D9CDB8] rounded-xl bg-white px-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 py-2 text-[#69584B] hover:text-[#251E1A] cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-mono font-semibold text-[#251E1A]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 py-2 text-[#69584B] hover:text-[#251E1A] cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-[#251E1A] hover:bg-[#3D3027] text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>Add to Shopping Bag</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                  isFavorited
                    ? 'bg-[#FEE2E2] border-[#FCA5A5] text-[#DC2626]'
                    : 'border-[#E2D5BF] hover:bg-white text-[#69584B]'
                }`}
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Direct Buy Now */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 bg-[#A87B2E] hover:bg-[#8F6724] text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              Buy Now · Express Checkout
            </button>

            {/* WhatsApp Custom Inquiry */}
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-white hover:bg-[#FAF8F5] text-[#1E7E34] border border-[#86C995] font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Custom Order & Inquiry</span>
            </a>
          </div>

          {/* Care Instructions Accordion-style Box */}
          <div className="pt-4 border-t border-[#E8DEC8] space-y-2 text-xs">
            <h4 className="font-semibold uppercase tracking-wider text-[#635345]">
              Care & Heirloom Preservation
            </h4>
            <ul className="space-y-1 text-[#786657] list-disc list-inside">
              {product.careInstructions.map((rule, idx) => (
                <li key={idx} className="leading-relaxed">
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Haute Couture Campaign Shoot: 8 Distinct Editorial Poses */}
      <section className="pt-8 border-t border-[#E8DEC8]">
        <FashionPoseCollection />
      </section>

      {/* Lightbox / Zoom Modal */}
      {zoomModalImage && (
        <ZoomModal
          isOpen={!!zoomModalImage}
          onClose={() => setZoomModalImage(null)}
          imageUrl={zoomModalImage}
          title={product.name}
        />
      )}
    </div>
  );
};
