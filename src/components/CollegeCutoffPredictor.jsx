import React, { useState } from 'react';
import { Target, Search, CheckCircle2, Building2, MapPin, ExternalLink, Sparkles, TrendingUp, X } from 'lucide-react';

const SAMPLE_PREDICTIONS = {
  jee: [
    { name: 'IIT Bombay - Computer Science', chance: 'Target Match (75%)', cutoff: 'Rank 1 - 350', location: 'Mumbai, MH', avgPackage: '₹28 LPA', link: 'https://iitb.ac.in' },
    { name: 'IIT Delhi - AI & Data Engineering', chance: 'High Probability (92%)', cutoff: 'Rank 350 - 850', location: 'New Delhi', avgPackage: '₹26 LPA', link: 'https://iitd.ac.in' },
    { name: 'IIT Madras - Electrical Engineering', chance: 'High Probability (95%)', cutoff: 'Rank 850 - 1400', location: 'Chennai, TN', avgPackage: '₹24 LPA', link: 'https://iitm.ac.in' },
    { name: 'NIT Trichy - Computer Science', chance: 'Safety Match (99%)', cutoff: 'Rank 1400 - 3200', location: 'Tiruchirappalli', avgPackage: '₹22 LPA', link: 'https://nitt.edu' }
  ],
  neet: [
    { name: 'AIIMS New Delhi - MBBS / MS', chance: 'Target Match (70%)', cutoff: 'Rank 1 - 100', location: 'New Delhi', avgPackage: '₹32 LPA (Residency)', link: 'https://aiims.edu' },
    { name: 'JIPMER Puducherry - Clinical Medicine', chance: 'High Probability (88%)', cutoff: 'Rank 100 - 450', location: 'Puducherry', avgPackage: '₹28 LPA', link: 'https://jipmer.edu.in' },
    { name: 'KMC Manipal - MBBS / MD', chance: 'High Probability (95%)', cutoff: 'Rank 450 - 2500', location: 'Manipal, KA', avgPackage: '₹25 LPA', link: 'https://manipal.edu' }
  ],
  cat: [
    { name: 'IIM Ahmedabad - PGP / MBA', chance: 'Target Match (72%)', cutoff: '99.5+ Percentile', location: 'Ahmedabad, GJ', avgPackage: '₹34 LPA', link: 'https://iima.ac.in' },
    { name: 'IIM Bangalore - PGP Management', chance: 'High Probability (85%)', cutoff: '99.2+ Percentile', location: 'Bengaluru, KA', avgPackage: '₹33 LPA', link: 'https://iimb.ac.in' },
    { name: 'FMS Delhi - MBA Finance', chance: 'High Probability (94%)', cutoff: '98.8+ Percentile', location: 'New Delhi', avgPackage: '₹32 LPA', link: 'https://fms.edu' }
  ],
  clat: [
    { name: 'NLSIU Bengaluru - BA LLB (Hons)', chance: 'Target Match (75%)', cutoff: 'Rank 1 - 110', location: 'Bengaluru, KA', avgPackage: '₹22 LPA', link: 'https://nls.ac.in' },
    { name: 'NALSAR Hyderabad - Corporate Law', chance: 'High Probability (90%)', cutoff: 'Rank 110 - 280', location: 'Hyderabad, TS', avgPackage: '₹20 LPA', link: 'https://nalsar.ac.in' }
  ]
};

const CollegeCutoffPredictor = ({ darkMode, onClose }) => {
  const [examKey, setExamKey] = useState('jee');
  const [userScore, setUserScore] = useState('98.5');

  const list = SAMPLE_PREDICTIONS[examKey] || SAMPLE_PREDICTIONS.jee;

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border ${
      darkMode ? 'bg-gradient-to-b from-[#0A1E3F] to-[#071326] border-[#003B73]' : 'bg-white border-[#BACDDF] shadow-md'
    }`}>
      {/* Title */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6 pb-4 border-b border-[#003B73]/40 dark:border-[#003B73]/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-sm mb-2">
            <Target className="w-3.5 h-3.5" /> Entrance Rank & Cutoff Predictor
          </div>
          <h3 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
            University Admission Probability Engine
          </h3>
          <p className={`text-xs font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
            Predict high-probability, target, and safety college matches based on previous year cutoffs
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              darkMode ? 'hover:bg-[#003B73] text-zinc-300' : 'hover:bg-[#BACDDF]/40 text-zinc-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Input Form Controls */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
            darkMode ? 'text-zinc-300' : 'text-zinc-700'
          }`}>
            Target Entrance Exam
          </label>
          <select
            value={examKey}
            onChange={(e) => setExamKey(e.target.value)}
            className={`w-full p-3.5 rounded-2xl border text-sm font-bold cursor-pointer focus:outline-none ${
              darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#051C3E]'
            }`}
          >
            <option value="jee">JEE Advanced / Main (Engineering & AI)</option>
            <option value="neet">NEET PG / UG (Medical & Surgical)</option>
            <option value="cat">CAT 2026 (Management & B-Schools)</option>
            <option value="clat">CLAT (National Law Universities)</option>
          </select>
        </div>

        <div>
          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
            darkMode ? 'text-zinc-300' : 'text-zinc-700'
          }`}>
            Estimated Percentile / All India Rank
          </label>
          <input
            type="text"
            value={userScore}
            onChange={(e) => setUserScore(e.target.value)}
            placeholder="e.g. 98.5 Percentile or Rank 1200"
            className={`w-full p-3.5 rounded-2xl border text-sm font-bold focus:outline-none ${
              darkMode ? 'bg-[#071326] border-[#003B73] text-white placeholder-zinc-500' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#051C3E] placeholder-zinc-400'
            }`}
          />
        </div>
      </div>

      {/* Predictions Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {list.map((col, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border flex flex-col justify-between transition-all hover-lift ${
              darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA]/50 border-[#BACDDF]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-sm">
                  {col.chance}
                </span>
                <span className={`text-[11px] font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {col.cutoff}
                </span>
              </div>

              <h4 className={`text-sm font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                {col.name}
              </h4>

              <div className="flex items-center gap-3 text-xs mt-2 text-zinc-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0265A6]" />
                  <span>{col.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#0265A6]" />
                  <span className="font-bold text-[#0265A6]">{col.avgPackage}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t flex items-center justify-between text-xs border-[#003B73]/40 dark:border-[#003B73]/60">
              <span className="text-[11px] font-semibold text-zinc-400">NIRF Verified Listing</span>
              <a
                href={col.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#0265A6] hover:underline flex items-center gap-1"
              >
                <span>Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollegeCutoffPredictor;
