import React, { useState } from 'react';
import {
    X, User, Mail, Calendar, MapPin, Briefcase, GraduationCap,
    Trophy, Target, BookOpen, Star, Edit2, Save, LogOut, Settings,
    TrendingUp, Clock, Award, Heart, Bookmark, BarChart3, Camera,
    Shield, Bell, Eye, Lock, Trash2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGamification } from '../contexts/GamificationContext';

export default function AdvancedProfilePage({ darkMode, onClose }) {
    const { user, signOut, updateProfile } = useAuth();
    const { level, points, achievements } = useGamification();

    const [activeTab, setActiveTab] = useState('overview'); // overview, activity, settings
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({
        name: user?.name || '',
        email: user?.email || '',
        location: user?.location || '',
        education: user?.education || '',
        occupation: user?.occupation || '',
        bio: user?.bio || '',
    });

    if (!user) return null;

    const handleSaveProfile = () => {
        updateProfile(editedProfile);
        setIsEditing(false);
    };

    const handleSignOut = () => {
        signOut();
        onClose();
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'activity', label: 'Activity', icon: TrendingUp },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in">
            <div
                className={`relative w-full max-w-5xl rounded-2xl shadow-2xl my-8 border transition-all ${
                    darkMode ? 'bg-[#121215] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'
                }`}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className={`absolute top-6 right-6 p-2 rounded-xl border transition-all z-10 btn-interactive ${
                        darkMode
                            ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                            : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black'
                    }`}
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Profile Header */}
                <div className={`relative p-8 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-black ${
                                user.avatar?.color || 'bg-zinc-900 text-white border border-zinc-700'
                            }`}>
                                {user.avatar?.initials || user.name.substring(0, 2).toUpperCase()}
                            </div>

                            {/* Level badge */}
                            <div className="absolute -bottom-2 -right-2 bg-black text-white dark:bg-white dark:text-black border border-zinc-700 text-xs font-bold px-2.5 py-0.5 rounded-full shadow-lg">
                                Lvl {level}
                            </div>
                        </div>

                        {/* User info */}
                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedProfile.name}
                                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                                    className={`text-2xl font-black mb-2 w-full px-3 py-1.5 rounded-xl border outline-none ${
                                        darkMode
                                            ? 'bg-zinc-900 border-zinc-700 text-white'
                                            : 'bg-zinc-50 border-zinc-300 text-black'
                                    }`}
                                />
                            ) : (
                                <h2 className="text-2xl font-black mb-1.5 tracking-tight">
                                    {user.name}
                                </h2>
                            )}

                            <div className="flex flex-wrap gap-3 mb-4">
                                <span className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                    <Mail className="w-3.5 h-3.5" />
                                    {user.email}
                                </span>
                                {user.location && (
                                    <span className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                        <MapPin className="w-3.5 h-3.5" />
                                        {user.location}
                                    </span>
                                )}
                                <span className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                    <Calendar className="w-3.5 h-3.5" />
                                    Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </span>
                            </div>

                            {/* Quick stats */}
                            <div className="flex flex-wrap gap-3">
                                <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border ${
                                    darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                                }`}>
                                    <Trophy className="w-4 h-4 opacity-70" />
                                    <div>
                                        <p className={`text-[10px] uppercase font-bold tracking-wider ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Level</p>
                                        <p className="text-sm font-bold font-mono">{level}</p>
                                    </div>
                                </div>

                                <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border ${
                                    darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                                }`}>
                                    <Star className="w-4 h-4 opacity-70" />
                                    <div>
                                        <p className={`text-[10px] uppercase font-bold tracking-wider ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Points</p>
                                        <p className="text-sm font-bold font-mono">{points}</p>
                                    </div>
                                </div>

                                <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border ${
                                    darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                                }`}>
                                    <Award className="w-4 h-4 opacity-70" />
                                    <div>
                                        <p className={`text-[10px] uppercase font-bold tracking-wider ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Achievements</p>
                                        <p className="text-sm font-bold font-mono">{achievements?.length || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSaveProfile}
                                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all btn-interactive ${
                                            darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                                        }`}
                                    >
                                        <Save className="w-3.5 h-3.5" />
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border btn-interactive ${
                                            darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                                        }`}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all btn-interactive ${
                                            darkMode ? 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800' : 'bg-zinc-100 border-zinc-200 text-black hover:bg-zinc-200'
                                        }`}
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={handleSignOut}
                                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all btn-interactive ${
                                            darkMode ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20' : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                                        }`}
                                    >
                                        <LogOut className="w-3.5 h-3.5" />
                                        Sign Out
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className={`flex gap-1 px-8 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isSelected = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all relative ${
                                    isSelected
                                        ? darkMode
                                            ? 'text-white border-b-2 border-white'
                                            : 'text-black border-b-2 border-black'
                                        : darkMode
                                            ? 'text-zinc-500 hover:text-zinc-300'
                                            : 'text-zinc-500 hover:text-zinc-800'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tab content */}
                <div className="p-8 max-h-[60vh] overflow-y-auto">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6 animate-fade-in">
                            {/* Bio */}
                            <div>
                                <h3 className="text-base font-bold mb-2">
                                    About Me
                                </h3>
                                {isEditing ? (
                                    <textarea
                                        value={editedProfile.bio}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                                        placeholder="Tell us about yourself..."
                                        rows={3}
                                        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none ${
                                            darkMode
                                                ? 'bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500'
                                                : 'bg-zinc-50 border-zinc-300 text-black placeholder-zinc-400'
                                        }`}
                                    />
                                ) : (
                                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                        {user.bio || 'No bio added yet. Click "Edit" to configure your professional profile.'}
                                    </p>
                                )}
                            </div>

                            {/* Stats grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                                <div className={`p-4 rounded-xl border ${
                                    darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                                }`}>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-xl border border-current opacity-70">
                                            <Target className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold font-mono">
                                                {user.stats?.quizzesTaken || 0}
                                            </p>
                                            <p className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Quizzes Completed</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={`p-4 rounded-xl border ${
                                    darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                                }`}>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-xl border border-current opacity-70">
                                            <Briefcase className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold font-mono">
                                                {user.stats?.careersExplored || 0}
                                            </p>
                                            <p className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Careers Explored</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={`p-4 rounded-xl border ${
                                    darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                                }`}>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-xl border border-current opacity-70">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold font-mono">
                                                {user.stats?.hoursLearned || 0}h
                                            </p>
                                            <p className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Hours Invested</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Saved Careers */}
                            <div>
                                <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                                    <Bookmark className="w-4 h-4 opacity-70" />
                                    Saved Careers ({user.savedCareers?.length || 0})
                                </h3>
                                {user.savedCareers && user.savedCareers.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {user.savedCareers.slice(0, 4).map((career, idx) => (
                                            <div
                                                key={idx}
                                                className={`p-3.5 rounded-xl border ${
                                                    darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h4 className="font-bold text-xs">
                                                            {career.name}
                                                        </h4>
                                                        <p className={`text-[10px] font-mono ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                                            Saved {new Date(career.savedAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <Heart className="w-4 h-4 fill-current opacity-70" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                        No saved careers yet. Explore careers to bookmark them.
                                    </p>
                                )}
                            </div>

                            {/* Achievements */}
                            <div>
                                <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                                    <Trophy className="w-4 h-4 opacity-70" />
                                    Recent Achievements
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {achievements?.slice(0, 4).map((achievement, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-3.5 rounded-xl text-center border ${
                                                darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                                            }`}
                                        >
                                            <div className="text-2xl mb-1">{achievement.icon}</div>
                                            <p className="text-xs font-bold">
                                                {achievement.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Activity Tab */}
                    {activeTab === 'activity' && (
                        <div className="space-y-4 animate-fade-in">
                            <h3 className="text-base font-bold">
                                Recent Activity
                            </h3>
                            <div className={`p-8 rounded-xl border text-center ${
                                darkMode ? 'bg-zinc-900/40 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-500'
                            }`}>
                                <p className="text-xs">Your career exploration history will update dynamically as you take quizzes and interact with tools.</p>
                            </div>
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div className="space-y-6 animate-fade-in">
                            <div>
                                <h3 className="text-base font-bold mb-4">
                                    Account Settings
                                </h3>

                                <div className="space-y-3">
                                    <div className={`p-4 rounded-xl border ${
                                        darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                                    }`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Bell className="w-4 h-4 opacity-70" />
                                                <div>
                                                    <p className="font-bold text-xs">Notifications</p>
                                                    <p className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Receive updates and reminders</p>
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-9 h-5 bg-zinc-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={`p-4 rounded-xl border ${
                                        darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                                    }`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Eye className="w-4 h-4 opacity-70" />
                                                <div>
                                                    <p className="font-bold text-xs">Profile Visibility</p>
                                                    <p className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Control who can see your portfolio</p>
                                                </div>
                                            </div>
                                            <select className={`px-2.5 py-1 text-xs rounded-lg border outline-none ${
                                                darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-black'
                                            }`}>
                                                <option>Public</option>
                                                <option>Private</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all btn-interactive ${
                                        darkMode
                                            ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
                                            : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                                    }`}>
                                        <div className="flex items-center gap-3">
                                            <Trash2 className="w-4 h-4" />
                                            <div className="text-left">
                                                <p className="font-bold text-xs">Delete Account</p>
                                                <p className="text-[11px] opacity-70">Permanently delete account and all saved quiz paths</p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}