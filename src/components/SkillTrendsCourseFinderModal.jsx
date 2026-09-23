import React, { useState, useMemo } from 'react';
import { X, Search, BookOpen, Award, ExternalLink, Sparkles, TrendingUp, CheckCircle2, ShieldCheck, Filter, Star, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FREE_COURSES = [
  {
    id: 'cs50',
    title: 'Harvard CS50: Introduction to Computer Science',
    provider: 'Harvard University (edX)',
    domain: 'engineering',
    domainLabel: 'Computer Science & AI',
    level: 'Beginner',
    duration: '12 Weeks (Self-Paced)',
    rating: 4.9,
    students: '4.8M+',
    isFreeCertificateAvailable: true,
    link: 'https://www.edx.org/course/introduction-computer-science-harvardx-cs50x',
    skills: ['C', 'Python', 'SQL', 'Algorithms', 'Web Dev'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'nptel_ai',
    title: 'Artificial Intelligence & Deep Learning',
    provider: 'IIT Kharagpur (NPTEL / SWAYAM)',
    domain: 'engineering',
    domainLabel: 'AI & Machine Learning',
    level: 'Intermediate',
    duration: '8 Weeks',
    rating: 4.8,
    students: '180K+',
    isFreeCertificateAvailable: true,
    link: 'https://swayam.gov.in/nc_details/NPTEL',
    skills: ['PyTorch', 'Neural Networks', 'Computer Vision', 'NLP'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'google_data',
    title: 'Google Data Analytics Professional Certificate',
    provider: 'Google (Coursera)',
    domain: 'commerce',
    domainLabel: 'Data & Business',
    level: 'Beginner',
    duration: '6 Months (10 hrs/wk)',
    rating: 4.8,
    students: '1.2M+',
    isFreeCertificateAvailable: true,
    link: 'https://www.coursera.org/professional-certificates/google-data-analytics',
    skills: ['R', 'SQL', 'Tableau', 'Data Viz', 'Spreadsheets'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'figma_uiux',
    title: 'Google UX Design Professional Certificate',
    provider: 'Google Digital Garage',
    domain: 'arts',
    domainLabel: 'Design & UI/UX',
    level: 'Beginner',
    duration: '4 Months',
    rating: 4.8,
    students: '850K+',
    isFreeCertificateAvailable: true,
    link: 'https://grow.google/certificates/ux-design/',
    skills: ['Figma', 'Wireframing', 'User Research', 'Prototyping'],
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'kaggle_ml',
    title: 'Kaggle Intro to Machine Learning & Pandas',
    provider: 'Kaggle Learn (Google)',
    domain: 'engineering',
    domainLabel: 'Data Science & ML',
    level: 'Beginner',
    duration: '3 Hours (Interactive)',
    rating: 4.9,
    students: '950K+',
    isFreeCertificateAvailable: true,
    link: 'https://www.kaggle.com/learn',
    skills: ['Pandas', 'Scikit-Learn', 'Random Forests', 'Model Validation'],
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'isro_gis',
    title: 'ISRO Geospatial & Remote Sensing Certificate',
    provider: 'ISRO ISTE Portal',
    domain: 'science',
    domainLabel: 'Space & Geosciences',
    level: 'Intermediate',
    duration: '4 Weeks',
    rating: 4.9,
    students: '90K+',
    isFreeCertificateAvailable: true,
    link: 'https://elearning.iirs.gov.in/',
    skills: ['Satellite Imaging', 'GIS Software', 'Remote Sensing', 'Spatial Data'],
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'fin_model',
    title: 'Financial Markets & Investment Basics',
    provider: 'Yale University (Coursera)',
    domain: 'commerce',
    domainLabel: 'Finance & Banking',
    level: 'Beginner',
    duration: '7 Weeks',
    rating: 4.8,
    students: '1.1M+',
    isFreeCertificateAvailable: true,
    link: 'https://www.coursera.org/learn/financial-markets-global',
    skills: ['Stocks & Bonds', 'Risk Management', 'Capital Asset Pricing', 'Behavioral Finance'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'duke_neuro',
    title: 'Medical Neuroscience & Anatomy Overview',
    provider: 'Duke University (Coursera)',
    domain: 'science',
    domainLabel: 'Medical & Biology',
    level: 'Advanced',
    duration: '13 Weeks',
    rating: 4.9,
    students: '340K+',
    isFreeCertificateAvailable: true,
    link: 'https://www.coursera.org/learn/medical-neuroscience',
    skills: ['Brain Structure', 'Neurophysiology', 'Clinical Neurology', 'Sensory Systems'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
  }
];

export default function SkillTrendsCourseFinderModal({ onClose, darkMode }) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredCourses = useMemo(() => {
    return FREE_COURSES.filter(c => {
      if (selectedDomain !== 'all' && c.domain !== selectedDomain) return false;
      if (selectedLevel !== 'all' && c.level.toLowerCase() !== selectedLevel.toLowerCase()) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const mTitle = c.title.toLowerCase().includes(q);
        const mProv = c.provider.toLowerCase().includes(q);
        const mSkill = c.skills.some(s => s.toLowerCase().includes(q));
        return mTitle || mProv || mSkill;
      }
      return true;
    });
  }, [searchQuery, selectedDomain, selectedLevel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className={`relative w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden my-6 transition-all ${
        darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
      }`}>

        {/* Modal Header */}
        <div className={`p-6 sm:p-8 border-b flex items-center justify-between ${
          darkMode ? 'bg-gradient-to-r from-[#0A1E3F] via-[#071326] to-[#0A1E3F] border-[#003B73]' : 'bg-gradient-to-r from-[#EBF3FA] via-white to-[#EBF3FA] border-[#BACDDF]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#003B73] via-[#0265A6] to-[#6096BA] flex items-center justify-center text-white shadow-lg shadow-[#0265A6]/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">
                {t('courseFinderTitle', 'Live Industry Skill Trends & Free Course Finder')}
              </h2>
              <p className={`text-xs font-semibold ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`}>
                {t('courseFinderSub', 'Explore verified free certified courses from Harvard, Google, IIT NPTEL, edX, and ISRO')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-zinc-300 hover:text-white hover:border-[#0265A6]' : 'bg-white border-[#BACDDF] text-zinc-700 hover:bg-[#EBF3FA]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">

          {/* Search & Domain Filter Bar */}
          <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center gap-3 ${
            darkMode ? 'bg-[#0A1E3F]/80 border-[#003B73]' : 'bg-[#EBF3FA]/70 border-[#BACDDF]'
          }`}>
            <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border w-full bg-[#071326] border-[#003B73] text-white dark:bg-[#071326]">
              <Search className="w-4 h-4 text-[#0265A6]" />
              <input
                type="text"
                placeholder="Search courses by skill (e.g. Python, SQL, Figma, PyTorch)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-xs focus:outline-none placeholder-zinc-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-zinc-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className={`p-2.5 rounded-xl border text-xs font-bold focus:outline-none ${
                  darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                }`}
              >
                <option value="all">All Domains</option>
                <option value="engineering">Computer Science & AI</option>
                <option value="commerce">Business & Finance</option>
                <option value="science">Medical & Geosciences</option>
                <option value="arts">Design & UI/UX</option>
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className={`p-2.5 rounded-xl border text-xs font-bold focus:outline-none ${
                  darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                }`}
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[480px] overflow-y-auto pr-1">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className={`group relative rounded-3xl border overflow-hidden flex flex-col justify-between hover-lift transition-all duration-300 ${
                  darkMode ? 'bg-[#0A1E3F]/70 border-[#003B73] hover:border-[#0265A6] shadow-xl' : 'bg-white border-[#BACDDF] hover:border-[#0265A6] shadow-md'
                }`}
              >
                <div>
                  {/* Top Cover Image Showcase */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-[#071326]/40 to-transparent opacity-90" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-[#003B73] text-white shadow-md">
                      <Award className="w-3.5 h-3.5 text-yellow-300" />
                      <span>Free Certification</span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-yellow-400 backdrop-blur-md">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-[11px] font-bold text-[#6096BA]">{course.provider}</div>
                      <h3 className="text-base font-black text-white leading-tight drop-shadow">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#0265A6]" />
                        {course.duration}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-[#003B73] text-[#6096BA]">
                        {course.level}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {course.skills.map(sk => (
                        <span key={sk} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#003B73]/20 border border-[#003B73]/40 text-[#6096BA]">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enrollment Action Footer */}
                <div className="p-5 pt-0">
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl font-bold text-xs btn-interactive flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white hover:brightness-110 shadow-md"
                  >
                    <span>Enroll Free Course</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
