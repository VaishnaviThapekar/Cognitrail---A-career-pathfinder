import React, { useState, useEffect } from 'react';
import { X, Sparkles, Brain, CheckCircle2, ChevronRight, HelpCircle, Award, RotateCcw, ThumbsUp, Lightbulb } from 'lucide-react';

const INTERVIEW_QUESTIONS = {
  engineering: [
    {
      id: 1,
      domain: "Engineering & AI",
      role: "Software & AI Engineer",
      question: "Explain the difference between supervised, unsupervised, and reinforcement learning with real-world examples.",
      hint: "Focus on data labeling: labeled dataset vs unlabeled clustering vs reward-based environment feedback.",
      benchmarkAnswer: "Supervised learning uses labeled inputs (e.g., spam detection). Unsupervised learning discovers hidden patterns in unlabeled data (e.g., customer segmentation via K-Means). Reinforcement learning trains agents using reward penalties via trail-and-error (e.g., AlphaGo or autonomous driving)."
    },
    {
      id: 2,
      domain: "Engineering & AI",
      role: "System Architect",
      question: "How would you design a scalable microservices architecture to handle 100,000 requests per second?",
      hint: "Discuss load balancing, caching (Redis), asynchronous queues (Kafka), and database sharding.",
      benchmarkAnswer: "Use NGINX/ALB load balancers, horizontal scaling of stateless containerized services, multi-layer caching with Redis, Kafka queues for event decoupling, and read-replicas with DB sharding."
    }
  ],
  medical: [
    {
      id: 3,
      domain: "Medical & Healthcare",
      role: "Clinical Specialist / Doctor",
      question: "Walk through the primary triage protocol for acute chest pain presented in an emergency department.",
      hint: "Recall ABCDEs: Airway, Breathing, Circulation, ECG within 10 mins, cardiac biomarkers (Troponin-I).",
      benchmarkAnswer: "Immediate ABC triage, high-flow oxygen if hypoxic, 12-lead ECG within 10 minutes to rule out STEMI, sublingual nitroglycerin, aspirin, and STAT cardiac enzyme panel (Troponin I/T)."
    }
  ],
  management: [
    {
      id: 4,
      domain: "Management & Business",
      role: "Product Manager / Consultant",
      question: "How do you prioritize product feature backlogs when engineering capacity is constrained?",
      hint: "Reference RICE scoring model (Reach, Impact, Confidence, Effort) or MoSCoW framework.",
      benchmarkAnswer: "Apply the RICE scoring model (Reach × Impact × Confidence / Effort). Validate high-impact user problems against strategic OKRs while keeping tech debt manageable."
    }
  ],
  law: [
    {
      id: 5,
      domain: "Law & Governance",
      role: "Corporate Attorney",
      question: "What key clauses must be included in a cross-border M&A Non-Disclosure Agreement (NDA)?",
      hint: "Consider definition of confidential info, standstill agreements, governing law, and non-solicitation.",
      benchmarkAnswer: "Definitions of Confidential Information, exclusions, 2-3 year term limit, non-solicitation of key personnel, governing jurisdiction/arbitration forum, and remedies for breach."
    }
  ],
  design: [
    {
      id: 6,
      domain: "Design & Arts",
      role: "Senior UI/UX Product Designer",
      question: "How do you evaluate accessibility (WCAG 2.1 AA) when designing dark mode interfaces?",
      hint: "Contrast ratio minimums (4.5:1 text), avoiding pure black (#000000) backgrounds, and focus state indicators.",
      benchmarkAnswer: "Maintain a minimum 4.5:1 contrast ratio for normal text, use dark slate surfaces (#09090B or #0A1E3F) rather than pitch black, ensure distinct focus ring outlines, and avoid using color as the sole status indicator."
    }
  ]
};

