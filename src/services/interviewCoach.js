// Interview Preparation Service
// Provides AI-powered interview coaching and preparation strategies

class InterviewPreparationCoach {
    /**
     * Generate interview preparation guide for specific role
     */
    async generateInterviewGuide(role, company = '', experience = '') {
        const query = `Create a comprehensive interview preparation guide for a ${role} role${company ? ` at ${company}` : ''}${experience ? ` for someone with ${experience} experience` : ''}.

Include:
1. **Top 20 Interview Questions** - Role-specific
2. **Sample Answers** - Using STAR method
3. **Technical Questions** - If applicable
4. **Company-Specific Questions** - About culture and values
5. **Follow-up Questions** - What to ask interviewer
6. **Common Mistakes** - What to avoid
7. **Preparation Timeline** - Week-by-week prep schedule
8. **Day-Before Checklist**
9. **Interview Day Tips**
10. **Salary Negotiation Script**`;

        return await this.callAI(query);
    }

    /**
     * Generate STAR method answer for behavioral question
     */
    async generateSTARAnswer(question, context) {
        const query = `Help me answer this behavioral interview question using the STAR method:

Question: ${question}

Context: ${context}

Structure your answer as:
- **Situation**: Set the context
- **Task**: What was required
- **Action**: What you specifically did
- **Result**: Quantifiable outcomes and learnings

Make it 2-3 minutes to speak (about 200-300 words).`;

        return await this.callAI(query);
    }

    /**
     * Get technical interview preparation for specific tech stack
     */
    async getTechnicalInterview(role, techStack, difficulty = 'medium') {
        const query = `Prepare me for a ${difficulty} level ${role} technical interview with ${techStack} stack.

Provide:
1. **Core Concepts** - Must-know topics
2. **Data Structures** - Common patterns (if applicable)
3. **Algorithms** - Practice problems
4. **System Design** - For senior roles
5. **Coding Problems** - With solutions
6. **Debugging Scenarios** - Real-world issues
7. **Performance Optimization** - O(n) complexity discussions
8. **Best Practices** - Code quality standards
9. **Tools & Environment** - What to setup
10. **Mock Interview Questions** - 5 realistic questions`;

        return await this.callAI(query);
    }

    /**
     * Generate company-specific interview preparation
     */
    async getCompanySpecificPrep(company, role, position = '') {
        const query = `Create an interview preparation guide for ${role} role at ${company}${position ? ` in ${position}` : ''}.

Research what makes this company unique:
1. **Company Overview** - Mission, values, recent news
2. **Interview Process** - What to expect at this company
3. **Culture Fit Questions** - How to demonstrate alignment
4. **Product Knowledge** - Key products/services to know
5. **Recent News** - Latest company developments
6. **Competitors** - How they compare
7. **Role Expectations** - Specific to this company
8. **Success Stories** - Questions about past employees
9. **Potential Deal-Breakers** - Known company challenges
10. **Closing Questions** - Impress the interviewer`;

        return await this.callAI(query);
    }

    /**
     * Get salary negotiation script
     */
    async getSalaryNegotiationScript(role, location, experience, offerRange = '') {
        const query = `Create a professional salary negotiation script for:
- Role: ${role}
- Location: ${location}
- Experience: ${experience} years
${offerRange ? `- Initial Offer: ${offerRange}` : ''}

Provide:
1. **Research Data** - Industry salary benchmarks
2. **Opening Statement** - Professional but confident
3. **Negotiation Script** - Word-for-word dialogue
4. **Responses** - To common objections
5. **Total Compensation** - Negotiate beyond base salary
6. **Timeline** - When to negotiate
7. **Red Flags** - Walk away scenarios
8. **Benefits to Negotiate** - Flexible work, signing bonus, etc.
9. **Closing Lines** - Professional ways to conclude
10. **Email Templates** - For written follow-up`;

        return await this.callAI(query);
    }

    /**
     * Generate follow-up question suggestions
     */
    async generateFollowUpQuestions(role, company) {
        const query = `Suggest 10 impressive questions I should ask interviewers for a ${role} position at ${company}.

Questions should:
- Show genuine interest in company/role
- Demonstrate industry knowledge
- Highlight your background value
- Avoid obvious/easily googled info
- Be specific and thoughtful
- Not focus on salary/benefits too much

Format each as:
✅ Question: [question]
💡 Why it works: [why this shows you're thoughtful]
📌 Follow-up: [potential follow-up based on their answer]`;

        return await this.callAI(query);
    }

    /**
     * Get post-interview follow-up templates
     */
    async getFollowUpTemplate(role, company, interviewer = '') {
        const query = `Create professional post-interview follow-up email templates:

Scenario: After ${role} interview at ${company}${interviewer ? ` with ${interviewer}` : ''}

Templates needed:
1. **24-Hour Follow-up** - Thank you + key points
2. **Address Concern** - If something didn't go well
3. **Additional Info** - To strengthen candidacy
4. **Status Check** - After 1 week
5. **Negotiation Email** - If offer received
6. **Rejection Response** - Professional way to handle

Make them customizable but professional.`;

        return await this.callAI(query);
    }

    /**
     * Analyze interview performance
     */
    async getInterviewFeedback(yourAnswer, question, expectedCompetencies = []) {
        const query = `Provide detailed interview feedback on my answer:

Question: ${question}

My Answer: ${yourAnswer}

${expectedCompetencies.length > 0 ? `Expected Competencies: ${expectedCompetencies.join(', ')}` : ''}

Evaluate:
1. **Relevance** - Does it answer the question?
2. **Structure** - Was it well-organized?
3. **Depth** - Did you provide enough detail?
4. **Authenticity** - Does it sound genuine?
5. **Metrics** - Are there quantifiable results?
6. **Clarity** - Could a non-technical person understand?
7. **Length** - Was it concise or rambling?
8. **Improvements** - Specific ways to strengthen
9. **Rating** (1-10) - Overall quality
10. **Revised Answer** - Your improved version`;

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
                    content: 'You are an expert interview coach and career strategist. Provide practical, actionable, and encouraging advice.'
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
            console.error('Interview Prep Error:', error);
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
        return `📋 **Interview Preparation Resource:**

**Before Interview:**
✅ Research company (history, products, values)
✅ Prepare STAR stories (5-7 key achievements)
✅ Practice out loud (not just thinking)
✅ Prepare questions to ask
✅ Check technical setup (for remote interviews)

**Common Questions:**
1. Tell me about yourself
2. Why do you want this role?
3. Your greatest strength?
4. Handle conflict with colleague?
5. When did you fail and learn?
6. Where do you see yourself in 5 years?

**Day of Interview:**
✅ Arrive 15 mins early
✅ Bring copies of resume
✅ Phone on silent
✅ Maintain eye contact
✅ Smile and be enthusiastic
✅ Use their names`;
    }
}

export const interviewCoach = new InterviewPreparationCoach();
