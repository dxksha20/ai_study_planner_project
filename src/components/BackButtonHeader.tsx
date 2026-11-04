import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface BackButtonHeaderProps {
  onBack: () => void;
  title?: string;
  subtitle?: string;
}

export const BackButtonHeader: React.FC<BackButtonHeaderProps> = ({ onBack, title, subtitle }) => {
  return (
    <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
      <button
        onClick={onBack}
        className="px-3.5 py-1.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-extrabold text-cyan-300 hover:text-white transition-all flex items-center gap-2 group shadow-sm"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-cyan-400" />
        <span>Back to Dashboard</span>
      </button>

      {title && (
        <div className="text-right">
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{title}</span>
          {subtitle && <p className="text-[10px] text-gray-500">{subtitle}</p>}
        </div>
      )}
    </div>
  );
};
