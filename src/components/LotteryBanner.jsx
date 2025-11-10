import { useState, useEffect } from 'react'

export default function LotteryBanner() {
  const [bitcoinPrice, setBitcoinPrice] = useState(null)
  const BTC_REWARD = 3.125
  
  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur')
        const data = await response.json()
        setBitcoinPrice(data.bitcoin.eur)
      } catch (error) {
        setBitcoinPrice(64000)
      }
    }
    
    fetchBitcoinPrice()
    const interval = setInterval(fetchBitcoinPrice, 300000)
    return () => clearInterval(interval)
  }, [])
  
  const blockValue = bitcoinPrice ? Math.round(BTC_REWARD * bitcoinPrice) : 0
  const formattedBlockValue = new Intl.NumberFormat('fr-FR').format(blockValue)

  return (
    <div className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-2xl p-8 my-12 text-center shadow-2xl animate-[pulse_2s_infinite]">
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        🎯 TIRAGE TOUTES LES 10 MINUTES
      </h3>
      <p className="text-lg sm:text-xl text-gray-800 font-semibold mb-4">
        Une nouvelle chance de gagner à chaque bloc Bitcoin généré dans le monde !
      </p>
      {blockValue > 0 && (
        <>
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 my-4">
            💰 VALEUR D'UN BLOC : ~{formattedBlockValue}€ 💰
          </div>
          <p className="text-base sm:text-lg text-gray-800">
            ({BTC_REWARD} BTC de récompense + frais de transaction)
          </p>
        </>
      )}
    </div>
  )
}