import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationJA from './locales/ja/translation.json';
import serviceUser from './services/user';

const currentLanguage = serviceUser.getLanguage();

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: translationEN,
        },
        ja: {
            translations: translationJA,
        },
    },
    fallbackLng: currentLanguage,
    debug: process.env.NODE_ENV === 'development',

    ns: ['translations'],
    defaultNS: 'translations',

    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
});

export default i18n;
