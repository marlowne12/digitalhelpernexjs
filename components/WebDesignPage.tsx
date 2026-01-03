import React from 'react';
import { Layout, Smartphone, Zap, Palette, Code2, Layers, Cpu, Database } from 'lucide-react';

export const WebDesignPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-slate-950 text-white selection:bg-purple-500/30">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center max-w-4xl mx-auto mb-16">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-800 text-purple-400 text-xs font-semibold mb-6 animate-fade-in-up">
            <Layout size={12} /> Custom Design & Development
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Websites That <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Sell Your Services</span>
          </h1>
          <p className="text-slate-400 text-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Your website is your 24/7 salesperson. If it looks like it was built in 2010, you are losing trust. We build lightning-fast, modern websites using the latest technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
             {/* Tech Stack Visual */}
             <div className="relative group animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl h-[400px] flex flex-col">
                    {/* Mock Code Editor Header */}
                    <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <div className="text-xs text-slate-500 font-mono ml-2">website.tsx</div>
                    </div>
                    {/* Mock Content */}
                    <div className="p-6 relative flex-1">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(168,85,247,0.1),transparent_70%)]"></div>
                        <div className="grid grid-cols-2 gap-4 h-full">
                             <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 backdrop-blur-sm flex flex-col justify-between group/card hover:border-purple-500/50 transition-colors">
                                <Cpu className="text-purple-400 mb-2" />
                                <div className="space-y-2">
                                    <div className="h-2 w-16 bg-purple-500/20 rounded"></div>
                                    <div className="h-2 w-24 bg-slate-700 rounded"></div>
                                </div>
                             </div>
                             <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 backdrop-blur-sm flex flex-col justify-between mt-8 group/card hover:border-pink-500/50 transition-colors">
                                <Database className="text-pink-400 mb-2" />
                                <div className="space-y-2">
                                    <div className="h-2 w-16 bg-pink-500/20 rounded"></div>
                                    <div className="h-2 w-20 bg-slate-700 rounded"></div>
                                </div>
                             </div>
                             <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 backdrop-blur-sm flex flex-col justify-between -mt-8 group/card hover:border-cyan-500/50 transition-colors">
                                <Layers className="text-cyan-400 mb-2" />
                                <div className="space-y-2">
                                    <div className="h-2 w-16 bg-cyan-500/20 rounded"></div>
                                    <div className="h-2 w-24 bg-slate-700 rounded"></div>
                                </div>
                             </div>
                             <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 backdrop-blur-sm flex flex-col justify-between mt-4 group/card hover:border-green-500/50 transition-colors">
                                <Zap className="text-green-400 mb-2" />
                                <div className="space-y-2">
                                    <div className="h-2 w-16 bg-green-500/20 rounded"></div>
                                    <div className="h-2 w-20 bg-slate-700 rounded"></div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
             </div>
             
             <div className="space-y-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                {[
                    {
                        icon: <Zap className="text-yellow-400" />,
                        title: "Lightning Fast Speed",
                        desc: "We use Next.js and React. Sites load in milliseconds, not seconds. Google loves speed, and so do your customers."
                    },
                    {
                        icon: <Palette className="text-purple-400" />,
                        title: "Brand-Aligned Aesthetics",
                        desc: "No cookie-cutter templates. We design a digital identity that matches the quality of your physical business."
                    },
                    {
                        icon: <Code2 className="text-cyan-400" />,
                        title: "Clean Code",
                        desc: "Built to scale. Secure, maintainable, and ready for future integrations like AI chatbots or booking systems."
                    }
                ].map((item, i) => (
                    <div key={i} className="flex gap-4 group">
                        <div className="mt-1 p-3 bg-slate-900 rounded-lg border border-slate-800 h-fit group-hover:border-purple-500/30 transition-colors">
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors">{item.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
             </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-950/50"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-12">Our Design Process</h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        { step: "01", title: "Discovery", desc: "We learn about your business goals and customers." },
                        { step: "02", title: "Design", desc: "We create high-fidelity mockups for your approval." },
                        { step: "03", title: "Develop", desc: "We code the site using modern, fast frameworks." },
                        { step: "04", title: "Launch", desc: "We handle hosting, domains, and go-live." }
                    ].map((s, i) => (
                        <div key={i} className="relative group">
                            <div className="text-6xl font-black text-slate-800/50 absolute -top-8 left-1/2 -translate-x-1/2 select-none group-hover:text-purple-900/20 transition-colors">{s.step}</div>
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6 group-hover:via-purple-500 transition-all"></div>
                            <h3 className="text-xl font-bold text-white relative z-10 mb-2">{s.title}</h3>
                            <p className="text-sm text-slate-400 relative z-10">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};