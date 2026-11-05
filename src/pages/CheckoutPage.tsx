import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Truck, ShieldCheck, CheckCircle2, ArrowLeft, MessageCircle, CreditCard, Banknote, MapPin, Printer, AlertCircle } from 'lucide-react';
import { CartItem, Order, PaymentMethod } from '../types';
import { CLINIC_INFO } from '../data/clinicInfo';
import { useLanguage } from '../context/LanguageContext';
import { sendNotificationToDoctor } from '../services/notificationService';

interface CheckoutPageProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOrderComplete,
}) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('Punjab');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= CLINIC_INFO.delivery.freeDeliveryThreshold;
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : CLINIC_INFO.delivery.flatRate;
  const total = subtotal + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !city || !address) {
      alert('Please fill in your name, contact phone, city, and delivery address.');
      return;
    }

    if (items.length === 0) {
      alert('Your cart is empty. Please add medicines before checking out.');
      return;
    }

    setIsSubmitting(true);

    const orderId = `SHC-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNumber = `LP-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder: Order = {
      id: orderId,
      items: [...items],
      subtotal,
      shippingFee,
      total,
      paymentMethod,
      customer: {
        fullName,
        phone,
        whatsapp: whatsapp || phone,
        city,
        address,
        province,
        notes,
      },
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      trackingNumber,
    };

    // System automatically sends complete order and delivery details to Dr. Zargham Ghaffar's connected number (+92342-7817236)
    // without redirecting the user or interrupting the page flow
    await sendNotificationToDoctor({
      type: 'order',
      customerName: newOrder.customer.fullName,
      phone: newOrder.customer.phone,
      details: {
        orderId: newOrder.id,
        trackingNumber: newOrder.trackingNumber,
        customer: newOrder.customer,
        items: newOrder.items.map((i) => ({
          name: i.product.name,
          qty: i.quantity,
          price: i.product.price,
          subtotal: i.product.price * i.quantity,
        })),
        subtotal: newOrder.subtotal,
        shippingFee: newOrder.shippingFee,
        total: newOrder.total,
        paymentMethod: newOrder.paymentMethod,
        date: newOrder.createdAt,
      },
      summary: `New Medicine Order ${newOrder.id} by ${newOrder.customer.fullName} (${newOrder.customer.phone}, ${newOrder.customer.city}). Total: Rs. ${newOrder.total} (${newOrder.paymentMethod}).`,
    });

    setConfirmedOrder(newOrder);
    setIsSubmitting(false);
    onOrderComplete(newOrder);
  };

  const sendConfirmationToWhatsApp = (order: Order) => {
    const itemList = order.items
      .map((it) => `• ${it.product.name} (Qty: ${it.quantity}) - Rs. ${(it.product.price * it.quantity).toLocaleString()}`)
      .join('\n');

    const msg = `*CONFIRMED MEDICINE ORDER — SULTAN HOMEOPATHIC CLINIC*
*Order ID:* ${order.id}
*Date:* ${order.createdAt}

*Patient / Customer:* ${order.customer.fullName}
*Phone:* ${order.customer.phone}
*WhatsApp:* ${order.customer.whatsapp}
*City:* ${order.customer.city} (${order.customer.province})
*Complete Address:* ${order.customer.address}
${order.customer.notes ? `*Notes:* ${order.customer.notes}\n` : ''}
*Ordered Medicines / Courses:*
${itemList}

*Subtotal:* Rs. ${order.subtotal.toLocaleString()}
*Delivery Charges:* ${order.shippingFee === 0 ? 'FREE' : `Rs. ${order.shippingFee}`}
*Net Amount to Pay:* Rs. ${order.total.toLocaleString()}
*Payment Method:* ${order.paymentMethod.toUpperCase()}

Please dispatch my order in discreet packaging. Thank you Dr. Zargham!`;

    window.open(`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="py-12 lg:py-16 bg-stone-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Link
            to="/medicines"
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('Back to Pharmacy Catalog', 'ادویات و فارمیسی کیٹلاگ پر واپس جائیں')}</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>{t('256-Bit SSL Encrypted Healthcare Checkout', 'محفوظ اور تصدیق شدہ چیک آؤٹ')}</span>
          </div>
        </div>

        {confirmedOrder ? (
          /* Confirmation Receipt View */
          <div className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-12 shadow-lg space-y-8 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-2 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h1 className="font-display text-3xl font-bold text-stone-900">
                Order Confirmed!
              </h1>
              <p className="text-xs sm:text-sm text-stone-600">
                Thank you, <strong className="text-stone-900">{confirmedOrder.customer.fullName}</strong>. Your order has been registered at Sultan Homeopathic Clinic.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-stone-200 pb-3">
                <span className="text-stone-500">Order Reference:</span>
                <span className="font-mono font-bold text-emerald-900">{confirmedOrder.id}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-3">
                <span className="text-stone-500">Booking Date:</span>
                <span className="font-semibold text-stone-800">{confirmedOrder.createdAt}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-3">
                <span className="text-stone-500">Estimated Delivery:</span>
                <span className="font-semibold text-stone-800">2 to 3 Working Days (via Leopard / TCS)</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-3">
                <span className="text-stone-500">Delivery Address:</span>
                <span className="font-semibold text-stone-800 text-right max-w-xs">
                  {confirmedOrder.customer.address}, {confirmedOrder.customer.city} ({confirmedOrder.customer.province})
                </span>
              </div>

              {/* Items List */}
              <div className="pt-2 space-y-2">
                <span className="font-bold text-stone-900 block">Prescribed Medicines:</span>
                {confirmedOrder.items.map((it) => (
                  <div key={it.product.id} className="flex justify-between text-xs text-stone-700">
                    <span>
                      {it.product.name} (x{it.quantity})
                    </span>
                    <span className="font-semibold tabular-nums">
                      Rs. {(it.product.price * it.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-between font-bold text-base text-stone-900">
                <span>Total Amount to Pay:</span>
                <span className="tabular-nums text-emerald-900">
                  Rs. {confirmedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="max-w-md mx-auto space-y-3">
              <button
                onClick={() => sendConfirmationToWhatsApp(confirmedOrder)}
                className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Order Confirmation to WhatsApp (+92342-7817236)</span>
              </button>

              <button
                onClick={() => window.print()}
                className="w-full py-2.5 px-4 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Receipt</span>
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/"
                  className="text-xs text-stone-500 hover:text-stone-900 underline underline-offset-4"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Checkout 2-Column Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Delivery & Payment Details */}
            <div className="lg:col-span-7 rounded-3xl bg-white border border-stone-200 p-6 sm:p-10 shadow-sm space-y-8">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
                  {t('Complete Your Order', 'اپنا آرڈر مکمل کریں')}
                </h1>
                <p className="text-xs text-stone-500 mt-1">
                  {t(
                    'Fast delivery across all tehsils, cities, and chaks in Pakistan.',
                    'پورے پاکستان کے تمام اضلاع، تحصیلوں، شہروں اور دیہاتوں میں تیز ترین پارسل ترسیل۔'
                  )}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section 1: Customer Details */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-800" />
                    <span>1. {t('Patient / Customer Delivery Information', 'مریض یا خریدار کا نام و پتہ')}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {t('Full Name', 'مکمل نام')} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Muhammad Usman"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {t('Primary Phone Number', 'موبائل فون نمبر')} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0342-1234567"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        WhatsApp Number (for parcel dispatch alerts)
                      </label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="e.g. 0342-7817236"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        City / Chak / Tehsil <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Samundri, Faisalabad, Lahore"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Province
                      </label>
                      <select
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      >
                        <option value="Punjab">Punjab</option>
                        <option value="Sindh">Sindh</option>
                        <option value="Khyber Pakhtunkhwa">KPK</option>
                        <option value="Balochistan">Balochistan</option>
                        <option value="Islamabad Capital">Islamabad</option>
                        <option value="Azad Kashmir">AJK</option>
                        <option value="Gilgit Baltistan">Gilgit Baltistan</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Complete Street Address & Landmark <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House / Mohallah / Chak, Street, Landmark"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Special Notes or Medical Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Deliver in afternoon, mention any ongoing symptoms..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                    />
                  </div>
                </div>

                {/* Section 2: Payment Method */}
                <div className="space-y-4 pt-4 border-t border-stone-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-emerald-800" />
                    <span>2. Select Payment Method</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label
                      className={`flex flex-col p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-emerald-800 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-800/30'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold">Cash on Delivery</span>
                        <Truck className="w-4 h-4 text-emerald-700" />
                      </div>
                      <span className="text-[11px] text-stone-500">Pay cash upon parcel delivery at your doorstep</span>
                    </label>

                    <label
                      className={`flex flex-col p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === 'easypaisa_jazzcash'
                          ? 'border-emerald-800 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-800/30'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'easypaisa_jazzcash'}
                        onChange={() => setPaymentMethod('easypaisa_jazzcash')}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold">EasyPaisa / JazzCash</span>
                        <CreditCard className="w-4 h-4 text-emerald-700" />
                      </div>
                      <span className="text-[11px] text-stone-500">Direct mobile wallet transfer</span>
                    </label>

                    <label
                      className={`flex flex-col p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === 'bank_transfer'
                          ? 'border-emerald-800 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-800/30'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={() => setPaymentMethod('bank_transfer')}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold">Bank Transfer / Raast</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      </div>
                      <span className="text-[11px] text-stone-500">Online bank or Raast payment</span>
                    </label>
                  </div>

                  {paymentMethod !== 'cod' && (
                    <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-700 space-y-1">
                      <div className="font-semibold text-stone-900">Transfer Account Details:</div>
                      <p>
                        Send total payment to EasyPaisa / JazzCash: <strong>{CLINIC_INFO.phone}</strong> (Account Title: M Zargham Ghaffar). Once transferred, please share the screenshot via WhatsApp.
                      </p>
                    </div>
                  )}
                </div>

                {/* Privacy & Discreet Packaging Guarantee */}
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3 text-xs text-emerald-900">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>
                    <strong>100% Discreet Packaging:</strong> All parcels are shipped in confidential, opaque packaging with zero sensitive labels for patient privacy.
                  </span>
                </div>

                {/* Submit Order */}
                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full py-4 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Registering Order...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Place Order (Pay Rs. {total.toLocaleString()})</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-800" />
                  <h3 className="font-display text-lg font-bold text-stone-900">
                    Order Summary ({items.reduce((acc, it) => acc + it.quantity, 0)})
                  </h3>
                </div>
                <Link to="/medicines" className="text-xs text-emerald-800 hover:underline">
                  Edit
                </Link>
              </div>

              {/* Free Delivery Meter */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-950">
                {isFreeShipping ? (
                  <div className="flex items-center gap-2 font-semibold text-emerald-800">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    <span>FREE Nationwide Delivery unlocked!</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Add Rs. {(CLINIC_INFO.delivery.freeDeliveryThreshold - subtotal).toLocaleString()} for Free Delivery</span>
                      <span className="font-bold tabular-nums">
                        {Math.round((subtotal / CLINIC_INFO.delivery.freeDeliveryThreshold) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-emerald-200/80 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-700 h-full rounded-full transition-all"
                        style={{ width: `${Math.min(100, (subtotal / CLINIC_INFO.delivery.freeDeliveryThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="text-center py-8 text-xs text-stone-500">
                    Your cart is empty. <Link to="/medicines" className="text-emerald-800 font-bold underline">Add medicines</Link>
                  </div>
                ) : (
                  items.map((it) => (
                    <div
                      key={it.product.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-stone-100 bg-stone-50 text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-bold text-stone-900 truncate">{it.product.name}</div>
                        <div className="text-stone-500 tabular-nums">
                          Rs. {it.product.price.toLocaleString()} x {it.quantity}
                        </div>
                      </div>
                      <span className="font-bold text-stone-900 tabular-nums shrink-0">
                        Rs. {(it.product.price * it.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Nationwide Courier Delivery</span>
                  <span className="font-semibold tabular-nums text-emerald-800">
                    {shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-stone-200 flex justify-between font-bold text-base text-stone-900">
                  <span>Total Payable:</span>
                  <span className="tabular-nums text-emerald-900 text-lg">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-100 text-[11px] text-stone-600 space-y-1">
                <p>📦 Delivery handled by Leopard / TCS courier service.</p>
                <p>📍 Available across Punjab, Sindh, KPK, Balochistan, Islamabad, AJK.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
