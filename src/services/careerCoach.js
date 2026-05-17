// Salary Negotiation & Career Transition Service
// Provides AI-powered salary negotiation and career change guidance

class SalaryNegotiationCoach {
    /**
     * Get salary benchmark data and negotiation strategy
     */
    async getSalaryStrategy(role, location, experience, currentSalary = '', targetSalary = '') {
        const query = `Provide comprehensive salary negotiation strategy:

Job Details:
- Role: ${role}
- Location: ${location}
- Your Experience: ${experience} years
${currentSalary ? `- Current Salary: ${currentSalary}` : ''}
${targetSalary ? `- Target Salary: ${targetSalary}` : ''}

Include:
1. **Market Research** - Industry salary ranges
2. **Benchmark Data** - Your position in market
3. **Negotiation Window** - When to negotiate
4. **Total Compensation** - Beyond base salary
5. **Opening Bid** - Your starting number
6. **Walk-Away Number** - Minimum acceptable
7. **Negotiation Script** - Specific phrases to use
8. **Benefits Negotiation** - Equity, bonus, PTO, etc.
9. **Red Flags** - When NOT to negotiate
10. **Post-Negotiation** - Getting offer in writing`;

        return await this.callAI(query);
    }

    /**
     * Generate response to initial offer
     */
    async respondToOffer(offer, details) {
        const query = `Help me respond professionally to this job offer:

Offer Details:
${JSON.stringify(details, null, 2)}

Base Salary: ${offer}

Generate:
1. **Acceptance Email** - If satisfied
2. **Negotiation Email** - If need to counter
3. **Counter-Offer** - Specific number with justification
4. **Clarification Questions** - To ask before accepting
5. **Timeline Response** - How long to consider
6. **Professional Decline** - If not a good fit

Make each response professional but personable.`;

        return await this.callAI(query);
    }

    /**
     * Get equity negotiation guidance (for startups/tech)
     */
    async negotiateEquity(company, role, baseSalary, equityOffer = '') {
        const query = `Guide me on equity negotiation for ${company}:

Role: ${role}
Base Salary: ${baseSalary}
${equityOffer ? `Equity Offered: ${equityOffer}` : ''}

Cover:
1. **Stock Options vs Restricted Stock** - Pros/cons
2. **Vesting Schedule** - 4-year vesting standard
3. **Cliff Period** - What to negotiate
4. **Strike Price** - vs. Fair Market Value
5. **Equity Value** - How to calculate
6. **Company Valuation** - Impact on your options
7. **Exit Scenarios** - What happens if acquired
8. **Tax Implications** - ISOs vs NSOs
9. **Renegotiation** - When possible
10. **Questions to Ask** - Company-specific`;

        return await this.callAI(query);
    }

    /**
     * Get benefits negotiation tips
     */
    async negotiateBenefits(role, company, currentBenefits = {}) {
        const query = `Create benefits negotiation strategy for ${role} at ${company}:

Benefits to Consider:
1. **Time Off** - Vacation, sick days, sabbatical
2. **Remote Work** - Work from home policy
3. **Flexible Schedule** - Core hours, 4-day week
4. **Professional Development** - Learning budget
5. **Signing Bonus** - Especially for switching
6. **Relocation** - If moving for job
7. **Insurance** - Health, dental, vision coverage
8. **Retirement** - 401k matching percentage
9. **Wellness** - Gym, mental health resources
10. **Commute** - Transit allowance, parking

${Object.keys(currentBenefits).length > 0 ? `Current Benefits: ${JSON.stringify(currentBenefits)}` : ''}

Provide negotiation scripts for each category.`;

        return await this.callAI(query);
    }
}

class CareerTransitionCoach {
    /**
     * Get guidance on career transition
     */
    async planCareerTransition(fromRole, toRole, timeline = '6-12 months') {
        const query = `Create a detailed career transition plan:

Current Role: ${fromRole}
Target Role: ${toRole}
Desired Timeline: ${timeline}

Provide:
1. **Gap Analysis** - Skills needed for new role
2. **Learning Plan** - Courses, certifications, projects
3. **Portfolio Building** - How to demonstrate capabilities
4. **Network Building** - Informational interviews
5. **Resume Pivot** - Transferable skills highlight
6. **Side Projects** - To build experience
7. **Certifications** - Recommended credentials
8. **Time Investment** - Hours/week needed
9. **Finance Planning** - Potential salary impact
10. **Networking Strategy** - Key people to meet

Include specific resources and realistic timelines.`;

        return await this.callAI(query);
    }

