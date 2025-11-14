export default function Footer({ openModal }) {
  const paymentMethods = [
    { name: 'stripe', color: 'bg-[#635BFF] text-white' },
    { name: 'VISA', color: 'bg-white text-gray-900' },
    { name: 'Mastercard', color: 'bg-white text-gray-900' },
    { name: 'Bancontact', color: 'bg-white text-gray-900' },
    { name: 'PayPal', color: 'bg-white text-gray-900' }
  ]

  const trustBadges = [
    { icon: '🛡️', text: 'SSL Sécurisé' },
    { icon: '✓', text: 'Certifié PCI DSS' },
    { icon: '🔐', text: 'Cryptage 256-bit' }
  ]

  return (
    <footer className="bg-[#0a0e27]/90 border-t-2 border-yellow-400/30 mt-20 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Payment Security */}
        <div className="bg-[#1a1d3f]/60 border-2 border-cyan-400/30 rounded-2xl p-6 sm:p-8 mb-8">
          <h3 className="text-green-400 text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
            <span>🔒</span>
            <span>Paiement 100% Sécurisé</span>
          </h3>
          
          <div className="flex justify-center flex-wrap gap-4 sm:gap-6 mb-6">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className={`${method.color} px-6 py-3 rounded-lg font-bold text-lg shadow-lg hover:translate-y-[-5px] transition-transform duration-300`}
              >
                {method.name}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center flex-wrap gap-4 mt-6">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-green-400/20 px-5 py-2 rounded-full border-2 border-green-400 text-green-400 font-semibold"
              >
                <span>{badge.icon}</span>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
          <button
            onClick={() => openModal('mentionsLegales')}
            className="text-cyan-400 hover:text-yellow-400 px-4 py-2 border-b-2 border-transparent hover:border-yellow-400 transition-colors"
          >
            Mentions légales
          </button>
          <button
            onClick={() => openModal('conditions')}
            className="text-cyan-400 hover:text-yellow-400 px-4 py-2 border-b-2 border-transparent hover:border-yellow-400 transition-colors"
          >
            Conditions générales
          </button>
          <button
            onClick={() => openModal('confidentialite')}
            className="text-cyan-400 hover:text-yellow-400 px-4 py-2 border-b-2 border-transparent hover:border-yellow-400 transition-colors"
          >
            Politique de confidentialité
          </button>
          <button
            onClick={() => openModal('contact')}
            className="text-cyan-400 hover:text-yellow-400 px-4 py-2 border-b-2 border-transparent hover:border-yellow-400 transition-colors"
          >
            Contact
          </button>
        </div>

        <p className="text-center text-gray-400 mt-6">
          © 2025 CryptoLuck Mining. Tous droits réservés.
        </p>
        <p className="text-center text-gray-500 text-sm mt-2">
          ⚠️ Le minage de Bitcoin comporte des risques. Les performances passées ne garantissent pas les résultats futurs.
        </p>
      </div>
    </footer>
  )
}