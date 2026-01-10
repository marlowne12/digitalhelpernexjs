# CHUNK 5: Voice Agent Builder + Reflect Skill

**This is Chunk 5 of 8.**

Create one agent file and one skill file.

---

## File 1: agents/voice-agent-builder.md

```markdown
# Voice Agent Builder

## Role
Configures and deploys voice AI agents for client businesses using Vapi or similar platforms.

## Responsibilities
- Voice script development
- Call flow design
- Voice agent configuration
- Integration with client systems
- Testing and optimization

## Skills Used
- voice-script-builder.md

## Available Tools
- Web search (research client business for script context)
- Notion MCP (client requirements, deployment tracking)
- Slack MCP (testing coordination, go-live approvals)
- n8n webhooks (call event processing)

## Voice Agent Types

### 1. Inbound Lead Qualification
**Use case:** Answer calls, qualify leads, capture info
**Flow:** Greeting → Identify Need → Qualify → Capture Info → Set Expectation → End

### 2. Appointment Booking
**Use case:** Schedule service appointments
**Flow:** Greeting → Service Type → Check Availability → Confirm Details → End

### 3. After-Hours Handler
**Use case:** Handle calls outside business hours
**Flow:** After-Hours Greeting → Determine Urgency → Take Message OR Transfer → End

## Workflows

### Voice Agent Setup
1. Load client requirements from Notion
2. Identify appropriate use case type
3. Design call flow using voice-script-builder skill
4. Create system prompt for voice platform
5. Generate configuration JSON
6. Document integration requirements:
   - Webhook URLs needed
   - Calendar integration (if booking)
   - CRM integration points
7. Save configuration to /data/clients/[client]/voice-agent/
8. Notify Slack for review and testing

### Testing Protocol
1. Internal test calls (minimum 5 scenarios)
   - Happy path
   - Confused caller
   - Interruptions
   - Edge cases
2. Integration verification (data flows correctly)
3. Client test calls
4. Soft launch with monitoring
5. Full deployment

## Configuration Template

For each voice agent, produce:
1. System prompt (what the AI should know/do)
2. First message (greeting)
3. Voice selection recommendation
4. Tool definitions (if using functions)
5. Webhook URLs to configure
6. Testing checklist

## Handoff to Client
When deploying, prepare:
- Recorded demo call
- Written call flow documentation
- Dashboard access instructions
- Training session notes
- Escalation procedures

## Output Locations
- Voice configs: /data/clients/[client]/voice-agent/
- Call scripts: /data/clients/[client]/voice-agent/scripts/
- Test results: /data/clients/[client]/voice-agent/testing/
```

---

## File 2: skills/reflect.md

```markdown
# Reflect Skill - Self-Improvement System

## Purpose
Analyze conversations to extract learnings, corrections, and successful patterns. Update relevant skill files to improve future performance.

## Trigger
- Manual: `/reflect` or `/reflect [skill-name]`
- Automatic: On session end (when enabled via `reflect on`)

## Process

### Step 1: Session Analysis
Scan the conversation for:

**High Confidence Signals (definite learnings):**
- Explicit corrections: "No, always do X instead of Y"
- Direct preferences: "I prefer X format"
- Error fixes that were accepted
- "Never" or "Always" statements

**Medium Confidence Signals (patterns that worked):**
- Approaches that received positive feedback
- Formats that weren't questioned
- Successful completions without revision

**Low Confidence Signals (observations to review):**
- Implicit preferences inferred from context
- Patterns noticed but not confirmed
- Areas of uncertainty

### Step 2: Categorize by Skill
Map learnings to relevant skill files:
- GMB-related → gmb-audit.md, gmb-review-response.md
- Lead gen related → lead-scoring.md, outreach-sequence.md
- Content related → local-seo-brief.md
- Voice related → voice-script-builder.md
- General workflow → CLAUDE.md or agent files

### Step 3: Propose Updates
For each learning, generate:

```
## Proposed Update

**Skill:** [skill-name.md]
**Section:** [section to update]
**Confidence:** [High/Medium/Low]

**Current:**
[existing text or "New addition"]

**Proposed:**
[new text]

**Reasoning:**
[why this change based on conversation]
```

### Step 4: Review & Apply
Present all proposed updates for approval:
- Y: Accept and apply
- N: Reject
- E: Edit with natural language instruction
- S: Skip for now (don't reject, revisit later)

### Step 5: Commit to Git
After applying changes:
1. Stage modified skill files
2. Generate commit message summarizing learnings
3. Commit with message
4. Push if remote configured
5. Log update to /data/skill-evolution-log.md

## Toggle Commands

**reflect on**
Enable automatic reflection on session end.

**reflect off**
Disable automatic reflection.

**reflect status**
Report current state:
- Auto-reflect: enabled/disabled
- Last reflection: [timestamp]
- Skills updated in last 7 days: [list]

## Output Format

```
## Reflection Summary

**Session:** [brief description]
**Date:** [date]

### High Confidence Learnings
1. [Learning] → [Skill file]
   - Change: [description]
   - Status: ✓ Applied / ✗ Rejected / ⏸ Skipped

### Medium Confidence Learnings
1. [Learning] → [Skill file]
   - Change: [description]
   - Status: ✓ Applied / ✗ Rejected / ⏸ Skipped

### Low Confidence (Logged for Review)
1. [Observation]
   - Logged to: skill-evolution-log.md

### Git Commit
`[hash]`: "[commit message]"
```

## Example Learnings

**High Confidence:**
- "Always include competitor review counts in GMB audits"
- "Never use exclamation points in review responses"
- "Format lead scores as X/100, not percentages"

**Medium Confidence:**
- "Bullet points worked well for audit action items"
- "Including timeline estimates was appreciated"

**Low Confidence:**
- "User seemed to prefer shorter paragraphs"
- "May want more specific local keywords"
```

---

**After creating both files, say "Chunk 5 complete" and I'll provide Chunk 6 (GMB Skills).**
