import React, { useState } from 'react';
import { Star, ShieldCheck, HeartHandshake, MessageCircle, PlusCircle, Check } from 'lucide-react';
import { CLINIC_REVIEWS, CLINIC_FAQS, CLINIC_INFO } from '../data/clinicInfo';

export const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState(CLINIC_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [treatment, setTreatment] = useState('IBS & Digestive Restoration');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !city || !comment) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      name,
      city,
      treatment,
      comment,
      rating,
      verified: true,
      date: 'Just now',
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReviewForm(false);
      setName('');
      setCity('');
      setComment('');
    }, 1500);
  };

  return (
    <div className="py-12 lg:py-16 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-100/70 px-3.5 py-1.5 rounded-md">
            <Star className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
            <span>Verified Patient Experiences</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Patient Stories & Recoveries
          </h1>

          {/* Authentic Nastaliq Urdu Display */}
          <div className="font-urdu text-lg sm:text-xl text-emerald-950 font-bold leading-loose text-center py-1" dir="rtl">
            سلطان ہومیوپیتھک کلینک کے مطمئن اور شفایاب مریضوں کے تاثرات
          </div>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Read firsthand accounts from patients treated by Physician M Zargham Ghaffar across Faisalabad, Samundri, Gojra, Lahore, and other cities of Pakistan.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Share Your Recovery Story</span>
            </button>
          </div>
        </div>

        {/* Review Submission Form Modal / Box */}
        {showReviewForm && (
          <div className="max-w-xl mx-auto rounded-2xl bg-white border border-emerald-200 p-6 sm:p-8 shadow-md animate-in slide-in-from-top-4 duration-300">
            <h3 className="font-display text-lg font-bold text-stone-900 mb-4">
              Write Your Clinical Experience
            </h3>

            {submitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-900 text-xs text-center font-semibold flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>Thank you! Your review has been added to our clinical log.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your City / Chak
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Samundri / Faisalabad"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Treated Condition
                    </label>
                    <input
                      type="text"
                      required
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                      placeholder="e.g. Kidney Stones, IBS, Acne"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Rating
                    </label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                      <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Recovery Story / Experience
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe how long you suffered and how Dr. Zargham Ghaffar's homeopathic treatment helped you..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-xs cursor-pointer"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg border border-stone-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 font-medium">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &quot;{rev.comment}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 mt-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-stone-900">{rev.name}</div>
                  <div className="text-[11px] text-stone-500">{rev.city}</div>
                </div>

                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                  {rev.treatment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
