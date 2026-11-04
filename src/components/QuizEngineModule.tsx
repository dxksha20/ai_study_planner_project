import React, { useState } from 'react';
import { UserProfile, QuizData } from '../types';
import { Gamepad2, Sparkles, CheckCircle, XCircle, Award, RefreshCw, Trophy, Coins, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizEngineModuleProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  quiz: QuizData;
}

export const QuizEngineModule: React.FC<QuizEngineModuleProps> = ({ user, setUser, quiz }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: any }>({});
  const [textInput, setTextInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = quiz.questions[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQ.id]: optIdx });
  };

  const handleTextChange = (val: string) => {
    if (isSubmitted) return;
    setTextInput(val);
    setSelectedAnswers({ ...selectedAnswers, [currentQ.id]: val });
  };

  const handleFinishQuiz = () => {
    let calculatedScore = 0;
    quiz.questions.forEach((q) => {
      const ans = selectedAnswers[q.id];
      if (q.type === 'mcq' || q.type === 'true_false') {
        if (ans === q.correctIndex) calculatedScore += 1;
      } else if (q.type === 'fill_blank' || q.type === 'coding') {
        if (typeof ans === 'string' && ans.trim().toLowerCase() === q.correctAnswer?.toLowerCase()) {
          calculatedScore += 1;
        }
      }
    });

    setScore(calculatedScore);
    setIsSubmitted(true);

    // Award XP & Coins if user performed well
    if (calculatedScore >= 2) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setUser(prev => ({
        ...prev,
        xp: prev.xp + quiz.totalXp,
        coins: prev.coins + quiz.totalCoins,
        streakDays: prev.streakDays + 1
      }));
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setTextInput("");
    setIsSubmitted(false);
    setScore(0);
  };

  return (
    <div className="space-y-6">
      
      {/* Quiz Header */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Gamepad2 className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-extrabold text-slate-100">{quiz.title}</h1>
          </div>
          <p className="text-xs text-slate-400">Nightly Spaced Recall • {quiz.questions.length} Adaptive Questions</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center gap-1">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>+{quiz.totalXp} XP</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold flex items-center gap-1">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span>+{quiz.totalCoins} Coins</span>
          </div>
        </div>
      </div>

      {/* Main Quiz Board */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        
        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto animate-bounce" />
            <h2 className="text-2xl font-extrabold text-white">Quiz Completed!</h2>
            <p className="text-sm text-slate-300">
              You scored <span className="font-bold text-emerald-400">{score}</span> out of <span className="font-bold text-white">{quiz.questions.length}</span>!
            </p>
            <p className="text-xs text-indigo-300">
              +{quiz.totalXp} XP and +{quiz.totalCoins} Coins added to your Learning OS profile!
            </p>
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors"
            >
              Try Another Quiz
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Question Progress Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Question {currentIdx + 1} of {quiz.questions.length}</span>
              <span className="uppercase font-bold text-cyan-400">Type: {currentQ.type}</span>
            </div>

            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-400 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-100 leading-relaxed">
                {currentQ.question}
              </h3>

              {(currentQ.type === 'mcq' || currentQ.type === 'true_false') && (
                <div className="space-y-2.5">
                  {currentQ.options?.map((opt, idx) => {
                    const isSel = selectedAnswers[currentQ.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full p-3.5 rounded-2xl border text-left text-xs font-medium transition-all ${
                          isSel
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="font-bold mr-2 text-cyan-400">{String.fromCharCode(65 + idx)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {(currentQ.type === 'fill_blank' || currentQ.type === 'coding') && (
                <div>
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder="Type your answer or keyword..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-40 text-slate-300 text-xs font-bold"
              >
                Previous
              </button>

              {currentIdx < quiz.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx(currentIdx + 1)}
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleFinishQuiz}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30"
                >
                  Submit Quiz & Earn XP
                </button>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
