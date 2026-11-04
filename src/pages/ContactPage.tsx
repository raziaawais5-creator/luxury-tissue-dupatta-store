import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { settings, showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Custom Order Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been received! Our atelier concierge will respond promptly.');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#A87B2E] font-semibold">
          Artisan Concierge
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif-luxury font-medium text-[#251E1A]">
          Connect With Our Atelier
        </h1>
        <p className="text-xs sm:text-sm text-[#736355]">
          Whether you need a custom color consultation for your bridal ensemble or wish to inquire about international delivery, our master craftswomen are here to guide you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Contact Info Card */}
        <div className="md:col-span-5 bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif-luxury text-xl font-medium text-[#251E1A]">
              Studio Information
            </h2>
            <p className="text-xs text-[#786658] leading-relaxed">
              Appointments available for bridal fabric swatch inspections and custom color matching in Lahore.
            </p>
          </div>

          <div className="space-y-4 text-xs text-[#524135]">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#EFE7DA] text-[#A87B2E]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-[#251E1A]">Lahore Atelier & Showroom</p>
                <p className="text-[#786658]">Gulberg III, Main Boulevard, Lahore, Pakistan</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#EFE7DA] text-[#A87B2E]">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-[#251E1A]">Direct Contact Number</p>
                <a href="tel:03404124380" className="text-[#786658] font-mono hover:text-[#A87B2E] transition-colors">
                  03404124380
                </a>
                <p className="text-[11px] text-[#A87B2E]">Voice calls & customer inquiries</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#EFE7DA] text-[#A87B2E]">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-[#251E1A]">Direct WhatsApp Line</p>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#786658] font-mono hover:text-[#A87B2E] transition-colors"
                >
                  03404124380 (+92 340 4124380)
                </a>
                <p className="text-[11px] text-[#A87B2E]">Instant fabric swatch videos</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#EFE7DA] text-[#A87B2E]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-[#251E1A]">Email Concierge</p>
                <a href="mailto:Kasma2486@gmail.com" className="text-[#786658] hover:text-[#A87B2E] transition-colors font-medium">
                  Kasma2486@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#EFE7DA] text-[#A87B2E]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-[#251E1A]">Working Hours</p>
                <p className="text-[#786658]">Monday to Saturday: 11:00 AM – 8:00 PM (PKT)</p>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Link */}
          <div className="pt-2">
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                'Hello Zaib Than Collection! I would like to chat with an artisan regarding dupatta customization.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-6">
          <h2 className="font-serif-luxury text-xl font-medium text-[#251E1A]">
            Send an Inquiry to the Atelier
          </h2>

          {submitted ? (
            <div className="p-8 text-center bg-white rounded-xl border border-[#E2D6C0] space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E8F0E4] text-[#2F6B38] flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-lg font-medium text-[#251E1A]">
                Message Delivered to Our Artisans
              </h3>
              <p className="text-xs text-[#786658]">
                Thank you, {name}. We will get back to you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="text-xs text-[#A87B2E] hover:underline font-medium cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#635345]">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sara Ahmed"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl focus:outline-none focus:border-[#A87B2E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#635345]">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl focus:outline-none focus:border-[#A87B2E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#635345]">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="sara@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl focus:outline-none focus:border-[#A87B2E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#635345]">Inquiry Topic</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-[#251E1A] focus:outline-none focus:border-[#A87B2E]"
                  >
                    <option value="Custom Order Inquiry">Custom Order / Bridal Match</option>
                    <option value="Existing Order Status">Existing Order Status</option>
                    <option value="International Shipping Question">International Shipping</option>
                    <option value="Wholesale & Bridal Party Gifting">Bridal Party / Bulk Gifting</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#635345]">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your upcoming occasion, outfit color, or any specific questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl focus:outline-none focus:border-[#A87B2E]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#251E1A] hover:bg-[#3D3027] text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#D4AF37]" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
