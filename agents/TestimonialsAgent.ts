import { BaseAgent, AgentConfig, AgentContext, AgentResult, Testimonial } from './types';

export class TestimonialsAgent extends BaseAgent {
  private testimonials: Testimonial[];

  constructor() {
    const config: AgentConfig = {
      id: 'testimonials-agent',
      name: 'Testimonials Agent',
      description: 'Manages client testimonials and reviews',
      capabilities: [
        'Fetch testimonials',
        'Filter by rating',
        'Rotate testimonials',
        'Generate social proof'
      ],
      skills: ['fetch-testimonials', 'filter-by-rating', 'get-random']
    };

    super(config);

    this.testimonials = this.getDefaultTestimonials();
  }

  async initialize(): Promise<void> {
    await this.loadSkills();
  }

  async execute(context: AgentContext): Promise<AgentResult<Testimonial[]>> {
    try {
      const testimonials = await this.getTestimonials(context);

      return {
        success: true,
        data: testimonials,
        metadata: {
          total: this.testimonials.length,
          averageRating: this.getAverageRating()
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private getDefaultTestimonials(): Testimonial[] {
    return [
      {
        id: 'test-1',
        author: 'Sarah Johnson',
        role: 'Owner',
        company: 'Tri-Cities Bakery',
        content: 'Our old website was costing us customers. Digital Helper Agency rebuilt it in a week and our online orders tripled. The AI chatbot answers questions 24/7!',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      {
        id: 'test-2',
        author: 'Mike Rodriguez',
        role: 'CEO',
        company: 'Richland HVAC Services',
        content: 'These guys understand local business. They integrated our Google reviews, made the site mobile-friendly, and now we rank #1 for "HVAC Richland". Worth every penny.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      {
        id: 'test-3',
        author: 'Jennifer Chen',
        role: 'Marketing Director',
        company: 'Columbia River Realty',
        content: 'Professional team, modern design, and the speed improvement is incredible. Our bounce rate dropped 40% and leads are up 60%.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      {
        id: 'test-4',
        author: 'David Thompson',
        role: 'Founder',
        company: 'Kennewick Auto Repair',
        content: 'Finally, a website that looks as professional as our service. The team was responsive and delivered exactly what we needed.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=8'
      },
      {
        id: 'test-5',
        author: 'Amanda White',
        role: 'Owner',
        company: 'Pasco Dental Care',
        content: 'The new site has a booking system that saves us hours of phone time. Our patients love the modern look and easy navigation.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=9'
      }
    ];
  }

  private async loadSkills(): Promise<void> {
    this.registerSkill({
      name: 'fetch-testimonials',
      execute: async (params: unknown) => {
        const { limit } = params as { limit?: number };
        const testimonials = limit
          ? this.testimonials.slice(0, limit)
          : this.testimonials;

        return { success: true, data: testimonials };
      }
    });

    this.registerSkill({
      name: 'filter-by-rating',
      execute: async (params: unknown) => {
        const { minRating } = params as { minRating: number };
        const filtered = this.testimonials.filter(t =>
          (t.rating || 0) >= minRating
        );

        return { success: true, data: filtered };
      }
    });

    this.registerSkill({
      name: 'get-random',
      execute: async (params: unknown) => {
        const { count } = params as { count: number };
        const shuffled = [...this.testimonials].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, count);

        return { success: true, data: selected };
      }
    });
  }

  private async getTestimonials(_context: AgentContext): Promise<Testimonial[]> {
    return this.testimonials;
  }

  private getAverageRating(): number {
    const ratings = this.testimonials
      .map(t => t.rating || 0)
      .filter(r => r > 0);

    return ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
      : 0;
  }
}
