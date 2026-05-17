import React, { useState } from 'react';
import { resumeAnalyzer } from '../services/resumeAnalyzer';

export default function ResumeUploader({ onClose }) {
    const [fileText, setFileText] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setFileText(reader.result);
        if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
            reader.readAsText(file);
        } else {
            // Fallback: try to read as text - complex parsing (PDF/DOCX) not implemented client-side
            reader.readAsText(file);
        }
    };

    const handleAnalyze = async () => {
        if (!fileText) return alert('Please paste your resume or upload a .txt file for now.');
        setLoading(true);
        const res = await resumeAnalyzer.analyzeResume(fileText, 'student', '0-2');
        setAnalysis(res);
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
            <div className="w-full max-w-3xl bg-white dark:bg-[#0f1419] rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Resume Uploader & Analyzer</h3>
                    <button onClick={onClose} className="text-sm text-gray-500">Close</button>
                </div>

                <p className="text-sm text-gray-600 mb-4">Paste your resume text or upload a plain text (.txt) file. PDF/DOCX parsing is not implemented client-side yet.</p>

                <div className="mb-4">
                    <input type="file" onChange={handleFile} />
                </div>

                <textarea
                    value={fileText}
                    onChange={(e) => setFileText(e.target.value)}
                    rows={10}
                    className="w-full p-3 border rounded mb-4"
                    placeholder="Paste resume text here..."
                />

                <div className="flex gap-2">
                    <button onClick={handleAnalyze} className="px-4 py-2 bg-indigo-600 text-white rounded">{loading ? 'Analyzing…' : 'Analyze Resume'}</button>
                    <button onClick={() => { setFileText(''); setAnalysis(null); }} className="px-4 py-2 border rounded">Reset</button>
                </div>

                {analysis && (
                    <div className="mt-6">
                        <h4 className="font-semibold mb-2">Analysis Result</h4>
                        <pre className="whitespace-pre-wrap text-sm bg-gray-100 dark:bg-[#111217] p-3 rounded max-h-72 overflow-auto">{typeof analysis.analysis === 'string' ? analysis.analysis : JSON.stringify(analysis, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}
