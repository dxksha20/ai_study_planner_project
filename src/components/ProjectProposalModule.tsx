import React, { useState } from 'react';
import { 
  FileCode2, 
  Sparkles, 
  Target, 
  ShieldCheck, 
  Layers, 
  Database, 
  Cpu, 
  Zap, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  Presentation,
  Rocket
} from 'lucide-react';

export const ProjectProposalModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'names' | 'architecture' | 'schema' | 'pitch' | 'hackathon'>('overview');

  const startupNames = [
    { name: 'AetherLearn OS', tagline: 'The Intelligent Cognitive Learning Operating System.' },
    { name: 'NeuroAcademy', tagline: 'AI Study Twin that Thinks, Adapts, and Remembers for You.' },
    { name: 'Synapse Engine', tagline: 'Reinventing University Education with Proactive Memory AI.' },
    { name: 'OmniLearn OS', tagline: 'One Operating System for School, College, and Career Placements.' },
    { name: 'CogniFlow', tagline: 'Gamified Precision Study Engine powered by Ebbinghaus Recall.' },
    { name: 'Nexus Study Twin', tagline: 'Your Personal Proactive AI Co-Pilot for Engineering, Med & Law.' },
    { name: 'AuraCampus', tagline: 'Where Duolingo Gamification Meets ChatGPT Intelligence.' },
    { name: 'Aether OS', tagline: 'Zero Fluff. Pure Cognitive Retention and Placement Mastery.' },
    { name: 'MindMatrix', tagline: 'Transforming Study Hours into Level-Ups, Rewards, and Placements.' },
    { name: 'HyperLearn', tagline: 'The Next-Gen AI Learning OS for National Top Rankers.' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Deck Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-500/30 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-4 h-4 text-emerald-400" />
              MCA Final Year Project & Startup Pitch Deck
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              AetherLearn OS Architecture & Blueprint
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Complete investor pitch deck, system architecture, database schema, AI model selection, monetization strategy, and jury presentation guidelines.
            </p>
          </div>

          <div className="flex gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
              National Hackathon Ready
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'overview', label: 'Startup Overview & USP' },
          { id: 'names', label: '10 Premium Startup Names' },
          { id: 'architecture', label: 'Technical & AI Architecture' },
          { id: 'schema', label: 'Firestore / SQL Schema' },
          { id: 'pitch', label: 'Investor Pitch Outline' },
          { id: 'hackathon', label: 'National Hackathon Worthiness' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === t.id
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview & USP */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4" />
              Problem Statement
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Students today suffer from <strong>app fragmentation overload</strong>—switching between Google Calendar for schedules, Notion for notes, ChatGPT for explanations, Quizlet for flashcards, Forest for timer, LeetCode for coding, and Discord for study groups. This leads to high cognitive friction, disorganization, and rapid memory decay (Ebbinghaus curve).
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Core Unique Selling Proposition (USP)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Proactive AI Study Twin</strong>. Instead of passive prompt-and-response chatbots, AetherLearn's AI Twin tracks memory retention decay in real time, predicts exam forgetfulness 5 days in advance, and automatically triggers adaptive recall battles and schedule re-alignments.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: 10 Startup Names */}
      {activeTab === 'names' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {startupNames.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-100">#{idx + 1}. {item.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Startup Quality
                </span>
              </div>
              <p className="text-xs text-indigo-300 italic">"{item.tagline}"</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Technical & AI Architecture */}
      {activeTab === 'architecture' && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            Full-Stack Technology Architecture
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-slate-200">Frontend Layer</span>
              <p className="text-slate-400">React 19 + TypeScript + Tailwind CSS v4 + Motion animations + Lucide Icons + Canvas Confetti.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-slate-200">Backend API Layer</span>
              <p className="text-slate-400">Node.js Express full-stack proxy endpoints (/api/ai/*) securing Gemini API keys server-side.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-slate-200">AI Model Stack</span>
              <p className="text-slate-400">Google GenAI SDK (@google/genai) with gemini-3.6-flash for reasoning & gemini-3.1-flash-tts-preview for speech.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Database Schema */}
      {activeTab === 'schema' && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4" />
            Database Schema (Firestore / Cloud SQL JSON)
          </h3>
          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto">
{`// Users Collection
users/{userId}: {
  profile: { name, stream, branch, semester, weakSubjects, strongSubjects, learningStyle },
  gamification: { level: 14, xp: 3850, coins: 1240, streakDays: 12 },
  twinModel: { retentionScore: 84.2, peakHours: "08:00 AM - 10:30 AM" }
}

// Timetable Collection
timetables/{userId}: {
  weeklySlots: [{ day, time, subject, type, notes, completed }],
  bufferDays: ["Saturday"]
}

// Quizzes Collection
quizzes/{quizId}: {
  title: string, subject: string, totalXp: 300,
  questions: [{ id, type, question, options, correctIndex, explanation }]
}`}
          </pre>
        </div>
      )}

      {/* Tab 5: Pitch Outline */}
      {activeTab === 'pitch' && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-2">
            <Presentation className="w-4 h-4" />
            10-Slide Investor & Jury Pitch Presentation
          </h3>
          <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
            <li><strong>Slide 1: Vision</strong> - AetherLearn: The AI Learning Operating System.</li>
            <li><strong>Slide 2: Problem</strong> - App fragmentation & Ebbinghaus memory decay causing high failure rates.</li>
            <li><strong>Slide 3: Solution</strong> - An all-in-one gamified OS combining Calendar, Notes, Quizzes, and Voice AI.</li>
            <li><strong>Slide 4: USP</strong> - The Proactive AI Study Twin predicting forgetfulness before exams.</li>
            <li><strong>Slide 5: Product Demo</strong> - Interactive Onboarding, Smart Timetable, Stream Notebook, and Avatar Studio.</li>
            <li><strong>Slide 6: Market Size</strong> - $350B Global EdTech & Student Productivity Market.</li>
            <li><strong>Slide 7: Business Model</strong> - Freemium ($9/mo for Pro Twin) + B2B University Licensing.</li>
            <li><strong>Slide 8: Architecture & Tech Stack</strong> - React, Express, Gemini API, Realtime WebSockets.</li>
            <li><strong>Slide 9: Roadmap</strong> - MVP → Version 2 (AR/VR Memory Palaces) → Global Campus Launch.</li>
            <li><strong>Slide 10: Team & Call to Action</strong> - Building the future of cognitive learning.</li>
          </ol>
        </div>
      )}

      {/* Tab 6: National Hackathon Worthiness */}
      {activeTab === 'hackathon' && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
            <Rocket className="w-4 h-4" />
            Why This Project Wins National Hackathons & MCA Evaluations
          </h3>
          <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside leading-relaxed">
            <li><strong>High Functional Depth</strong>: Replaces 12 separate productivity tools in one unified interface.</li>
            <li><strong>Proactive Intelligence</strong>: Uses AI not just for chat, but for background memory decay modeling and schedule optimization.</li>
            <li><strong>Gamified Retention Loop</strong>: Uses Duolingo-style XP, streaks, coins, and customizable avatars to solve student dropouts.</li>
            <li><strong>Stream Personalization</strong>: Works equally well for Engineering (code snippets), Medical (anatomy notes), Law (case statutes), and Competitive exams.</li>
          </ul>
        </div>
      )}

    </div>
  );
};
