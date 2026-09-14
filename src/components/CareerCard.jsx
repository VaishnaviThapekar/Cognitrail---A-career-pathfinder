// import React from 'react';
// import { ChevronRight, DollarSign, GraduationCap, TrendingUp, Bookmark } from 'lucide-react';

// const CareerCard = ({ career, onSelect, darkMode, savedCareers, setSavedCareers }) => {
//   const isBookmarked = savedCareers?.some(c => c.name === career.name);

//   const toggleBookmark = (e) => {
//     e.stopPropagation(); // Prevent card click when clicking bookmark

//     if (setSavedCareers) {
//       if (isBookmarked) {
//         setSavedCareers(savedCareers.filter(c => c.name !== career.name));
//       } else {
//         setSavedCareers([...savedCareers, career]);
//       }
//     }
//   };

//   return (
//     <div
//       onClick={() => onSelect(career)}
//       className={`group cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl border hover:border-teal-400 hover:shadow-2xl transition-all duration-300 overflow-hidden hover-lift relative`}
//     >
//       {/* Bookmark Button */}
//       {setSavedCareers && (
//         <button
//           onClick={toggleBookmark}
//           className={`absolute top-4 right-4 p-2 rounded-full transition-all z-10 ${isBookmarked
//             ? 'bg-teal-500 text-white hover:bg-teal-600 shadow-lg'
//             : darkMode
//               ? 'bg-gray-700 text-gray-400 hover:bg-gray-600'
//               : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           title={isBookmarked ? 'Remove bookmark' : 'Bookmark this career'}
//         >
//           <Bookmark
//             className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`}
//           />
//         </button>
//       )}

//       <div className="p-6">
//         <div className="flex items-start justify-between mb-4">
//           <div className="flex-1 pr-8">
//             <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} group-hover:text-teal-600 transition-colors mb-2`}>
//               {career.name}
//             </h3>
//             <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>{career.description}</p>
//           </div>
//           <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'} group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0`} />
//         </div>

//         <div className="space-y-3">
//           <div className="flex items-center gap-2 text-sm">
//             <DollarSign className="w-4 h-4 text-green-600" />
//             <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>{career.salaryRange.split('|')[0]}</span>
//           </div>

//           <div className="flex items-center gap-2 text-sm">
//             <GraduationCap className="w-4 h-4 text-purple-600" />
//             <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{career.education.split('+')[0]}</span>
//           </div>

//           <div className="flex items-center gap-2 text-sm">
//             <TrendingUp className="w-4 h-4 text-orange-600" />
//             <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{career.jobOutlook}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CareerCard;



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
      className={`group cursor-pointer rounded-2xl border-2 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:-translate-y-1 ${darkMode
        ? 'bg-[#1a1f2e] border-[#272757] hover:border-[#505081]'
        : 'bg-white border-indigo-100 hover:border-indigo-300'
        }`}
    >
      {/* Header Section */}
      <div className={`p-5 border-b ${darkMode ? 'border-[#272757]' : 'border-indigo-50'
        }`}>
        <div className="flex items-start justify-between mb-3">
          {/* High Demand Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${darkMode
            ? 'bg-green-900/30 text-green-400 border border-green-800/50'
            : 'bg-green-50 text-green-700 border border-green-200'
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
                  ? 'bg-gradient-to-r from-[#505081] to-[#8686AC] text-white'
                  : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white'
                : darkMode
                  ? 'bg-[#272757] text-gray-400 hover:bg-[#505081]'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Career Name */}
        <h3 className={`text-xl font-black mb-2 ${darkMode ? 'text-white' : 'text-gray-900'
          }`}>
          {career.name}
        </h3>

        {/* Description */}
        <p className={`text-sm leading-relaxed line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
          {career.description}
        </p>
      </div>

      {/* Stats Section */}
      <div className="p-5">
        <div className="space-y-3 mb-4">
          {/* Salary */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-green-900/30' : 'bg-green-50'
                }`}>
                <DollarSign className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'
                  }`} />
              </div>
              <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                Salary
              </span>
            </div>
            <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'
              }`}>
              {career.salaryRange.split('|')[0]}
            </span>
          </div>

          {/* Education */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'
                }`}>
                <GraduationCap className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`} />
              </div>
              <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                Education
              </span>
            </div>
            <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'
              }`}>
              {career.education.split('+')[0]}
            </span>
          </div>

          {/* Growth */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'
                }`}>
                <Star className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
              </div>
              <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                Outlook
              </span>
            </div>
            <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'
              }`}>
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
          className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${darkMode
            ? 'bg-gradient-to-r from-[#505081] to-[#8686AC] text-white hover:from-[#8686AC] hover:to-[#505081]'
            : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700'
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