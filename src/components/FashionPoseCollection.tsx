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
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Info,
  ShieldCheck,
  Scissors,
  Palette,
  Camera,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ZoomModal } from './ZoomModal';

export interface FashionPose {
  id: number;
  code: string;
  name: string;
  poseCategory: string;
  framing: string;
  focalPoint: string;
  editorialDescription: string;
  draperyTechnique: string;
  craftFocus: string;
  lightingRecommendation: string;
  // Specific canvas styling for this pose
  containerAspect: string;
  modelScale: string;
  modelPosition: string;
  overlayTransform: string;
  drapeClipPath: string;
  drapeOpacity: number;
  borderPosition: string;
}

export interface DupattaReferenceDesign {
  id: string;
  name: string;
  tagline: string;
  pricePKR: number;
  baseColor: string;
  fabricName: string;
  primaryImage: string;
  textureImage: string;
  macroFlower: string;
  macroBorder: string;
  accentColor: string;
  pillColor: string;
  description: string;
  craftsmanshipBullet: string;
}

export const DUPATTA_REFERENCE_DESIGNS: DupattaReferenceDesign[] = [
  {
    id: 'mehfil-fuchsia',
    name: 'Mehfil · Royal Rani Fuchsia',
    tagline: 'Your uploaded fuchsia tissue dupatta with hand-painted 5-petal purple floral motifs, radiating seed pearl moti, scattered gold sitaras, and cascading kiran lace.',
    pricePKR: 8800,
    baseColor: 'Royal Rani Fuchsia & Violet',
    fabricName: 'Pure Metallic Tissue Silk',
    primaryImage: '/assets/aistudio/515d46bd-8945-4625-b03f-aef7121db609_fcb4da40.jpeg',
    textureImage: '/assets/aistudio/3d7cc8d5-784b-47e4-b547-0b01757454b9_4d7d4aac.jpeg',
    macroFlower: '/assets/aistudio/515d46bd-8945-4625-b03f-aef7121db609_fcb4da40.jpeg',
    macroBorder: '/assets/aistudio/69e152b9-04c3-42b2-a312-b30b86bd59b5_7836dd34.jpeg',
    accentColor: '#C2185B',
    pillColor: 'bg-[#C2185B] text-white',
    description: 'Exact physical product reference: Rich fuchsia metallic tissue carrying five-petal purple watercolor flowers traced with golden liners, seed pearls stitched along each petal axis, and an authentic cascading gold kiran lace fringe border.',
    craftsmanshipBullet: 'Over 2,400 hand-tacked gold sitaras and 1,800 freshwater pearl motis attached with invisible monofilament thread.',
  },
  {
    id: 'firouzi-seafoam',
    name: 'Firouzi Nazakat · Celestial Seafoam',
    tagline: 'Your uploaded aqua turquoise tissue dupatta with hand-painted violet/indigo blossoms, emerald sequin foliage, and luminous pearl pistils.',
    pricePKR: 8400,
    baseColor: 'Seafoam Turquoise & Indigo',
    fabricName: 'Whisper Sheer Organza Tissue',
    primaryImage: '/assets/aistudio/4ee99e31-41a3-4c5f-b9ce-8b6e7c2ad2d8_65bfbd9c.jpeg',
    textureImage: '/assets/aistudio/9a8abdf7-0171-4759-be91-05b0a30131a3_9be25aa9.jpeg',
    macroFlower: '/assets/aistudio/4ee99e31-41a3-4c5f-b9ce-8b6e7c2ad2d8_65bfbd9c.jpeg',
    macroBorder: '/assets/aistudio/9a8abdf7-0171-4759-be91-05b0a30131a3_9be25aa9.jpeg',
    accentColor: '#00838F',
    pillColor: 'bg-[#00838F] text-white',
    description: 'Exact physical product reference: Gossamer turquoise tissue adorned with multi-hued lilac and violet hand-painted petals, shimmering green cup sequins on leaf vines, and iridescent pearl centers.',
    craftsmanshipBullet: 'Hand-painted freehand on wooden karchob frames with non-stiffening botanical pigments.',
  },
  {
    id: 'gulab-champagne',
    name: 'Gulab-e-Noor · Champagne Ivory',
    tagline: 'Your uploaded champagne botanical rose tissue dupatta with soft watercolor petals, freshwater pearl moti, and zardozi scalloped kiran fringe.',
    pricePKR: 8200,
    baseColor: 'Warm Ivory & Rose Gold',
    fabricName: 'Pure Metallic Tissue Silk',
    primaryImage: '/assets/aistudio/Elegant_Embroidered_Dupatta_Portrait_24f2dee4.png',
    textureImage: '/assets/aistudio/54bde74e-4ee7-417c-824e-d724af23349e_1992fceb.jpeg',
    macroFlower: '/assets/aistudio/54bde74e-4ee7-417c-824e-d724af23349e_1992fceb.jpeg',
    macroBorder: '/assets/aistudio/69e152b9-04c3-42b2-a312-b30b86bd59b5_7836dd34.jpeg',
    accentColor: '#8B6420',
    pillColor: 'bg-[#8B6420] text-white',
    description: 'Exact physical product reference: Warm ivory and champagne metallic tissue with hand-painted blush watercolor roses, fine sitara sequins, and pearl moti stamen needlework.',
    craftsmanshipBullet: 'Original editorial campaign reference with full haveli studio atmosphere and chandelier pearl earrings.',
  },
];

