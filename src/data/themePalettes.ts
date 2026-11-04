export type PaletteId = 'cyberpunk' | 'neon-sunset' | 'midnight-emerald' | 'electric-amber' | 'quantum-blue';
export type GlowIntensity = 'subtle' | 'vibrant' | 'intense';
export type GlassBlur = 'soft' | 'medium' | 'ultra';

export interface ThemePalette {
  id: PaletteId;
  name: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  darkBg: string;
  lightBg: string;
  gradientFromTo: string;
  badgeBorder: string;
  badgeBg: string;
  badgeText: string;
  accentText: string;
  glowColor1: string;
  glowColor2: string;
  swatchColors: [string, string, string];
}

export const themePalettes: Record<PaletteId, ThemePalette> = {
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk Violet',
    tagline: 'Default Neural Aura with Electric Cyan & Deep Violet',
    primaryColor: '#8B5CF6',
    secondaryColor: '#06B6D4',
    darkBg: '#0A0A0C',
    lightBg: '#F8FAFC',
    gradientFromTo: 'from-violet-600 via-fuchsia-600 to-cyan-400',
    badgeBorder: 'border-violet-500/40',
    badgeBg: 'bg-violet-600/20',
    badgeText: 'text-violet-300',
    accentText: 'text-violet-400',
    glowColor1: 'rgba(139, 92, 246, 0.25)',
    glowColor2: 'rgba(6, 182, 212, 0.25)',
    swatchColors: ['#8B5CF6', '#D946EF', '#06B6D4'],
  },
  'neon-sunset': {
    id: 'neon-sunset',
    name: 'Neon Sunset',
    tagline: 'Vibrant Warm Ember with Flamingo Rose & Golden Horizon',
    primaryColor: '#F43F5E',
    secondaryColor: '#F59E0B',
    darkBg: '#0F0A15',
    lightBg: '#FFFDF8',
    gradientFromTo: 'from-rose-500 via-pink-500 to-amber-400',
    badgeBorder: 'border-rose-500/40',
    badgeBg: 'bg-rose-600/20',
    badgeText: 'text-rose-300',
    accentText: 'text-rose-400',
    glowColor1: 'rgba(244, 63, 94, 0.25)',
    glowColor2: 'rgba(245, 158, 11, 0.25)',
    swatchColors: ['#F43F5E', '#EC4899', '#F59E0B'],
  },
  'midnight-emerald': {
    id: 'midnight-emerald',
    name: 'Midnight Emerald',
    tagline: 'Biophilic Matrix with Deep Forest & Electric Jade',
    primaryColor: '#10B981',
    secondaryColor: '#14B8A6',
    darkBg: '#06120E',
    lightBg: '#F0FDF4',
    gradientFromTo: 'from-emerald-500 via-teal-500 to-cyan-400',
    badgeBorder: 'border-emerald-500/40',
    badgeBg: 'bg-emerald-600/20',
    badgeText: 'text-emerald-300',
    accentText: 'text-emerald-400',
    glowColor1: 'rgba(16, 185, 129, 0.25)',
    glowColor2: 'rgba(20, 184, 166, 0.25)',
    swatchColors: ['#10B981', '#14B8A6', '#06B6D4'],
  },
  'electric-amber': {
    id: 'electric-amber',
    name: 'Electric Amber',
    tagline: 'High-Energy Sunlight & Fiery Plasma Energy',
    primaryColor: '#F59E0B',
    secondaryColor: '#EF4444',
    darkBg: '#120E08',
    lightBg: '#FFFDF5',
    gradientFromTo: 'from-amber-500 via-orange-500 to-red-500',
    badgeBorder: 'border-amber-500/40',
    badgeBg: 'bg-amber-600/20',
    badgeText: 'text-amber-300',
    accentText: 'text-amber-400',
    glowColor1: 'rgba(245, 158, 11, 0.25)',
    glowColor2: 'rgba(239, 68, 68, 0.25)',
    swatchColors: ['#F59E0B', '#F97316', '#EF4444'],
  },
  'quantum-blue': {
    id: 'quantum-blue',
    name: 'Quantum Sapphire',
    tagline: 'Cool Orbital Tech with Deep Space Cobalt & Neon Sky',
    primaryColor: '#3B82F6',
    secondaryColor: '#06B6D4',
    darkBg: '#080C16',
    lightBg: '#F0F4FF',
    gradientFromTo: 'from-blue-600 via-indigo-500 to-cyan-400',
    badgeBorder: 'border-blue-500/40',
    badgeBg: 'bg-blue-600/20',
    badgeText: 'text-blue-300',
    accentText: 'text-blue-400',
    glowColor1: 'rgba(59, 130, 246, 0.25)',
    glowColor2: 'rgba(6, 182, 212, 0.25)',
    swatchColors: ['#2563EB', '#6366F1', '#0EA5E9'],
  },
};
