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
            actionText: 'Build Roadmap',
            action: onOpenRoadmap
        }
    ];

    return (
        <section className="mb-20">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-[#ADE852] text-[#1c2e14] shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#1c2e14]" />
                    How Cognitrail Empowers Students
                </div>
                <h2 className={`text-3xl md:text-5xl font-black ${darkMode ? 'text-white' : 'text-black'} mb-4 tracking-tight`}>
                    From Confusion to <span className="px-3 py-0.5 rounded-2xl bg-[#ADE852] text-[#1c2e14] font-black">Career Clarity</span>
                </h2>
                <p className={`text-base md:text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-600'} leading-relaxed`}>
                    Cognitrail is your all-in-one companion designed to eliminate guesswork, helping students make confident, data-backed career decisions at every stage.
                </p>
            </div>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <div
                            key={index}
                            className={`rounded-3xl p-6 md:p-7 border transition-all duration-300 flex flex-col justify-between group hover-lift ${darkMode
                                ? 'bg-[#1c2e14] border-[#507237] hover:border-[#ADE852]'
                                : 'bg-white border-[#A7C62E]/40 hover:border-[#ADE852] shadow-md'
                                }`}
                        >
                            <div>
                                {/* Step Top Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-md bg-[#ADE852] text-[#1c2e14]">
                                        <Icon className="w-6 h-6 text-[#1c2e14]" />
                                    </div>
                                    <span className={`text-3xl font-black transition-colors ${darkMode ? 'text-[#A7C62E]/60' : 'text-[#749D1C]/60'}`}>
                                        {step.number}
                                    </span>
                                </div>

                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 transition-transform group-hover:scale-105 ${darkMode ? 'bg-[#1c2e14] text-[#ADE852] border border-[#507237]' : 'bg-[#EFF4BE] text-[#507237] border border-[#A7C62E]/60'}`}>
                                    {step.badge}
                                </span>

                                <h3 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-black'} mb-3 leading-snug`}>
                                    {step.title}
                                </h3>

                                <p className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-zinc-600'} leading-relaxed mb-5`}>
                                    {step.description}
                                </p>

                                {/* Benefits checklist */}
                                <div className="space-y-2 mb-6">
                                    {step.benefits.map((benefit, bidx) => (
                                        <div key={bidx} className="flex items-center gap-2 text-xs">
                                            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-[#ADE852]" />
                                            <span className={darkMode ? 'text-zinc-200' : 'text-zinc-700 font-medium'}>
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
                                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold btn-interactive flex items-center justify-center gap-1.5 border bg-[#ADE852] border-[#ADE852] text-[#1c2e14] hover:bg-[#9CDD3D] shadow-sm"
                                >
                                    <span>{step.actionText}</span>
                                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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
