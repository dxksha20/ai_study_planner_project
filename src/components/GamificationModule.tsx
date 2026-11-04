import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  User, 
  Sparkles, 
  Gift, 
  Lock, 
  CheckCircle2, 
  ShieldCheck, 
  Heart, 
  Star, 
  ShoppingBag, 
  Coins,
  Trophy,
  Flame,
  Award,
  Zap,
  TrendingUp,
  Clock,
  Layers,
  Crown
} from 'lucide-react';

interface GamificationModuleProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const GamificationModule: React.FC<GamificationModuleProps> = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState<'avatar' | 'evolution' | 'stats' | 'shop'>('avatar');

  const levelTiers = [
    { range: 'Lvl 1–9', name: 'Starter Casual Wear', icon: '👕', unlocked: user.level >= 1, desc: 'Basic Scholar Outfit & Default Theme Aura' },
    { range: 'Lvl 10–19', name: 'Tech Wear & HUD Mesh', icon: '🧥', unlocked: user.level >= 10, desc: 'Cyberpunk Visor & Neural Interface Glow' },
    { range: 'Lvl 20–29', name: 'Holographic Accessories', icon: '👓', unlocked: user.level >= 20, desc: 'Floating Quantum Orbs & Holographic Badge' },
    { range: 'Lvl 30–39', name: 'Dynamic Pet Companion', icon: '🦉', unlocked: user.level >= 30, desc: 'Byte Owl Companion +10% Quiz XP Boost' },
    { range: 'Lvl 40–49', name: 'Particle Aura & Lighting', icon: '✨', unlocked: user.level >= 40, desc: 'Radial Particle Field & Custom Color Gradient' },
    { range: 'Lvl 50', name: 'Legendary Holographic Skin', icon: '👑', unlocked: user.level >= 50, desc: 'Supreme Master Skin & Diamond League Crown' },
  ];

  const badges = [
    { id: 'b1', name: '7-Day Flame', desc: 'Maintained 7 consecutive study days', icon: '🔥', unlocked: true },
    { id: 'b2', name: 'DBMS Titan', desc: 'Scored 90%+ in Database Quizzes', icon: '💾', unlocked: true },
    { id: 'b3', name: 'Night Owl', desc: 'Completed 2h Deep Work past 10 PM', icon: '🌙', unlocked: true },
    { id: 'b4', name: 'Recall Master', desc: '100% Accuracy in Spaced Repetition', icon: '⚡', unlocked: true },
    { id: 'b5', name: 'Contest Ranker', desc: 'Top 10 in Bi-Weekly AI Battle', icon: '🏆', unlocked: false },
    { id: 'b6', name: 'Century Scholar', desc: 'Accumulated over 100 study hours', icon: '🎓', unlocked: false },
  ];

  const handleUnlockItem = (cost: number) => {
    if (user.coins >= cost) {
      setUser(prev => ({ ...prev, coins: prev.coins - cost }));
      alert("🎉 Item unlocked and added to your inventory!");
    } else {
      alert("❌ Insufficient coins! Complete more daily study blocks and quizzes to earn coins.");
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Gamification Header */}
      <div className="p-6 rounded-3xl bg-[#161B26]/80 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-2xl bg-amber-500/20 text-amber-400">
              <User className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Dynamic Avatar Evolution Engine</h1>
          </div>
          <p className="text-xs text-[#94A3B8]">
            Level up your avatar, unlock particle auras, pets, and prestige titles through real study hours.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-black flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>🪙 {user.coins.toLocaleString()} Coins</span>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-black flex items-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <Zap className="w-4 h-4 text-violet-400" />
            <span>Level {user.level} Scholar</span>
          </div>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        {[
          { id: 'avatar', label: 'Avatar Viewport' },
          { id: 'evolution', label: 'Level Progression Tree' },
          { id: 'stats', label: 'Stats Vault & Badges' },
          { id: 'shop', label: 'Item Shop' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
              activeTab === t.id
                ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 1. Avatar Viewport Mode */}
      {activeTab === 'avatar' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 3D Dynamic Character Viewport with Particle Aura */}
          <div className="bg-[#161B26]/80 border border-white/12 rounded-3xl p-8 text-center space-y-6 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-2xl shadow-[0_0_50px_rgba(139,92,246,0.15)]">
            
            {/* Particle Aura Rings */}
            <div className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-violet-600/30 via-cyan-400/20 to-amber-500/20 blur-2xl animate-pulse pointer-events-none" />

            <div className="relative z-10">
              <div className="relative w-36 h-36 mx-auto">
                {/* Outer Glow Ring */}
                <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-tr from-violet-500 via-cyan-400 to-amber-400 animate-spin-slow shadow-[0_0_30px_rgba(0,229,255,0.5)]"></div>
                
                <img 
                  src={user.avatarUrl} 
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover relative z-10 border-2 border-black"
                />

                <span className="absolute -bottom-2 right-2 px-3 py-1 rounded-full bg-amber-400 text-black font-black text-xs shadow-lg z-20">
                  Lvl {user.level}
                </span>
              </div>
            </div>

            <div className="relative z-10 space-y-1">
              <h2 className="text-xl font-extrabold text-white">{user.name}</h2>
              <p className="text-xs text-amber-300 font-bold flex items-center justify-center gap-1">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Diamond League • Master Scholar</span>
              </p>
            </div>

            {/* Level XP Bar */}
            <div className="w-full relative z-10 space-y-1.5 bg-black/40 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-violet-300">Level XP Progress</span>
                <span className="text-cyan-400">{user.xp} / {user.maxXp} XP</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-violet-600 via-cyan-400 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (user.xp / user.maxXp) * 100)}%` }}
                />
              </div>
            </div>

            {/* Equipped Perks Box */}
            <div className="w-full relative z-10 bg-black/40 p-4 rounded-2xl border border-white/10 text-xs text-gray-300 space-y-2 text-left">
              <div className="flex justify-between font-bold">
                <span className="text-gray-400">Equipped Pet Companion:</span>
                <span className="text-amber-400">Byte Owl 🦉</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-gray-400">Particle Aura:</span>
                <span className="text-[#00E5FF]">Quantum Cyan Field ✨</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-gray-400">Active Perk:</span>
                <span className="text-emerald-400">+10% XP Boost on Quizzes</span>
              </div>
            </div>

          </div>

          {/* Evolution Tier Unlocks Grid */}
          <div className="lg:col-span-2 bg-[#161B26]/80 border border-white/12 rounded-3xl p-6 space-y-4 backdrop-blur-2xl">
            <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              Level Progression Unlocks
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {levelTiers.map((tier, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                    tier.unlocked 
                      ? 'bg-amber-500/10 border-amber-500/30 text-white' 
                      : 'bg-black/40 border-white/5 text-gray-500 opacity-60'
                  }`}
                >
                  <span className="text-2xl">{tier.icon}</span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        {tier.range}
                      </span>
                      {tier.unlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <h4 className="text-xs font-extrabold text-white">{tier.name}</h4>
                    <p className="text-[11px] text-gray-400">{tier.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 2. Stats Vault & Badges */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-[#161B26]/80 border border-white/10 text-center space-y-1">
              <Clock className="w-5 h-5 text-cyan-400 mx-auto" />
              <div className="text-2xl font-black text-white">48.5h</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold">Total Study Hours</div>
            </div>
            <div className="p-5 rounded-3xl bg-[#161B26]/80 border border-white/10 text-center space-y-1">
              <Zap className="w-5 h-5 text-amber-400 mx-auto" />
              <div className="text-2xl font-black text-white">92.4%</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold">Quiz Accuracy Rate</div>
            </div>
            <div className="p-5 rounded-3xl bg-[#161B26]/80 border border-white/10 text-center space-y-1">
              <Flame className="w-5 h-5 text-orange-400 mx-auto" />
              <div className="text-2xl font-black text-white">{user.streakDays} Days</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold">Active Streak</div>
            </div>
            <div className="p-5 rounded-3xl bg-[#161B26]/80 border border-white/10 text-center space-y-1">
              <Crown className="w-5 h-5 text-violet-400 mx-auto" />
              <div className="text-2xl font-black text-white">Diamond</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold">Weekly League Rank</div>
            </div>
          </div>

          {/* Badges Showcase Grid */}
          <div className="p-6 rounded-3xl bg-[#161B26]/80 border border-white/10 space-y-4">
            <h3 className="text-xs font-extrabold text-violet-400 uppercase tracking-widest flex items-center gap-2">
              <Award className="w-4 h-4 text-violet-400" />
              Badges & Achievement Showcase
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {badges.map((b) => (
                <div 
                  key={b.id}
                  className={`p-4 rounded-2xl border text-center space-y-2 flex flex-col items-center justify-center ${
                    b.unlocked 
                      ? 'bg-violet-600/10 border-violet-500/30 text-white' 
                      : 'bg-black/40 border-white/5 opacity-40'
                  }`}
                >
                  <span className="text-3xl">{b.icon}</span>
                  <h4 className="text-xs font-extrabold text-white">{b.name}</h4>
                  <p className="text-[9px] text-gray-400">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Item Shop Mode */}
      {activeTab === 'shop' && (
        <div className="p-6 rounded-3xl bg-[#161B26]/80 border border-white/10 space-y-4">
          <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            Scholar Item Shop
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'item1', name: 'Cyber Cat Companion', cost: 500, perk: '+15% Focus Energy Regen', icon: '🐱' },
              { id: 'item2', name: 'Streak Repair Shield', cost: 800, perk: 'Protects 1 missed study day', icon: '🛡️' },
              { id: 'item3', name: 'Golden Neon Desk Theme', cost: 1200, perk: 'Unlocks Amber Glow Canvas', icon: '✨' },
            ].map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-4">
                <div className="text-center space-y-2">
                  <span className="text-4xl">{item.icon}</span>
                  <h4 className="text-xs font-extrabold text-white">{item.name}</h4>
                  <p className="text-[11px] text-emerald-400 font-bold">{item.perk}</p>
                </div>

                <button
                  onClick={() => handleUnlockItem(item.cost)}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-colors shadow-lg"
                >
                  Unlock for 🪙 {item.cost} Coins
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
