import React, { useState, useEffect, useRef } from 'react';
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
  ChevronRight,
  ChevronsRight,
  Sliders,
  CheckCircle2,
  Info
} from 'lucide-react';
import { sound } from '../utils/audio';
import { MobileFrame } from '../components/MobileFrame';

interface ArjunEmergencyProps {
  onNotifyMelbourne?: () => void;
  isNewSituation?: boolean;
}

// Interactive Slide-to-Confirm Button Component
interface SlideButtonProps {
  label: string;
  sublabel?: string;
  variant: 'success' | 'danger';
  icon: React.ReactNode;
  onConfirm: () => void;
}

const SlideButton: React.FC<SlideButtonProps> = ({
  label,
  sublabel,
  variant,
  icon,
  onConfirm,
}) => {
  const [dragProgress, setDragProgress] = useState<number>(0); // 0 to 100%
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const isSuccess = variant === 'success';

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    updateProgress(clientX);
  };

  const updateProgress = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const knobWidth = 48; // width of circular knob
    const usableWidth = rect.width - knobWidth;
    const currentX = clientX - rect.left - knobWidth / 2;
    const progress = Math.min(Math.max((currentX / usableWidth) * 100, 0), 100);
    setDragProgress(progress);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragProgress >= 65) {
      // Completed slide!
      setDragProgress(100);
      onConfirm();
    } else {
      // Snap back if released early
      setDragProgress(0);
    }
  };

  // Quick auto-slide button for rapid testing
  const handleAutoSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDragProgress(100);
    setTimeout(() => {
      onConfirm();
    }, 150);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateProgress(e.clientX);
      }
    };
    const handleMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        updateProgress(e.touches[0].clientX);
      }
    };
    const handleTouchEnd = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragProgress]);

  return (
    <div className="space-y-1">
      <div
        ref={trackRef}
        onMouseDown={(e) => handleStart(e.clientX)}
        onTouchStart={(e) => {
          if (e.touches.length > 0) handleStart(e.touches[0].clientX);
        }}
        className={`relative h-14 sm:h-16 rounded-2xl overflow-hidden border-2 select-none cursor-pointer flex items-center shadow-xs transition-colors ${
          isSuccess
            ? 'bg-emerald-50 border-emerald-400/90 text-emerald-950'
            : 'bg-slate-150 border-slate-300 text-slate-800'
        }`}
      >
        {/* Dynamic Track Fill behind the knob */}
        <div
          className={`absolute left-0 top-0 bottom-0 transition-all duration-75 ${
            isSuccess
              ? 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600'
              : 'bg-gradient-to-r from-slate-400 to-rose-500'
          }`}
          style={{ width: `${Math.max(dragProgress, 0)}%` }}
        />

        {/* Track Guidance Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-12 text-center">
          <span className={`text-[11px] sm:text-xs font-black tracking-wide uppercase flex items-center gap-1 ${
            dragProgress > 45 ? 'text-white drop-shadow-xs' : isSuccess ? 'text-emerald-900' : 'text-slate-700'
          }`}>
            <span>{label}</span>
            <ChevronsRight className="w-4 h-4 animate-pulse shrink-0" />
          </span>
        </div>

        {/* Draggable Knob */}
        <div
          className={`absolute top-1 bottom-1 w-12 rounded-xl flex items-center justify-center shadow-md transition-transform duration-75 z-10 cursor-grab active:cursor-grabbing ${
            isSuccess
              ? 'bg-emerald-600 text-white shadow-emerald-900/30 ring-2 ring-emerald-300'
              : 'bg-slate-800 text-white shadow-slate-900/30'
          }`}
          style={{
            left: `calc(${dragProgress}% - ${dragProgress * 0.48}px + 4px)`
          }}
        >
          {dragProgress >= 70 ? (
            <CheckCircle2 className="w-6 h-6 animate-scaleUp" />
          ) : (
            icon
          )}
        </div>

        {/* Quick Click Fallback Button on far right for desktop testing */}
        <button
          onClick={handleAutoSlide}
          title="Click to trigger slide"
          className="absolute right-2 top-2 bottom-2 px-2.5 rounded-lg bg-black/10 hover:bg-black/20 text-[10px] font-bold text-slate-700 z-20 flex items-center gap-1 transition-all"
        >
          <span>Slide</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {sublabel && (
        <div className="text-[10px] text-center text-slate-500">
          {sublabel}
        </div>
      )}
    </div>
  );
};

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
              : 'bg-slate-100 text-slate-700 border-slate-300'
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

      {/* MOBILE PHONE MOCKUP CONTAINER - LIGHT THEMED AS REQUESTED */}
      <MobileFrame
        userLabel="Arjun (Neighbour • Age 74)"
        locationLabel="Next Door • 2 min walk"
        timeLabel={isNewSituation ? "02:18 AM" : "02:20 AM"}
        carrierLabel="Dialog 4G"
        darkFrame={false} // LIGHT THEMED UI CONTAINER
      >
        <div className={`p-4 sm:p-5 flex flex-col justify-between min-h-[640px] transition-colors duration-300 ${
          flashlightOn ? 'bg-amber-100 text-slate-900' : 'bg-slate-50 text-slate-900'
        }`}>
          
          <div className="space-y-4">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-[11px] font-black tracking-wide shadow-2xs">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              {isNewSituation ? "CRITICAL PROXIMITY DISPATCH (2 MIN)" : "Priority Proximity Alert — Next Door"}
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase leading-tight text-slate-950">
                {isNewSituation ? "EMERGENCY OVERRIDE: Check on Malani." : "Malani Amma Needs Assistance."}
              </h1>
              <p className="text-amber-800 font-bold text-xs mt-1">
                No. 42, Rajapihilla Mawatha (Opposite Temple Bodhi Tree)
              </p>
            </div>

            {/* Alert Text Card in Light Theme */}
            <div className="bg-white p-4 rounded-2xl border-2 border-rose-200/90 shadow-sm space-y-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 w-fit">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                Safety Override Protocol Triggered
              </div>
              
              <p className="text-xs sm:text-sm font-semibold leading-relaxed text-slate-800">
                {isNewSituation ? (
                  "Malani verbally refused help but has been immobile on the bathroom floor for >4 minutes. Please go over immediately."
                ) : (
                  "Sensor confirmed prolonged immobility in bathroom (>3 mins). Voice check in Sinhala received no reply. Malani pre-approved your dispatch."
                )}
              </p>

              <div className="pt-2 text-[10px] text-slate-500 font-mono flex items-center justify-between border-t border-slate-100">
                <span>Immobility: {isNewSituation ? "4m 12s on floor" : `${secondsElapsed}s elapsed`}</span>
                <span className="text-emerald-700 font-bold">Melbourne Not Disturbed</span>
              </div>
            </div>

            {/* Accidental Touch Prevention Geriatric Note */}
            <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-2.5 flex items-start gap-2 shadow-2xs">
              <Sliders className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-[10px] text-amber-950 leading-tight">
                <strong>Geriatric Touch Protection:</strong> Replaced tap buttons with <strong>Slider Buttons</strong>. Requires a deliberate swipe gesture so groggy responders waking in the dark won't accidentally dismiss critical alerts.
              </div>
            </div>

            {/* IDLE STATE: SLIDER BUTTONS INSTEAD OF TAP BUTTONS */}
            {responderStatus === 'idle' && (
              <div className="space-y-3 pt-1">
                {/* 1. Primary Slider: Bright Green */}
                <SlideButton
                  label="Slide: I am going over now"
                  sublabel="Swipe right to silence siren & confirm dispatch"
                  variant="success"
                  icon={<UserCheck className="w-5 h-5 text-white" />}
                  onConfirm={handleAccept}
                />

                {/* 2. Secondary Slider: Cannot Respond */}
                <SlideButton
                  label="Slide: Cannot respond"
                  sublabel="Swipe right to escalate directly to 1990 Emergency"
                  variant="danger"
                  icon={<XCircle className="w-5 h-5 text-rose-200" />}
                  onConfirm={handleDecline}
                />
              </div>
            )}

            {/* EN ROUTE STATE */}
            {responderStatus === 'en_route' && (
              <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-4 text-emerald-950 space-y-3.5 shadow-sm animate-scaleUp">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-emerald-950">Status: En Route to Malani</h3>
                      <p className="text-[10px] text-emerald-800">Dilrukshi notified in morning window.</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-mono font-bold">
                    ETA: 60 SECONDS
                  </span>
                </div>

                <div className="space-y-2">
                  {/* Gate PIN Card */}
                  <div className="bg-white p-3 rounded-xl border border-emerald-300 shadow-2xs flex items-center gap-3">
                    <div className="p-2 bg-amber-100 text-amber-800 rounded-lg">
                      <Key className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-500 block font-bold">Front Veranda Lockbox</span>
                      <span className="text-xl font-mono font-black text-amber-700 tracking-wider">PIN: 8492</span>
                    </div>
                  </div>

                  {/* Torch toggle */}
                  <button
                    onClick={() => setFlashlightOn(!flashlightOn)}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      flashlightOn 
                        ? 'bg-amber-400 text-slate-950 border-amber-500 font-bold text-xs shadow-xs' 
                        : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50 text-xs shadow-2xs'
                    }`}
                  >
                    <Flashlight className="w-4 h-4 text-amber-600" />
                    <span>{flashlightOn ? 'Screen Torch ON (Tap to Off)' : 'Turn Screen Torch ON'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setResponderStatus('idle')}
                    className="text-[10px] text-slate-500 hover:text-slate-800 underline cursor-pointer"
                  >
                    Reset Alert
                  </button>
                  <a
                    href="tel:1990"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white text-[10px] font-bold shadow-xs hover:bg-rose-700"
                  >
                    <PhoneCall className="w-3 h-3" />
                    Dial 1990 Ambulance
                  </a>
                </div>
              </div>
            )}

            {/* DECLINED STATE */}
            {responderStatus === 'declined' && (
              <div className="bg-rose-50 border-2 border-rose-400 rounded-2xl p-4 text-rose-950 space-y-3 animate-scaleUp shadow-sm">
                <div className="text-sm font-bold text-rose-950">Auto-Escalated to 1990 Suwa Seriya</div>
                <p className="text-[11px] text-rose-800">
                  Ambulance dispatched to No. 42 Rajapihilla Mawatha. Automated alert call sent to Melbourne.
                </p>
                <button
                  onClick={() => setResponderStatus('idle')}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold cursor-pointer"
                >
                  Back to Alert
                </button>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Escalation Friction Rule: 2 min proximity bedside mobile alert</span>
          </div>
        </div>
      </MobileFrame>
    </div>
  );
};
