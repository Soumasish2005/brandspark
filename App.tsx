import React, { useState, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import LogoGeneratorPage from './components/LogoGeneratorPage';
import Header from './components/Header';
import Footer from './components/Footer';

export type Page = 'landing' | 'generator';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col font-sans">
      <Header onNavigate={navigateTo} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {currentPage === 'landing' && <LandingPage onNavigate={navigateTo} />}
        {currentPage === 'generator' && <LogoGeneratorPage />}
      </main>
      <Footer />
    </div>
  );
};

export default App;