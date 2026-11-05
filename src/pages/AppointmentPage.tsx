import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Clock, CheckCircle2, User, Phone, MapPin, MessageCircle, Building2, Video, Printer, Stethoscope } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicInfo';
import { CLINIC_DISEASES } from '../data/treatments';
import { AppointmentData } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { sendNotificationToDoctor } from '../services/notificationService';

export const AppointmentPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialConcern = searchParams.get('concern') || CLINIC_DISEASES[0].title;

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Child'>('Male');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [consultationType, setConsultationType] = useState<'in_clinic' | 'online_video'>('in_clinic');
  const [diseaseConcern, setDiseaseConcern] = useState(initialConcern);
  const [preferredDate, setPreferredDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('Morning (10:00 AM - 01:00 PM)');
  const [symptomsDescription, setSymptomsDescription] = useState('');

  const [confirmedAppointment, setConfirmedAppointment] = useState<AppointmentData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const concernFromQuery = searchParams.get('concern');
    if (concernFromQuery) {
      setDiseaseConcern(concernFromQuery);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !phone || !age || !city) {
      alert('Please fill in your name, contact phone, age, and city.');
      return;
    }

    setIsSubmitting(true);
    const bookingId = `APT-${Math.floor(10000 + Math.random() * 90000)}`;

    const newAppointment: AppointmentData = {
      id: bookingId,
      patientName,
      phone,
      whatsapp: whatsapp || phone,
      gender,
      age,
      city,
      consultationType,
      diseaseConcern,
      preferredDate,
      preferredTimeSlot,
      symptomsDescription,
      createdAt: new Date().toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };

    // System automatically sends complete appointment details to Dr. Zargham Ghaffar's connected number (+92342-7817236)
    // without redirecting or taking the user away from the website
    await sendNotificationToDoctor({
      type: 'appointment',
      customerName: newAppointment.patientName,
      phone: newAppointment.phone,
      details: {
        token: newAppointment.id,
        patientName: newAppointment.patientName,
        phone: newAppointment.phone,
        whatsapp: newAppointment.whatsapp,
        gender: newAppointment.gender,
        age: newAppointment.age,
        city: newAppointment.city,
        consultationType: newAppointment.consultationType,
        diseaseConcern: newAppointment.diseaseConcern,
        preferredDate: newAppointment.preferredDate,
        preferredTimeSlot: newAppointment.preferredTimeSlot,
        symptomsDescription: newAppointment.symptomsDescription,
        bookingTime: new Date().toLocaleString('en-PK'),
      },
      summary: `New Appointment Booking: Token ${newAppointment.id} for ${newAppointment.patientName} (${newAppointment.gender}, ${newAppointment.age}y, ${newAppointment.city}). Concern: ${newAppointment.diseaseConcern}. Slot: ${newAppointment.preferredDate} (${newAppointment.preferredTimeSlot}).`,
    });

    setIsSubmitting(false);
    setConfirmedAppointment(newAppointment);
  };

  const sendWhatsAppBooking = (apt: AppointmentData) => {
    const msg = `*NEW APPOINTMENT BOOKING — SULTAN HOMEOPATHIC CLINIC*
*Booking Token:* ${apt.id}
*Physician:* Physician M Zargham Ghaffar

*Patient:* ${apt.patientName} (${apt.gender}, Age: ${apt.age})
*Phone / WhatsApp:* ${apt.phone}
*City:* ${apt.city}
*Mode:* ${apt.consultationType === 'in_clinic' ? 'In-Clinic Visit (Samundri-Rajana Road, Faisalabad)' : 'Online / WhatsApp Video Consultation'}
*Health Concern / Disease:* ${apt.diseaseConcern}
*Requested Date:* ${apt.preferredDate}
*Preferred Time Slot:* ${apt.preferredTimeSlot}
${apt.symptomsDescription ? `*Case Notes:* ${apt.symptomsDescription}\n` : ''}

Please confirm my consultation schedule. Thank you!`;

    window.open(`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="py-12 lg:py-16 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-100/70 px-3.5 py-1.5 rounded-md">
            <Calendar className="w-3.5 h-3.5" />
            <span>{t('Consultation Scheduling', 'وقت ملاقات شیڈول')}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            {t('Schedule an Appointment', 'ڈاکٹر صاحب سے وقت ملاقات لیں')}
          </h1>

          {/* Authentic Nastaliq Urdu Display */}
          <div className="font-urdu text-lg sm:text-xl text-emerald-950 font-bold leading-loose text-center" dir="rtl">
            معالج ایم زرغام غفار سے کلینک وزٹ یا آن لائن ویڈیو مشورہ کے لیے وقت حاصل کریں
          </div>

          <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto">
            {t(
              'Book an in-person physical consultation at our Samundri clinic or schedule an online video consultation from any city in Pakistan or overseas.',
              'سمندری کلینک پر بالمشافہ معائنہ یا پاکستان کے کسی بھی شہر سے آن لائن ویڈیو کال کے لیے وقت بک کریں۔'
            )}
          </p>
        </div>

        {/* Confirmed State or Booking Form */}
        {confirmedAppointment ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-8 sm:p-10 shadow-lg space-y-6 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-display text-2xl font-bold text-stone-900">
                {t('Appointment Registered Successfully!', 'وقت ملاقات کامیابی سے رجسٹر ہو گیا ہے!')}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                {t('Your appointment token is', 'آپ کا اپائنٹمنٹ ٹوکن نمبر ہے:')}{' '}
                <strong className="text-emerald-900 font-mono text-base">{confirmedAppointment.id}</strong>.
              </p>
              <p className="text-xs text-emerald-800 bg-emerald-50 py-2 px-3 rounded-lg max-w-md mx-auto">
                {t(
                  'Your appointment details have been automatically forwarded to Dr. M Zargham Ghaffar on WhatsApp (+92342-7817236).',
                  'آپ کی بکنگ تفصیلات ڈاکٹر ایم زرغام غفار کے واٹس ایپ پر خود بخود ارسال کر دی گئی ہیں۔'
                )}
              </p>
            </div>

            {/* Token Card */}
            <div className="p-6 rounded-xl bg-stone-50 border border-stone-200 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">{t('Patient:', 'مریض:')}</span>
                <span className="font-semibold text-stone-900">
                  {confirmedAppointment.patientName} ({confirmedAppointment.gender}, {confirmedAppointment.age} years)
                </span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">{t('Consultation Mode:', 'طریقہ معائنہ:')}</span>
                <span className="font-semibold text-emerald-900">
                  {confirmedAppointment.consultationType === 'in_clinic'
                    ? t('In-Clinic (Adda Kottan, Samundri-Rajana Road)', 'کلینک بالمشافہ (اڈہ کوٹاں، سمندری-رجانہ روڈ)')
                    : t('Online WhatsApp Video / Voice Call', 'آن لائن واٹس ایپ ویڈیو یا وائس کال')}
                </span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">{t('Primary Health Concern:', 'مرض کی تفصیل:')}</span>
                <span className="font-semibold text-stone-900">{confirmedAppointment.diseaseConcern}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">{t('Date & Slot:', 'تاریخ و وقت:')}</span>
                <span className="font-semibold text-stone-900">
                  {confirmedAppointment.preferredDate} · {confirmedAppointment.preferredTimeSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t('Location / City:', 'شہر / علاقہ:')}</span>
                <span className="font-semibold text-stone-900">{confirmedAppointment.city}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => sendWhatsAppBooking(confirmedAppointment)}
                className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('Resend to WhatsApp (+92342-7817236)', 'دوبارہ واٹس ایپ پر ارسال کریں')}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="w-full py-2.5 px-4 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{t('Print Appointment Slip', 'اپائنٹمنٹ پرچی پرنٹ کریں')}</span>
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-10 shadow-sm space-y-8"
          >
            {/* Step 1: Mode */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
                1. {t('Select Consultation Mode', 'طریقہ مشورہ منتخب کریں')}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                    consultationType === 'in_clinic'
                      ? 'border-emerald-800 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-800'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    checked={consultationType === 'in_clinic'}
                    onChange={() => setConsultationType('in_clinic')}
                    className="sr-only"
                  />
                  <Building2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold block">
                      {t('In-Clinic Consultation', 'کلینک تشریف آوری')}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {t(
                        'Physical visit at Adda Kottan, Chak 477 GB, Samundri-Rajana Road',
                        'بالمشافہ معائنہ کلینک اڈہ کوٹاں، سمندری-رجانہ روڈ'
                      )}
                    </span>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                    consultationType === 'online_video'
                      ? 'border-emerald-800 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-800'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    checked={consultationType === 'online_video'}
                    onChange={() => setConsultationType('online_video')}
                    className="sr-only"
                  />
                  <Video className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold block">
                      {t('Online / WhatsApp Call', 'آن لائن ویڈیو یا آڈیو کال')}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {t('For patients residing in other cities or overseas', 'دیگر شہروں یا بیرون ملک مریضوں کے لیے')}
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 2: Patient Info */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
                2. {t('Patient Details', 'مریض کی تفصیلات')}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Patient Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Muhammad Asif"
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

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2.5 text-xs rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Child">Child</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Age <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="110"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 28"
                    className="w-full px-3 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    City / Chak <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Samundri"
                    className="w-full px-3 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Disease & Timing */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
                3. Disease Concern & Scheduling
              </label>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Primary Medical Concern / Illness
                </label>
                <select
                  value={diseaseConcern}
                  onChange={(e) => setDiseaseConcern(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                >
                  {CLINIC_DISEASES.map((d) => (
                    <option key={d.id} value={d.title}>
                      {d.title} ({d.urduTitle})
                    </option>
                  ))}
                  <option value="General Chronic Illness Consultation">General Chronic Illness Consultation</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={preferredTimeSlot}
                    onChange={(e) => setPreferredTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  >
                    <option value="Morning (09:00 AM - 11:30 AM)">Morning (09:00 AM - 11:30 AM)</option>
                    <option value="Mid-day (11:30 AM - 02:00 PM)">Mid-day (11:30 AM - 02:00 PM)</option>
                    <option value="Evening (04:00 PM - 06:30 PM)">Evening (04:00 PM - 06:30 PM)</option>
                    <option value="Night (06:30 PM - 09:00 PM)">Night (06:30 PM - 09:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Symptoms History / Previous Reports Summary (Optional)
                </label>
                <textarea
                  rows={3}
                  value={symptomsDescription}
                  onChange={(e) => setSymptomsDescription(e.target.value)}
                  placeholder="Describe your symptoms, how long you have had this problem, ultrasound or lab report findings..."
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Registering Appointment...</span>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Appointment Booking</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
