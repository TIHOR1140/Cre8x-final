import React from 'react';
import { 
  EyeOff, 
  BellOff, 
  AlertTriangle, 
  Volume2, 
  X, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Heart
} from 'lucide-react';

interface RationaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RationaleModal: React.FC<RationaleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-scaleUp p-6 sm:p-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              Geriatric HCI & Privacy Architecture
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              UX Context & Design Rationale (Evidence-Backed)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Why each interface in the Mithra ecosystem is intentionally constrained.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Core Pillars */}
        <div className="space-y-4">
          
          {/* 1. Anti-Surveillance */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-base">
              <EyeOff className="w-5 h-5 text-emerald-700" />
              <span>1. Anti-Surveillance (Malani, 87 — Dignity Over Video)</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-950/90 leading-relaxed">
              <strong>Evidence:</strong> Installing live video cameras in the homes of Sri Lankan elders creates profound indignity and shame, especially around bathrooms, dressing, and quiet prayer. Elders often drape cloths over lenses or unplug units.
            </p>
            <div className="bg-white/80 p-3 rounded-xl text-xs text-emerald-900 border border-emerald-200">
              <strong>Mithra Implementation:</strong> Physical omission of camera sensors. Motion and stillness are detected using 60GHz micro-radar and PIR sensors. Data is processed locally; no visuals exist to hack or view.
            </div>
          </div>

          {/* 2. Alert Fatigue Prevention */}
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
            <div className="flex items-center gap-2.5 text-indigo-900 font-bold text-base">
              <BellOff className="w-5 h-5 text-indigo-700" />
              <span>2. Alert Fatigue Prevention (Dr. Fernando & Dilrukshi — "No News is Good News")</span>
            </div>
            <p className="text-xs sm:text-sm text-indigo-950/90 leading-relaxed">
              <strong>Evidence:</strong> Dilrukshi lives in Melbourne (+4.5 to 5.5 hours ahead). Constant push notifications for trivial occurrences (e.g. slight delays in bedtime tea or deferring a pill by an hour) cause chronic cortisol spikes and timezone burnout.
            </p>
            <div className="bg-white/80 p-3 rounded-xl text-xs text-indigo-900 border border-indigo-200">
              <strong>Mithra Implementation:</strong> Passive state during routine life. Routine misses are contained on-device in Sinhala and batched into Dr. Ishan's Sunday Clinical Digest. Only verified, unanswered emergencies trigger immediate international calls.
            </div>
          </div>

          {/* 3. Escalation Friction */}
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
            <div className="flex items-center gap-2.5 text-rose-900 font-bold text-base">
              <AlertTriangle className="w-5 h-5 text-rose-700" />
              <span>3. Escalation Friction (Arjun, 74 — Proximity vs Deep Sleep)</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-950/90 leading-relaxed">
              <strong>Evidence:</strong> Arjun lives 2 minutes away but sleeps heavily and leaves his phone across the room. Standard small push banners fail to wake elderly neighbours or get dismissed accidentally.
            </p>
            <div className="bg-white/80 p-3 rounded-xl text-xs text-rose-900 border border-rose-200">
              <strong>Mithra Implementation:</strong> Dedicated high-contrast wake-up display with piercing audio alarm simulation and two massive touch targets. Features explicit consent verification that Malani pre-approved his dispatch, with gate lockbox codes and built-in screen torch.
            </div>
          </div>

          {/* 4. Screenless & Voice-First */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2.5 text-amber-900 font-bold text-base">
              <Volume2 className="w-5 h-5 text-amber-700" />
              <span>4. Voice-First & Screenless Emulation (Cognitive Flow in Kandy)</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950/90 leading-relaxed">
              <strong>Evidence:</strong> Age-related vision impairment and low English tech literacy make touchscreens a source of anxiety. Traditional pottery or brass lighting fits natural Sri Lankan home aesthetics.
            </p>
            <div className="bg-white/80 p-3 rounded-xl text-xs text-amber-900 border border-amber-200">
              <strong>Mithra Implementation:</strong> 360-degree ambient radial light glow paired with respectful, colloquial Sinhala ("මලනී අම්මා"). Light acts as non-verbal ambient cueing before any audio speaks.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all"
          >
            Close & Return to Prototype
          </button>
        </div>
      </div>
    </div>
  );
};

