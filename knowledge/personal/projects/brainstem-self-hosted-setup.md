---
title: Fork Brainstem Self-Hosted Setup Guide
type: note
permalink: projects/fork-brainstem-self-hosted-setup-guide
tags:
- brainstem
- mcp
- cloudflare
- second-brain
- github
- setup
---


# Fork Brainstem Self-Hosted Setup Guide

## Overview
Fork Geoff Dudgeon's brainstem.cc (dudgeon/git-brain) to run a self-hosted MCP server for a personal "second brain" backed by a private GitHub repo. This gives semantic search across all knowledge files, accessible from Claude Desktop, Claude Mobile, Claude.ai web, and Claude Code.

## Architecture
```
Private GitHub Repo (knowledge files)
    â git push
    â¼
GitHub App webhook â Your Cloudflare Worker
    â
    âââ Fetches changed files via GitHub API
    âââ Stores in Cloudflare R2 (object storage)
    âââ Indexes via Cloudflare AI Search (embeddings)
    âââ Tracks installs in Cloudflare D1 (SQLite)
    
MCP Clients (Claude Desktop/Mobile/Web/Code)
    â
    âââ Connect to Worker via MCP protocol
        âââ search_brain (semantic search)
        âââ get_document (fetch full file)
        âââ list_recent (recently modified)
        âââ list_folders (browse structure)
        âââ inbox (quick capture â commits to GitHub)
        âââ about (server info)
```

## Source Repo
- **GitHub:** https://github.com/dudgeon/git-brain
- **License:** ISC (permissive, fork-friendly)
- **Language:** TypeScript (96.3%)
- **Stack:** Cloudflare Workers + Durable Objects + R2 + D1 + AI Search

## Cloudflare Services Used

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| Workers | Runs the MCP server code | 100K requests/day |
| Durable Objects | MCP session state management | Included with Workers (SQLite backend free) |
| R2 | Stores synced file contents | 10 GB storage, 1M Class B reads/mo |
| D1 | SQLite for user/install tracking | 5M rows read/day, 100K writes/day |
| AI Search | Semantic search with embeddings | Free during open beta (uses R2 under hood) |

Estimated cost for personal use: $0/month (well within free tiers). Note: AI Search requires an active R2 subscription first (free tier counts). Workers Paid plan is $5/month if you need Durable Objects with key-value storage, but SQLite-backed DOs are available on the free plan.

## Prerequisites

### Accounts Needed
1. GitHub account (already have)
2. Cloudflare account (free) â sign up at dash.cloudflare.com
3. Node.js >= 18 installed locally

### Tools to Install
```bash
npm install -g wrangler
wrangler login  # Opens browser for OAuth
brew install gh  # GitHub CLI (likely already installed)
```

## Step-by-Step Setup

### Phase 1: Fork and Clone

```bash
gh repo fork dudgeon/git-brain --clone --remote
cd git-brain
npm install
```

Key files to understand:
- wrangler.toml â Cloudflare config (bindings, routes, resource IDs)
- src/ â TypeScript source code for the Worker
- site/ â Landing page assets
- CLAUDE.md â Dev guide (great for Claude Code)
- TROUBLESHOOTING.md â Common issues

### Phase 2: Create Cloudflare Resources

#### 2a. R2 Bucket (file storage)
```bash
wrangler r2 bucket create brainstem-files
```

#### 2b. D1 Database (install/user tracking)
```bash
wrangler d1 create brainstem-db
# Outputs database_id â copy this for wrangler.toml
```

#### 2c. AI Search Instance
1. Cloudflare Dashboard â AI Search â Create
2. Select R2 bucket as data source
3. Note the instance name for wrangler.toml

#### 2d. Update wrangler.toml
Replace Geoff's values with yours:
- account_id â your Cloudflare account ID (Dashboard â Overview â right sidebar)
- R2 bucket binding â your bucket name
- D1 database binding â your database_id
- AI Search binding â your instance name

### Phase 3: Create GitHub App

This is the most involved step. You need a custom GitHub App that receives webhooks when you push to your knowledge repo.

