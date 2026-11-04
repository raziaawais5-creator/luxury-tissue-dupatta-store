import React, { useState, useMemo } from 'react';
import {
  Filter,
  X,
  Heart,
  Eye,
  ShoppingBag,
  Star,
  ArrowRight,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CollectionCategory, FabricType } from '../types';

export const ShopPage: React.FC = () => {
  const {
    products,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    setSelectedProductId,
    setCurrentPage,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
  } = useStore();

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [readyToShipOnly, setReadyToShipOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(12000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categoriesList: { id: CollectionCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Dupattas' },
    { id: 'hand-painted', label: 'Hand-Painted Tissue' },
    { id: 'sitara-collection', label: 'Golden Sitara' },
    { id: 'pearl-moti', label: 'Pearl & Moti' },
    { id: 'floral-handwork', label: 'Floral Botanicals' },
    { id: 'wedding-nikkah', label: 'Wedding & Nikkah' },
    { id: 'festive-eid', label: 'Festive & Eid' },
    { id: 'custom-creations', label: 'Custom Creations' },
    { id: 'limited-edition', label: 'Limited Edition' },
  ];

  const colorsList = [
    { id: 'ivory', label: 'Ivory / Cream', hex: '#FAF7F0' },
    { id: 'champagne', label: 'Champagne Peach', hex: '#EADBC8' },
    { id: 'fuchsia', label: 'Royal Rani Fuchsia', hex: '#C2185B' },
    { id: 'blush', label: 'Dusty Blush', hex: '#F48FB1' },
    { id: 'blue', label: 'Seafoam Turquoise', hex: '#48A9A6' },
  ];

  const fabricsList: FabricType[] = ['Pure Tissue', 'Sheer Organza', 'Silk Organza'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategoryFilter && selectedCategoryFilter !== 'all') {
          if (!p.category.includes(selectedCategoryFilter as CollectionCategory)) return false;
        }
        // Color filter
        if (selectedColor && p.colorFamily !== selectedColor) {
          return false;
        }
        // Fabric filter
        if (selectedFabric && p.fabric !== selectedFabric) {
          return false;
        }
        // Ready to ship filter
        if (readyToShipOnly && !p.isReadyToShip) {
          return false;
        }
        // Price filter
        if (p.pricePKR > maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.pricePKR - b.pricePKR;
        if (sortBy === 'price-high') return b.pricePKR - a.pricePKR;
        if (sortBy === 'rating') return b.rating - a.rating;
        return a.featured ? -1 : 1;
      });
  }, [products, selectedCategoryFilter, selectedColor, selectedFabric, readyToShipOnly, maxPrice, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategoryFilter(null);
    setSelectedColor(null);
    setSelectedFabric(null);
    setReadyToShipOnly(false);
    setMaxPrice(12000);
  };

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('product-detail');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Page Title & Breadcrumbs */}
      <div className="border-b border-[#E8DEC8] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-[#8C7A6B] uppercase tracking-wider mb-1">
            <span>Boutique Catalog</span> · <span>Handmade In Pakistan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-luxury font-medium text-[#251E1A]">
            The Dupatta Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#786658] mt-1 max-w-xl">
            Explore handcrafted sheer tissue dupattas adorned with hand-painted florals, golden sitara, moti, cutdana, and intricate kiran borders.
          </p>
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden px-3.5 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs font-semibold text-[#4A3B31] flex items-center gap-2 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#A87B2E]" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#8C7A6B] hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs font-medium text-[#251E1A] focus:outline-none focus:border-[#A87B2E] cursor-pointer"
            >
              <option value="featured">Featured Artisanal</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Reviews</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Sidebar Filters + Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside
          className={`lg:col-span-3 space-y-6 bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DEC8] ${
            isMobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#E2D6C0]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4A3B31]">
              <Filter className="w-3.5 h-3.5 text-[#A87B2E]" />
              <span>Refine Catalog</span>
            </div>
            {(selectedCategoryFilter || selectedColor || selectedFabric || readyToShipOnly) && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#A87B2E] hover:underline font-medium cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#665445] block">
              Collection
            </label>
            <div className="space-y-1">
              {categoriesList.map((cat) => {
                const isSelected =
                  (!selectedCategoryFilter && cat.id === 'all') || selectedCategoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryFilter(cat.id === 'all' ? null : cat.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#EFE7DA] text-[#251E1A] font-semibold'
                        : 'text-[#6E5D4F] hover:bg-[#F4EFE6]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#A87B2E]"></span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability Filter */}
          <div className="pt-4 border-t border-[#E8DEC8]">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#665445] block mb-2">
              Availability
            </label>
            <label className="flex items-center gap-2 text-xs text-[#524135] cursor-pointer">
              <input
                type="checkbox"
                checked={readyToShipOnly}
                onChange={(e) => setReadyToShipOnly(e.target.checked)}
                className="rounded accent-[#A87B2E] cursor-pointer"
              />
              <span>Ready to Ship Only (2-3 Days)</span>
            </label>
          </div>

          {/* Color Family */}
          <div className="pt-4 border-t border-[#E8DEC8]">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#665445] block mb-2">
              Color Palette
            </label>
            <div className="flex flex-wrap gap-2">
              {colorsList.map((col) => {
                const isSelected = selectedColor === col.id;
                return (
                  <button
                    key={col.id}
                    onClick={() => setSelectedColor(isSelected ? null : col.id)}
                    title={col.label}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#A87B2E] bg-white font-medium shadow-xs text-[#251E1A]'
                        : 'border-[#E2D5BF] bg-[#FAF8F5] text-[#69584B] hover:border-[#C4B29A]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs"
                      style={{ backgroundColor: col.hex }}
                    ></span>
                    <span className="text-[11px]">{col.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fabric Type */}
          <div className="pt-4 border-t border-[#E8DEC8]">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#665445] block mb-2">
              Base Fabric
            </label>
            <div className="space-y-1">
              {fabricsList.map((fab) => {
                const isSelected = selectedFabric === fab;
                return (
                  <button
                    key={fab}
                    onClick={() => setSelectedFabric(isSelected ? null : fab)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#EFE7DA] text-[#251E1A] font-semibold'
                        : 'text-[#6E5D4F] hover:bg-[#F4EFE6]'
                    }`}
                  >
                    <span>{fab}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#A87B2E]"></span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Max Price Range */}
          <div className="pt-4 border-t border-[#E8DEC8]">
            <div className="flex items-center justify-between text-xs font-semibold text-[#665445] mb-2">
              <span className="uppercase tracking-wider">Max Price</span>
              <span className="font-mono text-[#8B6420]">{formatPrice(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="12000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-[#A87B2E] cursor-pointer"
            />
          </div>
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between text-xs text-[#7B695B] px-1">
            <span>
              Showing <strong className="text-[#251E1A]">{filteredProducts.length}</strong> handcrafted designs
            </span>
            {selectedCategoryFilter && (
              <span className="bg-[#EFE7DA] text-[#524135] px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                Category: {selectedCategoryFilter}
              </span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-[#FAF7F2] rounded-2xl p-12 text-center border border-[#E8DEC8] space-y-4">
              <p className="font-serif-luxury text-xl text-[#251E1A]">No dupattas matched your filters</p>
              <p className="text-xs text-[#7B695B] max-w-sm mx-auto">
                Try widening your price range or clearing the color and fabric selections.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 bg-[#251E1A] text-white text-xs font-semibold rounded-lg hover:bg-[#3D3027] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => {
                const inWishlist = isInWishlist(product.id);
                return (
                  <div
                    key={product.id}
                    className="group bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#E8DEC8] hover:border-[#C4B196] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-[3/4] bg-[#ECE3D2] overflow-hidden cursor-pointer">
                      <img
                        src={product.images.primary}
                        alt={product.name}
                        onClick={() => handleProductClick(product.id)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <img
                        src={product.images.macroSitaraMoti}
                        alt={`${product.name} detail`}
                        onClick={() => handleProductClick(product.id)}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        referrerPolicy="no-referrer"
                      />

                      {/* Top Badges */}
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

                      {/* Quick View & Add Button on Hover */}
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
                        >
                          <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#8C7A6B]">
                          <span>{product.fabric}</span>
                          <span className="capitalize">{product.baseColor}</span>
                        </div>

                        <h3
                          onClick={() => handleProductClick(product.id)}
                          className="font-serif-luxury text-xl font-medium text-[#251E1A] hover:text-[#A87B2E] transition-colors cursor-pointer mt-1"
                        >
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#7B6A5B] line-clamp-2 mt-0.5">{product.tagline}</p>
                      </div>

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
                          <span>Drape Studio</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
