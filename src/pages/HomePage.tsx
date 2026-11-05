import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, HeartPulse, Sparkles, MessageCircle, Stethoscope, ShoppingBag, MapPin, Star, Clock, CheckCircle2, ChevronRight, HelpCircle, Activity, Award, Navigation, Truck, Phone, ChevronDown, Droplets, Leaf, Pill, Flame, Check } from 'lucide-react';
import { CLINIC_INFO, CLINIC_REVIEWS, CLINIC_FAQS } from '../data/clinicInfo';
import { CLINIC_PRODUCTS } from '../data/products';
import { CLINIC_DISEASES } from '../data/treatments';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ProductVisual } from '../components/ProductVisual';
import { DoctorClinicalSeal } from '../components/DoctorClinicalSeal';

interface HomePageProps {
  onAddToCart: (product: Product) => void;
  onOpenProductDetail: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onAddToCart, onOpenProductDetail }) => {
  const { t, language } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeSpecialtyCategory, setActiveSpecialtyCategory] = useState<string>('all');

  const featuredProducts = CLINIC_PRODUCTS.filter((p) => p.featured).slice(0, 6);
  const featuredDiseases = CLINIC_DISEASES.slice(0, 6);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Adda Kottan, Chak 477 GB, Samundri-Rajana Road, Faisalabad'
  )}`;

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-emerald-50/30 to-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline & Mission */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-100/70 border border-emerald-200 px-3.5 py-1.5 rounded-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>
                  {t('Classical Homeopathy · Pure Root-Cause Care', 'کلاسیکل ہومیوپیتھک علاج · قدرتی و بے ضرر طریقہ')}
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.6rem] font-bold text-stone-900 tracking-tight leading-[1.12] text-balance">
                {t('Sultan Homeopathic Clinic', 'سلطان ہومیوپیتھک کلینک')}
              </h1>

              <div className="text-emerald-900 font-medium text-lg">
                {t('Physician M Zargham Ghaffar', 'معالج ایم زرغام غفار')}{' '}
                <span className="text-xs text-stone-500 font-normal">
                  {t('(R.H.M.P · Senior Classical Homeopathic Practitioner)', '(آر ایچ ایم پی · سینئر کلاسیکل ہومیوپیتھک فزیشن)')}
                </span>
              </div>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                {t(
                  'Providing specialized, non-invasive treatment for chronic disorders, male & female infertility, kidney and gallbladder stones dissolution, IBS digestive recovery, skin conditions, and youth growth stimulation.',
                  'مردانہ و زنانہ بانجھ پن، گردے و پتہ کی پتھری بغیر آپریشن، معدہ و آئی بی ایس، جلدی امراض اور قد میں اضافے کے لیے شافی اور مستقل ہومیوپیتھک طریقہ علاج۔'
                )}
              </p>

              {/* Pricing Pledge Highlight */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-emerald-800 text-white shrink-0 mt-0.5 shadow-xs">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    {t('Transparent Daily Medicine Cost: Rs. 100 to 200 / day', 'سستا اور معیاری علاج: صرف 100 تا 200 روپے روزانہ دوائی')}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                    {t(
                      'We maintain an honest commitment to public health. Daily prescribed remedies are kept at just Rs. 100 to 200 per day, utilizing genuine imported German and high potency classical remedies without commercial exploitation.',
                      'عوامی خدمت کے سچے جذبے کے تحت روزانہ کی خالص جرمن ادویات صرف 100 تا 200 روپے روزانہ میں مہیا کی جاتی ہیں۔ کوئی غیر ضروری لیب ٹیسٹ یا بھاری فیس نہیں۔'
                    )}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/appointment"
                  className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{t('Book Consultation', 'وقت ملاقات لیں')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/medicines"
                  className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <span>{t('Browse Medicine Store', 'ادویات و کورسز اسٹور')}</span>
                </Link>

                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-emerald-900 bg-emerald-100 hover:bg-emerald-200/80 rounded-xl transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>{t('WhatsApp Advice', 'واٹس ایپ رابطہ')}</span>
                </a>
              </div>
            </div>

            {/* Right: Authentic Clinical Feature Showcase Card (No AI images!) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-stone-900 to-teal-950 p-8 sm:p-10 text-white border border-emerald-800/60 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-emerald-800/60 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-800 text-emerald-300 flex items-center justify-center font-bold text-sm">
                      S
                    </div>
                    <span className="text-xs uppercase tracking-wider font-bold text-emerald-300">
                      {t('Dispensary & Practice', 'ڈسپنسری و کلینکل پریکٹس')}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-900/60 px-2.5 py-1 rounded-md border border-emerald-700/50">
                    EST. 2011
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                    {t('Classical Healing Without Surgery or Corticosteroids', 'بغیر آپریشن اور بغیر سٹرائیڈز شافی علاج')}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {t(
                      'Personalized prescriptions prepared from 100% pure imported German mother tinctures and potentized dilutions.',
                      '100 فیصد خالص امپورٹڈ جرمن مدر ٹنکچرز اور پوٹینسیز سے تیار کردہ انفرادی نسخہ جات۔'
                    )}
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-stone-300 pt-2 border-t border-emerald-800/60">
                  <div className="flex items-center justify-between py-1 border-b border-emerald-900/50">
                    <span>{t('Consultation Shifts:', 'اوقات معائنہ:')}</span>
                    <strong className="text-white">9 AM - 2 PM & 4 PM - 9 PM</strong>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-emerald-900/50">
                    <span>{t('Clinic Location:', 'کلینک پتہ:')}</span>
                    <strong className="text-emerald-300 text-right">
                      {t('Adda Kottan, Samundri-Rajana Rd', 'اڈہ کوٹاں، سمندری-رجانہ روڈ')}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>{t('Nationwide Delivery:', 'ڈلیوری سہولت:')}</span>
                    <strong className="text-emerald-400">
                      {t('Cash on Delivery (COD)', 'کیش آن ڈلیوری')}
                    </strong>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/appointment"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold text-xs uppercase tracking-wider text-center block transition-colors"
                  >
                    {t('Schedule Consultation With Doctor', 'ڈاکٹر صاحب سے وقت ملاقات لیں')}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Key Metrics Ribbon */}
          <div className="mt-14 pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                Rs
              </div>
              <div>
                <div className="text-lg font-bold text-stone-900 tabular-nums">Rs. 100 – 200</div>
                <div className="text-xs text-stone-500">
                  {t('Average daily medicine cost', 'اوسط روزانہ دوائی کا خرچ')}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-stone-900 tabular-nums">
                  {t('15+ Years', '15 سال سے زائد')}
                </div>
                <div className="text-xs text-stone-500">
                  {t('Clinical practice in Punjab', 'پنجاب میں کلینیکل تجربہ')}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-stone-900 tabular-nums">25,000+</div>
                <div className="text-xs text-stone-500">
                  {t('Recovered patient consultations', 'کامیاب اور مطمئن مریض')}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-stone-900">
                  {t('100% Side-Effect Free', '100 فیصد بے ضرر علاج')}
                </div>
                <div className="text-xs text-stone-500">
                  {t('Gentle for all age groups & children', 'ہر عمر اور بچوں کے لیے محفوظ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Homeopathic Advantage (Clinical Comparison Table) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-8">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
              {t('The Medical Science', 'طبی تحقیق و علاج')}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
              {t('Why Patients Choose Classical Homeopathy', 'مریض کلاسیکل ہومیوپیتھی کا انتخاب کیوں کرتے ہیں؟')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              {t(
                'Comparing permanent root-cause healing with temporary pharmaceutical symptom suppression.',
                'عارضی درد روکنے کی بجائے مرض کو جڑ سے ختم کرنے کا قدرتی موازنہ۔'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center text-xs font-bold">
                01
              </div>
              <h3 className="font-display text-base font-bold text-stone-900">
                {t('Permanent Root-Cause Cure', 'مرض کا مستقل جڑ سے خاتمہ')}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t(
                  'Conventional pills often merely numb pain receptors or suppress rashes. Homeopathy addresses internal biochemical and hereditary susceptibility, preventing recurrence.',
                  'ایلوپیتھک گولیاں اکثر صرف وقتی آرام دیتی ہیں۔ ہومیوپیتھی اندرونی بیماری اور موروثی جراثیم کو ختم کر کے مرض کو دوبارہ پلٹنے نہیں دیتی۔'
                )}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center text-xs font-bold">
                02
              </div>
              <h3 className="font-display text-base font-bold text-stone-900">
                {t('Zero Toxic Organ Damage', 'گردے اور جگر کے نقصانات سے پاک')}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t(
                  'No corticosteroids, harsh antibiotics, or heavy chemicals that destroy the stomach lining, elevate liver enzymes, or strain glomerular kidney filtration.',
                  'نہ کوئی سٹرائیڈز اور نہ اینٹی بائیوٹکس جو معدے، جگر یا گردوں کے فلٹریشن نظام کو نقصان پہنچائیں۔'
                )}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center text-xs font-bold">
                03
              </div>
              <h3 className="font-display text-base font-bold text-stone-900">
                {t('Affordable Transparent Care', 'سستا اور شفاف علاج')}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t(
                  'We believe healthcare is a sacred trust. Daily medicine costs of Rs. 100 to 200 per day ensure that every family can access world-class natural remedies.',
                  'صحت کی دیکھ بھال ایک امانت ہے۔ صرف 100 تا 200 روپے روزانہ دوائی کا خرچ ہر طبقے کے لیے بہترین علاج ممکن بناتا ہے۔'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Rs. 100 to 200 Daily Medicine Pricing Model Explained */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-emerald-950 text-white space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              {t('Transparent Pricing Model', 'شفاف قیمت کا نظام')}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {t('How Our Rs. 100 to 200 Daily Medicine Model Works', '100 تا 200 روپے روزانہ دوائی کا ماڈل کیسے کام کرتا ہے؟')}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
              {t(
                'Commercial private hospitals and pharmaceutical brands mark up medications by 500% to 1000%. Sultan Homeopathic Clinic operates on an ethical dispensary philosophy:',
                'پرائیویٹ ہسپتال اور ادویہ ساز کمپنیاں بھاری منافع کماتی ہیں۔ سلطان ہومیوپیتھک کلینک عوامی خدمت کے اصول پر کام کرتا ہے:'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-emerald-900/60 border border-emerald-800 space-y-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                {t('Direct Dispensary Potentization', 'براہ راست کلینک ڈسپنسری تیاری')}
              </span>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                {t(
                  'We formulate directly in our in-house clinic pharmacy from genuine bulk German/European mother tinctures, cutting out middlemen markups.',
                  'ہم خالص امپورٹڈ جرمن و یورپی مدر ٹنکچرز سے براہ راست کلینک میں نسخہ تیار کرتے ہیں۔'
                )}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-900/60 border border-emerald-800 space-y-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                {t('No Unnecessary Lab Tests', 'غیر ضروری لیب ٹیسٹ سے نجات')}
              </span>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                {t(
                  'We evaluate your existing ultrasound and blood tests. We never mandate expensive repetitive diagnostic packages merely to generate hospital revenue.',
                  'ہم آپ کے پرانے الٹراساؤنڈ اور ٹیسٹ دیکھ کر ہی دوا تجویز کرتے ہیں، بلاوجہ بار بار ٹیسٹ نہیں کرائے جاتے۔'
                )}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-900/60 border border-emerald-800 space-y-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                {t('Fixed Transparent Packages', 'مقررہ شفاف کورسز کی فیس')}
              </span>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                {t(
                  'Pre-formulated 10-day, 15-day, and 30-day courses have fixed clear prices (e.g. Height increase at Rs. 50/day, IBS at Rs. 130/day).',
                  '10، 15 اور 30 دن کے کورسز کی قیمتیں مکمل طور پر واضح اور طے شدہ ہیں (مثلاً قد کورس 50 روپے روزانہ، آئی بی ایس 130 روپے روزانہ)۔'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Disease & Specialty Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
              {t('Clinical Specializations', 'کلینیکل شعبہ جات')}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              {t('Treating 17+ Complex Acute & Chronic Conditions', '17 سے زائد پیچیدہ امراض کا شافی علاج')}
            </h2>
          </div>
          <Link
            to="/treatments"
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-700 flex items-center gap-1.5"
          >
            <span>{t('Explore All 17 Treated Diseases', 'تمام 17 امراض و طریقہ علاج دیکھیں')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDiseases.map((d) => (
            <div
              key={d.id}
              className="p-6 rounded-2xl border border-stone-200 bg-white hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                  <span className="uppercase text-[11px] font-bold text-emerald-800">
                    {d.category.replace('_', ' ')}
                  </span>
                  <span className="font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded text-[11px] tabular-nums">
                    {d.dailyCostEstimate}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-stone-900">
                  {language === 'ur' ? d.urduTitle : d.title}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mt-2">
                  {d.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 mt-4 flex items-center justify-between">
                <span className="text-xs text-stone-500">{d.durationEstimate}</span>
                <Link
                  to={`/appointment?concern=${encodeURIComponent(d.title)}`}
                  className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
                >
                  <span>{t('Book Consultation', 'مشورہ لیں')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Formulated Courses Showcase (Clean Apothecary Packaging - No AI images!) */}
      <section className="bg-stone-50 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
                {t('E-Commerce Dispensary & Courses', 'ڈسپنسری و مخصوص کورسز')}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                {t('Clinical Courses & Pure Herbal Formulations', 'کلینیکل کورسز اور خالص ہربل ادویات')}
              </h2>
            </div>
            <Link
              to="/medicines"
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-700 flex items-center gap-1.5"
            >
              <span>{t('View All Remedies in Pharmacy Store', 'فارمیسی اسٹور میں تمام ادویات دیکھیں')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative overflow-hidden">
                    <ProductVisual product={product} />

                    {/* Quick View Button */}
                    <button
                      onClick={() => onOpenProductDetail(product)}
                      className="absolute inset-x-4 bottom-4 py-2 px-3 bg-white/95 backdrop-blur-xs text-stone-900 text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5 shadow-md hover:bg-white cursor-pointer z-20"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-emerald-800" />
                      <span>{t('View Medicine Details & Dosage', 'نسخہ و خوراک دیکھیں')}</span>
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="text-[11px] uppercase font-semibold text-emerald-800 mb-1">
                      {product.category.replace('_', ' ')}
                    </div>
                    <h3
                      onClick={() => onOpenProductDetail(product)}
                      className="font-display text-base font-bold text-stone-900 hover:text-emerald-800 transition-colors cursor-pointer line-clamp-1"
                    >
                      {language === 'ur' && product.urduName ? product.urduName : product.name}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                      {product.tagline}
                    </p>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-baseline justify-between">
                      <span className="font-display text-xl font-bold text-stone-900 tabular-nums">
                        Rs. {product.price.toLocaleString()}
                      </span>
                      {product.dailyCost && (
                        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          ~Rs. {product.dailyCost}/{t('day', 'روز')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full py-2.5 px-3 text-xs font-semibold rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{t('Add to Bag', 'خریدیں')}</span>
                  </button>
                  <button
                    onClick={() => onOpenProductDetail(product)}
                    className="w-full py-2.5 px-3 text-xs font-semibold rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 transition-colors cursor-pointer"
                  >
                    {t('Details & Dosage', 'تفصیلات')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. The 4-Pillar Clinical Case Taking Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-stone-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
              {t('Diagnostic Protocol', 'تشخیصی طریقہ کار')}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
              {t('The 4-Step Patient Care Journey', 'مریض کی شفایابی کا 4 مرحلہ وار سفر')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              {t(
                'How Physician M Zargham Ghaffar diagnoses, treats, and monitors your recovery.',
                'معالج ایم زرغام غفار کس طرح مکمل تشخیص اور نگرانی سے علاج فرماتے ہیں۔'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center text-xs font-bold">
                01
              </span>
              <h4 className="font-display text-base font-bold text-stone-900">
                {t('Detailed Case Taking', 'تفصیلی کیس ہسٹری')}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t(
                  '30-minute thorough interview evaluating onset, past suppressions, family miasms, and recent diagnostic tests.',
                  '30 منٹ کا انفرادی معائنہ، خاندانی بیماریوں، پرانی دوائیوں اور ٹیسٹ رپورٹس کا تفصیلی جائزہ۔'
                )}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center text-xs font-bold">
                02
              </span>
              <h4 className="font-display text-base font-bold text-stone-900">
                {t('Constitutional Repertorization', 'مزاج کے مطابق دوا کا انتخاب')}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t(
                  'Matching the totality of symptoms with single classical homeopathic remedies (Simillimum) to target disease roots.',
                  'علامات کی مجموعیت کے مطابق واحد مماثل ہومیوپیتھک دوا کی تشخیص۔'
                )}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center text-xs font-bold">
                03
              </span>
              <h4 className="font-display text-base font-bold text-stone-900">
                {t('Pure Potency Dispensation', 'خالص ادویات کی تیاری')}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t(
                  'Remedies dispensed in amber glass vials to preserve photochemical purity, with explicit clear dosage schedules.',
                  'مخصوص شیشے کی بوتلوں میں خالص جرمن دوا کی تیاری اور واضح خوراک کا شیڈول۔'
                )}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center text-xs font-bold">
                04
              </span>
              <h4 className="font-display text-base font-bold text-stone-900">
                {t('Weekly Follow-up & Diet', 'ہفتہ وار فالو اپ و پرہیز')}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t(
                  'Direct WhatsApp check-ins to monitor symptom reduction, adjust potencies, and provide dietary restrictions.',
                  'واٹس ایپ پر باقاعدہ رابطہ، افاقہ کی صورتحال اور غذائی پرہیز کی مکمل رہنمائی۔'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Dispensary Quality Guarantee */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-900 to-teal-950 text-white space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              {t('Dispensary Standards', 'ڈسپنسری کا اعلیٰ معیار')}
            </span>
            <h3 className="font-display text-2xl font-bold text-white">
              {t('Zero Synthetic Adulterants & Pharmaceutical Purity', 'کیمیکل سے پاک اور 100 فیصد خالص ادویات')}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
              {t(
                'We never compromise on medicinal grade. Sultan Homeopathic Clinic imports authentic mother tinctures from Dr. Willmar Schwabe and certified European laboratories.',
                'ہم ادویات کے معیار پر کوئی سمجھوتہ نہیں کرتے۔ تمام ادویات ڈاکٹر ولمر شوابے اور یورپی لیبارٹریز سے تصدیق شدہ ہیں۔'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs">
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{t('Sterilized amber glass dropper bottles preventing sunlight degradation.', 'روشنی سے محفوظ ڈراپر شیشیاں')}</span>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{t('Pharmaceutical grade cane sugar / lactose globules without chemical binders.', 'خالص ہومیوپیتھک میٹھی گولیاں')}</span>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{t('100% steroid-free certification ensuring lifelong safety for kidneys and liver.', 'سٹرائیڈز سے مکمل پاک سرٹیفائیڈ')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Meet Physician M Zargham Ghaffar (Institutional Accreditation & Privacy Seal) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-xs">
          <div className="lg:col-span-5">
            <DoctorClinicalSeal size="md" />
          </div>
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-50 px-3.5 py-1.5 rounded-md">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{t('Registered Classical Homeopath', 'رجسٹرڈ کلاسیکل ہومیوپیتھ')}</span>
            </div>

            <h2 className="font-display text-3xl font-bold text-stone-900">
              {t('Physician M Zargham Ghaffar', 'معالج ایم زرغام غفار')}
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {t(
                'Practicing at Sultan Homeopathic Clinic at Adda Kottan, Samundri-Rajana Road, Faisalabad. Over 15 years of dedicated practice resolving complex cases of infertility, non-surgical kidney stones, chronic IBS, skin allergies, and growth enhancement.',
                'سلطان ہومیوپیتھک کلینک، اڈہ کوٹاں، سمندری-رجانہ روڈ فیصل آباد۔ بانجھ پن، بغیر آپریشن گردہ و پتہ پتھری، پرانا آئی بی ایس، جلد اور قد بڑھانے کے کامیاب کیسز۔'
              )}
            </p>

            <div className="space-y-2 pt-1 text-xs sm:text-sm text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{t('30-minute individual case taking covering physical & mental totality.', 'انفرادی 30 منٹ تفصیلی معائنہ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{t('Single remedy potency without toxic corticosteroids or steroid cocktails.', 'بغیر سٹرائیڈز واحد دوا سے علاج')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{t('Routine treatments maintained at Rs. 100 to 200 per day medicine.', 'دوائی صرف 100 تا 200 روپے روزانہ')}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-3">
              <Link
                to="/doctor"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
              >
                {t('Read Full Physician Profile', 'معالج کا مکمل تعارف')}
              </Link>
              <Link
                to="/appointment"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-emerald-950 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
              >
                {t('Book Consultation Slot', 'وقت ملاقات بک کریں')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Verified Patient Clinical Recoveries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
              {t('Clinical Case Histories', 'کامیاب کیسز کی تفصیل')}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
              {t('Verified Patient Turnaround Outcomes', 'شفایاب مریضوں کے تاثرات')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              {t(
                'Ultrasound and pathology report verified recoveries across Faisalabad and Punjab.',
                'الٹراساؤنڈ اور لیب رپورٹس سے تصدیق شدہ کامیاب علاج۔'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLINIC_REVIEWS.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                    &quot;{rev.comment}&quot;
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-100 mt-4 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-stone-900 block">{rev.name}</strong>
                    <span className="text-stone-500 text-[11px]">{rev.city}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {rev.treatment}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/reviews"
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-700 inline-flex items-center gap-1.5"
            >
              <span>{t('Read More Patient Feedback & Stories', 'مزید تاثرات اور کیسز پڑھیں')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Clinic Location, Highway Travel Matrix & Google Maps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
                {t('Physical Clinic Visit', 'کلینک تشریف آوری')}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                {t('Located on Main Samundri-Rajana Highway', 'مین سمندری-رجانہ ہائی وے پر واقع')}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                {t(
                  'Adda Kottan, Chak No. 477 GB (Kottan Sharqi / Gharbi), Tehsil Samundri, Faisalabad.',
                  'اڈہ کوٹاں، چک نمبر 477 گ ب، سمندری-رجانہ روڈ، تحصیل سمندری، ضلع فیصل آباد۔'
                )}
              </p>
            </div>
            <Link
              to="/contact"
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs shrink-0"
            >
              {t('Open Full Directions', 'مکمل لوکیشن و راستہ')}
            </Link>
          </div>

          {/* Embedded Map */}
          <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-stone-200 bg-stone-100">
            <iframe
              title="Sultan Homeopathic Clinic Google Map"
              src="https://maps.google.com/maps?q=Adda%20Kottan%20Chak%20477%20GB%20Samundri%20Rajana%20Road%20Faisalabad&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Travel Distances */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-500 block">{t('From Samundri City', 'سمندری شہر سے')}</span>
              <strong className="text-stone-900 text-sm block">12 Kilometers</strong>
              <span className="text-emerald-800 font-semibold">{t('15 min drive', '15 منٹ کا فاصلہ')}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-500 block">{t('From Rajana Chowk', 'رجانہ چوک سے')}</span>
              <strong className="text-stone-900 text-sm block">16 Kilometers</strong>
              <span className="text-emerald-800 font-semibold">{t('20 min drive', '20 منٹ کا فاصلہ')}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-500 block">{t('From Gojra', 'گوجرہ سے')}</span>
              <strong className="text-stone-900 text-sm block">28 Kilometers</strong>
              <span className="text-emerald-800 font-semibold">{t('35 min drive', '35 منٹ کا فاصلہ')}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-500 block">{t('From Faisalabad', 'فیصل آباد سے')}</span>
              <strong className="text-stone-900 text-sm block">48 Kilometers</strong>
              <span className="text-emerald-800 font-semibold">{t('55 min drive', '55 منٹ کا فاصلہ')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Clinical FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
            {t('Patient Support', 'عمومی سوالات')}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
            {t('Frequently Asked Questions', 'اکثر پوچھے جانے والے سوالات')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            {t(
              'Clear clinical answers about our homeopathic therapies, nationwide couriers, and dosages.',
              'ہومیوپیتھک طریقہ علاج، پارسل ڈلیوری اور خوراک سے متعلق ضروری معلومات۔'
            )}
          </p>
        </div>

        <div className="space-y-3">
          {CLINIC_FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-stone-200 bg-white overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-display text-sm sm:text-base font-bold text-stone-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-800' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 13. Consultation Booking & Urgent Helpline Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-emerald-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase font-bold text-emerald-300 tracking-wider">
              {t('Need Direct Advice from Dr. Zargham?', 'ڈاکٹر صاحب سے براہ راست رہنمائی درکار ہے؟')}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {t('Start Your Natural Healing Journey Today', 'آج ہی قدرتی اور بے ضرر علاج شروع کریں')}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200 max-w-xl">
              {t(
                'Routine daily treatment costs just Rs. 100 to 200 per day. Call or WhatsApp directly to discuss your medical condition.',
                'روزانہ علاج کا خرچ صرف 100 تا 200 روپے ہے۔ فون یا واٹس ایپ پر اپنے مرض کی تفصیلات شیئر کریں۔'
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/appointment"
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-emerald-950 bg-white hover:bg-emerald-50 rounded-xl transition-colors shadow-sm"
            >
              {t('Book In-Clinic Visit', 'وقت ملاقات بک کریں')}
            </Link>
            <a
              href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl transition-colors flex items-center gap-2 border border-emerald-600"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t('WhatsApp Helpline', 'واٹس ایپ ہیلپ لائن')}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
