import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ExternalLink, GraduationCap, Sparkles, CheckCircle2, ChevronRight, X, AlertCircle, Plus, Trash2 } from 'lucide-react';

const ENTRANCE_EXAMS = [
  {
    id: 'jee',
    name: 'JEE Advanced 2026',
    domain: 'Engineering & AI',
    stream: 'engineering',
    target: 'IITs & Top Engineering Institutes',
    examDate: '2026-05-24',
    phase: 'Application Phase',
    status: 'Upcoming',
    officialUrl: 'https://jeeadv.ac.in',
    highlights: 'Top 2,50,000 JEE Main qualifiers eligible'
  },
  {
    id: 'neet',
    name: 'NEET PG 2026',
    domain: 'Medical & Healthcare',
    stream: 'medical',
    target: 'AIIMS & Premier Medical Colleges',
    examDate: '2026-06-14',
    phase: 'Registration Open',
    status: 'Active',
    officialUrl: 'https://natboard.edu.in',
    highlights: 'Mandatory for MS/MD surgical & clinical seats'
  },
  {
    id: 'cat',
    name: 'CAT 2026',
    domain: 'Management & Business',
    stream: 'management',
    target: 'IIMs & Premier B-Schools',
    examDate: '2026-11-29',
    phase: 'Notification Announced',
    status: 'Upcoming',
    officialUrl: 'https://iimcat.ac.in',
    highlights: 'Scores accepted by 20 IIMs & 100+ top institutes'
  },
  {
    id: 'gate',
    name: 'GATE 2026',
    domain: 'Engineering & Research',
    stream: 'engineering',
    target: 'M.Tech / PSU Direct Recruitment',
    examDate: '2026-02-07',
    phase: 'Registration Closing Soon',
    status: 'Urgent',
    officialUrl: 'https://gate.iitg.ac.in',
    highlights: 'Direct entry to ISRO, BARC, BHEL, and M.Tech programs'
  },
  {
    id: 'clat',
    name: 'CLAT 2026',
    domain: 'Law & Governance',
    stream: 'law',
    target: '24 National Law Universities (NLUs)',
    examDate: '2026-12-06',
    phase: 'Form Filing Starts',
    status: 'Active',
    officialUrl: 'https://consortiumofnlus.ac.in',
    highlights: 'National Law Entrance for BA LLB & LLM tracks'
  },
  {
    id: 'nid',
    name: 'NID DAT 2026',
    domain: 'Arts & Product Design',
    stream: 'design',
    target: 'NID Ahmedabad, Bengaluru & Kurukshetra',
    examDate: '2026-01-11',
    phase: 'Prelims Prep Phase',
    status: 'Upcoming',
    officialUrl: 'https://admissions.nid.edu',
    highlights: 'Design Aptitude Test for B.Des & M.Des programs'
  }
];

