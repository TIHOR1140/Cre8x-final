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
  Flashlight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { sound } from '../utils/audio';
import { MobileFrame } from '../components/MobileFrame';

interface ArjunEmergencyProps {
  onNotifyMelbourne?: () => void;
  isNewSituation?: boolean;
}

export const ArjunEmergency: React.FC<ArjunEmergencyProps> = ({ 
  onNotifyMelbourne,
  isNewSituation = false
}) => {
  const [alarmActive, setAlarmActive] = useState<boolean>(true);
  const [responderStatus, setResponderStatus] = useState<'idle' | 'en_route' | 'declined'>('idle');
  const [flashlightOn, setFlashlightOn] = useState<boolean>(false);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(isNewSituation ? 245 : 32);

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
  }, [isNewSituation]);

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
            {isNewSituation ? "Arjun's Phone: Emergency Override Dispatch" : "Arjun's Bedside Smartphone Alert"}
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

      {/* MOBILE PHONE MOCKUP CONTAINER - FORCED HIGH CONTRAST RED/BLACK DARK MODE */}
      <MobileFrame
        userLabel="Arjun (Neighbour • Age 74)"
        locationLabel="Next Door • 2 min walk"
        timeLabel={isNewSituation ? "02:18 AM" : "02:20 AM"}
        carrierLabel="Dialog 4G"
        darkFrame={true}
      >
        <div className={`p-4 flex flex-col justify-between min-h-[640px] transition-colors duration-300 ${
          flashlightOn ? 'bg-amber-100 text-black' : 'bg-black text-white'
        }`}>
          
          <div className="space-y-4">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/50 text-[11px] font-black tracking-wide">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              {isNewSituation ? "CRITICAL PROXIMITY DISPATCH (2 MIN)" : "Priority Proximity Alert — Next Door"}
            </div>

            {/* 4. HEADLINE: EMERGENCY OVERRIDE */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase leading-tight text-white">
                {isNewSituation ? "EMERGENCY OVERRIDE: Check on Malani." : "Malani Amma Needs Assistance."}
              </h1>
              <p className="text-amber-400 text-xs font-medium mt-1">
                No. 42, Rajapihilla Mawatha (Opposite Bodhi Tree)
              </p>
            </div>

            {/* 4. ALERT TEXT */}
            <div className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
              flashlightOn ? 'bg-amber-50 border-amber-300 text-slate-800' : 'bg-zinc-900 border-rose-500/60 text-zinc-200'
            }`}>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-400">
                <ShieldAlert className="w-3.5 h-3.5" />
                Safety Override Protocol Triggered
              </div>
              
              {/* Alert text requested */}
              <p className="text-xs sm:text-sm font-semibold leading-relaxed text-white">
                {isNewSituation ? (
                  "Malani verbally refused help but has been immobile on the bathroom floor for >4 minutes. Please go over immediately."
                ) : (
                  "Sensor confirmed prolonged immobility in bathroom (>3 mins). Voice check in Sinhala received no reply. Malani pre-approved your dispatch."
                )}
              </p>

              <div className="pt-1.5 text-[10px] text-zinc-400 font-mono flex items-center justify-between border-t border-zinc-800">
                <span>Immobility: {isNewSituation ? "4m 12s on floor" : `${secondsElapsed}s elapsed`}</span>
                <span className="text-emerald-400 font-semibold">Melbourne Not Alarmed</span>
              </div>
            </div>

            {/* IDLE STATE: TWO MASSIVE TOUCH TARGETS */}
            {responderStatus === 'idle' && (
              <div className="space-y-3 pt-1">
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold text-center">
                  Designed for Waking from Heavy Sleep:
                </div>

                {/* 4. BUTTONS: Highlight "I am going over now" in BRIGHT GREEN */}
                <button
                  onClick={handleAccept}
                  className="w-full py-5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-450 active:scale-[0.98] text-white font-black text-base sm:text-lg shadow-xl shadow-emerald-950/90 ring-4 ring-emerald-400/50 flex flex-col items-center justify-center gap-0.5 border-2 border-emerald-300 transition-all cursor-pointer animate-pulse"
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-6 h-6 text-white" />
                    <span>I AM GOING OVER NOW</span>
                  </div>
                  <span className="text-[10px] font-medium text-emerald-100 opacity-95">
                    (Silences siren • Sends gentle update to Dilrukshi)
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
                      <h3 className="text-sm font-bold">Status: En Route to Malani</h3>
                      <p className="text-[10px] text-emerald-300">Melbourne morning digest notified.</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-200 text-[10px] font-mono font-bold">
                    ETA: 60 SECONDS
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
                    className="text-[10px] text-zinc-400 hover:text-white underline cursor-pointer"
                  >
                    Reset Alert
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
                <div className="text-sm font-bold text-white">Auto-Escalated to 1990 Suwa Seriya</div>
                <p className="text-[10px] text-rose-300">
                  Ambulance dispatched to No. 42 Rajapihilla Mawatha. Automated alert call sent to Melbourne.
                </p>
                <button
                  onClick={() => setResponderStatus('idle')}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 text-xs font-semibold cursor-pointer"
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
