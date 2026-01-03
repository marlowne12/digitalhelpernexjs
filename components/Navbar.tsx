import React from 'react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => (
  <nav className="fixed top-0 left-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
    <div className="container mx-auto px-6 h-20 flex items-center justify-between">
      <button 
        onClick={() => setView('HOME')}
        className="text-2xl font-bold tracking-tighter flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-lg"></div>
        DIGITAL HELPER
      </button>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <button
            onClick={() => setView('HOME')}
            className={`transition-colors ${currentView === 'HOME' ? 'text-white font-bold' : 'hover:text-white'}`}
        >
            Home
        </button>
        <button
            onClick={() => setView('FEATURES')}
            className={`transition-colors ${currentView === 'FEATURES' ? 'text-purple-400 font-bold' : 'hover:text-white'}`}
        >
            Features
        </button>
        <button
            onClick={() => setView('PRICING')}
            className={`transition-colors ${currentView === 'PRICING' ? 'text-pink-400 font-bold' : 'hover:text-white'}`}
        >
            Pricing
        </button>
        <button
            onClick={() => setView('SEO')}
            className={`transition-colors ${currentView === 'SEO' ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}
        >
            SEO Services
        </button>
        <button
            onClick={() => setView('WEBDESIGN')}
            className={`transition-colors ${currentView === 'WEBDESIGN' ? 'text-violet-400 font-bold' : 'hover:text-white'}`}
        >
            Web Design
        </button>
        <button
            onClick={() => setView('CASE_STUDIES')}
            className={`transition-colors ${currentView === 'CASE_STUDIES' ? 'text-green-400 font-bold' : 'hover:text-white'}`}
        >
            Case Studies
        </button>
        <a href="#contact" className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/30">
          Get in Touch
        </a>
      </div>
    </div>
  </nav>
);
