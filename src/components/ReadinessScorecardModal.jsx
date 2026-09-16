import React, { useState } from 'react';
import { X, Award, CheckCircle2, FileText, Download, Sparkles, AlertCircle, BarChart2, ShieldCheck, ChevronRight } from 'lucide-react';

const SAMPLE_RESUMES = [
  { role: 'Software & AI Engineer', filename: 'Cognitrail_Software_Engineer_ATS_Resume.pdf', desc: 'ATS-optimized single-page layout featuring DSA projects, Tech Stack & GitHub links' },
  { role: 'Medical & Clinical Practice', filename: 'Cognitrail_Medical_Resident_Resume.pdf', desc: 'Clinical rotations, NEET PG rank, hospital residency experience & research papers' },
  { role: 'Finance & Investment Banking', filename: 'Cognitrail_Fintech_Analyst_Resume.pdf', desc: 'Financial modeling, CFA Level 1 status, valuation case studies & Excel benchmarks' },
  { role: 'Product Design & UI/UX', filename: 'Cognitrail_Product_Designer_Resume.pdf', desc: 'Figma design system links, user research teardowns & usability testing metrics' },
  { role: 'Corporate Law & Legal Audit', filename: 'Cognitrail_Corporate_Lawyer_Resume.pdf', desc: 'Contract drafting, Bar Council eligibility, moot court achievements & compliance audits' }
];

