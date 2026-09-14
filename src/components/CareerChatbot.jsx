import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Lightbulb, TrendingUp, GraduationCap, Briefcase, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'cognitrail_modal_chat_history';

const CareerChatbot = ({ darkMode, onClose }) => {
    const defaultWelcome = {
        id: 'modal_welcome',
        type: 'bot',
        text: "Hi! 👋 I'm your Career Assistant. I'm here to help you with:\n\n• Career recommendations & paths\n• Exam preparation guidance (JEE, NEET, CAT, CLAT, UPSC)\n• College & course selection\n• Market salary benchmarks\n• Strategic study tips",
        suggestions: [
            "Career recommendations",
            "Exam information",
            "College guidance",
            "Salary information",
            "Study tips"
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
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Save chat history
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
    }, [messages, isTyping]);

    const quickQuestions = [
        { icon: GraduationCap, text: "Best careers for me?", category: "careers" },
        { icon: Briefcase, text: "Software Engineer salary?", category: "salary" },
        { icon: TrendingUp, text: "How to prepare for JEE?", category: "exam" },
        { icon: Lightbulb, text: "Which college should I choose?", category: "college" }
    ];

    const handleClearChat = () => {
        setMessages([defaultWelcome]);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.error(e);
        }
    };

    const generateResponse = async (userMessage) => {
        setIsTyping(true);

        // Natural typing pause
        await new Promise(resolve => setTimeout(resolve, 600));

        const lowerMessage = userMessage.toLowerCase();
        let response = '';
        let suggestions = [];

        // Career recommendations
        if (lowerMessage.includes('career') || lowerMessage.includes('recommend') || lowerMessage.includes('best for me')) {
            response = "To recommend the best careers for you, explore our AI Career Quiz which calculates multidimensional fit scores based on your strengths!\n\nTrending high-growth careers right now:\n\n💻 **Software Engineer & AI** — High demand, ₹8-50 LPA\n⚕️ **Doctor & Surgeon** — Respected clinical practice, ₹6-30 LPA\n💼 **Product Manager** — Cross-functional leadership, ₹12-45 LPA\n🎨 **UI/UX Designer** — Digital product experience, ₹6-25 LPA\n📊 **Data Scientist & ML Engineer** — Predictive AI analytics, ₹10-40 LPA\n⚖️ **Corporate Lawyer** — High-stakes legal advisory, ₹8-35 LPA";
            suggestions = ["Take Career Quiz", "Software Engineer details", "Doctor requirements", "Explore Roadmaps"];
        }
        // Exam preparation
        else if (lowerMessage.includes('jee') || lowerMessage.includes('neet') || lowerMessage.includes('upsc') || lowerMessage.includes('clat') || lowerMessage.includes('cat') || lowerMessage.includes('exam') || lowerMessage.includes('prepare')) {
            const exam = lowerMessage.includes('jee') ? 'JEE' : lowerMessage.includes('neet') ? 'NEET' : lowerMessage.includes('upsc') ? 'UPSC' : lowerMessage.includes('clat') ? 'CLAT' : lowerMessage.includes('cat') ? 'CAT' : 'Competitive Exam';
            response = `Great question regarding **${exam} preparation**! Here is the proven 3-phase strategy:\n\n📚 **Phase 1: Concept Mastery (Months 1-6)**\n• Complete foundational NCERT / standard texts thoroughly\n• Focus on core concept clarity over rote memorization\n• Maintain structured formula and revision sheets\n\n💪 **Phase 2: Rigorous Practice (Months 7-10)**\n• Solve 10+ years of previous year papers (PYQs)\n• Take weekly full-length timed mock tests\n• Maintain an error logbook to eliminate repeat mistakes\n\n🎯 **Phase 3: Test Conditioning (Months 11-12)**\n• Simulate real exam timings and negative-marking discipline\n• Focus heavily on high-weightage topics and speed`;
            suggestions = ["Study schedule template", "Mock test strategy", "Recommended books", "Managing exam stress"];
        }
        // College guidance
        else if (lowerMessage.includes('college') || lowerMessage.includes('iit') || lowerMessage.includes('nit') || lowerMessage.includes('admission')) {
            response = "Choosing the right university is a pivotal career decision! Check our **College Finder** with NIRF-sourced records across India.\n\n🏛️ **Top Institution Categories:**\n• **IITs & NITs**: Premier national institutes with stellar placement track records\n• **AIIMS & Top GMCs**: Gold-standard clinical exposure and subsidized medical education\n• **NLUs & IIMs**: Premier law and management centers with elite alumni networks\n• **BITS & Top Private Universities**: Autonomous curriculum with strong global industry linkages\n\n🎯 **Key Evaluation Factors:** NIRF Rank, Median CTC, Faculty-Student Ratio, and Alumni Network.";
            suggestions = ["Open College Finder", "NIRF Top Ranked Colleges", "Government vs Private", "Placement Statistics"];
        }
        // Salary information
        else if (lowerMessage.includes('salary') || lowerMessage.includes('pay') || lowerMessage.includes('earn') || lowerMessage.includes('ctc')) {
            const career = lowerMessage.includes('engineer') ? 'Software Engineer' :
                lowerMessage.includes('doctor') ? 'Doctor' :
                    lowerMessage.includes('ca') ? 'Chartered Accountant' : 'Key Careers';

            if (career === 'Software Engineer') {
                response = "💰 **Software Engineer Compensation Guide (India & Remote):**\n\n**Freshers (0-2 years):**\n• Service Enterprises: ₹4-8 LPA\n• Product Startups: ₹10-20 LPA\n• Tier-1 Product / FAANG: ₹18-50 LPA\n\n**Mid-Level (3-6 years):**\n• Average: ₹15-30 LPA\n• Senior Engineer: ₹30-55 LPA\n\n**Leadership (7+ years):**\n• Staff Engineer / Architect: ₹55-1Cr+\n\n*Key Salary Multipliers: Data Structures mastery, System Design, Cloud Architecture (AWS/GCP), and Production LLM experience.*";
            } else if (career === 'Doctor') {
                response = "💰 **Medical Doctor Compensation Overview:**\n\n**Early Career (MBBS + Internship):**\n• Rotatory Stipend: ₹25k - ₹65k / month\n• Junior Resident: ₹6-10 LPA\n\n**Post-Graduation (MD/MS Specialist):**\n• Hospital Consultant: ₹15-35 LPA\n• Super-Specialist (Cardio/Neuro/Radio): ₹30-75 LPA+\n\n**Senior Practice (10+ years):**\n• Private Practice / Clinic Ownership: ₹50L - ₹1Cr+";
            } else {
                response = "💰 **Top Industry Compensation Ranges:**\n\n**High Range (₹15-50L+):**\n• AI & Machine Learning Engineers\n• Tech Product Managers\n• Investment Bankers & Quantitative Analysts\n\n**Strong Growth (₹8-25L):**\n• Chartered Accountants\n• Corporate Lawyers\n• Full-Stack Developers & Cloud Architects\n\n*Focus on high-leverage problem solving skills to accelerate compensation.*";
            }
            suggestions = ["Compare Salaries", "Skills that pay highest", "Negotiation strategies", "Equity vs Cash"];
        }
        // Study tips
        else if (lowerMessage.includes('study') || lowerMessage.includes('tips') || lowerMessage.includes('focus') || lowerMessage.includes('routine')) {
            response = "📚 **High-Performance Study Framework:**\n\n**⏰ Time Blocking & Deep Work:**\n• Apply Pomodoro: 50 min deep work + 10 min break\n• Schedule highest difficulty subjects during morning cognitive peak\n• Aim for 7-8 hours of non-negotiable sleep for memory consolidation\n\n**🧠 Active Learning Techniques:**\n• **Active Recall**: Test yourself before looking at answers\n• **Feynman Technique**: Explain complex topics in simple language\n• **Spaced Repetition**: Review key concepts at 1, 3, 7, and 21 day intervals";
            suggestions = ["Daily study schedule", "Active recall guide", "Avoid burnout", "Subject prioritization"];
        }
        // General fallback
        else {
            response = `I understand you're inquiring about: **"${userMessage}"**\n\nHere are the fastest ways to get actionable guidance on Cognitrail:\n\n1. 🧭 **AI Career Quiz** — Discover careers matching your psychological strengths\n2. 🗺️ **Roadmap Builder** — Step-by-step milestones from school to leadership\n3. 🎓 **College Finder** — 190+ verified institutions with ratings & fees\n4. 📊 **Skills Gap Analyzer** — Benchmark your current skillset against target roles\n\nWhat specific guidance would you like to explore next?`;
            suggestions = ["Take Career Quiz", "Open College Finder", "View Career Roadmaps", "Analyze Skills Gap"];
        }

        setIsTyping(false);

        return {
            type: 'bot',
            text: response,
            suggestions: suggestions.length > 0 ? suggestions : null
        };
    };

    const handleSend = async (customText) => {
        const textToSend = (typeof customText === 'string' ? customText : input).trim();
        // Guard against empty message and multiple sends while typing
        if (!textToSend || isTyping) return;

        const userMessage = {
            id: `usr_${Date.now()}`,
            type: 'user',
            text: textToSend
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');

        const botResponse = await generateResponse(textToSend);
        setMessages(prev => [...prev, { ...botResponse, id: `bot_${Date.now()}` }]);
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
        <div className={`fixed inset-0 z-50 animate-fade-in ${darkMode ? 'bg-black/80 backdrop-blur-md' : 'bg-black/40 backdrop-blur-md'
            } flex items-center justify-center p-3 sm:p-4`}>
            <div className={`w-full max-w-4xl h-[92vh] max-h-[850px] flex flex-col rounded-3xl shadow-2xl border overflow-hidden ${darkMode ? 'bg-[#121215] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'
                }`}>

                {/* Header */}
                <div className={`flex items-center justify-between px-5 sm:px-6 py-4 border-b ${darkMode ? 'border-zinc-800 bg-[#18181b]' : 'border-zinc-200 bg-zinc-50'
                    }`}>
                    <div className="flex items-center gap-3.5">
                        <div className="relative">
                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-black text-white border-zinc-800'
                                }`}>
                                <Bot className="w-5 h-5" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-full border-2 border-black dark:border-white"></div>
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-black tracking-tight">
                                Career Assistant AI
                            </h2>
                            <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                Instant verified guidance on careers, exams, and university roadmaps
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={handleClearChat}
                            title="Reset chat session"
                            className={`p-2 rounded-xl border transition-all btn-interactive ${darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black'
                                }`}
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onClose}
                            className={`p-2.5 rounded-xl border transition-all btn-interactive ${darkMode
                                ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                                : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black hover:bg-zinc-200'
                                }`}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Popular Topics Bar */}
                <div className={`px-5 sm:px-6 py-3 border-b overflow-x-auto ${darkMode ? 'border-zinc-800 bg-[#09090b]' : 'border-zinc-200 bg-zinc-50/70'
                    }`}>
                    <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-bold uppercase tracking-wider whitespace-nowrap ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            Popular Inquiries:
                        </span>
                        <div className="flex items-center gap-2 overflow-x-auto">
                            {quickQuestions.map((q, idx) => {
                                const Icon = q.icon;
                                return (
                                    <button
                                        key={idx}
                                        disabled={isTyping}
                                        onClick={() => handleSuggestionClick(q.text)}
                                        className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all btn-interactive border disabled:opacity-50 ${darkMode
                                            ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
                                            : 'bg-white hover:bg-zinc-100 text-zinc-800 border-zinc-200 shadow-sm'
                                            }`}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                        <span>{q.text}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Messages Container */}
                <div className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 ${darkMode ? 'bg-[#09090b]' : 'bg-[#fafafa]'
                    }`}>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                                <div className={`flex gap-3 max-w-[90%] sm:max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {/* Avatar */}
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border text-xs font-bold ${message.type === 'user'
                                        ? darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                                        : darkMode ? 'bg-zinc-900 text-zinc-300 border-zinc-800' : 'bg-zinc-100 text-zinc-800 border-zinc-300'
                                        }`}>
                                        {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    </div>

                                    {/* Message Body */}
                                    <div className="flex-1 overflow-hidden">
                                        <div className={`rounded-2xl px-4 sm:px-5 py-3.5 border transition-all break-words ${message.type === 'user'
                                            ? darkMode
                                                ? 'bg-white text-black border-white font-medium'
                                                : 'bg-black text-white border-black font-medium'
                                            : darkMode
                                                ? 'bg-[#18181b] text-zinc-100 border-zinc-800'
                                                : 'bg-white text-zinc-900 border-zinc-200 shadow-sm'
                                            }`}>
                                            <p className="text-xs sm:text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                                        </div>

                                        {/* Suggestions Pill Buttons */}
                                        {message.suggestions && message.suggestions.length > 0 && (
                                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                                                {message.suggestions.map((suggestion, idx) => (
                                                    <button
                                                        key={idx}
                                                        disabled={isTyping}
                                                        onClick={() => handleSuggestionClick(suggestion)}
                                                        className={`text-xs px-3 py-1 rounded-xl border font-semibold transition-all btn-interactive disabled:opacity-50 ${darkMode
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

                        {/* Typing / Loading indicator */}
                        {isTyping && (
                            <div className="flex gap-3 animate-fade-in">
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${darkMode ? 'bg-zinc-900 text-zinc-300 border-zinc-800' : 'bg-zinc-100 text-zinc-800 border-zinc-300'
                                    }`}>
                                    <Sparkles className="w-4 h-4 animate-spin" />
                                </div>
                                <div className={`rounded-2xl px-5 py-3.5 border ${darkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-400' : 'bg-white border-zinc-200 text-zinc-600 shadow-sm'
                                    }`}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        <span className="text-xs font-semibold ml-1">Consulting knowledge base...</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Bar */}
                <div className={`p-4 border-t ${darkMode ? 'border-zinc-800 bg-[#121215]' : 'border-zinc-200 bg-white'
                    }`}>
                    <div className="max-w-3xl mx-auto flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask any career, college, exam, or salary question..."
                            disabled={isTyping}
                            className={`flex-1 px-4 py-3 rounded-2xl text-xs sm:text-sm transition-all border outline-none ${darkMode
                                ? 'bg-[#18181b] border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-500'
                                : 'bg-zinc-50 border-zinc-300 text-black placeholder-zinc-400 focus:border-black'
                                } disabled:opacity-50`}
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={isTyping || !input.trim()}
                            className={`px-5 py-3 rounded-2xl font-bold text-xs transition-all btn-interactive flex items-center justify-center gap-1.5 ${input.trim() && !isTyping
                                ? darkMode
                                    ? 'bg-white text-black hover:bg-zinc-200'
                                    : 'bg-black text-white hover:bg-zinc-800'
                                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                                }`}
                        >
                            <Send className="w-4 h-4" />
                            <span className="hidden sm:inline">Send</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerChatbot;