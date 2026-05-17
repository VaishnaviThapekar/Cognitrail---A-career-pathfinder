// AI Career Advisor Service
// Handles all AI-powered career guidance using OpenAI GPT-4 or Google Gemini

import { CAREER_DATABASE as careerDatabase } from '../data/careerDatabase';

const API_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'openai';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// System prompt for AI advisor
const SYSTEM_PROMPT = `You are an expert career counselor AI with deep knowledge of:
- 150+ career paths and industries
- Educational requirements and pathways
- Salary trends and market analysis
- Interview and negotiation strategies
- Career transitions and skill development
- Resume optimization and personal branding
- Industry trends and future job market predictions
- Student exam preparation (JEE, NEET, CAT, etc.)

You provide:
✅ Personalized career recommendations based on user profile
✅ Realistic salary information with growth potential
✅ Resume feedback and optimization tips
✅ Interview preparation strategies
✅ Career transition guidance
✅ Skill gap analysis
✅ Industry insights and job market trends
✅ Negotiation strategies and tips

Always be encouraging, practical, and data-driven. Ask clarifying questions to understand user needs better.`;

class AICareerAdvisor {
    /**
     * Main method to get AI-powered career advice
     * @param {string} userQuery - User's question or request
     * @param {object} userProfile - User's profile data
     * @param {string} conversationContext - Previous messages for context
     * @returns {Promise<string>} - AI generated response
     */
    async getCareerAdvice(userQuery, userProfile = {}, conversationContext = []) {
        try {
            const context = this.buildContext(userProfile);
            const messages = this.buildMessages(userQuery, context, conversationContext);

            if (API_PROVIDER === 'openai') {
                return await this.callOpenAI(messages);
            } else if (API_PROVIDER === 'gemini') {
                return await this.callGemini(messages);
            } else {
                throw new Error(`Unsupported AI provider: ${API_PROVIDER}`);
            }
        } catch (error) {
            console.error('AI Career Advisor Error:', error);
            return this.getFallbackResponse(userQuery);
        }
    }

    /**
     * Build context from user profile and career database
     */
    buildContext(userProfile) {
        const profileInfo = userProfile.interests
            ? `User Interests: ${userProfile.interests.join(', ')}\n`
            : '';

        const skillsInfo = userProfile.skills
            ? `User Skills: ${userProfile.skills.join(', ')}\n`
            : '';

        const educationInfo = userProfile.education
            ? `Education: ${userProfile.education}\n`
            : '';

        const careerFocusInfo = userProfile.careerGoal
            ? `Career Goal: ${userProfile.careerGoal}\n`
            : '';

        return `${profileInfo}${skillsInfo}${educationInfo}${careerFocusInfo}
Career Database: 150+ careers with salary, education, and skill requirements
Available Resources: College Finder, Career Quiz, Interview Prep, Resume Analysis
Industry Trends: Tech, AI/ML, Healthcare, Data Science, Cybersecurity growing rapidly`;
    }

    /**
     * Build message array for API calls
     */
    buildMessages(userQuery, context, conversationContext) {
        const messages = [
            {
                role: 'system',
                content: SYSTEM_PROMPT
            }
        ];

        // Add previous conversation messages
        conversationContext.forEach(msg => {
            messages.push({
                role: msg.type === 'user' ? 'user' : 'assistant',
                content: msg.text
            });
        });

        // Add current query with context
        messages.push({
            role: 'user',
            content: `${context}\n\nUser Query: ${userQuery}`
        });

        return messages;
    }

    /**
     * Call OpenAI GPT-4 API
     */
    async callOpenAI(messages) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000,
                top_p: 0.9
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    /**
     * Call Google Gemini API
     */
    async callGemini(messages) {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: messages.map(msg => ({
                        role: msg.role === 'user' ? 'user' : 'model',
                        parts: [{ text: msg.content }]
                    }))
                })
            }
        );

        if (!response.ok) {
            throw new Error(`Gemini API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    /**
     * Fallback response when API is unavailable
     */
    getFallbackResponse(userQuery) {
        return `I appreciate your question: "${userQuery}"\n\n📝 To provide the best career guidance, I would need my AI connection. However, here are some immediate suggestions:\n\n1. **Take our AI Career Quiz** - Get personalized recommendations\n2. **Explore Career Profiles** - Browse 150+ career options\n3. **Use College Finder** - Find best-fit colleges\n4. **Check Salary Information** - Industry salary trends\n5. **Review Interview Tips** - Common interview patterns\n\nPlease ensure your API key is configured in the environment variables.`;
    }
}

export const aiAdvisor = new AICareerAdvisor();
