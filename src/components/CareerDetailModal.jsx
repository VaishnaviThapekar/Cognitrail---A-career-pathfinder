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
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className={`${darkMode ? 'bg-[#121215] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'} border rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-scale`}>
          {/* Header */}
          <div className={`sticky top-0 ${darkMode ? 'bg-[#121215]/95 border-zinc-800' : 'bg-white/95 border-zinc-200'} border-b p-6 rounded-t-3xl z-10 backdrop-blur-md`}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className={`text-3xl font-black mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{career.name}</h2>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{career.description}</p>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-xl border btn-interactive ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white' : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:text-black'}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Top Stats Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className={`${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} p-5 rounded-2xl border`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-xl border ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-black'}`}>Salary Range</h3>
                </div>
                <p className={`text-sm font-bold ${darkMode ? 'text-zinc-300' : 'text-zinc-800'} leading-relaxed`}>{career.salaryRange}</p>
              </div>

              <div className={`${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} p-5 rounded-2xl border`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-xl border ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-black'}`}>When to Start</h3>
                </div>
                <p className={`text-sm font-bold ${darkMode ? 'text-zinc-300' : 'text-zinc-800'}`}>{career.ageToStart}</p>
              </div>
            </div>

            {/* Education Required */}
            <div className={`${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} p-5 rounded-2xl border`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-xl border ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-black'}`}>Education Required</h3>
              </div>
              <p className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-zinc-700'} mb-3`}>{career.education}</p>
              {career.entranceExams && (
                <>
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} mb-2 flex items-center gap-2`}>
                    <Award className="w-4 h-4" />
                    Entrance Exams
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {career.entranceExams.map((exam, idx) => (
                      <span key={idx} className={`px-3 py-1 rounded-xl text-xs font-bold border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-800'}`}>
                        {exam}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Top Colleges */}
            {career.topColleges && (
              <div className={`${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} p-5 rounded-2xl border`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-xl border ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-black'}`}>Top Colleges & Institutions</h3>
                </div>
                <ul className="space-y-3">
                  {career.topColleges.map((college, idx) => {
                    const collegeName = typeof college === 'string' ? college : college.name;
                    const collegeWebsite = typeof college === 'object' && college.website ? college.website : null;
                    const collegeRating = typeof college === 'object' && college.rating ? college.rating : null;

                    return (
                      <li key={idx} className={`flex items-center justify-between gap-3 p-3.5 border ${darkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl hover-lift`}>
                        <div className="flex items-center gap-2.5 flex-1">
                          <Star className="w-4 h-4 text-zinc-400 fill-zinc-400 flex-shrink-0" />
                          <div className="flex-1">
                            <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-black'}`}>{collegeName}</span>
                            {collegeRating && (
                              <div className="flex items-center gap-1 mt-0.5">
                                <span className={`text-xs font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                  ⭐ {collegeRating.toFixed(1)}/5.0
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
                            className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl border btn-interactive ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-white hover:text-black' : 'bg-zinc-100 border-zinc-300 text-zinc-800 hover:bg-black hover:text-white'}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Portal
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Required Skills */}
            <div className={`${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} p-5 rounded-2xl border`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-xl border ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-black'}`}>Required Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {career.skills.map((skill, idx) => (
                  <span key={idx} className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-800'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setShowRoadmap(true)}
                className={`w-full py-4 px-6 rounded-2xl font-black text-sm btn-interactive hover-lift shadow-xl ${darkMode
                  ? 'bg-white text-black hover:bg-zinc-200'
                  : 'bg-black text-white hover:bg-zinc-800'
                  }`}
              >
                <div className="flex items-center justify-center gap-2.5">
                  <Map className="w-5 h-5" />
                  <span>View Career Roadmap</span>
                </div>
              </button>
              <button
                onClick={() => { onClose(); if (window.openSkillGap) window.openSkillGap(career); }}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-sm btn-interactive hover-lift border ${darkMode
                  ? 'bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800'
                  : 'bg-zinc-100 border-zinc-300 text-black hover:bg-zinc-200'
                  }`}
              >
                <div className="flex items-center justify-center gap-2.5">
                  <Brain className="w-5 h-5" />
                  <span>Analyze Skill Gap</span>
                </div>
              </button>
            </div>
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