import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent border-t border-slate-800/50">
      <div className="container mx-auto px-4 py-6 text-center text-slate-400">
        <p>&copy; {new Date().getFullYear()} BrandSpark. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;