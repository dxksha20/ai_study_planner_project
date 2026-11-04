import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Briefcase, Sparkles, Target, Award, ArrowRight, Code, BookOpen, FileCheck } from 'lucide-react';

interface CareerModeModuleProps {
  user: UserProfile;
}

export const CareerModeModule: React.FC<CareerModeModuleProps> = ({ user }) => {
  const [cgpa, setCgpa] = useState("8.6");
  const [targetRole, setTargetRole] = useState(user.targetRole || "Senior AI & Full Stack Engineer");
  const [roadmap, setRoadmap] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCareerRoadmap = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/career-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stream: user.stream,
          semester: user.semester,
          cgpa,
          targetRole,
          skills: ["React", "Express", "Python", "Data Structures"]
        })
      });
      const data = await res.json();
      setRoadmap(data.roadmap || "Career Roadmap initialized successfully.");
    } catch (err) {
      console.error(err);
      setRoadmap("Failed to generate career roadmap. Keep practicing DSA and core subjects!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Career Header */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="w-6 h-6 text-blue-400" />
            <h1 className="text-2xl font-extrabold text-slate-100">Career & Placement Mode</h1>
          </div>
          <p className="text-xs text-slate-400">
            Connects academic coursework directly to internships, portfolio projects, DSA interview rounds, and job placements.
          </p>
        </div>

        <button
          onClick={handleGenerateCareerRoadmap}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all shrink-0"
        >
          <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Architecting Roadmap...' : 'Generate Placement Roadmap'}</span>
        </button>
      </div>

      {/* Input Parameters */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-slate-400 text-xs mb-1">Target Job Role / Aspirations</label>
          <input 
            type="text" 
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 font-bold focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-slate-400 text-xs mb-1">Current Academic CGPA</label>
          <input 
            type="text" 
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 font-bold focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-slate-400 text-xs mb-1">Branch / Semester</label>
          <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-indigo-300 font-bold">
            {user.branch} ({user.semester})
          </div>
        </div>
      </div>

      {/* Career Roadmap Output */}
      {roadmap && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 animate-fade-in">
          <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4" />
            AI Tailored Placement Strategy & Project Roadmap
          </h2>
          <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
            {roadmap}
          </div>
        </div>
      )}

    </div>
  );
};
