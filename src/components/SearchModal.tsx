import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, setCurrentPage, setSelectedProductId, formatPrice } =
    useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.tagline.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.baseColor.toLowerCase().includes(term) ||
        p.fabric.toLowerCase().includes(term) ||
        p.embellishments.some((e) => e.toLowerCase().includes(term))
    );
  }, [searchTerm, products]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
    setIsSearchOpen(false);
    setSearchTerm('');
  };

  const quickSearches = ['Ivory Roses', 'Fuchsia Mehfil', 'Sitara & Kiran', 'Bridal Dupatta', 'Seafoam Blue', 'Mirror Work'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm p-4 sm:p-6 flex items-start justify-center pt-16 sm:pt-24 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E2D5C0] overflow-hidden">
        {/* Search Input Bar */}
        <div className="px-6 py-4 border-b border-[#E8DFC9] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#9E8B7A] shrink-0" />
          <input
            type="text"
            placeholder="Search by color, fabric, floral motif, sitara, or collection..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full text-base bg-transparent text-[#2C2420] placeholder-[#9E8B7A] focus:outline-none font-medium"
          />
          <button
            onClick={() => {
              setIsSearchOpen(false);
              setSearchTerm('');
            }}
            className="p-1.5 text-[#9E8B7A] hover:text-[#2C2420] rounded-full hover:bg-[#F3ECE0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions */}
        {!searchTerm && (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#7B6757]">
              <Sparkles className="w-3.5 h-3.5 text-[#A87B2E]" />
              <span>Popular Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="px-3.5 py-1.5 rounded-full text-xs bg-[#F2ECE1] hover:bg-[#E8DCB9] text-[#4A3B31] border border-[#E2D6C0] transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {searchTerm && (
          <div className="max-h-96 overflow-y-auto divide-y divide-[#EFE7DA] p-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <p className="text-sm font-medium text-[#4A3B31]">No dupattas matching "{searchTerm}"</p>
                <p className="text-xs text-[#8A7869]">
                  Try searching for "Roses", "Tissue", "Sitara", or "Ivory".
                </p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="p-3 hover:bg-[#F4EFE6] rounded-xl flex items-center gap-4 transition-colors cursor-pointer group"
                >
                  <img
                    src={product.images.primary}
                    alt={product.name}
                    className="w-14 h-16 object-cover rounded-lg bg-[#ECE3D2] border border-[#DDD0B9]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-luxury text-base font-medium text-[#2C2420] group-hover:text-[#A87B2E] transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#7B6A5B] truncate">{product.tagline}</p>
                    <div className="flex items-center gap-2 text-[11px] text-[#A69382] mt-0.5">
                      <span>{product.fabric}</span>
                      <span>·</span>
                      <span>{product.baseColor}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono font-semibold text-[#8B6420]">
                      {formatPrice(product.pricePKR)}
                    </p>
                    <ArrowRight className="w-4 h-4 text-[#A87B2E] ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
