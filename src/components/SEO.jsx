import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function SEOHead() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Mise à jour du lang dans <html>
    document.documentElement.lang = i18n.language;

    // Metadata selon la langue
    const metadata = {
      fr: {
        title: 'CryptoLuck Mining - Bitcoin Lottery Mining | Minage Collaboratif BTC',
        description: 'Participez au minage collaboratif de Bitcoin avec CryptoLuck Mining. Abonnement 9,99€/mois pour 144 tirages quotidiens. Gagnez jusqu\'à 200 000€ par bloc miné !',
        keywords: 'bitcoin mining, minage bitcoin, crypto mining, lottery bitcoin, blockchain, cryptomonnaie, mining pool, bitcoin lottery, minage collaboratif, investissement crypto',
        ogLocale: 'fr_FR'
      },
      en: {
        title: 'CryptoLuck Mining - Bitcoin Lottery & Cloud Mining Platform',
        description: 'Join CryptoLuck Mining Bitcoin lottery. €9.99/month subscription for 144 daily draws. Win up to €200,000 per mined block!',
        keywords: 'bitcoin mining, crypto mining, bitcoin lottery, blockchain, cryptocurrency, mining pool, cloud mining, bitcoin investment, collaborative mining',
        ogLocale: 'en_US'
      },
      ja: {
        title: 'CryptoLuck Mining - ビットコイン宝くじ＆クラウドマイニング',
        description: 'CryptoLuck Miningのビットコイン宝くじに参加。月額9.99ユーロで毎日144回の抽選。最大20万ユーロの賞金を獲得！',
        keywords: 'ビットコインマイニング, 仮想通貨マイニング, ビットコイン宝くじ, ブロックチェーン, 暗号通貨, マイニングプール, クラウドマイニング, ビットコイン投資',
        ogLocale: 'ja_JP'
      }
    };

    const meta = metadata[i18n.language] || metadata.fr;

    // Mise à jour du titre
    document.title = meta.title;

    // Mise à jour des meta tags
    updateMetaTag('description', meta.description);
    updateMetaTag('keywords', meta.keywords);
    updateMetaTag('language', i18n.language === 'ja' ? 'Japanese' : i18n.language === 'en' ? 'English' : 'French');

    // Open Graph pour réseaux sociaux
    updateMetaTag('og:title', meta.title, 'property');
    updateMetaTag('og:description', meta.description, 'property');
    updateMetaTag('og:locale', meta.ogLocale, 'property');

    // Twitter Card
    updateMetaTag('twitter:title', meta.title, 'name');
    updateMetaTag('twitter:description', meta.description, 'name');

  }, [i18n.language]);

  return null;
}

export function HreflangLinks() {
  const baseUrl = 'https://cryptoluck-mining.netlify.app';

  useEffect(() => {
    // Supprimer les anciens liens hreflang avant
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

    // Ajouter les nouveaux liens hreflang
    const languages = [
      { code: 'fr', url: `${baseUrl}/?lang=fr` },
      { code: 'en', url: `${baseUrl}/?lang=en` },
      { code: 'ja', url: `${baseUrl}/?lang=ja` },
      { code: 'x-default', url: baseUrl }
    ];

    languages.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang.code;
      link.href = lang.url;
      document.head.appendChild(link);
    });
  }, []);

  return null;
}

function updateMetaTag(name, content, attribute = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}