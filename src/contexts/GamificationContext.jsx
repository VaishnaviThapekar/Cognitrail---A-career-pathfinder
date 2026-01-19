import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Gamification Context
const GamificationContext = createContext();

// Points system
const POINTS = {
    QUIZ_COMPLETE: 100,
    CAREER_EXPLORED: 10,
    CAREER_SAVED: 5,
    NEWS_READ: 5,
    DAILY_LOGIN: 20,
    PROFILE_COMPLETE: 50,
    STREAK_BONUS: 50,
    CHAT_QUESTION: 3,
    NEWS_SHARED: 10,
};

// Level thresholds
const LEVELS = [
    { level: 1, name: 'Beginner Explorer', minPoints: 0, maxPoints: 99 },
    { level: 2, name: 'Career Seeker', minPoints: 100, maxPoints: 249 },
    { level: 3, name: 'Path Finder', minPoints: 250, maxPoints: 499 },
    { level: 4, name: 'Goal Oriented', minPoints: 500, maxPoints: 999 },
    { level: 5, name: 'Career Expert', minPoints: 1000, maxPoints: 1999 },
    { level: 6, name: 'Career Master', minPoints: 2000, maxPoints: 3999 },
    { level: 7, name: 'Career Guru', minPoints: 4000, maxPoints: 7999 },
    { level: 8, name: 'Career Legend', minPoints: 8000, maxPoints: 15999 },
    { level: 9, name: 'Career Champion', minPoints: 16000, maxPoints: 31999 },
    { level: 10, name: 'Career Titan', minPoints: 32000, maxPoints: Infinity },
];

// Achievements
const ACHIEVEMENTS = [
    {
        id: 'first_quiz',
        name: 'Quiz Master',
        description: 'Complete your first career quiz',
        icon: '🎯',
        points: POINTS.QUIZ_COMPLETE,
        condition: (stats) => stats.quizzesTaken >= 1,
    },
    {
        id: 'explorer_10',
        name: 'Career Explorer',
        description: 'Explore 10 different careers',
        icon: '🔍',
        points: 50,
        condition: (stats) => stats.careersExplored >= 10,
    },
    {
        id: 'bookworm',
        name: 'Bookworm',
        description: 'Save 5 careers to your profile',
        icon: '📚',
        points: 30,
        condition: (stats) => stats.careersSaved >= 5,
    },
    {
        id: 'news_reader',
        name: 'Stay Updated',
        description: 'Read 10 news articles',
        icon: '📰',
        points: 40,
        condition: (stats) => stats.newsRead >= 10,
    },
    {
        id: 'week_streak',
        name: 'Dedicated Learner',
        description: 'Maintain a 7-day login streak',
        icon: '🔥',
        points: 100,
        condition: (stats) => stats.currentStreak >= 7,
    },
    {
        id: 'profile_pro',
        name: 'Profile Pro',
        description: 'Complete your profile 100%',
        icon: '👤',
        points: POINTS.PROFILE_COMPLETE,
        condition: (stats) => stats.profileComplete === true,
    },
    {
        id: 'social_sharer',
        name: 'Social Butterfly',
        description: 'Share 5 careers or news',
        icon: '🦋',
        points: 50,
        condition: (stats) => stats.itemsShared >= 5,
    },
    {
        id: 'chatty',
        name: 'Curious Mind',
        description: 'Ask 20 questions in chatbot',
        icon: '💬',
        points: 60,
        condition: (stats) => stats.chatQuestions >= 20,
    },
    {
        id: 'early_bird',
        name: 'Early Bird',
        description: 'Login before 8 AM',
        icon: '🌅',
        points: 25,
        condition: (stats) => stats.earlyLogin === true,
    },
    {
        id: 'night_owl',
        name: 'Night Owl',
        description: 'Login after 10 PM',
        icon: '🦉',
        points: 25,
        condition: (stats) => stats.lateLogin === true,
    },
];

// Hook to use gamification context
export function useGamification() {
    const context = useContext(GamificationContext);
    if (!context) {
        throw new Error('useGamification must be used within GamificationProvider');
    }
    return context;
}

