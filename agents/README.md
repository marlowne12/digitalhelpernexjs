# Agents System

This directory contains the autonomous agent system inspired by the Xtract.framer.ai website. Each agent is responsible for managing a specific aspect of the application.

## Architecture

The system follows a modular, skill-based architecture where:

- **Agents** are autonomous systems that handle specific domains (pricing, features, testimonials, etc.)
- **Skills** are reusable capabilities that agents can execute
- **AgentOrchestrator** coordinates multiple agents working together

## Available Agents

### 1. PricingAgent
**Location:** `agents/PricingAgent.ts`

Manages pricing tiers, packages, and generates pricing presentations.

**Capabilities:**
- Generate pricing tiers
- Calculate discounts
- Compare packages
- Custom pricing generation

**Skills:**
- `generate-pricing` - Generate pricing data
- `calculate-discount` - Calculate discounted prices
- `customize-tier` - Customize pricing tiers

**Usage:**
```typescript
import { agentOrchestrator } from './agents/AgentOrchestrator';

await agentOrchestrator.initialize();
const pricingAgent = agentOrchestrator.getPricingAgent();
const result = await pricingAgent.execute({ theme: 'purple' });
```

### 2. FeaturesAgent
**Location:** `agents/FeaturesAgent.ts`

Manages feature showcases and capability presentations.

**Capabilities:**
- Generate feature lists
- Categorize features
- Create feature comparisons
- Dynamic feature highlighting

**Skills:**
- `list-features` - List all or filtered features
- `categorize` - Group features by category
- `highlight-feature` - Highlight specific features

**Usage:**
```typescript
const featuresAgent = agentOrchestrator.getFeaturesAgent();
const result = await featuresAgent.execute({ currentPage: 'pricing' });
```

### 3. TestimonialsAgent
**Location:** `agents/TestimonialsAgent.ts`

Manages client testimonials and reviews.

**Capabilities:**
- Fetch testimonials
- Filter by rating
- Rotate testimonials
- Generate social proof

**Skills:**
- `fetch-testimonials` - Get testimonials with optional filters
- `filter-by-rating` - Filter by minimum rating
- `get-random` - Get random testimonials

**Usage:**
```typescript
const testimonialsAgent = agentOrchestrator.getTestimonialsAgent();
const result = await testimonialsAgent.execute({});
```

### 4. ThemeAgent
**Location:** `agents/ThemeAgent.ts`

Manages theme configurations and styling across the application.

**Capabilities:**
- Switch themes
- Generate color palettes
- Apply gradient styles
- Theme customization

**Available Themes:**
- `default` - Cyan/multi-color theme
- `purple` - Purple gradient theme (Xtract-inspired)
- `custom` - Customizable theme

**Skills:**
- `apply-theme` - Apply a theme configuration
- `generate-gradient` - Generate gradient styles
- `customize-colors` - Create custom color schemes

**Usage:**
```typescript
const themeAgent = agentOrchestrator.getThemeAgent();
const result = await themeAgent.execute({ theme: 'purple' });
```

### 5. AnimationAgent
**Location:** `agents/AnimationAgent.ts`

Manages animations and transitions across the application.

**Capabilities:**
- Create scroll animations
- Generate hover effects
- Page transitions
- Custom animation sequences

**Skills:**
- `scroll-animation` - Configure scroll-based animations
- `hover-effect` - Generate hover effects
- `page-transition` - Configure page transitions

**Usage:**
```typescript
const animationAgent = agentOrchestrator.getAnimationAgent();
const result = await animationAgent.execute({});
```

## AgentOrchestrator

The `AgentOrchestrator` is a singleton that manages all agents and provides a unified interface.

**Usage:**
```typescript
import { agentOrchestrator } from './agents/AgentOrchestrator';

// Initialize all agents
await agentOrchestrator.initialize();

// Execute all agents with context
const results = await agentOrchestrator.executeAll({
  currentPage: 'pricing',
  theme: 'purple'
});

// Access individual agents
const pricingAgent = agentOrchestrator.getPricingAgent();
const themeAgent = agentOrchestrator.getThemeAgent();
```

## Agent Context

All agents accept an `AgentContext` object:

```typescript
interface AgentContext {
  currentPage?: string;      // Current page/route
  userPreferences?: Record<string, unknown>;  // User preferences
  theme?: 'default' | 'purple' | 'custom';    // Theme setting
}
```

## Agent Results

All agents return an `AgentResult` object:

```typescript
interface AgentResult<T = unknown> {
  success: boolean;   // Whether the operation succeeded
  data?: T;           // Result data
  error?: string;     // Error message if failed
  metadata?: Record<string, unknown>;  // Additional metadata
}
```

## Creating a New Agent

1. **Create the agent class:**

```typescript
import { BaseAgent, AgentConfig, AgentContext, AgentResult } from './types';

export class MyCustomAgent extends BaseAgent {
  constructor() {
    const config: AgentConfig = {
      id: 'my-custom-agent',
      name: 'My Custom Agent',
      description: 'What this agent does',
      capabilities: ['capability1', 'capability2'],
      skills: ['skill1', 'skill2']
    };
    super(config);
  }

  async initialize(): Promise<void> {
    // Load skills
    await this.loadSkills();
  }

  async execute(context: AgentContext): Promise<AgentResult> {
    // Implementation
  }

  private async loadSkills(): Promise<void> {
    // Register skills
  }
}
```

2. **Register in AgentOrchestrator:**

```typescript
// Add to AgentOrchestrator.ts
private myCustomAgent: MyCustomAgent;

constructor() {
  this.myCustomAgent = new MyCustomAgent();
}

async initialize(): Promise<void> {
  await this.myCustomAgent.initialize();
}
```

## Best Practices

1. **Keep agents focused** - Each agent should handle one domain
2. **Use skills for reusability** - Extract common functionality into skills
3. **Handle errors gracefully** - Always return proper AgentResult objects
4. **Initialize before use** - Always call `initialize()` before using agents
5. **Use context** - Pass context to make agents adaptive
6. **Document capabilities** - Keep capability lists up to date

## Integration with Components

Components can use agents directly:

```typescript
import { agentOrchestrator } from '../agents/AgentOrchestrator';

const MyComponent = () => {
  useEffect(() => {
    const loadData = async () => {
      await agentOrchestrator.initialize();
      const agent = agentOrchestrator.getPricingAgent();
      const result = await agent.execute({ theme: 'purple' });

      if (result.success) {
        setData(result.data);
      }
    };

    loadData();
  }, []);
};
```

## Parallel Execution

The orchestrator can execute multiple agents in parallel:

```typescript
// Execute all agents at once
const results = await agentOrchestrator.executeAll(context);

// Results contain outputs from all agents
console.log(results.pricing);
console.log(results.features);
console.log(results.testimonials);
```

## Future Enhancements

- Add caching layer for agent results
- Implement agent-to-agent communication
- Add analytics tracking for agent usage
- Create agent performance monitoring
- Add agent versioning system
