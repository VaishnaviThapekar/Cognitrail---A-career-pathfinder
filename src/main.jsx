import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GamificationProvider } from './contexts/GamificationContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GamificationProvider>
      <App />
    </GamificationProvider>
  </StrictMode>,
)