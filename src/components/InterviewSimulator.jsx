import React, { useState } from 'react';
import { interviewCoach } from '../services/interviewCoach';

export default function InterviewSimulator({ onClose }) {
    const [role, setRole] = useState('Software Engineer');
    const [guide, setGuide] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        const res = await interviewCoach.generateInterviewGuide(role);
        setGuide(res);
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
            <div className="w-full max-w-3xl bg-white dark:bg-[#0f1419] rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Interview Simulator</h3>
                    <button onClick={onClose} className="text-sm text-gray-500">Close</button>
                </div>

                <div className="mb-4">
                    <input value={role} onChange={e => setRole(e.target.value)} className="p-2 border rounded w-full" />
                </div>

                <div className="flex gap-2">
                    <button onClick={handleGenerate} className="px-4 py-2 bg-indigo-600 text-white rounded">{loading ? 'Generating…' : 'Generate Guide'}</button>
                    <button onClick={() => setGuide('')} className="px-4 py-2 border rounded">Reset</button>
                </div>

                {guide && (
                    <div className="mt-4">
                        <h4 className="font-semibold mb-2">Preparation Guide</h4>
                        <pre className="whitespace-pre-wrap text-sm bg-gray-100 dark:bg-[#111217] p-3 rounded max-h-80 overflow-auto">{guide}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}