export const FASHION_POSES: FashionPose[] = [
  {
    id: 1,
    code: 'POSE-01',
    name: 'Signature Full-Length Frontal',
    poseCategory: 'Campaign Hero · 4:5 Full Length',
    framing: 'Full-length vertical portrait (4:5 ratio)',
    focalPoint: 'Symmetrical shoulder drape & dual ornate pallu panels',
    editorialDescription:
      'Standing gracefully in a serene frontal stance with confident gaze. The dupatta is draped symmetrically over both shoulders, cascading past the knees in long fluid waterfalls that display both hand-painted floral panels and the delicate gold kiran lace border against her champagne raw-silk outfit.',
    draperyTechnique: 'Dual shoulder cascade with front pallu extension and rear floor veil.',
    craftFocus: 'Full balance of hand-painted floral spacing, metallic tissue sheen, and bottom border fringe.',
    lightingRecommendation: 'Soft Natural Daylight Studio with delicate ambient ground reflection.',
    containerAspect: 'aspect-[4/5]',
    modelScale: 'scale-100',
    modelPosition: 'object-center',
    overlayTransform: 'inset-0 translate-y-0',
    drapeClipPath: 'polygon(18% 18%, 82% 18%, 88% 98%, 70% 98%, 50% 68%, 30% 98%, 12% 98%)',
    drapeOpacity: 0.88,
    borderPosition: 'bottom-0 left-0 right-0 h-12',
  },
  {
    id: 2,
    code: 'POSE-02',
    name: 'Elegant 3/4 Side Turn & Border Hold',
    poseCategory: 'Artisanal Display · 3/4 Length',
    framing: 'Three-quarter vertical portrait (knees up)',
    focalPoint: 'Slender hand holding the sheer gold kiran lace border',
    editorialDescription:
      'Model turns gracefully 45 degrees to her side with a subtle profile silhouette. Her slender manicured hand gently lifts and holds the outer scalloped edge of the dupatta away from her body, allowing the light to pass through the sheer tissue and illuminate the hand-painted 5-petal blossoms.',
    draperyTechnique: 'Gathered on the left shoulder, lifted horizontally by the right hand to display border lace.',
    craftFocus: 'Hand-painted 5-petal purple motifs, radiating pearl moti lines, and scalloped gold lace.',
    lightingRecommendation: 'Golden Hour Rim Lighting illuminating the translucent fabric fibers.',
    containerAspect: 'aspect-[4/5]',
    modelScale: 'scale-110 -translate-x-2',
    modelPosition: 'object-top',
    overlayTransform: 'top-10 left-12 right-0 bottom-4',
    drapeClipPath: 'polygon(30% 12%, 95% 25%, 90% 95%, 45% 90%, 15% 55%)',
    drapeOpacity: 0.92,
    borderPosition: 'bottom-4 right-4 w-48 h-10 rotate-[-12deg]',
  },
  {
    id: 3,
    code: 'POSE-03',
    name: 'Dupatta Wingspan & Pattern Spread',
    poseCategory: 'Product Architecture · Wide Spread',
    framing: 'Medium-wide vertical editorial (4:5 ratio)',
    focalPoint: 'Full 2.75m width revealed with repeating hand-painted flowers',
    editorialDescription:
      'Model raises both arms softly outward in a majestic swan-like posture, opening the full width of the sheer dupatta toward the lens. The sheer fabric extends across the frame like a translucent painting, displaying every hand-painted flower, leafy vine, and twinkling gold sitara constellation.',
    draperyTechnique: 'Full width wingspan drape held at both top corners with natural draped dip in center.',
    craftFocus: 'Exposes the full design repeat, fabric transparency, and consistent seed pearl placement.',
    lightingRecommendation: 'High-key diffused fashion studio light with clean ambient clarity.',
    containerAspect: 'aspect-[4/5]',
    modelScale: 'scale-95 translate-y-2',
    modelPosition: 'object-center',
    overlayTransform: 'inset-2',
    drapeClipPath: 'polygon(5% 15%, 95% 15%, 92% 85%, 8% 85%)',
    drapeOpacity: 0.85,
    borderPosition: 'bottom-2 left-2 right-2 h-14',
  },
  {
    id: 4,
    code: 'POSE-04',
    name: 'Graceful Walking Stride in Motion',
    poseCategory: 'Movement & Dynamics · Full Length',
    framing: 'Action editorial full-length (4:5 ratio)',
    focalPoint: 'Billowing lightweight tissue & fluttering kiran fringe',
    editorialDescription:
      'Captured in effortless motion walking forward across the sunlit haveli marble. The sheer metallic tissue catches the gentle draft, billowing weightlessly behind her shoulder in soft cascading ripples while the metallic kiran fringe sways with rhythmic Pakistani festive grace.',
    draperyTechnique: 'Single-shoulder dynamic trailing cape with wind-blown fold dynamics.',
    craftFocus: 'Demonstrates featherweight tissue softness and high tensile drape in authentic motion.',
    lightingRecommendation: 'Dramatic architectural haveli sunlight with long warm shadows.',
    containerAspect: 'aspect-[4/5]',
    modelScale: 'scale-105 translate-x-3',
    modelPosition: 'object-center',
    overlayTransform: 'top-6 -left-6 right-8 bottom-0',
    drapeClipPath: 'polygon(40% 10%, 85% 30%, 98% 95%, 55% 98%, 20% 70%, 10% 35%)',
    drapeOpacity: 0.89,
    borderPosition: 'bottom-2 left-6 right-10 h-12 skew-x-6',
  },
  {
    id: 5,
    code: 'POSE-05',
    name: 'Shoulder & Neckline Macro Focus',
    poseCategory: 'Needlework Close-Up · Bust Crop',
    framing: 'Intimate bust and collarbone crop (4:5 ratio)',
    focalPoint: 'Micro seed-pearl moti, cupped sitaras & gold lace border',
    editorialDescription:
      'Close-up camera positioning on the model’s neckline, ear with chandelier pearl earrings, and the delicate folds of the dupatta gathered on her shoulder. Every individual seed-pearl moti stitched along the floral petals is visible in breathtaking macro sharpness.',
    draperyTechnique: 'Pleated and pinned on the left shoulder falling down the chest contour.',
    craftFocus: 'Extreme needlework inspection: seed pearl stamen, gold sitara tacks, and sheer warp fibers.',
    lightingRecommendation: 'Directional macro ring light with warm amber side kicker.',
    containerAspect: 'aspect-[4/5]',
    modelScale: 'scale-175 -translate-y-16 -translate-x-4',
    modelPosition: 'object-top',
    overlayTransform: 'top-20 left-4 right-4 bottom-10',
    drapeClipPath: 'polygon(15% 10%, 85% 10%, 95% 95%, 5% 95%)',
    drapeOpacity: 0.94,
    borderPosition: 'top-24 left-6 right-6 h-10',
  },
  {
    id: 6,
    code: 'POSE-06',
    name: 'Back Waterfall & Rear Shoulder Cascade',
    poseCategory: 'Rear Silhouette · 3/4 Length',
    framing: 'Three-quarter rear angle (knees up)',
    focalPoint: 'Sheer cascade flowing over dark hair and down the back',
    editorialDescription:
      'Model is posed facing away and looking back over her right shoulder with an alluring, regal expression. The dupatta cascades down her spine in layered transparent sheets, showcasing the symmetry of the hand-painted border against her dark low chignon and ivory silk back.',
    draperyTechnique: 'Draped over head or high shoulders, falling in a long uninterrupted veil down the spine.',
    craftFocus: 'Proves back-border craftsmanship, uniform embroidery, and reverse-side neatness.',
    lightingRecommendation: 'Atmospheric Chandelier Evening Glow highlighting metallic tissue threads.',
    containerAspect: 'aspect-[4/5]',
    modelScale: 'scale-108 -scale-x-100',
    modelPosition: 'object-center',
    overlayTransform: 'inset-y-4 inset-x-8',
    drapeClipPath: 'polygon(25% 15%, 75% 15%, 85% 95%, 15% 95%)',
    drapeOpacity: 0.9,
    borderPosition: 'bottom-4 left-10 right-10 h-12',
  },
  {
    id: 7,
    code: 'POSE-07',
    name: 'Seated Luxury Haveli Armchair Pose',
    poseCategory: 'Bridal Formal · Seated Medium',
    framing: 'Medium-wide seated portrait (4:5 ratio)',
    focalPoint: 'Dupatta pooled luxuriously across lap and flowing to floor',
    editorialDescription:
      'Model is seated comfortably on a hand-carved vintage rosewood haveli armchair. The hand-painted tissue dupatta is softly arranged across her lap in rich voluminous gathers, with one end trailing over the polished wooden armrest to touch the vintage floor.',
    draperyTechnique: 'Seated regal lap spread with waterfall side pool over chair armrest.',
    craftFocus: 'Shows how the dupatta drapes in seated formal settings (Nikkah, Mehndi, Eid formal dinners).',
    lightingRecommendation: 'Warm interior ambient haveli lighting with soft golden candlelight.',
    containerAspect: 'aspect-[4/5]',
    modelScale: 'scale-105 translate-y-6',
    modelPosition: 'object-center',
    overlayTransform: 'top-16 inset-x-4 bottom-2',
    drapeClipPath: 'polygon(15% 30%, 85% 25%, 95% 98%, 5% 98%)',
    drapeOpacity: 0.92,
    borderPosition: 'bottom-2 left-4 right-4 h-12',
  },
  {
    id: 8,
    code: 'POSE-08',
    name: 'Gossamer Veil & Backlit Silhouette',
    poseCategory: 'Haute Couture · Backlit Sheer Veil',
    framing: 'Dramatic silhouette portrait (4:5 ratio)',
    focalPoint: 'Backlit transparency where painted petals glow against light',
    editorialDescription:
      'High-fashion artistic pose where the model gently lifts the sheer tissue dupatta aloft like a luminous celestial veil. Powerful warm backlight shines through the pure metallic tissue, transforming each translucent petal into stained glass while the golden sitaras sparkle like stars.',
    draperyTechnique: 'Raised veil drape held delicately with fingertips behind the head.',
    craftFocus: 'Magnifies ethereal fabric transparency, metallic sheen, and dense sitara light reflection.',
    lightingRecommendation: 'Strong warm backlight with soft rim glow outlining the silhouette.',
    containerAspect: 'aspect-[4/5]',
    modelScale: 'scale-102 -translate-y-2',
    modelPosition: 'object-top',
    overlayTransform: 'inset-x-2 top-0 bottom-12',
    drapeClipPath: 'polygon(10% 5%, 90% 5%, 95% 75%, 5% 75%)',
    drapeOpacity: 0.82,
    borderPosition: 'top-2 left-2 right-2 h-10',
  },
];

