import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Phone, MapPin, MessageCircle, Stethoscope, Video, Building2 } from 'lucide-react';
import { AppointmentData } from '../types';
import { CLINIC_INFO } from '../data/clinicInfo';
import { CLINIC_DISEASES } from '../data/treatments';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultConcern?: string;
  onAppointmentBooked: (appointment: AppointmentData) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultConcern,
  onAppointmentBooked,
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Child'>('Male');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [consultationType, setConsultationType] = useState<'in_clinic' | 'online_video'>('in_clinic');
  const [diseaseConcern, setDiseaseConcern] = useState(defaultConcern || CLINIC_DISEASES[0].title);
  const [preferredDate, setPreferredDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('Morning (10:00 AM - 01:00 PM)');
  const [symptomsDescription, setSymptomsDescription] = useState('');

  const [confirmedAppointment, setConfirmedAppointment] = useState<AppointmentData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
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

    setTimeout(() => {
      setConfirmedAppointment(newAppointment);
      setIsSubmitting(false);
      onAppointmentBooked(newAppointment);
    }, 500);
  };

  const sendWhatsAppBooking = (apt: AppointmentData) => {
    const msg = `*APPOINTMENT BOOKING REQUEST — SULTAN HOMEOPATHIC CLINIC*
*Booking ID:* ${apt.id}
*Physician:* Physician M Zargham Ghaffar

*Patient Name:* ${apt.patientName} (${apt.gender}, Age: ${apt.age})
*Phone / WhatsApp:* ${apt.phone}
*City:* ${apt.city}
*Consultation Mode:* ${apt.consultationType === 'in_clinic' ? 'In-Clinic Visit (Samundri, Faisalabad)' : 'Online / WhatsApp Video Consultation'}
*Health Concern / Disease:* ${apt.diseaseConcern}
*Requested Date:* ${apt.preferredDate}
*Preferred Time Slot:* ${apt.preferredTimeSlot}
${apt.symptomsDescription ? `*Symptoms History:* ${apt.symptomsDescription}\n` : ''}

Please confirm my appointment slot. Thank you!`;

    window.open(`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 animate-in zoom-in-95 duration-200 my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-emerald-950 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white flex items-center justify-center">
              <Calendar className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">
                {confirmedAppointment ? 'Consultation Booked!' : 'Schedule an Appointment'}
              </h3>
              <p className="text-xs text-emerald-200/90">
                Direct consultation with Physician M Zargham Ghaffar
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-emerald-900 text-emerald-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form or Confirmation */}
        {confirmedAppointment ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-xl font-bold text-stone-900">
                Appointment Registered!
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Token ID: <strong className="text-emerald-900 font-mono">{confirmedAppointment.id}</strong>. Physician M Zargham Ghaffar will review your case.
              </p>
            </div>

            {/* Appointment Card */}
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Patient:</span>
                <span className="font-semibold text-stone-900">
                  {confirmedAppointment.patientName} ({confirmedAppointment.gender}, {confirmedAppointment.age} yrs)
                </span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Consultation Mode:</span>
                <span className="font-semibold text-emerald-900">
                  {confirmedAppointment.consultationType === 'in_clinic'
                    ? 'In-Clinic (Adda Kottan, Samundri-Rajana Road)'
                    : 'Online Video / WhatsApp Call'}
                </span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Clinical Concern:</span>
                <span className="font-semibold text-stone-900">{confirmedAppointment.diseaseConcern}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Date & Time Slot:</span>
                <span className="font-semibold text-stone-900">
                  {confirmedAppointment.preferredDate} · {confirmedAppointment.preferredTimeSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">City / Location:</span>
                <span className="font-semibold text-stone-900">{confirmedAppointment.city}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => sendWhatsAppBooking(confirmedAppointment)}
                className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Notify Doctor Zargham on WhatsApp (+92342-7817236)</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Consultation Mode Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
                1. Select Consultation Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    consultationType === 'in_clinic'
                      ? 'border-emerald-800 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-800'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="consultationType"
                    checked={consultationType === 'in_clinic'}
                    onChange={() => setConsultationType('in_clinic')}
                    className="sr-only"
                  />
                  <Building2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold block">In-Clinic Visit</span>
                    <span className="text-[11px] text-stone-500">
                      Adda Kottan, Samundri-Rajana Road, Faisalabad
                    </span>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    consultationType === 'online_video'
                      ? 'border-emerald-800 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-800'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="consultationType"
                    checked={consultationType === 'online_video'}
                    onChange={() => setConsultationType('online_video')}
                    className="sr-only"
                  />
                  <Video className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold block">Online / WhatsApp Call</span>
                    <span className="text-[11px] text-stone-500">
                      Ideal for patients across Pakistan or Overseas
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Patient Personal Data */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
                2. Patient Information
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
                    placeholder="e.g. Tariq Mehmood"
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
                    <option value="Child">Child (Under 12)</option>
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
                    placeholder="e.g. 32"
                    className="w-full px-3 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    City / Town <span className="text-rose-500">*</span>
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

            {/* Disease & Appointment Slot */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
                3. Clinical Concern & Preferred Slot
              </label>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Primary Disease / Medical Concern
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
                  <option value="Other Chronic Health Issue">Other Chronic Health Issue</option>
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
                    Time Slot
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
                  Brief Description of Symptoms / Medical History
                </label>
                <textarea
                  rows={2}
                  value={symptomsDescription}
                  onChange={(e) => setSymptomsDescription(e.target.value)}
                  placeholder="Mention how long you have had this problem, previous tests, or ultrasound reports..."
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Booking Appointment...</span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Consultation Booking</span>
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
