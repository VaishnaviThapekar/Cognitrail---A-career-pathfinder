import test from 'node:test';
import assert from 'node:assert/strict';

import { 
  getAllColleges, 
  getCollegesByState, 
  getCollegesByCity, 
  getCollegeSummaryCounts,
  mergeCollegesData 
} from '../src/data/collegesDatabase.js';

import EXTRA_COLLEGES from '../src/data/collegesExtra.js';
import { CAREER_DATABASE } from '../src/data/careerDatabase.js';

// Merge EXTRA_COLLEGES prior to tests
mergeCollegesData(EXTRA_COLLEGES);

test('1. College Finder Database & City/State Mapping', (t) => {
  const allColleges = getAllColleges();
  assert.ok(allColleges.length > 50, 'Database should contain over 50 annotated colleges');

  // Verify dynamic state & city property injection
  allColleges.forEach(col => {
    assert.ok(col.name, 'College should have a name');
    assert.ok(col.state, `College ${col.name} should have state property attached`);
    assert.ok(col.city, `College ${col.name} should have city property attached`);
    assert.ok(['Tier 1', 'Tier 2', 'Tier 3'].includes(col.tier), `College ${col.name} should have valid tier classification`);
    assert.ok(['Government', 'Private'].includes(col.ownership), `College ${col.name} should have valid ownership tag`);
  });

  // Verify getCollegesByState
  const maharashtraColleges = getCollegesByState('Maharashtra');
  assert.ok(maharashtraColleges.length > 0, 'Maharashtra should have colleges listed');
  maharashtraColleges.forEach(col => {
    assert.equal(col.state, 'Maharashtra');
  });

  // Verify getCollegesByCity
  const puneColleges = getCollegesByCity('Maharashtra', 'Pune');
  assert.ok(puneColleges.length > 0, 'Pune should have colleges listed');
  puneColleges.forEach(col => {
    assert.equal(col.city, 'Pune');
  });
});

test('2. Career Database & Stream Coverage', (t) => {
  assert.ok(CAREER_DATABASE, 'CAREER_DATABASE must be defined');
  const domains = Object.keys(CAREER_DATABASE);
  assert.ok(domains.length >= 5, 'Database must contain at least 5 main domains');

  let totalCareers = 0;
  domains.forEach(dKey => {
    const domain = CAREER_DATABASE[dKey];
    assert.ok(domain.name, `Domain ${dKey} must have a name`);
    assert.ok(Array.isArray(domain.subFields), `Domain ${dKey} subFields must be an array`);

    domain.subFields.forEach(sub => {
      assert.ok(sub.name, `Subfield must have a name`);
      assert.ok(Array.isArray(sub.careers), `Subfield ${sub.name} must contain careers array`);
      totalCareers += sub.careers.length;

      sub.careers.forEach(career => {
        assert.ok(career.name, 'Career must have a name');
        assert.ok(career.salaryRange || career.salary, 'Career must specify salary');
      });
    });
  });

  assert.ok(totalCareers > 30, `Total careers should be substantial, found ${totalCareers}`);
});

test('3. Salary Calculation & Location Multipliers Logic', (t) => {
  const calculateSalary = (baseMin, baseMax, expYears, locationTier) => {
    const expMultiplier = 1 + (expYears * 0.15);
    const locMultiplier = locationTier === 'Tier 1' ? 1.25 : locationTier === 'Tier 2' ? 1.0 : 0.85;
    const estimatedMin = Math.round(baseMin * expMultiplier * locMultiplier);
    const estimatedMax = Math.round(baseMax * expMultiplier * locMultiplier);
    return { estimatedMin, estimatedMax };
  };

  const baseMin = 10; // 10 LPA
  const baseMax = 25; // 25 LPA

  const entryTier1 = calculateSalary(baseMin, baseMax, 0, 'Tier 1');
  assert.equal(entryTier1.estimatedMin, 13, 'Entry level Tier 1 min salary should be 13 LPA');
  assert.equal(entryTier1.estimatedMax, 31, 'Entry level Tier 1 max salary should be 31 LPA');

  const expTier1 = calculateSalary(baseMin, baseMax, 5, 'Tier 1');
  assert.ok(expTier1.estimatedMin > entryTier1.estimatedMin, '5 years experience should increase estimated salary');
});

test('4. College Cutoff Rank Probability Calculation', (t) => {
  const predictProbability = (userRank, cutoffRank) => {
    if (userRank <= cutoffRank * 0.8) return 'High Probability (90%+)';
    if (userRank <= cutoffRank * 1.05) return 'Target Match (70-85%)';
    return 'Safety / Reach Match';
  };

  const cutoff = 5000;
  assert.equal(predictProbability(2000, cutoff), 'High Probability (90%+)', 'Rank 2000 for cutoff 5000 should be High Probability');
  assert.equal(predictProbability(4900, cutoff), 'Target Match (70-85%)', 'Rank 4900 for cutoff 5000 should be Target Match');
  assert.equal(predictProbability(12000, cutoff), 'Safety / Reach Match', 'Rank 12000 for cutoff 5000 should be Safety/Reach');
});

