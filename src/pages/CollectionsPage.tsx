import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FEATURED_COLLECTIONS_DATA } from '../data/products';

export const CollectionsPage: React.FC = () => {
  const { setSelectedCategoryFilter, setCurrentPage } = useStore();

  const handleSelectCollection = (categoryId: string) => {
    setSelectedCategoryFilter(categoryId);
    setCurrentPage('shop');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#A87B2E] font-semibold">
          Curated Portfolios
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif-luxury font-medium text-[#251E1A]">
          Our Dupatta Collections
        </h1>
        <p className="text-xs sm:text-sm text-[#736355]">
          Explore eight distinct artistic expressions of Pakistani hand-painted tissue and organza craftsmanship.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURED_COLLECTIONS_DATA.map((col) => (
          <div
            key={col.id}
            onClick={() => handleSelectCollection(col.id)}
            className="group relative rounded-2xl overflow-hidden bg-[#FAF6EE] border border-[#E5DAC6] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-end aspect-[3/4]"
          >
            <img
              src={col.image}
              alt={col.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>

            <div className="relative p-6 text-white space-y-1 z-10">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]">
                {col.count}
              </span>
              <h3 className="font-serif-luxury text-xl font-medium leading-snug group-hover:text-[#F3E7D3] transition-colors">
                {col.title}
              </h3>
              <p className="text-xs text-white/75 line-clamp-2">{col.subtitle}</p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold">
                <span>Shop Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
