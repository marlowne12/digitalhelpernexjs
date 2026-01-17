import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { WebsiteAudit } from './components/WebsiteAudit';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { ChatWidget } from './components/ChatWidget';
import { Navbar } from './components/Navbar';
import { RevealOnScroll } from './components/RevealOnScroll';
import { SEO } from './components/SEO';

// Lazy load page components for code splitting
const SEOPage = lazy(() => import('./components/SEOPage'));
const WebDesignPage = lazy(() => import('./components/WebDesignPage'));
const AIAgencyPage = lazy(() => import('./components/AIAgencyPage'));
const CaseStudiesPage = lazy(() => import('./components/CaseStudiesPage'));
const Pricing = lazy(() => import('./components/Pricing'));
const Features = lazy(() => import('./components/Features'));
const Testimonials = lazy(() => import('./components/Testimonials'));

// Loading component for lazy-loaded routes
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
  </div>
);

const Footer: React.FC = () => (
  <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-500 text-sm">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        {/* Company Info - Service Area Business */}
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">Digital Helper Agency</h3>
          <div className="space-y-2">
            <p className="text-slate-400">Serving Tri-Cities Area</p>
            <p>Richland, WA 99352</p>
            <p className="mt-3">
              <a href="tel:+15095550123" className="hover:text-cyan-400 transition-colors">
                (509) 555-0123
              </a>
            </p>
            <p>
              <a href="mailto:hello@digitalhelper.com" className="hover:text-cyan-400 transition-colors">
                hello@digitalhelper.com
              </a>
            </p>
            <p className="mt-3">
              <a
                href="https://maps.app.goo.gl/oywZxxYt9w3m1oCK9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
              >
                View Service Area →
              </a>
            </p>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-bold mb-4">Services</h4>
          <ul className="space-y-2">
            <li><a href="/seo" className="hover:text-cyan-400 transition-colors">Local SEO</a></li>
            <li><a href="/web-design" className="hover:text-cyan-400 transition-colors">Web Design</a></li>
            <li><a href="/ai-agency" className="hover:text-cyan-400 transition-colors">AI Integration</a></li>
            <li><a href="/case-studies" className="hover:text-cyan-400 transition-colors">Case Studies</a></li>
            <li><a href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
          </ul>
        </div>

        {/* Areas Served */}
        <div>
          <h4 className="text-white font-bold mb-4">Areas Served</h4>
          <ul className="space-y-1">
            <li>Richland, WA</li>
            <li>Kennewick, WA</li>
            <li>Pasco, WA</li>
            <li>West Richland, WA</li>
            <li>Benton City, WA</li>
            <li>All Tri-Cities Area</li>
          </ul>
        </div>

        {/* Business Hours */}
        <div>
          <h4 className="text-white font-bold mb-4">Business Hours</h4>
          <ul className="space-y-1">
            <li>Monday - Friday</li>
            <li>9:00 AM - 5:00 PM PST</li>
            <li className="pt-2">
              <a
                href="https://maps.app.goo.gl/oywZxxYt9w3m1oCK9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
              >
                View on Google Maps →
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center border-t border-slate-900 pt-8">
        <p>&copy; {new Date().getFullYear()} Digital Helper Agency. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="https://maps.app.goo.gl/oywZxxYt9w3m1oCK9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Google Business Profile</a>
        </div>
      </div>
    </div>
  </footer>
);

// Home page component
const HomePage: React.FC = () => (
  <>
    <SEO
      title="Modern Web Design in Richland, WA"
      description="Digital Helper transforms outdated local business websites in Richland, WA into modern, high-converting sites. Web design, mobile optimization & AI-powered content for Tri-Cities businesses."
      canonicalUrl="https://digital-helper.com/"
    />
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

    <RevealOnScroll>
      <RecentWork />
    </RevealOnScroll>
  </>
);

// Recent Work section component
const RecentWork: React.FC = () => (
  <section id="work" className="py-20 border-y border-slate-900 bg-black">
    <div className="container mx-auto px-6 mb-10 flex justify-between items-end">
      <div>
        <h2 className="text-3xl font-bold text-white">Recent Transformations</h2>
        <p className="text-slate-500">See how we modernized these local businesses.</p>
      </div>
      <a
        href="/case-studies"
        className="text-cyan-400 hover:text-cyan-300 font-bold text-sm transition-colors"
      >
        View All Case Studies &rarr;
      </a>
    </div>
    <div className="flex gap-4 overflow-x-auto pb-8 px-6 scrollbar-hide">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="min-w-[300px] md:min-w-[400px] aspect-video bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden relative group">
          <img
            src={`https://picsum.photos/800/600?random=${i}`}
            alt={`Website transformation project ${i} - Before and after website redesign`}
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
);

const App: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-cyan-500/30">
      <Navbar />

      <Suspense fallback={<PageLoader />}>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/seo" element={
          <>
            <SEO
              title="Local SEO Services in Richland, WA"
              description="Get found on Google! Digital Helper provides expert local SEO services for Richland and Tri-Cities businesses. Improve rankings, increase traffic, and dominate local search."
              keywords="local SEO Richland WA, SEO services Tri-Cities, Google ranking optimization, local search marketing"
              canonicalUrl="https://digital-helper.com/seo"
            />
            <SEOPage />
          </>
        } />
        <Route path="/web-design" element={
          <>
            <SEO
              title="Web Design Services | Richland, WA"
              description="Professional web design services in Richland, WA. We create modern, mobile-first websites that convert visitors into customers. Serving Tri-Cities businesses."
              keywords="web design Richland, website design Tri-Cities, responsive web design, mobile-first design"
              canonicalUrl="https://digital-helper.com/web-design"
            />
            <WebDesignPage />
          </>
        } />
        <Route path="/ai-agency" element={
          <>
            <SEO
              title="AI-Powered Web Solutions | Digital Helper"
              description="Harness the power of AI for your business website. Automated content generation, smart chatbots, and intelligent web solutions for Richland businesses."
              keywords="AI web design, AI content generation, chatbot development, AI business solutions"
              canonicalUrl="https://digital-helper.com/ai-agency"
            />
            <AIAgencyPage />
          </>
        } />
        <Route path="/case-studies" element={
          <>
            <SEO
              title="Case Studies & Portfolio | Digital Helper"
              description="See our portfolio of successful website transformations. Real results for Richland and Tri-Cities businesses - improved rankings, more leads, faster sites."
              keywords="web design portfolio, case studies, website redesign results, before and after websites"
              canonicalUrl="https://digital-helper.com/case-studies"
            />
            <CaseStudiesPage />
          </>
        } />
        <Route path="/pricing" element={
          <>
            <SEO
              title="Web Design Pricing | Digital Helper Richland, WA"
              description="Transparent pricing for web design services in Richland, WA. Packages starting at $3,000. Complete website modernization with no hidden fees."
              keywords="web design pricing, website cost Richland, affordable web design, web design packages"
              canonicalUrl="https://digital-helper.com/pricing"
            />
            <Pricing />
          </>
        } />
        <Route path="/features" element={
          <>
            <SEO
              title="Website Features & Services | Digital Helper"
              description="Explore our comprehensive web design features: mobile optimization, AI integration, Google Business sync, speed optimization, and more."
              keywords="website features, web design services, mobile optimization, website speed, AI integration"
              canonicalUrl="https://digital-helper.com/features"
            />
            <Features />
            <Testimonials />
          </>
        } />
        </Routes>
      </Suspense>

      <RevealOnScroll>
        <Contact />
      </RevealOnScroll>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;
