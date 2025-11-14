import { useTranslation } from "react-i18next";

export default function SubscriptionCard() {
  const { t } = useTranslation();

  const features = t("subscription.features", { returnObjects: true });

  const handleSubscribe = async () => {
    const STRIPE_PUBLISHABLE_KEY = "pk_test_VOTRE_CLE_PUBLIQUE_STRIPE";
    alert(
      "🚀 Redirection vers Stripe Checkout...\n\nPour activer le paiement réel:\n1. Créez un compte Stripe (stripe.com)\n2. Configurez votre clé API\n3. Créez un produit d'abonnement\n4. Implémentez le backend pour gérer les sessions Checkout"
    );
  };

  return (
    <section className="my-20">
      <div className="relative max-w-2xl mx-auto bg-gradient-to-br from-[#1a1d3f]/90 to-[#0a0e27]/90 border-4 border-yellow-400 rounded-3xl p-8 sm:p-12 shadow-[0_20px_60px_rgba(255,215,0,0.3)] overflow-hidden">
        {/* Effet shine */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-yellow-400/10 to-transparent animate-[shine_3s_infinite]" />

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-6 text-center">
            💫 {t("subscription.title")}
          </h2>

          <div className="text-center">
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-cyan-400 my-6">
              9,99€ <span className="text-2xl sm:text-3xl text-gray-400">{t("subscription.price")}</span>
            </div>
          </div>

          <ul className="space-y-4 my-8">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 pb-4 border-b border-yellow-400/20 text-base sm:text-lg"
              >
                <span className="text-green-400 text-2xl flex-shrink-0">✓</span>
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleSubscribe}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-xl py-5 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_10px_30px_rgba(255,215,0,0.4)] hover:shadow-[0_15px_40px_rgba(255,215,0,0.6)] mt-8"
          >
            {t("subscription.button")}
          </button>
        </div>
      </div>
    </section>
  );
}

