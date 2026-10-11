import React, { useState } from 'react';
import { 
  Volume2, 
  EyeOff, 
  Radio, 
  Watch, 
  Activity, 
  CheckCircle2, 
  ShieldAlert, 
  Info,
  Zap,
  AlertTriangle,
  Clock,
  Sparkles
} from 'lucide-react';
import { AmbientState, AmbientStateConfig } from '../types';
import { sound } from '../utils/audio';

interface MalaniHubProps {
  onTriggerEmergency?: () => void;
  isNewSituation?: boolean;
}

const STATE_CONFIGS: Record<AmbientState, AmbientStateConfig> = {
  normal: {
    id: 'normal',
    label: 'Normal Evening',
    sublabel: '7:45 PM • Living Room',
    glowColor: 'rgba(251, 191, 36, 0.25)',
    glowClass: 'from-amber-200/40 via-orange-100/20 to-transparent',
    lightRingHex: '#fef3c7',
    roomDesc: 'Amma is resting in the veranda. Ambient acoustic sensor active. Zero cameras, zero screen emissions.',
    sinhalaVoice: 'මලනී අම්මා, නිවස සාමකාමීයි. ඔබට කිසිදු කරදරයක් නෑ නේද?',
    englishSub: 'Malani Amma, the home is peaceful. You are feeling well this evening?',
    agentIntent: 'Background passive awareness — Screenless, respectful non-intrusion.'
  },
  tablet: {
    id: 'tablet',
    label: 'Tablet Reminder',
    sublabel: '8:15 PM • Medication Slot',
    glowColor: 'rgba(245, 158, 11, 0.85)',
    glowClass: 'from-amber-500/70 via-amber-400/40 to-transparent',
    lightRingHex: '#f59e0b',
    roomDesc: 'Evening Atorvastatin due. Hub emits soft warm amber illumination and speaks softly in Sinhala.',
    sinhalaVoice: 'මලනී අම්මා, සවස බෙහෙත් පෙත්ත ගන්න අමතක වුණාද?',
    englishSub: 'Malani Amma, did you happen to forget your evening tablet?',
    agentIntent: 'Friendly voice prompt. Does not alarm Melbourne daughter if ignored.'
  },
  night: {
    id: 'night',
    label: 'Night Pathway',
    sublabel: '1:30 AM • Bedroom to Hallway',
    glowColor: 'rgba(56, 189, 248, 0.65)',
    glowClass: 'from-sky-400/60 via-indigo-300/30 to-transparent',
    lightRingHex: '#38bdf8',
    roomDesc: 'Motion detected stepping out of bed. Low-intensity cool blue/white floor glow illuminates pathway without blinding glare.',
    sinhalaVoice: 'පියවර සෙමෙන් තබන්න අම්මා. පහන දල්වා ඇත.',
    englishSub: 'Walk gently Amma. Pathway light is illuminated.',
    agentIntent: 'Fall prevention illumination — Screenless guidance without melatonin disruption.'
  },
  bathroom: {
    id: 'bathroom',
    label: 'Bathroom Check',
    sublabel: '2:14 AM • Prolonged Stillness',
    glowColor: 'rgba(239, 68, 68, 0.95)',
    glowClass: 'from-rose-500/80 via-red-500/50 to-transparent',
    lightRingHex: '#ef4444',
    roomDesc: 'Micro-radar detected sudden stillness in bathroom > 3 minutes. Pulsing crimson warning ring engaged with urgent inquiry.',
    sinhalaVoice: 'අම්මා! කතා කරන්න පුළුවන්ද? ඔබට අමාරුද?',
    englishSub: 'Amma! Can you speak? Are you hurt or unable to get up?',
    agentIntent: 'High-urgency escalation check. Unreplied silence dispatches neighbour Arjun.'
  }
};

