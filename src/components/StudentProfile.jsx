import React, { useState, useEffect } from 'react';
import { X, User, Mail, GraduationCap, Award, Target, Save, Trash2 } from 'lucide-react';

export default function StudentProfile({ onClose, darkMode }) {
    const [profile, setProfile] = useState({ name: '', email: '', education: '', skills: '', careerGoal: '' });

    useEffect(() => {
        const saved = localStorage.getItem('studentProfile');
        if (saved) setProfile(JSON.parse(saved));
    }, []);

    const handleSave = () => {
        localStorage.setItem('studentProfile', JSON.stringify(profile));
        alert('Profile saved locally.');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
            <div className={`w-full max-w-xl rounded-2xl shadow-2xl p-6 border transition-all ${
                darkMode ? 'bg-[#121215] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'
            }`}>
                <div className={`flex justify-between items-center pb-4 border-b mb-5 ${
                    darkMode ? 'border-zinc-800' : 'border-zinc-200'
                }`}>
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl border ${
                            darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-black text-white border-zinc-800'
                        }`}>
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold tracking-tight">Student Profile</h3>
                            <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Manage your academic & skills data</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className={`p-2 rounded-xl border transition-all btn-interactive ${
                            darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black'
                        }`}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="space-y-3.5">
                    <div>
                        <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Full Name</label>
                        <input 
                            value={profile.name} 
                            onChange={e => setProfile({ ...profile, name: e.target.value })} 
                            placeholder="e.g. Alex Johnson" 
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                                darkMode ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-400' : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-black'
                            }`} 
                        />
                    </div>
                    <div>
                        <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Email Address</label>
                        <input 
                            value={profile.email} 
                            onChange={e => setProfile({ ...profile, email: e.target.value })} 
                            placeholder="e.g. alex@example.com" 
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                                darkMode ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-400' : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-black'
                            }`} 
                        />
                    </div>
                    <div>
                        <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Education Level</label>
                        <input 
                            value={profile.education} 
                            onChange={e => setProfile({ ...profile, education: e.target.value })} 
                            placeholder="e.g. 12th Standard / B.Tech Computer Science" 
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                                darkMode ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-400' : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-black'
                            }`} 
                        />
                    </div>
                    <div>
                        <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Current Skills</label>
                        <input 
                            value={profile.skills} 
                            onChange={e => setProfile({ ...profile, skills: e.target.value })} 
                            placeholder="e.g. Python, Problem Solving, Communication" 
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                                darkMode ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-400' : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-black'
                            }`} 
                        />
                    </div>
                    <div>
                        <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Target Career Goal</label>
                        <input 
                            value={profile.careerGoal} 
                            onChange={e => setProfile({ ...profile, careerGoal: e.target.value })} 
                            placeholder="e.g. Full Stack AI Engineer" 
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                                darkMode ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-400' : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-black'
                            }`} 
                        />
                    </div>
                </div>

                <div className="mt-6 flex gap-2">
                    <button 
                        onClick={handleSave} 
                        className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all btn-interactive ${
                            darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                        }`}
                    >
                        <Save className="w-4 h-4" />
                        <span>Save Profile</span>
                    </button>
                    <button 
                        onClick={() => { localStorage.removeItem('studentProfile'); setProfile({ name: '', email: '', education: '', skills: '', careerGoal: '' }); }} 
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider border flex items-center justify-center gap-1.5 transition-all btn-interactive ${
                            darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200'
                        }`}
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
