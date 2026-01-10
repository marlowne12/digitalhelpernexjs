import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { WebsiteAudit } from './components/WebsiteAudit';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { ChatWidget } from './components/ChatWidget';
import { Navbar } from './components/Navbar';
import { SEOPage } from './components/SEOPage';
import { WebDesignPage } from './components/WebDesignPage';
import { AIAgencyPage } from './components/AIAgencyPage';
import { CaseStudiesPage } from './components/CaseStudiesPage';
import { RevealOnScroll } from './components/RevealOnScroll';
import { Pricing } from './components/Pricing';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { ViewState } from './types';

const Footer: React.FC = () => (
  <footer className="bg-slate-950 border-t border-slate-900 py-12 text-center text-slate-500 text-sm">
    <div className="container mx-auto px-6">
      <p>&copy; {new Date().getFullYear()} Digital Helper Agency. All rights reserved.</p>
      <div className="mt-4 flex justify-center gap-4">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Google Partner Info</a>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');

  const renderView = () => {
    switch (currentView) {
      case 'SEO':
        return <SEOPage />;
      case 'WEBDESIGN':
        return <WebDesignPage />;
      case 'AI_AGENCY':
        return <AIAgencyPage />;
      case 'CASE_STUDIES':
        return <CaseStudiesPage />;
      case 'PRICING':
        return <Pricing />;
      case 'FEATURES':
        return (
          <>
            <Features />
            <Testimonials />
          </>
        );
      case 'HOME':
      default:
        return (
          <>
            <RevealOnScroll>
              <Hero />
            </RevealOnScroll>

            <RevealOnScroll>
              <WebsiteAudit />
            </RevealOnScroll>

            <RevealOnScroll>
              <Services />
            </RevealOnScroll>

            <RevealOnScroll>
              <Features />
            </RevealOnScroll>

            <RevealOnScroll>
              <Testimonials />
            </RevealOnScroll>

            {/* Recent Work Teaser - navigates to Case Studies */}
            <RevealOnScroll>
              <section id="work" className="py-20 border-y border-slate-900 bg-black">
                <div className="container mx-auto px-6 mb-10 flex justify-between items-end">
                  <div>
                    <h2 className="text-3xl font-bold text-white">Recent Transformations</h2>
                    <p className="text-slate-500">See how we modernized these local businesses.</p>
                  </div>
                  <button
                    onClick={() => setCurrentView('CASE_STUDIES')}
                    className="text-cyan-400 hover:text-cyan-300 font-bold text-sm transition-colors"
                  >
                    View All Case Studies &rarr;
                  </button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-8 px-6 scrollbar-hide">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="min-w-[300px] md:min-w-[400px] aspect-video bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden relative group">
                      <img
                        src={`https://picsum.photos/800/600?random=${i}`}
                        alt="Project"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                      />
                      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-bold text-xl">Project Alpha {i}</h3>
                        <p className="text-cyan-400 text-sm">Old Site → Modern Web App</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </RevealOnScroll>
          </>
        );
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-cyan-500/30">
      <Navbar currentView={currentView} setView={setCurrentView} />

      {renderView()}

      <RevealOnScroll>
        <Contact />
      </RevealOnScroll>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;
