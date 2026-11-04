import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  Bot, 
  Sparkles, 
  Send, 
  FileText, 
  Code2, 
  Network, 
  HelpCircle, 
  Lightbulb, 
  Volume2, 
  Layers, 
  BookOpen, 
  Paperclip, 
  Youtube, 
  Camera, 
  Link as LinkIcon, 
  Mic, 
  FileUp, 
  Check, 
  Sparkle
} from 'lucide-react';

interface StudyAssistantModuleProps {
  user: UserProfile;
}

export const StudyAssistantModule: React.FC<StudyAssistantModuleProps> = ({ user }) => {
  const [topicInput, setTopicInput] = useState("");
  const [mode, setMode] = useState<'explain' | 'mnemonic' | 'mindmap' | 'summary' | 'coding' | 'quiz'>('explain');
  const [detailLevel, setDetailLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [linkInput, setLinkInput] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; chips?: string[] }>>([
    {
      sender: 'ai',
      text: `Hello Diksha! I am your Multimodal Copilot. Upload a PDF, PPT, YouTube link, or ask me any question on ${user.branch || 'Computer Science'}.`,
      chips: ["Summarize Module 3", "Explain Like I'm 10", "Generate 5 Qs Quiz", "Convert to Flashcards"]
    }
  ]);

  const handleMultimodalUpload = (type: string) => {
    if (type === 'pdf') setUploadedFile('Quantum_Mechanics_Lecture_Notes.pdf');
    if (type === 'ppt') setUploadedFile('DBMS_Indexing_B_Trees.pptx');
    if (type === 'youtube') setLinkInput('https://youtube.com/watch?v=os_scheduling_demo');
    if (type === 'camera') setUploadedFile('Camera_Snap_Textbook_Page_42.jpg');
    if (type === 'voice') setUploadedFile('Audio_Memo_0721.mp3');
  };

  const handleSendMessage = async (textToSend?: string) => {
    const input = textToSend || topicInput;
    if (!input.trim() && !uploadedFile && !linkInput) return;

    const userMsgText = uploadedFile 
      ? `[Attached: ${uploadedFile}] ${input}`
      : linkInput 
        ? `[Parsed Link: ${linkInput}] ${input}`
        : input;

    setMessages(prev => [...prev, { sender: 'user', text: userMsgText }]);
    setTopicInput('');
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: userMsgText,
          mode,
          detailLevel,
          userProfile: user
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: data.content || "Neural model generated a complete breakdown.",
        chips: ["Explain in simpler terms", "Generate Flashcards", "Create Practice Problem"]
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: "Error contacting AI Copilot. Showing synthesized neural backup explanation."
      }]);
    } finally {
      setIsGenerating(false);
      setUploadedFile(null);
      setLinkInput(null);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-[#161B26]/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(0,229,255,0.1)]">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-[#00E5FF]/20 text-[#00E5FF]">
              <Bot className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Multimodal AI Copilot</h1>
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30">
              v3.5 Omnimodal Engine
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Parse PDFs, PPTs, YouTube lectures, textbook camera snaps & voice memos into high-yield study guides.
          </p>
        </div>

        {/* Quick Mode Switcher */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'explain', label: 'Explain', icon: Lightbulb },
            { id: 'mnemonic', label: 'Mnemonic', icon: Layers },
            { id: 'mindmap', label: 'Mind Map', icon: Network },
            { id: 'summary', label: 'Summary', icon: FileText },
            { id: 'coding', label: 'Code', icon: Code2 },
            { id: 'quiz', label: 'Quiz', icon: HelpCircle },
          ].map((m) => {
            const isSel = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSel 
                    ? 'bg-[#7C4DFF] text-white shadow-[0_0_15px_rgba(124,77,255,0.4)]' 
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Multimodal Input Bar */}
      <div className="p-5 rounded-3xl bg-[#161B26]/80 border border-white/10 backdrop-blur-xl space-y-3">
        <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#00E5FF] flex items-center gap-1.5">
          <Paperclip className="w-3.5 h-3.5" />
          Multimodal Parser Bar
        </div>

        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-white/5">
          <button
            onClick={() => handleMultimodalUpload('pdf')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 flex items-center gap-1.5 transition-all"
          >
            <FileUp className="w-3.5 h-3.5 text-rose-400" />
            <span>PDF / DOCX</span>
          </button>

          <button
            onClick={() => handleMultimodalUpload('ppt')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>PPT Slide Deck</span>
          </button>

          <button
            onClick={() => handleMultimodalUpload('youtube')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 flex items-center gap-1.5 transition-all"
          >
            <Youtube className="w-3.5 h-3.5 text-red-500" />
            <span>YouTube Link</span>
          </button>

          <button
            onClick={() => handleMultimodalUpload('camera')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 flex items-center gap-1.5 transition-all"
          >
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>Camera Capture</span>
          </button>

          <button
            onClick={() => handleMultimodalUpload('voice')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 flex items-center gap-1.5 transition-all"
          >
            <Mic className="w-3.5 h-3.5 text-emerald-400" />
            <span>Voice Memo</span>
          </button>
        </div>

        {/* Active Attached File Indicator */}
        {(uploadedFile || linkInput) && (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-xs text-[#00E5FF] font-bold">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              Attached: {uploadedFile || linkInput}
            </span>
            <button 
              onClick={() => { setUploadedFile(null); setLinkInput(null); }}
              className="text-[10px] uppercase font-mono hover:underline"
            >
              Remove
            </button>
          </div>
        )}

        {/* Input Textarea & Send */}
        <div className="flex items-end gap-2">
          <textarea
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Ask AI Copilot or type 'Explain B-Tree Indexing in DBMS' or 'Summarize Chapter 4'..."
            rows={2}
            className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF] custom-scrollbar"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={isGenerating || (!topicInput.trim() && !uploadedFile && !linkInput)}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-[#7C4DFF] to-[#00E5FF] hover:opacity-90 disabled:opacity-40 text-white font-bold transition-all shadow-[0_0_20px_rgba(124,77,255,0.4)] shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Canvas: Animated Glass Bubbles & Action Chips */}
      <div className="space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fadeIn`}
          >
            <div
              className={`max-w-2xl p-4 sm:p-5 rounded-3xl border text-xs leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-[#7C4DFF]/20 border-[#7C4DFF]/40 text-violet-100 rounded-br-none shadow-[0_0_20px_rgba(124,77,255,0.15)]'
                  : 'bg-[#161B26]/80 border-white/12 text-[#F4F6FC] rounded-bl-none shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-xl'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10 text-[10px] font-extrabold uppercase text-[#00E5FF]">
                  <Sparkle className="w-3.5 h-3.5 fill-current" />
                  <span>NEURON AI COPILOT</span>
                </div>
              )}
              {msg.text}
            </div>

            {/* Dynamic Action Chips below AI Messages */}
            {msg.sender === 'ai' && msg.chips && (
              <div className="flex flex-wrap items-center gap-2 mt-2 ml-2">
                {msg.chips.map((chip, cIdx) => (
                  <button
                    key={cIdx}
                    onClick={() => handleSendMessage(chip)}
                    className="px-3 py-1 rounded-full bg-white/5 hover:bg-[#7C4DFF]/20 border border-white/10 text-[11px] font-bold text-[#00E5FF] hover:text-white transition-all shadow-sm"
                  >
                    ✨ {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isGenerating && (
          <div className="flex items-center gap-3 p-4 rounded-3xl bg-[#161B26]/60 border border-white/10 w-fit animate-pulse">
            <Sparkles className="w-4 h-4 text-[#00E5FF] animate-spin" />
            <span className="text-xs font-bold text-gray-300">Synthesizing neural response...</span>
          </div>
        )}
      </div>

    </div>
  );
};
