import React, { useState, useEffect } from 'react';
import {
  X, Search, DollarSign, Award, Calendar, ExternalLink, GraduationCap,
  CheckCircle2, Sparkles, Filter, ShieldCheck, FileText, ArrowRight
} from 'lucide-react';
import { useGamification } from '../contexts/GamificationContext';

const SCHOLARSHIPS_DATA = [
  {
    id: 's1',
    name: 'Reliance Foundation Undergraduate Scholarship 2026',
    provider: 'Reliance Foundation',
    category: 'Engineering & Tech',
    amount: '₹2,00,000 Total (Over Degree)',
    coverage: 'Tuition Fees & Learning Stipend',
    deadline: '2026-10-15',
    incomeLimit: 'Below ₹15.0 Lakhs / Annum',
    eligibility: '1st Year B.Tech / B.E. Students in CS, AI, ECE, Mechanical, Biotechnology. 60%+ in 12th Board.',
    officialUrl: 'https://www.scholarships.reliancefoundation.org',
    tags: ['Merit-cum-Means', 'Undergraduate', 'Tech & AI']
  },
  {
    id: 's2',
    name: 'KVPY / INSPIRE She Fellowship for Basic Sciences',
    provider: 'DST (Dept of Science & Tech, Govt of India)',
    category: 'Pure Sciences & Research',
    amount: '₹80,000 / Year + ₹20,000 Mentorship Grant',
    coverage: 'Complete Monthly Stipend & Summer Research Support',
    deadline: '2026-11-30',
    incomeLimit: 'Open to All Income Tiers (Top 1% Rank in 12th Board)',
    eligibility: 'Pursuing B.Sc / BS / Int. M.Sc in Physics, Chemistry, Mathematics, Biology, IISER / NISER students.',
    officialUrl: 'https://online-inspire.gov.in',
    tags: ['Govt Fellowship', 'Pure Science', 'Research']
  },
  {
    id: 's3',
    name: 'National Scholarship Scheme for Higher Education (NSP Portal)',
    provider: 'Ministry of Education, Govt of India',
    category: 'All Fields',
    amount: 'Up to ₹20,000 / Year',
    coverage: 'College Tuition Subsidy & Hostel Support',
    deadline: '2026-10-31',
    incomeLimit: 'Below ₹4.5 Lakhs / Annum',
    eligibility: 'Above 80th Percentile in 12th Board exam. Applicable across Engineering, Medical, Law, Commerce, Arts.',
    officialUrl: 'https://scholarships.gov.in',
    tags: ['Central Govt Scheme', 'Merit-cum-Means', 'All Streams']
  },
  {
    id: 's4',
    name: 'Aditya Birla Capital Digital Scholarship',
    provider: 'Aditya Birla Capital Foundation',
    category: 'Management & Business',
    amount: '₹60,000 / Year',
    coverage: 'Tuition Fees & Exam Fees',
    deadline: '2026-09-30',
    incomeLimit: 'Below ₹6.0 Lakhs / Annum',
    eligibility: 'Students pursuing BBA, B.Com, MBA, MMS with minimum 60% in previous academic degree.',
    officialUrl: 'https://www.adityabirlacapital.com',
    tags: ['Corporate CSR', 'Commerce', 'Management']
  },
  {
    id: 's5',
    name: 'Central Sector Scheme for Medical & Dental Students',
    provider: 'National Medical Commission & Ministry of Health',
    category: 'Medical & Healthcare',
    amount: 'Full Tuition Fee Waiver + ₹5,000 Monthly Stipend',
    coverage: '100% Academic & Clinical Fees',
    deadline: '2026-11-15',
    incomeLimit: 'Below ₹8.0 Lakhs / Annum (EWS & SC/ST Category)',
    eligibility: 'MBBS / BDS / BAMS students admitted through NEET UG score in Govt & Private Medical Colleges.',
    officialUrl: 'https://www.nmc.org.in',
    tags: ['Medical', 'NEET UG', 'Full Fee Waiver']
  },
  {
    id: 's6',
    name: 'Chevening UK Postgraduate Scholarship 2026',
    provider: 'UK Foreign, Commonwealth & Development Office',
    category: 'Study Abroad / Global',
    amount: 'Fully Funded (Full Tuition + Flights + Monthly Allowance)',
    coverage: '100% Overseas Master’s Tuition & Living Expenses in UK',
    deadline: '2026-11-05',
    incomeLimit: 'Open to All Tiers (2+ Years Work Experience Required)',
    eligibility: 'Indian citizens applying for 1-year Master’s degree at UK Universities (Oxford, Cambridge, Imperial, LSE).',
    officialUrl: 'https://www.chevening.org/apply',
    tags: ['Global Overseas', 'Fully Funded', 'Postgraduate']
  }
];

