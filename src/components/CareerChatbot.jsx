// import React, { useState, useRef, useEffect } from 'react';
// import { X, Send, Bot, User, Sparkles, Lightbulb, TrendingUp, GraduationCap, Briefcase } from 'lucide-react';

// const CareerChatbot = ({ darkMode, onClose }) => {
//     const [messages, setMessages] = useState([
//         {
//             id: 1,
//             type: 'bot',
//             text: "Hi! 👋 I'm your Career Assistant. I'm here to help you with:",
//             suggestions: [
//                 "Career recommendations",
//                 "Exam information",
//                 "College guidance",
//                 "Salary information",
//                 "Study tips"
//             ]
//         }
//     ]);
//     const [input, setInput] = useState('');
//     const [isTyping, setIsTyping] = useState(false);
//     const messagesEndRef = useRef(null);

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     const quickQuestions = [
//         { icon: GraduationCap, text: "Best careers for me?", category: "careers" },
//         { icon: Briefcase, text: "Software Engineer salary?", category: "salary" },
//         { icon: TrendingUp, text: "How to prepare for JEE?", category: "exam" },
//         { icon: Lightbulb, text: "Which college should I choose?", category: "college" }
//     ];

//     const generateResponse = async (userMessage) => {
//         setIsTyping(true);

//         // Simulate thinking delay
//         await new Promise(resolve => setTimeout(resolve, 1000));

//         const lowerMessage = userMessage.toLowerCase();
//         let response = '';
//         let suggestions = [];

//         // Career recommendations
//         if (lowerMessage.includes('career') || lowerMessage.includes('recommend') || lowerMessage.includes('best for me')) {
//             response = "To recommend the best careers for you, I'd need to understand your interests better. Have you taken our AI Career Quiz yet? It analyzes your interests, skills, and values to give you personalized recommendations!\n\nBased on popular choices, here are some trending careers:\n\n💻 Software Engineer - High demand, ₹8-50L\n⚕️ Doctor - Respected, ₹6-30L\n💼 Product Manager - Leadership, ₹12-45L\n🎨 UX Designer - Creative, ₹6-25L\n📊 Data Scientist - Analytics, ₹10-40L";
//             suggestions = ["Take Career Quiz", "Software Engineer details", "Doctor requirements", "Compare careers"];
//         }

//         // Exam preparation
//         else if (lowerMessage.includes('jee') || lowerMessage.includes('neet') || lowerMessage.includes('exam') || lowerMessage.includes('prepare')) {
//             const exam = lowerMessage.includes('jee') ? 'JEE' : lowerMessage.includes('neet') ? 'NEET' : lowerMessage.includes('cat') ? 'CAT' : 'your exam';
//             response = `Great question about ${exam} preparation! Here's a strategic approach:\n\n📚 **Foundation (Months 1-6):**\n• Complete NCERT thoroughly\n• Understand concepts, don't memorize\n• Make notes for quick revision\n\n💪 **Practice (Months 7-10):**\n• Solve previous year papers\n• Take mock tests weekly\n• Analyze mistakes carefully\n\n🎯 **Final Push (Months 11-12):**\n• Daily mock tests\n• Revision of weak topics\n• Time management practice\n\n**Pro tip:** Consistency beats intensity. Study 6-8 hours daily rather than 12 hours occasionally!`;
//             suggestions = ["Study schedule", "Best books", "Mock tests", "Coaching vs self-study"];
//         }

//         // College guidance
//         else if (lowerMessage.includes('college') || lowerMessage.includes('iit') || lowerMessage.includes('nit') || lowerMessage.includes('admission')) {
//             response = "Choosing the right college is crucial! Here's what to consider:\n\n🏛️ **Top Engineering Colleges:**\n• IITs (23 campuses) - Elite, JEE Advanced\n• NITs (31 campuses) - Excellent, JEE Main\n• IIITs - CS focused, JEE Main\n• BITS Pilani - Autonomous, BITSAT\n\n🎯 **Selection Criteria:**\n1. Placement record (avg package)\n2. Faculty quality & research\n3. Infrastructure & facilities\n4. Location & cost\n5. Alumni network\n\n**Need rank-specific college predictions? Use our College Predictor tool!**";
//             suggestions = ["College Predictor", "IIT vs NIT", "Private vs Government", "Hostel life"];
//         }

//         // Salary information
//         else if (lowerMessage.includes('salary') || lowerMessage.includes('pay') || lowerMessage.includes('earn')) {
//             const career = lowerMessage.includes('engineer') ? 'Software Engineer' :
//                 lowerMessage.includes('doctor') ? 'Doctor' :
//                     lowerMessage.includes('ca') ? 'Chartered Accountant' : 'various careers';

//             if (career === 'Software Engineer') {
//                 response = "💰 **Software Engineer Salary Breakdown:**\n\n**Freshers (0-2 years):**\n• Service-based: ₹3-7 LPA\n• Product-based: ₹8-15 LPA\n• FAANG: ₹15-50 LPA\n\n**Mid-level (3-6 years):**\n• Average: ₹12-25 LPA\n• Senior: ₹25-50 LPA\n\n**Senior (7+ years):**\n• Tech Lead: ₹30-60 LPA\n• Architect: ₹50-1Cr+\n\n**Factors affecting salary:**\n• Skills (React, Python, Cloud)\n• Company (startup vs MNC)\n• Location (Bangalore > Tier 2)\n• Education (IIT premium)";
//             } else if (career === 'Doctor') {
//                 response = "💰 **Doctor Salary Overview:**\n\n**Starting (0-3 years):**\n• Government: ₹6-10 LPA\n• Private: ₹4-8 LPA\n• Internship: ₹25K-50K/month\n\n**Experienced (5-10 years):**\n• Consultant: ₹15-30 LPA\n• Specialist: ₹20-50 LPA\n\n**Senior (10+ years):**\n• Super-specialist: ₹30-80 LPA\n• Private practice: ₹50L-1Cr+\n• Hospital owner: ₹1Cr+\n\n**Specialization matters:** Cardiologist, Radiologist earn more than general physicians.";
//             } else {
//                 response = "💰 **Career-wise Salary Ranges:**\n\n**High Paying (₹15-50L+):**\n• Software Engineer\n• Data Scientist\n• Product Manager\n• Investment Banker\n\n**Good Paying (₹8-20L):**\n• Doctor\n• CA\n• Lawyer\n• Architect\n\n**Moderate (₹4-12L):**\n• Teacher\n• Civil Engineer\n• Journalist\n\n**Tip:** Salary grows with experience! Focus on skills, not just starting package.";
//             }
//             suggestions = ["Compare salaries", "Highest paying careers", "Skills that pay", "Location impact"];
//         }

//         // Software Engineer specific
//         else if (lowerMessage.includes('software') || lowerMessage.includes('coding') || lowerMessage.includes('programming')) {
//             response = "💻 **Software Engineer Career Path:**\n\n**Education:**\n• B.Tech CSE (4 years) via JEE Main\n• Or B.Sc CS (3 years)\n• Self-learning also possible!\n\n**Essential Skills:**\n• Programming: Python/Java/C++\n• Data Structures & Algorithms\n• Web Dev: React, Node.js\n• Git, Linux basics\n\n**Career Growth:**\n1. Junior Dev (0-2 yrs): ₹3-8L\n2. Mid-level (3-5 yrs): ₹12-20L\n3. Senior Dev (6-8 yrs): ₹25-40L\n4. Tech Lead (9+ yrs): ₹40-80L\n\n**Top Companies:**\nFAANG, Microsoft, Adobe, Flipkart, Swiggy, Zomato";
//             suggestions = ["Learn coding roadmap", "Best colleges for CS", "Tech certifications", "Internship tips"];
//         }

//         // Doctor specific
//         else if (lowerMessage.includes('doctor') || lowerMessage.includes('medical') || lowerMessage.includes('mbbs')) {
//             response = "⚕️ **Doctor Career Path:**\n\n**Education Journey:**\n1. NEET UG → MBBS (5.5 years)\n2. Internship (1 year)\n3. NEET PG → MD/MS (3 years) - Optional\n4. Super-specialty (3 years) - Optional\n\n**Total Time:** 6.5 to 12+ years\n\n**Specializations:**\n• General Medicine\n• Surgery\n• Pediatrics\n• Radiology (high paying)\n• Cardiology (prestigious)\n• Dermatology (balanced life)\n\n**Pros:** Respect, job security, noble profession\n**Cons:** Long education, demanding hours, high stress\n\n**Investment:** ₹10L-1Cr (depends on college)";
//             suggestions = ["NEET preparation", "Government vs Private medical", "Best specializations", "MBBS abroad"];
//         }

//         // Study tips
//         else if (lowerMessage.includes('study') || lowerMessage.includes('tips') || lowerMessage.includes('focus') || lowerMessage.includes('concentrate')) {
//             response = "📚 **Effective Study Tips:**\n\n**⏰ Time Management:**\n• Pomodoro: 25 min study + 5 min break\n• Peak hours: Morning for theory, evening for practice\n• Avoid all-nighters!\n\n**🎯 Study Techniques:**\n• Active recall > Passive reading\n• Spaced repetition for retention\n• Teach others to solidify concepts\n• Make mind maps for visual learning\n\n**💡 Focus Tips:**\n• Phone away during study\n• Clean, well-lit study space\n• 7-8 hours sleep (crucial!)\n• Regular exercise (30 min/day)\n• Healthy snacks (nuts, fruits)\n\n**📊 Track Progress:**\n• Daily goals (realistic)\n• Weekly review\n• Monthly assessments";
//             suggestions = ["Study schedule template", "Focus apps", "Memory techniques", "Exam stress management"];
//         }

//         // Default response
//         else {
//             response = "I understand you're asking about: \"" + userMessage + "\"\n\nI'm here to help with career guidance! I can assist you with:\n\n🎯 Career recommendations & exploration\n📚 Exam preparation strategies\n🏛️ College selection guidance\n💰 Salary & growth prospects\n📖 Study tips & resources\n🎓 Educational pathways\n\nWhat specific aspect would you like to know more about?";
//             suggestions = ["Show all careers", "Take career quiz", "Latest news", "Popular questions"];
//         }

//         setIsTyping(false);

//         return {
//             type: 'bot',
//             text: response,
//             suggestions: suggestions.length > 0 ? suggestions : null
//         };
//     };

//     const handleSend = async () => {
//         if (!input.trim()) return;

//         // Add user message
//         const userMessage = {
//             id: messages.length + 1,
//             type: 'user',
//             text: input
//         };

//         setMessages([...messages, userMessage]);
//         setInput('');

//         // Generate and add bot response
//         const botResponse = await generateResponse(input);
//         setMessages(prev => [...prev, { ...botResponse, id: prev.length + 1 }]);
//     };

//     const handleSuggestionClick = async (suggestion) => {
//         const userMessage = {
//             id: messages.length + 1,
//             type: 'user',
//             text: suggestion
//         };

//         setMessages([...messages, userMessage]);

//         const botResponse = await generateResponse(suggestion);
//         setMessages(prev => [...prev, { ...botResponse, id: prev.length + 1 }]);
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault();
//             handleSend();
//         }
//     };

//     return (
//         <div className={`fixed bottom-4 right-4 z-50 flex flex-col ${darkMode ? 'bg-[#1a1f2e]' : 'bg-white'
//             } rounded-2xl shadow-2xl border-2 ${darkMode ? 'border-[#272757]' : 'border-indigo-100'
//             }`} style={{ width: '400px', height: '600px' }}>

//             {/* Header */}
//             <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-[#272757] bg-gradient-to-r from-[#272757] to-[#505081]' : 'border-indigo-100 bg-gradient-to-r from-indigo-600 to-blue-600'
//                 } rounded-t-2xl`}>
//                 <div className="flex items-center gap-3">
//                     <div className="relative">
//                         <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
//                             <Bot className="w-6 h-6 text-white" />
//                         </div>
//                         <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                     </div>
//                     <div>
//                         <h3 className="text-white font-bold">Career Assistant</h3>
//                         <p className="text-white/80 text-xs">Always here to help</p>
//                     </div>
//                 </div>
//                 <button
//                     onClick={onClose}
//                     className="p-2 rounded-lg hover:bg-white/10 transition-colors"
//                 >
//                     <X className="w-5 h-5 text-white" />
//                 </button>
//             </div>

//             {/* Quick Questions */}
//             <div className={`p-3 border-b ${darkMode ? 'border-[#272757] bg-[#0f1419]' : 'border-indigo-50 bg-indigo-50/50'}`}>
//                 <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                     Quick Questions:
//                 </p>
//                 <div className="flex gap-2 overflow-x-auto pb-1">
//                     {quickQuestions.map((q, idx) => {
//                         const Icon = q.icon;
//                         return (
//                             <button
//                                 key={idx}
//                                 onClick={() => handleSuggestionClick(q.text)}
//                                 className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${darkMode
//                                     ? 'bg-[#272757] hover:bg-[#505081] text-[#8686AC]'
//                                     : 'bg-white hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
//                                     }`}
//                             >
//                                 <Icon className="w-3 h-3" />
//                                 {q.text}
//                             </button>
//                         );
//                     })}
//                 </div>
//             </div>

//             {/* Messages */}
//             <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${darkMode ? 'bg-[#0f1419]' : 'bg-gray-50'
//                 }`}>
//                 {messages.map((message) => (
//                     <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
//                         <div className={`flex gap-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
//                             {/* Avatar */}
//                             <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user'
//                                 ? darkMode ? 'bg-[#505081]' : 'bg-indigo-600'
//                                 : darkMode ? 'bg-[#272757]' : 'bg-indigo-100'
//                                 }`}>
//                                 {message.type === 'user' ? (
//                                     <User className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-white'}`} />
//                                 ) : (
//                                     <Bot className={`w-4 h-4 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'}`} />
//                                 )}
//                             </div>

//                             {/* Message bubble */}
//                             <div>
//                                 <div className={`rounded-2xl px-4 py-3 ${message.type === 'user'
//                                     ? darkMode
//                                         ? 'bg-gradient-to-r from-[#505081] to-[#8686AC] text-white'
//                                         : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white'
//                                     : darkMode
//                                         ? 'bg-[#1a1f2e] text-gray-200 border border-[#272757]'
//                                         : 'bg-white text-gray-800 border border-indigo-100'
//                                     }`}>
//                                     <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
//                                 </div>

//                                 {/* Suggestions */}
//                                 {message.suggestions && (
//                                     <div className="mt-2 flex flex-wrap gap-2">
//                                         {message.suggestions.map((suggestion, idx) => (
//                                             <button
//                                                 key={idx}
//                                                 onClick={() => handleSuggestionClick(suggestion)}
//                                                 className={`text-xs px-3 py-1.5 rounded-full transition-all ${darkMode
//                                                     ? 'bg-[#272757] hover:bg-[#505081] text-[#8686AC] border border-[#505081]'
//                                                     : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
//                                                     }`}
//                                             >
//                                                 {suggestion}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 ))}

//                 {/* Typing indicator */}
//                 {isTyping && (
//                     <div className="flex gap-2">
//                         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-[#272757]' : 'bg-indigo-100'
//                             }`}>
//                             <Bot className={`w-4 h-4 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'}`} />
//                         </div>
//                         <div className={`rounded-2xl px-4 py-3 ${darkMode ? 'bg-[#1a1f2e] border border-[#272757]' : 'bg-white border border-indigo-100'
//                             }`}>
//                             <div className="flex gap-1">
//                                 <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-[#8686AC]' : 'bg-indigo-600'
//                                     }`} style={{ animationDelay: '0ms' }}></div>
//                                 <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-[#8686AC]' : 'bg-indigo-600'
//                                     }`} style={{ animationDelay: '150ms' }}></div>
//                                 <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-[#8686AC]' : 'bg-indigo-600'
//                                     }`} style={{ animationDelay: '300ms' }}></div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 <div ref={messagesEndRef} />
//             </div>

//             {/* Input */}
//             <div className={`p-4 border-t ${darkMode ? 'border-[#272757] bg-[#1a1f2e]' : 'border-indigo-100 bg-white'
//                 } rounded-b-2xl`}>
//                 <div className="flex gap-2">
//                     <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                         placeholder="Ask me anything..."
//                         className={`flex-1 px-4 py-3 rounded-xl transition-all ${darkMode
//                             ? 'bg-[#0f1419] border-[#272757] text-white placeholder-gray-500'
//                             : 'bg-gray-50 border-indigo-100 text-gray-900 placeholder-gray-400'
//                             } border focus:outline-none focus:ring-2 focus:ring-[#505081]`}
//                     />
//                     <button
//                         onClick={handleSend}
//                         disabled={!input.trim()}
//                         className={`p-3 rounded-xl transition-all ${input.trim()
//                             ? darkMode
//                                 ? 'bg-gradient-to-r from-[#505081] to-[#8686AC] hover:from-[#8686AC] hover:to-[#505081]'
//                                 : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700'
//                             : darkMode
//                                 ? 'bg-[#272757] cursor-not-allowed'
//                                 : 'bg-gray-200 cursor-not-allowed'
//                             } text-white`}
//                     >
//                         <Send className="w-5 h-5" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CareerChatbot;










import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Lightbulb, TrendingUp, GraduationCap, Briefcase } from 'lucide-react';

