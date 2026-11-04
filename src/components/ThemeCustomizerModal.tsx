import React, { useState } from 'react';
import { PaletteId, GlowIntensity, GlassBlur, themePalettes } from '../data/themePalettes';
import { Palette, Sun, Moon, Sparkles, Check, RefreshCw, Sliders, Zap, ShieldCheck, Flame, X } from 'lucide-react';

interface ThemeCustomizerModalProps {
  currentPaletteId: PaletteId;
  darkMode: boolean;
  glowIntensity: GlowIntensity;
  glassBlur: GlassBlur;
  onApplyTheme: (paletteId: PaletteId, dark: boolean, intensity: GlowIntensity, blur: GlassBlur) => void;
  onClose: () => void;
}

export const ThemeCustomizerModal: React.FC<ThemeCustomizerModalProps> = ({
  currentPaletteId,
  darkMode,
  glowIntensity,
  glassBlur,
  onApplyTheme,
  onClose,
}) => {
  const [selectedPaletteId, setSelectedPaletteId] = useState<PaletteId>(currentPaletteId);
  const [isDark, setIsDark] = useState<boolean>(darkMode);
  const [intensity, setIntensity] = useState<GlowIntensity>(glowIntensity);
  const [blurLevel, setBlurLevel] = useState<GlassBlur>(glassBlur);
  const [showToast, setShowToast] = useState<boolean>(false);

  const activePalette = themePalettes[selectedPaletteId];

  const handleApply = () => {
    onApplyTheme(selectedPaletteId, isDark, intensity, blurLevel);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 800);
  };

  const handleRandomize = () => {
    const keys = Object.keys(themePalettes) as PaletteId[];
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setSelectedPaletteId(randomKey);
  };

  const handleReset = () => {
    setSelectedPaletteId('cyberpunk');
    setIsDark(true);
    setIntensity('vibrant');
    setBlurLevel('medium');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto custom-scrollbar bg-[#0E1017] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] text-white p-6 sm:p-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl bg-gradient-to-tr ${activePalette.gradientFromTo} shadow-[0_0_20px_rgba(139,92,246,0.3)]`}>
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-white">NEURON OS Aesthetic Studio</h2>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  v3.5 Theme Engine
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Customize accent gradients, background aura, and canvas contrast</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Interactive Preview Card */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Live Interface Preview
            </span>
            <span className="text-[11px] text-gray-400">Updates in real-time</span>
          </div>

          <div 
            className={`relative rounded-3xl p-6 border transition-all duration-300 overflow-hidden ${
              isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-slate-100 border-slate-300 text-slate-900'
            }`}
          >
            {/* Background Glow Orbs */}
            <div 
              className="absolute -top-10 -left-10 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-50 transition-all duration-500"
              style={{ backgroundColor: activePalette.primaryColor }}
            />
            <div 
              className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-50 transition-all duration-500"
              style={{ backgroundColor: activePalette.secondaryColor }}
            />

            <div className="relative z-10 space-y-4">
              
              {/* Top Banner Row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr ${activePalette.gradientFromTo} shadow-lg`}>
                    <div className={`w-full h-full rounded-full flex items-center justify-center ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'} font-bold text-xs`}>
                      N
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Diksha's AI Workspace</h3>
                    <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Active Theme: {activePalette.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${activePalette.badgeBg} ${activePalette.badgeBorder} ${activePalette.badgeText}`}>
                    Level 8 • 4,250 XP
                  </span>
                  <div className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${isDark ? 'bg-white/5 border border-white/10 text-orange-400' : 'bg-slate-200 text-orange-600'}`}>
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>14 Days</span>
                  </div>
                </div>
              </div>

              {/* Sample Content Box */}
              <div className={`p-4 rounded-2xl border transition-all ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-slate-700'} leading-relaxed`}>
                  "AI Twin has scheduled a 25-minute revision block for <strong>Operating Systems</strong> today at 8:00 PM."
                </p>

                {/* Progress bar with active palette gradient */}
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span className={activePalette.accentText}>Memory Retention</span>
                    <span className={isDark ? 'text-gray-400' : 'text-slate-500'}>88% Coherence</span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}>
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${activePalette.gradientFromTo} transition-all duration-500`}
                      style={{ width: '88%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Sample Buttons */}
              <div className="flex gap-2">
                <button className={`px-4 py-2 rounded-xl bg-gradient-to-r ${activePalette.gradientFromTo} text-white font-bold text-xs shadow-md`}>
                  Primary Action Button
                </button>
                <button className={`px-4 py-2 rounded-xl border text-xs font-semibold ${isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-slate-200 border-slate-300 text-slate-800'}`}>
                  Secondary Action
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Theme Palette Selection Grid */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-violet-400" />
            1. Select Accent Color Palette
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(Object.keys(themePalettes) as PaletteId[]).map((id) => {
              const pal = themePalettes[id];
              const isSelected = selectedPaletteId === id;

              return (
                <div
                  key={id}
                  onClick={() => setSelectedPaletteId(id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all relative group overflow-hidden ${
                    isSelected 
                      ? 'bg-violet-900/20 border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)]' 
                      : 'bg-white/5 hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        {pal.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{pal.tagline}</p>
                    </div>

                    {isSelected && (
                      <span className="p-1 rounded-full bg-violet-500 text-white shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  {/* Swatch color circles */}
                  <div className="flex items-center gap-1.5 mt-3">
                    {pal.swatchColors.map((color, idx) => (
                      <div 
                        key={idx} 
                        className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <span className="text-[10px] text-gray-400 font-mono ml-auto uppercase">{id}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Canvas Lighting & Glass Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Canvas Mode */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3 flex items-center gap-2">
              {isDark ? <Moon className="w-4 h-4 text-violet-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
              2. Canvas Lighting Mode
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsDark(true)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  isDark 
                    ? 'bg-violet-600/30 border-violet-500 text-violet-200' 
                    : 'bg-white/5 border-white/10 text-gray-400'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Obsidian Dark</span>
              </button>
              <button
                onClick={() => setIsDark(false)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  !isDark 
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                    : 'bg-white/5 border-white/10 text-gray-400'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Clean Light</span>
              </button>
            </div>
          </div>

          {/* Glow Aura Intensity */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              3. Neon Glow Aura
            </h4>
            <div className="grid grid-cols-3 gap-1.5">
              {(['subtle', 'vibrant', 'intense'] as GlowIntensity[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setIntensity(lvl)}
                  className={`py-2 px-2 rounded-xl border text-[11px] font-bold capitalize transition-all ${
                    intensity === lvl
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                      : 'bg-white/5 border-white/10 text-gray-400'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Glassmorphism Blur */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              4. Glassmorphism Blur
            </h4>
            <div className="grid grid-cols-3 gap-1.5">
              {(['soft', 'medium', 'ultra'] as GlassBlur[]).map((blur) => (
                <button
                  key={blur}
                  onClick={() => setBlurLevel(blur)}
                  className={`py-2 px-2 rounded-xl border text-[11px] font-bold capitalize transition-all ${
                    blurLevel === blur
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-white/5 border-white/10 text-gray-400'
                  }`}
                >
                  {blur}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-gray-400" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={handleRandomize}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Randomize</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r ${activePalette.gradientFromTo} text-white font-bold text-xs shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-2`}
            >
              <Check className="w-4 h-4" />
              <span>Apply Theme Settings</span>
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4" />
            <span>Theme Applied: {activePalette.name}!</span>
          </div>
        )}

      </div>
    </div>
  );
};
