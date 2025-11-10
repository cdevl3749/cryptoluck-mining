export default function SubscriptionCard() {
  const features = [
    "Participation illimitée à tous les tirages",
    "144 chances par jour (1 tirage toutes les 10 min)",
    "Tableau de bord en temps réel",
    "Notifications instantanées",
    "Support technique prioritaire",
    "Statistiques détaillées de vos participations",
    "Sans engagement - Résiliable à tout moment"
  ]

  const handleSubscribe = async () => {
    // Configuration Stripe
    const STRIPE_PUBLISHABLE_KEY = 'pk_test_VOTRE_CLE_PUBLIQUE_STRIPE'
    
    alert('🚀 Redirection vers Stripe Checkout...\n\nPour activer le paiement réel:\n1. Créez un compte Stripe (stripe.com)\n2. Configurez votre clé API\n3. Créez un produit d\'abonnement\n4. Implémentez le backend pour gérer les sessions Checkout')
    
    // Code pour Stripe (à activer quand vous aurez configuré Stripe)
    /*
    try {
      if (typeof Stripe === 'undefined') {
        alert('Chargement du système de paiement en cours...')
        return
      }

      const stripe = Stripe(STRIPE_PUBLISHABLE_KEY)
      
      const response = await fetch('YOUR_BACKEND_URL/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: 'price_VOTRE_PRICE_ID',
          successUrl: window.location.origin + '/success',
          cancelUrl: window.location.origin + '/cancel',
        }),
      })

      const session = await response.json()
      await stripe.redirectToCheckout({ sessionId: session.id })
    } catch (error) {
      console.error('Erreur:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    }
    */
  }

  return (
    <section className="my-20">
      <div className="relative max-w-2xl mx-auto bg-gradient-to-br from-[#1a1d3f]/90 to-[#0a0e27]/90 border-4 border-yellow-400 rounded-3xl p-8 sm:p-12 shadow-[0_20px_60px_rgba(255,215,0,0.3)] overflow-hidden">
        
        {/* Effet shine */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-yellow-400/10 to-transparent animate-[shine_3s_infinite]" />
        
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-6 text-center">
            💫 Abonnement Premium
          </h2>
          
          <div className="text-center">
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-cyan-400 my-6">
              9,99€ <span className="text-2xl sm:text-3xl text-gray-400">/mois TTC</span>
            </div>
          </div>
          
          <ul className="space-y-4 my-8">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 pb-4 border-b border-yellow-400/20 text-base sm:text-lg"
              >
                <span className="text-green-400 text-2xl flex-shrink-0">✓</span>
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
          
          <button
            onClick={handleSubscribe}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-xl py-5 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_10px_30px_rgba(255,215,0,0.4)] hover:shadow-[0_15px_40px_rgba(255,215,0,0.6)] mt-8"
          >
            S'ABONNER MAINTENANT
          </button>
        </div>
      </div>
    </section>
  )
}