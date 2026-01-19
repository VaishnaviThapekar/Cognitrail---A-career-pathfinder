import React from 'react';
import { Trophy, Star, TrendingUp, Award, Zap, X } from 'lucide-react';
import { useGamification } from '../contexts/GamificationContext';

// Level Up Notification
export const LevelUpNotification = ({ darkMode }) => {
    const { showLevelUp, currentLevel } = useGamification();

    if (!showLevelUp) return null;

    return (
        <div className="fixed top-20 right-4 z-50 animate-bounce-in">
            <div className={`rounded-2xl p-6 shadow-2xl border-2 ${darkMode
                ? 'bg-gradient-to-br from-[#272757] to-[#505081] border-yellow-500'
                : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-400'
                }`}>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center">
                            <Trophy className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center">
                            <Star className="w-3 h-3 text-white fill-current" />
                        </div>
                    </div>

                    <div>
                        <h3 className={`text-xl font-black mb-1 ${darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                            Level Up! 🎉
                        </h3>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'
                            }`}>
                            You're now Level {currentLevel.level}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
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
        <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
            <div className={`rounded-2xl p-6 shadow-2xl border-2 ${darkMode
                ? 'bg-gradient-to-br from-[#1a1f2e] to-[#272757] border-[#8686AC]'
                : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-300'
                }`}>
                <div className="flex items-center gap-4">
                    <div className="text-5xl">{showAchievement.icon}</div>

                    <div>
                        <h3 className={`text-lg font-black mb-1 ${darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                            Achievement Unlocked!
                        </h3>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'
                            }`}>
                            {showAchievement.name}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            +{showAchievement.points} points
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
            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all hover:scale-105 ${darkMode
                ? 'bg-[#1a1f2e] border border-[#272757] hover:border-[#505081]'
                : 'bg-white border border-indigo-100 hover:border-indigo-300'
                }`}
        >
            {/* Level Badge */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${darkMode
                ? 'bg-gradient-to-br from-[#505081] to-[#8686AC] text-white'
                : 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white'
                }`}>
                {currentLevel.level}
            </div>

            {/* Progress Info */}
            <div className="text-left">
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Level {currentLevel.level}
                    </span>
                    <span className={`text-xs font-bold ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'
                        }`}>
                        {stats.totalPoints} pts
                    </span>
                </div>

                {/* Progress Bar */}
                <div className={`w-24 h-1.5 rounded-full mt-1 ${darkMode ? 'bg-[#272757]' : 'bg-gray-200'
                    }`}>
                    <div
                        className={`h-full rounded-full transition-all ${darkMode
                            ? 'bg-gradient-to-r from-[#505081] to-[#8686AC]'
                            : 'bg-gradient-to-r from-indigo-600 to-blue-600'
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
        <div className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50'
            }`}>
            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Your Progress
                    </h2>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-xl transition-colors ${darkMode ? 'bg-[#1a1f2e] hover:bg-[#272757]' : 'bg-white hover:bg-gray-100'
                            }`}
                    >
                        <X className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </button>
                </div>

                {/* Level & Points Card */}
                <div className={`rounded-3xl p-8 mb-8 ${darkMode
                    ? 'bg-gradient-to-br from-[#1a1f2e] to-[#272757] border-2 border-[#505081]'
                    : 'bg-gradient-to-br from-indigo-500 to-blue-600 border-2 border-indigo-300'
                    }`}>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-white text-4xl font-black mb-2">
                                Level {currentLevel.level}
                            </h3>
                            <p className="text-white/80 text-lg font-semibold">
                                {currentLevel.name}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-white text-3xl font-black">
                                {stats.totalPoints}
                            </div>
                            <div className="text-white/80 text-sm">Total Points</div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    {nextLevel && (
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-white/80 text-sm">
                                    Progress to Level {nextLevel.level}
                                </span>
                                <span className="text-white/80 text-sm">
                                    {Math.round(progressToNextLevel)}%
                                </span>
                            </div>
                            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white transition-all duration-500"
                                    style={{ width: `${progressToNextLevel}%` }}
                                />
                            </div>
                            <div className="text-white/60 text-xs mt-1">
                                {nextLevel.minPoints - stats.totalPoints} points to next level
                            </div>
                        </div>
                    )}
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        icon={<Trophy className="w-5 h-5" />}
                        label="Quizzes Taken"
                        value={stats.quizzesTaken}
                        darkMode={darkMode}
                    />
                    <StatCard
                        icon={<Star className="w-5 h-5" />}
                        label="Careers Explored"
                        value={stats.careersExplored}
                        darkMode={darkMode}
                    />
                    <StatCard
                        icon={<Zap className="w-5 h-5" />}
                        label="Current Streak"
                        value={`${stats.currentStreak} days`}
                        darkMode={darkMode}
                    />
                    <StatCard
                        icon={<Award className="w-5 h-5" />}
                        label="Achievements"
                        value={`${unlockedAchievements.length}/${unlockedAchievements.length + lockedAchievements.length}`}
                        darkMode={darkMode}
                    />
                </div>

                {/* Achievements */}
                <div className="mb-8">
                    <h3 className={`text-2xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Achievements
                    </h3>

                    {/* Unlocked */}
                    {unlockedAchievements.length > 0 && (
                        <div className="mb-6">
                            <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                Unlocked ({unlockedAchievements.length})
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
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
                            <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                Locked ({lockedAchievements.length})
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
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
    <div className={`rounded-2xl p-4 ${darkMode ? 'bg-[#1a1f2e] border border-[#272757]' : 'bg-white border border-indigo-100'
        }`}>
        <div className={`mb-2 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'}`}>
            {icon}
        </div>
        <div className={`text-2xl font-black mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {value}
        </div>
        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {label}
        </div>
    </div>
);

// Achievement Card Component
const AchievementCard = ({ achievement, unlocked, darkMode }) => (
    <div className={`rounded-2xl p-4 ${unlocked
        ? darkMode
            ? 'bg-gradient-to-br from-[#272757] to-[#505081] border-2 border-[#8686AC]'
            : 'bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-300'
        : darkMode
            ? 'bg-[#1a1f2e] border border-[#272757] opacity-60'
            : 'bg-gray-50 border border-gray-200 opacity-60'
        }`}>
        <div className="flex items-start gap-3">
            <div className={`text-3xl ${unlocked ? '' : 'grayscale'}`}>
                {achievement.icon}
            </div>
            <div className="flex-1">
                <h4 className={`font-black mb-1 ${unlocked
                    ? darkMode ? 'text-white' : 'text-gray-900'
                    : darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                    {achievement.name}
                </h4>
                <p className={`text-xs mb-2 ${unlocked
                    ? darkMode ? 'text-gray-300' : 'text-gray-600'
                    : darkMode ? 'text-gray-600' : 'text-gray-500'
                    }`}>
                    {achievement.description}
                </p>
                <div className={`text-xs font-bold ${unlocked
                    ? darkMode ? 'text-yellow-400' : 'text-yellow-600'
                    : darkMode ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                    +{achievement.points} points
                </div>
            </div>
            {unlocked && (
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                </div>
            )}
        </div>
    </div>
);

export default GamificationDashboard;