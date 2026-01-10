# CHUNK 8: Voice Script Builder + Hooks + Workflows (FINAL)

**This is Chunk 8 of 8 - the final chunk!**

Create the remaining skill file, hooks, and workflow definitions.

---

## File 1: skills/voice-script-builder.md

```markdown
# Voice Script Builder Skill

## Purpose
Design voice agent scripts and call flows for client phone automation.

## Call Flow Patterns

### Pattern 1: Inbound Lead Qualification

```
┌─────────────┐
│  Greeting   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Identify Need│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Qualify    │──── Budget/Timeline/Authority
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Capture Info │──── Name, Phone, Email, Address
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Set Expectation│── When they'll hear back
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    End      │
└─────────────┘
```

**Script Template:**
```
GREETING:
"Hi, thanks for calling [Business Name]! This is [Agent Name], 
how can I help you today?"

IDENTIFY NEED:
[Listen for service type, urgency, problem description]
"Got it, so you're looking for [restate need]. 
Let me ask a few quick questions to make sure we can help..."

QUALIFY:
- "What's the address or area where you need service?"
- "Is this something you need taken care of this week, or planning ahead?"
- "Have you gotten any other quotes yet?"

CAPTURE:
"Perfect, let me get your info so [tech/owner] can follow up.
What's the best number to reach you?"
[Get: Name, Phone, Email optional, Address if service call]

SET EXPECTATION:
"Great, [Name]. Someone from our team will call you back within 
[timeframe]. Is there anything else I can help with?"

END:
"Thanks for calling [Business Name]. Have a great [day/evening]!"
```

### Pattern 2: Appointment Booking

```
GREETING:
"Thanks for calling [Business Name], I can help you schedule.
What service do you need?"

SERVICE TYPE:
[Match to service menu]
"Just to make sure I book the right amount of time, 
can you tell me more about what needs to be done?"

CHECK AVAILABILITY:
"Let me check what we have available. 
Morning or afternoon work better for you?"
[Query calendar via tool]
"I have [Day] at [Time] or [Day] at [Time]. Which works?"

CONFIRM:
"Great, I've got you down for [Service] on [Day] at [Time].
Can I get your phone number for our records?
And your email for the confirmation?"

READ BACK:
"Just to confirm: [Name], [Service], [Day] at [Time].
You'll get a confirmation [text/email] shortly."

END:
"You're all set! We'll see you [Day]. 
Thanks for calling [Business Name]!"
```

### Pattern 3: After-Hours

```
GREETING:
"Hi, thanks for calling [Business Name]. We're currently closed,
but I can help. Is this an emergency?"

IF EMERGENCY:
"Let me connect you with our emergency line. Please hold."
[Transfer to emergency number]

IF NOT EMERGENCY:
"No problem. I can take a message for tomorrow, 
or schedule a callback time. Which would you prefer?"

TAKE MESSAGE:
"What's your name and best callback number?
And briefly, what's this regarding?"
[Capture: Name, Phone, Brief message]
"Got it. Someone will call you back tomorrow between [hours]."

SCHEDULE CALLBACK:
"I can have someone call you tomorrow. 
What time works best - morning or afternoon?"
[Book callback slot]

END:
"Thanks for calling [Business Name]. 
We'll be in touch [tomorrow/at your scheduled time]. Goodbye!"
```

## Configuration Parameters

### Voice Selection Guide

| Voice | Best For | Provider |
|-------|----------|----------|
| Professional female | Service businesses, healthcare | ElevenLabs - Rachel |
| Friendly female | Retail, hospitality | ElevenLabs - Bella |
| Professional male | Legal, financial, B2B | ElevenLabs - Josh |
| Friendly male | Trades, general services | ElevenLabs - Adam |

### Recommended Settings

```json
{
  "stability": 0.5,
  "similarityBoost": 0.75,
  "silenceTimeoutSeconds": 10,
  "maxDurationSeconds": 300,
  "endCallPhrases": ["goodbye", "bye", "thanks bye", "that's all"]
}
```

### Fallback Responses

| Situation | Response |
|-----------|----------|
| Can't understand | "Sorry, I didn't catch that. Could you repeat?" |
| Off-topic question | "I'm not sure about that, but I can have someone call you back." |
| Caller upset | "I understand you're frustrated. Let me get a manager to help." |
| Technical issue | "I'm having trouble hearing you. Can you call back?" |

## Output Format

```markdown
# Voice Agent Configuration: [Client Name]

