// Career Enrichment Service - Industry Insights, Recruiters, AI Future-Proof Index, and Calendar Sync

/**
 * Maps career categories to top hiring companies & recruiters
 */
export const getTopRecruiters = (career) => {
  if (!career) return ['Leading Industry Leaders', 'Top Global Tech Hubs'];
  if (career.topRecruiters && Array.isArray(career.topRecruiters) && career.topRecruiters.length > 0) {
    return career.topRecruiters;
  }

  const name = (career.name || '').toLowerCase();
  const domain = (career.domainName || career.domainKey || '').toLowerCase();

  if (name.includes('ai') || name.includes('machine learning') || name.includes('data science') || name.includes('deep learning')) {
    return ['Google DeepMind', 'Microsoft Azure', 'Amazon AWS', 'NVIDIA', 'OpenAI', 'Meta', 'TCS Research'];
  }
  if (name.includes('software') || name.includes('full stack') || name.includes('cloud') || name.includes('devops') || name.includes('cyber') || domain.includes('engineer')) {
    return ['Google', 'Microsoft', 'Amazon', 'Adobe', 'Oracle', 'Cisco', 'Infosys', 'Wipro'];
  }
  if (name.includes('doctor') || name.includes('surgeon') || name.includes('mbbs') || name.includes('medic') || name.includes('nurs') || domain.includes('science')) {
    return ['AIIMS', 'Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare', 'Medanta', 'Manipal Hospitals'];
  }
  if (name.includes('bank') || name.includes('finance') || name.includes('ca') || name.includes('account') || name.includes('invest') || domain.includes('commerce')) {
    return ['Goldman Sachs', 'J.P. Morgan', 'Morgan Stanley', 'Deloitte', 'EY', 'PwC', 'HDFC Bank', 'KPMG'];
  }
  if (name.includes('design') || name.includes('ui') || name.includes('ux') || name.includes('animat') || name.includes('art') || domain.includes('arts')) {
    return ['Figma', 'Adobe', 'CRED', 'Swiggy', 'Zomato', 'Tata Elxsi', 'Ogilvy', 'Disney India'];
  }
  if (name.includes('law') || name.includes('judge') || name.includes('legal') || domain.includes('law')) {
    return ['Cyril Amarchand Mangaldas', 'Shardul Amarchand', 'Khaitan & Co', 'Trilegal', 'AZB & Partners', 'Supreme Court Bar'];
  }
  if (name.includes('civil') || name.includes('ias') || name.includes('ips') || name.includes('defence') || domain.includes('govt')) {
    return ['Union Public Service Commission (UPSC)', 'State Public Service Commissions', 'NITI Aayog', 'DRDO', 'ISRO'];
  }

  return ['Top Multinational Corporates', 'Fortune 500 Enterprises', 'Leading Government & Private Labs'];
};

/**
 * Calculates automation-resistance / future-proof index (0 - 100%)
 */
export const getFutureProofScore = (career) => {
  if (!career) return 92;
  if (career.futureProofScore) return career.futureProofScore;

  const name = (career.name || '').toLowerCase();
  let baseScore = 90;

  if (name.includes('doctor') || name.includes('surgeon') || name.includes('healthcare')) baseScore = 97;
  else if (name.includes('ai') || name.includes('machine learning') || name.includes('cyber')) baseScore = 98;
  else if (name.includes('research') || name.includes('biotech') || name.includes('scientist')) baseScore = 95;
  else if (name.includes('creative') || name.includes('design') || name.includes('art')) baseScore = 91;
  else if (name.includes('lawyer') || name.includes('judge')) baseScore = 93;
  else if (name.includes('manager') || name.includes('consultant')) baseScore = 89;
  else if (name.includes('developer') || name.includes('engineer')) baseScore = 94;

  // Add subtle deterministic variance based on name length
  const variance = (name.length % 5) - 2;
  return Math.min(99, Math.max(82, baseScore + variance));
};

/**
 * Returns typical work style (Remote, Hybrid, On-site)
 */
export const getWorkFlexibility = (career) => {
  if (!career) return 'Flexible Hybrid';
  if (career.workFlexibility) return career.workFlexibility;

  const name = (career.name || '').toLowerCase();
  const domain = (career.domainName || career.domainKey || '').toLowerCase();

  if (name.includes('doctor') || name.includes('dentist') || name.includes('surgeon') || name.includes('nurse') || name.includes('pilot')) {
    return '100% On-Site / Clinical';
  }
  if (name.includes('civil') || name.includes('police') || name.includes('court') || domain.includes('govt')) {
    return 'On-Site / Field Work';
  }
  if (name.includes('software') || name.includes('ai') || name.includes('cloud') || name.includes('data') || name.includes('writer')) {
    return 'Global Remote & Flexible';
  }

  return 'Flexible Hybrid (Office + Remote)';
};

/**
 * Generates an iCalendar (.ics) format string for career entrance exams and milestones
 */
export const generateCalendarICS = (career) => {
  const careerName = career?.name || 'Career Milestone';
  const exams = career?.entranceExams && career.entranceExams.length > 0
    ? career.entranceExams
    : ['Registration & Application Deadline', 'Entrance Examination Day'];

  const now = new Date();
  const formatDateICS = (d) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const events = exams.map((exam, idx) => {
    // Schedule event 30 + (idx * 45) days in future
    const eventStart = new Date(now.getTime() + (30 + idx * 45) * 24 * 60 * 60 * 1000);
    eventStart.setHours(9, 0, 0, 0);
    const eventEnd = new Date(eventStart.getTime() + 3 * 60 * 60 * 1000);

    return [
      'BEGIN:VEVENT',
      `UID:cognitrail-${Date.now()}-${idx}@cognitrail.ai`,
      `DTSTAMP:${formatDateICS(now)}`,
      `DTSTART:${formatDateICS(eventStart)}`,
      `DTEND:${formatDateICS(eventEnd)}`,
      `SUMMARY:🎯 Cognitrail: ${exam} for ${careerName}`,
      `DESCRIPTION:Important entrance exam date & milestone tracker for ${careerName}. Prepare syllabus, practice mock tests, and check cutoffs on Cognitrail.`,
      `LOCATION:Authorized Examination Centers / All India`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-P2D',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder: ${exam} for ${careerName} in 2 days!`,
      'END:VALARM',
      'END:VEVENT'
    ].join('\r\n');
  });

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Cognitrail AI//Career Pathfinder Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...events,
    'END:VCALENDAR'
  ].join('\r\n');
};

/**
 * Triggers native browser download for the .ics calendar file
 */
export const downloadCalendarICS = (career) => {
  const icsContent = generateCalendarICS(career);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const fileName = `Cognitrail_Exams_${(career?.name || 'Career').replace(/\s+/g, '_')}.ics`;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
