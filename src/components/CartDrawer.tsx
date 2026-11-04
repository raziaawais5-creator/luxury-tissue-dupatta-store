import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotalPKR,
    formatPrice,
    setCurrentPage,
    appliedDiscount,
    applyPromoCode,
    removePromoCode,
    settings,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = settings.freeShippingThresholdPKR;
  const progressToFreeShipping = Math.min(100, (cartSubtotalPKR / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotalPKR);

  const discountAmount = appliedDiscount
    ? (cartSubtotalPKR * appliedDiscount.percent) / 100
    : 0;
  const finalSubtotal = cartSubtotalPKR - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError(null);
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] text-[#2C2420] shadow-2xl flex flex-col border-l border-[#E5DAC6]">
          {/* Cart Header */}
          <div className="px-6 py-5 bg-[#F4EFE6] border-b border-[#E2D5BE] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#A87B2E]" />
              <h2 className="text-lg font-serif-luxury font-medium text-[#2C2420]">
                Your Shopping Bag
              </h2>
              <span className="text-xs bg-[#E8DCB9] text-[#4A3B2B] px-2 py-0.5 rounded-full font-mono font-medium">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#736254] hover:text-[#2C2420] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-6 py-3 bg-[#EDE5D5] border-b border-[#E0D2BA] text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-[#59473A] mb-1.5 font-medium">
                Add <span className="font-semibold text-[#8B6420]">{formatPrice(remainingForFreeShipping)}</span> more for Free Shipping across Pakistan
              </p>
            ) : (
              <p className="text-[#2F6B38] font-semibold flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Congratulations! You have unlocked Free Courier Delivery!
              </p>
            )}
            <div className="w-full h-1.5 bg-[#DDCFBA] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C29849] to-[#8B6420] transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#EAE1CF]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFE8DA] flex items-center justify-center text-[#B5A593]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif-luxury text-lg text-[#3E3128]">Your bag is empty</p>
                  <p className="text-xs text-[#7B6858] max-w-xs">
                    Explore our hand-painted tissue dupattas adorned with sitara and moti.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentPage('shop');
                  }}
                  className="px-5 py-2.5 bg-[#2C2420] text-white text-xs font-semibold tracking-wider uppercase rounded-lg hover:bg-[#443831] transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#ECE3D2] shrink-0 border border-[#DDD0B9]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif-luxury text-base font-medium text-[#2C2420]">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#9E8B7C] hover:text-[#B91C1C] transition-colors cursor-pointer p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#7B6A5B] mt-0.5">
                        {item.selectedFabric} · {item.selectedColor}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D9CDB8] rounded-md bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#F3EFE7] text-[#69584B] transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-medium text-[#2C2420]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#F3EFE7] text-[#69584B] transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold font-mono text-[#2C2420]">
                        {formatPrice(item.pricePKR * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#F4EFE6] border-t border-[#E2D5BE] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                {appliedDiscount ? (
                  <div className="flex items-center justify-between bg-[#E8F0E4] border border-[#BDD6B3] px-3 py-1.5 rounded-lg text-xs text-[#2B6024]">
                    <span>
                      Promo <strong>{appliedDiscount.code}</strong> applied ({appliedDiscount.percent}% OFF)
                    </span>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-[#2B6024] hover:underline font-medium cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. EID2026)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-white border border-[#D9CDB8] rounded-lg focus:outline-none focus:border-[#A87B2E]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 text-xs font-semibold bg-[#3D3027] hover:bg-[#2C2420] text-white rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {promoError && <p className="text-[11px] text-[#C2410C]">{promoError}</p>}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5E4D41]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono text-[#2C2420]">{formatPrice(cartSubtotalPKR)}</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-[#2F6B38]">
                    <span>Discount ({appliedDiscount.percent}%)</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono text-[#2C2420]">
                    {remainingForFreeShipping === 0 ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#DED2BC] flex justify-between text-base font-semibold text-[#2C2420]">
                  <span className="font-serif-luxury">Estimated Total</span>
                  <span className="font-mono text-lg text-[#8B6420]">
                    {formatPrice(finalSubtotal)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 bg-[#2C2420] hover:bg-[#3D322B] text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* WhatsApp Quick Order */}
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Zaib Than Collection! I would like to place an order for my cart:\n` +
                      cart.map((c) => `• ${c.name} (${c.selectedFabric}, ${c.selectedColor}) x${c.quantity}`).join('\n') +
                      `\nTotal: ${formatPrice(finalSubtotal)}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-white hover:bg-[#FAF8F5] text-[#1E7E34] border border-[#86C995] font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Order Directly via WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
