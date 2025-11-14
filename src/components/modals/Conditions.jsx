import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function Conditions({ closeModal }) {
  const { t } = useTranslation()

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [closeModal])

  // Récupération des sections depuis les JSON
  const sections = t("conditions.sections", { returnObjects: true })

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-[2000] overflow-auto animate-[fadeIn_0.3s] flex items-start justify-center p-4"
      onClick={closeModal}
    >
      <div 
        className="bg-gradient-to-br from-[#1a1d3f] to-[#0a0e27] border-4 border-yellow-400 rounded-3xl p-6 sm:p-10 w-full max-w-4xl my-8 shadow-[0_20px_60px_rgba(255,215,0,0.4)] max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="float-right text-yellow-400 text-4xl font-bold hover:text-orange-500 transition-colors leading-none"
        >
          &times;
        </button>
        
        {/* Titre */}
        <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-6 border-b-2 border-yellow-400/30 pb-4 clear-both">
          📜 {t("conditions.title")}
        </h2>

        {/* Sections dynamiques */}
        <div className="space-y-6 text-gray-300">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-2xl text-cyan-400 font-semibold mb-3">
                {section.title}
              </h3>
              <p className="leading-relaxed">
                {section.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
