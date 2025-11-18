import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function DonationSection() {
  const { t } = useTranslation();
  
  const DONATION_ADDRESS = "3FULxTDJkQB2jrX8cNzJBAoFt43LUbd4PY";
  const DONATION_TARGET = 7900;
  
  const [donationAmount, setDonationAmount] = useState(1250); // Montant actuel collecté
  const [selectedAmount, setSelectedAmount] = useState(25); // Montant sélectionné par l'utilisateur
  const [customAmount, setCustomAmount] = useState("");
  const [copiedDonation, setCopiedDonation] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const predefinedAmounts = [10, 25, 50, 100];

  const copyDonationAddress = () => {
    navigator.clipboard.writeText(DONATION_ADDRESS)
      .then(() => {
        setCopiedDonation(true);
        setTimeout(() => setCopiedDonation(false), 3000);
      })
      .catch(() => {
        alert(t("subscription.error_copy"));
      });
  };

  const donationProgress = Math.min((donationAmount / DONATION_TARGET) * 100, 100);
  const remainingAmount = DONATION_TARGET - donationAmount;

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(parseInt(value));
    }
  };

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  return (
    <>
      {/* SECTION DONATION */}
      <div className="mb-8 relative bg-gradient-to-br from-[#1a1d3f]/90 to-[#0a0e27]/90 border-4 border-purple-400 rounded-3xl p-6 shadow-[0_20px_60px_rgba(168,85,247,0.3)] overflow-hidden">
        
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-purple-400/10 to-transparent animate-[shine_3s_infinite] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="text-center mb-5">
            <div className="inline-block mb-3">
              <span className="text-5xl animate-bounce inline-block">🚀</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">
              {t("donation.title")}
            </h2>
            <p className="text-gray-300 text-sm">
              {t("donation.subtitle")}
            </p>
          </div>

          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">
                💎 {t("donation.progress")}
              </span>
              <span className="text-purple-400 font-bold text-lg">
                {donationProgress.toFixed(0)}%
              </span>
            </div>
            
            <div className="relative h-8 bg-gray-800/50 rounded-full overflow-hidden border-2 border-purple-400/30">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 transition-all duration-1000 ease-out"
                style={{ width: `${donationProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {donationAmount.toLocaleString()}€ / {DONATION_TARGET.toLocaleString()}€
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-purple-400/10 border-2 border-purple-400/50 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-purple-400">560 TH/s</div>
              <div className="text-[10px] text-gray-400 mt-1">{t("donation.hashrate")}</div>
            </div>
            <div className="bg-pink-400/10 border-2 border-pink-400/50 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-pink-400">3.125 BTC</div>
              <div className="text-[10px] text-gray-400 mt-1">{t("donation.jackpot")}</div>
            </div>
            <div className="bg-cyan-400/10 border-2 border-cyan-400/50 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-cyan-400">{remainingAmount.toLocaleString()}€</div>
              <div className="text-[10px] text-gray-400 mt-1">{t("donation.remaining")}</div>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <button 
              onClick={() => setShowDonationModal(true)}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-xl hover:scale-105 hover:shadow-2xl transition-all shadow-lg"
            >
              🎁 {t("donation.donate_button")}
            </button>
            <button
              onClick={() => setShowDetailsModal(true)}
              className="bg-yellow-400/10 border-2 border-yellow-400 text-yellow-400 font-bold py-3 px-6 rounded-xl hover:bg-yellow-400/20 transition-all whitespace-nowrap"
            >
              ℹ️ {t("donation.details")}
            </button>
          </div>

          <p className="text-center text-xs text-gray-400">
            🛡️ {t("donation.guarantee_info")}
          </p>
        </div>
      </div>

      {/* MODAL DONATION AMÉLIORÉE */}
      {showDonationModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDonationModal(false)}>
          <div className="bg-gradient-to-br from-[#1a1d3f] to-[#0a0e27] border-4 border-purple-400 rounded-3xl p-6 max-w-md w-full shadow-[0_0_100px_rgba(168,85,247,0.5)] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-purple-400 mb-1">
                💜 {t("donation.modal_title")}
              </h3>
              <p className="text-gray-300 text-xs">
                {t("donation.modal_subtitle")}
              </p>
            </div>

            {/* Sélection du montant */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
  💰            {t("donation.choose_amount")}
              </label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-2 px-3 rounded-lg font-bold text-sm transition-all ${
                      selectedAmount === amount && !customAmount
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105 shadow-lg"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {amount}€
                  </button>
                ))}
              </div>
              
              {/* Montant personnalisé */}
              <div className="relative">
                <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder={t("donation.custom_amount")}
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-purple-400 focus:outline-none text-sm"
                />
                {customAmount && (
                  <span className="absolute right-3 top-2 text-purple-400 font-bold text-sm">
                    €
                  </span>
                )}
              </div>
            </div>

            {/* Montant final sélectionné */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400 rounded-xl p-3 mb-4 text-center">
              <p className="text-xs text-gray-400 mb-1">{t("donation.amount_to_send")}</p>
              <p className="text-3xl font-bold text-purple-400">{finalAmount}€</p>
            </div>

            {/* QR Code plus compact */}
            <div className="flex justify-center mb-4">
              <div className="bg-white p-3 rounded-xl shadow-lg">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=bitcoin:${DONATION_ADDRESS}?amount=${(finalAmount / 90000).toFixed(8)}`}
                  alt="QR Code Donation"
                  className="w-[180px] h-[180px]"
                />
              </div>
            </div>

            <p className="text-center text-xs text-gray-400 mb-3">
                📱 {t("donation.scan_wallet")}
            </p>

            {/* Adresse compacte */}
            <div className="bg-[#0a0e27] rounded-lg p-3 mb-3 border border-purple-400/30">
              <p className="text-[10px] text-gray-400 mb-1 text-center font-semibold">
                {t("donation.address_label")}
              </p>
              <p className="font-mono text-[10px] text-white text-center break-all leading-tight">
                {DONATION_ADDRESS}
              </p>
            </div>

            {/* Boutons */}
            <button
              onClick={copyDonationAddress}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:scale-105 transition-all shadow-lg mb-2"
            >
              {copiedDonation ? "✓ " + t("donation.copied") : "📋 " + t("donation.copy_address")}
            </button>

            <button
              onClick={() => setShowDonationModal(false)}
              className="w-full bg-gray-700 text-white font-bold py-2 rounded-xl hover:bg-gray-600 transition-all text-sm"
            >
              {t("donation.close")}
            </button>

            <p className="text-center text-[10px] text-gray-400 mt-3">
              ✨ {t("donation.any_amount")}
            </p>
          </div>
        </div>
      )}

      {/* MODAL DÉTAILS */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDetailsModal(false)}>
          <div className="bg-gradient-to-br from-[#1a1d3f] to-[#0a0e27] border-4 border-yellow-400 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_100px_rgba(255,215,0,0.5)]" onClick={(e) => e.stopPropagation()}>
            
            <div className="text-center mb-6">
              <span className="text-5xl mb-3 inline-block">⚡</span>
              <h3 className="text-3xl font-bold text-yellow-400 mb-2">
                {t("donation.details_title")}
              </h3>
              <p className="text-gray-300">
                {t("donation.details_subtitle")}
              </p>
            </div>

            <div className="space-y-6">
              {/* Le Projet */}
              <div className="bg-[#0a0e27] border-2 border-purple-400/50 rounded-xl p-5">
                <h4 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2">
                  <span>🎯</span> {t("donation.what_is_project")}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {t("donation.project_desc")}
                </p>
              </div>

              {/* Les Machines */}
              <div className="bg-[#0a0e27] border-2 border-cyan-400/50 rounded-xl p-5">
                <h4 className="text-xl font-bold text-cyan-400 mb-3 flex items-center gap-2">
                  <span>🖥️</span> {t("donation.the_machines")}
                </h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">•</span>
                    <span>{t("donation.machine_spec1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">•</span>
                    <span>{t("donation.machine_spec2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">•</span>
                    <span>{t("donation.machine_spec3")}</span>
                  </li>
                </ul>
              </div>

              {/* Comment ça marche */}
              <div className="bg-[#0a0e27] border-2 border-green-400/50 rounded-xl p-5">
                <h4 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
                  <span>💰</span> {t("donation.how_it_works")}
                </h4>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-400 text-black rounded-full flex items-center justify-center font-bold text-xs">1</span>
                    <span className="text-gray-300">{t("donation.step_1")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-400 text-black rounded-full flex items-center justify-center font-bold text-xs">2</span>
                    <span className="text-gray-300">{t("donation.step_2")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-400 text-black rounded-full flex items-center justify-center font-bold text-xs">3</span>
                    <span className="text-gray-300">{t("donation.step_3")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-400 text-black rounded-full flex items-center justify-center font-bold text-xs">4</span>
                    <span className="text-gray-300">{t("donation.step_4_details")}</span>
                  </li>
                </ol>
              </div>

              {/* Garanties */}
              <div className="bg-[#0a0e27] border-2 border-blue-400/50 rounded-xl p-5">
                <h4 className="text-xl font-bold text-blue-400 mb-3 flex items-center gap-2">
                  <span>🛡️</span> {t("donation.guarantees")}
                </h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>{t("donation.guarantee_1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>{t("donation.guarantee_2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>{t("donation.guarantee_3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>{t("donation.guarantee_4")}</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowDetailsModal(false)}
              className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-4 rounded-xl hover:scale-105 transition-all shadow-lg"
            >
              {t("donation.close")}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
}