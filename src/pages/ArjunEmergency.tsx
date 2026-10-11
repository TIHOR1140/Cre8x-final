import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  UserCheck, 
  Key, 
  Volume2, 
  VolumeX, 
  PhoneCall, 
  Clock, 
  ShieldAlert, 
  XCircle, 
  Flashlight
} from 'lucide-react';
import { sound } from '../utils/audio';
import { MobileFrame } from '../components/MobileFrame';

interface ArjunEmergencyProps {
  onNotifyMelbourne?: () => void;
}

export const ArjunEmergency: React.FC<ArjunEmergencyProps> = ({ onNotifyMelbourne }) => {
  const [alarmActive, setAlarmActive] = useState<boolean>(true);
  const [responderStatus, setResponderStatus] = useState<'idle' | 'en_route' | 'declined'>('idle');
  const [flashlightOn, setFlashlightOn] = useState<boolean>(false);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(32);

  useEffect(() => {
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
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      {/* Top Controller Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Arjun's Bedside Smartphone Alert
          </span>
        </div>

        <button
          onClick={alarmActive ? handleMuteAlarm : handleStartAlarm}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            alarmActive 
              ? 'bg-rose-600 text-white border-rose-500 animate-pulse' 
              : 'bg-zinc-800 text-zinc-300 border-zinc-700'
          }`}
        >
          {alarmActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              Siren ON (Tap to Mute)
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              Siren Muted (Test Siren)
            </>
          )}
        </button>
      </div>

      {/* MOBILE PHONE MOCKUP CONTAINER */}
      <MobileFrame
        userLabel="Arjun (Neighbour • Age 74)"
        locationLabel="Peradeniya (Next Door • 2 min walk)"
        timeLabel="02:20 AM"
        carrierLabel="Dialog 4G"
        darkFrame={true}
      >
        <div className={`p-4 flex flex-col justify-between min-h-[640px] transition-colors duration-300 ${
          flashlightOn ? 'bg-amber-100 text-black' : 'bg-black text-white'
        }`}>
          
          <div className="space-y-4">
            {/* Priority Status Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/50 text-[11px] font-bold">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Priority Proximity Alert — Next Door (2 min)
            </div>

            {/* Main Urgent Notice */}
            <div>
              <h1 className="text-2xl font-black tracking-tight uppercase leading-tight">
                Malani Amma Needs Assistance.
              </h1>
              <p className="text-amber-400 text-xs font-medium mt-1">
                No. 42, Rajapihilla Mawatha (Opposite Bodhi Tree)
              </p>
            </div>

            {/* Verification & Consent Record */}
            <div className={`p-3 rounded-2xl border text-xs space-y-1.5 ${
              flashlightOn ? 'bg-amber-50 border-amber-300 text-slate-800' : 'bg-zinc-900 border-zinc-700/80 text-zinc-300'
            }`}>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                <ShieldAlert className="w-3.5 h-3.5" />
                Consent & Sensor Verification Record
              </div>
              <p className="text-[11px] leading-relaxed">
                Sensor confirmed <strong>prolonged immobility in bathroom (&gt; 3 mins)</strong>. Voice check in Sinhala received no reply. <strong>Malani pre-approved your dispatch</strong> for unconfirmed silence.
              </p>
              <div className="pt-1 text-[10px] text-zinc-400 font-mono flex items-center justify-between">
                <span>Elapsed: {secondsElapsed}s</span>
                <span className="text-emerald-400 font-semibold">Radar Only (Zero Cameras)</span>
              </div>
            </div>

            {/* IDLE STATE: TWO MASSIVE TOUCH TARGETS */}
            {responderStatus === 'idle' && (
              <div className="space-y-2.5 pt-1">
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold text-center">
                  Large Targets for Groggy Awakening:
                </div>

                {/* Button 1: Massive Green */}
                <button
                  onClick={handleAccept}
                  className="w-full py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-black text-base shadow-lg shadow-emerald-950/80 flex flex-col items-center justify-center gap-0.5 border-2 border-emerald-400 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-6 h-6" />
                    <span>I AM ON MY WAY</span>
                  </div>
                  <span className="text-[10px] font-normal text-emerald-100 opacity-90">
                    (Notifies Dilrukshi in Melbourne)
                  </span>
                </button>

                {/* Button 2: Outline/Ghost */}
                <button
                  onClick={handleDecline}
                  className="w-full py-3 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs border border-zinc-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Cannot Respond (Escalates to 1990)</span>
                </button>
              </div>
            )}

            {/* EN ROUTE STATE */}
            {responderStatus === 'en_route' && (
              <div className="bg-emerald-950/80 border-2 border-emerald-500 rounded-2xl p-4 text-white space-y-3.5 animate-scaleUp">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">Status: En Route</h3>
                      <p className="text-[10px] text-emerald-300">Melbourne daughter notified.</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-200 text-[10px] font-mono font-bold">
                    ETA: 90s
                  </span>
                </div>

                <div className="space-y-2">
                  {/* Gate PIN */}
                  <div className="bg-black/60 p-3 rounded-xl border border-emerald-600/60 flex items-center gap-3">
                    <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                      <Key className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-zinc-400 block font-semibold">Front Veranda Lockbox</span>
                      <span className="text-xl font-mono font-black text-amber-300 tracking-wider">PIN: 8492</span>
                    </div>
                  </div>

                  {/* Torch toggle */}
                  <button
                    onClick={() => setFlashlightOn(!flashlightOn)}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      flashlightOn 
                        ? 'bg-amber-400 text-black border-amber-300 font-bold text-xs' 
                        : 'bg-zinc-900 text-white border-zinc-700 text-xs'
                    }`}
                  >
                    <Flashlight className="w-4 h-4 text-amber-300" />
                    <span>{flashlightOn ? 'Screen Torch ON (Tap to Off)' : 'Turn Screen Torch ON'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setResponderStatus('idle')}
                    className="text-[10px] text-zinc-400 hover:text-white underline"
                  >
                    Reset
                  </button>
                  <a
                    href="tel:1990"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white text-[10px] font-bold"
                  >
                    <PhoneCall className="w-3 h-3" />
                    Dial 1990 Ambulance
                  </a>
                </div>
              </div>
            )}

            {/* DECLINED STATE */}
            {responderStatus === 'declined' && (
              <div className="bg-rose-950/80 border-2 border-rose-500 rounded-2xl p-4 text-white space-y-3 animate-scaleUp">
                <div className="text-sm font-bold text-white">Auto-Escalated to 1990</div>
                <p className="text-[10px] text-rose-300">
                  Suwa Seriya ambulance dispatched. Automated alert call sent to Dilrukshi in Melbourne.
                </p>
                <button
                  onClick={() => setResponderStatus('idle')}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 text-xs font-semibold"
                >
                  Back to Alert
                </button>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-zinc-800 text-[10px] text-zinc-500 text-center flex items-center justify-center gap-1">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Escalation Friction Rule: 2 min proximity bedside mobile alert</span>
          </div>
        </div>
      </MobileFrame>
    </div>
  );
};
