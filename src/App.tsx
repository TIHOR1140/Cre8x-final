import React, { useState } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { RationaleModal } from './components/RationaleModal';
import { MalaniHub } from './pages/MalaniHub';
import { DilrukshiApp } from './pages/DilrukshiApp';
import { ArjunEmergency } from './pages/ArjunEmergency';
import { DrDigest } from './pages/DrDigest';
import { sound } from './utils/audio';
import { Heart, MapPin, Shield } from 'lucide-react';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('malani');
  const [isRationaleOpen, setIsRationaleOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  const handleSimulateFullEmergency = () => {
    // Jump straight to Arjun's emergency wake-up view to test high-urgency friction
    setCurrentPage('arjun');
    sound.playTap();
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Persistent Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onSelectPage={setCurrentPage}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenRationale={() => setIsRationaleOpen(true)}
        onSimulateFullEmergency={handleSimulateFullEmergency}
      />

      {/* Main Page Content Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentPage === 'malani' && (
          <MalaniHub onTriggerEmergency={() => setCurrentPage('arjun')} />
        )}

        {currentPage === 'dilrukshi' && (
          <DilrukshiApp 
            onNavigateToArjun={() => setCurrentPage('arjun')}
            onNavigateToDoctor={() => setCurrentPage('doctor')}
          />
        )}

        {currentPage === 'arjun' && (
          <ArjunEmergency onNotifyMelbourne={() => setCurrentPage('dilrukshi')} />
        )}

        {currentPage === 'doctor' && (
          <DrDigest />
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
              Peradeniya / Kandy, Sri Lanka
            </span>
          </div>

          <div className="text-slate-400 text-[11px]">
            Zero Camera Surveillance • Decentralised Edge Mesh • Suwa Seriya 1990 Ready
          </div>

          <button
            onClick={() => setIsRationaleOpen(true)}
            className="text-indigo-600 hover:text-indigo-800 font-semibold underline text-xs"
          >
            Review Geriatric UX Rationale
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
