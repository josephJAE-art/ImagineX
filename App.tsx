
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ImagineView from './components/ImagineView';
import GalleryView from './components/GalleryView';
import AboutView from './components/AboutView'; // Import new AboutView
import { AppMode, ImaginationResult, Language } from './types';
import * as db from './services/dbService';
import { translations } from './constants/translations';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.IMAGINE);
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [collection, setCollection] = useState<ImaginationResult[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = translations[language];

  useEffect(() => {
    const loadData = async () => {
      try {
        const items = await db.getAllItems();
        setCollection(items);
      } catch (e) {
        console.error("Failed to load collection from IndexedDB", e);
      }
    };
    loadData();
  }, []);

  const saveToCollection = async (item: ImaginationResult) => {
    try {
      await db.saveItem(item);
      setCollection(prev => [item, ...prev]);
    } catch (e) {
      console.error("Failed to save to IndexedDB", e);
    }
  };

  const deleteFromCollection = async (id: string) => {
    try {
      await db.deleteItem(id);
      setCollection(prev => prev.filter(item => item.id !== id));
    } catch (e) {
      console.error("Failed to delete from IndexedDB", e);
    }
  };

  const renderContent = () => {
    switch (mode) {
      case AppMode.IMAGINE:
        return <ImagineView onSave={saveToCollection} language={language} />;
      
      case AppMode.GALLERY:
        return <GalleryView items={collection} onDelete={deleteFromCollection} language={language} />;

      case AppMode.ABOUT:
        return <AboutView language={language} />;
      
      case AppMode.TERMS:
        return (
          <div className="max-w-4xl mx-auto py-12 md:py-24 space-y-10 animate-in fade-in duration-700 px-4">
             <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tighter">{t.terms}</h2>
             <div className="space-y-8 text-gray-400 leading-loose text-base md:text-lg font-light">
                <section className="space-y-4">
                  <h3 className="text-white font-bold uppercase text-xs tracking-[0.3em]">01. Creative Ownership</h3>
                  <p>All neural outputs generated via Imagine X belong to the initiating user. However, by using the iMX Protocol, you grant a non-exclusive license for display within the local vault.</p>
                </section>
                <section className="space-y-4">
                  <h3 className="text-white font-bold uppercase text-xs tracking-[0.3em]">02. Ethical Constraints</h3>
                  <p>Users are prohibited from using the iMX engine to generate content that promotes hate, violence, or explicit illegal activities.</p>
                </section>
             </div>
          </div>
        );

      case AppMode.PRIVACY:
        return (
          <div className="max-w-4xl mx-auto py-12 md:py-24 space-y-10 animate-in fade-in duration-700 px-4">
             <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tighter">{t.privacy}</h2>
             <div className="space-y-8 text-gray-400 leading-loose text-base md:text-lg font-light">
                <section className="space-y-4">
                  <h3 className="text-white font-bold uppercase text-xs tracking-[0.3em]">Local-First Architecture</h3>
                  <p>Imagine X utilizes an IndexedDB "Vault" located directly within your browser. Your creative artifacts never leave your local environment except when interacting with the Gemini API.</p>
                </section>
             </div>
          </div>
        );

      case AppMode.CONTACT:
        return (
          <div className="max-w-4xl mx-auto py-12 md:py-24 text-center space-y-12 animate-in slide-in-from-bottom-12 duration-700 px-4">
             <div className="relative inline-block">
                <div className="absolute -inset-4 bg-indigo-500/20 blur-2xl rounded-full"></div>
                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gray-900 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-indigo-400 mx-auto">
                    <i className="fa-solid fa-paper-plane text-3xl md:text-4xl"></i>
                </div>
             </div>
             <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tighter">{t.neuralLink}</h2>
                <p className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed">
                  {t.connectArchitect}
                </p>
             </div>
             <a 
                href={`mailto:${atob('am9zZXBoZ213YW5nb0BnbWFpbC5jb20=')}`} 
                className="inline-block bg-white text-black px-10 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-105 shadow-xl shadow-indigo-500/10 active:scale-95"
              >
                {t.establishConnection}
              </a>
          </div>
        );

      default:
        return <ImagineView onSave={saveToCollection} language={language} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-950 text-white min-h-screen font-sans overflow-hidden">
      {/* Mobile Header */}
      <header className="md:hidden glass border-b border-white/5 px-4 py-3 flex items-center justify-between z-40 sticky top-0 backdrop-blur-3xl pt-[calc(0.75rem+env(safe-area-inset-top))]">
        <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-xl opacity-90"></div>
                <div className="absolute inset-[1.5px] bg-gray-950 rounded-[8px] flex items-center justify-center overflow-hidden">
                    <span className="relative font-heading font-black text-white text-[11px] z-10 italic">X</span>
                </div>
            </div>
            <span className="font-heading font-black text-base tracking-tighter uppercase leading-none">Imagine X</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all active:bg-white/10"
        >
          <i className="fa-solid fa-bars-staggered"></i>
        </button>
      </header>

      {/* Sidebar - Desktop (Fixed width 320px) */}
      <div className="hidden md:block shrink-0 w-[320px]">
        <Sidebar currentMode={mode} setMode={setMode} language={language} setLanguage={setLanguage} />
      </div>

      {/* Mobile Sliding Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[100] md:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        <div 
          className={`absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        <div 
          className={`absolute inset-y-0 left-0 w-[85%] max-w-[300px] transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] shadow-[0_0_50px_rgba(0,0,0,0.5)] ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar 
              currentMode={mode} 
              setMode={setMode} 
              language={language}
              setLanguage={setLanguage}
              onClose={() => setIsMobileMenuOpen(false)} 
          />
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)] scroll-smooth relative">
        <div className="min-h-full">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
