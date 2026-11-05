import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, Copy, Check, ExternalLink, Send, Car, Bus, ShieldCheck, Building2, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicInfo';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { sendNotificationToDoctor } from '../services/notificationService';

export const ContactLocationPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryDisease, setInquiryDisease] = useState('Infertility / Stones / General Chronic');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const fullAddressString = `${CLINIC_INFO.address.spot}, ${CLINIC_INFO.address.road}, ${CLINIC_INFO.address.tehsil}, ${CLINIC_INFO.address.district}, ${CLINIC_INFO.address.province}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddressString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone || !inquiryMessage) return;

    setIsSubmitting(true);

    // Automatically send full inquiry details to Dr. Zargham Ghaffar's connected number via system without redirecting the user
    await sendNotificationToDoctor({
      type: 'inquiry',
      customerName: inquiryName,
      phone: inquiryPhone,
      details: {
        diseaseConcern: inquiryDisease,
        message: inquiryMessage,
        submittedAt: new Date().toLocaleString('en-PK'),
      },
      summary: `Patient ${inquiryName} (${inquiryPhone}) inquired regarding: ${inquiryDisease}. Message: ${inquiryMessage}`,
    });

    setIsSubmitting(false);
    setSentSuccess(true);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Adda Kottan, Chak 477 GB, Samundri-Rajana Road, Faisalabad'
  )}`;

  return (
    <div className="py-12 lg:py-20 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-100/70 px-3.5 py-1.5 rounded-md">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t('Clinic Location & Contact Hub', 'کلینک لوکیشن اور رابطہ')}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            {t('Contact & Clinic Directions', 'رابطہ اور کلینک کا راستہ')}
          </h1>

          {/* Authentic Nastaliq Urdu Display */}
          <div className="font-urdu text-xl sm:text-2xl text-emerald-950 font-bold leading-loose text-center" dir="rtl">
            اڈہ کوٹاں، سمندری-رجانہ روڈ، فیصل آباد پر کلینک تشریف لائیں یا فون پر رابطہ کریں
          </div>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {t(
              'Conveniently situated directly on the main Samundri-Rajana highway at Adda Kottan. Reach us by telephone, WhatsApp, or visit the physical clinic for consultation.',
              'مین سمندری-رجانہ ہائی وے پر اڈہ کوٹاں پر واقع ہے۔ فون یا واٹس ایپ پر رابطہ کریں یا بالمشافہ معائنے کے لیے تشریف لائیں۔'
            )}
          </p>
        </div>

        {/* 3 Quick Action Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href={`tel:${CLINIC_INFO.phone}`}
            className="p-6 rounded-3xl bg-white border border-stone-200 hover:border-emerald-300 hover:shadow-lg transition-all space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
                Direct Telephone
              </span>
              <h3 className="font-display text-lg font-bold text-stone-900 mt-0.5">
                {CLINIC_INFO.phone}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Mon – Sat: 9:00 AM – 9:00 PM (Emergency calls answered 24/7)
              </p>
            </div>
          </a>

          <a
            href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-3xl bg-white border border-stone-200 hover:border-emerald-300 hover:shadow-lg transition-all space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition-colors">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
                WhatsApp Doctor Consultation
              </span>
              <h3 className="font-display text-lg font-bold text-stone-900 mt-0.5">
                Chat With Dr. Zargham
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Share ultrasound reports, blood tests, or skin photos directly
              </p>
            </div>
          </a>

          <Link
            to="/appointment"
            className="p-6 rounded-3xl bg-white border border-stone-200 hover:border-emerald-300 hover:shadow-lg transition-all space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition-colors">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
                Consultation Booking
              </span>
              <h3 className="font-display text-lg font-bold text-stone-900 mt-0.5">
                Reserve an In-Clinic Slot
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Lock your consultation time before traveling to the clinic
              </p>
            </div>
          </Link>
        </div>

        {/* Live Interactive Google Map + Complete Address Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Live Google Maps Iframe */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-stone-200 overflow-hidden shadow-md flex flex-col">
            <div className="p-4 bg-stone-100/90 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-emerald-800" />
                <span className="text-xs font-bold text-stone-800">
                  Live Synced Google Maps View
                </span>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>Open in App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Live Google Maps Iframe */}
            <div className="relative w-full h-[400px] sm:h-[460px] bg-stone-200">
              <iframe
                title="Sultan Homeopathic Clinic Google Map"
                src="https://maps.google.com/maps?q=Adda%20Kottan%20Chak%20477%20GB%20Samundri%20Rajana%20Road%20Faisalabad&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Map Action Strip */}
            <div className="p-4 bg-white border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-stone-600">
                GPS: <strong>31.0631° N, 72.9511° E</strong> (Adda Kottan)
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyAddress}
                  className="px-3.5 py-2 border border-stone-300 rounded-xl hover:bg-stone-50 text-stone-700 font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Start Live Navigation</span>
                </a>
              </div>
            </div>
          </div>

          {/* Full Clinic Address & Hours Breakdown */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-800">
                Physical Dispensary & Clinic
              </span>
              <h2 className="font-display text-2xl font-bold text-stone-900">
                Sultan Homeopathic Clinic
              </h2>
              <p className="text-xs text-stone-500">
                Supervised by Physician M Zargham Ghaffar (R.H.M.P)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1 text-xs sm:text-sm text-stone-800">
              <p className="font-bold text-stone-900">{CLINIC_INFO.address.spot}</p>
              <p className="text-stone-700">{CLINIC_INFO.address.road}</p>
              <p className="text-stone-600">{CLINIC_INFO.address.tehsil}, {CLINIC_INFO.address.district}</p>
              <p className="text-emerald-900 font-semibold">{CLINIC_INFO.address.province}</p>
              <p className="text-xs text-stone-500 pt-2 border-t border-stone-200 mt-2">
                <strong>Landmark:</strong> {CLINIC_INFO.address.landmark}
              </p>
            </div>

            {/* Consulting Shifts */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-900 block uppercase tracking-wider">
                Clinic Consultation Shifts
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-100 space-y-0.5">
                  <span className="text-stone-500 block">Morning Shift</span>
                  <strong className="text-emerald-950 font-bold block">{CLINIC_INFO.timings.morning}</strong>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-100 space-y-0.5">
                  <span className="text-stone-500 block">Evening Shift</span>
                  <strong className="text-emerald-950 font-bold block">{CLINIC_INFO.timings.evening}</strong>
                </div>
              </div>
              <p className="text-[11px] text-stone-500">
                Open: Monday – Saturday (Sunday emergencies via prior WhatsApp booking)
              </p>
            </div>

            {/* Public Transport Note */}
            <div className="p-3.5 rounded-xl bg-stone-100 text-xs text-stone-600 space-y-1">
              <div className="font-semibold text-stone-900">Van & Bus Stop:</div>
              <p>
                All passenger vans between Samundri and Rajana stop right at &quot;Adda Kottan&quot;. The clinic is a 1-minute walk from the main bus stop.
              </p>
            </div>
          </div>
        </div>

        {/* Travel Matrix from Neighboring Cities */}
        <div className="rounded-3xl bg-white border border-stone-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="max-w-2xl space-y-1">
            <h3 className="font-display text-xl font-bold text-stone-900">
              Driving & Travel Distance Guide
            </h3>
            <p className="text-xs text-stone-500">
              Estimated travel times via car, motorcycle, or passenger van to Adda Kottan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-stone-500 block">From Samundri City</span>
              <strong className="text-stone-900 text-sm font-bold block">12 Kilometers</strong>
              <span className="text-emerald-800 font-semibold">Approx. 15 Minutes Drive</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-stone-500 block">From Rajana Chowk</span>
              <strong className="text-stone-900 text-sm font-bold block">16 Kilometers</strong>
              <span className="text-emerald-800 font-semibold">Approx. 20 Minutes Drive</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-stone-500 block">From Gojra City</span>
              <strong className="text-stone-900 text-sm font-bold block">28 Kilometers</strong>
              <span className="text-emerald-800 font-semibold">Approx. 35 Minutes Drive</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-stone-500 block">From Faisalabad City</span>
              <strong className="text-stone-900 text-sm font-bold block">48 Kilometers</strong>
              <span className="text-emerald-800 font-semibold">Approx. 55 Minutes Drive</span>
            </div>
          </div>
        </div>

        {/* Direct Case Inquiry Form */}
        <div className="max-w-2xl mx-auto rounded-3xl bg-white border border-stone-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-display text-2xl font-bold text-stone-900">
              Submit a Direct Case Inquiry
            </h3>
            <p className="text-xs text-stone-500">
              Your message will be sent directly to Dr. Zargham Ghaffar&apos;s WhatsApp helpline for quick review.
            </p>
          </div>

          {sentSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-display text-lg font-bold">
                {t('Inquiry Sent Successfully!', 'پیغام کامیابی سے بھیج دیا گیا ہے!')}
              </h4>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                {t(
                  'Thank you for reaching out! Your inquiry details have been forwarded automatically to Dr. M Zargham Ghaffar on WhatsApp (+92342-7817236). Our team will review your case shortly.',
                  'ہم سے رابطہ کرنے کا شکریہ! آپ کے کوائف ڈاکٹر ایم زرغام غفار کے واٹس ایپ پر خود بخود موصول ہو گئے ہیں۔ ہم جلد آپ سے رابطہ کریں گے۔'
                )}
              </p>
              <button
                onClick={() => {
                  setSentSuccess(false);
                  setInquiryName('');
                  setInquiryPhone('');
                  setInquiryMessage('');
                }}
                className="mt-2 text-xs font-semibold text-emerald-900 underline underline-offset-4 cursor-pointer"
              >
                {t('Send Another Message', 'ایک اور پیغام بھیجیں')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendInquiry} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t('Your Full Name', 'آپ کا مکمل نام')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="e.g. Asad Ullah"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t('Your Phone / WhatsApp Number', 'موبائل فون یا واٹس ایپ نمبر')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={inquiryPhone}
                  onChange={(e) => setInquiryPhone(e.target.value)}
                  placeholder="e.g. 0342-1234567"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t('Primary Disease / Medical Concern', 'مرض یا طبی مسئلہ')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={inquiryDisease}
                  onChange={(e) => setInquiryDisease(e.target.value)}
                  placeholder={t('e.g. Kidney Stone, Infertility, IBS, Skin Allergy', 'مثلاً گردے کی پتھری، بانجھ پن، آئی بی ایس، جلد کی الرجی')}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t('Your Message or Symptoms History', 'علامات کی تفصیل یا پیغام')} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder={t(
                    'Mention duration of illness, recent ultrasound or blood test findings...',
                    'مرض کا دورانیہ، الٹراساؤنڈ یا لیب رپورٹ کے نتائج کی تفصیل لکھیں...'
                  )}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>{t('Sending to Clinic System...', 'کلینک سسٹم کو ارسال کیا جا رہا ہے...')}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('Submit Medical Inquiry', 'طبی سوال / پیغام ارسال کریں')}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
