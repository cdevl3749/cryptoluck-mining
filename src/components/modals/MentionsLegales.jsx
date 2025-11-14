import { useEffect } from 'react'
import { useTranslation } from "react-i18next"

export default function MentionsLegales({ closeModal }) {
  const { t } = useTranslation()

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [closeModal])

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
        
        <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-6 border-b-2 border-yellow-400/30 pb-4 clear-both">
          📋 {t("legal.title")}
        </h2>
        
        <div className="space-y-6 text-gray-300">

          {/* Éditeur */}
          <section>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">
              {t("legal.editor.title")}
            </h3>
            <p className="leading-relaxed">
              <strong>CryptoLuck Mining</strong><br />
              <strong>{t("legal.address_label")} :</strong> 4850 Montzen<br />
              <strong>{t("legal.email_label")} :</strong> contact@cryptoluckmining.com<br />
            </p>
          </section>

          {/* Directeur de publication */}
          <section>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">
              {t("legal.director.title")}
            </h3>
            <p className="leading-relaxed">CryptoLuck Mining</p>
          </section>

          {/* Hébergeur */}
          <section>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">
              {t("legal.hosting.title")}
            </h3>
            <p className="leading-relaxed">
              <strong>{t("legal.hosting.host")} :</strong> Netlify, Inc.<br />
              <strong>{t("legal.hosting.address")} :</strong> 2325 3rd Street, Suite 296, San Francisco, CA 94107, USA<br />
              <strong>{t("legal.hosting.website")} :</strong> www.netlify.com
            </p>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">
              {t("legal.intellectual.title")}
            </h3>
            <p className="leading-relaxed">
              {t("legal.intellectual.text")}
            </p>
          </section>

          {/* Limitation de responsabilité */}
          <section>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">
              {t("legal.liability.title")}
            </h3>
            <p className="leading-relaxed">
              {t("legal.liability.text")}
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">
              {t("legal.cookies.title")}
            </h3>
            <p className="leading-relaxed">
              {t("legal.cookies.text")}
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
