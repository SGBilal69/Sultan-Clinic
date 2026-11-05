import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Activity, Clock, ShieldCheck, ArrowRight, Stethoscope, Sparkles } from 'lucide-react';
import { CLINIC_DISEASES } from '../data/treatments';
import { DiseaseCategory, DiseaseTreatment } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const TreatmentsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DiseaseCategory>('all');
  const navigate = useNavigate();

  const categories: { label: string; value: DiseaseCategory }[] = [
    { label: t('All Treatments (17)', 'تمام امراض و علاج (17)'), value: 'all' },
    { label: t('Reproductive & Hormonal', 'مردانہ و زنانہ بانجھ پن و ہارمونز'), value: 'reproductive_fertility' },
    { label: t('Digestive & IBS', 'معدہ، آنتیں و آئی بی ایس'), value: 'digestive_internal' },
    { label: t('Kidneys & Stones', 'گردہ فیل و پتھری'), value: 'renal_stones' },
    { label: t('Skin & Allergies', 'جلدی امراض و الرجی'), value: 'skin_hair' },
    { label: t('Mind & Sleep', 'ذہنی دباؤ، نیند و اعصاب'), value: 'mind_neuro' },
    { label: t('General & Physical', 'قد میں اضافہ، بخار و عام امراض'), value: 'general_physical' },
  ];

  const filteredDiseases = useMemo(() => {
    return CLINIC_DISEASES.filter((disease) => {
      const matchesCategory =
        selectedCategory === 'all' || disease.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        disease.title.toLowerCase().includes(query) ||
        disease.urduTitle.toLowerCase().includes(query) ||
        disease.summary.toLowerCase().includes(query) ||
        disease.symptoms.some((s) => s.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="py-12 lg:py-16 bg-stone-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Hero Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-100/70 px-3.5 py-1.5 rounded-md">
            <Activity className="w-3.5 h-3.5" />
            <span>{t('Clinical Encyclopaedia & Diagnostic Guide', 'کلینیکل انسائیکلوپیڈیا اور تشخیصی گائیڈ')}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight text-balance">
            {t('Diseases & Homeopathic Treatments', 'امراض اور ہومیوپیتھک طریقہ علاج')}
          </h1>

          {/* Authentic Nastaliq Urdu Heading */}
          <div className="font-urdu text-xl sm:text-2xl text-emerald-950 font-bold leading-loose text-center py-2" dir="rtl">
            سلطان ہومیوپیتھک کلینک کے خصوصی شعبہ جات اور امراض کا شافی علاج
          </div>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {t(
              'Every clinical disease is treated individually by Physician M Zargham Ghaffar based on your physical constitution, mental temperament, and symptoms totality. Routine daily treatment is maintained at Rs. 100 to 200 per day medicine.',
              'ہر مریض کا معائنہ اور علاج معالج ایم زرغام غفار انفرادی علامات اور مزاج کے مطابق کرتے ہیں۔ روزانہ دوائی کا خرچ صرف 100 تا 200 روپے روزانہ ہے۔'
            )}
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t(
                'Search by condition, Urdu name or symptoms (e.g. Infertility, Acne, IBS, Kidney stone, Height)...',
                'مرض کا نام، اردو عنوان یا علامات تلاش کریں (مثلاً بانجھ پن، کیل مہاسے، گردے کی پتھری، قد)...'
              )}
              className="w-full pl-12 pr-4 py-3.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-400 hover:text-stone-700 px-2 py-1"
              >
                {t('Clear', 'صاف کریں')}
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Diseases Full Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDiseases.map((disease) => (
            <div
              key={disease.id}
              className="rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Category & Daily Cost */}
                <div className="flex items-center justify-between text-xs border-b border-stone-100 pb-2">
                  <span className="uppercase text-[11px] font-bold tracking-wider text-emerald-800">
                    {disease.category.replace('_', ' ')}
                  </span>
                  <span className="font-semibold text-stone-700 bg-emerald-50 px-2.5 py-0.5 rounded text-[11px] tabular-nums">
                    {disease.dailyCostEstimate}
                  </span>
                </div>

                {/* English Title */}
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900">
                    {language === 'ur' ? disease.urduTitle : disease.title}
                  </h3>

                  {/* Secondary Language Title */}
                  <div
                    className="font-urdu text-base text-emerald-900 font-semibold mt-1.5 text-right bg-emerald-50/40 p-2 rounded-lg border border-emerald-100"
                    dir="rtl"
                  >
                    {language === 'ur' ? disease.title : disease.urduTitle}
                  </div>
                </div>

                {/* Clinical Summary */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {disease.summary}
                </p>

                {/* Symptoms List */}
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 space-y-1.5">
                  <span className="text-[11px] font-bold text-stone-800 uppercase tracking-wider block">
                    {t('Diagnostic Symptoms:', 'تشخیصی علامات:')}
                  </span>
                  <ul className="text-xs text-stone-600 space-y-1">
                    {disease.symptoms.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-700 font-bold">·</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Homeopathic Approach */}
                <div className="text-xs text-stone-500 space-y-1">
                  <span className="font-semibold text-stone-800">
                    {t('Remedy Protocol:', 'طریقہ علاج و ادویات:')}
                  </span>{' '}
                  <span>{disease.homeopathicApproach}</span>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-5 border-t border-stone-100 mt-6 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{disease.durationEstimate}</span>
                </div>

                <div className="flex items-center gap-2">
                  {disease.relatedProductId && (
                    <Link
                      to="/medicines"
                      className="px-2.5 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors"
                    >
                      {t('View Medicine', 'دوائی دیکھیں')}
                    </Link>
                  )}
                  <button
                    onClick={() => navigate(`/appointment?concern=${encodeURIComponent(disease.title)}`)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>{t('Consult', 'مشورہ')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Consultation Assistance */}
        <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-display text-xl font-bold text-stone-900">
              {t('Suffering from another chronic or acute condition?', 'کیا آپ کسی پرانے یا پیچیدہ مرض میں مبتلا ہیں؟')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              {t(
                'Physician M Zargham Ghaffar takes custom case histories for all unique ailments.',
                'معالج ایم زرغام غفار تمام منفرد امراض کی تفصیلی کیس ہسٹری کے مطابق دوا تجویز فرماتے ہیں۔'
              )}
            </p>
          </div>
          <Link
            to="/appointment"
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            {t('Schedule Custom Case Taking', 'وقت ملاقات حاصل کریں')}
          </Link>
        </div>
      </div>
    </div>
  );
};
