import React from 'react';
import { ChevronRight, DollarSign, GraduationCap, TrendingUp, Bookmark, Star, Sparkles, Brain } from 'lucide-react';

const getCareerCoverImage = (career) => {
  const domain = (career.domainName || career.domainKey || career.name || '').toLowerCase();
  if (domain.includes('tech') || domain.includes('engineer') || domain.includes('software') || domain.includes('ai') || domain.includes('data') || domain.includes('code') || domain.includes('cyber')) {
    return 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80';
  }
  if (domain.includes('health') || domain.includes('medic') || domain.includes('doctor') || domain.includes('bio') || domain.includes('pharma') || domain.includes('surg')) {
    return 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80';
  }
  if (domain.includes('fin') || domain.includes('bank') || domain.includes('business') || domain.includes('com') || domain.includes('mark') || domain.includes('eco')) {
    return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80';
  }
  if (domain.includes('design') || domain.includes('art') || domain.includes('media') || domain.includes('ui') || domain.includes('ux') || domain.includes('anim')) {
    return 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80';
  }
  if (domain.includes('law') || domain.includes('civil') || domain.includes('govt') || domain.includes('legal') || domain.includes('judge')) {
    return 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80';
  }
  return 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80';
};

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
  const coverImage = getCareerCoverImage(career);

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
      {/* Cover Image Header */}
      <div className="relative h-36 w-full overflow-hidden">
        <img
          src={coverImage}
          alt={careerName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${
          darkMode ? 'from-[#0A1E3F] via-[#0A1E3F]/60 to-transparent' : 'from-white via-white/50 to-transparent'
        }`} />

        {/* Top Badges & Bookmark */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            {/* Fit Score Badge */}
            <div className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white shadow-md shadow-[#0265A6]/30 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-white" />
              <span>{fitScore}% Fit</span>
            </div>

            {/* High Demand Badge */}
            <div className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${
              darkMode
                ? 'bg-[#0A1E3F]/80 text-[#6096BA] border-[#003B73]'
                : 'bg-white/90 text-[#0265A6] border-[#BACDDF]'
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
              className={`p-2 rounded-xl transition-all duration-200 btn-interactive border backdrop-blur-md ${
                isBookmarked
                  ? 'bg-gradient-to-r from-[#003B73] to-[#0265A6] border-[#0265A6] text-white scale-105 shadow-sm'
                  : darkMode
                    ? 'bg-[#0A1E3F]/80 border-[#003B73] text-[#6096BA] hover:text-white hover:border-[#0265A6]'
                    : 'bg-white/90 border-[#BACDDF] text-[#0265A6] hover:text-white hover:bg-[#0265A6]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Header Section */}
      <div className={`p-5 sm:p-6 border-b ${darkMode ? 'border-[#003B73]' : 'border-[#BACDDF]'}`}>

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