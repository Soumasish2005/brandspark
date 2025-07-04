
import React, { useState, useEffect } from 'react';
import type { LogoDetails, LogoResult } from '../types';
import { LOGO_STYLES, COLOR_PALETTES } from '../constants';
import { generateLogo } from '../services/geminiService';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import Spinner from './ui/Spinner';

const LOGO_DETAILS_STORAGE_KEY = 'logoGenerator_details';
const LOGO_RESULT_STORAGE_KEY = 'logoGenerator_result';

const LogoGeneratorPage: React.FC = () => {
  const [logoDetails, setLogoDetails] = useState<LogoDetails>(() => {
    try {
      const savedDetails = localStorage.getItem(LOGO_DETAILS_STORAGE_KEY);
      if (savedDetails) {
        const parsed = JSON.parse(savedDetails);
        if (parsed.name !== undefined && parsed.description !== undefined && parsed.style && parsed.colors) {
            return parsed;
        }
      }
    } catch (error) {
      console.error("Failed to load logo details from localStorage", error);
    }
    return {
      name: '',
      description: '',
      style: LOGO_STYLES[0],
      colors: COLOR_PALETTES[0],
    };
  });

  const [result, setResult] = useState<LogoResult | null>(() => {
    try {
      const savedResult = localStorage.getItem(LOGO_RESULT_STORAGE_KEY);
       if (savedResult) {
        const parsed = JSON.parse(savedResult);
        if (parsed.images && parsed.description) {
            return parsed;
        }
      }
    } catch (error) {
      console.error("Failed to load logo result from localStorage", error);
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
        localStorage.setItem(LOGO_DETAILS_STORAGE_KEY, JSON.stringify(logoDetails));
    } catch (error) {
        console.error("Failed to save logo details to localStorage", error);
    }
  }, [logoDetails]);

  useEffect(() => {
    try {
        if (result) {
            localStorage.setItem(LOGO_RESULT_STORAGE_KEY, JSON.stringify(result));
        } else {
            // This handles clearing the result from storage when a new generation starts
            localStorage.removeItem(LOGO_RESULT_STORAGE_KEY);
        }
    } catch (error) {
        console.error("Failed to save logo result to localStorage", error);
    }
  }, [result]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLogoDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoDetails.name || !logoDetails.description) {
      setError('Please fill in the company name and description.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const generatedResult = await generateLogo(logoDetails);
      setResult(generatedResult);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (imageUrl: string, variation: string) => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    const safeName = logoDetails.name.toLowerCase().replace(/\s+/g, '-');
    link.download = `${safeName}-logo-${variation}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cardStyles = "bg-slate-800/50 backdrop-blur-lg border border-slate-700 p-8 rounded-2xl shadow-2xl";

  const LogoCard = ({ title, imageUrl, variation }: { title: string, imageUrl: string, variation: string }) => (
    <div className="bg-slate-900/50 p-4 rounded-lg flex flex-col items-center">
        <h4 className="font-semibold text-slate-200 mb-3">{title}</h4>
        <div className="bg-white p-3 rounded-md shadow-lg flex-grow flex items-center justify-center w-full mb-4 min-h-[140px]">
            <img src={imageUrl} alt={`${title} - Generated Logo`} className="max-h-28 max-w-full object-contain" />
        </div>
        <Button onClick={() => handleDownload(imageUrl, variation)} size="sm" variant="secondary" className="w-full">
          Download PNG
        </Button>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Form Section */}
      <div className={`${cardStyles} self-start`}>
        <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">Describe Your Vision</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Company / Project Name</label>
            <Input id="name" name="name" type="text" value={logoDetails.name} onChange={handleInputChange} placeholder="e.g., NovaForge" required />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">What does it do?</label>
            <textarea id="description" name="description" value={logoDetails.description} onChange={handleInputChange} placeholder="e.g., An AI development studio" required className="w-full bg-slate-900/70 border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-fuchsia-500 transition duration-200" rows={3}></textarea>
          </div>
          <div>
            <label htmlFor="style" className="block text-sm font-medium text-slate-300 mb-2">Logo Style</label>
            <Select id="style" name="style" value={logoDetails.style} onChange={handleInputChange}>
              {LOGO_STYLES.map(style => <option key={style} value={style}>{style}</option>)}
            </Select>
          </div>
          <div>
            <label htmlFor="colors" className="block text-sm font-medium text-slate-300 mb-2">Color Palette</label>
            <Select id="colors" name="colors" value={logoDetails.colors} onChange={handleInputChange}>
              {COLOR_PALETTES.map(palette => <option key={palette} value={palette}>{palette}</option>)}
            </Select>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full flex justify-center" size="lg">
            {isLoading ? <Spinner /> : 'Generate Logo Kit'}
          </Button>
        </form>
      </div>

      {/* Result Section */}
      <div className={`${cardStyles} flex flex-col`}>
        {isLoading && (
            <div className="flex flex-col items-center justify-center min-h-[500px]">
                <Spinner size="lg" />
                <p className="mt-4 text-slate-300">Our AI is crafting your masterpiece...</p>
                <p className="text-sm text-slate-400">(This can take up to a minute)</p>
            </div>
        )}
        {error && <div className="flex items-center justify-center min-h-[500px]"><p className="text-red-400 bg-red-900/50 p-4 rounded-md text-center">{error}</p></div>}
        
        {!isLoading && !error && result && (
            <div className="animate-fade-in w-full">
                <h3 className="text-2xl font-bold text-white mb-2 text-center">Your Logo Kit is Ready!</h3>
                <p className="text-center text-slate-300 mb-6 italic">"{result.description}"</p>
                <div className="grid grid-cols-2 gap-4">
                    <LogoCard title="Primary Logo" imageUrl={result.images.primary} variation="primary" />
                    <LogoCard title="Horizontal Logo" imageUrl={result.images.horizontal} variation="horizontal" />
                    <LogoCard title="Vertical Logo" imageUrl={result.images.vertical} variation="vertical" />
                    <LogoCard title="Icon Only" imageUrl={result.images.icon} variation="icon" />
                </div>
            </div>
        )}

        {!isLoading && !error && !result && (
            <div className="flex flex-col items-center justify-center text-center text-slate-500 min-h-[500px]">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251.023.501.05.75.082m.75.082a2.25 2.25 0 012.25 2.25v5.714a2.25 2.25 0 00.659 1.591L19.5 14.5m-9.75-11.396c.346.065.692.14.922.223.23.082.455.165.682.255m3.12 0c.378.135.74.28 1.087.432M9.75 18.75v-2.625l3.359-3.359c.62-.62 1.445-1.03 2.348-1.196a3.75 3.75 0 013.58 3.58c-.166.903-.576 1.728-1.196 2.348L12.375 18.75M9.75 18.75h-3c-1.657 0-3-1.343-3-3v-3c0-1.657 1.343-3 3-3h3m9 0c1.657 0 3 1.343 3 3v3c0 1.657-1.343 3-3 3h-3" />
                </svg>
                <h3 className="text-xl font-semibold text-slate-400">Your magic canvas awaits</h3>
                <p>Fill out the form to create your logo kit.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default LogoGeneratorPage;
