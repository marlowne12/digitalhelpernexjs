import { BaseAgent, AgentConfig, AgentContext, AgentResult, Feature } from './types';

export class FeaturesAgent extends BaseAgent {
  private features: Feature[];

  constructor() {
    const config: AgentConfig = {
      id: 'features-agent',
      name: 'Features Agent',
      description: 'Manages feature showcases and capability presentations',
      capabilities: [
        'Generate feature lists',
        'Categorize features',
        'Create feature comparisons',
        'Dynamic feature highlighting'
      ],
      skills: ['list-features', 'categorize', 'highlight-feature']
    };

    super(config);

    this.features = this.getDefaultFeatures();
  }

  async initialize(): Promise<void> {
    await this.loadSkills();
  }

  async execute(context: AgentContext): Promise<AgentResult<Feature[]>> {
    try {
      const filteredFeatures = await this.getContextualFeatures(context);

      return {
        success: true,
        data: filteredFeatures,
        metadata: {
          total: this.features.length,
          filtered: filteredFeatures.length
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private getDefaultFeatures(): Feature[] {
    return [
      {
        id: 'responsive-design',
        title: 'Responsive Design',
        description: 'Pixel-perfect layouts that adapt seamlessly to any screen size',
        icon: 'Smartphone',
        category: 'Design'
      },
      {
        id: 'seo-optimization',
        title: 'SEO Optimization',
        description: 'Built-in SEO best practices to help you rank higher in search results',
        icon: 'TrendingUp',
        category: 'Marketing'
      },
      {
        id: 'lightning-fast',
        title: 'Lightning Fast',
        description: 'Optimized performance with sub-second load times',
        icon: 'Zap',
        category: 'Performance'
      },
      {
        id: 'ai-powered',
        title: 'AI-Powered',
        description: 'Intelligent chatbots and content generation using latest AI',
        icon: 'Brain',
        category: 'AI'
      },
      {
        id: 'analytics',
        title: 'Advanced Analytics',
        description: 'Track visitor behavior and conversion metrics in real-time',
        icon: 'BarChart',
        category: 'Analytics'
      },
      {
        id: 'security',
        title: 'Enterprise Security',
        description: 'SSL certificates, DDoS protection, and regular security updates',
        icon: 'Shield',
        category: 'Security'
      },
      {
        id: 'integrations',
        title: 'Easy Integrations',
        description: 'Connect with your favorite tools and platforms',
        icon: 'Plug',
        category: 'Integration'
      },
      {
        id: 'support',
        title: '24/7 Support',
        description: 'Round-the-clock assistance from our expert team',
        icon: 'Headphones',
        category: 'Support'
      }
    ];
  }

  private async loadSkills(): Promise<void> {
    this.registerSkill({
      name: 'list-features',
      execute: async (params: unknown) => {
        const { category } = params as { category?: string };

        const filtered = category
          ? this.features.filter(f => f.category === category)
          : this.features;

        return { success: true, data: filtered };
      }
    });

    this.registerSkill({
      name: 'categorize',
      execute: async () => {
        const categories = Array.from(new Set(this.features.map(f => f.category)));
        const categorized = categories.reduce((acc, cat) => {
          acc[cat || 'Other'] = this.features.filter(f => f.category === cat);
          return acc;
        }, {} as Record<string, Feature[]>);

        return { success: true, data: categorized };
      }
    });
  }

  private async getContextualFeatures(context: AgentContext): Promise<Feature[]> {
    // Return features based on context
    if (context.currentPage === 'pricing') {
      // Highlight value-focused features
      return this.features.filter(f =>
        ['ai-powered', 'analytics', 'support', 'security'].includes(f.id)
      );
    }

    return this.features;
  }

  getFeatures(): Feature[] {
    return this.features;
  }
}
