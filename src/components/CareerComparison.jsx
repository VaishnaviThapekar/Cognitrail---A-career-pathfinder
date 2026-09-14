import React, { useState } from 'react';
import { X, Plus, Trash2, DollarSign, GraduationCap, TrendingUp, Clock, Award, Target, CheckCircle, XCircle } from 'lucide-react';

const CareerComparison = ({ onClose, darkMode, allCareers }) => {
    const [selectedCareers, setSelectedCareers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Add career to comparison
    const addCareer = (career) => {
        if (selectedCareers.length < 4 && !selectedCareers.find(c => c.name === career.name)) {
            setSelectedCareers([...selectedCareers, career]);
            setSearchQuery('');
        }
    };

    // Remove career from comparison
    const removeCareer = (careerName) => {
        setSelectedCareers(selectedCareers.filter(c => c.name !== careerName));
    };

    // Filter careers based on search
    const filteredCareers = allCareers.filter(career =>
        career.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedCareers.find(c => c.name === career.name)
    );

    // Comparison metrics
    const metrics = [
        {
            id: 'salary',
            label: 'Salary Range',
            icon: DollarSign,
            color: 'green',
            getValue: (career) => career.salaryRange || 'N/A'
        },
        {
            id: 'education',
            label: 'Education Required',
            icon: GraduationCap,
            color: 'purple',
            getValue: (career) => career.education || 'N/A'
        },
        {
            id: 'outlook',
            label: 'Job Outlook',
            icon: TrendingUp,
            color: 'blue',
            getValue: (career) => career.outlook || 'N/A'
        },
        {
            id: 'experience',
            label: 'Entry Timeline',
            icon: Clock,
            color: 'orange',
            getValue: (career) => career.entryTimeline || '2-4 years'
        }
    ];

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-slate-50 to-indigo-50'
            }`}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                            Compare Careers
                        </h2>
                        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Compare up to 4 careers side-by-side
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

                {/* Search & Add Careers */}
                {selectedCareers.length < 4 && (
                    <div className={`rounded-2xl p-6 mb-8 ${darkMode ? 'bg-[#1a1f2e] border border-[#272757]' : 'bg-white border border-indigo-100'
                        }`}>
                        <div className="flex items-center gap-4 mb-4">
                            <Plus className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Add Career to Compare
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${darkMode ? 'bg-indigo-900/30 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                                }`}>
                                {selectedCareers.length}/4
                            </span>
                        </div>

                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search careers to compare..."
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${darkMode
                                ? 'bg-[#272757] border-[#505081] text-white placeholder-gray-500 focus:border-indigo-500'
                                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500'
                                } outline-none`}
                        />

                        {searchQuery && filteredCareers.length > 0 && (
                            <div className={`mt-4 max-h-60 overflow-y-auto rounded-xl border ${darkMode ? 'border-[#272757]' : 'border-gray-200'
                                }`}>
                                {filteredCareers.slice(0, 10).map((career, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => addCareer(career)}
                                        className={`w-full text-left px-4 py-3 transition-colors ${darkMode
                                            ? 'hover:bg-[#272757] text-gray-300'
                                            : 'hover:bg-gray-50 text-gray-700'
                                            } border-b last:border-b-0 ${darkMode ? 'border-[#272757]' : 'border-gray-100'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold">{career.name}</span>
                                            <Plus className="w-4 h-4" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Comparison Table */}
                {selectedCareers.length > 0 ? (
                    <div className="overflow-x-auto">
                        <div className={`rounded-2xl border ${darkMode ? 'bg-[#1a1f2e] border-[#272757]' : 'bg-white border-indigo-100'
                            }`}>
                            {/* Career Headers */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-b ${
                darkMode ? 'border-[#272757]' : 'border-gray-200'
              }">
                                {selectedCareers.map((career, idx) => (
                                    <div key={idx} className={`rounded-xl p-4 ${darkMode ? 'bg-[#272757]' : 'bg-gray-50'
                                        }`}>
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {career.name}
                                            </h3>
                                            <button
                                                onClick={() => removeCareer(career.name)}
                                                className={`p-1 rounded-lg transition-colors ${darkMode ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-600'
                                                    }`}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className={`text-sm line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {career.description}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Comparison Rows */}
                            {metrics.map((metric) => {
                                const IconComponent = metric.icon;
                                return (
                                    <div key={metric.id} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-b last:border-b-0 ${darkMode ? 'border-[#272757]' : 'border-gray-100'
                                        }`}>
                                        {/* Metric Label */}
                                        <div className="lg:col-span-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${metric.color === 'green' ? darkMode ? 'bg-green-900/30' : 'bg-green-50' :
                                                    metric.color === 'purple' ? darkMode ? 'bg-purple-900/30' : 'bg-purple-50' :
                                                        metric.color === 'blue' ? darkMode ? 'bg-blue-900/30' : 'bg-blue-50' :
                                                            darkMode ? 'bg-orange-900/30' : 'bg-orange-50'
                                                    }`}>
                                                    <IconComponent className={`w-5 h-5 ${metric.color === 'green' ? darkMode ? 'text-green-400' : 'text-green-600' :
                                                        metric.color === 'purple' ? darkMode ? 'text-purple-400' : 'text-purple-600' :
                                                            metric.color === 'blue' ? darkMode ? 'text-blue-400' : 'text-blue-600' :
                                                                darkMode ? 'text-orange-400' : 'text-orange-600'
                                                        }`} />
                                                </div>
                                                <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    {metric.label}
                                                </h4>
                                            </div>
                                        </div>

                                        {/* Metric Values */}
                                        {selectedCareers.map((career, idx) => (
                                            <div key={idx} className={`p-4 rounded-xl ${darkMode ? 'bg-[#272757]/50' : 'bg-gray-50'
                                                }`}>
                                                <p className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    {metric.getValue(career)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}

                            {/* Skills Comparison */}
                            <div className={`p-6 border-b ${darkMode ? 'border-[#272757]' : 'border-gray-100'}`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-pink-900/30' : 'bg-pink-50'}`}>
                                        <Award className={`w-5 h-5 ${darkMode ? 'text-pink-400' : 'text-pink-600'}`} />
                                    </div>
                                    <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Required Skills
                                    </h4>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {selectedCareers.map((career, idx) => (
                                        <div key={idx} className={`p-4 rounded-xl ${darkMode ? 'bg-[#272757]/50' : 'bg-gray-50'
                                            }`}>
                                            <div className="flex flex-wrap gap-2">
                                                {career.skills?.slice(0, 5).map((skill, skillIdx) => (
                                                    <span key={skillIdx} className={`px-2 py-1 rounded-lg text-xs font-semibold ${darkMode ? 'bg-pink-900/30 text-pink-400' : 'bg-pink-100 text-pink-700'
                                                        }`}>
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Winner Indicator */}
                            <div className={`p-6 ${darkMode ? 'bg-gradient-to-r from-indigo-900/20 to-purple-900/20' : 'bg-gradient-to-r from-indigo-50 to-purple-50'
                                }`}>
                                <div className="flex items-center gap-3">
                                    <Target className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                                    <div>
                                        <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            Choose the Right Path
                                        </h4>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Consider salary, education requirements, job outlook, and your interests
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`text-center py-16 rounded-2xl ${darkMode ? 'bg-[#1a1f2e] border border-[#272757]' : 'bg-white border border-indigo-100'
                        }`}>
                        <Target className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                        <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            No Careers Selected
                        </h3>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Search and add careers above to start comparing
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CareerComparison;