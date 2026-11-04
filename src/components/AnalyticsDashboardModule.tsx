import React from 'react';
import { UserProfile } from '../types';
import { BarChart3, TrendingUp, Clock, Brain, Flame, Award, Zap, CheckCircle2 } from 'lucide-react';

interface AnalyticsDashboardModuleProps {
  user: UserProfile;
}

export const AnalyticsDashboardModule: React.FC<AnalyticsDashboardModuleProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-teal-400" />
            Analytics & Cognitive Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time heatmaps, retention percentage tracking, and cognitive effort metrics.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Total Study Hours</span>
            <Clock className="w-4 h-4 text-teal-400" />
          </div>
          <p className="text-2xl font-black text-slate-100">128.5 Hrs</p>
          <p className="text-[11px] text-emerald-400 font-medium">+12.4% vs last week</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Spaced Recall Accuracy</span>
            <Brain className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-black text-purple-400">88.2%</p>
          <p className="text-[11px] text-slate-400 font-medium">Optimal memory retention</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Active Study Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-400">{user.streakDays} Days</p>
          <p className="text-[11px] text-amber-300 font-medium">Top 5% in college</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Quiz Mastery XP</span>
            <Zap className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-black text-indigo-400">{user.xp} XP</p>
          <p className="text-[11px] text-slate-400 font-medium">Level {user.level} Master Scholar</p>
        </div>

      </div>

      {/* Simulated Productivity Heatmap */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-slate-100">Daily Learning Heatmap (30-Day Activity)</h3>
        <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-30 gap-1.5 pt-2">
          {Array.from({ length: 30 }).map((_, idx) => {
            const intensity = (idx % 5 === 0) ? 'bg-emerald-500' : (idx % 3 === 0) ? 'bg-emerald-600' : (idx % 2 === 0) ? 'bg-emerald-800' : 'bg-slate-800';
            return (
              <div 
                key={idx} 
                className={`w-full h-6 rounded-md ${intensity} transition-all hover:scale-110 cursor-pointer`}
                title={`Day ${idx + 1}: ${idx * 15 + 45} mins focused`}
              />
            );
          })}
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2">
          <span>30 Days Ago</span>
          <span>Today</span>
        </div>
      </div>

    </div>
  );
};
