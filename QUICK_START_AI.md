# ⚡ AI Career Advisor - Quick Start (5 minutes)

## Step 1: Get API Key (2 minutes)

**Using OpenAI GPT-4 (Recommended):**
1. Go to https://platform.openai.com/
2. Sign up/login → API Keys → "Create new secret key"
3. Copy the key

**OR Using Google Gemini (Free option):**
1. Go to https://makersuite.google.com/app/apikey
2. "Create API Key"
3. Copy the key

## Step 2: Configure Environment (1 minute)

Create `.env` file in project root:

```env
# Choose your AI provider
VITE_AI_PROVIDER=openai
VITE_OPENAI_API_KEY=sk-...your-key-here...

# OR if using Gemini:
# VITE_AI_PROVIDER=gemini
# VITE_GEMINI_API_KEY=your-gemini-key-here
```

## Step 3: Run & Test (2 minutes)

```bash
npm run dev
```

Then:
1. Open http://localhost:5173
2. Find the pink "AI Career Advisor Pro" card or button
3. Click to open the chatbot
4. Try asking a question!

## Example Questions to Try

### Resume Analysis
```
"Analyze my resume for a Senior Software Engineer role"
"How can I improve my resume ATS score?"
"Optimize my skills section"
```

### Interview Prep
```
"Prepare me for a Google interview for Product Manager"
"Give me STAR examples for a leadership question"
"What should I ask in an interview?"
```

### Salary Negotiation
```
"What should I negotiate for a Senior Engineer in Bangalore?"
"How do I evaluate stock options?"
"What benefits should I negotiate?"
```

### Career Guidance
```
"I want to transition to Product Management"
"What skills are most in-demand for my role?"
"How can I accelerate my career in tech?"
```

### Market Analysis
```
"What are emerging careers in 2025?"
"How will AI impact software engineers?"
"Best locations for remote work?"
```

## 🎯 Feature Modes

**Use the dropdown menu to switch between:**
1. 🎯 **Career Advisor** - General career guidance
2. 📄 **Resume Analysis** - Optimize your resume
3. 🎤 **Interview Prep** - Get interview ready
4. 💰 **Salary & Negotiation** - Negotiate better
5. 🚀 **Career Transition** - Change careers
6. 📊 **Market Analysis** - Industry trends

## ✅ Verification

After setup, verify everything works:

✓ Chatbot opens without errors  
✓ Can type and send messages  
✓ AI responds within 5-10 seconds  
✓ Feature mode dropdown works  
✓ Suggestions appear after responses  

## 🐛 If Something Breaks

| Issue | Fix |
|-------|-----|
| "API key not configured" | Add key to `.env` |
| Blank chatbot | Check API key is valid |
| Slow responses | May take 5-10 sec, be patient |
| Empty responses | Verify API provider is accessible |

## 💡 Pro Tips

- Be specific in your queries (include role, level, location)
- Use feature mode dropdown for targeted help
- Click suggestions to explore related topics
- Try different phrasings if response isn't helpful
- Screenshot important responses

## Next Steps

1. ✅ Complete 5-minute setup above
2. 📖 Read [AI_IMPLEMENTATION_GUIDE.md](./AI_IMPLEMENTATION_GUIDE.md) for detailed docs
3. 🎨 Customize prompts in service files if needed
4. 🚀 Deploy to production (add API rate limiting)
5. 📊 Set up monitoring and analytics

## Need Help?

- Check `.env` configuration first
- Verify API key is valid and has credits
- Check browser console for errors (F12)
- Read the detailed guide: `AI_IMPLEMENTATION_GUIDE.md`

---

**Ready? Go to http://localhost:5173 and click the pink button! 🚀**
