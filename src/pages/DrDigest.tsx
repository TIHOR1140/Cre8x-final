import React, { useState } from 'react';
import { 
  Stethoscope, 
  Pill, 
  Moon, 
  BellOff, 
  FileDown, 
  Calendar, 
  Clock, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  User, 
  MapPin, 
  ArrowUpRight, 
  Sliders, 
  Printer, 
  Send,
  Heart,
  FileText
} from 'lucide-react';
import { sound } from '../utils/audio';

export const DrDigest: React.FC = () => {
  const [exportModal, setExportModal] = useState<boolean>(false);
  const [scheduleModal, setScheduleModal] = useState<boolean>(false);
  const [eveningSlot, setEveningSlot] = useState<string>('06:30 PM');
  const [clinicalNote, setClinicalNote] = useState<string>(
    'Patient exhibits early evening fatigue due to tropical humidity in Kandy. Missed evening tablets correlate with sleeping before 8:30 PM. Advise shifting Atorvastatin to 6:30 PM post-tea.'
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    sound.playTap();
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header & Doctor Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
              <Stethoscope className="w-3.5 h-3.5" />
              Kandy Health Centre • Geriatric Triage
            </span>
            <span className="text-xs text-slate-500">Dr. Ishan Fernando, MD</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Geriatric Triage & Longitudinal Digest
          </h1>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Weekly automated synthesis of non-invasive radar telemetry and ambient interactions.
          </p>
        </div>

        {/* Patient Profile Card */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-right md:min-w-[240px]">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Patient Profile</div>
          <div className="text-base font-bold text-slate-900">Malani Ranasinghe</div>
          <div className="text-xs text-slate-600 mt-0.5">Age: 87 • Peradeniya, Kandy</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            Caregiver: Dilrukshi (Melbourne) • Neighbor: Arjun
          </div>
        </div>
      </div>

      {/* 3 Core Clinical Metric Cards (Explicitly mandated by technical specs) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: Medication Adherence (Pill Icon) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/60">
                <Pill className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900">
                Non-Urgent Trend
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900">Medication Adherence</h3>
            <p className="text-xs text-slate-500 mt-1">
              Ambient pillbox contact sensor & local verbal confirmation log.
            </p>

            <div className="mt-5 space-y-3">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-900">Morning (Amlodipine 5mg)</span>
                  <span className="font-bold text-emerald-700">100% Taken (7/7)</span>
                </div>
                <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-600 h-full w-full" />
                </div>
              </div>

              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/60">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-900">Evening (Atorvastatin 20mg)</span>
                  <span className="font-bold text-amber-800">4 Missed This Week</span>
                </div>
                <div className="w-full bg-amber-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-500 h-full w-[43%]" />
                </div>
                <p className="text-[11px] text-amber-800 mt-2 leading-tight">
                  Patient retired to sleep before 8:30 PM reminder.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
            <span className="text-[11px]">Clinical action: Adjust reminder time slot</span>
            <span className="font-bold text-indigo-600">Post-Tea 6:30 PM</span>
          </div>
        </div>

        {/* CARD 2: Mobility & Fall Risk (Moon Icon) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                <Moon className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-900">
                Radar Telemetry
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900">Mobility & Fall Risk</h3>
            <p className="text-xs text-slate-500 mt-1">
              60GHz micro-radar doorway velocity & stillness monitoring.
            </p>

            <div className="mt-5 space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span>Bathroom Near-Falls</span>
                  <span className="text-rose-600 font-bold">2 Logged (1 AM - 3 AM)</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Stumbles detected near threshold. Radar verified patient self-recovered within 20s. <strong>Zero trauma incidents.</strong>
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Nocturnal Gait Velocity</span>
                  <span className="text-slate-900 font-mono font-bold">0.62 m/s</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  -0.06 m/s change vs last month (within anticipated geriatric variance).
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
            <span className="text-[11px]">Hub mitigation: Night Pathway Light</span>
            <span className="font-bold text-emerald-600">Active</span>
          </div>
        </div>

        {/* CARD 3: Alert Fatigue Filter (Stethoscope Icon) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <BellOff className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900">
                98% Tranquility Index
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900">Alert Fatigue Filter</h3>
            <p className="text-xs text-slate-500 mt-1">
              Crucial safeguard protecting daughter Dilrukshi in Melbourne.
            </p>

            <div className="mt-5 p-4 bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-2xl border border-emerald-200 text-center">
              <div className="text-3xl font-black text-emerald-950 font-mono">14</div>
              <div className="text-xs font-bold text-emerald-800 mt-0.5 uppercase tracking-wide">
                Minor Anomalies Contained Locally
              </div>
              <div className="mt-2 text-[11px] text-emerald-900/80 leading-relaxed">
                4 deferred evening pills, 3 wet-weather morning routine shifts, 7 room transitions safely filtered.
              </div>
              <div className="mt-3 py-1.5 px-3 bg-white rounded-xl text-xs font-bold text-emerald-700 border border-emerald-300/80">
                0 Unnecessary Family Wake-ups
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
            <span className="text-[11px]">Weekly batch delivery</span>
            <span className="font-bold text-slate-800">Sunday 08:00 AM</span>
          </div>
        </div>
      </div>

      {/* Clinical Notes & Triage Configuration */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Dr. Ishan's Clinical Assessment & Notes</h3>
          </div>
          <span className="text-xs text-slate-500">Last Reviewed: Oct 11, 2026</span>
        </div>

        <textarea
          value={clinicalNote}
          onChange={(e) => setClinicalNote(e.target.value)}
          rows={3}
          className="w-full text-xs sm:text-sm p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800 font-sans leading-relaxed"
        />

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Sliders className="w-4 h-4 text-slate-400" />
            <span>Evening Ambient Reminder Adjustment:</span>
            <select
              value={eveningSlot}
              onChange={(e) => {
                setEveningSlot(e.target.value);
                showToast(`Reminder shifted to ${e.target.value} on Kandy Hub.`);
              }}
              className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs font-semibold bg-white text-slate-800"
            >
              <option value="06:00 PM">06:00 PM (Pre-Dinner)</option>
              <option value="06:30 PM">06:30 PM (Post-Tea Recommended)</option>
              <option value="07:30 PM">07:30 PM (Dinner)</option>
              <option value="08:30 PM">08:30 PM (Original - Too late)</option>
            </select>
          </div>

          <button
            onClick={() => showToast('Clinical note and reminder profile saved to Kandy Mesh.')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold transition-all"
          >
            Save Clinical Updates
          </button>
        </div>
      </div>

      {/* Doctor's Action Tray (Required by Specs) */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold">Doctor's Action & Triage Dispatch</h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Signed off under Sri Lanka Medical Council (SLMC) Digital Care Protocol.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Action 1: Export Clinical PDF */}
          <button
            onClick={() => setExportModal(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-indigo-700" />
            Export Clinical PDF
          </button>

          {/* Action 2: Schedule Routine Follow-up Call */}
          <button
            onClick={() => setScheduleModal(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Schedule Routine Follow-up Call
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Export Clinical PDF Modal */}
      {exportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full text-slate-900 border border-slate-200 shadow-2xl animate-scaleUp space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold">Kandy Health Centre Clinical Summary</h3>
              </div>
              <button onClick={() => setExportModal(false)} className="text-slate-400 hover:text-slate-600 text-sm">✕</button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 font-mono">
              <div className="font-bold text-slate-800">PATIENT: Malani Ranasinghe (Age 87)</div>
              <div>CLINICAL WEEK: Oct 4 - Oct 11, 2026</div>
              <div>ATTENDING: Dr. Ishan Fernando, MBBS, MD</div>
              <div className="border-t border-slate-200 pt-2 text-slate-600 font-sans">
                • Morning Adherence: 100%<br />
                • Evening Adherence: 4 missed (shifted to 6:30 PM)<br />
                • Fall Incidence: Zero trauma (2 nocturnal stumbles)<br />
                • Family Alerts Triggered: 0 (Alert fatigue prevention: 100%)
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setExportModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setExportModal(false);
                  showToast('Clinical PDF exported and downloaded successfully.');
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Download / Print Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Call Modal */}
      {scheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-slate-900 border border-slate-200 shadow-2xl animate-scaleUp space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold">Schedule Routine Follow-up</h3>
              <button onClick={() => setScheduleModal(false)} className="text-slate-400 hover:text-slate-600 text-sm">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Appointment Type:</label>
                <input 
                  type="text" 
                  readOnly 
                  value="Tele-Health Review via Kandy Hub Speaker" 
                  className="w-full p-2.5 bg-slate-100 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Proposed Slot:</label>
                <input 
                  type="text" 
                  readOnly 
                  value="Tuesday, Oct 14 at 10:30 AM (Sri Lanka Time)" 
                  className="w-full p-2.5 bg-slate-100 rounded-xl border border-slate-200 text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Participant Synchronisation:</label>
                <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-900 text-[11px]">
                  Calendar invite auto-sent to daughter Dilrukshi (04:00 PM Melbourne time) with audio conference link.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setScheduleModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setScheduleModal(false);
                  showToast('Follow-up scheduled with Malani and Dilrukshi.');
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
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

