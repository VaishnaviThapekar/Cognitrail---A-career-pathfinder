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
            navigator.clipboard.writeText(`${career.name}: ${career.description}`);
            alert('Career info copied to clipboard!');
        }
    };

    const dayInLife = career.dayInLife || [
        "Morning: Team standup & sprint roadmap planning",
        "Mid-day: Deep focused technical architecture & problem solving",
        "Afternoon: Cross-functional review & strategic iteration",
        "Evening: Documentation, metrics review & tomorrow's goals"
    ];

    const pros = career.pros || [
        "High market demand & longevity",
        "Robust compensation ceiling",
        "Strong global mobility"
    ];

    const cons = career.cons || [
        "Continuous skill updating needed",
        "Competitive baseline requirements",
        "High initial learning curve"
    ];

    return (
        <div
            className="career-card-3d-container"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div className={`career-card-3d ${isFlipped ? 'flipped' : ''}`}>

                {/* FRONT SIDE */}
                <div className={`career-card-face career-card-front ${
                    darkMode ? 'bg-[#121215] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'
                } rounded-2xl border p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover-lift`}>

                    {/* Top Actions */}
                    <div className="flex items-center justify-between mb-4">
                        {/* Demand Badge */}
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                            darkMode
                                ? 'bg-zinc-900 border-zinc-700 text-zinc-300'
                                : 'bg-zinc-100 border-zinc-300 text-zinc-800'
                        }`}>
                            <TrendingUp className="w-3.5 h-3.5" />
                            High Demand
                        </div>

                        {/* Bookmark */}
                        {setSavedCareers && (
                            <button
                                onClick={toggleBookmark}
                                className={`p-2 rounded-xl border transition-all btn-interactive ${
                                    isBookmarked
                                        ? darkMode
                                            ? 'bg-white text-black border-white'
                                            : 'bg-black text-white border-black'
                                        : darkMode
                                            ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                                            : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black'
                                }`}
                                title={isBookmarked ? 'Remove bookmark' : 'Bookmark this career'}
                            >
                                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                            </button>
                        )}
                    </div>

                    {/* Career Name & Icon */}
                    <div className="mb-4">
                        <div className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center border ${
                            darkMode
                                ? 'bg-zinc-900 border-zinc-700 text-white'
                                : 'bg-zinc-100 border-zinc-200 text-black'
                        }`}>
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold tracking-tight mb-1.5">
                            {career.name}
                        </h3>
                        <p className={`text-xs leading-relaxed line-clamp-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            {career.description}
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-2.5 mb-4">
                        {/* Salary Range */}
                        <div className={`p-3 rounded-xl border ${darkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                            <div className="flex items-center gap-1.5 mb-1">
                                <DollarSign className={`w-3.5 h-3.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`} />
                                <span className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Salary</span>
                            </div>
                            <p className="text-xs font-bold font-mono">
                                {career.salaryRange}
                            </p>
                        </div>

                        {/* Growth */}
                        <div className={`p-3 rounded-xl border ${darkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                            <div className="flex items-center gap-1.5 mb-1">
                                <TrendingUp className={`w-3.5 h-3.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`} />
                                <span className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Growth</span>
                            </div>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star
                                        key={i}
                                        className={`w-3 h-3 ${i <= 4
                                            ? darkMode ? 'text-white fill-current' : 'text-black fill-current'
                                            : darkMode ? 'text-zinc-700' : 'text-zinc-300'
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
                            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all btn-interactive ${
                                darkMode
                                    ? 'bg-white text-black hover:bg-zinc-200'
                                    : 'bg-black text-white hover:bg-zinc-800'
                            }`}
                        >
                            Explore Details
                        </button>
                        <button
                            onClick={handleShare}
                            className={`p-2.5 rounded-xl border transition-all btn-interactive ${
                                darkMode
                                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                                    : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black'
                            }`}
                            title="Share this career"
                        >
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Hover hint */}
                    <p className={`text-center text-[11px] mt-3 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        Hover to view Day in the Life →
                    </p>
                </div>

                {/* BACK SIDE */}
                <div className={`career-card-face career-card-back ${
                    darkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-black'
                } rounded-2xl border p-6`}>

                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base font-bold">
                            Day in the Life
                        </h4>
                        <Clock className="w-4 h-4 opacity-70" />
                    </div>

                    {/* Daily Activities */}
                    <div className="space-y-2 mb-4">
                        {dayInLife.slice(0, 4).map((activity, idx) => (
                            <div
                                key={idx}
                                className={`flex items-start gap-2 text-xs ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}
                            >
                                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${darkMode ? 'bg-zinc-400' : 'bg-zinc-700'}`}></div>
                                <span>{activity}</span>
                            </div>
                        ))}
                    </div>

                    {/* Pros & Cons */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                            <div className="flex items-center gap-1 mb-1.5">
                                <span className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-300' : 'text-zinc-800'}`}>Pros</span>
                            </div>
                            <ul className="space-y-1">
                                {pros.slice(0, 2).map((pro, idx) => (
                                    <li
                                        key={idx}
                                        className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
                                    >
                                        • {pro}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <div className="flex items-center gap-1 mb-1.5">
                                <span className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-300' : 'text-zinc-800'}`}>Challenges</span>
                            </div>
                            <ul className="space-y-1">
                                {cons.slice(0, 2).map((con, idx) => (
                                    <li
                                        key={idx}
                                        className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
                                    >
                                        • {con}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Quick Facts */}
                    <div className={`p-2.5 rounded-xl mb-4 border ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 opacity-70" />
                                <span className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                    Openings:
                                </span>
                            </div>
                            <span className="font-bold">
                                15,000+ national roles
                            </span>
                        </div>
                    </div>

                    {/* Learn More Button */}
                    <button
                        onClick={() => onSelect(career)}
                        className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all btn-interactive flex items-center justify-center gap-1.5 ${
                            darkMode
                                ? 'bg-white text-black hover:bg-zinc-200'
                                : 'bg-black text-white hover:bg-zinc-800'
                        }`}
                    >
                        Learn More
                        <ExternalLink className="w-3.5 h-3.5" />
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
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
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