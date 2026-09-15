import React from 'react';
import { Target, BarChart2, Zap } from 'lucide-react';

const WhyChooseSection = ({ darkMode }) => {
  const features = [
    {
      icon: Target,
      title: 'Personalized AI Guidance',
      description: 'Multi-factor assessment analyzing your exact interests, skills, subjects, and work styles to recommend tailored career paths.'
    },
    {
      icon: BarChart2,
      title: 'Real-Time Market Data',
      description: 'Comprehensive salary trends, industry demand outlooks, and entry exams updated for 2026.'
    },
    {
      icon: Zap,
      title: 'Actionable Step-by-Step Roadmaps',
      description: 'Clear career milestones from high school and entrance exams to top colleges, skills, and senior leadership positions.'
    }
  ];

  return (
    <div className="mb-20 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className={`text-3xl md:text-5xl font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'} mb-4 tracking-tight`}>
          Why Choose <span className="px-4 py-1 rounded-2xl bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#6096BA] text-white font-black shadow-md shadow-[#0265A6]/25">COGNITRAIL</span>?
        </h2>
        <p className={`text-base md:text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
          Everything you need to make confident, data-backed career decisions
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className={`border rounded-3xl p-8 hover-lift group flex flex-col justify-between transition-all duration-300 ${darkMode
                ? 'bg-gradient-to-b from-[#0A1E3F] to-[#071326] border-[#003B73] hover:border-[#0265A6] hover:shadow-[0_12px_35px_rgba(2,101,166,0.25)]'
                : 'bg-gradient-to-b from-white to-[#EBF3FA]/30 border-[#BACDDF] hover:border-[#0265A6] shadow-md hover:shadow-[0_12px_35px_rgba(2,101,166,0.18)]'
                }`}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-md bg-gradient-to-tr from-[#003B73] via-[#0265A6] to-[#6096BA] text-white shadow-[#0265A6]/30">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#051C3E]'} mb-3`}>
                  {feature.title}
                </h3>
                <p className={`${darkMode ? 'text-zinc-300' : 'text-zinc-600'} leading-relaxed text-sm`}>
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhyChooseSection;