## Overview
- **Agent Type:** [Lead Qualification / Booking / After-Hours]
- **Business:** [Business Name]
- **Industry:** [Type]

## Business Context
- **Services:** [List]
- **Service Area:** [Area]
- **Hours:** [Hours]
- **Emergency Protocol:** [If applicable]

## Complete Script

### Greeting
[Script]

### Main Flow
[Full branching script]

### Fallbacks
[How to handle edge cases]

### Closing
[Script]

## Technical Configuration

```json
{
  "name": "[Agent Name]",
  "voice": {
    "provider": "11labs",
    "voiceId": "[ID]",
    "stability": 0.5,
    "similarityBoost": 0.75
  },
  "firstMessage": "[Greeting]",
  "systemPrompt": "[Full prompt]",
  "silenceTimeoutSeconds": 10,
  "maxDurationSeconds": 300
}
```

## Integration Points
- **Webhook for call data:** [URL]
- **Calendar integration:** [If booking]
- **CRM sync:** [If applicable]

## Testing Checklist
- [ ] Happy path call
- [ ] Confused caller scenario
- [ ] Emergency scenario (if applicable)
- [ ] No-answer timeout
- [ ] Transfer test (if applicable)
```

## Learning Log
<!-- Reflect skill will append learnings here -->
```

---

## File 2: hooks/reflect-on-stop.sh

Create this file and make it executable:

```bash
#!/bin/bash
# Auto-reflect on session end (when enabled)

REFLECT_STATUS_FILE="$HOME/.claude-reflect-status"

if [ -f "$REFLECT_STATUS_FILE" ] && grep -q "on" "$REFLECT_STATUS_FILE"; then
    echo "🔄 Triggering automatic reflection..."
    claude --print "Use the reflect skill to analyze this session. Focus on high-confidence learnings only. Be concise."
fi
```

After creating, run: `chmod +x hooks/reflect-on-stop.sh`

---

## File 3: workflows/new-client-onboarding.md

```markdown
# Workflow: New Client Onboarding

## Trigger
- "@orchestrator onboard new client [name]"
- New client record created in Notion

## Required Information
- Client name
- Business type/industry
- Service package (Growth/Pro/Enterprise)
- Website URL
- GMB URL (or indicate if needs to be created)

## Steps

### Step 1: Setup (Orchestrator)
1. Create client folder: `/data/clients/[slug]/`
2. Create subfolders: content/, gmb-posts/, briefs/, voice-agent/
3. Create or update Notion client record
4. Log service package and deliverables

### Step 2: GMB Audit (GMB Agent)
1. Run full GMB audit using gmb-audit skill
2. Save report to `/data/reports/[slug]-gmb-audit-[date].md`
3. Identify top 3 quick wins
4. Post summary to Slack #deliverables

### Step 3: Content Assessment (Content Agent)
1. Review website structure and content
2. Identify content gaps for local SEO
3. Create initial content recommendations
4. Save to `/data/clients/[slug]/briefs/initial-content-strategy.md`

### Step 4: Competitor Analysis (Lead Gen Agent)
1. Identify top 3-5 local competitors
2. Score each using lead-scoring skill (modified for competitor view)
3. Document competitive landscape
4. Save to `/data/clients/[slug]/competitor-analysis.md`

### Step 5: 30-Day Plan (Orchestrator)
1. Compile findings from all agents
2. Create prioritized action plan based on package
3. Assign responsibilities and deadlines
4. Save to `/data/clients/[slug]/30-day-plan.md`

### Step 6: Welcome Package (Orchestrator)
1. Compile all deliverables into onboarding packet
2. Save to `/data/reports/[slug]-onboarding-packet.md`
3. Post to Slack #deliverables for review
4. After approval, mark ready for client delivery

## Deliverables
- [ ] GMB Audit Report
- [ ] Content Strategy Brief
- [ ] Competitor Analysis
- [ ] 30-Day Action Plan
- [ ] Welcome Packet (compilation)

## Estimated Time
- Growth Package: 2-3 hours
- Pro Package: 4-5 hours
- Enterprise Package: 6-8 hours
```

---

## File 4: workflows/monthly-gmb-optimization.md

