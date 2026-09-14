import React from 'react';
import { Compass, GraduationCap, Map, Award, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const HowItWorksSection = ({ darkMode, onStartQuiz, onExploreDomains, onOpenSkills, onOpenRoadmap }) => {
    const steps = [
        {
            number: '01',
            icon: Compass,
            title: 'Discover Your Natural Fit',
            badge: 'AI Career Assessment',
            description: 'Take our 5-minute intelligent quiz analyzing your interests, work styles, core strengths, and values to reveal top matching careers from 150+ paths.',
            benefits: ['Interest & personality matching', 'Custom compatibility scores', 'Clear reasoning for each match'],
            gradient: 'from-blue-600 to-indigo-600',
            actionText: 'Take Free AI Quiz',
            action: onStartQuiz
        },
        {
            number: '02',
            icon: GraduationCap,
            title: 'Explore Colleges & Entry Paths',
            badge: '500+ Verified Colleges',
            description: 'Compare educational degrees, required entrance exams (NEET, JEE, CLAT, CAT), ratings, fees, and top universities across India and abroad.',
            benefits: ['College ratings & direct portals', 'Entrance exam requirements', 'Junior to senior salary trends'],
            gradient: 'from-indigo-600 to-purple-600',
            actionText: 'Explore Career Paths',
            action: onExploreDomains
        },
        {
            number: '03',
            icon: Map,
            title: 'Bridge Skills & Build Roadmap',
            badge: 'Custom Learning Milestones',
            description: 'Analyze missing skills for your dream role and follow step-by-step milestone roadmaps from high school/college to senior professional.',
            benefits: ['Skills gap breakdown', 'Certifications & project ideas', 'Visual stage-by-stage timelines'],
            gradient: 'from-purple-600 to-pink-600',
            actionText: 'Analyze Skill Gap',
            action: onOpenSkills
        },
        {
            number: '04',
            icon: Award,
            title: 'Practice & Launch Your Career',
            badge: 'AI Mock Interviews & Resumes',
            description: 'Simulate real interview questions with real-time feedback, optimize your resume for recruiters, and track your gamified milestones.',
            benefits: ['AI interview practice with scoring', 'Resume feedback & keyword matcher', 'Gamified level & achievement rewards'],
            gradient: 'from-pink-600 to-rose-600',
            actionText: 'Build Roadmap',
            action: onOpenRoadmap
        }
    ];

    return (
        <section className="mb-20">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14">
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border ${darkMode
                    ? 'bg-indigo-950/50 border-indigo-500/30 text-indigo-400'
                    : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    }`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    How Cognitrail Empowers Students
                </div>
                <h2 className={`text-3xl md:text-5xl font-black ${darkMode ? 'text-white' : 'text-slate-900'} mb-4 tracking-tight`}>
                    From Confusion to <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Career Clarity</span>
                </h2>
                <p className={`text-base md:text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                    Cognitrail is your all-in-one companion designed to eliminate guesswork, helping students make confident, data-backed career decisions at every stage.
                </p>
            </div>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <div
                            key={index}
                            className={`rounded-3xl p-6 md:p-7 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 hover:shadow-2xl ${darkMode
                                ? 'bg-[#161b26] border-slate-800 hover:border-indigo-500/40'
                                : 'bg-white border-slate-200 hover:border-indigo-300 shadow-md'
                                }`}
                        >
                            <div>
                                {/* Step Top Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <span className={`text-3xl font-black ${darkMode ? 'text-slate-700' : 'text-slate-300'}`}>
                                        {step.number}
                                    </span>
                                </div>

                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? 'bg-slate-800/80 text-indigo-300' : 'bg-indigo-50 text-indigo-700'}`}>
                                    {step.badge}
                                </span>

                                <h3 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-slate-900'} mb-3 leading-snug`}>
                                    {step.title}
                                </h3>

                                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} leading-relaxed mb-5`}>
                                    {step.description}
                                </p>

                                {/* Benefits checklist */}
                                <div className="space-y-2 mb-6">
                                    {step.benefits.map((benefit, bidx) => (
                                        <div key={bidx} className="flex items-center gap-2 text-xs">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                            <span className={darkMode ? 'text-slate-300' : 'text-slate-700 font-medium'}>
                                                {benefit}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button */}
                            {step.action && (
                                <button
                                    onClick={step.action}
                                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${darkMode
                                        ? 'bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white'
                                        : 'bg-slate-100 hover:bg-indigo-600 text-slate-800 hover:text-white'
                                        }`}
                                >
                                    <span>{step.actionText}</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default HowItWorksSection;
