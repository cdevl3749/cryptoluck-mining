import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import i18n from './i18n'
import App from './App.jsx'

// Détecter le paramètre ?lang= dans l'URL avant le rendu
const urlParams = new URLSearchParams(window.location.search)
const langParam = urlParams.get('lang')

// Si une langue valide est spécifiée, la charger
if (langParam && ['fr', 'en', 'ja'].includes(langParam)) {
  i18n.changeLanguage(langParam)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
