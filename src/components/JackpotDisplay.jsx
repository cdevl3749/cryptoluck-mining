import { useState, useEffect } from 'react'

export default function JackpotDisplay() {
  const [bitcoinPrice, setBitcoinPrice] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const BTC_REWARD = 3.125 // Récompense actuelle par bloc
  
  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur')
        const data = await response.json()
        setBitcoinPrice(data.bitcoin.eur)
        setLoading(false)
      } catch (error) {
        console.error('Erreur lors de la récupération du prix Bitcoin:', error)
        setBitcoinPrice(64000) // Prix par défaut en cas d'erreur
        setLoading(false)
      }
    }
    
    fetchBitcoinPrice()
    // Mettre à jour le prix toutes les 5 minutes
    const interval = setInterval(fetchBitcoinPrice, 300000)
    
    return () => clearInterval(interval)
  }, [])
  
  const blockValue = bitcoinPrice ? Math.round(BTC_REWARD * bitcoinPrice) : 0
  const formattedBlockValue = new Intl.NumberFormat('fr-FR').format(blockValue)
  const formattedBitcoinPrice = bitcoinPrice ? new Intl.NumberFormat('fr-FR').format(Math.round(bitcoinPrice)) : '...'

  return (
    <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 sm:p-10 my-10 text-center shadow-2xl overflow-hidden">
      <div className="absolute text-9xl opacity-10 top-[-50px] right-[-50px] animate-[float_6s_ease-in-out_infinite]">
        💎
      </div>
      
      <div className="relative z-10">
        <div className="text-xl sm:text-2xl text-gray-900 font-semibold mb-2">
          🏆 VALEUR DU PROCHAIN BLOC 🏆
        </div>
        
        {loading ? (
          <div className="text-4xl sm:text-5xl font-bold text-gray-900 my-4">
            Chargement...
          </div>
        ) : (
          <>
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 my-4 drop-shadow-lg">
              ~{formattedBlockValue}€
            </div>
            
            <div className="text-lg sm:text-xl text-gray-800 font-medium mt-4">
              {BTC_REWARD} BTC de récompense + frais de transaction
            </div>
            
            <div className="text-sm sm:text-base text-gray-700 italic mt-3">
              Soit environ {formattedBitcoinPrice}€ par Bitcoin au cours actuel
            </div>
            
            <div className="text-xs text-gray-600 mt-2">
              ⏱️ Prix mis à jour en temps réel
            </div>
          </>
        )}
      </div>
    </div>
  )
}