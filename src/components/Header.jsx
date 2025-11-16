import { useTranslation } from "react-i18next";

export default function Header({ openModal }) {
  const { t } = useTranslation();
  
  return (
    <header className="border-b-2 border-yellow-500/30 py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bouton Blog - positionné en haut à gauche */}
        <div className="absolute top-4 left-4 sm:left-8">
          <button 
            onClick={() => openModal('blog')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-cyan-400/50 hover:scale-105"
          >
            <span className="text-xl">📝</span>
            <span className="hidden sm:inline">Blog</span>
          </button>
        </div>

        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-3">
            ⚡ {t("header.title")} ⚡
          </h1>
          <p className="text-xl sm:text-2xl text-cyan-400 font-light tracking-widest">
            {t("header.subtitle")}
          </p>
        </div>
      </div>
    </header>
  );
}
