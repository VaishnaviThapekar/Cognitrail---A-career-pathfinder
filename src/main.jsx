// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { GamificationProvider } from './contexts/GamificationContext'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <GamificationProvider>
//       <App />
//     </GamificationProvider>
//   </StrictMode>,
// )




import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GamificationProvider } from './contexts/GamificationContext'
import { AuthProvider } from './contexts/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <GamificationProvider>
        <App />
      </GamificationProvider>
    </AuthProvider>
  </StrictMode>,
)