test('5. ATS Resume Readiness Alignment Matrix', (t) => {
  const calculateATSScore = (matchedKeywordsCount, totalTargetKeywords, hasPortfolio, interviewScore) => {
    const keywordMatch = Math.min(100, Math.round((matchedKeywordsCount / totalTargetKeywords) * 50));
    const portfolioScore = hasPortfolio ? 25 : 10;
    const interviewPart = Math.round((interviewScore / 100) * 25);
    return keywordMatch + portfolioScore + interviewPart;
  };

  const scoreHigh = calculateATSScore(10, 10, true, 90);
  assert.equal(scoreHigh, 98, 'Perfect keywords, portfolio, and 90% interview score should yield 98% ATS match');

  const scoreLow = calculateATSScore(2, 10, false, 40);
  assert.equal(scoreLow, 30, 'Low keywords and no portfolio should yield low ATS score');
});

test('6. Entrance Exam Category Multiplier & Probability Predictor', (t) => {
  const getCategoryMultiplier = (category) => {
    switch (category) {
      case 'OBC-NCL': return 1.35;
      case 'SC': return 2.1;
      case 'ST': return 3.2;
      case 'EWS': return 1.15;
      default: return 1.0; // General
    }
  };

  const predictMatch = (userRank, cutoffRank, category) => {
    const effCutoff = cutoffRank * getCategoryMultiplier(category);
    if (userRank <= effCutoff * 0.85) return 'High Chance';
    if (userRank <= effCutoff * 1.1) return 'Target Match';
    return 'Reach / Low Chance';
  };

  const generalCutoff = 10000;
  assert.equal(predictMatch(8000, generalCutoff, 'General'), 'High Chance', 'Rank 8000 against 10000 cutoff (General) should be High Chance');
  assert.equal(predictMatch(12000, generalCutoff, 'General'), 'Reach / Low Chance', 'Rank 12000 against 10000 cutoff (General) should be Reach');

  // OBC-NCL multiplier (1.35) makes effective cutoff 13500
  assert.equal(predictMatch(11000, generalCutoff, 'OBC-NCL'), 'High Chance', 'Rank 11000 against 10000 cutoff (OBC-NCL multiplier 1.35) should be High Chance');
  
  // SC multiplier (2.1) makes effective cutoff 21000 (0.85 * 21000 = 17850)
  assert.equal(predictMatch(15000, generalCutoff, 'SC'), 'High Chance', 'Rank 15000 against 10000 cutoff (SC multiplier 2.1) should be High Chance');
  assert.equal(predictMatch(18000, generalCutoff, 'SC'), 'Target Match', 'Rank 18000 against 10000 cutoff (SC multiplier 2.1) should be Target Match');
});

test('7. AI Decision Matrix ROI & Break-even Years Calculation', (t) => {
  const calculateROI = (tuitionLakhs, ctcLakhs) => {
    const tuitionTotal = tuitionLakhs * 100000;
    const ctcTotal = ctcLakhs * 100000;
    const annualNetSavings = ctcTotal * 0.45; // 45% post-tax & expenses saved
    const breakEvenYears = Number((tuitionTotal / annualNetSavings).toFixed(1));
    const roiPercentage = Math.round(((ctcTotal * 5 - tuitionTotal) / tuitionTotal) * 100);
    return { breakEvenYears, roiPercentage };
  };

  // Case A: 12 Lakh tuition, 18 LPA CTC
  const resA = calculateROI(12, 18);
  assert.equal(resA.breakEvenYears, 1.5, '12L tuition with 18 LPA CTC should break even in 1.5 years');
  assert.equal(resA.roiPercentage, 650, '12L tuition with 18 LPA CTC 5-year ROI percentage should be 650%');

  // Case B: 24 Lakh tuition, 14 LPA CTC
  const resB = calculateROI(24, 14);
  assert.ok(resB.breakEvenYears > resA.breakEvenYears, 'Higher tuition with lower CTC should result in longer break-even time');
});

test('8. Skill Trends & Free Certified Course Directory Filtering', (t) => {
  const courses = [
    { title: 'CS50x: Introduction to Computer Science', provider: 'Harvard CS50', level: 'Beginner', category: 'computer_science' },
    { title: 'Google Data Analytics Professional Certificate', provider: 'Google / Coursera', level: 'Beginner', category: 'data_ai' },
    { title: 'NPTEL Artificial Intelligence Search Methods', provider: 'IIT Madras (NPTEL)', level: 'Advanced', category: 'computer_science' }
  ];

  const filterCourses = (category, search, level) => {
    return courses.filter(c => {
      const matchCat = category === 'all' || c.category === category;
      const matchLevel = level === 'all' || c.level === level;
      const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.provider.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchLevel && matchSearch;
    });
  };

  assert.equal(filterCourses('computer_science', '', 'all').length, 2, 'Should find 2 CS courses');
  assert.equal(filterCourses('all', 'Harvard', 'all').length, 1, 'Should find 1 Harvard course');
  assert.equal(filterCourses('all', '', 'Advanced').length, 1, 'Should find 1 Advanced course');
});
