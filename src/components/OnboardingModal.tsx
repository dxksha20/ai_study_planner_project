import React, { useState } from 'react';
import { UserProfile, StreamType } from '../types';
import { Bot, Send, Sparkles, CheckCircle2, User, BookOpen, Clock, Target, ArrowRight } from 'lucide-react';

interface OnboardingModalProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  onClose: () => void;
}

interface ChatMessage {
  role: 'ai' | 'user';
  text: string;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ user, setUser, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'ai',
      text: `Hello ${user.name || 'there'}! I am AetherAI, your Learning Operating System Companion. 🌟\n\nTo build your personalized Learning Engine, tell me a bit about yourself: What degree or stream are you pursuing (e.g. B.Tech Computer Science, MBBS, LLB, UPSC prep, NEET, JEE), what semester/year are you in, and what are your main academic or placement goals?`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [stream, setStream] = useState<StreamType>(user.stream || 'Engineering');
  const [branch, setBranch] = useState(user.branch || 'Computer Science & Engineering');
  const [semester, setSemester] = useState(user.semester || '6th Semester');
  const [weakSubjects, setWeakSubjects] = useState(user.weakSubjects.join(', '));
  const [strongSubjects, setStrongSubjects] = useState(user.strongSubjects.join(', '));
  const [studyHours, setStudyHours] = useState(user.dailyStudyGoalHours || 5);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: updatedMessages,
          userResponse: userMsg.text
        })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([...updatedMessages, { role: 'ai', text: data.reply }]);
      }
    } catch (err) {
      console.error(err);
      setMessages([...updatedMessages, { role: 'ai', text: "That sounds great! I have noted your preferences. Feel free to adjust the summary parameters on the right and click Complete Onboarding." }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleComplete = () => {
    setUser(prev => ({
      ...prev,
      stream,
      branch,
      semester,
      weakSubjects: weakSubjects.split(',').map(s => s.trim()).filter(Boolean),
      strongSubjects: strongSubjects.split(',').map(s => s.trim()).filter(Boolean),
      dailyStudyGoalHours: studyHours,
      isOnboarded: true
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden shadow-2xl shadow-indigo-500/20">
        
        {/* Left Panel: AI Conversational Setup */}
        <div className="w-full md:w-3/5 p-5 flex flex-col border-r border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                Aether AI Learning Profiler
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
              </h2>
              <p className="text-[11px] text-slate-400">Conversational onboarding & student routine mapping</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar max-h-[360px] md:max-h-full">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-2.5 text-xs ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div 
                  className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-slate-800/80 text-slate-200 border border-slate-700/60 rounded-tl-none whitespace-pre-wrap'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="flex items-center gap-2 text-xs text-indigo-400 italic">
                <Bot className="w-4 h-4 animate-bounce" />
                <span>AetherAI is analyzing your routine...</span>
              </div>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800 flex gap-2">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="e.g., B.Tech CSE 3rd Year, weak in OS, target SDE placement in 6 months..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={isGenerating || !inputText.trim()}
              className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-1 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Panel: Auto-populated Learning Profile & Confirmation */}
        <div className="w-full md:w-2/5 p-5 bg-slate-950 flex flex-col justify-between overflow-y-auto">
          <div>
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <User className="w-4 h-4" />
              Learning OS Profile Matrix
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 text-[11px] mb-1">Academic Stream</label>
                <select 
                  value={stream} 
                  onChange={(e) => setStream(e.target.value as StreamType)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Engineering">Engineering (B.Tech / M.Tech / MCA)</option>
                  <option value="Medical">Medical (MBBS / NEET / Biotech)</option>
                  <option value="Law">Law (BA LLB / LLM / Judicial)</option>
                  <option value="Commerce">Commerce (CA / CS / MBA / B.Com)</option>
                  <option value="School">School (Class 10 / 11 / 12 CBSE/ICSE)</option>
                  <option value="Competitive (UPSC/GATE/NEET/JEE)">Competitive Exam (UPSC / GATE / JEE)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Branch / Major</label>
                  <input 
                    type="text" 
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Semester / Year</label>
                  <input 
                    type="text" 
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-400 text-[11px] mb-1">Weak Subjects (Needs Spaced Repetition)</label>
                <input 
                  type="text" 
                  value={weakSubjects}
                  onChange={(e) => setWeakSubjects(e.target.value)}
                  placeholder="Operating Systems, Algorithms"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-emerald-400 text-[11px] mb-1">Strong Subjects</label>
                <input 
                  type="text" 
                  value={strongSubjects}
                  onChange={(e) => setStrongSubjects(e.target.value)}
                  placeholder="DBMS, Web Development"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-200"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-[11px] mb-1">
                  <span className="text-slate-400">Target Daily Focus Hours</span>
                  <span className="text-indigo-400 font-bold">{studyHours} Hours / Day</span>
                </div>
                <input 
                  type="range" 
                  min={2} 
                  max={12} 
                  value={studyHours} 
                  onChange={(e) => setStudyHours(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
            <button
              onClick={handleComplete}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Initialize Learning OS Twin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <p className="text-[10px] text-center text-slate-500">
              Generates customized timetable, study twin models, and quiz engines.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
