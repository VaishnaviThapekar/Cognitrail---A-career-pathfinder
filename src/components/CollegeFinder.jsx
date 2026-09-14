import React, { useState } from 'react';
import { X, Search, MapPin, Star, TrendingUp, Award, Phone, Globe, DollarSign, GraduationCap, Filter, ChevronDown, BookOpen } from 'lucide-react';
import { COLLEGES_DATABASE, getAllColleges, getCollegesByState, getCollegesByCity, getAllStates, getCitiesByState } from '../data/collegesDatabase';

const CollegeFinder = ({ onClose, darkMode }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedTier, setSelectedTier] = useState('');
    const [selectedOwnership, setSelectedOwnership] = useState('');
    const [selectedCollege, setSelectedCollege] = useState(null);

    // Get filtered colleges
    const getFilteredColleges = () => {
        let colleges = [];

        if (selectedState && selectedCity) {
            colleges = getCollegesByCity(selectedState, selectedCity);
        } else if (selectedState) {
            colleges = getCollegesByState(selectedState);
        } else {
            colleges = getAllColleges();
        }

        // Filter by search query
        if (searchQuery) {
            colleges = colleges.filter(college =>
                college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                college.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                college.specializations?.some(spec =>
                    spec.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }

        // Filter by type
        if (selectedType) {
            colleges = colleges.filter(college => college.type === selectedType);
        }

        // Filter by tier
        if (selectedTier) {
            colleges = colleges.filter(college => (college.tier || '').toLowerCase() === selectedTier.toLowerCase());
        }

        // Filter by ownership
        if (selectedOwnership) {
            colleges = colleges.filter(college => (college.ownership || '').toLowerCase() === selectedOwnership.toLowerCase());
        }

        return colleges;
    };

    const filteredColleges = getFilteredColleges();
    const availableStates = getAllStates();
    const availableCities = selectedState ? getCitiesByState(selectedState) : [];
    const collegeTypes = ['Engineering', 'Management', 'Multi-Disciplinary', 'Arts & Science', 'Medical', 'Law'];
    const tiers = ['Tier 1', 'Tier 2', 'Tier 3'];
    const ownerships = ['Government', 'Private'];

    const FIELD_STUDY_OVERVIEWS = {
        'Engineering': {
            title: 'Study Guide: Engineering & Technology (B.Tech / M.Tech)',
            summary: 'Focuses on software systems, AI models, hardware design, robotics, and industrial engineering. Prepares students for leading roles in global tech giants, R&D labs, and high-tech startups.',
            exams: 'JEE Main, JEE Advanced, BITSAT, MHTCET, GATE',
            duration: '4 Years (B.Tech) / 2 Years (M.Tech)',
            avgPackage: '₹8.5 Lakhs - ₹28+ Lakhs/year',
            topCareers: 'Software Engineer, AI Specialist, Data Scientist, Systems Architect'
        },
        'Management': {
            title: 'Study Guide: Management & Business Administration (MBA / BBA)',
            summary: 'Develops strategic leadership, financial modeling, marketing analytics, consulting, and corporate governance skills for business leaders.',
            exams: 'CAT, XAT, GMAT, NMAT, IPMAT',
            duration: '3 Years (BBA) / 2 Years (MBA)',
            avgPackage: '₹12 Lakhs - ₹35+ Lakhs/year',
            topCareers: 'Management Consultant, Investment Banker, Business Analyst, Product Manager'
        },
        'Medical': {
            title: 'Study Guide: Medicine & Healthcare (MBBS / MD / BioTech)',
            summary: 'Comprehensive clinical, surgical, diagnostic, and biomedical training preparing future doctors, surgeons, and healthcare innovators.',
            exams: 'NEET UG, NEET PG, INI-CET',
            duration: '5.5 Years (MBBS) / 3 Years (MD/MS)',
            avgPackage: '₹10 Lakhs - ₹30+ Lakhs/year',
            topCareers: 'Surgeon, Medical Specialist, Clinical Researcher, BioTech Scientist'
        },
        'Law': {
            title: 'Study Guide: Legal Studies & Corporate Jurisprudence (BA LLB / LLM)',
            summary: 'Covers corporate law, constitutional law, intellectual property, cyber law, and international dispute resolution.',
            exams: 'CLAT, AILET, LSAT India',
            duration: '5 Years (Integrated BA LLB) / 1-2 Years (LLM)',
            avgPackage: '₹9 Lakhs - ₹22+ Lakhs/year',
            topCareers: 'Corporate Lawyer, Legal Consultant, Advocate, Judicial Officer'
        },
        'Arts & Science': {
            title: 'Study Guide: Design, Arts & Creative Media (B.Des / BFA / Communication)',
            summary: 'Focuses on UI/UX product design, visual storytelling, fashion technology, digital animation, and creative brand direction.',
            exams: 'NID DAT, NIFT Entrance, UCEED, CEED',
            duration: '4 Years (B.Des) / 3 Years (BFA)',
            avgPackage: '₹7.5 Lakhs - ₹18+ Lakhs/year',
            topCareers: 'UI/UX Designer, Art Director, Product Designer, Brand Strategist'
        },
        'Multi-Disciplinary': {
            title: 'Study Guide: Pure Sciences & Quantum Research (BS / M.Sc / PhD)',
            summary: 'Focuses on fundamental physics, chemistry, quantum computing, biotechnology, and advanced interdisciplinary research.',
            exams: 'IAT (IISER), CUET UG, IIT JAM, GATE',
            duration: '3-4 Years (BS) / 2 Years (M.Sc)',
            avgPackage: '₹8 Lakhs - ₹28+ Lakhs/year',
            topCareers: 'Research Scientist, Quantum Analyst, Data Specialist, R&D Lead'
        }
    };

    const activeOverview = selectedType ? FIELD_STUDY_OVERVIEWS[selectedType] : null;

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#09090b]' : 'bg-zinc-50'}`}>
            <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-black'} mb-2`}>
                            🎓 Find Your College & Study Guide
                        </h2>
                        <p className={`text-base sm:text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Comprehensive views of 500+ premier institutions & field study roadmaps across India
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2.5 rounded-xl border btn-interactive hover-lift ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white' : 'bg-white border-zinc-200 text-zinc-700 hover:text-black'}`}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Filters */}
                <div className={`rounded-3xl p-6 md:p-8 mb-8 border ${darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-md'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <Filter className={`w-5 h-5 ${darkMode ? 'text-zinc-400' : 'text-zinc-700'}`} />
                        <h3 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                            Filter & Search Colleges
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="md:col-span-4">
                            <div className="relative">
                                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search colleges, courses, or specializations..."
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-colors outline-none text-sm ${darkMode
                                        ? 'bg-[#18181b] border-zinc-700 text-white placeholder-zinc-500 focus:border-zinc-400'
                                        : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-black focus:bg-white'
                                        }`}
                                />
                            </div>
                        </div>

                        {/* State Filter */}
                        <div>
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                State
                            </label>
                            <select
                                value={selectedState}
                                onChange={(e) => {
                                    setSelectedState(e.target.value);
                                    setSelectedCity('');
                                }}
                                className={`w-full px-4 py-3 rounded-xl border transition-colors outline-none text-sm ${darkMode
                                    ? 'bg-[#18181b] border-zinc-700 text-white focus:border-zinc-400'
                                    : 'bg-zinc-50 border-zinc-200 text-black focus:border-black'
                                    }`}
                            >
                                <option value="">All States</option>
                                {availableStates.map((state, idx) => (
                                    <option key={idx} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>

                        {/* City Filter */}
                        <div>
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                City
                            </label>
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                disabled={!selectedState}
                                className={`w-full px-4 py-3 rounded-xl border transition-colors outline-none text-sm ${darkMode
                                    ? 'bg-[#18181b] border-zinc-700 text-white focus:border-zinc-400 disabled:opacity-40'
                                    : 'bg-zinc-50 border-zinc-200 text-black focus:border-black disabled:opacity-40'
                                    }`}
                            >
                                <option value="">All Cities</option>
                                {availableCities.map((city, idx) => (
                                    <option key={idx} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>

                        {/* Type Filter */}
                        <div>
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                Discipline / Type
                            </label>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border transition-colors outline-none text-sm ${darkMode
                                    ? 'bg-[#18181b] border-zinc-700 text-white focus:border-zinc-400'
                                    : 'bg-zinc-50 border-zinc-200 text-black focus:border-black'
                                    }`}
                            >
                                <option value="">All Types</option>
                                {collegeTypes.map((type, idx) => (
                                    <option key={idx} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        {/* Tier Filter */}
                        <div>
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                Tier
                            </label>
                            <select
                                value={selectedTier}
                                onChange={(e) => setSelectedTier(e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border transition-colors outline-none text-sm ${darkMode
                                    ? 'bg-[#18181b] border-zinc-700 text-white focus:border-zinc-400'
                                    : 'bg-zinc-50 border-zinc-200 text-black focus:border-black'
                                    }`}
                            >
                                <option value="">All Tiers</option>
                                {tiers.map((t, idx) => (
                                    <option key={idx} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>

                        {/* Ownership Filter */}
                        <div>
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                Ownership
                            </label>
                            <select
                                value={selectedOwnership}
                                onChange={(e) => setSelectedOwnership(e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border transition-colors outline-none text-sm ${darkMode
                                    ? 'bg-[#18181b] border-zinc-700 text-white focus:border-zinc-400'
                                    : 'bg-zinc-50 border-zinc-200 text-black focus:border-black'
                                    }`}
                            >
                                <option value="">All Ownership</option>
                                {ownerships.map((o, idx) => (
                                    <option key={idx} value={o}>{o}</option>
                                ))}
                            </select>
                        </div>

                        {/* Clear Filters */}
                        <div className="flex items-end">
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedState('');
                                    setSelectedCity('');
                                    setSelectedType('');
                                    setSelectedTier('');
                                    setSelectedOwnership('');
                                }}
                                className={`w-full py-3 rounded-xl font-bold text-xs btn-interactive border ${darkMode
                                    ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-white hover:text-black'
                                    : 'bg-zinc-100 border-zinc-300 text-zinc-800 hover:bg-black hover:text-white'
                                    }`}
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className={`mt-4 text-xs font-bold ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Found {filteredColleges.length} colleges
                    </div>
                </div>

                {/* Field Briefing Banner when Type selected */}
                {activeOverview && (
                    <div className={`mb-8 p-6 sm:p-8 rounded-3xl border animate-fade-in ${darkMode ? 'bg-[#121215] border-zinc-700 text-white' : 'bg-black text-white'}`}>
                        <div className="flex items-start justify-between">
                            <div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-800 border-zinc-700 text-zinc-200'}`}>
                                    Field Study Overview & Career Guide
                                </span>
                                <h3 className="text-2xl font-black mb-2">{activeOverview.title}</h3>
                                <p className="text-zinc-300 text-sm max-w-4xl leading-relaxed mb-4">{activeOverview.summary}</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4 text-xs pt-4 border-t border-zinc-800">
                            <div>
                                <span className="font-bold text-zinc-400 block mb-0.5">Key Entrance Exams</span>
                                <span className="font-semibold text-white">{activeOverview.exams}</span>
                            </div>
                            <div>
                                <span className="font-bold text-zinc-400 block mb-0.5">Degree Duration</span>
                                <span className="font-semibold text-white">{activeOverview.duration}</span>
                            </div>
                            <div>
                                <span className="font-bold text-zinc-400 block mb-0.5">Placement Range</span>
                                <span className="font-semibold text-white">{activeOverview.avgPackage}</span>
                            </div>
                            <div>
                                <span className="font-bold text-zinc-400 block mb-0.5">Popular Target Roles</span>
                                <span className="font-semibold text-white">{activeOverview.topCareers}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* College List */}
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredColleges.map((college) => (
                        <div
                            key={college.id}
                            onClick={() => setSelectedCollege(college)}
                            className={`group relative rounded-3xl p-6 transition-all duration-300 hover-lift cursor-pointer border ${darkMode
                                ? 'bg-[#121215] border-zinc-800 hover:border-zinc-600'
                                : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-sm'
                                }`}
                        >
                            {/* NIRF Badge */}
                            {college.nirf && (
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-200' : 'bg-zinc-100 border-zinc-300 text-black'}`}>
                                    NIRF #{college.nirf}
                                </div>
                            )}

                            {/* College Name */}
                            <h3 className={`text-xl font-black mb-2 pr-20 transition-colors ${darkMode ? 'text-white group-hover:text-zinc-300' : 'text-black group-hover:text-zinc-700'}`}>
                                {college.name}
                            </h3>

                            {/* Type & Rating */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-800'}`}>
                                    {college.type}
                                </span>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-zinc-400 fill-zinc-400" />
                                    <span className={`text-xs font-bold ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                                        {college.rating}
                                    </span>
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="space-y-2 mb-4 text-xs font-semibold">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-zinc-400" />
                                    <span className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                        Fees: <span className={darkMode ? 'text-zinc-200 font-bold' : 'text-black font-bold'}>{college.fees}</span>
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-zinc-400" />
                                    <span className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                        Placements: <span className={darkMode ? 'text-zinc-200 font-bold' : 'text-black font-bold'}>{college.placements}</span>
                                    </span>
                                </div>
                            </div>

                            {/* View Details Button */}
                            <div className={`text-xs font-bold ${darkMode ? 'text-zinc-300' : 'text-black'} flex items-center gap-1 group-hover:gap-2 transition-all`}>
                                <span>View Details & Admission Info</span>
                                <ChevronDown className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredColleges.length === 0 && (
                    <div className={`text-center py-16 rounded-3xl border ${darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200'}`}>
                        <Search className="w-16 h-16 mx-auto mb-4 text-zinc-500" />
                        <h3 className={`text-xl font-black mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                            No colleges found
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Try adjusting your filters or search query
                        </p>
                    </div>
                )}
            </div>

            {/* College Detail Modal */}
            {selectedCollege && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
                    <div className={`max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl animate-fade-in-scale ${darkMode ? 'bg-[#121215] border-zinc-800 text-white' : 'bg-white border-zinc-300 text-black'}`}>
                        {/* Header */}
                        <div className={`sticky top-0 p-6 border-b z-10 flex justify-between items-start backdrop-blur-md ${darkMode ? 'bg-[#121215]/90 border-zinc-800' : 'bg-white/90 border-zinc-200'}`}>
                            <div className="flex-1 pr-4">
                                <h2 className={`text-2xl font-black mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{selectedCollege.name}</h2>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-800'}`}>
                                        {selectedCollege.type}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-zinc-400 fill-zinc-400" />
                                        <span className="text-xs font-bold">{selectedCollege.rating} Rating</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedCollege(null)}
                                className={`p-2 rounded-xl border btn-interactive ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white' : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:text-black'}`}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-8 space-y-6">
                            {/* Key Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">NIRF Rank</div>
                                    <div className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>#{selectedCollege.nirf}</div>
                                </div>
                                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Established</div>
                                    <div className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>{selectedCollege.established}</div>
                                </div>
                            </div>

                            {/* Courses */}
                            <div>
                                <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                                    <GraduationCap className="w-4 h-4" />
                                    Courses Offered
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCollege.courses.map((course, idx) => (
                                        <span key={idx} className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-800'}`}>
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Specializations */}
                            <div>
                                <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                                    <Award className="w-4 h-4" />
                                    Specializations
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCollege.specializations.map((spec, idx) => (
                                        <span key={idx} className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-800'}`}>
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Fees & Placements */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="w-4 h-4 text-zinc-400" />
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Annual Tuition Fees</h4>
                                    </div>
                                    <p className={`text-lg font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                                        {selectedCollege.fees}
                                    </p>
                                </div>
                                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="w-4 h-4 text-zinc-400" />
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Average Placement Package</h4>
                                    </div>
                                    <p className={`text-lg font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                                        {selectedCollege.placements}
                                    </p>
                                </div>
                            </div>

                            {/* Contact */}
                            <div>
                                <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                                    Contact & Official Portal
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-xs">
                                        <Phone className="w-4 h-4 text-zinc-500" />
                                        <span className={darkMode ? 'text-zinc-300' : 'text-zinc-700'}>{selectedCollege.contact}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs">
                                        <Globe className="w-4 h-4 text-zinc-500" />
                                        <a
                                            href={`https://${selectedCollege.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`font-bold hover:underline ${darkMode ? 'text-white' : 'text-black'}`}
                                        >
                                            {selectedCollege.website}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollegeFinder;