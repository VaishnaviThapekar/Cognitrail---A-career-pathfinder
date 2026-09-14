import React from 'react';
import { Trophy, Star, TrendingUp, Award, Zap, X, Check } from 'lucide-react';
import { useGamification } from '../contexts/GamificationContext';

// Level Up Notification
export const LevelUpNotification = ({ darkMode }) => {
    const { showLevelUp, currentLevel } = useGamification();

    if (!showLevelUp) return null;

    return (
        <div className="fixed top-20 right-4 z-50 animate-fade-in">
            <div className={`rounded-2xl p-5 shadow-2xl border ${
                darkMode
                    ? 'bg-[#18181b] border-zinc-700 text-white'
                    : 'bg-white border-zinc-300 text-black'
            }`}>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
                            darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-black text-white border-zinc-800'
                        }`}>
                            <Trophy className="w-7 h-7" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-black border border-zinc-300 flex items-center justify-center text-xs font-bold">
                            ★
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-0.5">
                            Level Up!
                        </h3>
                        <p className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                            You're now Level {currentLevel.level}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            {currentLevel.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Achievement Unlocked Notification
export const AchievementNotification = ({ darkMode }) => {
    const { showAchievement } = useGamification();

    if (!showAchievement) return null;

    return (
        <div className="fixed top-20 right-4 z-50 animate-fade-in">
            <div className={`rounded-2xl p-5 shadow-2xl border ${
                darkMode
                    ? 'bg-[#18181b] border-zinc-700 text-white'
                    : 'bg-white border-zinc-300 text-black'
            }`}>
                <div className="flex items-center gap-4">
                    <div className="text-4xl">{showAchievement.icon}</div>

                    <div>
                        <h3 className="text-base font-bold mb-0.5">
                            Achievement Unlocked
                        </h3>
                        <p className={`text-xs font-bold ${darkMode ? 'text-zinc-300' : 'text-zinc-800'}`}>
                            {showAchievement.name}
                        </p>
                        <p className={`text-xs font-mono ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            +{showAchievement.points} XP
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Progress Bar Widget (for header)
export const GamificationWidget = ({ darkMode, onClick }) => {
    const { stats, currentLevel, progressToNextLevel } = useGamification();

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 px-3.5 py-1.5 rounded-xl border transition-all btn-interactive ${
                darkMode
                    ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-white'
                    : 'bg-white border-zinc-200 hover:border-zinc-300 text-black shadow-sm'
            }`}
        >
            {/* Level Badge */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs border ${
                darkMode
                    ? 'bg-white text-black border-white'
                    : 'bg-black text-white border-black'
            }`}>
                {currentLevel.level}
            </div>

            {/* Progress Info */}
            <div className="text-left">
                <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                        Lvl {currentLevel.level}
                    </span>
                    <span className={`text-[11px] font-mono ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        {stats.totalPoints} pts
                    </span>
                </div>

                {/* Progress Bar */}
                <div className={`w-20 h-1.5 rounded-full mt-1 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                    <div
                        className={`h-full rounded-full transition-all ${
                            darkMode ? 'bg-white' : 'bg-black'
                        }`}
                        style={{ width: `${progressToNextLevel}%` }}
                    />
                </div>
            </div>
        </button>
    );
};

