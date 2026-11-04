import React from 'react';
import { UserProfile } from '../types';
import { 
  Flame, 
  Zap, 
  Coins, 
  Sparkles, 
  Moon, 
  Sun, 
  Palette, 
  Bot, 
  Menu, 
  PanelLeft,
  UserCheck
} from 'lucide-react';

interface NavbarProps {
  user: UserProfile;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenOnboarding: () => void;
  onOpenThemeCustomizer: () => void;
  onToggleCopilot?: () => void;
  onToggleSidebar?: () => void;
  activeTab: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  darkMode,
  setDarkMode,
  onOpenOnboarding,
  onOpenThemeCustomizer,
  onToggleCopilot,
  onToggleSidebar,
  activeTab
}) => {
  const xpPercent = Math.min(100, Math.round((user.xp / user.maxXp) * 100));

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors duration-300 px-4 sm:px-6 py-3 shrink-0 ${
      darkMode 
        ? 'bg-[#0B0E14]/80 border-white/10 text-white' 
        : 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left Section: Sidebar Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          
          {/* Side Nav Bar Toggle Button */}
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 font-bold text-xs ${
                darkMode 
                  ? 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/15 hover:text-white' 
                  : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
              }`}
              title="Toggle Side Navigation Bar"
            >
              <PanelLeft className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Nav</span>
            </button>
          )}

          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2.5">
            <div 
              className="relative group cursor-pointer" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 to-cyan-400 rounded-xl flex items-center justify-center font-black text-lg text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:scale-105 transition-transform duration-300">
                S
              </div>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-lg sm:text-xl font-extrabold tracking-tight ${
                  darkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-cyan-400' : 'text-slate-900'
                }`}>
                  SmartAI <span className="font-light text-cyan-500">OS</span>
                </span>
                <div className={`hidden md:flex items-center gap-1.5 border rounded-full px-2.5 py-0.5 ${
                  darkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_#4ade80]"></div>
                  <span className="text-[9px] font-black uppercase tracking-wider">AI LEARNING OS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Stats & Status Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Level & XP Bar */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-extrabold text-violet-500">LEVEL {user.level}</div>
              <div className={`w-20 h-1.5 rounded-full mt-1 overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`}>
                <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-500" 
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Streak Counter */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-extrabold text-xs ${
            darkMode 
              ? 'bg-white/5 border-white/10 text-orange-400' 
              : 'bg-orange-50 border-orange-200 text-orange-700'
          }`}>
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" />
            <span>{user.streakDays}</span>
            <span className="hidden sm:inline text-[10px] uppercase font-bold opacity-80">Days</span>
          </div>

          {/* Coins */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-extrabold text-xs ${
            darkMode 
              ? 'bg-white/5 border-white/10 text-amber-300' 
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            <Coins className="w-4 h-4 text-amber-500" />
            <span>{user.coins}</span>
          </div>

          {/* Energy Bar */}
          <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-extrabold text-xs ${
            darkMode 
              ? 'bg-white/5 border-white/10 text-cyan-400' 
              : 'bg-cyan-50 border-cyan-200 text-cyan-800'
          }`}>
            <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span>{user.energy}%</span>
          </div>

          <div className={`h-6 w-[1px] hidden sm:block ${darkMode ? 'bg-white/10' : 'bg-slate-300'}`}></div>

          {/* AI Copilot Drawer Trigger Button */}
          {onToggleCopilot && (
            <button
              onClick={onToggleCopilot}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90 text-white transition-all font-bold text-xs shadow-[0_0_15px_rgba(0,229,255,0.3)] flex items-center gap-1.5 animate-pulse"
              title="Toggle Slide-out AI Copilot Drawer"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">Copilot</span>
            </button>
          )}

          {/* Theme & Palette Customizer Button */}
          <button
            onClick={onOpenThemeCustomizer}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
              darkMode 
                ? 'bg-violet-600/20 border-violet-500/40 text-violet-300 hover:bg-violet-600/30' 
                : 'bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100'
            }`}
            title="Open Theme Studio"
          >
            <Palette className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">Theme</span>
          </button>

          {/* Light / Dark Mode Switch */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl border transition-colors ${
              darkMode 
                ? 'bg-white/5 border-white/10 text-gray-300 hover:text-white' 
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
            }`}
            title="Toggle Light / Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-800" />}
          </button>

          {/* User Login / Profile Settings Trigger */}
          <div 
            onClick={onOpenOnboarding}
            className="flex items-center gap-2 cursor-pointer group pl-1"
            title="Switch User Profile or Re-launch Login Portal"
          >
            <div className="w-9 h-9 rounded-full border-2 border-violet-500 p-0.5 group-hover:border-cyan-400 transition-colors shadow-sm overflow-hidden">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-full h-full rounded-full object-cover bg-gray-900"
              />
            </div>
            <div className="hidden xl:block text-left">
              <p className={`text-xs font-bold transition-colors ${darkMode ? 'text-white group-hover:text-violet-300' : 'text-slate-900 group-hover:text-violet-600'}`}>
                {user.name}
              </p>
              <p className={`text-[9px] font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                {user.stream}
              </p>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
