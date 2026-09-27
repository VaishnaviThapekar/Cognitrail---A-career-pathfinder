import React, { useState, useMemo } from 'react';
import {
  X, FileText, Download, Printer, Copy, Check, Sparkles, User, Mail,
  Phone, MapPin, Linkedin, Github, Globe, GraduationCap, Briefcase,
  Award, Code, CheckCircle2, AlertCircle, RefreshCw, Eye, Layout,
  Plus, Trash2, ArrowRight, Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Standard 4 Resume Templates
const RESUME_TEMPLATES = [
  { id: 'modern_tech', name: 'Modern Tech & AI', desc: 'Clean 2-column layout with 5-shade ocean blue headers for tech & software roles.' },
  { id: 'classic_ats', name: 'Classic Corporate ATS', desc: 'Traditional high-density single-column format optimized for corporate ATS scanners.' },
  { id: 'creative_portfolio', name: 'Creative & Design', desc: 'Visual showcase layout highlighting portfolio projects & key deliverables.' },
  { id: 'academic_cv', name: 'Academic & Research CV', desc: 'Detailed format emphasizing publications, college credentials & academic honors.' }
];

export default function AIResumePortfolioBuilderModal({ onClose, darkMode, initialCareer }) {
  const { user } = useAuth();

  // Active target career for pre-population
  const activeCareer = useMemo(() => {
    if (initialCareer && initialCareer.name) return initialCareer;
    try {
      const stored = localStorage.getItem('cognitrail_active_target_career');
      return stored ? JSON.parse(stored) : {
        name: 'AI & Machine Learning Engineer',
        domainName: 'Engineering & AI',
        skills: ['Python', 'PyTorch', 'TensorFlow', 'Data Structures', 'Machine Learning', 'Git', 'SQL']
      };
    } catch {
      return {
        name: 'AI & Machine Learning Engineer',
        domainName: 'Engineering & AI',
        skills: ['Python', 'PyTorch', 'TensorFlow', 'Data Structures', 'Machine Learning', 'Git', 'SQL']
      };
    }
  }, [initialCareer]);

  // Selected Template
  const [selectedTemplate, setSelectedTemplate] = useState('modern_tech');
  const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'preview'
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Vaishnavi Thapekar',
    email: user?.email || 'vaishnavi@cognitrail.ai',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    linkedin: 'linkedin.com/in/vaishnavi-ai',
    github: 'github.com/vaishnavi-dev',
    portfolioUrl: 'vaishnavi-portfolio.dev',
    targetRole: activeCareer.name || 'AI & Machine Learning Engineer',
    summary: `Motivated ${activeCareer.name} aspirant with strong analytical problem-solving capabilities, hands-on experience in ${activeCareer.skills ? activeCareer.skills.slice(0, 3).join(', ') : 'core technologies'}, and a passion for building scalable solutions.`,
    education: [
      {
        degree: activeCareer.education ? activeCareer.education.split('(')[0].trim() : 'B.Tech in Computer Science & Engineering',
        institution: 'Indian Institute of Technology / Autonomous Tech College',
        gradYear: '2026',
        cgpa: '8.8 / 10.0'
      }
    ],
    skills: activeCareer.skills && Array.isArray(activeCareer.skills) ? activeCareer.skills : ['Python', 'Data Structures', 'Machine Learning', 'Git', 'SQL', 'Problem Solving'],
    newSkill: '',
    projects: [
      {
        title: `End-to-End ${activeCareer.name.split(' ')[0]} Intelligence Platform`,
        techStack: 'Python, PyTorch, React, REST API, Docker',
        desc: 'Developed and deployed a full-stack predictive application featuring automated data pipelines and sub-100ms latency inference.',
        githubUrl: 'github.com/user/ai-platform'
      },
      {
        title: 'Real-Time Analytics & Data Visualizer',
        techStack: 'Node.js, PostgreSQL, Tailwind CSS, Chart.js',
        desc: 'Built an interactive dashboard processing live data streams with dynamic filter controls and custom automated PDF reporting.',
        githubUrl: 'github.com/user/analytics-dash'
      }
    ],
    experiences: [
      {
        role: `${activeCareer.name.split(' ')[0]} Engineering Intern`,
        company: 'Cognitrail AI Labs',
        duration: 'May 2025 - Aug 2025',
        highlights: 'Collaborated with senior engineers to optimize model pipeline latency by 35%. Implemented automated unit test suites achieving 95%+ coverage.'
      }
    ],
    certifications: [
      'CS50x: Introduction to Computer Science (Harvard University)',
      'Google Data Analytics Professional Certificate'
    ]
  });

  // Calculate ATS Compatibility Score (0 - 100%)
  const atsMetrics = useMemo(() => {
    let score = 30; // base score
    const suggestions = [];

    // Check contact info
    if (formData.email && formData.phone) score += 15;
    else suggestions.push('Add both email and phone number for recruiter contact.');

    if (formData.linkedin || formData.github) score += 10;
    else suggestions.push('Include LinkedIn or GitHub URL for portfolio validation.');

    // Check summary length
    if (formData.summary && formData.summary.length > 50) score += 15;
    else suggestions.push('Expand professional summary to 2-3 impact-driven sentences.');

    // Check skills quantity
    if (formData.skills.length >= 6) score += 15;
    else suggestions.push(`Add at least ${6 - formData.skills.length} more technical skills to pass ATS filters.`);

    // Check projects count
    if (formData.projects.length >= 2) score += 15;
    else suggestions.push('List at least 2 relevant portfolio projects with tech stacks.');

    // Target role match in summary
    if (formData.summary.toLowerCase().includes(formData.targetRole.toLowerCase())) score += 10;
    else suggestions.push(`Mention your exact target role "${formData.targetRole}" in your summary.`);

    return {
      score: Math.min(100, score),
      suggestions
    };
  }, [formData]);

  // Skill Add/Remove handlers
  const handleAddSkill = () => {
    if (formData.newSkill.trim()) {
      if (!formData.skills.includes(formData.newSkill.trim())) {
        setFormData({
          ...formData,
          skills: [...formData.skills, formData.newSkill.trim()],
          newSkill: ''
        });
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skillToRemove)
    });
  };

  // Copy Markdown to Clipboard
  const handleCopyMarkdown = () => {
    const markdown = `# ${formData.fullName}
**${formData.targetRole}** | ${formData.email} | ${formData.phone} | ${formData.location}
LinkedIn: ${formData.linkedin} | GitHub: ${formData.github} | Portfolio: ${formData.portfolioUrl}

---

## Professional Summary
${formData.summary}

## Education
${formData.education.map(e => `- **${e.degree}** - ${e.institution} (${e.gradYear}) | CGPA: ${e.cgpa}`).join('\n')}

## Technical & Core Skills
${formData.skills.map(s => `- ${s}`).join('\n')}

## Key Portfolio Projects
${formData.projects.map(p => `### ${p.title}\n*Tech Stack:* ${p.techStack}\n${p.desc}\n*Code:* ${p.githubUrl}`).join('\n\n')}

## Experience / Internships
${formData.experiences.map(x => `### ${x.role} - ${x.company} (${x.duration})\n${x.highlights}`).join('\n\n')}

## Certifications
${formData.certifications.map(c => `- ${c}`).join('\n')}
`;

    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Download Text Resume (.txt)
  const handleDownloadTxt = () => {
    const textContent = `=================================================================
${formData.fullName.toUpperCase()}
Target Role: ${formData.targetRole}
Email: ${formData.email} | Phone: ${formData.phone} | Location: ${formData.location}
LinkedIn: ${formData.linkedin} | GitHub: ${formData.github}
=================================================================

PROFESSIONAL SUMMARY
-----------------------------------------------------------------
${formData.summary}

EDUCATION
-----------------------------------------------------------------
${formData.education.map(e => `${e.degree}\n${e.institution} | Grad Year: ${e.gradYear} | CGPA: ${e.cgpa}`).join('\n\n')}

TECHNICAL SKILLS & COMPETENCIES
-----------------------------------------------------------------
${formData.skills.join(' • ')}

KEY PORTFOLIO PROJECTS
-----------------------------------------------------------------
${formData.projects.map(p => `Project: ${p.title}\nTech Stack: ${p.techStack}\nDescription: ${p.desc}\nLink: ${p.githubUrl}`).join('\n\n')}

WORK EXPERIENCE / INTERNSHIPS
-----------------------------------------------------------------
${formData.experiences.map(x => `${x.role} | ${x.company} (${x.duration})\nKey Achievements: ${x.highlights}`).join('\n\n')}

CERTIFICATIONS & FREE COURSES
-----------------------------------------------------------------
${formData.certifications.map(c => `• ${c}`).join('\n')}

=================================================================
Generated by Cognitrail AI Resume Builder • https://cognitrail.ai
=================================================================`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formData.fullName.replace(/\s+/g, '_')}_ATS_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className={`relative w-full max-w-5xl rounded-3xl border shadow-2xl my-auto overflow-hidden ${
        darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
      } max-h-[94vh] flex flex-col`}>

        {/* Top Header */}
        <div className={`p-4 sm:p-6 border-b flex-shrink-0 ${
          darkMode ? 'bg-[#0A1E3F]/90 border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF]'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold bg-gradient-to-tr from-[#003B73] via-[#0265A6] to-[#6096BA] text-white shadow-md">
                🚀
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#003B73] text-white">
                    ATS Resume & Portfolio Builder
                  </span>
                  <span className={`text-xs font-bold ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`}>
                    Target: {formData.targetRole}
                  </span>
                </div>
                <h2 className={`text-xl sm:text-2xl font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                  AI Resume & Portfolio Generator
                </h2>
              </div>
            </div>

            {/* ATS Score & Action Controls */}
            <div className="flex items-center gap-3 self-end md:self-auto flex-wrap sm:flex-nowrap">
              {/* ATS Compatibility Score Badge */}
              <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border ${
                atsMetrics.score >= 80
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              }`}>
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-black">ATS Score: {atsMetrics.score}%</span>
              </div>

              <button
                onClick={onClose}
                className={`p-2 rounded-xl border transition-colors ${
                  darkMode ? 'bg-[#071326] border-[#003B73] text-zinc-300 hover:text-white' : 'bg-white border-[#BACDDF] text-zinc-600 hover:text-black'
                }`}
                aria-label="Close Builder"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Template Selector Bar */}
        <div className={`p-3 px-4 sm:px-6 border-b flex items-center justify-between overflow-x-auto no-scrollbar flex-shrink-0 ${
          darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-white border-[#BACDDF]'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold opacity-70 whitespace-nowrap">Select Layout:</span>
            {RESUME_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all btn-interactive ${
                  selectedTemplate === tmpl.id
                    ? 'bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-md'
                    : darkMode ? 'bg-[#0A1E3F] text-zinc-300 hover:text-white border border-[#003B73]' : 'bg-[#EBF3FA] text-[#0265A6] hover:bg-[#0265A6] hover:text-white border border-[#BACDDF]'
                }`}
              >
                {tmpl.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'editor'
                  ? darkMode ? 'bg-[#0A1E3F] text-white border border-[#0265A6]' : 'bg-[#EBF3FA] text-[#0265A6] border border-[#0265A6]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'preview'
                  ? darkMode ? 'bg-[#0A1E3F] text-white border border-[#0265A6]' : 'bg-[#EBF3FA] text-[#0265A6] border border-[#0265A6]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Live Preview
            </button>
          </div>
        </div>

        {/* Content Area: Editor + Preview Dual Pane */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid lg:grid-cols-2 gap-6">
          
          {/* LEFT PANE: INTERACTIVE EDITOR */}
          <div className={`space-y-5 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
            <h3 className={`text-base font-black flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
              <FileText className="w-4 h-4 text-[#0265A6]" />
              <span>Resume Details & ATS Input</span>
            </h3>

            {/* Suggestions Box if score < 100 */}
            {atsMetrics.suggestions.length > 0 && (
              <div className={`p-3.5 rounded-2xl border text-xs space-y-1 ${
                darkMode ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}>
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>ATS Score Improvement Tips:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 opacity-90">
                  {atsMetrics.suggestions.map((sug, idx) => (
                    <li key={idx}>{sug}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Personal Details */}
            <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-[#0A1E3F] border-[#003B73]' : 'bg-white border-[#BACDDF]'}`}>
              <h4 className="text-xs font-black uppercase tracking-wider text-[#0265A6]">Personal Information</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase opacity-70 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-3 py-1.5 rounded-xl text-xs border outline-none ${
                      darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-black'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase opacity-70 block mb-1">Target Role</label>
                  <input
                    type="text"
                    value={formData.targetRole}
                    onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                    className={`w-full px-3 py-1.5 rounded-xl text-xs border outline-none ${
                      darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-black'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase opacity-70 block mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-1.5 rounded-xl text-xs border outline-none ${
                      darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-black'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase opacity-70 block mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-1.5 rounded-xl text-xs border outline-none ${
                      darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-black'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className={`p-4 rounded-2xl border space-y-2 ${darkMode ? 'bg-[#0A1E3F] border-[#003B73]' : 'bg-white border-[#BACDDF]'}`}>
              <h4 className="text-xs font-black uppercase tracking-wider text-[#0265A6]">Professional Summary</h4>
              <textarea
                value={formData.summary}
                rows={3}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                  darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-black'
                }`}
              />
            </div>

            {/* Technical Skills Checklist Input */}
            <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-[#0A1E3F] border-[#003B73]' : 'bg-white border-[#BACDDF]'}`}>
              <h4 className="text-xs font-black uppercase tracking-wider text-[#0265A6]">Technical & Core Skills</h4>
              
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Add skill (e.g. PyTorch, SQL, Docker)..."
                  value={formData.newSkill}
                  onChange={(e) => setFormData({ ...formData, newSkill: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  className={`flex-1 px-3 py-1.5 rounded-xl text-xs border outline-none ${
                    darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-black'
                  }`}
                />
                <button
                  onClick={handleAddSkill}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${
                      darkMode ? 'bg-[#071326] border-[#003B73] text-[#6096BA]' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6]'
                    }`}
                  >
                    <span>{skill}</span>
                    <button onClick={() => handleRemoveSkill(skill)} className="hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANE: LIVE FORMATTED RESUME PREVIEW */}
          <div className={`space-y-4 ${activeTab === 'editor' ? 'hidden lg:block' : 'block'}`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-base font-black flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                <Eye className="w-4 h-4 text-[#0265A6]" />
                <span>ATS Resume Preview</span>
              </h3>
              <span className="text-xs font-bold opacity-60">Layout: {RESUME_TEMPLATES.find(t => t.id === selectedTemplate)?.name}</span>
            </div>

            {/* Formatted Paper Preview Card */}
            <div className={`p-6 sm:p-8 rounded-2xl border shadow-xl text-left space-y-5 transition-all ${
              darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-white border-zinc-300 text-black'
            }`}>
              {/* Paper Header */}
              <div className="border-b pb-4">
                <h1 className="text-2xl font-black uppercase tracking-tight text-[#0265A6]">
                  {formData.fullName}
                </h1>
                <p className="text-xs font-bold uppercase tracking-wider text-[#6096BA] mb-2">
                  {formData.targetRole}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] opacity-80">
                  <span>✉️ {formData.email}</span>
                  <span>📞 {formData.phone}</span>
                  <span>📍 {formData.location}</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0265A6] border-b pb-1 mb-2">
                  Professional Summary
                </h4>
                <p className="text-xs leading-relaxed opacity-90">
                  {formData.summary}
                </p>
              </div>

              {/* Technical Skills */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0265A6] border-b pb-1 mb-2">
                  Technical & Core Competencies
                </h4>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {formData.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-md font-semibold bg-[#003B73]/20 text-[#0265A6]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0265A6] border-b pb-1 mb-2">
                  Education
                </h4>
                {formData.education.map((edu, idx) => (
                  <div key={idx} className="text-xs flex items-center justify-between">
                    <div>
                      <div className="font-bold">{edu.degree}</div>
                      <div className="opacity-80">{edu.institution}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#0265A6]">{edu.gradYear}</div>
                      <div className="opacity-70">CGPA: {edu.cgpa}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0265A6] border-b pb-1 mb-2">
                  Key Portfolio Projects
                </h4>
                <div className="space-y-3 text-xs">
                  {formData.projects.map((proj, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between font-bold">
                        <span>{proj.title}</span>
                        <span className="text-[10px] text-[#0265A6]">{proj.techStack}</span>
                      </div>
                      <p className="opacity-80 text-[11px] mt-0.5">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Export & Print Action Bar */}
        <div className={`p-4 border-t flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 ${
          darkMode ? 'bg-[#0A1E3F] border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF]'
        }`}>
          <div className="text-xs font-bold opacity-80 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#0265A6]" />
            <span>Target Role: <strong className="text-[#0265A6]">{formData.targetRole}</strong></span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleCopyMarkdown}
              className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold border btn-interactive flex items-center justify-center gap-1.5 ${
                darkMode ? 'bg-[#071326] border-[#003B73] text-white hover:bg-[#003B73]' : 'bg-white border-[#BACDDF] text-[#0265A6] hover:bg-[#BACDDF]/40'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Markdown' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold border btn-interactive flex items-center justify-center gap-1.5 ${
                darkMode ? 'bg-[#071326] border-[#003B73] text-white hover:bg-[#003B73]' : 'bg-white border-[#BACDDF] text-[#0265A6] hover:bg-[#BACDDF]/40'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download (.txt)</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold btn-interactive flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white shadow-md hover:brightness-110"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
