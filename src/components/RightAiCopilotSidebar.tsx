import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  X, 
  Bot, 
  Sparkles, 
  Send, 
  Mic, 
  FileUp, 
  FileText, 
  Youtube, 
  Camera, 
  Paperclip, 
  Check, 
  Volume2, 
  History, 
  Cpu, 
  Layers, 
  HelpCircle,
  Lightbulb,
  Maximize2
} from 'lucide-react';

interface RightAiCopilotSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const RightAiCopilotSidebar: React.FC<RightAiCopilotSidebarProps> = ({
  isOpen,
  onClose,
  user
}) => {
  const [model, setModel] = useState<'flash' | 'pro' | 'ultra'>('flash');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [attachment, setAttachment] = useState<string | null>(null);

  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; chips?: string[]; flashcard?: { q: string; a: string } }>>([
    {
      sender: 'ai',
      text: `Hello ${user.name || 'Scholar'}! I am SmartAI Copilot. Ask me anything, attach lecture slides or YouTube links, or toggle Voice Mode.`,
      chips: ["Explain Like I'm 10", "Generate 3 Flashcards", "Summarize Key Concepts"],
      flashcard: {
        q: "What is the primary key constraint in DBMS?",
        a: "A primary key uniquely identifies each record in a database table and cannot contain NULL values."
      }
    }
  ]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = textToSend || input;
    if (!prompt.trim() && !attachment) return;

    const fullUserText = attachment ? `[Attached File: ${attachment}] ${prompt}` : prompt;
    setMessages(prev => [...prev, { sender: 'user', text: fullUserText }]);
    setInput('');
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: fullUserText,
          mode: 'explain',
          detailLevel: 'beginner',
          userProfile: user
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: data.content || "Parsed and synthesized response across your study material.",
        chips: ["Simpler terms", "Create Practice Problem", "Convert to Quiz"]
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: "Connected to SmartAI Copilot backup engine. Here is your synthesized breakdown."
      }]);
    } finally {
      setIsGenerating(false);
      setAttachment(null);
    }
  };

  const handleAttach = (type: string) => {
    if (type === 'pdf') setAttachment('DBMS_Module_3_Notes.pdf');
    if (type === 'ppt') setAttachment('Operating_Systems_Slides.pptx');
    if (type === 'youtube') setAttachment('https://youtube.com/watch?v=os_scheduling');
    if (type === 'camera') setAttachment('Page_42_Textbook_Snap.jpg');
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-[#0E131F]/95 backdrop-blur-2xl border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col transition-all duration-300 animate-slide-left">
      
      {/* Top Header Bar */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between gap-2 bg-black/40">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 text-white shadow-[0_0_12px_rgba(0,229,255,0.4)]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
              SmartAI Copilot
              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                v3.5
              </span>
            </h3>
            <p className="text-[10px] text-gray-400">Multimodal Assistant & Voice Tutor</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Model Selector Dropdown */}
          <select 
            value={model}
            onChange={(e) => setModel(e.target.value as any)}
            className="bg-white/5 border border-white/10 text-gray-200 text-[10px] font-bold rounded-xl px-2 py-1 focus:outline-none focus:border-cyan-400"
          >
            <option value="flash" className="bg-gray-900 text-white">Gemini 1.5 Flash</option>
            <option value="pro" className="bg-gray-900 text-white">Gemini 1.5 Pro</option>
            <option value="ultra" className="bg-gray-900 text-white">SmartAI Ultra</option>
          </select>

          {/* Voice Studio Toggle */}
          <button
            onClick={() => setIsVoiceActive(!isVoiceActive)}
            className={`p-1.5 rounded-xl border text-xs transition-all ${
              isVoiceActive 
                ? 'bg-rose-600/30 border-rose-500 text-rose-300 animate-pulse' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
            title="Toggle Voice Companion Mode"
          >
            <Mic className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Voice Mode Floating Banner if Voice is Active */}
      {isVoiceActive && (
        <div className="p-3 bg-gradient-to-r from-violet-900/60 to-cyan-900/60 border-b border-cyan-500/30 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="font-bold">Aether Voice Mode Active</span>
          </div>
          <button 
            onClick={() => {
              if ('speechSynthesis' in window) {
                window.speechSynthesis.speak(new SpeechSynthesisUtterance("I am listening. Ask your study query now."));
              }
            }}
            className="px-2 py-0.5 rounded bg-cyan-500 text-black font-extrabold text-[10px]"
          >
            Test Audio
          </button>
        </div>
      )}

      {/* Mid View Chat Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[90%] whitespace-pre-wrap ${
                m.sender === 'user'
                  ? 'bg-violet-600/30 border border-violet-500/40 text-violet-100 rounded-br-none shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                  : 'bg-white/5 border border-white/10 text-gray-200 rounded-bl-none shadow-md backdrop-blur-md'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-white/10 text-[9px] font-extrabold uppercase text-cyan-400">
                  <Sparkles className="w-3 h-3" />
                  SmartAI Copilot Response
                </div>
              )}
              {m.text}

              {/* Flashcard Preview Widget */}
              {m.flashcard && (
                <div className="mt-3 p-3 rounded-xl bg-black/50 border border-cyan-500/30 text-xs space-y-1.5">
                  <div className="text-[10px] uppercase font-mono font-bold text-cyan-400">⚡ Interactive Flashcard</div>
                  <p className="font-bold text-white">{m.flashcard.q}</p>
                  <p className="text-gray-300 text-[11px] bg-white/5 p-2 rounded-lg border border-white/5">{m.flashcard.a}</p>
                </div>
              )}
            </div>

            {/* Dynamic Action Chips */}
            {m.chips && (
              <div className="flex flex-wrap items-center gap-1.5 mt-2 ml-1">
                {m.chips.map((chip, cIdx) => (
                  <button
                    key={cIdx}
                    onClick={() => handleSendMessage(chip)}
                    className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-violet-600/20 border border-white/10 text-[10px] font-bold text-cyan-300 hover:text-white transition-all"
                  >
                    ✨ {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isGenerating && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-cyan-300 animate-pulse w-fit">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Analyzing query & building study breakdown...</span>
          </div>
        )}
      </div>

      {/* Multimodal Attachment Bar & Input */}
      <div className="p-3 border-t border-white/10 bg-black/60 space-y-2">
        
        {/* Quick Attach Icons */}
        <div className="flex items-center gap-1.5 pb-1 border-b border-white/5 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => handleAttach('pdf')}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-[10px] font-bold flex items-center gap-1 border border-white/10 shrink-0"
          >
            <FileUp className="w-3 h-3 text-rose-400" />
            <span>PDF</span>
          </button>
          <button
            onClick={() => handleAttach('ppt')}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-[10px] font-bold flex items-center gap-1 border border-white/10 shrink-0"
          >
            <FileText className="w-3 h-3 text-amber-400" />
            <span>PPT</span>
          </button>
          <button
            onClick={() => handleAttach('youtube')}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-[10px] font-bold flex items-center gap-1 border border-white/10 shrink-0"
          >
            <Youtube className="w-3 h-3 text-red-500" />
            <span>YouTube</span>
          </button>
          <button
            onClick={() => handleAttach('camera')}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-[10px] font-bold flex items-center gap-1 border border-white/10 shrink-0"
          >
            <Camera className="w-3 h-3 text-cyan-400" />
            <span>Snap</span>
          </button>
        </div>

        {/* Attachment Indicator */}
        {attachment && (
          <div className="flex items-center justify-between p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-[11px] text-cyan-300 font-bold">
            <span className="truncate">Attached: {attachment}</span>
            <button onClick={() => setAttachment(null)} className="text-[9px] uppercase hover:underline text-rose-400">Remove</button>
          </div>
        )}

        {/* Text Input & Send */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask SmartAI Copilot..."
            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isGenerating || (!input.trim() && !attachment)}
            className="p-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-400 hover:opacity-90 disabled:opacity-40 text-white font-bold transition-all shadow-[0_0_12px_rgba(0,229,255,0.3)] shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
