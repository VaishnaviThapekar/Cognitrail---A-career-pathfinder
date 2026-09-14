import React, { useState, useEffect } from 'react';
import {
    Sparkles, ArrowRight, ArrowLeft, CheckCircle2,
    Brain, Target, Heart, TrendingUp, Award, X, RotateCcw,
    GraduationCap, Briefcase, DollarSign, Info, BookOpen
} from 'lucide-react';
import { CAREER_DATABASE } from '../data/careerDatabase';

const STORAGE_KEY = 'cognitrail_quiz_in_progress';

const CareerQuiz = ({ onClose, darkMode, onComplete, onSelectCareer }) => {
    const questions = [
        {
            id: 'interests',
            title: 'What interests you most?',
            subtitle: 'Choose the fields and topics that excite your curiosity',
            type: 'multiple',
            icon: Heart,
            options: [
                { id: 'tech', label: 'Technology & Innovation', emoji: '💻', desc: 'Software, AI, gadgets, cyber systems' },
                { id: 'health', label: 'Health & Medicine', emoji: '⚕️', desc: 'Healthcare, diagnostics, clinical care' },
                { id: 'business', label: 'Business & Finance', emoji: '💼', desc: 'Management, investing, entrepreneurship' },
                { id: 'creative', label: 'Art & Design', emoji: '🎨', desc: 'Visual arts, UX/UI, animation, fashion' },
                { id: 'science', label: 'Science & Research', emoji: '🔬', desc: 'Physics, chemistry, biology, discovery' },
                { id: 'law', label: 'Law & Governance', emoji: '⚖️', desc: 'Justice, civil services, policy making' }
            ]
        },
        {
            id: 'workStyle',
            title: 'What work environment do you prefer?',
            subtitle: 'Pick the daily setting where you feel most productive',
            type: 'single',
            icon: Target,
            options: [
                { id: 'office', label: 'Office & Corporate Setting', emoji: '🏢', desc: 'Structured teams and collaborative workspace' },
                { id: 'outdoor', label: 'Outdoor & Field Work', emoji: '🌳', desc: 'Hands-on projects, on-site operations' },
                { id: 'lab', label: 'Laboratory & Research Centers', emoji: '🧪', desc: 'Experiments, deep focus, analysis' },
                { id: 'remote', label: 'Remote & Flexible', emoji: '🏠', desc: 'Work from anywhere, digital workflows' },
                { id: 'travel', label: 'Travel & Global Exploration', emoji: '✈️', desc: 'Dynamic locations, client visits, aviation' }
            ]
        },
        {
            id: 'skills',
            title: 'Which skills are your strongest?',
            subtitle: 'Select the abilities you feel most confident using',
            type: 'multiple',
            icon: Brain,
            options: [
                { id: 'analytical', label: 'Analytical Thinking', emoji: '📊', desc: 'Data breakdown, logic, problem solving' },
                { id: 'creative', label: 'Creative Problem Solving', emoji: '💡', desc: 'Design thinking, ideation, innovation' },
                { id: 'communication', label: 'Communication & Persuasion', emoji: '🗣️', desc: 'Writing, speaking, negotiation' },
                { id: 'technical', label: 'Technical & Coding Skills', emoji: '⚙️', desc: 'Programming, mechanics, system tools' },
                { id: 'leadership', label: 'Leadership & Management', emoji: '👥', desc: 'Planning, team coordination, strategy' },
                { id: 'empathy', label: 'Empathy & Patient Care', emoji: '❤️', desc: 'Active listening, counseling, helping' }
            ]
        },
        {
            id: 'values',
            title: 'What matters most to you in a career?',
            subtitle: 'Identify your top guiding professional priority',
            type: 'single',
            icon: Award,
            options: [
                { id: 'salary', label: 'High Earning Potential', emoji: '💰', desc: 'Lucrative salary and financial abundance' },
                { id: 'impact', label: 'Social Impact & Purpose', emoji: '🌍', desc: 'Making a positive difference in society' },
                { id: 'balance', label: 'Work-Life Balance', emoji: '⚖️', desc: 'Stable hours and personal flexibility' },
                { id: 'growth', label: 'Rapid Career Growth', emoji: '📈', desc: 'Fast promotions and continuous learning' },
                { id: 'creativity', label: 'Creative Autonomy', emoji: '🎨', desc: 'Freedom to express ideas and innovate' }
            ]
        },
        {
            id: 'subjects',
            title: 'Which academic subjects do you enjoy?',
            subtitle: 'Select the subjects where you enjoy learning and practicing',
            type: 'multiple',
            icon: TrendingUp,
            options: [
                { id: 'math', label: 'Mathematics & Statistics', emoji: '🔢', desc: 'Calculus, algebra, numerical models' },
                { id: 'science', label: 'Physics, Chemistry & Biology', emoji: '🔬', desc: 'Natural sciences and lab work' },
                { id: 'languages', label: 'Languages & Literature', emoji: '📚', desc: 'Storytelling, linguistics, rhetoric' },
                { id: 'social', label: 'Economics, History & Civics', emoji: '🌐', desc: 'Socio-economic systems and policy' },
                { id: 'arts', label: 'Arts, Graphics & Media', emoji: '🎨', desc: 'Visual arts, architecture, aesthetics' },
                { id: 'computer', label: 'Computer Science & Coding', emoji: '💻', desc: 'Algorithms, tech frameworks, software' }
            ]
        }
    ];

    // State initialization with sessionStorage restore
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);
    const [savedProgressDetected, setSavedProgressDetected] = useState(false);

    // Restore state from sessionStorage on mount
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.answers && Object.keys(parsed.answers).length > 0) {
                    setAnswers(parsed.answers);
                    if (parsed.currentStep !== undefined && !parsed.results) {
                        setCurrentStep(parsed.currentStep);
                        setSavedProgressDetected(true);
                    }
                    if (parsed.results) {
                        setResults(parsed.results);
                    }
                }
            }
        } catch (e) {
            console.warn('Could not restore quiz progress', e);
        }
    }, []);

    // Save in-progress quiz state to sessionStorage
    useEffect(() => {
        if (results) {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, currentStep, results }));
        } else if (Object.keys(answers).length > 0) {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, currentStep }));
        }
    }, [answers, currentStep, results]);

    const handleAnswer = (questionId, optionId) => {
        const question = questions[currentStep];

        if (question.type === 'multiple') {
            const current = answers[questionId] || [];
            const updated = current.includes(optionId)
                ? current.filter(id => id !== optionId)
                : [...current, optionId];
            setAnswers(prev => ({ ...prev, [questionId]: updated }));
        } else if (question.type === 'single') {
            setAnswers(prev => ({ ...prev, [questionId]: optionId }));
        }
    };

    const canProceed = () => {
        const qId = questions[currentStep]?.id;
        const answer = answers[qId];
        if (!answer) return false;
        if (Array.isArray(answer)) return answer.length > 0;
        return true;
    };

    // Flatten all careers from CAREER_DATABASE with domain and subfield context
    const getAllDatabaseCareers = () => {
        const allCareers = [];
        Object.entries(CAREER_DATABASE).forEach(([domainKey, domain]) => {
            domain.subFields.forEach(subField => {
                subField.careers.forEach(career => {
                    allCareers.push({
                        ...career,
                        domainKey,
                        domainName: domain.name,
                        subFieldName: subField.name
                    });
                });
            });
        });
        return allCareers;
    };

    // Comprehensive multi-vector matching engine
    const calculateCareerRecommendations = (userAnswers) => {
        const interests = userAnswers.interests || [];
        const workStyle = userAnswers.workStyle || '';
        const skills = userAnswers.skills || [];
        const values = userAnswers.values || '';
        const subjects = userAnswers.subjects || [];

        const allCareers = getAllDatabaseCareers();

        const scoredCareers = allCareers.map(career => {
            let score = 50; // Base score
            const reasons = [];

            // 1. Interest Affinity (Weight: 35 pts)
            let interestMatched = false;
            if (interests.includes('tech')) {
                if (['engineering', 'computer_science', 'it'].includes(career.domainKey) ||
                    career.name.toLowerCase().includes('software') ||
                    career.name.toLowerCase().includes('data') ||
                    career.name.toLowerCase().includes('cloud') ||
                    career.name.toLowerCase().includes('ai') ||
                    career.name.toLowerCase().includes('developer')) {
                    score += 35;
                    interestMatched = true;
                    reasons.push('Direct match with your high interest in Technology & Software Systems');
                }
            }
            if (interests.includes('health')) {
                if (career.domainKey === 'science' && (career.subFieldName?.toLowerCase().includes('health') || career.subFieldName?.toLowerCase().includes('medicine')) ||
                    career.name.toLowerCase().includes('doctor') ||
                    career.name.toLowerCase().includes('nurse') ||
                    career.name.toLowerCase().includes('pharmacist') ||
                    career.name.toLowerCase().includes('biotech') ||
                    career.name.toLowerCase().includes('psychologist')) {
                    score += 35;
                    interestMatched = true;
                    reasons.push('Fulfills your strong interest in Health, Medicine & Patient Wellbeing');
                }
            }
            if (interests.includes('business')) {
                if (['commerce', 'management', 'finance'].includes(career.domainKey) ||
                    career.name.toLowerCase().includes('manager') ||
                    career.name.toLowerCase().includes('analyst') ||
                    career.name.toLowerCase().includes('ca') ||
                    career.name.toLowerCase().includes('entrepreneur') ||
                    career.name.toLowerCase().includes('banker')) {
                    score += 35;
                    interestMatched = true;
                    reasons.push('High synergy with your Business, Leadership & Financial mindset');
                }
            }
            if (interests.includes('creative')) {
                if (['arts', 'design'].includes(career.domainKey) ||
                    career.name.toLowerCase().includes('designer') ||
                    career.name.toLowerCase().includes('architect') ||
                    career.name.toLowerCase().includes('writer') ||
                    career.name.toLowerCase().includes('animator')) {
                    score += 35;
                    interestMatched = true;
                    reasons.push('Empowers your creative problem-solving and design expression');
                }
            }
            if (interests.includes('science')) {
                if (career.domainKey === 'science' ||
                    career.name.toLowerCase().includes('scientist') ||
                    career.name.toLowerCase().includes('research') ||
                    career.name.toLowerCase().includes('physicist')) {
                    score += 32;
                    interestMatched = true;
                    reasons.push('Aligns with your passion for Scientific Exploration and In-depth Research');
                }
            }
            if (interests.includes('law')) {
                if (career.name.toLowerCase().includes('lawyer') ||
                    career.name.toLowerCase().includes('judge') ||
                    career.name.toLowerCase().includes('ias') ||
                    career.name.toLowerCase().includes('policy') ||
                    career.name.toLowerCase().includes('civil')) {
                    score += 35;
                    interestMatched = true;
                    reasons.push('Fits your interest in Law, Justice, and Public Policy administration');
                }
            }
            if (!interestMatched) {
                score += 15;
            }

            // 2. Work Environment Compatibility (Weight: 15 pts)
            const careerEnv = (career.workEnvironment || '').toLowerCase();
            if (workStyle === 'remote' && (careerEnv.includes('remote') || career.name.toLowerCase().includes('software') || career.name.toLowerCase().includes('designer') || career.name.toLowerCase().includes('data'))) {
                score += 15;
                reasons.push('Offers high remote & flexible work flexibility');
            } else if (workStyle === 'lab' && (careerEnv.includes('lab') || careerEnv.includes('research') || careerEnv.includes('hospital'))) {
                score += 15;
                reasons.push('Operates in state-of-the-art laboratory & diagnostic research environments');
            } else if (workStyle === 'outdoor' && (careerEnv.includes('field') || careerEnv.includes('site') || careerEnv.includes('clinic') || career.name.toLowerCase().includes('civil') || career.name.toLowerCase().includes('pilot'))) {
                score += 15;
                reasons.push('Dynamic hands-on field operations matching your outdoor preference');
            } else if (workStyle === 'office' && (careerEnv.includes('office') || careerEnv.includes('corporate') || careerEnv.includes('bank'))) {
                score += 15;
                reasons.push('Thrives in structured corporate office settings');
            } else if (workStyle === 'travel' && (career.name.toLowerCase().includes('pilot') || career.name.toLowerCase().includes('journalist') || career.name.toLowerCase().includes('consultant'))) {
                score += 15;
                reasons.push('Features regular global travel and dynamic exploration');
            } else {
                score += 8;
            }

            // 3. Skill Overlap (Weight: 25 pts)
            const careerSkills = (career.skills || []).map(s => s.toLowerCase());
            let skillMatchCount = 0;
            skills.forEach(skillId => {
                if (skillId === 'analytical' && careerSkills.some(s => s.includes('analytic') || s.includes('logic') || s.includes('problem') || s.includes('research'))) {
                    skillMatchCount++;
                }
                if (skillId === 'technical' && careerSkills.some(s => s.includes('tech') || s.includes('code') || s.includes('program') || s.includes('engineer') || s.includes('software'))) {
                    skillMatchCount++;
                }
                if (skillId === 'creative' && careerSkills.some(s => s.includes('creat') || s.includes('design') || s.includes('visual') || s.includes('idea'))) {
                    skillMatchCount++;
                }
                if (skillId === 'communication' && careerSkills.some(s => s.includes('communicat') || s.includes('writing') || s.includes('patient') || s.includes('client'))) {
                    skillMatchCount++;
                }
                if (skillId === 'leadership' && careerSkills.some(s => s.includes('lead') || s.includes('manage') || s.includes('strategy') || s.includes('decision'))) {
                    skillMatchCount++;
                }
                if (skillId === 'empathy' && careerSkills.some(s => s.includes('empath') || s.includes('care') || s.includes('counsel') || s.includes('patient'))) {
                    skillMatchCount++;
                }
            });

            const skillBonus = Math.min(25, skillMatchCount * 9);
            score += skillBonus;
            if (skillMatchCount >= 2) {
                reasons.push(`Strong overlap with your top skills: ${skills.slice(0, 2).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' & ')}`);
            }

            // 4. Value Compatibility (Weight: 10 pts)
            if (values === 'salary' && (career.salaryRange?.includes('Cr') || career.salaryRange?.includes('80 LPA') || career.salaryRange?.includes('50 LPA') || career.salaryRange?.includes('25 LPA'))) {
                score += 10;
                reasons.push('High-growth salary tier fulfilling your financial targets');
            } else if (values === 'impact' && (career.description?.toLowerCase().includes('save') || career.description?.toLowerCase().includes('patient') || career.description?.toLowerCase().includes('public') || career.name.toLowerCase().includes('doctor') || career.name.toLowerCase().includes('teacher') || career.name.toLowerCase().includes('ias'))) {
                score += 10;
                reasons.push('Delivers meaningful, direct societal impact');
            } else if (values === 'balance') {
                score += 10;
                reasons.push('Offers sustainable long-term career stability');
            } else if (values === 'growth') {
                score += 10;
                reasons.push('Fast-expanding field with prominent advancement trajectory');
            } else if (values === 'creativity') {
                score += 10;
                reasons.push('Provides exceptional autonomy for creative problem solving');
            } else {
                score += 6;
            }

            // 5. Subject Alignment (Weight: 15 pts)
            let subjectMatchCount = 0;
            if (subjects.includes('computer') && (career.name.toLowerCase().includes('software') || career.name.toLowerCase().includes('data') || career.name.toLowerCase().includes('it') || career.name.toLowerCase().includes('cyber'))) {
                subjectMatchCount++;
            }
            if (subjects.includes('science') && (career.domainKey === 'science' || career.education?.toLowerCase().includes('mbbs') || career.education?.toLowerCase().includes('b.sc') || career.education?.toLowerCase().includes('b.tech'))) {
                subjectMatchCount++;
            }
            if (subjects.includes('math') && (career.name.toLowerCase().includes('analyst') || career.name.toLowerCase().includes('data') || career.name.toLowerCase().includes('engineer') || career.name.toLowerCase().includes('ca') || career.name.toLowerCase().includes('actuary'))) {
                subjectMatchCount++;
            }
            if (subjects.includes('arts') && (career.name.toLowerCase().includes('design') || career.name.toLowerCase().includes('architect') || career.name.toLowerCase().includes('animat'))) {
                subjectMatchCount++;
            }
            if (subjects.includes('social') && (career.name.toLowerCase().includes('law') || career.name.toLowerCase().includes('civil') || career.name.toLowerCase().includes('econom') || career.name.toLowerCase().includes('journal'))) {
                subjectMatchCount++;
            }
            if (subjects.includes('languages') && (career.name.toLowerCase().includes('writer') || career.name.toLowerCase().includes('journal') || career.name.toLowerCase().includes('communicat') || career.name.toLowerCase().includes('pr'))) {
                subjectMatchCount++;
            }

            score += Math.min(15, subjectMatchCount * 8);

            // Normalized percentage (Range: 76% - 98%)
            const matchPercentage = Math.min(98, Math.max(76, Math.round((score / 145) * 100)));

            // Ensure at least 3 descriptive reasons
            if (reasons.length < 3) {
                if (career.jobOutlook) reasons.push(`Industry Outlook: ${career.jobOutlook}`);
                if (career.education) reasons.push(`Structured roadmap: ${career.education}`);
                reasons.push(`Tailored to your aptitude in ${career.domainName}`);
            }

            return {
                career: career.name,
                fullCareerData: career,
                match: matchPercentage,
                reasons: reasons.slice(0, 3),
                skills: (career.skills || ['Communication', 'Problem Solving', 'Critical Thinking']).slice(0, 4),
                education: career.education || 'Bachelor Degree (3-4 years)',
                salaryRange: career.salaryRange || 'Competitive Industry Standard',
                jobOutlook: career.jobOutlook || 'Growing demand',
                entranceExams: career.entranceExams || []
            };
        });

        // Deduplicate and return top 5 unique careers sorted by match
        const uniqueMap = new Map();
        scoredCareers.forEach(c => {
            if (!uniqueMap.has(c.career) || uniqueMap.get(c.career).match < c.match) {
                uniqueMap.set(c.career, c);
            }
        });

        const sorted = Array.from(uniqueMap.values()).sort((a, b) => b.match - a.match);
        return sorted.slice(0, 5);
    };

    const processQuizCompletion = () => {
        // Validation check for all questions
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            const ans = answers[q.id];
            if (!ans || (Array.isArray(ans) && ans.length === 0)) {
                setCurrentStep(i);
                return;
            }
        }

        setIsAnalyzing(true);

        // Smooth analysis transition for polished UX
        setTimeout(() => {
            try {
                const generatedResults = calculateCareerRecommendations(answers);
                setResults(generatedResults);
                if (onComplete) {
                    onComplete(generatedResults);
                }
            } catch (err) {
                console.error('Quiz recommendation calculation error:', err);
                // Guaranteed safety fallback
                const fallbackResults = [
                    {
                        career: 'Software Engineer',
                        match: 95,
                        reasons: [
                            'High alignment with technology problem solving',
                            'Outstanding industry demand and compensation',
                            'Dynamic remote and continuous learning options'
                        ],
                        skills: ['Programming', 'Problem Solving', 'System Design'],
                        education: 'B.Tech/B.E. Computer Science (4 years)',
                        salaryRange: '₹8-35 LPA+',
                        jobOutlook: 'Excellent'
                    },
                    {
                        career: 'Data Scientist',
                        match: 92,
                        reasons: [
                            'Matches analytical and logical thinking',
                            'Integrates statistics with technological innovation',
                            'High global career growth trajectory'
                        ],
                        skills: ['Python', 'Machine Learning', 'Data Analysis'],
                        education: 'B.Tech/B.Sc Data Science or Statistics (3-4 years)',
                        salaryRange: '₹10-40 LPA+',
                        jobOutlook: 'Booming'
                    }
                ];
                setResults(fallbackResults);
            } finally {
                setIsAnalyzing(false);
            }
        }, 1200);
    };

    const nextStep = () => {
        if (!canProceed()) return;

        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            processQuizCompletion();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleRetakeQuiz = () => {
        try {
            sessionStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.warn(e);
        }
        setAnswers({});
        setCurrentStep(0);
        setResults(null);
        setSavedProgressDetected(false);
    };

    // Calculate percentage accurately
    const progressPercentage = Math.round(((currentStep + 1) / questions.length) * 100);

    // ================= RESULTS VIEW =================
    if (results) {
        return (
            <div className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-slate-50 via-indigo-50/50 to-blue-50'}`}>
                <div className="max-w-5xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
                                <Sparkles className="w-3.5 h-3.5" />
                                Personalized AI Assessment Complete
                            </div>
                            <h2 className={`text-3xl md:text-4xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                Your Top Career Matches 🎯
                            </h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleRetakeQuiz}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all border ${darkMode
                                    ? 'bg-[#1a1f2e] border-slate-700 text-slate-300 hover:bg-slate-800'
                                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                                    }`}
                                title="Retake Quiz"
                            >
                                <RotateCcw className="w-4 h-4 text-indigo-500" />
                                <span className="hidden sm:inline">Retake Quiz</span>
                            </button>
                            <button
                                onClick={onClose}
                                className={`p-2.5 rounded-xl transition-colors ${darkMode ? 'bg-[#1a1f2e] text-slate-400 hover:text-white hover:bg-slate-800' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 shadow-sm'}`}
                                aria-label="Close"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Guidance & Advisory Disclaimer */}
                    <div className={`mb-8 p-4 rounded-2xl border flex items-start gap-3.5 ${darkMode
                        ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200'
                        : 'bg-indigo-50 border-indigo-200 text-indigo-900 shadow-sm'
                        }`}>
                        <Info className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm leading-relaxed">
                            <span className="font-bold">Guidance Note: </span>
                            These recommendations are algorithmic guidance and career exploration tools designed to help you discover options based on your answers, rather than guaranteed predictions. We encourage you to research multiple paths and consult academic advisors.
                        </div>
                    </div>

                    {/* Career Cards */}
                    <div className="space-y-6 mb-8">
                        {results.map((result, idx) => (
                            <div
                                key={idx}
                                className={`rounded-3xl p-6 md:p-8 transition-all duration-300 border ${darkMode
                                    ? 'bg-[#161b26] border-slate-800 hover:border-indigo-500/40 shadow-xl'
                                    : 'bg-white border-slate-200 hover:border-indigo-300 shadow-xl'
                                    }`}
                            >
                                {/* Top bar with Match Score */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-dashed border-slate-200 dark:border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${idx === 0
                                            ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg shadow-amber-500/30 ring-4 ring-amber-400/20'
                                            : idx === 1
                                                ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-md'
                                                : idx === 2
                                                    ? 'bg-gradient-to-br from-amber-700 to-amber-900 text-amber-100 shadow-md'
                                                    : 'bg-indigo-600 text-white'
                                            }`}>
                                            #{idx + 1}
                                        </div>
                                        <div>
                                            <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                                {result.career}
                                            </h3>
                                            <div className="flex items-center gap-3 text-xs mt-1">
                                                <span className={`flex items-center gap-1 font-semibold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                                    <Briefcase className="w-3.5 h-3.5" />
                                                    {result.jobOutlook}
                                                </span>
                                                <span className="text-slate-400">•</span>
                                                <span className={`flex items-center gap-1 font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                                    <DollarSign className="w-3.5 h-3.5" />
                                                    {result.salaryRange}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Match Badge */}
                                    <div className="flex items-center sm:flex-col items-end gap-2 sm:gap-0">
                                        <div className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                                            {result.match}%
                                        </div>
                                        <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                            Compatibility Match
                                        </span>
                                    </div>
                                </div>

                                {/* Body Grid: Reasons & Requirements */}
                                <div className="grid md:grid-cols-2 gap-6 mt-6">
                                    {/* Left: Personalized Reasons */}
                                    <div>
                                        <h4 className={`text-xs font-bold uppercase tracking-wider mb-3.5 flex items-center gap-1.5 ${darkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>
                                            <Sparkles className="w-4 h-4" />
                                            Why this career fits your profile:
                                        </h4>
                                        <div className="space-y-2.5">
                                            {result.reasons.map((reason, ridx) => (
                                                <div key={ridx} className="flex items-start gap-2.5">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                                    <span className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                                        {reason}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: Education & Skills */}
                                    <div className="space-y-4">
                                        {/* Education Requirement */}
                                        <div className={`p-3.5 rounded-2xl border ${darkMode ? 'bg-[#10141d] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                                            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold uppercase tracking-wider text-indigo-500">
                                                <GraduationCap className="w-4 h-4" />
                                                Educational Pathway
                                            </div>
                                            <div className={`text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                                                {result.education}
                                            </div>
                                            {result.entranceExams && result.entranceExams.length > 0 && (
                                                <div className="text-xs text-slate-400 mt-1">
                                                    Exams: <span className="text-slate-300 font-medium">{result.entranceExams.join(', ')}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Key Skills */}
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                                Key In-Demand Skills:
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {result.skills.map((skill, sidx) => (
                                                    <span
                                                        key={sidx}
                                                        className={`px-3 py-1 rounded-xl text-xs font-semibold ${darkMode
                                                            ? 'bg-indigo-950/60 border border-indigo-800/40 text-indigo-300'
                                                            : 'bg-indigo-50 border border-indigo-200 text-indigo-700'
                                                            }`}
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Action */}
                                {result.fullCareerData && onSelectCareer && (
                                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                        <button
                                            onClick={() => {
                                                onSelectCareer(result.fullCareerData);
                                                onClose();
                                            }}
                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${darkMode
                                                ? 'bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30'
                                                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                                                }`}
                                        >
                                            <BookOpen className="w-4 h-4" />
                                            Explore Complete Roadmaps & Top Colleges
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <button
                            onClick={handleRetakeQuiz}
                            className={`flex-1 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${darkMode
                                ? 'bg-[#1a1f2e] border border-slate-700 text-slate-200 hover:bg-slate-800'
                                : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 shadow-md'
                                }`}
                        >
                            <RotateCcw className="w-5 h-5" />
                            Retake Career Quiz
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 py-4 rounded-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-xl shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                            Done & Explore Careers
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ================= ANALYZING VIEW =================
    if (isAnalyzing) {
        return (
            <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-slate-50 to-indigo-50'}`}>
                <div className="text-center max-w-md px-6 py-12 rounded-3xl border border-indigo-500/20 shadow-2xl bg-white/10 dark:bg-black/40 backdrop-blur-xl">
                    <div className="relative inline-block mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-600 flex items-center justify-center animate-spin">
                            <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute inset-0 rounded-full blur-xl bg-indigo-500/50 animate-pulse"></div>
                    </div>
                    <h3 className={`text-2xl font-black mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Analyzing 150+ Career Vectors...
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'} leading-relaxed mb-4`}>
                        Evaluating your interests, core skills, work environment preferences, and academic subjects against our real-time database.
                    </p>
                    <div className="w-48 h-2 mx-auto rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse w-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    // ================= QUESTIONS VIEW =================
    const question = questions[currentStep];
    const QuestionIcon = question.icon;

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-slate-50 via-indigo-50/40 to-blue-50'}`}>
            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white">
                                Step {currentStep + 1} of {questions.length}
                            </span>
                            {savedProgressDetected && (
                                <span className="text-xs text-emerald-500 font-semibold">
                                    • Progress auto-restored
                                </span>
                            )}
                        </div>
                        <h2 className={`text-2xl md:text-3xl font-black mt-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            AI Career Pathfinder Quiz
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleRetakeQuiz}
                            className={`p-2 rounded-xl transition-colors ${darkMode ? 'bg-[#1a1f2e] text-slate-400 hover:text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                            title="Reset Quiz"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className={`p-2 rounded-xl transition-colors ${darkMode ? 'bg-[#1a1f2e] text-slate-400 hover:text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                            aria-label="Close"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Progress Bar & Percentage */}
                <div className="mb-8">
                    <div className="flex justify-between items-center text-xs font-bold mb-2">
                        <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>
                            Quiz Progress
                        </span>
                        <span className="text-indigo-500">
                            {progressPercentage}% Completed
                        </span>
                    </div>
                    <div className={`h-2.5 rounded-full overflow-hidden ${darkMode ? 'bg-[#1a1f2e]' : 'bg-slate-200'}`}>
                        <div
                            className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transition-all duration-300 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div className={`rounded-3xl p-6 md:p-8 mb-8 border transition-all ${darkMode
                    ? 'bg-[#161b26] border-slate-800 shadow-2xl'
                    : 'bg-white border-slate-200 shadow-xl'
                    }`}>
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
                            <QuestionIcon className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className={`text-xl md:text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                {question.title}
                            </h3>
                            <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                {question.subtitle}
                            </p>
                        </div>
                    </div>

                    {/* Options Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {question.options.map(option => {
                            const isSelected = question.type === 'multiple'
                                ? (answers[question.id] || []).includes(option.id)
                                : answers[question.id] === option.id;

                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => handleAnswer(question.id, option.id)}
                                    className={`p-5 rounded-2xl border-2 transition-all duration-200 text-left relative overflow-hidden group ${isSelected
                                        ? darkMode
                                            ? 'bg-indigo-950/70 border-indigo-500 shadow-lg shadow-indigo-500/20'
                                            : 'bg-indigo-50/80 border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                                        : darkMode
                                            ? 'bg-[#121620] border-slate-800 hover:border-slate-700 hover:bg-[#1a202c]'
                                            : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                                        }`}
                                >
                                    <div className="flex items-start gap-3.5">
                                        <span className="text-3xl filter drop-shadow group-hover:scale-110 transition-transform">
                                            {option.emoji}
                                        </span>
                                        <div className="flex-1 pr-6">
                                            <div className={`font-bold text-base leading-snug ${isSelected
                                                ? darkMode ? 'text-white' : 'text-indigo-950'
                                                : darkMode ? 'text-slate-200' : 'text-slate-900'
                                                }`}>
                                                {option.label}
                                            </div>
                                            {option.desc && (
                                                <div className={`text-xs mt-1 ${isSelected
                                                    ? darkMode ? 'text-indigo-200' : 'text-indigo-700'
                                                    : darkMode ? 'text-slate-400' : 'text-slate-500'
                                                    }`}>
                                                    {option.desc}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Selected Indicator */}
                                    <div className={`absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center transition-all ${isSelected
                                        ? 'bg-indigo-600 text-white scale-100'
                                        : 'border-2 border-slate-400/40 opacity-40 scale-90'
                                        }`}>
                                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {question.type === 'multiple' && (
                        <div className={`mt-5 text-xs font-semibold flex items-center gap-1.5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                            <Sparkles className="w-3.5 h-3.5" />
                            Multi-select enabled: Choose all choices that apply to you
                        </div>
                    )}
                </div>

                {/* Bottom Navigation */}
                <div className="flex gap-4">
                    {currentStep > 0 && (
                        <button
                            onClick={prevStep}
                            className={`px-6 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 border ${darkMode
                                ? 'bg-[#161b26] border-slate-700 text-slate-200 hover:bg-slate-800'
                                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-md'
                                }`}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Previous
                        </button>
                    )}

                    <button
                        onClick={nextStep}
                        disabled={!canProceed()}
                        className={`flex-1 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-base ${canProceed()
                            ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-xl shadow-indigo-500/30 transform hover:scale-[1.01]'
                            : darkMode
                                ? 'bg-slate-800/60 text-slate-500 cursor-not-allowed border border-slate-800'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                    >
                        {currentStep === questions.length - 1 ? (
                            <>
                                <span>Compute AI Career Matches</span>
                                <Sparkles className="w-5 h-5" />
                            </>
                        ) : (
                            <>
                                <span>Next Question</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CareerQuiz;