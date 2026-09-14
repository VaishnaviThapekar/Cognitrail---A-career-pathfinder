import React, { useState } from 'react';
import { X, Plus, Trash2, DollarSign, GraduationCap, TrendingUp, Clock, Award, Target, CheckCircle2 } from 'lucide-react';

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
    const filteredCareers = (allCareers || []).filter(career =>
        career.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedCareers.find(c => c.name === career.name)
    );

    // Comparison metrics
    const metrics = [
        {
            id: 'salary',
            label: 'Salary Range',
            icon: DollarSign,
            getValue: (career) => career.salaryRange || 'N/A'
        },
        {
            id: 'education',
            label: 'Education Pathway',
            icon: GraduationCap,
            getValue: (career) => career.education || 'N/A'
        },
        {
            id: 'outlook',
            label: 'Job Outlook & Demand',
            icon: TrendingUp,
            getValue: (career) => career.jobOutlook || career.outlook || 'High Demand'
        },
        {
            id: 'experience',
            label: 'Entry Timeline',
            icon: Clock,
            getValue: (career) => career.entryTimeline || '2-4 years'
        }
    ];

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#09090b]' : 'bg-zinc-50'}`}>
            <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-black'} mb-2`}>
                            ⚖️ Side-by-Side Career Comparison
                        </h2>
                        <p className={`text-base sm:text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Compare up to 4 careers across compensation, education, and career outlook
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2.5 rounded-xl border btn-interactive hover-lift ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white' : 'bg-white border-zinc-200 text-zinc-700 hover:text-black'}`}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Search & Add Careers */}
                {selectedCareers.length < 4 && (
                    <div className={`rounded-3xl p-6 md:p-8 mb-8 border ${darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-md'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <Plus className={`w-5 h-5 ${darkMode ? 'text-zinc-400' : 'text-zinc-700'}`} />
                            <h3 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                                Add Career to Compare
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-black'}`}>
                                {selectedCareers.length}/4 Selected
                            </span>
                        </div>

                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search career name (e.g. Software Engineer, Data Scientist, Surgeon)..."
                            className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors outline-none ${darkMode
                                ? 'bg-[#18181b] border-zinc-700 text-white placeholder-zinc-500 focus:border-zinc-400'
                                : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-black focus:bg-white'
                                }`}
                        />

                        {searchQuery && filteredCareers.length > 0 && (
                            <div className={`mt-4 max-h-60 overflow-y-auto rounded-2xl border ${darkMode ? 'border-zinc-800 bg-[#18181b]' : 'border-zinc-200 bg-white'}`}>
                                {filteredCareers.slice(0, 10).map((career, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => addCareer(career)}
                                        className={`w-full text-left px-4 py-3 transition-colors flex items-center justify-between border-b last:border-b-0 text-sm ${darkMode
                                            ? 'hover:bg-zinc-800 text-zinc-200 border-zinc-800'
                                            : 'hover:bg-zinc-100 text-zinc-800 border-zinc-100'
                                            }`}
                                    >
                                        <span className="font-bold">{career.name}</span>
                                        <Plus className="w-4 h-4 text-zinc-400" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Comparison Table */}
                {selectedCareers.length > 0 ? (
                    <div className="overflow-x-auto">
                        <div className={`rounded-3xl border overflow-hidden ${darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-xl'}`}>
                            {/* Career Headers */}
                            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                                {selectedCareers.map((career, idx) => (
                                    <div key={idx} className={`rounded-2xl p-4 border ${darkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                                                {career.name}
                                            </h3>
                                            <button
                                                onClick={() => removeCareer(career.name)}
                                                className={`p-1.5 rounded-lg border btn-interactive ${darkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white' : 'bg-white border-zinc-300 text-zinc-600 hover:text-black'}`}
                                                title="Remove from comparison"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className={`text-xs leading-relaxed line-clamp-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                            {career.description}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Comparison Rows */}
                            {metrics.map((metric) => {
                                const IconComponent = metric.icon;
                                return (
                                    <div key={metric.id} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-b last:border-b-0 ${darkMode ? 'border-zinc-800' : 'border-zinc-100'}`}>
                                        {/* Metric Label */}
                                        <div className="lg:col-span-4 mb-2">
                                            <div className="flex items-center gap-2.5">
                                                <div className={`p-2 rounded-xl border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-800'}`}>
                                                    <IconComponent className="w-4 h-4" />
                                                </div>
                                                <h4 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-zinc-300' : 'text-zinc-800'}`}>
                                                    {metric.label}
                                                </h4>
                                            </div>
                                        </div>

                                        {/* Metric Values */}
                                        {selectedCareers.map((career, idx) => (
                                            <div key={idx} className={`p-4 rounded-2xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800/80' : 'bg-zinc-50/70 border-zinc-200'}`}>
                                                <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                                                    {metric.getValue(career)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}

                            {/* Skills Comparison */}
                            <div className={`p-6 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-100'}`}>
                                <div className="flex items-center gap-2.5 mb-4">
                                    <div className={`p-2 rounded-xl border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-800'}`}>
                                        <Award className="w-4 h-4" />
                                    </div>
                                    <h4 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-zinc-300' : 'text-zinc-800'}`}>
                                        Key Required Skills
                                    </h4>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {selectedCareers.map((career, idx) => (
                                        <div key={idx} className={`p-4 rounded-2xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800/80' : 'bg-zinc-50/70 border-zinc-200'}`}>
                                            <div className="flex flex-wrap gap-1.5">
                                                {(career.skills || ['Analytical Thinking', 'Problem Solving', 'Communication']).slice(0, 5).map((skill, skillIdx) => (
                                                    <span key={skillIdx} className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-800'}`}>
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Note */}
                            <div className={`p-6 ${darkMode ? 'bg-black/50' : 'bg-zinc-100/50'}`}>
                                <div className="flex items-center gap-3">
                                    <Target className={`w-5 h-5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`} />
                                    <div>
                                        <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-black'}`}>
                                            Choose the Right Path for You
                                        </h4>
                                        <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                            Evaluate your personal interests, entry exam timelines, and growth outlook before making your decision.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`text-center py-16 rounded-3xl border ${darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200'}`}>
                        <Target className="w-16 h-16 mx-auto mb-4 text-zinc-500" />
                        <h3 className={`text-xl font-black mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                            No Careers Selected Yet
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Search and add up to 4 careers using the search box above to compare them.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CareerComparison;