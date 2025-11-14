import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LotteryBanner() {
  const { t, i18n } = useTranslation();
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const BTC_REWARD = 3.125;

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        // Utilisation de Blockchain.info API - gratuite, fiable et sans CORS
        const response = await fetch("https://blockchain.info/ticker");

        if (!response.ok) {
          throw new Error(`Erreur API: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.EUR && data.EUR.last) {
          const priceEur = data.EUR.last;
          
          setBitcoinPrice(priceEur);
          setLoading(false);
          console.log("Prix Bitcoin mis à jour (Banner):", priceEur.toFixed(2), "EUR");
        } else {
          throw new Error("Données invalides");
        }
      } catch (error) {
        console.error("Erreur prix Bitcoin (Banner):", error);
        if (!bitcoinPrice) {
          setBitcoinPrice(90000); // prix de secours
        }
        setLoading(false);
      }
    };

    fetchBitcoinPrice();
    const interval = setInterval(fetchBitcoinPrice, 10000);
    return () => clearInterval(interval);
  }, []);

  const blockValue = bitcoinPrice ? Math.round(BTC_REWARD * bitcoinPrice) : 0;

  const getLocale = () => {
    switch (i18n.language) {
      case "en": return "en-US";
      case "ja": return "ja-JP";
      default: return "fr-FR";
    }
  };

  const formattedBlockValue = new Intl.NumberFormat(getLocale(), {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(blockValue);

  return (
    <div className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-2xl p-8 my-12 text-center shadow-2xl animate-[pulse_2s_infinite]">
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        🎯 {t("lottery.title")}
      </h3>
      <p className="text-lg sm:text-xl text-gray-800 font-semibold mb-4">
        {t("lottery.subtitle")}
      </p>

      {loading ? (
        <div className="text-2xl text-gray-900 my-4">
          {t("lottery.loading")}
        </div>
      ) : blockValue > 0 ? (
        <>
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 my-4">
            💰 {t("lottery.block_value")} ~{formattedBlockValue} € 💰
          </div>
          <p className="text-base sm:text-lg text-gray-800">
            ({BTC_REWARD} BTC {t("lottery.reward_note")})
          </p>
        </>
      ) : null}
    </div>
  );
}