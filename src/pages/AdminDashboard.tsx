import React, { useState } from 'react';
import {
  Package,
  ShoppingBag,
  Palette,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Check,
  Save,
  Clock,
  DollarSign,
  TrendingUp,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DupattaProduct, Order, CustomDupattaRequest } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    customRequests,
    updateCustomRequestStatus,
    settings,
    updateSettings,
    formatPrice,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'custom_quotes' | 'products' | 'settings'>('orders');

  // New Product Modal / Form State
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [formName, setFormName] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formPrice, setFormPrice] = useState<number>(8500);
  const [formFabric, setFormFabric] = useState<any>('Pure Tissue');
  const [formColor, setFormColor] = useState('Champagne Peach');
  const [formColorFamily, setFormColorFamily] = useState<any>('peach');
  const [formDimensions, setFormDimensions] = useState('2.75 meters x 1.0 meter');
  const [formReadyToShip, setFormReadyToShip] = useState(true);
  const [formDays, setFormDays] = useState(3);
  const [formPrimaryImage, setFormPrimaryImage] = useState('/assets/aistudio/9b6b89f0-ad30-4a2a-b536-a50d80f1b78e_94496726.jpeg');

  const [settingsBrandName, setSettingsBrandName] = useState(settings.brandName);
  const [settingsTagline, setSettingsTagline] = useState(settings.tagline);
  const [settingsWhatsapp, setSettingsWhatsapp] = useState(settings.whatsappNumber);
  const [settingsContactPhone, setSettingsContactPhone] = useState(settings.contactPhone || '03404124380');
  const [settingsContactEmail, setSettingsContactEmail] = useState(settings.contactEmail || 'Kasma2486@gmail.com');
  const [settingsAnnouncement, setSettingsAnnouncement] = useState(settings.announcementText);
  const [settingsFreeThreshold, setSettingsFreeThreshold] = useState(settings.freeShippingThresholdPKR);

  // Stats calculation
  const totalRevenuePKR = orders.reduce((sum, o) => sum + o.totalPKR, 0);
  const activeOrdersCount = orders.filter((o) => o.orderStatus !== 'Delivered').length;
  const pendingQuotesCount = customRequests.filter((r) => r.status === 'Pending Review' || r.status === 'Artisan Assessing').length;

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPrice) {
      showToast('Please enter name and price.');
      return;
    }

    if (editingProductId) {
      const existing = products.find((p) => p.id === editingProductId);
      if (existing) {
        updateProduct({
          ...existing,
          name: formName,
          tagline: formTagline,
          pricePKR: formPrice,
          fabric: formFabric,
          baseColor: formColor,
          colorFamily: formColorFamily,
          dimensions: formDimensions,
          isReadyToShip: formReadyToShip,
          productionTimeDays: formDays,
          images: {
            ...existing.images,
            primary: formPrimaryImage,
          },
        });
      }
      setEditingProductId(null);
    } else {
      const newProd: DupattaProduct = {
        id: `prod-${Date.now()}`,
        name: formName,
        slug: formName.toLowerCase().replace(/\s+/g, '-'),
        tagline: formTagline || 'Hand-painted sheer tissue adorned with delicate sitara and moti.',
        pricePKR: formPrice,
        category: ['hand-painted', 'sitara-collection'],
        baseColor: formColor,
        colorFamily: formColorFamily,
        fabric: formFabric,
        dimensions: formDimensions,
        embellishments: ['Sitara (Sequins)', 'Moti (Pearls)', 'Gota & Kiran Lace'],
        borderStyle: 'Gold Kiran Fringe',
        isReadyToShip: formReadyToShip,
        productionTimeDays: formDays,
        featured: false,
        rating: 5.0,
        reviewsCount: 1,
        description: 'Artisanal hand-painted tissue dupatta designed for festive occasions.',
        craftsmanshipNotes: 'Crafted by master artisans in Lahore, Pakistan.',
        careInstructions: ['Dry clean only', 'Wrap in muslin cloth'],
        images: {
          primary: formPrimaryImage,
          borderDetail: '/assets/aistudio/69e152b9-04c3-42b2-a312-b30b86bd59b5_7836dd34.jpeg',
          floralCloseUp: formPrimaryImage,
          macroSitaraMoti: '/assets/aistudio/9a8abdf7-0171-4759-be91-05b0a30131a3_9be25aa9.jpeg',
        },
        accentHex: '#D4AF37',
      };
      addProduct(newProd);
    }

    setIsAddingProduct(false);
  };

  const startEditProduct = (prod: DupattaProduct) => {
    setEditingProductId(prod.id);
    setFormName(prod.name);
    setFormTagline(prod.tagline);
    setFormPrice(prod.pricePKR);
    setFormFabric(prod.fabric);
    setFormColor(prod.baseColor);
    setFormColorFamily(prod.colorFamily);
    setFormDimensions(prod.dimensions);
    setFormReadyToShip(prod.isReadyToShip);
    setFormDays(prod.productionTimeDays);
    setFormPrimaryImage(prod.images.primary);
    setIsAddingProduct(true);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      brandName: settingsBrandName,
      tagline: settingsTagline,
      whatsappNumber: settingsWhatsapp,
      contactPhone: settingsContactPhone,
      contactEmail: settingsContactEmail,
      announcementText: settingsAnnouncement,
      freeShippingThresholdPKR: settingsFreeThreshold,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-[#241B16] text-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#3E2D23] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            Merchant Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-white">
            {settings.brandName} Atelier Back-Office
          </h1>
          <p className="text-xs text-[#BFAFA0] mt-1">
            Manage your hand-painted dupatta catalog, track orders, adjust pricing, and review custom commission inquiries.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProductId(null);
            setFormName('');
            setFormTagline('');
            setFormPrice(21000);
            setIsAddingProduct(true);
          }}
          className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#241B16] font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dupatta Design</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8DEC8] space-y-1">
          <p className="text-xs text-[#8C7A6B] uppercase font-semibold">Total Revenue (PKR)</p>
          <p className="text-2xl font-mono font-semibold text-[#8B6420]">
            {formatPrice(totalRevenuePKR)}
          </p>
          <span className="text-[11px] text-[#2F6B38]">Across all confirmed customer orders</span>
        </div>

        <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8DEC8] space-y-1">
          <p className="text-xs text-[#8C7A6B] uppercase font-semibold">Active Orders In Progress</p>
          <p className="text-2xl font-mono font-semibold text-[#251E1A]">{activeOrdersCount}</p>
          <span className="text-[11px] text-[#8C7A6B]">Handcrafting & Dispatch</span>
        </div>

        <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8DEC8] space-y-1">
          <p className="text-xs text-[#8C7A6B] uppercase font-semibold">Bespoke Quotes Pending</p>
          <p className="text-2xl font-mono font-semibold text-[#A87B2E]">{pendingQuotesCount}</p>
          <span className="text-[11px] text-[#8C7A6B]">Customer custom design inquiries</span>
        </div>

        <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8DEC8] space-y-1">
          <p className="text-xs text-[#8C7A6B] uppercase font-semibold">Catalog Designs</p>
          <p className="text-2xl font-mono font-semibold text-[#251E1A]">{products.length}</p>
          <span className="text-[11px] text-[#8C7A6B]">Tissue & Organza models</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#E8DEC8] gap-6 text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === 'orders' ? 'text-[#251E1A] font-bold' : 'text-[#8C7A6B] hover:text-[#251E1A]'
          }`}
        >
          <span>Orders Management ({orders.length})</span>
          {activeTab === 'orders' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A87B2E]"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('custom_quotes')}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === 'custom_quotes' ? 'text-[#251E1A] font-bold' : 'text-[#8C7A6B] hover:text-[#251E1A]'
          }`}
        >
          <span>Bespoke Design Requests ({customRequests.length})</span>
          {activeTab === 'custom_quotes' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A87B2E]"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === 'products' ? 'text-[#251E1A] font-bold' : 'text-[#8C7A6B] hover:text-[#251E1A]'
          }`}
        >
          <span>Products & Pricing ({products.length})</span>
          {activeTab === 'products' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A87B2E]"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === 'settings' ? 'text-[#251E1A] font-bold' : 'text-[#8C7A6B] hover:text-[#251E1A]'
          }`}
        >
          <span>Boutique Settings</span>
          {activeTab === 'settings' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A87B2E]"></span>
          )}
        </button>
      </div>

      {/* Tab 1: Orders Management */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#E8DEC8] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#524135]">
                <thead className="bg-[#F4EFE6] border-b border-[#E2D5BE] text-[11px] font-semibold uppercase tracking-wider text-[#69584B]">
                  <tr>
                    <th className="p-4">Order #</th>
                    <th className="p-4">Customer & City</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Total & Payment</th>
                    <th className="p-4">Fulfillment Status</th>
                    <th className="p-4">Quick WhatsApp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE7DA]">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#FAF5EB] transition-colors">
                      <td className="p-4 font-mono font-semibold text-[#8B6420]">
                        #{o.orderNumber}
                        <span className="block text-[10px] text-[#8C7A6B] font-sans font-normal">
                          {new Date(o.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="p-4">
                        <p className="font-semibold text-[#251E1A]">{o.customer.fullName}</p>
                        <p className="text-[11px] text-[#786658]">
                          {o.customer.city}, {o.customer.country}
                        </p>
                        <p className="text-[11px] text-[#8C7A6B]">{o.customer.phone}</p>
                      </td>

                      <td className="p-4">
                        <div className="space-y-1">
                          {o.items.map((it, i) => (
                            <div key={i} className="text-[11px]">
                              {it.name} ({it.selectedFabric}, {it.selectedColor}) x{it.quantity}
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="font-mono font-semibold text-sm text-[#251E1A] block">
                          {formatPrice(o.totalPKR)}
                        </span>
                        <span className="text-[10px] text-[#786658] uppercase">
                          {o.paymentMethod === 'cod' ? 'Cash on Delivery' : o.paymentMethod}
                        </span>
                      </td>

                      <td className="p-4">
                        <select
                          value={o.orderStatus}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                          className="px-2.5 py-1.5 bg-white border border-[#DDD0BC] rounded-lg text-xs font-medium text-[#251E1A] focus:outline-none focus:border-[#A87B2E]"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Handcrafting">Handcrafting & Painting</option>
                          <option value="Quality Check">Quality Check</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>

                      <td className="p-4">
                        <a
                          href={`https://wa.me/${o.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${o.customer.fullName}! Greetings from Zaib Than Collection. Regarding your order #${o.orderNumber}, your dupatta is currently: ${o.orderStatus}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:bg-[#25D366]/10 rounded-lg transition-colors"
                          title="Message customer on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Bespoke Design Requests */}
      {activeTab === 'custom_quotes' && (
        <div className="space-y-4">
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#E8DEC8] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#524135]">
                <thead className="bg-[#F4EFE6] border-b border-[#E2D5BE] text-[11px] font-semibold uppercase tracking-wider text-[#69584B]">
                  <tr>
                    <th className="p-4">Ref & Date</th>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Design Specs</th>
                    <th className="p-4">Handwork & Density</th>
                    <th className="p-4">Est. Quote</th>
                    <th className="p-4">Status & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE7DA]">
                  {customRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-[#FAF5EB] transition-colors">
                      <td className="p-4 font-mono font-semibold text-[#8B6420]">
                        {req.id}
                        <span className="block text-[10px] text-[#8C7A6B] font-sans font-normal">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="p-4">
                        <p className="font-semibold text-[#251E1A]">{req.customerName}</p>
                        <p className="text-[11px] text-[#786658]">
                          {req.customerCity}, {req.country}
                        </p>
                        <p className="text-[11px] text-[#8C7A6B]">{req.customerPhone}</p>
                      </td>

                      <td className="p-4">
                        <p className="font-medium text-[#251E1A]">
                          {req.baseColor} ({req.baseFabric})
                        </p>
                        <p className="text-[11px] text-[#786658]">Artwork: {req.artworkStyle}</p>
                        <p className="text-[10px] text-[#8C7A6B]">Occasion: {req.occasion}</p>
                      </td>

                      <td className="p-4">
                        <span className="font-medium text-[#251E1A] block">
                          {req.embellishmentDensity}
                        </span>
                        <p className="text-[11px] text-[#786658] line-clamp-2">
                          {req.handworkTypes.join(', ')}
                        </p>
                      </td>

                      <td className="p-4 font-mono font-semibold text-[#8B6420]">
                        {formatPrice(req.estimatedPricePKR)}
                      </td>

                      <td className="p-4 space-y-2">
                        <select
                          value={req.status}
                          onChange={(e) => updateCustomRequestStatus(req.id, e.target.value as any)}
                          className="px-2 py-1 bg-white border border-[#DDD0BC] rounded-lg text-xs font-medium text-[#251E1A]"
                        >
                          <option value="Pending Review">Pending Review</option>
                          <option value="Artisan Assessing">Artisan Assessing</option>
                          <option value="Approved">Approved</option>
                          <option value="In Production">In Production</option>
                          <option value="Dispatched">Dispatched</option>
                        </select>

                        <a
                          href={`https://wa.me/${req.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${req.customerName}! Regarding your custom dupatta quote request #${req.id} for ${req.baseColor} ${req.baseFabric}, our head artisan is ready to share fabric swatches.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-[11px] text-[#25D366] hover:underline"
                        >
                          Reply on WhatsApp →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Products Management */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Add / Edit Product Form Modal */}
          {isAddingProduct && (
            <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border-2 border-[#A87B2E] shadow-lg space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#E8DEC8] pb-3">
                <h3 className="font-serif-luxury text-xl font-medium text-[#251E1A]">
                  {editingProductId ? 'Edit Dupatta Product' : 'Add New Dupatta to Boutique'}
                </h3>
                <button
                  onClick={() => setIsAddingProduct(false)}
                  className="text-xs text-[#786658] hover:text-[#251E1A]"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-[#635345]">Dupatta Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bano Sheer Tissue"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#635345]">Price in PKR *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg font-mono"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-[#635345]">Tagline / Subtitle</label>
                  <input
                    type="text"
                    placeholder="Short description of the hand-painted florals and sitara"
                    value={formTagline}
                    onChange={(e) => setFormTagline(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#635345]">Fabric Type</label>
                  <select
                    value={formFabric}
                    onChange={(e) => setFormFabric(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg"
                  >
                    <option value="Pure Tissue">Pure Tissue</option>
                    <option value="Sheer Organza">Sheer Organza</option>
                    <option value="Silk Organza">Silk Organza</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#635345]">Base Color Name</label>
                  <input
                    type="text"
                    value={formColor}
                    onChange={(e) => setFormColor(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#635345]">Primary Image Asset</label>
                  <select
                    value={formPrimaryImage}
                    onChange={(e) => setFormPrimaryImage(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg"
                  >
                    <option value="/assets/aistudio/515d46bd-8945-4625-b03f-aef7121db609_fcb4da40.jpeg">Mehfil Fuchsia Pearl</option>
                    <option value="/assets/aistudio/4ee99e31-41a3-4c5f-b9ce-8b6e7c2ad2d8_65bfbd9c.jpeg">Firouzi Seafoam Violet</option>
                    <option value="/assets/aistudio/9b6b89f0-ad30-4a2a-b536-a50d80f1b78e_94496726.jpeg">Chandni Champagne Peach</option>
                    <option value="/assets/aistudio/54bde74e-4ee7-417c-824e-d724af23349e_1992fceb.jpeg">Gulab-e-Noor Amber Rose</option>
                    <option value="/assets/aistudio/3d7cc8d5-784b-47e4-b547-0b01757454b9_4d7d4aac.jpeg">Gulabi Bahaar Pink</option>
                    <option value="/assets/aistudio/638cc19f-7425-4c05-9527-dff561da788a_1c233d70.jpeg">Noor-e-Sahar Pastel</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#635345]">Availability Status</label>
                  <select
                    value={formReadyToShip ? 'ready' : 'order'}
                    onChange={(e) => setFormReadyToShip(e.target.value === 'ready')}
                    className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg"
                  >
                    <option value="ready">Ready to Ship (2-3 Days)</option>
                    <option value="order">Made to Order</option>
                  </select>
                </div>

                <div className="sm:col-span-2 pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingProduct(false)}
                    className="px-4 py-2 border border-[#DDD0BC] rounded-lg text-[#69584B] hover:bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#251E1A] hover:bg-[#3D3027] text-white font-semibold rounded-lg"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Products List Table */}
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#E8DEC8] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#524135]">
                <thead className="bg-[#F4EFE6] border-b border-[#E2D5BE] text-[11px] font-semibold uppercase tracking-wider text-[#69584B]">
                  <tr>
                    <th className="p-4">Dupatta Item</th>
                    <th className="p-4">Fabric & Color</th>
                    <th className="p-4">Price (PKR)</th>
                    <th className="p-4">Stock Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE7DA]">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#FAF5EB] transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={prod.images.primary}
                          alt={prod.name}
                          className="w-12 h-14 rounded-lg object-cover border border-[#DDD0BC]"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-serif-luxury text-sm font-medium text-[#251E1A]">
                            {prod.name}
                          </p>
                          <p className="text-[11px] text-[#786658] line-clamp-1">{prod.tagline}</p>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="font-medium text-[#251E1A] block">{prod.fabric}</span>
                        <span className="text-[11px] text-[#786658]">{prod.baseColor}</span>
                      </td>

                      <td className="p-4 font-mono font-semibold text-sm text-[#8B6420]">
                        {formatPrice(prod.pricePKR)}
                      </td>

                      <td className="p-4">
                        {prod.isReadyToShip ? (
                          <span className="text-[10px] font-semibold uppercase bg-[#E8F0E4] text-[#2F6B38] px-2.5 py-1 rounded-md">
                            Ready to Ship
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold uppercase bg-[#FAF5EB] text-[#A87B2E] border border-[#DDD0BC] px-2.5 py-1 rounded-md">
                            {prod.productionTimeDays} Days Custom
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => startEditProduct(prod)}
                          className="p-1.5 text-[#59473A] hover:text-[#251E1A] rounded hover:bg-white transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${prod.name}?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-1.5 text-[#B91C1C] hover:bg-[#FEE2E2] rounded transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Boutique Settings */}
      {activeTab === 'settings' && (
        <form
          onSubmit={handleSaveSettings}
          className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] shadow-xs max-w-2xl space-y-4 text-xs"
        >
          <h3 className="font-serif-luxury text-xl font-medium text-[#251E1A] border-b border-[#E8DEC8] pb-3">
            Boutique & Store Configuration
          </h3>

          <div className="space-y-1">
            <label className="font-semibold text-[#635345]">Brand Name</label>
            <input
              type="text"
              value={settingsBrandName}
              onChange={(e) => setSettingsBrandName(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg font-medium text-[#251E1A]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#635345]">Brand Tagline</label>
            <input
              type="text"
              value={settingsTagline}
              onChange={(e) => setSettingsTagline(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#635345]">Atelier WhatsApp Phone Number</label>
            <input
              type="text"
              value={settingsWhatsapp}
              onChange={(e) => setSettingsWhatsapp(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg font-mono"
            />
            <span className="text-[10px] text-[#8C7A6B]">
              Enter country code without + or spaces (e.g. 923404124380)
            </span>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#635345]">Direct Contact Number</label>
            <input
              type="text"
              value={settingsContactPhone}
              onChange={(e) => setSettingsContactPhone(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#635345]">Official Contact Email</label>
            <input
              type="email"
              value={settingsContactEmail}
              onChange={(e) => setSettingsContactEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#635345]">Announcement Bar Text</label>
            <input
              type="text"
              value={settingsAnnouncement}
              onChange={(e) => setSettingsAnnouncement(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#635345]">Free Shipping Threshold in PKR</label>
            <input
              type="number"
              value={settingsFreeThreshold}
              onChange={(e) => setSettingsFreeThreshold(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-white border border-[#DDD0BC] rounded-lg font-mono"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#251E1A] hover:bg-[#3D3027] text-white font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
            >
              <Save className="w-4 h-4 text-[#D4AF37]" />
              <span>Save Store Settings</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
