import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('cognitrial_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error loading user:', error);
                localStorage.removeItem('cognitrial_user');
            }
        }
        setLoading(false);
    }, []);

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('cognitrial_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('cognitrial_user');
        }
    }, [user]);

    // Sign Up function
    const signUp = (userData) => {
        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString(),
            avatar: generateAvatar(userData.name),
            stats: {
                quizzesTaken: 0,
                careersExplored: 0,
                hoursLearned: 0,
                achievementsUnlocked: 0,
            },
            savedCareers: [],
            preferences: {
                theme: 'light',
                notifications: true,
            }
        };

        // Save to users database
        const users = JSON.parse(localStorage.getItem('cognitrial_users') || '[]');
        users.push(newUser);
        localStorage.setItem('cognitrial_users', JSON.stringify(users));

        setUser(newUser);
        return { success: true, user: newUser };
    };

    // Sign In function
    const signIn = (email, password) => {
        const users = JSON.parse(localStorage.getItem('cognitrial_users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            // Update last login
            foundUser.lastLogin = new Date().toISOString();

            // Update users array
            const updatedUsers = users.map(u => u.id === foundUser.id ? foundUser : u);
            localStorage.setItem('cognitrial_users', JSON.stringify(updatedUsers));

            setUser(foundUser);
            return { success: true, user: foundUser };
        }

        return { success: false, error: 'Invalid email or password' };
    };

    // Sign Out function
    const signOut = () => {
        setUser(null);
        localStorage.removeItem('cognitrial_user');
    };

    // Update user profile
    const updateProfile = (updates) => {
        const updatedUser = { ...user, ...updates };

        // Update in users database
        const users = JSON.parse(localStorage.getItem('cognitrial_users') || '[]');
        const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
        localStorage.setItem('cognitrial_users', JSON.stringify(updatedUsers));

        setUser(updatedUser);
        return { success: true, user: updatedUser };
    };

    // Update user stats
    const updateStats = (statUpdates) => {
        const updatedUser = {
            ...user,
            stats: { ...user.stats, ...statUpdates }
        };

        const users = JSON.parse(localStorage.getItem('cognitrial_users') || '[]');
        const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
        localStorage.setItem('cognitrial_users', JSON.stringify(updatedUsers));

        setUser(updatedUser);
    };

    // Save career
    const saveCareer = (career) => {
        const savedCareers = user.savedCareers || [];

        // Check if already saved
        if (savedCareers.some(c => c.id === career.id)) {
            return { success: false, error: 'Career already saved' };
        }

        const updatedUser = {
            ...user,
            savedCareers: [...savedCareers, { ...career, savedAt: new Date().toISOString() }]
        };

        const users = JSON.parse(localStorage.getItem('cognitrial_users') || '[]');
        const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
        localStorage.setItem('cognitrial_users', JSON.stringify(updatedUsers));

        setUser(updatedUser);
        return { success: true };
    };

    // Remove saved career
    const removeSavedCareer = (careerId) => {
        const updatedUser = {
            ...user,
            savedCareers: user.savedCareers.filter(c => c.id !== careerId)
        };

        const users = JSON.parse(localStorage.getItem('cognitrial_users') || '[]');
        const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
        localStorage.setItem('cognitrial_users', JSON.stringify(updatedUsers));

        setUser(updatedUser);
    };

    // Generate avatar from name
    const generateAvatar = (name) => {
        const colors = [
            'bg-gradient-to-br from-purple-500 to-pink-500',
            'bg-gradient-to-br from-blue-500 to-cyan-500',
            'bg-gradient-to-br from-green-500 to-teal-500',
            'bg-gradient-to-br from-orange-500 to-red-500',
            'bg-gradient-to-br from-indigo-500 to-purple-500',
        ];
        const initials = name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

        return {
            initials,
            color: colors[Math.floor(Math.random() * colors.length)]
        };
    };

    const value = {
        user,
        loading,
        signUp,
        signIn,
        signOut,
        updateProfile,
        updateStats,
        saveCareer,
        removeSavedCareer,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthContext;