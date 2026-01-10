# Implementation Chunks - Copy/Paste Guide

## How to Use These Chunks

1. Open Claude Code (Desktop app or terminal)
2. Navigate to your project folder (`~/digital-dynamics` or wherever you want)
3. Copy and paste each chunk **one at a time**
4. Wait for Claude Code to complete each chunk before moving to the next
5. Say "Chunk X complete" after each one to get the next

---

## Chunk Order

| Chunk | File | What It Creates |
|-------|------|-----------------|
| **1** | CHUNK-1-folder-structure.md | Folders + context files |
| **2** | CHUNK-2-claude-md.md | CLAUDE.md (system prompt) |
| **3** | CHUNK-3-agents-orchestrator-gmb.md | Orchestrator + GMB Agent |
| **4** | CHUNK-4-agents-leadgen-content.md | Lead Gen + Content Agent |
| **5** | CHUNK-5-voice-builder-reflect.md | Voice Builder Agent + Reflect Skill |
| **6** | CHUNK-6-skills-gmb.md | GMB Audit + Review Response Skills |
| **7** | CHUNK-7-skills-leadgen-content.md | Lead Scoring + Outreach + SEO Brief Skills |
| **8** | CHUNK-8-final.md | Voice Script Skill + Hooks + Workflows + Git Init |

---

## Time Estimate

- Each chunk: 5-10 minutes for Claude Code to process
- Total setup: 45-90 minutes
- Testing after: 15-30 minutes

---

## Tips

- **If Claude Code gets confused:** Use `/clear` and re-paste the current chunk
- **If a file already exists:** Claude will ask - say "overwrite it"
- **If you need to stop:** You can resume from any chunk later
- **Check progress:** Use `ls -la` or open VS Code to see created files

---

## After All Chunks Complete

1. **Test single agent:**
   ```
   @gmb-agent audit Thompson Electric Richland WA
   ```

2. **Connect MCPs:**
   ```bash
   claude mcp add --transport http notion https://mcp.notion.com/mcp
   claude mcp add slack
   ```

3. **Import n8n workflows** (separate file - paste into n8n directly)

4. **Set up Notion databases** (see MCP guide for schemas)

---

## Files NOT in Chunks (Use Separately)

These files go directly into other tools, not Claude Code:

| File | Where It Goes |
|------|---------------|
| n8n-workflow-templates.md | Import JSON into n8n |
| vapi-voice-agent-templates.md | Paste config into Vapi |
| mcp-and-hitl-integration-guide.md | Reference for setup |
| quick-start-guide.md | Alternative simpler approach |
