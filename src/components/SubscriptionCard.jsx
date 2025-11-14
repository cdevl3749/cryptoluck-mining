import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function SubscriptionCard() {
  const { t, i18n } = useTranslation();

  const BITCOIN_ADDRESS = "3FULxTDJkQB2jrX8cNzJBAoFt43LUbd4PY";
  const MONTHLY_PRICE_EUR = 9.99;

  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  // API Blockchain.info - gratuite, fiable et sans CORS
  const fetchBitcoinPrice = async () => {
    try {
      const response = await fetch("https://blockchain.info/ticker");

      if (!response.ok) throw new Error("Erreur API");

      const data = await response.json();

      if (data?.EUR?.last) {
        const priceEur = data.EUR.last;
        
        setBitcoinPrice(priceEur);
        setLastUpdate(new Date());
        setLoading(false);
        console.log("Prix Bitcoin mis à jour:", priceEur.toFixed(2), "EUR");
      } else {
        throw new Error("Données invalides");
      }
    } catch (e) {
      console.error("Erreur prix BTC SubscriptionCard:", e);
      // Ne mettre le prix fallback que si on n'a pas encore de prix
      if (!bitcoinPrice) {
        setBitcoinPrice(90000);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBitcoinPrice();
    const interval = setInterval(fetchBitcoinPrice, 30000); // update toutes les 30s
    return () => clearInterval(interval);
  }, []);

  const btcAmount = bitcoinPrice
    ? (MONTHLY_PRICE_EUR / bitcoinPrice).toFixed(8)
    : "...";

  const getLocale = () => {
    switch (i18n.language) {
      case "en": return "en-US";
      case "ja": return "ja-JP";
      default: return "fr-FR";
    }
  };

  const formattedBtcPrice = bitcoinPrice
    ? new Intl.NumberFormat(getLocale()).format(Math.round(bitcoinPrice))
    : "...";

  const features = t("subscription.features", { returnObjects: true });

  const copyAddress = () => {
    navigator.clipboard.writeText(BITCOIN_ADDRESS);
    alert("✅ Adresse Bitcoin copiée dans le presse-papier !");
  };

  return (
    <section className="my-10 sm:my-20">
      <div className="relative max-w-2xl mx-auto bg-gradient-to-br from-[#1a1d3f]/90 to-[#0a0e27]/90 border-4 border-yellow-400 rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_20px_60px_rgba(255,215,0,0.3)] overflow-hidden">

        {/* Shine */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-yellow-400/10 to-transparent animate-[shine_3s_infinite]" />

        <div className="relative z-10">

          <h2 className="text-3xl text-yellow-400 font-bold text-center mb-6">
            💫 {t("subscription.title")}
          </h2>

          {/* Prix */}
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-cyan-400">
              9,99€
              <span className="text-xl text-gray-400 ml-2">{t("subscription.price")}</span>
            </div>
            <p className="text-yellow-400 mt-2 font-semibold">
              ⚡ {t("subscription.activation")}
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-4 mb-10">
            {features.map((feature, index) => (
              <li 
                key={index}
                className="flex items-start gap-3 pb-3 border-b border-yellow-400/20"
              >
                <span className="text-green-400 text-2xl">✔</span>
                <span className="text-gray-300 text-lg">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Paiement Bitcoin */}
          <div className="bg-[#0a0e27] border-2 border-orange-500 rounded-2xl p-6 mb-8">

            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl">₿</span>
              <h3 className="text-xl font-bold text-orange-500">
                {t("subscription.payment")}
              </h3>
            </div>

            {/* Montant BTC */}
            <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-2 border-orange-500 rounded-xl p-4">

              <p className="text-center text-sm text-gray-400 mb-2">
                {t("subscription.amount_label")}
              </p>

              {loading ? (
                <p className="text-center text-3xl font-bold text-orange-400">
                  {t("subscription.loading")}
                </p>
              ) : (
                <>
                  <p className="text-center text-4xl font-bold text-orange-400">
                    {btcAmount} BTC
                  </p>

                  <p className="text-center text-xs text-gray-400 mt-2">
                    (9.99€ • 1 BTC ≈ {formattedBtcPrice}€)
                  </p>

                  <p className="text-center text-xs text-green-400 mt-2">
                    ⏱️ {t("subscription.updated")}
                  </p>
                </>
              )}
            </div>

            {/* QR Code */}
            <div className="flex justify-center mt-6">
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=bitcoin:${BITCOIN_ADDRESS}?amount=${btcAmount}`}
                  alt="QR Code Bitcoin"
                  className="w-48 h-48"
                />
              </div>
            </div>

            <p className="text-center text-xs text-gray-400 mt-3">
              📱 {t("subscription.scan")}
            </p>

            {/* Adresse */}
            <div className="bg-[#1a1d3f] rounded-lg p-4 mt-4">
              <p className="text-xs text-gray-400 mb-2 text-center">
                {t("subscription.address_label")}
              </p>
              <p className="font-mono text-sm text-white text-center break-all">
                {BITCOIN_ADDRESS}
              </p>
            </div>

            {/* Bouton copie */}
            <button
              onClick={copyAddress}
              className="w-full mt-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 rounded-full shadow-lg hover:shadow-xl transition"
            >
              📋 {t("subscription.copy")}
            </button>

          </div>

          {/* Sécurité */}
          <div className="p-4 bg-green-400/10 border-2 border-green-400 rounded-xl text-center">
            <p className="text-green-400 font-semibold text-sm">
              ✅ {t("subscription.secure")}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              {t("subscription.confirmation")}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}