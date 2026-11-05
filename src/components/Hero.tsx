import React from 'react';
import { ArrowRight, ShieldCheck, HeartPulse, Clock, Sparkles, MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicInfo';

interface HeroProps {
  onOpenAppointment: () => void;
  onExploreCourses: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAppointment, onExploreCourses }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-emerald-50/20 to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-800 uppercase bg-emerald-100/70 border border-emerald-200/60 px-3 py-1.5 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Classical Homeopathy · Pure Root-Cause Healing</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-stone-900 tracking-tight leading-[1.12] text-balance">
              Holistic Healing & Classical Remedies, Handled with Care.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Led by <span className="font-semibold text-stone-900">Physician M Zargham Ghaffar</span>, Sultan Homeopathic Clinic provides individualized, side-effect-free treatments for chronic diseases, infertility, kidney stones, skin disorders, and vitality courses.
            </p>

            {/* Daily Pricing Highlight Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-white border border-emerald-200 shadow-xs hover:border-emerald-300 transition-colors">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    Transparent & Affordable Treatment Philosophy
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Most acute and chronic treatments are formulated at just <span className="font-bold text-emerald-800">Rs. 100 to 200 per day medicine</span>. We prioritize patient welfare over exorbitant commercial pricing.
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenAppointment}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer flex items-center gap-2"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCourses}
                className="px-6 py-3.5 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 hover:border-stone-400 rounded-lg shadow-xs transition-all active:scale-98 cursor-pointer"
              >
                <span>Explore Medicine Catalog</span>
              </button>

              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent('Assalam-o-Alaikum Dr. M Zargham Ghaffar, I would like to consult regarding my health condition.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200/80 rounded-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Quick WhatsApp Advice</span>
              </a>
            </div>

            {/* Clinic Address & Hours Micro-Note */}
            <div className="pt-2 text-xs text-stone-500 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>📍 Adda Kottan, Chak 477 GB, Samundri-Rajana Road, Faisalabad</span>
              <span aria-hidden="true">·</span>
              <span>🕘 Mon – Sat: 9 AM - 2 PM & 4 PM - 9 PM</span>
            </div>
          </div>

          {/* Right Column: High Fidelity Hero Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-xl bg-stone-100 group">
              <img
                src="/src/assets/images/clinic_hero_homeopathy_1793903911246.jpg"
                alt="Sultan Homeopathic Clinic Consultation Room"
                className="w-full h-auto object-cover aspect-[4/3] lg:aspect-[1/1] transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                  Personalized Case Taking
                </span>
                <p className="text-sm font-medium text-stone-100 mt-0.5">
                  Natural constitutional remedies tailored to your physical & mental temperament.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Adjacency Proof Row: 4 Proof Columns */}
        <div className="mt-14 pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <span className="font-bold text-sm">Rs</span>
            </div>
            <div>
              <div className="text-lg font-bold text-stone-900 tabular-nums">Rs. 100 – 200</div>
              <div className="text-xs text-stone-600 mt-0.5">Average daily medicine cost</div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-stone-900 tabular-nums">15+ Years</div>
              <div className="text-xs text-stone-600 mt-0.5">Dedicated clinical experience</div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-stone-900 tabular-nums">25,000+</div>
              <div className="text-xs text-stone-600 mt-0.5">Recovered patients treated</div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-stone-900">100% Side-Effect Free</div>
              <div className="text-xs text-stone-600 mt-0.5">Safe for all age groups & children</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
