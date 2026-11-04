import React from 'react';
import { Truck, RotateCcw, ShieldCheck, FileText, CheckCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PoliciesPage: React.FC = () => {
  const { activePolicyTab, setActivePolicyTab, formatPrice, settings } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#A87B2E] font-semibold">
          Customer Care & Transparency
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif-luxury font-medium text-[#251E1A]">
          Boutique Policies
        </h1>
        <p className="text-xs text-[#786658]">
          Review our delivery timelines, custom handmade policies, and service commitments.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E8DEC8] gap-4 sm:gap-8 text-xs font-semibold uppercase tracking-wider overflow-x-auto pb-1">
        <button
          onClick={() => setActivePolicyTab('shipping')}
          className={`pb-3 relative transition-colors whitespace-nowrap cursor-pointer ${
            activePolicyTab === 'shipping'
              ? 'text-[#251E1A] font-bold'
              : 'text-[#8C7A6B] hover:text-[#251E1A]'
          }`}
        >
          <span>Shipping & Delivery</span>
          {activePolicyTab === 'shipping' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A87B2E]"></span>
          )}
        </button>

        <button
          onClick={() => setActivePolicyTab('returns')}
          className={`pb-3 relative transition-colors whitespace-nowrap cursor-pointer ${
            activePolicyTab === 'returns'
              ? 'text-[#251E1A] font-bold'
              : 'text-[#8C7A6B] hover:text-[#251E1A]'
          }`}
        >
          <span>Returns & Custom Orders</span>
          {activePolicyTab === 'returns' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A87B2E]"></span>
          )}
        </button>

        <button
          onClick={() => setActivePolicyTab('privacy')}
          className={`pb-3 relative transition-colors whitespace-nowrap cursor-pointer ${
            activePolicyTab === 'privacy'
              ? 'text-[#251E1A] font-bold'
              : 'text-[#8C7A6B] hover:text-[#251E1A]'
          }`}
        >
          <span>Privacy Policy</span>
          {activePolicyTab === 'privacy' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A87B2E]"></span>
          )}
        </button>

        <button
          onClick={() => setActivePolicyTab('terms')}
          className={`pb-3 relative transition-colors whitespace-nowrap cursor-pointer ${
            activePolicyTab === 'terms'
              ? 'text-[#251E1A] font-bold'
              : 'text-[#8C7A6B] hover:text-[#251E1A]'
          }`}
        >
          <span>Terms & Conditions</span>
          {activePolicyTab === 'terms' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A87B2E]"></span>
          )}
        </button>
      </div>

      {/* Tab 1: Shipping */}
      {activePolicyTab === 'shipping' && (
        <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-6 text-xs sm:text-sm text-[#5C4D41] leading-relaxed">
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#E8DEC8]">
            <Truck className="w-5 h-5 text-[#A87B2E]" />
            <h2 className="font-serif-luxury text-xl font-medium text-[#251E1A]">
              Domestic & Worldwide Shipping
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#251E1A] text-xs uppercase tracking-wider mb-1">
                Pakistan Domestic Shipping
              </h3>
              <p>
                All ready-to-ship dupattas are dispatched from our Lahore atelier within 2 business days. Transit time is 2 to 4 working days via TCS, CallCourier, or Leopard Courier. Standard shipping is {formatPrice(500)}, and <strong>complimentary for orders over {formatPrice(settings.freeShippingThresholdPKR)}</strong>.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#251E1A] text-xs uppercase tracking-wider mb-1">
                Cash on Delivery (COD)
              </h3>
              <p>
                COD is available for all addresses within Pakistan up to {formatPrice(40000)}. For bespoke custom orders requiring custom dyeing, an advance confirmation token of 30% is requested via Bank Transfer or EasyPaisa/JazzCash before painting begins.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#251E1A] text-xs uppercase tracking-wider mb-1">
                International Express Delivery (DHL / FedEx)
              </h3>
              <p>
                We proudly ship our handcrafted dupattas worldwide (including the United States, United Kingdom, Canada, UAE, Saudi Arabia, Australia, and Europe). International delivery takes 4 to 7 business days from dispatch. Flat rate express international shipping is {formatPrice(6500)} ($24 USD approx).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#251E1A] text-xs uppercase tracking-wider mb-1">
                Heirloom Packaging
              </h3>
              <p>
                Each dupatta is steamed, placed inside a breathable unbleached pure cotton muslin storage pouch to protect the kiran fringe, and shipped in a sturdy protective rigid gift box.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Returns & Exchanges */}
      {activePolicyTab === 'returns' && (
        <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-6 text-xs sm:text-sm text-[#5C4D41] leading-relaxed">
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#E8DEC8]">
            <RotateCcw className="w-5 h-5 text-[#A87B2E]" />
            <h2 className="font-serif-luxury text-xl font-medium text-[#251E1A]">
              Handcrafted Exchange & Quality Guarantee
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#251E1A] text-xs uppercase tracking-wider mb-1">
                The Beauty of Handwork
              </h3>
              <p>
                Every Zaib Than Collection dupatta is painted by hand with artist brushes and embellished needle by needle. Subtle natural variations in petal shading, brush density, and motif placement are organic hallmarks of original textile art, not defects.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#251E1A] text-xs uppercase tracking-wider mb-1">
                Transit Damage or Discrepancy Guarantee
              </h3>
              <p>
                If your order arrives damaged or noticeably discrepant from your confirmed specifications, please contact us on WhatsApp within 48 hours of delivery with unboxing photos. We will gladly repair, replace, or re-paint the item at zero additional courier fee.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#251E1A] text-xs uppercase tracking-wider mb-1">
                Bespoke & Custom Dyeing Orders
              </h3>
              <p>
                Custom-dyed orders created specifically to match a customer’s dress fabric or personalized color swatches are made specially for that individual client and cannot be returned for cash refund. However, our atelier offers free adjustments or embellishment touch-ups to ensure your celebration outfit looks perfect.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Privacy */}
      {activePolicyTab === 'privacy' && (
        <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-6 text-xs sm:text-sm text-[#5C4D41] leading-relaxed">
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#E8DEC8]">
            <ShieldCheck className="w-5 h-5 text-[#A87B2E]" />
            <h2 className="font-serif-luxury text-xl font-medium text-[#251E1A]">
              Privacy & Data Protection
            </h2>
          </div>

          <p>
            At Zaib Than Collection, we treat your privacy with the utmost respect. We only collect the necessary customer name, contact telephone, email, and shipping address required to handcraft and deliver your order, and to communicate courier tracking codes.
          </p>
          <p>
            We never sell, rent, or trade your personal information with external advertising brokers. Payment details processed via cards are handled directly through bank-grade PCI-DSS encrypted payment gateways.
          </p>
        </div>
      )}

      {/* Tab 4: Terms */}
      {activePolicyTab === 'terms' && (
        <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-6 text-xs sm:text-sm text-[#5C4D41] leading-relaxed">
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#E8DEC8]">
            <FileText className="w-5 h-5 text-[#A87B2E]" />
            <h2 className="font-serif-luxury text-xl font-medium text-[#251E1A]">
              Terms & Conditions
            </h2>
          </div>

          <p>
            By placing an order through the Zaib Than Collection boutique website or via our concierge WhatsApp line, you agree to our handcrafted production timelines and care guidelines.
          </p>
          <p>
            Because metallic tissue and sheer organza are delicate luxury fibers, garments must be strictly dry cleaned by professional cleaners and stored folded in muslin away from sharp jewelry friction. Zaib Than Collection is not liable for damage arising from home machine washing or direct hot iron contact on metallic tissue threads.
          </p>
        </div>
      )}
    </div>
  );
};
