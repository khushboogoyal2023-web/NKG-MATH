import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const translations = {
  hi: {
    appName: 'NKG MATH UNIVERSE',
    appTagline: 'गणित की दुनिया में आपका स्वागत है!',
    home: 'होम', classes: 'कक्षाएं', tables: 'पहाड़े', games: 'खेल', quiz: 'क्विज़',
    challenge: 'चैलेंज', formulas: 'सूत्र', general: 'सामान्य', workbook: 'वर्कबुक',
    worksheets: 'वर्कशीट', mathematicians: 'गणितज्ञ', vedic: 'वैदिक', tricks: 'ट्रिक्स',
    models: 'मॉडल', patravachan: 'पत्रवाचन', aiSolver: 'AI सॉल्वर', virtualLab: 'वर्चुअल लैब',
    glossary: 'शब्दकोश', settings: 'सेटिंग्स',
    startLearn: 'सीखना शुरू करें', playGame: 'खेल खेलें',
    backBtn: 'वापस जाएं', allTopics: 'सभी विषय',
    download: 'डाउनलोड', startExp: 'प्रयोग शुरू करें', downloadExp: 'डाउनलोड प्रयोग फ़ाइल',
    search: 'खोजें...', solve: 'हल करो', newQ: 'नया सवाल पूछो',
    language: 'भाषा', langHindi: 'हिंदी', langEnglish: 'English',
    settingsTitle: 'सेटिंग्स', langSection: 'ऐप की भाषा बदलें',
    thinkingText: 'AI सोच रहा है... 🤔',
    whyWorks: 'यह विधि क्यों काम करती है?',
  },
  en: {
    appName: 'NKG MATH UNIVERSE',
    appTagline: 'Welcome to the world of Mathematics!',
    home: 'Home', classes: 'Classes', tables: 'Tables', games: 'Games', quiz: 'Quiz',
    challenge: 'Challenge', formulas: 'Formulas', general: 'General', workbook: 'Workbook',
    worksheets: 'Worksheets', mathematicians: 'Mathematicians', vedic: 'Vedic', tricks: 'Tricks',
    models: 'Models', patravachan: 'Patravachan', aiSolver: 'AI Solver', virtualLab: 'Virtual Lab',
    glossary: 'Glossary', settings: 'Settings',
    startLearn: 'Start Learning', playGame: 'Play Games',
    backBtn: 'Go Back', allTopics: 'All Topics',
    download: 'Download', startExp: 'Start Experiment', downloadExp: 'Download Experiment File',
    search: 'Search...', solve: 'Solve', newQ: 'Ask New Question',
    language: 'Language', langHindi: 'हिंदी', langEnglish: 'English',
    settingsTitle: 'Settings', langSection: 'Change App Language',
    thinkingText: 'AI is thinking... 🤔',
    whyWorks: 'Why does this method work?',
  },
};

// Context default structure
const LanguageContext = createContext({ lang: 'hi', t: translations.hi, setLang: () => {} });

export function LanguageProvider({ children }) {
  // Safely read language from localStorage
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('nkg_lang') || 'hi';
    } catch {
      return 'hi';
    }
  });

  // Language change function
  const changeLang = useCallback((selectedLang) => {
    setLang(selectedLang);
    try {
      localStorage.setItem('nkg_lang', selectedLang);
    } catch (error) {
      console.error("Failed to save language setting:", error);
    }
  }, []);

  // Memoize for performance
  const value = useMemo(() => ({
    lang,
    t: translations[lang] || translations.hi,
    setLang: changeLang
  }), [lang, changeLang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for use in other components
export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLang must be used within a LanguageProvider');
  }
  return context;
};
