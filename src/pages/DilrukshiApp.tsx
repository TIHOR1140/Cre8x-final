import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Phone, 
  Clock, 
  EyeOff, 
  BellOff, 
  UserCheck, 
  Calendar, 
  ChevronRight, 
  Activity, 
  AlertCircle,
  Smartphone,
  Sun,
  Info
} from 'lucide-react';
import { DilrukshiState } from '../types';
import { sound } from '../utils/audio';
import { MobileFrame } from '../components/MobileFrame';

interface DilrukshiAppProps {
  onNavigateToArjun?: () => void;
  onNavigateToDoctor?: () => void;
  isNewSituation?: boolean;
}

export const DilrukshiApp: React.FC<DilrukshiAppProps> = ({ 
  onNavigateToArjun, 
  onNavigateToDoctor,
  isNewSituation = false
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
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      {/* State Switcher Toggle Bar (Only shown when not in New Situation mode) */}
      {!isNewSituation ? (
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Daughter's Mobile App Simulator:
            </span>
          </div>

          <div className="inline-flex p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => toggleState('normal')}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                appState === 'normal'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              State A: Normal
            </button>
            <button
              onClick={() => toggleState('emergency')}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                appState === 'emergency'
                  ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-500/20'
                  : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              State B: Emergency
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-amber-100/80 border border-amber-300 p-3 rounded-2xl flex items-center justify-between text-xs text-amber-950 font-medium">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-600" />
            <span>Timezone Loophole Active: <strong>Melbourne Morning Window</strong></span>
          </div>
          <span className="text-[11px] text-amber-900 font-bold">07:30 AM AEST</span>
        </div>
      )}

      {/* MOBILE PHONE MOCKUP CONTAINER */}
      <MobileFrame
        userLabel="Dilrukshi (Daughter)"
        locationLabel="Melbourne, Australia"
        timeLabel={isNewSituation ? "07:30 AM" : "02:45 PM"}
        carrierLabel="Telstra 5G"
      >
        <div className="p-4 flex flex-col justify-between min-h-[640px]">
          <div>
            {/* Mobile In-App Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs">
                  MR
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 leading-none">Amma (Malani)</h2>
                  <span className="text-[10px] text-slate-500">Peradeniya, Kandy</span>
                </div>
              </div>
              <div className="text-right">
                {/* 3. Header: Timezone indicator */}
                <span className="text-[9px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 block">
                  {isNewSituation ? "Local Time: 7:30 AM AEST (Morning)" : "Kandy: 09:15 AM"}
                </span>
                <span className="text-[10px] font-mono text-slate-500 mt-0.5 block">
                  {isNewSituation ? "Kandy: 02:00 AM (Night)" : "Melbourne Daylight"}
                </span>
              </div>
            </div>

            {/* Anti-Surveillance Banner */}
            <div className="mt-3 bg-emerald-50/90 border border-emerald-200 rounded-xl p-2.5 flex items-start gap-2">
              <EyeOff className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-[10px] leading-tight text-emerald-950">
                <strong>Anti-Surveillance Active:</strong> Live video & micro-tracking disabled by Malani’s preference. Passive 60GHz micro-radar active.
              </div>
            </div>

            {/* ========================================================= */}
            {/* 3. NEW SITUATION: THE TIMEZONE LOOPHOLE (WARNING / AMBER) */}
            {/* ========================================================= */}
            {isNewSituation ? (
              <div className="mt-4 space-y-3.5 animate-fadeIn">
                
                {/* Warning / Amber Container (NOT a flashing red siren) */}
                <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100/70 border-2 border-amber-400 rounded-2xl p-4 shadow-sm text-amber-950">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-amber-500 text-white rounded-xl shadow-xs">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                        Local Morning Status Update
                      </span>
                      {/* Headline */}
                      <h3 className="text-base font-extrabold text-amber-950 leading-tight">
                        Slip Detected. Arjun is checking in.
                      </h3>
                    </div>
                  </div>

                  {/* Subtext */}
                  <p className="text-[11px] text-amber-900 leading-relaxed font-sans bg-white/70 p-3 rounded-xl border border-amber-200/80">
                    Amma had a slip at 2:00 AM SLST. She asked not to be disturbed, but due to 4 minutes of immobility, Arjun has been dispatched. You will receive an update shortly.
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-amber-800 font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Slip Time: 02:00 AM SLST (4 mins ago)
                    </span>
                    <span className="text-emerald-700">Arjun ETA: 45 secs</span>
                  </div>
                </div>

                {/* 3. DESIGN NOTE CARD: AGENT LOGIC */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 shadow-2xs">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                    <div className="text-[11px] text-indigo-950 leading-relaxed">
                      <strong>Agent logic:</strong> Kept the promise not to send night-time alerts by utilizing the timezone difference. Because it is already 7:30 AM in Melbourne, Dilrukshi receives a calm, informative morning triage update without being jarred from deep sleep by middle-of-the-night panic sirens.
                    </div>
                  </div>
                </div>

                {/* Incident Progress Tracker */}
                <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Resolution Status:
                  </div>
                  
                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50/80 border border-amber-100">
                      <span className="text-amber-900 font-medium">02:14 AM: Malani Verbal Response</span>
                      <span className="text-slate-600 text-[10px]">"Don't wake children"</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-orange-50 border border-orange-200">
                      <span className="text-orange-900 font-bold">02:18 AM: 4-Min Immobility Override</span>
                      <span className="text-orange-700 font-bold text-[10px]">Arjun Dispatched</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                      <span className="text-emerald-900 font-semibold">07:30 AM AEST: Melbourne Window</span>
                      <span className="text-emerald-700 font-bold text-[10px]">Passive Push</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => initiateCall('Arjun (Checking in at Malani\'s house)')}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Arjun (077-839-2144)
                  </button>

                  {onNavigateToArjun && (
                    <button
                      onClick={onNavigateToArjun}
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-slate-600" />
                      View Arjun's Active Screen →
                    </button>
                  )}
                </div>
              </div>
            ) : appState === 'normal' ? (
              /* DEFAULT STATE A: Normal Safe Status */
              <div className="mt-4 space-y-3.5 animate-fadeIn">
                <div className="bg-gradient-to-br from-emerald-50 via-teal-50/60 to-emerald-100/40 border border-emerald-200 rounded-2xl p-5 text-center shadow-xs">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-2.5 shadow-md shadow-emerald-500/20">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-extrabold text-emerald-950">Amma is resting peacefully.</h3>
                  <p className="text-[11px] text-emerald-800/90 mt-1 max-w-xs mx-auto">
                    No critical anomalies detected. System active in Peradeniya.
                  </p>
                  <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/90 text-emerald-800 text-[10px] font-semibold border border-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    Protected by Mithra Mesh
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
                  <div className="flex items-center gap-1.5 mb-1">
                    <BellOff className="w-3.5 h-3.5 text-slate-500" />
                    <h4 className="text-[11px] font-bold text-slate-800">Alert Fatigue Safeguard</h4>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-relaxed">
                    "No news is good news." To prevent anxious waking in Melbourne, non-urgent routine deviations are handled on-device in Sinhala or batched into the Sunday clinical digest.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/70 text-[11px]">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Morning Motion</span>
                    </div>
                    <span className="font-bold text-slate-900">06:40 AM (Veranda)</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/70 text-[11px]">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Activity className="w-3.5 h-3.5 text-slate-400" />
                      <span>Power & Mesh</span>
                    </div>
                    <span className="font-bold text-emerald-700">Solar Battery + 4G OK</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/70 text-[11px]">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Health Digest</span>
                    </div>
                    <button 
                      onClick={onNavigateToDoctor}
                      className="text-[11px] text-indigo-600 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      Sunday Edition <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => initiateCall('Amma (Malani)')}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Amma (Phone / WhatsApp)
                  </button>
                  <button
                    onClick={onNavigateToDoctor}
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    Weekly Summary Available Sunday
                  </button>
                </div>
              </div>
            ) : (
              /* DEFAULT STATE B: Night Critical Emergency */
              <div className="mt-4 space-y-3.5 animate-fadeIn">
                <div className="bg-rose-50 border-2 border-rose-500 rounded-2xl p-3.5 text-center shadow-md animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto mb-1.5 shadow-xs">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-black text-rose-950 uppercase tracking-tight">
                    Urgent: Unresponsive Fall Detected (Bathroom)
                  </h3>
                  <p className="text-[10px] text-rose-800 font-semibold mt-0.5">
                    Peradeniya residence • Next-door neighbour dispatched
                  </p>
                </div>

                <div className="bg-white border border-rose-200 rounded-xl p-3 shadow-2xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Escalation Timeline:
                  </div>
                  <div className="space-y-2.5 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-rose-200">
                    <div className="flex items-start gap-2.5 relative pl-5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 absolute left-1 top-1 ring-2 ring-rose-100" />
                      <div>
                        <div className="text-[11px] font-bold text-slate-900">02:14 AM</div>
                        <div className="text-[10px] text-slate-600">Stillness in bathroom (&gt; 3 min threshold).</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 relative pl-5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 absolute left-1 top-1 ring-2 ring-rose-100" />
                      <div>
                        <div className="text-[11px] font-bold text-slate-900">02:17 AM</div>
                        <div className="text-[10px] text-slate-600">Spoken Sinhala check unanswered ("අම්මා, කතා කරන්න පුළුවන්ද?").</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 relative pl-5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 absolute left-1 top-1 ring-2 ring-amber-100 animate-ping" />
                      <div>
                        <div className="text-[11px] font-bold text-amber-900">02:18 AM</div>
                        <div className="text-[10px] text-amber-800 font-medium">Neighbor Arjun alerted (On route - 2 min away).</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 relative pl-5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 absolute left-1 top-1 ring-2 ring-emerald-100" />
                      <div>
                        <div className="text-[11px] font-bold text-emerald-900">02:20 AM</div>
                        <div className="text-[10px] text-emerald-800 font-medium">Arjun confirmed dispatch via mobile bedside alert.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => initiateCall('Arjun (Neighbour)')}
                    className="w-full py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Arjun (077-839-2144)
                  </button>

                  <button
                    onClick={() => initiateCall('Suwa Seriya 1990')}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    Call Emergency Services (Kandy 1990)
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-200 text-center">
            <span className="text-[9px] text-slate-400">
              Mithra Mobile • End-to-End Encrypted to Melbourne
            </span>
          </div>
        </div>
      </MobileFrame>

      {/* Simulated Phone Call Modal */}
      {callingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl p-6 max-w-sm w-full text-center border border-slate-800 shadow-2xl animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/40 animate-pulse">
              <Phone className="w-8 h-8" />
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400">Audio Stream Active</div>
            <h3 className="text-base font-bold text-white mt-1">{callingModal}</h3>
            <p className="text-[11px] text-slate-400">Melbourne (+61) ⇄ Kandy (+94)</p>
            
            <div className="my-4 bg-slate-800/80 rounded-2xl p-3 border border-slate-700/60 text-xs text-slate-300">
              {callingModal.includes('Arjun')
                ? '"Dilrukshi, morning! I just entered Malani\'s house. She slipped by the bathroom sink and couldn\'t stand up, but she is conscious and talking. I\'m helping her now."'
                : callingModal.includes('1990')
                ? '"1990 Suwa Seriya Kandy Central: Peradeniya unit #12 dispatched with paramedic."'
                : '"ආයුබෝවන් දුවේ... මම හොඳින් ඉන්නවා." (Amma answers)'}
            </div>

            <button
              onClick={endCall}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-md"
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
