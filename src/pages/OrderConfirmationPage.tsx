import React from 'react';
import {
  CheckCircle,
  Truck,
  MessageCircle,
  Printer,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Clock,
  Package,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationPage: React.FC = () => {
  const { lastCompletedOrder, orders, formatPrice, setCurrentPage, settings } = useStore();

  const order = lastCompletedOrder || orders[0];

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif-luxury font-medium text-[#251E1A]">No Recent Order Found</h2>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-2.5 bg-[#251E1A] text-white text-xs font-semibold rounded-lg hover:bg-[#3D3027] cursor-pointer"
        >
          Explore Dupatta Collection
        </button>
      </div>
    );
  }

  const timelineSteps = [
    { label: 'Order Confirmed', status: 'completed', time: 'Today' },
    { label: 'Fabric Stretching & Hand-Painting', status: 'current', time: 'Days 1–3' },
    { label: 'Sitara & Moti Needlework', status: 'upcoming', time: 'Days 4–6' },
    { label: 'Kiran Lace Border & Muslin Steam', status: 'upcoming', time: 'Day 7' },
    { label: 'Courier Dispatch', status: 'upcoming', time: 'Day 8' },
  ];

  const whatsappConfirmationText = encodeURIComponent(
    `Hello Zaib Than Collection! I placed Order #${order.orderNumber} for total ${formatPrice(
      order.totalPKR
    )}. Please confirm when hand-painting begins on my dupatta.`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-10 animate-fadeIn">
      {/* Celebration Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#E8F0E4] text-[#2F6B38] flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle className="w-9 h-9" />
        </div>
        <p className="text-xs uppercase tracking-widest text-[#A87B2E] font-semibold">
          Order Successfully Placed
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif-luxury font-medium text-[#251E1A]">
          Thank You, {order.customer.fullName}
        </h1>
        <p className="text-xs sm:text-sm text-[#736355]">
          Order Number: <strong className="font-mono text-[#251E1A]">{order.orderNumber}</strong> · A confirmation email has been sent to {order.customer.email}.
        </p>
      </div>

      {/* Production & Handcrafting Timeline */}
      <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8DEC8] pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#A87B2E]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4A3B31]">
              Atelier Production & Dispatch Timeline
            </span>
          </div>
          <span className="text-xs font-mono text-[#8C7A6B]">Tracking: {order.trackingCode}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {timelineSteps.map((step, idx) => (
            <div key={step.label} className="flex flex-col items-center text-center space-y-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                  step.status === 'completed'
                    ? 'bg-[#2F6B38] border-[#2F6B38] text-white shadow-xs'
                    : step.status === 'current'
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-[#251E1A] shadow-md ring-4 ring-[#D4AF37]/20 animate-pulse'
                    : 'bg-[#FAF8F5] border-[#DDD0BC] text-[#A69483]'
                }`}
              >
                {idx + 1}
              </div>
              <p className="text-xs font-medium text-[#251E1A] leading-tight">{step.label}</p>
              <span className="text-[10px] text-[#8C7A6B] font-mono">{step.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Order Itemized Receipt */}
      <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8DEC8] pb-4">
          <h2 className="text-base font-serif-luxury font-medium text-[#251E1A]">
            Dupatta Receipt Breakdown
          </h2>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-xs text-[#7B695B] hover:text-[#251E1A] transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>

        <div className="divide-y divide-[#EFE7DA]">
          {order.items.map((item, i) => (
            <div key={i} className="py-4 flex gap-4 items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-20 object-cover rounded-lg bg-[#ECE3D2] border border-[#DDD0BC]"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 text-xs">
                <h3 className="font-serif-luxury text-base font-medium text-[#251E1A]">
                  {item.name}
                </h3>
                <p className="text-[#786658]">
                  {item.selectedFabric} · {item.selectedColor}
                </p>
                <p className="text-[#8C7A6B] mt-0.5">Quantity: {item.quantity}</p>
              </div>
              <span className="text-sm font-mono font-semibold text-[#8B6420]">
                {formatPrice(item.pricePKR * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="pt-4 border-t border-[#E8DEC8] space-y-2 text-xs text-[#5C4D41]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-mono text-[#251E1A]">{formatPrice(order.subtotalPKR)}</span>
          </div>
          {order.discountPKR > 0 && (
            <div className="flex justify-between text-[#2F6B38]">
              <span>Discount</span>
              <span className="font-mono">-{formatPrice(order.discountPKR)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-mono text-[#251E1A]">
              {order.shippingPKR === 0 ? 'FREE' : formatPrice(order.shippingPKR)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Payment Method</span>
            <span className="font-medium text-[#251E1A] uppercase text-[11px]">
              {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
            </span>
          </div>
          <div className="pt-3 border-t border-[#DDD0BC] flex justify-between text-base font-semibold text-[#251E1A]">
            <span className="font-serif-luxury">Total Amount</span>
            <span className="font-mono text-xl text-[#8B6420]">
              {formatPrice(order.totalPKR)}
            </span>
          </div>
        </div>

        {/* Delivery Address Details */}
        <div className="pt-4 border-t border-[#E8DEC8] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#635345]">
          <div>
            <p className="font-semibold text-[#251E1A] mb-1">Delivering To:</p>
            <p>{order.customer.fullName}</p>
            <p>{order.customer.address}</p>
            <p>
              {order.customer.city}, {order.customer.country} {order.customer.postalCode}
            </p>
          </div>
          <div>
            <p className="font-semibold text-[#251E1A] mb-1">Recipient Contact:</p>
            <p>{order.customer.phone}</p>
            <p>{order.customer.email}</p>
            {order.customer.deliveryNotes && (
              <p className="mt-1 italic text-[#8C7A6B]">Note: {order.customer.deliveryNotes}</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={`https://wa.me/${settings.whatsappNumber}?text=${whatsappConfirmationText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Confirm on WhatsApp With Atelier</span>
        </a>

        <button
          onClick={() => setCurrentPage('shop')}
          className="flex-1 py-3.5 bg-[#251E1A] hover:bg-[#3D3027] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
