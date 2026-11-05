import React from 'react';
import { Award, BookOpen, HeartPulse, CheckCircle2, MessageCircle, Phone, Stethoscope } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicInfo';
import { DoctorClinicalSeal } from './DoctorClinicalSeal';

interface DoctorProfileProps {
  onOpenAppointment: () => void;
}

export const DoctorProfile: React.FC<DoctorProfileProps> = ({ onOpenAppointment }) => {
  return (
    <section id="doctor" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Official Clinical Seal replacing doctor photo for privacy */}
          <div className="lg:col-span-5">
            <DoctorClinicalSeal size="lg" />
          </div>

          {/* Doctor Bio & Clinical Principles */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-50 px-3 py-1 rounded-md">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Meet The Leading Physician</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight text-balance">
              Dedicated to Natural Healing & Individualized Patient Care
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              <strong>Physician M Zargham Ghaffar</strong> has dedicated his clinical life to the science of Classical Homeopathy. Rather than masking disease symptoms with temporary suppressants, his approach focuses on the individual&apos;s physical constitution, mental temperament, and inherited predispositions to stimulate the body&apos;s natural immune system.
            </p>

            {/* Principles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-2.5 text-stone-900 font-bold text-sm mb-1.5">
                  <HeartPulse className="w-4 h-4 text-emerald-700" />
                  <span>No Steroids or Toxic Additives</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Every preparation uses genuine imported homeopathic mother tinctures and potentized dilutions, thoroughly safe for children, women, and elderly patients.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-2.5 text-stone-900 font-bold text-sm mb-1.5">
                  <Award className="w-4 h-4 text-emerald-700" />
                  <span>Transparent Daily Pricing</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We maintain a strict commitment to patient affordability. Prescribed daily medicines generally cost just <strong>Rs. 100 to 200 per day</strong>.
                </p>
              </div>
            </div>

            {/* Key Clinical Commitments */}
            <ul className="text-xs text-stone-600 space-y-2 pt-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>Specialized focus in male & female infertility, non-surgical kidney stones, chronic IBS, and hormonal PCOS balance.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>Thorough 30-minute case taking with direct follow-ups throughout your course duration.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>In-clinic appointments at Samundri, plus daily online video consultations for patients worldwide.</span>
              </li>
            </ul>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={onOpenAppointment}
                className="px-6 py-3 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Schedule Appointment With Dr. Zargham
              </button>

              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>WhatsApp: {CLINIC_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
