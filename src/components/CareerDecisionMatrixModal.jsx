import React, { useState, useMemo } from 'react';
import { X, GitCompare, Sparkles, TrendingUp, DollarSign, Clock, ShieldCheck, CheckCircle2, ArrowRight, Award, Zap, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const PRESET_COMPARISONS = [
  {
    id: 'cs_vs_bca',
    label: 'B.Tech CS vs. BCA + MCA',
    optionA: {
      name: 'B.Tech Computer Science & AI',
      duration: '4 Years',
      tuitionCost: '₹8 - 18 Lakhs',
      costNum: 12,
      startingSalary: '₹12 - 28 LPA',
      salaryNum: 18,
      breakEvenYears: 2.5,
      growthIndex: 96,
      workLifeScore: 7.5,
      stressScore: 7.0,
      skills: ['Data Structures', 'System Design', 'AI/ML', 'Cloud Architecture'],
      degrees: 'B.Tech CS / BE CS'
    },
    optionB: {
      name: 'BCA + MCA (Software Track)',
      duration: '5 Years (3+2)',
      tuitionCost: '₹4 - 9 Lakhs',
      costNum: 6,
      startingSalary: '₹6 - 15 LPA',
      salaryNum: 9,
      breakEvenYears: 2.0,
      growthIndex: 88,
      workLifeScore: 8.0,
      stressScore: 5.5,
      skills: ['Web Dev', 'Database SQL', 'Java/Python', 'UI Frameworks'],
      degrees: 'BCA + MCA'
    }
  },
  {
    id: 'mbbs_vs_biotech',
    label: 'MBBS Doctor vs. B.Sc Biotech & Research',
    optionA: {
      name: 'MBBS Doctor (Clinical)',
      duration: '5.5 Years',
      tuitionCost: '₹6 - 45 Lakhs',
      costNum: 25,
      startingSalary: '₹15 - 35 LPA',
      salaryNum: 22,
      breakEvenYears: 4.0,
      growthIndex: 98,
      workLifeScore: 6.0,
      stressScore: 9.0,
      skills: ['Clinical Diagnosis', 'Patient Care', 'Pathology', 'Pharmacology'],
      degrees: 'MBBS + MD/MS'
    },
    optionB: {
      name: 'B.Sc / B.Tech Biotech & Genomics',
      duration: '4 Years',
      tuitionCost: '₹5 - 12 Lakhs',
      costNum: 8,
      startingSalary: '₹7 - 18 LPA',
      salaryNum: 11,
      breakEvenYears: 2.2,
      growthIndex: 92,
      workLifeScore: 8.5,
      stressScore: 5.0,
      skills: ['CRISPR Gene Editing', 'Bioinformatics', 'Drug Discovery', 'Lab Research'],
      degrees: 'B.Sc / B.Tech Biotech'
    }
  },
  {
    id: 'ca_vs_mba',
    label: 'Chartered Accountant (CA) vs. MBA Finance',
    optionA: {
      name: 'Chartered Accountant (ICAI)',
      duration: '4.5 Years',
      tuitionCost: '₹2 - 4 Lakhs',
      costNum: 3,
      startingSalary: '₹11 - 25 LPA',
      salaryNum: 16,
      breakEvenYears: 1.2,
      growthIndex: 94,
      workLifeScore: 6.5,
      stressScore: 8.5,
      skills: ['Taxation & Audit', 'Financial Reporting', 'Corporate Law', 'Risk Management'],
      degrees: 'CA (ICAI)'
    },
    optionB: {
      name: 'MBA Finance (Top Tier IIMs)',
      duration: '2 Years (Post Grad)',
      tuitionCost: '₹15 - 26 Lakhs',
      costNum: 20,
      startingSalary: '₹18 - 42 LPA',
      salaryNum: 28,
      breakEvenYears: 2.8,
      growthIndex: 95,
      workLifeScore: 7.0,
      stressScore: 7.5,
      skills: ['Valuation Modeling', 'M&A Advisory', 'Portfolio Mgmt', 'Equity Research'],
      degrees: 'MBA Finance'
    }
  },
  {
    id: 'uiux_vs_swe',
    label: 'Product UI/UX Designer vs. Full Stack Developer',
    optionA: {
      name: 'Product UI/UX & Interaction Designer',
      duration: '4 Years',
      tuitionCost: '₹6 - 15 Lakhs',
      costNum: 10,
      startingSalary: '₹9 - 22 LPA',
      salaryNum: 14,
      breakEvenYears: 2.1,
      growthIndex: 91,
      workLifeScore: 8.5,
      stressScore: 5.5,
      skills: ['Figma Prototyping', 'User Research', 'Design Systems', 'Usability Testing'],
      degrees: 'B.Des / Self Taught'
    },
    optionB: {
      name: 'Full Stack Web & Mobile Engineer',
      duration: '4 Years',
      tuitionCost: '₹7 - 16 Lakhs',
      costNum: 11,
      startingSalary: '₹10 - 26 LPA',
      salaryNum: 17,
      breakEvenYears: 2.2,
      growthIndex: 95,
      workLifeScore: 7.5,
      stressScore: 7.0,
      skills: ['React/Node.js', 'PostgreSQL', 'GraphQL', 'AWS/DevOps'],
      degrees: 'B.Tech / B.Sc CS'
    }
  }
];

export default function CareerDecisionMatrixModal({ onClose, darkMode }) {
  const { t } = useLanguage();
  const [selectedPreset, setSelectedPreset] = useState('cs_vs_bca');
  const [userPriority, setUserPriority] = useState('salary'); // 'salary', 'cost', 'fastJob', 'balance'

  const comparison = PRESET_COMPARISONS.find(p => p.id === selectedPreset) || PRESET_COMPARISONS[0];
  const { optionA, optionB } = comparison;

  const verdict = useMemo(() => {
    if (userPriority === 'salary') {
      return optionA.salaryNum >= optionB.salaryNum ? optionA : optionB;
    } else if (userPriority === 'cost') {
      return optionA.costNum <= optionB.costNum ? optionA : optionB;
    } else if (userPriority === 'fastJob') {
      return optionA.breakEvenYears <= optionB.breakEvenYears ? optionA : optionB;
    } else {
      return optionA.workLifeScore >= optionB.workLifeScore ? optionA : optionB;
    }
  }, [userPriority, optionA, optionB]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className={`relative w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden my-6 transition-all ${
        darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
      }`}>

        {/* Modal Header */}
        <div className={`p-6 sm:p-8 border-b flex items-center justify-between ${
          darkMode ? 'bg-gradient-to-r from-[#0A1E3F] via-[#071326] to-[#0A1E3F] border-[#003B73]' : 'bg-gradient-to-r from-[#EBF3FA] via-white to-[#EBF3FA] border-[#BACDDF]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#003B73] via-[#0265A6] to-[#6096BA] flex items-center justify-center text-white shadow-lg shadow-[#0265A6]/30">
              <GitCompare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">
                {t('decisionMatrixTitle', "AI 'What-If' Branching Decision Matrix")}
              </h2>
              <p className={`text-xs font-semibold ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`}>
                {t('decisionMatrixSub', 'Compare degree costs, starting salaries, financial break-even, and 2026-2030 job market growth side-by-side')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-zinc-300 hover:text-white hover:border-[#0265A6]' : 'bg-white border-[#BACDDF] text-zinc-700 hover:bg-[#EBF3FA]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">

          {/* Preset Pair Switcher & Priority Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0265A6]">
                Select Career Comparison Branch
              </label>
              <select
                value={selectedPreset}
                onChange={(e) => setSelectedPreset(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0265A6] ${
                  darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#051C3E]'
                }`}
              >
                {PRESET_COMPARISONS.map(p => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0265A6]">
                Your Primary Decision Priority
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'salary', label: '💰 Max Salary' },
                  { id: 'cost', label: '💸 Lowest Tuition' },
                  { id: 'fastJob', label: '⚡ Fast ROI' },
                  { id: 'balance', label: '🌱 Work-Life' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => setUserPriority(p.id)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold btn-interactive cursor-pointer transition-all ${
                      userPriority === p.id
                        ? 'bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white border-transparent shadow-md'
                        : darkMode
                          ? 'bg-[#071326] border-[#003B73] text-zinc-300 hover:text-white'
                          : 'bg-white border-[#BACDDF] text-[#0265A6] hover:bg-[#EBF3FA]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Recommended Verdict Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-md">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
                  AI Recommendation Verdict ({userPriority.toUpperCase()} PRIORITY)
                </div>
                <div className="text-lg font-black drop-shadow">
                  Winner: {verdict.name}
                </div>
              </div>
            </div>

            <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-blue-100 whitespace-nowrap">
              Aligned with your priority
            </div>
          </div>

          {/* Side-by-Side Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Option A */}
            <div className={`p-6 rounded-3xl border transition-all ${
              verdict.name === optionA.name
                ? darkMode ? 'bg-[#0A1E3F] border-[#0265A6] shadow-xl ring-2 ring-[#0265A6]/50' : 'bg-white border-[#0265A6] shadow-lg ring-2 ring-[#0265A6]/30'
                : darkMode ? 'bg-[#071326]/60 border-[#003B73]' : 'bg-[#EBF3FA]/50 border-[#BACDDF]'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#003B73] text-white">
                  Route A
                </span>
                {verdict.name === optionA.name && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Recommended
                  </span>
                )}
              </div>

              <h3 className="text-xl font-black mb-2 leading-tight">{optionA.name}</h3>
              <p className="text-xs font-bold text-zinc-400 mb-6">{optionA.degrees} • {optionA.duration}</p>

              {/* Metrics Bars */}
              <div className="space-y-4 text-xs font-semibold mb-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-400">Total Tuition Cost</span>
                    <span className="font-bold text-[#0265A6]">{optionA.tuitionCost}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#003B73] to-[#0265A6]" style={{ width: `${Math.min(100, (optionA.costNum / 30) * 100)}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-400">Est. 5-Year Salary</span>
                    <span className="font-bold text-emerald-500">{optionA.startingSalary}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${Math.min(100, (optionA.salaryNum / 35) * 100)}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-400">Financial Break-Even</span>
                    <span className="font-bold text-blue-400">{optionA.breakEvenYears} Years</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-400">2026-2030 Growth Index</span>
                    <span className="font-bold text-purple-400">{optionA.growthIndex}%</span>
                  </div>
                </div>
              </div>

              {/* Core Skills */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#0265A6] mb-2">Core Skillsets:</div>
                <div className="flex flex-wrap gap-1.5">
                  {optionA.skills.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#003B73]/30 border border-[#003B73] text-[#6096BA]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Option B */}
            <div className={`p-6 rounded-3xl border transition-all ${
              verdict.name === optionB.name
                ? darkMode ? 'bg-[#0A1E3F] border-[#0265A6] shadow-xl ring-2 ring-[#0265A6]/50' : 'bg-white border-[#0265A6] shadow-lg ring-2 ring-[#0265A6]/30'
                : darkMode ? 'bg-[#071326]/60 border-[#003B73]' : 'bg-[#EBF3FA]/50 border-[#BACDDF]'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#0265A6] text-white">
                  Route B
                </span>
                {verdict.name === optionB.name && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Recommended
                  </span>
                )}
              </div>

              <h3 className="text-xl font-black mb-2 leading-tight">{optionB.name}</h3>
              <p className="text-xs font-bold text-zinc-400 mb-6">{optionB.degrees} • {optionB.duration}</p>

              {/* Metrics Bars */}
              <div className="space-y-4 text-xs font-semibold mb-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-400">Total Tuition Cost</span>
                    <span className="font-bold text-[#0265A6]">{optionB.tuitionCost}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#003B73] to-[#0265A6]" style={{ width: `${Math.min(100, (optionB.costNum / 30) * 100)}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-400">Est. 5-Year Salary</span>
                    <span className="font-bold text-emerald-500">{optionB.startingSalary}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${Math.min(100, (optionB.salaryNum / 35) * 100)}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-400">Financial Break-Even</span>
                    <span className="font-bold text-blue-400">{optionB.breakEvenYears} Years</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-400">2026-2030 Growth Index</span>
                    <span className="font-bold text-purple-400">{optionB.growthIndex}%</span>
                  </div>
                </div>
              </div>

              {/* Core Skills */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#0265A6] mb-2">Core Skillsets:</div>
                <div className="flex flex-wrap gap-1.5">
                  {optionB.skills.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#003B73]/30 border border-[#003B73] text-[#6096BA]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
