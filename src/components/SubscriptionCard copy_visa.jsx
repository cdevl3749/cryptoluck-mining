import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function SubscriptionCard() {
  const { t, i18n } = useTranslation();

  const BITCOIN_ADDRESS = "3FULxTDJkQB2jrX8cNzJBAoFt43LUbd4PY";
  const MONTHLY_PRICE_EUR = 9.99;
  
  // NOUVEAU : Configuration CoinGate
  const COINGATE_APP_ID = "VOTRE_APP_ID_COINGATE"; // À remplacer par votre App ID

  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSubscribers, setActiveSubscribers] = useState(87);
  const [recentActivity, setRecentActivity] = useState([]);
  const [copied, setCopied] = useState(false);
  
  // NOUVEAU : État pour le mode de paiement
  const [paymentMethod, setPaymentMethod] = useState("bitcoin");
  const [email, setEmail] = useState("");
  const [processingPayment, setProcessingPayment] = useState(false);

  // Calculer le nombre de mineurs actifs
  useEffect(() => {
    const LAUNCH_DATE = new Date('2025-11-15T00:00:00');
    const INITIAL_MINERS = 87;
    const DAILY_INCREASE = 2;

    const calculateMiners = () => {
      const now = new Date();
      const daysSinceLaunch = Math.floor((now - LAUNCH_DATE) / (1000 * 60 * 60 * 24));
      const currentMiners = INITIAL_MINERS + (daysSinceLaunch * DAILY_INCREASE);
      setActiveSubscribers(currentMiners);
    };

    calculateMiners();
    const interval = setInterval(calculateMiners, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  // Simuler des activités récentes
  useEffect(() => {
    const activities = [
      { name: "Chris M.", action: t("subscription.just_subscribed"), flag: "🇫🇷" },
      { name: "Sarah K.", action: t("subscription.just_subscribed"), flag: "🇬🇧" },
      { name: "田中様", action: t("subscription.just_subscribed"), flag: "🇯🇵" },
    ];
    setRecentActivity(activities);
  }, [i18n.language, t]);

  const fetchBitcoinPrice = async () => {
    try {
      const response = await fetch("https://blockchain.info/ticker");
      if (!response.ok) throw new Error("Erreur API");
      const data = await response.json();

      if (data?.EUR?.last) {
        setBitcoinPrice(data.EUR.last);
        setLoading(false);
      }
    } catch (e) {
      console.error("Erreur prix BTC:", e);
      if (!bitcoinPrice) setBitcoinPrice(90000);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBitcoinPrice();
    const interval = setInterval(fetchBitcoinPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  // NOUVEAU : Fonction pour paiement par carte avec CoinGate
  const handleCardPayment = async () => {
    if (!email || !email.includes('@')) {
      alert(t("subscription.error_email") || "Veuillez entrer une adresse email valide");
      return;
    }

    setProcessingPayment(true);

    // Créer un ordre CoinGate
    const orderData = {
      price_amount: MONTHLY_PRICE_EUR,
      price_currency: "EUR",
      receive_currency: "BTC", // Ou "EUR" si vous préférez recevoir en euros
      title: "Abonnement Premium BitLucky",
      description: "Abonnement mensuel - Accès illimité",
      callback_url: `${window.location.origin}/api/coingate-callback`,
      success_url: `${window.location.origin}/payment-success`,
      cancel_url: `${window.location.origin}/payment-cancel`,
      purchaser_email: email,
      token: COINGATE_APP_ID
    };

    try {
      // Créer l'ordre via l'API CoinGate
      const response = await fetch("https://api.coingate.com/v2/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${COINGATE_APP_ID}` // Remplacez par votre token API
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (data.payment_url) {
        // Rediriger vers la page de paiement CoinGate
        window.location.href = data.payment_url;
      } else {
        alert("Erreur lors de la création du paiement");
        setProcessingPayment(false);
      }
    } catch (error) {
      console.error("Erreur CoinGate:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
      setProcessingPayment(false);
    }
  };

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
    navigator.clipboard.writeText(BITCOIN_ADDRESS)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(() => {
        alert(t("subscription.error_copy"));
      });
  };

  return (
    <section className="my-10 sm:my-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Bandeau de preuve sociale */}
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400 rounded-xl p-4 mb-6 animate-pulse">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-ping" />
              <span className="text-green-400 font-bold text-lg">
                🔥 {activeSubscribers} {t("subscription.active_miners")}
              </span>
            </div>
            <div className="text-gray-300 text-sm">
              💎 {t("subscription.next_block")}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Colonne gauche - Détails */}
          <div className="relative bg-gradient-to-br from-[#1a1d3f]/90 to-[#0a0e27]/90 border-4 border-yellow-400 rounded-3xl p-8 shadow-[0_20px_60px_rgba(255,215,0,0.3)] overflow-hidden">
            
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-yellow-400/10 to-transparent animate-[shine_3s_infinite] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl text-yellow-400 font-bold text-center mb-6">
                💫 {t("subscription.title")}
              </h2>

              {/* Prix */}
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-cyan-400">
                  9,99€
                  <span className="text-xl text-gray-400 ml-2">{t("subscription.price")}</span>
                </div>
                <p className="text-yellow-400 mt-2 font-semibold">
                  ⚡ {t("subscription.activation")}
                </p>
              </div>

              {/* Stats en temps réel */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-cyan-400/10 border border-cyan-400 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-cyan-400">{activeSubscribers}</div>
                  <div className="text-xs text-gray-400 mt-1">{t("subscription.active_miners_short")}</div>
                </div>
                <div className="bg-orange-400/10 border border-orange-400 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-orange-400">144</div>
                  <div className="text-xs text-gray-400 mt-1">{t("subscription.draws_per_day")}</div>
                </div>
              </div>

              {/* Activité récente */}
              <div className="bg-[#0a0e27] border border-gray-700 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-gray-300">{t("subscription.recent_activity")}</span>
                </div>
                <div className="space-y-2">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-center text-xs">
                      <span className="text-gray-400">
                        {activity.flag} <span className="font-semibold text-white">{activity.name}</span> {activity.action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {features.map((feature, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 pb-3 border-b border-yellow-400/20"
                  >
                    <span className="text-green-400 text-xl">✓</span>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Garantie */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-400 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🛡️</div>
                <p className="text-blue-400 font-semibold text-sm">
                  {t("subscription.guarantee")}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {t("subscription.guarantee_desc")}
                </p>
              </div>
            </div>
          </div>

          {/* Colonne droite - Paiement */}
          <div className="bg-gradient-to-br from-[#1a1d3f]/90 to-[#0a0e27]/90 border-4 border-orange-500 rounded-3xl p-8 shadow-[0_20px_60px_rgba(255,140,0,0.3)]">
            
            {/* Sélecteur de mode de paiement */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white text-center mb-4">
                💳 {t("subscription.choose_payment") || "Choisir le mode de paiement"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod("bitcoin")}
                  className={`py-4 rounded-xl font-bold transition-all duration-300 ${
                    paymentMethod === "bitcoin"
                      ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg scale-105"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  ₿ Bitcoin
                </button>
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`py-4 rounded-xl font-bold transition-all duration-300 ${
                    paymentMethod === "card"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  💳 Carte
                </button>
              </div>
            </div>

            {paymentMethod === "bitcoin" ? (
              <>
                {/* Mode Bitcoin */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-5xl">₿</span>
                  <h3 className="text-2xl font-bold text-orange-500">
                    {t("subscription.payment")}
                  </h3>
                </div>

                {/* Montant BTC */}
                <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-3 border-orange-500 rounded-xl p-6 mb-6">
                  <p className="text-center text-sm text-gray-400 mb-3">
                    {t("subscription.amount_label")}
                  </p>

                  {loading ? (
                    <p className="text-center text-3xl font-bold text-orange-400">
                      {t("subscription.loading")}
                    </p>
                  ) : (
                    <>
                      <p className="text-center text-5xl font-bold text-orange-400 mb-2">
                        {btcAmount} BTC
                      </p>
                      <p className="text-center text-sm text-gray-400">
                        (9.99€ • 1 BTC ≈ {formattedBtcPrice}€)
                      </p>
                      <p className="text-center text-xs text-green-400 mt-2 flex items-center justify-center gap-1">
                        <span className="animate-pulse">●</span> {t("subscription.updated")}
                      </p>
                    </>
                  )}
                </div>

                {/* QR Code */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white p-5 rounded-2xl shadow-2xl">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=bitcoin:${BITCOIN_ADDRESS}?amount=${btcAmount}`}
                      alt="QR Code Bitcoin"
                      className="w-60 h-60"
                    />
                  </div>
                </div>

                <p className="text-center text-sm text-gray-400 mb-4">
                  📱 {t("subscription.scan")}
                </p>

                {/* Adresse */}
                <div className="bg-[#0a0e27] rounded-xl p-4 mb-4">
                  <p className="text-xs text-gray-400 mb-2 text-center font-semibold">
                    {t("subscription.address_label")}
                  </p>
                  <p className="font-mono text-sm text-white text-center break-all">
                    {BITCOIN_ADDRESS}
                  </p>
                </div>

                {/* Bouton copie */}
                <button
                  onClick={copyAddress}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  📋 {copied ? t("subscription.copied") : t("subscription.copy")}
                </button>

                <div className="mt-6 p-4 bg-green-400/10 border-2 border-green-400 rounded-xl text-center">
                  <p className="text-green-400 font-semibold text-sm">
                    ✅ {t("subscription.secure")}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {t("subscription.confirmation")}
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Mode Carte bancaire (CoinGate) */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-5xl">💳</span>
                  <h3 className="text-2xl font-bold text-blue-500">
                    {t("subscription.card_payment") || "Paiement par carte"}
                  </h3>
                </div>

                {/* Logos des cartes */}
                <div className="flex justify-center gap-4 mb-6">
                  <div className="bg-white rounded-lg p-2 w-16 h-10 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">VISA</span>
                  </div>
                  <div className="bg-white rounded-lg p-2 w-16 h-10 flex items-center justify-center">
                    <span className="text-red-600 font-bold text-xs">MC</span>
                  </div>
                  <div className="bg-white rounded-lg p-2 w-16 h-10 flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-xs">₿</span>
                  </div>
                </div>

                {/* Prix */}
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-3 border-blue-500 rounded-xl p-6 mb-6">
                  <p className="text-center text-sm text-gray-400 mb-3">
                    {t("subscription.amount_label")}
                  </p>
                  <p className="text-center text-5xl font-bold text-blue-400">
                    9,99€
                  </p>
                  <p className="text-center text-sm text-gray-400 mt-2">
                    {t("subscription.price")}
                  </p>
                </div>

                {/* Formulaire email */}
                <div className="bg-[#0a0e27] border border-gray-700 rounded-xl p-6 mb-6">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    📧 {t("subscription.email_label") || "Adresse email"}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-blue-400 focus:outline-none"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    {t("subscription.email_info") || "Pour recevoir votre confirmation"}
                  </p>
                </div>

                {/* Bouton de paiement */}
                <button
                  onClick={handleCardPayment}
                  disabled={processingPayment}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processingPayment ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {t("subscription.processing") || "Traitement..."}
                    </span>
                  ) : (
                    <>🔒 {t("subscription.pay_now") || "Payer maintenant"}</>
                  )}
                </button>

                {/* Sécurité CoinGate */}
                <div className="mt-6 p-4 bg-green-400/10 border-2 border-green-400 rounded-xl text-center">
                  <p className="text-green-400 font-semibold text-sm">
                    ✅ {t("subscription.secure_payment") || "Paiement 100% sécurisé"}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Propulsé par CoinGate • Sans inscription TVA requise
                  </p>
                </div>

                {/* Avantages */}
                <div className="mt-4 bg-[#0a0e27] border border-gray-700 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">
                    ⚡ Paiement instantané
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Accepte Visa, Mastercard, Bitcoin
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Pas besoin de numéro de TVA
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Confirmation immédiate
                    </li>
                  </ul>
                </div>
              </>
            )}

            {/* Urgence */}
            <div className="mt-4 bg-red-500/10 border border-red-400 rounded-lg p-3 text-center">
              <p className="text-red-400 text-xs font-semibold">
                ⏰ {t("subscription.urgency")} {activeSubscribers} {t("subscription.urgency_end")}
              </p>
            </div>
          </div>
        </div>

        {/* Témoignages */}
        <div className="mt-8 bg-gradient-to-br from-[#1a1d3f]/90 to-[#0a0e27]/90 border-2 border-cyan-400 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-cyan-400 text-center mb-6">
            💬 {t("subscription.testimonials_title")}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0a0e27] border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-2xl">🇫🇷</div>
                <span className="font-semibold text-white">{t("subscription.testimonial1_author")}</span>
                <span className="text-yellow-400 text-sm">★★★★★</span>
              </div>
              <p className="text-gray-400 text-sm italic">
                "{t("subscription.testimonial1")}"
              </p>
            </div>
            <div className="bg-[#0a0e27] border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-2xl">🇬🇧</div>
                <span className="font-semibold text-white">{t("subscription.testimonial2_author")}</span>
                <span className="text-yellow-400 text-sm">★★★★★</span>
              </div>
              <p className="text-gray-400 text-sm italic">
                "{t("subscription.testimonial2")}"
              </p>
            </div>
            <div className="bg-[#0a0e27] border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-2xl">🇯🇵</div>
                <span className="font-semibold text-white">{t("subscription.testimonial3_author")}</span>
                <span className="text-yellow-400 text-sm">★★★★★</span>
              </div>
              <p className="text-gray-400 text-sm italic">
                "{t("subscription.testimonial3")}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}