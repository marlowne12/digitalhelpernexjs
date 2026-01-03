import { Skill, AgentResult } from '../agents/types';

export interface AnimationParams {
  type: 'fade' | 'slide' | 'scale' | 'rotate';
  duration?: number;
  delay?: number;
  easing?: string;
}

export const scrollAnimationSkill: Skill = {
  name: 'scroll-animation',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { threshold, rootMargin } = params as { threshold?: number; rootMargin?: string };

    return {
      success: true,
      data: {
        observerOptions: {
          threshold: threshold || 0.1,
          rootMargin: rootMargin || '0px'
        },
        animationClass: 'animate-fade-in-up'
      }
    };
  }
};

export const hoverEffectSkill: Skill = {
  name: 'hover-effect',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { intensity } = params as { intensity?: 'subtle' | 'medium' | 'strong' };

    const effects = {
      subtle: {
        scale: 1.02,
        duration: 200,
        shadow: 'sm'
      },
      medium: {
        scale: 1.05,
        duration: 300,
        shadow: 'md'
      },
      strong: {
        scale: 1.1,
        duration: 400,
        shadow: 'lg'
      }
    };

    const effect = effects[intensity || 'medium'];

    return {
      success: true,
      data: effect
    };
  }
};

export const pageTransitionSkill: Skill = {
  name: 'page-transition',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { direction } = params as { direction?: 'in' | 'out' };

    return {
      success: true,
      data: {
        direction: direction || 'in',
        duration: 300,
        easing: 'ease-in-out',
        className: direction === 'out' ? 'fade-out' : 'fade-in'
      }
    };
  }
};

export const staggerAnimationSkill: Skill = {
  name: 'stagger-animation',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { itemCount, baseDelay } = params as { itemCount: number; baseDelay?: number };

    const delay = baseDelay || 50;
    const delays = Array.from({ length: itemCount }, (_, i) => i * delay);

    return {
      success: true,
      data: {
        delays,
        totalDuration: itemCount * delay
      }
    };
  }
};

export const createKeyframesSkill: Skill = {
  name: 'create-keyframes',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { name, keyframes } = params as {
      name: string;
      keyframes: Record<string, Record<string, string>>;
    };

    // Generate CSS keyframes
    const css = `
@keyframes ${name} {
  ${Object.entries(keyframes)
    .map(([key, styles]) => {
      const styleString = Object.entries(styles)
        .map(([prop, value]) => `${prop}: ${value};`)
        .join('\n    ');
      return `${key} {\n    ${styleString}\n  }`;
    })
    .join('\n  ')}
}
    `.trim();

    return {
      success: true,
      data: {
        name,
        css,
        keyframes
      }
    };
  }
};
