# Skills System

This directory contains reusable skills that agents can execute. Skills are modular capabilities that can be used across different agents.

## What is a Skill?

A skill is a discrete, reusable capability with:
- A unique name
- An execute function
- Optional validation
- Defined input/output contracts

## Skill Structure

```typescript
interface Skill {
  name: string;
  execute: (params: unknown) => Promise<AgentResult>;
  validate?: (params: unknown) => boolean;
}
```

## Available Skills

### Pricing Skills
**Location:** `skills/PricingSkills.ts`

#### generatePricingSkill
Generates pricing configurations based on theme.

**Parameters:**
```typescript
{ theme?: string }
```

**Returns:**
```typescript
{ highlighted: string; accentColor: string }
```

#### calculateDiscountSkill
Calculates discounted prices and savings.

**Parameters:**
```typescript
{ price: number; discountPercent: number }
```

**Returns:**
```typescript
{
  originalPrice: number;
  discountedPrice: number;
  savings: number;
  discountPercent: number;
}
```

#### comparePlansSkill
Compares two pricing plans.

**Parameters:**
```typescript
{ plan1: string; plan2: string }
```

### Features Skills
**Location:** `skills/FeaturesSkills.ts`

#### listFeaturesSkill
Lists features with optional filtering.

**Parameters:**
```typescript
{ category?: string; limit?: number }
```

**Returns:** Array of features

#### categorizeFeaturesSkill
Groups features by category.

**Parameters:**
```typescript
{ features: Feature[] }
```

**Returns:** Object with categorized features

#### highlightFeatureSkill
Highlights a specific feature.

**Parameters:**
```typescript
{ featureId: string; features: Feature[] }
```

### Testimonial Skills
**Location:** `skills/TestimonialSkills.ts`

#### fetchTestimonialsSkill
Fetches testimonials with filters.

**Parameters:**
```typescript
{ limit?: number; minRating?: number }
```

#### filterByRatingSkill
Filters testimonials by minimum rating.

**Parameters:**
```typescript
{ testimonials: Testimonial[]; minRating: number }
```

#### getRandomTestimonialsSkill
Gets random testimonials.

**Parameters:**
```typescript
{ testimonials: Testimonial[]; count: number }
```

#### calculateAverageRatingSkill
Calculates average rating and distribution.

**Parameters:**
```typescript
{ testimonials: Testimonial[] }
```

**Returns:**
```typescript
{
  average: number;
  totalReviews: number;
  distribution: { 1: number; 2: number; 3: number; 4: number; 5: number; }
}
```

### Theme Skills
**Location:** `skills/ThemeSkills.ts`

#### applyThemeSkill
Applies a theme configuration.

**Parameters:**
```typescript
{ themeName: string }
```

**Returns:** ThemeConfig object

#### generateGradientSkill
Generates CSS gradients.

**Parameters:**
```typescript
{ colors: string[]; angle?: number }
```

**Returns:**
```typescript
{
  gradient: string;
  colors: string[];
  angle: number;
}
```

#### customizeColorsSkill
Generates color scheme from base color.

**Parameters:**
```typescript
{ baseColor: string }
```

### Animation Skills
**Location:** `skills/AnimationSkills.ts`

#### scrollAnimationSkill
Creates scroll-based animation configuration.

**Parameters:**
```typescript
{ threshold?: number; rootMargin?: string }
```

#### hoverEffectSkill
Generates hover effect configuration.

**Parameters:**
```typescript
{ intensity?: 'subtle' | 'medium' | 'strong' }
```

**Returns:**
```typescript
{
  scale: number;
  duration: number;
  shadow: string;
}
```

#### pageTransitionSkill
Creates page transition configuration.

**Parameters:**
```typescript
{ direction?: 'in' | 'out' }
```

#### staggerAnimationSkill
Creates staggered animation delays.

**Parameters:**
```typescript
{ itemCount: number; baseDelay?: number }
```

**Returns:**
```typescript
{
  delays: number[];
  totalDuration: number;
}
```

#### createKeyframesSkill
Generates CSS keyframes.

**Parameters:**
```typescript
{
  name: string;
  keyframes: Record<string, Record<string, string>>;
}
```

## Creating a New Skill

1. **Define the skill:**

```typescript
import { Skill, AgentResult } from '../agents/types';

export const myCustomSkill: Skill = {
  name: 'my-custom-skill',

  execute: async (params: unknown): Promise<AgentResult> => {
    const { param1, param2 } = params as { param1: string; param2: number };

    // Implementation
    const result = doSomething(param1, param2);

    return {
      success: true,
      data: result
    };
  },

  validate: (params: unknown) => {
    const p = params as { param1: string; param2: number };
    return typeof p.param1 === 'string' && typeof p.param2 === 'number';
  }
};
```

2. **Register with an agent:**

```typescript
// In your agent's loadSkills() method
this.registerSkill(myCustomSkill);
```

3. **Use the skill:**

```typescript
const result = await agent.useSkill('my-custom-skill', {
  param1: 'value',
  param2: 42
});
```

## Skill Composition

Skills can be composed to create more complex behaviors:

```typescript
export const complexSkill: Skill = {
  name: 'complex-skill',

  execute: async (params: unknown) => {
    // Use multiple skills in sequence
    const result1 = await skill1.execute(params);
    const result2 = await skill2.execute(result1.data);

    return result2;
  }
};
```

## Error Handling

Skills should handle errors gracefully:

```typescript
export const safeSkill: Skill = {
  name: 'safe-skill',

  execute: async (params: unknown): Promise<AgentResult> => {
    try {
      const result = await riskyOperation(params);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
};
```

## Validation Best Practices

1. **Always validate input types**
2. **Check for required fields**
3. **Validate value ranges**
4. **Return clear error messages**

```typescript
validate: (params: unknown) => {
  const p = params as { value: number };

  if (typeof p.value !== 'number') return false;
  if (p.value < 0 || p.value > 100) return false;

  return true;
}
```

## Testing Skills

Skills can be tested independently:

```typescript
import { mySkill } from './MySkills';

describe('mySkill', () => {
  it('should execute successfully', async () => {
    const result = await mySkill.execute({ param: 'test' });
    expect(result.success).toBe(true);
  });

  it('should validate params', () => {
    expect(mySkill.validate({ param: 'test' })).toBe(true);
    expect(mySkill.validate({ param: 123 })).toBe(false);
  });
});
```

## Performance Considerations

1. **Cache expensive operations** - Store results when possible
2. **Use async/await properly** - Don't block unnecessarily
3. **Validate early** - Fail fast on invalid input
4. **Keep skills focused** - One skill, one responsibility
5. **Avoid side effects** - Skills should be pure when possible

## Skill Naming Convention

- Use descriptive names: `calculateDiscount` not `calc`
- Use verb-noun format: `generatePricing`, `fetchTestimonials`
- Be specific: `filterByRating` not `filter`
- Group related skills: `pricing-*`, `theme-*`, etc.
