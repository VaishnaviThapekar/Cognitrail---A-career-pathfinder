import React from 'react';
import { ChevronRight, DollarSign, GraduationCap, TrendingUp, Bookmark, Star } from 'lucide-react';

const CareerCard = ({ career, onSelect, darkMode, savedCareers, setSavedCareers }) => {
  const isBookmarked = savedCareers?.some(c => c.name === career.name);

  const toggleBookmark = (e) => {
    e.stopPropagation();
    if (setSavedCareers) {
      if (isBookmarked) {
        setSavedCareers(savedCareers.filter(c => c.name !== career.name));
      } else {
        setSavedCareers([...savedCareers, career]);
      }
    }
  };

  return (
    <div
      onClick={() => onSelect(career)}
      className={`group cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden hover:shadow-xl hover:-translate-y-1 ${darkMode
        ? 'bg-[#121215] border-zinc-800 hover:border-zinc-600'
        : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-sm'
        }`}
    >
      {/* Header Section */}
      <div className={`p-5 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-100'}`}>
        <div className="flex items-start justify-between mb-3">
          {/* High Demand Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${darkMode
            ? 'bg-zinc-900 text-zinc-300 border-zinc-700'
            : 'bg-zinc-100 text-zinc-800 border-zinc-200'
            }`}>
            <TrendingUp className="w-3 h-3" />
            High Demand
          </div>

          {/* Bookmark */}
          {setSavedCareers && (
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-full transition-all ${isBookmarked
                ? darkMode
                  ? 'bg-white text-black'
                  : 'bg-black text-white'
                : darkMode
                  ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Career Name */}
        <h3 className={`text-xl font-black mb-2 transition-colors ${darkMode ? 'text-white group-hover:text-zinc-300' : 'text-black group-hover:text-zinc-700'}`}>
          {career.name}
        </h3>

        {/* Description */}
        <p className={`text-sm leading-relaxed line-clamp-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {career.description}
        </p>
      </div>

      {/* Stats Section */}
      <div className="p-5">
        <div className="space-y-3 mb-4">
          {/* Salary */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-zinc-900 text-zinc-300' : 'bg-zinc-100 text-zinc-700'}`}>
                <DollarSign className="w-4 h-4" />
              </div>
              <span className={`font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Salary
              </span>
            </div>
            <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
              {career.salaryRange.split('|')[0]}
            </span>
          </div>

          {/* Education */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-zinc-900 text-zinc-300' : 'bg-zinc-100 text-zinc-700'}`}>
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className={`font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Education
              </span>
            </div>
            <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
              {career.education.split('+')[0]}
            </span>
          </div>

          {/* Growth */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-zinc-900 text-zinc-300' : 'bg-zinc-100 text-zinc-700'}`}>
                <Star className="w-4 h-4" />
              </div>
              <span className={`font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Outlook
              </span>
            </div>
            <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
              {career.jobOutlook}
            </span>
          </div>
        </div>

        {/* Explore Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(career);
          }}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border ${darkMode
            ? 'bg-zinc-900 border-zinc-700 text-white hover:bg-white hover:text-black'
            : 'bg-black text-white hover:bg-zinc-800'
            }`}
        >
          Explore Details
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CareerCard;