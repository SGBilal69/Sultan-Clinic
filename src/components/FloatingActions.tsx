import React from 'react';
import { MessageCircle, Calendar, ShoppingBag, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicInfo';

interface FloatingActionsProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAppointment: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  cartCount,
  onOpenCart,
  onOpenAppointment,
}) => {
  return (
    <>
      {/* Floating Circular WhatsApp Button (Desktop & Tablet) */}
      <a
        href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
          'Assalam-o-Alaikum Dr. M Zargham Ghaffar, I am reaching out from your website for consultation.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Consultation"
        className="fixed bottom-20 sm:bottom-6 right-5 z-40 w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
      >
        <MessageCircle className="w-7 h-7 fill-white/10 group-hover:scale-110 transition-transform" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>

      {/* Mobile Bottom Quick-Action Bar (Adheres to 15% Mobile Sticky Cap) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 flex items-center justify-between gap-2 shadow-lg">
        <a
          href={`tel:${CLINIC_INFO.phone}`}
          className="flex-1 py-2 text-center text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-700" />
          <span>Call</span>
        </a>

        <button
          onClick={onOpenAppointment}
          className="flex-2 py-2 text-center text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg flex items-center justify-center gap-1.5 shadow-xs"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Appointment</span>
        </button>

        <button
          onClick={onOpenCart}
          className="relative px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center"
          aria-label="Open Cart"
        >
          <ShoppingBag className="w-4 h-4 text-emerald-800" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
};
