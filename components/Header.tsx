import React from 'react';
import type { Page } from '../App';

interface HeaderProps {
    onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4 border-b border-slate-700/50">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onNavigate('landing')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-fuchsia-400 group-hover:text-fuchsia-300 group-hover:rotate-12 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L9.5 9.5L2 12L9.5 14.5L12 22L14.5 14.5L22 12L14.5 9.5L12 2z"/>
            </svg>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">BrandSpark</h1>
          </div>
          <button
            onClick={() => onNavigate('generator')}
            className="hidden sm:inline-block bg-fuchsia-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-fuchsia-700 transition-all duration-300 transform hover:scale-105"
          >
            Create Logo
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;