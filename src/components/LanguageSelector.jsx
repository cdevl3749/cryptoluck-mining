import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const dropdownRef = useRef(null);

  // Drapeaux en tant que JSX directement
  const flags = {
    fr: (
      <svg width="24" height="24" viewBox="0 0 24 24" className="inline-block">
        <rect width="8" height="24" fill="#0055A4"/>
        <rect x="8" width="8" height="24" fill="#FFFFFF"/>
        <rect x="16" width="8" height="24" fill="#EF4135"/>
      </svg>
    ),
    en: (
      <svg width="24" height="24" viewBox="0 0 24 24" className="inline-block">
        <rect width="24" height="24" fill="#012169"/>
        <path d="M0 0 L24 24 M24 0 L0 24" stroke="#FFF" strokeWidth="4"/>
        <path d="M0 0 L24 24 M24 0 L0 24" stroke="#C8102E" strokeWidth="2"/>
        <path d="M12 0 V24 M0 12 H24" stroke="#FFF" strokeWidth="8"/>
        <path d="M12 0 V24 M0 12 H24" stroke="#C8102E" strokeWidth="4"/>
      </svg>
    ),
    ja: (
      <svg width="24" height="24" viewBox="0 0 24 24" className="inline-block">
        <rect width="24" height="24" fill="#FFFFFF" stroke="#D3D3D3" strokeWidth="1"/>
        <circle cx="12" cy="12" r="6" fill="#BC002D"/>
      </svg>
    )
  };

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' }
  ];

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 border border-gray-700 hover:border-blue-500 shadow-lg"
      >
        <Globe size={18} className="text-blue-400" />
        {flags[currentLanguage.code]}
        <span className="hidden sm:inline font-medium">{currentLanguage.label}</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50 animate-fadeIn">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors text-left ${
                i18n.language === lang.code ? 'bg-blue-600 hover:bg-blue-700' : ''
              }`}
            >
              {flags[lang.code]}
              <span className="font-medium text-white">{lang.label}</span>
              {i18n.language === lang.code && (
                <span className="ml-auto text-blue-300 font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}