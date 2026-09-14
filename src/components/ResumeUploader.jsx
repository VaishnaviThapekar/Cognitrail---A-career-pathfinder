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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
            <div className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 animate-fade-in-scale ${darkMode ? 'bg-[#121215] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'}`}>
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-black text-white'}`}>
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black">Resume ATS Analyzer & Skill Matcher</h3>
                            <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Extract skills, calculate ATS score & match top careers</p>
                        </div>
                    </div>
                    <button onClick={onClose} className={`p-2 rounded-xl border btn-interactive ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-black'}`}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Upload & Role Selection */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="md:col-span-2 space-y-4">
                        <label className={`block text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Target Career Role</label>
                        <input
                            type="text"
                            value={targetRole}
                            onChange={(e) => setTargetRole(e.target.value)}
                            placeholder="e.g. Software Engineer, Data Scientist, UX Designer"
                            className={`w-full p-3 rounded-xl border text-sm outline-none ${darkMode ? 'bg-[#18181b] border-zinc-700 text-white placeholder-zinc-500 focus:border-zinc-400' : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-black'}`}
                        />

                        {/* File Dropzone */}
                        <div className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${fileName ? (darkMode ? 'border-white bg-zinc-900' : 'border-black bg-zinc-100') : (darkMode ? 'border-zinc-700 hover:border-zinc-500 bg-zinc-900/40' : 'border-zinc-300 hover:border-black bg-zinc-50')}`}>
                            <input type="file" onChange={handleFileChange} accept=".txt,.md,.json,.csv" className="hidden" id="resumeFileInput" />
                            <label htmlFor="resumeFileInput" className="cursor-pointer block">
                                <Upload className="w-8 h-8 mx-auto text-zinc-400 mb-2" />
                                <p className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-black'}`}>
                                    {fileName ? `Uploaded: ${fileName}` : 'Click or Drag & Drop Resume File (.txt / .md)'}
                                </p>
                                <p className="text-xs text-zinc-500 mt-1">Supports text files & direct paste below</p>
                            </label>
                        </div>

                        {/* Raw Text Box */}
                        <textarea
                            value={fileText}
                            onChange={(e) => setFileText(e.target.value)}
                            rows={6}
                            className={`w-full p-4 rounded-xl border text-xs outline-none ${darkMode ? 'bg-[#18181b] border-zinc-700 text-white placeholder-zinc-500' : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400'}`}
                            placeholder="Or paste resume content directly here..."
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={handleAnalyze}
                                disabled={loading}
                                className={`flex-1 py-3 font-black text-xs rounded-xl shadow-md btn-interactive transition-all flex items-center justify-center gap-2 ${darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'}`}
                            >
                                <Sparkles className="w-4 h-4" />
                                <span>{loading ? 'Analyzing Resume...' : 'Analyze Resume'}</span>
                            </button>
                            <button
                                onClick={() => { setFileText(''); setFileName(''); setAnalysis(null); }}
                                className={`px-5 py-3 border rounded-xl font-bold text-xs btn-interactive ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800' : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:bg-zinc-200'}`}
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats Panel */}
                    <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                        <h4 className="font-black text-base mb-3 flex items-center gap-2">
                            <Award className="w-5 h-5 text-zinc-400" />
                            <span>Analysis Summary</span>
                        </h4>
                        {analysis ? (
                            <div className="space-y-4">
                                <div className={`text-center p-4 rounded-xl border ${darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200'}`}>
                                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">ATS Compatibility</p>
                                    <p className={`text-4xl font-black mt-1 ${darkMode ? 'text-white' : 'text-black'}`}>{analysis.score}/100</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-zinc-500 mb-2">Detected Skills ({analysis.detectedSkills.length})</p>
                                    <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                                        {analysis.detectedSkills.map((skill, idx) => (
                                            <span key={idx} className={`text-xs px-2.5 py-1 rounded-full font-bold border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-800'}`}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-zinc-500 text-xs py-10">
                                Upload or paste your resume and click Analyze to view ATS scores and skill breakdowns.
                            </div>
                        )}
                    </div>
                </div>

                {/* Analysis Results View */}
                {analysis && (
                    <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 animate-fade-in">
                        <h4 className="text-lg font-black flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-zinc-400" />
                            <span>Detailed Resume Feedback & Optimization Tips</span>
                        </h4>
                        <div className={`p-5 rounded-2xl border text-xs leading-relaxed whitespace-pre-wrap ${darkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-800'}`}>
                            {analysis.aiFeedback}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
