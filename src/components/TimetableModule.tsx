import React, { useState } from 'react';
import { UserProfile, DaySchedule, ExamEvent } from '../types';
import { 
  CalendarDays, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar as CalIcon,
  RefreshCw,
  ExternalLink,
  Plus,
  Zap,
  Lock
} from 'lucide-react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup 
} from '../lib/firebase';
import { 
  GoogleAuthProvider 
} from 'firebase/auth';
import { 
  fetchGoogleCalendarEvents, 
  createGoogleCalendarEvent, 
  GoogleCalendarEvent 
} from '../lib/googleCalendar';

interface TimetableModuleProps {
  user: UserProfile;
  schedules: DaySchedule[];
  setSchedules: React.Dispatch<React.SetStateAction<DaySchedule[]>>;
  exams: ExamEvent[];
  darkMode?: boolean;
}

export const TimetableModule: React.FC<TimetableModuleProps> = ({
  user,
  schedules,
  setSchedules,
  exams,
  darkMode = false
}) => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [isGenerating, setIsGenerating] = useState(false);
  const [customInput, setCustomInput] = useState("");

  // Google Calendar States
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);
  const [calendarEvents, setCalendarEvents] = useState<GoogleCalendarEvent[]>([]);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  const currentSchedule = schedules.find(s => s.day === selectedDay) || schedules[0] || {
    day: 'Monday',
    slots: []
  };

  const handleConnectGoogleCalendar = async () => {
    setIsLoadingCalendar(true);
    setSyncStatusMsg(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      if (token) {
        setGoogleAccessToken(token);
        const events = await fetchGoogleCalendarEvents(token);
        setCalendarEvents(events);
        setSyncStatusMsg(`Successfully connected Google Calendar! ${events.length} events loaded.`);
      } else {
        setSyncStatusMsg('Google OAuth login succeeded. Connecting calendar...');
      }
    } catch (error: any) {
      console.error('Google Calendar Auth Error:', error);
      setSyncStatusMsg(`Calendar connection note: ${error.message || 'Please enable popups to sync Google Calendar'}`);
    } finally {
      setIsLoadingCalendar(false);
    }
  };

  const handleRefreshCalendar = async () => {
    if (!googleAccessToken) return;
    setIsLoadingCalendar(true);
    try {
      const events = await fetchGoogleCalendarEvents(googleAccessToken);
      setCalendarEvents(events);
      setSyncStatusMsg(`Calendar refreshed! Loaded ${events.length} events.`);
    } catch (err: any) {
      setSyncStatusMsg(`Failed to refresh: ${err.message}`);
    } finally {
      setIsLoadingCalendar(false);
    }
  };

  const handleSyncSlotToCalendar = async (slot: any) => {
    if (!googleAccessToken) {
      alert("Please connect your Google Calendar first!");
      return;
    }

    try {
      const todayIso = new Date().toISOString().split('T')[0];
      const startTimeIso = `${todayIso}T09:00:00`;

      await createGoogleCalendarEvent(googleAccessToken, {
        title: `${slot.subject} (${slot.type})`,
        description: `CS Study Session: ${slot.notes || 'Core CS Revision'}`,
        startTimeIso,
        durationMinutes: 90
      });

      alert(`Synced "${slot.subject}" to your Google Calendar!`);
      handleRefreshCalendar();
    } catch (err: any) {
      alert(`Could not sync to Google Calendar: ${err.message}`);
    }
  };

  const handleGenerateAiTimetable = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/timetable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: user,
          customEvents: customInput ? [customInput] : ["CS Lectures 9 AM - 1 PM"],
          examDates: exams
        })
      });
      const data = await res.json();
      if (data.weeklySchedule && Array.isArray(data.weeklySchedule)) {
        setSchedules(data.weeklySchedule);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleSlotCompletion = (slotId: string) => {
    setSchedules(prev => prev.map(day => ({
      ...day,
      slots: day.slots.map(s => s.id === slotId ? { ...s, completed: !s.completed } : s)
    })));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      
      {/* Clean Uncluttered Header */}
      <div className={`p-6 rounded-3xl border transition-all ${
        darkMode 
          ? 'bg-[#161B26] border-white/10 text-white shadow-xl' 
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
              <CalendarDays className="w-3.5 h-3.5 text-indigo-600" />
              <span>Engineering & CS Study Schedule</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              CS Timetable & Google Calendar Engine
            </h1>
            <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Spaced repetition, lab schedule, GATE/Placement revision, and real-time Google Calendar sync.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleConnectGoogleCalendar}
              disabled={isLoadingCalendar}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center gap-2 shadow-xs transition-all shrink-0"
            >
              <CalIcon className="w-4 h-4 text-rose-500" />
              <span>{googleAccessToken ? 'Google Calendar Connected ✓' : 'Connect Google Calendar'}</span>
            </button>

            <button
              onClick={handleGenerateAiTimetable}
              disabled={isGenerating}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all shrink-0"
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Optimizing...' : 'Regenerate AI Timetable'}</span>
            </button>
          </div>
        </div>

        {syncStatusMsg && (
          <div className="mt-3 p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{syncStatusMsg}</span>
          </div>
        )}
      </div>

      {/* Day Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedDay === day
                ? 'bg-indigo-600 text-white shadow-sm'
                : darkMode
                  ? 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Main Schedule & Google Calendar Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Daily CS Study Slots */}
        <div className={`lg:col-span-2 p-5 rounded-3xl border space-y-4 ${
          darkMode 
            ? 'bg-[#161B26] border-white/10 text-white' 
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}>
          <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-white/10">
            <div>
              <h2 className="text-sm font-extrabold flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>{selectedDay}'s Coding & Study Slots</span>
              </h2>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
              {currentSchedule.slots.filter(s => s.completed).length} / {currentSchedule.slots.length} Completed
            </span>
          </div>

          <div className="space-y-3">
            {currentSchedule.slots.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No study slots scheduled for {selectedDay}.</p>
            ) : (
              currentSchedule.slots.map((slot) => (
                <div 
                  key={slot.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    slot.completed
                      ? darkMode ? 'bg-black/30 border-white/5 opacity-60' : 'bg-slate-50 border-slate-200 opacity-60'
                      : darkMode ? 'bg-white/5 border-white/10 hover:border-indigo-500/50' : 'bg-white border-slate-200 hover:border-indigo-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button 
                      onClick={() => toggleSlotCompletion(slot.id)}
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        slot.completed 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100'
                      }`}
                    >
                      {slot.completed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`text-xs font-bold ${slot.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                          {slot.subject}
                        </p>
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {slot.type}
                        </span>
                      </div>
                      <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {slot.time} • {slot.notes}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleSyncSlotToCalendar(slot)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center gap-1 transition-colors"
                      title="Sync slot to Google Calendar"
                    >
                      <CalIcon className="w-3 h-3 text-rose-500" />
                      <span>Sync Calendar</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Side Panel: Google Calendar Synced Events & Exam Deadlines */}
        <div className="space-y-5">
          
          {/* Google Calendar Synced Panel */}
          <div className={`p-5 rounded-3xl border space-y-3 ${
            darkMode 
              ? 'bg-[#161B26] border-white/10 text-white' 
              : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                <CalIcon className="w-4 h-4 text-rose-500" />
                <span>Google Calendar Events</span>
              </h3>
              {googleAccessToken && (
                <button 
                  onClick={handleRefreshCalendar} 
                  disabled={isLoadingCalendar}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingCalendar ? 'animate-spin' : ''}`} />
                </button>
              )}
            </div>

            {!googleAccessToken ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <p className="text-xs text-slate-600 font-medium">Sync your official Google Calendar to avoid study overlaps.</p>
                <button
                  onClick={handleConnectGoogleCalendar}
                  className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-2xs"
                >
                  <CalIcon className="w-3.5 h-3.5 text-rose-400" />
                  <span>Authorize Google Calendar</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar">
                {calendarEvents.length === 0 ? (
                  <p className="text-xs text-slate-400">No upcoming events found on your Google Calendar.</p>
                ) : (
                  calendarEvents.map((evt, idx) => (
                    <div key={evt.id || idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                      <p className="text-xs font-bold text-slate-900 truncate">{evt.summary}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {evt.start?.dateTime ? new Date(evt.start.dateTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'All Day Event'}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Exam Deadlines Card */}
          <div className={`p-5 rounded-3xl border space-y-3 ${
            darkMode 
              ? 'bg-[#161B26] border-white/10 text-white' 
              : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Upcoming CS Exam Deadlines</span>
            </h3>
            <div className="space-y-2">
              {exams.map((exam) => (
                <div key={exam.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{exam.subject}</p>
                    <p className="text-[10px] text-slate-500">{exam.date}</p>
                  </div>
                  <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    {exam.daysRemaining} Days
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
