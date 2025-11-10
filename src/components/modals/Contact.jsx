import { useEffect } from 'react'

export default function Contact({ closeModal }) {
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
          📧 Contact
        </h2>
        
        <div className="space-y-6 text-gray-300">
          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">Service Client</h3>
            <p className="leading-relaxed">
              <strong>Email :</strong> contact@cryptoluckmining.com<br />
              <strong>Horaires :</strong> Lundi - Vendredi, 9h - 18h
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">Support Technique</h3>
            <p className="leading-relaxed">
              <strong>Email :</strong> support@cryptoluckmining.com<br />
              Réponse sous 24h ouvrées
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">Questions Commerciales</h3>
            <p className="leading-relaxed">
              <strong>Email :</strong> sales@cryptoluckmining.com
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">Protection des Données</h3>
            <p className="leading-relaxed">
              <strong>Email DPO :</strong> dpo@cryptoluckmining.com
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">Adresse Postale</h3>
            <p className="leading-relaxed">
              CryptoLuck Mining<br />
              4850 Montzen<br />
              Belgique
            </p>
          </div>

          <div className="mt-8 p-6 bg-yellow-400/10 border-2 border-yellow-400/30 rounded-xl">
            <p className="text-center text-base sm:text-lg leading-relaxed">
              💬 Notre équipe est à votre écoute pour répondre à toutes vos questions concernant 
              le Bitcoin Lottery Mining, votre abonnement ou tout autre sujet.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}