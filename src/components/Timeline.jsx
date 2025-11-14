import { useTranslation } from "react-i18next";

export default function Timeline() {
  const { t } = useTranslation();
  const steps = t("timeline.steps", { returnObjects: true }); // ✅ tableau de traductions

  return (
    <section className="my-16">
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-12">
        📋 {t("timeline.title")}
      </h2>

      <div className="space-y-8">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
          >
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900 shadow-[0_0_20px_rgba(255,215,0,0.6)]">
              {step.number}
            </div>

            <div className="flex-grow bg-[#1a1d3f]/60 p-6 rounded-xl border-l-4 border-cyan-400">
              <h3 className="text-cyan-400 text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
