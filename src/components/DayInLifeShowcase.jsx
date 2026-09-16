import React, { useState } from 'react';
import { Clock, Cpu, Layers, TrendingUp, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

const DEFAULT_TOOLCHAIN = [
  { name: 'Python / R', category: 'Data & Core ML' },
  { name: 'React / Next.js', category: 'Frontend Architecture' },
  { name: 'Docker & Kubernetes', category: 'DevOps & Cloud' },
  { name: 'Figma & UI Systems', category: 'Design Studio' },
  { name: 'PostgreSQL & Redis', category: 'Database Systems' },
  { name: 'Jira & Agile Workflows', category: 'Team Planning' }
];

const DayInLifeShowcase = ({ career, darkMode }) => {
  const [activeTab, setActiveTab] = useState('day');

  const careerName = career?.name || 'Specialist Professional';

  const dailySchedule = [
    { percent: 40, label: 'Core Technical Execution', desc: 'Hands-on coding, designing, analysis, or clinical diagnosis', color: 'bg-[#003B73]' },
    { percent: 25, label: 'Architecture & System Planning', desc: 'Designing scalable workflows and reviewing strategy docs', color: 'bg-[#0265A6]' },
    { percent: 20, label: 'Team Collaboration & Reviews', desc: 'Daily standups, peer reviews, and client alignment', color: 'bg-[#6096BA]' },
    { percent: 15, label: 'Continuous Upskilling & Research', desc: 'Reading whitepapers, experimenting with new tools', color: 'bg-[#BACDDF]' }
  ];

  const careerLadder = [
    {
      level: 'Stage 1: Entry Level (Years 0 - 2)',
      title: 'Junior Associate / Graduate Specialist',
      avgPay: '₹6 - 12 LPA',
      milestone: 'Master core execution tools, complete guided sprints, and absorb team practices.'
    },
    {
      level: 'Stage 2: Mid-Career (Years 3 - 5)',
      title: 'Senior Specialist / Module Lead',
      avgPay: '₹14 - 24 LPA',
      milestone: 'Own end-to-end features, mentor junior specialists, and drive technical decision-making.'
    },
    {
      level: 'Stage 3: Advanced Lead (Years 6 - 8)',
      title: 'Technical Architect / Staff Specialist',
      avgPay: '₹28 - 45 LPA',
      milestone: 'Design multi-system architecture, manage project budgets, and shape product strategy.'
    },
    {
      level: 'Stage 4: Executive Level (Years 9+)',
      title: 'Principal Director / VP of Practice',
      avgPay: '₹55 - 90+ LPA',
      milestone: 'Drive global business unit goals, cross-functional leadership, and organizational growth.'
    }
  ];

  return (
    <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
      darkMode ? 'bg-gradient-to-b from-[#0A1E3F] to-[#071326] border-[#003B73]' : 'bg-white border-[#BACDDF] shadow-md'
    }`}>
      {/* Header Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#003B73]/40 dark:border-[#003B73]/60">
        <div>
          <h3 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
            Inside {careerName}: Workflow & Career Mobility
          </h3>
          <p className={`text-xs font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
            Empirical breakdown of daily time distribution, toolchain software, and 10-year growth ladder
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl border bg-[#071326]/40 dark:bg-[#071326] border-[#003B73]">
          <button
            onClick={() => setActiveTab('day')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'day'
                ? 'bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            A Typical Day
          </button>
          <button
            onClick={() => setActiveTab('stack')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'stack'
                ? 'bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Toolchain Stack
          </button>
          <button
            onClick={() => setActiveTab('ladder')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ladder'
                ? 'bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            10-Year Ladder
          </button>
        </div>
      </div>

      {/* Tab Content 1: A Typical Day */}
      {activeTab === 'day' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-[#0265A6]">
            <span>Daily Time Allocation Donut & Progress Bar</span>
            <span>100% Total Day</span>
          </div>

          {/* Visual Bar */}
          <div className="h-4 rounded-xl overflow-hidden flex shadow-inner">
            {dailySchedule.map((item, idx) => (
              <div
                key={idx}
                style={{ width: `${item.percent}%` }}
                className={`${item.color} h-full transition-all`}
                title={`${item.label} (${item.percent}%)`}
              />
            ))}
          </div>

          {/* Detailed Item Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {dailySchedule.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA]/50 border-[#BACDDF]'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl ${item.color} text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  {item.percent}%
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                    {item.label}
                  </h4>
                  <p className={`text-[11px] mt-0.5 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 2: Toolchain Stack */}
      {activeTab === 'stack' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {DEFAULT_TOOLCHAIN.map((tool, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex flex-col justify-between hover-lift ${
                  darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA]/60 border-[#BACDDF]'
                }`}
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#003B73] to-[#0265A6] text-white flex items-center justify-center mb-2 shadow-sm">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h4 className={`text-xs font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                    {tool.name}
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-[#0265A6] mt-2 block">
                  {tool.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 3: 10-Year Ladder */}
      {activeTab === 'ladder' && (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-3">
            {careerLadder.map((step, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex items-start gap-4 ${
                  darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA]/50 border-[#BACDDF]'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                  L{idx + 1}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0265A6]">
                      {step.level}
                    </span>
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-sm">
                      {step.avgPay}
                    </span>
                  </div>

                  <h4 className={`text-sm font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                    {step.title}
                  </h4>
                  <p className={`text-xs leading-relaxed mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {step.milestone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DayInLifeShowcase;
