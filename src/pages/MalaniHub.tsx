import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  EyeOff, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Clock, 
  AlertCircle, 
  Radio, 
  Info,
  Activity,
  HeartHandshake
} from 'lucide-react';
import { AmbientState, AmbientStateConfig } from '../types';
import { sound } from '../utils/audio';

interface MalaniHubProps {
  onTriggerEmergency?: () => void;
}

const STATE_CONFIGS: Record<AmbientState, AmbientStateConfig> = {
  normal: {
    id: 'normal',
    label: 'Normal Evening',
    sublabel: '7:45 PM • Living Room',
    glowColor: 'rgba(251, 191, 36, 0.25)',
    glowClass: 'from-amber-200/40 via-orange-100/20 to-transparent',
    lightRingHex: '#fef3c7',
    roomDesc: 'Amma is relaxing in the veranda. Gentle acoustic awareness active. Ambient noise: crickets & distant temple chanting.',
    sinhalaVoice: 'මලනී අම්මා, නිවස සාමකාමීයි. ඔබට කිසිදු කරදරයක් නෑ නේද?',
    englishSub: 'Malani Amma, the home is peaceful. You are feeling well this evening?',
    agentIntent: 'Background passive observation — Zero intrusion, zero visual recording.'
  },
  tablet: {
    id: 'tablet',
    label: 'Tablet Reminder',
    sublabel: '8:15 PM • Medication Slot',
    glowColor: 'rgba(245, 158, 11, 0.75)',
    glowClass: 'from-amber-500/60 via-amber-400/30 to-transparent',
    lightRingHex: '#f59e0b',
    roomDesc: 'Evening Atorvastatin due. Hub emits soft warm amber illumination and speaks softly in Sinhala.',
    sinhalaVoice: 'මලනී අම්මා, සවස බෙහෙත් පෙත්ත ගන්න අමතක වුණාද?',
    englishSub: 'Malani Amma, did you happen to forget your evening tablet?',
    agentIntent: 'Friendly voice prompt. Will not alarm daughter if ignored once.'
  },
  night: {
    id: 'night',
    label: 'Night Pathway',
    sublabel: '1:30 AM • Bedroom to Hallway',
    glowColor: 'rgba(56, 189, 248, 0.55)',
    glowClass: 'from-sky-400/50 via-indigo-300/25 to-transparent',
    lightRingHex: '#38bdf8',
    roomDesc: 'Motion detected stepping out of bed. Low-intensity cool blue/white floor glow activates to prevent trips without disrupting sleep melatonin.',
    sinhalaVoice: 'පියවර සෙමෙන් තබන්න අම්මා. පහන දල්වා ඇත.',
    englishSub: 'Walk gently Amma. Pathway light is illuminated.',
    agentIntent: 'Fall prevention illumination — Screenless guidance without blinding glare.'
  },
  bathroom: {
    id: 'bathroom',
    label: 'Bathroom Check',
    sublabel: '2:14 AM • Prolonged Stillness',
    glowColor: 'rgba(239, 68, 68, 0.85)',
    glowClass: 'from-rose-500/70 via-red-500/40 to-transparent',
    lightRingHex: '#ef4444',
    roomDesc: 'Radar detected sudden stillness in bathroom > 3 minutes. Pulsing crimson warning ring engaged with urgent inquiry.',
    sinhalaVoice: 'අම්මා! කතා කරන්න පුළුවන්ද? ඔබට අමාරුද?',
    englishSub: 'Amma! Can you speak? Are you hurt or unable to get up?',
    agentIntent: 'High-urgency escalation check. If unanswered in 45 seconds, Arjun next door is notified.'
  }
};

