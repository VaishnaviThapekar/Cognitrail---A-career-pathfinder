import React, { useState } from 'react';
import { Compass, Sparkles, Target, Map, GraduationCap, Bot, DollarSign, Calendar, UserCheck, Award, X, Brain, Cloud } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function FloatingQuickDock({
  onOpenQuiz,
  onOpenSkills,
  onOpenRoadmap,
  onOpenCollegeFinder,
  onOpenAIAdvisor,
  onOpenSalary,
  onOpenExams,
  onOpenMentors,
  onOpenScholarships,
  onOpenMockInterview,
  onOpenCloudSync
}) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const dockActions = [
    {
      id: 'quiz',
      label: t('aiQuizCardTitle', 'AI Career Quiz'),
      icon: Target,
      color: 'from-[#0265A6] to-[#6096BA]',
      onClick: () => {
        onOpenQuiz?.();
        setIsOpen(false);
      }
    },
    {
      id: 'mentors',
      label: t('alumniConnect', 'Alumni Connect'),
      icon: UserCheck,
      color: 'from-[#003B73] to-[#0265A6]',
      onClick: () => {
        onOpenMentors?.();
        setIsOpen(false);
      }
    },
    {
      id: 'scholarships',
      label: t('scholarshipFinder', 'Scholarship Finder'),
      icon: Award,
      color: 'from-[#0265A6] to-[#6096BA]',
      onClick: () => {
        onOpenScholarships?.();
        setIsOpen(false);
      }
    },
    {
      id: 'skills',
      label: t('skillsAnalyzerCardTitle', 'Skills Gap Analyzer'),
      icon: Sparkles,
      color: 'from-[#003B73] to-[#0265A6]',
      onClick: () => {
        onOpenSkills?.();
        setIsOpen(false);
      }
    },
    {
      id: 'roadmap',
      label: t('roadmapCardTitle', 'Roadmap Builder'),
      icon: Map,
      color: 'from-[#0265A6] to-[#003B73]',
      onClick: () => {
        onOpenRoadmap?.();
        setIsOpen(false);
      }
    },
    {
      id: 'college',
      label: t('collegeCardTitle', 'College Finder'),
      icon: GraduationCap,
      color: 'from-[#6096BA] to-[#0265A6]',
      onClick: () => {
        onOpenCollegeFinder?.();
        setIsOpen(false);
      }
    },
    {
      id: 'salary',
      label: t('salaryCalcTitle', 'Salary Calculator'),
      icon: DollarSign,
      color: 'from-[#0265A6] to-[#6096BA]',
      onClick: () => {
        onOpenSalary?.();
        setIsOpen(false);
      }
    },
    {
      id: 'exams',
      label: t('examCountdownTitle', 'Exam Tracker'),
      icon: Calendar,
      color: 'from-[#003B73] to-[#0265A6]',
      onClick: () => {
        onOpenExams?.();
        setIsOpen(false);
      }
    },
    {
      id: 'interview',
      label: t('mockInterviewTitle', 'AI Mock Interview'),
      icon: Brain,
      color: 'from-[#0265A6] to-[#003B73]',
      onClick: () => {
        onOpenMockInterview?.();
        setIsOpen(false);
      }
    },
    {
      id: 'cloud',
      label: t('cloudSyncTitle', 'Cloud Sync & Backup'),
      icon: Cloud,
      color: 'from-[#003B73] to-[#6096BA]',
      onClick: () => {
        onOpenCloudSync?.();
        setIsOpen(false);
      }
    },
    {
      id: 'advisor',
      label: t('navAdvisor', 'AI Advisor Pro'),
      icon: Bot,
      color: 'from-[#0265A6] to-[#003B73]',
      onClick: () => {
        onOpenAIAdvisor?.();
        setIsOpen(false);
      }
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Expanded Dock Menu Items */}
      {isOpen && (
        <div className="flex flex-col items-end space-y-2.5 mb-3 pointer-events-auto transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          {dockActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.onClick}
                className="group flex items-center space-x-3 bg-[#071326]/95 border border-[#003B73] hover:border-[#0265A6] backdrop-blur-md p-2.5 px-4 rounded-xl shadow-xl hover:shadow-[0_8px_25px_rgba(2,101,166,0.35)] transition-all duration-200 transform hover:-translate-x-1"
                title={action.label}
              >
                <span className="text-xs font-semibold text-[#EBF3FA] opacity-90 group-hover:opacity-100 group-hover:text-white transition-opacity">
                  {action.label}
                </span>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#003B73] via-[#0265A6] to-[#051C3E] border-2 border-[#6096BA]/40 text-white shadow-[0_10px_30px_rgba(2,101,166,0.5)] hover:shadow-[0_15px_40px_rgba(2,101,166,0.7)] hover:border-[#6096BA] transition-all duration-300 transform hover:scale-105 active:scale-95"
        aria-label="Toggle Quick Navigation Dock"
      >
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#0265A6] to-[#6096BA] opacity-30 group-hover:opacity-80 blur transition duration-300" />
        
        <div className="relative z-10">
          {isOpen ? (
            <X className="w-6 h-6 transition-transform rotate-90" />
          ) : (
            <Compass className="w-6 h-6 animate-pulse text-[#EBF3FA]" />
          )}
        </div>

        {/* Floating Pulsing Badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6096BA] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#0265A6] border-2 border-[#051C3E]"></span>
          </span>
        )}
      </button>
    </div>
  );
}