#### 3a. Register at https://github.com/settings/apps/new
- Name: "My Brainstem" (must be globally unique)
- Homepage URL: `https://brainstem.YOUR-SUBDOMAIN.workers.dev`
- Webhook URL: `https://brainstem.YOUR-SUBDOMAIN.workers.dev/api/github/webhook`
- Webhook secret: generate random string (`openssl rand -hex 20`), save it

#### 3b. Permissions
- Repository Contents â Read-only
- Repository Metadata â Read-only

#### 3c. Subscribe to Events
- Push events
- Installation events

#### 3d. Generate Private Key
1. In app settings â Private keys â Generate
2. Download .pem file
3. Convert format:
```bash
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt \
  -in downloaded-key.pem -out private-key-pkcs8.pem
```

#### 3e. Note credentials
- App ID (settings page)
- Client ID (settings page)  
- Client Secret (generate on settings page)
- Private Key (contents of pkcs8 pem)
- Webhook Secret (string from 3a)

### Phase 4: Configure Secrets

```bash
wrangler secret put GITHUB_APP_ID
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET
wrangler secret put GITHUB_PRIVATE_KEY  # Paste full pkcs8 pem contents
wrangler secret put GITHUB_WEBHOOK_SECRET
wrangler secret put SESSION_SECRET  # Generate: openssl rand -hex 32
```

Note: Check the actual source code / CLAUDE.md for exact secret names â they may differ slightly from what's listed here.

### Phase 5: Deploy

```bash
wrangler deploy
curl https://brainstem.YOUR-SUBDOMAIN.workers.dev
# Should return landing page
```

### Phase 6: Create Knowledge Repo

```bash
# Find where Basic Memory files live and create git repo there
cd ~/path/to/knowledge/files
git init
git add .
git commit -m "Initial knowledge base"
gh repo create knowledge --private --source=. --push
```

### Phase 7: Install GitHub App on Knowledge Repo
1. Visit: `https://github.com/apps/YOUR-APP-NAME/installations/new`
2. Select your account
3. Choose "Only select repositories" â select knowledge repo
4. Install â triggers initial sync

### Phase 8: Authenticate
1. Visit: `https://brainstem.YOUR-SUBDOMAIN.workers.dev/oauth/authorize`
2. Authorize with GitHub
3. Copy session token

### Phase 9: Connect Claude Clients

#### Claude Desktop / Claude Code
Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "my-brain": {
      "url": "https://brainstem.YOUR-SUBDOMAIN.workers.dev/mcp/YOUR-UUID",
      "headers": {
        "Authorization": "Bearer YOUR-SESSION-TOKEN"
      }
    }
  }
}
```

#### Claude.ai Web
Settings â Connectors â Add custom connector with URL and auth header

#### Claude Mobile
Same MCP config via app settings

## Ongoing Workflow

### Three Ways to Add/Edit Notes

**Local edit + push:**
```bash
cd ~/knowledge && vim research/new-project.md
git add . && git commit -m "Add project notes" && git push
# Reindexed within ~1 minute
```

**Claude Code:**
```bash
cd ~/knowledge && claude
# "Create a new research note for the fellowship curriculum project"
# Claude creates file, commits, pushes
```

**Quick capture from anywhere (inbox tool):**
From Claude Mobile: "Add to my inbox: follow up with David about restraints revision"
â Brainstem commits directly to GitHub repo

## Learning Opportunities
1. Cloudflare Workers â serverless edge computing
2. Wrangler CLI â deployment tool
3. GitHub Apps â webhook-driven automation
4. MCP Protocol â how AI tools talk to external services
5. Vector embeddings â how semantic search works
6. R2/D1 â Cloudflare storage services
7. TypeScript â codebase language
8. OAuth â authentication flows

## Key Resources
- Source: https://github.com/dudgeon/git-brain
- TROUBLESHOOTING.md in repo
- CLAUDE.md in repo (dev guide â read this with Claude Code!)
- Cloudflare AI Search: https://developers.cloudflare.com/ai-search/
- Cloudflare Workers: https://developers.cloudflare.com/workers/
- Geoff Dudgeon (original author, personal contact)

## Migration Notes
- Basic Memory files are already .md â fully compatible
- Brainstem supports .md, .txt, .json, .yaml, .yml
- Curr

...(truncated - file too large)...