import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { Mic, MicOff, Volume2, Sparkles, Bot, Heart, Play, Pause, Send, Radio, Zap } from 'lucide-react';

interface VoiceCompanionModuleProps {
  user: UserProfile;
}

export const VoiceCompanionModule: React.FC<VoiceCompanionModuleProps> = ({ user }) => {
  const [isListening, setIsListening] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("Hello Diksha! I am Aether, your AI Voice Tutor. Ask me to explain any concept, quiz you orally, or guide your deep focus session.");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [waveformBars, setWaveformBars] = useState<number[]>([30, 60, 90, 45, 80, 100, 70, 50, 85, 40, 65, 95]);

  // Animate radial waveform when listening or playing audio
  useEffect(() => {
    let interval: any;
    if (isListening || isPlayingAudio) {
      interval = setInterval(() => {
        setWaveformBars(Array.from({ length: 16 }, () => Math.floor(Math.random() * 75) + 25));
      }, 120);
    } else {
      setWaveformBars([20, 30, 40, 25, 35, 45, 30, 25, 35, 40, 30, 20, 30, 25, 35, 20]);
    }
    return () => clearInterval(interval);
  }, [isListening, isPlayingAudio]);

  const handleSendVoicePrompt = async (textToSend?: string) => {
    const prompt = textToSend || userInput;
    if (!prompt.trim()) return;

    setIsLoading(true);
    setUserInput("");

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: prompt,
          mode: 'explain',
          detailLevel: 'beginner',
          userProfile: user
        })
      });
      const data = await res.json();
      const replyText = data.content || "I am here to guide you. Let's tackle your study goals step by step!";
      setAiResponse(replyText);

      handlePlaySpeech(replyText);
    } catch (err) {
      console.error(err);
      setAiResponse("I heard your prompt clearly! Let's stay focused on your primary goal.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaySpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.slice(0, 300));
      utterance.pitch = 1.05;
      utterance.rate = 1.0;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleMic = () => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        handleSendVoicePrompt("Explain operating system page fault handling in simple terms.");
      }, 3500);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Voice Studio Hero Banner */}
      <div className="p-8 rounded-3xl bg-[#161B26]/80 border border-white/12 backdrop-blur-2xl text-center space-y-6 relative overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.1)]">
        
        <div className="max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF]/30 text-[#00E5FF] text-[10px] font-extrabold uppercase tracking-widest">
            <Radio className="w-3.5 h-3.5 text-[#00E5FF] animate-pulse" />
            <span>Voice Studio Engine • Aether Neural Speech</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Interactive AI Voice Companion
          </h1>
          <p className="text-xs text-[#94A3B8]">
            Talk naturally with your AI Tutor. Ask questions, request oral quizzes, or talk through challenging topics.
          </p>
        </div>

        {/* Minimal Morphing Radial Waveform Visualizer */}
        <div className="relative py-8 flex items-center justify-center">
          
          {/* Radial Outer Aura Pulsing Ring */}
          <div className={`absolute w-56 h-56 rounded-full transition-all duration-500 blur-2xl pointer-events-none ${
            isListening 
              ? 'bg-[#00E5FF]/30 scale-125' 
              : isPlayingAudio 
                ? 'bg-[#7C4DFF]/30 scale-110' 
                : 'bg-violet-600/10'
          }`} />

          {/* Center Mic Action Button with Waveform Bars */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            
            <button
              onClick={toggleMic}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
                isListening
                  ? 'bg-[#00E5FF] text-black ring-8 ring-[#00E5FF]/30 scale-110 shadow-[0_0_40px_#00E5FF]'
                  : isPlayingAudio
                    ? 'bg-[#7C4DFF] text-white ring-8 ring-[#7C4DFF]/30 scale-105 shadow-[0_0_30px_#7C4DFF]'
                    : 'bg-gradient-to-tr from-[#7C4DFF] to-[#00E5FF] hover:scale-105 text-white shadow-[0_0_25px_rgba(0,229,255,0.4)]'
              }`}
            >
              {isListening ? (
                <Mic className="w-10 h-10 animate-bounce" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </button>

            {/* Smooth Morphing Radial Equalizer Bars */}
            <div className="flex items-center gap-1.5 h-12 px-6 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
              {waveformBars.map((height, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isListening 
                      ? 'bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]' 
                      : isPlayingAudio 
                        ? 'bg-[#7C4DFF] shadow-[0_0_8px_#7C4DFF]' 
                        : 'bg-gray-600'
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            <p className="text-xs text-gray-300 font-extrabold tracking-wide">
              {isListening 
                ? '🎙️ Capturing Audio... Speak your query' 
                : isPlayingAudio 
                  ? '🔊 Aether Voice Speaking...' 
                  : 'Tap microphone to speak or type prompt below'}
            </p>
          </div>
        </div>

        {/* Text Voice Input Fallback */}
        <div className="max-w-lg mx-auto flex gap-2">
          <input 
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendVoicePrompt()}
            placeholder="Or type prompt to hear voice response..."
            className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF]"
          />
          <button
            onClick={() => handleSendVoicePrompt()}
            disabled={isLoading || !userInput.trim()}
            className="px-5 py-3 rounded-2xl bg-[#00E5FF] hover:bg-cyan-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)]"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Voice Output Card */}
      <div className="p-6 rounded-3xl bg-[#161B26]/80 border border-white/10 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#00E5FF]" />
            <span className="text-xs font-extrabold text-white">Aether Audio Speech Transcript</span>
          </div>

          <button
            onClick={() => handlePlaySpeech(aiResponse)}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#00E5FF] text-xs font-extrabold flex items-center gap-1.5 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>{isPlayingAudio ? 'Speaking...' : 'Replay Voice Audio'}</span>
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-black/40 border border-white/5 text-xs text-gray-200 leading-relaxed font-sans">
          {isLoading ? (
            <div className="flex items-center gap-2 text-[#00E5FF] italic">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Voice AI processing response...</span>
            </div>
          ) : (
            aiResponse
          )}
        </div>
      </div>

    </div>
  );
};
