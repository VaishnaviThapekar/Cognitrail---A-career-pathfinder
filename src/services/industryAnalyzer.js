// Industry Trends & Market Analysis Service
// Provides AI-powered insights on job market, industry trends, and future predictions

class IndustryAnalyzer {
    /**
     * Get comprehensive industry analysis
     */
    async analyzeIndustry(industry, subSpecialty = '') {
        const query = `Provide comprehensive industry analysis for ${industry}${subSpecialty ? ` - ${subSpecialty}` : ''}:

Current Analysis (2024-2026):
1. **Market Size & Growth** - Current and projected
2. **Key Players** - Top companies to watch
3. **Major Trends** - What's happening now
4. **Emerging Technologies** - Tools shaping the field
5. **Job Market** - Demand and growth rate
6. **Salary Ranges** - By role and seniority
7. **Challenges** - Industry headwinds
8. **Opportunities** - Where growth is
9. **Skills in Demand** - What companies need
10. **Future Outlook** - 3-5 year predictions

Be specific with data and provide actionable insights.`;

        return await this.callAI(query);
    }

    /**
     * Get job market predictions for specific role
     */
    async jobMarketOutlook(role, timeframe = '2025-2030') {
        const query = `Analyze job market outlook for ${role} professionals (${timeframe}):

Predict:
1. **Demand Trends** - Growing, stable, or declining
2. **Salary Growth** - Expected increases
3. **Skill Demand** - What will matter more
4. **Automation Impact** - Will AI replace this role?
5. **Geographic Hotspots** - Best locations
6. **Company Growth** - Industries hiring most
7. **Compensation** - Expected ranges in future
8. **Competition** - How many people entering
9. **Remote Opportunities** - Work from anywhere?
10. **Alternative Paths** - Similar roles emerging

Include confidence levels and reasoning.`;

        return await this.callAI(query);
    }

    /**
     * Get emerging careers to watch
     */
    async getEmergingCareers(timeline = 'next 2-3 years', interests = []) {
        const query = `Identify emerging careers and high-growth opportunities (${timeline}):

${interests.length > 0 ? `Interests: ${interests.join(', ')}` : ''}

Show:
1. **Emerging Roles** - New jobs being created
2. **Why Now** - What's driving demand
3. **Entry Requirements** - Skills needed to start
4. **Learning Path** - How to prepare
5. **Salary Potential** - Early and established
6. **Growth Rate** - Job creation speed
7. **Companies Hiring** - Where jobs exist
8. **Competition** - How many others pursuing
9. **Future-Proof** - Long-term viability
10. **Success Profiles** - People already in these roles

Include at least 5-10 emerging opportunities.`;

        return await this.callAI(query);
    }

    /**
     * Get AI/Automation impact analysis on specific role
     */
    async analyzeAutomationImpact(role, currentSituation = '') {
        const query = `Analyze AI and automation impact on ${role} profession:

${currentSituation ? `Current Context: ${currentSituation}` : ''}

Analyze:
1. **Replacement Risk** - Will AI replace this role?
2. **Timeline** - When might this happen
3. **Mitigation Strategies** - How to stay relevant
4. **Evolution** - How the role will change
5. **AI Augmentation** - Tools to enhance work
6. **New Opportunities** - Created by automation
7. **Skills to Learn** - To work alongside AI
8. **Companies Leading** - Early AI adoption
9. **Salary Impact** - Will automation change pay
10. **Action Plan** - What you should do now

Be realistic but hopeful.`;

        return await this.callAI(query);
    }

    /**
     * Get industry-specific compensation analysis
     */
    async getCompensationAnalysis(role, industry, experience = '') {
        const query = `Detailed compensation analysis for ${role} in ${industry}:

${experience ? `Experience Level: ${experience}` : ''}

Provide:
1. **Base Salary Ranges** - Entry, mid, senior
2. **Bonus Structures** - Typical percentages
3. **Equity Compensation** - Stock options, RSUs
4. **Benefits Value** - Healthcare, retirement, etc.
5. **Total Compensation** - Average total package
6. **Geographic Variation** - Salary by location
7. **Company Size Impact** - Startup vs. Fortune 500
8. **Specialization Premium** - How skills affect pay
9. **Growth Trajectory** - Salary progression
10. **Negotiation Benchmarks** - Realistic ranges to use

Include specific data points and sources.`;

        return await this.callAI(query);
    }

    /**
     * Get skill demand forecast
     */
    async getSkillDemandForecast(industry = '', timeframe = 'next 3 years') {
        const query = `Forecast most demanded skills (${timeframe}):

${industry ? `Industry: ${industry}` : 'Across all industries'}

Analyze:
1. **Technical Skills** - Most valuable
2. **Soft Skills** - Growing importance
3. **Emerging Tech** - New tools to learn
4. **Declining Skills** - Less relevant
5. **Combination Superpowers** - Rare skill pairs
6. **Learning Timeline** - How long to develop
7. **Learning Resources** - Best courses/paths
8. **Salary Impact** - What each skill is worth
9. **Job Availability** - Demand by skill
10. **ROI Analysis** - Time vs. salary increase

Include specific skill certifications to pursue.`;

        return await this.callAI(query);
    }

