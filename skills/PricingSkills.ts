import { Skill, AgentResult } from '../agents/types';

export const generatePricingSkill: Skill = {
  name: 'generate-pricing',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { theme } = params as { theme?: string };

    // Generate pricing based on theme
    const pricingVariants = {
      default: {
        highlighted: 'professional',
        accentColor: 'cyan'
      },
      purple: {
        highlighted: 'professional',
        accentColor: 'purple'
      },
      custom: {
        highlighted: 'enterprise',
        accentColor: 'emerald'
      }
    };

    const variant = pricingVariants[theme as keyof typeof pricingVariants] || pricingVariants.default;

    return {
      success: true,
      data: variant
    };
  },
  validate: (params: unknown) => {
    return typeof params === 'object' && params !== null;
  }
};

export const calculateDiscountSkill: Skill = {
  name: 'calculate-discount',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { price, discountPercent } = params as { price: number; discountPercent: number };

    if (typeof price !== 'number' || typeof discountPercent !== 'number') {
      return { success: false, error: 'Invalid parameters' };
    }

    const discounted = price * (1 - discountPercent / 100);
    const savings = price - discounted;

    return {
      success: true,
      data: {
        originalPrice: price,
        discountedPrice: Math.round(discounted),
        savings: Math.round(savings),
        discountPercent
      }
    };
  },
  validate: (params: unknown) => {
    const p = params as { price: number; discountPercent: number };
    return (
      typeof p === 'object' &&
      typeof p.price === 'number' &&
      typeof p.discountPercent === 'number' &&
      p.discountPercent >= 0 &&
      p.discountPercent <= 100
    );
  }
};

export const comparePlansSkill: Skill = {
  name: 'compare-plans',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { plan1, plan2 } = params as { plan1: string; plan2: string };

    // Comparison logic
    const comparisons = {
      'starter-vs-professional': {
        mainDifference: 'Professional includes AI chatbot and analytics',
        recommendation: 'professional',
        savingsPercent: 0
      },
      'professional-vs-enterprise': {
        mainDifference: 'Enterprise includes unlimited pages and dedicated support',
        recommendation: 'enterprise',
        savingsPercent: 0
      }
    };

    const key = `${plan1}-vs-${plan2}`;
    const comparison = comparisons[key as keyof typeof comparisons];

    return {
      success: true,
      data: comparison || { mainDifference: 'Plans differ in features and support level' }
    };
  }
};
