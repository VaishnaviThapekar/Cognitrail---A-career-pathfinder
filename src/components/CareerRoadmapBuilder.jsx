import React, { useState, useEffect } from 'react';
import { X, Plus, Target, Calendar, Award, CheckCircle, Trash2, Edit2, Save, TrendingUp, BookOpen, Briefcase, GraduationCap, Trophy, Sparkles, Download, CheckCircle2, RotateCcw, AlertTriangle, ShieldCheck, Clock, Layers } from 'lucide-react';

const CareerRoadmapBuilder = ({ onClose, darkMode }) => {
    // Verified career roadmap templates
    const defaultTemplates = [
        {
            id: 'template_swe',
            name: "Software Engineer & AI",
            icon: "💻",
            domain: "Technology",
            totalDuration: "4-6 years",
            description: "End-to-end pathway from high school foundation to senior engineering and AI systems architecture.",
            steps: [
                { id: 'swe_1', title: "Complete 12th (PCM)", description: "Focus on Mathematics, Physics, and foundational Computer Science concepts", duration: "2 years", category: "education", priority: "high", completed: false },
                { id: 'swe_2', title: "Learn Core Programming & DSA", description: "Master Python/C++/Java, algorithmic problem solving, and Data Structures", duration: "6 months", category: "skill", priority: "high", completed: false },
                { id: 'swe_3', title: "B.Tech/B.S. in Computer Science", description: "Pursue computer science curriculum with strong operating systems, DBMS, and networking base", duration: "4 years", category: "education", priority: "high", completed: false },
                { id: 'swe_4', title: "Build Full-Stack & AI Projects", description: "Ship 4-6 production-ready applications with React, Node.js, databases, and LLM APIs", duration: "Ongoing", category: "project", priority: "high", completed: false },
                { id: 'swe_5', title: "Software Engineering Internships", description: "Complete 2 industry internships to gain real-world agile workflow and code review experience", duration: "6-12 months", category: "experience", priority: "high", completed: false },
                { id: 'swe_6', title: "Master Cloud & DevOps", description: "Get certified in AWS/GCP, Docker, Kubernetes, and CI/CD automated deployment pipelines", duration: "6-9 months", category: "skill", priority: "medium", completed: false },
                { id: 'swe_7', title: "Land SDE Role & Scale", description: "Clear technical interviews and start full-time engineering career targeting SDE-II in 2-3 years", duration: "3-6 months", category: "career", priority: "high", completed: false }
            ]
        },
        {
            id: 'template_doctor',
            name: "Doctor (MBBS & Specialization)",
            icon: "⚕️",
            domain: "Medicine",
            totalDuration: "10-12 years",
            description: "Rigorous clinical pathway through undergraduate medical training, residency, and specialist certification.",
            steps: [
                { id: 'doc_1', title: "Complete 12th (PCB)", description: "Maintain 85%+ in Physics, Chemistry, Biology with solid concept clarity", duration: "2 years", category: "education", priority: "high", completed: false },
                { id: 'doc_2', title: "Crack NEET-UG Entrance Exam", description: "Target 620+ score for top government medical colleges through structured test series", duration: "1-2 years", category: "milestone", priority: "high", completed: false },
                { id: 'doc_3', title: "MBBS Degree & Clinical Rotations", description: "Complete 4.5 years of medical theory followed by 1 year compulsory rotatory residential internship", duration: "5.5 years", category: "education", priority: "high", completed: false },
                { id: 'doc_4', title: "NEET-PG / NExT Preparation", description: "Intensive preparation for clinical post-graduate entrance specialization", duration: "1 year", category: "education", priority: "high", completed: false },
                { id: 'doc_5', title: "MD / MS Post-Graduation Residency", description: "3 years specialized hospital training in Cardiology, Surgery, Pediatrics, or Radiology", duration: "3 years", category: "education", priority: "high", completed: false },
                { id: 'doc_6', title: "Senior Residency & Consultant Practice", description: "Join premier super-specialty hospital or establish independent private clinical practice", duration: "2-4 years", category: "career", priority: "high", completed: false }
            ]
        },
        {
            id: 'template_ds',
            name: "Data Scientist & ML Engineer",
            icon: "📊",
            domain: "AI & Analytics",
            totalDuration: "4-5 years",
            description: "Math, statistics, machine learning pipelines, deep learning, and enterprise MLOps architecture.",
            steps: [
                { id: 'ds_1', title: "Complete 12th (PCM)", description: "Strong mathematical foundation in Linear Algebra, Calculus, and Probability", duration: "2 years", category: "education", priority: "high", completed: false },
                { id: 'ds_2', title: "Master Python, SQL & Data Wrangling", description: "Learn Pandas, NumPy, SQL query optimization, data visualization with Seaborn/Plotly", duration: "6 months", category: "skill", priority: "high", completed: false },
                { id: 'ds_3', title: "Degree in CS, Statistics, or Math", description: "B.Tech in CSE / Data Science or B.Sc in Statistics with hands-on labs", duration: "3-4 years", category: "education", priority: "high", completed: false },
                { id: 'ds_4', title: "Machine Learning & Deep Learning", description: "Implement Scikit-Learn, PyTorch, Transformers, Computer Vision, and NLP models", duration: "9 months", category: "skill", priority: "high", completed: false },
                { id: 'ds_5', title: "Kaggle Competitions & Open Source", description: "Rank in Kaggle competitions and publish end-to-end reproducible Jupyter case studies", duration: "Ongoing", category: "project", priority: "medium", completed: false },
                { id: 'ds_6', title: "MLOps & Cloud Deployment", description: "Learn MLflow, FastAPI, Docker, and AWS SageMaker for production model serving", duration: "6 months", category: "skill", priority: "high", completed: false },
                { id: 'ds_7', title: "Land Data Scientist / MLE Position", description: "Join tech enterprise or high-growth AI startup driving predictive business solutions", duration: "3-6 months", category: "career", priority: "high", completed: false }
            ]
        },
        {
            id: 'template_ca',
            name: "Chartered Accountant (CA)",
            icon: "💼",
            domain: "Finance & Taxation",
            totalDuration: "5-6 years",
            description: "Premier professional qualification in auditing, taxation, corporate financial management, and law.",
            steps: [
                { id: 'ca_1', title: "Complete 12th (Commerce/Any Stream)", description: "Focus on Accountancy, Economics, Commercial Mathematics, and Business Law", duration: "2 years", category: "education", priority: "high", completed: false },
                { id: 'ca_2', title: "Register & Clear CA Foundation", description: "Clear 4 foundational papers conducted by ICAI after 12th examination", duration: "6-8 months", category: "milestone", priority: "high", completed: false },
                { id: 'ca_3', title: "Clear CA Intermediate (Both Groups)", description: "Pass Advanced Accounting, Corporate Laws, Costing, Direct & Indirect Taxation", duration: "1-1.5 years", category: "education", priority: "high", completed: false },
                { id: 'ca_4', title: "Mandatory Articleship Training", description: "Complete 2-3 years practical audit and corporate tax training under a practicing CA / Big 4 firm", duration: "2-3 years", category: "experience", priority: "high", completed: false },
                { id: 'ca_5', title: "Clear CA Final Examination", description: "Qualify in Strategic Financial Management, Auditing, and Corporate Laws", duration: "1 year", category: "milestone", priority: "high", completed: false },
                { id: 'ca_6', title: "ICAI Membership & Practice", description: "Receive COP to start independent auditing firm or join corporate finance leadership (CFO track)", duration: "Ongoing", category: "career", priority: "high", completed: false }
            ]
        },
        {
            id: 'template_design',
            name: "UI/UX & Product Designer",
            icon: "🎨",
            domain: "Design & Product",
            totalDuration: "3-4 years",
            description: "User research, interaction architecture, visual design systems, and rapid prototyping workflows.",
            steps: [
                { id: 'ui_1', title: "Complete 12th in Any Stream", description: "Develop creative thinking, visual aesthetics, typography appreciation, and empathy", duration: "2 years", category: "education", priority: "high", completed: false },
                { id: 'ui_2', title: "Master Figma & Design Systems", description: "Learn component architecture, autolayout, responsive constraints, and design tokens", duration: "6 months", category: "skill", priority: "high", completed: false },
                { id: 'ui_3', title: "Design Degree or Specialized Bootcamp", description: "Pursue B.Des (NID, IIT, NIFT) or intensive accredited UX design immersion", duration: "3-4 years", category: "education", priority: "high", completed: false },
                { id: 'ui_4', title: "Build 3 Deep UX Case Studies", description: "Execute end-to-end qualitative research, wireframes, usability testing, and high-fidelity prototype", duration: "6 months", category: "project", priority: "high", completed: false },
                { id: 'ui_5', title: "Product Design Internships", description: "Work alongside engineers and product managers at high-growth tech companies", duration: "6 months", category: "experience", priority: "high", completed: false },
                { id: 'ui_6', title: "Join as Full-Time Product Designer", description: "Own product user journeys, design systems, and conversion-optimized interfaces", duration: "Ongoing", category: "career", priority: "high", completed: false }
            ]
        },
        {
            id: 'template_law',
            name: "Corporate Lawyer & Legal Advisor",
            icon: "⚖️",
            domain: "Law & Compliance",
            totalDuration: "5-6 years",
            description: "Entrance exams, 5-year integrated law degree, corporate internships, and bar council qualification.",
            steps: [
                { id: 'law_1', title: "Complete 12th Any Stream", description: "Cultivate strong analytical reading, comprehension, and current legal affairs awareness", duration: "2 years", category: "education", priority: "high", completed: false },
                { id: 'law_2', title: "Crack CLAT / AILET Entrance", description: "Secure admission in top National Law Universities (NLUs) across India", duration: "1 year", category: "milestone", priority: "high", completed: false },
                { id: 'law_3', title: "5-Year Integrated BA/BBA LLB Degree", description: "Study Corporate Law, IPR, Contracts, Arbitration, and participate in Moot Court competitions", duration: "5 years", category: "education", priority: "high", completed: false },
                { id: 'law_4', title: "Tier-1 Law Firm Internships", description: "Complete annual internships with leading corporate law firms (M&A, PE, VC, Capital Markets)", duration: "1-2 years", category: "experience", priority: "high", completed: false },
                { id: 'law_5', title: "Clear All India Bar Examination (AIBE)", description: "Obtain permanent advocate license from the State Bar Council", duration: "6 months", category: "milestone", priority: "high", completed: false },
                { id: 'law_6', title: "Corporate Associate / In-House Counsel", description: "Join top-tier legal practice firm or tech conglomerate legal counsel division", duration: "Ongoing", category: "career", priority: "high", completed: false }
            ]
        },
        {
            id: 'template_pm',
            name: "Product Manager (Tech)",
            icon: "🚀",
            domain: "Management",
            totalDuration: "4-6 years",
            description: "Product strategy, user empathy, metric definitions, cross-functional execution, and go-to-market roadmaps.",
            steps: [
                { id: 'pm_1', title: "Complete 12th & Bachelor's Degree", description: "Degree in Engineering, Computer Science, Economics, or Business", duration: "4 years", category: "education", priority: "high", completed: false },
                { id: 'pm_2', title: "Learn Product Fundamentals", description: "Master PRD creation, user journey mapping, agile sprints, and SQL analytics", duration: "6 months", category: "skill", priority: "high", completed: false },
                { id: 'pm_3', title: "Build Side Products / APM Role", description: "Launch independent apps, tear down popular apps, or join an Associate Product Manager cohort", duration: "1-2 years", category: "project", priority: "high", completed: false },
                { id: 'pm_4', title: "Master Growth & Product Metrics", description: "Learn A/B testing, cohort analysis, North Star metrics, Mixpanel/Amplitude", duration: "6 months", category: "skill", priority: "medium", completed: false },
                { id: 'pm_5', title: "Lead Product Teams as Core PM", description: "Own end-to-end product roadmap, feature discovery, and business OKRs", duration: "Ongoing", category: "career", priority: "high", completed: false }
            ]
        },
        {
            id: 'template_cyber',
            name: "Cybersecurity Specialist & Ethical Hacker",
            icon: "🛡️",
            domain: "Security",
            totalDuration: "4-5 years",
            description: "Network security, penetration testing, reverse engineering, defensive operations, and cloud compliance.",
            steps: [
                { id: 'cyb_1', title: "Complete 12th (PCM)", description: "Focus on Computer Science, logic gates, and networking fundamentals", duration: "2 years", category: "education", priority: "high", completed: false },
                { id: 'cyb_2', title: "Master Linux, Networking & Bash", description: "TCP/IP, Wireshark, OSI layers, firewall configurations, and shell scripting", duration: "6 months", category: "skill", priority: "high", completed: false },
                { id: 'cyb_3', title: "B.Tech in IT / Cyber Security / CS", description: "Undergraduate degree focusing on cryptography, systems architecture, and security", duration: "4 years", category: "education", priority: "high", completed: false },
                { id: 'cyb_4', title: "Obtain Industry Certifications", description: "Earn CompTIA Security+, CEH (Certified Ethical Hacker), or OSCP certification", duration: "1 year", category: "milestone", priority: "high", completed: false },
                { id: 'cyb_5', title: "Bug Bounty & CTF Challenges", description: "Participate in HackTheBox, TryHackMe, and HackerOne vulnerability disclosure programs", duration: "Ongoing", category: "project", priority: "high", completed: false },
                { id: 'cyb_6', title: "Join as Security Analyst / Pen-Tester", description: "Work in Security Operations Center (SOC) or defensive red/blue cybersecurity teams", duration: "Ongoing", category: "career", priority: "high", completed: false }
            ]
        }
    ];

    // Saved custom roadmaps from localStorage
    const [savedCustomRoadmaps, setSavedCustomRoadmaps] = useState(() => {
        try {
            const saved = localStorage.getItem('cognitrail_saved_custom_roadmaps');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Active roadmap selection
    const [selectedCareer, setSelectedCareer] = useState(() => {
        try {
            const cachedActive = localStorage.getItem('cognitrail_active_roadmap_state');
            if (cachedActive) {
                const parsed = JSON.parse(cachedActive);
                if (parsed.career && parsed.steps) return parsed.career;
            }
        } catch {
            // ignore
        }
        return null;
    });

    const [roadmapSteps, setRoadmapSteps] = useState(() => {
        try {
            const cachedActive = localStorage.getItem('cognitrail_active_roadmap_state');
            if (cachedActive) {
                const parsed = JSON.parse(cachedActive);
                if (parsed.career && parsed.steps) return parsed.steps;
            }
        } catch {
            // ignore
        }
        return [];
    });

    const [isAddingStep, setIsAddingStep] = useState(false);
    const [editingStepId, setEditingStepId] = useState(null);
    const [editStepData, setEditStepData] = useState({ title: '', description: '', duration: '', priority: 'medium', category: 'education' });
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newRoadmapMeta, setNewRoadmapMeta] = useState({ name: '', icon: '🎯', domain: 'Custom', totalDuration: '3-4 years' });

    const [newStep, setNewStep] = useState({
        title: '',
        description: '',
        duration: '',
        category: 'skill',
        priority: 'high'
    });

    // Keyboard Escape key listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (showCreateModal) {
                    setShowCreateModal(false);
                } else if (showResetConfirm) {
                    setShowResetConfirm(false);
                } else if (onClose) {
                    onClose();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, showCreateModal, showResetConfirm]);

    // Save active roadmap on changes
    useEffect(() => {
        if (selectedCareer && roadmapSteps.length > 0) {
            localStorage.setItem('cognitrail_active_roadmap_state', JSON.stringify({
                career: selectedCareer,
                steps: roadmapSteps
            }));
        } else if (!selectedCareer) {
            localStorage.removeItem('cognitrail_active_roadmap_state');
        }
    }, [selectedCareer, roadmapSteps]);

    // Save custom roadmaps list
    useEffect(() => {
        try {
            localStorage.setItem('cognitrail_saved_custom_roadmaps', JSON.stringify(savedCustomRoadmaps));
        } catch (e) {
            console.error('Failed to persist custom roadmaps:', e);
        }
    }, [savedCustomRoadmaps]);

    const loadTemplate = (template) => {
        setSelectedCareer(template);
        // Deep copy steps with unique IDs
        const stepsWithStatus = template.steps.map((s, idx) => ({
            ...s,
            id: s.id || `step_${Date.now()}_${idx}`,
            completed: Boolean(s.completed)
        }));
        setRoadmapSteps(stepsWithStatus);
    };

    const handleCreateCustomRoadmap = () => {
        if (!newRoadmapMeta.name.trim()) return;

        const uniqueId = `custom_rm_${Date.now()}`;
        const initialMilestone = {
            id: `step_${Date.now()}_1`,
            title: "Foundation & Planning",
            description: "Define career goals, review entrance prerequisites, and gather foundational study material",
            duration: "3-6 months",
            category: "education",
            priority: "high",
            completed: false
        };

        const customRoadmap = {
            id: uniqueId,
            name: newRoadmapMeta.name.trim(),
            icon: newRoadmapMeta.icon || '🎯',
            domain: newRoadmapMeta.domain || 'Custom Track',
            totalDuration: newRoadmapMeta.totalDuration || '2-4 years',
            description: `Personalized milestone path created on ${new Date().toLocaleDateString()}`,
            isCustom: true,
            steps: [initialMilestone]
        };

        // Add to saved custom roadmaps list without overwriting existing ones!
        setSavedCustomRoadmaps(prev => [customRoadmap, ...prev]);
        setSelectedCareer(customRoadmap);
        setRoadmapSteps([initialMilestone]);
        setShowCreateModal(false);
        setNewRoadmapMeta({ name: '', icon: '🎯', domain: 'Custom', totalDuration: '3-4 years' });
    };

    const handleDeleteCustomRoadmap = (e, roadmapId) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this custom roadmap?")) {
            setSavedCustomRoadmaps(prev => prev.filter(r => r.id !== roadmapId));
            if (selectedCareer?.id === roadmapId) {
                setSelectedCareer(null);
                setRoadmapSteps([]);
            }
        }
    };

    const handleAddStep = () => {
        if (!newStep.title.trim()) return;
        const stepToAdd = {
            ...newStep,
            id: `step_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            completed: false
        };
        const updatedSteps = [...roadmapSteps, stepToAdd];
        setRoadmapSteps(updatedSteps);

        // If custom roadmap, also update saved custom roadmap list
        if (selectedCareer?.isCustom) {
            setSavedCustomRoadmaps(prev => prev.map(r => r.id === selectedCareer.id ? { ...r, steps: updatedSteps } : r));
        }

        setNewStep({ title: '', description: '', duration: '', category: 'skill', priority: 'high' });
        setIsAddingStep(false);
    };

    const handleStartEditStep = (step) => {
        setEditingStepId(step.id);
        setEditStepData({
            title: step.title,
            description: step.description,
            duration: step.duration,
            priority: step.priority || 'medium',
            category: step.category || 'skill'
        });
    };

    const handleSaveEditStep = (stepId) => {
        if (!editStepData.title.trim()) return;
        const updated = roadmapSteps.map(s => s.id === stepId ? { ...s, ...editStepData } : s);
        setRoadmapSteps(updated);
        if (selectedCareer?.isCustom) {
            setSavedCustomRoadmaps(prev => prev.map(r => r.id === selectedCareer.id ? { ...r, steps: updated } : r));
        }
        setEditingStepId(null);
    };

    const handleToggleStep = (stepId) => {
        const updated = roadmapSteps.map(s => s.id === stepId ? { ...s, completed: !s.completed } : s);
        setRoadmapSteps(updated);
        if (selectedCareer?.isCustom) {
            setSavedCustomRoadmaps(prev => prev.map(r => r.id === selectedCareer.id ? { ...r, steps: updated } : r));
        }
    };

    const handleDeleteStep = (stepId) => {
        const updated = roadmapSteps.filter(s => s.id !== stepId);
        setRoadmapSteps(updated);
        if (selectedCareer?.isCustom) {
            setSavedCustomRoadmaps(prev => prev.map(r => r.id === selectedCareer.id ? { ...r, steps: updated } : r));
        }
    };

    const calculateProgress = () => {
        if (roadmapSteps.length === 0) return 0;
        const completed = roadmapSteps.filter(s => s.completed).length;
        return Math.round((completed / roadmapSteps.length) * 100);
    };

    const handleSafeReset = () => {
        const resetSteps = roadmapSteps.map(s => ({ ...s, completed: false }));
        setRoadmapSteps(resetSteps);
        if (selectedCareer?.isCustom) {
            setSavedCustomRoadmaps(prev => prev.map(r => r.id === selectedCareer.id ? { ...r, steps: resetSteps } : r));
        }
        setShowResetConfirm(false);
    };

    const handleExport = () => {
        const progress = calculateProgress();
        const completedCount = roadmapSteps.filter(s => s.completed).length;
        const pendingCount = roadmapSteps.length - completedCount;

        const text = `
============================================================
COGNITRAIL CAREER ROADMAP: ${selectedCareer?.name || 'Custom Career'}
============================================================
Generated: ${new Date().toLocaleString()}
Domain: ${selectedCareer?.domain || 'General'}
Estimated Total Timeline: ${selectedCareer?.totalDuration || 'Flexible'}
Overall Completion: ${progress}% (${completedCount}/${roadmapSteps.length} milestones achieved)
Pending Milestones: ${pendingCount}

------------------------------------------------------------
STEP-BY-STEP MILESTONES:
------------------------------------------------------------
${roadmapSteps.map((s, i) => `
${i + 1}. [${s.completed ? 'COMPLETED ✓' : 'PENDING ⏳'}] ${s.title}
   - Duration: ${s.duration || 'Flexible'}
   - Priority: ${(s.priority || 'Medium').toUpperCase()}
   - Category: ${(s.category || 'General').toUpperCase()}
   - Action Items: ${s.description || 'No specific description provided'}
`).join('')}

------------------------------------------------------------
DISCLAIMER & NOTICE:
All roadmap timelines are indicative estimates based on standardized career progression frameworks.
Individual completion durations may vary depending on dedication, curriculum changes, and personal pace.

Exported from Cognitrail Career Pathfinder • https://cognitrail.app
============================================================
        `.trim();

        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${(selectedCareer?.name || 'Career').replace(/[^a-zA-Z0-9]/g, '_')}_Roadmap.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div 
            role="dialog"
            aria-modal="true"
            aria-label="Career Roadmap Builder"
            className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#09090b]' : 'bg-zinc-50'}`}
        >
            <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
                {/* Top Bar Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">🗺️</span>
                            <h2 className={`text-2xl sm:text-3xl font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                                Career Roadmap Builder
                            </h2>
                            <span className="text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-md shadow-[#0265A6]/20">
                                Verified Curriculums
                            </span>
                        </div>
                        <p className={`text-sm sm:text-base ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                            Build, customize, and track actionable career milestones with persistent progress
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2.5 rounded-xl border btn-interactive hover-lift ${darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#6096BA] hover:text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6] hover:bg-[#0265A6] hover:text-white'}`}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {!selectedCareer ? (
                    /* Template Selection Grid */
                    <div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h3 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                                    Select a Pathway or Create Custom Track
                                </h3>
                                <p className={`text-xs ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                    Choose from verified career pathways or build a personalized milestone roadmap
                                </p>
                            </div>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="px-5 py-2.5 rounded-xl text-xs font-bold border flex items-center gap-2 btn-interactive hover-lift bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] border-[#0265A6]/40 text-white hover:brightness-110 shadow-md shadow-[#0265A6]/25"
                            >
                                <Plus className="w-4 h-4 text-white" />
                                <span>Create Custom Roadmap</span>
                            </button>
                        </div>

                        {/* Custom Saved Roadmaps section if any */}
                        {savedCustomRoadmaps.length > 0 && (
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                                        Your Custom Roadmaps ({savedCustomRoadmaps.length})
                                    </span>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {savedCustomRoadmaps.map(rm => (
                                        <div
                                            key={rm.id}
                                            onClick={() => loadTemplate(rm)}
                                            className={`group relative rounded-2xl p-5 text-left border cursor-pointer transition-all hover-lift ${darkMode ? 'bg-[#121215] border-zinc-700 hover:border-zinc-400' : 'bg-white border-zinc-300 hover:border-zinc-600 shadow-sm'}`}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="text-3xl">{rm.icon}</div>
                                                <button
                                                    onClick={(e) => handleDeleteCustomRoadmap(e, rm.id)}
                                                    className="p-1.5 rounded-lg border border-transparent text-zinc-400 hover:text-zinc-100 hover:border-zinc-600"
                                                    title="Delete Custom Roadmap"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                            <h4 className={`text-base font-black mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>
                                                {rm.name}
                                            </h4>
                                            <p className={`text-xs line-clamp-2 mb-3 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                                {rm.description}
                                            </p>
                                            <div className="flex items-center justify-between text-xs font-semibold text-zinc-500">
                                                <span>⏱️ {rm.totalDuration}</span>
                                                <span className={`font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Open Roadmap →</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Default Verified Career Templates Grid */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                                Standard Verified Industry Templates ({defaultTemplates.length})
                            </span>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {defaultTemplates.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => loadTemplate(template)}
                                    className={`group relative rounded-3xl p-6 text-left border transition-all duration-300 hover-lift btn-interactive flex flex-col justify-between ${darkMode
                                        ? 'bg-[#121215] border-zinc-800 hover:border-zinc-500'
                                        : 'bg-white border-zinc-200 hover:border-zinc-500 shadow-sm'
                                        }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-3xl">{template.icon}</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-700'}`}>
                                                {template.domain}
                                            </span>
                                        </div>
                                        <h4 className={`text-base font-black mb-1.5 transition-colors ${darkMode ? 'text-white group-hover:text-zinc-200' : 'text-black group-hover:text-zinc-800'}`}>
                                            {template.name}
                                        </h4>
                                        <p className={`text-xs mb-4 line-clamp-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                            {template.description}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="space-y-1 text-xs font-semibold mb-3 text-zinc-500 dark:text-zinc-400">
                                            <div className="flex justify-between">
                                                <span>Est. Duration:</span>
                                                <span className="font-bold text-black dark:text-white">{template.totalDuration}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Milestones:</span>
                                                <span className="font-bold text-black dark:text-white">{template.steps.length} Steps</span>
                                            </div>
                                        </div>
                                        <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-black'} flex items-center justify-between border-t pt-2.5 ${darkMode ? 'border-zinc-800' : 'border-zinc-100'}`}>
                                            <span>Load Pathway</span>
                                            <span>→</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Active Roadmap View */
                    <div className="animate-fade-in">
                        {/* Roadmap Header Summary Card */}
                        <div className={`rounded-3xl p-6 sm:p-8 mb-6 border ${darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-6">
                                <div className="flex items-start gap-4">
                                    <span className="text-4xl p-2 rounded-2xl border ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}">
                                        {selectedCareer.icon}
                                    </span>
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                                                {selectedCareer.name}
                                            </h3>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-700'}`}>
                                                {selectedCareer.domain || 'Track'}
                                            </span>
                                            {selectedCareer.isCustom && (
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-600">
                                                    Custom Track
                                                </span>
                                            )}
                                        </div>
                                        <p className={`text-xs font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                            {roadmapSteps.length} total milestones • {roadmapSteps.filter(s => s.completed).length} completed • Est: {selectedCareer.totalDuration}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                    <button
                                        onClick={handleExport}
                                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border btn-interactive flex items-center gap-1.5 ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-white hover:text-black' : 'bg-zinc-100 border-zinc-300 text-black hover:bg-black hover:text-white'}`}
                                        title="Download full roadmap as text file"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        Export Roadmap
                                    </button>
                                    <button
                                        onClick={() => setShowResetConfirm(true)}
                                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border btn-interactive flex items-center gap-1.5 ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-300 text-zinc-600 hover:text-black'}`}
                                        title="Reset completion statuses"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                        Reset Progress
                                    </button>
                                    <button
                                        onClick={() => setSelectedCareer(null)}
                                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border btn-interactive ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white' : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:text-black'}`}
                                    >
                                        ← All Pathways
                                    </button>
                                </div>
                            </div>

                            {/* Accurate Progress Meter */}
                            <div>
                                <div className="flex justify-between items-center text-xs font-bold mb-2">
                                    <span className={darkMode ? 'text-zinc-300' : 'text-zinc-700'}>
                                        Milestone Completion
                                    </span>
                                    <span className={`text-sm ${darkMode ? 'text-white' : 'text-black'}`}>
                                        {calculateProgress()}%
                                    </span>
                                </div>
                                <div className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                                    <div
                                        className={`h-full transition-all duration-500 ${darkMode ? 'bg-white' : 'bg-black'}`}
                                        style={{ width: `${calculateProgress()}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Reset Confirmation Dialog */}
                        {showResetConfirm && (
                            <div className={`p-5 mb-6 rounded-2xl border animate-fade-in ${darkMode ? 'bg-zinc-900/90 border-zinc-700' : 'bg-zinc-100 border-zinc-300'}`}>
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <h4 className={`text-sm font-black mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>
                                            Reset All Milestone Progress?
                                        </h4>
                                        <p className={`text-xs mb-3 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                            This will uncheck all completed steps in this roadmap. Your custom milestones will remain intact.
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleSafeReset}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold btn-interactive ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
                                            >
                                                Confirm Reset
                                            </button>
                                            <button
                                                onClick={() => setShowResetConfirm(false)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold border btn-interactive ${darkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-white border-zinc-300 text-zinc-700'}`}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Bar: Add Milestone Trigger */}
                        {!isAddingStep && (
                            <div className="flex justify-between items-center mb-5">
                                <h4 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                    Roadmap Milestones ({roadmapSteps.length})
                                </h4>
                                <button
                                    onClick={() => setIsAddingStep(true)}
                                    className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 btn-interactive hover-lift ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-black shadow-sm'}`}
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Add Custom Milestone</span>
                                </button>
                            </div>
                        )}

                        {/* Add Milestone Form */}
                        {isAddingStep && (
                            <div className={`rounded-3xl p-6 mb-6 border animate-fade-in ${darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-md'}`}>
                                <h4 className={`text-base font-black mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
                                    Add New Milestone
                                </h4>
                                <div className="grid md:grid-cols-3 gap-3 mb-3">
                                    <input
                                        type="text"
                                        placeholder="Milestone Title *"
                                        value={newStep.title}
                                        onChange={(e) => setNewStep({ ...newStep, title: e.target.value })}
                                        className={`px-3.5 py-2.5 rounded-xl border text-xs outline-none ${darkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-black'}`}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Estimated Duration (e.g., 6 months, 2 years)"
                                        value={newStep.duration}
                                        onChange={(e) => setNewStep({ ...newStep, duration: e.target.value })}
                                        className={`px-3.5 py-2.5 rounded-xl border text-xs outline-none ${darkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-black'}`}
                                    />
                                    <select
                                        value={newStep.priority}
                                        onChange={(e) => setNewStep({ ...newStep, priority: e.target.value })}
                                        className={`px-3.5 py-2.5 rounded-xl border text-xs outline-none ${darkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-black'}`}
                                    >
                                        <option value="high">High Priority</option>
                                        <option value="medium">Medium Priority</option>
                                        <option value="low">Low Priority</option>
                                    </select>
                                </div>
                                <textarea
                                    placeholder="Actionable description, recommended courses, or key deliverables..."
                                    value={newStep.description}
                                    onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
                                    rows={2}
                                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none mb-4 ${darkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-black'}`}
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
                                        disabled={!newStep.title.trim()}
                                        className={`px-5 py-2 rounded-xl text-xs font-bold btn-interactive ${darkMode ? 'bg-white text-black disabled:opacity-50' : 'bg-black text-white disabled:opacity-50'}`}
                                    >
                                        Save Milestone
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Milestone List */}
                        <div className="space-y-3.5">
                            {roadmapSteps.map((step, idx) => {
                                const isEditing = editingStepId === step.id;

                                if (isEditing) {
                                    return (
                                        <div
                                            key={step.id}
                                            className={`p-5 rounded-2xl border animate-fade-in ${darkMode ? 'bg-[#18181b] border-zinc-700' : 'bg-zinc-100 border-zinc-300'}`}
                                        >
                                            <div className="grid md:grid-cols-2 gap-3 mb-3">
                                                <input
                                                    type="text"
                                                    value={editStepData.title}
                                                    onChange={(e) => setEditStepData({ ...editStepData, title: e.target.value })}
                                                    placeholder="Milestone Title"
                                                    className={`px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-black'}`}
                                                />
                                                <input
                                                    type="text"
                                                    value={editStepData.duration}
                                                    onChange={(e) => setEditStepData({ ...editStepData, duration: e.target.value })}
                                                    placeholder="Duration"
                                                    className={`px-3 py-2 rounded-xl border text-xs outline-none ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-black'}`}
                                                />
                                            </div>
                                            <textarea
                                                value={editStepData.description}
                                                onChange={(e) => setEditStepData({ ...editStepData, description: e.target.value })}
                                                rows={2}
                                                className={`w-full px-3 py-2 rounded-xl border text-xs outline-none mb-3 ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-black'}`}
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => setEditingStepId(null)}
                                                    className="px-3 py-1.5 rounded-lg border text-xs font-bold"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => handleSaveEditStep(step.id)}
                                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div
                                        key={step.id}
                                        className={`p-5 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-4 ${step.completed
                                            ? darkMode ? 'bg-zinc-900/40 border-zinc-800 opacity-70' : 'bg-zinc-100/80 border-zinc-300 opacity-70'
                                            : darkMode ? 'bg-[#121215] border-zinc-800 hover:border-zinc-700' : 'bg-white border-zinc-200 shadow-sm hover:border-zinc-400'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3.5 flex-1">
                                            {/* Checkbox */}
                                            <button
                                                type="button"
                                                onClick={() => handleToggleStep(step.id)}
                                                className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${step.completed
                                                    ? darkMode ? 'bg-white border-white text-black' : 'bg-black border-black text-white'
                                                    : darkMode ? 'border-zinc-700 hover:border-zinc-500' : 'border-zinc-300 hover:border-zinc-500'
                                                    }`}
                                            >
                                                {step.completed && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                                            </button>

                                            {/* Milestone Content */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <span className={`text-xs font-extrabold ${step.completed ? 'line-through text-zinc-500' : darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                                        Step {idx + 1}.
                                                    </span>
                                                    <h5 className={`text-sm font-black ${step.completed ? 'line-through text-zinc-500' : darkMode ? 'text-white' : 'text-black'}`}>
                                                        {step.title}
                                                    </h5>
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-700'}`}>
                                                        {step.duration}
                                                    </span>
                                                    {step.priority && (
                                                        <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded border ${step.priority === 'high'
                                                            ? darkMode ? 'border-zinc-600 text-zinc-300 bg-zinc-800' : 'border-zinc-400 text-zinc-900 bg-zinc-200'
                                                            : 'border-zinc-800 text-zinc-500'
                                                            }`}>
                                                            {step.priority}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className={`text-xs leading-relaxed ${step.completed ? 'line-through text-zinc-500' : darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleStartEditStep(step)}
                                                className={`p-2 rounded-lg border text-zinc-400 hover:text-white transition-all ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`}
                                                title="Edit milestone"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteStep(step.id)}
                                                className={`p-2 rounded-lg border text-zinc-400 hover:text-white transition-all ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`}
                                                title="Delete milestone"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Create Custom Roadmap Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
                        <div className={`w-full max-w-md rounded-3xl p-6 border ${darkMode ? 'bg-[#121215] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black shadow-2xl'}`}>
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-lg font-black">Create Custom Roadmap</h4>
                                <button onClick={() => setShowCreateModal(false)} className="p-1.5 rounded-lg border border-zinc-700">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-3 mb-5">
                                <div>
                                    <label className="block text-xs font-bold mb-1 text-zinc-400">Roadmap Title *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Cloud Security Architect"
                                        value={newRoadmapMeta.name}
                                        onChange={(e) => setNewRoadmapMeta({ ...newRoadmapMeta, name: e.target.value })}
                                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${darkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-black'}`}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold mb-1 text-zinc-400">Icon / Emoji</label>
                                        <input
                                            type="text"
                                            value={newRoadmapMeta.icon}
                                            onChange={(e) => setNewRoadmapMeta({ ...newRoadmapMeta, icon: e.target.value })}
                                            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${darkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-black'}`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold mb-1 text-zinc-400">Est. Timeline</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 3-4 years"
                                            value={newRoadmapMeta.totalDuration}
                                            onChange={(e) => setNewRoadmapMeta({ ...newRoadmapMeta, totalDuration: e.target.value })}
                                            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${darkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-black'}`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-bold border border-zinc-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateCustomRoadmap}
                                    disabled={!newRoadmapMeta.name.trim()}
                                    className={`px-5 py-2 rounded-xl text-xs font-bold ${darkMode ? 'bg-white text-black' : 'bg-black text-white'} disabled:opacity-50`}
                                >
                                    Create Roadmap
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CareerRoadmapBuilder;