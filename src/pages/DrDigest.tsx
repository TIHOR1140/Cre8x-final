import React, { useState } from 'react';
import { 
  Stethoscope, 
  Pill, 
  Moon, 
  BellOff, 
  FileDown, 
  Calendar, 
  CheckCircle2, 
  Sliders, 
  Printer, 
  FileText,
  HeartHandshake,
  ShieldCheck,
  Clock,
  Sparkles,
  Heart,
  Activity
} from 'lucide-react';
import { sound } from '../utils/audio';
import { MobileFrame } from '../components/MobileFrame';

interface DrDigestProps {
  isNewSituation?: boolean;
}

export const DrDigest: React.FC<DrDigestProps> = ({ isNewSituation = false }) => {
  const [exportModal, setExportModal] = useState<boolean>(false);
  const [scheduleModal, setScheduleModal] = useState<boolean>(false);
  const [eveningSlot, setEveningSlot] = useState<string>('06:30 PM');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    sound.playTap();
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
            {isNewSituation ? "Dr. Ishan Fernando: Live Vitals & Morning Triage" : "Dr. Ishan's Clinical Mobile Portal"}
          </span>
        </div>
        <span className="text-[11px] font-semibold text-slate-500">
          Kandy Health Centre
        </span>
      </div>

      {/* MOBILE PHONE MOCKUP CONTAINER */}
      <MobileFrame
        userLabel="Dr. Ishan Fernando, MD"
        locationLabel="Kandy Health Centre • Geriatric Triage"
        timeLabel={isNewSituation ? "08:15 AM" : "08:45 AM"}
        carrierLabel="SLT-Mobitel"
      >
        <div className="p-4 flex flex-col justify-between min-h-[640px] space-y-4">
          
          <div className="space-y-3.5">
            
            {/* Patient Header Card */}
            <div className="bg-slate-900 text-white p-3.5 rounded-2xl border border-slate-800 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">PATIENT PROFILE</span>
                  <h3 className="text-sm font-bold text-white">Malani Ranasinghe</h3>
                  <div className="text-[10px] text-slate-300">Age: 87 • Peradeniya, Kandy</div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    isNewSituation 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse' 
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {isNewSituation ? "Post-Slip Monitored" : "Stable"}
                  </span>
                  <div className="text-[9px] text-slate-400 mt-1">Review: Oct 11, 2026</div>
                </div>
              </div>
            </div>

            {/* LIVE VITALS & HEART RATE (From Malani's Smart Watch) */}
            <div className={`rounded-2xl p-3.5 border shadow-2xs space-y-2.5 transition-all ${
              isNewSituation ? 'bg-rose-50/40 border-rose-200' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Heart className={`w-4 h-4 text-rose-600 fill-rose-600 ${isNewSituation ? 'animate-bounce' : 'animate-pulse'}`} />
                  <span>Live Smartwatch Vitals</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  isNewSituation 
                    ? 'bg-rose-100 text-rose-900 border border-rose-300 animate-pulse' 
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                }`}>
                  {isNewSituation ? '⚠️ Tachycardia / Fall Alert' : 'Continuous PPG Live'}
                </span>
              </div>

              {/* Primary BPM and Status readout */}
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                isNewSituation 
                  ? 'bg-gradient-to-r from-rose-50 to-orange-50 border-rose-200' 
                  : 'bg-gradient-to-r from-slate-50 to-emerald-50/50 border-slate-200'
              }`}>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                    Heart Rate (BPM)
                  </div>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className={`text-3xl font-black font-mono tracking-tight ${
                      isNewSituation ? 'text-rose-600' : 'text-slate-900'
                    }`}>
                      {isNewSituation ? '104' : '74'}
                    </span>
                    <span className="text-xs font-bold text-slate-500">BPM</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ml-1 ${
                      isNewSituation ? 'bg-rose-200 text-rose-900' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {isNewSituation ? 'Elevated Spike' : 'Normal Sinus Rhythm'}
                    </span>
                  </div>
                </div>

                {/* Mini ECG trace visual */}
                <div className="w-24 text-right">
                  <svg className={`w-full h-6 ${isNewSituation ? 'text-rose-500' : 'text-emerald-500'}`} viewBox="0 0 100 20" fill="none">
                    <path
                      d="M0 10 L25 10 L30 4 L35 18 L40 2 L45 14 L50 10 L100 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[9px] text-slate-400 font-mono">
                    {isNewSituation ? '02:03 AM Peak' : 'Resting Baseline'}
                  </span>
                </div>
              </div>

              {/* Vital Status Indicators Grid */}
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-slate-400 text-[9px] font-semibold">SpO2 Level</div>
                  <div className={`font-mono font-bold mt-0.5 ${isNewSituation ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {isNewSituation ? '96%' : '98%'}
                  </div>
                  <div className="text-[8px] text-slate-400">{isNewSituation ? 'Mild Drop' : 'Optimal'}</div>
                </div>

                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-slate-400 text-[9px] font-semibold">Skin Temp</div>
                  <div className="font-mono font-bold text-slate-800 mt-0.5">36.5°C</div>
                  <div className="text-[8px] text-slate-400">Normothermic</div>
                </div>

                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-slate-400 text-[9px] font-semibold">Vital Trend</div>
                  <div className={`font-bold mt-0.5 ${isNewSituation ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {isNewSituation ? 'Anomalous' : 'Stable'}
                  </div>
                  <div className="text-[8px] text-slate-400">{isNewSituation ? 'Post-Fall' : 'Normal'}</div>
                </div>
              </div>

              {/* Last Sync Timestamp */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {isNewSituation ? 'Last Reading: 02:14 AM (Smartwatch Mesh)' : 'Last Reading: Real-time (2 mins ago)'}
                </span>
                <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  PPG Active
                </span>
              </div>
            </div>

            {/* CARD 1: Medication Adherence (Pill) */}
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Pill className="w-4 h-4 text-amber-600" />
                  <span>Medication Adherence</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-900">
                  Non-Urgent Trend
                </span>
              </div>

              {/* Progress bars */}
              <div className="space-y-2 text-[11px]">
                <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="flex justify-between font-semibold text-emerald-950">
                    <span>Morning (Amlodipine)</span>
                    <span className="font-bold text-emerald-700">100% (7/7)</span>
                  </div>
                  <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-emerald-600 h-full w-full" />
                  </div>
                </div>

                <div className="p-2 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="flex justify-between font-semibold text-amber-950">
                    <span>Evening (Atorvastatin)</span>
                    <span className="font-bold text-amber-800">4 Missed</span>
                  </div>
                  <div className="w-full bg-amber-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-amber-500 h-full w-[43%]" />
                  </div>
                  <p className="text-[10px] text-amber-800 mt-1">Early bedtime caused missed 8:30 PM reminder.</p>
                </div>
              </div>

              {/* Adjust reminder slot */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-600">
                <span className="flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-slate-400" />
                  Adjust Reminder:
                </span>
                <select
                  value={eveningSlot}
                  onChange={(e) => {
                    setEveningSlot(e.target.value);
                    showToast(`Reminder shifted to ${e.target.value} on Kandy Hub.`);
                  }}
                  className="px-2 py-0.5 rounded border border-slate-300 text-[10px] font-bold bg-white text-slate-800"
                >
                  <option value="06:30 PM">06:30 PM (Post-Tea)</option>
                  <option value="07:00 PM">07:00 PM</option>
                  <option value="08:30 PM">08:30 PM (Original)</option>
                </select>
              </div>
            </div>

            {/* CARD 2: Mobility & Fall Risk (Moon) */}
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span>Mobility & Fall Risk</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-100 text-indigo-900">
                  Micro-Radar
                </span>
              </div>

              <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-[11px] space-y-1">
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>Bathroom Near-Falls:</span>
                  <span className="text-rose-600 font-bold">
                    {isNewSituation ? "3 Logged (Latest: 02:00 AM)" : "2 Logged (1 AM - 3 AM)"}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500">
                  {isNewSituation ? (
                    "02:00 AM slip: Arjun assisted Malani to bed. Zero fractures confirmed by local pulse check."
                  ) : (
                    "Stumbles self-recovered within 20s. Zero trauma incidents."
                  )}
                </p>
              </div>

              <div className="flex justify-between items-center text-[11px] px-1">
                <span className="text-slate-500 text-[10px]">Nocturnal Gait Velocity:</span>
                <span className="font-mono font-bold text-slate-800">0.62 m/s</span>
              </div>
            </div>

            {/* CARD 3: Alert Fatigue Filter (BellOff) */}
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <BellOff className="w-4 h-4 text-emerald-600" />
                  <span>Alert Fatigue Filter</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-900">
                  Melbourne Safeguard
                </span>
              </div>

              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-1">
                <div className="text-xl font-black text-emerald-950 font-mono">14 Minor Anomalies</div>
                <div className="text-[10px] text-emerald-800 font-medium">Contained locally on in-home hub</div>
                <div className="py-1 px-2 bg-white rounded-lg text-[10px] font-bold text-emerald-700 border border-emerald-300">
                  {isNewSituation ? "0 Disruptive Night Alarms in Melbourne" : "0 Unnecessary Family Wake-ups"}
                </div>
              </div>
            </div>

            {/* Doctor's Action Tray */}
            <div className="pt-1 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Doctor's Clinical Actions:
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setExportModal(true)}
                  className="py-2.5 px-2 rounded-xl bg-slate-900 hover:bg-black text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <FileDown className="w-3.5 h-3.5 text-indigo-300" />
                  Export PDF
                </button>

                <button
                  onClick={() => setScheduleModal(true)}
                  className="py-2.5 px-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Schedule Call
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 text-center">
            <span className="text-[9px] text-slate-400">
              SLMC Geriatric Protocol • Synced with Kandy Mesh
            </span>
          </div>
        </div>
      </MobileFrame>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Export Clinical PDF Modal */}
      {exportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full text-slate-900 border border-slate-200 shadow-2xl animate-scaleUp space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold">Kandy Health Centre Digest</h3>
              </div>
              <button onClick={() => setExportModal(false)} className="text-slate-400 hover:text-slate-600 text-sm">✕</button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] space-y-1.5 font-mono">
              <div className="font-bold text-slate-800">Malani Ranasinghe (Age 87)</div>
              <div>WEEK: Oct 4 - Oct 11, 2026</div>
              {isNewSituation && <div className="text-orange-600 font-bold">• 02:00 AM Override: Immobility Resolved</div>}
              <div className="text-slate-600 font-sans border-t border-slate-200 pt-1">
                • Morning Adherence: 100%<br />
                • Evening Adherence: 4 missed (shifted to 6:30 PM)<br />
                • Near-Falls: 3 (latest checked by Arjun)<br />
                • Trust Repair Completed: 8:00 AM
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setExportModal(false)}
                className="px-3 py-1.5 rounded-xl text-xs text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setExportModal(false);
                  showToast('Clinical PDF exported successfully.');
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Call Modal */}
      {scheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full text-slate-900 border border-slate-200 shadow-2xl animate-scaleUp space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold">Schedule Routine Follow-up</h3>
              <button onClick={() => setScheduleModal(false)} className="text-slate-400 hover:text-slate-600 text-sm">✕</button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-900 text-[11px]">
                Tele-Health conference synced via Home Hub speaker in Kandy and Dilrukshi's mobile app in Melbourne.
              </div>
              <div className="font-medium text-slate-700">
                Slot: Tuesday, Oct 14 at 10:30 AM (Sri Lanka) / 04:00 PM (Melbourne)
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setScheduleModal(false)}
                className="px-3 py-1.5 rounded-xl text-xs text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setScheduleModal(false);
                  showToast('Follow-up call confirmed.');
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                Confirm Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
