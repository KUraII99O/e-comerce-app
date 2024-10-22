import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import './index.css'
import { TranslationProvider } from './components/Translator/Provider/index.tsx'
import { ThemeProvider } from '@material-tailwind/react'
import './components/SellerDashboard/css/style.css';
import './components/SellerDashboard/css/satoshi.css';  
import "jsvectormap/dist/jsvectormap.css";
import 'flatpickr/dist/flatpickr.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TranslationProvider>
    <ThemeProvider>
    <App />
    </ThemeProvider>
    </TranslationProvider>
  </StrictMode>,
)