export default function ScholarshipFinderModal({ onClose, darkMode }) {
  const { awardPoints } = useGamification();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [savedScholarships, setSavedScholarships] = useState([]);

  // Keyboard Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const categories = ['All', 'Engineering & Tech', 'Medical & Healthcare', 'Management & Business', 'Pure Sciences & Research', 'Study Abroad / Global'];

  const filteredScholarships = SCHOLARSHIPS_DATA.filter(s => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      s.name.toLowerCase().includes(q) ||
      s.provider.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q)) ||
      s.eligibility.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const toggleSave = (id) => {
    if (savedScholarships.includes(id)) {
      setSavedScholarships(savedScholarships.filter(s => s !== id));
    } else {
      setSavedScholarships([...savedScholarships, id]);
      if (awardPoints) {
        awardPoints(25, 'Saved Scholarship to Tracker');
      }
    }
  };

  const handleApplyClick = (scholarship) => {
    window.open(scholarship.officialUrl, '_blank', 'noopener,noreferrer');
    if (awardPoints) {
      awardPoints(15, 'Explored Official Scholarship Application Portal');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Scholarship & Financial Aid Finder"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div className={`relative w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden transition-all ${
        darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
      }`}>
        {/* Modal Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-[#051C3E] via-[#003B73] to-[#0265A6] text-white">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <Award className="w-6 h-6 text-[#6096BA]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#0265A6]/40 text-[#EBF3FA] border border-[#6096BA]/30">
                    Verified Financial Aid Portal
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    2026 Active Grants
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
                  Scholarship & Financial Aid Finder
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-[#EBF3FA]/90 mt-3 max-w-2xl">
            Explore national, corporate, merit-cum-means, and international scholarships with direct government and foundation portal links.
          </p>

          {/* Filters */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search scholarships by keyword (Reliance, KVPY, Full Waiver...)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white/10 border border-white/20 text-white placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#6096BA]"
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-white text-[#051C3E] shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* List of Scholarships */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredScholarships.map(sch => {
              const isSaved = savedScholarships.includes(sch.id);
              return (
                <div
                  key={sch.id}
                  className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${
                    darkMode
                      ? 'bg-[#0A1E3F]/80 border-[#003B73] hover:border-[#0265A6]'
                      : 'bg-[#EBF3FA]/50 border-[#BACDDF] hover:border-[#0265A6]'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-[#0265A6] dark:text-[#6096BA] uppercase tracking-wider">
                          {sch.provider}
                        </span>
                        <h3 className="text-base font-bold mt-0.5 leading-snug">
                          {sch.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => toggleSave(sch.id)}
                        className={`p-2 rounded-xl border transition-colors ${
                          isSaved
                            ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                            : 'bg-white/10 border-zinc-300 dark:border-zinc-700 text-zinc-400 hover:text-amber-400'
                        }`}
                        title={isSaved ? "Saved to tracker" : "Save scholarship"}
                      >
                        ★
                      </button>
                    </div>

                    {/* Amount & Coverage Pill */}
                    <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-[#003B73]/20 via-[#0265A6]/20 to-[#003B73]/10 border border-[#0265A6]/30">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-600 dark:text-emerald-400">
                        <DollarSign className="w-4 h-4" />
                        <span>{sch.amount}</span>
                      </div>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-300 mt-0.5 font-medium">
                        {sch.coverage}
                      </p>
                    </div>

                    {/* Meta info */}
                    <div className="mt-3 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#0265A6]" />
                        <span>Deadline: <strong>{sch.deadline}</strong></span>
                      </p>
                      <p className="flex items-start gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#0265A6] flex-shrink-0 mt-0.5" />
                        <span>Income Tier: <strong>{sch.incomeLimit}</strong></span>
                      </p>
                      <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400 mt-2 bg-black/5 dark:bg-white/5 p-2 rounded-lg">
                        <strong>Eligibility:</strong> {sch.eligibility}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {sch.tags.map((tg, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#0265A6]/10 text-[#0265A6] dark:text-[#6096BA] border border-[#0265A6]/20"
                        >
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                    <button
                      onClick={() => handleApplyClick(sch)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] hover:brightness-110 shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Apply on Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredScholarships.length === 0 && (
            <div className="text-center py-12">
              <Award className="w-12 h-12 mx-auto text-zinc-400 mb-3" />
              <p className="text-sm font-semibold">No scholarships found matching your search criteria.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-3 text-xs font-bold text-[#0265A6] hover:underline"
              >
                Reset search filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