export const FashionPoseCollection: React.FC = () => {
  const { formatPrice, addToCart, setCurrentPage, setSelectedProductId, settings } = useStore();

  const [activePoseIndex, setActivePoseIndex] = useState<number>(0);
  const [selectedDesignId, setSelectedDesignId] = useState<string>('mehfil-fuchsia');
  const [lightingMode, setLightingMode] = useState<'studio' | 'golden' | 'candlelight'>('studio');
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [activeInspectTab, setActiveInspectTab] = useState<'model_pose' | 'handwork_macro' | 'border_kiran' | 'flat_repeat'>('model_pose');

  const currentPose = FASHION_POSES[activePoseIndex];
  const currentDesign =
    DUPATTA_REFERENCE_DESIGNS.find((d) => d.id === selectedDesignId) || DUPATTA_REFERENCE_DESIGNS[0];

  // Base model campaign photo (consistent identity: face, hair bun, chandelier earrings, ivory kurta)
  const baseModelPhoto = '/assets/aistudio/Elegant_Embroidered_Dupatta_Portrait_24f2dee4.png';

  const lightingFilters = {
    studio: {
      filter: 'brightness-100 contrast-100',
      label: 'Natural Studio Light',
      desc: 'True-to-life diffused daylight showing authentic tissue colors and delicate brushstrokes.',
    },
    golden: {
      filter: 'sepia-[0.16] brightness-105 contrast-105 saturate-110',
      label: 'Golden Hour Sunlight',
      desc: 'Warm evening sunbeam reflecting golden sitaras and metallic tissue threads.',
    },
    candlelight: {
      filter: 'brightness-95 contrast-115 saturate-110',
      label: 'Evening Ambient Glow',
      desc: 'Warm festive chandelier illumination revealing high-glamour reflection.',
    },
  };

  const handlePrevPose = () => {
    setActivePoseIndex((prev) => (prev > 0 ? prev - 1 : FASHION_POSES.length - 1));
  };

  const handleNextPose = () => {
    setActivePoseIndex((prev) => (prev < FASHION_POSES.length - 1 ? prev + 1 : 0));
  };

  const handleAddToCart = () => {
    addToCart({
      productId: currentDesign.id === 'mehfil-fuchsia' ? 'prod-mehfil' : currentDesign.id === 'firouzi-seafoam' ? 'prod-emerald-garden' : 'prod-gulab-e-noor',
      name: `${currentDesign.name} (${currentPose.name})`,
      slug: currentDesign.id,
      image: currentDesign.primaryImage,
      pricePKR: currentDesign.pricePKR,
      quantity: 1,
      selectedColor: currentDesign.baseColor,
      selectedFabric: 'Pure Tissue',
      customNotes: `Ordered from Fashion Pose Shoot: ${currentPose.name} (${currentPose.code})`,
    });
  };

  const currentInspectImage =
    activeInspectTab === 'model_pose'
      ? baseModelPhoto
      : activeInspectTab === 'handwork_macro'
      ? currentDesign.macroFlower
      : activeInspectTab === 'border_kiran'
      ? currentDesign.macroBorder
      : currentDesign.textureImage;

  return (
    <div className="w-full bg-[#FAF7F2] rounded-3xl border border-[#E8DEC8] shadow-2xl overflow-hidden">
      {/* 1. EDITORIAL HEADER & STUDIO CONTROLS */}
      <div className="px-6 py-5 bg-gradient-to-r from-[#F4EFE6] via-[#FAF7F2] to-[#ECE3D4] border-b border-[#E2D5BE]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EBE1CF] border border-[#DDD0BC] rounded-full text-[11px] font-semibold uppercase tracking-wider text-[#7A6451] mb-1.5">
              <Camera className="w-3.5 h-3.5 text-[#A87B2E]" />
              <span>Haute Couture Fashion Studio · 8 Signature Editorial Poses</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#251E1A]">
              Model Pose Studio · Authentic Dupatta Replacement
            </h2>
            <p className="text-xs text-[#786658] mt-0.5 max-w-2xl">
              Consistent Pakistani female model featuring your exact uploaded hand-painted tissue dupatta with 100% preservation of colors, 5-petal floral motifs, pearl motis, and gold kiran lace border across 8 distinct fashion poses.
            </p>
          </div>

          {/* Lighting Controls */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-[#DDD0BC] shadow-xs self-start lg:self-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8A796C] px-2 hidden sm:inline">
              Lighting:
            </span>
            <button
              onClick={() => setLightingMode('studio')}
              className={`px-3 py-1.5 text-xs rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                lightingMode === 'studio'
                  ? 'bg-[#251E1A] text-white shadow-xs font-medium'
                  : 'text-[#69584B] hover:text-[#251E1A]'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Natural Daylight</span>
            </button>
            <button
              onClick={() => setLightingMode('golden')}
              className={`px-3 py-1.5 text-xs rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                lightingMode === 'golden'
                  ? 'bg-[#A87B2E] text-white shadow-xs font-medium'
                  : 'text-[#69584B] hover:text-[#251E1A]'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Golden Hour</span>
            </button>
            <button
              onClick={() => setLightingMode('candlelight')}
              className={`px-3 py-1.5 text-xs rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                lightingMode === 'candlelight'
                  ? 'bg-[#3D2516] text-[#EAD8B7] shadow-xs font-medium'
                  : 'text-[#69584B] hover:text-[#251E1A]'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Evening Glow</span>
            </button>
          </div>
        </div>

        {/* 2. DUPATTA DESIGN SWATCH PICKER (Directly switch between user's authentic products) */}
        <div className="mt-5 pt-4 border-t border-[#E5DAC6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#635345]">
            <Palette className="w-4 h-4 text-[#A87B2E]" />
            <span>Select Product Reference Worn by Model:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {DUPATTA_REFERENCE_DESIGNS.map((design) => {
              const isSelected = design.id === selectedDesignId;
              return (
                <button
                  key={design.id}
                  onClick={() => setSelectedDesignId(design.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#A87B2E] text-[#251E1A] shadow-md ring-1 ring-[#A87B2E]/40 font-semibold'
                      : 'bg-white/70 border-[#DDD0BC] text-[#69584B] hover:bg-white'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/20"
                    style={{ backgroundColor: design.accentColor }}
                  />
                  <span>{design.name.split('·')[0].trim()}</span>
                  <span className="text-[10px] text-[#8C7A6B]">({formatPrice(design.pricePKR)})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. MAIN EDITORIAL DISPLAY & POSE CANVAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column: 4:5 Vertical Editorial Model Canvas (7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-8 flex flex-col items-center justify-center bg-[#1D1714] relative">
          {/* Main 4:5 Portrait Stage */}
          <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10 select-none group bg-[#2A221C]">
            {/* Layer 1: Consistent South Asian Fashion Model in Plain Ivory Kurta */}
            <img
              src={baseModelPhoto}
              alt="South Asian fashion model wearing hand-painted tissue dupatta"
              className={`w-full h-full object-cover transition-all duration-700 ${lightingFilters[lightingMode].filter} ${currentPose.modelScale} ${currentPose.modelPosition}`}
              referrerPolicy="no-referrer"
            />

            {/* Layer 2: Authentic Hand-Painted Dupatta Tissue Overlay (Exact Colors & Motifs) */}
            {selectedDesignId !== 'gulab-champagne' && (
              <div
                className={`absolute pointer-events-none transition-all duration-700 mix-blend-multiply filter contrast-125 saturate-110 ${currentPose.overlayTransform}`}
                style={{
                  clipPath: currentPose.drapeClipPath,
                  opacity: currentPose.drapeOpacity,
                }}
              >
                <img
                  src={currentDesign.primaryImage}
                  alt={currentDesign.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Layer 3: Realistic Sheer Sheen & Metallic Specular Highlights */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

            {/* Top Badges */}
            <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
              <div className="bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                <span className="text-[11px] font-semibold tracking-wider uppercase font-serif-luxury">
                  {currentPose.code} · {currentPose.poseCategory.split('·')[0].trim()}
                </span>
              </div>
            </div>

            {/* Macro Zoom Trigger Button */}
            <button
              onClick={() => setZoomImage(currentDesign.primaryImage)}
              className="absolute top-4 right-4 z-30 bg-white/95 hover:bg-white text-[#251E1A] p-2 rounded-full shadow-xl transition-transform hover:scale-105 cursor-pointer flex items-center gap-1.5 text-xs font-semibold px-3"
            >
              <ZoomIn className="w-3.5 h-3.5 text-[#A87B2E]" />
              <span className="hidden sm:inline">Macro Zoom Lens</span>
            </button>

            {/* Bottom In-Canvas Editorial Card */}
            <div className="absolute bottom-4 left-4 right-4 z-30 bg-black/80 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-white space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#D4AF37] font-serif-luxury">
                  {currentPose.name}
                </p>
                <span className="text-[10px] text-white/70 font-mono">
                  Pose {activePoseIndex + 1} of {FASHION_POSES.length}
                </span>
              </div>
              <p className="text-xs text-white/90 line-clamp-2">
                {currentPose.editorialDescription}
              </p>
            </div>

            {/* Previous / Next Pose Navigation Arrows on Canvas */}
            <button
              onClick={handlePrevPose}
              aria-label="Previous Pose"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextPose}
              aria-label="Next Pose"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Model Consistency Seal Below Canvas */}
          <div className="mt-4 flex items-center gap-3 text-xs text-[#E5D7C7]/80 bg-white/5 border border-white/10 rounded-xl px-4 py-2 max-w-md w-full">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span className="text-[11px] leading-tight">
              <strong>Model Identity Preserved:</strong> Consistent South Asian facial structure, loose low bun, gold-pearl chandelier earrings & champagne raw-silk ensemble.
            </span>
          </div>
        </div>

        {/* Right Column: Pose Specifications, Craftsmanship Verification & Ordering (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Pose Title & Badges */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold text-[#A87B2E] tracking-wider">
                  {currentPose.code}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#EFE8DC] text-[#7A6451] font-medium border border-[#DDD0BC]">
                  {currentPose.poseCategory}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#251E1A] leading-tight">
                {currentPose.name}
              </h3>
              <p className="text-xs text-[#7A6657] mt-1 leading-relaxed">
                {currentPose.editorialDescription}
              </p>
            </div>

            {/* Price Strip */}
            <div className="flex items-baseline justify-between pb-3 border-b border-[#E8DEC8]">
              <div>
                <p className="text-[11px] text-[#8C7A6B] uppercase tracking-wider font-medium">
                  {currentDesign.name}
                </p>
                <p className="text-2xl sm:text-3xl font-mono font-semibold text-[#8B6420]">
                  {formatPrice(currentDesign.pricePKR)}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 bg-[#E8F3E5] text-[#3D7133] rounded-lg text-[11px] font-semibold">
                  Handmade to Order
                </span>
                <p className="text-[10px] text-[#8C7A6B] mt-0.5">3-8 Business Days</p>
              </div>
            </div>

            {/* Pose & Craftsmanship Editorial Specs */}
            <div className="space-y-2.5 bg-[#F5EFE6] p-4 rounded-xl border border-[#E5DAC6] text-xs text-[#524135]">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#A87B2E] shrink-0 mt-0.5" />
                <div>
                  <strong>Draping Technique:</strong> {currentPose.draperyTechnique}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#A87B2E] shrink-0 mt-0.5" />
                <div>
                  <strong>Product Details Visible:</strong> {currentPose.craftFocus}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#A87B2E] shrink-0 mt-0.5" />
                <div>
                  <strong>Recommended Illumination:</strong> {currentPose.lightingRecommendation}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#A87B2E] shrink-0 mt-0.5" />
                <div>
                  <strong>Needlework Detail:</strong> {currentDesign.craftsmanshipBullet}
                </div>
              </div>
            </div>

            {/* Authentic Detail Inspection Thumbnails */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#635345]">
                  Macro Textile Inspection
                </label>
                <span className="text-[10px] text-[#A87B2E] font-medium">Click to examine texture</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setZoomImage(currentDesign.primaryImage)}
                  className="aspect-square rounded-lg overflow-hidden border border-[#DDD0BC] hover:border-[#A87B2E] relative group cursor-pointer"
                  title="Full Hand-Painted Artwork"
                >
                  <img
                    src={currentDesign.primaryImage}
                    alt="Artwork"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-black/65 text-[9px] text-white py-0.5 text-center">
                    Artwork
                  </span>
                </button>

                <button
                  onClick={() => setZoomImage(currentDesign.macroFlower)}
                  className="aspect-square rounded-lg overflow-hidden border border-[#DDD0BC] hover:border-[#A87B2E] relative group cursor-pointer"
                  title="5-Petal Flower & Moti"
                >
                  <img
                    src={currentDesign.macroFlower}
                    alt="Flower"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-black/65 text-[9px] text-white py-0.5 text-center">
                    Petals & Moti
                  </span>
                </button>

                <button
                  onClick={() => setZoomImage(currentDesign.macroBorder)}
                  className="aspect-square rounded-lg overflow-hidden border border-[#DDD0BC] hover:border-[#A87B2E] relative group cursor-pointer"
                  title="Gold Kiran Lace Fringe"
                >
                  <img
                    src={currentDesign.macroBorder}
                    alt="Kiran Lace"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-black/65 text-[9px] text-white py-0.5 text-center">
                    Kiran Lace
                  </span>
                </button>

                <button
                  onClick={() => setZoomImage(currentDesign.textureImage)}
                  className="aspect-square rounded-lg overflow-hidden border border-[#DDD0BC] hover:border-[#A87B2E] relative group cursor-pointer"
                  title="Sheer Metallic Weave"
                >
                  <img
                    src={currentDesign.textureImage}
                    alt="Weave"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-black/65 text-[9px] text-white py-0.5 text-center">
                    Tissue Weave
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Direct Order CTAs */}
          <div className="space-y-3 pt-4 border-t border-[#E8DEC8]">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-[#251E1A] hover:bg-[#3D3027] text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>Add Dupatta to Bag</span>
              </button>

              <button
                onClick={() => {
                  setSelectedProductId(
                    currentDesign.id === 'mehfil-fuchsia'
                      ? 'prod-mehfil'
                      : currentDesign.id === 'firouzi-seafoam'
                      ? 'prod-emerald-garden'
                      : 'prod-gulab-e-noor'
                  );
                  setCurrentPage('product-detail');
                }}
                className="px-4 py-3.5 border border-[#DDD0BC] bg-white hover:bg-[#FAF8F5] text-[#251E1A] font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Full Story</span>
              </button>
            </div>

            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                `Hello Zaib Than Collection! I am ordering "${currentDesign.name}" as styled in ${currentPose.name} (${currentPose.code}, ${formatPrice(
                  currentDesign.pricePKR
                )}). Could you please verify availability and custom color options?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire This Exact Model Look on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4. INTERACTIVE 8-POSE GALLERY STRIP (Quick Switcher) */}
      <div className="p-6 bg-[#F4EFE6] border-t border-[#E2D5BE]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#524135]">
            <Layers className="w-4 h-4 text-[#A87B2E]" />
            <span>Browse All 8 Fashion Poses</span>
          </div>
          <span className="text-[11px] text-[#7A6451]">
            Click any pose to view model staging & drapery architecture
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {FASHION_POSES.map((pose, index) => {
            const isSelected = index === activePoseIndex;
            return (
              <button
                key={pose.id}
                onClick={() => setActivePoseIndex(index)}
                className={`relative rounded-xl overflow-hidden border p-2 flex flex-col items-center text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#A87B2E] shadow-md ring-2 ring-[#A87B2E]/50'
                    : 'bg-[#FAF7F2] border-[#DDD0BC] hover:bg-white hover:border-[#B5A18C]'
                }`}
              >
                {/* Thumbnail Preview */}
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#241C18] mb-2">
                  <img
                    src={baseModelPhoto}
                    alt={pose.name}
                    className={`w-full h-full object-cover ${pose.modelScale} ${pose.modelPosition}`}
                  />
                  {selectedDesignId !== 'gulab-champagne' && (
                    <div
                      className="absolute inset-0 mix-blend-multiply opacity-80"
                      style={{ clipPath: pose.drapeClipPath }}
                    >
                      <img
                        src={currentDesign.primaryImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <span className="absolute top-1 left-1 bg-black/70 text-white text-[9px] font-mono px-1 py-0.2 rounded">
                    0{pose.id}
                  </span>
                </div>

                <p
                  className={`text-[11px] font-semibold leading-tight line-clamp-1 ${
                    isSelected ? 'text-[#A87B2E]' : 'text-[#251E1A]'
                  }`}
                >
                  {pose.name}
                </p>
                <p className="text-[9px] text-[#7A6657] mt-0.5 line-clamp-1">
                  {pose.poseCategory.split('·')[0].trim()}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {zoomImage && (
        <ZoomModal
          isOpen={!!zoomImage}
          onClose={() => setZoomImage(null)}
          imageUrl={zoomImage}
          title={`${currentDesign.name} · ${currentPose.name}`}
        />
      )}
    </div>
  );
};
