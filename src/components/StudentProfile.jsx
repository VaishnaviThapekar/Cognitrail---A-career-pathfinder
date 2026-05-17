import React, { useState, useEffect } from 'react';

export default function StudentProfile({ onClose }) {
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
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
            <div className="w-full max-w-2xl bg-white dark:bg-[#0f1419] rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Student Profile</h3>
                    <button onClick={onClose} className="text-sm text-gray-500">Close</button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Full name" className="p-2 border rounded" />
                    <input value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} placeholder="Email" className="p-2 border rounded" />
                    <input value={profile.education} onChange={e => setProfile({ ...profile, education: e.target.value })} placeholder="Education (e.g., 12th, Diploma)" className="p-2 border rounded" />
                    <input value={profile.skills} onChange={e => setProfile({ ...profile, skills: e.target.value })} placeholder="Skills (comma separated)" className="p-2 border rounded" />
                    <input value={profile.careerGoal} onChange={e => setProfile({ ...profile, careerGoal: e.target.value })} placeholder="Career goal" className="p-2 border rounded" />
                </div>

                <div className="mt-4 flex gap-2">
                    <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded">Save Profile</button>
                    <button onClick={() => { localStorage.removeItem('studentProfile'); setProfile({ name: '', email: '', education: '', skills: '', careerGoal: '' }); }} className="px-4 py-2 border rounded">Clear</button>
                </div>
            </div>
        </div>
    );
}
