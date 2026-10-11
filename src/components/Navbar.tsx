import React from 'react';
import { 
  Radio, 
  Smartphone, 
  BellRing, 
  Stethoscope, 
  Volume2, 
  VolumeX, 
  Info, 
  AlertTriangle
} from 'lucide-react';
import { PageId } from '../types';
import { sound } from '../utils/audio';
import { SurakshaLogo } from './SurakshaLogo';

interface NavbarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenRationale: () => void;
  isNewSituation: boolean;
  onToggleNewSituation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onSelectPage,
  isMuted,
  onToggleMute,
  onOpenRationale,
  isNewSituation,
  onToggleNewSituation,
}) => {
  const navItems: { id: PageId; label: string; sub: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'malani',
      label: "1. In-Home Hardware",
      sub: isNewSituation ? 'Hub & Smart Watch (Fall Alert)' : 'Hub & Smart Watch (Vitals & Voice)',
      icon: <Radio className="w-4 h-4" />,
      badge: isNewSituation ? 'Urgent Glow' : 'Hardware'
    },
    {
      id: 'dilrukshi',
      label: "2. Dilrukshi's Phone",
      sub: isNewSituation ? '7:30 AM Morning Warning' : 'Daughter App (Melbourne)',
      icon: <Smartphone className="w-4 h-4" />,
      badge: isNewSituation ? '7:30 AM AEST' : undefined
    },
    {
      id: 'arjun',
      label: "3. Arjun's Phone",
      sub: isNewSituation ? 'Emergency Override Bedside' : 'Neighbour Alert (2 min)',
      icon: <BellRing className="w-4 h-4" />,
      badge: 'Critical'
    },
    {
      id: 'doctor',
      label: "4. Doctor's Phone",
      sub: isNewSituation ? 'Live Vitals (104 BPM)' : 'Dr. Ishan Clinical App',
      icon: <Stethoscope className="w-4 h-4" />,
      badge: isNewSituation ? 'Live Vitals' : undefined
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Brand & Actions */}
        <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <SurakshaLogo size="md" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 font-sinhala">සුරක්ෂා</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Privacy-First Care Ecosystem
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block">
                Peradeniya, Kandy, Sri Lanka ⇄ Melbourne, Australia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={onToggleMute}
              title={isMuted ? 'Unmute Audio Synthesis' : 'Mute Audio Synthesis'}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-500" />
                  <span className="hidden md:inline text-[11px]">Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  <span className="hidden md:inline text-[11px]">Audio ON</span>
                </>
              )}
            </button>

            {/* Rationale Drawer Button */}
            <button
              onClick={onOpenRationale}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>UX Rationale</span>
            </button>
          </div>
        </div>

        {/* 1. GLOBAL CONTROL: PROMINENT TOGGLE SWITCH */}
        <div className={`my-2 p-2.5 sm:px-4 sm:py-3 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 shadow-xs ${
          isNewSituation 
            ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/10 border-amber-500 text-amber-950 ring-2 ring-amber-400/30' 
            : 'bg-slate-100 hover:bg-slate-200/70 border-slate-300/80 text-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl transition-colors ${
              isNewSituation ? 'bg-amber-600 text-white shadow-md animate-pulse' : 'bg-slate-200 text-slate-600'
            }`}>
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs sm:text-sm font-black tracking-tight">
                  Simulate New Situation: 2:00 AM Fall (7:30 AM Melbourne)
                </span>
                {isNewSituation ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-600 text-white shadow-xs animate-pulse">
                    OVERRIDE ACTIVE
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-600">
                    DEFAULT ROUTINE
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 hidden md:block">
                {isNewSituation 
                  ? 'Protocols active: Home Hub pulsing Amber, Dilrukshi warned in daylight without middle-of-night panic, Arjun dispatched, Trust Repair logged.'
                  : 'Toggle to test the 4-min floor immobility override and the timezone loophole.'}
              </p>
            </div>
          </div>

          <button
            onClick={onToggleNewSituation}
            role="switch"
            aria-checked={isNewSituation}
            title="Toggle New Situation: 2:00 AM Fall"
            className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isNewSituation ? 'bg-amber-600 ring-2 ring-amber-400/40' : 'bg-slate-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                isNewSituation ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Multi-Page Navigation Bar */}
        <nav className="flex items-center gap-1 sm:gap-2 py-2 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectPage(item.id);
                  sound.playTap();
                }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left whitespace-nowrap transition-all duration-150 border cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent'
                }`}
              >
                <span className={`${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
                  {item.icon}
                </span>
                <div>
                  <div className="text-xs leading-none flex items-center gap-1.5 font-bold">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                        isActive 
                          ? isNewSituation ? 'bg-amber-500 text-slate-950' : 'bg-rose-500 text-white' 
                          : isNewSituation ? 'bg-amber-100 text-amber-900' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className={`text-[10px] leading-none mt-1 hidden lg:block ${
                    isActive ? 'text-slate-300' : 'text-slate-400'
                  }`}>
                    {item.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
