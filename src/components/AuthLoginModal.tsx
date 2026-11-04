import React, { useState } from 'react';
import { UserProfile, DaySchedule, QuizData } from '../types';
import { FIELDS_OF_STUDY, FieldOfStudyPreset } from '../data/fieldOfStudyData';
import { 
  Sparkles, 
  Bot, 
  User, 
  GraduationCap, 
  Target, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Globe,
  Zap,
  Cpu,
  Code,
  Terminal,
  Brain,
  BookOpen
} from 'lucide-react';

interface AuthLoginModalProps {
  isOpen: boolean;
  onLogin: (updatedUser: Partial<UserProfile> & { 
    avatar?: string;
    schedule?: DaySchedule[];
    quiz?: QuizData;
  }) => void;
  darkMode: boolean;
}

export const AVATAR_OPTIONS = [
  { id: 'cyberpunk', name: 'Cyber Neon', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', tag: 'High Voltage' },
  { id: 'anime', name: 'Anime Coder', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80', tag: 'Focus Master' },
  { id: 'minimal', name: 'Minimal Zen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', tag: 'Calm Mind' },
  { id: 'robot', name: 'AI Android', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80', tag: 'Synthetic' },
  { id: 'pixel', name: 'Retro Pixel', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80', tag: 'Arcade' },
  { id: 'cute', name: 'Cute Mascot', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80', tag: 'Friendly' },
];

export const AuthLoginModal: React.FC<AuthLoginModalProps> = ({
  isOpen,
  onLogin,
  darkMode
}) => {
  const [name, setName] = useState("Diksha Rjalmi");
  const [selectedFieldId, setSelectedFieldId] = useState<string>('btech_cse');
  const [targetExam, setTargetExam] = useState("B.Tech CS / GATE / MCA Finals");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0].avatar);
  const [dailyGoalHours, setDailyGoalHours] = useState(4.0);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(FIELDS_OF_STUDY[0].subjects);
  const [newSubject, setNewSubject] = useState("");

  if (!isOpen) return null;

  const handleSelectField = (field: FieldOfStudyPreset) => {
    setSelectedFieldId(field.id);
    setTargetExam(field.targetExam);
    setSelectedSubjects([...field.subjects]);
  };

  const handleAddSubject = () => {
    if (newSubject.trim() && !selectedSubjects.includes(newSubject.trim())) {
      setSelectedSubjects([...selectedSubjects, newSubject.trim()]);
      setNewSubject("");
    }
  };

  const handleToggleSubject = (sub: string) => {
    if (selectedSubjects.includes(sub)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== sub));
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const chosenField = FIELDS_OF_STUDY.find(f => f.id === selectedFieldId) || FIELDS_OF_STUDY[0];

    onLogin({
      name: name.trim(),
      avatar: selectedAvatar,
      stream: chosenField.stream,
      branch: chosenField.name,
      targetExam: targetExam,
      targetHours: dailyGoalHours,
      subjects: selectedSubjects.length > 0 ? selectedSubjects : chosenField.subjects,
      schedule: chosenField.schedule,
      quiz: chosenField.quiz
    });
  };

  const renderFieldIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-4 h-4 text-indigo-500" />;
      case 'Code': return <Code className="w-4 h-4 text-violet-500" />;
      case 'Terminal': return <Terminal className="w-4 h-4 text-emerald-500" />;
      case 'Brain': return <Brain className="w-4 h-4 text-[#7C4DFF]" />;
      case 'Zap': return <Zap className="w-4 h-4 text-amber-500" />;
      default: return <BookOpen className="w-4 h-4 text-cyan-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto animate-fade-in custom-scrollbar">
      
      {/* Container Modal Card */}
      <div className={`w-full max-w-2xl rounded-3xl border p-6 sm:p-8 relative overflow-hidden transition-all duration-300 my-auto ${
        darkMode 
          ? 'bg-[#0E131F] border-white/10 text-white shadow-2xl' 
          : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
      }`}>

        {/* Top Accent Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400"></div>

        {/* Header Branding */}
        <div className="text-center space-y-1.5 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>CS & Engineering Scholar Workspace</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome to <span className="text-indigo-600">Neuron CS Engine</span>
          </h1>
          <p className={`text-xs max-w-md mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Select your Computer Science degree program (B.Tech, MCA, BCA, M.Tech, B.Sc CS) to customize your schedule, AI tutor, and code battles.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* User Name & Target Exam */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label className={`block text-xs font-bold mb-1.5 flex items-center gap-1.5 ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                <User className="w-3.5 h-3.5 text-indigo-500" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode 
                    ? 'bg-black/50 border-white/10 text-white placeholder-gray-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1.5 flex items-center gap-1.5 ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                <span>Target Exam / Goal</span>
              </label>
              <input
                type="text"
                required
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                placeholder="e.g. GATE CS, Semester Board, LeetCode, SDE Placement"
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode 
                    ? 'bg-black/50 border-white/10 text-white placeholder-gray-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

          </div>

          {/* CHOOSE FIELD OF STUDY - ENGINEERING ONLY */}
          <div>
            <label className={`block text-xs font-bold mb-2 flex items-center justify-between ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>Select Engineering / CS Degree Program</span>
              </span>
              <span className="text-[10px] text-indigo-600 font-mono font-bold">6 CS Streams</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {FIELDS_OF_STUDY.map((field) => {
                const isSelected = selectedFieldId === field.id;
                return (
                  <button
                    key={field.id}
                    type="button"
                    onClick={() => handleSelectField(field)}
                    className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 shadow-sm scale-[1.01]'
                        : darkMode
                          ? 'border-white/10 bg-white/5 hover:border-white/20'
                          : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="p-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                        {renderFieldIcon(field.iconName)}
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 drop-shadow-xs" />
                      )}
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold ${isSelected ? 'text-indigo-900' : darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {field.name}
                      </h4>
                      <p className={`text-[10px] line-clamp-1 mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {field.targetExam}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Choose Avatar Grid */}
          <div>
            <label className={`block text-xs font-bold mb-2 flex items-center justify-between ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
              <span className="flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-emerald-500" />
                <span>Select Developer Avatar</span>
              </span>
            </label>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {AVATAR_OPTIONS.map((opt) => {
                const isSelected = selectedAvatar === opt.avatar;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedAvatar(opt.avatar)}
                    className={`p-1.5 rounded-2xl border flex flex-col items-center gap-1 transition-all text-center group ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 shadow-xs'
                        : darkMode
                          ? 'border-white/10 bg-white/5 hover:border-white/20'
                          : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-200">
                      <img src={opt.avatar} alt={opt.name} className="w-full h-full object-cover" />
                      {isSelected && (
                        <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white drop-shadow-md" />
                        </div>
                      )}
                    </div>
                    <span className={`text-[9px] font-bold truncate w-full ${
                      isSelected 
                        ? 'text-indigo-600' 
                        : darkMode ? 'text-gray-300' : 'text-slate-700'
                    }`}>
                      {opt.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Goal & Enrolled Subjects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label className={`block text-xs font-bold mb-1.5 flex items-center gap-1.5 ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Daily Coding & Study Goal ({dailyGoalHours} Hours)</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={dailyGoalHours}
                onChange={(e) => setDailyGoalHours(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>1 hr/day</span>
                <span>5 hrs/day</span>
                <span>10 hrs/day</span>
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1.5 flex items-center gap-1.5 ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                <Target className="w-3.5 h-3.5 text-indigo-500" />
                <span>Primary Enrolled CS Subjects</span>
              </label>

              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSubject(); } }}
                  placeholder="Add CS subject (e.g. System Design)"
                  className={`flex-1 px-3 py-1.5 rounded-lg border text-xs ${
                    darkMode 
                      ? 'bg-black/50 border-white/10 text-white placeholder-gray-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1 mt-2 max-h-16 overflow-y-auto custom-scrollbar">
                {selectedSubjects.map((sub, i) => (
                  <span
                    key={i}
                    onClick={() => handleToggleSubject(sub)}
                    className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold cursor-pointer hover:bg-rose-100 hover:text-rose-700 transition-colors"
                    title="Click to remove"
                  >
                    {sub} ✕
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Social One-Tap Auth Option */}
          <div className="pt-2 border-t border-slate-200 dark:border-white/10">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setName("Diksha Rjalmi");
                }}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  darkMode
                    ? 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-200'
                    : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-indigo-600" />
                <span>Google Account</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setName("Guest Developer");
                }}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  darkMode
                    ? 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-200'
                    : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Quick Guest Entry</span>
              </button>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
          >
            <span>Launch CS Scholar Workspace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

        </form>

      </div>
    </div>
  );
};
