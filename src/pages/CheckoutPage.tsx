import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  Building,
  Check,
  ArrowRight,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotalPKR,
    appliedDiscount,
    formatPrice,
    currency,
    placeOrder,
    setCurrentPage,
    settings,
    showToast,
  } = useStore();

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lahore');
  const [country, setCountry] = useState('Pakistan');
  const [postalCode, setPostalCode] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer' | 'card'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Card details mock inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif-luxury font-medium text-[#251E1A]">Your Bag is Empty</h2>
        <p className="text-xs text-[#786658]">Please select a dupatta to proceed with checkout.</p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-2.5 bg-[#251E1A] text-white text-xs font-semibold rounded-lg hover:bg-[#3D3027] cursor-pointer"
        >
          Explore Dupatta Collection
        </button>
      </div>
    );
  }

  // Shipping Calculation
  const isPakistan = country.toLowerCase() === 'pakistan';
  const freeThreshold = settings.freeShippingThresholdPKR;
  let shippingCostPKR = 0;

  if (isPakistan) {
    shippingCostPKR = cartSubtotalPKR >= freeThreshold ? 0 : 500;
  } else {
    shippingCostPKR = 6500; // DHL Worldwide Express
  }

  const discountAmount = appliedDiscount
    ? (cartSubtotalPKR * appliedDiscount.percent) / 100
    : 0;

  const totalAmountPKR = cartSubtotalPKR - discountAmount + shippingCostPKR;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !address || !city) {
      showToast('Please complete all required delivery fields.');
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvc)) {
      showToast('Please enter your credit card information.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderItems = cart.map((c) => ({
        productId: c.productId,
        name: c.name,
        pricePKR: c.pricePKR,
        quantity: c.quantity,
        selectedColor: c.selectedColor,
        selectedFabric: c.selectedFabric,
        image: c.image,
      }));

      placeOrder({
        items: orderItems,
        subtotalPKR: cartSubtotalPKR,
        discountPKR: discountAmount,
        shippingPKR: shippingCostPKR,
        totalPKR: totalAmountPKR,
        currency,
        currencyRate: 1,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid',
        orderStatus: 'Confirmed',
        customer: {
          fullName,
          email,
          phone,
          address,
          city,
          country,
          postalCode,
          deliveryNotes,
        },
        trackingCode: `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`,
      });

      setIsSubmitting(false);
      setCurrentPage('order-confirmation');
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E8DEC8] pb-4">
        <button
          onClick={() => setCurrentPage('cart')}
          className="flex items-center gap-1.5 text-xs text-[#7B695B] hover:text-[#251E1A] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shopping Bag</span>
        </button>
        <div className="flex items-center gap-1.5 text-xs text-[#2F6B38] font-medium">
          <Lock className="w-3.5 h-3.5" />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Delivery & Payment Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Contact & Delivery Address */}
          <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] shadow-xs space-y-4">
            <h2 className="text-lg font-serif-luxury font-medium text-[#251E1A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#251E1A] text-white flex items-center justify-center text-xs font-sans">
                1
              </span>
              <span>Delivery Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#635345]">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahnoor Khan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-xs focus:outline-none focus:border-[#A87B2E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#635345]">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+92 300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-xs focus:outline-none focus:border-[#A87B2E]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-[#635345]">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="mahnoor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-xs focus:outline-none focus:border-[#A87B2E]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-[#635345]">Street Address & House # *</label>
                <input
                  type="text"
                  required
                  placeholder="House 14, Street 9, Sector F-7/2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-xs focus:outline-none focus:border-[#A87B2E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#635345]">City *</label>
                <input
                  type="text"
                  required
                  placeholder="Lahore / Karachi / Islamabad"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-xs focus:outline-none focus:border-[#A87B2E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#635345]">Country *</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-xs text-[#251E1A] focus:outline-none focus:border-[#A87B2E]"
                >
                  <option value="Pakistan">Pakistan (TCS Courier / COD Available)</option>
                  <option value="United Arab Emirates">United Arab Emirates (DHL Express)</option>
                  <option value="United Kingdom">United Kingdom (DHL Express)</option>
                  <option value="United States">United States (DHL Express)</option>
                  <option value="Canada">Canada (DHL Express)</option>
                  <option value="Saudi Arabia">Saudi Arabia (DHL Express)</option>
                  <option value="Australia">Australia (DHL Express)</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-[#635345]">Special Delivery Instructions (Optional)</label>
                <input
                  type="text"
                  placeholder="E.g., Call before delivery, gate code 2814"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-xs focus:outline-none focus:border-[#A87B2E]"
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Method */}
          <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] shadow-xs space-y-4">
            <h2 className="text-lg font-serif-luxury font-medium text-[#251E1A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#251E1A] text-white flex items-center justify-center text-xs font-sans">
                2
              </span>
              <span>Payment Method</span>
            </h2>

            <div className="space-y-3">
              {/* Option: Cash on Delivery (Pakistan only) */}
              {isPakistan && (
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#A87B2E] bg-[#FAF5EB] shadow-xs ring-1 ring-[#A87B2E]/40'
                      : 'border-[#DDD0BC] bg-white hover:border-[#C4B29A]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 accent-[#A87B2E]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-[#A87B2E]" />
                      <span className="text-xs font-semibold text-[#251E1A]">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] bg-[#E8DCB9] text-[#4A3B2B] px-2 py-0.5 rounded-full font-medium">
                        Popular
                      </span>
                    </div>
                    <p className="text-[11px] text-[#786658] mt-1 leading-relaxed">
                      Pay cash upon doorstep delivery by our courier partner across Pakistan.
                    </p>
                  </div>
                </label>
              )}

              {/* Option: Direct Bank Transfer / Raast */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-[#A87B2E] bg-[#FAF5EB] shadow-xs ring-1 ring-[#A87B2E]/40'
                    : 'border-[#DDD0BC] bg-white hover:border-[#C4B29A]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={() => setPaymentMethod('bank_transfer')}
                  className="mt-1 accent-[#A87B2E]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#A87B2E]" />
                    <span className="text-xs font-semibold text-[#251E1A]">
                      Bank Transfer / Raast / EasyPaisa / JazzCash
                    </span>
                  </div>
                  <p className="text-[11px] text-[#786658] mt-1 leading-relaxed">
                    Direct transfer to our Meezan Bank / Standard Chartered business account. Instructions sent via WhatsApp & email.
                  </p>
                </div>
              </label>

              {/* Option: Credit / Debit Card */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#A87B2E] bg-[#FAF5EB] shadow-xs ring-1 ring-[#A87B2E]/40'
                    : 'border-[#DDD0BC] bg-white hover:border-[#C4B29A]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-1 accent-[#A87B2E]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#A87B2E]" />
                    <span className="text-xs font-semibold text-[#251E1A]">
                      Credit / Debit Card (Visa, Mastercard, UnionPay)
                    </span>
                  </div>
                  <p className="text-[11px] text-[#786658] mt-1 leading-relaxed">
                    Secure international payment processing with zero foreign exchange markup fees.
                  </p>

                  {paymentMethod === 'card' && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-[#DDD0BC] space-y-2.5">
                      <input
                        type="text"
                        placeholder="Card Number (4000 1234 5678 9010)"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD0BC] rounded-lg text-xs font-mono"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="px-3 py-2 bg-[#FAF8F5] border border-[#DDD0BC] rounded-lg text-xs font-mono"
                        />
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="CVC"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="px-3 py-2 bg-[#FAF8F5] border border-[#DDD0BC] rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] shadow-sm space-y-6 lg:sticky lg:top-28">
          <h3 className="text-lg font-serif-luxury font-medium text-[#251E1A]">
            Order Summary ({cart.length} items)
          </h3>

          {/* Items */}
          <div className="divide-y divide-[#EFE7DA] max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="py-3 flex gap-3 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-14 object-cover rounded-lg bg-[#ECE3D2] border border-[#DDD0BC] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0 text-xs">
                  <p className="font-serif-luxury text-sm font-medium text-[#251E1A] truncate">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-[#786658] truncate">
                    {item.selectedFabric} · {item.selectedColor}
                  </p>
                  <p className="text-[11px] text-[#8C7A6B] font-mono">Qty: {item.quantity}</p>
                </div>
                <span className="text-xs font-mono font-semibold text-[#8B6420]">
                  {formatPrice(item.pricePKR * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-4 border-t border-[#E8DEC8] space-y-2 text-xs text-[#5C4D41]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono text-[#251E1A]">{formatPrice(cartSubtotalPKR)}</span>
            </div>

            {appliedDiscount && (
              <div className="flex justify-between text-[#2F6B38]">
                <span>Festive Discount ({appliedDiscount.percent}%)</span>
                <span className="font-mono">-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping ({isPakistan ? 'Pakistan Express' : 'DHL Worldwide'})</span>
              <span className="font-mono text-[#251E1A]">
                {shippingCostPKR === 0 ? 'FREE' : formatPrice(shippingCostPKR)}
              </span>
            </div>

            <div className="pt-3 border-t border-[#DDD0BC] flex justify-between text-base font-semibold text-[#251E1A]">
              <span className="font-serif-luxury">Total Payable</span>
              <span className="font-mono text-xl text-[#8B6420]">
                {formatPrice(totalAmountPKR)}
              </span>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#251E1A] hover:bg-[#3D3027] text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Confirming Your Order...</span>
            ) : (
              <>
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Place Order · {formatPrice(totalAmountPKR)}</span>
              </>
            )}
          </button>

          <div className="pt-2 text-center text-[11px] text-[#8C7A6B] space-y-1">
            <p>Guaranteed genuine hand-painted Pakistani craftsmanship.</p>
            <p>Our concierge will verify your address via WhatsApp.</p>
          </div>
        </div>
      </form>
    </div>
  );
};
