import { useEffect } from 'react'

export default function Conditions({ closeModal }) {
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
          📜 Conditions Générales d'Utilisation
        </h2>
        
        <div className="space-y-6 text-gray-300">
          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">1. Objet</h3>
            <p className="leading-relaxed">
              Les présentes conditions générales régissent l'utilisation du service CryptoLuck Mining, 
              plateforme de participation au minage collaboratif de Bitcoin.
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">2. Inscription et Abonnement</h3>
            <p className="leading-relaxed">
              L'abonnement au service est proposé au tarif de 9,99€ TTC par mois. Le paiement s'effectue 
              via la plateforme Stripe. L'abonnement est renouvelé automatiquement chaque mois jusqu'à résiliation.
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">3. Droit de rétractation</h3>
            <p className="leading-relaxed">
              Conformément à la législation européenne, vous disposez d'un délai de 14 jours pour vous rétracter 
              après la souscription de votre abonnement. Pour exercer ce droit, contactez-nous à 
              contact@cryptoluckmining.com.
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">4. Résiliation</h3>
            <p className="leading-relaxed">
              Vous pouvez résilier votre abonnement à tout moment depuis votre espace personnel ou en nous 
              contactant. La résiliation prendra effet à la fin de la période d'abonnement en cours.
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">5. Fonctionnement du service</h3>
            <p className="leading-relaxed">
              CryptoLuck Mining met à disposition une infrastructure de minage de Bitcoin. La participation 
              donne droit à une part proportionnelle des éventuels gains en cas de découverte d'un bloc. 
              <strong className="text-yellow-400"> Aucun gain n'est garanti.</strong> Le minage de Bitcoin est soumis aux aléas de la blockchain 
              et à la difficulté du réseau.
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">6. Répartition des gains</h3>
            <p className="leading-relaxed">
              En cas de découverte d'un bloc Bitcoin, les gains seront répartis entre tous les abonnés actifs 
              au prorata de leur durée d'abonnement. Les frais de plateforme (20%) seront déduits avant répartition.
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">7. Risques</h3>
            <p className="leading-relaxed">
              L'utilisateur reconnaît que le minage de Bitcoin comporte des risques financiers. La probabilité 
              de miner un bloc est extrêmement faible et les gains ne sont jamais garantis. CryptoLuck Mining 
              ne peut être tenu responsable de l'absence de gains.
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-cyan-400 font-semibold mb-3">8. Modification des CGU</h3>
            <p className="leading-relaxed">
              CryptoLuck Mining se réserve le droit de modifier ces conditions à tout moment. Les utilisateurs 
              seront informés par email de toute modification substantielle.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}