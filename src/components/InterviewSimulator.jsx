import React, { useState } from 'react';
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
            // Award +100 XP for completing mock interview session!
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2.5 rounded-xl text-white">
                            <Video className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">AI Interview Simulator & Coach</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Practice live technical & behavioral interview questions with real-time feedback</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Mode Selector & Role Input */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Target Role (e.g. Software Engineer, Data Analyst)"
                        className={`flex-1 p-3 rounded-xl border font-medium ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`}
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => { setMode('interactive'); if (!questions.length) startInteractiveSession(); }}
                            className={`px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${mode === 'interactive' ? 'bg-indigo-600 text-white shadow-md' : 'border border-gray-300 dark:border-gray-600'}`}
                        >
                            <Mic className="w-4 h-4" />
                            <span>Live Mock Interview</span>
                        </button>
                        <button
                            onClick={() => { setMode('guide'); if (!guideText) handleGenerateGuide(); }}
                            className={`px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${mode === 'guide' ? 'bg-purple-600 text-white shadow-md' : 'border border-gray-300 dark:border-gray-600'}`}
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
                            <div className="text-center py-12 space-y-4">
                                <Video className="w-16 h-16 mx-auto text-indigo-500 opacity-80" />
                                <h4 className="text-xl font-bold">Ready to Start Your Mock Interview?</h4>
                                <p className="text-gray-500 max-w-md mx-auto text-sm">
                                    Answer 3 role-specific questions for <span className="font-semibold text-indigo-600 dark:text-indigo-400">{role}</span> to earn +100 Gamification XP!
                                </p>
                                <button
                                    onClick={startInteractiveSession}
                                    className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg transition-all"
                                >
                                    Start Mock Interview Now
                                </button>
                            </div>
                        ) : !sessionComplete ? (
                            <div className="space-y-6">
                                {/* Question Card */}
                                <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-indigo-50/60 border-indigo-100'}`}>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-indigo-600 text-white rounded-full">
                                            Question {currentIdx + 1} of {questions.length} • {questions[currentIdx]?.type}
                                        </span>
                                        <span className="text-xs font-semibold text-gray-500">Role: {role}</span>
                                    </div>
                                    <h4 className="text-lg font-bold leading-snug">{questions[currentIdx]?.question}</h4>
                                </div>

                                {/* Answer Input */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-semibold">Your Response (STAR Method Recommended)</label>
                                    <textarea
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        rows={6}
                                        className={`w-full p-4 rounded-xl border text-sm leading-relaxed ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`}
                                        placeholder="Type your answer here... (Situation -> Task -> Action -> Result)"
                                    />
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs text-gray-400">Word count: {userAnswer.trim() ? userAnswer.trim().split(/\s+/).length : 0} words</p>
                                        <button
                                            onClick={handleAnswerSubmit}
                                            disabled={isEvaluating}
                                            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-md flex items-center gap-2 hover:scale-105 transition-all"
                                        >
                                            <span>{currentIdx + 1 === questions.length ? 'Finish & View Score' : 'Next Question'}</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Session Completed Score Breakdown */
                            <div className="space-y-6 py-4 animate-fadeIn">
                                <div className="text-center p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl shadow-xl">
                                    <Award className="w-12 h-12 mx-auto mb-2 text-yellow-300" />
                                    <h4 className="text-2xl font-extrabold">Mock Interview Completed!</h4>
                                    <p className="text-indigo-100 text-sm mt-1">You earned +100 Gamification XP!</p>
                                    <div className="mt-4 inline-block px-6 py-2 bg-white/20 backdrop-blur-md rounded-2xl text-3xl font-black">
                                        Overall Score: {overallAverageScore}/100
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h5 className="font-bold text-lg">Question Feedback & Breakdown</h5>
                                    {evaluations.map((item, idx) => (
                                        <div key={idx} className={`p-5 rounded-2xl border ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                                            <div className="flex justify-between items-start mb-2">
                                                <h6 className="font-bold text-indigo-600 dark:text-indigo-400">Q{idx + 1}: {item.question}</h6>
                                                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold text-xs rounded-full">
                                                    Score: {item.score}/100
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 italic mb-3">" {item.answer} "</p>
                                            <div className="space-y-1 text-xs">
                                                {item.starFeedback.map((fb, fIdx) => (
                                                    <p key={fIdx} className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
                                                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                                                        <span>{fb}</span>
                                                    </p>
                                                ))}
                                                {item.improvements.map((imp, iIdx) => (
                                                    <p key={iIdx} className="text-amber-600 dark:text-amber-400 flex items-center gap-1.5 font-medium">
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
                                    className="w-full py-3.5 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all"
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
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-lg">Interview Preparation Guide for {role}</h4>
                            <button
                                onClick={handleGenerateGuide}
                                disabled={loadingGuide}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold"
                            >
                                {loadingGuide ? 'Generating Guide...' : 'Refresh Guide'}
                            </button>
                        </div>
                        <div className={`p-5 rounded-2xl border text-sm leading-relaxed whitespace-pre-wrap ${darkMode ? 'bg-gray-900/80 border-gray-700 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-800'}`}>
                            {guideText || interviewCoach.getFallbackResponse()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