    /**
     * Get geographic opportunity analysis
     */
    async analyzeGlobalOpportunities(role, yourLocation = '', visa = false) {
        const query = `Analyze global opportunities for ${role} professionals:

${yourLocation ? `Your Current Location: ${yourLocation}` : ''}
${visa ? 'Visa: Willing to explore visa sponsorship' : 'Visa: Prefer locations with visa-free/easy access'}

Research:
1. **Best Locations** - By opportunity and salary
2. **Tech Hubs** - Global centers for this role
3. **Startup Ecosystems** - Where the innovation is
4. **Cost of Living** - Actual take-home value
5. **Remote Opportunities** - Work from anywhere
6. **Visa Pathways** - Immigration sponsorship
7. **Salary Comparison** - By location
8. **Career Growth** - Which cities have most growth
9. **Quality of Life** - Beyond just salary
10. **Network Opportunities** - Where peers are

Include specific cities and realistic salary expectations.`;

        return await this.callAI(query);
    }

    /**
     * Get recession/economic impact analysis
     */
    async analyzeEconomicImpact(role, industry = '', concern = '') {
        const query = `How will economic changes impact ${role} in ${industry || 'my industry'}?

${concern ? `My Concern: ${concern}` : ''}

Analyze:
1. **Recession Resilience** - Is this recession-proof?
2. **Historical Patterns** - What happened in past recessions
3. **Current Risk** - Right now in 2024-2025
4. **Job Security** - Relative to other roles
5. **Salary Impact** - Likely changes
6. **Opportunity** - Hidden opportunities in downturn
7. **Adaptation Strategy** - What to focus on
8. **Companies Safe** - Who survives downturns
9. **Positioning** - How to stay valuable
10. **Action Plan** - What to do right now

Be honest about risks while providing actionable guidance.`;

        return await this.callAI(query);
    }

    /**
     * Call AI API
     */
    async callAI(query) {
        try {
            const provider = import.meta.env.VITE_AI_PROVIDER || 'openai';
            const apiKey = provider === 'openai'
                ? import.meta.env.VITE_OPENAI_API_KEY
                : import.meta.env.VITE_GEMINI_API_KEY;

            const messages = [
                {
                    role: 'system',
                    content: 'You are an expert industry analyst and career market researcher. Provide data-driven insights backed by real information.'
                },
                {
                    role: 'user',
                    content: query
                }
            ];

            if (provider === 'openai') {
                return await this.callOpenAI(messages, apiKey);
            } else if (provider === 'gemini') {
                return await this.callGemini(messages, apiKey);
            }
        } catch (error) {
            console.error('Industry Analysis Error:', error);
            return this.getFallbackResponse();
        }
    }

    async callOpenAI(messages, apiKey) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: messages,
                temperature: 0.7,
                max_tokens: 2000
            })
        });

        if (!response.ok) throw new Error('OpenAI API failed');
        const data = await response.json();
        return data.choices[0].message.content;
    }

    async callGemini(messages, apiKey) {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: messages.map(msg => ({
                        role: msg.role === 'user' ? 'user' : 'model',
                        parts: [{ text: msg.content }]
                    }))
                })
            }
        );

        if (!response.ok) throw new Error('Gemini API failed');
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    getFallbackResponse() {
        return `📊 **Market Research Resources:**

**Growing Industries (2024-2026):**
✅ AI/Machine Learning
✅ Cloud Computing & DevOps
✅ Cybersecurity
✅ Data Science & Analytics
✅ Blockchain & Web3
✅ Healthcare Tech
✅ Renewable Energy
✅ Quantum Computing

**Most Demanded Skills:**
✅ Python & JavaScript
✅ Cloud Platforms (AWS, Azure, GCP)
✅ Data Analysis
✅ Machine Learning
✅ Leadership & Communication
✅ Problem Solving
✅ System Design
✅ Critical Thinking

**High-Paying Roles:**
✅ Machine Learning Engineer: ₹15-80L+
✅ Senior Software Engineer: ₹20-100L+
✅ Product Manager: ₹12-80L+
✅ Data Scientist: ₹12-70L+
✅ Solutions Architect: ₹15-90L+

**Research Tools:**
- levels.fyi - Salary data
- glassdoor.com - Company reviews
- linkedin.com - Trend analysis
- ycombinator.com - Startup trends`;
    }
}

export const industryAnalyzer = new IndustryAnalyzer();
