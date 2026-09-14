import React, { useState } from 'react';
import { X, Calendar, BookOpen, Award, Briefcase, TrendingUp, CheckCircle, Circle, ChevronRight, Clock, Target, Lightbulb } from 'lucide-react';

const CareerRoadmap = ({ career, onClose, darkMode }) => {
    const [selectedPhase, setSelectedPhase] = useState(null);

    // Generate roadmap phases based on career
    const generateRoadmap = () => {
        return [
            {
                id: 1,
                phase: "Foundation",
                duration: "1-2 Years",
                icon: BookOpen,
                color: "indigo",
                milestones: [
                    {
                        title: "Complete 10th Grade",
                        description: "Focus on Mathematics, Science, and English",
                        duration: "1 year",
                        type: "education"
                    },
                    {
                        title: "Choose Right Stream",
                        description: `Select ${career.education || 'relevant stream'} in 11th grade`,
                        duration: "Decision point",
                        type: "decision"
                    },
                    {
                        title: "Build Core Skills",
                        description: career.skills?.slice(0, 3).join(", ") || "Develop fundamental skills",
                        duration: "Ongoing",
                        type: "skill"
                    }
                ]
            },
            {
                id: 2,
                phase: "Education & Training",
                duration: "3-4 Years",
                icon: Award,
                color: "blue",
                milestones: [
                    {
                        title: "Pursue Degree/Certification",
                        description: `Complete ${career.education || 'relevant qualification'}`,
                        duration: "3-4 years",
                        type: "education"
                    },
                    {
                        title: "Gain Practical Experience",
                        description: "Internships, projects, and hands-on learning",
                        duration: "6-12 months",
                        type: "experience"
                    },
                    {
                        title: "Build Portfolio",
                        description: "Create projects showcasing your skills",
                        duration: "Ongoing",
                        type: "project"
                    }
                ]
            },
            {
                id: 3,
                phase: "Entry Level",
                duration: "2-3 Years",
                icon: Briefcase,
                color: "teal",
                milestones: [
                    {
                        title: "First Job/Role",
                        description: `Start as Junior ${career.name}`,
                        duration: "1-2 years",
                        type: "job"
                    },
                    {
                        title: "Learn Industry Standards",
                        description: "Understand workflows, tools, and best practices",
                        duration: "6-12 months",
                        type: "learning"
                    },
                    {
                        title: "Obtain Certifications",
                        description: "Industry-recognized certifications",
                        duration: "6-18 months",
                        type: "certification"
                    }
                ]
            },
            {
                id: 4,
                phase: "Growth & Advancement",
                duration: "3-5 Years",
                icon: TrendingUp,
                color: "purple",
                milestones: [
                    {
                        title: "Mid-Level Position",
                        description: `Progress to Senior ${career.name}`,
                        duration: "2-3 years",
                        type: "promotion"
                    },
                    {
                        title: "Specialize",
                        description: "Develop expertise in specific area",
                        duration: "1-2 years",
                        type: "specialization"
                    },
                    {
                        title: "Lead Projects",
                        description: "Take ownership of significant projects",
                        duration: "Ongoing",
                        type: "leadership"
                    }
                ]
            },
            {
                id: 5,
                phase: "Expert Level",
                duration: "5+ Years",
                icon: Target,
                color: "orange",
                milestones: [
                    {
                        title: "Leadership Role",
                        description: "Team Lead, Manager, or Specialist position",
                        duration: "2-3 years",
                        type: "leadership"
                    },
                    {
                        title: "Industry Recognition",
                        description: "Speaking, writing, contributing to field",
                        duration: "Ongoing",
                        type: "recognition"
                    },
                    {
                        title: "Strategic Impact",
                        description: "Drive major initiatives and innovations",
                        duration: "Ongoing",
                        type: "impact"
                    }
                ]
            }
        ];
    };

    const roadmap = generateRoadmap();

    const getColorClasses = (color) => {
        const colors = {
            indigo: {
                bg: darkMode ? 'bg-indigo-900/30' : 'bg-indigo-50',
                border: darkMode ? 'border-indigo-500/30' : 'border-indigo-200',
                text: darkMode ? 'text-indigo-400' : 'text-indigo-600',
                icon: darkMode ? 'text-indigo-400' : 'text-indigo-600',
                gradient: darkMode ? 'from-indigo-900/50 to-indigo-800/30' : 'from-indigo-100 to-indigo-50'
            },
            blue: {
                bg: darkMode ? 'bg-blue-900/30' : 'bg-blue-50',
                border: darkMode ? 'border-blue-500/30' : 'border-blue-200',
                text: darkMode ? 'text-blue-400' : 'text-blue-600',
                icon: darkMode ? 'text-blue-400' : 'text-blue-600',
                gradient: darkMode ? 'from-blue-900/50 to-blue-800/30' : 'from-blue-100 to-blue-50'
            },
            teal: {
                bg: darkMode ? 'bg-teal-900/30' : 'bg-teal-50',
                border: darkMode ? 'border-teal-500/30' : 'border-teal-200',
                text: darkMode ? 'text-teal-400' : 'text-teal-600',
                icon: darkMode ? 'text-teal-400' : 'text-teal-600',
                gradient: darkMode ? 'from-teal-900/50 to-teal-800/30' : 'from-teal-100 to-teal-50'
            },
            purple: {
                bg: darkMode ? 'bg-purple-900/30' : 'bg-purple-50',
                border: darkMode ? 'border-purple-500/30' : 'border-purple-200',
                text: darkMode ? 'text-purple-400' : 'text-purple-600',
                icon: darkMode ? 'text-purple-400' : 'text-purple-600',
                gradient: darkMode ? 'from-purple-900/50 to-purple-800/30' : 'from-purple-100 to-purple-50'
            },
            orange: {
                bg: darkMode ? 'bg-orange-900/30' : 'bg-orange-50',
                border: darkMode ? 'border-orange-500/30' : 'border-orange-200',
                text: darkMode ? 'text-orange-400' : 'text-orange-600',
                icon: darkMode ? 'text-orange-400' : 'text-orange-600',
                gradient: darkMode ? 'from-orange-900/50 to-orange-800/30' : 'from-orange-100 to-orange-50'
            }
        };
        return colors[color] || colors.indigo;
    };

    const getMilestoneIcon = (type) => {
        switch (type) {
            case 'education': return BookOpen;
            case 'skill': return Lightbulb;
            case 'certification': return Award;
            case 'job': return Briefcase;
            case 'promotion': return TrendingUp;
            case 'leadership': return Target;
            default: return CheckCircle;
        }
    };

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-slate-50 to-indigo-50'
            }`}>
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                            Career Roadmap
                        </h2>
                        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Your path to becoming a {career.name}
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

                {/* Timeline Summary */}
                <div className={`rounded-2xl p-6 mb-8 ${darkMode ? 'bg-[#1a1f2e] border border-[#272757]' : 'bg-white border border-indigo-100'
                    }`}>
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? 'bg-gradient-to-br from-[#505081] to-[#8686AC]' : 'bg-gradient-to-br from-indigo-500 to-blue-500'
                            }`}>
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Total Timeline
                            </h3>
                            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Approximately 10-15 years to expert level
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {roadmap.map((phase) => {
                            const colors = getColorClasses(phase.color);
                            return (
                                <div key={phase.id} className={`p-3 rounded-xl border ${colors.bg} ${colors.border}`}>
                                    <div className={`text-sm font-semibold ${colors.text} mb-1`}>
                                        Phase {phase.id}
                                    </div>
                                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {phase.duration}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Roadmap Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className={`absolute left-8 top-0 bottom-0 w-1 ${darkMode ? 'bg-gradient-to-b from-indigo-500 via-blue-500 to-orange-500' : 'bg-gradient-to-b from-indigo-300 via-blue-300 to-orange-300'
                        }`}></div>

                    {/* Phases */}
                    <div className="space-y-8">
                        {roadmap.map((phase) => {
                            const colors = getColorClasses(phase.color);
                            const PhaseIcon = phase.icon;
                            const isExpanded = selectedPhase === phase.id;

                            return (
                                <div key={phase.id} className="relative">
                                    <div className="flex items-start gap-6">
                                        {/* Icon Node */}
                                        <div className="relative z-10 flex-shrink-0">
                                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-4 ${darkMode ? 'border-[#0f1419]' : 'border-slate-50'
                                                } bg-gradient-to-br ${colors.gradient}`}>
                                                <PhaseIcon className={`w-8 h-8 ${colors.icon}`} />
                                            </div>
                                        </div>

                                        {/* Phase Content */}
                                        <div className="flex-1">
                                            <button
                                                onClick={() => setSelectedPhase(isExpanded ? null : phase.id)}
                                                className={`w-full text-left rounded-2xl p-6 border-2 transition-all duration-300 ${isExpanded
                                                    ? `${colors.border} ${darkMode ? 'bg-[#1a1f2e]' : 'bg-white'}`
                                                    : `${darkMode ? 'border-[#272757] bg-[#1a1f2e] hover:border-[#505081]' : 'border-gray-200 bg-white hover:border-indigo-200'}`
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                        {phase.phase}
                                                    </h3>
                                                    <ChevronRight className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-90' : ''
                                                        } ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                                                </div>

                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className={`w-4 h-4 ${colors.text}`} />
                                                        <span className={`text-sm font-semibold ${colors.text}`}>
                                                            {phase.duration}
                                                        </span>
                                                    </div>
                                                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {phase.milestones.length} milestones
                                                    </div>
                                                </div>

                                                {/* Milestones */}
                                                {isExpanded && (
                                                    <div className="space-y-4 mt-6 animate-slideDown">
                                                        {phase.milestones.map((milestone, idx) => {
                                                            const MilestoneIcon = getMilestoneIcon(milestone.type);
                                                            return (
                                                                <div
                                                                    key={idx}
                                                                    className={`flex items-start gap-4 p-4 rounded-xl ${darkMode ? 'bg-[#272757]/30' : 'bg-gray-50'
                                                                        }`}
                                                                >
                                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.bg}`}>
                                                                        <MilestoneIcon className={`w-5 h-5 ${colors.icon}`} />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <h4 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                                            {milestone.title}
                                                                        </h4>
                                                                        <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                                            {milestone.description}
                                                                        </p>
                                                                        <div className="flex items-center gap-2">
                                                                            <Clock className={`w-3 h-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                                                            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                                                                {milestone.duration}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <Circle className={`w-5 h-5 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Tips Section */}
                <div className={`mt-8 rounded-2xl p-6 ${darkMode
                    ? 'bg-gradient-to-r from-indigo-900/20 to-blue-900/20 border border-indigo-500/20'
                    : 'bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200'
                    }`}>
                    <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-indigo-500/20' : 'bg-indigo-100'
                            }`}>
                            <Lightbulb className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                        </div>
                        <div>
                            <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                💡 Pro Tips
                            </h3>
                            <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                <li>✓ This roadmap is flexible - adapt it to your pace</li>
                                <li>✓ Focus on continuous learning and skill development</li>
                                <li>✓ Network and build relationships at every stage</li>
                                <li>✓ Document your progress with a portfolio</li>
                                <li>✓ Seek mentorship from experienced professionals</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerRoadmap;