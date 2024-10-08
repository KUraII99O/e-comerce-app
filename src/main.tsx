import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TranslationProvider } from './components/Translator/Provider/index.tsx'
import { ThemeProvider } from '@material-tailwind/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TranslationProvider>
    <ThemeProvider>
    <App />
    </ThemeProvider>
    </TranslationProvider>
  </StrictMode>,
)
