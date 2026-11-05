import React, { useState, useMemo } from 'react';
import { Search, Activity, Clock, ShieldCheck, ChevronRight, Stethoscope } from 'lucide-react';
import { CLINIC_DISEASES } from '../data/treatments';
import { DiseaseCategory, DiseaseTreatment } from '../types';

interface TreatmentDirectoryProps {
  onSelectTreatment: (treatment: DiseaseTreatment) => void;
  onOpenAppointment: (defaultConcern?: string) => void;
  onSelectProductById: (productId: string) => void;
}

export const TreatmentDirectory: React.FC<TreatmentDirectoryProps> = ({
  onSelectTreatment,
  onOpenAppointment,
  onSelectProductById,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DiseaseCategory>('all');

  const categories: { label: string; value: DiseaseCategory }[] = [
    { label: 'All Treatments (17)', value: 'all' },
    { label: 'Reproductive & Hormonal', value: 'reproductive_fertility' },
    { label: 'Digestive & IBS', value: 'digestive_internal' },
    { label: 'Kidneys & Stones', value: 'renal_stones' },
    { label: 'Skin & Hair', value: 'skin_hair' },
    { label: 'Mind & Sleep', value: 'mind_neuro' },
    { label: 'General & Physical', value: 'general_physical' },
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
    <section id="treatments" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-50 px-3 py-1 rounded-md">
            <Activity className="w-3.5 h-3.5" />
            <span>Clinical Specialties & Treated Diseases</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight text-balance">
            Root-Cause Homeopathic Treatments
          </h2>
          <p className="text-stone-600 text-base leading-relaxed">
            Every patient is thoroughly evaluated by Physician M Zargham Ghaffar. Explore our core clinical areas, typical treatment timelines, and per-day medicine estimates.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-10 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by disease, symptom (e.g. Infertility, Acne, IBS, Kidney stone)..."
              className="w-full pl-12 pr-4 py-3 text-sm rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-400 hover:text-stone-600 px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills (Functional Buttons) */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Diseases Grid */}
        {filteredDiseases.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-stone-50 border border-dashed border-stone-300">
            <p className="text-stone-600 font-medium">No specific disease matching &quot;{searchQuery}&quot;</p>
            <p className="text-xs text-stone-500 mt-1">
              Physician M Zargham Ghaffar treats all acute and chronic illnesses. Contact directly for custom case taking.
            </p>
            <button
              onClick={() => onOpenAppointment()}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Consult Doctor Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiseases.map((disease) => (
              <div
                key={disease.id}
                className="group relative flex flex-col justify-between rounded-xl bg-white border border-stone-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 p-6"
              >
                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between gap-2 text-xs text-stone-500 mb-2">
                    <span className="font-medium text-emerald-800 uppercase tracking-wider text-[11px]">
                      {disease.category.replace('_', ' ')}
                    </span>
                    <span className="tabular-nums font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                      {disease.dailyCostEstimate}
                    </span>
                  </div>

                  {/* Title & Urdu Title */}
                  <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {disease.title}
                  </h3>
                  <p className="text-xs font-medium text-emerald-900/80 mb-3 font-sans" dir="rtl">
                    {disease.urduTitle}
                  </p>

                  {/* Summary */}
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4">
                    {disease.summary}
                  </p>

                  {/* Common Symptoms */}
                  <div className="space-y-1.5 mb-4 bg-stone-50/80 p-3 rounded-lg border border-stone-100">
                    <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wide">
                      Common Symptoms:
                    </span>
                    <ul className="text-xs text-stone-600 space-y-1">
                      {disease.symptoms.slice(0, 3).map((sym, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-700 font-bold shrink-0">·</span>
                          <span className="line-clamp-1">{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{disease.durationEstimate}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {disease.relatedProductId && (
                      <button
                        onClick={() => onSelectProductById(disease.relatedProductId!)}
                        className="px-2.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors cursor-pointer"
                      >
                        View Course
                      </button>
                    )}
                    <button
                      onClick={() => onOpenAppointment(disease.title)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>Consult</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
