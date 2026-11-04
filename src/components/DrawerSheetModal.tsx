import React from 'react';
import { 
  X, 
  BarChart3, 
  Briefcase, 
  Sparkles, 
  HeartHandshake, 
  Trophy, 
  BookOpen, 
  Palette, 
  Settings, 
  UserCheck, 
  ChevronRight,
  ShieldCheck,
  BrainCircuit,
  FileCode2,
  FolderLock
} from 'lucide-react';

interface DrawerSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: string) => void;
  onOpenThemeCustomizer: () => void;
  onOpenOnboarding: () => void;
}

export const DrawerSheetModal: React.FC<DrawerSheetModalProps> = ({
  isOpen,
  onClose,
  setActiveTab,
  onOpenThemeCustomizer,
  onOpenOnboarding,
}) => {
  if (!isOpen) return null;

  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
    onClose();
  };

  const drawerSections = [
    {
      title: 'CORE OS MODULES',
      items: [
        { id: 'analytics', label: 'Study Analytics Vault', desc: 'Retention heatmaps, focus hours & metrics', icon: BarChart3, color: 'text-violet-400' },
        { id: 'career', label: 'Career Growth Engine', desc: 'Skill trees, MCA roadmap & industry readiness', icon: Briefcase, color: 'text-cyan-400' },
        { id: 'twin', label: 'Proactive AI Twin Studio', desc: 'Neural decay models & spaced repetition', icon: BrainCircuit, color: 'text-fuchsia-400' },
        { id: 'wellness', label: 'Mental Wellness & Focus', desc: 'Binaural beats, pomodoro & anti-burnout', icon: HeartHandshake, color: 'text-emerald-400' },
      ],
    },
    {
      title: 'UTILITIES & COMPETITIONS',
      items: [
        { id: 'contests', label: 'Bi-Weekly AI Contests', desc: 'National ranker battles & XP prizes', icon: Trophy, color: 'text-amber-400' },
        { id: 'notebook', label: 'Saved PDFs & Notes', desc: 'Rich Markdown, code blocks & drawings', icon: BookOpen, color: 'text-sky-400' },
        { id: 'proposal', label: 'Startup & Tech Spec', desc: 'Architecture documentation & pitch deck', icon: FileCode2, color: 'text-indigo-400' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md animate-fadeIn">
      {/* Background click backdrop */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Slide-in Drawer Sheet */}
      <div className="relative w-full max-w-md h-full bg-[#0E111B] border-l border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.9)] p-6 overflow-y-auto custom-scrollbar flex flex-col justify-between z-10 animate-slideLeft">
        
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                S
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">SmartAI Drawer</h2>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Extended OS Workspace</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section Lists */}
          <div className="space-y-6">
            {drawerSections.map((sec, idx) => (
              <div key={idx}>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2.5 px-2">
                  {sec.title}
                </h3>
                <div className="space-y-1.5">
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className="w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 text-left transition-all group flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-white/5 group-hover:scale-105 transition-transform">
                            <Icon className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors">
                              {item.label}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Theme Studio & Profiler Quick Actions */}
          <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 px-2">
              SYSTEM CONFIGURATION
            </h3>

            <button
              onClick={() => {
                onClose();
                onOpenThemeCustomizer();
              }}
              className="w-full p-3 rounded-2xl bg-gradient-to-r from-violet-900/30 via-purple-900/20 to-black border border-violet-500/30 hover:border-violet-500/60 text-left transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-violet-600/30 text-cyan-300">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Theme & Palette Studio</p>
                  <p className="text-[10px] text-violet-300 mt-0.5">Customize accent gradients & glass blur</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-violet-500/20 text-violet-200">5 Palettes</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenOnboarding();
              }}
              className="w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-left transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/5 text-indigo-300">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Re-run AI Profiler Setup</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Update study goals, semester & stream</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Footer Brand Info */}
        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            NEURON OS • MCA Enterprise Build v3.5
          </p>
        </div>

      </div>
    </div>
  );
};
