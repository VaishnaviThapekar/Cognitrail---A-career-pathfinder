// Resume Analysis Service
// Provides AI-powered resume feedback and optimization suggestions

import { aiAdvisor } from './aiCareerAdvisor';

const RESUME_ANALYSIS_PROMPT = `You are an expert resume and career coach. Analyze the provided resume and provide:

1. **Overall Score** (out of 100)
2. **Key Strengths** - What's working well
3. **Critical Improvements** - Must-fix issues
4. **ATS Optimization** - Applicant Tracking System tips
5. **Impact Statements** - Make bullet points more compelling
6. **Skills Section Recommendations**
7. **Format & Structure** feedback
8. **Content Suggestions** for each section
9. **Action Items** - Specific improvements to make

Be specific, actionable, and encouraging. Use data and best practices from FAANG companies.`;

class ResumeAnalyzer {
    /**
     * Analyze resume and provide detailed feedback
     * @param {string} resumeText - Plain text or markdown resume content
     * @param {string} targetRole - Desired job role
     * @param {string} experience - Years of experience
     * @returns {Promise<object>} - Structured analysis with scores and recommendations
     */
    async analyzeResume(resumeText, targetRole = '', experience = '') {
        try {
            const query = `Please analyze this resume and provide detailed feedback for a ${targetRole || 'general'} role with ${experience || 'relevant'} experience:\n\n${resumeText}`;

            const messages = [
                {
                    role: 'system',
                    content: RESUME_ANALYSIS_PROMPT
                },
                {
                    role: 'user',
                    content: query
                }
            ];

            const analysis = await this.callAIAnalysis(messages);

            return {
                success: true,
                analysis: analysis,
                timestamp: new Date().toISOString(),
                targetRole: targetRole,
                experience: experience
            };
        } catch (error) {
            console.error('Resume Analysis Error:', error);
            return {
                success: false,
                error: error.message,
                fallbackAdvice: this.getResumeOptimizationTips()
            };
        }
    }

    /**
     * Get specific optimization tips for a resume section
     */
    async optimizeSection(sectionName, sectionContent, targetRole) {
        const query = `Improve this "${sectionName}" section for a ${targetRole} role:\n\n${sectionContent}\n\nProvide 3-5 specific improvements with examples.`;

        const messages = [
            {
                role: 'system',
                content: 'You are a resume optimization expert. Provide specific, actionable improvements.'
            },
            {
                role: 'user',
                content: query
            }
        ];

        return await this.callAIAnalysis(messages);
    }

    /**
     * Generate ATS-optimized resume suggestions
     */
    async generateATSOptimizations(resumeText, jobDescription) {
        const query = `Compare this resume with the job description and suggest ATS optimizations:\n\nResume:\n${resumeText}\n\nJob Description:\n${jobDescription}\n\nProvide keyword recommendations and formatting suggestions.`;

        const messages = [
            {
                role: 'system',
                content: 'You are an ATS (Applicant Tracking System) expert. Help optimize resumes for better machine readability while maintaining human appeal.'
            },
            {
                role: 'user',
                content: query
            }
        ];

        return await this.callAIAnalysis(messages);
    }

    /**
     * Call AI for analysis
     */
    async callAIAnalysis(messages) {
        const provider = import.meta.env.VITE_AI_PROVIDER || 'openai';
        const apiKey = provider === 'openai'
            ? import.meta.env.VITE_OPENAI_API_KEY
            : import.meta.env.VITE_GEMINI_API_KEY;

        if (provider === 'openai') {
            return await this.callOpenAI(messages, apiKey);
        } else if (provider === 'gemini') {
            return await this.callGemini(messages, apiKey);
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

    getResumeOptimizationTips() {
        return `📄 **Resume Optimization Tips:**

**Strong Action Verbs:** Developed, Implemented, Designed, Optimized, Delivered, Led, Managed

**Quantify Results:** 
❌ "Improved performance"
✅ "Improved system performance by 45%, reducing load time from 8s to 4.4s"

**Format Best Practices:**
✅ One page for <3 years experience
✅ Maximum 2 pages for senior roles
✅ Use consistent formatting
✅ Highlight key metrics

**Keywords Matter:**
✅ Match job description keywords
✅ Include relevant skills
✅ Use industry-specific terminology

**Sections to Include:**
1. Contact & Professional Summary
2. Experience (with metrics)
3. Skills (technical & soft)
4. Education
5. Certifications/Projects`;
    }
}

export const resumeAnalyzer = new ResumeAnalyzer();
