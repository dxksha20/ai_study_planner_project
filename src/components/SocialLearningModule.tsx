import React, { useState, useEffect } from 'react';
import { UserProfile, LeaderboardUser, StudyRoom } from '../types';
import { 
  Users, 
  Mic, 
  Volume2, 
  Trophy, 
  Flame, 
  Sparkles, 
  MessageSquare, 
  Plus, 
  Play, 
  Pause, 
  Clock, 
  Radio, 
  Music, 
  Crown,
  ShieldAlert,
  ArrowUp,
  Zap
} from 'lucide-react';

interface SocialLearningModuleProps {
  user: UserProfile;
  leaderboard: LeaderboardUser[];
  rooms: StudyRoom[];
}

export const SocialLearningModule: React.FC<SocialLearningModuleProps> = ({ user, leaderboard, rooms }) => {
  const [activeTab, setActiveTab] = useState<'rooms' | 'leaderboard'>('rooms');
  const [activeVoiceRoom, setActiveVoiceRoom] = useState<string | null>(null);
  const [isPlayingLoFi, setIsPlayingLoFi] = useState(false);
  const [activeSoundscape, setActiveSoundscape] = useState<'lofi' | 'binaural' | 'rain'>('lofi');
  
  // Pomodoro Shared Timer State
  const [pomoSeconds, setPomoSeconds] = useState(25 * 60);
  const [isPomoRunning, setIsPomoRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isPomoRunning && pomoSeconds > 0) {
      interval = setInterval(() => setPomoSeconds(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPomoRunning, pomoSeconds]);

  const formatPomoTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-[#161B26]/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(0,230,118,0.1)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-2xl bg-[#00E676]/20 text-[#00E676]">
              <Users className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Community Focus Rooms & League Ladder</h1>
          </div>
          <p className="text-xs text-[#94A3B8]">
            Study alongside live avatar squads, stream ambient audio soundscapes, and compete in weekly league ladders.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('rooms')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
              activeTab === 'rooms' 
                ? 'bg-[#00E676] text-black shadow-[0_0_15px_rgba(0,230,118,0.4)]' 
                : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            Multiplayer Focus Rooms
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
              activeTab === 'leaderboard' 
                ? 'bg-[#00E676] text-black shadow-[0_0_15px_rgba(0,230,118,0.4)]' 
                : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            Global League Ladder
          </button>
        </div>
      </div>

      {activeTab === 'rooms' ? (
        <div className="space-y-6">
          
          {/* Ambient Soundscape & Shared Pomodoro Control Bar */}
          <div className="p-5 rounded-3xl bg-[#161B26]/80 border border-white/12 backdrop-blur-xl grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            
            {/* Ambient Soundscape Player */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-violet-600/30 text-violet-300">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Ambient Soundscape Player</h3>
                  <p className="text-[10px] text-gray-400 uppercase font-mono">
                    {activeSoundscape === 'lofi' ? '🎧 Lo-Fi Chill Hop (432Hz)' : activeSoundscape === 'binaural' ? '🧠 Binaural Alpha Waves' : '🌧️ Deep Rain Focus'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingLoFi(!isPlayingLoFi)}
                  className={`p-2.5 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition-all ${
                    isPlayingLoFi 
                      ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_#00E676]' 
                      : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  {isPlayingLoFi ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlayingLoFi ? 'Playing' : 'Audio On'}</span>
                </button>
              </div>
            </div>

            {/* Shared Synchronized Pomodoro Clock */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Squad Pomodoro Timer</h3>
                  <p className="text-[10px] text-cyan-300 font-mono">Synced across all active study rooms</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-[#00E5FF] font-mono tracking-wider">
                  {formatPomoTime(pomoSeconds)}
                </span>
                <button
                  onClick={() => setIsPomoRunning(!isPomoRunning)}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all"
                >
                  {isPomoRunning ? 'Pause' : 'Start'}
                </button>
              </div>
            </div>

          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rooms.map((room) => {
              const isJoined = activeVoiceRoom === room.id;
              return (
                <div 
                  key={room.id} 
                  className={`p-5 rounded-3xl bg-[#161B26]/80 border transition-all space-y-4 flex flex-col justify-between backdrop-blur-xl ${
                    isJoined ? 'border-[#00E676] shadow-[0_0_30px_rgba(0,230,118,0.2)]' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/30">
                        {room.subject}
                      </span>
                      <span className="text-xs text-gray-400 font-extrabold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        {room.activeUsers}/{room.maxUsers} Online
                      </span>
                    </div>

                    <h3 className="text-sm font-extrabold text-white">{room.name}</h3>
                    <p className="text-xs text-gray-400">Current Topic: <strong className="text-gray-200">{room.topic}</strong></p>

                    {/* Live Avatar Grid */}
                    <div className="flex items-center gap-1.5 pt-1">
                      {Array.from({ length: Math.min(5, room.activeUsers) }).map((_, i) => (
                        <div 
                          key={i} 
                          className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-400 border border-white/20 flex items-center justify-center font-bold text-[10px] text-white"
                          title={`Scholar ${i + 1} studying`}
                        >
                          S{i + 1}
                        </div>
                      ))}
                      {room.activeUsers > 5 && (
                        <span className="text-[10px] font-bold text-gray-400 ml-1">+{room.activeUsers - 5} more</span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500">Host: {room.hostName}</span>
                    <button
                      onClick={() => setActiveVoiceRoom(isJoined ? null : room.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                        isJoined 
                          ? 'bg-rose-600 text-white animate-pulse' 
                          : 'bg-[#00E676] hover:bg-emerald-400 text-black shadow-[0_0_15px_rgba(0,230,118,0.3)]'
                      }`}
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>{isJoined ? 'Mute & Leave' : 'Join Focus Room'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Global League Ladder with Promotion Cutoffs */
        <div className="bg-[#161B26]/80 border border-white/12 rounded-3xl p-6 space-y-4 backdrop-blur-xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                Diamond League Ladder (Cutoff in 2 Days)
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Top 3 scholars get promoted to Master Division with 1,000 Coin Bonus</p>
            </div>

            <span className="text-[11px] font-extrabold uppercase px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 w-fit">
              🔥 Promotion Zone: Top 3
            </span>
          </div>

          <div className="space-y-2.5">
            {leaderboard.map((lb) => {
              const isPromotion = lb.rank <= 3;

              return (
                <div 
                  key={lb.rank}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                    lb.name.includes("You") || lb.name === "Diksha"
                      ? 'bg-violet-600/30 border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)]' 
                      : isPromotion
                        ? 'bg-amber-500/10 border-amber-500/30'
                        : 'bg-black/40 border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`w-8 text-center font-black text-sm ${
                      lb.rank === 1 ? 'text-amber-400' : lb.rank === 2 ? 'text-slate-300' : lb.rank === 3 ? 'text-amber-600' : 'text-gray-500'
                    }`}>
                      #{lb.rank}
                    </span>

                    <img src={lb.avatar} alt={lb.name} className="w-10 h-10 rounded-full object-cover border-2 border-white/10" />

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-extrabold text-white">{lb.name}</p>
                        {isPromotion && (
                          <span className="text-[9px] font-bold text-amber-300 flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-amber-500/20">
                            <ArrowUp className="w-2.5 h-2.5" /> Promo
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400">{lb.college} • {lb.badge}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black text-[#00E5FF]">{lb.xp.toLocaleString()} XP</span>
                    <p className="text-[10px] font-bold text-orange-400">🔥 {lb.streak} Day Streak</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
