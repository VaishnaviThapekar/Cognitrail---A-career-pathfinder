import React, { useState } from 'react';
import { X, Search, MapPin, Star, TrendingUp, Award, Phone, Globe, DollarSign, GraduationCap, Filter, ChevronDown } from 'lucide-react';
import { COLLEGES_DATABASE, getAllColleges, getCollegesByState, getCollegesByCity, getAllStates, getCitiesByState } from '../data/collegesDatabase';

const CollegeFinder = ({ onClose, darkMode }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedType, setSelectedType] = useState('');
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

        return colleges;
    };

    const filteredColleges = getFilteredColleges();
    const availableStates = getAllStates();
    const availableCities = selectedState ? getCitiesByState(selectedState) : [];
    const collegeTypes = ['Engineering', 'Management', 'Multi-Disciplinary', 'Arts & Science', 'Medical', 'Law'];

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-slate-50 to-indigo-50'
            }`}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                            🎓 Find Your College
                        </h2>
                        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            40+ Top Colleges across India
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-xl transition-colors ${darkMode ? 'bg-[#1a1f2e] hover:bg-[#272757]' : 'bg-white hover:bg-gray-100'
                            }`}
                    >
                        <X className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </button>
                </div>

                {/* Filters */}
                <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-[#1a1f2e] border border-[#272757]' : 'bg-white border border-indigo-100 shadow-lg'
                    }`}>
                    <div className="flex items-center gap-3 mb-4">
                        <Filter className={`w-5 h-5 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'}`} />
                        <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Filters
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="md:col-span-4">
                            <div className="relative">
                                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'
                                    }`} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search colleges, courses, or specializations..."
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-colors outline-none ${darkMode
                                        ? 'bg-[#272757] border-[#505081] text-white placeholder-gray-500 focus:border-[#8686AC]'
                                        : 'bg-white border-indigo-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500'
                                        }`}
                                />
                            </div>
                        </div>

                        {/* State Filter */}
                        <div>
                            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                State
                            </label>
                            <select
                                value={selectedState}
                                onChange={(e) => {
                                    setSelectedState(e.target.value);
                                    setSelectedCity(''); // Reset city when state changes
                                }}
                                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors outline-none ${darkMode
                                    ? 'bg-[#272757] border-[#505081] text-white focus:border-[#8686AC]'
                                    : 'bg-white border-indigo-200 text-gray-900 focus:border-indigo-500'
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
                            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                City
                            </label>
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                disabled={!selectedState}
                                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors outline-none ${darkMode
                                    ? 'bg-[#272757] border-[#505081] text-white focus:border-[#8686AC] disabled:opacity-50'
                                    : 'bg-white border-indigo-200 text-gray-900 focus:border-indigo-500 disabled:opacity-50'
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
                            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Type
                            </label>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors outline-none ${darkMode
                                    ? 'bg-[#272757] border-[#505081] text-white focus:border-[#8686AC]'
                                    : 'bg-white border-indigo-200 text-gray-900 focus:border-indigo-500'
                                    }`}
                            >
                                <option value="">All Types</option>
                                {collegeTypes.map((type, idx) => (
                                    <option key={idx} value={type}>{type}</option>
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
                                }}
                                className={`w-full px-4 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${darkMode
                                    ? 'bg-[#505081] hover:bg-[#8686AC] text-white'
                                    : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
                                    }`}
                            >
                                Clear All
                            </button>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Found {filteredColleges.length} colleges
                    </div>
                </div>

                {/* College List */}
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredColleges.map((college) => (
                        <div
                            key={college.id}
                            onClick={() => setSelectedCollege(college)}
                            className={`group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer ${darkMode
                                ? 'bg-[#1a1f2e] border border-[#272757] hover:border-[#505081]'
                                : 'bg-white border border-indigo-100 hover:border-indigo-300'
                                }`}
                        >
                            {/* NIRF Badge */}
                            {college.nirf && (
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    NIRF #{college.nirf}
                                </div>
                            )}

                            {/* College Name */}
                            <h3 className={`text-xl font-bold mb-2 pr-20 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {college.name}
                            </h3>

                            {/* Type & Rating */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${darkMode ? 'bg-[#272757] text-[#8686AC]' : 'bg-indigo-50 text-indigo-700'
                                    }`}>
                                    {college.type}
                                </span>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {college.rating}
                                    </span>
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2">
                                    <DollarSign className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {college.fees}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {college.placements}
                                    </span>
                                </div>
                            </div>

                            {/* View Details Button */}
                            <div className={`text-sm font-semibold ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'
                                } group-hover:gap-2 transition-all flex items-center gap-1`}>
                                View Details
                                <ChevronDown className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredColleges.length === 0 && (
                    <div className={`text-center py-16 rounded-2xl ${darkMode ? 'bg-[#1a1f2e] border border-[#272757]' : 'bg-white border border-indigo-100'
                        }`}>
                        <Search className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                        <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            No colleges found
                        </h3>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Try adjusting your filters or search query
                        </p>
                    </div>
                )}
            </div>

            {/* College Detail Modal */}
            {selectedCollege && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-60">
                    <div className={`max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl ${darkMode ? 'bg-[#1a1f2e]' : 'bg-white'
                        }`}>
                        {/* Header */}
                        <div className={`sticky top-0 p-6 border-b ${darkMode
                            ? 'bg-gradient-to-r from-[#505081] to-[#8686AC] border-[#272757]'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-200'
                            }`}>
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h2 className="text-2xl font-black text-white mb-2">{selectedCollege.name}</h2>
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-white/20 text-white">
                                            {selectedCollege.type}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                                            <span className="text-sm font-semibold text-white">{selectedCollege.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedCollege(null)}
                                    className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                                >
                                    <X className="w-6 h-6 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Key Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`p-4 rounded-xl ${darkMode ? 'bg-[#272757]' : 'bg-indigo-50'}`}>
                                    <div className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>NIRF Rank</div>
                                    <div className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>#{selectedCollege.nirf}</div>
                                </div>
                                <div className={`p-4 rounded-xl ${darkMode ? 'bg-[#272757]' : 'bg-indigo-50'}`}>
                                    <div className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Established</div>
                                    <div className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCollege.established}</div>
                                </div>
                            </div>

                            {/* Courses */}
                            <div>
                                <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    <GraduationCap className="w-5 h-5" />
                                    Courses Offered
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCollege.courses.map((course, idx) => (
                                        <span key={idx} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${darkMode ? 'bg-[#272757] text-[#8686AC]' : 'bg-indigo-100 text-indigo-700'
                                            }`}>
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Specializations */}
                            <div>
                                <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    <Award className="w-5 h-5" />
                                    Specializations
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCollege.specializations.map((spec, idx) => (
                                        <span key={idx} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${darkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'
                                            }`}>
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Fees & Placements */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className={`p-4 rounded-xl border-2 ${darkMode ? 'bg-green-900/10 border-green-500/30' : 'bg-green-50 border-green-200'
                                    }`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                                        <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Annual Fees</h4>
                                    </div>
                                    <p className={`text-lg font-semibold ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                                        {selectedCollege.fees}
                                    </p>
                                </div>
                                <div className={`p-4 rounded-xl border-2 ${darkMode ? 'bg-blue-900/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                                    }`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                        <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Placements</h4>
                                    </div>
                                    <p className={`text-sm font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                                        {selectedCollege.placements}
                                    </p>
                                </div>
                            </div>

                            {/* Contact */}
                            <div>
                                <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Contact Information
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Phone className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{selectedCollege.contact}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Globe className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                        <a
                                            href={`https://${selectedCollege.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`hover:underline ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'}`}
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