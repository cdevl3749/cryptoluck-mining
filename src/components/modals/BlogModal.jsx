import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function BlogModal({ closeModal }) {
  const { t, i18n } = useTranslation();
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Liste des articles
  const articles = [
    {
      id: 'bitcoin-mining-2025',
      emoji: '⛏️'
    },
    {
      id: 'bitcoin-lottery-esp32-guide',
      emoji: '🎰'
    }
  ];

  // Fonction pour récupérer le contenu selon la langue active
  const getArticleContent = (articleId) => {
    const content = t(`blog.articles.${articleId}.content`, { returnObjects: true });
    return content;
  };

  // Fonction pour afficher le contenu d'un article
  const renderArticleContent = (content) => {
    return (
      <div className="space-y-8">
        <p className="text-gray-200 text-lg leading-relaxed">{content.intro}</p>

        {/* Sections */}
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <div key={num}>
            <h2 className="text-3xl font-bold text-cyan-400 mt-10 mb-6 pb-3 border-b-2 border-cyan-400/30">
              {content[`section${num}`].title}
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed">
              {content[`section${num}`].text}
            </p>
          </div>
        ))}

        {/* Conclusion */}
        <div className="bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border-2 border-cyan-400/30 rounded-xl p-6 mt-10">
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">
            {content.conclusion.title}
          </h2>
          <p className="text-gray-200 text-lg leading-relaxed">
            {content.conclusion.text}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-[#1a1d3f] to-[#0a0e27] border-3 border-cyan-400 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-cyan-400/20 my-8">

        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-6 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-300 hover:rotate-90"
          >
            ×
          </button>

          <div className="flex items-center gap-3">
            <span className="text-4xl">📰</span>
            <div>
              <h2 className="text-3xl font-bold text-white">{t('blog.title')}</h2>
              <p className="text-white/80 mt-1">{t('blog.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">

          {!selectedArticle ? (
            // Liste des articles
            <div className="space-y-4">
              {articles.map((article) => {
                const displayDate = t(`blog.articles.${article.id}.date`);
                const publishISO = t(`blog.articles.${article.id}.publishDateISO`);

                // CORRECTION: Normaliser les dates en supprimant l'heure
                const publishDate = publishISO ? new Date(publishISO + "T00:00:00") : null;
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Réinitialiser l'heure à minuit
                
                const isPublished = publishDate ? publishDate <= today : true;

                // Calcul du countdown
                let daysLeft = null;
                if (!isPublished && publishDate) {
                  const diff = publishDate.getTime() - today.getTime();
                  daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
                }

                return (
                  <div
                    key={article.id}
                    onClick={() => isPublished && setSelectedArticle(article)}
                    className={`group bg-[#0a0e27]/60 border-2 rounded-xl p-6 transition-all duration-300 hover:transform hover:scale-[1.02] ${
                      isPublished
                        ? "border-gray-700 hover:border-cyan-400 cursor-pointer"
                        : "border-gray-700/40 opacity-70 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                        {article.emoji}
                      </span>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 text-xs font-bold rounded-full border border-cyan-400">
                            {t(`blog.articles.${article.id}.category`)}
                          </span>

                          <span className="text-gray-400 text-sm">{displayDate}</span>
                          <span className="text-gray-400 text-sm">
                            • {t(`blog.articles.${article.id}.readTime`)} {t("blog.readTime")}
                          </span>

                          {!isPublished && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-500/30">
                              {t("blog.comingSoon") || "À venir"}
                            </span>
                          )}
                        </div>

                        <h3
                          className={`text-xl font-bold mb-2 ${
                            isPublished
                              ? "text-white group-hover:text-cyan-400"
                              : "text-gray-400"
                          }`}
                        >
                          {t(`blog.articles.${article.id}.title`)}
                        </h3>

                        <p className="text-gray-400 mb-3">
                          {t(`blog.articles.${article.id}.excerpt`)}
                        </p>

                        {isPublished ? (
                          <button className="text-cyan-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                            {t("blog.readArticle")}
                            <span className="text-xl">→</span>
                          </button>
                        ) : (
                          <div className="text-sm text-yellow-300 mt-2">
                            📅 Disponible dans <b>{daysLeft}</b> jours
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="text-center py-8 border-2 border-dashed border-gray-700 rounded-xl">
                <span className="text-4xl mb-3 block">🚀</span>
                <p className="text-gray-400">{t('blog.moreArticlesSoon')}</p>
                <p className="text-gray-500 text-sm mt-2">{t('blog.comingSoonDesc')}</p>
              </div>
            </div>
          ) : (
            // Article complet
            <div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="mb-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span className="text-xl">←</span>
                {t('blog.backToArticles')}
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 text-xs font-bold rounded-full border border-cyan-400">
                    {t(`blog.articles.${selectedArticle.id}.category`)}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {t(`blog.articles.${selectedArticle.id}.date`)}
                  </span>
                  <span className="text-gray-400 text-sm">
                    • {t(`blog.articles.${selectedArticle.id}.readTime`)} {t('blog.readTime')}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-white mb-2">
                  {t(`blog.articles.${selectedArticle.id}.title`)}
                </h1>
              </div>

              {/* Contenu */}
              {renderArticleContent(getArticleContent(selectedArticle.id))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
