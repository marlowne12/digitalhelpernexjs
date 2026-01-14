# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Digital Helper Agency is a React/TypeScript web application built with Vite. The site showcases a web design agency targeting local businesses with outdated websites, featuring AI-powered functionality via Google's Gemini API.

## Development Commands

**Setup:**
```bash
npm install
```

**Development server:**
```bash
npm run dev
# Runs on http://localhost:3000
```

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## Environment Configuration

The application requires a Gemini API key set in `.env.local`:
```
GEMINI_API_KEY=your_api_key_here
```

This is exposed to the frontend via Vite config as `process.env.API_KEY` and `process.env.GEMINI_API_KEY`.

## Architecture

### Agent System

The codebase implements a modular **agent-based architecture** inspired by Xtract.framer.ai. This is the core architectural pattern of the application.

**Key concepts:**
- **BaseAgent** (`agents/types.ts`): Abstract class that all agents extend
- **Skills** (`skills/`): Reusable capabilities that agents execute
- **AgentOrchestrator** (`agents/AgentOrchestrator.ts`): Singleton that coordinates all agents, provides parallel execution via `executeAll()`, and individual agent access

**Available agents:**
- `PricingAgent` - Manages pricing tiers and calculations
- `FeaturesAgent` - Handles feature showcases and categorization
- `TestimonialsAgent` - Manages client testimonials and filtering
- `ThemeAgent` - Controls theme configuration (default/purple/custom)
- `AnimationAgent` - Manages animations and transitions

**Agent usage pattern:**
```typescript
import { agentOrchestrator } from './agents/AgentOrchestrator';

await agentOrchestrator.initialize();
const agent = agentOrchestrator.getPricingAgent();
const result = await agent.execute({ theme: 'purple' });
```

See `agents/README.md` for detailed documentation on creating new agents and using the orchestrator.

### Application Structure

**Routing:** Simple view-based state management using `ViewState` type in `App.tsx`. No external router.

**Views:**
- `HOME` - Hero, WebsiteAudit, Services, Features, Testimonials, Recent Work
- `SEO` - SEO service page
- `WEBDESIGN` - Web design service page
- `AI_AGENCY` - AI agency page
- `CASE_STUDIES` - Portfolio/case studies page
- `PRICING` - Pricing page
- `FEATURES` - Features + Testimonials

**Navigation:** `Navbar` component controls view changes via `setView` prop.

### Gemini AI Integration

The `GeminiService` (`services/geminiService.ts`) provides:
- **Chat functionality** using `gemini-3-pro-preview` with system instructions for the Digital Helper brand
- **Email draft generation** using `gemini-2.5-flash`
- **Business analysis with Google Maps grounding** to find real business data, reviews, and generate website concepts
- **Case study generation** using `gemini-3-pro-preview` with thinking budget for creative writing
- **Image generation** using `gemini-2.5-flash-image` (Nano Banana) for case study hero images

### Component Patterns

**RevealOnScroll:** Wrapper component providing intersection observer-based animations. Used throughout `App.tsx` to animate sections on scroll.

**ChatWidget:** Floating chat widget using `geminiService.sendMessage()` with conversation history.

## File Organization

```
/agents/          - Agent system (orchestrator + individual agents)
/skills/          - Reusable skill implementations for agents
/components/      - React components (pages and UI components)
/services/        - External service integrations (Gemini API)
/public/          - Static assets
App.tsx           - Main app component with routing logic
types.ts          - Shared TypeScript types
index.tsx         - Entry point
vite.config.ts    - Vite configuration with path aliases (@/)
```

## TypeScript Configuration

- Uses path aliases: `@/*` maps to root directory
- Module resolution: bundler
- JSX: react-jsx
- Experimental decorators enabled for agent system
- No emit mode (Vite handles bundling)

## Key Dependencies

- **React 19.2** - UI framework
- **@google/genai** - Gemini API integration
- **lucide-react** - Icon library
- **Vite** - Build tool and dev server
- **TypeScript 5.8** - Type system

## Design System

**Theme system:**
- Dark theme (slate-950 background)
- Cyan accent colors (cyan-400, cyan-500)
- Supports multiple themes via ThemeAgent (default, purple, custom)
- Purple theme uses purple gradient styles (Xtract-inspired)

**Styling:**
- Tailwind CSS via CDN (in index.html)
- Custom gradients for hero sections
- Glassmorphic effects for cards

## Important Notes

- The agent system should be initialized before use via `agentOrchestrator.initialize()`
- Agent execution returns `AgentResult<T>` with `{ success, data?, error?, metadata? }`
- All agents accept `AgentContext` with optional `currentPage`, `userPreferences`, `theme`
- Skills are registered during agent initialization via `registerSkill()`
- The `geminiService` is a singleton instance - import directly from `services/geminiService`
