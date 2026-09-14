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
    { id: 1, label: 'Careers Explored', value: 47, icon: Eye, change: '+12' },
    { id: 2, label: 'Saved Careers', value: savedCareers?.length || 5, icon: Bookmark, change: '+3' },
    { id: 3, label: 'Days Active', value: 24, icon: Activity, change: '+24' },
    { id: 4, label: 'Profile Strength', value: formData.profileComplete || 85, icon: TrendingUp, change: '+15%' }
  ];

  // Achievement badges
  const achievements = [
    { id: 1, name: 'Early Bird', icon: '🌅', unlocked: true, description: 'Logged in before 8 AM' },
    { id: 2, name: 'Career Explorer', icon: '🔍', unlocked: true, description: 'Explored 10+ careers' },
    { id: 3, name: 'Quiz Master', icon: '🎯', unlocked: true, description: 'Completed career quiz' },
    { id: 4, name: 'Bookworm', icon: '📚', unlocked: savedCareers?.length >= 5, description: 'Saved 5 careers' },
    { id: 5, name: 'Dedicated', icon: '🔥', unlocked: true, description: '7-day streak' },
    { id: 6, name: 'Social Star', icon: '⭐', unlocked: false, description: 'Shared 5 careers' }
  ];

  // Career journey milestones
  const journeyMilestones = [
    { id: 1, title: 'Started Journey', date: 'Dec 24, 2024', completed: true, icon: Rocket },
    { id: 2, title: 'Completed Quiz', date: 'Dec 25, 2024', completed: true, icon: CheckCircle2 },
    { id: 3, title: 'Explored 10 Careers', date: 'Dec 28, 2024', completed: true, icon: Eye },
    { id: 4, title: 'Saved 5 Careers', date: 'Jan 2, 2025', completed: true, icon: Bookmark },
    { id: 5, title: 'Compare Careers', date: 'Jan 5, 2025', completed: true, icon: Target },
    { id: 6, title: 'Apply to College', date: 'Pending', completed: false, icon: Award }
  ];

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto animate-fade-in ${
      darkMode ? 'bg-[#09090b] text-white' : 'bg-[#fafafa] text-black'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with Avatar */}
        <div className="relative mb-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-0 right-0 p-2.5 rounded-xl border transition-all z-20 btn-interactive ${
              darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:text-black shadow-sm'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Profile Hero Section */}
          <div className={`rounded-3xl p-8 relative overflow-hidden border ${
            darkMode
              ? 'bg-[#121215] border-zinc-800'
              : 'bg-white border-zinc-200 shadow-sm'
          }`}>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="relative group">
                <div className={`w-28 h-28 rounded-2xl flex items-center justify-center text-4xl border transition-all duration-300 group-hover:scale-105 ${
                  darkMode
                    ? 'bg-zinc-900 border-zinc-700 text-white shadow-inner'
                    : 'bg-black text-white border-zinc-800'
                }`}>
                  {editing ? '✏️' : '👤'}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                {editing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`text-3xl font-black mb-2 bg-transparent border-b-2 outline-none transition-colors w-full ${
                      darkMode ? 'text-white border-zinc-700 focus:border-white' : 'text-black border-zinc-300 focus:border-black'
                    }`}
                  />
                ) : (
                  <h1 className="text-3xl font-black mb-1.5 tracking-tight">
                    {formData.name}
                  </h1>
                )}

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
                    darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
                  }`}>
                    <Calendar className="w-3.5 h-3.5 opacity-70" />
                    {formData.grade}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
                    darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
                  }`}>
                    <MapPin className="w-3.5 h-3.5 opacity-70" />
                    {formData.location}
                  </span>
                </div>

                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <div className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    <Mail className="w-3.5 h-3.5" />
                    <span>{formData.email}</span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => editing ? handleSave() : setEditing(true)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all btn-interactive flex items-center gap-2 ${
                  darkMode
                    ? 'bg-white text-black hover:bg-zinc-200'
                    : 'bg-black text-white hover:bg-zinc-800'
                }`}
              >
                {editing ? <><Save className="w-4 h-4" /> Save</> : <><Edit className="w-4 h-4" /> Edit Profile</>}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className={`rounded-2xl p-5 border transition-all hover-lift ${
                  darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <IconComponent className="w-5 h-5 opacity-70" />
                  <span className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold border ${
                    darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-black font-mono mb-0.5">
                  {stat.value}{stat.id === 4 ? '%' : ''}
                </div>
                <div className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tab Navigation */}
        <div className={`flex gap-2 mb-6 p-1.5 rounded-2xl border ${
          darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
        }`}>
          {['overview', 'journey', 'achievements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all btn-interactive ${
                activeTab === tab
                  ? darkMode
                    ? 'bg-white text-black shadow-sm'
                    : 'bg-black text-white shadow-sm'
                  : darkMode
                    ? 'text-zinc-400 hover:text-white'
                    : 'text-zinc-600 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            <div className={`rounded-2xl p-6 border ${
              darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-2.5 mb-4">
                <Sparkles className="w-5 h-5 opacity-70" />
                <h3 className="text-lg font-bold">
                  My Interests
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.interests?.map((interest, idx) => (
                  <span key={idx} className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border ${
                    darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
                  }`}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className={`rounded-2xl p-6 border ${
              darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-2.5 mb-4">
                <Bookmark className="w-5 h-5 opacity-70" />
                <h3 className="text-lg font-bold">
                  Saved Careers
                </h3>
                <span className={`ml-auto px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
                }`}>
                  {savedCareers?.length || 0}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {savedCareers?.slice(0, 6).map((career, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border flex items-center gap-3 transition-all btn-interactive ${
                    darkMode ? 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-800' : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100'
                  }`}>
                    <div className="text-xl">💼</div>
                    <div className="flex-1">
                      <div className="font-bold text-sm">
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
          <div className={`rounded-2xl p-6 border animate-fade-in ${
            darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
          }`}>
            <h3 className="text-xl font-bold mb-6">
              Your Career Journey
            </h3>
            <div className="relative">
              <div className={`absolute left-5 top-0 bottom-0 w-0.5 ${
                darkMode ? 'bg-zinc-800' : 'bg-zinc-200'
              }`}></div>

              <div className="space-y-5">
                {journeyMilestones.map((milestone) => {
                  const IconComponent = milestone.icon;
                  return (
                    <div key={milestone.id} className="relative flex items-start gap-5">
                      <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center border ${
                        milestone.completed
                          ? darkMode
                            ? 'bg-white text-black border-white'
                            : 'bg-black text-white border-black'
                          : darkMode
                            ? 'bg-zinc-900 border-zinc-800 text-zinc-600'
                            : 'bg-zinc-100 border-zinc-200 text-zinc-400'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>

                      <div className={`flex-1 p-3.5 rounded-xl border ${
                        darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                      }`}>
                        <h4 className="font-bold text-xs mb-0.5">
                          {milestone.title}
                        </h4>
                        <p className={`text-[11px] font-mono ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
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
          <div className={`rounded-2xl p-6 border animate-fade-in ${
            darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2.5 mb-6">
              <Trophy className="w-5 h-5 opacity-70" />
              <h3 className="text-xl font-bold">
                Achievements
              </h3>
              <span className={`ml-auto px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
              }`}>
                {achievements.filter(a => a.unlocked).length}/{achievements.length}
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-3.5">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`relative p-5 rounded-2xl text-center border transition-all ${
                    achievement.unlocked
                      ? darkMode
                        ? 'bg-zinc-900 border-zinc-700 hover:border-zinc-500'
                        : 'bg-zinc-50 border-zinc-300 hover:border-zinc-500'
                      : darkMode
                        ? 'bg-zinc-950 border-zinc-900 opacity-40'
                        : 'bg-zinc-100 border-zinc-200 opacity-40'
                  }`}
                >
                  {achievement.unlocked && (
                    <div className="absolute top-2.5 right-2.5">
                      <CheckCircle2 className="w-4 h-4 opacity-80" />
                    </div>
                  )}
                  <div className={`text-4xl mb-2 ${achievement.unlocked ? '' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <h4 className="font-bold text-xs mb-0.5">
                    {achievement.name}
                  </h4>
                  <p className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
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




