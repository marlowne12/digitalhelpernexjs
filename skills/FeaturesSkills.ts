import { Skill, AgentResult, Feature } from '../agents/types';

export const listFeaturesSkill: Skill = {
  name: 'list-features',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { category, limit } = params as { category?: string; limit?: number };

    // Mock feature data - in production, this would come from a database
    const allFeatures: Feature[] = [
      {
        id: 'responsive',
        title: 'Responsive Design',
        description: 'Works perfectly on all devices',
        icon: 'Smartphone',
        category: 'Design'
      },
      {
        id: 'seo',
        title: 'SEO Optimized',
        description: 'Rank higher in search results',
        icon: 'TrendingUp',
        category: 'Marketing'
      },
      {
        id: 'fast',
        title: 'Lightning Fast',
        description: 'Sub-second load times',
        icon: 'Zap',
        category: 'Performance'
      }
    ];

    let filtered = category
      ? allFeatures.filter(f => f.category === category)
      : allFeatures;

    if (limit) {
      filtered = filtered.slice(0, limit);
    }

    return {
      success: true,
      data: filtered
    };
  }
};

export const categorizeFeaturesSkill: Skill = {
  name: 'categorize-features',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { features } = params as { features: Feature[] };

    const categorized = features.reduce((acc, feature) => {
      const cat = feature.category || 'Other';
      if (!acc[cat]) {
        acc[cat] = [];
      }
      acc[cat].push(feature);
      return acc;
    }, {} as Record<string, Feature[]>);

    return {
      success: true,
      data: categorized
    };
  }
};

export const highlightFeatureSkill: Skill = {
  name: 'highlight-feature',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { featureId, features } = params as { featureId: string; features: Feature[] };

    const feature = features.find(f => f.id === featureId);

    if (!feature) {
      return { success: false, error: 'Feature not found' };
    }

    return {
      success: true,
      data: {
        ...feature,
        highlighted: true
      }
    };
  }
};
