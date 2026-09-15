import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Lightbulb, TrendingUp, GraduationCap, Briefcase, FileText, Zap, TrendingDown, RotateCcw, AlertCircle, ShieldAlert } from 'lucide-react';
import { aiAdvisor } from '../services/aiCareerAdvisor';
import { resumeAnalyzer } from '../services/resumeAnalyzer';
import { interviewCoach } from '../services/interviewCoach';
import { salaryCoach, careerCoach } from '../services/careerCoach';
import { industryAnalyzer } from '../services/industryAnalyzer';

const STORAGE_KEY = 'cognitrail_pro_chatbot_history';

const AdvancedCareerChatbot = ({ darkMode, onClose }) => {
    const defaultWelcome = {
        id: 'msg_welcome',
        type: 'bot',
        text: "🎯 Welcome to AI Career Advisor Pro!\n\nI'm your dedicated career guidance counselor. I provide strategic advice on:\n\n✨ Career path recommendations & skill mappings\n📄 Resume analysis & ATS keyword optimization\n🎤 Interview preparation & STAR framework answers\n💰 Salary negotiation & compensation benchmarks\n📊 Industry job market trends & automation forecast\n🚀 Structured career pivots & timeline milestones\n\nHow can I help you take your next career step today?",
        suggestions: [
            "Analyze my resume",
            "Prepare for interview",
            "Negotiate salary offer",
            "Career transition guidance",
            "Industry market trends",
            "Career path recommendation"
        ]
    };

    const [messages, setMessages] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [defaultWelcome];
        } catch {
            return [defaultWelcome];
        }
    });

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeFeature, setActiveFeature] = useState('general');
    const [showFeatureMenu, setShowFeatureMenu] = useState(false);
    const messagesEndRef = useRef(null);
    const conversationContextRef = useRef([]);

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

    // Persist messages to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch (e) {
            console.error('Failed to save chat history:', e);
        }
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const features = [
        { id: 'general', icon: Bot, label: 'Career Advisor' },
        { id: 'resume', icon: FileText, label: 'Resume Analysis' },
        { id: 'interview', icon: Zap, label: 'Interview Prep' },
        { id: 'salary', icon: TrendingUp, label: 'Salary & Offer' },
        { id: 'transition', icon: TrendingDown, label: 'Career Pivot' },
        { id: 'market', icon: Briefcase, label: 'Market Trends' }
    ];

    const handleClearChat = () => {
        setMessages([defaultWelcome]);
        conversationContextRef.current = [];
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.error(e);
        }
    };

    const handleSend = async (messageText) => {
        const textToSend = (typeof messageText === 'string' ? messageText : input).trim();
        // Guard against empty message and repeated submission during loading
        if (!textToSend || isLoading) return;

        const userMsgId = `user_${Date.now()}`;
        const userMessage = {
            id: userMsgId,
            type: 'user',
            text: textToSend
        };

        setMessages(prev => [...prev, userMessage]);
        conversationContextRef.current.push({ type: 'user', text: textToSend });
        setInput('');
        setIsLoading(true);

        try {
            let response = '';

            switch (activeFeature) {
                case 'resume':
                    response = await handleResumeAnalysis(textToSend);
                    break;
                case 'interview':
                    response = await handleInterviewPrep(textToSend);
                    break;
                case 'salary':
                    response = await handleSalaryNegotiation(textToSend);
                    break;
                case 'transition':
                    response = await handleCareerTransition(textToSend);
                    break;
                case 'market':
                    response = await handleMarketAnalysis(textToSend);
                    break;
                default:
                    response = await aiAdvisor.getCareerAdvice(textToSend, {}, conversationContextRef.current);
            }

            if (!response || typeof response !== 'string' || response.trim() === '') {
                throw new Error('Empty AI response received');
            }

            const botMessage = {
                id: `bot_${Date.now()}`,
                type: 'bot',
                text: response,
                suggestions: generateSuggestions(activeFeature, textToSend)
            };

            setMessages(prev => [...prev, botMessage]);
            conversationContextRef.current.push({ type: 'bot', text: response });
        } catch (error) {
            console.error('Chatbot Generation Error:', error);
            // Fallback message when AI service is unavailable
            const fallbackText = getOfflineFallbackAdvice(activeFeature, textToSend);
            const errorMessage = {
                id: `bot_fallback_${Date.now()}`,
                type: 'bot',
                text: fallbackText,
                isFallback: true,
                suggestions: [
                    'Take AI Career Quiz',
                    'Explore Roadmap Builder',
                    'College Finder',
                    'Skills Gap Analyzer'
                ]
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResumeAnalysis = async (query) => {
        if (query.toLowerCase().includes('upload') || query.toLowerCase().includes('how')) {
            return "📄 **Resume Optimization Framework**\n\nTo optimize your resume for applicant tracking systems (ATS):\n\n1. **Structure with standard headers**: Experience, Education, Technical Skills, Projects\n2. **Quantify achievements using Google XYZ formula**: Accomplished [X] as measured by [Y], by doing [Z]\n3. **Include high-impact action verbs**: Engineered, Spearheaded, Architected, Optimized\n4. **Keep formatting single-column**: Avoid tables, graphic bars, or text boxes that confuse parsers.";
        }

        const analysis = await resumeAnalyzer.analyzeResume(query, '', '');
        return analysis.success
            ? analysis.analysis
            : analysis.fallbackAdvice;
    };

    const handleInterviewPrep = async (query) => {
        if (query.toLowerCase().includes('software') || query.toLowerCase().includes('engineer')) {
            return await interviewCoach.generateInterviewGuide('Software Engineer', '', '');
        } else if (query.toLowerCase().includes('star') || query.toLowerCase().includes('behavioral')) {
            return await interviewCoach.generateSTARAnswer(query, 'General engineering & leadership context');
        } else {
            return await interviewCoach.generateInterviewGuide('General Role', '', '');
        }
    };

    const handleSalaryNegotiation = async (query) => {
        if (query.toLowerCase().includes('negotiat') || query.toLowerCase().includes('offer')) {
            return await salaryCoach.getSalaryStrategy('Software Engineer', 'India / Remote', '3-5 years');
        } else {
            return await salaryCoach.getSalaryStrategy('Professional Role', 'India', 'Entry-to-Mid level');
        }
    };

    const handleCareerTransition = async (query) => {
        if (query.toLowerCase().includes('switch') || query.toLowerCase().includes('pivot')) {
            return await careerCoach.planCareerTransition('Current Specialization', 'Target High-Growth Domain', '6-12 months');
        } else {
            return await careerCoach.recoverFromSetback('layoff', query);
        }
    };

    const handleMarketAnalysis = async (query) => {
        if (query.toLowerCase().includes('ai') || query.toLowerCase().includes('automation')) {
            return await industryAnalyzer.analyzeAutomationImpact('Software Engineering & Operations', '');
        } else {
            return await industryAnalyzer.getEmergingCareers('2025-2027', []);
        }
    };

    const getOfflineFallbackAdvice = (feature, userQuery) => {
        return `💡 **Career Advisory Insights for "${userQuery}"**\n\nWhile our cloud AI service is connecting, here is the strategic recommendation:\n\n1. **Core Pathway**: Align your next milestone with verified industry skill benchmarks (DSA, System Design, or domain-specific certifications).\n2. **Portfolio Evidence**: Build and deploy at least 2 production-grade projects demonstrating end-to-end implementation.\n3. **Network & Mock Interviews**: Practice STAR behavioral answers and participate in peer code reviews.\n4. **Cognitrail Tools**: Check the **Skills Gap Analyzer** and **Roadmap Builder** to track your step-by-step progress.\n\n*(Note: For dynamic cloud AI responses, ensure your API keys are configured in the environment settings).*`;
    };

    const generateSuggestions = (feature) => {
        const suggestions = {
            general: [
                'Take Career Quiz',
                'Roadmap for Software Engineer',
                'College finder options',
                'Highest paying domains'
            ],
            resume: [
                'ATS action verbs list',
                'How to structure projects',
                'Skills section formatting',
                'Resume scoring checklist'
            ],
            interview: [
                'STAR method breakdown',
                'System design interview tips',
                'Behavioral questions prep',
                'Questions to ask the interviewer'
            ],
            salary: [
                'Counter-offer email template',
                'ESOP & Equity evaluation',
                'Market benchmark compensation',
                'Annual appraisal talking points'
            ],
            transition: [
                'Non-tech to tech transition',
                '6-month transition timeline',
                'Portfolio building guide',
                'LinkedIn networking outreach'
            ],
            market: [
                'Top AI-resilient careers',
                'Cloud & cybersecurity demand',
                'Global remote work trends',
                'Skills in highest demand 2025'
            ]
        };

        return suggestions[feature] || suggestions.general;
    };

    const handleSuggestionClick = (suggestion) => {
        handleSend(suggestion);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div
            className={`fixed bottom-4 right-4 sm:right-6 z-50 flex flex-col rounded-3xl shadow-2xl border transition-all animate-fade-in w-[calc(100vw-32px)] sm:w-[440px] max-h-[85vh] ${darkMode ? 'bg-[#121215] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'
                }`}
            style={{ height: '680px' }}
        >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-zinc-800 bg-[#18181b]' : 'border-zinc-200 bg-zinc-50'
                } rounded-t-3xl`}>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-black text-white border-zinc-800'
                            }`}>
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-white rounded-full border-2 border-black dark:border-white"></div>
                    </div>
                    <div>
                        <h3 className="font-black text-sm flex items-center gap-1.5">
                            AI Career Advisor Pro
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase text-zinc-400 border-zinc-700">
                                Live
                            </span>
                        </h3>
                        <p className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            Monochrome intelligence agent
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={handleClearChat}
                        title="Clear chat history"
                        className={`p-2 rounded-xl border transition-all btn-interactive ${darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black'
                            }`}
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={onClose}
                        title="Close advisor"
                        className={`p-2 rounded-xl border transition-all btn-interactive ${darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black'
                            }`}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Feature Specialist Menu Toggle */}
            <div className={`p-3 border-b ${darkMode ? 'border-zinc-800 bg-[#09090b]' : 'border-zinc-200 bg-zinc-50/70'
                }`}>
                <div className="flex items-center justify-between">
                    <p className={`text-xs font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Active Specialist Track:
                    </p>
                    <button
                        onClick={() => setShowFeatureMenu(!showFeatureMenu)}
                        className={`text-xs px-3 py-1 rounded-full border font-bold transition-all btn-interactive ${darkMode
                            ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700'
                            : 'bg-white hover:bg-zinc-100 text-black border-zinc-300 shadow-sm'
                            }`}
                    >
                        {features.find(f => f.id === activeFeature)?.label || 'Select'} ▼
                    </button>
                </div>

                {showFeatureMenu && (
                    <div className="grid grid-cols-2 gap-2 mt-2.5 animate-fade-in">
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
                                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all btn-interactive ${isSelected
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

            {/* Messages Scroll Area */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${darkMode ? 'bg-[#09090b]' : 'bg-[#fafafa]'
                }`}>
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                        <div className={`flex gap-2.5 max-w-[88%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Avatar */}
                            <div className={`flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center border text-xs ${message.type === 'user'
                                ? darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                                : darkMode ? 'bg-zinc-900 text-zinc-300 border-zinc-800' : 'bg-zinc-100 text-zinc-800 border-zinc-300'
                                }`}>
                                {message.type === 'user' ? (
                                    <User className="w-3.5 h-3.5" />
                                ) : (
                                    <Sparkles className="w-3.5 h-3.5" />
                                )}
                            </div>

                            {/* Message Body */}
                            <div className="flex-1 overflow-hidden">
                                <div className={`rounded-2xl px-4 py-3 border text-xs sm:text-sm leading-relaxed break-words ${message.type === 'user'
                                    ? darkMode
                                        ? 'bg-white text-black border-white font-medium'
                                        : 'bg-black text-white border-black font-medium'
                                    : darkMode
                                        ? 'bg-[#18181b] text-zinc-100 border-zinc-800'
                                        : 'bg-white text-zinc-900 border-zinc-200 shadow-sm'
                                    }`}>
                                    <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
                                </div>

                                {/* Suggestions */}
                                {message.suggestions && message.suggestions.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                        {message.suggestions.map((suggestion, idx) => (
                                            <button
                                                key={idx}
                                                disabled={isLoading}
                                                onClick={() => handleSuggestionClick(suggestion)}
                                                className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-all btn-interactive disabled:opacity-50 ${darkMode
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
                    <div className="flex gap-2.5 animate-fade-in">
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center border ${darkMode ? 'bg-zinc-900 text-zinc-300 border-zinc-800' : 'bg-zinc-100 text-zinc-800 border-zinc-300'
                            }`}>
                            <Sparkles className="w-3.5 h-3.5 animate-spin" />
                        </div>
                        <div className={`rounded-2xl px-4 py-3 border ${darkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-400' : 'bg-white border-zinc-200 text-zinc-600 shadow-sm'
                            }`}>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                <span className="text-xs font-semibold ml-1">Analyzing career guidance parameters...</span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className={`p-3.5 border-t ${darkMode ? 'border-zinc-800 bg-[#121215]' : 'border-zinc-200 bg-white'
                } rounded-b-3xl`}>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={`Ask ${features.find(f => f.id === activeFeature)?.label || 'Advisor'}...`}
                        disabled={isLoading}
                        className={`flex-1 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all border outline-none ${darkMode
                            ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-500'
                            : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-black'
                            } disabled:opacity-50`}
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={isLoading || !input.trim()}
                        className={`px-3.5 py-2.5 rounded-xl transition-all btn-interactive flex items-center justify-center ${input.trim() && !isLoading
                            ? darkMode
                                ? 'bg-white text-black hover:bg-zinc-200'
                                : 'bg-black text-white hover:bg-zinc-800'
                            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
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
