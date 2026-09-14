import React, { useState, useEffect } from 'react';
import { Video, Mic, CheckCircle2, Award, ChevronRight, RefreshCw, X, Sparkles, HelpCircle } from 'lucide-react';
import { interviewCoach } from '../services/interviewCoach';
import { useGamification } from '../contexts/GamificationContext';

export default function InterviewSimulator({ onClose, darkMode }) {
    const { addPoints } = useGamification();

    const [role, setRole] = useState('Software Engineer');
    const [mode, setMode] = useState('interactive'); // 'interactive' or 'guide'
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [evaluations, setEvaluations] = useState([]);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [guideText, setGuideText] = useState('');
    const [loadingGuide, setLoadingGuide] = useState(false);

    // Keyboard Escape key listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && onClose) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const startInteractiveSession = () => {
        const qList = interviewCoach.getMockQuestionsForRole(role);
        setQuestions(qList);
        setCurrentIdx(0);
        setUserAnswer('');
        setEvaluations([]);
        setSessionComplete(false);
    };

    const handleAnswerSubmit = () => {
        if (!userAnswer.trim()) return alert('Please type your response before submitting.');

        setIsEvaluating(true);
        const currentQ = questions[currentIdx];
        const res = interviewCoach.evaluateAnswerLocally(currentQ.question, userAnswer);

        const newEval = {
            question: currentQ.question,
            answer: userAnswer,
            score: res.score,
            starFeedback: res.starFeedback,
            improvements: res.improvements
        };

        const updatedEvals = [...evaluations, newEval];
        setEvaluations(updatedEvals);
        setUserAnswer('');
        setIsEvaluating(false);

        if (currentIdx + 1 < questions.length) {
            setCurrentIdx(currentIdx + 1);
        } else {
            setSessionComplete(true);
            if (addPoints) addPoints(100, 'Completed AI Mock Interview Session');
        }
    };

    const handleGenerateGuide = async () => {
        setLoadingGuide(true);
        const guide = await interviewCoach.generateInterviewGuide(role);
        setGuideText(guide);
        setLoadingGuide(false);
    };

    const overallAverageScore = evaluations.length
        ? Math.round(evaluations.reduce((acc, curr) => acc + curr.score, 0) / evaluations.length)
        : 0;

    return (
        <div 
            role="dialog"
            aria-modal="true"
            aria-label="AI Interview Simulator"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-in"
        >
            <div className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-6 border transition-all ${
                darkMode ? 'bg-[#121215] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'
            }`}>
                {/* Header */}
                <div className={`flex justify-between items-center pb-4 border-b mb-6 ${
                    darkMode ? 'border-zinc-800' : 'border-zinc-200'
                }`}>
                    <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl border ${
                            darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-black text-white border-zinc-800'
                        }`}>
                            <Video className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold tracking-tight">AI Interview Simulator & Coach</h3>
                            <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Practice live technical & behavioral interview questions with real-time feedback</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className={`p-2 rounded-xl border transition-all btn-interactive ${
                            darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black'
                        }`}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Mode Selector & Role Input */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Target Role (e.g. Software Engineer, Data Analyst)"
                        className={`flex-1 p-3 rounded-xl border font-medium text-sm outline-none transition-all ${
                            darkMode 
                                ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-400' 
                                : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-black'
                        }`}
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => { setMode('interactive'); if (!questions.length) startInteractiveSession(); }}
                            className={`px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 btn-interactive border ${
                                mode === 'interactive' 
                                    ? darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black' 
                                    : darkMode ? 'bg-zinc-900 text-zinc-400 border-zinc-800' : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                            }`}
                        >
                            <Mic className="w-4 h-4" />
                            <span>Live Mock Interview</span>
                        </button>
                        <button
                            onClick={() => { setMode('guide'); if (!guideText) handleGenerateGuide(); }}
                            className={`px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 btn-interactive border ${
                                mode === 'guide' 
                                    ? darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black' 
                                    : darkMode ? 'bg-zinc-900 text-zinc-400 border-zinc-800' : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                            }`}
                        >
                            <HelpCircle className="w-4 h-4" />
                            <span>Prep Guide</span>
                        </button>
                    </div>
                </div>

                {/* Interactive Mode View */}
                {mode === 'interactive' && (
                    <div className="space-y-6">
                        {!questions.length ? (
                            <div className={`text-center py-12 space-y-4 rounded-2xl border ${
                                darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                            }`}>
                                <Video className={`w-14 h-14 mx-auto ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`} />
                                <h4 className="text-xl font-bold">Ready to Start Your Mock Interview?</h4>
                                <p className={`max-w-md mx-auto text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                    Answer 3 role-specific questions for <span className="font-bold underline">{role}</span> to earn +100 Gamification XP!
                                </p>
                                <button
                                    onClick={startInteractiveSession}
                                    className={`px-8 py-3 font-bold rounded-xl text-sm transition-all btn-interactive ${
                                        darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                                    }`}
                                >
                                    Start Mock Interview Now
                                </button>
                            </div>
                        ) : !sessionComplete ? (
                            <div className="space-y-6">
                                {/* Question Card */}
                                <div className={`p-6 rounded-2xl border ${
                                    darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                                }`}>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                                            darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                                        }`}>
                                            Question {currentIdx + 1} of {questions.length} • {questions[currentIdx]?.type}
                                        </span>
                                        <span className={`text-xs font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Role: {role}</span>
                                    </div>
                                    <h4 className="text-base font-bold leading-snug">{questions[currentIdx]?.question}</h4>
                                </div>

                                {/* Answer Input */}
                                <div className="space-y-3">
                                    <label className={`block text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                        Your Response (STAR Method Recommended)
                                    </label>
                                    <textarea
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        rows={5}
                                        className={`w-full p-4 rounded-xl border text-sm leading-relaxed outline-none transition-all ${
                                            darkMode 
                                                ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-400' 
                                                : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-black'
                                        }`}
                                        placeholder="Type your answer here... (Situation -> Task -> Action -> Result)"
                                    />
                                    <div className="flex justify-between items-center">
                                        <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                            Word count: {userAnswer.trim() ? userAnswer.trim().split(/\s+/).length : 0} words
                                        </p>
                                        <button
                                            onClick={handleAnswerSubmit}
                                            disabled={isEvaluating}
                                            className={`px-6 py-2.5 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all btn-interactive ${
                                                darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                                            }`}
                                        >
                                            <span>{currentIdx + 1 === questions.length ? 'Finish & View Score' : 'Next Question'}</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Session Completed Score Breakdown */
                            <div className="space-y-6 py-4 animate-fade-in">
                                <div className={`text-center p-6 border rounded-3xl ${
                                    darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-900 text-white border-black'
                                }`}>
                                    <Award className="w-10 h-10 mx-auto mb-2 text-zinc-200" />
                                    <h4 className="text-xl font-bold">Mock Interview Completed</h4>
                                    <p className="text-zinc-400 text-xs mt-1">+100 Gamification XP added to your student profile</p>
                                    <div className="mt-4 inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-xl text-2xl font-black border border-white/20">
                                        Overall Score: {overallAverageScore}/100
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h5 className="font-bold text-base">Question Feedback & Breakdown</h5>
                                    {evaluations.map((item, idx) => (
                                        <div key={idx} className={`p-5 rounded-2xl border ${
                                            darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                                        }`}>
                                            <div className="flex justify-between items-start mb-2">
                                                <h6 className="font-bold text-sm">Q{idx + 1}: {item.question}</h6>
                                                <span className={`px-3 py-1 font-bold text-xs rounded-full border ${
                                                    darkMode ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-zinc-200 text-black border-zinc-300'
                                                }`}>
                                                    Score: {item.score}/100
                                                </span>
                                            </div>
                                            <p className={`text-xs italic mb-3 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>"{item.answer}"</p>
                                            <div className="space-y-1 text-xs">
                                                {item.starFeedback.map((fb, fIdx) => (
                                                    <p key={fIdx} className={`flex items-center gap-1.5 font-medium ${
                                                        darkMode ? 'text-zinc-300' : 'text-zinc-800'
                                                    }`}>
                                                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                                                        <span>{fb}</span>
                                                    </p>
                                                ))}
                                                {item.improvements.map((imp, iIdx) => (
                                                    <p key={iIdx} className={`flex items-center gap-1.5 font-medium ${
                                                        darkMode ? 'text-zinc-400' : 'text-zinc-600'
                                                    }`}>
                                                        <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                                                        <span>{imp}</span>
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={startInteractiveSession}
                                    className={`w-full py-3.5 border font-bold rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all btn-interactive ${
                                        darkMode 
                                            ? 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800' 
                                            : 'bg-zinc-100 border-zinc-300 text-black hover:bg-zinc-200'
                                    }`}
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    <span>Retake Mock Interview</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Guide Mode View */}
                {mode === 'guide' && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-base">Interview Preparation Guide for {role}</h4>
                            <button
                                onClick={handleGenerateGuide}
                                disabled={loadingGuide}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold btn-interactive ${
                                    darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                                }`}
                            >
                                {loadingGuide ? 'Generating Guide...' : 'Refresh Guide'}
                            </button>
                        </div>
                        <div className={`p-5 rounded-2xl border text-xs leading-relaxed whitespace-pre-wrap font-mono ${
                            darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                        }`}>
                            {guideText || interviewCoach.getFallbackResponse()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