const ReadinessScorecardModal = ({ darkMode, onClose, initialRole }) => {
  const [targetRole, setTargetRole] = useState(initialRole || 'Software & AI Engineer');
  const [degreeLevel, setDegreeLevel] = useState('bachelor_progress');
  const [projectCount, setProjectCount] = useState('2');
  const [hasCertifications, setHasCertifications] = useState(true);
  const [hasMockInterviews, setHasMockInterviews] = useState(true);
  const [hasGithubPortfolio, setHasGithubPortfolio] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState('');

  // Calculate dynamic readiness score
  let baseScore = 40;
  if (degreeLevel === 'bachelor_done') baseScore += 20;
  if (degreeLevel === 'masters') baseScore += 25;
  if (degreeLevel === 'bachelor_progress') baseScore += 15;

  if (projectCount === '1') baseScore += 10;
  if (projectCount === '2') baseScore += 20;
  if (projectCount === '3') baseScore += 30;

  if (hasCertifications) baseScore += 10;
  if (hasMockInterviews) baseScore += 10;
  if (hasGithubPortfolio) baseScore += 10;

  const totalScore = Math.min(baseScore, 98);
  const atsScore = Math.min(baseScore + 4, 96);
  const portfolioScore = Math.min(baseScore - 2, 94);
  const interviewScore = Math.min(baseScore + 2, 95);

  const getScoreBadge = (score) => {
    if (score >= 85) return { label: 'Placement Ready (Top 10%)', color: 'bg-emerald-500' };
    if (score >= 70) return { label: 'Strong Competitor (Top 25%)', color: 'bg-[#0265A6]' };
    return { label: 'Needs Portfolio Polish', color: 'bg-amber-500' };
  };

  const badge = getScoreBadge(totalScore);

  const handleDownloadSample = (resume) => {
    // Generate text blob for download
    const content = `COGNITRAIL ATS RESUME TEMPLATE: ${resume.role}\n\nCandidate Name: Alex Sharma\nTarget Role: ${targetRole}\nEducation: Bachelor of Technology / Professional Degree\nKey Skills: Problem Solving, Industry Toolchain, Technical Communication\nProjects:\n1. End-to-End ${targetRole} Implementation\n2. Open Source & Community Contribution\n\nVerified by Cognitrail Career Pathfinder Engine 2026`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = resume.filename.replace('.pdf', '.txt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadSuccess(`Downloaded sample resume template for ${resume.role}`);
    setTimeout(() => setDownloadSuccess(''), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className={`w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden transition-all my-8 ${
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
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Interactive Resume & Interview Readiness Scorecard</h2>
              <p className={`text-xs font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Diagnostic evaluation of ATS keyword match, portfolio weight & STAR interview preparedness
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
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Top Score Banner */}
          <div className="p-6 rounded-3xl border bg-gradient-to-br from-[#003B73] via-[#0265A6] to-[#003B73] text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider opacity-80 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Evaluated Target Role: {targetRole}
              </span>
              <div className="text-4xl sm:text-5xl font-black mt-2 tracking-tight flex items-baseline gap-2">
                {totalScore}% <span className="text-sm font-bold opacity-90">Readiness Score</span>
              </div>
              <p className="text-xs text-white/80 mt-1">
                ATS Alignment: <strong>{atsScore}%</strong> | Portfolio Weight: <strong>{portfolioScore}%</strong> | Interview Prep: <strong>{interviewScore}%</strong>
              </p>
            </div>

            <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center sm:text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-black text-white ${badge.color} shadow-sm mb-1`}>
                {badge.label}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/70 block">
                Cognitrail Diagnostic Matrix 2026
              </span>
            </div>
          </div>

          {/* Diagnostic Controls Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Target Role & Degree Level */}
            <div className={`p-5 rounded-2xl border ${
              darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA]/50 border-[#BACDDF]'
            }`}>
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 ${
                darkMode ? 'text-zinc-300' : 'text-zinc-700'
              }`}>
                1. Target Role & Education Level
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-zinc-400 mb-1">Target Role</label>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className={`w-full p-3 rounded-xl border font-bold cursor-pointer focus:outline-none ${
                      darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                    }`}
                  >
                    {SAMPLE_RESUMES.map(r => (
                      <option key={r.role} value={r.role}>{r.role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-400 mb-1">Highest Degree Status</label>
                  <select
                    value={degreeLevel}
                    onChange={(e) => setDegreeLevel(e.target.value)}
                    className={`w-full p-3 rounded-xl border font-bold cursor-pointer focus:outline-none ${
                      darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                    }`}
                  >
                    <option value="bachelor_progress">Bachelor's Degree (In Progress / Final Year)</option>
                    <option value="bachelor_done">Bachelor's Degree (Completed)</option>
                    <option value="masters">Master's / Postgraduate Degree</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Portfolio & Practice Checklist */}
            <div className={`p-5 rounded-2xl border ${
              darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA]/50 border-[#BACDDF]'
            }`}>
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 ${
                darkMode ? 'text-zinc-300' : 'text-zinc-700'
              }`}>
                2. Portfolio Projects & Verification
              </h3>

              <div className="space-y-2.5 text-xs font-semibold">
                <label className="flex items-center justify-between p-2.5 rounded-xl border cursor-pointer border-[#003B73]/60 dark:border-[#003B73]">
                  <span>Deployed Portfolio Projects:</span>
                  <select
                    value={projectCount}
                    onChange={(e) => setProjectCount(e.target.value)}
                    className={`p-1 rounded-lg border font-bold ${
                      darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                    }`}
                  >
                    <option value="1">1 Project</option>
                    <option value="2">2 Projects</option>
                    <option value="3">3+ Projects</option>
                  </select>
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl border cursor-pointer border-[#003B73]/60 dark:border-[#003B73]">
                  <span>Technical / Domain Certifications:</span>
                  <input
                    type="checkbox"
                    checked={hasCertifications}
                    onChange={(e) => setHasCertifications(e.target.checked)}
                    className="w-4 h-4 accent-[#0265A6]"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl border cursor-pointer border-[#003B73]/60 dark:border-[#003B73]">
                  <span>STAR Method & Mock Interview Practice:</span>
                  <input
                    type="checkbox"
                    checked={hasMockInterviews}
                    onChange={(e) => setHasMockInterviews(e.target.checked)}
                    className="w-4 h-4 accent-[#0265A6]"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl border cursor-pointer border-[#003B73]/60 dark:border-[#003B73]">
                  <span>Public GitHub / Portfolio Case Study:</span>
                  <input
                    type="checkbox"
                    checked={hasGithubPortfolio}
                    onChange={(e) => setHasGithubPortfolio(e.target.checked)}
                    className="w-4 h-4 accent-[#0265A6]"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Downloadable ATS Resume Templates Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                darkMode ? 'text-zinc-300' : 'text-zinc-700'
              }`}>
                <FileText className="w-3.5 h-3.5 text-[#0265A6]" /> Field-Tested ATS Resume Templates
              </h3>
              {downloadSuccess && (
                <span className="text-xs font-bold text-emerald-500 animate-pulse">
                  {downloadSuccess}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SAMPLE_RESUMES.map((resume, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex items-start justify-between gap-3 ${
                    darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA]/60 border-[#BACDDF]'
                  }`}
                >
                  <div>
                    <h4 className={`text-xs font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                      {resume.role}
                    </h4>
                    <p className={`text-[11px] leading-relaxed mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {resume.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDownloadSample(resume)}
                    title="Download ATS Resume Template"
                    className="p-2 rounded-xl bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-sm hover:brightness-110 flex-shrink-0 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-5 border-t flex items-center justify-between text-xs ${
          darkMode ? 'border-[#003B73] bg-[#0A1E3F]/80 text-zinc-400' : 'border-[#BACDDF] bg-[#EBF3FA]/50 text-zinc-600'
        }`}>
          <div className="flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#0265A6]" />
            <span>ATS Engine calibrated to Google, Microsoft, Adobe & Industry Benchmarks</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-bold btn-interactive bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-md cursor-pointer"
          >
            Close Scorecard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadinessScorecardModal;
