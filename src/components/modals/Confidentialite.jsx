import { useEffect } from 'react'

export default function Confidentialite({ closeModal }) {
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
          🔒 Politique de Confidentialité
        </h2>
        
        <div className="space-y-6 text-gray-300">
          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">1. Collecte des données</h3>
            <p className="leading-relaxed mb-3">Nous collectons les données personnelles suivantes :</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>CRYPTOLUCK MINING</li>
              <li>cryptoluck@gmail.com</li>
              <li>Informations de paiement (traitées par Stripe)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">2. Utilisation des données</h3>
            <p className="leading-relaxed mb-3">Vos données sont utilisées pour :</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Gérer votre abonnement et votre compte</li>
              <li>Traiter les paiements</li>
              <li>Vous informer de l'activité de minage</li>
              <li>Verser les gains éventuels</li>
              <li>Améliorer nos services</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">3. Partage des données</h3>
            <p className="leading-relaxed mb-3">Vos données ne sont jamais vendues. Elles peuvent être partagées uniquement avec :</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Stripe (traitement des paiements)</li>
              <li>Netlify (hébergement)</li>
              <li>Les autorités compétentes en cas d'obligation légale</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">4. Sécurité</h3>
            <p className="leading-relaxed">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger 
              vos données contre tout accès non autorisé, perte ou divulgation.
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">5. Vos droits (RGPD)</h3>
            <p className="leading-relaxed mb-3">Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement ("droit à l'oubli")</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d'opposition</li>
            </ul>
            <p className="leading-relaxed mt-3">
              Pour exercer ces droits, contactez-nous à : <strong>privacy@cryptoluckmining.com</strong>
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">6. Conservation des données</h3>
            <p className="leading-relaxed">
              Vos données sont conservées pendant la durée de votre abonnement et jusqu'à 3 ans après sa 
              résiliation, conformément aux obligations légales et comptables.
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">7. Cookies</h3>
            <p className="leading-relaxed">
              Nous utilisons des cookies essentiels au fonctionnement du site et des cookies analytiques 
              (avec votre consentement) pour améliorer nos services.
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">8. Contact DPO</h3>
            <p className="leading-relaxed">
              Pour toute question concernant la protection de vos données :<br />
              Email : <strong>dpo@cryptoluckmining.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}