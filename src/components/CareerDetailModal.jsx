import React, { useState } from 'react';
import {
  X, DollarSign, Calendar, GraduationCap, Award, MapPin,
  Star, Brain, ExternalLink, Map
} from 'lucide-react';
import CareerRoadmap from './CareerRoadmap';

const CareerDetailModal = ({ career, onClose, darkMode }) => {
  const [showRoadmap, setShowRoadmap] = useState(false);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp`}>
          <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6 rounded-t-3xl z-10">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold mb-2">{career.name}</h2>
                <p className="text-orange-100">{career.description}</p>
              </div>
              <button
                onClick={onClose}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className={`${darkMode ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-700' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'} p-5 rounded-2xl border`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-600 rounded-full p-2">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Salary Range</h3>
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>{career.salaryRange}</p>
              </div>

              <div className={`${darkMode ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'} p-5 rounded-2xl border`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-600 rounded-full p-2">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>When to Start</h3>
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{career.ageToStart}</p>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'} p-5 rounded-2xl border`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-600 rounded-full p-2">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Education Required</h3>
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>{career.education}</p>
              {career.entranceExams && (
                <>
                  <h4 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-2 flex items-center gap-2`}>
                    <Award className="w-4 h-4 text-blue-600" />
                    Entrance Exams
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {career.entranceExams.map((exam, idx) => (
                      <span key={idx} className={`${darkMode ? 'bg-orange-900/50 text-orange-300' : 'bg-orange-100 text-orange-700'} px-3 py-1 rounded-full text-sm font-medium`}>
                        {exam}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {career.topColleges && (
              <div className={`${darkMode ? 'bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-700' : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'} p-5 rounded-2xl border`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-amber-600 rounded-full p-2">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Top Colleges/Institutions</h3>
                </div>
                <ul className="space-y-3">
                  {career.topColleges.map((college, idx) => {
                    const collegeName = typeof college === 'string' ? college : college.name;
                    const collegeWebsite = typeof college === 'object' && college.website ? college.website : null;
                    const collegeRating = typeof college === 'object' && college.rating ? college.rating : null;

                    return (
                      <li key={idx} className={`flex items-center justify-between gap-3 p-3 ${darkMode ? 'bg-gray-700/50' : 'bg-white'} rounded-xl hover:shadow-md transition-shadow`}>
                        <div className="flex items-center gap-2 flex-1">
                          <Star className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <div className="flex-1">
                            <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{collegeName}</span>
                            {collegeRating && (
                              <div className="flex items-center gap-1 mt-1">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-3 h-3 ${star <= Math.floor(collegeRating)
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : star - 0.5 <= collegeRating
                                          ? 'text-yellow-400 fill-yellow-400'
                                          : 'text-gray-300'
                                        }`}
                                    />
                                  ))}
                                </div>
                                <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {collegeRating.toFixed(1)}/5.0
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        {collegeWebsite && (
                          <a
                            href={collegeWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Visit Website
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className={`${darkMode ? 'bg-gradient-to-br from-rose-900/30 to-red-900/30 border-rose-700' : 'bg-gradient-to-br from-rose-50 to-red-50 border-rose-200'} p-5 rounded-2xl border`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-rose-600 rounded-full p-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Required Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {career.skills.map((skill, idx) => (
                  <span key={idx} className={`${darkMode ? 'bg-rose-900/50 text-rose-300' : 'bg-rose-100 text-rose-700'} px-3 py-1.5 rounded-full text-sm font-medium`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* View Roadmap Button */}
            <button
              onClick={() => setShowRoadmap(true)}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-lg ${darkMode
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600'
                }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Map className="w-6 h-6" />
                <span>View Career Roadmap</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Roadmap Modal */}
      {showRoadmap && (
        <CareerRoadmap
          career={career}
          onClose={() => setShowRoadmap(false)}
          darkMode={darkMode}
        />
      )}
    </>
  );
};

export default CareerDetailModal;