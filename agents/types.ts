// Agent System Types
export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  skills: string[];
}

export interface AgentContext {
  currentPage?: string;
  userPreferences?: Record<string, unknown>;
  theme?: 'default' | 'purple' | 'custom';
}

export interface AgentResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface Skill {
  name: string;
  execute: (params: unknown) => Promise<AgentResult>;
  validate?: (params: unknown) => boolean;
}

export abstract class BaseAgent {
  protected config: AgentConfig;
  protected skills: Map<string, Skill>;

  constructor(config: AgentConfig) {
    this.config = config;
    this.skills = new Map();
  }

  abstract initialize(): Promise<void>;
  abstract execute(context: AgentContext): Promise<AgentResult>;

  registerSkill(skill: Skill): void {
    this.skills.set(skill.name, skill);
  }

  async useSkill(skillName: string, params: unknown): Promise<AgentResult> {
    const skill = this.skills.get(skillName);
    if (!skill) {
      return { success: false, error: `Skill ${skillName} not found` };
    }

    if (skill.validate && !skill.validate(params)) {
      return { success: false, error: 'Invalid parameters' };
    }

    return skill.execute(params);
  }
}

// Pricing-related types
export interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly' | 'one-time';
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface PricingData {
  tiers: PricingTier[];
  currency: string;
  disclaimer?: string;
}

// Features-related types
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
  category?: string;
}

// Testimonial-related types
export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  rating?: number;
  avatar?: string;
}

// Theme-related types
export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  gradients: {
    hero?: string;
    card?: string;
    cta?: string;
  };
}