const CareerChatbot = ({ darkMode, onClose }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "Hi! 👋 I'm your Career Assistant. I'm here to help you with:\n\n• Career recommendations & paths\n• Exam preparation guidance\n• College & course selection\n• Market salary benchmarks\n• Strategic study tips",
            suggestions: [
                "Career recommendations",
                "Exam information",
                "College guidance",
                "Salary information",
                "Study tips"
            ]
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const quickQuestions = [
        { icon: GraduationCap, text: "Best careers for me?", category: "careers" },
        { icon: Briefcase, text: "Software Engineer salary?", category: "salary" },
        { icon: TrendingUp, text: "How to prepare for JEE?", category: "exam" },
        { icon: Lightbulb, text: "Which college should I choose?", category: "college" }
    ];

    const generateResponse = async (userMessage) => {
        setIsTyping(true);

        // Simulate thinking delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const lowerMessage = userMessage.toLowerCase();
        let response = '';
        let suggestions = [];

        // Career recommendations
        if (lowerMessage.includes('career') || lowerMessage.includes('recommend') || lowerMessage.includes('best for me')) {
            response = "To recommend the best careers for you, I'd need to understand your interests better. Have you taken our AI Career Quiz yet? It analyzes your interests, skills, and values to give you personalized recommendations!\n\nBased on popular choices, here are some trending careers:\n\n💻 Software Engineer - High demand, ₹8-50L\n⚕️ Doctor - Respected, ₹6-30L\n💼 Product Manager - Leadership, ₹12-45L\n🎨 UX Designer - Creative, ₹6-25L\n📊 Data Scientist - Analytics, ₹10-40L";
            suggestions = ["Take Career Quiz", "Software Engineer details", "Doctor requirements", "Compare careers"];
        }

        // Exam preparation
        else if (lowerMessage.includes('jee') || lowerMessage.includes('neet') || lowerMessage.includes('exam') || lowerMessage.includes('prepare')) {
            const exam = lowerMessage.includes('jee') ? 'JEE' : lowerMessage.includes('neet') ? 'NEET' : lowerMessage.includes('cat') ? 'CAT' : 'your exam';
            response = `Great question about ${exam} preparation! Here's a strategic approach:\n\n📚 **Foundation (Months 1-6):**\n• Complete NCERT thoroughly\n• Understand concepts, don't memorize\n• Make notes for quick revision\n\n💪 **Practice (Months 7-10):**\n• Solve previous year papers\n• Take mock tests weekly\n• Analyze mistakes carefully\n\n🎯 **Final Push (Months 11-12):**\n• Daily mock tests\n• Revision of weak topics\n• Time management practice\n\n**Pro tip:** Consistency beats intensity. Study 6-8 hours daily rather than 12 hours occasionally!`;
            suggestions = ["Study schedule", "Best books", "Mock tests", "Coaching vs self-study"];
        }

        // College guidance
        else if (lowerMessage.includes('college') || lowerMessage.includes('iit') || lowerMessage.includes('nit') || lowerMessage.includes('admission')) {
            response = "Choosing the right college is crucial! Here's what to consider:\n\n🏛️ **Top Engineering Colleges:**\n• IITs (23 campuses) - Elite, JEE Advanced\n• NITs (31 campuses) - Excellent, JEE Main\n• IIITs - CS focused, JEE Main\n• BITS Pilani - Autonomous, BITSAT\n\n🎯 **Selection Criteria:**\n1. Placement record (avg package)\n2. Faculty quality & research\n3. Infrastructure & facilities\n4. Location & cost\n5. Alumni network\n\n**Need rank-specific college predictions? Use our College Predictor tool!**";
            suggestions = ["College Predictor", "IIT vs NIT", "Private vs Government", "Hostel life"];
        }

        // Salary information
        else if (lowerMessage.includes('salary') || lowerMessage.includes('pay') || lowerMessage.includes('earn')) {
            const career = lowerMessage.includes('engineer') ? 'Software Engineer' :
                lowerMessage.includes('doctor') ? 'Doctor' :
                    lowerMessage.includes('ca') ? 'Chartered Accountant' : 'various careers';

            if (career === 'Software Engineer') {
                response = "💰 **Software Engineer Salary Breakdown:**\n\n**Freshers (0-2 years):**\n• Service-based: ₹3-7 LPA\n• Product-based: ₹8-15 LPA\n• FAANG: ₹15-50 LPA\n\n**Mid-level (3-6 years):**\n• Average: ₹12-25 LPA\n• Senior: ₹25-50 LPA\n\n**Senior (7+ years):**\n• Tech Lead: ₹30-60 LPA\n• Architect: ₹50-1Cr+\n\n**Factors affecting salary:**\n• Skills (React, Python, Cloud)\n• Company (startup vs MNC)\n• Location (Bangalore > Tier 2)\n• Education (IIT premium)";
            } else if (career === 'Doctor') {
                response = "💰 **Doctor Salary Overview:**\n\n**Starting (0-3 years):**\n• Government: ₹6-10 LPA\n• Private: ₹4-8 LPA\n• Internship: ₹25K-50K/month\n\n**Experienced (5-10 years):**\n• Consultant: ₹15-30 LPA\n• Specialist: ₹20-50 LPA\n\n**Senior (10+ years):**\n• Super-specialist: ₹30-80 LPA\n• Private practice: ₹50L-1Cr+\n• Hospital owner: ₹1Cr+\n\n**Specialization matters:** Cardiologist, Radiologist earn more than general physicians.";
            } else {
                response = "💰 **Career-wise Salary Ranges:**\n\n**High Paying (₹15-50L+):**\n• Software Engineer\n• Data Scientist\n• Product Manager\n• Investment Banker\n\n**Good Paying (₹8-20L):**\n• Doctor\n• CA\n• Lawyer\n• Architect\n\n**Moderate (₹4-12L):**\n• Teacher\n• Civil Engineer\n• Journalist\n\n**Tip:** Salary grows with experience! Focus on skills, not just starting package.";
            }
            suggestions = ["Compare salaries", "Highest paying careers", "Skills that pay", "Location impact"];
        }

        // Software Engineer specific
        else if (lowerMessage.includes('software') || lowerMessage.includes('coding') || lowerMessage.includes('programming')) {
            response = "💻 **Software Engineer Career Path:**\n\n**Education:**\n• B.Tech CSE (4 years) via JEE Main\n• Or B.Sc CS (3 years)\n• Self-learning also possible!\n\n**Essential Skills:**\n• Programming: Python/Java/C++\n• Data Structures & Algorithms\n• Web Dev: React, Node.js\n• Git, Linux basics\n\n**Career Growth:**\n1. Junior Dev (0-2 yrs): ₹3-8L\n2. Mid-level (3-5 yrs): ₹12-20L\n3. Senior Dev (6-8 yrs): ₹25-40L\n4. Tech Lead (9+ yrs): ₹40-80L\n\n**Top Companies:**\nFAANG, Microsoft, Adobe, Flipkart, Swiggy, Zomato";
            suggestions = ["Learn coding roadmap", "Best colleges for CS", "Tech certifications", "Internship tips"];
        }

        // Doctor specific
        else if (lowerMessage.includes('doctor') || lowerMessage.includes('medical') || lowerMessage.includes('mbbs')) {
            response = "⚕️ **Doctor Career Path:**\n\n**Education Journey:**\n1. NEET UG → MBBS (5.5 years)\n2. Internship (1 year)\n3. NEET PG → MD/MS (3 years) - Optional\n4. Super-specialty (3 years) - Optional\n\n**Total Time:** 6.5 to 12+ years\n\n**Specializations:**\n• General Medicine\n• Surgery\n• Pediatrics\n• Radiology (high paying)\n• Cardiology (prestigious)\n• Dermatology (balanced life)\n\n**Pros:** Respect, job security, noble profession\n**Cons:** Long education, demanding hours, high stress\n\n**Investment:** ₹10L-1Cr (depends on college)";
            suggestions = ["NEET preparation", "Government vs Private medical", "Best specializations", "MBBS abroad"];
        }

        // Study tips
        else if (lowerMessage.includes('study') || lowerMessage.includes('tips') || lowerMessage.includes('focus') || lowerMessage.includes('concentrate')) {
            response = "📚 **Effective Study Tips:**\n\n**⏰ Time Management:**\n• Pomodoro: 25 min study + 5 min break\n• Peak hours: Morning for theory, evening for practice\n• Avoid all-nighters!\n\n**🎯 Study Techniques:**\n• Active recall > Passive reading\n• Spaced repetition for retention\n• Teach others to solidify concepts\n• Make mind maps for visual learning\n\n**💡 Focus Tips:**\n• Phone away during study\n• Clean, well-lit study space\n• 7-8 hours sleep (crucial!)\n• Regular exercise (30 min/day)\n• Healthy snacks (nuts, fruits)\n\n**📊 Track Progress:**\n• Daily goals (realistic)\n• Weekly review\n• Monthly assessments";
            suggestions = ["Study schedule template", "Focus apps", "Memory techniques", "Exam stress management"];
        }

        // Default response
        else {
            response = "I understand you're asking about: \"" + userMessage + "\"\n\nI'm here to help with career guidance! I can assist you with:\n\n🎯 Career recommendations & exploration\n📚 Exam preparation strategies\n🏛️ College selection guidance\n💰 Salary & growth prospects\n📖 Study tips & resources\n🎓 Educational pathways\n\nWhat specific aspect would you like to know more about?";
            suggestions = ["Show all careers", "Take career quiz", "Latest news", "Popular questions"];
        }

        setIsTyping(false);

        return {
            type: 'bot',
            text: response,
            suggestions: suggestions.length > 0 ? suggestions : null
        };
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            text: input
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');

        const botResponse = await generateResponse(input);
        setMessages(prev => [...prev, { ...botResponse, id: prev.length + 1 }]);
    };

    const handleSuggestionClick = async (suggestion) => {
        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            text: suggestion
        };

        setMessages(prev => [...prev, userMessage]);

        const botResponse = await generateResponse(suggestion);
        setMessages(prev => [...prev, { ...botResponse, id: prev.length + 1 }]);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={`fixed inset-0 z-50 animate-fade-in ${
            darkMode ? 'bg-black/80 backdrop-blur-md' : 'bg-black/40 backdrop-blur-md'
        } flex items-center justify-center p-4`}>
            <div className={`w-full max-w-4xl h-[90vh] max-h-[850px] flex flex-col rounded-2xl shadow-2xl border overflow-hidden ${
                darkMode ? 'bg-[#121215] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'
            }`}>

                {/* Header */}
                <div className={`flex items-center justify-between px-6 py-4 border-b ${
                    darkMode ? 'border-zinc-800 bg-[#18181b]' : 'border-zinc-200 bg-zinc-50'
                }`}>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                                darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-black text-white border-zinc-800'
                            }`}>
                                <Bot className="w-6 h-6" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-zinc-400 rounded-full border-2 border-current"></div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">
                                Career Assistant AI
                            </h1>
                            <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                Instant guidance on careers, exams, and university roadmaps
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2.5 rounded-xl border transition-all btn-interactive ${
                            darkMode 
                                ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800' 
                                : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black hover:bg-zinc-200'
                        }`}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Quick Questions Bar */}
                <div className={`px-6 py-3 border-b ${
                    darkMode ? 'border-zinc-800/80 bg-zinc-900/50' : 'border-zinc-200 bg-zinc-50/70'
                }`}>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        Popular Inquiries:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {quickQuestions.map((q, idx) => {
                            const Icon = q.icon;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSuggestionClick(q.text)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all btn-interactive border ${
                                        darkMode
                                            ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
                                            : 'bg-white hover:bg-zinc-100 text-zinc-800 border-zinc-200 shadow-sm'
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5 opacity-70" />
                                    {q.text}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Messages Area */}
                <div className={`flex-1 overflow-y-auto p-6 space-y-5 ${
                    darkMode ? 'bg-[#09090b]' : 'bg-[#fafafa]'
                }`}>
                    <div className="max-w-3xl mx-auto space-y-5">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                                <div className={`flex gap-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {/* Avatar */}
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border text-xs font-bold ${
                                        message.type === 'user'
                                            ? darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                                            : darkMode ? 'bg-zinc-900 text-zinc-300 border-zinc-800' : 'bg-zinc-100 text-zinc-800 border-zinc-300'
                                    }`}>
                                        {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    </div>

                                    {/* Message Content */}
                                    <div className="flex-1">
                                        <div className={`rounded-2xl px-5 py-3.5 border transition-all ${
                                            message.type === 'user'
                                                ? darkMode
                                                    ? 'bg-white text-black border-white'
                                                    : 'bg-black text-white border-black'
                                                : darkMode
                                                    ? 'bg-[#18181b] text-zinc-100 border-zinc-800'
                                                    : 'bg-white text-zinc-900 border-zinc-200 shadow-sm'
                                        }`}>
                                            <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                                        </div>

                                        {/* Suggestions */}
                                        {message.suggestions && (
                                            <div className="mt-2.5 flex flex-wrap gap-2">
                                                {message.suggestions.map((suggestion, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleSuggestionClick(suggestion)}
                                                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all btn-interactive ${
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

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex gap-3 animate-fade-in">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                                    darkMode ? 'bg-zinc-900 text-zinc-300 border-zinc-800' : 'bg-zinc-100 text-zinc-800 border-zinc-300'
                                }`}>
                                    <Bot className="w-4 h-4" />
                                </div>
                                <div className={`rounded-2xl px-4 py-3 border ${
                                    darkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                                }`}>
                                    <div className="flex gap-1.5 items-center">
                                        <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className={`p-4 border-t ${
                    darkMode ? 'border-zinc-800 bg-[#121215]' : 'border-zinc-200 bg-white'
                }`}>
                    <div className="max-w-3xl mx-auto flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask any question about careers, degrees, or salaries..."
                            className={`flex-1 px-4 py-3 rounded-xl text-sm transition-all border outline-none ${
                                darkMode
                                    ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-400'
                                    : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-black'
                            }`}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className={`px-5 py-3 rounded-xl transition-all btn-interactive text-sm font-semibold flex items-center justify-center ${
                                input.trim()
                                    ? darkMode
                                        ? 'bg-white text-black hover:bg-zinc-200 shadow-sm'
                                        : 'bg-black text-white hover:bg-zinc-800 shadow-sm'
                                    : 'bg-zinc-300 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            }`}
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Helper text */}
                    <p className={`text-xs text-center mt-3 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        Press Enter to send • Get instant career guidance
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CareerChatbot;