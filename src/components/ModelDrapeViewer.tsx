import React, { useState } from 'react';
import {
  Sparkles,
  ZoomIn,
  Check,
  Camera,
  Palette,
  Sun,
  Flame,
  Moon,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { DupattaProduct } from '../types';
import { FASHION_POSES } from './FashionPoseCollection';

interface ModelDrapeViewerProps {
  product: DupattaProduct;
  onOpenZoom?: (imgUrl: string) => void;
}

interface OutfitOption {
  id: string;
  name: string;
  fabricName: string;
  hex: string;
  textColor: string;
}

const OUTFIT_OPTIONS: OutfitOption[] = [
  { id: 'ivory', name: 'Raw Silk Ivory', fabricName: 'Pure Raw Silk Peshwas', hex: '#F9F6F0', textColor: '#332924' },
  { id: 'champagne', name: 'Champagne Gold', fabricName: 'Zari Brocade Anarkali', hex: '#EAE1CE', textColor: '#3B3026' },
  { id: 'black', name: 'Midnight Jet', fabricName: 'Deep Velvet Kurta & Pants', hex: '#1C1917', textColor: '#F5F5F4' },
  { id: 'sage', name: 'Pistachio Sage', fabricName: 'Chanderi Silk Gharara', hex: '#D6E2D5', textColor: '#243825' },
  { id: 'maroon', name: 'Bridal Crimson', fabricName: 'Royal Brocade Pishwas', hex: '#581825', textColor: '#FFFFFF' },
];

export const ModelDrapeViewer: React.FC<ModelDrapeViewerProps> = ({ product, onOpenZoom }) => {
  const [viewMode, setViewMode] = useState<'editorial_photo' | 'pairing_canvas'>('editorial_photo');
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitOption>(OUTFIT_OPTIONS[0]);
  const [lightingMode, setLightingMode] = useState<'studio' | 'golden' | 'candlelight'>('studio');
  const [selectedPoseIndex, setSelectedPoseIndex] = useState<number>(0);
  const [drapeStyle, setDrapeStyle] = useState<'shoulder' | 'regal' | 'cape'>('shoulder');
  const [sheerLevel, setSheerLevel] = useState<number>(0.88);

  // Authoritative consistent model portrait
  const modelPhoto = '/assets/aistudio/Elegant_Embroidered_Dupatta_Portrait_24f2dee4.png';
  const currentPose = FASHION_POSES[selectedPoseIndex];

  const lightingFilters = {
    studio: 'brightness-100 contrast-100',
    golden: 'sepia-[0.16] brightness-105 contrast-105 saturate-110',
    candlelight: 'brightness-95 contrast-115 saturate-110',
  };

  const handlePrevPose = () => {
    setSelectedPoseIndex((prev) => (prev > 0 ? prev - 1 : FASHION_POSES.length - 1));
  };

  const handleNextPose = () => {
    setSelectedPoseIndex((prev) => (prev < FASHION_POSES.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="bg-[#FAF7F2] border border-[#E8DFC8] rounded-2xl overflow-hidden shadow-sm">
      {/* Viewer Header */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-[#F4EFE6] to-[#ECE3D4] border-b border-[#E2D6C0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#A87B2E]" />
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#4A3B32] block">
              Haute Couture Model Studio · 8 Editorial Poses
            </span>
            <span className="text-[10px] text-[#7A6657]">
              Wearing {product.name} ({product.baseColor})
            </span>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-[#DDD0BC] self-start sm:self-auto text-xs">
          <button
            onClick={() => setViewMode('editorial_photo')}
            className={`px-3 py-1 font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'editorial_photo'
                ? 'bg-[#251E1A] text-white shadow-xs'
                : 'text-[#69584B] hover:text-[#251E1A]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>8 Model Poses</span>
          </button>
          <button
            onClick={() => setViewMode('pairing_canvas')}
            className={`px-3 py-1 font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'pairing_canvas'
                ? 'bg-[#A87B2E] text-white shadow-xs'
                : 'text-[#69584B] hover:text-[#251E1A]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Outfit Color Pairing</span>
          </button>
        </div>
      </div>

      {/* Main Display Area */}
      {viewMode === 'editorial_photo' ? (
        /* Real Haute Couture Model Fashion Campaign Photograph (4:5 Portrait) with 8 Poses */
        <div className="relative w-full aspect-[4/5] bg-[#221B17] overflow-hidden flex items-center justify-center select-none group">
          {/* Base Model Photo (Consistent Model: Oval Face, Low Hair Bun, Chandelier Pearl Earrings, Ivory Kurta) */}
          <img
            src={modelPhoto}
            alt="Pakistani fashion model wearing original hand-painted tissue dupatta"
            className={`w-full h-full object-cover transition-all duration-700 ${lightingFilters[lightingMode]} ${currentPose.modelScale} ${currentPose.modelPosition} group-hover:scale-102`}
            referrerPolicy="no-referrer"
          />

          {/* Authentic Dupatta Fabric Replacement Layer */}
          {product.id !== 'prod-gulab-e-noor' && (
            <div
              className={`absolute pointer-events-none transition-all duration-700 mix-blend-multiply filter contrast-125 saturate-110 ${currentPose.overlayTransform}`}
              style={{
                clipPath: currentPose.drapeClipPath,
                opacity: currentPose.drapeOpacity,
              }}
            >
              <img
                src={product.images.primary}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

          {/* Badges & Actions */}
          <div className="absolute top-4 left-4 bg-black/65 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="text-[11px] font-semibold tracking-wider uppercase font-serif-luxury">
              {currentPose.code} · {currentPose.name}
            </span>
          </div>

          <button
            onClick={() => onOpenZoom && onOpenZoom(product.images.primary)}
            className="absolute top-4 right-4 bg-white/95 hover:bg-white text-[#251E1A] p-2 rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center gap-1.5 text-xs font-semibold px-3 z-30"
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#A87B2E]" />
            <span>Macro Zoom</span>
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevPose}
            aria-label="Previous Pose"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextPose}
            aria-label="Next Pose"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Bottom In-Canvas Description */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3.5 rounded-xl border border-white/15 text-white flex items-center justify-between text-xs z-20">
            <div>
              <p className="font-serif-luxury text-sm font-medium text-white/95">
                {currentPose.name} · {currentPose.poseCategory}
              </p>
              <p className="text-[11px] text-[#D4AF37] line-clamp-1">
                {currentPose.editorialDescription}
              </p>
            </div>
            <span className="text-[10px] font-mono text-white/70 hidden sm:inline ml-3 shrink-0">
              Pose {selectedPoseIndex + 1}/8
            </span>
          </div>
        </div>
      ) : (
        /* Virtual Outfit Drape Canvas */
        <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] bg-[#221B17] overflow-hidden flex items-center justify-center select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2B231F] via-[#1E1815] to-[#120F0D] opacity-95"></div>
          <div className="relative z-10 w-full h-full max-w-md flex flex-col items-center justify-end pb-2">
            <div className="relative w-72 sm:w-80 h-96 flex flex-col items-center">
              <div
                className="w-full h-full rounded-t-[50px] shadow-2xl relative overflow-hidden transition-colors duration-500 border-t border-white/20"
                style={{ backgroundColor: selectedOutfit.hex }}
              >
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px]"></div>
                <div className="w-24 h-24 border-b border-x border-[#D4AF37]/50 rounded-b-full mx-auto"></div>
              </div>

              {/* Draped Dupatta Layer */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-700"
                style={{
                  clipPath:
                    drapeStyle === 'shoulder'
                      ? 'polygon(30% 0%, 100% 0%, 95% 100%, 10% 95%, 20% 40%)'
                      : 'polygon(5% 0%, 95% 0%, 90% 100%, 10% 100%)',
                }}
              >
                <img
                  src={product.images.primary}
                  alt={product.name}
                  className="w-full h-full object-cover mix-blend-multiply filter contrast-125 brightness-105"
                  style={{ opacity: sheerLevel }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs text-white/90 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10">
            <span>
              Paired with <strong className="text-[#F3E7D3]">{selectedOutfit.name}</strong>
            </span>
          </div>
        </div>
      )}

      {/* Interactive Controls Bar Below Canvas */}
      <div className="p-4 bg-white border-t border-[#E8DFC8] space-y-4">
        {viewMode === 'editorial_photo' ? (
          <div className="space-y-3">
            {/* 8-Pose Thumbnail Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#635345] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#A87B2E]" />
                  <span>Select Model Pose:</span>
                </span>
                <span className="text-[11px] text-[#A87B2E] font-medium">
                  {currentPose.name}
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {FASHION_POSES.map((pose, idx) => (
                  <button
                    key={pose.id}
                    onClick={() => setSelectedPoseIndex(idx)}
                    className={`py-1.5 px-1 rounded-lg text-center border text-[11px] font-medium transition-all cursor-pointer ${
                      idx === selectedPoseIndex
                        ? 'border-[#A87B2E] bg-[#FAF6EE] text-[#251E1A] font-bold shadow-xs'
                        : 'border-[#E2D5BF] bg-[#FAF8F5] text-[#69584B] hover:border-[#B5A18C]'
                    }`}
                  >
                    <span className="block text-[9px] font-mono text-[#8C7A6B]">0{pose.id}</span>
                    <span className="line-clamp-1">{pose.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting Atmosphere Selector */}
            <div className="flex items-center justify-between pt-2 border-t border-[#EFE8DC]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#635345]">
                Atmosphere:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setLightingMode('studio')}
                  className={`px-2.5 py-1 text-xs rounded-lg border flex items-center gap-1 cursor-pointer ${
                    lightingMode === 'studio'
                      ? 'border-[#251E1A] bg-[#251E1A] text-white'
                      : 'border-[#DDD0BC] bg-[#FAF8F5] text-[#69584B]'
                  }`}
                >
                  <Sun className="w-3 h-3" />
                  <span>Daylight</span>
                </button>
                <button
                  onClick={() => setLightingMode('golden')}
                  className={`px-2.5 py-1 text-xs rounded-lg border flex items-center gap-1 cursor-pointer ${
                    lightingMode === 'golden'
                      ? 'border-[#A87B2E] bg-[#A87B2E] text-white'
                      : 'border-[#DDD0BC] bg-[#FAF8F5] text-[#69584B]'
                  }`}
                >
                  <Flame className="w-3 h-3" />
                  <span>Golden Hour</span>
                </button>
                <button
                  onClick={() => setLightingMode('candlelight')}
                  className={`px-2.5 py-1 text-xs rounded-lg border flex items-center gap-1 cursor-pointer ${
                    lightingMode === 'candlelight'
                      ? 'border-[#3D2516] bg-[#3D2516] text-[#EAD8B7]'
                      : 'border-[#DDD0BC] bg-[#FAF8F5] text-[#69584B]'
                  }`}
                >
                  <Moon className="w-3 h-3" />
                  <span>Evening</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#635345]">
                Pair with Raw Silk Suit Shades
              </label>
              <span className="text-xs text-[#8C7A6B]">{selectedOutfit.fabricName}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {OUTFIT_OPTIONS.map((outfit) => {
                const isSelected = selectedOutfit.id === outfit.id;
                return (
                  <button
                    key={outfit.id}
                    onClick={() => setSelectedOutfit(outfit)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#A87B2E] bg-[#FAF6EE] text-[#251E1A] shadow-xs ring-1 ring-[#A87B2E]'
                        : 'border-[#E2D5BF] bg-[#FAF8F5] text-[#69584B] hover:border-[#C4B29A]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: outfit.hex }}
                    />
                    <span>{outfit.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
