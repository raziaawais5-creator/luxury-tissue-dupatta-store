import React, { useState } from 'react';
import {
  Package,
  Clock,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  User,
  Heart,
  Palette,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AccountPage: React.FC = () => {
  const {
    orders,
    customRequests,
    wishlist,
    products,
    formatPrice,
    setCurrentPage,
    setSelectedProductId,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'custom_requests' | 'wishlist'>('orders');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Profile Header */}
      <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#251E1A] text-[#D4AF37] flex items-center justify-center text-xl font-serif-luxury font-medium shadow-md">
            Z
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A87B2E]">
              Zaib Than Collection Atelier Member
            </span>
            <h1 className="text-2xl font-serif-luxury font-medium text-[#251E1A]">
              My Account & Order History
            </h1>
            <p className="text-xs text-[#786658]">
              Track your handcrafted orders, bespoke quotes, and saved dupattas.
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage('custom-designer')}
          className="px-4 py-2.5 bg-[#A87B2E] hover:bg-[#8F6724] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
        >
          New Bespoke Request
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E8DEC8] gap-6 text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === 'orders' ? 'text-[#251E1A] font-bold' : 'text-[#8C7A6B] hover:text-[#251E1A]'
          }`}
        >
          <span>Orders ({orders.length})</span>
          {activeTab === 'orders' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A87B2E]"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('custom_requests')}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === 'custom_requests' ? 'text-[#251E1A] font-bold' : 'text-[#8C7A6B] hover:text-[#251E1A]'
          }`}
        >
          <span>Custom Commissions ({customRequests.length})</span>
          {activeTab === 'custom_requests' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A87B2E]"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === 'wishlist' ? 'text-[#251E1A] font-bold' : 'text-[#8C7A6B] hover:text-[#251E1A]'
          }`}
        >
          <span>Saved Wishlist ({wishlist.length})</span>
          {activeTab === 'wishlist' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A87B2E]"></span>
          )}
        </button>
      </div>

      {/* Tab 1: Orders List */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#FAF7F2] p-12 text-center rounded-2xl border border-[#E8DEC8] space-y-3">
              <Package className="w-8 h-8 text-[#A87B2E] mx-auto" />
              <p className="font-serif-luxury text-lg text-[#251E1A]">No orders placed yet</p>
              <button
                onClick={() => setCurrentPage('shop')}
                className="px-5 py-2.5 bg-[#251E1A] text-white text-xs font-semibold rounded-lg hover:bg-[#3D3027] cursor-pointer"
              >
                Browse Dupattas
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DEC8] shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E8DEC8] gap-2">
                  <div>
                    <span className="text-xs font-mono font-semibold text-[#8B6420]">
                      #{order.orderNumber}
                    </span>
                    <span className="text-xs text-[#8C7A6B] ml-3">
                      {new Date(order.createdAt).toLocaleDateString('en-PK', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#EFE7DA] text-[#524135] border border-[#DDD0BC]">
                      Status: {order.orderStatus}
                    </span>
                    <span className="font-mono text-sm font-semibold text-[#251E1A]">
                      {formatPrice(order.totalPKR)}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-[#EFE7DA]">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-12 rounded object-cover border border-[#DDD0BC]"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-serif-luxury text-sm font-medium text-[#251E1A]">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-[#786658]">
                            {item.selectedFabric} · {item.selectedColor} (Qty: {item.quantity})
                          </p>
                        </div>
                      </div>
                      <span className="font-mono font-medium text-[#251E1A]">
                        {formatPrice(item.pricePKR * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-[#8C7A6B]">
                  <span>Tracking: {order.trackingCode || 'Pending Dispatch'}</span>
                  <span>Payment: {order.paymentStatus}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Custom Commission Requests */}
      {activeTab === 'custom_requests' && (
        <div className="space-y-4">
          {customRequests.length === 0 ? (
            <div className="bg-[#FAF7F2] p-12 text-center rounded-2xl border border-[#E8DEC8] space-y-3">
              <Palette className="w-8 h-8 text-[#A87B2E] mx-auto" />
              <p className="font-serif-luxury text-lg text-[#251E1A]">No custom commission requests</p>
              <button
                onClick={() => setCurrentPage('custom-designer')}
                className="px-5 py-2.5 bg-[#A87B2E] text-white text-xs font-semibold rounded-lg hover:bg-[#8F6724] cursor-pointer"
              >
                Create Your First Design
              </button>
            </div>
          ) : (
            customRequests.map((req) => (
              <div
                key={req.id}
                className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DEC8] shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E8DEC8] gap-2">
                  <div>
                    <span className="text-xs font-mono font-semibold text-[#8B6420]">
                      Commission Ref: {req.id}
                    </span>
                    <span className="text-xs text-[#8C7A6B] ml-3">Occasion: {req.occasion}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E8F0E4] text-[#2F6B38] border border-[#BDD6B3]">
                    {req.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#524135]">
                  <div>
                    <p className="font-semibold text-[#251E1A]">Fabric & Color</p>
                    <p>{req.baseFabric}</p>
                    <p>{req.baseColor}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#251E1A]">Artwork & Handwork</p>
                    <p>{req.artworkStyle}</p>
                    <p>{req.handworkTypes.join(', ')}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#251E1A]">Target & Price</p>
                    <p>Required By: {req.requiredDate}</p>
                    <p className="font-mono text-[#8B6420] font-semibold">
                      Est. {formatPrice(req.estimatedPricePKR)}
                    </p>
                  </div>
                </div>

                {req.specialInstructions && (
                  <p className="text-xs bg-white p-3 rounded-lg border border-[#DDD0BC] italic text-[#6E5D4F]">
                    "{req.specialInstructions}"
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.length === 0 ? (
            <div className="col-span-full bg-[#FAF7F2] p-12 text-center rounded-2xl border border-[#E8DEC8] space-y-3">
              <Heart className="w-8 h-8 text-[#A87B2E] mx-auto" />
              <p className="font-serif-luxury text-lg text-[#251E1A]">Your wishlist is empty</p>
              <button
                onClick={() => setCurrentPage('shop')}
                className="px-5 py-2.5 bg-[#251E1A] text-white text-xs font-semibold rounded-lg hover:bg-[#3D3027] cursor-pointer"
              >
                Browse Dupattas
              </button>
            </div>
          ) : (
            products
              .filter((p) => wishlist.includes(p.id))
              .map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setSelectedProductId(product.id);
                    setCurrentPage('product-detail');
                  }}
                  className="bg-[#FAF7F2] rounded-xl overflow-hidden border border-[#E8DEC8] hover:border-[#A87B2E] transition-all cursor-pointer group p-4 flex flex-col justify-between"
                >
                  <img
                    src={product.images.primary}
                    alt={product.name}
                    className="w-full aspect-[3/4] object-cover rounded-lg mb-3"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-serif-luxury text-base font-medium text-[#251E1A] group-hover:text-[#A87B2E] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs font-mono font-semibold text-[#8B6420] mt-1">
                      {formatPrice(product.pricePKR)}
                    </p>
                  </div>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};
