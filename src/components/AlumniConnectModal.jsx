import React, { useState, useEffect } from 'react';
import {
  X, Search, UserCheck, Briefcase, GraduationCap, Calendar, Clock,
  CheckCircle2, Sparkles, Star, MessageSquare, ExternalLink, Filter, ShieldCheck
} from 'lucide-react';
import { useGamification } from '../contexts/GamificationContext';

const MENTORS_DATA = [
  {
    id: 'm1',
    name: 'Ananya Sharma',
    role: 'Senior AI Research Engineer',
    company: 'Google DeepMind',
    domain: 'Software & AI',
    almaMater: 'IIT Bombay (B.Tech CSE)',
    experience: '7+ Years',
    rating: 4.9,
    sessionsCount: 142,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    skills: ['Machine Learning', 'Python Systems', 'PhD Applications', 'AI System Architecture'],
    bio: 'Specialized in Large Language Models & Deep Learning. Guided 100+ students into top tech roles and Ivy League research labs.'
  },
  {
    id: 'm2',
    name: 'Dr. Rohan Deshmukh',
    role: 'Senior Resident Specialist (Cardiology)',
    company: 'AIIMS New Delhi',
    domain: 'Medicine & Health',
    almaMater: 'AIIMS Delhi (MBBS, MD)',
    experience: '6+ Years',
    rating: 4.95,
    sessionsCount: 98,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    skills: ['NEET PG Preparation', 'Clinical Case Studies', 'Medical Residency Guidance'],
    bio: 'Rank 14 in NEET PG. Passionate about guiding aspiring doctors through MBBS clinical rotations and super-specialty prep.'
  },
  {
    id: 'm3',
    name: 'Vikramaditya Nair',
    role: 'Vice President - Investment Banking',
    company: 'Goldman Sachs',
    domain: 'Management & Finance',
    almaMater: 'IIM Ahmedabad (MBA)',
    experience: '8+ Years',
    rating: 4.88,
    sessionsCount: 115,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    skills: ['Financial Modeling', 'CAT Interview Prep', 'M&A Valuation', 'Corporate Finance'],
    bio: 'Alumnus of IIM-A and BITS Pilani. Helping candidates crack IB case studies, CAT interviews, and venture capital roles.'
  },
  {
    id: 'm4',
    name: 'Kavya Pillai',
    role: 'Principal UX/Product Designer',
    company: 'Microsoft Design',
    domain: 'Design & Product',
    almaMater: 'NID Ahmedabad (M.Des)',
    experience: '5+ Years',
    rating: 4.92,
    sessionsCount: 84,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    skills: ['Portfolio Review', 'Figma & Prototyping', 'Design Systems', 'UX Case Studies'],
    bio: 'Leads enterprise design teams at Microsoft. Provides hands-on portfolio teardowns and design interview prep.'
  },
  {
    id: 'm5',
    name: 'Advocate Siddharth Mehta',
    role: 'Senior Associate (Corporate & IPR)',
    company: 'AZB & Partners',
    domain: 'Law & Policy',
    almaMater: 'NLSIU Bengaluru (BA LL.B Hons)',
    experience: '6+ Years',
    rating: 4.85,
    sessionsCount: 76,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    skills: ['CLAT PG & Judiciary', 'Corporate M&A Law', 'Moots & Internship Strategy'],
    bio: 'Guided students to top tier national law firms and Judicial services. Expert in CLAT PG and Moot Court strategy.'
  },
  {
    id: 'm6',
    name: 'Dr. Arjun Sengupta',
    role: 'Lead Quantitative Strategist',
    company: 'Zerodha / Rainmatter Fund',
    domain: 'Software & AI',
    almaMater: 'IISc Bangalore (Ph.D Data Science)',
    experience: '9+ Years',
    rating: 4.97,
    sessionsCount: 160,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    skills: ['Quant Trading', 'Algo Architecture', 'Fintech Systems', 'Data Science Interviews'],
    bio: 'IISc PhD graduate specializing in high-frequency trading algorithms and quantitative risk analytics.'
  }
];

