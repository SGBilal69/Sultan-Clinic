import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Calendar, Phone, Menu, X, MessageCircle, Globe, ChevronDown } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicInfo';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('Home', 'صفحہ اول'), path: '/' },
    { name: t('Treatments', 'امراض و علاج'), path: '/treatments' },
    { name: t('Medicines', 'ادویات و کورسز'), path: '/medicines' },
    { name: t('About Doctor', 'معالج کا تعارف'), path: '/doctor' },
    { name: t('Contact', 'رابطہ و نقشہ'), path: '/contact' },
  ];

  return (
    <>
      {/* Top Clinical Announcement Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="font-semibold text-emerald-300">
              {t('Affordable Daily Medicine:', 'سستا روزانہ علاج:')}
            </span>
            <span>
              {t('Rs. 100 – 200 / day medicine standard', 'صرف 100 تا 200 روپے روزانہ دوائی')}
            </span>
            <span className="hidden md:inline" aria-hidden="true">·</span>
            <span className="hidden md:inline">
              {t('Nationwide Delivery Across Pakistan', 'پورے پاکستان میں ہوم ڈلیوری')}
            </span>
          </div>

          <div className="flex items-center gap-4 text-emerald-200">
            {/* Language Selection Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 py-0.5 px-2 rounded-md bg-emerald-900 hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors cursor-pointer border border-emerald-700/50"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-medium text-[11px] uppercase tracking-wider">
                  {language === 'en' ? 'English (EN)' : 'اردو (UR)'}
                </span>
                <ChevronDown className="w-3 h-3 text-emerald-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white text-stone-800 rounded-lg shadow-lg border border-stone-200 py-1 z-50 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-stone-50 cursor-pointer ${
                      language === 'en' ? 'font-bold text-emerald-800 bg-emerald-50' : 'text-stone-700'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && <span className="text-emerald-700">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('ur');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-stone-50 cursor-pointer font-urdu ${
                      language === 'ur' ? 'font-bold text-emerald-800 bg-emerald-50' : 'text-stone-700'
                    }`}
                  >
                    <span>اردو</span>
                    {language === 'ur' && <span className="text-emerald-700 font-sans">✓</span>}
                  </button>
                </div>
              )}
            </div>

            <span aria-hidden="true" className="text-emerald-800">|</span>

            <a
              href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {CLINIC_INFO.phone}</span>
            </a>

            <span aria-hidden="true" className="text-emerald-800">|</span>

            <a href={`tel:${CLINIC_INFO.phone}`} className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 Zones */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single Brand Element */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-800 to-teal-900 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
              <span className="font-display font-bold text-xl tracking-wider">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tight text-stone-900 leading-none group-hover:text-emerald-800 transition-colors whitespace-nowrap">
                Sultan Homeopathic Clinic
              </span>
              <span className="text-xs text-emerald-800 font-medium mt-1">
                Physician M Zargham Ghaffar
              </span>
            </div>
          </Link>

          {/* Zone 2: Concise & Professional Single-Line Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors whitespace-nowrap py-1 relative ${
                    isActive
                      ? 'text-emerald-800 font-semibold'
                      : 'hover:text-emerald-800'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-800 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action + Shopping Bag */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="relative p-2.5 rounded-lg border border-stone-200 text-stone-700 hover:text-emerald-800 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-800 text-white rounded-full text-xs font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Book Appointment CTA */}
            <Link
              to="/appointment"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-800 rounded-lg hover:bg-emerald-700 active:scale-98 transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('Book Visit', 'وقت ملاقات')}</span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 shadow-lg">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50 hover:text-emerald-800'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
              <Link
                to="/appointment"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-white bg-emerald-800 rounded-lg hover:bg-emerald-700"
              >
                {t('Book Appointment', 'وقت ملاقات بک کریں')}
              </Link>
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-xs font-semibold text-emerald-900 bg-emerald-50 rounded-lg hover:bg-emerald-100 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>WhatsApp: {CLINIC_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
