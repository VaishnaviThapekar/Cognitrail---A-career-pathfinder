import React, { useState } from 'react';
import { X, DollarSign, Calculator, MapPin, Briefcase, TrendingUp, Sparkles, PieChart, ShieldCheck } from 'lucide-react';

const CAREER_SALARY_BENCHMARKS = {
  'Software Engineer': { entry: 8, mid: 18, senior: 35, lead: 55 },
  'AI & Data Architect': { entry: 12, mid: 24, senior: 45, lead: 70 },
  'Data Scientist': { entry: 9, mid: 20, senior: 38, lead: 58 },
  'Product Manager': { entry: 10, mid: 22, senior: 42, lead: 65 },
  'Investment Banker': { entry: 14, mid: 28, senior: 50, lead: 85 },
  'MBBS Doctor / Surgeon': { entry: 9, mid: 22, senior: 40, lead: 60 },
  'UI/UX Product Designer': { entry: 7, mid: 15, senior: 28, lead: 42 },
  'Corporate Lawyer': { entry: 8, mid: 18, senior: 36, lead: 55 },
  'Cybersecurity Specialist': { entry: 8, mid: 17, senior: 32, lead: 50 },
  'Biomedical Engineer': { entry: 6, mid: 14, senior: 25, lead: 38 },
  'Commercial Pilot': { entry: 15, mid: 30, senior: 55, lead: 80 }
};

const LOCATION_MULTIPLIERS = {
  'tier1': { label: 'Tier-1 Tech Hubs (Bangalore, NCR, Hyd)', factor: 1.2, tag: 'High CTC Hub' },
  'tier2': { label: 'Tier-2 Metro Cities (Pune, Chd, Chn)', factor: 1.0, tag: 'Standard Regional' },
  'remote': { label: 'Global Remote / Foreign Firm', factor: 1.45, tag: 'USD / Overseas Scale' }
};

const findMatchingRole = (name) => {
  if (!name) return 'Software Engineer';
  const keys = Object.keys(CAREER_SALARY_BENCHMARKS);
  const exact = keys.find(k => k.toLowerCase() === name.toLowerCase());
  if (exact) return exact;
  const partial = keys.find(k => name.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(name.toLowerCase()));
  return partial || keys[0];
};

