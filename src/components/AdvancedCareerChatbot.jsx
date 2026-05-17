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
            text: "🎯 Welcome to AI Career Advisor Pro!\n\nI'm your advanced career counselor powered by GPT-4. I can help you with:\n\n✨ Career path recommendations\n📄 Resume analysis & optimization\n🎤 Interview preparation\n💰 Salary negotiation strategies\n📊 Job market trends & analysis\n🚀 Career transitions & growth\n\nWhat would you like help with today?",
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
        { id: 'general', icon: Bot, label: 'Career Advisor', color: 'from-indigo-600 to-blue-600' },
        { id: 'resume', icon: FileText, label: 'Resume Analysis', color: 'from-purple-600 to-pink-600' },
        { id: 'interview', icon: Zap, label: 'Interview Prep', color: 'from-orange-600 to-red-600' },
        { id: 'salary', icon: TrendingUp, label: 'Salary & Negotiation', color: 'from-green-600 to-emerald-600' },
        { id: 'transition', icon: TrendingDown, label: 'Career Transition', color: 'from-blue-600 to-cyan-600' },
        { id: 'market', icon: Briefcase, label: 'Market Analysis', color: 'from-yellow-600 to-orange-600' }
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
                text: '⚠️ I encountered an issue. Please check your API configuration and try again.\n\nMake sure your OpenAI/Gemini API key is properly set in the environment variables.',
                suggestions: ['Retry', 'Go back', 'Contact support']
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
                'Salary information',
                'College guidance',
                'Study tips'
            ],
            resume: [
                'Optimize for ATS',
                'Impact statements',
                'Skills section',
                'Format tips'
            ],
            interview: [
                'STAR method examples',
                'Technical interview prep',
                'Company research tips',
                'Follow-up templates'
            ],
            salary: [
                'Negotiate benefits',
                'Equity compensation',
                'Counter-offer strategy',
                'Market comparison'
            ],
            transition: [
                'Skill development plan',
                'Portfolio building',
                'Networking strategy',
                'Timeline planning'
            ],
            market: [
                'Emerging roles',
                'Skill demand forecast',
                'Geographic analysis',
                'Recession impact'
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
        <div className={`fixed bottom-4 right-4 z-50 flex flex-col ${darkMode ? 'bg-[#1a1f2e]' : 'bg-white'
            } rounded-2xl shadow-2xl border-2 ${darkMode ? 'border-[#272757]' : 'border-indigo-100'
            }`} style={{ width: '450px', maxHeight: '750px' }}>

            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-[#272757] bg-gradient-to-r from-[#272757] to-[#505081]' : 'border-indigo-100 bg-gradient-to-r from-indigo-600 to-blue-600'
                } rounded-t-2xl`}>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                        <h3 className="text-white font-bold">AI Career Advisor Pro</h3>
                        <p className="text-white/80 text-xs">Powered by GPT-4</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                    <X className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* Feature Menu Toggle */}
            <div className={`p-3 border-b ${darkMode ? 'border-[#272757] bg-[#0f1419]' : 'border-indigo-50 bg-indigo-50/50'}`}>
                <div className="flex items-center justify-between mb-2">
                    <p className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Feature Mode:
                    </p>
                    <button
                        onClick={() => setShowFeatureMenu(!showFeatureMenu)}
                        className={`text-xs px-3 py-1 rounded-full transition-all ${darkMode
                            ? 'bg-[#272757] hover:bg-[#505081] text-[#8686AC]'
                            : 'bg-white hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                            }`}
                    >
                        {features.find(f => f.id === activeFeature)?.label || 'Select'} ▼
                    </button>
                </div>

                {showFeatureMenu && (
                    <div className="grid grid-cols-2 gap-2">
                        {features.map(feature => {
                            const Icon = feature.icon;
                            return (
                                <button
                                    key={feature.id}
                                    onClick={() => {
                                        setActiveFeature(feature.id);
                                        setShowFeatureMenu(false);
                                    }}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${activeFeature === feature.id
                                            ? darkMode
                                                ? `bg-gradient-to-r ${feature.color} text-white`
                                                : `bg-gradient-to-r ${feature.color} text-white`
                                            : darkMode
                                                ? 'bg-[#272757] hover:bg-[#505081] text-[#8686AC]'
                                                : 'bg-white hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
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
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${darkMode ? 'bg-[#0f1419]' : 'bg-gray-50'
                }`} style={{ maxHeight: 'calc(750px - 280px)' }}>
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Avatar */}
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user'
                                ? darkMode ? 'bg-[#505081]' : 'bg-indigo-600'
                                : darkMode ? 'bg-[#272757]' : 'bg-indigo-100'
                                }`}>
                                {message.type === 'user' ? (
                                    <User className="w-4 h-4 text-white" />
                                ) : (
                                    <Sparkles className="w-4 h-4" style={{ color: darkMode ? '#8686AC' : '#4f46e5' }} />
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <div className={`rounded-2xl px-4 py-3 ${message.type === 'user'
                                    ? darkMode
                                        ? 'bg-gradient-to-r from-[#505081] to-[#8686AC] text-white'
                                        : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white'
                                    : darkMode
                                        ? 'bg-[#1a1f2e] text-gray-200 border border-[#272757]'
                                        : 'bg-white text-gray-800 border border-indigo-100'
                                    }`}>
                                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                                </div>

                                {/* Suggestions */}
                                {message.suggestions && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {message.suggestions.map((suggestion, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSuggestionClick(suggestion)}
                                                className={`text-xs px-3 py-1.5 rounded-full transition-all ${darkMode
                                                    ? 'bg-[#272757] hover:bg-[#505081] text-[#8686AC] border border-[#505081]'
                                                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
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
                    <div className="flex gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-[#272757]' : 'bg-indigo-100'
                            }`}>
                            <Sparkles className={`w-4 h-4 animate-spin ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'}`} />
                        </div>
                        <div className={`rounded-2xl px-4 py-3 ${darkMode ? 'bg-[#1a1f2e] border border-[#272757]' : 'bg-white border border-indigo-100'
                            }`}>
                            <p className="text-xs text-gray-500">AI is thinking...</p>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`p-4 border-t ${darkMode ? 'border-[#272757] bg-[#1a1f2e]' : 'border-indigo-100 bg-white'
                } rounded-b-2xl`}>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything..."
                        disabled={isLoading}
                        className={`flex-1 px-4 py-3 rounded-xl transition-all ${darkMode
                            ? 'bg-[#0f1419] border-[#272757] text-white placeholder-gray-500'
                            : 'bg-gray-50 border-indigo-100 text-gray-900 placeholder-gray-400'
                            } border focus:outline-none focus:ring-2 focus:ring-[#505081] disabled:opacity-50`}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white transition-all disabled:opacity-50"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdvancedCareerChatbot;
