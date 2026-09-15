import React from 'react';
import { ChevronRight, DollarSign, GraduationCap, TrendingUp, Bookmark, Star, Sparkles, Brain } from 'lucide-react';

const CareerCard = ({ career, onSelect, darkMode, savedCareers, setSavedCareers }) => {
  if (!career) return null;

  // Safe fallback values
  const careerName = career.name || 'Career Specialist';
  const careerDesc = career.description || 'Specialized professional pathway with high career mobility and competitive compensation.';
  const salaryDisplay = career.salaryRange ? career.salaryRange.split('|')[0].trim() : '₹6 - 25 LPA';
  const educationDisplay = career.education ? career.education.split('+')[0].trim() : 'Bachelor Degree';
  const outlookDisplay = career.jobOutlook || 'High Demand';
  const skillsList = career.skills && Array.isArray(career.skills) && career.skills.length > 0 
    ? career.skills.slice(0, 3) 
    : ['Critical Thinking', 'Problem Solving', 'Communication'];
  const fitScore = career.fitScore || (career.name ? (88 + (career.name.length % 11)) : 94);

  const isBookmarked = savedCareers?.some(c => c && c.name === careerName);

  const toggleBookmark = (e) => {
    e.stopPropagation();
    if (setSavedCareers && Array.isArray(savedCareers)) {
      if (isBookmarked) {
        setSavedCareers(savedCareers.filter(c => c && c.name !== careerName));
      } else {
        // Prevent duplicates
        const alreadyExists = savedCareers.some(c => c && c.name === careerName);
        if (!alreadyExists) {
          setSavedCareers([...savedCareers, career]);
        }
      }
    }
  };

  return (
    <div
      onClick={() => onSelect && onSelect(career)}
      className={`group cursor-pointer rounded-3xl border transition-all duration-300 overflow-hidden hover-lift flex flex-col justify-between ${
        darkMode
          ? 'bg-gradient-to-b from-[#0A1E3F] to-[#071326] border-[#003B73] hover:border-[#0265A6] hover:shadow-[0_12px_35px_rgba(2,101,166,0.25)]'
          : 'bg-gradient-to-b from-white to-[#EBF3FA]/30 border-[#BACDDF] hover:border-[#0265A6] shadow-md hover:shadow-[0_12px_35px_rgba(2,101,166,0.18)]'
      }`}
    >
      {/* Header Section */}
      <div className={`p-5 sm:p-6 border-b ${darkMode ? 'border-[#003B73]' : 'border-[#BACDDF]'}`}>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            {/* Fit Score Badge */}
            <div className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white shadow-md shadow-[#0265A6]/20">
              <Sparkles className="w-3 h-3 text-white" />
              <span>{fitScore}% Fit</span>
            </div>

            {/* High Demand Badge */}
            <div className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
              darkMode
                ? 'bg-[#0A1E3F] text-[#6096BA] border-[#003B73]'
                : 'bg-[#EBF3FA] text-[#0265A6] border-[#BACDDF]'
            }`}>
              <TrendingUp className="w-3 h-3 text-[#0265A6]" />
              <span>{outlookDisplay.split('-')[0].trim()}</span>
            </div>
          </div>

          {/* Bookmark Button */}
          {setSavedCareers && (
            <button
              onClick={toggleBookmark}
              aria-label={isBookmarked ? 'Unsave career' : 'Save career'}
              className={`p-2 rounded-xl transition-all duration-200 btn-interactive border ${
                isBookmarked
                  ? 'bg-gradient-to-r from-[#003B73] to-[#0265A6] border-[#0265A6] text-white scale-105 shadow-sm'
                  : darkMode
                    ? 'bg-[#0A1E3F] border-[#003B73] text-[#6096BA] hover:text-white hover:border-[#0265A6]'
                    : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6] hover:text-white hover:bg-[#0265A6]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Career Name */}
        <h3 className={`text-xl font-black mb-2 transition-colors line-clamp-1 ${
          darkMode ? 'text-white group-hover:text-[#6096BA]' : 'text-[#051C3E] group-hover:text-[#0265A6]'
        }`}>
          {careerName}
        </h3>

        {/* Description */}
        <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
          darkMode ? 'text-zinc-300' : 'text-zinc-600'
        }`}>
          {careerDesc}
        </p>

        {/* In-Demand Skills Pills */}
        <div className="flex flex-wrap gap-1.5 mt-3.5">
          {skillsList.map((skill, idx) => (
            <span
              key={idx}
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-lg border ${
                darkMode
                  ? 'bg-[#0A1E3F]/80 border-[#003B73] text-[#6096BA]'
                  : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6]'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Stats & Actions Section */}
      <div className="p-5 sm:p-6 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {/* Salary */}
          <div className={`p-2.5 rounded-xl border ${
            darkMode ? 'bg-gradient-to-br from-[#0A1E3F] to-[#071326] border-[#003B73]' : 'bg-gradient-to-br from-[#EBF3FA] to-[#BACDDF]/20 border-[#BACDDF]/80'
          }`}>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#0265A6] mb-0.5">
              <DollarSign className="w-3 h-3 text-[#0265A6]" />
              <span>Package</span>
            </div>
            <div className={`text-xs font-black truncate ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
              {salaryDisplay}
            </div>
          </div>

          {/* Education */}
          <div className={`p-2.5 rounded-xl border ${
            darkMode ? 'bg-gradient-to-br from-[#0A1E3F] to-[#071326] border-[#003B73]' : 'bg-gradient-to-br from-[#EBF3FA] to-[#BACDDF]/20 border-[#BACDDF]/80'
          }`}>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#0265A6] mb-0.5">
              <GraduationCap className="w-3 h-3 text-[#0265A6]" />
              <span>Degree</span>
            </div>
            <div className={`text-xs font-black truncate ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
              {educationDisplay}
            </div>
          </div>
        </div>

        {/* Explore Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onSelect) onSelect(career);
          }}
          className="w-full py-3 px-4 rounded-xl font-bold text-xs btn-interactive flex items-center justify-center gap-2 border cursor-pointer bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] border-[#0265A6]/40 text-white hover:brightness-110 shadow-md shadow-[#0265A6]/25"
        >
          <span>Explore Career Roadmap</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default CareerCard;