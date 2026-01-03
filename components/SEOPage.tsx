import React from 'react';
import { Search, TrendingUp, MapPin, Target, BarChart, Globe, Activity } from 'lucide-react';

export const SEOPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-slate-950 text-white selection:bg-green-500/30">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-6 animate-fade-in-up">
            <Search size={12} /> Local SEO Experts
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Dominate <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500">Richland Search Results</span>
          </h1>
          <p className="text-slate-400 text-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Being invisible on Google is costing you money. We specialize in Local SEO for Tri-Cities businesses, ensuring your neighbors find YOU when they need your services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          {[
            {
              icon: <MapPin className="text-red-400" size={32} />,
              title: "Google Business Profile",
              desc: "We optimize your Maps listing to ensure you show up in the 'Local Pack' (the top 3 map results).",
              color: "hover:border-red-500/30"
            },
            {
              icon: <Target className="text-cyan-400" size={32} />,
              title: "Local Keywords",
              desc: "We target terms like 'Best Plumber in Richland' rather than just generic 'Plumber' terms.",
               color: "hover:border-cyan-500/30"
            },
            {
              icon: <BarChart className="text-green-400" size={32} />,
              title: "Monthly Reporting",
              desc: "Transparent analytics. See exactly how many phone calls and clicks our work is generating.",
               color: "hover:border-green-500/30"
            }
          ].map((item, i) => (
            <div key={i} className={`bg-slate-900/40 p-8 rounded-2xl border border-slate-800 ${item.color} transition-colors backdrop-blur-sm group`}>
              <div className="mb-4 bg-slate-950 w-fit p-3 rounded-xl border border-slate-800 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative">
           {/* Background Grid */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>

           <div className="md:w-1/2 relative z-10">
             <h2 className="text-3xl font-bold mb-4">Why Local SEO Matters</h2>
             <ul className="space-y-4">
                {[
                    "46% of all Google searches are seeking local information.",
                    "72% of consumers that did a local search visited a store within 5 miles.",
                    "88% of searches for local businesses on a mobile device either call or visit the business within 24 hours."
                ].map((stat, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                        <div className="mt-1 shrink-0 p-1 bg-green-500/10 rounded-full">
                            <Activity size={16} className="text-green-400" />
                        </div>
                        <span>{stat}</span>
                    </li>
                ))}
             </ul>
           </div>
           
           {/* Animated Chart Visual */}
           <div className="md:w-1/2 relative w-full">
             <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full"></div>
             <div className="relative bg-slate-800/80 p-6 rounded-xl border border-slate-700 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-600 pb-4">
                    <Globe size={18} className="text-slate-400" />
                    <div className="h-2 w-32 bg-slate-600 rounded"></div>
                    <div className="ml-auto flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                </div>
                
                {/* Simulated Chart Bars */}
                <div className="flex items-end gap-2 h-40 mb-4 px-2">
                    {[30, 45, 35, 60, 50, 75, 65, 90, 80, 100].map((h, i) => (
                        <div key={i} className="flex-1 bg-slate-700/50 rounded-t relative group overflow-hidden" style={{height: `${h}%`}}>
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-cyan-600 to-green-400 transition-all duration-1000" style={{height: '0%', animation: `fillBar 1s ease-out ${i * 0.1}s forwards`}}></div>
                        </div>
                    ))}
                </div>
                
                {/* Chart Key */}
                <div className="flex justify-between text-xs text-slate-500 px-2 font-mono">
                    <span>JAN</span>
                    <span>JUN</span>
                    <span>DEC</span>
                </div>
                
                {/* Floating Stat */}
                <div className="absolute -right-4 top-20 bg-slate-900 border border-green-500/30 p-3 rounded-lg shadow-xl animate-float">
                    <div className="flex items-center gap-2 text-green-400 font-bold text-lg">
                        <TrendingUp size={20} />
                        +420%
                    </div>
                    <div className="text-xs text-slate-400">Traffic Growth</div>
                </div>
             </div>
           </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fillBar {
            from { height: 0%; }
            to { height: 100%; }
        }
      `}</style>
    </div>
  );
};