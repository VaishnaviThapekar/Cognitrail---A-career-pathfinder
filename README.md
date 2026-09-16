# 💡 COGNITRAIL - Your Enterprise Career Pathfinder

<div align="center">

![Cognitrail Logo](https://img.shields.io/badge/COGNITRAIL-Career_Pathfinder-0265A6?style=for-the-badge&logo=compass&logoColor=white)

**Transforming career aspirations into structured, actionable achievements with AI diagnostics, 500+ colleges, and 1-on-1 alumni mentorship.**

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Lucide Icons](https://img.shields.io/badge/Lucide-React-F56565?style=flat-square)](https://lucide.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-9.39-4B32C3?style=flat-square&logo=eslint)](https://eslint.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

[GitHub Repository](https://github.com/VaishnaviThapekar/Cognitrail---A-career-pathfinder.git) | [Features](#-key-features) | [Tech Stack](#-tech-stack) | [Getting Started](#-getting-started)

</div>

---

## 🎨 Official Visual Identity

Cognitrail strictly adheres to our **5-Shade Ocean & Royal Blue Palette**:

| Color Hex | Name | Purpose / UI Placement |
| :--- | :--- | :--- |
| `#051C3E` | **Midnight Ocean** | Deep background containers, hero gradient bases, and main headers |
| `#003B73` | **Royal Deep Blue** | Glassmorphic cards, secondary backgrounds, and modal borders |
| `#0265A6` | **Sapphire Blue** | Primary action buttons, active tab indicators, and icon highlights |
| `#6096BA` | **Sky Accent** | Secondary text accents, pulsating live badges, and subtle glows |
| `#EBF3FA` | **Ice White** | Light mode contrast backgrounds and primary text in dark mode |

---

## 🌟 About Cognitrail

**Cognitrail** is an enterprise-grade, interactive career guidance platform designed for high school students, undergraduates, and professionals. Powered by intelligent diagnostic algorithms, Cognitrail offers a complete ecosystem to discover 150+ career paths across 8 major domains, analyze skill gaps, predict college cutoffs, calculate ATS resume readiness, and connect 1-on-1 with verified industry mentors.

---

## ✨ Key Features

### 🎯 1. Interactive Career Explorer & Deep Dive
- **150+ Detailed Career Profiles** spanning *Software & AI*, *Medicine & Health*, *Management & Finance*, *Law & Policy*, *Design & Product*, *Pure Sciences*, *Aviation & Marine*, and *Agriculture*.
- **Day-in-a-Life Showcase**: Time-allocation donut charts, core tech stacks, and 10-year career mobility ladders.
- **Action Launcher Bar**: Instant 1-click access to all 7 platform diagnostic tools directly from any career profile.

### 🏫 2. All-India College Finder & Rank Predictor
- **500+ Tier 1, Tier 2, and Tier 3 Institutions** mapped across all **28 Indian States, Union Territories, and Overseas Premier Universities** (*MIT, Stanford, Oxford, ETH Zurich*).
- **Entrance Cutoff Predictor**: Evaluates student scores for **JEE Main/Adv**, **NEET UG/PG**, **CAT**, and **CLAT** to predict admission probabilities (*High Match 90%+, Target Match, Safety Match*).
- **Granular City Filtering**: Granular state-to-city dropdown filtering for all major hubs (*Mumbai, Pune, Delhi NCR, Bengaluru, Chennai, Hyderabad, Kolkata, etc.*).

### 🎓 3. Alumni & Industry Mentor Connect
- **Verified Mentor Directory**: Filterable profiles of leaders from *Google DeepMind*, *AIIMS New Delhi*, *Goldman Sachs*, *Microsoft Design*, *AZB & Partners*, and *Zerodha*.
- **1-on-1 Booking Engine**: Schedule 45-minute mock interviews, ATS resume reviews, or 30-minute career strategy chats with instant Google Meet link confirmation.

### 💸 4. Scholarship & Financial Aid Finder
- **Active 2026 Grants Database**: Central government schemes (*NSP Portal, KVPY/INSPIRE Fellowship*), corporate foundation grants (*Reliance Foundation, Aditya Birla Capital*), medical fee waivers, and UK Chevening fellowships.
- **Direct Portal Integration**: Direct 1-click links to official application portals.

### 📊 5. ATS Resume & Interview Readiness Scorecard
- **Role Alignment Evaluator**: Evaluates student qualifications for specific target roles.
- **Diagnostic Matrix**: Live alignment scores for ATS Keyword Match %, Portfolio Weight %, and STAR Interview Preparedness %.
- **Downloadable Sample ATS Resumes**: Instant text/file downloads for 5 domain-tailored sample ATS resume templates.

### 💰 6. Interactive Salary Calculator
- **Experience Sliders & Location Multipliers**: Real-time salary benchmark estimations based on years of experience and Tier 1 vs Tier 2/3 city cost-of-living index.

### 📅 7. Exam Countdown Tracker
- **Real-Time Countdown Timers**: Live timers and official portal links for *JEE Main/Adv, NEET, CAT, CLAT, UPSC CSE, GATE, and NEET PG*.

### 🚀 8. Floating Quick-Action Speed Dial Dock
- **Glassmorphic Floating Dock**: Fixed bottom-right speed dial giving 1-click access to AI Quiz, Skills Gap, Roadmap Builder, College Finder, Salary Calculator, Exam Tracker, Alumni Connect, and AI Advisor Pro.

### 🎮 9. Gamification & XP System
- **10 XP Levels**: Earn points for taking quizzes, exploring careers, saving colleges, and booking mentor sessions. Unlock achievements and track progress visually.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS 3.4, Lucide React Icons
- **State Management**: React Context API (`AuthContext.jsx`, `GamificationContext.jsx`)
- **Build Tooling**: Vite 7.3
- **Code Quality**: ESLint 9 (Strict `0 errors, 0 warnings` rule enforced)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/VaishnaviThapekar/Cognitrail---A-career-pathfinder.git
   cd Cognitrail
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Lint Codebase**
   ```bash
   npm run lint
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📁 Project Directory Structure

```
Cognitrail/
├── src/
│   ├── components/
│   │   ├── AdvancedCareerChatbot.jsx
│   │   ├── AlumniConnectModal.jsx       # 1-on-1 Alumni Mentor Booking
│   │   ├── CareerCard.jsx
│   │   ├── CareerDetailModal.jsx        # Deep dive with 6-tool action bar
│   │   ├── Careerquiz.jsx              # 10-Question AI Career Quiz
│   │   ├── CollegeCutoffPredictor.jsx   # Entrance exam rank & cutoff matcher
│   │   ├── CollegeFinder.jsx            # 500+ Tier 1-3 All-India College Finder
│   │   ├── CustomScrollbar.jsx          # 5-shade Ocean Blue custom scrollbar
│   │   ├── DayInLifeShowcase.jsx        # Daily time allocation & career ladder
│   │   ├── ExamCountdownTracker.jsx     # Live exam countdown timers
│   │   ├── FloatingQuickDock.jsx        # Bottom-right floating speed dial dock
│   │   ├── GamificationComponents.jsx   # Level-up & achievement notifications
│   │   ├── Header.jsx                   # Sticky header with 5-shade mobile drawer
│   │   ├── HeroSection.jsx
│   │   ├── ReadinessScorecardModal.jsx  # ATS match score & sample resume downloader
│   │   ├── SalaryCalculatorModal.jsx    # Interactive experience & location slider
│   │   ├── ScholarshipFinderModal.jsx   # Active 2026 grants & official portals
│   │   ├── SkillsGapAnalyzer.jsx        # Visual skill acquisition roadmap
│   │   └── StudentProfile.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── GamificationContext.jsx
│   ├── data/
│   │   ├── careerDatabase.js
│   │   ├── collegesDatabase.js          # Main Indian colleges database
│   │   └── collegesExtra.js             # Extended Tier 1-3 & Global universities
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
└── README.md
```

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">

**Made with ❤️ by the Cognitrail Engineering Team**

</div>
