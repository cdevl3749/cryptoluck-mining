import { useTranslation } from "react-i18next";

export default function ExplanationBox() {
  const { t } = useTranslation();

  return (
    <section className="text-center py-10">
      <div className="bg-[#1a1d3f]/80 border-2 border-cyan-400 rounded-3xl p-8 sm:p-10 shadow-[0_0_40px_rgba(0,212,255,0.3)]">
        <h2 className="text-yellow-400 text-3xl sm:text-4xl font-bold mb-6">
          🎰 {t("explanation.title")}
        </h2>

        <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-5">
          {t("explanation.paragraph1")}
        </p>

        <p className="text-base sm:text-lg leading-relaxed text-gray-300">
          {t("explanation.paragraph2")}
        </p>
      </div>
    </section>
  );
}
