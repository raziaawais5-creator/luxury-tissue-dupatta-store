import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Palette,
  Check,
  Send,
  MessageCircle,
  Upload,
  Calendar,
  DollarSign,
  AlertCircle,
  HelpCircle,
  Eye,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CustomDupattaRequest } from '../types';

export const CustomDesignerPage: React.FC = () => {
  const { formatPrice, submitCustomRequest, settings, setCurrentPage, showToast } = useStore();

  // Step state
  const [activeStep, setActiveStep] = useState<number>(1);

  // Form Fields
  const [baseFabric, setBaseFabric] = useState<string>('Pure Tissue');
  const [baseColor, setBaseColor] = useState<string>('Ivory Cream');
  const [customHex, setCustomHex] = useState<string>('#FAF7F0');
  const [artworkStyle, setArtworkStyle] = useState<string>('Roses and floral vines');
  const [handworkTypes, setHandworkTypes] = useState<string[]>([
    'Gold sitara',
    'White pearl moti',
    'Gold kiran fringe border',
  ]);
  const [embellishmentDensity, setEmbellishmentDensity] = useState<'Light' | 'Medium' | 'Heavy Bridal'>('Medium');
  const [dimensions, setDimensions] = useState<string>('2.75 meters x 1.0 meter (Standard 3 Yards)');
  const [borderStyle, setBorderStyle] = useState<string>('Antique Gold Kiran Fringe');
  const [occasion, setOccasion] = useState<string>('Eid-ul-Fitr / Festive Formal');
  const [budgetRange, setBudgetRange] = useState<string>('Rs. 7,500 - 8,500');
  const [requiredDate, setRequiredDate] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Customer Contact Fields
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerCity, setCustomerCity] = useState<string>('Lahore');
  const [country, setCountry] = useState<string>('Pakistan');

  const [submittedQuote, setSubmittedQuote] = useState<CustomDupattaRequest | null>(null);

  // Options
  const fabrics = [
    { id: 'Pure Tissue', label: 'Pure Metallic Tissue', desc: 'Whisper-light with crystalline golden shimmer' },
    { id: 'Sheer Organza', label: 'Translucent Glass Organza', desc: 'Crisp airy hold that showcases fine brushstrokes' },
    { id: 'Silk Organza', label: 'Pure Silk Organza', desc: 'Soft handfeel with luxurious fluid drape' },
  ];

  const presetColors = [
    { name: 'Ivory Cream', hex: '#FAF7F0', border: '#DDD0BC' },
    { name: 'Champagne Gold', hex: '#F0E6D2', border: '#D9C8AA' },
    { name: 'Blush Rose', hex: '#F8E1E7', border: '#E8BFCA' },
    { name: 'Soft Peach', hex: '#FBE8DC', border: '#E8C5B0' },
    { name: 'Mint Pistachio', hex: '#E2EFE4', border: '#BCD4C0' },
    { name: 'Emerald Jewel', hex: '#1C4A36', border: '#0F2C20' },
    { name: 'Royal Rani Fuchsia', hex: '#C2185B', border: '#880E4F' },
    { name: 'Deep Maroon', hex: '#581825', border: '#3A0F17' },
    { name: 'Midnight Jet', hex: '#1C1917', border: '#0C0A09' },
    { name: 'Custom Pantone Hue', hex: customHex, border: '#D4AF37' },
  ];

  const artworkStyles = [
    {
      id: 'Roses and floral vines',
      label: 'Blush Roses & Floral Vines',
      desc: 'English and Persian roses blooming along meandering green leafy vines.',
    },
    {
      id: 'Botanical leaves',
      label: 'Botanical Leaves & Foliage',
      desc: 'Graceful emerald fronds and golden stems for a clean modern aesthetic.',
    },
    {
      id: 'Traditional paisley',
      label: 'Traditional Paisley & Kalka Jaal',
      desc: 'Mughal-inspired mango motifs with dense jewel-toned painted infills.',
    },
    {
      id: 'Abstract florals',
      label: 'Abstract Watermark Florals',
      desc: 'Expressive translucent watercolor washes for contemporary fashion.',
    },
    {
      id: 'Scattered blossoms',
      label: 'Scattered Blossom Jaal (Chitta)',
      desc: 'Evenly placed delicate florets and buds across the entire field.',
    },
    {
      id: 'Custom reference design',
      label: 'Custom Reference Match',
      desc: 'Replicate motifs from your bridal dress or family heirloom.',
    },
  ];

  const handworkOptions = [
    { id: 'Gold sitara', label: 'Gold Sitara (Micro Sequins)' },
    { id: 'Silver sitara', label: 'Silver & Crystal Sitara' },
    { id: 'White pearl moti', label: 'Freshwater White Pearl Moti' },
    { id: 'Colored pearls', label: 'Hand-Dyed Pastel Pearls' },
    { id: 'Cutdana & beads', label: 'Japanese Glass Cutdana & Seed Beads' },
    { id: 'Mirror work (Aabla)', label: 'Real Mirror Work (Aabla Medallions)' },
    { id: 'Gold kiran fringe border', label: 'Traditional Gold Kiran Fringe' },
    { id: 'Embellished scalloped border', label: 'Embroidered Scalloped Edge' },
  ];

  const borderStyles = [
    'Antique Gold Kiran Fringe',
    'Baby Scalloped Zari Edge',
    'Broad Four-Sided Gota Patti',
    'Double Fringe Kiran & Cutwork',
    'Delicate Micro Piping Only',
  ];

  const occasions = [
    'Eid-ul-Fitr / Festive Formal',
    'Nikkah Ceremony',
    'Mehndi & Mayun',
    'Barat / Walima Bridal',
    'Formal Evening / Party',
    'Heirloom Gift for Bride',
  ];

  // Dynamic price calculation estimate based on user choices (around 8 thousand PKR)
  const calculateEstimatedPrice = () => {
    let base = 7200;
    if (baseFabric === 'Pure Tissue') base += 600;
    if (baseFabric === 'Silk Organza') base += 800;

    if (embellishmentDensity === 'Medium') base += 500;
    if (embellishmentDensity === 'Heavy Bridal') base += 1000;

    if (handworkTypes.includes('Mirror work (Aabla)')) base += 300;
    if (handworkTypes.includes('Gold kiran fringe border')) base += 300;
    if (dimensions.includes('3.0 meters')) base += 400;

    return base;
  };

  const estimatedPricePKR = calculateEstimatedPrice();

  const toggleHandwork = (type: string) => {
    setHandworkTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
      showToast(`Attached reference design: ${e.target.files[0].name}`);
    }
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerEmail) {
      showToast('Please provide your name, phone number, and email.');
      return;
    }

    const newQuote = submitCustomRequest({
      customerName,
      customerEmail,
      customerPhone,
      customerCity,
      country,
      baseFabric,
      baseColor,
      customHex,
      artworkStyle,
      handworkTypes,
      embellishmentDensity,
      dimensions,
      borderStyle,
      occasion,
      budgetRange,
      requiredDate: requiredDate || 'Flexible',
      specialInstructions,
      referenceImageName: uploadedFileName || undefined,
      estimatedPricePKR,
    });

    setSubmittedQuote(newQuote);
  };

  const generateWhatsAppMessage = () => {
    const text =
      `*CUSTOM DUPATTA DESIGN INQUIRY — ZAIB THAN COLLECTION*\n\n` +
      `*Customer:* ${customerName || 'Bespoke Client'}\n` +
      `*City/Country:* ${customerCity}, ${country}\n` +
      `*Base Fabric:* ${baseFabric}\n` +
      `*Color:* ${baseColor} (${customHex})\n` +
      `*Artwork Style:* ${artworkStyle}\n` +
      `*Embellishment Work:* ${handworkTypes.join(', ')}\n` +
      `*Density:* ${embellishmentDensity}\n` +
      `*Border Style:* ${borderStyle}\n` +
      `*Dimensions:* ${dimensions}\n` +
      `*Occasion:* ${occasion}\n` +
      `*Required Date:* ${requiredDate || 'Flexible'}\n` +
      `*Estimated Range:* ${formatPrice(estimatedPricePKR)}\n\n` +
      `*Special Notes:* ${specialInstructions || 'None'}\n\n` +
      `Please review this design and let me know about fabric swatches and production slot.`;
    return encodeURIComponent(text);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFE7DA] border border-[#DDD0BC] rounded-full text-xs font-semibold uppercase tracking-wider text-[#7A6451]">
          <Sparkles className="w-3.5 h-3.5 text-[#A87B2E]" />
          <span>Interactive Bespoke Studio</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif-luxury font-medium text-[#251E1A]">
          Design Your Own Dupatta
        </h1>
        <p className="text-xs sm:text-sm text-[#736355] leading-relaxed">
          Craft an original Pakistani heirloom tailored to your festive outfit. Select your fabric,
          hand-painted florals, sitara density, and border kiran lace.
        </p>
      </div>

      {submittedQuote ? (
        /* Submission Success View */
        <div className="max-w-2xl mx-auto bg-[#FAF7F2] p-8 sm:p-12 rounded-3xl border border-[#E2D5BE] shadow-xl text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-[#E8F0E4] text-[#2F6B38] flex items-center justify-center mx-auto">
            <Check className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-[#A87B2E]">Reference ID: {submittedQuote.id}</span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#251E1A]">
              Commission Request Received
            </h2>
            <p className="text-xs sm:text-sm text-[#6A5A4E] leading-relaxed">
              Thank you, <strong>{submittedQuote.customerName}</strong>! Our master artisan in Lahore
              is reviewing your specifications for <strong>{submittedQuote.baseColor} {submittedQuote.baseFabric}</strong>.
            </p>
          </div>

          {/* Selections Summary Card */}
          <div className="p-5 bg-white rounded-2xl border border-[#E8DEC8] text-left text-xs space-y-2 text-[#4A3B31]">
            <div className="flex justify-between py-1 border-b border-[#F0E6D8]">
              <span className="text-[#8C7A6B]">Estimated Atelier Price:</span>
              <span className="font-mono font-semibold text-[#8B6420]">
                {formatPrice(submittedQuote.estimatedPricePKR)}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F0E6D8]">
              <span className="text-[#8C7A6B]">Artwork Style:</span>
              <span className="font-medium">{submittedQuote.artworkStyle}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F0E6D8]">
              <span className="text-[#8C7A6B]">Embellishments:</span>
              <span className="font-medium">{submittedQuote.handworkTypes.join(', ')}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#8C7A6B]">Target Date:</span>
              <span className="font-medium">{submittedQuote.requiredDate}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${generateWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Design on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setSubmittedQuote(null);
                setCurrentPage('shop');
              }}
              className="flex-1 py-3.5 bg-[#251E1A] hover:bg-[#3D3027] text-white font-semibold text-xs rounded-xl transition-colors"
            >
              Return to Catalog
            </button>
          </div>

          <p className="text-[11px] text-[#8C7A6B]">
            *Final price and delivery timeline will be confirmed once our artisan reviews your color swatch and motif density.
          </p>
        </div>
      ) : (
        /* Interactive Configurator Split View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Real-Time Dynamic Visual Preview & Model Canvas */}
          <div className="lg:col-span-5 bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DEC8] shadow-sm space-y-6 lg:sticky lg:top-28">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#635345]">
                Atelier Live Preview
              </h3>
              <span className="text-xs font-mono font-medium text-[#8B6420]">
                Est. {formatPrice(estimatedPricePKR)}
              </span>
            </div>

            {/* Simulated Live Drape Canvas */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#241C18] border border-[#DDD0BC] shadow-inner flex flex-col justify-end p-6 select-none">
              {/* Studio Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#2E241E] to-[#14100D] opacity-90"></div>

              {/* Model Silhouette Outline */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-80 flex flex-col items-center opacity-85">
                <div className="w-16 h-20 rounded-full bg-[#CAA084] shadow-md relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-6 bg-[#1A1412] rounded-t-full"></div>
                </div>
                <div className="w-8 h-6 bg-[#BA9175]"></div>
                {/* Outfit Base */}
                <div className="w-44 h-56 rounded-t-3xl bg-[#FAF6EE] shadow-xl relative overflow-hidden border-t border-white/30">
                  <div className="w-16 h-20 border-b border-x border-[#D4AF37]/50 rounded-b-full mx-auto"></div>
                </div>
              </div>

              {/* Dynamic Chosen Fabric Layer */}
              <div
                className="absolute inset-0 transition-colors duration-500 opacity-75 mix-blend-multiply"
                style={{ backgroundColor: customHex }}
              ></div>

              {/* Hand-painted artwork pattern representation */}
              <div
                className="absolute inset-0 opacity-80 mix-blend-screen bg-cover bg-center transition-all duration-500"
                style={{
                  backgroundImage:
                    artworkStyle.includes('Roses')
                      ? "url('/assets/aistudio/54bde74e-4ee7-417c-824e-d724af23349e_1992fceb.jpeg')"
                      : artworkStyle.includes('Paisley')
                      ? "url('/assets/aistudio/9b6b89f0-ad30-4a2a-b536-a50d80f1b78e_94496726.jpeg')"
                      : artworkStyle.includes('Blossom')
                      ? "url('/assets/aistudio/3d7cc8d5-784b-47e4-b547-0b01757454b9_4d7d4aac.jpeg')"
                      : "url('/assets/aistudio/4ee99e31-41a3-4c5f-b9ce-8b6e7c2ad2d8_65bfbd9c.jpeg')",
                }}
              ></div>

              {/* Sitara Shimmer Dots according to density */}
              <div className="absolute inset-0 pointer-events-none">
                <span className="absolute top-1/3 left-1/4 w-2 h-2 bg-[#FFF8DC] rounded-full shadow-[0_0_8px_#FFF] animate-ping opacity-80"></span>
                <span className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-[#FFD700] rounded-full shadow-[0_0_6px_#FFD700] animate-pulse"></span>
                {embellishmentDensity !== 'Light' && (
                  <>
                    <span className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-[#FFF8DC] rounded-full animate-ping opacity-70"></span>
                    <span className="absolute top-1/4 left-2/3 w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
                  </>
                )}
                {embellishmentDensity === 'Heavy Bridal' && (
                  <>
                    <span className="absolute top-3/4 left-1/2 w-2 h-2 bg-[#FFF8DC] rounded-full animate-ping opacity-90"></span>
                    <span className="absolute top-2/5 left-1/5 w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-pulse"></span>
                  </>
                )}
              </div>

              {/* Bottom Kiran Border Trim Overlay */}
              <div
                className="absolute bottom-0 inset-x-0 h-10 pointer-events-none opacity-90"
                style={{
                  backgroundImage: "url('/assets/aistudio/69e152b9-04c3-42b2-a312-b30b86bd59b5_7836dd34.jpeg')",
                  backgroundSize: 'contain',
                  backgroundRepeat: 'repeat-x',
                  backgroundPosition: 'bottom',
                }}
              ></div>

              {/* Live Status Overlay Card */}
              <div className="relative z-10 bg-black/65 backdrop-blur-md p-3.5 rounded-xl border border-white/15 text-white space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#D4AF37]">{baseColor}</span>
                  <span className="text-[11px] text-white/70">{baseFabric}</span>
                </div>
                <p className="text-[11px] text-white/80 truncate">
                  {artworkStyle} · {embellishmentDensity} Work
                </p>
                <p className="text-[10px] text-white/60 truncate">Border: {borderStyle}</p>
              </div>
            </div>

            {/* Selections Quick Summary */}
            <div className="text-xs space-y-1.5 text-[#635345] bg-[#F4EFE6] p-4 rounded-xl border border-[#E5DAC6]">
              <p className="font-semibold text-[#251E1A] uppercase tracking-wider text-[11px] mb-1">
                Custom Specifications:
              </p>
              <div className="flex justify-between">
                <span>Fabric:</span>
                <span className="font-medium text-[#251E1A]">{baseFabric}</span>
              </div>
              <div className="flex justify-between">
                <span>Color Shade:</span>
                <span className="font-medium text-[#251E1A]">{baseColor}</span>
              </div>
              <div className="flex justify-between">
                <span>Artwork:</span>
                <span className="font-medium text-[#251E1A]">{artworkStyle}</span>
              </div>
              <div className="flex justify-between">
                <span>Work Density:</span>
                <span className="font-medium text-[#251E1A]">{embellishmentDensity}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Step Customization Form */}
          <div className="lg:col-span-7 bg-[#FAF7F2] p-6 sm:p-10 rounded-2xl border border-[#E8DEC8] shadow-sm space-y-8">
            <form onSubmit={handleSubmitQuote} className="space-y-8">
              {/* 1. Base Fabric */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#635345] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#251E1A] text-white flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span>Select Base Fabric</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {fabrics.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setBaseFabric(f.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        baseFabric === f.id
                          ? 'border-[#A87B2E] bg-[#FAF5EB] shadow-xs ring-1 ring-[#A87B2E]/40'
                          : 'border-[#E2D5BF] bg-white hover:border-[#C4B29A]'
                      }`}
                    >
                      <span className="font-medium text-xs text-[#251E1A] block">{f.label}</span>
                      <span className="text-[11px] text-[#786658] leading-tight block mt-1">
                        {f.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Base Color & Pantone */}
              <div className="space-y-3 pt-4 border-t border-[#E8DEC8]">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#635345] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#251E1A] text-white flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>Select Base Color & Swatch</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {presetColors.map((col) => {
                    const isSelected = baseColor === col.name;
                    return (
                      <button
                        key={col.name}
                        type="button"
                        onClick={() => {
                          setBaseColor(col.name);
                          setCustomHex(col.hex);
                        }}
                        className={`p-2 rounded-xl border transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'border-[#A87B2E] bg-[#FAF5EB] ring-1 ring-[#A87B2E]/40 shadow-xs'
                            : 'border-[#E2D5BF] bg-white hover:border-[#C4B29A]'
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full border border-black/15 shadow-inner flex items-center justify-center"
                          style={{ backgroundColor: col.hex }}
                        >
                          {isSelected && <Check className="w-4 h-4 text-[#A87B2E] drop-shadow-sm" />}
                        </div>
                        <span className="text-[11px] font-medium text-[#4A3B31] text-center leading-tight truncate w-full">
                          {col.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Hex Picker Input */}
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#E2D5BF] mt-2">
                  <label htmlFor="hexPicker" className="text-xs text-[#635345] font-medium">
                    Pick Custom Swatch Hue:
                  </label>
                  <input
                    id="hexPicker"
                    type="color"
                    value={customHex}
                    onChange={(e) => {
                      setCustomHex(e.target.value);
                      setBaseColor('Custom Pantone Hue');
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent"
                  />
                  <input
                    type="text"
                    value={customHex}
                    onChange={(e) => {
                      setCustomHex(e.target.value);
                      setBaseColor('Custom Pantone Hue');
                    }}
                    placeholder="#HEXCODE"
                    className="px-2 py-1 text-xs font-mono uppercase bg-[#F7F2E8] border border-[#DDD0BC] rounded text-[#251E1A] w-28 focus:outline-none"
                  />
                  <span className="text-[11px] text-[#8C7A6B] hidden sm:inline">
                    Match with your bridal swatch
                  </span>
                </div>
              </div>

              {/* 3. Hand-Painted Artwork */}
              <div className="space-y-3 pt-4 border-t border-[#E8DEC8]">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#635345] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#251E1A] text-white flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <span>Hand-Painted Floral & Botanical Artwork</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {artworkStyles.map((art) => (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => setArtworkStyle(art.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        artworkStyle === art.id
                          ? 'border-[#A87B2E] bg-[#FAF5EB] shadow-xs ring-1 ring-[#A87B2E]/40'
                          : 'border-[#E2D5BF] bg-white hover:border-[#C4B29A]'
                      }`}
                    >
                      <span className="font-medium text-xs text-[#251E1A] block">{art.label}</span>
                      <span className="text-[11px] text-[#786658] leading-tight block mt-1">
                        {art.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Handwork & Embellishments */}
              <div className="space-y-3 pt-4 border-t border-[#E8DEC8]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#635345] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#251E1A] text-white flex items-center justify-center text-[10px]">
                      4
                    </span>
                    <span>Handwork & Embellishments (Select Multiple)</span>
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {handworkOptions.map((opt) => {
                    const isSelected = handworkTypes.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleHandwork(opt.id)}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-[#A87B2E] bg-[#FAF5EB] text-[#251E1A] font-medium'
                            : 'border-[#E2D5BF] bg-white text-[#69584B] hover:border-[#C4B29A]'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#A87B2E] border-[#A87B2E] text-white'
                              : 'border-[#C4B29A]'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Embellishment Density */}
              <div className="space-y-3 pt-4 border-t border-[#E8DEC8]">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#635345] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#251E1A] text-white flex items-center justify-center text-[10px]">
                    5
                  </span>
                  <span>Embellishment Density</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Light', 'Medium', 'Heavy Bridal'] as const).map((density) => (
                    <button
                      key={density}
                      type="button"
                      onClick={() => setEmbellishmentDensity(density)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        embellishmentDensity === density
                          ? 'border-[#A87B2E] bg-[#FAF5EB] text-[#251E1A] font-medium shadow-xs'
                          : 'border-[#E2D5BF] bg-white text-[#69584B]'
                      }`}
                    >
                      <span className="text-xs block">{density}</span>
                      <span className="text-[10px] text-[#8C7A6B] block mt-0.5">
                        {density === 'Light'
                          ? 'Subtle starlight scatter'
                          : density === 'Medium'
                          ? 'Balanced floral highlight'
                          : 'Rich bridal jaal coverage'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Border Style & Dimensions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E8DEC8]">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#635345] block">
                    6. Preferred Border Style
                  </label>
                  <select
                    value={borderStyle}
                    onChange={(e) => setBorderStyle(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-xs text-[#251E1A] focus:outline-none focus:border-[#A87B2E]"
                  >
                    {borderStyles.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#635345] block">
                    7. Occasion & Gathering
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-xs text-[#251E1A] focus:outline-none focus:border-[#A87B2E]"
                  >
                    {occasions.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 8. Required Delivery Date & Budget Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E8DEC8]">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#635345] block">
                    Required Delivery Date
                  </label>
                  <input
                    type="date"
                    value={requiredDate}
                    onChange={(e) => setRequiredDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-xs text-[#251E1A] focus:outline-none focus:border-[#A87B2E]"
                  />
                  <span className="text-[10px] text-[#8C7A6B]">
                    Recommended: At least 10–14 days before your function.
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#635345] block">
                    Budget Preference
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-xs text-[#251E1A] focus:outline-none focus:border-[#A87B2E]"
                  >
                    <option value="Rs. 7,000 - 8,000">Rs. 7,000 - 8,000 (Festive Minimal)</option>
                    <option value="Rs. 8,000 - 9,000">Rs. 8,000 - 9,000 (Signature Floral & Moti)</option>
                    <option value="Rs. 9,000 - 10,500">Rs. 9,000 - 10,500 (Heavy Handwork & Kiran)</option>
                  </select>
                </div>
              </div>

              {/* 9. Reference Photo Upload & Special Notes */}
              <div className="space-y-3 pt-4 border-t border-[#E8DEC8]">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#635345] block">
                    Upload Outfit Swatch or Floral Sketch (Optional)
                  </label>
                  <div className="border-2 border-dashed border-[#DDD0BC] hover:border-[#A87B2E] rounded-xl p-4 text-center bg-white cursor-pointer transition-colors relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-5 h-5 text-[#A87B2E] mx-auto mb-1" />
                    {uploadedFileName ? (
                      <p className="text-xs font-medium text-[#2F6B38]">Attached: {uploadedFileName}</p>
                    ) : (
                      <p className="text-xs text-[#786658]">
                        Drag and drop or click to upload photo of your peshwas or color sample
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#635345] block">
                    Special Instructions for the Artisan
                  </label>
                  <textarea
                    rows={3}
                    placeholder="E.g., Match the blush pink roses on the right pallu to my Nikkah peshwas. Extra pearl moti on border..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-xs text-[#251E1A] placeholder-[#9E8B7A] focus:outline-none focus:border-[#A87B2E]"
                  />
                </div>
              </div>

              {/* 10. Contact Details & Submission */}
              <div className="p-5 bg-[#F4EFE6] rounded-2xl border border-[#E5DAC6] space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#251E1A]">
                  Your Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs focus:outline-none focus:border-[#A87B2E]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Phone Number *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs focus:outline-none focus:border-[#A87B2E]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs focus:outline-none focus:border-[#A87B2E]"
                  />
                  <input
                    type="text"
                    placeholder="City (e.g. Lahore, Karachi, London) *"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg text-xs focus:outline-none focus:border-[#A87B2E]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-[#251E1A] hover:bg-[#3D3027] text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#D4AF37]" />
                    <span>Request Custom Quote</span>
                  </button>

                  <a
                    href={`https://wa.me/${settings.whatsappNumber}?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Design on WhatsApp</span>
                  </a>
                </div>

                <p className="text-[11px] text-[#8C7A6B] text-center">
                  *Submitting a request does not charge your card. We will contact you to confirm fabric swatches and handcrafting slot before production begins.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
