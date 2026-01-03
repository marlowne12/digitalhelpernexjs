import React, { useState } from 'react';
import { Sparkles, Search, CheckCircle2, ArrowRight, MapPin, ExternalLink, Loader2, Image as ImageIcon } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { BusinessAuditResult } from '../types';

export const WebsiteAudit: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<BusinessAuditResult | null>(null);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !location) return;

    setLoading(true);
    setResult(null);
    setHeroImage(null);
    
    try {
      // Run both tasks in parallel for speed
      const [auditResult, imageResult] = await Promise.all([
        geminiService.analyzeBusinessWithMaps(businessName, location),
        geminiService.generateCaseStudyImage(businessName + " " + location) // Use inputs as prompt hint
      ]);
      
      setResult(auditResult);
      setHeroImage(imageResult);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-900/10 blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          <div className="lg:w-5/12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-6">
              <Sparkles size={12} /> AI Lead Finder & Demo Gen
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              See Your Business <br/>
              <span className="text-cyan-400">Through AI Eyes</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Enter your business name. We'll find your Google Maps data and instantly generate a modern website concept for you.
            </p>
            
            <form onSubmit={handleAudit} className="space-y-4 max-w-md">
              <div>
                <label className="text-sm font-medium text-slate-300 ml-1">Business Name</label>
                <input 
                  type="text" 
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Joe's Pizza"
                  className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 ml-1">City / Location</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Richland, WA"
                  className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 className="animate-spin" /> Analyzing...</>
                ) : (
                  <>Generate Instant Demo <Search size={18} /></>
                )}
              </button>
            </form>
          </div>

          <div className="lg:w-7/12 w-full">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl min-h-[500px] flex flex-col relative overflow-hidden">
               {/* Decorative Grid */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

               {!result && !loading && (
                 <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 z-10">
                    <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-slate-800">
                      <Sparkles size={32} className="text-slate-600" />
                    </div>
                    <h3 className="text-xl font-medium text-slate-300 mb-2">Ready to be impressed?</h3>
                    <p className="max-w-xs">We will fetch your live Google Maps info and build a custom hero image.</p>
                 </div>
               )}

               {loading && (
                 <div className="flex-1 flex flex-col items-center justify-center z-10 space-y-6">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <MapPin size={24} className="text-cyan-500 animate-bounce" />
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-white font-medium mb-1">Connecting to Google Maps...</p>
                        <p className="text-cyan-400 text-sm">Generating Website Concept...</p>
                    </div>
                 </div>
               )}

               {result && (
                 <div className="animate-fade-in z-10 h-full flex flex-col">
                    {/* Maps Data Header */}
                    <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700 mb-6 flex items-start gap-4">
                        <div className="bg-red-500/10 p-3 rounded-lg text-red-500 shrink-0">
                            <MapPin size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-white text-lg">{businessName}</h3>
                            {result.mapLink && (
                                <a 
                                    href={result.mapLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mb-2"
                                >
                                    View on Maps <ExternalLink size={10} />
                                </a>
                            )}
                            <div className="prose prose-invert prose-sm max-w-none text-slate-300 text-sm whitespace-pre-wrap font-medium">
                                {result.analysis}
                            </div>
                        </div>
                    </div>

                    {/* AI Demo Preview */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                             <ImageIcon size={16} className="text-purple-400" />
                             <span className="text-sm font-bold text-white">Your Future Homepage</span>
                             <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">AI Generated</span>
                        </div>
                        
                        <div className="flex-1 relative rounded-xl overflow-hidden border border-slate-700 group bg-black">
                            {heroImage ? (
                                <>
                                    <img src={heroImage} alt="AI Generated Demo" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                                            <h4 className="text-xl font-bold text-white mb-1">Modernize {businessName}</h4>
                                            <p className="text-sm text-slate-200">This could be your new first impression. Fast, beautiful, and connected.</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-500">
                                    Image Generation Failed
                                </div>
                            )}
                        </div>

                        <div className="mt-6 text-center">
                            <a href="#contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-blue-900/20">
                                Claim This Design <ArrowRight size={18} />
                            </a>
                        </div>
                    </div>
                 </div>
               )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
