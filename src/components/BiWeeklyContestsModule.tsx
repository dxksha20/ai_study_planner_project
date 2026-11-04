import React from 'react';
import { UserProfile } from '../types';
import { Trophy, Swords, Sparkles, Award, Flame, Timer, ArrowRight } from 'lucide-react';

interface BiWeeklyContestsModuleProps {
  user: UserProfile;
  onStartBattle: () => void;
}

export const BiWeeklyContestsModule: React.FC<BiWeeklyContestsModuleProps> = ({ user, onStartBattle }) => {
  const contests = [
    { id: 'c1', title: 'National CS & GATE Algorithm Sprint ⚡', category: 'Coding & OS', participants: 1420, prize: '1000 XP + Rare Cyber-Owl Pet', status: 'LIVE NOW', daysLeft: '2h 14m' },
    { id: 'c2', title: 'Medical Anatomy & High-Yield Speed Battle 🩺', category: 'Medical', participants: 890, prize: '800 XP + Master Med Badge', status: 'Starts Tomorrow', daysLeft: '1d' },
    { id: 'c3', title: 'Aptitude & Logical Reasoning Marathon 🧠', category: 'Placement', participants: 2100, prize: '1500 XP + Cyber Room Skin', status: 'Upcoming', daysLeft: '4d' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-orange-400" />
            Bi-Weekly AI Contests & Boss Battles
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Compete in live coding marathons, speed recall quiz battles, and win rare avatar items.
          </p>
        </div>
      </div>

      {/* Contests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contests.map((c) => (
          <div key={c.id} className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  {c.category}
                </span>
                <span className="text-[10px] font-bold text-emerald-400 animate-pulse">{c.status} ({c.daysLeft})</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100">{c.title}</h3>
              <p className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>Prize: {c.prize}</span>
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{c.participants} Students Entered</span>
              <button
                onClick={onStartBattle}
                className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors"
              >
                <Swords className="w-3.5 h-3.5" />
                <span>Enter Battle</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
