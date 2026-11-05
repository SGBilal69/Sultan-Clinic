import React from 'react';
import { Sparkles, ShieldCheck, Heart, Droplets, Leaf, Activity, Pill, Flame } from 'lucide-react';
import { Product } from '../types';

interface ProductVisualProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
}

export const ProductVisual: React.FC<ProductVisualProps> = ({ product, size = 'md' }) => {
  // Determine color scheme and iconography based on category
  const getTheme = () => {
    switch (product.category) {
      case 'mens_health':
        return {
          bg: 'from-amber-900/90 via-stone-900 to-amber-950',
          accent: 'text-amber-400',
          border: 'border-amber-700/50',
          labelBg: 'bg-amber-950/80 text-amber-200 border-amber-800',
          tag: 'Men\'s Vitality & Stamina',
          icon: Flame,
        };
      case 'womens_health':
        return {
          bg: 'from-rose-950/90 via-stone-900 to-rose-900/80',
          accent: 'text-rose-400',
          border: 'border-rose-700/50',
          labelBg: 'bg-rose-950/80 text-rose-200 border-rose-800',
          tag: 'Hormonal & Women\'s Care',
          icon: Heart,
        };
      case 'skin_hair':
        return {
          bg: 'from-emerald-950/90 via-teal-950 to-stone-900',
          accent: 'text-emerald-400',
          border: 'border-emerald-700/50',
          labelBg: 'bg-emerald-950/80 text-emerald-200 border-emerald-800',
          tag: 'Pure Herbal & Botanical',
          icon: Leaf,
        };
      case 'digestive_renal':
        return {
          bg: 'from-cyan-950/90 via-stone-900 to-teal-950',
          accent: 'text-cyan-400',
          border: 'border-cyan-700/50',
          labelBg: 'bg-cyan-950/80 text-cyan-200 border-cyan-800',
          tag: 'Organ & Renal Restoration',
          icon: Activity,
        };
      default:
        return {
          bg: 'from-emerald-950 via-stone-900 to-teal-950',
          accent: 'text-emerald-400',
          border: 'border-emerald-700/50',
          labelBg: 'bg-emerald-950/80 text-emerald-200 border-emerald-800',
          tag: 'Clinical Homeopathic Course',
          icon: Pill,
        };
    }
  };

  const theme = getTheme();
  const Icon = theme.icon;

  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-t-2xl overflow-hidden bg-gradient-to-br ${theme.bg} p-6 flex flex-col justify-between text-white select-none border-b ${theme.border}`}
    >
      {/* Subtle Classical Apothecary Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />

      {/* Top Row: Category tag and Seal */}
      <div className="relative z-10 flex items-center justify-between">
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${theme.labelBg} shadow-xs`}
        >
          {theme.tag}
        </span>
        <div className="flex items-center gap-1.5 text-[10px] text-stone-300 bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Sultan Dispensary</span>
        </div>
      </div>

      {/* Center: Iconic Classical Apothecary Bottle Vector Illustration */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
        <div className="relative flex items-center justify-center">
          {/* Outer glow ring */}
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xs shadow-inner">
            <Icon className={`w-10 h-10 ${theme.accent} transition-transform duration-300 group-hover:scale-110`} />
          </div>

          {/* Potency Indicator Tag */}
          <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-emerald-800 text-white rounded text-[10px] font-bold shadow-md border border-emerald-700 font-mono">
            100% PURE
          </div>
        </div>

        {/* Course Duration / Unit Tag */}
        <div className="mt-3 text-center">
          <div className="font-display text-sm font-bold tracking-tight text-white line-clamp-1">
            {product.name}
          </div>
          <div className="text-[11px] text-stone-300 font-mono">
            {product.durationDays ? `${product.durationDays} Days Clinical Protocol` : product.volumeOrUnit || 'Original Formulation'}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Packaging Integrity & Origin */}
      <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-stone-400 font-mono">
        <span>GENUINE POTENCIES</span>
        <span className="text-emerald-400 font-semibold">DISCREET PACKAGING</span>
      </div>
    </div>
  );
};
