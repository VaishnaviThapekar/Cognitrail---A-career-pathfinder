import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Lightbulb, TrendingUp, GraduationCap, Briefcase, FileText, Zap, TrendingDown } from 'lucide-react';
import { aiAdvisor } from '../services/aiCareerAdvisor';
import { resumeAnalyzer } from '../services/resumeAnalyzer';
import { interviewCoach } from '../services/interviewCoach';
import { salaryCoach, careerCoach } from '../services/careerCoach';
import { industryAnalyzer } from '../services/industryAnalyzer';

const AdvancedCareerChatbot = ({ darkMode, onClose }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "🎯 Welcome to AI Career Advisor Pro!\n\nI'm your advanced career counselor powered by GPT-4. I can help you with:\n\n✨ Career path recommendations\n📄 Resume analysis & ATS optimization\n🎤 Interview preparation & STAR framework\n💰 Salary negotiation strategies\n📊 Job market trends & analysis\n🚀 Career transitions & growth\n\nWhat would you like help with today?",
            suggestions: [
                "Analyze my resume",
                "Prepare for interview",
                "Negotiate salary",
                "Career transition guidance",
                "Industry market analysis",
                "Career path recommendation"
            ]
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeFeature, setActiveFeature] = useState('general');
    const [showFeatureMenu, setShowFeatureMenu] = useState(false);
    const messagesEndRef = useRef(null);
    const conversationContextRef = useRef([]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const features = [
        { id: 'general', icon: Bot, label: 'Career Advisor' },
        { id: 'resume', icon: FileText, label: 'Resume Analysis' },
        { id: 'interview', icon: Zap, label: 'Interview Prep' },
        { id: 'salary', icon: TrendingUp, label: 'Salary & Offer' },
        { id: 'transition', icon: TrendingDown, label: 'Career Transition' },
        { id: 'market', icon: Briefcase, label: 'Market Trends' }
    ];

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            text: input
        };

        setMessages(prev => [...prev, userMessage]);
        conversationContextRef.current.push({ type: 'user', text: input });
        setInput('');
        setIsLoading(true);

        try {
            let response = '';

            switch (activeFeature) {
                case 'resume':
                    response = await handleResumeAnalysis(input);
                    break;
                case 'interview':
                    response = await handleInterviewPrep(input);
                    break;
                case 'salary':
                    response = await handleSalaryNegotiation(input);
                    break;
                case 'transition':
                    response = await handleCareerTransition(input);
                    break;
                case 'market':
                    response = await handleMarketAnalysis(input);
                    break;
                default:
                    response = await aiAdvisor.getCareerAdvice(input, {}, conversationContextRef.current);
            }

            const botMessage = {
                id: messages.length + 2,
                type: 'bot',
                text: response,
                suggestions: generateSuggestions(activeFeature, input)
            };

            setMessages(prev => [...prev, botMessage]);
            conversationContextRef.current.push({ type: 'bot', text: response });
        } catch (error) {
            console.error('Chatbot Error:', error);
            const errorMessage = {
                id: messages.length + 2,
                type: 'bot',
                text: '⚠️ I encountered an issue while generating the response. Please try asking again or switch to a different query topic.',
                suggestions: ['Retry query', 'Career Quiz', 'Explore Roadmaps']
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResumeAnalysis = async (input) => {
        if (input.toLowerCase().includes('upload') || input.toLowerCase().includes('paste')) {
            return "📄 **Resume Analysis**\n\nPlease paste your resume content, and I'll analyze it for:\n• ATS optimization\n• Impact statement improvements\n• Keyword suggestions\n• Format recommendations\n• Overall scoring\n\nYou can also specify the target role for more targeted feedback!";
        }

        const analysis = await resumeAnalyzer.analyzeResume(input, '', '');
        return analysis.success
            ? analysis.analysis
            : analysis.fallbackAdvice;
    };

    const handleInterviewPrep = async (input) => {
        if (input.toLowerCase().includes('software engineer') || input.toLowerCase().includes('engineer')) {
            return await interviewCoach.generateInterviewGuide('Software Engineer', '', '');
        } else if (input.toLowerCase().includes('question')) {
            return await interviewCoach.generateSTARAnswer(input, 'Career development context');
        } else {
            return await interviewCoach.generateInterviewGuide('General Role', '', '');
        }
    };

    const handleSalaryNegotiation = async (input) => {
        if (input.toLowerCase().includes('negotiate') || input.toLowerCase().includes('offer')) {
            return await salaryCoach.getSalaryStrategy('Software Engineer', 'India', '3-5 years');
        } else if (input.toLowerCase().includes('transition')) {
            return await careerCoach.planCareerTransition('Software Engineer', 'Product Manager', '12 months');
        } else {
            return await salaryCoach.getSalaryStrategy('General Role', 'India', '');
        }
    };

    const handleCareerTransition = async (input) => {
        if (input.toLowerCase().includes('industry')) {
            return await careerCoach.changeIndustry('IT', 'Finance', 'Software Engineer', []);
        } else if (input.toLowerCase().includes('setback') || input.toLowerCase().includes('layoff')) {
            return await careerCoach.recoverFromSetback('layoff', input);
        } else {
            return await careerCoach.planCareerTransition('Current Role', 'Target Role', '6-12 months');
        }
    };

    const handleMarketAnalysis = async (input) => {
        if (input.toLowerCase().includes('skill') || input.toLowerCase().includes('demand')) {
            return await industryAnalyzer.getSkillDemandForecast('Tech', '2025-2027');
        } else if (input.toLowerCase().includes('ai') || input.toLowerCase().includes('automation')) {
            return await industryAnalyzer.analyzeAutomationImpact('Software Engineer', '');
        } else if (input.toLowerCase().includes('future') || input.toLowerCase().includes('trend')) {
            return await industryAnalyzer.getEmergingCareers('2025-2027', []);
        } else {
            return await industryAnalyzer.analyzeIndustry('Technology', '');
        }
    };

    const generateSuggestions = (feature, input) => {
        const suggestions = {
            general: [
                'Career quiz recommendations',
                'Salary benchmarks',
                'College guidance',
                'Study tips'
            ],
            resume: [
                'Optimize for ATS',
                'Action verbs list',
                'Skills section structure',
                'Format checklist'
            ],
            interview: [
                'STAR method breakdown',
                'Technical questions',
                'Company research tips',
                'Follow-up emails'
            ],
            salary: [
                'Negotiate bonuses & equity',
                'Counter-offer templates',
                'Market rate analysis',
                'Appraisal discussions'
            ],
            transition: [
                'Skill gap roadmap',
                'Portfolio builder',
                'LinkedIn networking strategy',
                'Timeline milestones'
            ],
            market: [
                'Top emerging domains',
                'Skill demand forecast',
                'Remote work trends',
                'AI impact report'
            ]
        };

        return suggestions[feature] || suggestions.general;
    };

    const handleSuggestionClick = async (suggestion) => {
        setInput(suggestion);
        setTimeout(() => handleSend(), 100);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={`fixed bottom-4 right-4 z-50 flex flex-col rounded-2xl shadow-2xl border transition-all animate-fade-in ${
            darkMode ? 'bg-[#121215] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'
        }`} style={{ width: '450px', maxHeight: '760px' }}>

            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${
                darkMode ? 'border-zinc-800 bg-[#18181b]' : 'border-zinc-200 bg-zinc-50'
            } rounded-t-2xl`}>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                            darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-black text-white border-zinc-800'
                        }`}>
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-zinc-400 rounded-full border-2 border-current"></div>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">AI Career Advisor Pro</h3>
                        <p className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>monochrome AI agent</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className={`p-2 rounded-lg border transition-all btn-interactive ${
                        darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black'
                    }`}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Feature Menu Toggle */}
            <div className={`p-3 border-b ${
                darkMode ? 'border-zinc-800 bg-[#09090b]' : 'border-zinc-200 bg-zinc-50/60'
            }`}>
                <div className="flex items-center justify-between mb-2">
                    <p className={`text-xs font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Active Specialist:
                    </p>
                    <button
                        onClick={() => setShowFeatureMenu(!showFeatureMenu)}
                        className={`text-xs px-3 py-1 rounded-full border font-medium transition-all btn-interactive ${
                            darkMode
                                ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700'
                                : 'bg-white hover:bg-zinc-100 text-black border-zinc-300 shadow-sm'
                        }`}
                    >
                        {features.find(f => f.id === activeFeature)?.label || 'Select'} ▼
                    </button>
                </div>

                {showFeatureMenu && (
                    <div className="grid grid-cols-2 gap-2 mt-2 animate-fade-in">
                        {features.map(feature => {
                            const Icon = feature.icon;
                            const isSelected = activeFeature === feature.id;
                            return (
                                <button
                                    key={feature.id}
                                    onClick={() => {
                                        setActiveFeature(feature.id);
                                        setShowFeatureMenu(false);
                                    }}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all btn-interactive ${
                                        isSelected
                                            ? darkMode
                                                ? 'bg-white text-black border-white'
                                                : 'bg-black text-white border-black'
                                            : darkMode
                                                ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border-zinc-800'
                                                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-200'
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    <span>{feature.label}</span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
                darkMode ? 'bg-[#09090b]' : 'bg-[#fafafa]'
            }`} style={{ maxHeight: 'calc(760px - 280px)' }}>
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                        <div className={`flex gap-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Avatar */}
                            <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center border text-xs ${
                                message.type === 'user'
                                    ? darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                                    : darkMode ? 'bg-zinc-900 text-zinc-300 border-zinc-800' : 'bg-zinc-100 text-zinc-800 border-zinc-300'
                            }`}>
                                {message.type === 'user' ? (
                                    <User className="w-3.5 h-3.5" />
                                ) : (
                                    <Sparkles className="w-3.5 h-3.5" />
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <div className={`rounded-2xl px-4 py-3 border text-sm leading-relaxed ${
                                    message.type === 'user'
                                        ? darkMode
                                            ? 'bg-white text-black border-white'
                                            : 'bg-black text-white border-black'
                                        : darkMode
                                            ? 'bg-[#18181b] text-zinc-100 border-zinc-800'
                                            : 'bg-white text-zinc-900 border-zinc-200 shadow-sm'
                                }`}>
                                    <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
                                </div>

                                {/* Suggestions */}
                                {message.suggestions && (
                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                        {message.suggestions.map((suggestion, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSuggestionClick(suggestion)}
                                                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all btn-interactive ${
                                                    darkMode
                                                        ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
                                                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300'
                                                }`}
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                    <div className="flex gap-2 animate-fade-in">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                            darkMode ? 'bg-zinc-900 text-zinc-300 border-zinc-800' : 'bg-zinc-100 text-zinc-800 border-zinc-300'
                        }`}>
                            <Sparkles className="w-3.5 h-3.5 animate-spin" />
                        </div>
                        <div className={`rounded-2xl px-4 py-3 border ${
                            darkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-400' : 'bg-white border-zinc-200 text-zinc-500 shadow-sm'
                        }`}>
                            <p className="text-xs">Thinking & generating strategy...</p>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`p-3.5 border-t ${
                darkMode ? 'border-zinc-800 bg-[#121215]' : 'border-zinc-200 bg-white'
            } rounded-b-2xl`}>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask advisor pro..."
                        disabled={isLoading}
                        className={`flex-1 px-3.5 py-2.5 rounded-xl text-sm transition-all border outline-none ${
                            darkMode
                                ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-400'
                                : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-black'
                        } disabled:opacity-50`}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className={`p-2.5 rounded-xl transition-all btn-interactive flex items-center justify-center ${
                            input.trim() && !isLoading
                                ? darkMode
                                    ? 'bg-white text-black hover:bg-zinc-200'
                                    : 'bg-black text-white hover:bg-zinc-800'
                                : 'bg-zinc-300 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        }`}
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdvancedCareerChatbot;
