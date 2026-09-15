import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, Target, TrendingUp, Book, Award, Clock, CheckCircle, Brain, Zap, 
  BarChart3, AlertCircle, Sparkles, Play, Download, Search, CheckCircle2, 
  ChevronRight, Calendar, ArrowRight, Layers, FileText, Share2, RotateCcw
} from 'lucide-react';
import { CAREER_DATABASE } from '../data/careerDatabase';

const SkillsGapAnalyzer = ({ onClose, darkMode }) => {
  const [step, setStep] = useState(1); // 1: Career selection, 2: Current skills, 3: Analysis & Roadmap
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [currentSkills, setCurrentSkills] = useState([]);
  const [skillLevels, setSkillLevels] = useState({});
  const [analysis, setAnalysis] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [completedMilestones, setCompletedMilestones] = useState([]);

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

  // Load saved progress for selected career if any
  useEffect(() => {
    if (selectedCareer) {
      try {
        const saved = localStorage.getItem(`cognitrail_skills_progress_${selectedCareer.name}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.completedMilestones) {
            setCompletedMilestones(parsed.completedMilestones);
          }
        }
      } catch (e) {
        console.warn('Could not load milestone progress', e);
      }
    }
  }, [selectedCareer]);

  // Extract all careers from CAREER_DATABASE with authentic, deduplicated skills
  const allCareers = useMemo(() => {
    const careers = [];
    let idCounter = 1;

    if (!CAREER_DATABASE) return careers;

    Object.entries(CAREER_DATABASE).forEach(([domainKey, domain]) => {
      if (domain.subFields && Array.isArray(domain.subFields)) {
        domain.subFields.forEach(subField => {
          if (subField.careers && Array.isArray(subField.careers)) {
            subField.careers.forEach(career => {
              // Deduplicate and structure skill requirements
              const rawSkills = career.skills || [];
              const uniqueSkillNames = Array.from(new Set(rawSkills.map(s => s.trim())));
              
              if (uniqueSkillNames.length === 0) {
                uniqueSkillNames.push(
                  'Domain Fundamentals',
                  'Critical Problem Solving',
                  'Technical Proficiency',
                  'Strategic Communication'
                );
              }

              const structuredSkills = uniqueSkillNames.map((skillName, idx) => {
                let importance = 'Important';
                let level = 'Intermediate';
                let timeToLearn = '6-8 weeks (approx. 50 hrs)';

                if (idx === 0 || idx === 1) {
                  importance = 'Critical';
                  level = 'Intermediate';
                  timeToLearn = '8-10 weeks (approx. 70 hrs)';
                } else if (idx === 2 || idx === 3) {
                  importance = 'Important';
                  level = 'Intermediate';
                  timeToLearn = '6-8 weeks (approx. 50 hrs)';
                } else if (idx >= 4 && idx < 6) {
                  importance = 'Critical';
                  level = 'Advanced';
                  timeToLearn = '10-14 weeks (approx. 100 hrs)';
                } else {
                  importance = 'Nice to have';
                  level = 'Beginner';
                  timeToLearn = '3-5 weeks (approx. 25 hrs)';
                }

                // Determine skill category
                const sLower = skillName.toLowerCase();
                let category = 'Technical Core';
                if (sLower.includes('diagnos') || sLower.includes('clinic') || sLower.includes('patient') || sLower.includes('care') || sLower.includes('medic')) category = 'Clinical & Health';
                else if (sLower.includes('code') || sLower.includes('program') || sLower.includes('python') || sLower.includes('react') || sLower.includes('algorithm') || sLower.includes('data structure')) category = 'Software Engineering';
                else if (sLower.includes('design') || sLower.includes('ui') || sLower.includes('ux') || sLower.includes('figma') || sLower.includes('visual')) category = 'Design & UX';
                else if (sLower.includes('communicat') || sLower.includes('writ') || sLower.includes('empath') || sLower.includes('listen')) category = 'Soft Skills & Leadership';
                else if (sLower.includes('financ') || sLower.includes('account') || sLower.includes('market') || sLower.includes('model') || sLower.includes('trade')) category = 'Finance & Business';
                else if (sLower.includes('analyt') || sLower.includes('logic') || sLower.includes('sql') || sLower.includes('data')) category = 'Data & Analytics';

                return {
                  name: skillName,
                  level,
                  category,
                  importance,
                  timeToLearn
                };
              });

              careers.push({
                id: `career-${idCounter++}`,
                name: career.name,
                domain: domain.name,
                domainKey: domainKey,
                icon: domain.icon || '💼',
                description: career.description || 'Specialized professional career pathway with strong market growth.',
                salary: career.salaryRange || '₹6 - 25 LPA',
                education: career.education || 'Bachelor Degree (3-4 years)',
                requiredSkills: structuredSkills
              });
            });
          }
        });
      }
    });

    return careers;
  }, []);

  // Extract domains for filter
  const domains = useMemo(() => {
    if (!CAREER_DATABASE) return [];
    return Object.entries(CAREER_DATABASE).map(([key, domain]) => ({
      key: key,
      name: domain.name,
      icon: domain.icon || '🌐'
    }));
  }, []);

  // Filter careers based on search and domain
  const filteredCareers = useMemo(() => {
    return allCareers.filter(career => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        career.name.toLowerCase().includes(q) ||
        career.description.toLowerCase().includes(q) ||
        career.requiredSkills.some(s => s.name.toLowerCase().includes(q))
      );
      const matchesDomain = selectedDomain === 'all' || career.domainKey === selectedDomain;
      return matchesSearch && matchesDomain;
    });
  }, [allCareers, searchQuery, selectedDomain]);

  // Handle career selection
  const handleCareerSelect = (career) => {
    setSelectedCareer(career);
    setCurrentSkills([]);
    setSkillLevels({});
    setCompletedMilestones([]);
    setStep(2);
  };

  // Handle skill toggle
  const handleSkillToggle = (skillName) => {
    if (currentSkills.includes(skillName)) {
      setCurrentSkills(currentSkills.filter(s => s !== skillName));
      const newLevels = { ...skillLevels };
      delete newLevels[skillName];
      setSkillLevels(newLevels);
    } else {
      setCurrentSkills([...currentSkills, skillName]);
      setSkillLevels({ ...skillLevels, [skillName]: 'Intermediate' });
    }
  };

  // Generate skills gap analysis with structured 3-phase milestones
  const generateAnalysis = () => {
    if (!selectedCareer) return;

    const matchingSkills = [];
    const missingSkills = [];
    const skillsToImprove = [];
    let totalScore = 0;
    let maxScore = 0;

    selectedCareer.requiredSkills.forEach(reqSkill => {
      const weight = reqSkill.importance === 'Critical' ? 3.5 : reqSkill.importance === 'Important' ? 2.0 : 1.0;
      maxScore += weight * 3; // 3 is Advanced level

      if (currentSkills.includes(reqSkill.name)) {
        matchingSkills.push(reqSkill.name);
        const userLevel = skillLevels[reqSkill.name] || 'Intermediate';
        const levelScore = userLevel === 'Advanced' ? 3 : userLevel === 'Intermediate' ? 2 : 1;
        totalScore += weight * levelScore;

        const reqLevelScore = reqSkill.level === 'Advanced' ? 3 : reqSkill.level === 'Intermediate' ? 2 : 1;
        if (levelScore < reqLevelScore) {
          skillsToImprove.push({
            name: reqSkill.name,
            currentLevel: userLevel,
            targetLevel: reqSkill.level,
            importance: reqSkill.importance
          });
        }
      } else {
        missingSkills.push(reqSkill);
      }
    });

    const readinessScore = Math.max(15, Math.min(98, Math.round((totalScore / Math.max(1, maxScore)) * 100)));
    const criticalGaps = missingSkills.filter(s => s.importance === 'Critical');
    const importantGaps = missingSkills.filter(s => s.importance === 'Important');
    const niceToHaveGaps = missingSkills.filter(s => s.importance === 'Nice to have');

    // Build 3 Actionable Milestones
    const phase1Skills = criticalGaps.slice(0, 3).length > 0 ? criticalGaps.slice(0, 3) : missingSkills.slice(0, 2);
    const phase2Skills = importantGaps.slice(0, 3).length > 0 ? importantGaps.slice(0, 3) : missingSkills.slice(2, 4);
    const phase3Skills = niceToHaveGaps.length > 0 ? niceToHaveGaps : missingSkills.slice(4);

    const milestones = [
      {
        id: 'phase-1',
        phase: 'Phase 1: Critical Core Foundations',
        duration: 'Weeks 1 – 4 (Approx. 40 Hours)',
        focus: 'Master primary prerequisites and fundamental methodologies required for entry-level competence.',
        skills: phase1Skills.length > 0 ? phase1Skills : [{ name: `${selectedCareer.name} Core Principles`, importance: 'Critical', level: 'Intermediate', timeToLearn: '4 weeks' }],
        platforms: ['Coursera Specializations', 'Official Documentation & Specs', 'freeCodeCamp / Khan Academy']
      },
      {
        id: 'phase-2',
        phase: 'Phase 2: Applied Domain Competency',
        duration: 'Weeks 5 – 10 (Approx. 60 Hours)',
        focus: 'Implement intermediate techniques, tooling, system architectures, and collaborative industry practices.',
        skills: phase2Skills.length > 0 ? phase2Skills : [{ name: 'System Implementation & Testing', importance: 'Important', level: 'Intermediate', timeToLearn: '6 weeks' }],
        platforms: ['Udemy Pro Bootcamps', 'GitHub Open Source Projects', 'Kaggle / Behance / Industry Case Studies']
      },
      {
        id: 'phase-3',
        phase: 'Phase 3: Portfolio & Production Mastery',
        duration: 'Weeks 11 – 16 (Approx. 60 Hours)',
        focus: 'Build end-to-end capstone deliverables, conduct mock technical interviews, and publish public proof-of-work.',
        skills: phase3Skills.length > 0 ? phase3Skills : [{ name: 'End-to-End Capstone Project', importance: 'Important', level: 'Advanced', timeToLearn: '6 weeks' }],
        platforms: ['Portfolio Deployment', 'Technical Mock Interviews', 'Peer Code & Design Reviews']
      }
    ];

    const learningPath = [...criticalGaps, ...importantGaps, ...niceToHaveGaps];
    const totalWeeks = Math.max(8, learningPath.length * 3);

    setAnalysis({
      readinessScore,
      baseReadinessScore: readinessScore,
      matchingSkills,
      missingSkills,
      skillsToImprove,
      criticalGaps,
      importantGaps,
      learningPath,
      milestones,
      totalWeeks,
      totalMonths: Math.ceil(totalWeeks / 4)
    });

    setStep(3);
  };

  // Toggle milestone completion to dynamically update user's readiness score
  const handleToggleMilestone = (milestoneId) => {
    let updated;
    if (completedMilestones.includes(milestoneId)) {
      updated = completedMilestones.filter(id => id !== milestoneId);
    } else {
      updated = [...completedMilestones, milestoneId];
    }
    setCompletedMilestones(updated);

    if (selectedCareer) {
      try {
        localStorage.setItem(`cognitrail_skills_progress_${selectedCareer.name}`, JSON.stringify({ completedMilestones: updated }));
      } catch (e) {
        console.warn('Could not save progress', e);
      }
    }

    if (analysis) {
      // Calculate dynamic boost based on completed milestones
      const boost = updated.length * 12;
      const newScore = Math.min(100, (analysis.baseReadinessScore || analysis.readinessScore) + boost);
      setAnalysis(prev => ({ ...prev, readinessScore: newScore }));
    }
  };

  // Export Complete Learning Report (.txt)
  const handleExportPlan = () => {
    if (!selectedCareer || !analysis) return;

    const content = `
================================================================================
          COGNITRAIL AI SKILLS GAP & CAREER READINESS REPORT
================================================================================
Generated for: ${selectedCareer.name}
Domain: ${selectedCareer.domain}
Overall Career Readiness Score: ${analysis.readinessScore}%
Estimated Preparation Timeline: ${analysis.totalWeeks} Weeks (~${analysis.totalMonths} Months)
Target Annual Package: ${selectedCareer.salary}
Target Education: ${selectedCareer.education}

--------------------------------------------------------------------------------
1. SKILLS CURRENTLY ACQUIRED (${analysis.matchingSkills.length})
--------------------------------------------------------------------------------
${analysis.matchingSkills.length > 0 
  ? analysis.matchingSkills.map((s, i) => `  [✓] ${i + 1}. ${s} (Proficiency: ${skillLevels[s] || 'Intermediate'})`).join('\n')
  : '  No benchmark skills acquired yet.'}

--------------------------------------------------------------------------------
2. SKILLS REQUIRING MASTERY (${analysis.learningPath.length})
--------------------------------------------------------------------------------
${analysis.learningPath.map((skill, i) => `
  [ ] ${i + 1}. ${skill.name}
      Priority: ${skill.importance} Priority
      Target Level: ${skill.level}
      Category: ${skill.category}
      Estimated Time: ${skill.timeToLearn}
`).join('')}

--------------------------------------------------------------------------------
3. STEP-BY-STEP LEARNING ROADMAP & MILESTONES
--------------------------------------------------------------------------------
${analysis.milestones.map((m, idx) => `
PHASE ${idx + 1}: ${m.phase}
Timeline: ${m.duration}
Core Focus: ${m.focus}
Key Skills to Cover: ${m.skills.map(s => s.name).join(', ')}
Recommended Platforms: ${m.platforms.join(' | ')}
`).join('\n')}

================================================================================
Empowering Next-Gen Students • Cognitrail Career Intelligence System
================================================================================
`.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCareer.name.replace(/\s+/g, '_')}_Skills_Gap_Roadmap.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleStartLearning = (skillName) => {
    alert(`🎓 Curated Learning Recommendations for ${skillName}:\n\n• Top Online Courses: Coursera, edX, Udemy\n• Practical Repositories: GitHub Open-Source Projects\n• Interactive Challenges: LeetCode / Kaggle / Behance\n• Documentations & Tutorials: Official Specs & YouTube Masterclasses`);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Skills Gap Analyzer"
      className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#09090b]' : 'bg-zinc-50'}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-2 border ${
              darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-200' : 'bg-zinc-200 border-zinc-300 text-black'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              AI Skills Diagnostic & Readiness Engine
            </div>
            <h2 className={`text-2xl sm:text-3xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>
              Skills Gap Analyzer 🎯
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2.5 rounded-xl border btn-interactive hover-lift cursor-pointer ${
              darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white' : 'bg-white border-zinc-200 text-zinc-700 hover:text-black'
            }`}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Stepper Indicator */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold ${
              step >= 1
                ? darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                : darkMode ? 'bg-zinc-900 text-zinc-500 border-zinc-800' : 'bg-zinc-100 text-zinc-400 border-zinc-200'
            }`}>
              <Target className="w-3.5 h-3.5" />
              <span>1. Choose Career</span>
            </div>

            <div className={`w-6 sm:w-10 h-0.5 ${step >= 2 ? (darkMode ? 'bg-white' : 'bg-black') : (darkMode ? 'bg-zinc-800' : 'bg-zinc-300')}`}></div>

            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold ${
              step >= 2
                ? darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                : darkMode ? 'bg-zinc-900 text-zinc-500 border-zinc-800' : 'bg-zinc-100 text-zinc-400 border-zinc-200'
            }`}>
              <Brain className="w-3.5 h-3.5" />
              <span>2. Check Your Skills</span>
            </div>

            <div className={`w-6 sm:w-10 h-0.5 ${step >= 3 ? (darkMode ? 'bg-white' : 'bg-black') : (darkMode ? 'bg-zinc-800' : 'bg-zinc-300')}`}></div>

            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold ${
              step >= 3
                ? darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                : darkMode ? 'bg-zinc-900 text-zinc-500 border-zinc-800' : 'bg-zinc-100 text-zinc-400 border-zinc-200'
            }`}>
              <BarChart3 className="w-3.5 h-3.5" />
              <span>3. Action Roadmap</span>
            </div>
          </div>
        </div>

        {/* ================= STEP 1: CAREER SELECTION ================= */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-black'} mb-2`}>
                Select Your Target Career
              </h3>
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} max-w-xl mx-auto mb-6`}>
                Pick from {allCareers.length}+ curated career streams to analyze skill prerequisites and calculate your exact career readiness score.
              </p>

              {/* Search & Domain Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto">
                <div className="flex-1 relative">
                  <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                  <input
                    type="text"
                    placeholder="Search by career or required skills (e.g. AI, Surgeon, Cloud, Finance)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm outline-none transition-colors ${
                      darkMode
                        ? 'bg-[#18181b] border-zinc-700 text-white placeholder-zinc-500 focus:border-white'
                        : 'bg-white border-zinc-300 text-black placeholder-zinc-400 focus:border-black'
                    }`}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className={`px-4 py-3 rounded-2xl border text-xs font-bold outline-none cursor-pointer ${
                    darkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-white border-zinc-300 text-black'
                  }`}
                >
                  <option value="all">All Domains ({allCareers.length}+)</option>
                  {domains.map(domain => (
                    <option key={domain.key} value={domain.key}>
                      {domain.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Careers Grid */}
            {filteredCareers.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCareers.map((career) => (
                  <button
                    key={career.id}
                    onClick={() => handleCareerSelect(career)}
                    className={`p-6 rounded-3xl text-left border transition-all hover-lift btn-interactive cursor-pointer flex flex-col justify-between ${
                      darkMode
                        ? 'bg-[#121215] border-zinc-800 hover:border-zinc-600 shadow-lg'
                        : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="text-3xl">{career.icon}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                        }`}>
                          {career.domain.split(' ')[0]}
                        </span>
                      </div>
                      <h4 className={`text-lg font-black mb-1.5 ${darkMode ? 'text-white' : 'text-black'}`}>
                        {career.name}
                      </h4>
                      <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {career.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-bold">
                      <span className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>{career.salary}</span>
                      <span className={`flex items-center gap-1 ${darkMode ? 'text-white' : 'text-black'}`}>
                        <span>{career.requiredSkills.length} Skills</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className={`p-8 rounded-3xl border text-center my-6 ${darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200'}`}>
                <p className="text-sm font-semibold text-zinc-400 mb-2">No careers found matching "{searchQuery}"</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedDomain('all'); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border btn-interactive ${
                    darkMode ? 'bg-white text-black' : 'bg-black text-white'
                  }`}
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 2: SKILL CHECKLIST ================= */}
        {step === 2 && selectedCareer && (
          <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-black'} mb-1`}>
                  Check Your Acquired Skills for {selectedCareer.name}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Select the skills you already possess and choose your estimated proficiency level.
                </p>
              </div>
              <button
                onClick={() => setStep(1)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border btn-interactive cursor-pointer ${
                  darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white' : 'bg-zinc-100 border-zinc-300 text-black hover:bg-zinc-200'
                }`}
              >
                ← Change Career
              </button>
            </div>

            {/* Target Career Summary Card */}
            <div className={`p-5 rounded-2xl border mb-6 flex items-center justify-between ${
              darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-3.5">
                <span className="text-3xl">{selectedCareer.icon}</span>
                <div>
                  <h4 className={`text-base font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                    {selectedCareer.name}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Evaluating across {selectedCareer.requiredSkills.length} core industry competencies
                  </p>
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-black text-white border-black'
              }`}>
                {currentSkills.length} of {selectedCareer.requiredSkills.length} Selected
              </span>
            </div>

            {/* Skills Checklist Grid */}
            <div className="grid sm:grid-cols-2 gap-3.5 mb-8">
              {selectedCareer.requiredSkills.map((skill) => {
                const isChecked = currentSkills.includes(skill.name);
                return (
                  <div
                    key={skill.name}
                    className={`p-4 rounded-2xl border transition-all ${
                      isChecked
                        ? darkMode ? 'bg-zinc-800 border-white text-white shadow-md' : 'bg-zinc-100 border-black text-black ring-1 ring-black shadow-sm'
                        : darkMode ? 'bg-[#121215] border-zinc-800 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => handleSkillToggle(skill.name)}
                        className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer ${
                          isChecked
                            ? darkMode ? 'bg-white border-white text-black' : 'bg-black border-black text-white'
                            : 'border-zinc-400/50 hover:border-zinc-400'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-black text-sm">{skill.name}</span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                            skill.importance === 'Critical'
                              ? 'bg-zinc-900 border-zinc-700 text-white'
                              : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                          }`}>
                            {skill.importance} Priority
                          </span>
                        </div>

                        <div className="text-[11px] text-zinc-400 mb-2">
                          <span>Target: {skill.level}</span> • <span>{skill.category}</span> • <span>Est: {skill.timeToLearn.split('(')[0].trim()}</span>
                        </div>

                        {isChecked && (
                          <div className="mt-2 pt-2 border-t border-zinc-700/50">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                              Your Current Proficiency:
                            </label>
                            <select
                              value={skillLevels[skill.name] || 'Intermediate'}
                              onChange={(e) => setSkillLevels({ ...skillLevels, [skill.name]: e.target.value })}
                              className={`w-full px-3 py-1.5 rounded-xl text-xs font-bold border outline-none ${
                                darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-black'
                              }`}
                            >
                              <option value="Beginner">Beginner (Foundational)</option>
                              <option value="Intermediate">Intermediate (Competent)</option>
                              <option value="Advanced">Advanced (Fluent / Industry-ready)</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-semibold text-zinc-400">
                {currentSkills.length === 0 ? 'Select at least one skill or continue to calculate complete 0-to-1 roadmap' : `${currentSkills.length} skills selected`}
              </span>

              <button
                onClick={generateAnalysis}
                className={`px-8 py-3.5 rounded-2xl font-black text-sm btn-interactive hover-lift shadow-xl flex items-center gap-2 cursor-pointer ${
                  darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Calculate Readiness Score & Milestones</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: ACTION ROADMAP & PROGRESS ================= */}
        {step === 3 && analysis && selectedCareer && (
          <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-black'} mb-1`}>
                  Actionable Career Readiness Roadmap
                </h3>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Target Career: <span className="font-bold text-black dark:text-white">{selectedCareer.name}</span> • Check milestones to update your progress.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportPlan}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs border btn-interactive hover-lift flex items-center gap-1.5 cursor-pointer ${
                    darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-white hover:text-black' : 'bg-white border-zinc-300 text-black hover:bg-black hover:text-white shadow-sm'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Full Plan (.txt)</span>
                </button>
                <button
                  onClick={() => setStep(1)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs border btn-interactive cursor-pointer ${
                    darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white' : 'bg-zinc-100 border-zinc-300 text-black hover:bg-zinc-200'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Change Career</span>
                </button>
              </div>
            </div>

            {/* Live Readiness Score Dashboard */}
            <div className={`p-6 sm:p-8 rounded-3xl border mb-8 ${
              darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-xl'
            }`}>
              <div className="grid md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 text-center md:text-left">
                  <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-400 mb-1">
                    LIVE ATS & SKILLS READINESS
                  </div>
                  <div className={`text-5xl sm:text-6xl font-black mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                    {analysis.readinessScore}%
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {analysis.readinessScore >= 80 
                      ? 'Outstanding readiness! You possess majority of the critical prerequisites.' 
                      : analysis.readinessScore >= 50 
                      ? 'Solid foundation! Complete the remaining core milestones to reach job-ready status.' 
                      : 'Initial stage. Follow the 3-phase roadmap below to systematically acquire benchmark skills.'}
                  </p>
                </div>

                <div className="md:col-span-7 grid grid-cols-3 gap-3">
                  <div className={`p-4 rounded-2xl border text-center ${
                    darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    <div className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                      {analysis.matchingSkills.length}
                    </div>
                    <div className="text-[11px] font-bold text-zinc-400 mt-0.5">Skills Acquired</div>
                  </div>

                  <div className={`p-4 rounded-2xl border text-center ${
                    darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    <div className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                      {analysis.learningPath.length}
                    </div>
                    <div className="text-[11px] font-bold text-zinc-400 mt-0.5">Skills to Master</div>
                  </div>

                  <div className={`p-4 rounded-2xl border text-center ${
                    darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    <div className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                      ~{analysis.totalMonths} mos
                    </div>
                    <div className="text-[11px] font-bold text-zinc-400 mt-0.5">Est. Timeline</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3-Phase Structured Milestones */}
            <div className="space-y-6 mb-8">
              <h4 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-black'} flex items-center gap-2`}>
                <Book className="w-5 h-5 text-zinc-400" />
                <span>3-Phase Progressive Milestones (Check to update progress)</span>
              </h4>

              {analysis.milestones.map((milestone, idx) => {
                const isMilestoneDone = completedMilestones.includes(milestone.id);
                return (
                  <div
                    key={milestone.id}
                    className={`p-6 sm:p-7 rounded-3xl border transition-all ${
                      isMilestoneDone
                        ? darkMode ? 'bg-zinc-900/90 border-white' : 'bg-zinc-100 border-black ring-1 ring-black'
                        : darkMode ? 'bg-[#121215] border-zinc-800 hover:border-zinc-700' : 'bg-white border-zinc-200 shadow-md hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-800/80">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleMilestone(milestone.id)}
                          className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all cursor-pointer ${
                            isMilestoneDone
                              ? darkMode ? 'bg-white border-white text-black' : 'bg-black border-black text-white'
                              : 'border-zinc-400/60 hover:border-zinc-400'
                          }`}
                        >
                          {isMilestoneDone && <CheckCircle2 className="w-4 h-4" />}
                        </button>
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                            STEP 0{idx + 1} • {milestone.duration}
                          </span>
                          <h5 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                            {milestone.phase}
                          </h5>
                        </div>
                      </div>

                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        isMilestoneDone
                          ? 'bg-zinc-900 border-zinc-700 text-[#0265A6]'
                          : darkMode ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-300 text-zinc-700'
                      }`}>
                        {isMilestoneDone ? '✓ Completed Milestone (+12% Boost)' : 'In Progress'}
                      </span>
                    </div>

                    <p className={`text-xs sm:text-sm mb-4 leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      {milestone.focus}
                    </p>

                    {/* Milestone Skills & Learning Actions */}
                    <div className="grid sm:grid-cols-2 gap-3 mb-4">
                      {milestone.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className={`p-3.5 rounded-2xl border flex items-center justify-between gap-2 ${
                            darkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-black text-black dark:text-white">{skill.name}</div>
                            <div className="text-[10px] text-zinc-400 mt-0.5">
                              {skill.timeToLearn} • {skill.importance}
                            </div>
                          </div>
                          <button
                            onClick={() => handleStartLearning(skill.name)}
                            className={`p-1.5 rounded-lg border text-xs font-bold btn-interactive cursor-pointer ${
                              darkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-white hover:text-black' : 'bg-white border-zinc-300 text-zinc-800 hover:bg-black hover:text-white'
                            }`}
                            title="Explore learning resources"
                          >
                            <Play className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1.5">
                      <span>Curated Platforms:</span>
                      <span className="text-black dark:text-zinc-200">{milestone.platforms.join(' • ')}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={handleExportPlan}
                className={`flex-1 py-4 rounded-2xl font-bold text-sm btn-interactive hover-lift flex items-center justify-center gap-2 border cursor-pointer ${
                  darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800' : 'bg-white border-zinc-300 text-black hover:bg-zinc-100 shadow-md'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Export Full Plan (.txt)</span>
              </button>

              <button
                onClick={onClose}
                className={`flex-1 py-4 rounded-2xl font-bold text-sm btn-interactive hover-lift flex items-center justify-center gap-2 shadow-xl cursor-pointer ${
                  darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Done & Return to Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsGapAnalyzer;