import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  userLabel: string;
  locationLabel: string;
  timeLabel?: string;
  carrierLabel?: string;
  darkFrame?: boolean;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  userLabel,
  locationLabel,
  timeLabel = '02:45 PM',
  carrierLabel = '5G',
  darkFrame = false,
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Device Persona Label above the phone */}
      <div className="mb-3 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200 text-slate-800 border border-slate-300 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Mobile Phone App • {userLabel}
        </span>
        <p className="text-[11px] text-slate-500 mt-1">{locationLabel}</p>
      </div>

      {/* Realistic Smartphone Shell (Mandated constraint: border-[8px] border-gray-800 rounded-[2.5rem]) */}
      <div className="w-full max-w-sm mx-auto border-[8px] border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-900 relative ring-1 ring-slate-950/20">
        
        {/* Dynamic Island / Top Speaker & Status Bar */}
        <div className="bg-slate-950 text-slate-400 px-6 pt-3 pb-2 flex items-center justify-between text-[11px] font-mono select-none border-b border-slate-850">
          <span>{timeLabel}</span>

          {/* Dynamic Island Pill */}
          <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center gap-1.5 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-slate-800" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <Signal className="w-3 h-3" />
            <span className="text-[10px]">{carrierLabel}</span>
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Scrollable Screen Content */}
        <div className={`overflow-y-auto max-h-[720px] min-h-[640px] flex flex-col justify-between ${
          darkFrame ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
        }`}>
          {children}
        </div>

        {/* Bottom Navigation Indicator Bar */}
        <div className="bg-slate-950 py-2 flex items-center justify-center select-none border-t border-slate-850">
          <div className="w-32 h-1 bg-slate-600 rounded-full" />
        </div>
      </div>
    </div>
  );
};

