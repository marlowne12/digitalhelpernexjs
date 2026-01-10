import React from 'react';
import { Layout, Smartphone, Zap, Palette, Code2, Layers, Cpu, Database, CheckCircle2, Globe, Clock, ShieldCheck } from 'lucide-react';

export const WebDesignPage: React.FC = () => {
    return (
        <div className="pt-24 min-h-screen bg-slate-950 text-white selection:bg-purple-500/30">
            <div className="container mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-800 text-purple-400 text-xs font-semibold mb-6 animate-fade-in-up">
                        <Layout size={12} /> Custom Design & Development
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Websites That <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Scale Your Business</span>
                    </h1>
                    <p className="text-slate-400 text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Your website is your 24/7 salesperson. We build lightning-fast, high-converting digital experiences that turn Richland prospects into lifelong customers.
                    </p>
                </div>

                {/* Main Showcase Image */}
                <div className="mb-24 relative group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl group-hover:opacity-100 transition duration-500 opacity-0"></div>
                    <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                        <img
                            src="/assets/web_design_showcase.png"
                            alt="Web Design Showcase"
                            className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-md">
                            <h3 className="text-2xl font-bold mb-2">Multi-Device Excellence</h3>
                            <p className="text-slate-300 text-sm md:text-base">We ensure your brand looks premium on desktops, tablets, and phones alike.</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    {/* Tech Stack Breakdown */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold mb-6">Built for Performance</h2>
                        {[
                            {
                                icon: <Zap className="text-yellow-400" />,
                                title: "Sub-Second Load Times",
                                desc: "Using Next.js and React, we achieve perfect Lighthouse scores. Every millisecond saved is a customer won."
                            },
                            {
                                icon: <Smartphone className="text-purple-400" />,
                                title: "Mobile-First Architecture",
                                desc: "68% of local searches happen on mobile. Our sites are designed for thumbs first, cursors second."
                            },
                            {
                                icon: <Clock className="text-cyan-400" />,
                                title: "Automated Maintenance",
                                desc: "Continuous updates and security patches mean your site stays fast and secure without you lifting a finger."
                            },
                            {
                                icon: <ShieldCheck className="text-green-400" />,
                                title: "Enterprise Security",
                                desc: "Bank-grade SSL, DDoS protection, and secure CMS integrations protect your data and your reputation."
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-900/50 transition-colors group">
                                <div className="mt-1 p-3 bg-slate-900 rounded-xl border border-slate-800 h-fit group-hover:border-purple-500/30 transition-colors">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-1 text-white group-hover:text-purple-300 transition-colors">{item.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dynamic Code Visual */}
                    <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl h-[450px] flex flex-col font-mono text-sm">
                            <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                </div>
                                <div className="text-xs text-slate-500 ml-2">App.tsx</div>
                            </div>
                            <div className="p-6 text-slate-400 overflow-hidden">
                                <div className="flex gap-4">
                                    <span className="text-slate-600 select-none">1</span>
                                    <span className="text-purple-400">export const</span> <span className="text-cyan-400">DigitalHelper</span> = () =&gt; &#123;
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600 select-none">2</span>
                                    <span className="ml-4 text-purple-400">const</span> [growth, setGrowth] = <span className="text-yellow-400">useState</span>(100);
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600 select-none">3</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600 select-none">4</span>
                                    <span className="ml-4 text-slate-500">// Trigger local business transformation</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600 select-none">5</span>
                                    <span className="ml-4 text-yellow-400">useEffect</span>(() =&gt; &#123;
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600 select-none">6</span>
                                    <span className="ml-8 text-cyan-400">optimizeSpeed</span>();
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600 select-none">7</span>
                                    <span className="ml-8 text-cyan-400">boostSEO</span>('Richland');
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600 select-none">8</span>
                                    <span className="ml-4 text-white">&#125;, []);</span>
                                </div>
                                <div className="mt-8 grid grid-cols-2 gap-4">
                                    <div className="h-32 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                                        <Globe className="text-purple-400 animate-spin-slow" size={40} />
                                    </div>
                                    <div className="h-32 bg-slate-800 rounded-lg flex flex-col items-center justify-center border border-slate-700 p-4">
                                        <div className="text-green-400 font-bold text-2xl">+145%</div>
                                        <div className="text-[10px] text-slate-500">CONVERSION BOOST</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Process Section */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Our Modern Workflow</h2>
                        <p className="text-slate-400 italic">"We handle the technology so you can handle the business."</p>
                    </div>

                    <div className="relative z-10 grid md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Strategy Call", desc: "We identify your unique goals and target audience in Tri-Cities." },
                            { step: "02", title: "Visual Prototyping", desc: "You approve a interactive design mockup before we write a single line of code." },
                            { step: "03", title: "Agile Development", desc: "Your site is built with SEO and speed as core fundamentals, not afterthoughts." },
                            { step: "04", title: "Go-Live & Growth", desc: "We launch, monitor, and continuously optimize for maximum ROI." }
                        ].map((s, i) => (
                            <div key={i} className="relative group">
                                <div className="text-6xl font-black text-slate-800/20 absolute -top-8 left-1/2 -translate-x-1/2 select-none group-hover:text-purple-600/10 transition-colors">{s.step}</div>
                                <div className="w-full h-px bg-slate-800 mb-6 group-hover:bg-purple-500 transition-colors"></div>
                                <h3 className="text-xl font-bold text-white relative z-10 mb-2 group-hover:text-purple-400 transition-colors">{s.title}</h3>
                                <p className="text-sm text-slate-400 relative z-10">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
        </div>
    );
};