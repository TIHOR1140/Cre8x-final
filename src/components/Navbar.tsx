import React from 'react';
import { 
  Radio, 
  Smartphone, 
  BellRing, 
  Stethoscope, 
  Volume2, 
  VolumeX, 
  Info, 
  ShieldCheck, 
  MapPin,
  Flame
} from 'lucide-react';
import { PageId } from '../types';
import { sound } from '../utils/audio';

interface NavbarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenRationale: () => void;
  onSimulateFullEmergency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onSelectPage,
  isMuted,
  onToggleMute,
  onOpenRationale,
  onSimulateFullEmergency,
}) => {
  const navItems: { id: PageId; label: string; sub: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'malani',
      label: "Malani's Hub",
      sub: 'Screenless Ambient (Kandy)',
      icon: <Radio className="w-4 h-4" />
    },
    {
      id: 'dilrukshi',
      label: "Dilrukshi's App",
      sub: 'Melbourne Daughter',
      icon: <Smartphone className="w-4 h-4" />
    },
    {
      id: 'arjun',
      label: "Arjun's Screen",
      sub: 'Neighbour Wake-Up (2 min)',
      icon: <BellRing className="w-4 h-4" />,
      badge: 'Critical'
    },
    {
      id: 'doctor',
      label: "Dr. Ishan's Digest",
      sub: 'Clinical Triage Report',
      icon: <Stethoscope className="w-4 h-4" />
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Brand & Global Simulation Actions */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 text-white flex items-center justify-center font-black text-sm shadow-sm">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900">Mithra</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Privacy-First Care Ecosystem
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Peradeniya, Kandy, Sri Lanka ⇄ Melbourne, Australia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={onToggleMute}
              title={isMuted ? 'Unmute Audio Synthesis' : 'Mute Audio Synthesis'}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs flex items-center gap-1.5 transition-all"
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

            {/* Simulate Full Emergency Quick Trigger */}
            <button
              onClick={onSimulateFullEmergency}
              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Flame className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span className="hidden sm:inline">Test Emergency Flow</span>
            </button>

            {/* Rationale Drawer Button */}
            <button
              onClick={onOpenRationale}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>UX Rationale</span>
            </button>
          </div>
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
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left whitespace-nowrap transition-all duration-150 border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent'
                }`}
              >
                <span className={`${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
                  {item.icon}
                </span>
                <div>
                  <div className="text-xs leading-none flex items-center gap-1.5">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                        isActive ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-700'
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

