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
    <div className="mb-20">
      <div className="text-center mb-12 animate-slideUp">
        <h2 className={`text-3xl md:text-5xl font-black ${darkMode ? 'text-white' : 'text-black'} mb-4 tracking-tight`}>
          Why Choose <span className={`bg-clip-text text-transparent ${darkMode ? 'bg-gradient-to-r from-white via-zinc-300 to-zinc-500' : 'bg-gradient-to-r from-black via-zinc-800 to-zinc-600'}`}>COGNITRAIL</span>?
        </h2>
        <p className={`text-base md:text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Everything you need to make confident, data-backed career decisions
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className={`border rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col justify-between ${darkMode
                ? 'bg-[#121215] border-zinc-800 hover:border-zinc-600'
                : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-md'
                }`}
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform shadow-md ${darkMode
                  ? 'bg-zinc-900 border border-zinc-700 text-white'
                  : 'bg-black text-white'
                  }`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'} mb-3`}>
                  {feature.title}
                </h3>
                <p className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'} leading-relaxed text-sm`}>
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