// Full Gamification Dashboard
export const GamificationDashboard = ({ darkMode, onClose }) => {
    const {
        stats,
        currentLevel,
        progressToNextLevel,
        unlockedAchievements,
        lockedAchievements,
        LEVELS
    } = useGamification();

    const nextLevel = LEVELS.find(l => l.level === currentLevel.level + 1);

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto animate-fade-in ${
            darkMode ? 'bg-black/80 backdrop-blur-md' : 'bg-black/40 backdrop-blur-md'
        } flex items-center justify-center p-4`}>
            <div className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-8 border shadow-2xl transition-all ${
                darkMode ? 'bg-[#121215] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'
            }`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">
                            Gamification & Milestones
                        </h2>
                        <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Track your career exploration levels and unlock achievements
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-xl border transition-all btn-interactive ${
                            darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black'
                        }`}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Level & Points Card */}
                <div className={`rounded-2xl p-6 mb-8 border ${
                    darkMode
                        ? 'bg-zinc-900 border-zinc-800'
                        : 'bg-zinc-900 text-white border-black'
                }`}>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-3xl font-black tracking-tight text-white mb-1">
                                Level {currentLevel.level}
                            </h3>
                            <p className="text-zinc-400 text-sm font-semibold">
                                {currentLevel.name}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-mono font-bold text-white">
                                {stats.totalPoints}
                            </div>
                            <div className="text-zinc-400 text-xs uppercase tracking-wider">Total XP</div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    {nextLevel && (
                        <div>
                            <div className="flex items-center justify-between mb-2 text-xs text-zinc-300">
                                <span>
                                    Progress to Level {nextLevel.level} ({nextLevel.name})
                                </span>
                                <span className="font-mono">
                                    {Math.round(progressToNextLevel)}%
                                </span>
                            </div>
                            <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                                <div
                                    className="h-full bg-white transition-all duration-500"
                                    style={{ width: `${progressToNextLevel}%` }}
                                />
                            </div>
                            <div className="text-zinc-500 text-[11px] mt-1.5 font-mono">
                                {nextLevel.minPoints - stats.totalPoints} XP required for next tier
                            </div>
                        </div>
                    )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
                    <StatCard
                        icon={<Trophy className="w-4 h-4" />}
                        label="Quizzes Taken"
                        value={stats.quizzesTaken}
                        darkMode={darkMode}
                    />
                    <StatCard
                        icon={<Star className="w-4 h-4" />}
                        label="Careers Explored"
                        value={stats.careersExplored}
                        darkMode={darkMode}
                    />
                    <StatCard
                        icon={<Zap className="w-4 h-4" />}
                        label="Current Streak"
                        value={`${stats.currentStreak} days`}
                        darkMode={darkMode}
                    />
                    <StatCard
                        icon={<Award className="w-4 h-4" />}
                        label="Achievements"
                        value={`${unlockedAchievements.length}/${unlockedAchievements.length + lockedAchievements.length}`}
                        darkMode={darkMode}
                    />
                </div>

                {/* Achievements */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-4">
                        Achievement Badges
                    </h3>

                    {/* Unlocked */}
                    {unlockedAchievements.length > 0 && (
                        <div className="mb-6">
                            <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                Unlocked ({unlockedAchievements.length})
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                                {unlockedAchievements.map(achievement => (
                                    <AchievementCard
                                        key={achievement.id}
                                        achievement={achievement}
                                        unlocked={true}
                                        darkMode={darkMode}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Locked */}
                    {lockedAchievements.length > 0 && (
                        <div>
                            <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                Locked ({lockedAchievements.length})
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                                {lockedAchievements.map(achievement => (
                                    <AchievementCard
                                        key={achievement.id}
                                        achievement={achievement}
                                        unlocked={false}
                                        darkMode={darkMode}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Stat Card Component
const StatCard = ({ icon, label, value, darkMode }) => (
    <div className={`rounded-xl p-4 border ${
        darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-black'
    }`}>
        <div className="mb-2 opacity-70">
            {icon}
        </div>
        <div className="text-xl font-bold font-mono mb-0.5">
            {value}
        </div>
        <div className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {label}
        </div>
    </div>
);

// Achievement Card Component
const AchievementCard = ({ achievement, unlocked, darkMode }) => {
    const handleShare = () => {
        const text = `🏆 I just unlocked the '${achievement.name}' achievement on Cognitrail - A Career Pathfinder! Check it out!`;
        const url = window.location.href;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    return (
        <div className={`rounded-xl p-4 border transition-all ${
            unlocked
                ? darkMode
                    ? 'bg-zinc-900 border-zinc-700 text-white'
                    : 'bg-zinc-50 border-zinc-300 text-black'
                : darkMode
                    ? 'bg-zinc-950 border-zinc-900 opacity-50'
                    : 'bg-zinc-100 border-zinc-200 opacity-50'
        }`}>
            <div className="flex items-start gap-3">
                <div className={`text-2xl ${unlocked ? '' : 'grayscale opacity-40'}`}>
                    {achievement.icon}
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-xs mb-0.5">
                        {achievement.name}
                    </h4>
                    <p className={`text-[11px] mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {achievement.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className={`text-xs font-mono font-bold ${
                            unlocked ? darkMode ? 'text-zinc-300' : 'text-zinc-800' : 'text-zinc-500'
                        }`}>
                            +{achievement.points} XP
                        </div>
                        {unlocked && (
                            <button
                                onClick={handleShare}
                                className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all btn-interactive border ${
                                    darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                                }`}
                            >
                                Share 🚀
                            </button>
                        )}
                    </div>
                </div>
                {unlocked && (
                    <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">
                        <Check className="w-3 h-3" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GamificationDashboard;