export function GamificationProvider({ children }) {
    // Load from localStorage or initialize
    const loadStats = () => {
        const saved = localStorage.getItem('gamification_stats');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            totalPoints: 0,
            currentLevel: 1,
            quizzesTaken: 0,
            careersExplored: 0,
            careersSaved: 0,
            newsRead: 0,
            currentStreak: 0,
            longestStreak: 0,
            lastLoginDate: null,
            profileComplete: false,
            itemsShared: 0,
            chatQuestions: 0,
            earlyLogin: false,
            lateLogin: false,
            unlockedAchievements: [],
        };
    };

    const [stats, setStats] = useState(loadStats);
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [showAchievement, setShowAchievement] = useState(null);

    // Save to localStorage whenever stats change
    useEffect(() => {
        localStorage.setItem('gamification_stats', JSON.stringify(stats));
    }, [stats]);

    // Check login streak
    useEffect(() => {
        const today = new Date().toDateString();
        const lastLogin = stats.lastLoginDate;

        if (lastLogin !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();

            let newStreak = 1;
            if (lastLogin === yesterdayStr) {
                newStreak = stats.currentStreak + 1;
            }

            // Check time for early bird / night owl
            const hour = new Date().getHours();
            const isEarlyBird = hour < 8;
            const isNightOwl = hour >= 22;

            setStats(prev => ({
                ...prev,
                currentStreak: newStreak,
                longestStreak: Math.max(newStreak, prev.longestStreak),
                lastLoginDate: today,
                totalPoints: prev.totalPoints + POINTS.DAILY_LOGIN,
                earlyLogin: prev.earlyLogin || isEarlyBird,
                lateLogin: prev.lateLogin || isNightOwl,
            }));

            // Streak bonus
            if (newStreak % 7 === 0) {
                addPoints(POINTS.STREAK_BONUS, 'Weekly streak bonus!');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Calculate current level
    const getCurrentLevel = (points) => {
        return LEVELS.find(level => points >= level.minPoints && points <= level.maxPoints) || LEVELS[0];
    };

    // Add points and check for level up
    const addPoints = (points) => {
        setStats(prev => {
            const newPoints = prev.totalPoints + points;
            const oldLevel = getCurrentLevel(prev.totalPoints);
            const newLevel = getCurrentLevel(newPoints);

            // Check for level up
            if (newLevel.level > oldLevel.level) {
                setShowLevelUp(true);
                setTimeout(() => setShowLevelUp(false), 5000);
            }

            return {
                ...prev,
                totalPoints: newPoints,
                currentLevel: newLevel.level,
            };
        });

        // Check for new achievements
        checkAchievements();
    };

    // Check and unlock achievements
    const checkAchievements = () => {
        ACHIEVEMENTS.forEach(achievement => {
            if (!stats.unlockedAchievements.includes(achievement.id)) {
                if (achievement.condition(stats)) {
                    unlockAchievement(achievement);
                }
            }
        });
    };

    // Unlock achievement
    const unlockAchievement = (achievement) => {
        setStats(prev => ({
            ...prev,
            unlockedAchievements: [...prev.unlockedAchievements, achievement.id],
            totalPoints: prev.totalPoints + achievement.points,
        }));

        setShowAchievement(achievement);
        setTimeout(() => setShowAchievement(null), 5000);
    };

    // Action trackers
    const trackQuizComplete = () => {
        setStats(prev => ({ ...prev, quizzesTaken: prev.quizzesTaken + 1 }));
        addPoints(POINTS.QUIZ_COMPLETE);
    };

    const trackCareerExplored = () => {
        setStats(prev => ({ ...prev, careersExplored: prev.careersExplored + 1 }));
        addPoints(POINTS.CAREER_EXPLORED);
    };

    const trackCareerSaved = () => {
        setStats(prev => ({ ...prev, careersSaved: prev.careersSaved + 1 }));
        addPoints(POINTS.CAREER_SAVED);
    };

    const trackNewsRead = () => {
        setStats(prev => ({ ...prev, newsRead: prev.newsRead + 1 }));
        addPoints(POINTS.NEWS_READ);
    };

    const trackChatQuestion = () => {
        setStats(prev => ({ ...prev, chatQuestions: prev.chatQuestions + 1 }));
        addPoints(POINTS.CHAT_QUESTION);
    };

    const trackItemShared = () => {
        setStats(prev => ({ ...prev, itemsShared: prev.itemsShared + 1 }));
        addPoints(POINTS.NEWS_SHARED);
    };

    const trackProfileComplete = () => {
        setStats(prev => ({ ...prev, profileComplete: true }));
        addPoints(POINTS.PROFILE_COMPLETE);
    };

    // Get progress to next level
    const getProgressToNextLevel = () => {
        const currentLevel = getCurrentLevel(stats.totalPoints);
        const nextLevel = LEVELS.find(l => l.level === currentLevel.level + 1);

        if (!nextLevel) return 100; // Max level

        const pointsInCurrentLevel = stats.totalPoints - currentLevel.minPoints;
        const pointsNeededForNextLevel = nextLevel.minPoints - currentLevel.minPoints;

        return Math.min(100, (pointsInCurrentLevel / pointsNeededForNextLevel) * 100);
    };

    // Get unlocked achievements
    const getUnlockedAchievements = () => {
        return ACHIEVEMENTS.filter(a => stats.unlockedAchievements.includes(a.id));
    };

    // Get locked achievements
    const getLockedAchievements = () => {
        return ACHIEVEMENTS.filter(a => !stats.unlockedAchievements.includes(a.id));
    };

    const value = {
        stats,
        currentLevel: getCurrentLevel(stats.totalPoints),
        progressToNextLevel: getProgressToNextLevel(),
        unlockedAchievements: getUnlockedAchievements(),
        lockedAchievements: getLockedAchievements(),
        showLevelUp,
        showAchievement,
        trackQuizComplete,
        trackCareerExplored,
        trackCareerSaved,
        trackNewsRead,
        trackChatQuestion,
        trackItemShared,
        trackProfileComplete,
        addPoints,
        POINTS,
        LEVELS,
        ACHIEVEMENTS,
    };

    return (
        <GamificationContext.Provider value={value}>
            {children}
        </GamificationContext.Provider>
    );
}