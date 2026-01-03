import { BaseAgent, AgentConfig, AgentContext, AgentResult, ThemeConfig } from './types';

export class ThemeAgent extends BaseAgent {
  private themes: Map<string, ThemeConfig>;

  constructor() {
    const config: AgentConfig = {
      id: 'theme-agent',
      name: 'Theme Agent',
      description: 'Manages theme configurations and styling across the application',
      capabilities: [
        'Switch themes',
        'Generate color palettes',
        'Apply gradient styles',
        'Theme customization'
      ],
      skills: ['apply-theme', 'generate-gradient', 'customize-colors']
    };

    super(config);

    this.themes = new Map();
    this.initializeThemes();
  }

  async initialize(): Promise<void> {
    await this.loadSkills();
  }

  async execute(context: AgentContext): Promise<AgentResult<ThemeConfig>> {
    try {
      const themeName = context.theme || 'default';
      const theme = this.themes.get(themeName) || this.themes.get('default')!;

      return {
        success: true,
        data: theme,
        metadata: {
          themeName,
          available: Array.from(this.themes.keys())
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private initializeThemes(): void {
    // Default theme (current cyan/multi-color)
    this.themes.set('default', {
      primary: '#06b6d4', // cyan-500
      secondary: '#8b5cf6', // violet-500
      accent: '#ec4899', // pink-500
      background: '#020617', // slate-950
      gradients: {
        hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        card: 'linear-gradient(to bottom right, rgba(255,255,255,0.05), transparent)',
        cta: 'linear-gradient(90deg, #06b6d4, #8b5cf6)'
      }
    });

    // Purple theme (inspired by Xtract)
    this.themes.set('purple', {
      primary: '#a855f7', // purple-500
      secondary: '#c084fc', // purple-400
      accent: '#e879f9', // fuchsia-400
      background: '#0a0014', // darker purple-tinted black
      gradients: {
        hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        card: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
        cta: 'linear-gradient(90deg, #a855f7, #ec4899)'
      }
    });

    // Custom dark theme
    this.themes.set('custom', {
      primary: '#10b981', // emerald-500
      secondary: '#3b82f6', // blue-500
      accent: '#f59e0b', // amber-500
      background: '#000000', // pure black
      gradients: {
        hero: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
        card: 'linear-gradient(to bottom right, rgba(16, 185, 129, 0.05), transparent)',
        cta: 'linear-gradient(90deg, #10b981, #3b82f6)'
      }
    });
  }

  private async loadSkills(): Promise<void> {
    this.registerSkill({
      name: 'apply-theme',
      execute: async (params: unknown) => {
        const { themeName } = params as { themeName: string };
        const theme = this.themes.get(themeName);

        if (!theme) {
          return { success: false, error: 'Theme not found' };
        }

        return { success: true, data: theme };
      }
    });

    this.registerSkill({
      name: 'generate-gradient',
      execute: async (params: unknown) => {
        const { type, colors } = params as { type: string; colors: string[] };

        let gradient: string;
        if (colors && colors.length >= 2) {
          gradient = `linear-gradient(135deg, ${colors.join(', ')})`;
        } else {
          // Generate random gradient
          gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }

        return { success: true, data: gradient };
      }
    });
  }

  getTheme(name: string): ThemeConfig | undefined {
    return this.themes.get(name);
  }

  getAllThemes(): Map<string, ThemeConfig> {
    return this.themes;
  }
}
