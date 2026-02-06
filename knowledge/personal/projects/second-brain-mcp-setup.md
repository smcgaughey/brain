---
title: Second Brain MCP Server Setup Guide
type: note
permalink: projects/second-brain-mcp-server-setup-guide
tags:
- mcp
- second-brain
- cloudflare
- embeddings
- knowledge-management
- claude
---

# Second Brain MCP Server Setup Guide

## Overview
Building a personal knowledge base ("second brain") that Claude can query via MCP, accessible from web/mobile without running local servers.

## The Architecture (Friend's "brainstem" model)

### Two Pieces:
1. **Knowledge Store (home-brain)** - Private GitHub repo with markdown files
   - Use Claude Code to write/organize notes
   - Templates and instructions for consistent filing
   - Git provides versioning and backup

2. **Retrieval Layer (brainstem)** - MCP server with embeddings search
   - Pulls repo contents
   - Creates vector embeddings (converts text to semantic numbers)
   - Re-indexes on every git push
   - Exposes MCP endpoint for semantic search

### Why Embeddings?
- Keyword search: "vacation" only finds "vacation"
- Semantic search: "vacation" finds "November trip logistics" because meaning matches

## Cloud Hosting Options

### Cloudflare Workers (Recommended)
- **Free tier**: 1,000 memories, ~28,000 queries/month
- **Stack**:
  - Workers - runs MCP server code
  - Vectorize - vector database for embeddings
  - Workers AI - generates embeddings (model: @cf/baai/bge-base-en-v1.5)
  - D1 - SQLite for original text/metadata

### Other Options
- Google Cloud Run
- Azure Functions
- Render/Vercel (simpler but less integrated)

## Existing Projects to Fork

### dannwaneri/vectorize-mcp-server
- Combines MCP + Cloudflare Vectorize
- Semantic search tool ready to go
- TypeScript implementation

### jonaheaton/mcp-memory
- Full Cloudflare stack (Workers, D1, Vectorize, Durable Objects)
- Built-in rate limiting
- User isolation

### Geeksfino/kb-mcp-server
- Uses txtai for embeddings
- Knowledge graph capabilities
- Can run locally or deploy

## Connecting to Claude Web/Mobile

### Key Discovery
Claude.ai supports custom MCP servers via "Connectors" in settings - not limited to Anthropic-vetted servers.

### Requirements for Custom Server:
1. Public HTTPS endpoint
2. MCP over HTTP/SSE transport (not stdio)
3. OAuth or authentication layer
4. Proper security warnings acknowledged

## Implementation Steps

1. **Create knowledge base** - Private GitHub repo with markdown files
2. **Set up Cloudflare account** - Free tier sufficient for personal use
3. **Deploy MCP server** - Fork existing project or build custom
4. **Add GitHub webhook** - Triggers re-indexing on push
5. **Connect to Claude** - Settings â Connectors â Add server URL

## GitHub Webhook Integration
To auto-update embeddings on git push:
1. GitHub sends webhook to Cloudflare Worker endpoint
2. Worker pulls new/changed files from private repo
3. Generates embeddings via Workers AI
4. Upserts into Vectorize index

## Comparison: Local vs Cloud Basic Memory

| Feature | Local Basic Memory | Basic Memory Cloud | Self-hosted Cloud |
|---------|-------------------|-------------------|-------------------|
| Cost | Free | $14.25/mo | Free (Cloudflare tier) |
| Access | Claude Desktop only | Web/mobile/all LLMs | Web/mobile |
| Data location | Your machine | Their servers | Cloudflare (your account) |
| Setup | Easy | Easy | Moderate |
| FERPA safe | Yes | Maybe not | Configurable |

## Security Considerations
- Custom MCP servers can access/modify data based on permissions
- Implement proper OAuth authentication
- Consider FERPA requirements for sensitive data
- Keep truly sensitive content in local-only Basic Memory

## Resources
- Cloudflare remote MCP docs: developers.cloudflare.com/agents/guides/remote-mcp-server/
- Cloudflare Vectorize tutorial: developers.cloudflare.com/vectorize/get-started/embeddings/
- DEV tutorial: dev.to/dannwaneri/building-an-mcp-server-on-cloudflare-workers-with-semantic-search

## Next Steps
1. Ask friend if brainstem is open-source or shareable
2. If not, fork dannwaneri/vectorize-mcp-server
3. Add GitHub webhook for auto-indexing
4. Deploy and test
5. Connect via Claude Connectors
