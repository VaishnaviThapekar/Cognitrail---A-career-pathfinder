# COGNITRIAL - Component Structure

## 📁 File Organization

```
src/
├── App.jsx                          (Main app - simplified)
├── components/
│   ├── Header.jsx                   (Header with search, notifications, profile)
│   ├── HeroSection.jsx              (Hero banner with stats)
│   ├── WhyChooseSection.jsx         (Feature cards)
│   ├── CareerCard.jsx               (Individual career card)
│   ├── CareerDetailModal.jsx        (Career details popup)
│   └── ProfilePage.jsx              (User profile page)
├── data/
│   └── careerDatabase.js            (All career data - keep from original)
└── index.css                         (Tailwind + animations)
```

## 🔧 How to Use These Components

### 1. Copy Component Files
Copy all files from `src/components/` to your project's `src/components/` folder

### 2. Update Your App.jsx

Replace your current App.jsx with this simplified version:

```jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WhyChooseSection from './components/WhyChooseSection';
import CareerCard from './components/CareerCard';
import CareerDetailModal from './components/CareerDetailModal';
import ProfilePage from './components/ProfilePage';
import { CAREER_DATABASE } from './data/careerDatabase'; // Keep your existing data
import { ChevronRight } from 'lucide-react';

export default function CognitrialApp() {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedSubField, setSelectedSubField] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [savedCareers, setSavedCareers] = useState([]);
  const [activeSection, setActiveSection] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Guest User",
    email: "user@cognitrial.com",
    grade: "10th Passed",
    interests: ["Technology", "Science"],
    location: "India",
    profileComplete: 45
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const filteredDomains = Object.entries(CAREER_DATABASE).filter(([key, domain]) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      domain.name.toLowerCase().includes(query) ||
      domain.subFields.some(sf => 
        sf.name.toLowerCase().includes(query) ||
        sf.description.toLowerCase().includes(query) ||
        sf.careers.some(c => c.name.toLowerCase().includes(query))
      )
    );
  });

  // Welcome screen logic stays the same...
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 flex items-center justify-center p-4">
        <div className="text-center animate-fadeIn">
          <div className="mb-8">
            <Lightbulb className="w-24 h-24 text-yellow-400 mx-auto animate-pulse" />
          </div>
          <h1 className="text-6xl font-black text-white mb-4 tracking-tight">COGNITRIAL</h1>
          <p className="text-2xl text-cyan-200 font-light">Your Intelligent Career Pathfinder</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 to-teal-50'}`}>
      {/* Profile Page */}
      {showProfile && (
        <ProfilePage 
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onClose={() => setShowProfile(false)}
          darkMode={darkMode}
          savedCareers={savedCareers}
        />
      )}

      {!showProfile && (
        <>
          <Header 
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            userProfile={userProfile}
            setShowProfile={setShowProfile}
          />

          <main className="max-w-7xl mx-auto px-4 py-8">
            {!selectedDomain ? (
              <div>
                <HeroSection darkMode={darkMode} setActiveSection={setActiveSection} />
                <WhyChooseSection darkMode={darkMode} />
                
                {/* Domain Selection */}
                <div id="domains">
                  <div className="text-center mb-12">
                    <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Explore Career Domains</h2>
                    <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Choose your area of interest</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDomains.map(([key, domain]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedDomain(key)}
                        className={`group ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-3xl p-8 border-2 hover:border-teal-400 hover:shadow-2xl transition-all duration-300 text-left hover-lift`}
                      >
                        <div className="text-6xl mb-4 animate-float">{domain.icon}</div>
                        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{domain.name}</h3>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>{domain.subFields.length} fields</p>
                        <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform">
                          Explore <ChevronRight className="w-5 h-5 ml-1" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : selectedSubField ? (
              <div>
                <h2>{selectedSubField.name}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedSubField.careers.map((career, idx) => (
                    <CareerCard key={idx} career={career} onSelect={setSelectedCareer} darkMode={darkMode} />
                  ))}
                </div>
              </div>
            ) : (
              /* Subfield selection UI */
              <div>...</div>
            )}
          </main>

          {selectedCareer && (
            <CareerDetailModal career={selectedCareer} onClose={() => setSelectedCareer(null)} darkMode={darkMode} />
          )}
        </>
      )}
    </div>
  );
}
```

### 3. Keep Your Career Data
Keep the `CAREER_DATABASE` from your original file - it has all the career information.

## ✅ Benefits

- **Easier to maintain**: Each component in its own file
- **Reusable**: Components can be used anywhere
- **Cleaner code**: Main App.jsx is much smaller
- **Better organization**: Easy to find and edit specific features
- **Team-friendly**: Multiple people can work on different components

## 📝 Next Steps

1. Create the `components` folder: `src/components/`
2. Copy all 6 component files into it
3. Update your App.jsx with the simplified version
4. Make sure your career database is imported correctly
5. Run `npm run dev`

Everything will work exactly the same, but the code will be much cleaner!
