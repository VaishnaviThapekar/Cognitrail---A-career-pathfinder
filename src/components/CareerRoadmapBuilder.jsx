import React, { useState } from 'react';
import { X, Plus, Target, Calendar, Award, CheckCircle, Circle, Trash2, Edit2, Save, TrendingUp, BookOpen, Briefcase, GraduationCap, Trophy, Sparkles, Download, Share2 } from 'lucide-react';

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
            name: "Software Engineer",
            icon: "💻",
            color: "from-blue-500 to-indigo-600",
            totalDuration: "4-6 years",
            steps: [
                { title: "Complete 12th (PCM)", description: "Focus on Mathematics & Computer Science", duration: "2 years", category: "education", priority: "high" },
                { title: "Learn Programming Basics", description: "Start with Python/Java, practice DSA", duration: "6 months", category: "skill", priority: "high" },
                { title: "B.Tech in Computer Science", description: "Get admission in good college via JEE", duration: "4 years", category: "education", priority: "high" },
                { title: "Build Projects & Portfolio", description: "Create 5-10 real projects on GitHub", duration: "Ongoing", category: "project", priority: "medium" },
                { title: "Internships", description: "Complete 2-3 internships during college", duration: "6-12 months", category: "experience", priority: "high" },
                { title: "Master Advanced Technologies", description: "Learn React, Node.js, Cloud, DevOps", duration: "1 year", category: "skill", priority: "medium" },
                { title: "Get First Job", description: "Apply to companies, clear interviews", duration: "3-6 months", category: "career", priority: "high" },
                { title: "Gain Experience", description: "Work 2-3 years, switch for growth", duration: "2-3 years", category: "career", priority: "medium" }
            ]
        },
        {
            id: 2,
            name: "Doctor (MBBS)",
            icon: "⚕️",
            color: "from-green-500 to-teal-600",
            totalDuration: "10-12 years",
            steps: [
                { title: "Complete 12th (PCB)", description: "Score 85%+ in Physics, Chemistry, Biology", duration: "2 years", category: "education", priority: "high" },
                { title: "Prepare for NEET", description: "Join coaching, study NCERT thoroughly", duration: "1-2 years", category: "education", priority: "high" },
                { title: "Clear NEET Exam", description: "Score 600+ for good medical college", duration: "1 attempt", category: "milestone", priority: "high" },
                { title: "MBBS Degree", description: "5.5 years including 1 year internship", duration: "5.5 years", category: "education", priority: "high" },
                { title: "NEET-PG Preparation", description: "Prepare for post-graduation", duration: "1 year", category: "education", priority: "medium" },
                { title: "MD/MS Specialization", description: "Choose specialty like Cardiology, Surgery", duration: "3 years", category: "education", priority: "medium" },
                { title: "Practice & Build Reputation", description: "Work in hospital or start practice", duration: "3-5 years", category: "career", priority: "high" }
            ]
        },
        {
            id: 3,
            name: "Data Scientist",
            icon: "📊",
            color: "from-purple-500 to-pink-600",
            totalDuration: "4-5 years",
            steps: [
                { title: "Complete 12th (PCM)", description: "Strong foundation in Mathematics", duration: "2 years", category: "education", priority: "high" },
                { title: "Learn Python & Statistics", description: "Master Python, NumPy, Pandas", duration: "6 months", category: "skill", priority: "high" },
                { title: "B.Tech/B.Sc in relevant field", description: "Computer Science, Statistics, or Mathematics", duration: "4 years", category: "education", priority: "high" },
                { title: "Master Data Science Skills", description: "ML, Deep Learning, Data Visualization", duration: "1 year", category: "skill", priority: "high" },
                { title: "Work on Real Projects", description: "Kaggle competitions, real datasets", duration: "Ongoing", category: "project", priority: "medium" },
                { title: "Internships in Analytics", description: "Gain practical experience", duration: "6 months", category: "experience", priority: "high" },
                { title: "Build Portfolio", description: "Showcase projects on GitHub/Portfolio site", duration: "3 months", category: "project", priority: "medium" },
                { title: "Land First Job", description: "Junior Data Scientist role", duration: "3-6 months", category: "career", priority: "high" }
            ]
        },
        {
            id: 4,
            name: "CA (Chartered Accountant)",
            icon: "💼",
            color: "from-orange-500 to-red-600",
            totalDuration: "5-6 years",
            steps: [
                { title: "Complete 12th (Commerce)", description: "Focus on Accounts, Economics", duration: "2 years", category: "education", priority: "high" },
                { title: "Register for CA Foundation", description: "Register with ICAI after 12th", duration: "1 month", category: "milestone", priority: "high" },
                { title: "Clear CA Foundation", description: "Study 4-6 months, clear exam", duration: "6 months", category: "education", priority: "high" },
                { title: "CA Intermediate", description: "Both groups of Intermediate level", duration: "1-1.5 years", category: "education", priority: "high" },
                { title: "Articleship Training", description: "3 years practical training required", duration: "3 years", category: "experience", priority: "high" },
                { title: "CA Final Preparation", description: "Study for final exams", duration: "1 year", category: "education", priority: "high" },
                { title: "Clear CA Final", description: "Become Chartered Accountant", duration: "1 attempt", category: "milestone", priority: "high" },
                { title: "Start Career", description: "Join firm or start practice", duration: "Ongoing", category: "career", priority: "medium" }
            ]
        },
        {
            id: 5,
            name: "Civil Engineer",
            icon: "🏗️",
            color: "from-yellow-500 to-orange-600",
            totalDuration: "4-5 years",
            steps: [
                { title: "Complete 12th (PCM)", description: "Focus on Physics & Mathematics", duration: "2 years", category: "education", priority: "high" },
                { title: "Prepare for JEE", description: "Engineering entrance exam", duration: "1-2 years", category: "education", priority: "high" },
                { title: "B.Tech in Civil Engineering", description: "4-year engineering degree", duration: "4 years", category: "education", priority: "high" },
                { title: "Learn AutoCAD & Software", description: "Master design tools", duration: "6 months", category: "skill", priority: "medium" },
                { title: "Summer Internships", description: "Construction sites, consultancy firms", duration: "6 months", category: "experience", priority: "high" },
                { title: "Final Year Project", description: "Real-world civil engineering project", duration: "6 months", category: "project", priority: "medium" },
                { title: "Campus Placement / GATE", description: "Get job or pursue M.Tech", duration: "6 months", category: "career", priority: "high" }
            ]
        },
        {
            id: 6,
            name: "Digital Marketer",
            icon: "📱",
            color: "from-pink-500 to-rose-600",
            totalDuration: "3-4 years",
            steps: [
                { title: "Complete 12th (Any Stream)", description: "Basic education foundation", duration: "2 years", category: "education", priority: "medium" },
                { title: "Learn Digital Marketing Basics", description: "SEO, Social Media, Content", duration: "3 months", category: "skill", priority: "high" },
                { title: "Degree/Diploma (Optional)", description: "BBA, Marketing, or online courses", duration: "3 years", category: "education", priority: "medium" },
                { title: "Master Core Skills", description: "Google Ads, Facebook Ads, Analytics", duration: "6 months", category: "skill", priority: "high" },
                { title: "Get Certifications", description: "Google, HubSpot, Meta certifications", duration: "3 months", category: "milestone", priority: "medium" },
                { title: "Freelance / Internship", description: "Gain practical experience", duration: "6 months", category: "experience", priority: "high" },
                { title: "Build Portfolio", description: "Showcase campaigns & results", duration: "Ongoing", category: "project", priority: "medium" },
                { title: "Get Full-time Job", description: "Digital Marketing Executive", duration: "3 months", category: "career", priority: "high" }
            ]
        }
    ];

    // Load template
    const loadTemplate = (template) => {
        setSelectedCareer(template);
        setRoadmapSteps(template.steps.map((step, index) => ({
            ...step,
            id: index + 1,
            completed: false
        })));
    };

    // Add custom step
    const handleAddStep = () => {
        if (!newStep.title.trim()) return;

        setRoadmapSteps([...roadmapSteps, {
            ...newStep,
            id: roadmapSteps.length + 1,
            completed: false
        }]);

        setNewStep({
            title: '',
            description: '',
            duration: '',
            category: 'education',
            priority: 'medium'
        });
        setIsAddingStep(false);
    };

    // Toggle step completion
    const toggleStepCompletion = (stepId) => {
        setRoadmapSteps(roadmapSteps.map(step =>
            step.id === stepId ? { ...step, completed: !step.completed } : step
        ));
    };

    // Delete step
    const deleteStep = (stepId) => {
        setRoadmapSteps(roadmapSteps.filter(step => step.id !== stepId));
    };

    // Edit step
    const startEditingStep = (step) => {
        setEditingStep(step);
    };

    const saveEditedStep = () => {
        setRoadmapSteps(roadmapSteps.map(step =>
            step.id === editingStep.id ? editingStep : step
        ));
        setEditingStep(null);
    };

    // Get category icon and color
    const getCategoryStyle = (category) => {
        const styles = {
            education: { icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-100' },
            skill: { icon: Target, color: 'text-purple-500', bg: 'bg-purple-100' },
            project: { icon: Briefcase, color: 'text-green-500', bg: 'bg-green-100' },
            experience: { icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-100' },
            milestone: { icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-100' },
            career: { icon: Award, color: 'text-red-500', bg: 'bg-red-100' }
        };
        return styles[category] || styles.education;
    };

    // Calculate progress
    const calculateProgress = () => {
        if (roadmapSteps.length === 0) return 0;
        const completed = roadmapSteps.filter(step => step.completed).length;
        return Math.round((completed / roadmapSteps.length) * 100);
    };

    // Export roadmap
    const handleExport = () => {
        const content = `
MY CAREER ROADMAP: ${selectedCareer?.name || 'Custom Career'}
${'='.repeat(50)}

Total Steps: ${roadmapSteps.length}
Completed: ${roadmapSteps.filter(s => s.completed).length}
Progress: ${calculateProgress()}%

ROADMAP STEPS:
${roadmapSteps.map((step, index) => `
${index + 1}. ${step.completed ? '✅' : '⭕'} ${step.title}
   Duration: ${step.duration}
   Category: ${step.category}
   Priority: ${step.priority}
   ${step.description}
`).join('\n')}

Generated by COGNITRIAL Career Roadmap Builder
    `.trim();

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Career_Roadmap_${selectedCareer?.name || 'Custom'}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('✅ Roadmap exported successfully!');
    };

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-slate-50 to-indigo-50'
            }`}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                            🗺️ Career Roadmap Builder
                        </h2>
                        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Build your personalized step-by-step career journey
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-xl transition-colors ${darkMode ? 'bg-[#1a1f2e] hover:bg-[#272757]' : 'bg-white hover:bg-gray-100'
                            }`}
                    >
                        <X className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </button>
                </div>

                {!selectedCareer ? (
                    /* Template Selection */
                    <div>
                        <div className="text-center mb-8">
                            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                                Choose a Career Template or Start from Scratch
                            </h3>
                            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Select a pre-built roadmap or create your own custom path
                            </p>
                        </div>

                        {/* Templates Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {careerTemplates.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => loadTemplate(template)}
                                    className={`group relative rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden ${darkMode ? 'bg-[#1a1f2e] border border-[#272757]' : 'bg-white border border-indigo-100'
                                        }`}
                                >
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${template.color}`}></div>

                                    <div className="relative z-10">
                                        <div className="text-5xl mb-4">{template.icon}</div>
                                        <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {template.name}
                                        </h3>
                                        <div className="space-y-2">
                                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                ⏱️ {template.totalDuration}
                                            </div>
                                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                📋 {template.steps.length} steps
                                            </div>
                                            <div className={`text-sm font-semibold ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'}`}>
                                                Load Template →
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}

                            {/* Custom Roadmap Button */}
                            <button
                                onClick={() => setSelectedCareer({ name: 'Custom Career', icon: '🎯' })}
                                className={`group relative rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden border-2 border-dashed ${darkMode ? 'bg-[#1a1f2e] border-[#505081]' : 'bg-white border-indigo-300'
                                    }`}
                            >
                                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                                    <Plus className={`w-12 h-12 mb-4 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'}`} />
                                    <h3 className={`text-xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Create Custom Roadmap
                                    </h3>
                                    <p className={`text-sm mt-2 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Build your own path from scratch
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Roadmap Builder */
                    <div>
                        {/* Roadmap Header */}
                        <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-[#1a1f2e] border border-[#272757]' : 'bg-white border border-indigo-100'
                            }`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="text-5xl">{selectedCareer.icon}</div>
                                    <div>
                                        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {selectedCareer.name}
                                        </h3>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {roadmapSteps.length} steps • {calculateProgress()}% complete
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleExport}
                                        className={`px-4 py-2 rounded-xl font-semibold flex items-center gap-2 ${darkMode ? 'bg-[#272757] hover:bg-[#505081] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                            }`}
                                    >
                                        <Download className="w-4 h-4" />
                                        Export
                                    </button>
                                    <button
                                        onClick={() => setSelectedCareer(null)}
                                        className={`px-4 py-2 rounded-xl font-semibold ${darkMode ? 'bg-[#272757] text-white' : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        ← Back
                                    </button>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? 'bg-[#272757]' : 'bg-gray-200'
                                }`}>
                                <div
                                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500"
                                    style={{ width: `${calculateProgress()}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Add Step Button */}
                        {!isAddingStep && (
                            <button
                                onClick={() => setIsAddingStep(true)}
                                className={`w-full mb-6 p-4 rounded-xl border-2 border-dashed transition-colors flex items-center justify-center gap-2 ${darkMode
                                    ? 'border-[#505081] hover:border-[#8686AC] hover:bg-[#1a1f2e] text-gray-400 hover:text-white'
                                    : 'border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50 text-gray-600 hover:text-indigo-700'
                                    }`}
                            >
                                <Plus className="w-5 h-5" />
                                <span className="font-semibold">Add Custom Step</span>
                            </button>
                        )}

                        {/* Add Step Form */}
                        {isAddingStep && (
                            <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-[#1a1f2e] border border-[#272757]' : 'bg-white border border-indigo-100'
                                }`}>
                                <h4 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Add New Step
                                </h4>
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Step title *"
                                        value={newStep.title}
                                        onChange={(e) => setNewStep({ ...newStep, title: e.target.value })}
                                        className={`px-4 py-2 rounded-xl border-2 ${darkMode
                                            ? 'bg-[#272757] border-[#505081] text-white placeholder-gray-500'
                                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                            } focus:outline-none focus:border-indigo-500`}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Duration (e.g., 6 months)"
                                        value={newStep.duration}
                                        onChange={(e) => setNewStep({ ...newStep, duration: e.target.value })}
                                        className={`px-4 py-2 rounded-xl border-2 ${darkMode
                                            ? 'bg-[#272757] border-[#505081] text-white placeholder-gray-500'
                                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                            } focus:outline-none focus:border-indigo-500`}
                                    />
                                </div>
                                <textarea
                                    placeholder="Description"
                                    value={newStep.description}
                                    onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
                                    rows={2}
                                    className={`w-full px-4 py-2 rounded-xl border-2 mb-4 ${darkMode
                                        ? 'bg-[#272757] border-[#505081] text-white placeholder-gray-500'
                                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                        } focus:outline-none focus:border-indigo-500`}
                                />
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <select
                                        value={newStep.category}
                                        onChange={(e) => setNewStep({ ...newStep, category: e.target.value })}
                                        className={`px-4 py-2 rounded-xl border-2 ${darkMode
                                            ? 'bg-[#272757] border-[#505081] text-white'
                                            : 'bg-white border-gray-200 text-gray-900'
                                            } focus:outline-none focus:border-indigo-500`}
                                    >
                                        <option value="education">📚 Education</option>
                                        <option value="skill">🎯 Skill</option>
                                        <option value="project">💼 Project</option>
                                        <option value="experience">📈 Experience</option>
                                        <option value="milestone">🏆 Milestone</option>
                                        <option value="career">🎖️ Career</option>
                                    </select>
                                    <select
                                        value={newStep.priority}
                                        onChange={(e) => setNewStep({ ...newStep, priority: e.target.value })}
                                        className={`px-4 py-2 rounded-xl border-2 ${darkMode
                                            ? 'bg-[#272757] border-[#505081] text-white'
                                            : 'bg-white border-gray-200 text-gray-900'
                                            } focus:outline-none focus:border-indigo-500`}
                                    >
                                        <option value="high">🔴 High Priority</option>
                                        <option value="medium">🟡 Medium Priority</option>
                                        <option value="low">🟢 Low Priority</option>
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddStep}
                                        className="flex-1 px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                                    >
                                        Add Step
                                    </button>
                                    <button
                                        onClick={() => setIsAddingStep(false)}
                                        className={`px-4 py-2 rounded-xl font-semibold ${darkMode ? 'bg-[#272757] text-white' : 'bg-gray-200 text-gray-700'
                                            }`}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Roadmap Steps */}
                        <div className="space-y-4">
                            {roadmapSteps.map((step, index) => {
                                const categoryStyle = getCategoryStyle(step.category);
                                const IconComponent = categoryStyle.icon;

                                return (
                                    <div
                                        key={step.id}
                                        className={`relative rounded-2xl p-6 transition-all ${step.completed
                                            ? darkMode ? 'bg-[#1a2e1a] border border-green-900/50' : 'bg-green-50 border border-green-200'
                                            : darkMode ? 'bg-[#1a1f2e] border border-[#272757]' : 'bg-white border border-gray-200'
                                            }`}
                                    >
                                        {/* Vertical Line */}
                                        {index < roadmapSteps.length - 1 && (
                                            <div className={`absolute left-9 top-20 w-0.5 h-10 ${darkMode ? 'bg-[#272757]' : 'bg-gray-200'
                                                }`}></div>
                                        )}

                                        <div className="flex items-start gap-4">
                                            {/* Checkbox */}
                                            <button
                                                onClick={() => toggleStepCompletion(step.id)}
                                                className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${step.completed
                                                    ? 'bg-green-500 border-green-500'
                                                    : darkMode ? 'border-[#505081] hover:border-[#8686AC]' : 'border-gray-300 hover:border-indigo-500'
                                                    }`}
                                            >
                                                {step.completed ? (
                                                    <CheckCircle className="w-6 h-6 text-white" />
                                                ) : (
                                                    <Circle className={`w-6 h-6 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                                                )}
                                            </button>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h4 className={`text-lg font-bold ${step.completed
                                                                ? 'line-through opacity-60'
                                                                : darkMode ? 'text-white' : 'text-gray-900'
                                                                }`}>
                                                                {step.title}
                                                            </h4>
                                                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${step.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                                step.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                                    'bg-green-100 text-green-700'
                                                                }`}>
                                                                {step.priority}
                                                            </span>
                                                        </div>
                                                        <p className={`text-sm mb-2 ${step.completed
                                                            ? 'opacity-50'
                                                            : darkMode ? 'text-gray-400' : 'text-gray-600'
                                                            }`}>
                                                            {step.description}
                                                        </p>
                                                        <div className="flex items-center gap-4">
                                                            <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${categoryStyle.bg}`}>
                                                                <IconComponent className={`w-3 h-3 ${categoryStyle.color}`} />
                                                                <span className={categoryStyle.color}>{step.category}</span>
                                                            </div>
                                                            <div className={`flex items-center gap-1 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'
                                                                }`}>
                                                                <Calendar className="w-3 h-3" />
                                                                {step.duration}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => deleteStep(step.id)}
                                                            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-[#272757]' : 'hover:bg-gray-100'
                                                                }`}
                                                        >
                                                            <Trash2 className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Empty State */}
                        {roadmapSteps.length === 0 && (
                            <div className={`text-center py-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <p className="text-lg mb-2">No steps yet!</p>
                                <p className="text-sm">Add your first step to start building your roadmap</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CareerRoadmapBuilder;