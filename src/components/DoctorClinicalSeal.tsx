import React from 'react';
import { Award, ShieldCheck, Stethoscope, Sparkles, HeartPulse, Building2, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicInfo';

interface DoctorClinicalSealProps {
  size?: 'sm' | 'md' | 'lg';
}

export const DoctorClinicalSeal: React.FC<DoctorClinicalSealProps> = ({ size = 'md' }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-stone-900 to-teal-950 p-8 sm:p-10 text-white border border-emerald-800/60 shadow-xl flex flex-col justify-between select-none">
      {/* Decorative Classical Apothecary Watermark Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center justify-between border-b border-emerald-800/70 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-800 text-emerald-300 flex items-center justify-center font-display font-bold text-sm">
            S
          </div>
          <span className="text-xs uppercase tracking-widest font-semibold text-emerald-300">
            Official Clinical Seal
          </span>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-900/60 px-2.5 py-1 rounded-md border border-emerald-700/50">
          R.H.M.P REGISTERED
        </span>
      </div>

      {/* Center Medical Emblem */}
      <div className="relative z-10 my-8 text-center space-y-4">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-emerald-800 via-teal-700 to-emerald-600 p-1 shadow-2xl flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-stone-950 flex flex-col items-center justify-center border border-emerald-400/30">
            <Stethoscope className="w-9 h-9 text-emerald-400 mb-0.5" />
            <span className="text-[9px] font-bold tracking-widest text-emerald-300 uppercase">
              Homeopathy
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="font-display text-2xl font-bold text-white tracking-tight">
            Physician M Zargham Ghaffar
          </h3>
          <p className="text-xs text-emerald-300 font-medium">
            Senior Classical Homeopathic Physician & Natural Health Consultant
          </p>
          <p className="text-[11px] text-stone-400 font-mono">
            Sultan Homeopathic Clinic · Samundri-Rajana Road, Faisalabad
          </p>
        </div>
      </div>

      {/* Bottom Clinical Badges */}
      <div className="relative z-10 pt-4 border-t border-emerald-800/70 grid grid-cols-2 gap-3 text-xs text-stone-300">
        <div className="flex items-center gap-2 bg-emerald-900/40 p-2.5 rounded-xl border border-emerald-800/50">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-[11px]">15+ Years Clinical Practice</span>
        </div>
        <div className="flex items-center gap-2 bg-emerald-900/40 p-2.5 rounded-xl border border-emerald-800/50">
          <HeartPulse className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-[11px]">25,000+ Recovered Cases</span>
        </div>
      </div>
    </div>
  );
};
