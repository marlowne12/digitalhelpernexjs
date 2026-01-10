# CHUNK 1: Project Setup and Folder Structure

## Instructions for Claude Code

You are setting up a multi-agent AI system for Digital Dynamics, a web design and SEO agency. I'll give you the implementation in chunks. 

**This is Chunk 1 of 8.**

For this chunk: Create the project folder structure only.

---

## Create This Folder Structure

```
digital-dynamics/
├── CLAUDE.md                     # (will create in next chunk)
├── agents/                       
│   └── .gitkeep
├── skills/                       
│   └── .gitkeep
├── templates/
│   ├── client-onboarding/
│   ├── gmb-optimization/
│   ├── lead-gen/
│   ├── content/
│   └── reporting/
├── data/
│   ├── clients/
│   ├── leads/
│   └── reports/
├── workflows/
│   └── .gitkeep
├── hooks/
│   └── .gitkeep
├── context/
│   └── .gitkeep
└── .claude/
    └── .gitkeep
```

## Your Task

1. Create all these folders
2. Add empty .gitkeep files to keep folders in git
3. Confirm when done, then I'll give you Chunk 2 (CLAUDE.md)

---

## Context Files to Create

Also create these starter context files:

**context/agency-overview.md:**
```markdown
# Digital Dynamics Agency Overview

**Also Known As:** Digital Helper

**Location:** Richland, WA (Tri-Cities area)

**Services:**
- Web design and development (Next.js)
- SEO and local search optimization
- Google My Business optimization
- AI-powered automation (n8n)
- Lead generation systems
- Reputation management
- Voice agent deployment

**Target Clients:**
- Local service businesses (plumbers, electricians, HVAC, roofers, etc.)
- B2B companies in the Pacific Northwest

**Differentiator:**
We combine modern web development with AI automation to deliver measurable results. Our systems work 24/7 so our clients can focus on their craft.
```

**context/service-packages.md:**
```markdown
# Service Packages

## Growth Package - $500/month
- GMB optimization and management
- 4 GMB posts per month
- Review monitoring and response templates
- Monthly performance report
- Basic local SEO audit

## Pro Package - $1,200/month
Everything in Growth, plus:
- 2 blog posts per month (SEO optimized)
- Citation building and management
- Competitor monitoring
- Weekly performance updates
- Dedicated Slack channel

## Enterprise Package - $2,500/month
Everything in Pro, plus:
- AI voice agent for inbound calls
- Automated lead qualification
- CRM integration
- Custom automation workflows
- Priority support
- Quarterly strategy sessions
```

**context/brand-voice.md:**
```markdown
# Brand Voice Guidelines

## Tone
- Professional but approachable
- Confident without being arrogant
- Helpful and solution-oriented
- Direct and clear (no jargon with clients)

## When Talking to Local Business Owners
- Keep it simple and practical
- Focus on business outcomes (calls, leads, revenue)
- Use concrete examples
- Avoid technical jargon

## When Talking to B2B/Technical Clients
- Can use more technical language
- Focus on efficiency and scalability
- Discuss integrations and automation
- Provide detailed documentation

## Writing Style
- Short paragraphs
- Active voice
- Specific numbers over vague claims
- Always include next steps or CTAs
```

---

**After completing this chunk, say "Chunk 1 complete" and I'll provide Chunk 2.**
