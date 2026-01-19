import React, { useState } from 'react';
import {
  X, Edit, Save, Upload, Mail, MapPin, Sparkles, Bookmark,
  Eye, Activity, CheckCircle2, Shield, Calendar, Award, Target, TrendingUp,
  Zap, Heart, Star, Trophy, Flame, Brain, Rocket, Crown
} from 'lucide-react';

const ProfilePage = ({ userProfile, setUserProfile, onClose, darkMode, savedCareers }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);
  const [activeTab, setActiveTab] = useState('overview'); // overview, journey, achievements

  const handleSave = () => {
    setUserProfile(formData);
    setEditing(false);
  };

  // Stats data
  const stats = [
    { id: 1, label: 'Careers Explored', value: 47, icon: Eye, color: 'indigo', change: '+12' },
    { id: 2, label: 'Saved Careers', value: savedCareers?.length || 5, icon: Bookmark, color: 'purple', change: '+3' },
    { id: 3, label: 'Days Active', value: 24, icon: Activity, color: 'blue', change: '+24' },
    { id: 4, label: 'Profile Strength', value: formData.profileComplete || 45, icon: TrendingUp, color: 'teal', change: '+15%' }
  ];

  // Achievement badges
  const achievements = [
    { id: 1, name: 'Early Bird', icon: '🌅', unlocked: true, description: 'Logged in before 8 AM' },
    { id: 2, name: 'Career Explorer', icon: '🔍', unlocked: true, description: 'Explored 10+ careers' },
    { id: 3, name: 'Quiz Master', icon: '🎯', unlocked: true, description: 'Completed career quiz' },
    { id: 4, name: 'Bookworm', icon: '📚', unlocked: savedCareers?.length >= 5, description: 'Saved 5 careers' },
    { id: 5, name: 'Dedicated', icon: '🔥', unlocked: false, description: '7-day streak' },
    { id: 6, name: 'Social Star', icon: '⭐', unlocked: false, description: 'Shared 5 careers' }
  ];

  // Career journey milestones
  const journeyMilestones = [
    { id: 1, title: 'Started Journey', date: 'Dec 24, 2024', completed: true, icon: Rocket },
    { id: 2, title: 'Completed Quiz', date: 'Dec 25, 2024', completed: true, icon: CheckCircle2 },
    { id: 3, title: 'Explored 10 Careers', date: 'Dec 28, 2024', completed: true, icon: Eye },
    { id: 4, title: 'Saved 5 Careers', date: 'Jan 2, 2025', completed: true, icon: Bookmark },
    { id: 5, title: 'Compare Careers', date: 'Pending', completed: false, icon: Target },
    { id: 6, title: 'Apply to College', date: 'Pending', completed: false, icon: Award }
  ];

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto transition-colors duration-500 ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50'
      }`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header with 3D Avatar */}
        <div className="relative mb-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-0 right-0 p-2 rounded-xl transition-all duration-300 z-20 ${darkMode
              ? 'bg-[#1a1f2e] hover:bg-[#272757]'
              : 'bg-white hover:bg-indigo-50 shadow-lg'
              }`}
          >
            <X className={`w-6 h-6 ${darkMode ? 'text-[#8686AC]' : 'text-gray-600'}`} />
          </button>

          {/* Profile Hero Section */}
          <div className={`rounded-3xl p-8 relative overflow-hidden ${darkMode
            ? 'bg-gradient-to-br from-[#1a1f2e] to-[#272757] border border-[#505081]'
            : 'bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 shadow-xl'
            }`}>
            {/* Animated Background Orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* 3D Avatar */}
              <div className="relative group">
                <div className={`w-32 h-32 rounded-3xl flex items-center justify-center text-6xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${darkMode
                  ? 'bg-gradient-to-br from-[#505081] to-[#8686AC] shadow-2xl shadow-[#505081]/50'
                  : 'bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl shadow-indigo-300'
                  }`}>
                  {editing ? '✏️' : '👤'}
                </div>
                <div className={`absolute inset-0 rounded-3xl border-4 ${darkMode ? 'border-[#8686AC]/30' : 'border-indigo-400/30'
                  } animate-ping-slow`}></div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                {editing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`text-4xl font-black mb-2 bg-transparent border-b-2 outline-none transition-colors w-full ${darkMode
                      ? 'text-white border-[#505081] focus:border-[#8686AC]'
                      : 'text-gray-900 border-indigo-300 focus:border-indigo-600'
                      }`}
                  />
                ) : (
                  <h1 className={`text-4xl font-black mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {formData.name}
                  </h1>
                )}

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 ${darkMode ? 'bg-indigo-900/30 text-indigo-400' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                    <Calendar className="w-4 h-4" />
                    {formData.grade}
                  </span>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 ${darkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'
                    }`}>
                    <MapPin className="w-4 h-4" />
                    {formData.location}
                  </span>
                </div>

                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{formData.email}</span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => editing ? handleSave() : setEditing(true)}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 transform hover:scale-105 ${darkMode
                  ? 'bg-gradient-to-r from-[#505081] to-[#8686AC] hover:from-[#8686AC] hover:to-[#505081] text-white shadow-lg shadow-[#505081]/50'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-300'
                  }`}
              >
                {editing ? <><Save className="w-5 h-5" /> Save</> : <><Edit className="w-5 h-5" /> Edit</>}
              </button>
            </div>
          </div>
        </div>

        {/* Animated Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className={`group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${darkMode
                  ? 'bg-[#1a1f2e] border border-[#272757] hover:border-[#505081]'
                  : 'bg-white border border-indigo-100 hover:border-indigo-300'
                  }`}
              >
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl ${stat.color === 'indigo' ? 'bg-indigo-500/20' :
                  stat.color === 'purple' ? 'bg-purple-500/20' :
                    stat.color === 'blue' ? 'bg-blue-500/20' :
                      'bg-teal-500/20'
                  }`}></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className={`w-8 h-8 ${stat.color === 'indigo' ? darkMode ? 'text-indigo-400' : 'text-indigo-600' :
                      stat.color === 'purple' ? darkMode ? 'text-purple-400' : 'text-purple-600' :
                        stat.color === 'blue' ? darkMode ? 'text-blue-400' : 'text-blue-600' :
                          darkMode ? 'text-teal-400' : 'text-teal-600'
                      }`} />
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                      }`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className={`text-3xl font-black mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}{stat.id === 4 ? '%' : ''}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tab Navigation */}
        <div className={`flex gap-2 mb-6 p-2 rounded-2xl ${darkMode ? 'bg-[#1a1f2e] border border-[#272757]' : 'bg-white border border-indigo-100 shadow-lg'
          }`}>
          {['overview', 'journey', 'achievements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-3 rounded-xl font-bold capitalize transition-all ${activeTab === tab
                ? darkMode
                  ? 'bg-gradient-to-r from-[#505081] to-[#8686AC] text-white shadow-lg'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : darkMode
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-[#1a1f2e] border border-[#272757]' : 'bg-white border border-indigo-100 shadow-lg'
              }`}>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className={`w-6 h-6 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'}`} />
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  My Interests
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {formData.interests?.map((interest, idx) => (
                  <span key={idx} className={`px-4 py-2 rounded-xl font-semibold ${darkMode ? 'bg-[#272757] text-[#8686AC]' : 'bg-indigo-50 text-indigo-700'
                    }`}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-[#1a1f2e] border border-[#272757]' : 'bg-white border border-indigo-100 shadow-lg'
              }`}>
              <div className="flex items-center gap-3 mb-4">
                <Bookmark className={`w-6 h-6 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'}`} />
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Saved Careers
                </h3>
                <span className={`ml-auto px-3 py-1 rounded-full text-sm font-bold ${darkMode ? 'bg-indigo-900/30 text-indigo-400' : 'bg-indigo-100 text-indigo-700'
                  }`}>
                  {savedCareers?.length || 0}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {savedCareers?.slice(0, 6).map((career, idx) => (
                  <div key={idx} className={`p-4 rounded-xl flex items-center gap-3 transition-colors cursor-pointer ${darkMode ? 'bg-[#272757] hover:bg-[#505081]' : 'bg-gray-50 hover:bg-indigo-50'
                    }`}>
                    <div className="text-2xl">💼</div>
                    <div className="flex-1">
                      <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {career.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Journey Tab */}
        {activeTab === 'journey' && (
          <div className={`rounded-2xl p-6 ${darkMode ? 'bg-[#1a1f2e] border border-[#272757]' : 'bg-white border border-indigo-100 shadow-lg'
            }`}>
            <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Your Career Journey
            </h3>
            <div className="relative">
              <div className={`absolute left-6 top-0 bottom-0 w-1 ${darkMode ? 'bg-[#272757]' : 'bg-indigo-200'
                }`}></div>

              <div className="space-y-6">
                {journeyMilestones.map((milestone) => {
                  const IconComponent = milestone.icon;
                  return (
                    <div key={milestone.id} className="relative flex items-start gap-6">
                      <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center ${milestone.completed
                        ? darkMode
                          ? 'bg-gradient-to-br from-[#505081] to-[#8686AC]'
                          : 'bg-gradient-to-br from-indigo-600 to-purple-600'
                        : darkMode
                          ? 'bg-[#272757]'
                          : 'bg-gray-200'
                        }`}>
                        <IconComponent className={`w-6 h-6 ${milestone.completed ? 'text-white' : darkMode ? 'text-gray-600' : 'text-gray-400'
                          }`} />
                      </div>

                      <div className={`flex-1 p-4 rounded-xl ${darkMode ? 'bg-[#272757]' : 'bg-gray-50'
                        }`}>
                        <h4 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {milestone.title}
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {milestone.date}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className={`rounded-2xl p-6 ${darkMode ? 'bg-[#1a1f2e] border border-[#272757]' : 'bg-white border border-indigo-100 shadow-lg'
            }`}>
            <div className="flex items-center gap-3 mb-6">
              <Trophy className={`w-6 h-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Achievements
              </h3>
              <span className={`ml-auto px-3 py-1 rounded-full text-sm font-bold ${darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                }`}>
                {achievements.filter(a => a.unlocked).length}/{achievements.length}
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`relative p-6 rounded-2xl text-center transition-all ${achievement.unlocked
                    ? darkMode
                      ? 'bg-gradient-to-br from-[#272757] to-[#505081] border-2 border-[#8686AC] hover:scale-105'
                      : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-300 hover:scale-105'
                    : darkMode
                      ? 'bg-[#272757] border border-[#272757] opacity-50'
                      : 'bg-gray-100 border border-gray-300 opacity-50'
                    } cursor-pointer`}
                >
                  {achievement.unlocked && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                  )}
                  <div className="text-5xl mb-3 transform transition-transform hover:scale-110">
                    {achievement.icon}
                  </div>
                  <h4 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {achievement.name}
                  </h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;