const SalaryCalculatorModal = ({ darkMode, onClose, initialCareerName }) => {
  const [selectedRole, setSelectedRole] = useState(() => findMatchingRole(initialCareerName));
  const [expYears, setExpYears] = useState(3);
  const [locationKey, setLocationKey] = useState('tier1');

  // Benchmark calculations
  const roleData = CAREER_SALARY_BENCHMARKS[selectedRole] || CAREER_SALARY_BENCHMARKS['Software Engineer'];
  const locData = LOCATION_MULTIPLIERS[locationKey];

  // Calculate salary tier based on years
  let baseSalaryLPA = roleData.entry;
  if (expYears >= 9) {
    baseSalaryLPA = roleData.lead + (expYears - 9) * 2.5;
  } else if (expYears >= 6) {
    baseSalaryLPA = roleData.senior + ((expYears - 6) / 3) * (roleData.lead - roleData.senior);
  } else if (expYears >= 3) {
    baseSalaryLPA = roleData.mid + ((expYears - 3) / 3) * (roleData.senior - roleData.mid);
  } else {
    baseSalaryLPA = roleData.entry + (expYears / 3) * (roleData.mid - roleData.entry);
  }

  const calculatedCTC = Math.round(baseSalaryLPA * locData.factor * 10) / 10;
  const baseComponent = Math.round(calculatedCTC * 0.7 * 10) / 10;
  const bonusComponent = Math.round(calculatedCTC * 0.15 * 10) / 10;
  const esopsComponent = Math.round(calculatedCTC * 0.15 * 10) / 10;
  const monthlyTakeHome = Math.round((calculatedCTC * 100000 * 0.78) / 12);

  const getExperienceLevelLabel = (yrs) => {
    if (yrs <= 2) return 'Entry Level (Junior)';
    if (yrs <= 5) return 'Mid Level (Specialist)';
    if (yrs <= 8) return 'Senior Level (Lead)';
    return 'Executive / Principal Architect';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden transition-all my-8 ${
          darkMode
            ? 'bg-gradient-to-b from-[#0A1E3F] via-[#071326] to-[#051C3E] border-[#003B73] text-white'
            : 'bg-white border-[#BACDDF] text-[#051C3E]'
        }`}
      >
        {/* Header */}
        <div className={`p-6 border-b flex items-center justify-between ${
          darkMode ? 'border-[#003B73] bg-[#0A1E3F]/80' : 'border-[#BACDDF] bg-[#EBF3FA]/50'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#003B73] to-[#0265A6] flex items-center justify-center text-white shadow-md">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Interactive Salary & Compensation Calculator</h2>
              <p className={`text-xs font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Real-time CTC breakdown based on industry benchmarks & regional tiers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              darkMode ? 'hover:bg-[#003B73] text-zinc-300' : 'hover:bg-[#BACDDF]/40 text-zinc-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Top Controls Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Role Selection */}
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                darkMode ? 'text-zinc-300' : 'text-zinc-700'
              }`}>
                Select Target Role
              </label>
              <div className="relative">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className={`w-full p-3.5 rounded-2xl border text-sm font-bold appearance-none cursor-pointer focus:outline-none ${
                    darkMode
                      ? 'bg-[#071326] border-[#003B73] text-white focus:border-[#0265A6]'
                      : 'bg-[#EBF3FA] border-[#BACDDF] text-[#051C3E] focus:border-[#0265A6]'
                  }`}
                >
                  {Object.keys(CAREER_SALARY_BENCHMARKS).map((role) => (
                    <option key={role} value={role} className={darkMode ? 'bg-[#071326]' : 'bg-white'}>
                      {role}
                    </option>
                  ))}
                </select>
                <Briefcase className="w-4 h-4 text-[#0265A6] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Location Selector */}
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                darkMode ? 'text-zinc-300' : 'text-zinc-700'
              }`}>
                Location Tier
              </label>
              <div className="relative">
                <select
                  value={locationKey}
                  onChange={(e) => setLocationKey(e.target.value)}
                  className={`w-full p-3.5 rounded-2xl border text-sm font-bold appearance-none cursor-pointer focus:outline-none ${
                    darkMode
                      ? 'bg-[#071326] border-[#003B73] text-white focus:border-[#0265A6]'
                      : 'bg-[#EBF3FA] border-[#BACDDF] text-[#051C3E] focus:border-[#0265A6]'
                  }`}
                >
                  {Object.entries(LOCATION_MULTIPLIERS).map(([key, item]) => (
                    <option key={key} value={key} className={darkMode ? 'bg-[#071326]' : 'bg-white'}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <MapPin className="w-4 h-4 text-[#0265A6] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Experience Slider */}
          <div className={`p-5 rounded-2xl border ${
            darkMode ? 'bg-[#071326]/80 border-[#003B73]' : 'bg-[#EBF3FA]/60 border-[#BACDDF]'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                Years of Experience: <span className="text-[#0265A6] font-black text-sm">{expYears} Years</span>
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-sm">
                {getExperienceLevelLabel(expYears)}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="12"
              step="1"
              value={expYears}
              onChange={(e) => setExpYears(parseInt(e.target.value, 10))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#003B73]/40 accent-[#0265A6]"
            />

            <div className="flex justify-between text-[11px] font-semibold text-zinc-400 mt-2">
              <span>0 Yrs (Fresh Grad)</span>
              <span>3 Yrs (Mid)</span>
              <span>6 Yrs (Senior)</span>
              <span>12+ Yrs (Principal)</span>
            </div>
          </div>

          {/* Dynamic Result Hero Card */}
          <div className="p-6 rounded-3xl border bg-gradient-to-br from-[#003B73] via-[#0265A6] to-[#003B73] text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider opacity-80 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Calculated Annual Package (CTC)
                </span>
                <div className="text-3xl sm:text-4xl font-black mt-1 tracking-tight">
                  ₹{calculatedCTC} <span className="text-lg font-bold">LPA</span>
                </div>
                <p className="text-xs text-white/80 mt-1">
                  Estimated Take-Home: <strong className="text-white">₹{monthlyTakeHome.toLocaleString('en-IN')} / month</strong>
                </p>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/70 block">
                  Location Adjustment
                </span>
                <span className="text-xs font-black text-white">{locData.tag}</span>
              </div>
            </div>
          </div>

          {/* Breakdown Distribution Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                darkMode ? 'text-zinc-300' : 'text-zinc-700'
              }`}>
                <PieChart className="w-3.5 h-3.5 text-[#0265A6]" /> Pay Structure Breakdown
              </span>
            </div>

            {/* Visual Stacked Bar */}
            <div className="h-4 rounded-xl overflow-hidden flex shadow-inner mb-4">
              <div style={{ width: '70%' }} className="bg-[#003B73] h-full" title="Base Salary (70%)"></div>
              <div style={{ width: '15%' }} className="bg-[#0265A6] h-full" title="Performance Bonus (15%)"></div>
              <div style={{ width: '15%' }} className="bg-[#6096BA] h-full" title="ESOPs / Stocks (15%)"></div>
            </div>

            {/* Component Cards Grid */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF]'}`}>
                <div className="text-[10px] font-bold uppercase text-zinc-400">Base Pay (70%)</div>
                <div className="text-sm font-black text-[#0265A6]">₹{baseComponent} LPA</div>
              </div>

              <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF]'}`}>
                <div className="text-[10px] font-bold uppercase text-zinc-400">Bonus (15%)</div>
                <div className="text-sm font-black text-[#0265A6]">₹{bonusComponent} LPA</div>
              </div>

              <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF]'}`}>
                <div className="text-[10px] font-bold uppercase text-zinc-400">ESOPs / Stock (15%)</div>
                <div className="text-sm font-black text-[#0265A6]">₹{esopsComponent} LPA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 sm:p-5 border-t flex items-center justify-between text-xs ${
          darkMode ? 'border-[#003B73] bg-[#0A1E3F]/80 text-zinc-400' : 'border-[#BACDDF] bg-[#EBF3FA]/50 text-zinc-600'
        }`}>
          <div className="flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#0265A6]" />
            <span>Benchmark source: Industry Compensation Surveys 2026</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-bold btn-interactive bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-md cursor-pointer"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculatorModal;