const AIMockInterviewModal = ({ darkMode, onClose }) => {
  const [activeStream, setActiveStream] = useState('engineering');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const currentQuestions = INTERVIEW_QUESTIONS[activeStream] || INTERVIEW_QUESTIONS.engineering;
  const currentQ = currentQuestions[currentIndex] || currentQuestions[0];

  const handleNext = () => {
    setShowHint(false);
    setShowAnswer(false);
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleAssess = (score) => {
    setUserScore(prev => prev + score);
    setCompletedCount(prev => prev + 1);
    handleNext();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="AI Technical & Behavioral Mock Interview Simulator"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto"
    >
      <div
        className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden transition-all my-8 ${
          darkMode
            ? 'bg-gradient-to-b from-[#0A1E3F] via-[#071326] to-[#051C3E] border-[#003B73] text-white'
            : 'bg-white border-[#BACDDF] text-[#051C3E]'
        }`}
      >
        {/* Header */}
        <div className={`p-6 border-b flex items-center justify-between ${
          darkMode ? 'border-[#003B73] bg-[#0A1E3F]/80' : 'border-[#BACDDF] bg-[#EBF3FA]/50'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#003B73] to-[#0265A6] flex items-center justify-center text-white shadow-md">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                <span>AI Technical & Behavioral Mock Interview</span>
                <Sparkles className="w-4 h-4 text-[#0265A6]" />
              </h2>
              <p className={`text-xs font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Practice high-yield technical interview questions with benchmark answers
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                darkMode ? 'hover:bg-[#003B73] text-zinc-300' : 'hover:bg-[#BACDDF]/40 text-zinc-600'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Stream Selector */}
        <div className="p-4 border-b border-[#003B73]/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'engineering', label: 'Engineering & AI', icon: '💻' },
            { id: 'medical', label: 'Medical & Health', icon: '🔬' },
            { id: 'management', label: 'Management & MBA', icon: '💼' },
            { id: 'law', label: 'Law & Corporate', icon: '⚖️' },
            { id: 'design', label: 'Design & Product', icon: '🎨' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveStream(tab.id);
                setCurrentIndex(0);
                setShowHint(false);
                setShowAnswer(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeStream === tab.id
                  ? 'bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-md scale-105'
                  : darkMode
                    ? 'bg-[#071326] border border-[#003B73] text-zinc-300 hover:text-white'
                    : 'bg-[#EBF3FA] border border-[#BACDDF] text-[#0265A6] hover:bg-[#0265A6] hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Interview Flashcard Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
              darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#6096BA]' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6]'
            }`}>
              Target Role: {currentQ.role}
            </span>
            <span className="text-xs font-bold text-zinc-400">
              Question {currentIndex + 1} of {currentQuestions.length}
            </span>
          </div>

          <div className={`p-6 rounded-3xl border ${
            darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA]/50 border-[#BACDDF]'
          }`}>
            <h3 className={`text-lg sm:text-xl font-black leading-snug mb-4 ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
              "{currentQ.question}"
            </h3>

            {/* Hint Box */}
            {showHint && (
              <div className={`p-4 rounded-2xl border text-xs mb-4 animate-fade-in ${
                darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}>
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Interview Hint:</span>
                </div>
                <p className="leading-relaxed">{currentQ.hint}</p>
              </div>
            )}

            {/* Model Answer Box */}
            {showAnswer && (
              <div className={`p-4 rounded-2xl border text-xs mb-4 animate-fade-in ${
                darkMode ? 'bg-[#0A1E3F] border-[#0265A6] text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                <div className="flex items-center gap-1.5 font-bold mb-1 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Benchmark Answer:</span>
                </div>
                <p className="leading-relaxed">{currentQ.benchmarkAnswer}</p>
              </div>
            )}

            {/* Action Toggles */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border btn-interactive flex items-center gap-1.5 cursor-pointer ${
                  darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
              </button>

              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border btn-interactive flex items-center gap-1.5 cursor-pointer ${
                  darkMode ? 'bg-[#0A1E3F] border-[#0265A6] text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>{showAnswer ? 'Hide Benchmark' : 'Reveal Benchmark'}</span>
              </button>
            </div>
          </div>

          {/* Self-Rating Assessment */}
          <div className={`p-5 rounded-2xl border text-center ${
            darkMode ? 'bg-[#0A1E3F]/60 border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF]'
          }`}>
            <span className="text-xs font-bold block mb-3 text-zinc-400">
              Rate your confidence level on this question:
            </span>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => handleAssess(1)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30 cursor-pointer"
              >
                Needs Review (+1)
              </button>
              <button
                onClick={() => handleAssess(3)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 cursor-pointer"
              >
                Moderate (+3)
              </button>
              <button
                onClick={() => handleAssess(5)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 cursor-pointer"
              >
                Mastered (+5)
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 sm:p-5 border-t flex items-center justify-between text-xs ${
          darkMode ? 'border-[#003B73] bg-[#0A1E3F]/80 text-zinc-400' : 'border-[#BACDDF] bg-[#EBF3FA]/50 text-zinc-600'
        }`}>
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-[#0265A6]" />
            <span>Practice Score: <strong>{userScore} pts</strong> ({completedCount} questions attempted)</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl font-bold btn-interactive bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-md cursor-pointer"
            >
              Done Practice
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIMockInterviewModal;
