import { BaseAgent, AgentConfig, AgentContext, AgentResult } from './types';

export interface AnimationConfig {
  type: 'fade' | 'slide' | 'scale' | 'rotate' | 'custom';
  duration: number;
  delay?: number;
  easing?: string;
  repeat?: boolean;
}

export class AnimationAgent extends BaseAgent {
  private animations: Map<string, AnimationConfig>;

  constructor() {
    const config: AgentConfig = {
      id: 'animation-agent',
      name: 'Animation Agent',
      description: 'Manages animations and transitions across the application',
      capabilities: [
        'Create scroll animations',
        'Generate hover effects',
        'Page transitions',
        'Custom animation sequences'
      ],
      skills: ['scroll-animation', 'hover-effect', 'page-transition']
    };

    super(config);

    this.animations = new Map();
    this.initializeAnimations();
  }

  async initialize(): Promise<void> {
    await this.loadSkills();
  }

  async execute(context: AgentContext): Promise<AgentResult<AnimationConfig>> {
    try {
      const animation = this.animations.get('default')!;

      return {
        success: true,
        data: animation
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private initializeAnimations(): void {
    this.animations.set('default', {
      type: 'fade',
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });

    this.animations.set('slideUp', {
      type: 'slide',
      duration: 800,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    });

    this.animations.set('scaleIn', {
      type: 'scale',
      duration: 500,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    });

    this.animations.set('rotateIn', {
      type: 'rotate',
      duration: 1000,
      easing: 'ease-in-out'
    });
  }

  private async loadSkills(): Promise<void> {
    this.registerSkill({
      name: 'scroll-animation',
      execute: async (params: unknown) => {
        const { threshold } = params as { threshold?: number };

        return {
          success: true,
          data: {
            type: 'fade',
            duration: 600,
            threshold: threshold || 0.1
          }
        };
      }
    });

    this.registerSkill({
      name: 'hover-effect',
      execute: async (params: unknown) => {
        const { intensity } = params as { intensity?: 'subtle' | 'medium' | 'strong' };

        const configs = {
          subtle: { scale: 1.02, duration: 200 },
          medium: { scale: 1.05, duration: 300 },
          strong: { scale: 1.1, duration: 400 }
        };

        const config = configs[intensity || 'medium'];

        return {
          success: true,
          data: config
        };
      }
    });

    this.registerSkill({
      name: 'page-transition',
      execute: async () => {
        return {
          success: true,
          data: {
            type: 'fade',
            duration: 300,
            easing: 'ease-in-out'
          }
        };
      }
    });
  }

  getAnimation(name: string): AnimationConfig | undefined {
    return this.animations.get(name);
  }
}
