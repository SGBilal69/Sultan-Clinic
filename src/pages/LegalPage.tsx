import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, FileText, RefreshCw, AlertCircle, ArrowLeft } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicInfo';

export const LegalPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.replace('/', '');

  const contentMap: Record<
    string,
    { title: string; subtitle: string; icon: any; content: React.ReactNode }
  > = {
    'terms-of-service': {
      title: 'Terms of Service',
      subtitle: 'Guidelines governing clinic appointments, online consultations, and remedy orders.',
      icon: FileText,
      content: (
        <div className="space-y-6 text-sm text-stone-600 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-stone-900">1. Introduction & Acceptance</h3>
            <p>
              Welcome to Sultan Homeopathic Clinic. By accessing our website, booking an appointment, or ordering homeopathic medicines, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-stone-900">2. Medical & Clinical Services</h3>
            <p>
              Sultan Homeopathic Clinic is operated by registered homeopathic practitioners led by Physician M Zargham Ghaffar. All medical consultations (both in-clinic at Adda Kottan, Samundri-Rajana Road, Faisalabad and online via WhatsApp video/voice) are conducted in accordance with classical homeopathic medical guidelines.
            </p>
            <p>
              Homeopathic treatment aims to stimulate the body’s natural self-healing mechanisms based on the totality of symptoms. While many chronic and acute illnesses respond remarkably well, individual physiological responses vary.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-stone-900">3. Orders, Pricing & Deliveries</h3>
            <p>
              Our daily medicine costs are typically between Rs. 100 to 200 per day for standard cases, and fixed discounted rates apply to pre-formulated specialized courses. All prices are in Pakistani Rupees (PKR).
            </p>
            <p>
              Nationwide delivery is available across all provinces of Pakistan via reputable couriers (Leopard Courier, TCS, and Pakistan Post). Orders are dispatched within 24 to 48 hours.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-stone-900">4. Intellectual Property & Brand Rights</h3>
            <p>
              All proprietary remedy formulations, educational materials, and clinic assets belong to Sultan Homeopathic Clinic and its technical partners. Unauthorized reproduction or resale is prohibited.
            </p>
          </section>
        </div>
      ),
    },
    'privacy-policy': {
      title: 'Privacy Policy',
      subtitle: 'How we protect your confidential medical history and personal information.',
      icon: ShieldCheck,
      content: (
        <div className="space-y-6 text-sm text-stone-600 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-stone-900">1. Confidentiality of Patient Health Information</h3>
            <p>
              At Sultan Homeopathic Clinic, patient privacy is paramount. All medical symptoms, diagnostic ultrasound reports, lab tests, photographs (for skin conditions), and case taking notes shared during consultations remain strictly confidential between you and Physician M Zargham Ghaffar.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-stone-900">2. Information We Collect</h3>
            <p>
              We collect only necessary information to provide healthcare and dispatch medicines:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Patient Name, Age, Gender, and City.</li>
              <li>Contact Phone Number and WhatsApp Number for consultation reminders.</li>
              <li>Delivery Shipping Address for Cash on Delivery (COD) medicine parcels.</li>
              <li>Clinical symptom records and ongoing response updates.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-stone-900">3. Discreet Packaging Policy</h3>
            <p>
              For sensitive conditions (such as men’s vitality courses, women’s hormonal courses, or bedwetting), all parcels are shipped in completely neutral, opaque, tamper-evident cartons without diagnostic labels to guarantee 100% privacy upon delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-stone-900">4. Third-Party Sharing</h3>
            <p>
              We never sell, rent, or trade your personal or health data to advertisers or third-party marketing companies.
            </p>
          </section>
        </div>
      ),
    },
    'refund-policy': {
      title: 'Refund & Cancellation Policy',
      subtitle: 'Transparent policies regarding medicine delivery and appointment adjustments.',
      icon: RefreshCw,
      content: (
        <div className="space-y-6 text-sm text-stone-600 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-stone-900">1. Medicine Parcels & Dispatch</h3>
            <p>
              Because homeopathic medicines are prepared under strict hygienic standards and personalized for each patient’s constitution, opened or used medicines cannot be returned for re-dispensing to other patients.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-stone-900">2. Damaged or Incorrect Shipments</h3>
            <p>
              If your parcel arrives broken, leaked in transit, or missing an item, please notify our WhatsApp helpline (+92342-7817236) within 48 hours of delivery with a photo of the package. We will immediately dispatch a free replacement bottle with zero shipping charges.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-stone-900">3. Order Cancellations</h3>
            <p>
              Orders can be modified or cancelled free of charge before the parcel is handed over to the courier service (typically within 4 hours of placing the order).
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-stone-900">4. Appointment Rescheduling</h3>
            <p>
              Appointments for in-clinic visits or online video calls can be rescheduled at any time without penalty by contacting our clinic coordinator via WhatsApp.
            </p>
          </section>
        </div>
      ),
    },
    disclaimer: {
      title: 'Medical & Healthcare Disclaimer',
      subtitle: 'Important medical guidance regarding classical homeopathic therapy.',
      icon: AlertCircle,
      content: (
        <div className="space-y-6 text-sm text-stone-600 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-stone-900">1. Educational & Consultation Purpose</h3>
            <p>
              The information presented on this website is intended to inform patients about homeopathic clinical options, dietary advice, and authentic classical remedies provided by Sultan Homeopathic Clinic under Physician M Zargham Ghaffar.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-stone-900">2. Emergency Medical Care</h3>
            <p>
              Homeopathy is highly effective for chronic disorders, acute fevers, stone dissolution, and constitutional imbalances. However, in cases of severe traumatic accidents, cardiac arrest, acute surgical emergencies, or life-threatening hemorrhage, patients must immediately visit an emergency trauma center or hospital casualty department.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-stone-900">3. Prescription Adjustments</h3>
            <p>
              Patients taking critical conventional medication (such as insulin, blood pressure reducers, or epilepsy medication) must not abruptly stop their medication without consulting their attending physician. Homeopathy is safely administered alongside conventional therapies under proper supervision.
            </p>
          </section>
        </div>
      ),
    },
  };

  const activeDoc = contentMap[path] || contentMap['terms-of-service'];
  const Icon = activeDoc.icon;

  return (
    <div className="py-14 lg:py-20 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home Overview</span>
        </Link>

        {/* Legal Header */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Icon className="w-6 h-6" />
          </div>

          <div>
            <h1 className="font-display text-3xl font-bold text-stone-900">
              {activeDoc.title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {activeDoc.subtitle}
            </p>
          </div>

          <div className="pt-2 text-[11px] text-stone-400">
            Last Updated: 2026 · Sultan Homeopathic Clinic (Physician M Zargham Ghaffar)
          </div>
        </div>

        {/* Legal Body */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-stone-200 shadow-sm">
          {activeDoc.content}
        </div>
      </div>
    </div>
  );
};
