import React from 'react';
import { Home, BookOpen, Bot, Users, User, Menu, Sparkles, Mic, FileText } from 'lucide-react';

interface FloatingBottomDockProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDrawer: () => void;
}

export const FloatingBottomDock: React.FC<FloatingBottomDockProps> = ({
  activeTab,
  setActiveTab,
  onOpenDrawer,
}) => {
  // Map internal activeTab states to 5 primary dock keys
  const getPrimaryCategory = (tab: string): 'home' | 'study' | 'ai' | 'community' | 'profile' => {
    if (tab === 'dashboard') return 'home';
    if (['notebook', 'timetable', 'quiz', 'study_hub'].includes(tab)) return 'study';
    if (['assistant', 'voice', 'twin'].includes(tab)) return 'ai';
    if (['social', 'contests'].includes(tab)) return 'community';
    if (tab === 'gamification') return 'profile';
    return 'home';
  };

  const primaryCategory = getPrimaryCategory(activeTab);

  const navItems = [
    { id: 'dashboard', category: 'home', label: 'Home', icon: Home, color: 'text-violet-400' },
    { id: 'notebook', category: 'study', label: 'Study', icon: BookOpen, color: 'text-cyan-400' },
    { id: 'assistant', category: 'ai', label: 'AI Copilot', icon: Bot, color: 'text-fuchsia-400', badge: 'v3.5' },
    { id: 'social', category: 'community', label: 'Community', icon: Users, color: 'text-emerald-400' },
    { id: 'gamification', category: 'profile', label: 'Profile', icon: User, color: 'text-amber-400' },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xl">
      <div className="bg-[#121622]/80 backdrop-blur-2xl border border-white/15 rounded-full p-2 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center justify-between gap-1 sm:gap-2">
        
        {/* 5 Core Dock Navigation Icons */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = primaryCategory === item.category;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex-1 py-2 px-2 sm:px-3 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                isActive 
                  ? 'bg-violet-600/30 text-white font-bold shadow-[0_0_20px_rgba(139,92,246,0.35)] -translate-y-1' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.color}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 text-[8px] font-black bg-fuchsia-500 text-white px-1 rounded-full uppercase">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight font-medium ${isActive ? 'text-white font-bold' : 'text-gray-400'}`}>
                {item.label}
              </span>

              {/* Active Dot Indicator */}
              {isActive && (
                <span className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
              )}
            </button>
          );
        })}

        {/* Separator */}
        <div className="h-6 w-[1px] bg-white/10 mx-1"></div>

        {/* Drawer Menu Toggle */}
        <button
          onClick={onOpenDrawer}
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-all border border-white/10 hover:scale-105 active:scale-95"
          title="Open Drawer Shell Menu"
        >
          <Menu className="w-5 h-5 text-violet-300" />
        </button>

      </div>
    </div>
  );
};
