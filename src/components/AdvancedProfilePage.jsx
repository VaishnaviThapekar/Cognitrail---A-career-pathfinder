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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div
                className={`relative w-full max-w-5xl rounded-2xl shadow-2xl my-8 ${darkMode ? 'bg-[#1a1f2e]' : 'bg-white'
                    }`}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className={`absolute top-6 right-6 p-2 rounded-xl transition-all z-10 ${darkMode
                        ? 'hover:bg-[#272757] text-gray-400 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                        }`}
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Profile Header */}
                <div className={`relative p-8 border-b ${darkMode ? 'border-[#272757]' : 'border-gray-200'}`}>
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-t-2xl"></div>

                    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-black text-white ${user.avatar?.color || 'bg-gradient-to-br from-indigo-500 to-purple-600'
                                }`}>
                                {user.avatar?.initials || user.name.substring(0, 2).toUpperCase()}
                            </div>

                            {/* Upload button (hover) */}
                            <button className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Camera className="w-6 h-6 text-white" />
                            </button>

                            {/* Level badge */}
                            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
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
                                    className={`text-3xl font-black mb-2 w-full px-3 py-2 rounded-xl border-2 ${darkMode
                                        ? 'bg-[#272757] border-[#505081] text-white'
                                        : 'bg-gray-50 border-gray-200 text-gray-900'
                                        }`}
                                />
                            ) : (
                                <h2 className={`text-3xl font-black mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {user.name}
                                </h2>
                            )}

                            <div className="flex flex-wrap gap-3 mb-4">
                                <span className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    <Mail className="w-4 h-4" />
                                    {user.email}
                                </span>
                                {user.location && (
                                    <span className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <MapPin className="w-4 h-4" />
                                        {user.location}
                                    </span>
                                )}
                                <span className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    <Calendar className="w-4 h-4" />
                                    Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </span>
                            </div>

                            {/* Quick stats */}
                            <div className="flex flex-wrap gap-4">
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${darkMode ? 'bg-[#272757]' : 'bg-indigo-50'
                                    }`}>
                                    <Trophy className="w-5 h-5 text-yellow-500" />
                                    <div>
                                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Level</p>
                                        <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{level}</p>
                                    </div>
                                </div>

                                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${darkMode ? 'bg-[#272757]' : 'bg-purple-50'
                                    }`}>
                                    <Star className="w-5 h-5 text-purple-500" />
                                    <div>
                                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Points</p>
                                        <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{points}</p>
                                    </div>
                                </div>

                                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${darkMode ? 'bg-[#272757]' : 'bg-green-50'
                                    }`}>
                                    <Award className="w-5 h-5 text-green-500" />
                                    <div>
                                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Achievements</p>
                                        <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{achievements?.length || 0}</p>
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
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className={`px-4 py-2 rounded-xl font-semibold ${darkMode
                                            ? 'bg-[#272757] hover:bg-[#505081] text-white'
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                            }`}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ${darkMode
                                            ? 'bg-[#272757] hover:bg-[#505081] text-white'
                                            : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
                                            }`}
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit Profile
                                    </button>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold hover:from-red-600 hover:to-pink-700 transition-all"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className={`flex gap-1 px-8 border-b ${darkMode ? 'border-[#272757]' : 'border-gray-200'}`}>
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all relative ${activeTab === tab.id
                                    ? darkMode
                                        ? 'text-indigo-400'
                                        : 'text-indigo-600'
                                    : darkMode
                                        ? 'text-gray-400 hover:text-gray-300'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {tab.label}

                                {/* Active indicator */}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Tab content */}
                <div className="p-8 max-h-[60vh] overflow-y-auto">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Bio */}
                            <div>
                                <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    About Me
                                </h3>
                                {isEditing ? (
                                    <textarea
                                        value={editedProfile.bio}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                                        placeholder="Tell us about yourself..."
                                        rows={4}
                                        className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode
                                            ? 'bg-[#272757] border-[#505081] text-white placeholder-gray-500'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                            }`}
                                    />
                                ) : (
                                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {user.bio || 'No bio added yet. Click "Edit Profile" to add one!'}
                                    </p>
                                )}
                            </div>

                            {/* Stats grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className={`p-6 rounded-xl border-2 ${darkMode ? 'bg-[#272757] border-[#505081]' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-indigo-100'
                                    }`}>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-3 rounded-xl bg-blue-500/10">
                                            <Target className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {user.stats?.quizzesTaken || 0}
                                            </p>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Quizzes Taken</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={`p-6 rounded-xl border-2 ${darkMode ? 'bg-[#272757] border-[#505081]' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100'
                                    }`}>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-3 rounded-xl bg-purple-500/10">
                                            <Briefcase className="w-6 h-6 text-purple-500" />
                                        </div>
                                        <div>
                                            <p className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {user.stats?.careersExplored || 0}
                                            </p>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Careers Explored</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={`p-6 rounded-xl border-2 ${darkMode ? 'bg-[#272757] border-[#505081]' : 'bg-gradient-to-br from-green-50 to-teal-50 border-green-100'
                                    }`}>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-3 rounded-xl bg-green-500/10">
                                            <Clock className="w-6 h-6 text-green-500" />
                                        </div>
                                        <div>
                                            <p className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {user.stats?.hoursLearned || 0}h
                                            </p>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hours Learned</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Saved Careers */}
                            <div>
                                <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    <Bookmark className="w-5 h-5" />
                                    Saved Careers ({user.savedCareers?.length || 0})
                                </h3>
                                {user.savedCareers && user.savedCareers.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {user.savedCareers.slice(0, 4).map((career, idx) => (
                                            <div
                                                key={idx}
                                                className={`p-4 rounded-xl border ${darkMode ? 'bg-[#272757] border-[#505081]' : 'bg-gray-50 border-gray-200'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                            {career.name}
                                                        </h4>
                                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                            Saved {new Date(career.savedAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        No saved careers yet. Start exploring!
                                    </p>
                                )}
                            </div>

                            {/* Achievements */}
                            <div>
                                <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    <Trophy className="w-5 h-5" />
                                    Recent Achievements
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {achievements?.slice(0, 4).map((achievement, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-4 rounded-xl text-center border ${darkMode ? 'bg-[#272757] border-[#505081]' : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
                                                }`}
                                        >
                                            <div className="text-4xl mb-2">{achievement.icon}</div>
                                            <p className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
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
                        <div className="space-y-4">
                            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Recent Activity
                            </h3>
                            <div className="space-y-3">
                                <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Your activity history will appear here as you use the platform!
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Account Settings
                                </h3>

                                <div className="space-y-3">
                                    <div className={`p-4 rounded-xl border ${darkMode ? 'bg-[#272757] border-[#505081]' : 'bg-gray-50 border-gray-200'}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Bell className="w-5 h-5 text-indigo-500" />
                                                <div>
                                                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</p>
                                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Receive updates and reminders</p>
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={`p-4 rounded-xl border ${darkMode ? 'bg-[#272757] border-[#505081]' : 'bg-gray-50 border-gray-200'}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Eye className="w-5 h-5 text-indigo-500" />
                                                <div>
                                                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Profile Visibility</p>
                                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Control who can see your profile</p>
                                                </div>
                                            </div>
                                            <select className={`px-3 py-1 rounded-lg border ${darkMode ? 'bg-[#1a1f2e] border-[#505081] text-white' : 'bg-white border-gray-300'
                                                }`}>
                                                <option>Public</option>
                                                <option>Private</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button className={`w-full p-4 rounded-xl border flex items-center justify-between ${darkMode
                                        ? 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20'
                                        : 'bg-red-50 border-red-200 hover:bg-red-100'
                                        }`}>
                                        <div className="flex items-center gap-3">
                                            <Trash2 className="w-5 h-5 text-red-500" />
                                            <div className="text-left">
                                                <p className="font-semibold text-red-600">Delete Account</p>
                                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Permanently delete your account and data</p>
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