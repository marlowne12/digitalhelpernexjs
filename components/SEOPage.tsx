import React from 'react';
import { Search, TrendingUp, MapPin, Target, BarChart, Globe, Activity, CheckCircle2, Megaphone, Star, ShieldCheck } from 'lucide-react';

export const SEOPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-slate-950 text-white selection:bg-green-500/30">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-6 animate-fade-in-up">
            <Search size={12} /> Local SEO Experts
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Dominate <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500">Local Search</span>
          </h1>
          <p className="text-slate-400 text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Being invisible on Google is costing you money. We specialize in Local SEO for Tri-Cities businesses, ensuring your neighbors find YOU when they need your services.
          </p>
        </div>

        {/* Analytics Showcase */}
        <div className="mb-24 relative group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600/20 to-green-600/20 rounded-3xl blur-2xl group-hover:opacity-100 transition duration-500 opacity-0"></div>
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
            <img
              src="/assets/seo_analytics.png"
              alt="SEO Analytics Dashboard"
              className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-lg">
              <div className="flex items-center gap-2 text-green-400 font-bold mb-2">
                <TrendingUp size={24} />
                <span className="text-2xl">Proven Ranking Power</span>
              </div>
              <p className="text-slate-300 text-sm md:text-base italic">"Our clients see an average of 145% increase in organic leads within the first 6 months."</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {[
            {
              icon: <MapPin className="text-red-400" size={32} />,
              title: "Maps Domination",
              desc: "We optimize your Google Business Profile to hit the 'Local Pack' top 3, driving immediate phone calls.",
              color: "group-hover:border-red-500/30"
            },
            {
              icon: <Target className="text-cyan-400" size={32} />,
              title: "Precision Targeting",
              desc: "We target high-intent keywords like 'Best Web Design Richland' to find customers ready to buy.",
              color: "group-hover:border-cyan-500/30"
            },
            {
              icon: <BarChart className="text-green-400" size={32} />,
              title: "Transparent ROI",
              desc: "No vanity metrics. We track actual calls, form fills, and revenue growth with custom dashboards.",
              color: "group-hover:border-green-500/30"
            }
          ].map((item, i) => (
            <div key={i} className={`bg-slate-900/40 p-8 rounded-3xl border border-slate-800 ${item.color} transition-all duration-300 backdrop-blur-sm group hover:-translate-y-2`}>
              <div className="mb-6 bg-slate-950 w-fit p-4 rounded-2xl border border-slate-800 group-hover:bg-slate-900 transition-colors">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Strategy Breakdown */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-10 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative mb-24">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>

          <div className="lg:w-1/2 relative z-10">
            <h2 className="text-3xl font-bold mb-6">The Multi-Channel Edge</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">Local SEO isn't just about keywords anymore. It's about authority, reputation, and technical excellence.</p>
            <div className="space-y-4">
              {[
                { icon: <Star className="text-yellow-400" />, text: "Automated Review Management" },
                { icon: <Megaphone className="text-purple-400" />, text: "Local Backlink Building" },
                { icon: <Globe className="text-cyan-400" />, text: "Schema Markup Implementation" },
                { icon: <ShieldCheck className="text-green-400" />, text: "Technical SEO Audits" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-950/50 rounded-xl border border-slate-800 group hover:border-cyan-500/30 transition-colors">
                  <div className="shrink-0 p-2 bg-slate-900 rounded-lg">
                    {stat.icon}
                  </div>
                  <span className="text-slate-200 font-medium">{stat.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative w-full">
            <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full"></div>
            <div className="relative bg-slate-900/80 p-8 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-md">
              <h4 className="text-cyan-400 font-bold mb-6 flex items-center gap-2">
                <Activity size={20} />
                Live Ranking Simulator
              </h4>

              <div className="space-y-6">
                {[
                  { label: "Richland", value: 98, color: "bg-green-500" },
                  { label: "Kennewick", value: 92, color: "bg-cyan-500" },
                  { label: "Pasco", value: 87, color: "bg-emerald-500" }
                ].map((city, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-400">{city.label} Coverage</span>
                      <span className="text-white font-bold">{city.value}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${city.color} transition-all duration-1000`} style={{ width: `${city.value}%`, animation: `growWidth 1.5s ease-out ${i * 0.2}s forwards` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-800 grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">#1</div>
                  <div className="text-[10px] text-slate-500">AVG. RANKING</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-[10px] text-slate-500">MONITORING</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Local Impact */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-12 text-center relative overflow-hidden">
          <h2 className="text-3xl font-bold mb-12">Why Tri-Cities Chooses Us</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              "No Long-Term Contracts",
              "Monthly Data-Driven Strategy",
              "Dedicated Local Account Manager",
              "Verified Google Partner"
            ].map((feature, i) => (
              <div key={feature} className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800 flex items-center justify-center gap-3">
                <CheckCircle2 size={18} className="text-green-400 shrink-0" />
                <span className="text-sm font-semibold">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes growWidth {
            from { width: 0%; }
        }
      `}</style>
    </div>
  );
};