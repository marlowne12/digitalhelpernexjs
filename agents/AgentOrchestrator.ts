import { PricingAgent } from './PricingAgent';
import { FeaturesAgent } from './FeaturesAgent';
import { TestimonialsAgent } from './TestimonialsAgent';
import { ThemeAgent } from './ThemeAgent';
import { AnimationAgent } from './AnimationAgent';
import { AgentContext, AgentResult } from './types';

export class AgentOrchestrator {
  private pricingAgent: PricingAgent;
  private featuresAgent: FeaturesAgent;
  private testimonialsAgent: TestimonialsAgent;
  private themeAgent: ThemeAgent;
  private animationAgent: AnimationAgent;

  private initialized: boolean = false;

  constructor() {
    this.pricingAgent = new PricingAgent();
    this.featuresAgent = new FeaturesAgent();
    this.testimonialsAgent = new TestimonialsAgent();
    this.themeAgent = new ThemeAgent();
    this.animationAgent = new AnimationAgent();
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    await Promise.all([
      this.pricingAgent.initialize(),
      this.featuresAgent.initialize(),
      this.testimonialsAgent.initialize(),
      this.themeAgent.initialize(),
      this.animationAgent.initialize()
    ]);

    this.initialized = true;
  }

  async executeAll(context: AgentContext): Promise<Record<string, AgentResult>> {
    if (!this.initialized) {
      await this.initialize();
    }

    const results = await Promise.all([
      this.pricingAgent.execute(context),
      this.featuresAgent.execute(context),
      this.testimonialsAgent.execute(context),
      this.themeAgent.execute(context),
      this.animationAgent.execute(context)
    ]);

    return {
      pricing: results[0],
      features: results[1],
      testimonials: results[2],
      theme: results[3],
      animation: results[4]
    };
  }

  getPricingAgent(): PricingAgent {
    return this.pricingAgent;
  }

  getFeaturesAgent(): FeaturesAgent {
    return this.featuresAgent;
  }

  getTestimonialsAgent(): TestimonialsAgent {
    return this.testimonialsAgent;
  }

  getThemeAgent(): ThemeAgent {
    return this.themeAgent;
  }

  getAnimationAgent(): AnimationAgent {
    return this.animationAgent;
  }
}

// Singleton instance
export const agentOrchestrator = new AgentOrchestrator();
