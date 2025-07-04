import React from 'react';
import type { Page } from '../App';
import Button from './ui/Button';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const exampleLogos = [
    { 
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f0abfc' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2 L15 6 L12 5 L9 6 L12 2 Z'/%3E%3Cpath d='M12 8 C10 8 8 10 8 12 C8 14 10 16 12 16 C14 16 16 14 16 12 C16 10 14 8 12 8 Z'/%3E%3Cpath d='M5 15 C7 18 17 18 19 15'/%3E%3C/svg%3E",
        name: "AstroLaunch",
        description: "To the stars and beyond."
    },
    {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a78bfa' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3Cpath d='M12 11 L10 13 L12 15 L14 13 L12 11Z'/%3E%3C/svg%3E",
        name: "Regal Finance",
        description: "Your financial fortress."
    },
    {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236ee7b7' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2a10 10 0 0 0-10 10c0 4 4 10 10 10s10-6 10-10A10 10 0 0 0 12 2z'/%3E%3Cpath d='M12 2c0 10 10 10 0 20C2 12 12 2 12 2z'/%3E%3Cpath d='M12 12a6 6 0 0 1-6-6'/%3E%3C/svg%3E",
        name: "EcoSprout",
        description: "Growing a greener tomorrow."
    },
    {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237dd3fc' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cellipse cx='12' cy='12' rx='10' ry='4'/%3E%3Cellipse cx='12' cy='12' rx='10' ry='4' transform='rotate(60 12 12)'/%3E%3Cellipse cx='12' cy='12' rx='10' ry='4' transform='rotate(120 12 12)'/%3E%3Ccircle cx='12' cy='12' r='2' fill='%237dd3fc'/%3E%3C/svg%3E",
        name: "Quantum Core",
        description: "Next-gen compute solutions."
    },
    {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2393c5fd' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-3.5-4-1.5 2.4-3.5 4S5 13 5 15a7 7 0 0 0 7 7z'/%3E%3Cpath d='M12 14 a2 2 0 0 1 0 -4' stroke-width='1'/%3E%3C/svg%3E",
        name: "AquaPure",
        description: "Clean water for all."
    },
    {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fb923c' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17.66 7.93A8 8 0 0 1 12 20a8 8 0 0 1-5.66-12.07A8 8 0 0 1 12 4a8 8 0 0 1 5.66 3.93Z'/%3E%3Cpath d='M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'/%3E%3C/svg%3E",
        name: "FireFly Media",
        description: "Igniting bright ideas."
    }
];

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400">
          Craft Your Perfect Logo with the Power of AI
        </h2>
        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Instantly generate stunning, unique logos and branding for your business, hackathon project, or team. No design skills required.
        </p>
        <Button onClick={() => onNavigate('generator')} size="lg">
          Get Started For Free
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657L13.414 14.414m-2.828-2.828l-1.414 1.414m5.656 5.656L11.314 11.314m0 0L4.343 4.343m6.971 6.971l6.971 6.971" />
          </svg>
        </Button>
      </div>
      
      <div className="mt-24 w-full">
        <h3 className="text-3xl font-bold text-white mb-10 text-center">See What Others Have Created</h3>
        <div 
            className="relative w-full group overflow-hidden"
            style={{ maskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)' }}
        >
            <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused]">
                {[...exampleLogos, ...exampleLogos].map((logo, index) => (
                    <div key={index} className="flex-shrink-0 w-72 mx-4 bg-slate-800/60 backdrop-blur-sm p-8 rounded-2xl flex flex-col items-center justify-center text-center border border-slate-700/80 shadow-lg transition-colors hover:bg-slate-800">
                        <img src={logo.src} alt={`${logo.name} Logo`} className="h-24 w-24 object-contain mb-5" />
                        <h4 className="font-bold text-lg text-white">{logo.name}</h4>
                        <p className="text-slate-400 text-sm mt-1">{logo.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;