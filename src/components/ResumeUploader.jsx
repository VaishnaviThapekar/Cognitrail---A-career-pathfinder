import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, Sparkles, X, Award, Briefcase } from 'lucide-react';
import { resumeAnalyzer } from '../services/resumeAnalyzer';

export default function ResumeUploader({ onClose, darkMode }) {
    const [fileText, setFileText] = useState('');
    const [fileName, setFileName] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [targetRole, setTargetRole] = useState('Software Engineer');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (event) => {
            setFileText(event.target.result);
        };
        reader.readAsText(file);
    };

    const handleAnalyze = async () => {
        if (!fileText.trim()) return alert('Please upload a resume file or paste your resume content.');
        setLoading(true);

        const extracted = resumeAnalyzer.extractSkillsAndMatch(fileText);
        const aiResult = await resumeAnalyzer.analyzeResume(fileText, targetRole, '0-2');

        setAnalysis({
            score: extracted.score,
            detectedSkills: extracted.detectedSkills,
            wordCount: extracted.wordCount,
            aiFeedback: aiResult.analysis || resumeAnalyzer.getResumeOptimizationTips(),
            targetRole
        });
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2.5 rounded-xl text-white">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">Resume Analyzer & Skill Matcher</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Extract skills, calculate ATS score & match top careers</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Upload & Role Selection */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="md:col-span-2 space-y-4">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Target Career Role</label>
                        <input
                            type="text"
                            value={targetRole}
                            onChange={(e) => setTargetRole(e.target.value)}
                            placeholder="e.g. Software Engineer, Data Scientist, UX Designer"
                            className={`w-full p-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`}
                        />

                        {/* File Dropzone */}
                        <div className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${fileName ? 'border-emerald-500 bg-emerald-50/20' : 'border-indigo-300 hover:border-indigo-500 bg-indigo-50/20'}`}>
                            <input type="file" onChange={handleFileChange} accept=".txt,.md,.json,.csv" className="hidden" id="resumeFileInput" />
                            <label htmlFor="resumeFileInput" className="cursor-pointer block">
                                <Upload className="w-10 h-10 mx-auto text-indigo-500 mb-2" />
                                <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                                    {fileName ? `Uploaded: ${fileName}` : 'Click or Drag & Drop Resume File (.txt / .md)'}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Supports text files & direct paste below</p>
                            </label>
                        </div>

                        {/* Raw Text Box */}
                        <textarea
                            value={fileText}
                            onChange={(e) => setFileText(e.target.value)}
                            rows={6}
                            className={`w-full p-4 rounded-xl border text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`}
                            placeholder="Or paste resume content directly here..."
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={handleAnalyze}
                                disabled={loading}
                                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                            >
                                <Sparkles className="w-5 h-5" />
                                <span>{loading ? 'Analyzing Resume...' : 'Analyze Resume'}</span>
                            </button>
                            <button
                                onClick={() => { setFileText(''); setFileName(''); setAnalysis(null); }}
                                className="px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats Panel */}
                    <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-indigo-50/50 border-indigo-100'}`}>
                        <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <Award className="w-5 h-5 text-indigo-600" />
                            <span>Analysis Summary</span>
                        </h4>
                        {analysis ? (
                            <div className="space-y-4">
                                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-indigo-100 dark:border-gray-700">
                                    <p className="text-xs font-semibold text-gray-500 uppercase">ATS Compatibility Score</p>
                                    <p className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">{analysis.score}/100</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 mb-2">Detected Skills ({analysis.detectedSkills.length})</p>
                                    <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                                        {analysis.detectedSkills.map((skill, idx) => (
                                            <span key={idx} className="bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs px-2.5 py-1 rounded-full font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-400 text-sm py-10">
                                Upload or paste your resume and click Analyze to view ATS scores and skill breakdowns.
                            </div>
                        )}
                    </div>
                </div>

                {/* Analysis Results View */}
                {analysis && (
                    <div className="space-y-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-xl font-bold flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-purple-600" />
                            <span>Detailed Resume Feedback & Optimization Tips</span>
                        </h4>
                        <div className={`p-5 rounded-2xl border text-sm leading-relaxed whitespace-pre-wrap ${darkMode ? 'bg-gray-900/80 border-gray-700 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-800'}`}>
                            {analysis.aiFeedback}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

