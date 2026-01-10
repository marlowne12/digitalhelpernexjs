import React from 'react';
import { Bot, Sparkles, Zap, Brain, MessageSquare, LineChart, Cpu, Workflow, CheckCircle2 } from 'lucide-react';

export const AIAgencyPage: React.FC = () => {
    return (
        <div className="pt-24 min-h-screen bg-slate-950 text-white selection:bg-pink-500/30">
            <div className="container mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-900/30 border border-pink-800 text-pink-400 text-xs font-semibold mb-6 animate-fade-in-up">
                        <Bot size={12} /> The Future of Local Business
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Automate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-500">Agency Growth</span>
                    </h1>
                    <p className="text-slate-400 text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Stop wasting hours on repetitive tasks. We deploy custom AI agents and automated workflows that handle lead gen, content, and customer support while you sleep.
                    </p>
                </div>

                {/* AI Workflow Showcase */}
                <div className="mb-24 relative group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="absolute -inset-4 bg-gradient-to-r from-pink-600/20 to-violet-600/20 rounded-3xl blur-2xl group-hover:opacity-100 transition duration-500 opacity-0"></div>
                    <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                        <img
                            src="/assets/ai_workflows.png"
                            alt="AI Automation Workflows"
                            className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-lg">
                            <div className="flex items-center gap-2 text-pink-400 font-bold mb-2">
                                <Workflow size={24} />
                                <span className="text-2xl">Intelligent Workflows</span>
                            </div>
                            <p className="text-slate-300 text-sm md:text-base italic">"Our automation systems replace up to 40 hours of manual labor per week for local service businesses."</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    {/* Automation Pillars */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Core AI Services</h2>
                        {[
                            {
                                icon: <Sparkles className="text-yellow-400" />,
                                title: "AI Content Generation",
                                desc: "Perfectly crafted blog posts, social media updates, and ad copy. We train AI on your brand's unique voice for consistent excellence."
                            },
                            {
                                icon: <MessageSquare className="text-pink-400" />,
                                title: "24/7 Smart Appointment Setting",
                                desc: "Our AI chat agents qualify leads and book meetings directly into your calendar. Never miss a midnight inquiry again."
                            },
                            {
                                icon: <Brain className="text-violet-400" />,
                                title: "Lead Nurturing Automations",
                                desc: "Personalized email and SMS follow-up sequences that move prospects through your funnel with zero manual effort."
                            },
                            {
                                icon: <LineChart className="text-cyan-400" />,
                                title: "GMB Question & Answer AI",
                                desc: "Instantly respond to questions on your Google Business Profile, boosting local engagement and Maps rankings."
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-900/30 border border-slate-800/50 hover:border-pink-500/30 transition-all group">
                                <div className="mt-1 p-3 bg-slate-950 rounded-xl border border-slate-800 h-fit group-hover:bg-slate-900 transition-colors">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-1 text-white group-hover:text-pink-300 transition-colors">{item.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Neural Visualizer */}
                    <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-violet-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl p-8 flex flex-col justify-center items-center min-h-[400px]">
                            <div className="grid grid-cols-3 gap-8 relative">
                                {/* Connecting Lines (CSS-only decoration) */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <div className="w-full h-px bg-white"></div>
                                    <div className="w-px h-full bg-white absolute"></div>
                                </div>

                                {[Bot, Cpu, Brain, Zap, Workflow, Sparkles].map((Icon, idx) => (
                                    <div key={idx} className="relative z-10 w-16 h-16 bg-slate-950 rounded-full border border-pink-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.3)] animate-pulse" style={{ animationDelay: `${idx * 0.2}s` }}>
                                        <Icon className="text-pink-400" size={32} />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-12 text-center">
                                <div className="text-pink-400 font-mono text-sm mb-2">ANALYZING WORKFLOWS...</div>
                                <div className="h-1.5 w-48 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-pink-500 w-1/2 animate-loading-bar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Integration Section */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">Seamless Ecosystem</h2>
                    <p className="text-slate-400 mb-12">We integrate AI directly into the tools you already use.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['Google Business', 'Facebook Ads', 'Gmail / Outlook', 'Zapier / Make'].map((tool) => (
                            <div key={tool} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center gap-3">
                                <CheckCircle2 size={16} className="text-pink-400" />
                                <span className="text-sm font-semibold">{tool}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-loading-bar {
          animation: loading-bar 2s infinite linear;
        }
      `}</style>
        </div>
    );
};