const computeDaysLeft = (targetDateStr) => {
  if (!targetDateStr) return 0;
  const target = new Date(targetDateStr);
  const now = new Date();
  const diffTime = target - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

const ExamCountdownTracker = ({ darkMode, onClose, initialStream }) => {
  const [selectedStream, setSelectedStream] = useState(initialStream || 'all');
  const [customExams, setCustomExams] = useState(() => {
    try {
      const saved = localStorage.getItem('cognitrail_custom_exams');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExam, setNewExam] = useState({
    name: '',
    stream: 'engineering',
    domain: 'Engineering & AI',
    target: '',
    examDate: '',
    officialUrl: '',
    highlights: 'Custom student target entrance exam'
  });

  // Save custom exams to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cognitrail_custom_exams', JSON.stringify(customExams));
    } catch (e) {
      console.warn('Could not save custom exams', e);
    }
  }, [customExams]);

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

  const handleAddExam = (e) => {
    e.preventDefault();
    if (!newExam.name.trim() || !newExam.examDate) {
      alert('Please fill out the Exam Name and Exam Date.');
      return;
    }

    const domainMap = {
      engineering: 'Engineering & AI',
      medical: 'Medical & Healthcare',
      management: 'Management & Business',
      law: 'Law & Governance',
      design: 'Design & Arts'
    };

    const examToAdd = {
      id: `custom_${Date.now()}`,
      ...newExam,
      domain: domainMap[newExam.stream] || 'General Stream',
      phase: 'Student Target Exam',
      status: 'Custom',
      isCustom: true
    };

    setCustomExams([...customExams, examToAdd]);
    setShowAddForm(false);
    setNewExam({
      name: '',
      stream: 'engineering',
      domain: 'Engineering & AI',
      target: '',
      examDate: '',
      officialUrl: '',
      highlights: 'Custom student target entrance exam'
    });
  };

  const handleDeleteCustomExam = (id) => {
    setCustomExams(customExams.filter(e => e.id !== id));
  };

  const allExams = [...ENTRANCE_EXAMS, ...customExams].map(e => ({
    ...e,
    daysLeft: computeDaysLeft(e.examDate)
  }));

  const filteredExams = allExams.filter(
    (exam) => selectedStream === 'all' || exam.stream === selectedStream
  );

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Exam Countdown Tracker"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto"
      >
        <div
          className={`w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden transition-all my-8 ${
            darkMode
              ? 'bg-gradient-to-b from-[#0A1E3F] via-[#071326] to-[#051C3E] border-[#003B73] text-white'
              : 'bg-white border-[#BACDDF] text-[#051C3E]'
          }`}
        >
          {/* Header */}
          <div className={`p-6 border-b flex items-center justify-between ${
            darkMode ? 'border-[#003B73] bg-[#0A1E3F]/80' : 'border-[#BACDDF] bg-[#EBF3FA]/50'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#003B73] to-[#0265A6] flex items-center justify-center text-white shadow-md">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight">National Entrance Exam & Admission Countdown 2026</h2>
                <p className={`text-xs font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Real-time countdown timers, application phases, and direct official portals
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddForm(true)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold btn-interactive flex items-center gap-1.5 cursor-pointer bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-md hover:brightness-110"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Exam</span>
              </button>

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
          </div>

          {/* Stream Filters */}
          <div className="p-6 border-b border-[#003B73]/40 dark:border-[#003B73]/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All Exams (6)', icon: '🌐' },
              { id: 'engineering', label: 'Engineering & AI', icon: '💻' },
              { id: 'medical', label: 'Medical & Healthcare', icon: '🔬' },
              { id: 'management', label: 'Management & MBA', icon: '💼' },
              { id: 'law', label: 'Law', icon: '⚖️' },
              { id: 'design', label: 'Design & Arts', icon: '🎨' }
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => setSelectedStream(chip.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedStream === chip.id
                    ? 'bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-md scale-105'
                    : darkMode
                      ? 'bg-[#071326] border border-[#003B73] text-zinc-300 hover:text-white'
                      : 'bg-[#EBF3FA] border border-[#BACDDF] text-[#0265A6] hover:bg-[#0265A6] hover:text-white'
                }`}
              >
                <span>{chip.icon}</span>
                <span>{chip.label}</span>
              </button>
            ))}
          </div>

          {/* Exams Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {filteredExams.map((exam) => (
              <div
                key={exam.id}
                className={`group rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 hover-lift ${
                  darkMode
                    ? 'bg-[#071326] border-[#003B73] hover:border-[#0265A6]'
                    : 'bg-[#EBF3FA]/40 border-[#BACDDF] hover:border-[#0265A6] shadow-sm'
                }`}
              >
                <div>
                  {/* Top Row: Stream Badge & Countdown Pill */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                        darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#6096BA]' : 'bg-white border-[#BACDDF] text-[#0265A6]'
                      }`}>
                        {exam.domain}
                      </span>
                      {exam.isCustom && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
                          Custom Exam
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white shadow-sm">
                        <Clock className="w-3 h-3 text-white" />
                        <span>{exam.daysLeft} Days Left</span>
                      </div>

                      {exam.isCustom && (
                        <button
                          onClick={() => handleDeleteCustomExam(exam.id)}
                          className="p-1 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all cursor-pointer"
                          title="Delete custom exam"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Exam Title & Target */}
                  <h3 className={`text-xl font-black mb-1 ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                    {exam.name}
                  </h3>
                  <p className="text-xs font-bold text-[#0265A6] mb-3">
                    Target: {exam.target}
                  </p>

                  {/* Phase & Highlights */}
                  <div className={`p-3 rounded-2xl border mb-4 text-xs ${
                    darkMode ? 'bg-[#0A1E3F]/80 border-[#003B73] text-zinc-300' : 'bg-white border-[#BACDDF] text-zinc-700'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold text-[#0265A6] mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Current Status: {exam.phase}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {exam.highlights}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t flex items-center justify-between gap-2 text-xs border-[#003B73]/40 dark:border-[#003B73]/60">
                  <div className="flex items-center gap-1.5 text-zinc-400 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-[#0265A6]" />
                    <span>Exam: {exam.examDate}</span>
                  </div>

                  <a
                    href={exam.officialUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl font-bold text-[11px] btn-interactive flex items-center gap-1 bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-sm hover:brightness-110"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className={`p-5 border-t flex items-center justify-between text-xs ${
            darkMode ? 'border-[#003B73] bg-[#0A1E3F]/80 text-zinc-400' : 'border-[#BACDDF] bg-[#EBF3FA]/50 text-zinc-600'
          }`}>
            <div className="flex items-center gap-1.5 font-semibold">
              <Sparkles className="w-4 h-4 text-[#0265A6]" />
              <span>Updated with NTA, NBE & NLU 2026 Examination Schedules</span>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl font-bold btn-interactive bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-md cursor-pointer"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Add Custom Exam Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-lg rounded-3xl border p-6 shadow-2xl ${
            darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
          }`}>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#003B73]/50">
              <h3 className="text-lg font-black flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#0265A6]" />
                Add Custom Target Exam
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-1.5 rounded-xl hover:bg-[#003B73]/50 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddExam} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block mb-1 text-zinc-400">Exam Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BITSAT 2026 / COMEDK 2026"
                  value={newExam.name}
                  onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
                  className={`w-full p-3 rounded-xl border text-xs outline-none ${
                    darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#051C3E]'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-zinc-400">Stream</label>
                  <select
                    value={newExam.stream}
                    onChange={(e) => setNewExam({ ...newExam, stream: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-xs outline-none ${
                      darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#051C3E]'
                    }`}
                  >
                    <option value="engineering">Engineering & AI</option>
                    <option value="medical">Medical & Healthcare</option>
                    <option value="management">Management & MBA</option>
                    <option value="law">Law</option>
                    <option value="design">Design & Arts</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-zinc-400">Exam Date *</label>
                  <input
                    type="date"
                    required
                    value={newExam.examDate}
                    onChange={(e) => setNewExam({ ...newExam, examDate: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-xs outline-none ${
                      darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#051C3E]'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-zinc-400">Target Institute / Qualification</label>
                <input
                  type="text"
                  placeholder="e.g. BITS Pilani, Goa & Hyderabad"
                  value={newExam.target}
                  onChange={(e) => setNewExam({ ...newExam, target: e.target.value })}
                  className={`w-full p-3 rounded-xl border text-xs outline-none ${
                    darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#051C3E]'
                  }`}
                />
              </div>

              <div>
                <label className="block mb-1 text-zinc-400">Official Portal URL</label>
                <input
                  type="url"
                  placeholder="https://bitsadmission.com"
                  value={newExam.officialUrl}
                  onChange={(e) => setNewExam({ ...newExam, officialUrl: e.target.value })}
                  className={`w-full p-3 rounded-xl border text-xs outline-none ${
                    darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#051C3E]'
                  }`}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-md hover:brightness-110 cursor-pointer"
                >
                  Save Custom Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ExamCountdownTracker;