export default function AlumniConnectModal({ onClose, darkMode }) {
  const { awardPoints } = useGamification();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedSessionType, setSelectedSessionType] = useState('Mock Interview');
  const [selectedDate, setSelectedDate] = useState('2026-09-20');
  const [selectedTime, setSelectedTime] = useState('18:00');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedMentor) {
          setSelectedMentor(null);
        } else if (onClose) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, selectedMentor]);

  const domains = ['All', 'Software & AI', 'Medicine & Health', 'Management & Finance', 'Law & Policy', 'Design & Product'];

  const filteredMentors = MENTORS_DATA.filter(m => {
    const matchesDomain = selectedDomain === 'All' || m.domain === selectedDomain;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      m.name.toLowerCase().includes(q) ||
      m.company.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.skills.some(s => s.toLowerCase().includes(q));
    return matchesDomain && matchesSearch;
  });

  const handleConfirmBooking = () => {
    setBookingSuccess(true);
    if (awardPoints) {
      awardPoints(50, 'Booked 1-on-1 Alumni Mentorship Session');
    }
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedMentor(null);
    }, 2200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Alumni & Industry Mentor Connect"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div className={`relative w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden transition-all ${
        darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
      }`}>
        {/* Modal Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-[#051C3E] via-[#003B73] to-[#0265A6] text-white">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <UserCheck className="w-6 h-6 text-[#6096BA]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#0265A6]/40 text-[#EBF3FA] border border-[#6096BA]/30">
                    Verified Industry Mentors
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Booking
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
                  Alumni & Industry Mentor Connect
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-[#EBF3FA]/90 mt-3 max-w-2xl">
            Book 1-on-1 mock interviews, portfolio audits, and career guidance sessions with verified leaders from Google, AIIMS, Goldman Sachs, Microsoft & top law firms.
          </p>

          {/* Search & Domain Filters */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by name, company (Google, AIIMS...), or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white/10 border border-white/20 text-white placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#6096BA]"
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {domains.map(dom => (
                <button
                  key={dom}
                  onClick={() => setSelectedDomain(dom)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedDomain === dom
                      ? 'bg-white text-[#051C3E] shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {dom}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mentor Cards Grid */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMentors.map(mentor => (
              <div
                key={mentor.id}
                className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                  darkMode
                    ? 'bg-[#0A1E3F]/80 border-[#003B73] hover:border-[#0265A6]'
                    : 'bg-[#EBF3FA]/50 border-[#BACDDF] hover:border-[#0265A6]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#0265A6] shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold truncate text-[#0265A6] dark:text-[#6096BA]">
                        {mentor.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{mentor.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs font-semibold mt-0.5">{mentor.role}</p>
                    <p className="text-xs font-bold text-[#003B73] dark:text-[#6096BA]">{mentor.company}</p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-[#0265A6]" />
                      <span>{mentor.almaMater}</span>
                    </p>
                  </div>
                </div>

                <p className="text-xs leading-relaxed mt-3 line-clamp-2 text-zinc-600 dark:text-zinc-300">
                  {mentor.bio}
                </p>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {mentor.skills.map((sk, idx) => (
                    <span
                      key={idx}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                        darkMode
                          ? 'bg-[#003B73]/50 border-[#0265A6]/40 text-[#EBF3FA]'
                          : 'bg-white border-[#BACDDF] text-[#003B73]'
                      }`}
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    💬 {mentor.sessionsCount} sessions completed
                  </span>
                  <button
                    onClick={() => setSelectedMentor(mentor)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] hover:brightness-110 shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book 1-on-1 Session</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredMentors.length === 0 && (
            <div className="text-center py-12">
              <UserCheck className="w-12 h-12 mx-auto text-zinc-400 mb-3" />
              <p className="text-sm font-semibold">No mentors found matching your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedDomain('All'); }}
                className="mt-3 text-xs font-bold text-[#0265A6] hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Booking Confirmation Sub-Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl ${
            darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
          }`}>
            {bookingSuccess ? (
              <div className="text-center py-8 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4 border border-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-emerald-400">Mentorship Session Confirmed!</h3>
                <p className="text-xs text-zinc-300 mt-2">
                  Calendar invite and Google Meet link sent for <strong>{selectedDate} at {selectedTime}</strong> with <strong>{selectedMentor.name}</strong>.
                </p>
                <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold">
                  🎉 +50 Career XP Awarded!
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedMentor.avatar}
                      alt={selectedMentor.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-[#0265A6]"
                    />
                    <div>
                      <h3 className="text-base font-bold text-[#0265A6] dark:text-[#6096BA]">{selectedMentor.name}</h3>
                      <p className="text-xs text-zinc-400">{selectedMentor.role} @ {selectedMentor.company}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedMentor(null)} className="p-2 text-zinc-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold block mb-1">Session Type</label>
                    <select
                      value={selectedSessionType}
                      onChange={(e) => setSelectedSessionType(e.target.value)}
                      className={`w-full p-2.5 rounded-xl text-xs border ${
                        darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-black'
                      }`}
                    >
                      <option value="Mock Interview">🎯 1-on-1 Mock Interview & Live Feedback (45 Min)</option>
                      <option value="Resume & Portfolio Review">📄 Resume ATS & Portfolio Review (30 Min)</option>
                      <option value="Career Strategy Chat">💬 Career Transition & College Strategy (30 Min)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold block mb-1">Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className={`w-full p-2.5 rounded-xl text-xs border ${
                          darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-black'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Time Slot (IST)</label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className={`w-full p-2.5 rounded-xl text-xs border ${
                          darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-black'
                        }`}
                      >
                        <option value="17:00">05:00 PM IST</option>
                        <option value="18:00">06:00 PM IST</option>
                        <option value="19:30">07:30 PM IST</option>
                        <option value="21:00">09:00 PM IST</option>
                      </select>
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                    darkMode ? 'bg-[#003B73]/30 border-[#0265A6]/40 text-[#EBF3FA]' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#051C3E]'
                  }`}>
                    💡 <strong>Includes:</strong> 1-on-1 video call, written feedback scorecard, and instant recording download link.
                  </div>

                  <button
                    onClick={handleConfirmBooking}
                    className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] hover:brightness-110 shadow-lg transition-all"
                  >
                    Confirm & Schedule Session
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
