import React, { useState } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { RationaleModal } from './components/RationaleModal';
import { MalaniHub } from './pages/MalaniHub';
import { DilrukshiApp } from './pages/DilrukshiApp';
import { ArjunEmergency } from './pages/ArjunEmergency';
import { DrDigest } from './pages/DrDigest';
import { sound } from './utils/audio';
import { MapPin } from 'lucide-react';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('malani');
  const [isRationaleOpen, setIsRationaleOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isNewSituation, setIsNewSituation] = useState<boolean>(false);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  const handleToggleNewSituation = () => {
    const next = !isNewSituation;
    setIsNewSituation(next);
    sound.playTap();
    if (next) {
      sound.playSoftChime();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans transition-colors duration-300">
      {/* Persistent Navigation Bar with Prominent Global Control */}
      <Navbar
        currentPage={currentPage}
        onSelectPage={setCurrentPage}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenRationale={() => setIsRationaleOpen(true)}
        isNewSituation={isNewSituation}
        onToggleNewSituation={handleToggleNewSituation}
      />

      {/* Main Page Content Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentPage === 'malani' && (
          <MalaniHub 
            onTriggerEmergency={() => setCurrentPage('arjun')} 
            isNewSituation={isNewSituation}
          />
        )}

        {currentPage === 'dilrukshi' && (
          <DilrukshiApp 
            onNavigateToArjun={() => setCurrentPage('arjun')}
            onNavigateToDoctor={() => setCurrentPage('doctor')}
            isNewSituation={isNewSituation}
          />
        )}

        {currentPage === 'arjun' && (
          <ArjunEmergency 
            onNotifyMelbourne={() => setCurrentPage('dilrukshi')} 
            isNewSituation={isNewSituation}
          />
        )}

        {currentPage === 'doctor' && (
          <DrDigest 
            isNewSituation={isNewSituation}
          />
        )}
      </main>

      {/* Rationale & Evidence Modal */}
      <RationaleModal
        isOpen={isRationaleOpen}
        onClose={() => setIsRationaleOpen(false)}
      />

      {/* Persistent Cultural & Architectural Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Mithra Ecosystem</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              Peradeniya / Kandy, Sri Lanka ⇄ Melbourne, Australia
            </span>
          </div>

          <div className="text-slate-400 text-[11px]">
            Zero Camera Surveillance • 4-Min Immobility Override • Timezone Loophole Protocol
          </div>

          <button
            onClick={() => setIsRationaleOpen(true)}
            className="text-indigo-600 hover:text-indigo-800 font-semibold underline text-xs cursor-pointer"
          >
            Review Geriatric UX Rationale
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
