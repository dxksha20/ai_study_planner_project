import React from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  CalendarDays, 
  Bot, 
  Brain, 
  BookOpenCheck, 
  Mic, 
  Gamepad2, 
  User, 
  Users, 
  HeartPulse, 
  Briefcase, 
  BarChart3, 
  Trophy, 
  FileCode2,
  Sparkles,
  Palette,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  color: string;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  onOpenThemeCustomizer?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  darkMode?: boolean;
}

export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard, color: 'text-indigo-400' },
  { id: 'proposal', label: 'Startup Pitch & Deck', icon: FileCode2, badge: 'MCA Final', color: 'text-emerald-400' },
  { id: 'twin', label: 'AI Study Twin', icon: Brain, badge: 'USP', color: 'text-purple-400' },
  { id: 'timetable', label: 'Smart AI Timetable', icon: CalendarDays, color: 'text-sky-400' },
  { id: 'assistant', label: 'AI Study Assistant', icon: Bot, color: 'text-pink-400' },
  { id: 'notebook', label: 'Smart Stream Notebook', icon: BookOpenCheck, color: 'text-amber-400' },
  { id: 'voice', label: 'AI Voice Companion', icon: Mic, color: 'text-red-400' },
  { id: 'quiz', label: 'AI Quiz Engine', icon: Gamepad2, color: 'text-cyan-400' },
  { id: 'gamification', label: 'Avatar & Room Studio', icon: User, color: 'text-yellow-400' },
  { id: 'social', label: 'Study Rooms & Squads', icon: Users, color: 'text-green-400' },
  { id: 'wellness', label: 'Burnout & Wellness', icon: HeartPulse, color: 'text-rose-400' },
  { id: 'career', label: 'Career & Placement Mode', icon: Briefcase, color: 'text-blue-400' },
  { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3, color: 'text-teal-400' },
  { id: 'contests', label: 'Bi-Weekly Tournaments', icon: Trophy, color: 'text-orange-400' },
  { id: 'onboarding', label: 'AI Profile & Setup', icon: UserCheck, color: 'text-indigo-300' },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenThemeCustomizer,
  isCollapsed = false,
  onToggleCollapse,
  isOpenMobile = false,
  onCloseMobile,
  darkMode = true
}) => {
  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
        />
      )}

      {/* Main Sidebar Component */}
      <aside className={`
        fixed lg:sticky top-[65px] z-40 h-[calc(100vh-65px)] flex flex-col transition-all duration-300 ease-in-out shrink-0 overflow-y-auto custom-scrollbar p-3 border-r
        ${isCollapsed ? 'w-20' : 'w-64'}
        ${isOpenMobile ? 'translate-x-0 bg-[#0E131F]/95' : '-translate-x-full lg:translate-x-0'}
        ${darkMode 
          ? 'bg-[#0B0E14]/80 border-white/10 text-gray-200 backdrop-blur-xl' 
          : 'bg-white/95 border-slate-200 text-slate-800 shadow-md backdrop-blur-xl'
        }
      `}>
        
        {/* Top Header & Collapse Toggle */}
        <div className="flex items-center justify-between mb-3 px-2 py-1">
          {!isCollapsed && (
            <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] flex items-center gap-1.5 opacity-70">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Navigation Hub</span>
            </div>
          )}

          {/* Desktop Collapse Rail Toggle Button */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className={`p-1.5 rounded-xl border transition-all text-xs hidden lg:flex items-center justify-center ${
                darkMode 
                  ? 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title={isCollapsed ? "Expand Navigation" : "Collapse Navigation"}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4 text-cyan-400" /> : <ChevronLeft className="w-4 h-4 text-cyan-400" />}
            </button>
          )}

          {/* Mobile Close Button */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-xl bg-white/10 text-gray-300 hover:text-white lg:hidden ml-auto"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation Items List */}
        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                title={item.label}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center p-3' : 'justify-between px-3 py-2.5'} rounded-2xl text-xs font-semibold transition-all duration-200 border group ${
                  isActive
                    ? darkMode
                      ? 'bg-violet-600/25 border-violet-500/50 text-violet-200 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                      : 'bg-violet-600 text-white border-violet-700 shadow-md'
                    : darkMode
                      ? 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/10 text-gray-300 hover:text-white'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-700 hover:text-slate-900'
                }`}
              >
                <div className={`flex items-center gap-3 min-w-0 ${isCollapsed ? 'justify-center' : ''}`}>
                  <div className={`p-1.5 rounded-xl shrink-0 ${
                    isActive 
                      ? 'bg-violet-500/30 text-violet-200' 
                      : darkMode ? 'bg-white/5 text-gray-300' : 'bg-slate-200/80 text-slate-700'
                  }`}>
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? (darkMode ? 'text-violet-200' : 'text-white') : item.color}`} />
                  </div>
                  
                  {!isCollapsed && (
                    <span className="truncate font-bold">{item.label}</span>
                  )}
                </div>

                {!isCollapsed && item.badge && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isActive 
                      ? 'bg-violet-500/30 text-violet-100 border border-violet-400/40' 
                      : item.badge === 'USP' 
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Theme Customizer Trigger Button */}
        {onOpenThemeCustomizer && !isCollapsed && (
          <button
            onClick={onOpenThemeCustomizer}
            className={`mt-3 w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 border shadow-sm group ${
              darkMode
                ? 'bg-violet-600/15 hover:bg-violet-600/25 border-violet-500/30 text-violet-300'
                : 'bg-violet-50 hover:bg-violet-100 border-violet-200 text-violet-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-violet-500/20 text-violet-300 group-hover:scale-110 transition-transform">
                <Palette className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <span>Theme Studio</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-200">5 Themes</span>
          </button>
        )}

        {/* SmartAI Project Footer Badge */}
        {!isCollapsed && (
          <div className="mt-auto pt-3 border-t border-white/10 text-center">
            <div className={`p-3 rounded-2xl border text-left backdrop-blur-md ${
              darkMode 
                ? 'bg-gradient-to-br from-violet-950/40 via-black/40 to-black border-violet-500/20' 
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <p className="text-[11px] font-extrabold text-violet-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
                SmartAI OS
              </p>
              <p className={`text-[10px] mt-0.5 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                Separate slide-out nav enabled.
              </p>
            </div>
          </div>
        )}

      </aside>
    </>
  );
};