export const MalaniHub: React.FC<MalaniHubProps> = ({ 
  onTriggerEmergency,
  isNewSituation = false 
}) => {
  const [activeState, setActiveState] = useState<AmbientState>('tablet');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [wearablePressed, setWearablePressed] = useState<boolean>(false);
  const [wearableFeedback, setWearableFeedback] = useState<string | null>(null);
  const [voiceLogDecision, setVoiceLogDecision] = useState<string | null>(null);

  const current = STATE_CONFIGS[activeState];

  // In New Situation Override mode, force pulsing urgent Amber/Orange glow
  const activeGlowColor = isNewSituation ? 'rgba(249, 115, 22, 0.95)' : current.glowColor;
  const activeRingHex = isNewSituation ? '#f97316' : current.lightRingHex;

  const handleStateChange = (state: AmbientState) => {
    setActiveState(state);
    setWearablePressed(false);
    setWearableFeedback(null);
    setVoiceLogDecision(null);
    sound.playTap();

    if (state === 'tablet') {
      sound.playSoftChime();
    }
  };

  const playVoicePrompt = () => {
    setIsSpeaking(true);
    sound.playSoftChime();
    setTimeout(() => {
      setIsSpeaking(false);
    }, 2800);
  };

  const handleWearableClick = () => {
    setWearablePressed(true);
    sound.playTap();
    if (isNewSituation) {
      setWearableFeedback('⚠️ Override Protected: Stillness exceeds 4-minute safety threshold. While Amma pressed "I AM OK", protocol requires Arjun to physically verify no fractures.');
    } else {
      setWearableFeedback('✓ Tactile Click Registered: "I am OK" signal sent via low-power BLE mesh to Home Hub. Alarm cancelled locally.');
    }
    setTimeout(() => {
      setWearablePressed(false);
    }, 2500);
  };

  const handleVerbalResponse = (type: 'taken' | 'ignore' | 'later' | 'help') => {
    sound.playTap();
    if (type === 'taken') {
      setVoiceLogDecision('✓ Spoken "බිව්වා" (Taken) confirmed by hub voice engine. Amber light ring dims to resting mode.');
    } else if (type === 'ignore') {
      setVoiceLogDecision('ℹ Hub respects silence. No annoying repeat pings. Missed tablet batched for Dr. Ishan\'s Sunday summary. Melbourne daughter NOT disturbed.');
    } else if (type === 'later') {
      setVoiceLogDecision('⏳ Snoozed for 20 minutes: Hub will gently pulse at 8:35 PM.');
    } else if (type === 'help') {
      setVoiceLogDecision('🚨 Malani requested help verbally: Escalating to Arjun next door...');
      if (onTriggerEmergency) {
        setTimeout(onTriggerEmergency, 1200);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Critical Hardware Architecture Banner */}
      <div className={`p-5 sm:p-6 rounded-3xl border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 ${
        isNewSituation 
          ? 'bg-gradient-to-r from-orange-950/20 via-amber-900/15 to-transparent border-orange-400' 
          : 'bg-gradient-to-r from-amber-900/15 via-amber-600/10 to-transparent border-amber-300/80'
      }`}>
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-950 border border-amber-300">
              <Radio className="w-3.5 h-3.5 text-amber-700" />
              In-Home Hardware Simulator (Peradeniya)
            </span>
            {isNewSituation ? (
              <span className="text-xs font-black text-orange-900 bg-orange-100 px-3 py-1 rounded-full border border-orange-300 flex items-center gap-1.5 animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
                4-Min Immobility Override Engaged (02:18 AM)
              </span>
            ) : (
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                Zero Screens • No Mobile App
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isNewSituation ? "Malani's Home Hub: Emergency Override Active" : "Malani's Physical Hardware Simulator"}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            {isNewSituation ? (
              <span>
                Malani verbally refused assistance at 02:14 AM. After <strong>4 continuous minutes of bathroom floor immobility</strong>, the agent activates its safety override to wake neighbour Arjun while honouring her wish not to wake Dilrukshi.
              </span>
            ) : (
              <span>
                Malani (87) interacts <strong>exclusively with physical objects</strong> in her home. There are no mobile apps, passwords, or glass screens for her to navigate.
              </span>
            )}
          </p>
        </div>

        {/* Anti-Surveillance Indicator */}
        <div className="flex items-center gap-3 bg-white/95 backdrop-blur px-4 py-3 rounded-2xl border border-emerald-300 shadow-xs shrink-0">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
            <EyeOff className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">100% Non-Visual</div>
            <div className="text-[11px] text-slate-500">60GHz Micro-radar • Zero Cameras</div>
          </div>
        </div>
      </div>

      {/* Hardware State Switcher Bar (when not in override mode) */}
      {!isNewSituation ? (
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 px-1 flex items-center justify-between">
            <span>Simulate Room & Routine Events:</span>
            <span className="text-[11px] font-normal text-slate-400">Updates Hub Lighting & Spoken Dialog</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {(Object.keys(STATE_CONFIGS) as AmbientState[]).map((stateKey) => {
              const config = STATE_CONFIGS[stateKey];
              const isActive = activeState === stateKey;
              return (
                <button
                  key={stateKey}
                  onClick={() => handleStateChange(stateKey)}
                  className={`p-3.5 rounded-xl text-left transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/15'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-xs sm:text-sm">{config.label}</span>
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/50 shadow-xs"
                      style={{ backgroundColor: config.lightRingHex }}
                    />
                  </div>
                  <span className={`text-[11px] mt-1 block truncate ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                    {config.sublabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-orange-50 border border-orange-300 p-3 rounded-2xl flex items-center justify-between text-xs text-orange-950 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-ping" />
            <span>Override Active: <strong>Bathroom Floor Slip Protocol (02:18 AM SLST)</strong></span>
          </div>
          <span className="text-[11px] text-orange-800 font-mono">Micro-Radar: 0.0 m/s (Stillness &gt; 4 mins)</span>
        </div>
      )}

      {/* TWO VISUAL REPRESENTATIONS OF PHYSICAL OBJECTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ============================================================ */}
        {/* OBJECT A: THE HOME HUB (Circular Tabletop Hub + Transcript Box) */}
        {/* ============================================================ */}
        <div className="lg:col-span-7 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">
          
          {/* Top Label for Object A */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isNewSituation ? 'bg-orange-500 animate-ping' : 'bg-amber-400'}`} />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                OBJECT A: THE HOME HUB
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-sans">
              {isNewSituation ? 'State: Pulsing Urgent Amber/Orange' : 'Screenless Tabletop Unit'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* The Circular Tabletop Hub */}
            <div className="sm:col-span-5 flex flex-col items-center text-center">
              <div className="relative my-4">
                {/* 2. Visual: Home Hub radial glow pulsing urgent Amber/Orange */}
                <div
                  className={`w-44 h-44 sm:w-48 sm:h-48 rounded-full flex items-center justify-center transition-all duration-700 ${
                    isNewSituation ? 'animate-urgent-pulse' : activeState === 'bathroom' ? 'animate-urgent-pulse' : 'animate-ambient-glow'
                  }`}
                  style={{
                    boxShadow: `0 0 65px ${activeGlowColor}, inset 0 0 40px ${activeGlowColor}`
                  }}
                >
                  {/* Physical Device Body */}
                  <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-b from-zinc-800 via-zinc-900 to-black p-3 shadow-inner border border-zinc-700 flex flex-col items-center justify-center">
                    
                    {/* Glowing 360 Light Ring */}
                    <div
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-2 flex items-center justify-center transition-colors duration-700"
                      style={{
                        border: `4px solid ${activeRingHex}`,
                        boxShadow: `0 0 30px ${activeRingHex}`
                      }}
                    >
                      <div className="flex flex-col items-center justify-center text-center">
                        <Radio className="w-5 h-5 text-slate-300 mb-1" />
                        <span className="text-[10px] font-black tracking-widest uppercase text-slate-200">MITHRA</span>
                        <span className="text-[9px] text-slate-400">Hub • Kandy</span>
                        <div className="mt-1 flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${isNewSituation ? 'bg-orange-500 animate-ping' : 'bg-emerald-400'}`} />
                          <span className="text-[9px] font-mono text-orange-400">
                            {isNewSituation ? 'Override' : 'Mesh Active'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* State color indicator */}
              <div className="mt-2 text-center">
                <span className="text-xs font-bold text-orange-300 capitalize">
                  {isNewSituation ? 'Pulsing Urgent Amber/Orange Glow' : `${activeState} Light Ring`}
                </span>
                <span className="block text-[10px] text-slate-400 mt-0.5">
                  {isNewSituation ? 'Visual cue for Malani on bathroom floor' : 'Diffuse 360° Ambient Lighting'}
                </span>
              </div>
            </div>

            {/* TRANSCRIPT BOX */}
            <div className="sm:col-span-7 space-y-4">
              
              {/* NEW SITUATION TWO-PART CONVERSATION LOG */}
              {isNewSituation ? (
                <div className="bg-slate-900 border border-orange-500/80 rounded-2xl p-4 shadow-xl space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                    <span className="font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 text-orange-400" />
                      Two-Part Emergency Transcript Box
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Bathroom Sensor Audio</span>
                  </div>

                  {/* Part 1: Malani at 02:14 AM */}
                  <div className="bg-black/70 rounded-xl p-3 border-l-4 border-amber-400 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold">
                      <span>Malani Amma (02:14 AM):</span>
                      <span className="text-[10px] text-slate-400 font-mono">Immediate Post-Slip</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 italic font-sans leading-relaxed">
                      "I'm fine. I just slipped. Don't call anyone, and don't wake the children."
                    </p>
                    <div className="text-[10px] text-slate-400 pt-0.5">
                      Verbal refusal recorded. Agent started 4-minute immobility timer.
                    </div>
                  </div>

                  {/* Part 2: Agent at 02:18 AM (4 mins later) */}
                  <div className="bg-black/70 rounded-xl p-3 border-l-4 border-orange-500 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-orange-400 font-bold">
                      <span>Mithra Agent (02:18 AM - 4 mins later):</span>
                      <span className="text-[10px] text-orange-300 font-mono">Rule Override</span>
                    </div>
                    {/* Large Sinhala script */}
                    <p className="text-base sm:text-lg font-sinhala text-amber-200 font-medium leading-relaxed">
                      "මලනී අම්මා, ඔබට තවමත් නැගිටින්න අපහසු නිසා මම අර්ජුන්ට එන්න කියනවා. මම දිල්රුක්ෂිට කතා කරන්නේ නැහැ."
                    </p>
                    <p className="text-xs text-slate-300 border-t border-slate-800/80 pt-1.5 font-sans leading-relaxed">
                      <strong>English:</strong> "Malani Amma, since you haven't been able to get up, I am waking Arjun. I am keeping my promise and not waking Dilrukshi."
                    </p>
                  </div>

                  {/* Replay voice button */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={playVoicePrompt}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-950/80 hover:bg-orange-900 border border-orange-500/50 text-orange-200 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      {isSpeaking ? 'Playing Voice...' : 'Replay Agent Sinhala Override'}
                    </button>
                    <span className="text-[10px] text-slate-400 font-mono">Arjun Dispatched</span>
                  </div>
                </div>
              ) : (
                /* DEFAULT TRANSCRIPT BOX */
                <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-4 shadow-lg space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      Spoken Sinhala Transcript Box
                    </span>
                    <span className="text-[10px] text-slate-500">Local Edge TTS</span>
                  </div>

                  <div className="bg-black/60 rounded-xl p-3.5 border border-slate-800">
                    <p className="text-lg sm:text-xl font-sinhala text-amber-200 font-medium leading-relaxed">
                      "{current.sinhalaVoice}"
                    </p>
                    <p className="text-xs text-slate-400 mt-2 italic border-t border-slate-800/80 pt-2 font-sans">
                      "{current.englishSub}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={playVoicePrompt}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-all cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      {isSpeaking ? 'Playing Voice...' : 'Replay Ambient Voice'}
                    </button>
                    <span className="text-[10px] text-slate-500">Dialect: Up-Country Kandy</span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Simulate Malani's Verbal Response:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleVerbalResponse('taken')}
                        className="py-2 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700 text-emerald-200 text-xs font-semibold transition-all cursor-pointer"
                      >
                        ✓ "Taken" (බිව්වා)
                      </button>
                      <button
                        onClick={() => handleVerbalResponse('ignore')}
                        className="py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
                      >
                        ∅ Ignore (Silence)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Feedback banner */}
              {voiceLogDecision && (
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 animate-fadeIn">
                  <span className="font-bold text-amber-300">Hub Response: </span>
                  {voiceLogDecision}
                </div>
              )}
            </div>
          </div>

          {/* Environmental Telemetry */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-800 text-center">
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] uppercase text-slate-400 font-semibold">Motion Sensor</div>
              <div className="text-xs font-bold text-amber-400 mt-0.5">
                {isNewSituation ? 'Bathroom: Still' : 'PIR Active'}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] uppercase text-slate-400 font-semibold">Vitality Radar</div>
              <div className="text-xs font-bold text-orange-400 mt-0.5">
                {isNewSituation ? 'Immobile > 4 min' : '60GHz Stillness'}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] uppercase text-slate-400 font-semibold">Camera Feeds</div>
              <div className="text-xs font-bold text-rose-400 mt-0.5">Physically Omitted</div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* OBJECT B: THE WEARABLE (Elder Wristband with ONE 3D Button) */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6 flex flex-col justify-between">
          
          <div>
            {/* Top Label for Object B */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Watch className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono">
                  OBJECT B: THE WEARABLE
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-sans">
                Elder Wristband
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Comfortable, waterproof wristband with <strong>zero touchscreens and zero complex menus</strong>. Equipped with haptic vibration motor and an accelerometer.
            </p>

            {isNewSituation && (
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl text-[11px] text-amber-950 font-medium mb-3">
                <strong>Haptic Status:</strong> Soft vibration buzz sent to wrist at 02:18 AM acknowledging agent is waking Arjun next door without alarming Melbourne.
              </div>
            )}

            {/* Visual Representation of the Wristband */}
            <div className="relative flex flex-col items-center justify-center my-4">
              
              {/* Wristband Top Strap */}
              <div className="w-20 h-10 bg-slate-700 rounded-t-2xl shadow-inner border-x border-t border-slate-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="flex justify-center gap-1.5 pt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                </div>
              </div>

              {/* Wristband Core Chassis */}
              <div className="w-52 h-52 rounded-3xl bg-gradient-to-b from-slate-800 via-slate-900 to-black p-4 shadow-2xl border-4 border-slate-700 flex flex-col items-center justify-center relative">
                
                {/* Vibration / Haptic Indicator Icon */}
                <div className="absolute top-2.5 right-3 flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Haptic Engine</span>
                </div>

                {/* BLE Mesh status */}
                <div className="absolute top-2.5 left-3 flex items-center gap-1 text-[10px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[9px] font-mono">Mesh</span>
                </div>

                {/* EXACTLY ONE MASSIVE TACTILE 3D BUTTON */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleWearableClick}
                    className={`w-32 h-32 rounded-full font-black text-white text-base tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer select-none ${
                      wearablePressed
                        ? 'bg-emerald-600 translate-y-2 shadow-none ring-4 ring-emerald-300'
                        : 'bg-emerald-500 hover:bg-emerald-450 shadow-[0_10px_0_#065f46] hover:shadow-[0_8px_0_#065f46] hover:translate-y-0.5 active:translate-y-2 active:shadow-none'
                    }`}
                  >
                    <CheckCircle2 className="w-6 h-6 text-white drop-shadow-sm" />
                    <span className="text-lg font-black drop-shadow-sm">I AM OK</span>
                    <span className="text-[9px] font-medium tracking-normal text-emerald-100 opacity-90">
                      (Tactile Button)
                    </span>
                  </button>
                </div>

                {/* Subtitle below button */}
                <div className="absolute bottom-2 text-center">
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                    TACTILE DIGNITY BUTTON
                  </span>
                </div>
              </div>

              {/* Wristband Bottom Strap */}
              <div className="w-20 h-10 bg-slate-700 rounded-b-2xl shadow-inner border-x border-b border-slate-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="flex justify-center gap-1.5 pt-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                </div>
              </div>
            </div>

            {/* Click Feedback Message */}
            {wearableFeedback && (
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950 animate-fadeIn">
                {wearableFeedback}
              </div>
            )}
          </div>

          {/* Wearable Specs Callout */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              Wearable Hardware Constraints:
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600">
              <li><strong>Zero Screens:</strong> Eliminates accidental taps, charging anxiety, and cognitive overload.</li>
              <li><strong>One Massive Button:</strong> Provides tactile reassurance for falls or false alarms.</li>
              <li><strong>6-Month Battery:</strong> Coin-cell powered with waterproof IP68 seal for bath safety.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
