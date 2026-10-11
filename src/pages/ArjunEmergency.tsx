import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  UserCheck, 
  MapPin, 
  Key, 
  Volume2, 
  VolumeX, 
  PhoneCall, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Flashlight, 
  Navigation,
  ArrowRight,
  RefreshCw,
  BellRing
} from 'lucide-react';
import { sound } from '../utils/audio';

interface ArjunEmergencyProps {
  onNotifyMelbourne?: () => void;
}

export const ArjunEmergency: React.FC<ArjunEmergencyProps> = ({ onNotifyMelbourne }) => {
  const [alarmActive, setAlarmActive] = useState<boolean>(true);
  const [responderStatus, setResponderStatus] = useState<'idle' | 'en_route' | 'declined'>('idle');
  const [flashlightOn, setFlashlightOn] = useState<boolean>(false);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(32);

  // Auto-play alarm effect on initial view
  useEffect(() => {
    // Sound wake-up siren
    sound.startEmergencyAlarm();
    setAlarmActive(true);

    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      sound.stopAlarm();
      clearInterval(timer);
    };
  }, []);

  const handleMuteAlarm = () => {
    sound.stopAlarm();
    setAlarmActive(false);
  };

  const handleStartAlarm = () => {
    sound.startEmergencyAlarm();
    setAlarmActive(true);
  };

  const handleAccept = () => {
    sound.stopAlarm();
    setAlarmActive(false);
    setResponderStatus('en_route');
    sound.playTap();
    if (onNotifyMelbourne) {
      onNotifyMelbourne();
    }
  };

  const handleDecline = () => {
    sound.stopAlarm();
    setAlarmActive(false);
    setResponderStatus('declined');
    sound.playTap();
  };

  return (
    <div className={`relative min-h-[820px] rounded-3xl overflow-hidden transition-all duration-300 ${
      flashlightOn ? 'bg-amber-100 text-black' : 'bg-black text-white'
    } p-4 sm:p-8 flex flex-col justify-between shadow-2xl border-4 border-amber-500/80`}>
      
      {/* Audio Siren Toggle Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
            High-Decibel Bedside Terminal (Arjun • Age 74)
          </span>
        </div>

        <button
          onClick={alarmActive ? handleMuteAlarm : handleStartAlarm}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            alarmActive 
              ? 'bg-rose-600 text-white border-rose-500 animate-bounce' 
              : 'bg-zinc-800 text-zinc-300 border-zinc-700'
          }`}
        >
          {alarmActive ? (
            <>
              <Volume2 className="w-4 h-4" />
              Siren Blaring (Tap to Silence)
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4" />
              Siren Muted (Tap to Test Alarm)
            </>
          )}
        </button>
      </div>

      {/* Main Alert Card */}
      <div className="my-auto py-6 space-y-6 max-w-2xl mx-auto w-full">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/50 text-xs sm:text-sm font-bold">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Priority Proximity Alert — Next Door (2 min distance)
        </div>

        {/* Main Notice Heading */}
        <div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            Malani Amma Needs Assistance.
          </h1>
          <p className="text-amber-400/90 text-sm sm:text-base font-medium mt-2">
            No. 42, Rajapihilla Mawatha (Opposite Temple Bodhi Tree)
          </p>
        </div>

        {/* Explicit Verification Text (Constraint 3) */}
        <div className="bg-zinc-900/90 border border-zinc-700/80 rounded-2xl p-4 sm:p-5 text-zinc-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Consent & Sensor Verification Record
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-zinc-300 font-sans">
            "Sensor confirmed <strong>prolonged immobility in bathroom (&gt; 3 minutes)</strong>. Voice check in Sinhala received no reply. <strong>Malani pre-approved your dispatch</strong> for unconfirmed silence to avoid hospital delays."
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-xs text-zinc-400 font-mono">
            <span>Elapsed: {secondsElapsed}s since fall detection</span>
            <span className="text-emerald-400 font-semibold">Zero Camera Visuals (Radar Only)</span>
          </div>
        </div>

        {/* State Flow: Idle -> Active Response / Declined */}
        {responderStatus === 'idle' && (
          <div className="space-y-4 pt-2">
            <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold text-center">
              Large Touch Targets for Waking from Deep Sleep:
            </div>

            {/* TWO MASSIVE TOUCH TARGETS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* BUTTON 1: Massive Green */}
              <button
                onClick={handleAccept}
                className="py-6 px-6 rounded-3xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-black text-lg sm:text-xl shadow-xl shadow-emerald-950/60 flex flex-col items-center justify-center gap-1 border-2 border-emerald-400 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-7 h-7" />
                  <span>I AM ON MY WAY</span>
                </div>
                <span className="text-xs font-normal text-emerald-100 opacity-90">
                  (Silences alarm & notifies Dilrukshi in Melbourne)
                </span>
              </button>

              {/* BUTTON 2: Outline/Ghost */}
              <button
                onClick={handleDecline}
                className="py-6 px-6 rounded-3xl bg-zinc-900/90 hover:bg-zinc-800 active:scale-[0.98] text-zinc-300 hover:text-white font-bold text-base sm:text-lg border-2 border-zinc-700 hover:border-zinc-500 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <XCircle className="w-6 h-6 text-rose-400" />
                  <span>CANNOT RESPOND</span>
                </div>
                <span className="text-xs font-normal text-zinc-400">
                  (Escalates immediately to Kandy 1990 Emergency)
                </span>
              </button>
            </div>
          </div>
        )}

        {/* When Arjun Accepts: Active On-Route Dashboard */}
        {responderStatus === 'en_route' && (
          <div className="bg-emerald-950/80 border-2 border-emerald-500 rounded-3xl p-6 text-white space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Status: En Route to Malani Amma</h3>
                  <p className="text-xs text-emerald-300">Melbourne daughter notified. Alarm silenced.</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-900 text-emerald-200 text-xs font-mono font-bold">
                ETA: 90 SECONDS
              </span>
            </div>

            {/* Quick Access Tools for Arjun */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-black/60 p-4 rounded-2xl border border-emerald-600/60 flex items-center gap-3">
                <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
                  <Key className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase text-zinc-400 block font-semibold">Front Veranda Lockbox</span>
                  <span className="text-2xl font-mono font-black text-amber-300 tracking-widest">PIN: 8492</span>
                </div>
              </div>

              <button
                onClick={() => setFlashlightOn(!flashlightOn)}
                className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                  flashlightOn 
                    ? 'bg-amber-400 text-black border-amber-300' 
                    : 'bg-black/60 text-white border-emerald-600/60 hover:bg-zinc-900'
                }`}
              >
                <div className="p-3 bg-zinc-800 text-amber-300 rounded-xl">
                  <Flashlight className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <span className="text-xs uppercase text-zinc-400 block font-semibold">Night Screen Light</span>
                  <span className="text-sm font-bold">{flashlightOn ? 'Torch ON (Tap to Off)' : 'Turn Screen Torch ON'}</span>
                </div>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setResponderStatus('idle')}
                className="text-xs text-zinc-400 hover:text-white underline"
              >
                Reset Alert Simulator
              </button>

              <a
                href="tel:1990"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                Direct Dial 1990 Ambulance
              </a>
            </div>
          </div>
        )}

        {/* When Arjun Declines: Immediate Escalation */}
        {responderStatus === 'declined' && (
          <div className="bg-rose-950/80 border-2 border-rose-500 rounded-3xl p-6 text-white space-y-4 animate-scaleUp">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold">
                !
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Escalated to Emergency Services</h3>
                <p className="text-xs text-rose-300">
                  Kandy Suwa Seriya (1990) auto-dispatched. Melbourne daughter phoned via high-priority automated voice call.
                </p>
              </div>
            </div>

            <button
              onClick={() => setResponderStatus('idle')}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200"
            >
              Back to Responder Alert
            </button>
          </div>
        )}
      </div>

      {/* Rationale Bottom Strip */}
      <div className="border-t border-zinc-800 pt-4 text-xs text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-amber-400" />
          Escalation Friction Rule: Arjun lives 2 minutes away. No complex mobile unlock or small menus.
        </span>
        <span className="text-zinc-500">Mithra High-Contrast Night Engine</span>
      </div>
    </div>
  );
};

