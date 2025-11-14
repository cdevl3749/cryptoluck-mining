import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Cpu, Zap, Thermometer, Clock, Hash, TrendingUp, Activity } from 'lucide-react';

export default function MinerDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [minerData, setMinerData] = useState({
    hashrate: 140.2,
    power: 3010,
    temperature: 68,
    uptime: 0,
    totalHashes: 0,
    efficiency: 21.5,
    fans: [6800, 6750, 6900, 6820]
  });

  // Fermeture avec la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Empêcher le scroll du body quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Simulation des données en temps réel
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setMinerData(prev => ({
        ...prev,
        hashrate: 140 + (Math.random() * 4 - 2),
        temperature: 68 + (Math.random() * 8 - 4),
        power: 3010 + Math.floor(Math.random() * 40 - 20),
        uptime: prev.uptime + 1,
        totalHashes: prev.totalHashes + (140 * 1000000000000),
        fans: prev.fans.map(fan => 6800 + Math.floor(Math.random() * 200 - 100))
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    // Format selon la langue
    if (i18n.language === 'ja') {
      return `${days}日 ${hours}時間 ${mins}分 ${secs}秒`;
    } else if (i18n.language === 'en') {
      return `${days}d ${hours}h ${mins}m ${secs}s`;
    }
    return `${days}j ${hours}h ${mins}m ${secs}s`;
  };

  const formatHashrate = (hashes) => {
    if (hashes >= 1e15) return `${(hashes / 1e15).toFixed(2)} PH`;
    if (hashes >= 1e12) return `${(hashes / 1e12).toFixed(2)} TH`;
    return `${(hashes / 1e9).toFixed(2)} GH`;
  };

  const getLocale = () => {
    switch(i18n.language) {
      case 'en': return 'en-US';
      case 'ja': return 'ja-JP';
      default: return 'fr-FR';
    }
  };

  const networkHashrate = 750000000;
  const blockTime = 600;
  const chancePerBlock = (minerData.hashrate / networkHashrate) * 100;

  return (
    <>
      {/* BOUTON PRINCIPAL EN HAUT - Bien visible */}
      <section className="my-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-white px-8 py-6 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:shadow-[0_0_60px_rgba(6,182,212,0.8)] hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            <div className="relative flex items-center justify-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Cpu className="w-8 h-8" />
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-bold mb-1">
                  {t('minerDashboard.mainButton.title')}
                </div>
                <div className="text-cyan-100 text-sm sm:text-base">
                  {t('minerDashboard.mainButton.subtitle')}
                </div>
              </div>
              <div className="ml-auto">
                <div className="flex flex-col items-end gap-2">
                  <span className="px-4 py-1 bg-green-500/30 border border-green-400 rounded-full text-green-300 text-sm font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    {t('minerDashboard.mainButton.status')}
                  </span>
                  <span className="text-yellow-300 text-xs font-semibold">
                    {t('minerDashboard.mainButton.liveData')}
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Bouton flottant en bas à droite - Pour accès rapide */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-4 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] hover:scale-110 transition-all duration-300 flex items-center gap-2 font-bold z-50 group"
        title={t('minerDashboard.floatingButton.title')}
      >
        <Activity className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
        <span className="hidden sm:inline">{t('minerDashboard.floatingButton.text')}</span>
        <span className="w-3 h-3 bg-green-400 rounded-full animate-ping absolute -top-1 -right-1" />
      </button>

      {/* Modal Dashboard */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-gradient-to-br from-[#1a1d3f] to-[#0a0e27] border-2 border-cyan-400 rounded-3xl max-w-6xl w-full shadow-[0_0_60px_rgba(6,182,212,0.5)] relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header */}
            <div className="relative bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-b-2 border-cyan-400/30 p-4 sm:p-6 rounded-t-3xl">
              
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-[10000] text-white bg-red-500 hover:bg-red-600 rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200"
                title={t('minerDashboard.floatingButton.title')}
              >
                <X className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pr-12 sm:pr-0">
                <div className="bg-cyan-500/20 p-3 sm:p-4 rounded-2xl">
                  <Cpu className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
                    {t('minerDashboard.header.model')}
                  </h2>
                  <p className="text-cyan-400 text-sm sm:text-base md:text-lg">{t('minerDashboard.header.subtitle')}</p>
                </div>
                <div className="w-full sm:w-auto">
                  <div className="flex items-center gap-2 bg-green-500/20 px-3 sm:px-4 py-2 rounded-full border border-green-500/50">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-400 font-semibold text-sm sm:text-base">{t('minerDashboard.header.status')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[70vh] overflow-y-auto">
              
              {/* Stats principales */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                
                {/* Hashrate */}
                <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-5">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Hash className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400" />
                    <span className="text-gray-400 text-xs sm:text-sm font-semibold">{t('minerDashboard.stats.hashrate')}</span>
                  </div>
                  <div className="text-xl sm:text-3xl font-bold text-white mb-1">
                    {minerData.hashrate.toFixed(2)} <span className="text-sm sm:text-base">{t('minerDashboard.stats.hashrateUnit')}</span>
                  </div>
                  <div className="text-green-400 text-xs sm:text-sm flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                    {t('minerDashboard.stats.optimal')}
                  </div>
                </div>

                {/* Puissance */}
                <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border-2 border-yellow-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-5">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400" />
                    <span className="text-gray-400 text-xs sm:text-sm font-semibold">{t('minerDashboard.stats.power')}</span>
                  </div>
                  <div className="text-xl sm:text-3xl font-bold text-white mb-1">
                    {minerData.power} <span className="text-sm sm:text-base">{t('minerDashboard.stats.powerUnit')}</span>
                  </div>
                  <div className="text-yellow-400 text-xs sm:text-sm">
                    {minerData.efficiency} J/TH
                  </div>
                </div>

                {/* Température */}
                <div className="bg-gradient-to-br from-red-900/40 to-orange-900/40 border-2 border-red-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-5">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Thermometer className="w-4 h-4 sm:w-6 sm:h-6 text-red-400" />
                    <span className="text-gray-400 text-xs sm:text-sm font-semibold">{t('minerDashboard.stats.temp')}</span>
                  </div>
                  <div className="text-xl sm:text-3xl font-bold text-white mb-1">
                    {minerData.temperature.toFixed(1)}°C
                  </div>
                  <div className="text-green-400 text-xs sm:text-sm">
                    {t('minerDashboard.stats.tempStatus')}
                  </div>
                </div>

                {/* Uptime */}
                <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-5">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-purple-400" />
                    <span className="text-gray-400 text-xs sm:text-sm font-semibold">{t('minerDashboard.stats.uptime')}</span>
                  </div>
                  <div className="text-sm sm:text-xl font-bold text-white mb-1">
                    {formatUptime(minerData.uptime)}
                  </div>
                  <div className="text-purple-400 text-xs sm:text-sm">
                    {t('minerDashboard.stats.activity')}
                  </div>
                </div>
              </div>

              {/* Statistiques avancées */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Hashes calculés */}
                <div className="bg-[#1a1d3f]/60 border border-cyan-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-cyan-400 mb-3 sm:mb-4 flex items-center gap-2">
                    <Hash className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t('minerDashboard.advanced.hashesTitle')}
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <div className="text-xs sm:text-sm text-gray-400 mb-2">{t('minerDashboard.advanced.totalSince')}</div>
                      <div className="text-2xl sm:text-3xl font-bold text-white">
                        {formatHashrate(minerData.totalHashes)}
                      </div>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-400 mb-2">{t('minerDashboard.advanced.chancePerBlock')}</div>
                      <div className="text-xl sm:text-2xl font-bold text-yellow-400">
                        {t('minerDashboard.advanced.oneIn')} {Math.floor(networkHashrate / minerData.hashrate).toLocaleString(getLocale())}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 mt-1">
                        (~{chancePerBlock.toExponential(2)}% {t('minerDashboard.advanced.perBlock')})
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ventilation */}
                <div className="bg-[#1a1d3f]/60 border border-cyan-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-cyan-400 mb-3 sm:mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t('minerDashboard.advanced.coolingTitle')}
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {minerData.fans.map((speed, index) => (
                      <div key={index} className="flex items-center justify-between gap-2">
                        <span className="text-gray-400 text-xs sm:text-sm">{t('minerDashboard.advanced.fan')} {index + 1}</span>
                        <div className="flex items-center gap-2 sm:gap-3 flex-1">
                          <div className="flex-1 max-w-[120px] sm:max-w-[150px] bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(speed / 7000) * 100}%` }}
                            />
                          </div>
                          <span className="text-white font-semibold text-xs sm:text-sm w-16 sm:w-20 text-right">
                            {speed} RPM
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Informations réseau */}
              <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-2 border-yellow-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-3 sm:mb-4">
                  {t('minerDashboard.network.title')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <div className="text-xs sm:text-sm text-gray-400 mb-2">{t('minerDashboard.network.hashrate')}</div>
                    <div className="text-xl sm:text-2xl font-bold text-white">~750 EH/s</div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-400 mb-2">{t('minerDashboard.network.blockTime')}</div>
                    <div className="text-xl sm:text-2xl font-bold text-white">~10 min</div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-400 mb-2">{t('minerDashboard.network.reward')}</div>
                    <div className="text-xl sm:text-2xl font-bold text-white">3.125 BTC</div>
                  </div>
                </div>
              </div>

              {/* Avertissement */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3 sm:p-4">
                <p className="text-gray-300 text-center text-xs sm:text-sm leading-relaxed">
                  {t('minerDashboard.warning')}
                </p>
              </div>

              {/* Bouton fermer en bas (mobile) */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 sm:py-4 rounded-xl transition-colors duration-200 lg:hidden"
              >
                {t('minerDashboard.closeButton')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}