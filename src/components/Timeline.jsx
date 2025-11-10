export default function Timeline() {
  const steps = [
    {
      number: 1,
      title: "Souscrivez à l'abonnement",
      description: "Choisissez votre formule d'abonnement mensuel et rejoignez la communauté CryptoLuck Mining en quelques clics."
    },
    {
      number: 2,
      title: "Activation immédiate",
      description: "Votre compte est activé instantanément et vous participez automatiquement à tous les tirages suivants."
    },
    {
      number: 3,
      title: "Participation automatique",
      description: "Notre infrastructure Bitmain Antminer S19 XP travaille 24/7 pour tenter de miner le prochain bloc Bitcoin."
    },
    {
      number: 4,
      title: "Notification en cas de succès",
      description: "Si notre pool mine un bloc avec succès, tous les participants actifs sont notifiés et récompensés proportionnellement."
    },
    {
      number: 5,
      title: "Récupération de vos gains",
      description: "Les gains sont distribués automatiquement dans votre portefeuille Bitcoin personnel sous 48h."
    }
  ]

  return (
    <section className="my-16">
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-12">
        📋 Comment participer ?
      </h2>
      
      <div className="space-y-8">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900 shadow-[0_0_20px_rgba(255,215,0,0.6)]">
              {step.number}
            </div>
            
            <div className="flex-grow bg-[#1a1d3f]/60 p-6 rounded-xl border-l-4 border-cyan-400">
              <h3 className="text-cyan-400 text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}