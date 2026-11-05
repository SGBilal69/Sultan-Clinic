import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, Phone, MessageCircle, CreditCard, Banknote, MapPin, Printer } from 'lucide-react';
import { CartItem, Order, PaymentMethod } from '../types';
import { CLINIC_INFO } from '../data/clinicInfo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
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

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= CLINIC_INFO.delivery.freeDeliveryThreshold;
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : CLINIC_INFO.delivery.flatRate;
  const total = subtotal + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !city || !address) {
      alert('Please fill in your name, contact phone, city, and delivery address.');
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

    setTimeout(() => {
      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      onOrderComplete(newOrder);
    }, 600);
  };

  const sendConfirmationToWhatsApp = (order: Order) => {
    const itemList = order.items
      .map((it) => `• ${it.product.name} x ${it.quantity} = Rs. ${(it.product.price * it.quantity).toLocaleString()}`)
      .join('\n');

    const msg = `*NEW ORDER CONFIRMATION — SULTAN HOMEOPATHIC CLINIC*
*Order ID:* ${order.id}
*Date:* ${order.createdAt}

*Patient / Customer:* ${order.customer.fullName}
*Phone:* ${order.customer.phone}
*WhatsApp:* ${order.customer.whatsapp}
*City:* ${order.customer.city} (${order.customer.province})
*Complete Address:* ${order.customer.address}
${order.customer.notes ? `*Special Notes:* ${order.customer.notes}\n` : ''}
*Ordered Medicines / Courses:*
${itemList}

*Subtotal:* Rs. ${order.subtotal.toLocaleString()}
*Shipping Fee:* ${order.shippingFee === 0 ? 'FREE' : `Rs. ${order.shippingFee}`}
*Net Total Payable:* Rs. ${order.total.toLocaleString()}
*Payment Method:* ${order.paymentMethod.toUpperCase()}

Please dispatch my order via Leopard / TCS. Thank you!`;

    window.open(`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 animate-in zoom-in-95 duration-200 my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="font-display text-lg font-bold text-stone-900">
              {confirmedOrder ? 'Order Confirmed!' : 'Checkout & Delivery Details'}
            </h3>
            <p className="text-xs text-stone-500">
              {confirmedOrder
                ? 'Your order has been recorded and is being prepared for dispatch.'
                : 'Fast delivery across all cities, tehsils, and chaks of Pakistan.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200/70 text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Form or Confirmed State */}
        {confirmedOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-xl font-bold text-stone-900">
                Thank You, {confirmedOrder.customer.fullName}!
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Your order <strong className="text-emerald-900 font-mono">{confirmedOrder.id}</strong> has been received by Sultan Homeopathic Clinic.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-3 text-xs">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Order ID & Date:</span>
                <span className="font-semibold text-stone-800">
                  {confirmedOrder.id} · {confirmedOrder.createdAt}
                </span>
              </div>

              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Delivery Address:</span>
                <span className="font-semibold text-stone-800 text-right max-w-xs truncate">
                  {confirmedOrder.customer.address}, {confirmedOrder.customer.city}
                </span>
              </div>

              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Payment Mode:</span>
                <span className="font-semibold text-stone-800 uppercase">
                  {confirmedOrder.paymentMethod === 'cod'
                    ? 'Cash on Delivery (Pay upon arrival)'
                    : confirmedOrder.paymentMethod}
                </span>
              </div>

              <div className="pt-1 space-y-1">
                <span className="font-bold text-stone-900 block">Ordered Items:</span>
                {confirmedOrder.items.map((it) => (
                  <div key={it.product.id} className="flex justify-between text-stone-700">
                    <span>
                      {it.product.name} (x{it.quantity})
                    </span>
                    <span className="font-semibold tabular-nums">
                      Rs. {(it.product.price * it.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                <span>Net Total Payable:</span>
                <span className="tabular-nums text-emerald-900">
                  Rs. {confirmedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Instructions & WhatsApp Share */}
            <div className="space-y-3">
              <button
                onClick={() => sendConfirmationToWhatsApp(confirmedOrder)}
                className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Order via WhatsApp with Dr. Zargham (+92342-7817236)</span>
              </button>

              <button
                onClick={() => window.print()}
                className="w-full py-2.5 px-4 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Order Receipt</span>
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={onClose}
                className="text-xs text-stone-500 hover:text-stone-900 underline underline-offset-4"
              >
                Close and return to Clinic
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            {/* Customer Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-800" />
                <span>Patient / Customer Shipping Information</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Muhammad Usman"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Contact Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0342-1234567"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    WhatsApp Number (for parcel updates)
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="e.g. 0342-7817236"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    City / Tehsil / Chak <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Samundri, Faisalabad, Lahore"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
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
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Islamabad Capital">Islamabad Capital</option>
                    <option value="Azad Kashmir">Azad Jammu & Kashmir</option>
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
                    placeholder="House / Chak / Mohallah, Street, Landmark"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Special Notes or Symptoms (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Deliver in afternoon, or mention any ongoing medication"
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <Banknote className="w-4 h-4 text-emerald-800" />
                <span>Select Payment Method</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-800 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-800'
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
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">Cash on Delivery</span>
                    <Truck className="w-4 h-4 text-emerald-700" />
                  </div>
                  <span className="text-[11px] text-stone-500">Pay cash upon delivery at your door</span>
                </label>

                <label
                  className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'easypaisa_jazzcash'
                      ? 'border-emerald-800 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-800'
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
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">EasyPaisa / JazzCash</span>
                    <CreditCard className="w-4 h-4 text-emerald-700" />
                  </div>
                  <span className="text-[11px] text-stone-500">Instant mobile wallet transfer</span>
                </label>

                <label
                  className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-emerald-800 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-800'
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
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">Bank Transfer / Raast</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  </div>
                  <span className="text-[11px] text-stone-500">Direct online bank transfer</span>
                </label>
              </div>

              {/* Bank / Wallet Details Callout */}
              {paymentMethod !== 'cod' && (
                <div className="p-3.5 rounded-lg bg-stone-100 border border-stone-200 text-xs text-stone-700 space-y-1">
                  <div className="font-semibold text-stone-900">
                    Payment Transfer Instructions:
                  </div>
                  <p>
                    Please send payment to EasyPaisa / JazzCash: <strong>{CLINIC_INFO.phone}</strong> (Account Title: M Zargham Ghaffar). Once transferred, please share the transaction receipt screenshot on WhatsApp.
                  </p>
                </div>
              )}
            </div>

            {/* Bill Summary */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({items.length} unique items)</span>
                <span className="font-semibold tabular-nums text-stone-900">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping Fee</span>
                <span className="font-semibold tabular-nums text-emerald-800">
                  {shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                <span>Total Amount to Pay</span>
                <span className="tabular-nums text-emerald-900">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Submit */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Place Order (Pay Rs. {total.toLocaleString()})</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
