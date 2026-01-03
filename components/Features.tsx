import React, { useEffect, useState } from 'react';
import {
  Smartphone,
  TrendingUp,
  Zap,
  Brain,
  BarChart,
  Shield,
  Plug,
  Headphones
} from 'lucide-react';
import { agentOrchestrator } from '../agents/AgentOrchestrator';
import { Feature } from '../agents/types';

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone size={32} />,
  TrendingUp: <TrendingUp size={32} />,
  Zap: <Zap size={32} />,
  Brain: <Brain size={32} />,
  BarChart: <BarChart size={32} />,
  Shield: <Shield size={32} />,
  Plug: <Plug size={32} />,
  Headphones: <Headphones size={32} />
};

export const Features: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatures = async () => {
      try {
        await agentOrchestrator.initialize();
        const featuresAgent = agentOrchestrator.getFeaturesAgent();
        const result = await featuresAgent.execute({});

        if (result.success && result.data) {
          setFeatures(result.data);
        }
      } catch (error) {
        console.error('Failed to load features:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeatures();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Purple gradient background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950 pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
              Everything You Need to Succeed
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Powerful features designed to help your business grow and thrive in the digital age.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Icon */}
              <div className="mb-4 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 w-fit text-purple-400 group-hover:scale-110 transition-transform duration-300">
                {feature.icon && iconMap[feature.icon]}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                {feature.description}
              </p>

              {/* Category badge */}
              {feature.category && (
                <div className="mt-4 inline-block px-3 py-1 rounded-full bg-slate-800/50 text-purple-400 text-xs font-medium">
                  {feature.category}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <span className="text-purple-300">Want to see all features in action?</span>
            <button className="px-4 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-full text-sm font-medium transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
