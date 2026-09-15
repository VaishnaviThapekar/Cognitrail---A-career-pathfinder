import React, { useState, useEffect } from 'react';
import {
    Sparkles, ArrowRight, ArrowLeft, CheckCircle2,
    Brain, Target, Heart, TrendingUp, Award, X, RotateCcw,
    GraduationCap, Briefcase, DollarSign, Info, BookOpen, AlertCircle
} from 'lucide-react';
import { CAREER_DATABASE } from '../data/careerDatabase';

const STORAGE_KEY = 'cognitrail_quiz_progress_v2';

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

    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);
    const [savedProgressDetected, setSavedProgressDetected] = useState(false);
    const [validationError, setValidationError] = useState('');

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

    // Restore quiz progress from localStorage on initial mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.answers && Object.keys(parsed.answers).length > 0) {
                    setAnswers(parsed.answers);
                    if (parsed.currentStep !== undefined && !parsed.results) {
                        setCurrentStep(Math.min(parsed.currentStep, questions.length - 1));
                        setSavedProgressDetected(true);
                    }
                    if (parsed.results && Array.isArray(parsed.results) && parsed.results.length > 0) {
                        setResults(parsed.results);
                    }
                }
            }
        } catch (e) {
            console.warn('Could not restore quiz progress', e);
        }
    }, [questions.length]);

    // Sync quiz state changes to localStorage continuously
    useEffect(() => {
        try {
            if (results) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, currentStep, results }));
            } else if (Object.keys(answers).length > 0) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, currentStep }));
            }
        } catch (e) {
            console.warn('Could not save quiz progress', e);
        }
    }, [answers, currentStep, results]);

    const handleAnswer = (questionId, optionId) => {
        setValidationError('');
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

    const isQuestionAnswered = (stepIdx) => {
        const qId = questions[stepIdx]?.id;
        const answer = answers[qId];
        if (!answer) return false;
        if (Array.isArray(answer)) return answer.length > 0;
        return true;
    };

    const canProceed = () => isQuestionAnswered(currentStep);

    const getAllDatabaseCareers = () => {
        const allCareers = [];
        if (!CAREER_DATABASE) return allCareers;
        
        Object.entries(CAREER_DATABASE).forEach(([domainKey, domain]) => {
            if (domain.subFields && Array.isArray(domain.subFields)) {
                domain.subFields.forEach(subField => {
                    if (subField.careers && Array.isArray(subField.careers)) {
                        subField.careers.forEach(career => {
                            allCareers.push({
                                ...career,
                                domainKey,
                                domainName: domain.name,
                                subFieldName: subField.name
                            });
                        });
                    }
                });
            }
        });
        return allCareers;
    };

    const calculateCareerRecommendations = (userAnswers) => {
        const interests = userAnswers.interests || [];
        const workStyle = userAnswers.workStyle || '';
        const skills = userAnswers.skills || [];
        const values = userAnswers.values || '';
        const subjects = userAnswers.subjects || [];

        const allCareers = getAllDatabaseCareers();

        if (!allCareers || allCareers.length === 0) {
            throw new Error('No database careers found');
        }

        const scoredCareers = allCareers.map(career => {
            let score = 40;
            const reasons = [];

            // 1. Primary Domain & Interest Alignment (up to 40 pts)
            let interestMatched = false;
            const cName = (career.name || '').toLowerCase();
            const cDomain = (career.domainKey || '').toLowerCase();
            const cSub = (career.subFieldName || '').toLowerCase();

            if (interests.includes('tech')) {
                if (cDomain === 'engineering' || cName.includes('software') || cName.includes('data') || cName.includes('cloud') || cName.includes('ai') || cName.includes('cyber') || cName.includes('developer')) {
                    score += 38;
                    interestMatched = true;
                    reasons.push('Direct match with your strong interest in Technology & Software Systems');
                }
            }
            if (interests.includes('health')) {
                if (cDomain === 'science' && (cSub.includes('health') || cSub.includes('medicine')) || cName.includes('doctor') || cName.includes('nurse') || cName.includes('pharmacist') || cName.includes('biotech') || cName.includes('psycholog')) {
                    score += 38;
                    interestMatched = true;
                    reasons.push('Fulfills your dedication to Health, Clinical Care & Patient Wellbeing');
                }
            }
            if (interests.includes('business')) {
                if (cDomain === 'commerce' || cName.includes('manager') || cName.includes('analyst') || cName.includes('ca') || cName.includes('entrepreneur') || cName.includes('banker') || cName.includes('finance')) {
                    score += 38;
                    interestMatched = true;
                    reasons.push('High synergy with your Business, Leadership & Financial mindset');
                }
            }
            if (interests.includes('creative')) {
                if (cDomain === 'arts' || cName.includes('designer') || cName.includes('architect') || cName.includes('writer') || cName.includes('animat') || cName.includes('media')) {
                    score += 38;
                    interestMatched = true;
                    reasons.push('Empowers your creative problem solving and design expression');
                }
            }
            if (interests.includes('science')) {
                if (cDomain === 'science' || cName.includes('scientist') || cName.includes('research') || cName.includes('physicist') || cName.includes('chemist') || cName.includes('biolog')) {
                    score += 35;
                    interestMatched = true;
                    reasons.push('Aligns with your passion for Scientific Exploration and In-depth Research');
                }
            }
            if (interests.includes('law')) {
                if (cDomain === 'law' || cDomain === 'government' || cName.includes('lawyer') || cName.includes('judge') || cName.includes('ias') || cName.includes('ips') || cName.includes('policy')) {
                    score += 38;
                    interestMatched = true;
                    reasons.push('Fits your calling for Law, Justice, and Public Policy Administration');
                }
            }
            if (!interestMatched) {
                score += 10;
            }

            // 2. Work Environment Alignment (up to 15 pts)
            const careerEnv = (career.workEnvironment || '').toLowerCase();
            if (workStyle === 'remote' && (careerEnv.includes('remote') || cName.includes('software') || cName.includes('designer') || cName.includes('data') || cName.includes('writer'))) {
                score += 15;
                reasons.push('Offers high remote & flexible work options');
            } else if (workStyle === 'lab' && (careerEnv.includes('lab') || careerEnv.includes('research') || careerEnv.includes('hospital') || cDomain === 'science')) {
                score += 15;
                reasons.push('Operates in specialized laboratory & diagnostic research environments');
            } else if (workStyle === 'outdoor' && (careerEnv.includes('field') || careerEnv.includes('site') || cName.includes('civil') || cName.includes('pilot') || cDomain === 'sports' || cName.includes('geolog'))) {
                score += 15;
                reasons.push('Dynamic hands-on field operations matching your outdoor preference');
            } else if (workStyle === 'office' && (careerEnv.includes('office') || careerEnv.includes('corporate') || careerEnv.includes('bank') || cDomain === 'commerce')) {
                score += 15;
                reasons.push('Thrives in structured corporate office settings');
            } else if (workStyle === 'travel' && (cName.includes('pilot') || cName.includes('journalist') || cName.includes('consultant') || cName.includes('foreign'))) {
                score += 15;
                reasons.push('Features dynamic travel and international exposure');
            } else {
                score += 8;
            }

            // 3. Skill Overlap Alignment (up to 25 pts)
            const careerSkills = (career.skills || []).map(s => s.toLowerCase());
            let skillMatchCount = 0;
            skills.forEach(skillId => {
                if (skillId === 'analytical' && careerSkills.some(s => s.includes('analytic') || s.includes('logic') || s.includes('problem') || s.includes('research') || s.includes('data'))) {
                    skillMatchCount++;
                }
                if (skillId === 'technical' && careerSkills.some(s => s.includes('tech') || s.includes('code') || s.includes('program') || s.includes('engineer') || s.includes('software'))) {
                    skillMatchCount++;
                }
                if (skillId === 'creative' && careerSkills.some(s => s.includes('creat') || s.includes('design') || s.includes('visual') || s.includes('idea'))) {
                    skillMatchCount++;
                }
                if (skillId === 'communication' && careerSkills.some(s => s.includes('communicat') || s.includes('writing') || s.includes('patient') || s.includes('client') || s.includes('public'))) {
                    skillMatchCount++;
                }
                if (skillId === 'leadership' && careerSkills.some(s => s.includes('lead') || s.includes('manage') || s.includes('strategy') || s.includes('decision'))) {
                    skillMatchCount++;
                }
                if (skillId === 'empathy' && careerSkills.some(s => s.includes('empath') || s.includes('care') || s.includes('counsel') || s.includes('patient') || s.includes('listening'))) {
                    skillMatchCount++;
                }
            });

            score += Math.min(25, skillMatchCount * 9);
            if (skillMatchCount >= 2) {
                reasons.push(`Strong overlap with your core strengths (${skills.slice(0, 2).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' & ')})`);
            }

            // 4. Core Value Alignment (up to 12 pts)
            if (values === 'salary' && (career.salaryRange?.includes('Cr') || career.salaryRange?.includes('80 LPA') || career.salaryRange?.includes('50 LPA') || career.salaryRange?.includes('35 LPA') || career.salaryRange?.includes('25 LPA'))) {
                score += 12;
                reasons.push('High-earning compensation tier fulfilling your financial targets');
            } else if (values === 'impact' && (cName.includes('doctor') || cName.includes('teacher') || cName.includes('ias') || cName.includes('ips') || cName.includes('nurse') || career.description?.toLowerCase().includes('patient') || career.description?.toLowerCase().includes('public'))) {
                score += 12;
                reasons.push('Delivers profound direct societal and humanitarian impact');
            } else if (values === 'balance' && (cDomain === 'education' || cDomain === 'government' || careerEnv.includes('bank') || career.jobOutlook?.toLowerCase().includes('stable'))) {
                score += 12;
                reasons.push('Provides high career stability and structured work-life balance');
            } else if (values === 'growth') {
                score += 12;
                reasons.push('Rapidly expanding industry with prominent advancement trajectory');
            } else if (values === 'creativity') {
                score += 12;
                reasons.push('Offers exceptional creative autonomy and innovation freedom');
            } else {
                score += 7;
            }

            // 5. Subject Alignment (up to 18 pts)
            let subjectMatchCount = 0;
            if (subjects.includes('computer') && (cName.includes('software') || cName.includes('data') || cName.includes('it') || cName.includes('cyber') || cDomain === 'engineering')) {
                subjectMatchCount++;
            }
            if (subjects.includes('science') && (cDomain === 'science' || career.education?.toLowerCase().includes('mbbs') || career.education?.toLowerCase().includes('b.sc') || career.education?.toLowerCase().includes('b.tech'))) {
                subjectMatchCount++;
            }
            if (subjects.includes('math') && (cName.includes('analyst') || cName.includes('data') || cName.includes('engineer') || cName.includes('ca') || cName.includes('actuary') || cName.includes('quant'))) {
                subjectMatchCount++;
            }
            if (subjects.includes('arts') && (cName.includes('design') || cName.includes('architect') || cName.includes('animat') || cDomain === 'arts')) {
                subjectMatchCount++;
            }
            if (subjects.includes('social') && (cName.includes('law') || cName.includes('civil') || cName.includes('econom') || cName.includes('journal') || cDomain === 'government')) {
                subjectMatchCount++;
            }
            if (subjects.includes('languages') && (cName.includes('writer') || cName.includes('journal') || cName.includes('pr') || cName.includes('communicat'))) {
                subjectMatchCount++;
            }

            score += Math.min(18, subjectMatchCount * 9);

            const matchPercentage = Math.min(98, Math.max(78, Math.round((score / 150) * 100)));

            // Ensure we always provide 3 descriptive, personalized reasons
            if (reasons.length < 3) {
                if (career.jobOutlook) reasons.push(`Industry Outlook: ${career.jobOutlook}`);
                if (career.education) reasons.push(`Standard Education Route: ${career.education}`);
                reasons.push(`Tailored to your chosen profile attributes in ${career.domainName}`);
            }

            return {
                career: career.name,
                fullCareerData: career,
                match: matchPercentage,
                reasons: reasons.slice(0, 3),
                skills: (career.skills || ['Critical Thinking', 'Problem Solving', 'Communication']).slice(0, 4),
                education: career.education || 'Bachelor Degree (3-4 years)',
                salaryRange: career.salaryRange || 'Competitive Industry Standard',
                jobOutlook: career.jobOutlook || 'Growing demand',
                entranceExams: career.entranceExams || []
            };
        });

        // Deduplicate and sort by highest match
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
        // Validation: Verify all questions are answered
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            const ans = answers[q.id];
            if (!ans || (Array.isArray(ans) && ans.length === 0)) {
                setCurrentStep(i);
                setValidationError(`Please answer question ${i + 1} before calculating recommendations.`);
                return;
            }
        }

        setValidationError('');
        setIsAnalyzing(true);

        setTimeout(() => {
            try {
                const generatedResults = calculateCareerRecommendations(answers);
                setResults(generatedResults);
                if (onComplete) {
                    onComplete(generatedResults);
                }
            } catch (err) {
                console.error('Quiz recommendation calculation fallback:', err);
                const fallbackResults = [
                    {
                        career: 'Software & AI Engineer',
                        match: 96,
                        reasons: [
                            'Direct match with your high interest in Technology & Problem Solving',
                            'High-earning compensation tier with top industry demand',
                            'Offers flexible remote workflows and continuous growth'
                        ],
                        skills: ['Python / JavaScript', 'System Architecture', 'Problem Solving', 'Data Structures'],
                        education: 'B.Tech / B.E. in Computer Science or AI (4 years)',
                        salaryRange: '₹8 - 45 LPA+',
                        jobOutlook: 'Excellent - Rapid Global Expansion',
                        entranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT']
                    },
                    {
                        career: 'Data Scientist & Analytics Lead',
                        match: 93,
                        reasons: [
                            'High synergy with analytical and mathematical thinking',
                            'Integrates data science with cutting-edge industry applications',
                            'Dynamic growth trajectory across tech and financial sectors'
                        ],
                        skills: ['Python', 'SQL & Statistics', 'Machine Learning', 'Data Visualization'],
                        education: 'B.Tech / B.Sc in Data Science, Statistics, or Math (3-4 years)',
                        salaryRange: '₹10 - 40 LPA+',
                        jobOutlook: 'Booming Demand Worldwide',
                        entranceExams: ['JEE Main', 'ISI Admission Test', 'CUET']
                    },
                    {
                        career: 'AI Product & UX Designer',
                        match: 90,
                        reasons: [
                            'Fulfills creative problem solving and design expression',
                            'Fast-expanding field blending technology with human empathy',
                            'Strong autonomy and collaborative corporate opportunities'
                        ],
                        skills: ['Figma Prototyping', 'User Research', 'Design Systems', 'Creative Thinking'],
                        education: 'B.Des / B.Sc in Design, HCI, or Multimedia (4 years)',
                        salaryRange: '₹8 - 32 LPA',
                        jobOutlook: 'High Demand in Tech Ecosystems',
                        entranceExams: ['UCEED', 'NID DAT', 'CEED']
                    }
                ];
                setResults(fallbackResults);
            } finally {
                setIsAnalyzing(false);
            }
        }, 900);
    };

    const nextStep = () => {
        if (!canProceed()) {
            setValidationError('Please select at least one option to continue.');
            return;
        }

        setValidationError('');
        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            processQuizCompletion();
        }
    };

    const prevStep = () => {
        setValidationError('');
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleRetakeQuiz = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            sessionStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.warn(e);
        }
        setAnswers({});
        setCurrentStep(0);
        setResults(null);
        setSavedProgressDetected(false);
        setValidationError('');
    };

    const progressPercentage = Math.round(((currentStep + 1) / questions.length) * 100);

    // ================= RESULTS VIEW =================
    if (results) {
        return (
            <div 
                role="dialog"
                aria-modal="true"
                aria-label="Top Career Recommendations"
                className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#09090b] text-white' : 'bg-zinc-50 text-black'}`}
            >
                <div className="max-w-5xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-2 bg-[#10B981] text-white shadow-sm">
                                <Sparkles className="w-3.5 h-3.5 text-white" />
                                AI Pathfinder Assessment Complete
                            </div>
                            <h2 className={`text-3xl md:text-4xl font-black ${darkMode ? 'text-white' : 'text-[#111827]'}`}>
                                Top Career Recommendations 🎯
                            </h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleRetakeQuiz}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm btn-interactive hover-lift border bg-[#10B981] border-[#10B981] text-white hover:bg-[#059669] shadow-sm"
                                title="Retake Quiz"
                            >
                                <RotateCcw className="w-4 h-4 text-white" />
                                <span className="hidden sm:inline">Retake Quiz</span>
                            </button>
                            <button
                                onClick={onClose}
                                className={`p-2.5 rounded-xl transition-colors border ${
                                    darkMode ? 'bg-[#14231E] border-emerald-800/60 text-[#6EE7B7] hover:text-white' : 'bg-[#ECFDF5] border-emerald-200 text-[#059669] hover:bg-[#10B981] hover:text-white'
                                }`}
                                aria-label="Close"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Guidance & Advisory Disclaimer */}
                    <div className={`mb-8 p-4.5 rounded-2xl border flex items-start gap-3.5 ${
                        darkMode ? 'bg-[#14231E] border-emerald-800/60 text-[#6EE7B7]' : 'bg-[#ECFDF5] border-emerald-200 text-[#047857] shadow-sm'
                    }`}>
                        <Info className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
                        <div className="text-sm leading-relaxed">
                            <span className="font-bold text-black dark:text-white">Guidance & Advisory Notice: </span>
                            These recommendations are algorithmic guidance and career exploration tools designed to help you discover options based on your answers, rather than guaranteed predictions. We encourage you to research multiple paths and consult academic advisors.
                        </div>
                    </div>

                    {/* Career Cards */}
                    <div className="space-y-6 mb-8">
                        {results.map((result, idx) => (
                            <div
                                key={idx}
                                className={`rounded-3xl p-6 md:p-8 transition-all duration-300 border hover-lift ${
                                    darkMode ? 'bg-[#14231E] border-emerald-800/60 hover:border-[#10B981] shadow-xl' : 'bg-white border-emerald-100 hover:border-[#10B981] shadow-lg'
                                }`}
                            >
                                {/* Top bar with Match Score */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-100 dark:border-emerald-800/40">
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg bg-[#10B981] text-white">
                                            #{idx + 1}
                                        </div>
                                        <div>
                                            <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-[#111827]'}`}>
                                                {result.career}
                                            </h3>
                                            <div className="flex items-center gap-3 text-xs mt-1">
                                                <span className="flex items-center gap-1 font-semibold text-[#059669]">
                                                    <Briefcase className="w-3.5 h-3.5 text-[#059669]" />
                                                    {result.jobOutlook}
                                                </span>
                                                <span className="text-zinc-400">•</span>
                                                <span className="flex items-center gap-1 font-semibold text-[#059669]">
                                                    <DollarSign className="w-3.5 h-3.5 text-[#059669]" />
                                                    {result.salaryRange}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Match Badge */}
                                    <div className="flex items-center sm:flex-col items-end gap-2 sm:gap-0">
                                        <div className="text-3xl md:text-4xl font-black text-[#10B981]">
                                            {result.match}%
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-[#6EE7B7]' : 'text-[#059669]'}`}>
                                            Match Score
                                        </span>
                                    </div>
                                </div>

                                {/* Body Grid: Reasons & Requirements */}
                                <div className="grid md:grid-cols-2 gap-6 mt-6">
                                    {/* Left: Personalized Reasons */}
                                    <div>
                                        <h4 className={`text-xs font-bold uppercase tracking-wider mb-3.5 flex items-center gap-1.5 ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
                                            <Sparkles className="w-4 h-4" />
                                            Why Cognitrail recommends this for you:
                                        </h4>
                                        <div className="space-y-2.5">
                                            {result.reasons.map((reason, ridx) => (
                                                <div key={ridx} className="flex items-start gap-2.5">
                                                    <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? 'text-white' : 'text-black'}`} />
                                                    <span className={`text-sm leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                                                        {reason}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: Education & Skills */}
                                    <div className="space-y-4">
                                        {/* Education Requirement */}
                                        <div className={`p-3.5 rounded-2xl border ${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                                            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400">
                                                <GraduationCap className="w-4 h-4" />
                                                Educational Pathway & Exams
                                            </div>
                                            <div className={`text-sm font-semibold ${darkMode ? 'text-zinc-200' : 'text-zinc-900'}`}>
                                                {result.education}
                                            </div>
                                            {result.entranceExams && result.entranceExams.length > 0 && (
                                                <div className="text-xs text-zinc-400 mt-1.5">
                                                    Entrance Exams: <span className="text-black dark:text-white font-semibold">{result.entranceExams.join(', ')}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Key Skills */}
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                                                Relevant In-Demand Skills:
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {result.skills.map((skill, sidx) => (
                                                    <span
                                                        key={sidx}
                                                        className={`px-3 py-1 rounded-xl text-xs font-semibold border ${
                                                            darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-800'
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
                                    <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                                        <button
                                            onClick={() => {
                                                onSelectCareer(result.fullCareerData);
                                                onClose();
                                            }}
                                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold btn-interactive hover-lift border cursor-pointer ${
                                                darkMode
                                                    ? 'bg-zinc-900 hover:bg-white hover:text-black border-zinc-700 text-zinc-200'
                                                    : 'bg-zinc-100 hover:bg-black hover:text-white border-zinc-300 text-black'
                                            }`}
                                        >
                                            <BookOpen className="w-4 h-4" />
                                            <span>Explore Complete Roadmaps & Top Colleges</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                        <button
                            onClick={handleRetakeQuiz}
                            className={`flex-1 py-4 rounded-2xl font-bold btn-interactive hover-lift flex items-center justify-center gap-2 border cursor-pointer ${
                                darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800' : 'bg-white border-zinc-300 text-black hover:bg-zinc-100 shadow-md'
                            }`}
                        >
                            <RotateCcw className="w-5 h-5" />
                            <span>Retake Career Quiz</span>
                        </button>
                        <button
                            onClick={onClose}
                            className={`flex-1 py-4 rounded-2xl font-bold btn-interactive hover-lift flex items-center justify-center gap-2 shadow-xl cursor-pointer ${
                                darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                            }`}
                        >
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Done & Explore All 150+ Careers</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ================= ANALYZING VIEW =================
    if (isAnalyzing) {
        return (
            <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-[#09090b] text-white' : 'bg-zinc-50 text-black'}`}>
                <div className={`text-center max-w-md px-6 py-12 rounded-3xl border shadow-2xl backdrop-blur-xl ${darkMode ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white border-zinc-300'}`}>
                    <div className="relative inline-block mb-6">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center animate-spin ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                            <Sparkles className="w-10 h-10" />
                        </div>
                    </div>
                    <h3 className={`text-2xl font-black mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                        Analyzing 150+ Career Vectors...
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} leading-relaxed mb-4`}>
                        Evaluating your chosen interests, core strengths, work style, and academic subjects against live career matrices.
                    </p>
                    <div className="w-48 h-2 mx-auto rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                        <div className="h-full bg-black dark:bg-white animate-pulse w-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    // ================= QUESTIONS VIEW =================
    const question = questions[currentStep];
    const QuestionIcon = question.icon;

    return (
        <div 
            role="dialog"
            aria-modal="true"
            aria-label="AI Career Pathfinder Quiz"
            className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#09090b] text-white' : 'bg-zinc-50 text-black'}`}
        >
            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                Question {currentStep + 1} of {questions.length}
                            </span>
                            {savedProgressDetected && (
                                <span className="text-xs text-zinc-400 font-semibold">
                                    • Progress auto-restored
                                </span>
                            )}
                        </div>
                        <h2 className={`text-2xl md:text-3xl font-black mt-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                            AI Career Pathfinder Quiz
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleRetakeQuiz}
                            className={`p-2.5 rounded-xl transition-colors border btn-interactive ${
                                darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                            }`}
                            title="Reset Quiz"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onClose}
                            className={`p-2.5 rounded-xl transition-colors border btn-interactive ${
                                darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                            }`}
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Progress Bar & Percentage */}
                <div className="mb-8">
                    <div className="flex justify-between items-center text-xs font-bold mb-2">
                        <span className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                            Quiz Progress
                        </span>
                        <span className={darkMode ? 'text-white' : 'text-black'}>
                            {progressPercentage}% Completed
                        </span>
                    </div>
                    <div className={`h-2.5 rounded-full overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                        <div
                            className={`h-full transition-all duration-300 ease-out ${darkMode ? 'bg-white' : 'bg-black'}`}
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>

                {/* Validation Error Message */}
                {validationError && (
                    <div className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 animate-fade-in ${
                        darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-200' : 'bg-zinc-100 border-zinc-300 text-black'
                    }`}>
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-semibold">{validationError}</span>
                    </div>
                )}

                {/* Question Card */}
                <div key={currentStep} className={`rounded-3xl p-6 md:p-8 mb-8 border animate-fade-in ${
                    darkMode ? 'bg-[#121215] border-zinc-800 shadow-2xl' : 'bg-white border-zinc-200 shadow-xl'
                }`}>
                    <div className="flex items-start gap-4 mb-6">
                        <div className={`p-3.5 rounded-2xl transition-transform hover:scale-110 ${darkMode ? 'bg-zinc-800 text-white' : 'bg-black text-white'}`}>
                            <QuestionIcon className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className={`text-xl md:text-2xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                                {question.title}
                            </h3>
                            <p className={`text-sm mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
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
                                    className={`p-5 rounded-2xl border-2 transition-all duration-200 text-left relative overflow-hidden group hover-lift btn-interactive cursor-pointer ${
                                        isSelected
                                            ? darkMode
                                                ? 'bg-zinc-800 border-white text-white shadow-lg'
                                                : 'bg-zinc-100 border-black text-black ring-1 ring-black shadow-md'
                                            : darkMode
                                                ? 'bg-[#18181b] border-zinc-800 hover:border-zinc-700 text-zinc-300'
                                                : 'bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800'
                                    }`}
                                >
                                    <div className="flex items-start gap-3.5">
                                        <span className="text-3xl filter drop-shadow group-hover:scale-110 transition-transform duration-200">
                                            {option.emoji}
                                        </span>
                                        <div className="flex-1 pr-6">
                                            <div className={`font-bold text-base leading-snug ${
                                                isSelected
                                                    ? darkMode ? 'text-white' : 'text-black'
                                                    : darkMode ? 'text-zinc-200' : 'text-zinc-900'
                                            }`}>
                                                {option.label}
                                            </div>
                                            {option.desc && (
                                                <div className={`text-xs mt-1 ${
                                                    isSelected
                                                        ? darkMode ? 'text-zinc-300' : 'text-zinc-700'
                                                        : darkMode ? 'text-zinc-500' : 'text-zinc-500'
                                                }`}>
                                                    {option.desc}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Selected Indicator */}
                                    <div className={`absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                                        isSelected
                                            ? darkMode ? 'bg-white text-black scale-110' : 'bg-black text-white scale-110'
                                            : 'border-2 border-zinc-400/40 opacity-40 scale-90'
                                    }`}>
                                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {question.type === 'multiple' && (
                        <div className={`mt-5 text-xs font-semibold flex items-center gap-1.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
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
                            className={`px-6 py-4 rounded-2xl font-bold btn-interactive hover-lift flex items-center gap-2 border cursor-pointer ${
                                darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800' : 'bg-white border-zinc-300 text-black hover:bg-zinc-100 shadow-md'
                            }`}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Previous</span>
                        </button>
                    )}

                    <button
                        onClick={nextStep}
                        disabled={!canProceed()}
                        className={`flex-1 px-8 py-4 rounded-2xl font-bold btn-interactive hover-lift flex items-center justify-center gap-2 text-base cursor-pointer ${
                            canProceed()
                                ? darkMode
                                    ? 'bg-white text-black hover:bg-zinc-200 shadow-xl'
                                    : 'bg-black text-white hover:bg-zinc-800 shadow-xl'
                                : darkMode
                                    ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-800'
                                    : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                        }`}
                    >
                        {currentStep === questions.length - 1 ? (
                            <>
                                <span>Compute AI Career Matches</span>
                                <Sparkles className="w-5 h-5 animate-spin" />
                            </>
                        ) : (
                            <>
                                <span>Next Question</span>
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CareerQuiz;