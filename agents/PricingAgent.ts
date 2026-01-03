import { BaseAgent, AgentConfig, AgentContext, AgentResult, PricingData, PricingTier } from './types';

export class PricingAgent extends BaseAgent {
  private pricingData: PricingData;

  constructor() {
    const config: AgentConfig = {
      id: 'pricing-agent',
      name: 'Pricing Agent',
      description: 'Manages pricing tiers, packages, and generates pricing presentations',
      capabilities: [
        'Generate pricing tiers',
        'Calculate discounts',
        'Compare packages',
        'Custom pricing generation'
      ],
      skills: ['generate-pricing', 'calculate-discount', 'customize-tier']
    };

    super(config);

    this.pricingData = {
      tiers: this.getDefaultTiers(),
      currency: 'USD',
      disclaimer: 'All prices are subject to change. Custom packages available.'
    };
  }

  async initialize(): Promise<void> {
    // Load pricing skills
    await this.loadSkills();
  }

  async execute(context: AgentContext): Promise<AgentResult<PricingData>> {
    try {
      // Generate context-aware pricing
      const customizedPricing = await this.customizePricing(context);

      return {
        success: true,
        data: customizedPricing,
        metadata: {
          theme: context.theme || 'default',
          generatedAt: new Date().toISOString()
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private getDefaultTiers(): PricingTier[] {
    return [
      {
        id: 'starter',
        name: 'Starter',
        price: 1999,
        period: 'one-time',
        features: [
          '5-page responsive website',
          'Mobile-first design',
          'Basic SEO optimization',
          'Contact form integration',
          '30 days support'
        ],
        cta: 'Get Started'
      },
      {
        id: 'professional',
        name: 'Professional',
        price: 3999,
        period: 'one-time',
        features: [
          'Up to 10 pages',
          'Custom design & branding',
          'Advanced SEO optimization',
          'Google Business integration',
          'AI chatbot integration',
          'Analytics dashboard',
          '90 days support'
        ],
        highlighted: true,
        cta: 'Most Popular'
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 7999,
        period: 'one-time',
        features: [
          'Unlimited pages',
          'Custom features & integrations',
          'E-commerce capabilities',
          'Advanced analytics',
          'Priority support',
          'Monthly performance reports',
          '1 year support & updates',
          'Dedicated account manager'
        ],
        cta: 'Contact Us'
      }
    ];
  }

  private async loadSkills(): Promise<void> {
    // Register pricing-related skills
    this.registerSkill({
      name: 'generate-pricing',
      execute: async (params: unknown) => {
        return {
          success: true,
          data: this.pricingData
        };
      }
    });

    this.registerSkill({
      name: 'calculate-discount',
      execute: async (params: unknown) => {
        const { tierId, discountPercent } = params as { tierId: string; discountPercent: number };
        const tier = this.pricingData.tiers.find(t => t.id === tierId);

        if (!tier) {
          return { success: false, error: 'Tier not found' };
        }

        const discountedPrice = tier.price * (1 - discountPercent / 100);

        return {
          success: true,
          data: {
            original: tier.price,
            discounted: discountedPrice,
            savings: tier.price - discountedPrice
          }
        };
      }
    });
  }

  private async customizePricing(context: AgentContext): Promise<PricingData> {
    // Customize pricing based on context (e.g., user preferences, current page)
    return {
      ...this.pricingData,
      tiers: this.pricingData.tiers.map(tier => ({
        ...tier,
        // Add theme-specific styling hints
        highlighted: context.theme === 'purple' ? tier.highlighted : tier.id === 'professional'
      }))
    };
  }

  getPricingData(): PricingData {
    return this.pricingData;
  }
}
