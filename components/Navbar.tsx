import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tighter flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-lg"></div>
          DIGITAL HELPER
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link
            to="/"
            className={`transition-colors ${isActive('/') ? 'text-white font-bold' : 'hover:text-white'}`}
          >
            Home
          </Link>
          <Link
            to="/features"
            className={`transition-colors ${isActive('/features') ? 'text-purple-400 font-bold' : 'hover:text-white'}`}
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className={`transition-colors ${isActive('/pricing') ? 'text-pink-400 font-bold' : 'hover:text-white'}`}
          >
            Pricing
          </Link>
          <Link
            to="/seo"
            className={`transition-colors ${isActive('/seo') ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}
          >
            SEO Services
          </Link>
          <Link
            to="/web-design"
            className={`transition-colors ${isActive('/web-design') ? 'text-violet-400 font-bold' : 'hover:text-white'}`}
          >
            Web Design
          </Link>
          <Link
            to="/ai-agency"
            className={`transition-colors ${isActive('/ai-agency') ? 'text-pink-400 font-bold' : 'hover:text-white'}`}
          >
            AI Agency
          </Link>
          <Link
            to="/case-studies"
            className={`transition-colors ${isActive('/case-studies') ? 'text-green-400 font-bold' : 'hover:text-white'}`}
          >
            Case Studies
          </Link>
          <button
            onClick={scrollToContact}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/30"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </nav>
  );
};
