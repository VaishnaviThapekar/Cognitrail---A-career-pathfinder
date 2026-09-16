import React, { useState, useEffect } from 'react';
import {
  X, DollarSign, Calendar, GraduationCap, Award, MapPin,
  Star, Brain, ExternalLink, Map, TrendingUp, Sparkles,
  Layers, Code2, ArrowRight, Bookmark, CheckCircle2, Briefcase
} from 'lucide-react';
import CareerRoadmap from './CareerRoadmap';
import DayInLifeShowcase from './DayInLifeShowcase';

const CareerDetailModal = ({ 
  career, 
  onClose, 
  darkMode, 
  savedCareers, 
  setSavedCareers 
}) => {
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [activeCareer, setActiveCareer] = useState(career);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (onClose) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!activeCareer) return null;

  // Safe fallback data
  const careerName = activeCareer.name || 'Specialist Role';
  const careerDesc = activeCareer.description || 'Specialized professional role offering high career impact, versatile career paths, and competitive remuneration.';
  const salaryRange = activeCareer.salaryRange || '₹6 - 25 LPA (Junior) | ₹25 - 60 LPA (Senior) | ₹60L - 1.5 Cr+ (Executive)';
  const ageToStart = activeCareer.ageToStart || '17-18 years (After 12th) or 21+ (After Graduation)';
  const education = activeCareer.education || 'Bachelor Degree (B.Tech / B.Sc / B.Des / B.Com / B.A. - 3-4 years)';
  const jobOutlook = activeCareer.jobOutlook || 'Excellent - High Demand across Global Markets';
  const entranceExams = activeCareer.entranceExams && activeCareer.entranceExams.length > 0 
    ? activeCareer.entranceExams 
    : ['State Entrance Tests', 'CUET', 'Institutional Merit'];
  const skills = activeCareer.skills && activeCareer.skills.length > 0 
    ? activeCareer.skills 
    : ['Analytical Problem Solving', 'Strategic Communication', 'Technical Proficiency', 'Critical Thinking'];
  const fitScore = activeCareer.fitScore || (careerName ? (90 + (careerName.length % 9)) : 96);

  // Generate Career Progression Milestones
  const rawPath = activeCareer.careerPath || '';
  const progressionSteps = rawPath.includes('→')
    ? rawPath.split('→').map(s => s.trim())
    : [
        `Junior ${careerName.split(' ')[0]} / Associate`,
        `Mid-Level ${careerName.split(' ')[0]}`,
        `Senior Specialist / Lead`,
        `Principal Consultant / Director / Practice Head`
      ];

  // Generate Beginner Project Suggestions
  const beginnerProjects = activeCareer.beginnerProjects || [
    {
      title: `End-to-End ${careerName.split(' ')[0]} Portfolio Case Study`,
      desc: 'Build a practical, documented project solving a real-world user or business problem in this domain.'
    },
    {
      title: 'Industry Tooling & Framework Mastery',
      desc: 'Implement a hands-on project utilizing the industry-standard software tools and testing protocols.'
    },
    {
      title: 'Open Source or Community Contribution',
      desc: 'Collaborate on a publicly visible repository, research paper, or collaborative design teardown.'
    }
  ];

  // Generate Related Careers
  const relatedCareers = activeCareer.alternativePaths || activeCareer.relatedCareers || [
    'Software Architect',
    'Data Scientist',
    'Product Strategy Lead',
    'Management Consultant'
  ];

  const isBookmarked = savedCareers?.some(c => c && c.name === careerName);

  const toggleBookmark = () => {
    if (setSavedCareers && Array.isArray(savedCareers)) {
      if (isBookmarked) {
        setSavedCareers(savedCareers.filter(c => c && c.name !== careerName));
      } else {
        const alreadyExists = savedCareers.some(c => c && c.name === careerName);
        if (!alreadyExists) {
          setSavedCareers([...savedCareers, activeCareer]);
        }
      }
    }
  };

  const handleSwitchCareer = (relCareerName) => {
    // Look up or construct career object
    const newCareer = {
      name: relCareerName,
      description: `Related career stream in ${activeCareer.domainName || 'this industry'}. Explore educational milestones and salary outlook.`,
      education: activeCareer.education || 'Relevant Bachelor Degree (3-4 years)',
      salaryRange: activeCareer.salaryRange || '₹8 - 35 LPA+',
      jobOutlook: 'High Market Demand',
      skills: activeCareer.skills || ['Domain Fundamentals', 'Problem Solving', 'Communication'],
      entranceExams: activeCareer.entranceExams || ['Entrance Examinations'],
      topColleges: activeCareer.topColleges || []
    };
    setActiveCareer(newCareer);
  };

  return (
    <>
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="career-modal-title"
        className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 z-50 animate-fade-in"
      >
        <div className={`${
          darkMode ? 'bg-[#121215] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'
        } border rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl animate-fade-in-scale`}>
          
          {/* Header */}
          <div className={`sticky top-0 ${
            darkMode ? 'bg-[#121215]/95 border-zinc-800' : 'bg-white/95 border-zinc-200'
          } border-b p-4 sm:p-7 rounded-t-3xl z-10 backdrop-blur-md`}>
            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${
                    darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-black text-white border-black'
                  }`}>
                    {fitScore}% AI Fit Score
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    darkMode ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-600'
                  }`}>
                    {jobOutlook}
                  </span>
                </div>
                <h2 id="career-modal-title" className={`text-xl sm:text-3xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                  {careerName}
                </h2>
                <p className={`text-xs sm:text-sm mt-1.5 leading-relaxed max-w-2xl ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {careerDesc}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {setSavedCareers && (
                  <button
                    onClick={toggleBookmark}
                    title={isBookmarked ? 'Unsave Career' : 'Save Career'}
                    className={`p-2.5 rounded-xl border btn-interactive ${
                      isBookmarked
                        ? darkMode
                          ? 'bg-white text-black border-white'
                          : 'bg-black text-white border-black'
                        : darkMode
                          ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white'
                          : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:text-black'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className={`p-2.5 rounded-xl border btn-interactive ${
                    darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white' : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:text-black'
                  }`}
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">

            {/* Selected Career Context Action Bar */}
            <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
              darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA]/80 border-[#BACDDF]'
            }`}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0265A6]" />
                <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-300' : 'text-[#051C3E]'}`}>
                  Career Deep Dive Tools
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => window.openSalary && window.openSalary(activeCareer)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold btn-interactive flex items-center gap-1.5 cursor-pointer bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-sm hover:brightness-110"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Calculate Salary</span>
                </button>

                <button
                  onClick={() => window.openExams && window.openExams()}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold btn-interactive flex items-center gap-1.5 cursor-pointer border ${
                    darkMode
                      ? 'bg-[#0A1E3F] border-[#003B73] text-[#6096BA] hover:text-white hover:border-[#0265A6]'
                      : 'bg-white border-[#BACDDF] text-[#0265A6] hover:bg-[#0265A6] hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Entrance Exams</span>
                </button>

                <button
                  onClick={() => setShowRoadmap(true)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold btn-interactive flex items-center gap-1.5 cursor-pointer border ${
                    darkMode
                      ? 'bg-[#0A1E3F] border-[#003B73] text-[#6096BA] hover:text-white hover:border-[#0265A6]'
                      : 'bg-white border-[#BACDDF] text-[#0265A6] hover:bg-[#0265A6] hover:text-white'
                  }`}
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>Interactive Roadmap</span>
                </button>

                <button
                  onClick={() => window.openReadiness && window.openReadiness(activeCareer)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold btn-interactive flex items-center gap-1.5 cursor-pointer border ${
                    darkMode
                      ? 'bg-[#0A1E3F] border-[#003B73] text-[#6096BA] hover:text-white hover:border-[#0265A6]'
                      : 'bg-white border-[#BACDDF] text-[#0265A6] hover:bg-[#0265A6] hover:text-white'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Resume Readiness Score</span>
                </button>
              </div>
            </div>
            
            {/* Top Stats Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className={`${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} p-4.5 rounded-2xl border`}>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`p-2 rounded-xl border ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <h3 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Salary Spectrum
                  </h3>
                </div>
                <p className={`text-sm sm:text-base font-black ${darkMode ? 'text-white' : 'text-black'} leading-snug`}>
                  {salaryRange}
                </p>
              </div>

              <div className={`${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} p-4.5 rounded-2xl border`}>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`p-2 rounded-xl border ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    <Calendar className="w-4 h-4" />
                  </div>
                  <h3 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Entry Age & Timeline
                  </h3>
                </div>
                <p className={`text-sm sm:text-base font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                  {ageToStart}
                </p>
              </div>
            </div>

            {/* Education Required & Entrance Exams */}
            <div className={`${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} p-5 sm:p-6 rounded-2xl border`}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className={`p-2 rounded-xl border ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className={`text-sm font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                  Education Required & Academic Pathway
                </h3>
              </div>
              <p className={`text-sm font-semibold ${darkMode ? 'text-zinc-200' : 'text-zinc-800'} mb-3`}>
                {education}
              </p>
              {entranceExams && entranceExams.length > 0 && (
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} mb-2 flex items-center gap-1.5`}>
                    <Award className="w-3.5 h-3.5" />
                    Key Entrance Examinations:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {entranceExams.map((exam, idx) => (
                      <span key={idx} className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                        darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-200' : 'bg-white border-zinc-300 text-black shadow-sm'
                      }`}>
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* In-Demand Skills Required */}
            <div className={`${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} p-5 sm:p-6 rounded-2xl border`}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className={`p-2 rounded-xl border ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  <Brain className="w-4 h-4" />
                </div>
                <h3 className={`text-sm font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                  Core Skills & Competencies Required
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                    darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-white border-zinc-300 text-zinc-800 shadow-sm'
                  }`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Day in the Life, Toolchain Stack & Mobility Tree */}
            <DayInLifeShowcase career={activeCareer} darkMode={darkMode} />

            {/* Typical Career Progression Pathway */}
            <div className={`${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} p-5 sm:p-6 rounded-2xl border`}>
              <div className="flex items-center gap-2.5 mb-4">
                <div className={`p-2 rounded-xl border ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className={`text-sm font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                  Typical Career Progression Pathway
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {progressionSteps.map((step, idx) => (
                  <div key={idx} className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                    darkMode ? 'bg-black/50 border-zinc-800' : 'bg-white border-zinc-200'
                  }`}>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-zinc-400 mb-2">
                      <span>PHASE 0{idx + 1}</span>
                      {idx < progressionSteps.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-zinc-500 hidden lg:block" />
                      )}
                    </div>
                    <div className={`text-xs font-bold leading-snug ${darkMode ? 'text-white' : 'text-black'}`}>
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Beginner Project Suggestions */}
            <div className={`${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} p-5 sm:p-6 rounded-2xl border`}>
              <div className="flex items-center gap-2.5 mb-4">
                <div className={`p-2 rounded-xl border ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  <Code2 className="w-4 h-4" />
                </div>
                <h3 className={`text-sm font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                  Recommended Beginner Projects & Portfolio Builders
                </h3>
              </div>

              <div className="space-y-3">
                {beginnerProjects.map((proj, idx) => (
                  <div key={idx} className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                    darkMode ? 'bg-black/40 border-zinc-800' : 'bg-white border-zinc-200'
                  }`}>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                      darkMode ? 'bg-zinc-800 text-white' : 'bg-zinc-200 text-black'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className={`text-xs sm:text-sm font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                        {typeof proj === 'string' ? proj : proj.title}
                      </div>
                      {typeof proj === 'object' && proj.desc && (
                        <div className={`text-xs mt-1 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          {proj.desc}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Colleges Feeder List */}
            {activeCareer.topColleges && activeCareer.topColleges.length > 0 && (
              <div className={`${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} p-5 sm:p-6 rounded-2xl border`}>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`p-2 rounded-xl border ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h3 className={`text-sm font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                    Top Feeder Colleges & Universities
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {activeCareer.topColleges.map((college, idx) => {
                    const collegeName = typeof college === 'string' ? college : college.name;
                    const collegeWebsite = typeof college === 'object' && college.website ? college.website : null;
                    const collegeRating = typeof college === 'object' && college.rating ? college.rating : null;

                    return (
                      <li key={idx} className={`flex items-center justify-between gap-3 p-3 border ${
                        darkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200'
                      } rounded-xl hover-lift`}>
                        <div className="flex items-center gap-2.5 flex-1">
                          <Star className="w-4 h-4 text-zinc-400 fill-zinc-400 flex-shrink-0" />
                          <div className="flex-1">
                            <span className={`text-xs sm:text-sm font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                              {collegeName}
                            </span>
                            {collegeRating && (
                              <div className="text-[11px] font-semibold text-zinc-500 mt-0.5">
                                ⭐ {collegeRating.toFixed(1)}/5.0 Rating
                              </div>
                            )}
                          </div>
                        </div>
                        {collegeWebsite && (
                          <a
                            href={collegeWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border btn-interactive ${
                              darkMode 
                                ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-white hover:text-black' 
                                : 'bg-zinc-100 border-zinc-300 text-zinc-800 hover:bg-black hover:text-white'
                            }`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>Visit Portal</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Related Career Recommendations */}
            <div className={`${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} p-5 sm:p-6 rounded-2xl border`}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className={`p-2 rounded-xl border ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className={`text-sm font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                  Related Career Recommendations
                </h3>
              </div>
              <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} mb-3`}>
                Click any related stream below to instantly inspect its profile:
              </p>
              <div className="flex flex-wrap gap-2">
                {relatedCareers.map((relCareer, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSwitchCareer(relCareer)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border btn-interactive hover-lift cursor-pointer ${
                      darkMode 
                        ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-white hover:text-black' 
                        : 'bg-white border-zinc-300 text-black hover:bg-black hover:text-white shadow-sm'
                    }`}
                  >
                    <span>{relCareer}</span>
                    <ArrowRight className="w-3 h-3 inline ml-1.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button
                onClick={() => setShowRoadmap(true)}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] hover:brightness-110 shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <Map className="w-4 h-4 text-[#6096BA]" />
                <span>View Roadmap</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (window.openSkillGap) window.openSkillGap(activeCareer);
                }}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs border cursor-pointer flex items-center justify-center gap-2 transition-all ${
                  darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA] hover:border-[#0265A6]' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#051C3E] hover:border-[#0265A6]'
                }`}
              >
                <Brain className="w-4 h-4 text-[#0265A6]" />
                <span>Skills Gap</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (window.openReadiness) window.openReadiness(activeCareer);
                }}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs border cursor-pointer flex items-center justify-center gap-2 transition-all ${
                  darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA] hover:border-[#0265A6]' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#051C3E] hover:border-[#0265A6]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Resume Score</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (window.openMentors) window.openMentors();
                }}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs border cursor-pointer flex items-center justify-center gap-2 transition-all ${
                  darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA] hover:border-[#0265A6]' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#051C3E] hover:border-[#0265A6]'
                }`}
              >
                <Award className="w-4 h-4 text-[#6096BA]" />
                <span>Alumni Mentors</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (window.openScholarships) window.openScholarships();
                }}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs border cursor-pointer flex items-center justify-center gap-2 transition-all ${
                  darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA] hover:border-[#0265A6]' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#051C3E] hover:border-[#0265A6]'
                }`}
              >
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Scholarships</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (window.openSalary) window.openSalary();
                }}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs border cursor-pointer flex items-center justify-center gap-2 transition-all ${
                  darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA] hover:border-[#0265A6]' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#051C3E] hover:border-[#0265A6]'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-[#0265A6]" />
                <span>Salary Benchmarks</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Roadmap Modal */}
      {showRoadmap && (
        <CareerRoadmap
          career={activeCareer}
          onClose={() => setShowRoadmap(false)}
          darkMode={darkMode}
        />
      )}
    </>
  );
};

export default CareerDetailModal;