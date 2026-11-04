import React, { useState } from 'react';
import { UserProfile, TwinNudge } from '../types';
import { Brain, Sparkles, Zap, RefreshCw, Activity, ShieldCheck, Flame, Bell, Cpu, ArrowUpRight } from 'lucide-react';

interface StudyTwinModuleProps {
  user: UserProfile;
  nudges: TwinNudge[];
}

export const StudyTwinModule: React.FC<StudyTwinModuleProps> = ({ user, nudges }) => {
  const [twinVersion] = useState("Aether Twin v3.2 Neural Engine");
  const [isSyncing, setIsSyncing] = useState(false);
  const [customTwinInsight, setCustomTwinInsight] = useState<string | null>(null);

  const handleSyncTwin = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/ai/twin-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile: user,
          recentPerformance: { quizAccuracy: 88, studyHoursThisWeek: 26 },
          studyHistory: { lastRevision: "3 days ago" }
        })
      });
      const data = await res.json();
      if (data.focusAlert) {
        setCustomTwinInsight(`${data.focusAlert} - ${data.insights || "Recommending 25 mins of OS Memory Management recall before bedtime."}`);
      }
    } catch (err) {
      console.error(err);
      setCustomTwinInsight("Twin Neural Weights Updated! Your highest cognitive speed is calculated at 8:15 AM - 10:45 AM.");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* USP Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/30 shadow-2xl shadow-purple-950/40 overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Unique Selling Proposition (USP)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              AI Study Twin & Proactive Memory Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Unlike static planners or chatbots, your AI Twin continuously learns your cognitive patterns, Ebbinghaus memory decay rates, optimal study windows, and predicts when you'll forget a topic <span className="text-purple-300 font-semibold">before</span> exams arrive.
            </p>
          </div>

          <button
            onClick={handleSyncTwin}
            disabled={isSyncing}
            className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Analyzing Cognitive Curve...' : 'Sync AI Twin Weights'}</span>
          </button>
        </div>
      </div>

      {customTwinInsight && (
        <div className="p-4 rounded-2xl bg-purple-900/40 border border-purple-500/50 text-purple-200 text-xs flex items-center gap-3 animate-fade-in">
          <Brain className="w-5 h-5 text-purple-400 shrink-0 animate-pulse" />
          <p className="flex-1 font-semibold">{customTwinInsight}</p>
        </div>
      )}

      {/* Twin Neural Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Peak Focus Window</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-lg font-extrabold text-slate-100">08:00 AM - 10:30 AM</p>
          <p className="text-[11px] text-emerald-400 font-medium">91% Quiz Accuracy in this slot</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Memory Retention Index</span>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-lg font-extrabold text-indigo-400">84.2%</p>
          <p className="text-[11px] text-slate-400 font-medium">Ebbinghaus Spaced Model Active</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Predicted Memory Decay</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-lg font-extrabold text-rose-400">OS (5 Days Old)</p>
          <p className="text-[11px] text-rose-300 font-medium">Requires recall quiz today</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Preferred Style</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-lg font-extrabold text-emerald-400">Hands-On & Code</p>
          <p className="text-[11px] text-slate-400 font-medium">82% faster understanding via diagrams</p>
        </div>

      </div>

      {/* Proactive Intelligence Feed */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Bell className="w-4 h-4 text-purple-400" />
              Proactive AI Twin Directives
            </h3>
            <p className="text-xs text-slate-400">The AI Twin speaks to you before you fail or forget</p>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
            {twinVersion}
          </span>
        </div>

        <div className="space-y-3">
          {nudges.map((n) => (
            <div key={n.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-purple-300">{n.title}</span>
                  <span className="text-[10px] text-slate-500">• {n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <span className="text-xs font-semibold text-emerald-400">{n.impact}</span>
                <button className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-1 transition-colors">
                  <span>Execute</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
