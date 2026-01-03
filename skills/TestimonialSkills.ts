import { Skill, AgentResult, Testimonial } from '../agents/types';

export const fetchTestimonialsSkill: Skill = {
  name: 'fetch-testimonials',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { limit, minRating } = params as { limit?: number; minRating?: number };

    // In production, this would fetch from a database or API
    const mockTestimonials: Testimonial[] = [
      {
        id: '1',
        author: 'John Doe',
        role: 'CEO',
        company: 'Example Corp',
        content: 'Great service!',
        rating: 5
      }
    ];

    let filtered = mockTestimonials;

    if (minRating) {
      filtered = filtered.filter(t => (t.rating || 0) >= minRating);
    }

    if (limit) {
      filtered = filtered.slice(0, limit);
    }

    return {
      success: true,
      data: filtered
    };
  }
};

export const filterByRatingSkill: Skill = {
  name: 'filter-by-rating',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { testimonials, minRating } = params as { testimonials: Testimonial[]; minRating: number };

    const filtered = testimonials.filter(t => (t.rating || 0) >= minRating);

    return {
      success: true,
      data: filtered,
      metadata: {
        originalCount: testimonials.length,
        filteredCount: filtered.length
      }
    };
  }
};

export const getRandomTestimonialsSkill: Skill = {
  name: 'get-random-testimonials',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { testimonials, count } = params as { testimonials: Testimonial[]; count: number };

    const shuffled = [...testimonials].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    return {
      success: true,
      data: selected
    };
  }
};

export const calculateAverageRatingSkill: Skill = {
  name: 'calculate-average-rating',
  execute: async (params: unknown): Promise<AgentResult> => {
    const { testimonials } = params as { testimonials: Testimonial[] };

    const ratings = testimonials
      .map(t => t.rating || 0)
      .filter(r => r > 0);

    const average = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
      : 0;

    return {
      success: true,
      data: {
        average: Math.round(average * 10) / 10,
        totalReviews: ratings.length,
        distribution: {
          5: ratings.filter(r => r === 5).length,
          4: ratings.filter(r => r === 4).length,
          3: ratings.filter(r => r === 3).length,
          2: ratings.filter(r => r === 2).length,
          1: ratings.filter(r => r === 1).length
        }
      }
    };
  }
};
