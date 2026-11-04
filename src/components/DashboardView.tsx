import React from 'react';
import { UserProfile, DaySchedule } from '../types';
import { 
  Sparkles, 
  Flame, 
  Calendar, 
  ArrowRight, 
  Play, 
  Coins, 
  Award,
  BookOpen,
  Code2
} from 'lucide-react';

interface DashboardViewProps {
  user: UserProfile;
  schedules: DaySchedule[];
  setActiveTab: (tab: string) => void;
  darkMode?: boolean;
  nudges?: any[];
  exams?: any[];
  onStartQuiz?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  schedules,
  setActiveTab,
  darkMode = false
}) => {
  const todaySchedule = schedules.find(s => s.day === 'Monday') || schedules[0] || {
    day: 'Monday',
    slots: [
      { id: '1', time: '08:00 AM', subject: 'Data Structures & Algorithms', type: 'Deep Focus', notes: 'Dynamic Programming & Graph Algorithms' },
      { id: '2', time: '01:00 PM', subject: 'Operating Systems', type: 'Practice', notes: 'Process Synchronization & Memory Management' }
    ]
  };
  
  // Compact 2-item horizontal schedule carousel
  const timetableItems = todaySchedule.slots.slice(0, 2); 

  // Subjects based on user profile or chosen CS field
  const subjectsToDisplay = user.subjects && user.subjects.length > 0 
    ? user.subjects.slice(0, 3) 
    : ['Data Structures & Algorithms', 'Operating Systems', 'Database Systems'];

  const subjectProgress = subjectsToDisplay.map((subj, idx) => {
    const percentMap = [78, 62, 45, 84];
    const hoursMap = [18, 14, 12, 21];
    const colorMap = [
      'from-indigo-500 to-indigo-600',
      'from-violet-500 to-purple-600',
      'from-emerald-400 to-teal-500'
    ];
    return {
      name: subj,
      completed: percentMap[idx % 4],
      hours: hoursMap[idx % 4],
      color: colorMap[idx % 3]
    };
  });

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto animate-fade-in">
      
      {/* 1. GREETING HEADER WITH AVATAR, STREAK ENGINE PILL & GAMIFICATION STAT BAR */}
      <div className={`p-5 rounded-3xl border transition-all ${
        darkMode 
          ? 'bg-[#161B26] border-white/10 text-white shadow-xl' 
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Avatar + Dynamic Greeting */}
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-indigo-500 via-violet-500 to-emerald-400 shadow-sm">
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  className="w-full h-full rounded-full object-cover bg-slate-100"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full shadow-xs"></span>
            </div>

            <div>
              <h1 className={`text-xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Good Morning, {user.name}
              </h1>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Level {user.level} • {user.branch || user.stream || 'Engineering & CS Scholar'}
              </p>
            </div>
          </div>

          {/* Streak Engine Pill & Gamification Stat Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Streak Engine Pill */}
            <div className={`px-3 py-1.5 rounded-2xl border flex items-center gap-1.5 text-xs font-bold ${
              darkMode 
                ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' 
                : 'bg-orange-50 border-orange-200 text-orange-700'
            }`}>
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
              <span>🔥 {user.streakDays}-Day Streak</span>
            </div>

            {/* Gamification Stat Bar */}
            <div className={`px-3 py-1.5 rounded-2xl border flex items-center gap-2 text-xs font-bold ${
              darkMode 
                ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300' 
                : 'bg-indigo-50 border-indigo-200 text-indigo-700'
            }`}>
              <Award className="w-3.5 h-3.5 text-indigo-600" />
              <span>{user.xp.toLocaleString()} XP</span>
              <span className="text-[10px] opacity-40">|</span>
              <Coins className="w-3.5 h-3.5 text-amber-500" />
              <span>🪙 {user.coins.toLocaleString()}</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. SUBJECT LEARNING TIME PROGRESS RING & PRIMARY ACTION CTA */}
      <div className={`p-6 rounded-3xl border relative overflow-hidden transition-all ${
        darkMode 
          ? 'bg-[#161B26] border-white/10 text-white shadow-xl' 
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            
            {/* Visual Subject Progress Ring */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className={darkMode ? "text-white/10" : "text-slate-100"}
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-600 transition-all duration-1000 ease-out"
                  strokeDasharray="68, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className={`text-xs font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>68%</span>
                <span className="text-[7px] font-bold text-indigo-600 uppercase tracking-tight">Learned</span>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-extrabold uppercase tracking-wider mb-1">
                <Code2 className="w-3 h-3 text-indigo-600" />
                <span>CS Course Progress</span>
              </div>
              <h2 className="text-base font-bold">Progress Across Enrolled CS Modules</h2>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Target Goal: {user.targetExam || 'B.Tech CS / GATE / MCA Semester Board'}
              </p>
            </div>
          </div>

          {/* Single Primary Action CTA */}
          <button
            onClick={() => setActiveTab('notebook')}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>▶ Resume Coding & Study Plan</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-mono text-emerald-300 font-extrabold">+150 XP</span>
          </button>
        </div>

        {/* Progress Bars for Enrolled CS Subjects */}
        <div className="space-y-3">
          {subjectProgress.map((subj, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className={darkMode ? "text-slate-100" : "text-slate-800"}>{subj.name}</span>
                <span className="text-indigo-600 font-mono">{subj.completed}% <span className={`font-normal ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>({subj.hours}h studied)</span></span>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-black/40' : 'bg-slate-100'}`}>
                <div 
                  className={`h-full bg-gradient-to-r ${subj.color} transition-all duration-700`}
                  style={{ width: `${subj.completed}%` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 3. COMPACT 2-ITEM HORIZONTAL SCHEDULE CAROUSEL */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className={`text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>Today's CS Schedule & Timetable</span>
          </h2>
          <button 
            onClick={() => setActiveTab('timetable')}
            className="text-xs text-indigo-600 hover:underline font-bold flex items-center gap-1"
          >
            <span>Full Schedule</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Compact 2-Item Horizontal Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {timetableItems.map((slot, idx) => {
            const periodNames = ["Morning Session", "Afternoon Session"];
            const period = periodNames[idx % 2];
            return (
              <div 
                key={slot.id || idx}
                className={`p-4 rounded-2xl border transition-all ${
                  darkMode 
                    ? 'bg-[#161B26] border-white/10 text-white hover:border-indigo-500/40' 
                    : 'bg-white border-slate-200 text-slate-900 shadow-2xs hover:border-indigo-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {period} • {slot.time}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    +100 XP
                  </span>
                </div>

                <h3 className="text-xs font-bold mb-1 truncate">{slot.subject}</h3>
                <p className={`text-[11px] line-clamp-1 mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{slot.notes || 'Deep work and code exercises'}</p>

                <div className={`pt-2 border-t flex items-center justify-between text-[10px] ${darkMode ? 'border-white/5' : 'border-slate-100'}`}>
                  <span className={`font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Target: High Yield</span>
                  <span className="text-indigo-600 font-bold">{slot.type}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
