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
  Smartphone
} from 'lucide-react';
import { DilrukshiState } from '../types';
import { sound } from '../utils/audio';
import { MobileFrame } from '../components/MobileFrame';

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
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      {/* State Switcher Toggle Bar */}
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

      {/* MOBILE PHONE MOCKUP CONTAINER */}
      <MobileFrame
        userLabel="Dilrukshi (Daughter)"
        locationLabel="Melbourne, Australia (UTC+10:00)"
        timeLabel="02:45 PM"
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
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Kandy Time</span>
                <span className="text-xs font-mono font-semibold text-slate-700">
                  {appState === 'normal' ? '09:15 AM' : '02:20 AM'}
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

            {/* Content for STATE A: Normal Safe Status */}
            {appState === 'normal' && (
              <div className="mt-4 space-y-3.5 animate-fadeIn">
                {/* Hero Calm Card */}
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

                {/* Alert Fatigue Prevention Notice */}
                <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
                  <div className="flex items-center gap-1.5 mb-1">
                    <BellOff className="w-3.5 h-3.5 text-slate-500" />
                    <h4 className="text-[11px] font-bold text-slate-800">Alert Fatigue Safeguard</h4>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-relaxed">
                    "No news is good news." To prevent anxious waking in Melbourne, non-urgent routine deviations are handled on-device in Sinhala or batched into the Sunday clinical digest.
                  </p>
                </div>

                {/* Passive Status Insights */}
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

                {/* Normal Action Buttons */}
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
            )}

            {/* Content for STATE B: Night Critical Emergency */}
            {appState === 'emergency' && (
              <div className="mt-4 space-y-3.5 animate-fadeIn">
                {/* Emergency Urgent Banner */}
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

                {/* Timeline Tracker */}
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

                {/* Direct Action Buttons */}
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

                  {onNavigateToArjun && (
                    <button
                      onClick={onNavigateToArjun}
                      className="w-full py-1.5 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[11px] flex items-center justify-center gap-1 border border-amber-300 cursor-pointer"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      View Arjun's Phone Screen →
                    </button>
                  )}
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
            <div className="text-[10px] uppercase tracking-wider text-slate-400">International Audio Stream</div>
            <h3 className="text-base font-bold text-white mt-1">{callingModal}</h3>
            <p className="text-[11px] text-slate-400">Melbourne (+61) ⇄ Kandy (+94)</p>
            
            <div className="my-4 bg-slate-800/80 rounded-2xl p-3 border border-slate-700/60 text-xs text-slate-300">
              {callingModal.includes('Arjun')
                ? '"Dilrukshi, don\'t worry! I have the gate key code and I am entering the veranda now."'
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
