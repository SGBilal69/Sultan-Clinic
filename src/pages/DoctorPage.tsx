import React from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, HeartPulse, CheckCircle2, MessageCircle, Phone, Stethoscope, Clock, ShieldCheck, MapPin, Building2, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicInfo';
import { DoctorClinicalSeal } from '../components/DoctorClinicalSeal';
import { useLanguage } from '../context/LanguageContext';

export const DoctorPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="py-12 lg:py-20 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero Section */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-100/70 px-3.5 py-1.5 rounded-md">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t('Institution & Clinical Profile', 'ادارہ اور کلینیکل تعارف')}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            {t('About Sultan Homeopathic Clinic', 'سلطان ہومیوپیتھک کلینک کے بارے میں')}
          </h1>

          {/* Authentic Nastaliq Urdu Display */}
          <div className="font-urdu text-xl sm:text-2xl text-emerald-950 font-bold leading-loose text-center" dir="rtl">
            کلاسیکل ہومیوپیتھی اور معالج ایم زرغام غفار کا تعارف
          </div>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {t(
              'Founded on the classical healing science of Dr. Samuel Hahnemann. Led by Physician M Zargham Ghaffar (R.H.M.P), dedicated to genuine root-cause healing without surgery or harmful chemical steroids.',
              'ڈاکٹر سیموئیل ہانیمن کے کلاسیکل اصولوں پر قائم۔ معالج ایم زرغام غفار کی زیر نگرانی بغیر آپریشن اور بغیر سٹرائیڈز امراض کا مکمل شافی علاج۔'
            )}
          </p>
        </div>

        {/* 2-Column Institutional Presentation: Official Clinical Seal (Left) + Physician Biography (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Official Clinical Seal replacing any personal photos for privacy */}
          <div className="lg:col-span-5">
            <DoctorClinicalSeal size="lg" />
          </div>

          {/* Physician Biography & Accreditation */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-stone-200 p-8 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-800">
                {t('Senior Clinical Consultant', 'سینیئر کلینیکل کنسلٹنٹ')}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
                Physician M Zargham Ghaffar
              </h2>
              <p className="text-xs text-stone-500 font-mono">
                R.H.M.P · {t('Registered Homeopathic Medical Practitioner', 'رجسٹرڈ ہومیوپیتھک میڈیکل پریکٹشنر')}
              </p>
            </div>

            <p className="text-stone-600 text-sm leading-relaxed">
              {t(
                'Physician M Zargham Ghaffar has over 15 years of dedicated clinical practice in Classical Homeopathy. His approach strictly follows the classical principle of constitutional individualization—treating the totality of the patient’s physical, biological, and emotional symptoms rather than simply suppressing disease labels with temporary sedatives.',
                'معالج ایم زرغام غفار کا کلاسیکل ہومیوپیتھی میں 15 سال سے زائد کا وسیع کلینیکل تجربہ ہے۔ آپ کا طریقہ علاج علامات کی مجموعیت، مزاج اور اندرونی سبب کو مدنظر رکھ کر مستقل شفایابی فراہم کرتا ہے۔'
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs text-stone-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>{t('Totality of Symptoms', 'علامات کی مجموعیت')}</span>
                </div>
                <p className="text-xs text-stone-600">
                  {t(
                    'Every remedy is selected by matching the patient’s specific thermal, dietary, and constitutional profile.',
                    'ہر مریض کی جسمانی و جذباتی کیفیات کے مطابق واحد ہومیوپیتھک دوا کا انتخاب۔'
                  )}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs text-stone-900">
                  <HeartPulse className="w-4 h-4 text-emerald-700" />
                  <span>{t('Ethical Medicine Pricing', 'انتہائی مناسب اخراجات')}</span>
                </div>
                <p className="text-xs text-stone-600">
                  {t(
                    'Committed to public affordability with daily prescribed medicines maintained at Rs. 100 to 200 per day.',
                    'عوامی خدمت کے جذبے کے تحت روزانہ کی دوائی صرف 100 تا 200 روپے روزانہ میں مہیا کی جاتی ہے۔'
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/appointment"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl shadow-sm transition-all"
              >
                {t('Book Appointment With Doctor', 'ڈاکٹر صاحب سے وقت ملاقات لیں')}
              </Link>
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>WhatsApp: {CLINIC_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Classical Practice */}
        <div className="rounded-3xl bg-white border border-stone-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-display text-2xl font-bold text-stone-900">
              The 4 Pillars of Sultan Homeopathic Practice
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Upholding authentic natural pharmacology and ethical patient care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                01
              </span>
              <h4 className="font-display text-base font-bold text-stone-900">
                Constitutional Individualization
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                No two patients receive identical remedies. Your unique metabolism, genetic tendencies, and past illnesses dictate your personalized formulation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                02
              </span>
              <h4 className="font-display text-base font-bold text-stone-900">
                Pure Imported German Potencies
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                We formulate with genuine mother tinctures (Q) and decimal/centesimal potencies (30c, 200c, 1M) prepared to strict international pharmacopoeia standards.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                03
              </span>
              <h4 className="font-display text-base font-bold text-stone-900">
                Zero Steroids or Corticosteroids
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our treatments never include synthetic steroid cocktails that cause artificial puffiness, bone demineralization, or rebound disease flares.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                04
              </span>
              <h4 className="font-display text-base font-bold text-stone-900">
                Transparent Public Affordability
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Medicine costs are transparently fixed at Rs. 100 to 200 per day, allowing patients from all backgrounds to complete their recovery courses.
              </p>
            </div>
          </div>
        </div>

        {/* What to Expect in Consultation */}
        <div className="p-8 sm:p-10 rounded-3xl bg-emerald-950 text-white space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              Diagnostic Case Taking Protocol
            </span>
            <h3 className="font-display text-2xl font-bold text-white">
              What Happens During Your 30-Minute Consultation
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
              Whether you visit our clinic in Samundri or consult via online WhatsApp video, every case history is recorded with clinical thoroughness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-emerald-900/60 border border-emerald-800 space-y-2">
              <span className="text-xs font-bold text-emerald-300">Phase 1: History Intake</span>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Detailed inquiry into the onset of disease, past medications, family history, and ultrasound or pathology lab reports.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-900/60 border border-emerald-800 space-y-2">
              <span className="text-xs font-bold text-emerald-300">Phase 2: Repertorization</span>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Identification of the single simillimum remedy matching your specific physical and emotional constitution.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-900/60 border border-emerald-800 space-y-2">
              <span className="text-xs font-bold text-emerald-300">Phase 3: Ongoing Guidance</span>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Direct weekly check-ins via WhatsApp to monitor symptom improvement, adjust dilutions, and provide dietary advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