export const MalaniHub: React.FC<MalaniHubProps> = ({ onTriggerEmergency }) => {
  const [activeState, setActiveState] = useState<AmbientState>('tablet');
  const [userResponse, setUserResponse] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voiceVolume, setVoiceVolume] = useState<number>(85);

  const current = STATE_CONFIGS[activeState];

  const handleStateChange = (state: AmbientState) => {
    setActiveState(state);
    setUserResponse(null);
    setActionFeedback(null);
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

  const handleUserResponse = (type: 'taken' | 'ignore' | 'later' | 'help') => {
    setUserResponse(type);
    sound.playTap();

    if (type === 'taken') {
      setActionFeedback('✓ Confirmed. Hub ring dims silently to idle warmth. "හොඳයි අම්මා, සුව නින්දක්." (Logged: Taken at 8:17 PM).');
      setTimeout(() => {
        // Soft dimmer effect
      }, 1500);
    } else if (type === 'ignore') {
      setActionFeedback('ℹ Agent respects silence. No repeating nag. Incident strictly batched for Dr. Ishan\'s weekly digest. Melbourne daughter Dilrukshi is NOT disturbed.');
    } else if (type === 'later') {
      setActionFeedback('⏳ "හරි අම්මා, මම විනාඩි 20කින් මතක් කරන්නම්." Reminder snoozed locally for 20 minutes.');
    } else if (type === 'help') {
      setActionFeedback('🚨 Escalation initiated! Transitioning to Arjun Responder & Emergency protocol...');
      if (onTriggerEmergency) {
        setTimeout(onTriggerEmergency, 1200);
      }
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Page Title & Context Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-amber-900/10 via-amber-500/5 to-transparent p-6 rounded-3xl border border-amber-200/60 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Node • Peradeniya, Kandy
            </span>
            <span className="text-xs text-slate-500">Dual Grid + Solar Battery Backup</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Living Room Hub — Sri Lanka (Screenless Ambient Experience)
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Designed for <strong>Malani (87)</strong>. Zero touchscreens, zero camera lenses, zero English menus. Natural spoken Sinhala and warm tactile lighting.
          </p>
        </div>

        {/* Anti-Surveillance Indicator */}
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur px-4 py-3 rounded-2xl border border-emerald-200 shadow-sm">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
            <EyeOff className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">100% Non-Visual</div>
            <div className="text-xs text-slate-500">Radar & PIR only • Zero cameras</div>
          </div>
        </div>
      </div>

      {/* State Switcher Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 px-2">
          Interactive Ambient State Simulator:
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {(Object.keys(STATE_CONFIGS) as AmbientState[]).map((stateKey) => {
            const config = STATE_CONFIGS[stateKey];
            const isActive = activeState === stateKey;
            return (
              <button
                key={stateKey}
                onClick={() => handleStateChange(stateKey)}
                className={`flex flex-col items-start p-3.5 rounded-xl text-left transition-all duration-200 border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-sm">{config.label}</span>
                  <span
                    className="w-3 h-3 rounded-full border border-white/40 shadow-xs"
                    style={{ backgroundColor: config.lightRingHex }}
                  />
                </div>
                <span className={`text-xs mt-1 truncate ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                  {config.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Central Interactive Smart Hub Visualization Card */}
      <div className="relative overflow-hidden bg-slate-950 text-white rounded-3xl p-6 md:p-10 shadow-2xl border border-slate-800">
        {/* Ambient Room Glow Background */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full blur-3xl pointer-events-none transition-all duration-1000 opacity-60"
          style={{ backgroundColor: current.glowColor }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Physical Hub Device Ring Simulation */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="relative mb-6">
              {/* Outer Radial Glow Halo */}
              <div
                className={`w-56 h-56 md:w-64 md:h-64 rounded-full flex items-center justify-center transition-all duration-700 ${
                  activeState === 'bathroom' ? 'animate-urgent-pulse' : 'animate-ambient-glow'
                }`}
                style={{
                  boxShadow: `0 0 70px ${current.glowColor}, inset 0 0 40px ${current.glowColor}`
                }}
              >
                {/* Hub Physical Body (Kandy Handcrafted Ceramic/Brass aesthetic) */}
                <div className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-gradient-to-b from-zinc-800 via-zinc-900 to-black p-3 shadow-inner border border-zinc-700/80 flex flex-col items-center justify-center">
                  {/* Glowing 360 Light Ring */}
                  <div
                    className="w-36 h-36 md:w-44 md:h-44 rounded-full p-2 flex items-center justify-center transition-colors duration-700"
                    style={{
                      border: `4px solid ${current.lightRingHex}`,
                      boxShadow: `0 0 25px ${current.lightRingHex}`
                    }}
                  >
                    <div className="flex flex-col items-center justify-center text-center p-2">
                      <Radio className="w-6 h-6 text-slate-300 mb-1" />
                      <span className="text-xs font-bold tracking-widest uppercase text-slate-300">MITHRA</span>
                      <span className="text-[10px] text-slate-400">Hub • Sri Lanka</span>
                      <div className="mt-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-[10px] font-mono text-emerald-400">Kandy Mesh</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hub Hardware Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={playVoicePrompt}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/90 hover:bg-slate-750 text-xs font-medium text-amber-300 border border-amber-500/30 transition-all shadow-sm"
              >
                <Volume2 className="w-4 h-4" />
                {isSpeaking ? 'Playing Voice...' : 'Replay Ambient Prompt'}
              </button>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/80 px-3 py-2 rounded-full border border-slate-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Light Ring: <strong className="text-slate-200 capitalize">{activeState}</strong></span>
              </div>
            </div>
          </div>

          {/* Dialog Log & Interactive Interaction Panel */}
          <div className="lg:col-span-7 space-y-5">
            {/* Context Box */}
            <div className="bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-amber-400">Current Environmental Context</span>
                <span className="font-mono text-slate-400">PIR + 60GHz Micro-Radar</span>
              </div>
              <p className="text-sm text-slate-200">
                {current.roomDesc}
              </p>
            </div>

            {/* Sinhala + English Conversational Voice Log Card */}
            <div className="bg-gradient-to-br from-slate-900 to-zinc-900 border border-slate-700/80 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  Mithra Ambient Voice Output (Local Sinhala TTS)
                </span>
                <span className="text-xs text-slate-400">Accent: Up-country Kandy</span>
              </div>

              {/* Large Sinhala Script */}
              <div className="bg-black/40 rounded-xl p-4 border border-slate-800/80">
                <p className="text-xl md:text-2xl font-sinhala text-amber-100 font-medium leading-relaxed tracking-wide">
                  "{current.sinhalaVoice}"
                </p>
                <p className="text-xs md:text-sm text-slate-400 mt-2.5 italic border-t border-slate-800 pt-2 flex items-center gap-1.5">
                  <span>Subtitles (English):</span>
                  <span className="text-slate-300 font-sans not-italic">"{current.englishSub}"</span>
                </p>
              </div>

              {/* Simulated Responses for Malani (Interactive Buttons) */}
              <div className="mt-5">
                <div className="text-xs font-medium text-slate-400 mb-2 flex items-center justify-between">
                  <span>Simulate Malani's Verbal or Physical Response:</span>
                  <span className="text-[11px] text-slate-500">Test UX Logic</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => handleUserResponse('taken')}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                      userResponse === 'taken'
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-400/30'
                        : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-200 border-emerald-800/60'
                    }`}
                  >
                    ✓ "Taken" (බිව්වා)
                  </button>

                  <button
                    onClick={() => handleUserResponse('ignore')}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                      userResponse === 'ignore'
                        ? 'bg-amber-600 text-white border-amber-500 shadow-md ring-2 ring-amber-400/30'
                        : 'bg-slate-800/70 hover:bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    ∅ Ignore (Silence)
                  </button>

                  <button
                    onClick={() => handleUserResponse('later')}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                      userResponse === 'later'
                        ? 'bg-sky-600 text-white border-sky-500 shadow-md ring-2 ring-sky-400/30'
                        : 'bg-sky-950/40 hover:bg-sky-900/60 text-sky-200 border-sky-800/60'
                    }`}
                  >
                    ⏳ Later (පස්සේ)
                  </button>

                  <button
                    onClick={() => handleUserResponse('help')}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                      userResponse === 'help'
                        ? 'bg-rose-600 text-white border-rose-500 shadow-md ring-2 ring-rose-400/30'
                        : 'bg-rose-950/40 hover:bg-rose-900/60 text-rose-200 border-rose-800/60'
                    }`}
                  >
                    🚨 Help (අමාරුයි)
                  </button>
                </div>
              </div>

              {/* Action Feedback Result */}
              {actionFeedback && (
                <div className="mt-4 p-3.5 rounded-xl bg-slate-950/90 border border-slate-700 text-xs leading-relaxed text-slate-200 animate-fadeIn">
                  <div className="font-semibold text-amber-300 mb-0.5">Agent Behavioral Decision:</div>
                  <div>{actionFeedback}</div>
                </div>
              )}
            </div>

            {/* Edge AI Telemetry */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Motion Sensor</div>
                <div className="text-sm font-semibold text-emerald-400 mt-0.5">Active (PIR)</div>
                <div className="text-[10px] text-slate-500">Living Room</div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Vitality Radar</div>
                <div className="text-sm font-semibold text-sky-400 mt-0.5">16 Resp/min</div>
                <div className="text-[10px] text-slate-500">60GHz Micro-radar</div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Camera Feeds</div>
                <div className="text-sm font-semibold text-rose-400 mt-0.5">DISABLED</div>
                <div className="text-[10px] text-slate-500">Physically Omitted</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Design Annotation & Rationale Cards (Evidence-Based UX) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            1
          </div>
          <h3 className="font-bold text-slate-900 text-base">Screenless & Non-Visual Form</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Malani (87) experienced mild cataracts and screen friction. Standard tablets induce confusion, anxiety, and require charging cables. An ambient ceramic-style hub with diffuse radial illumination integrates seamlessly into a traditional Sri Lankan living room.
          </p>
          <div className="text-[11px] font-medium text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
            Dignity preservation: No feeling of being "tracked by tech".
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            2
          </div>
          <h3 className="font-bold text-slate-900 text-base">Sinhala-First Natural Tone</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Conversational agents often sound clinical or robotic. Mithra addresses Malani as <em>"මලනී අම්මා"</em> (Malani Amma), adopting culturally respectful kinship terms common in Kandy. Synthesized prosody reflects warm domestic etiquette.
          </p>
          <div className="text-[11px] font-medium text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
            Zero cognitive friction: Amma speaks naturally in reply.
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            3
          </div>
          <h3 className="font-bold text-slate-900 text-base">Anti-Surveillance Architecture</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Traditional elderly cameras invade bodily privacy and cause distress (e.g. bathroom, dressing). Mithra relies exclusively on privacy-preserving sensors: PIR motion, non-imaging micro-radar, and on-device keyword acoustic detection.
          </p>
          <div className="text-[11px] font-medium text-indigo-800 bg-indigo-50 p-2 rounded-lg border border-indigo-200">
            Data sovereignty: Raw audio never leaves local Kandy hub.
          </div>
        </div>
      </div>
    </div>
  );
};
