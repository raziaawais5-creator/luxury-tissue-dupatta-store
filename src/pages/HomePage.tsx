import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Heart,
  Eye,
  ShoppingBag,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Check,
  Star,
  Layers,
  Palette,
  Scissors,
  Award,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FEATURED_COLLECTIONS_DATA } from '../data/products';
import { FashionPoseCollection } from '../components/FashionPoseCollection';

export const HomePage: React.FC = () => {
  const {
    products,
    setCurrentPage,
    setSelectedProductId,
    setSelectedCategoryFilter,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    settings,
  } = useStore();

  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [selectedAtelierStage, setSelectedAtelierStage] = useState(0);

  const heroDupatta = products[0]; // Gulab-e-Noor
  const featuredDupattas = products.slice(0, 6);

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('product-detail');
  };

  const handleCollectionClick = (categoryId: string) => {
    setSelectedCategoryFilter(categoryId);
    setCurrentPage('shop');
  };

  const atelierStages = [
    {
      step: '01',
      title: 'The Fabric',
      lead: 'Whisper-light metallic tissue & pure silk organza',
      description:
        'We source gossamer-fine tissue spun with gossamer metallic filaments. The fabric possesses an ethereal natural luminosity that catches ambient candlelight while remaining featherweight on the shoulder.',
      image: '/assets/aistudio/9b6b89f0-ad30-4a2a-b536-a50d80f1b78e_94496726.jpeg',
      quote: 'Transparency and tensile drape tested for lasting grace.',
    },
    {
      step: '02',
      title: 'The Painting',
      lead: 'Freehand watercolor botanicals on stretched frames',
      description:
        'Artisans stretch the sheer tissue onto traditional wooden karchob frames. Using fine round-tip brushes and custom non-stiffening textile pigments, each rose petal, vine, and poppy is painted freehand without stencils.',
      image: '/assets/aistudio/54bde74e-4ee7-417c-824e-d724af23349e_1992fceb.jpeg',
      quote: 'No two petals are ever identical—each is an original painting.',
    },
    {
      step: '03',
      title: 'The Handwork',
      lead: 'Sitara, moti, cut-dana, and mirror embroidery',
      description:
        'With fine embroidery needles, women artisans hand-stitch thousands of micro gold and iridescent sitaras. Real freshwater glass pearl moti are fastened at floral centers, accented with shimmering cut-dana and antique mirrors.',
      image: '/assets/aistudio/515d46bd-8945-4625-b03f-aef7121db609_fcb4da40.jpeg',
      quote: '12 to 24 hours of meticulous hand-tacking per dupatta.',
    },
    {
      step: '04',
      title: 'The Finishing',
      lead: 'Gold kiran fringe, baby scalloping, and steam pressing',
      description:
        'The border is embellished with traditional Pakistani metallic gold kiran lace fringe or delicate embroidered scalloping. Every millimeter is inspected under daylight before being gently steamed and packed in muslin.',
      image: '/assets/aistudio/69e152b9-04c3-42b2-a312-b30b86bd59b5_7836dd34.jpeg',
      quote: 'A finished heirloom ready for your most cherished moments.',
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* 1. LUXURY EDITORIAL HERO SECTION */}
      <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] bg-[#FAF7F2] flex items-center overflow-hidden border-b border-[#E8DFC9]">
        {/* Ambient Warm Golden Glow */}
        <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-bl from-[#F4EBE0] via-[#FAF6F0] to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFE7DA] border border-[#DDD0BC] rounded-full text-[11px] font-semibold uppercase tracking-wider text-[#7A6451]">
              <Sparkles className="w-3.5 h-3.5 text-[#A87B2E]" />
              <span>Pakistani Haute Couture · Handcrafted Tissue</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-medium text-[#251E1A] tracking-tight leading-[1.08] text-balance">
              Wear Art. <br />
              <span className="italic text-[#8B6420]">Celebrate Tradition.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#6E5D50] leading-relaxed max-w-xl font-normal">
              Discover exquisite tissue dupattas transformed by hand-painted florals, delicate
              golden sitara, shimmering pearl moti, and timeless Pakistani craftsmanship. Every
              thread spun for moments worth remembering.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setSelectedCategoryFilter(null);
                  setCurrentPage('shop');
                }}
                className="px-7 py-3.5 bg-[#251E1A] hover:bg-[#3D3027] text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center gap-2.5 cursor-pointer"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <button
                onClick={() => setCurrentPage('custom-designer')}
                className="px-7 py-3.5 bg-transparent hover:bg-[#F2ECE1] text-[#251E1A] border border-[#251E1A] text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors cursor-pointer"
              >
                Create Your Custom Dupatta
              </button>
            </div>

            {/* Authentic Trust Strip */}
            <div className="pt-6 border-t border-[#E8DEC8] flex items-center gap-6 text-xs text-[#7B695B]">
              <div>
                <p className="font-semibold text-sm text-[#251E1A] font-mono">100%</p>
                <p className="text-[11px]">Freehand Painted</p>
              </div>
              <div className="w-[1px] h-8 bg-[#DDD0BC]"></div>
              <div>
                <p className="font-semibold text-sm text-[#251E1A] font-mono">2,000+</p>
                <p className="text-[11px]">Sitara & Moti Hand-Tacked</p>
              </div>
              <div className="w-[1px] h-8 bg-[#DDD0BC]"></div>
              <div>
                <p className="font-semibold text-sm text-[#251E1A] font-mono">Global</p>
                <p className="text-[11px]">DHL Express Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Visual Hero Column: Editorial Model Card & Real Fabric In Motion */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Editorial Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#DFD4BF] bg-[#F3ECE1] aspect-[4/5] sm:aspect-[3/4]">
                <img
                  src="/assets/aistudio/Elegant_Embroidered_Dupatta_Portrait_24f2dee4.png"
                  alt="Pakistani fashion model wearing original hand-painted tissue dupatta with sitara and moti"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>

                {/* Floating Tag */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/40 shadow-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                  <span className="text-[11px] font-semibold text-[#2C2420] tracking-wide">
                    Couture Campaign · Hand-Painted Tissue
                  </span>
                </div>

                {/* Bottom Content within Hero Card */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#D4AF37] font-medium">
                        Pure Metallic Tissue · Handcrafted
                      </p>
                      <h3 className="text-xl sm:text-2xl font-serif-luxury font-medium">
                        Gulab-e-Noor Champagne & Blush
                      </h3>
                    </div>
                    <p className="text-lg font-mono font-semibold text-[#D4AF37]">
                      {formatPrice(8200)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => handleProductClick('prod-gulab-e-noor')}
                      className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-[#251E1A] font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Inspect Dupatta Details
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProductId('prod-gulab-e-noor');
                        setCurrentPage('product-detail');
                      }}
                      className="px-3 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      View on Model
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Miniature Overlay: Sheer Aqua Texture Card */}
              <div
                onClick={() => handleProductClick('prod-emerald-garden')}
                className="hidden sm:flex absolute -bottom-8 -left-8 bg-[#FAF7F2] p-2.5 rounded-xl shadow-xl border border-[#D9CDB8] items-center gap-3 max-w-xs cursor-pointer hover:border-[#A87B2E] transition-all group"
              >
                <img
                  src="/assets/aistudio/4ee99e31-41a3-4c5f-b9ce-8b6e7c2ad2d8_65bfbd9c.jpeg"
                  alt="Firouzi Nazakat"
                  className="w-14 h-16 rounded-lg object-cover border border-[#E5DAC6]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="text-[10px] text-[#A87B2E] font-semibold uppercase tracking-wider">
                    New Arrival
                  </p>
                  <p className="font-serif-luxury text-sm font-medium text-[#251E1A] group-hover:text-[#A87B2E] transition-colors">
                    Firouzi Seafoam
                  </p>
                  <p className="text-xs font-mono font-semibold text-[#8B6420]">
                    {formatPrice(8400)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REAL ATELIER VIDEO SHOWCASE: DUPATTA IN MOTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#241B16] text-[#E5D7C7] rounded-3xl overflow-hidden shadow-2xl border border-[#3D2F27] grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Text & Video Controls */}
          <div className="lg:col-span-5 p-8 sm:p-12 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D4AF37]">
              <Play className="w-3.5 h-3.5" />
              <span>Direct From The Lahore Atelier</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-medium text-white leading-tight">
              Watch the Sheer Fabric <br />
              <span className="italic text-[#D4AF37]">Dance in the Light</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#B8A796] leading-relaxed">
              Experience the genuine shimmer of gold sitara sequins, delicate moti pearls, and
              hand-painted floral petals on translucent tissue. This unedited video captured directly on our artisan workbench reveals the breathability and authentic texture.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#241B16] rounded-xl font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isVideoPlaying ? 'Pause Video' : 'Play Video'}</span>
              </button>

              <button
                onClick={() => setIsVideoMuted(!isVideoMuted)}
                className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors cursor-pointer"
                title={isVideoMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Right Video Reel */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[460px] bg-black flex items-center justify-center overflow-hidden">
            <video
              src="/assets/aistudio/109bc8be-e306-4810-b745-5d2ab33c9e87_f843f5e8.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted={isVideoMuted}
              playsInline
              ref={(ref) => {
                if (ref) {
                  if (isVideoPlaying) ref.play().catch(() => {});
                  else ref.pause();
                }
              }}
            />
            {/* Ambient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-white/80 border border-white/20">
              Authentic Handcrafted Tissue In Motion
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 EDITORIAL CAMPAIGN SHOOT: 8 FASHION POSES WITH EXACT DUPATTA REPLACEMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <FashionPoseCollection />
      </section>

      {/* 3. FEATURED COLLECTIONS CARDS (8 DISTINCT CATEGORIES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#A87B2E] font-semibold">
            Curated Expressions
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-medium text-[#251E1A]">
            Featured Collections
          </h2>
          <p className="text-xs sm:text-sm text-[#736355]">
            Each collection celebrates an ancient needlecraft tradition paired with contemporary South Asian aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_COLLECTIONS_DATA.map((col) => (
            <div
              key={col.id}
              onClick={() => handleCollectionClick(col.id)}
              className="group relative rounded-2xl overflow-hidden bg-[#FAF6EE] border border-[#E5DAC6] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-end aspect-[4/5]"
            >
              {/* Image */}
              <img
                src={col.image}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                referrerPolicy="no-referrer"
              />
              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>

              {/* Text Overlay */}
              <div className="relative p-6 text-white space-y-1 z-10">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]">
                  {col.count}
                </span>
                <h3 className="font-serif-luxury text-xl font-medium leading-snug group-hover:text-[#F3E7D3] transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-white/75 line-clamp-2">{col.subtitle}</p>
                <div className="pt-2 flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRODUCT GRID WITH QUICK VIEW & MODEL DRAPING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8DEC8] pb-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#A87B2E] font-semibold">
              Ready to Wear & Bespoke Orders
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-medium text-[#251E1A]">
              Signature Dupatta Gallery
            </h2>
          </div>

          <button
            onClick={() => {
              setSelectedCategoryFilter(null);
              setCurrentPage('shop');
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#251E1A] hover:text-[#A87B2E] transition-colors"
          >
            <span>View All ({products.length} Dupattas)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDupattas.map((product) => {
            const inWishlist = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#E8DEC8] hover:border-[#C4B196] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Image Container with Hover Swap */}
                <div className="relative aspect-[3/4] bg-[#ECE3D2] overflow-hidden cursor-pointer">
                  <img
                    src={product.images.primary}
                    alt={product.name}
                    onClick={() => handleProductClick(product.id)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Secondary Image on Hover */}
                  <img
                    src={product.images.macroSitaraMoti}
                    alt={`${product.name} macro detail`}
                    onClick={() => handleProductClick(product.id)}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top Status Tag */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.isReadyToShip ? (
                      <span className="text-[10px] font-semibold tracking-wider uppercase bg-[#251E1A]/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-md">
                        Ready to Ship
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold tracking-wider uppercase bg-[#A87B2E]/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-md">
                        Made to Order
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                      inWishlist
                        ? 'bg-[#FEE2E2] text-[#DC2626]'
                        : 'bg-white/80 hover:bg-white text-[#5E4D41]'
                    }`}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>

                  {/* Quick Action Overlay on Hover */}
                  <div className="absolute bottom-3 inset-x-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="flex-1 py-2 bg-white/95 hover:bg-white text-[#251E1A] text-xs font-semibold rounded-lg shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#A87B2E]" />
                      <span>Quick View</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          productId: product.id,
                          name: product.name,
                          slug: product.slug,
                          image: product.images.primary,
                          pricePKR: product.pricePKR,
                          quantity: 1,
                          selectedColor: product.baseColor,
                          selectedFabric: product.fabric,
                        });
                      }}
                      className="p-2 bg-[#251E1A] hover:bg-[#3D3027] text-white rounded-lg shadow-md transition-colors cursor-pointer"
                      title="Add to Shopping Bag"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#8C7A6B]">
                      <span>{product.fabric}</span>
                      <div className="flex items-center gap-1 text-[#A87B2E]">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-mono text-[11px] font-semibold">{product.rating}</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => handleProductClick(product.id)}
                      className="font-serif-luxury text-xl font-medium text-[#251E1A] hover:text-[#A87B2E] transition-colors cursor-pointer mt-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#7B6A5B] line-clamp-2 mt-0.5">{product.tagline}</p>
                  </div>

                  {/* Price & Drape CTA */}
                  <div className="pt-3 border-t border-[#EDE4D5] flex items-center justify-between">
                    <div>
                      <p className="text-base font-mono font-semibold text-[#8B6420]">
                        {formatPrice(product.pricePKR)}
                      </p>
                      {product.originalPricePKR && (
                        <p className="text-[11px] font-mono text-[#A8988B] line-through">
                          {formatPrice(product.originalPricePKR)}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleProductClick(product.id)}
                      className="text-xs font-semibold text-[#251E1A] hover:text-[#A87B2E] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Try on Model</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. INTERACTIVE ARTISAN WORKBENCH: THE 4 STAGES OF CRAFTSMANSHIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#FAF4EA] rounded-3xl p-8 sm:p-14 border border-[#E5DAC4] space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#A87B2E]">
              From Raw Silk to Heirloom
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-medium text-[#251E1A]">
              The Making of a Zaib Than Collection Dupatta
            </h2>
            <p className="text-xs sm:text-sm text-[#786658]">
              Step inside our workshop to witness the patient, generational needlecraft and botanical watercolor art.
            </p>
          </div>

          {/* Stages Navigation Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-b border-[#E2D5BF] pb-4">
            {atelierStages.map((stage, idx) => (
              <button
                key={stage.step}
                onClick={() => setSelectedAtelierStage(idx)}
                className={`text-left p-3.5 rounded-xl transition-all cursor-pointer border ${
                  selectedAtelierStage === idx
                    ? 'bg-white border-[#A87B2E] shadow-sm text-[#251E1A]'
                    : 'border-transparent text-[#7B695B] hover:bg-[#F2ECE0]'
                }`}
              >
                <span className="font-mono text-xs font-semibold text-[#A87B2E] block">
                  Stage {stage.step}
                </span>
                <span className="font-serif-luxury text-base font-medium">{stage.title}</span>
              </button>
            ))}
          </div>

          {/* Active Stage Deep Dive */}
          {(() => {
            const current = atelierStages[selectedAtelierStage];
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs text-[#A87B2E] font-semibold uppercase tracking-wider">
                    <span>Stage {current.step}</span>
                    <span>·</span>
                    <span>{current.lead}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#251E1A]">
                    {current.title}
                  </h3>

                  <p className="text-sm text-[#6A5A4E] leading-relaxed">{current.description}</p>

                  <div className="p-4 bg-white/70 border-l-2 border-[#A87B2E] rounded-r-xl text-xs text-[#4A3B31] italic font-serif-luxury">
                    "{current.quote}"
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setCurrentPage('craftsmanship')}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B6420] hover:text-[#5B4215] transition-colors cursor-pointer"
                    >
                      <span>Read the Full Craftsmanship Archive</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#D9CDB7] shadow-xl bg-[#ECE3D2]">
                    <img
                      src={current.image}
                      alt={current.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 6. BESPOKE CUSTOM DUPATTA CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2C231E] via-[#3A2D26] to-[#1C1613] text-white p-8 sm:p-14 border border-[#48382F] shadow-2xl">
          <div className="max-w-2xl space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Bespoke Atelier Service
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-medium text-white leading-tight">
              Have a Dream Color <br />
              or Bridal Peshwas to Match?
            </h2>
            <p className="text-sm text-[#C9BAA8] leading-relaxed">
              Use our interactive dupatta designer to select your base tissue, pick a custom
              hex hue to match your outfit, select hand-painted botanical motifs, and specify
              exact sitara, moti, or kiran lace density.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setCurrentPage('custom-designer')}
                className="px-6 py-3.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#251E1A] font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md cursor-pointer"
              >
                Launch Custom Dupatta Designer
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-colors cursor-pointer"
              >
                Consult an Artisan
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
