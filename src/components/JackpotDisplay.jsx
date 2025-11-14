import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function JackpotDisplay() {
  const [bitcoinPrice, setBitcoinPrice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [error, setError] = useState(null)
  const { t, i18n } = useTranslation()
  
  const BTC_REWARD = 3.125

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        // Utilisation de Blockchain.info API - gratuite, fiable et sans CORS
        const response = await fetch("https://blockchain.info/ticker")

        if (!response.ok) throw new Error(`Erreur API: ${response.status}`)

        const data = await response.json()

        if (data && data.EUR && data.EUR.last) {
          const priceEur = data.EUR.last
          
          setBitcoinPrice(priceEur)
          setLastUpdate(new Date())
          setLoading(false)
          setError(null)
          console.log("Prix Bitcoin mis à jour:", priceEur.toFixed(2), "EUR")
        } else {
          throw new Error("Données invalides")
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du prix Bitcoin:", error)
        setError(error.message)

        // Ne mettre le prix fallback que si on n'a pas encore de prix
        if (!bitcoinPrice) {
          setBitcoinPrice(90000)
        }
        setLoading(false)
      }
    }

    fetchBitcoinPrice()

    const interval = setInterval(fetchBitcoinPrice, 10000) // toutes les 10 sec

    return () => clearInterval(interval)
  }, [])


  const blockValue = bitcoinPrice ? Math.round(BTC_REWARD * bitcoinPrice) : 0

  const getLocale = () => {
    switch (i18n.language) {
      case "en": return "en-US"
      case "ja": return "ja-JP"
      default: return "fr-FR"
    }
  }

  const formattedBlockValue = new Intl.NumberFormat(getLocale(), {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(blockValue)

  const formattedBitcoinPrice = bitcoinPrice
    ? new Intl.NumberFormat(getLocale(), {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(Math.round(bitcoinPrice))
    : "..."

  const formatTime = (date) => {
    if (!date) return ""
    return date.toLocaleTimeString(getLocale(), {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
  }

  return (
    <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 sm:p-10 my-10 text-center shadow-2xl overflow-hidden">
      
      <div className="absolute text-9xl opacity-10 top-[-50px] right-[-50px] animate-[float_6s_ease-in-out_infinite]">
        💎
      </div>

      <div className="relative z-10">
        <div className="text-xl sm:text-2xl text-gray-900 font-semibold mb-2">
          {t('jackpot.title')}
        </div>

        {loading ? (
          <div className="text-4xl sm:text-5xl font-bold text-gray-900 my-4">
            {t('jackpot.loading')}
          </div>
        ) : (
          <>
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 my-4 drop-shadow-lg">
              ~{formattedBlockValue} €
            </div>

            <div className="text-lg sm:text-xl text-gray-800 font-medium mt-4">
              {BTC_REWARD} BTC {t('jackpot.reward')}
            </div>

            <div className="text-sm sm:text-base text-gray-700 italic mt-3">
              {t('jackpot.approximately')} <strong className="text-gray-900">{formattedBitcoinPrice} €</strong> {t('jackpot.perBitcoin')}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-600 mt-3">
              <span className={`inline-block w-2 h-2 rounded-full ${error ? 'bg-orange-600' : 'bg-green-600 animate-pulse'}`}></span>
              <span>
                {error ? t('jackpot.updatePending') : `${t('jackpot.updateEvery')} (${formatTime(lastUpdate)})`}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}