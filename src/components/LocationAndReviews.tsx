import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Star, ChevronDown, CheckCircle, Navigation, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO, CLINIC_REVIEWS, CLINIC_FAQS } from '../data/clinicInfo';

interface LocationAndReviewsProps {
  onOpenAppointment: () => void;
}

export const LocationAndReviews: React.FC<LocationAndReviewsProps> = ({ onOpenAppointment }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <>
      {/* Patient Reviews Section */}
      <section id="reviews" className="py-16 lg:py-24 bg-stone-50/80 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-100/70 px-3 py-1 rounded-md">
              <Star className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
              <span>Real Patient Experiences</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight text-balance">
              Verified Recovery Stories
            </h2>
            <p className="text-stone-600 text-base leading-relaxed">
              Read how patients across Faisalabad, Samundri, Lahore, and throughout Pakistan found natural relief with Physician M Zargham Ghaffar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLINIC_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                    &quot;{review.comment}&quot;
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-900">{review.name}</div>
                    <div className="text-[11px] text-stone-500">{review.city}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {review.treatment}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Location & Visiting Guide */}
      <section id="location" className="py-16 lg:py-24 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Address & Directions Card */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-50 px-3 py-1 rounded-md">
                <MapPin className="w-3.5 h-3.5" />
                <span>Visit Our Clinic</span>
              </div>

              <h2 className="font-display text-3xl font-bold text-stone-900 tracking-tight">
                Sultan Homeopathic Clinic
              </h2>

              <p className="text-stone-600 text-sm leading-relaxed">
                Conveniently situated directly on the main Samundri-Rajana road at Adda Kottan, easily accessible from Samundri city, Rajana, Gojra, and Faisalabad.
              </p>

              {/* Exact Address Box */}
              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-stone-800 space-y-1">
                    <p className="font-bold text-stone-900">{CLINIC_INFO.address.spot}</p>
                    <p>{CLINIC_INFO.address.road}</p>
                    <p>{CLINIC_INFO.address.tehsil}, {CLINIC_INFO.address.district}</p>
                    <p className="text-stone-500">{CLINIC_INFO.address.province}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 text-xs text-stone-600 leading-relaxed">
                  <strong>Landmark:</strong> {CLINIC_INFO.address.landmark}
                </div>
              </div>

              {/* Timings & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-1 text-xs">
                  <div className="flex items-center gap-2 font-bold text-stone-900">
                    <Clock className="w-4 h-4 text-emerald-700" />
                    <span>Clinical Timings</span>
                  </div>
                  <p className="text-stone-600">{CLINIC_INFO.timings.days}</p>
                  <p className="text-emerald-900 font-semibold">{CLINIC_INFO.timings.morning}</p>
                  <p className="text-emerald-900 font-semibold">{CLINIC_INFO.timings.evening}</p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-1 text-xs">
                  <div className="flex items-center gap-2 font-bold text-stone-900">
                    <Phone className="w-4 h-4 text-emerald-700" />
                    <span>Direct Helpline</span>
                  </div>
                  <p className="text-stone-600">Calls & WhatsApp 24/7</p>
                  <a
                    href={`tel:${CLINIC_INFO.phone}`}
                    className="text-emerald-900 font-bold block hover:underline"
                  >
                    {CLINIC_INFO.phone}
                  </a>
                  <p className="text-stone-500 text-[11px]">Free initial telephone inquiry</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={onOpenAppointment}
                  className="px-5 py-3 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  Book Clinic Visit
                </button>
                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>Get Live Location via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right: Interactive Styled Map Card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-stone-200 overflow-hidden shadow-lg bg-stone-100 relative">
                {/* Visual map preview styling */}
                <div className="aspect-[4/3] bg-gradient-to-br from-emerald-950 via-stone-900 to-teal-950 p-6 flex flex-col justify-between text-white relative">
                  {/* Subtle Map Grid lines */}
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: `radial-gradient(#6ee7b7 1px, transparent 1px)`,
                      backgroundSize: '24px 24px',
                    }}
                  />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 bg-emerald-900/90 border border-emerald-700/60 text-emerald-200 text-xs px-3 py-1 rounded-full">
                      <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Samundri-Rajana Highway Route</span>
                    </div>
                    <span className="text-xs text-stone-400">District Faisalabad</span>
                  </div>

                  <div className="relative z-10 my-auto text-center space-y-2 py-6">
                    <div className="w-14 h-14 rounded-full bg-emerald-600/90 border-4 border-emerald-400/40 text-white flex items-center justify-center mx-auto shadow-xl animate-pulse">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-lg font-bold">
                      Adda Kottan, Chak No. 477 GB
                    </h3>
                    <p className="text-xs text-stone-300 max-w-sm mx-auto">
                      Kottan Sharqi / Gharbi · Tehsil Samundri · Punjab, Pakistan
                    </p>
                  </div>

                  <div className="relative z-10 p-4 rounded-xl bg-stone-900/80 backdrop-blur-md border border-stone-800 text-xs text-stone-300 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-white block">Distance Guide:</span>
                      <span>15 min from Samundri City · 20 min from Rajana</span>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Adda Kottan, Chak 477 GB, Samundri-Rajana Road, Faisalabad')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-md transition-colors text-xs whitespace-nowrap"
                    >
                      Open in Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Clear answers regarding our homeopathic treatments, deliveries, and payment methods.
            </p>
          </div>

          <div className="space-y-3">
            {CLINIC_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-stone-200 bg-white overflow-hidden transition-colors"
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
        </div>
      </section>
    </>
  );
};
