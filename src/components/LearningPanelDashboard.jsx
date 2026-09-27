import React, { useState, useEffect, useMemo } from 'react';
import {
  Target, CheckCircle2, Circle, Trophy, BookOpen, GraduationCap,
  DollarSign, Calendar, TrendingUp, Sparkles, ExternalLink, Download,
  Printer, RefreshCw, X, ChevronRight, Award, Bot, Brain, Map, UserCheck,
  Search, ArrowRight, BarChart2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { CAREER_DATABASE } from '../data/careerDatabase';

// Default Fallback Target Career if user hasn't chosen one yet
const DEFAULT_CAREER = {
  name: 'AI & Machine Learning Engineer',
  domainName: 'Engineering & AI',
  description: 'Design, develop, and deploy intelligent algorithms, neural networks, and generative AI models to solve complex real-world challenges.',
  salaryRange: '₹12 - 35 LPA (Junior) | ₹35 - 80 LPA (Senior)',
  education: 'B.Tech / B.E. in Computer Science, Data Science, or AI & ML (4 Years)',
  jobOutlook: 'Extremely High Demand (2026-2030)',
  skills: [
    'Python & C++',
    'PyTorch & TensorFlow',
    'Linear Algebra & Calculus',
    'Data Structures & Algorithms',
    'Machine Learning Algorithms',
    'Natural Language Processing (NLP)',
    'Computer Vision',
    'Model Deployment & MLOps',
    'Git & Version Control',
    'Problem Solving & Logic'
  ],
  entranceExams: ['JEE Main', 'JEE Advanced', 'GATE', 'BITSAT'],
  topColleges: [
    { name: 'IIT Bombay', state: 'Maharashtra', rating: 4.9, NIRF: 3 },
    { name: 'IIT Delhi', state: 'Delhi', rating: 4.9, NIRF: 2 },
    { name: 'IIIT Hyderabad', state: 'Telangana', rating: 4.8, NIRF: 12 },
    { name: 'BITS Pilani', state: 'Rajasthan', rating: 4.7, NIRF: 25 }
  ],
  milestones: [
    {
      stage: 'Phase 1: High School & Foundational Prep',
      duration: 'Class 11-12 / Pre-Degree',
      desc: 'Master Mathematics (Calculus, Statistics) and Physics. Learn core programming in Python.',
      tasks: [
        'Complete High School Mathematics with 85%+ score',
        'Learn basic Python syntax, loops, and functions',
        'Prepare for Engineering Entrance Exams (JEE / State CETs)'
      ]
    },
    {
      stage: 'Phase 2: Undergraduate Degree Track',
      duration: 'Years 1 - 2 of College',
      desc: 'Enrol in B.Tech CS/AI or B.Sc Data Science. Build strong Data Structures & Linear Algebra base.',
      tasks: [
        'Master Data Structures and Object-Oriented Programming',
        'Study Matrix Algebra, Probability Theory, and Multivariate Calculus',
        'Build 2 beginner CLI projects in Python'
      ]
    },
    {
      stage: 'Phase 3: Core AI Skill Mastery & Certifications',
      duration: 'Year 3 of College',
      desc: 'Deep-dive into PyTorch, Scikit-learn, Neural Networks, and Hugging Face Transformers.',
      tasks: [
        'Complete Harvard CS50 or Andrew Ng Machine Learning Course',
        'Train & deploy supervised machine learning models',
        'Participate in Kaggle competitions & open source contributions'
      ]
    },
    {
      stage: 'Phase 4: Real-World Portfolio & Internships',
      duration: 'Final Year of College',
      desc: 'Develop end-to-end production AI applications (RAG chatbots, CV models) and apply for internships.',
      tasks: [
        'Build and host 2 full-stack AI web applications',
        'Complete a 3-6 month AI/Software engineering internship',
        'Optimize resume for ATS keyword alignment'
      ]
    },
    {
      stage: 'Phase 5: Job Placement & Continuous Growth',
      duration: 'Post-Graduation',
      desc: 'Secure AI Engineer or ML Specialist role; advance to Senior AI Architect.',
      tasks: [
        'Participate in campus placements / off-campus tech drives',
        'Conduct AI Mock Technical Interviews',
        'Negotiate competitive salary package & onboarding'
      ]
    }
  ]
};

// Recommended Free Courses Repository
const RECOMMENDED_FREE_COURSES = [
  {
    title: 'CS50x: Introduction to Computer Science',
    provider: 'Harvard University',
    platform: 'edX',
    url: 'https://www.edx.org/course/introduction-computer-science-harvardx-cs50x',
    level: 'Beginner',
    domain: 'Engineering & AI'
  },
  {
    title: 'Google Data Analytics Professional Certificate',
    provider: 'Google',
    platform: 'Coursera (Audit Free)',
    url: 'https://www.coursera.org/professional-certificates/google-data-analytics',
    level: 'Beginner',
    domain: 'Engineering & AI'
  },
  {
    title: 'NPTEL Artificial Intelligence & Deep Learning',
    provider: 'IIT Madras (NPTEL)',
    platform: 'SWAYAM Govt Portal',
    url: 'https://nptel.ac.in/courses/106106224',
    level: 'Intermediate',
    domain: 'Engineering & AI'
  },
  {
    title: 'Kaggle Machine Learning & Micro-Courses',
    provider: 'Kaggle / Google',
    platform: 'Kaggle Learn',
    url: 'https://www.kaggle.com/learn',
    level: 'All Levels',
    domain: 'Engineering & AI'
  },
  {
    title: 'ISRO Geospatial & Space Technology Course',
    provider: 'ISRO IURS',
    platform: 'Government of India',
    url: 'https://isro.gov.in',
    level: 'Intermediate',
    domain: 'Science & Medical'
  },
  {
    title: 'Financial Markets & Investment Banking',
    provider: 'Yale University',
    platform: 'Coursera (Audit Free)',
    url: 'https://www.coursera.org/learn/financial-markets-global',
    level: 'Beginner',
    domain: 'Commerce & Finance'
  }
];

export default function LearningPanelDashboard({
  onClose,
  darkMode,
  chosenCareer,
  onSelectCareer,
  onOpenExams,
  onOpenPredictor,
  onOpenMockInterview,
  onOpenMentors,
  onOpenAdvisor,
  onOpenSkills
}) {
  const { t } = useLanguage();
  const { user } = useAuth();

  const userPrefix = user?.id ? `user_${user.id}_` : '';
  const goalStorageKey = `cognitrail_${userPrefix}active_target_career`;

  // Active target career state
  const [activeGoal, setActiveGoal] = useState(() => {
    if (chosenCareer && chosenCareer.name) return chosenCareer;
    if (user && user.targetCareer && user.targetCareer.name) return user.targetCareer;
    try {
      const stored = localStorage.getItem(goalStorageKey);
      return stored ? JSON.parse(stored) : DEFAULT_CAREER;
    } catch {
      return DEFAULT_CAREER;
    }
  });

  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [goalSearch, setGoalSearch] = useState('');
  const [activeTab, setActiveTab] = useState('pathway'); // 'pathway', 'skills', 'academic', 'courses', 'interview'

  // Persist activeGoal to localStorage for this specific user
  useEffect(() => {
    try {
      if (activeGoal && activeGoal.name) {
        localStorage.setItem(goalStorageKey, JSON.stringify(activeGoal));
      }
    } catch (e) {
      console.warn('Could not store active career goal', e);
    }
  }, [activeGoal, goalStorageKey]);

  // Skill checklist state persisted per career & user
  const storageKey = `cognitrail_${userPrefix}skills_progress_${(activeGoal.name || 'default').replace(/\s+/g, '_')}`;
  
  const [completedSkills, setCompletedSkills] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Milestone tasks completion state per career & user
  const milestoneStorageKey = `cognitrail_${userPrefix}milestones_progress_${(activeGoal.name || 'default').replace(/\s+/g, '_')}`;
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const stored = localStorage.getItem(milestoneStorageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save skill checklist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(completedSkills));
    } catch (e) {
      console.warn('Could not save skills progress', e);
    }
  }, [completedSkills, storageKey]);

  // Save milestone checklist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(milestoneStorageKey, JSON.stringify(completedTasks));
    } catch (e) {
      console.warn('Could not save milestone progress', e);
    }
  }, [completedTasks, milestoneStorageKey]);

  // Toggle skill check
  const toggleSkill = (skillName) => {
    if (completedSkills.includes(skillName)) {
      setCompletedSkills(completedSkills.filter(s => s !== skillName));
    } else {
      setCompletedSkills([...completedSkills, skillName]);
    }
  };

  // Toggle task check
  const toggleTask = (taskDesc) => {
    if (completedTasks.includes(taskDesc)) {
      setCompletedTasks(completedTasks.filter(t => t !== taskDesc));
    } else {
      setCompletedTasks([...completedTasks, taskDesc]);
    }
  };

  // Calculate skills list for active goal
  const skillItems = useMemo(() => {
    if (activeGoal.skills && Array.isArray(activeGoal.skills) && activeGoal.skills.length > 0) {
      return activeGoal.skills;
    }
    return DEFAULT_CAREER.skills;
  }, [activeGoal]);

  // Calculate milestones for active goal
  const milestoneList = useMemo(() => {
    if (activeGoal.milestones && Array.isArray(activeGoal.milestones) && activeGoal.milestones.length > 0) {
      return activeGoal.milestones;
    }
    // Generate derived milestones if not explicitly set
    const cName = activeGoal.name || 'Specialist';
    return [
      {
        stage: 'Phase 1: Academic Prerequisites',
        duration: 'Class 11-12 / Foundation',
        desc: `Build strong core fundamentals in relevant subjects for ${cName}.`,
        tasks: [
          'Complete prerequisite school coursework with high academic Standing',
          'Identify key qualifying entrance examinations',
          'Explore core concepts through introductory online videos'
        ]
      },
      {
        stage: 'Phase 2: Degree & University Track',
        duration: 'Undergraduate Degree (3-4 Years)',
        desc: `Enroll in qualifying degree: ${activeGoal.education || 'Bachelor Degree'}`,
        tasks: [
          'Enroll in accredited college program',
          'Maintain strong cumulative GPA / Percentage',
          'Join campus technical societies & student clubs'
        ]
      },
      {
        stage: 'Phase 3: Core Competency & Skill Building',
        duration: 'Intermediate Studies',
        desc: 'Master key tools, frameworks, and technical skills required in the industry.',
        tasks: skillItems.slice(0, 4).map(s => `Master fundamental competency in ${s}`)
      },
      {
        stage: 'Phase 4: Practical Portfolio & Internships',
        duration: 'Pre-Final & Final Year',
        desc: 'Construct 2-3 real-world portfolio projects and complete an industry internship.',
        tasks: [
          `Build end-to-end ${cName} portfolio project`,
          'Complete industry internship or apprenticeship',
          'Optimize ATS resume alignment and LinkedIn profile'
        ]
      },
      {
        stage: 'Phase 5: Career Launch & Senior Progression',
        duration: 'Professional Onboarding',
        desc: `Clear placement interviews and step into a high-growth ${cName} role.`,
        tasks: [
          'Practice mock interviews & technical problem-solving',
          'Apply to top recruiters and secure job offer',
          'Continuous skill upgrade for senior leadership progression'
        ]
      }
    ];
  }, [activeGoal, skillItems]);

  // Calculate total milestone tasks
  const allMilestoneTasks = useMemo(() => {
    const list = [];
    milestoneList.forEach(m => {
      if (m.tasks && Array.isArray(m.tasks)) {
        m.tasks.forEach(t => list.push(t));
      }
    });
    return list;
  }, [milestoneList]);

  // Overall Completion Percentage Calculation
  const progressPercent = useMemo(() => {
    const totalItems = skillItems.length + allMilestoneTasks.length;
    if (totalItems === 0) return 0;
    
    const checkedSkillsCount = skillItems.filter(s => completedSkills.includes(s)).length;
    const checkedTasksCount = allMilestoneTasks.filter(t => completedTasks.includes(t)).length;
    
    return Math.round(((checkedSkillsCount + checkedTasksCount) / totalItems) * 100);
  }, [skillItems, completedSkills, allMilestoneTasks, completedTasks]);

  // Get all careers from database for Goal Switcher Modal
  const allDatabaseCareers = useMemo(() => {
    const list = [];
    if (!CAREER_DATABASE) return list;
    Object.values(CAREER_DATABASE).forEach(domain => {
      if (domain.subFields && Array.isArray(domain.subFields)) {
        domain.subFields.forEach(sub => {
          if (sub.careers && Array.isArray(sub.careers)) {
            sub.careers.forEach(c => {
              if (c && c.name) {
                list.push({ ...c, domainName: domain.name });
              }
            });
          }
        });
      }
    });
    return list;
  }, []);

  const filteredGoalOptions = useMemo(() => {
    if (!goalSearch.trim()) return allDatabaseCareers.slice(0, 24);
    const q = goalSearch.toLowerCase().trim();
    return allDatabaseCareers.filter(c =>
      c.name.toLowerCase().includes(q) ||
      (c.domainName && c.domainName.toLowerCase().includes(q)) ||
      (c.skills && c.skills.some(s => s.toLowerCase().includes(q)))
    ).slice(0, 30);
  }, [allDatabaseCareers, goalSearch]);

  const handleSelectNewGoal = (c) => {
    setActiveGoal(c);
    try {
      localStorage.setItem('cognitrail_active_target_career', JSON.stringify(c));
    } catch (e) {
      console.warn('Could not save goal', e);
    }
    if (onSelectCareer) onSelectCareer(c);
    setShowGoalPicker(false);
  };

  // Export Learning Plan to TXT
  const handleExportPlan = () => {
    const lines = [
      `=============================================================`,
      `       COGNITRAIL PERSONALIZED LEARNING & CAREER ROADMAP      `,
      `=============================================================`,
      `Target Career Goal : ${activeGoal.name}`,
      `Industry Domain    : ${activeGoal.domainName || 'Specialized Track'}`,
      `Overall Readiness  : ${progressPercent}% Completed`,
      `Expected Salary    : ${activeGoal.salaryRange || 'Competitive'}`,
      `Degree / Academic  : ${activeGoal.education || 'Bachelor Degree'}`,
      `Job Outlook        : ${activeGoal.jobOutlook || 'High Demand'}`,
      `Date Generated     : ${new Date().toLocaleDateString()}`,
      `-------------------------------------------------------------`,
      ``,
      `1. STAGE-BY-STAGE MASTERY MILESTONES:`,
      ...milestoneList.map((m, idx) => {
        return `   [Stage ${idx + 1}] ${m.stage} (${m.duration})\n   Summary: ${m.desc}\n   Tasks:\n` +
          m.tasks.map(t => `     - [${completedTasks.includes(t) ? 'X' : ' '}] ${t}`).join('\n');
      }),
      ``,
      `2. REQUIRED INDUSTRY COMPETENCIES & SKILLS:`,
      ...skillItems.map(s => `   - [${completedSkills.includes(s) ? 'X' : ' '}] ${s}`),
      ``,
      `3. ENTRANCE EXAMINATIONS & QUALIFICATIONS:`,
      ...(activeGoal.entranceExams || ['Standard Entrance Tests']).map(e => `   - ${e}`),
      ``,
      `=============================================================`,
      `Generated by Cognitrail AI Career Pathfinder • https://cognitrail.ai`,
      `=============================================================`
    ];

    const element = document.createElement("a");
    const file = new Blob([lines.join("\n")], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Cognitrail_Learning_Plan_${(activeGoal.name || 'Goal').replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className={`relative w-full max-w-5xl rounded-3xl border shadow-2xl my-auto overflow-hidden ${
        darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
      } max-h-[94vh] flex flex-col`}>

        {/* Top Header Banner */}
        <div className={`p-4 sm:p-6 border-b flex-shrink-0 ${
          darkMode ? 'bg-[#0A1E3F]/90 border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF]'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Target Career Info */}
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold bg-gradient-to-tr from-[#003B73] via-[#0265A6] to-[#6096BA] text-white shadow-md shadow-[#0265A6]/30 flex-shrink-0">
                🎯
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {user && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-[#0265A6] text-white">
                      👤 {user.name}
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-[#003B73] text-[#EBF3FA]">
                    {t('activeGoal', 'Active Career Path')}
                  </span>
                  <span className={`text-[11px] font-bold ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`}>
                    {activeGoal.domainName || 'Career Field'}
                  </span>
                </div>
                
                <h2 className={`text-xl sm:text-2xl font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                  {activeGoal.name}
                </h2>
                
                <p className={`text-xs mt-1 line-clamp-1 max-w-xl ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {activeGoal.description}
                </p>
              </div>
            </div>

            {/* Switch Goal & Close Buttons */}
            <div className="flex items-center gap-2 self-end md:self-auto flex-shrink-0">
              <button
                onClick={() => setShowGoalPicker(true)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border btn-interactive flex items-center gap-1.5 ${
                  darkMode ? 'bg-[#071326] border-[#003B73] text-[#6096BA] hover:text-white' : 'bg-white border-[#BACDDF] text-[#0265A6] hover:bg-[#0265A6] hover:text-white'
                }`}
                title="Change or select another career goal"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#0265A6]" />
                <span>{t('switchGoal', 'Switch Goal')}</span>
              </button>

              <button
                onClick={onClose}
                className={`p-2 rounded-xl border transition-colors ${
                  darkMode ? 'bg-[#071326] border-[#003B73] text-zinc-300 hover:text-white' : 'bg-white border-[#BACDDF] text-zinc-600 hover:text-black'
                }`}
                aria-label="Close Dashboard"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Overall Learning & Readiness Progress Bar */}
          <div className="mt-5 pt-4 border-t border-[#003B73]/40">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-[#0265A6]" />
                <span>{t('overallProgress', 'Overall Career Readiness & Mastery')}</span>
              </span>
              <span className={`font-mono text-sm font-black ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`}>
                {progressPercent}% {t('completed', 'Completed')}
              </span>
            </div>

            <div className={`w-full h-3 rounded-full overflow-hidden p-0.5 border ${
              darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-white border-[#BACDDF]'
            }`}>
              <div
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#6096BA]"
                style={{ width: `${Math.max(5, progressPercent)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Highlights Metrics Row */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 p-4 border-b flex-shrink-0 ${
          darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA]/50 border-[#BACDDF]'
        }`}>
          <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-[#0A1E3F] border-[#003B73]' : 'bg-white border-[#BACDDF]'}`}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-[#0265A6]" />
              <span>{t('salaryRange', 'Target Salary')}</span>
            </div>
            <div className="text-xs sm:text-sm font-black text-[#0265A6] truncate">
              {activeGoal.salaryRange ? activeGoal.salaryRange.split('|')[0] : '₹12 - 35 LPA'}
            </div>
          </div>

          <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-[#0A1E3F] border-[#003B73]' : 'bg-white border-[#BACDDF]'}`}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-[#0265A6]" />
              <span>{t('degreeReq', 'Degree Qualification')}</span>
            </div>
            <div className={`text-xs sm:text-sm font-bold truncate ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
              {activeGoal.education ? activeGoal.education.split('(')[0] : 'Bachelor Degree'}
            </div>
          </div>

          <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-[#0A1E3F] border-[#003B73]' : 'bg-white border-[#BACDDF]'}`}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#0265A6]" />
              <span>{t('marketDemand', '2026-2030 Growth')}</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-emerald-500 truncate">
              {activeGoal.jobOutlook || 'High Growth Demand'}
            </div>
          </div>

          <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-[#0A1E3F] border-[#003B73]' : 'bg-white border-[#BACDDF]'}`}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#0265A6]" />
              <span>{t('keyExams', 'Entrance Exams')}</span>
            </div>
            <div className={`text-xs sm:text-sm font-bold truncate ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
              {activeGoal.entranceExams ? activeGoal.entranceExams.slice(0, 2).join(', ') : 'Entrance Tests'}
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className={`px-4 pt-3 border-b overflow-x-auto no-scrollbar flex-shrink-0 ${
          darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-white border-[#BACDDF]'
        }`}>
          <div className="flex items-center gap-2 pb-2 min-w-max">
            {[
              { id: 'pathway', label: '🗺️ Stage-by-Stage Milestones' },
              { id: 'skills', label: '🎯 Skills & Competency Matrix' },
              { id: 'academic', label: '🎓 Degree, Exams & Colleges' },
              { id: 'courses', label: '📚 Free Certified Courses' },
              { id: 'interview', label: '💼 Interview Prep & Next Steps' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all btn-interactive ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-md scale-105'
                    : darkMode
                      ? 'bg-[#0A1E3F] text-zinc-300 hover:text-white border border-[#003B73]'
                      : 'bg-[#EBF3FA] text-[#0265A6] hover:bg-[#0265A6] hover:text-white border border-[#BACDDF]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Body Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: STAGE-BY-STAGE MILESTONES */}
          {activeTab === 'pathway' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                    Full Mastery Pathway for {activeGoal.name}
                  </h3>
                  <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Follow these 5 sequential stages from high school preparation to senior lead onboarding:
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {milestoneList.map((m, idx) => {
                  const stageTasks = m.tasks || [];
                  const isStageComplete = stageTasks.length > 0 && stageTasks.every(t => completedTasks.includes(t));

                  return (
                    <div
                      key={m.stage || idx}
                      className={`p-5 rounded-2xl border transition-all ${
                        isStageComplete
                          ? darkMode ? 'bg-[#0A1E3F]/50 border-emerald-500/50' : 'bg-emerald-50/60 border-emerald-300'
                          : darkMode ? 'bg-[#0A1E3F] border-[#003B73]' : 'bg-white border-[#BACDDF] shadow-sm'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                            isStageComplete
                              ? 'bg-emerald-500 text-white'
                              : 'bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white'
                          }`}>
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className={`text-sm font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                              {m.stage}
                            </h4>
                            <span className={`text-[11px] font-semibold ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`}>
                              ⏳ {m.duration}
                            </span>
                          </div>
                        </div>

                        {isStageComplete && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 self-start sm:self-auto">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Stage Completed</span>
                          </span>
                        )}
                      </div>

                      <p className={`text-xs mb-4 leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        {m.desc}
                      </p>

                      {/* Actionable Checkbox Tasks */}
                      <div className="space-y-2">
                        <div className="text-[11px] font-bold uppercase tracking-wider opacity-70 mb-1">
                          Key Deliverables & Action Items:
                        </div>
                        {stageTasks.map((tItem) => {
                          const isDone = completedTasks.includes(tItem);
                          return (
                            <button
                              key={tItem}
                              onClick={() => toggleTask(tItem)}
                              className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left text-xs transition-all ${
                                isDone
                                  ? darkMode ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200 line-through' : 'bg-emerald-50 border-emerald-200 text-emerald-800 line-through'
                                  : darkMode ? 'bg-[#071326] border-[#003B73] text-zinc-200 hover:border-[#0265A6]' : 'bg-[#EBF3FA]/60 border-[#BACDDF] text-zinc-800 hover:border-[#0265A6]'
                              }`}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                              )}
                              <span className="font-semibold">{tItem}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: SKILLS & COMPETENCY MATRIX */}
          {activeTab === 'skills' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                    Required Skills Checklist for {activeGoal.name}
                  </h3>
                  <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Mark off competencies as you learn them to track your mastery progress:
                  </p>
                </div>
                {onOpenSkills && (
                  <button
                    onClick={onOpenSkills}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-sm flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Launch Skill Gap Analyzer</span>
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {skillItems.map((skill) => {
                  const isLearned = completedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border text-left text-xs font-bold transition-all ${
                        isLearned
                          ? darkMode ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200' : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                          : darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-white hover:border-[#0265A6]' : 'bg-white border-[#BACDDF] text-[#051C3E] hover:border-[#0265A6]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isLearned ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                        )}
                        <span className={isLearned ? 'line-through opacity-80' : ''}>{skill}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md ${
                        isLearned ? 'bg-emerald-500/20 text-emerald-400' : darkMode ? 'bg-[#071326] text-[#6096BA]' : 'bg-[#EBF3FA] text-[#0265A6]'
                      }`}>
                        {isLearned ? 'Mastered' : 'To Learn'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: DEGREE, EXAMS & COLLEGES */}
          {activeTab === 'academic' && (
            <div className="space-y-6 animate-fade-in">
              {/* Degree Overview */}
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-[#0A1E3F] border-[#003B73]' : 'bg-white border-[#BACDDF]'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-5 h-5 text-[#0265A6]" />
                  <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                    Degree Track: {activeGoal.education || 'Bachelor Degree (3-4 Years)'}
                  </h3>
                </div>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  To enter the {activeGoal.name} domain, enrolling in an accredited institution in Computer Science, Data Science, Engineering, or relevant Stream is highly recommended.
                </p>
              </div>

              {/* Entrance Exams Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className={`text-sm font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                    Required Entrance Examinations
                  </h4>
                  <div className="flex items-center gap-3">
                    {onOpenExams && (
                      <button
                        onClick={onOpenExams}
                        className="text-xs font-bold text-[#0265A6] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Exam Dates & Tracker</span>
                      </button>
                    )}
                    {onOpenPredictor && (
                      <button
                        onClick={onOpenPredictor}
                        className="text-xs font-bold text-[#0265A6] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <BarChart2 className="w-3.5 h-3.5" />
                        <span>Predict Cutoffs →</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {(activeGoal.entranceExams || ['JEE Main', 'CUET-UG', 'State CETs']).map((exam) => (
                    <div
                      key={exam}
                      className={`p-3.5 rounded-2xl border ${darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA]/70 border-[#BACDDF]'}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-[#0265A6]">{exam}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#003B73] text-white">
                          Required
                        </span>
                      </div>
                      <p className={`text-[11px] ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        Qualifying exam for tier-1 institute admissions & merit seats.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Recommended Colleges */}
              <div className="space-y-3">
                <h4 className={`text-sm font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                  Top Recommended Institutions for {activeGoal.name}
                </h4>

                <div className="grid sm:grid-cols-2 gap-3">
                  {(activeGoal.topColleges || DEFAULT_CAREER.topColleges).map((college, idx) => (
                    <div
                      key={college.name || idx}
                      className={`p-4 rounded-2xl border flex items-center justify-between ${
                        darkMode ? 'bg-[#0A1E3F] border-[#003B73]' : 'bg-white border-[#BACDDF] shadow-sm'
                      }`}
                    >
                      <div>
                        <h5 className={`text-xs font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                          {college.name}
                        </h5>
                        <p className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          📍 {college.state || 'India'} • NIRF Rank: #{college.NIRF || (idx + 1) * 3}
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white">
                        ⭐ {college.rating || '4.8'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FREE CERTIFIED COURSES */}
          {activeTab === 'courses' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                    Verified Free Certified Learning Directory
                  </h3>
                  <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    High-impact free courses from top universities to master {activeGoal.name} skills:
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {RECOMMENDED_FREE_COURSES.map((course) => (
                  <div
                    key={course.title}
                    className={`p-4 rounded-2xl border flex flex-col justify-between ${
                      darkMode ? 'bg-[#0A1E3F] border-[#003B73]' : 'bg-white border-[#BACDDF] shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#003B73] text-white">
                          {course.provider}
                        </span>
                        <span className={`text-[10px] font-bold ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`}>
                          {course.level}
                        </span>
                      </div>

                      <h4 className={`text-xs sm:text-sm font-black mb-2 ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                        {course.title}
                      </h4>

                      <p className={`text-[11px] mb-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        Platform: {course.platform} • 100% Free Audit Track Available
                      </p>
                    </div>

                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 rounded-xl text-xs font-bold btn-interactive flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white shadow-sm hover:brightness-110"
                    >
                      <span>Access Free Course</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: INTERVIEW PREP & NEXT ACTIONS */}
          {activeTab === 'interview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Salary Breakdown */}
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-[#0A1E3F] border-[#003B73]' : 'bg-white border-[#BACDDF]'}`}>
                <h3 className={`text-sm font-black mb-3 ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                  💰 Projected Compensation Roadmap for {activeGoal.name}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className={`p-3 rounded-xl border text-center ${darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF]'}`}>
                    <div className="text-[10px] font-bold uppercase opacity-70">Entry Level (0-2 Yrs)</div>
                    <div className="text-sm font-black text-[#0265A6] mt-1">₹8 - 18 LPA</div>
                  </div>

                  <div className={`p-3 rounded-xl border text-center ${darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF]'}`}>
                    <div className="text-[10px] font-bold uppercase opacity-70">Mid Level (3-5 Yrs)</div>
                    <div className="text-sm font-black text-[#0265A6] mt-1">₹20 - 45 LPA</div>
                  </div>

                  <div className={`p-3 rounded-xl border text-center ${darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF]'}`}>
                    <div className="text-[10px] font-bold uppercase opacity-70">Senior Lead (6+ Yrs)</div>
                    <div className="text-sm font-black text-emerald-500 mt-1">₹50L - 1.2 Cr+</div>
                  </div>
                </div>
              </div>

              {/* Quick Launch Suite */}
              <div className="space-y-3">
                <h4 className={`text-sm font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                  🚀 Launch Specialized Guidance Tools
                </h4>

                <div className="grid sm:grid-cols-2 gap-3">
                  {onOpenMockInterview && (
                    <button
                      onClick={onOpenMockInterview}
                      className={`p-4 rounded-2xl border text-left btn-interactive flex items-center justify-between ${
                        darkMode ? 'bg-[#071326] border-[#003B73] text-white hover:border-[#0265A6]' : 'bg-white border-[#BACDDF] text-[#051C3E] hover:border-[#0265A6]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[#003B73]/30 text-[#0265A6]">
                          <Brain className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-black">AI Mock Interview Simulator</div>
                          <div className="text-[11px] opacity-70">Practice target role questions</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#0265A6]" />
                    </button>
                  )}

                  {onOpenMentors && (
                    <button
                      onClick={onOpenMentors}
                      className={`p-4 rounded-2xl border text-left btn-interactive flex items-center justify-between ${
                        darkMode ? 'bg-[#071326] border-[#003B73] text-white hover:border-[#0265A6]' : 'bg-white border-[#BACDDF] text-[#051C3E] hover:border-[#0265A6]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[#003B73]/30 text-[#0265A6]">
                          <UserCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-black">Alumni Connect Mentorship</div>
                          <div className="text-[11px] opacity-70">Book 1-on-1 industry guidance</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#0265A6]" />
                    </button>
                  )}

                  {onOpenAdvisor && (
                    <button
                      onClick={onOpenAdvisor}
                      className="p-4 rounded-2xl border text-left btn-interactive flex items-center justify-between bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-white/20 text-white">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-black">Ask AI Advisor Pro</div>
                          <div className="text-[11px] opacity-90">Custom advice for {activeGoal.name}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Action Bar */}
        <div className={`p-4 border-t flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 ${
          darkMode ? 'bg-[#0A1E3F] border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF]'
        }`}>
          <div className="text-xs font-bold opacity-80 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0265A6]" />
            <span>Target Goal: <strong className="text-[#0265A6]">{activeGoal.name}</strong></span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleExportPlan}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold border btn-interactive flex items-center justify-center gap-1.5 ${
                darkMode ? 'bg-[#071326] border-[#003B73] text-white hover:bg-[#003B73]' : 'bg-white border-[#BACDDF] text-[#0265A6] hover:bg-[#BACDDF]/40'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Plan (.txt)</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold btn-interactive flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white shadow-sm hover:brightness-110"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Roadmap</span>
            </button>
          </div>
        </div>

      </div>

      {/* Goal Switcher Modal */}
      {showGoalPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className={`w-full max-w-xl rounded-3xl border p-5 sm:p-6 shadow-2xl ${
            darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black flex items-center gap-2">
                <span>🎯 Select Your Active Target Career Goal</span>
              </h3>
              <button
                onClick={() => setShowGoalPicker(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mb-4">
              <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`} />
              <input
                type="text"
                placeholder="Search 150+ career goals (e.g. AI Engineer, MBBS Doctor, Lawyer)..."
                value={goalSearch}
                onChange={(e) => setGoalSearch(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border focus:outline-none ${
                  darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-white placeholder-zinc-400' : 'bg-[#EBF3FA] border-[#BACDDF] text-black'
                }`}
              />
            </div>

            <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
              {filteredGoalOptions.map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleSelectNewGoal(c)}
                  className={`w-full p-3 rounded-xl text-left border text-xs font-bold transition-all flex items-center justify-between ${
                    activeGoal.name === c.name
                      ? 'bg-gradient-to-r from-[#003B73] to-[#0265A6] border-[#0265A6] text-white'
                      : darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-white hover:border-[#0265A6]' : 'bg-white border-[#BACDDF] text-[#051C3E] hover:border-[#0265A6]'
                  }`}
                >
                  <div>
                    <div>{c.name}</div>
                    <div className="text-[10px] font-normal opacity-70">{c.domainName} • {c.salaryRange ? c.salaryRange.split('|')[0] : 'High Demand'}</div>
                  </div>
                  {activeGoal.name === c.name && (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowGoalPicker(false)}
              className={`w-full mt-4 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-zinc-300' : 'bg-[#EBF3FA] border-[#BACDDF] text-zinc-700'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
