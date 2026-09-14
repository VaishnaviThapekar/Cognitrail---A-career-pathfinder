import React, { useState } from 'react';
import { X, Plus, Target, Calendar, Award, CheckCircle, Trash2, Edit2, Save, TrendingUp, BookOpen, Briefcase, GraduationCap, Trophy, Sparkles, Download, CheckCircle2 } from 'lucide-react';

const CareerRoadmapBuilder = ({ onClose, darkMode }) => {
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [roadmapSteps, setRoadmapSteps] = useState([]);
    const [isAddingStep, setIsAddingStep] = useState(false);
    const [editingStep, setEditingStep] = useState(null);
    const [newStep, setNewStep] = useState({
        title: '',
        description: '',
        duration: '',
        category: 'education',
        priority: 'medium'
    });

    // Pre-built career roadmap templates
    const careerTemplates = [
        {
            id: 1,
            name: "Software Engineer & AI",
            icon: "💻",
            totalDuration: "4-6 years",
            steps: [
                { title: "Complete 12th (PCM)", description: "Focus on Mathematics & Computer Science", duration: "2 years", category: "education", priority: "high" },
                { title: "Learn Programming Basics", description: "Start with Python/Java, practice DSA", duration: "6 months", category: "skill", priority: "high" },
                { title: "B.Tech in Computer Science", description: "Get admission in top college via JEE", duration: "4 years", category: "education", priority: "high" },
                { title: "Build Projects & Portfolio", description: "Create 5-10 real projects on GitHub", duration: "Ongoing", category: "project", priority: "medium" },
                { title: "Internships", description: "Complete 2-3 internships during college", duration: "6-12 months", category: "experience", priority: "high" },
                { title: "Master Advanced Technologies", description: "Learn React, Node.js, Cloud, DevOps", duration: "1 year", category: "skill", priority: "medium" },
                { title: "Get First Job", description: "Apply to companies, clear technical interviews", duration: "3-6 months", category: "career", priority: "high" },
                { title: "Gain Experience", description: "Work 2-3 years, step up to Senior Engineer", duration: "2-3 years", category: "career", priority: "medium" }
            ]
        },
        {
            id: 2,
            name: "Doctor (MBBS & Specialization)",
            icon: "⚕️",
            totalDuration: "10-12 years",
            steps: [
                { title: "Complete 12th (PCB)", description: "Score 85%+ in Physics, Chemistry, Biology", duration: "2 years", category: "education", priority: "high" },
                { title: "Prepare for NEET-UG", description: "Join coaching, study NCERT thoroughly", duration: "1-2 years", category: "education", priority: "high" },
                { title: "Clear NEET Exam", description: "Score 620+ for government medical college", duration: "1 attempt", category: "milestone", priority: "high" },
                { title: "MBBS Degree", description: "5.5 years including 1 year rotatory internship", duration: "5.5 years", category: "education", priority: "high" },
                { title: "NEET-PG Preparation", description: "Prepare for post-graduation specialization", duration: "1 year", category: "education", priority: "medium" },
                { title: "MD/MS Specialization", description: "Specialty in Surgery, Medicine, or Cardiology", duration: "3 years", category: "education", priority: "medium" },
                { title: "Senior Resident & Practice", description: "Work in premier hospital or start clinic", duration: "3-5 years", category: "career", priority: "high" }
            ]
        },
        {
            id: 3,
            name: "Data Scientist & ML Engineer",
            icon: "📊",
            totalDuration: "4-5 years",
            steps: [
                { title: "Complete 12th (PCM)", description: "Strong foundation in Mathematics & Statistics", duration: "2 years", category: "education", priority: "high" },
                { title: "Learn Python & Statistics", description: "Master Python, NumPy, Pandas, SQL", duration: "6 months", category: "skill", priority: "high" },
                { title: "B.Tech/B.Sc in CS or Stats", description: "Degree in Computer Science or Mathematics", duration: "4 years", category: "education", priority: "high" },
                { title: "Master Machine Learning", description: "Scikit-Learn, PyTorch, Deep Learning, MLOps", duration: "1 year", category: "skill", priority: "high" },
                { title: "Work on Real Projects", description: "Kaggle competitions, published datasets", duration: "Ongoing", category: "project", priority: "medium" },
                { title: "Analytics Internships", description: "Gain industry problem-solving experience", duration: "6 months", category: "experience", priority: "high" },
                { title: "Land Data Scientist Role", description: "Join analytics team as ML Engineer", duration: "3-6 months", category: "career", priority: "high" }
            ]
        },
        {
            id: 4,
            name: "CA (Chartered Accountant)",
            icon: "💼",
            totalDuration: "5-6 years",
            steps: [
                { title: "Complete 12th (Commerce)", description: "Focus on Accountancy, Economics, Business", duration: "2 years", category: "education", priority: "high" },
                { title: "Register for CA Foundation", description: "Register with ICAI after 12th", duration: "1 month", category: "milestone", priority: "high" },
                { title: "Clear CA Foundation", description: "Study 4-6 months, clear all 4 papers", duration: "6 months", category: "education", priority: "high" },
                { title: "CA Intermediate", description: "Clear both groups of Intermediate level", duration: "1-1.5 years", category: "education", priority: "high" },
                { title: "Articleship Training", description: "3 years mandatory practical audit training", duration: "3 years", category: "experience", priority: "high" },
                { title: "CA Final Exam", description: "Clear final exams and qualify as CA", duration: "1 year", category: "milestone", priority: "high" },
                { title: "Start Practice or Corporate Role", description: "Join Big 4 firm or start own audit practice", duration: "Ongoing", category: "career", priority: "medium" }
            ]
        },
        {
            id: 5,
            name: "UI/UX & Product Designer",
            icon: "🎨",
            totalDuration: "3-4 years",
            steps: [
                { title: "Complete 12th Any Stream", description: "Build visual aesthetics and sketching skills", duration: "2 years", category: "education", priority: "high" },
                { title: "Learn Design Foundations", description: "Master Figma, Typography, Color Theory", duration: "6 months", category: "skill", priority: "high" },
                { title: "Design Degree or Bootcamp", description: "B.Des from NID/IIT or recognized bootcamp", duration: "3-4 years", category: "education", priority: "high" },
                { title: "Build 3 Case Studies", description: "End-to-end user research & mobile app UX", duration: "6 months", category: "project", priority: "high" },
                { title: "Design Internships", description: "Work with product startups", duration: "6 months", category: "experience", priority: "high" },
                { title: "Join as Product Designer", description: "Design web and mobile consumer products", duration: "Ongoing", category: "career", priority: "high" }
            ]
        },
        {
            id: 6,
            name: "Corporate Lawyer & Legal Advisor",
            icon: "⚖️",
            totalDuration: "5-6 years",
            steps: [
                { title: "Complete 12th Any Stream", description: "Develop strong reading & reasoning skills", duration: "2 years", category: "education", priority: "high" },
                { title: "Prepare for CLAT / AILET", description: "National entrance exams for top NLUs", duration: "1 year", category: "education", priority: "high" },
                { title: "5-Year Integrated BA LLB", description: "Complete law degree with moots and internships", duration: "5 years", category: "education", priority: "high" },
                { title: "Corporate Law Internships", description: "Intern with top law firms and corporate houses", duration: "1 year", category: "experience", priority: "high" },
                { title: "Bar Council Enrollment", description: "Clear AIBE and start practicing as Advocate", duration: "6 months", category: "milestone", priority: "high" },
                { title: "Join Legal Firm", description: "Corporate M&A, IP, or compliance associate", duration: "Ongoing", category: "career", priority: "medium" }
            ]
        }
    ];

    const loadTemplate = (template) => {
        setSelectedCareer(template);
        setRoadmapSteps(template.steps.map((s, idx) => ({ ...s, id: idx + 1, completed: false })));
    };

    const handleAddStep = () => {
        if (!newStep.title) return;
        const stepToAdd = {
            ...newStep,
            id: roadmapSteps.length + 1,
            completed: false
        };
        setRoadmapSteps([...roadmapSteps, stepToAdd]);
        setNewStep({ title: '', description: '', duration: '', category: 'education', priority: 'medium' });
        setIsAddingStep(false);
    };

    const handleToggleStep = (stepId) => {
        setRoadmapSteps(roadmapSteps.map(s => s.id === stepId ? { ...s, completed: !s.completed } : s));
    };

    const handleDeleteStep = (stepId) => {
        setRoadmapSteps(roadmapSteps.filter(s => s.id !== stepId));
    };

    const calculateProgress = () => {
        if (roadmapSteps.length === 0) return 0;
        const completed = roadmapSteps.filter(s => s.completed).length;
        return Math.round((completed / roadmapSteps.length) * 100);
    };

    const handleExport = () => {
        const text = `
CAREER ROADMAP: ${selectedCareer?.name || 'Custom Career'}
Progress: ${calculateProgress()}%

MILESTONES:
${roadmapSteps.map((s, i) => `${i + 1}. [${s.completed ? 'COMPLETED' : 'PENDING'}] ${s.title} (${s.duration})\n   ${s.description}`).join('\n\n')}

Generated by COGNITRAIL Career Roadmap Builder
        `.trim();

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${(selectedCareer?.name || 'Career').replace(/\s+/g, '_')}_Roadmap.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#09090b]' : 'bg-zinc-50'}`}>
            <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-black'} mb-2`}>
                            🗺️ Step-by-Step Career Roadmap Builder
                        </h2>
                        <p className={`text-base sm:text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Build, customize, and track your milestone roadmap from high school to senior leadership
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2.5 rounded-xl border btn-interactive hover-lift ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white' : 'bg-white border-zinc-200 text-zinc-700 hover:text-black'}`}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {!selectedCareer ? (
                    /* Template Selection Grid */
                    <div>
                        <div className="text-center mb-8">
                            <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-black'} mb-2`}>
                                Choose a Verified Career Template or Build Custom
                            </h3>
                            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                Select a curated timeline or start a fresh personalized track
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {careerTemplates.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => loadTemplate(template)}
                                    className={`group relative rounded-3xl p-7 text-left border transition-all duration-300 hover-lift btn-interactive ${darkMode
                                        ? 'bg-[#121215] border-zinc-800 hover:border-zinc-600'
                                        : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-sm'
                                        }`}
                                >
                                    <div className="text-4xl mb-4">{template.icon}</div>
                                    <h3 className={`text-xl font-black mb-2 transition-colors ${darkMode ? 'text-white group-hover:text-zinc-300' : 'text-black group-hover:text-zinc-700'}`}>
                                        {template.name}
                                    </h3>
                                    <div className="space-y-1.5 text-xs font-semibold mb-4 text-zinc-500 dark:text-zinc-400">
                                        <div>⏱️ Est. Timeline: <span className="font-bold text-black dark:text-white">{template.totalDuration}</span></div>
                                        <div>📋 Milestones: <span className="font-bold text-black dark:text-white">{template.steps.length} steps</span></div>
                                    </div>
                                    <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-black'} flex items-center gap-1 group-hover:gap-2 transition-all`}>
                                        Load Roadmap Template →
                                    </div>
                                </button>
                            ))}

                            {/* Custom Roadmap Button */}
                            <button
                                onClick={() => setSelectedCareer({ name: 'Custom Career', icon: '🎯' })}
                                className={`group relative rounded-3xl p-7 text-center border-2 border-dashed flex flex-col items-center justify-center transition-all hover-lift btn-interactive ${darkMode
                                    ? 'bg-[#121215] border-zinc-700 hover:border-zinc-500 text-white'
                                    : 'bg-white border-zinc-300 hover:border-zinc-500 text-black shadow-sm'
                                    }`}
                            >
                                <Plus className="w-10 h-10 mb-3 text-zinc-400" />
                                <h3 className="text-lg font-black mb-1">Create Custom Roadmap</h3>
                                <p className="text-xs text-zinc-500">Build your own milestones from scratch</p>
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Roadmap Builder View */
                    <div className="animate-fade-in">
                        {/* Roadmap Header Card */}
                        <div className={`rounded-3xl p-6 sm:p-8 mb-8 border ${darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-md'}`}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl">{selectedCareer.icon}</span>
                                    <div>
                                        <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                                            {selectedCareer.name}
                                        </h3>
                                        <p className={`text-xs font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                            {roadmapSteps.length} milestones • {calculateProgress()}% completed
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleExport}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold border btn-interactive flex items-center gap-1.5 ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-white hover:text-black' : 'bg-zinc-100 border-zinc-300 text-black hover:bg-black hover:text-white'}`}
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        Export Roadmap
                                    </button>
                                    <button
                                        onClick={() => setSelectedCareer(null)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold border btn-interactive ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-black'}`}
                                    >
                                        ← Templates
                                    </button>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                                <div
                                    className={`h-full transition-all duration-500 ${darkMode ? 'bg-white' : 'bg-black'}`}
                                    style={{ width: `${calculateProgress()}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Add Step Button */}
                        {!isAddingStep && (
                            <button
                                onClick={() => setIsAddingStep(true)}
                                className={`w-full mb-6 p-4 rounded-2xl border-2 border-dashed flex items-center justify-center gap-2 text-xs font-bold btn-interactive ${darkMode
                                    ? 'bg-[#121215] border-zinc-700 text-zinc-300 hover:border-zinc-500'
                                    : 'bg-white border-zinc-300 text-zinc-700 hover:border-black shadow-sm'
                                    }`}
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Custom Milestone Step</span>
                            </button>
                        )}

                        {/* Add Step Form */}
                        {isAddingStep && (
                            <div className={`rounded-3xl p-6 mb-6 border animate-fade-in ${darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-md'}`}>
                                <h4 className={`text-base font-black mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
                                    Add New Milestone
                                </h4>
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Milestone Title *"
                                        value={newStep.title}
                                        onChange={(e) => setNewStep({ ...newStep, title: e.target.value })}
                                        className={`px-4 py-2.5 rounded-xl border text-xs outline-none ${darkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-black'}`}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Duration (e.g., 6 months, 4 years)"
                                        value={newStep.duration}
                                        onChange={(e) => setNewStep({ ...newStep, duration: e.target.value })}
                                        className={`px-4 py-2.5 rounded-xl border text-xs outline-none ${darkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-black'}`}
                                    />
                                </div>
                                <textarea
                                    placeholder="Details & action items..."
                                    value={newStep.description}
                                    onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
                                    rows={2}
                                    className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none mb-4 ${darkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-black'}`}
                                />
                                <div className="flex gap-2 justify-end">
                                    <button
                                        onClick={() => setIsAddingStep(false)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold border btn-interactive ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-black'}`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddStep}
                                        className={`px-6 py-2 rounded-xl text-xs font-bold btn-interactive ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
                                    >
                                        Save Milestone
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Roadmap Steps List */}
                        <div className="space-y-4">
                            {roadmapSteps.map((step, idx) => (
                                <div
                                    key={step.id}
                                    className={`p-5 rounded-3xl border transition-all hover-lift flex items-start justify-between gap-4 ${step.completed
                                        ? darkMode ? 'bg-zinc-900/40 border-zinc-700 opacity-75' : 'bg-zinc-100/70 border-zinc-300 opacity-75'
                                        : darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-start gap-3.5">
                                        <button
                                            type="button"
                                            onClick={() => handleToggleStep(step.id)}
                                            className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${step.completed
                                                ? darkMode ? 'bg-white border-white text-black' : 'bg-black border-black text-white'
                                                : 'border-zinc-400 opacity-60'
                                                }`}
                                        >
                                            {step.completed && <CheckCircle2 className="w-4 h-4" />}
                                        </button>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className={`text-base font-black ${step.completed ? 'line-through text-zinc-500' : darkMode ? 'text-white' : 'text-black'}`}>
                                                    {step.title}
                                                </h4>
                                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-400' : 'bg-zinc-100 border-zinc-300 text-zinc-700'}`}>
                                                    {step.duration}
                                                </span>
                                            </div>
                                            <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteStep(step.id)}
                                        className={`p-2 rounded-xl border btn-interactive ${darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-500 hover:text-black'}`}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CareerRoadmapBuilder;