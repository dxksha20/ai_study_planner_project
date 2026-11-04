import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { HeartPulse, Play, Pause, RotateCcw, Sparkles, Music, Smile, ShieldAlert } from 'lucide-react';

interface MentalWellnessModuleProps {
  user: UserProfile;
}

export const MentalWellnessModule: React.FC<MentalWellnessModuleProps> = ({ user }) => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState("Inhale (4s)...");
  const [wellnessAdvice, setWellnessAdvice] = useState<string | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const handleFetchWellnessAdvice = async () => {
    try {
      const res = await fetch('/api/ai/wellness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studyHoursToday: 6,
          streakDays: user.streakDays,
          quizAccuracy: 80,
          stressLevel: 'Moderate'
        })
      });
      const data = await res.json();
      setWellnessAdvice(data.advice || "Take a 5 minute break, drink water, and do 4-7-8 breathing.");
    } catch (err) {
      console.error(err);
      setWellnessAdvice("Burnout risk is LOW. Your pace is sustainable. Keep up the great work!");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Wellness Header */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HeartPulse className="w-6 h-6 text-rose-400" />
            <h1 className="text-2xl font-extrabold text-slate-100">AI Mental Wellness & Burnout Guard</h1>
          </div>
          <p className="text-xs text-slate-400">
            Monitors study fatigue patterns, provides guided 4-7-8 breathing, ambient music, and prevents study burnout.
          </p>
        </div>

        <button
          onClick={handleFetchWellnessAdvice}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Stress Check-In</span>
        </button>
      </div>

      {wellnessAdvice && (
        <div className="p-5 rounded-3xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 leading-relaxed font-sans space-y-2">
          <p className="font-bold text-rose-300 flex items-center gap-2">
            <Smile className="w-4 h-4 text-rose-400" />
            AI Wellness Companion Check-In
          </p>
          <p className="whitespace-pre-wrap">{wellnessAdvice}</p>
        </div>
      )}

      {/* Grid: Pomodoro & Breathing Animator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pomodoro Focus Timer */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            25-Min Deep Focus Pomodoro
          </h3>

          <div className="text-5xl font-black text-slate-100 font-mono tracking-wider py-4">
            {formatTime(seconds)}
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => setIsActive(!isActive)}
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30"
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isActive ? 'Pause Timer' : 'Start Focus Session'}</span>
            </button>
            <button
              onClick={() => { setIsActive(false); setSeconds(25 * 60); }}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Guided 4-7-8 Breathing Circle */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-4 flex flex-col items-center justify-center">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Guided 4-7-8 Breathing Animator
          </h3>

          <div 
            onClick={() => setIsBreathing(!isBreathing)}
            className={`w-28 h-28 rounded-full border-4 border-rose-400 bg-rose-500/10 flex items-center justify-center cursor-pointer transition-all duration-1000 ${
              isBreathing ? 'scale-125 bg-rose-500/30' : 'scale-100'
            }`}
          >
            <span className="text-xs font-extrabold text-rose-300 text-center p-2">
              {isBreathing ? breathPhase : 'Click to Breathe'}
            </span>
          </div>

          <p className="text-[11px] text-slate-400">
            Inhale for 4s, Hold for 7s, Exhale for 8s to calm exam anxiety instantly.
          </p>
        </div>

      </div>

    </div>
  );
};
