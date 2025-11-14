import { useEffect } from 'react'
import { useTranslation } from "react-i18next"

export default function Contact({ closeModal }) {
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
          📧 {t("contact.title")}
        </h2>
        
        <div className="space-y-6 text-gray-300">

          {/* Service client */}
          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">
              {t("contact.customer_service.title")}
            </h3>
            <p className="leading-relaxed">
              <strong>{t("contact.email")} :</strong> contact@cryptoluckmining.com<br />
              <strong>{t("contact.schedule")} :</strong> {t("contact.customer_service.schedule")}
            </p>
          </div>

          {/* Support technique */}
          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">
              {t("contact.tech_support.title")}
            </h3>
            <p className="leading-relaxed">
              <strong>{t("contact.email")} :</strong> support@cryptoluckmining.com<br />
              {t("contact.tech_support.delay")}
            </p>
          </div>

          {/* Sales */}
          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">
              {t("contact.sales.title")}
            </h3>
            <p className="leading-relaxed">
              <strong>{t("contact.email")} :</strong> sales@cryptoluckmining.com
            </p>
          </div>

          {/* DPO */}
          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">
              {t("contact.dpo.title")}
            </h3>
            <p className="leading-relaxed">
              <strong>{t("contact.dpo.email_label")} :</strong> dpo@cryptoluckmining.com
            </p>
          </div>

          {/* Adresse */}
          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">
              {t("contact.address.title")}
            </h3>
            <p className="leading-relaxed">
              CryptoLuck Mining<br />
              4850 Montzen<br />
              {t("contact.address.country")}
            </p>
          </div>

          <div className="mt-8 p-6 bg-yellow-400/10 border-2 border-yellow-400/30 rounded-xl">
            <p className="text-center text-base sm:text-lg leading-relaxed">
              {t("contact.note")}
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
