import React from 'react';
import { Target, BarChart2, Zap } from 'lucide-react';

const WhyChooseSection = ({ darkMode }) => {
  const features = [
    {
      icon: Target,
      gradient: 'from-blue-500 to-purple-500',
      bgColor: darkMode ? 'from-gray-800 to-gray-900 border-gray-700' : 'from-white to-blue-50 border-blue-100',
      title: 'Personalized Guidance',
      description: 'AI-powered career assessment that analyzes your interests, skills, and goals to recommend the perfect career path.'
    },
    {
      icon: BarChart2,
      gradient: 'from-purple-500 to-pink-500',
      bgColor: darkMode ? 'from-gray-800 to-gray-900 border-gray-700' : 'from-white to-purple-50 border-purple-100',
      title: 'Real-Time Market Data',
      description: 'Latest salary trends, job market insights, and demand forecasts updated monthly by industry experts.'
    },
    {
      icon: Zap,
      gradient: 'from-orange-500 to-pink-500',
      bgColor: darkMode ? 'from-gray-800 to-gray-900 border-gray-700' : 'from-white to-orange-50 border-orange-100',
      title: 'Complete Roadmaps',
      description: 'Step-by-step guidance from 10th grade to your dream career with entrance exams, colleges, and exact timelines.'
    }
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-12 animate-slideUp">
        <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">COGNITRIAL</span>?
        </h2>
        <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Everything you need to make the right career decision
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index}
              className={`bg-gradient-to-br ${feature.bgColor} border-2 rounded-3xl p-8 hover:shadow-2xl transition-all hover-lift group`}
            >
              <div className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform shadow-lg`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                {feature.title}
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhyChooseSection;
