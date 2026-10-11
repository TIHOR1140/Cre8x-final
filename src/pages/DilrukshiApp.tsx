import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Phone, 
  Moon, 
  Clock, 
  MapPin, 
  EyeOff, 
  BellOff, 
  UserCheck, 
  Calendar, 
  ChevronRight, 
  Activity, 
  Heart, 
  Info, 
  ExternalLink,
  Volume2,
  CheckCircle2,
  AlertCircle,
  Radio
} from 'lucide-react';
import { DilrukshiState } from '../types';
import { sound } from '../utils/audio';

interface DilrukshiAppProps {
  onNavigateToArjun?: () => void;
  onNavigateToDoctor?: () => void;
}

export const DilrukshiApp: React.FC<DilrukshiAppProps> = ({ 
  onNavigateToArjun, 
  onNavigateToDoctor 
}) => {
  const [appState, setAppState] = useState<DilrukshiState>('normal');
  const [callingModal, setCallingModal] = useState<string | null>(null);
  const [callDuration, setCallDuration] = useState<number>(0);

  const toggleState = (state: DilrukshiState) => {
    setAppState(state);
    sound.playTap();
  };

  const initiateCall = (target: string) => {
    setCallingModal(target);
    setCallDuration(0);
    sound.playSoftChime();
  };

  const endCall = () => {
    setCallingModal(null);
    setCallDuration(0);
    sound.playTap();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* State Switcher Toggle (Required by Specs) */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Dilrukshi's Perspective Simulator:
          </span>
          <span className="text-xs text-slate-500 hidden sm:inline">(Daughter in Melbourne)</span>
        </div>

        <div className="inline-flex p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => toggleState('normal')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              appState === 'normal'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            State A: Normal Safe Status
          </button>
          <button
            onClick={() => toggleState('emergency')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              appState === 'emergency'
                ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-500/20'
                : 'text-slate-600 hover:text-rose-600'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            State B: Night Critical Emergency
          </button>
        </div>
      </div>

      {/* Mobile Device Frame Simulation */}
      <div className="bg-slate-900 p-3 sm:p-5 rounded-[40px] shadow-2xl border-4 border-slate-800 max-w-md mx-auto">
        {/* Phone Speaker Notch & Battery Bar */}
        <div className="flex items-center justify-between px-6 py-2 text-[11px] text-slate-400 font-mono">
          <span>02:45 PM (Melbourne)</span>
          <div className="w-16 h-3.5 bg-black rounded-full mx-auto" />
          <span>5G • 94%</span>
        </div>

        {/* Inner Phone Screen Content */}
        <div className="bg-slate-50 rounded-[32px] p-5 text-slate-900 min-h-[680px] flex flex-col justify-between overflow-hidden shadow-inner">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  MR
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 leading-none">Amma (Malani)</h2>
                  <span className="text-[11px] text-slate-500">Peradeniya, Kandy</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Kandy Local</span>
                <span className="text-xs font-mono font-medium text-slate-700">
                  {appState === 'normal' ? '09:15 AM' : '02:20 AM'}
                </span>
              </div>
            </div>

            {/* Anti-Surveillance Banner (Constraint 1) */}
            <div className="mt-3 bg-emerald-50/90 border border-emerald-200/80 rounded-xl p-2.5 flex items-start gap-2.5">
              <EyeOff className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-tight text-emerald-900">
                <strong className="font-semibold">Anti-Surveillance Active:</strong> Live video & micro-tracking are disabled by Malani’s privacy preference. Motion & stillness monitored via ambient radar.
              </div>
            </div>

            {/* Content for STATE A: Normal Safe Status */}
            {appState === 'normal' && (
              <div className="mt-4 space-y-4 animate-fadeIn">
                {/* Hero Calm Card */}
                <div className="bg-gradient-to-br from-emerald-50 via-teal-50/60 to-emerald-100/40 border border-emerald-200 rounded-2xl p-6 text-center shadow-xs">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-500/20">
                    <ShieldCheck className="w-9 h-9" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-950">Amma is resting peacefully.</h3>
                  <p className="text-xs text-emerald-800/90 mt-1 max-w-xs mx-auto">
                    No critical anomalies detected. System active in Peradeniya.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-[11px] font-medium border border-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    Protected by Mithra Mesh
                  </div>
                </div>

                {/* Alert Fatigue Prevention Notice (Constraint 2) */}
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <BellOff className="w-4 h-4 text-slate-500" />
                    <h4 className="text-xs font-bold text-slate-800">Alert Fatigue Safeguard</h4>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    "No news is good news." To protect your peace of mind in Melbourne, non-urgent routine deviations (e.g. slight delays in bedtime tea) are handled locally in Sinhala or batched into the weekly clinical digest.
                  </p>
                </div>

                {/* Passive Status Insights */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/70 text-xs">
                    <div className="flex items-center gap-2.5 text-slate-700">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>Morning Motion Noted</span>
                    </div>
                    <span className="font-semibold text-slate-900">06:40 AM (Kitchen)</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/70 text-xs">
                    <div className="flex items-center gap-2.5 text-slate-700">
                      <Activity className="w-4 h-4 text-slate-400" />
                      <span>Power & Mesh Network</span>
                    </div>
                    <span className="font-semibold text-emerald-700">Dual Grid + 4G OK</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/70 text-xs">
                    <div className="flex items-center gap-2.5 text-slate-700">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>Weekly Health Digest</span>
                    </div>
                    <button 
                      onClick={onNavigateToDoctor}
                      className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      Sunday Edition <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Normal Action Buttons */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => initiateCall('Amma (Malani)')}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    Call Amma (Regular Voice / WhatsApp)
                  </button>
                  <button
                    onClick={onNavigateToDoctor}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    Weekly Summary Available Sunday
                  </button>
                </div>
              </div>
            )}

            {/* Content for STATE B: Night Critical Emergency (2:14 AM Incident) */}
            {appState === 'emergency' && (
              <div className="mt-4 space-y-4 animate-fadeIn">
                {/* Emergency Urgent Banner */}
                <div className="bg-rose-50 border-2 border-rose-500 rounded-2xl p-4 text-center shadow-md animate-pulse">
                  <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-extrabold text-rose-950">
                    Urgent: Unresponsive Fall Detected (Bathroom)
                  </h3>
                  <p className="text-[11px] text-rose-800 font-medium mt-0.5">
                    Peradeniya residence • Immediate neighbour dispatched
                  </p>
                </div>

                {/* Timeline Tracker */}
                <div className="bg-white border border-rose-200 rounded-xl p-3.5 shadow-xs">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Emergency Escalation Timeline:
                  </div>
                  <div className="space-y-3 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-rose-200">
                    
                    <div className="flex items-start gap-3 relative pl-6">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 absolute left-1.5 top-1 ring-4 ring-rose-100" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">02:14 AM</div>
                        <div className="text-[11px] text-slate-600">Stillness detected in bathroom (&gt; 3 min threshold).</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 relative pl-6">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 absolute left-1.5 top-1 ring-4 ring-rose-100" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">02:17 AM</div>
                        <div className="text-[11px] text-slate-600">Spoken Sinhala check unanswered ("අම්මා, කතා කරන්න පුළුවන්ද?").</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 relative pl-6">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 absolute left-1.5 top-1 ring-4 ring-amber-100 animate-ping" />
                      <div>
                        <div className="text-xs font-bold text-amber-900">02:18 AM</div>
                        <div className="text-[11px] text-amber-800 font-medium">Neighbor Arjun alerted (On route - 2 min away).</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 relative pl-6">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute left-1.5 top-1 ring-4 ring-emerald-100" />
                      <div>
                        <div className="text-xs font-bold text-emerald-900">02:20 AM</div>
                        <div className="text-[11px] text-emerald-800 font-medium">Arjun acknowledged alert & unlocked front gate.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Emergency Action Buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => initiateCall('Arjun (Neighbour Responder)')}
                    className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                  >
                    <Phone className="w-4 h-4" />
                    Call Arjun Immediately (077-839-2144)
                  </button>

                  <button
                    onClick={() => initiateCall('Suwa Seriya 1990 (Kandy Ambulance)')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    Call Emergency Services (Kandy 1990)
                  </button>

                  {onNavigateToArjun && (
                    <button
                      onClick={onNavigateToArjun}
                      className="w-full py-2 px-4 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-xs flex items-center justify-center gap-1.5 border border-amber-300 transition-all"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      View Arjun's Active Screen View →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar Info */}
          <div className="pt-4 border-t border-slate-200 text-center">
            <span className="text-[10px] text-slate-400">
              Mithra Cloud Node • End-to-End Encrypted to Melbourne
            </span>
          </div>
        </div>
      </div>

      {/* Simulated Phone Call Modal */}
      {callingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl p-6 max-w-sm w-full text-center border border-slate-800 shadow-2xl animate-scaleUp">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40 animate-pulse">
              <Phone className="w-10 h-10" />
            </div>
            <div className="text-xs uppercase tracking-wider text-slate-400">Connecting International Call...</div>
            <h3 className="text-lg font-bold text-white mt-1">{callingModal}</h3>
            <p className="text-xs text-slate-400 mt-1">Melbourne (+61) ⇄ Kandy (+94)</p>
            
            <div className="my-6 bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60">
              <div className="text-xs text-emerald-400 font-mono">00:0{callDuration} • Audio Stream Active</div>
              <div className="text-xs text-slate-300 mt-2">
                {callingModal.includes('Arjun')
                  ? '"Dilrukshi, don\'t worry! I have the gate key and I am already entering the veranda now."'
                  : callingModal.includes('1990')
                  ? '"1990 Suwa Seriya Kandy Central: Peradeniya unit #12 dispatched with paramedic."'
                  : '"ආයුබෝවන් දුවේ... මම හොඳින් ඉන්නවා." (Amma is answering gently)'}
              </div>
            </div>

            <button
              onClick={endCall}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg transition-all"
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {/* Rationale Comparison Card */}
      <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
        <div className="font-bold text-slate-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-600" />
          UX Decision Rationale: Alert Fatigue Prevention in Melbourne
        </div>
        <p>
          Australasia-to-Sri Lanka eldercare apps frequently fail because daughters wake up to 3:00 AM push notifications for minor non-emergencies (like a late glass of water or missed evening pill). This creates intense anxiety, insomnia, and eventual app muting.
        </p>
        <p>
          Mithra solves this with <strong>strict multi-tiered filtering</strong>: minor anomalies are handled through ambient local voice prompts. Dilrukshi is <em>only</em> woken up if confirmed unresponsiveness or prolonged sensor stillness triggers a critical dispatch.
        </p>
      </div>
    </div>
  );
};
