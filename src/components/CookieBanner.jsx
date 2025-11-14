import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const cookieAccepted = localStorage.getItem('cookieAccepted')
    if (!cookieAccepted) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookieAccepted', 'true')
    setShowBanner(false)
  }

  const declineCookies = () => {
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0e27] border-t-4 border-yellow-400 p-4 sm:p-6 z-[9999] shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 flex items-center gap-3">
          <span className="text-3xl sm:text-4xl">🍪</span>
          <p className="text-white text-sm sm:text-base leading-relaxed">
            {t('cookie.message')}
          </p>
        </div>
        
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={acceptCookies}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg text-base sm:text-lg"
          >
            {t('cookie.accept')}
          </button>
          <button
            onClick={declineCookies}
            className="bg-gray-700 hover:bg-gray-600 border-2 border-gray-500 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg text-base sm:text-lg"
          >
            {t('cookie.decline')}
          </button>
        </div>
      </div>
    </div>
  )
}