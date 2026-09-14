import React, { useState } from 'react';
import { ChevronRight, DollarSign, GraduationCap, TrendingUp, Bookmark, Clock, Users, Star, Zap, Award, Heart, Share2, ExternalLink } from 'lucide-react';

const EnhancedCareerCard = ({ career, onSelect, darkMode, savedCareers, setSavedCareers }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const isBookmarked = savedCareers?.some(c => c.name === career.name);

    const toggleBookmark = (e) => {
        e.stopPropagation();
        if (setSavedCareers) {
            if (isBookmarked) {
                setSavedCareers(savedCareers.filter(c => c.name !== career.name));
            } else {
                setSavedCareers([...savedCareers, career]);
            }
        }
    };

    const handleShare = (e) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: career.name,
                text: career.description,
                url: window.location.href
            });
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(`${career.name}: ${career.description}`);
            alert('Career info copied to clipboard!');
        }
    };

    const handleFlip = (e) => {
        e.stopPropagation();
        setIsFlipped(!isFlipped);
    };

    // Sample day-in-life activities (you can add these to your career database later)
    const dayInLife = career.dayInLife || [
        "Morning: Team standup meeting",
        "Mid-day: Core work and projects",
        "Afternoon: Collaboration sessions",
        "Evening: Planning for next day"
    ];

    const pros = career.pros || [
        "High demand in market",
        "Good growth potential",
        "Diverse opportunities"
    ];

    const cons = career.cons || [
        "Requires continuous learning",
        "Can be competitive",
        "Initial learning curve"
    ];

    return (
        <div
            className="career-card-3d-container"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div className={`career-card-3d ${isFlipped ? 'flipped' : ''}`}>

                {/* FRONT SIDE */}
                <div className={`career-card-face career-card-front ${darkMode ? 'bg-[#1a1f2e] border-[#272757]' : 'bg-white border-indigo-100'
                    } rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl`}>

                    {/* Top Actions */}
                    <div className="flex items-center justify-between mb-4">
                        {/* Demand Badge */}
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${darkMode
                            ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 text-green-400 border border-green-800/50'
                            : 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200'
                            }`}>
                            <TrendingUp className="w-3.5 h-3.5" />
                            High Demand
                        </div>

                        {/* Bookmark */}
                        {setSavedCareers && (
                            <button
                                onClick={toggleBookmark}
                                className={`p-2 rounded-full transition-all ${isBookmarked
                                    ? darkMode
                                        ? 'bg-gradient-to-r from-[#505081] to-[#8686AC] text-white'
                                        : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white'
                                    : darkMode
                                        ? 'bg-[#272757] text-gray-400 hover:bg-[#505081]'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                title={isBookmarked ? 'Remove bookmark' : 'Bookmark this career'}
                            >
                                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                            </button>
                        )}
                    </div>

                    {/* Career Name & Icon */}
                    <div className="mb-4">
                        <div className={`w-14 h-14 rounded-2xl mb-3 flex items-center justify-center ${darkMode
                            ? 'bg-gradient-to-br from-[#272757] to-[#505081]'
                            : 'bg-gradient-to-br from-indigo-50 to-blue-50'
                            }`}>
                            <GraduationCap className={`w-7 h-7 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'
                                }`} />
                        </div>
                        <h3 className={`text-xl font-black mb-2 ${darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                            {career.name}
                        </h3>
                        <p className={`text-sm leading-relaxed line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            {career.description}
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        {/* Salary Range */}
                        <div className={`p-3 rounded-xl ${darkMode ? 'bg-[#272757]/50' : 'bg-indigo-50/50'
                            }`}>
                            <div className="flex items-center gap-2 mb-1">
                                <DollarSign className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'
                                    }`} />
                                <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>Salary</span>
                            </div>
                            <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                {career.salaryRange}
                            </p>
                        </div>

                        {/* Growth */}
                        <div className={`p-3 rounded-xl ${darkMode ? 'bg-[#272757]/50' : 'bg-indigo-50/50'
                            }`}>
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingUp className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'
                                    }`} />
                                <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>Growth</span>
                            </div>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star
                                        key={i}
                                        className={`w-3 h-3 ${i <= 4
                                            ? darkMode ? 'text-yellow-400 fill-current' : 'text-yellow-500 fill-current'
                                            : darkMode ? 'text-gray-600' : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => onSelect(career)}
                            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all hover:scale-105 ${darkMode
                                ? 'bg-gradient-to-r from-[#505081] to-[#8686AC] text-white hover:from-[#8686AC] hover:to-[#505081]'
                                : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700'
                                }`}
                        >
                            Explore Details
                        </button>
                        <button
                            onClick={handleShare}
                            className={`p-3 rounded-xl transition-all hover:scale-105 ${darkMode
                                ? 'bg-[#272757] text-[#8686AC] hover:bg-[#505081]'
                                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                                }`}
                            title="Share this career"
                        >
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Hover hint */}
                    <p className={`text-center text-xs mt-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                        Hover to see more →
                    </p>
                </div>

                {/* BACK SIDE */}
                <div className={`career-card-face career-card-back ${darkMode ? 'bg-gradient-to-br from-[#1a1f2e] to-[#272757] border-[#505081]' : 'bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200'
                    } rounded-2xl border-2 p-6`}>

                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h4 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                            Day in the Life
                        </h4>
                        <Clock className={`w-5 h-5 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'
                            }`} />
                    </div>

                    {/* Daily Activities */}
                    <div className="space-y-2 mb-4">
                        {dayInLife.slice(0, 4).map((activity, idx) => (
                            <div
                                key={idx}
                                className={`flex items-start gap-2 text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}
                            >
                                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${darkMode ? 'bg-[#8686AC]' : 'bg-indigo-600'
                                    }`}></div>
                                <span>{activity}</span>
                            </div>
                        ))}
                    </div>

                    {/* Pros & Cons */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        {/* Pros */}
                        <div>
                            <div className="flex items-center gap-1 mb-2">
                                <Heart className="w-3.5 h-3.5 text-green-500" />
                                <span className={`text-xs font-bold ${darkMode ? 'text-green-400' : 'text-green-700'
                                    }`}>Pros</span>
                            </div>
                            <ul className="space-y-1">
                                {pros.slice(0, 2).map((pro, idx) => (
                                    <li
                                        key={idx}
                                        className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}
                                    >
                                        • {pro.substring(0, 20)}...
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Cons */}
                        <div>
                            <div className="flex items-center gap-1 mb-2">
                                <Zap className="w-3.5 h-3.5 text-orange-500" />
                                <span className={`text-xs font-bold ${darkMode ? 'text-orange-400' : 'text-orange-700'
                                    }`}>Challenges</span>
                            </div>
                            <ul className="space-y-1">
                                {cons.slice(0, 2).map((con, idx) => (
                                    <li
                                        key={idx}
                                        className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}
                                    >
                                        • {con.substring(0, 20)}...
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Quick Facts */}
                    <div className={`p-3 rounded-xl mb-4 ${darkMode ? 'bg-[#1a1f2e]/50 border border-[#272757]' : 'bg-white/50 border border-indigo-100'
                        }`}>
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1">
                                <Users className={`w-3.5 h-3.5 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'
                                    }`} />
                                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                                    Job Openings
                                </span>
                            </div>
                            <span className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-600'
                                }`}>
                                15K+ this year
                            </span>
                        </div>
                    </div>

                    {/* Learn More Button */}
                    <button
                        onClick={() => onSelect(career)}
                        className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all hover:scale-105 flex items-center justify-center gap-2 ${darkMode
                            ? 'bg-white text-[#272757] hover:bg-gray-100'
                            : 'bg-indigo-900 text-white hover:bg-indigo-800'
                            }`}
                    >
                        Learn More
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <style jsx>{`
        .career-card-3d-container {
          perspective: 1000px;
          height: 100%;
        }

        .career-card-3d {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .career-card-3d.flipped {
          transform: rotateY(180deg);
        }

        .career-card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .career-card-back {
          transform: rotateY(180deg);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
};

export default EnhancedCareerCard;