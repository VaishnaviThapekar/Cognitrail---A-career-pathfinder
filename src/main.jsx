import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GamificationProvider } from './contexts/GamificationContext'
import { AuthProvider } from './contexts/AuthContext'
// Merge extra colleges dataset at startup so CollegeFinder has full coverage
import { mergeCollegesData } from './data/collegesDatabase'
import EXTRA_COLLEGES from './data/collegesExtra'

mergeCollegesData(EXTRA_COLLEGES);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <GamificationProvider>
        <App />
      </GamificationProvider>
    </AuthProvider>
  </StrictMode>,
)