import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Send, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicInfo';

export const Footer: React.FC = () => {
  const [newsletterInput, setNewsletterInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterInput) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterInput('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-emerald-950 text-emerald-100/90 pt-16 pb-10 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Professional Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/70">
          {/* Column 1: About (Logo, About, Social Links) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white font-display font-bold text-xl shadow-md">
                S
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white tracking-tight block">
                  Sultan Homeopathic Clinic
                </span>
                <span className="text-xs text-emerald-400 font-medium">
                  Physician M Zargham Ghaffar
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed max-w-sm">
              Sultan Homeopathic Clinic is a premier classical homeopathic center dedicated to root-cause, non-surgical healing for infertility, kidney stones, IBS, skin conditions, and vitality courses with transparent medicine pricing of Rs. 100 to 200 per day.
            </p>

            {/* Social Links with Official Icons */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-emerald-300 block mb-2.5 uppercase tracking-wider">
                Official Social Channels:
              </span>
              <div className="flex items-center gap-2.5">
                {/* Official WhatsApp Icon */}
                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-emerald-900/90 text-emerald-200 flex items-center justify-center transition-all duration-300 border border-emerald-800 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:scale-105 shadow-xs"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>

                {/* Official Facebook Icon */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-emerald-900/90 text-emerald-200 flex items-center justify-center transition-all duration-300 border border-emerald-800 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:scale-105 shadow-xs"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Official Instagram Icon */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-emerald-900/90 text-emerald-200 flex items-center justify-center transition-all duration-300 border border-emerald-800 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white hover:border-transparent hover:scale-105 shadow-xs"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Official YouTube Icon */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-emerald-900/90 text-emerald-200 flex items-center justify-center transition-all duration-300 border border-emerald-800 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] hover:scale-105 shadow-xs"
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (Home, Treatments, Medicines, About, Contact) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-200/90 font-medium">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/treatments" className="hover:text-white transition-colors">Treatments</Link>
              </li>
              <li>
                <Link to="/medicines" className="hover:text-white transition-colors">Medicines</Link>
              </li>
              <li>
                <Link to="/doctor" className="hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/appointment" className="hover:text-white transition-colors">Book Appointment</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Links (Terms of Services, Privacy Policy, Refund Policy, Disclaimer) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Legal Links
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-200/90 font-medium">
              <li>
                <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Services</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-white transition-colors">Patient Stories & Feedback</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Section */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Newsletter
            </h4>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Subscribe to receive weekly natural health advice, dietary recommendations, and seasonal remedy updates directly from Dr. Zargham Ghaffar.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-lg bg-emerald-900 border border-emerald-700 text-xs text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={newsletterInput}
                    onChange={(e) => setNewsletterInput(e.target.value)}
                    placeholder="Enter email or WhatsApp..."
                    className="w-full px-3 py-2.5 text-xs rounded-lg bg-emerald-900/70 border border-emerald-800 text-white placeholder-emerald-400/60 focus:outline-hidden focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-emerald-950 bg-emerald-300 hover:bg-emerald-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe Newsletter</span>
                </button>
              </form>
            )}

            <p className="text-[11px] text-emerald-400/70">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Footer Copyright Text: Exactly as specified by user */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/80">
          <div>
            © 2026{' '}
            <Link to="/" className="text-white font-semibold hover:underline">
              Sultan Homeopathic Clinic
            </Link>
            . All rights reserved. Powered by{' '}
            <a
              href="https://gepardtechs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold hover:underline"
            >
              Gepard Techs
            </a>
            .
          </div>

          <div className="flex items-center gap-3 text-emerald-400/80 text-[11px]">
            <span>Adda Kottan, Samundri-Rajana Road, Faisalabad</span>
            <span aria-hidden="true">·</span>
            <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-white">
              {CLINIC_INFO.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
