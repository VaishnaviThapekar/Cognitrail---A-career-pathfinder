import React from 'react';
import { Target, BarChart2, Zap } from 'lucide-react';

const WhyChooseSection = ({ darkMode }) => {
  const features = [
    {
      icon: Target,
      gradient: 'from-blue-600 to-indigo-600',
      bgColor: darkMode ? 'bg-[#161b26] border-slate-800 hover:border-indigo-500/40' : 'bg-white border-indigo-100 shadow-lg hover:border-indigo-300',
      title: 'Personalized AI Guidance',
      description: 'Multi-factor assessment analyzing your exact interests, skills, subjects, and work styles to recommend tailored career paths.'
    },
    {
      icon: BarChart2,
      gradient: 'from-purple-600 to-pink-600',
      bgColor: darkMode ? 'bg-[#161b26] border-slate-800 hover:border-purple-500/40' : 'bg-white border-purple-100 shadow-lg hover:border-purple-300',
      title: 'Real-Time Market Data',
      description: 'Comprehensive salary trends, industry demand outlooks, and entry exams updated for 2026.'
    },
    {
      icon: Zap,
      gradient: 'from-amber-500 to-orange-600',
      bgColor: darkMode ? 'bg-[#161b26] border-slate-800 hover:border-amber-500/40' : 'bg-white border-amber-100 shadow-lg hover:border-amber-300',
      title: 'Actionable Step-by-Step Roadmaps',
      description: 'Clear career milestones from high school and entrance exams to top colleges, skills, and senior leadership positions.'
    }
  ];

  return (
    <div className="mb-20">
      <div className="text-center mb-12 animate-slideUp">
        <h2 className={`text-3xl md:text-5xl font-black ${darkMode ? 'text-white' : 'text-slate-900'} mb-4 tracking-tight`}>
          Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">COGNITRAIL</span>?
        </h2>
        <p className={`text-base md:text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          Everything you need to make confident, data-backed career decisions
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className={`${feature.bgColor} border rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group flex flex-col justify-between`}
            >
              <div>
                <div className={`bg-gradient-to-br ${feature.gradient} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20 text-white`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-3`}>
                  {feature.title}
                </h3>
                <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} leading-relaxed text-sm`}>
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
