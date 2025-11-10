import { useState, useEffect } from 'react'

export default function JackpotDisplay() {
  const [bitcoinPrice, setBitcoinPrice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [error, setError] = useState(null)
  
  const BTC_REWARD = 3.125 // Récompense actuelle par bloc
  
  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur')
        
        if (!response.ok) {
          throw new Error(`Erreur API: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data && data.bitcoin && data.bitcoin.eur) {
          const price = data.bitcoin.eur
          setBitcoinPrice(price)
          setLastUpdate(new Date())
          setLoading(false)
          setError(null)
        } else {
          throw new Error('Données invalides')
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du prix Bitcoin:', error)
        setError(error.message)
        // Prix de secours si l'API échoue
        if (!bitcoinPrice) {
          setBitcoinPrice(90000)
        }
        setLoading(false)
      }
    }
    
    // Première récupération immédiate
    fetchBitcoinPrice()
    
    // Mettre à jour le prix toutes les 10 secondes
    const interval = setInterval(fetchBitcoinPrice, 10000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Calculs des montants
  const blockValue = bitcoinPrice ? Math.round(BTC_REWARD * bitcoinPrice) : 0
  const formattedBlockValue = new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(blockValue)
  
  const formattedBitcoinPrice = bitcoinPrice ? new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(bitcoinPrice)) : '...'

  const formatTime = (date) => {
    if (!date) return ''
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    })
  }

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
            Chargement du prix Bitcoin...
          </div>
        ) : (
          <>
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 my-4 drop-shadow-lg">
              ~{formattedBlockValue} €
            </div>
            
            <div className="text-lg sm:text-xl text-gray-800 font-medium mt-4">
              {BTC_REWARD} BTC de récompense + frais de transaction
            </div>
            
            <div className="text-sm sm:text-base text-gray-700 italic mt-3">
              Soit environ <strong className="text-gray-900">{formattedBitcoinPrice} €</strong> par Bitcoin au cours actuel
            </div>
            
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600 mt-3">
              <span className={`inline-block w-2 h-2 rounded-full ${error ? 'bg-orange-600' : 'bg-green-600 animate-pulse'}`}></span>
              <span>
                {error ? 'Mise à jour en attente...' : `Mis à jour toutes les 10s ${lastUpdate ? `(${formatTime(lastUpdate)})` : ''}`}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}