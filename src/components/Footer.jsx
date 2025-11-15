import { useTranslation } from "react-i18next";

export default function Footer({ openModal }) {
  const { t } = useTranslation();

  // Méthodes de paiement Bitcoin
  const paymentMethods = [
    { name: "₿ Bitcoin", color: "bg-gradient-to-r from-orange-500 to-yellow-500 text-white", icon: "₿" },
    { name: "BTC", color: "bg-[#F7931A] text-white", icon: "₿" },
  ];

  // Badges de confiance
  const trustBadges = [
    { icon: "🔐", text: t("footer.badges.ledger") },
    { icon: "⚡", text: t("footer.badges.instant") },
    { icon: "🌍", text: t("footer.badges.worldwide") },
    { icon: "🔒", text: t("footer.badges.secure") },
  ];

  return (
    <footer className="bg-[#0a0e27]/90 border-t-2 border-yellow-400/30 mt-20 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Paiement crypto */}
        <div className="bg-[#1a1d3f]/60 border-2 border-cyan-400/30 rounded-2xl p-6 sm:p-8 mb-8">
          <h3 className="text-green-400 text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
            <span>💰</span>
            <span>{t("footer.payment_title")}</span>
          </h3>
          
          {/* Logo Bitcoin principal */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600 p-8 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="text-6xl sm:text-7xl text-white font-bold">₿</div>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">
              {t("footer.payment_exclusive")}
            </p>
            <p className="text-gray-300 text-sm sm:text-base">
              {t("footer.payment_details")}
            </p>
          </div>

          {/* Méthodes Bitcoin */}
          <div className="flex justify-center flex-wrap gap-4 mb-6">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className={`${method.color} px-8 py-4 rounded-xl font-bold text-xl shadow-lg hover:translate-y-[-5px] transition-transform duration-300 flex items-center gap-2`}
              >
                <span className="text-3xl">{method.icon}</span>
                <span>{method.name}</span>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="flex justify-center flex-wrap gap-3 mt-6">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-green-400/20 px-4 py-2 rounded-full border-2 border-green-400 text-green-400 font-semibold text-sm"
              >
                <span>{badge.icon}</span>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-cyan-400 text-sm">
              {t("footer.extra_info")}
            </p>
          </div>
        </div>

        {/* Réseaux sociaux - Twitter/X */}
        <div className="flex justify-center mb-8">
          <a 
            href="https://x.com/CryptoLuck_JP" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-gradient-to-r from-gray-800 to-black hover:from-cyan-400/20 hover:to-blue-400/20 border-2 border-gray-700 hover:border-cyan-400 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-400/50"
          >
            {/* Logo X (Twitter) */}
            <svg 
              viewBox="0 0 24 24" 
              className="w-6 h-6 flex-shrink-0 fill-white group-hover:fill-cyan-400 transition-colors duration-300"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="text-white font-semibold group-hover:text-cyan-400 transition-colors duration-300">
              {t("footer.follow_us") || "Suivez-nous sur X"}
            </span>
            <span className="hidden sm:inline text-gray-400 group-hover:text-cyan-300 transition-colors duration-300">
              @CryptoLuck_JP
            </span>
          </a>
        </div>

        {/* Liens */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
          <button onClick={() => openModal("mentionsLegales")} className="text-cyan-400 hover:text-yellow-400 px-4 py-2 border-b-2 border-transparent hover:border-yellow-400 transition-colors">
            {t("footer.legal")}
          </button>
          <button onClick={() => openModal("conditions")} className="text-cyan-400 hover:text-yellow-400 px-4 py-2 border-b-2 border-transparent hover:border-yellow-400 transition-colors">
            {t("footer.terms")}
          </button>
          <button onClick={() => openModal("confidentialite")} className="text-cyan-400 hover:text-yellow-400 px-4 py-2 border-b-2 border-transparent hover:border-yellow-400 transition-colors">
            {t("footer.privacy")}
          </button>
          <button onClick={() => openModal("contact")} className="text-cyan-400 hover:text-yellow-400 px-4 py-2 border-b-2 border-transparent hover:border-yellow-400 transition-colors">
            {t("footer.contact")}
          </button>
        </div>

        <p className="text-center text-gray-400 mt-6">{t("footer.copyright")}</p>
        <p className="text-center text-gray-500 text-sm mt-2">{t("footer.warning")}</p>
      </div>
    </footer>
  );
}
