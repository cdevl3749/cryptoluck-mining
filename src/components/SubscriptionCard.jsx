import { useState, useEffect } from 'react'

export default function SubscriptionCard() {
  // ⚠️ REMPLACEZ PAR VOTRE VRAIE ADRESSE BITCOIN LEDGER
  const BITCOIN_ADDRESS = '3FULxTDJkQB2jrX8cNzJBAoFt43LUbd4PY'
  const MONTHLY_PRICE_EUR = 9.99

  const [bitcoinPrice, setBitcoinPrice] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur')
        const data = await response.json()
        if (data && data.bitcoin && data.bitcoin.eur) {
          setBitcoinPrice(data.bitcoin.eur)
          setLoading(false)
        }
      } catch (error) {
        console.error('Erreur prix Bitcoin:', error)
        setBitcoinPrice(90000)
        setLoading(false)
      }
    }
    
    fetchBitcoinPrice()
    const interval = setInterval(fetchBitcoinPrice, 30000)
    return () => clearInterval(interval)
  }, [])

  const btcAmount = bitcoinPrice ? (MONTHLY_PRICE_EUR / bitcoinPrice).toFixed(8) : '...'
  const formattedBtcPrice = bitcoinPrice ? new Intl.NumberFormat('fr-FR').format(Math.round(bitcoinPrice)) : '...'

  const features = [
    "144 tirages quotidiens (toutes les 10 min)",
    "Notifications en temps réel",
    "Support technique prioritaire",
    "Sans engagement • Résiliable à tout moment"
  ]

  const copyAddress = () => {
    navigator.clipboard.writeText(BITCOIN_ADDRESS)
    alert('✅ Adresse Bitcoin copiée dans le presse-papier !')
  }

  return (
    <section className="my-10 sm:my-20">
      <div className="relative max-w-2xl mx-auto bg-gradient-to-br from-[#1a1d3f]/90 to-[#0a0e27]/90 border-4 border-yellow-400 rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_20px_60px_rgba(255,215,0,0.3)] overflow-hidden">
        
        {/* Effet shine */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-yellow-400/10 to-transparent animate-[shine_3s_infinite]" />
        
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center">
            💫 Abonnement Premium
          </h2>
          
          <div className="text-center mb-6 sm:mb-8">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cyan-400 my-3 sm:my-4">
              9,99€ <span className="text-xl sm:text-2xl md:text-3xl text-gray-400">/mois</span>
            </div>
            <p className="text-yellow-400 font-semibold text-base sm:text-lg">
              ⚡ Activation immédiate après confirmation
            </p>
          </div>
          
          {/* Features simplifiées */}
          <ul className="space-y-3 sm:space-y-4 my-6 sm:my-8">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-yellow-400/20 text-sm sm:text-base md:text-lg"
              >
                <span className="text-green-400 text-xl sm:text-2xl flex-shrink-0">✓</span>
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Section paiement Bitcoin intégrée */}
          <div className="bg-[#0a0e27] rounded-2xl p-4 sm:p-6 mb-6 border-2 border-orange-500">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
              <span className="text-3xl sm:text-4xl">₿</span>
              <h3 className="text-lg sm:text-xl font-bold text-orange-500">Paiement Bitcoin</h3>
            </div>

            {/* Montant en Bitcoin */}
            <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-2 border-orange-500 rounded-xl p-3 sm:p-4 mb-4">
              <p className="text-center text-gray-400 text-xs sm:text-sm mb-2">Montant à envoyer :</p>
              {loading ? (
                <p className="text-center text-xl sm:text-2xl font-bold text-orange-400">Chargement...</p>
              ) : (
                <>
                  <p className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-orange-400 mb-2 break-all">
                    {btcAmount} BTC
                  </p>
                  <p className="text-center text-xs sm:text-sm text-gray-400">
                    (9.99€ • 1 BTC ≈ {formattedBtcPrice}€)
                  </p>
                  <p className="text-center text-xs text-green-400 mt-2">
                    ⏱️ Prix mis à jour en temps réel
                  </p>
                </>
              )}
            </div>

            {/* QR Code - CENTRÉ ET RESPONSIVE */}
            <div className="flex justify-center items-center mb-4">
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=bitcoin:${BITCOIN_ADDRESS}?amount=${btcAmount}&label=CryptoLuck%20Mining`}
                  alt="QR Code Bitcoin"
                  className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 mx-auto"
                />
              </div>
            </div>
            
            <p className="text-center text-xs sm:text-sm text-gray-400 mb-4">
              📱 Scannez avec votre wallet Bitcoin
            </p>

            {/* Adresse Bitcoin */}
            <div className="bg-[#1a1d3f] rounded-lg p-3 sm:p-4 mb-4">
              <p className="text-xs text-gray-400 mb-2 text-center">Adresse de paiement :</p>
              <p className="text-xs sm:text-sm text-white font-mono break-all text-center leading-relaxed">
                {BITCOIN_ADDRESS}
              </p>
            </div>
            
            <button
              onClick={copyAddress}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 px-4 sm:px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              📋 Copier l'adresse Bitcoin
            </button>
          </div>
          
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-400/10 border-2 border-green-400 rounded-xl">
            <p className="text-center text-green-400 font-semibold text-xs sm:text-sm">
              ✅ Paiement sécurisé par la blockchain Bitcoin
            </p>
            <p className="text-center text-gray-400 text-xs mt-2">
              Activation automatique après 3 confirmations (environ 30 minutes)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}