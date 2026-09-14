import React, { useState } from 'react';
import { X, Calendar, BookOpen, Award, Briefcase, TrendingUp, CheckCircle2, ChevronRight, Clock, Target, Lightbulb } from 'lucide-react';

const CareerRoadmap = ({ career, onClose, darkMode }) => {
    const [selectedPhase, setSelectedPhase] = useState(null);

    // Generate roadmap phases based on career
    const generateRoadmap = () => {
        return [
            {
                id: 1,
                phase: "Foundation & Secondary School",
                duration: "1-2 Years",
                icon: BookOpen,
                milestones: [
                    {
                        title: "Complete 10th & 12th Grade",
                        description: "Build strong subject base in Mathematics, Sciences, or Humanities",
                        duration: "2 years",
                        type: "education"
                    },
                    {
                        title: "Choose Stream & Career Alignment",
                        description: `Select optimal pathway for ${career.name}`,
                        duration: "Decision point",
                        type: "decision"
                    },
                    {
                        title: "Build Core Foundations",
                        description: (career.skills || ['Communication', 'Analytical Thinking']).slice(0, 3).join(", "),
                        duration: "Ongoing",
                        type: "skill"
                    }
                ]
            },
            {
                id: 2,
                phase: "Undergraduate Education & Projects",
                duration: "3-4 Years",
                icon: Award,
                milestones: [
                    {
                        title: "Pursue Formal Degree / Certification",
                        description: `Complete ${career.education || 'Bachelor Degree in related field'}`,
                        duration: "3-4 years",
                        type: "education"
                    },
                    {
                        title: "Industry Internships & Labs",
                        description: "Gain 2-3 real industry internship experiences",
                        duration: "6-12 months",
                        type: "experience"
                    },
                    {
                        title: "Build Public Portfolio & Projects",
                        description: "Showcase real-world problem solving and tools mastery",
                        duration: "Ongoing",
                        type: "project"
                    }
                ]
            },
            {
                id: 3,
                phase: "Entry Level & Professional Launch",
                duration: "2-3 Years",
                icon: Briefcase,
                milestones: [
                    {
                        title: "First Full-Time Role",
                        description: `Start as Junior Associate / ${career.name}`,
                        duration: "1-2 years",
                        type: "job"
                    },
                    {
                        title: "Industry Workflows & Tool Mastery",
                        description: "Master production workflows and corporate collaboration",
                        duration: "6-12 months",
                        type: "learning"
                    },
                    {
                        title: "Obtain Advanced Credentials",
                        description: "Industry certifications and specialized domain credentials",
                        duration: "6-18 months",
                        type: "certification"
                    }
                ]
            },
            {
                id: 4,
                phase: "Mid-Senior & Specialization",
                duration: "3-5 Years",
                icon: TrendingUp,
                milestones: [
                    {
                        title: "Mid-Level Specialist & Lead",
                        description: `Progress to Senior ${career.name}`,
                        duration: "2-3 years",
                        type: "promotion"
                    },
                    {
                        title: "Lead Strategic Initiatives",
                        description: "Take full ownership of major client projects or products",
                        duration: "Ongoing",
                        type: "leadership"
                    }
                ]
            },
            {
                id: 5,
                phase: "Executive Leadership & Domain Mastery",
                duration: "5+ Years",
                icon: Target,
                milestones: [
                    {
                        title: "Director / Principal Specialist",
                        description: "Drive company strategy, mentor talent, and publish innovations",
                        duration: "Ongoing",
                        type: "leadership"
                    }
                ]
            }
        ];
    };

    const roadmap = generateRoadmap();

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#09090b]' : 'bg-zinc-50'}`}>
            <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-black'} mb-1`}>
                            🗺️ {career.name} Roadmap
                        </h2>
                        <p className={`text-base sm:text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Structured milestone pathway to mastery in {career.name}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2.5 rounded-xl border btn-interactive hover-lift ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white' : 'bg-white border-zinc-200 text-zinc-700 hover:text-black'}`}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Timeline Summary Bar */}
                <div className={`rounded-3xl p-6 sm:p-8 mb-8 border ${darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-md'}`}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                                5-Phase Career Journey
                            </h3>
                            <p className={`text-xs font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                High school preparation through senior executive positions
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {roadmap.map((phase) => (
                            <div key={phase.id} className={`p-3.5 rounded-2xl border ${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                                <div className={`text-xs font-black uppercase tracking-wider ${darkMode ? 'text-white' : 'text-black'} mb-1`}>
                                    Phase {phase.id}
                                </div>
                                <div className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                    {phase.duration}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Roadmap Phases List */}
                <div className="space-y-6">
                    {roadmap.map((phase) => {
                        const PhaseIcon = phase.icon;
                        const isExpanded = selectedPhase === phase.id;

                        return (
                            <div
                                key={phase.id}
                                className={`rounded-3xl border transition-all duration-300 overflow-hidden hover-lift ${darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}
                            >
                                <button
                                    type="button"
                                    onClick={() => setSelectedPhase(isExpanded ? null : phase.id)}
                                    className="w-full p-6 text-left flex items-center justify-between gap-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-zinc-100 border-zinc-300 text-black'}`}>
                                            <PhaseIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-400' : 'bg-zinc-100 border-zinc-300 text-zinc-600'}`}>
                                                    Phase {phase.id} • {phase.duration}
                                                </span>
                                            </div>
                                            <h3 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                                                {phase.phase}
                                            </h3>
                                        </div>
                                    </div>
                                    <ChevronRight className={`w-6 h-6 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''} text-zinc-400`} />
                                </button>

                                {isExpanded && (
                                    <div className={`p-6 pt-0 border-t ${darkMode ? 'border-zinc-800' : 'border-zinc-100'} space-y-3 animate-fade-in`}>
                                        {phase.milestones.map((m, idx) => (
                                            <div key={idx} className={`p-4 rounded-2xl border flex items-start justify-between gap-4 ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                                                <div>
                                                    <h4 className={`font-bold text-sm mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>
                                                        {m.title}
                                                    </h4>
                                                    <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                                        {m.description}
                                                    </p>
                                                </div>
                                                <span className={`text-xs font-semibold whitespace-nowrap ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                                    ⏱️ {m.duration}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Pro Tips */}
                <div className={`mt-8 rounded-3xl p-6 sm:p-8 border ${darkMode ? 'bg-[#121215] border-zinc-800 text-zinc-300' : 'bg-black text-white'}`}>
                    <div className="flex items-center gap-3 mb-4">
                        <Lightbulb className="w-5 h-5 text-zinc-400" />
                        <h3 className="text-base font-black uppercase tracking-wider">
                            Actionable Guidance for Students
                        </h3>
                    </div>
                    <ul className="space-y-2 text-xs leading-relaxed text-zinc-400">
                        <li>• Adapt these milestones to your personal speed and graduation schedule.</li>
                        <li>• Focus on mastering core skills and keeping a live GitHub/portfolio repository.</li>
                        <li>• Seek mentorship from professionals currently working in this role.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CareerRoadmap;