```markdown
# Workflow: Monthly GMB Optimization

## Trigger
- Scheduled: 1st of each month
- "@orchestrator run monthly GMB for [client]"

## Applies To
- All active clients with Growth, Pro, or Enterprise packages

## Steps

### Step 1: Review Monitoring (GMB Agent)
1. Check for new reviews since last run
2. Draft responses for unanswered reviews
3. Categorize by sentiment
4. Alert Slack for negative reviews immediately
5. Queue positive review responses for approval

### Step 2: Competitor Pulse (GMB Agent)
1. Check competitor review counts and ratings
2. Note significant changes
3. Update tracking in client folder

### Step 3: Post Creation (Content Agent)
1. Review previous month's posts
2. Create 4 new GMB posts for coming month
3. Vary post types:
   - Week 1: Service highlight
   - Week 2: Offer or promotion
   - Week 3: Tip or educational
   - Week 4: Social proof or team highlight
4. Include image suggestions
5. Submit batch for approval via Slack

### Step 4: Photo Audit (GMB Agent)
1. Count current photos
2. Compare to top competitor
3. Recommend new photos if gap exists

### Step 5: Monthly Report (Orchestrator)
1. Compile:
   - Review summary (new, responses, sentiment)
   - Post performance (if data available)
   - Competitor changes
   - Photo recommendations
   - Next month focus areas
2. Save to `/data/reports/[client]-monthly-[month]-[year].md`
3. Post summary to Slack #deliverables

## Deliverables
- [ ] Review responses (drafted)
- [ ] 4 GMB posts (scheduled/queued)
- [ ] Monthly performance report
- [ ] Photo recommendations

## Estimated Time
- Per client: 1-2 hours
```

---

## File 5: workflows/lead-generation-pipeline.md

```markdown
# Workflow: Lead Generation Pipeline

## Trigger
- "@lead-gen-agent find [X] leads for [industry] in [location]"
- Scheduled: Weekly prospecting for defined targets

## Steps

### Step 1: Research (Lead Gen Agent)
1. Define search criteria
2. Web search for matching businesses
3. For each prospect (aim for 2x target to account for filtering):
   - Find website
   - Find GMB profile
   - Identify decision maker name
   - Note years in business if visible

### Step 2: Scoring (Lead Gen Agent)
1. Score each prospect using lead-scoring skill
2. Capture all dimension scores
3. Identify primary pain point for each
4. Categorize by tier

### Step 3: Filtering
1. Remove scores below 40 (Archive tier)
2. Flag any existing clients or past contacts
3. Sort by score descending

### Step 4: Sequence Creation (Lead Gen Agent)
1. For each Hot lead (80+):
   - Generate full 5-touch sequence immediately
   - Personalize with specific observations
2. For Warm leads (60-79):
   - Generate sequence if capacity allows
3. Save sequences to lead records

### Step 5: Notification
1. Alert Slack #lead-alerts with summary:
   - Total researched
   - Hot leads (list with scores)
   - Warm leads (count)
   - Cool/Archive (count)
2. For each Hot lead, include:
   - Business name and contact
   - Score and primary gap
   - Recommended approach

### Step 6: Queue for Outreach
1. If n8n integration active:
   - Trigger webhook with sequence data
   - Emails queued for scheduled sending
2. If manual:
   - Export sequences to /data/leads/ready-to-send/
   - Notify Slack sequences are ready

## Output
- Lead list in Notion with scores
- Sequences stored per lead
- Hot leads flagged for attention
- Summary in Slack

## Estimated Time
- 25 leads: 2-3 hours
- 50 leads: 4-5 hours
```

---

## Final Step: Initialize Git

Run these commands in the project folder:

```bash
cd ~/digital-dynamics
git init
git add .
git commit -m "Initial Digital Dynamics agent system setup"
```

---

# 🎉 SETUP COMPLETE!

You now have:
- ✅ Full folder structure
- ✅ CLAUDE.md with routing rules
- ✅ 5 agent definitions
- ✅ 7 skill files
- ✅ 3 workflow definitions
- ✅ Reflection hook
- ✅ Git initialized

## Test It

Try this command:
```
@gmb-agent Perform a GMB audit for "Thompson Electric Richland WA"
```

## Next Steps
1. Connect MCP servers (Slack, Notion)
2. Import n8n workflows (separate files provided)
3. Set up Notion databases
4. Test multi-agent workflow

Refer to the other guide documents for:
- MCP setup commands
- n8n workflow JSON
- Vapi voice agent templates
- Human-in-the-loop patterns
