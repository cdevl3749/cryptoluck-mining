import { useState, useRef, useEffect } from 'react'
import './i18n'
import { useTranslation } from 'react-i18next'
import { SEOHead, HreflangLinks } from './components/SEO'
import Header from './components/Header'
import JackpotDisplay from './components/JackpotDisplay'
import ExplanationBox from './components/ExplanationBox'
import LotteryBanner from './components/LotteryBanner'
import Timeline from './components/Timeline'
import MiningIcons from './components/MiningIcons'
import SubscriptionCard from './components/SubscriptionCard'
import BlockStatus from './components/BlockStatus'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import MentionsLegales from './components/modals/MentionsLegales'
import Conditions from './components/modals/Conditions'
import Confidentialite from './components/modals/Confidentialite'
import Contact from './components/modals/Contact'
import MinerDashboard from './components/MinerDashboard'

// Composant LanguageSelector intégré avec drapeaux SVG
function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { i18n } = useTranslation()
  const dropdownRef = useRef(null)

  // Drapeaux en tant que JSX directement
  const flags = {
    fr: (
      <svg width="24" height="24" viewBox="0 0 24 24" className="inline-block">
        <rect width="8" height="24" fill="#0055A4"/>
        <rect x="8" width="8" height="24" fill="#FFFFFF"/>
        <rect x="16" width="8" height="24" fill="#EF4135"/>
      </svg>
    ),
    en: (
      <svg width="24" height="24" viewBox="0 0 24 24" className="inline-block">
        <rect width="24" height="24" fill="#012169"/>
        <path d="M0 0 L24 24 M24 0 L0 24" stroke="#FFF" strokeWidth="4"/>
        <path d="M0 0 L24 24 M24 0 L0 24" stroke="#C8102E" strokeWidth="2"/>
        <path d="M12 0 V24 M0 12 H24" stroke="#FFF" strokeWidth="8"/>
        <path d="M12 0 V24 M0 12 H24" stroke="#C8102E" strokeWidth="4"/>
      </svg>
    ),
    ja: (
      <svg width="24" height="24" viewBox="0 0 24 24" className="inline-block">
        <rect width="24" height="24" fill="#FFFFFF" stroke="#D3D3D3" strokeWidth="1"/>
        <circle cx="12" cy="12" r="6" fill="#BC002D"/>
      </svg>
    )
  }

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' }
  ]

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode)
    setIsOpen(false)
  }

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 border border-gray-700 hover:border-blue-500 shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
          <path d="M2 12h20"/>
        </svg>
        {flags[currentLanguage.code]}
        <span className="hidden sm:inline font-medium">{currentLanguage.label}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50 animate-fadeIn">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors text-left ${
                i18n.language === lang.code ? 'bg-blue-600 hover:bg-blue-700' : ''
              }`}
            >
              {flags[lang.code]}
              <span className="font-medium text-white">{lang.label}</span>
              {i18n.language === lang.code && (
                <span className="ml-auto text-blue-300 font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function App() {
  const [activeModal, setActiveModal] = useState(null)
  const { t } = useTranslation()
  const subscriptionRef = useRef(null)

  const openModal = (modalName) => {
    setActiveModal(modalName)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setActiveModal(null)
    document.body.style.overflow = 'auto'
  }

  const scrollToSubscription = () => {
    subscriptionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    })
  }

  return (
    <div className="min-h-screen relative">
      {/* SEO Components pour multilingue */}
      <SEOHead />
      <HreflangLinks />
      
      <CookieBanner />
      <Header />
      
      {/* Sélecteur de langue - Positionné en haut à droite */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSelector />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
        <h1 className="text-3xl font-bold mb-4">{t('home.welcome')}</h1>
        <button 
          onClick={scrollToSubscription}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          {t('home.subscribe')}
        </button>

        {/* Contenu existant */}
        <JackpotDisplay />
        <MinerDashboard />
        <ExplanationBox />
        <LotteryBanner />
        <MiningIcons />
        <Timeline />
        <div ref={subscriptionRef}>
          <SubscriptionCard />
        </div>
        <BlockStatus />
      </main>

      <Footer openModal={openModal} />

      {/* Modals */}
      {activeModal === 'mentionsLegales' && <MentionsLegales closeModal={closeModal} />}
      {activeModal === 'conditions' && <Conditions closeModal={closeModal} />}
      {activeModal === 'confidentialite' && <Confidentialite closeModal={closeModal} />}
      {activeModal === 'contact' && <Contact closeModal={closeModal} />}
    </div>
  )
}

export default App