    /**
     * Get guidance on industry change
     */
    async changeIndustry(currentIndustry, targetIndustry, currentRole = '', skills = []) {
        const query = `Guide me on transitioning from ${currentIndustry} to ${targetIndustry} industry:

${currentRole ? `Current Role: ${currentRole}` : ''}
${skills.length > 0 ? `My Skills: ${skills.join(', ')}` : ''}

Cover:
1. **Transferable Skills** - What carries over
2. **Industry Differences** - Key distinctions
3. **Entry Paths** - How to break in
4. **Companies to Target** - Those hiring transitions
5. **Certifications** - Industry-specific credentials
6. **Networking** - Who to talk to
7. **Salary Expectations** - Often take cut initially
8. **Timeline** - Realistic transition period
9. **Skill Gaps** - What to learn
10. **Success Stories** - Similar transitions

Be honest about challenges but encouraging.`;

        return await this.callAI(query);
    }

    /**
     * Prepare for career acceleration
     */
    async accelerateCareer(currentRole, targetLevel = 'next level', timeline = '2 years') {
        const query = `Create acceleration plan for career growth:

Current Role: ${currentRole}
Target Level: ${targetLevel}
Timeline: ${timeline}

Include:
1. **Skills Assessment** - Current vs. needed
2. **High-Impact Projects** - To work on
3. **Visibility Strategy** - Get noticed for promotion
4. **Leadership Development** - If targeting management
5. **Mentorship** - Finding and working with mentors
6. **Communication** - Career goals with manager
7. **Performance Metrics** - Track your wins
8. **Networking** - Within and outside company
9. **Negotiation** - Title, salary, responsibility
10. **Alternative Paths** - If promotion doesn't happen

Focus on being promotable vs. waiting for promotion.`;

        return await this.callAI(query);
    }

    /**
     * Handle career setbacks or layoffs
     */
    async recoverFromSetback(situationType = 'layoff', context = '') {
        const query = `Help me recover from a career setback - ${situationType}:

${context ? `Context: ${context}` : ''}

Provide:
1. **Immediate Actions** - First 48 hours
2. **Financial Planning** - Manage runway
3. **Emotional Support** - It's not about you
4. **Resume Update** - Position setback positively
5. **Networking Sprint** - Get back out there
6. **Skill Update** - Use downtime productively
7. **Job Search Strategy** - Efficient approach
8. **Interview Framing** - How to talk about it
9. **Negotiation Strength** - Use time to negotiate
10. **Long-term Planning** - Prevent repeat

Include how to extract learnings and move forward.`;

        return await this.callAI(query);
    }

    /**
     * Career path exploration for salary growth
     */
    async exploreCareerPaths(role, industry = '', goals = {}) {
        const query = `Explore multiple career paths for maximizing earnings and impact:

Role: ${role}
${industry ? `Industry: ${industry}` : ''}

Goals: ${JSON.stringify(goals, null, 2)}

Show:
1. **Manager Path** - Pros and cons
2. **IC Path** - Individual Contributor track
3. **Specialist Path** - Deep expertise
4. **Entrepreneur Path** - Starting own venture
5. **Side Hustle Path** - Passive income
6. **Consulting Path** - Independent work
7. **Remote Path** - Global opportunities
8. **Startup Path** - Early-stage involvement
9. **Academic Path** - Research/teaching
10. **Portfolio Path** - Multiple income streams

Include salary potential, work-life balance, and satisfaction for each.`;

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
                    content: 'You are an expert career coach and salary negotiation specialist. Be direct, practical, and empowering.'
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
            console.error('Career Coaching Error:', error);
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
        return `💼 **Career Coaching Resources:**

**For Salary Negotiation:**
✅ Research glassdoor.com, levels.fyi, payscale.com
✅ Know your market value before negotiating
✅ Wait until offer stage to discuss salary
✅ Always counter-offer professionally

**For Career Transition:**
✅ Learn by doing (projects > courses)
✅ Build portfolio/side projects
✅ Network in target industry
✅ Reframe resume for new role

**For Career Growth:**
✅ Find mentor in target role
✅ Take on high-visibility projects
✅ Develop leadership skills early
✅ Communicate career goals`;
    }
}

export const salaryCoach = new SalaryNegotiationCoach();
export const careerCoach = new CareerTransitionCoach();
