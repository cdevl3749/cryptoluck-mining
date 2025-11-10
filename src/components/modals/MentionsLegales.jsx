import { useEffect } from 'react'

export default function MentionsLegales({ closeModal }) {
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
          📋 Mentions Légales
        </h2>
        
        <div className="space-y-6 text-gray-300">
          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">Éditeur du site</h3>
            <p className="leading-relaxed">
              <strong>CryptoLuck Mining</strong><br />
              <strong>Siège social :</strong> 4850 Montzen<br />
              {/* <strong>Numéro d'entreprise :</strong> BE [Votre numéro BCE]<br /> */}
              <strong>Email :</strong> contact@cryptoluckmining.com<br />
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">Directeur de la publication</h3>
            <p className="leading-relaxed">CRYPTOLUCK MINING</p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">Hébergement</h3>
            <p className="leading-relaxed">
              <strong>Hébergeur :</strong> Netlify, Inc.<br />
              <strong>Adresse :</strong> 2325 3rd Street, Suite 296, San Francisco, CA 94107, USA<br />
              <strong>Site web :</strong> www.netlify.com
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">Propriété intellectuelle</h3>
            <p className="leading-relaxed">
              L'ensemble du contenu de ce site (textes, images, logos, graphismes, etc.) est protégé par les droits 
              d'auteur et appartient à CryptoLuck Mining ou à ses partenaires. Toute reproduction, même partielle, 
              est strictement interdite sans autorisation préalable écrite.
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">Limitation de responsabilité</h3>
            <p className="leading-relaxed">
              CryptoLuck Mining ne peut être tenu responsable des dommages directs ou indirects résultant de 
              l'utilisation de ce site. Le minage de cryptomonnaies comporte des risques financiers. Les gains 
              ne sont jamais garantis.
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">Cookies</h3>
            <p className="leading-relaxed">
              Ce site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez gérer vos 
              préférences de cookies via la bannière qui apparaît lors de votre première visite.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}