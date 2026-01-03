import { Skill, AgentResult, ThemeConfig } from '../agents/types';

export const applyThemeSkill: Skill = {
  name: 'apply-theme',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { themeName } = params as { themeName: string };

    const themes: Record<string, ThemeConfig> = {
      default: {
        primary: '#06b6d4',
        secondary: '#8b5cf6',
        accent: '#ec4899',
        background: '#020617',
        gradients: {
          hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          card: 'linear-gradient(to bottom right, rgba(255,255,255,0.05), transparent)',
          cta: 'linear-gradient(90deg, #06b6d4, #8b5cf6)'
        }
      },
      purple: {
        primary: '#a855f7',
        secondary: '#c084fc',
        accent: '#e879f9',
        background: '#0a0014',
        gradients: {
          hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          card: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
          cta: 'linear-gradient(90deg, #a855f7, #ec4899)'
        }
      }
    };

    const theme = themes[themeName] || themes.default;

    return {
      success: true,
      data: theme
    };
  }
};

export const generateGradientSkill: Skill = {
  name: 'generate-gradient',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { colors, angle } = params as { colors: string[]; angle?: number };

    if (!colors || colors.length < 2) {
      return { success: false, error: 'At least 2 colors required' };
    }

    const gradientAngle = angle || 135;
    const gradient = `linear-gradient(${gradientAngle}deg, ${colors.join(', ')})`;

    return {
      success: true,
      data: {
        gradient,
        colors,
        angle: gradientAngle
      }
    };
  },
  validate: (params: unknown) => {
    const p = params as { colors: string[] };
    return Array.isArray(p.colors) && p.colors.length >= 2;
  }
};

export const customizeColorsSkill: Skill = {
  name: 'customize-colors',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { baseColor } = params as { baseColor: string };

    // Generate a color scheme based on the base color
    // This is a simplified version - in production, you'd use a proper color theory library

    return {
      success: true,
      data: {
        primary: baseColor,
        secondary: baseColor, // Would calculate complementary color
        accent: baseColor, // Would calculate accent color
        light: baseColor, // Would calculate lighter shade
        dark: baseColor // Would calculate darker shade
      }
    };
  }
};
