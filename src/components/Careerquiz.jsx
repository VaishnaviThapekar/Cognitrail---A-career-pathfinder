import React, { useState } from 'react';
import {
    Sparkles, ArrowRight, ArrowLeft, CheckCircle2,
    Brain, Target, Heart, TrendingUp, Award, X
} from 'lucide-react';

const CareerQuiz = ({ onClose, darkMode, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);

    const questions = [
        {
            id: 'interests',
            title: 'What interests you most?',
            type: 'multiple',
            icon: Heart,
            options: [
                { id: 'tech', label: 'Technology & Innovation', emoji: '💻' },
                { id: 'health', label: 'Health & Medicine', emoji: '⚕️' },
                { id: 'business', label: 'Business & Finance', emoji: '💼' },
                { id: 'creative', label: 'Art & Design', emoji: '🎨' },
                { id: 'science', label: 'Science & Research', emoji: '🔬' },
                { id: 'law', label: 'Law & Justice', emoji: '⚖️' }
            ]
        },
        {
            id: 'workStyle',
            title: 'What work environment do you prefer?',
            type: 'single',
            icon: Target,
            options: [
                { id: 'office', label: 'Office/Corporate Setting', emoji: '🏢' },
                { id: 'outdoor', label: 'Outdoor & Field Work', emoji: '🌳' },
                { id: 'lab', label: 'Laboratory/Research', emoji: '🧪' },
                { id: 'remote', label: 'Remote/Flexible', emoji: '🏠' },
                { id: 'travel', label: 'Travel & Exploration', emoji: '✈️' }
            ]
        },
        {
            id: 'skills',
            title: 'Which skills do you excel at?',
            type: 'multiple',
            icon: Brain,
            options: [
                { id: 'analytical', label: 'Analytical Thinking', emoji: '📊' },
                { id: 'creative', label: 'Creative Problem Solving', emoji: '💡' },
                { id: 'communication', label: 'Communication', emoji: '🗣️' },
                { id: 'technical', label: 'Technical Skills', emoji: '⚙️' },
                { id: 'leadership', label: 'Leadership', emoji: '👥' },
                { id: 'empathy', label: 'Empathy & Care', emoji: '❤️' }
            ]
        },
        {
            id: 'values',
            title: 'What matters most to you in a career?',
            type: 'single',
            icon: Award,
            options: [
                { id: 'salary', label: 'High Salary', emoji: '💰' },
                { id: 'impact', label: 'Social Impact', emoji: '🌍' },
                { id: 'balance', label: 'Work-Life Balance', emoji: '⚖️' },
                { id: 'growth', label: 'Career Growth', emoji: '📈' },
                { id: 'creativity', label: 'Creative Freedom', emoji: '🎨' }
            ]
        },
        {
            id: 'subjects',
            title: 'Which subjects do you enjoy?',
            type: 'multiple',
            icon: TrendingUp,
            options: [
                { id: 'math', label: 'Mathematics', emoji: '🔢' },
                { id: 'science', label: 'Physics/Chemistry/Biology', emoji: '🔬' },
                { id: 'languages', label: 'Languages & Literature', emoji: '📚' },
                { id: 'social', label: 'History/Geography/Economics', emoji: '🌐' },
                { id: 'arts', label: 'Arts & Design', emoji: '🎨' },
                { id: 'computer', label: 'Computer Science', emoji: '💻' }
            ]
        }
    ];

    const handleAnswer = (questionId, optionId) => {
        const question = questions[currentStep];

        if (question.type === 'multiple') {
            const current = answers[questionId] || [];
            const updated = current.includes(optionId)
                ? current.filter(id => id !== optionId)
                : [...current, optionId];
            setAnswers({ ...answers, [questionId]: updated });
        } else if (question.type === 'single') {
            setAnswers({ ...answers, [questionId]: optionId });
        }
    };

    const analyzeWithAI = async () => {
        setIsAnalyzing(true);

        try {
            // Prepare the quiz data for Claude
            const quizSummary = questions.map(q => {
                const answer = answers[q.id];
                const selectedOptions = Array.isArray(answer)
                    ? q.options.filter(opt => answer.includes(opt.id)).map(opt => opt.label)
                    : q.options.find(opt => opt.id === answer)?.label;

                return `${q.title}: ${Array.isArray(selectedOptions) ? selectedOptions.join(', ') : selectedOptions}`;
            }).join('\n');

            // Call Claude API for career recommendations
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 1000,
                    messages: [{
                        role: 'user',
                        content: `Based on this career quiz responses, recommend the top 5 most suitable careers from this list with match percentages and reasoning:

Quiz Responses:
${quizSummary}

Available Careers: Software Engineer, Doctor, Mechanical Engineer, Graphic Designer, CA, Lawyer, IAS Officer, Teacher, Civil Engineer, Data Scientist, Product Manager, Architect, Psychologist, Journalist, Entrepreneur, Marketing Manager, Financial Analyst, UX Designer, Research Scientist, Pilot.

Respond ONLY with valid JSON in this exact format:
{
  "recommendations": [
    {
      "career": "Career Name",
      "match": 95,
      "reasons": ["Reason 1", "Reason 2", "Reason 3"],
      "skills": ["Skill 1", "Skill 2"]
    }
  ]
}

Return exactly 5 careers, sorted by match percentage (highest first). Match percentages should be 75-98.`
                    }]
                })
            });

            const data = await response.json();
            let resultText = data.content.find(item => item.type === 'text')?.text || '';

            // Clean the response - remove markdown code blocks if present
            resultText = resultText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            const parsedResults = JSON.parse(resultText);
            setResults(parsedResults.recommendations);
        } catch (error) {
            console.error('Error analyzing quiz:', error);

            // Generate smart fallback based on actual answers
            const fallbackResults = generateSmartRecommendations(answers);
            setResults(fallbackResults);
        }

        setIsAnalyzing(false);
    };

    // Smart fallback recommendations based on quiz answers
    const generateSmartRecommendations = (answers) => {
        const recommendations = [];

        // Analyze interests
        const interests = answers.interests || [];
        const workStyle = answers.workStyle;
        const skills = answers.skills || [];
        const values = answers.values;
        const subjects = answers.subjects || [];

        // Technology interest
        if (interests.includes('tech') || subjects.includes('computer')) {
            recommendations.push({
                career: 'Software Engineer',
                match: 94,
                reasons: [
                    'Strong interest in technology and innovation',
                    subjects.includes('computer') ? 'Computer science knowledge' : 'Technical aptitude',
                    workStyle === 'remote' ? 'Preference for flexible work aligns well' : 'Growing field with opportunities'
                ],
                skills: ['Programming', 'Problem Solving', 'Logical Thinking']
            });
        }

        // Health/medical interest
        if (interests.includes('health') || subjects.includes('science')) {
            recommendations.push({
                career: 'Doctor',
                match: 92,
                reasons: [
                    'Interest in health and helping others',
                    subjects.includes('science') ? 'Strong science background' : 'Medical aptitude',
                    skills.includes('empathy') ? 'Excellent empathy and care skills' : 'Desire to make impact'
                ],
                skills: ['Medical Knowledge', 'Empathy', 'Decision Making']
            });
        }

        // Business interest
        if (interests.includes('business') || values === 'salary') {
            recommendations.push({
                career: 'Product Manager',
                match: 89,
                reasons: [
                    'Business and strategic thinking ability',
                    skills.includes('leadership') ? 'Strong leadership qualities' : 'Analytical mindset',
                    values === 'growth' ? 'High growth potential' : 'Excellent earning potential'
                ],
                skills: ['Strategy', 'Communication', 'Leadership']
            });
        }

        // Creative interest
        if (interests.includes('creative') || subjects.includes('arts')) {
            recommendations.push({
                career: 'UX Designer',
                match: 87,
                reasons: [
                    'Creative thinking and design skills',
                    'Growing demand in tech industry',
                    workStyle === 'remote' ? 'Flexible remote work options' : 'Blend of creativity and technology'
                ],
                skills: ['Design', 'User Research', 'Creativity']
            });
        }

        // Science/Research interest
        if (interests.includes('science') || subjects.includes('science')) {
            recommendations.push({
                career: 'Data Scientist',
                match: 91,
                reasons: [
                    'Strong analytical and research skills',
                    subjects.includes('math') ? 'Mathematical aptitude' : 'Scientific mindset',
                    'High-demand career with excellent prospects'
                ],
                skills: ['Statistics', 'Python', 'Analysis']
            });
        }

        // Law interest
        if (interests.includes('law') || subjects.includes('social')) {
            recommendations.push({
                career: 'Lawyer',
                match: 86,
                reasons: [
                    'Interest in justice and legal systems',
                    skills.includes('communication') ? 'Excellent communication skills' : 'Strong reasoning ability',
                    'Respected profession with good earning potential'
                ],
                skills: ['Legal Research', 'Communication', 'Critical Thinking']
            });
        }

        // Fill remaining slots with general recommendations
        const defaultCareers = [
            {
                career: 'Civil Engineer',
                match: 84,
                reasons: [
                    'Strong problem-solving abilities',
                    'Practical career with visible impact',
                    'Stable career with consistent demand'
                ],
                skills: ['Engineering', 'Project Management', 'Technical Drawing']
            },
            {
                career: 'Teacher',
                match: 82,
                reasons: [
                    'Opportunity to shape future generations',
                    values === 'impact' ? 'High social impact' : 'Rewarding career',
                    values === 'balance' ? 'Good work-life balance' : 'Job security'
                ],
                skills: ['Communication', 'Patience', 'Subject Expertise']
            },
            {
                career: 'Financial Analyst',
                match: 80,
                reasons: [
                    'Strong analytical and mathematical skills',
                    'Growing finance industry',
                    values === 'salary' ? 'Excellent earning potential' : 'Career growth opportunities'
                ],
                skills: ['Financial Analysis', 'Excel', 'Business Acumen']
            }
        ];

        // Add default careers if we don't have 5 yet
        defaultCareers.forEach(career => {
            if (recommendations.length < 5 && !recommendations.find(r => r.career === career.career)) {
                recommendations.push(career);
            }
        });

        // Sort by match percentage and return top 5
        return recommendations.sort((a, b) => b.match - a.match).slice(0, 5);
    };

    const nextStep = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            analyzeWithAI();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const canProceed = () => {
        const answer = answers[questions[currentStep].id];
        return answer && (Array.isArray(answer) ? answer.length > 0 : true);
    };

    if (results) {
        return (
            <div className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50'
                }`}>
                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Your Career Matches 🎯
                        </h2>
                        <button
                            onClick={onClose}
                            className={`p-2 rounded-xl transition-colors ${darkMode ? 'bg-[#1a1f2e] hover:bg-[#272757]' : 'bg-white hover:bg-gray-100'
                                }`}
                        >
                            <X className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                        </button>
                    </div>

                    {/* Results */}
                    <div className="space-y-6">
                        {results.map((result, idx) => (
                            <div
                                key={idx}
                                className={`rounded-3xl p-8 transition-all duration-300 transform hover:scale-[1.02] ${darkMode
                                    ? 'bg-[#1a1f2e] border border-[#272757]'
                                    : 'bg-white border border-indigo-100 shadow-xl'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`text-2xl font-black ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'
                                                }`}>
                                                #{idx + 1}
                                            </span>
                                            <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                {result.career}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Match Percentage */}
                                    <div className="text-center">
                                        <div className={`text-4xl font-black mb-1 bg-clip-text text-transparent bg-gradient-to-r ${darkMode
                                            ? 'from-[#8686AC] to-[#505081]'
                                            : 'from-indigo-600 to-blue-600'
                                            }`}>
                                            {result.match}%
                                        </div>
                                        <div className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            Match
                                        </div>
                                    </div>
                                </div>

                                {/* Reasons */}
                                <div className="mb-4">
                                    <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                        Why this career suits you:
                                    </h4>
                                    <div className="space-y-2">
                                        {result.reasons.map((reason, ridx) => (
                                            <div key={ridx} className="flex items-start gap-2">
                                                <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'
                                                    }`} />
                                                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                                    }`}>
                                                    {reason}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2">
                                    {result.skills?.map((skill, sidx) => (
                                        <span
                                            key={sidx}
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${darkMode
                                                ? 'bg-[#272757] text-[#8686AC]'
                                                : 'bg-indigo-50 text-indigo-700'
                                                }`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex gap-4">
                        <button
                            onClick={onClose}
                            className={`flex-1 py-4 rounded-xl font-bold transition-all ${darkMode
                                ? 'bg-[#1a1f2e] border border-[#272757] text-white hover:bg-[#272757]'
                                : 'bg-white border border-indigo-200 text-gray-900 hover:bg-indigo-50'
                                }`}
                        >
                            Close
                        </button>
                        <button
                            onClick={() => {
                                onComplete?.(results);
                                onClose();
                            }}
                            className="flex-1 py-4 rounded-xl font-bold bg-gradient-to-r from-[#272757] to-[#505081] hover:from-[#505081] hover:to-[#8686AC] text-white transition-all"
                        >
                            Save Results
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (isAnalyzing) {
        return (
            <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50'
                }`}>
                <div className="text-center max-w-md px-4">
                    <div className="relative inline-block mb-6">
                        <Sparkles className={`w-16 h-16 animate-spin ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'
                            }`} />
                        <div className="absolute inset-0 blur-xl opacity-50">
                            <Sparkles className={`w-16 h-16 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'
                                }`} />
                        </div>
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        Analyzing Your Responses...
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Our intelligent algorithm is finding your perfect career matches
                    </p>
                    <div className={`mt-4 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        This may take a few seconds
                    </div>
                </div>
            </div>
        );
    }

    const question = questions[currentStep];
    const QuestionIcon = question.icon;

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50'
            }`}>
            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Career Discovery Quiz
                        </h2>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Question {currentStep + 1} of {questions.length}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-xl transition-colors ${darkMode ? 'bg-[#1a1f2e] hover:bg-[#272757]' : 'bg-white hover:bg-gray-100'
                            }`}
                    >
                        <X className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className={`h-2 rounded-full mb-8 overflow-hidden ${darkMode ? 'bg-[#1a1f2e]' : 'bg-gray-200'
                    }`}>
                    <div
                        className="h-full bg-gradient-to-r from-[#272757] to-[#505081] transition-all duration-500"
                        style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    />
                </div>

                {/* Question Card */}
                <div className={`rounded-3xl p-8 mb-8 ${darkMode
                    ? 'bg-[#1a1f2e] border border-[#272757]'
                    : 'bg-white border border-indigo-100 shadow-xl'
                    }`}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`p-4 rounded-2xl ${darkMode ? 'bg-[#272757]' : 'bg-indigo-50'
                            }`}>
                            <QuestionIcon className={`w-8 h-8 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'
                                }`} />
                        </div>
                        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                            {question.title}
                        </h3>
                    </div>

                    {/* Options */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {question.options.map(option => {
                            const isSelected = question.type === 'multiple'
                                ? (answers[question.id] || []).includes(option.id)
                                : answers[question.id] === option.id;

                            return (
                                <button
                                    key={option.id}
                                    onClick={() => handleAnswer(question.id, option.id)}
                                    className={`p-6 rounded-2xl border-2 transition-all text-left ${isSelected
                                        ? darkMode
                                            ? 'bg-[#272757] border-[#505081]'
                                            : 'bg-indigo-50 border-indigo-400'
                                        : darkMode
                                            ? 'bg-[#1a1f2e] border-[#272757] hover:border-[#505081]'
                                            : 'bg-white border-indigo-100 hover:border-indigo-300'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{option.emoji}</span>
                                        <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                            {option.label}
                                        </span>
                                        {isSelected && (
                                            <CheckCircle2 className={`w-5 h-5 ml-auto ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'
                                                }`} />
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {question.type === 'multiple' && (
                        <p className={`text-sm mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            💡 Select all that apply
                        </p>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex gap-4">
                    {currentStep > 0 && (
                        <button
                            onClick={prevStep}
                            className={`px-6 py-4 rounded-xl font-bold transition-all flex items-center gap-2 ${darkMode
                                ? 'bg-[#1a1f2e] border border-[#272757] text-white hover:bg-[#272757]'
                                : 'bg-white border border-indigo-200 text-gray-900 hover:bg-indigo-50'
                                }`}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Previous
                        </button>
                    )}

                    <button
                        onClick={nextStep}
                        disabled={!canProceed()}
                        className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${canProceed()
                            ? 'bg-gradient-to-r from-[#272757] to-[#505081] hover:from-[#505081] hover:to-[#8686AC] text-white'
                            : darkMode
                                ? 'bg-[#1a1f2e] text-gray-600 cursor-not-allowed'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {currentStep === questions.length - 1 ? (
                            <>
                                Get Results
                                <Sparkles className="w-5 h-5" />
                            </>
                        ) : (
                            <>
                                Next Question
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