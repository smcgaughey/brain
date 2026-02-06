---
title: GoodLinks to reMarkable Sync Project
type: note
permalink: projects/good-links-to-re-markable-sync-project
tags:
- remarkable
- goodlinks
- automation
- pdf
- sync
- python
- claude-code
---

# GoodLinks to reMarkable Sync Project

## Overview
Automatically sync web articles saved in GoodLinks (read-later app) to reMarkable tablet as PDFs for distraction-free reading.

## Architecture: Tag-Based Sync

```
GoodLinks (tag: "rm") â Shortcut exports JSON â 
Python script â Fetch & convert to PDF â rmapi â reMarkable
```

### Why This Approach
- Uses GoodLinks' native tag system (tag articles for reMarkable)
- Shortcuts can run on schedule or manually
- Python handles heavy lifting (fetching, PDF conversion)
- rmapi is battle-tested for reMarkable uploads
- Can run locally on Mac or move to server later

## Available Tools

### GoodLinks Side
- Extensive Shortcuts support with actions to get links by tag
- AppleScript on Mac for automation
- Export creates JSON file with addedAt, readedAt, metadata
- Custom Actions can trigger URL schemes or Shortcuts

### reMarkable Side
- **rmapi** - Go CLI for reMarkable Cloud API, supports scripted uploads
- **Aviary** - Webhook-driven document uploader with PDF conversion
- **readwise-to-remarkable** - Similar concept (syncs Readwise Reader)
- Direct Cloud API available (HTTP/JSON based)

## Project Structure

```
goodlinks-remarkable-sync/
âââ config.yaml           # Settings (paths, tags, folders)
âââ sync.py              # Main sync logic
âââ converter.py         # URL â PDF conversion
âââ remarkable.py        # rmapi wrapper
âââ state.json           # Track what's been synced
âââ requirements.txt     # Dependencies
```

## Component Details

### 1. GoodLinks Export (Shortcuts)
Create a Shortcut that:
- Gets all links with tag "rm" (or "remarkable")
- Exports as JSON to known location (iCloud or local)
- Optionally marks them as "sent" by changing tag

### 2. Python Sync Script
Core logic:
1. Read GoodLinks export JSON
2. Compare against state.json (skip already-synced)
3. For each new link:
   - Fetch article content
   - Convert to clean PDF (reader-mode style)
   - Upload via rmapi
   - Update state.json
4. Optionally organize into reMarkable folders by tag/date

### 3. PDF Conversion Options

| Tool | Pros | Cons |
|------|------|------|
| **percollate** | Built for articles, beautiful output | Node.js dependency |
| **Playwright/Puppeteer** | Best rendering, handles JS | Heavier, needs browser |
| **newspaper3k + weasyprint** | Lightweight Python | May miss some layouts |
| **SingleFile CLI** | Excellent extraction | Extra dependency |

**Recommendation**: percollate - specifically designed for web articles to PDF

### 4. Automation Options

**Option A: Mac Shortcuts Automation**
- Run daily at specified time
- Triggers Shortcut â Python script chain

**Option B: Launchd (Mac background service)**
- Runs on schedule even without user login

**Option C: Cloud deployment (future)**
- Move to server, watch for changes
- Or use webhook from Shortcuts

## Prerequisites

```bash
# Install rmapi (reMarkable CLI)
brew install rmapi

# Authenticate rmapi (one-time)
rmapi
# Follow prompts to get device code from my.remarkable.com

# Install percollate for PDF conversion
npm install -g percollate

# Verify both work
rmapi ls
percollate pdf "https://example.com/article" -o test.pdf
```

## Claude Code Implementation Plan

### Phase 1: Project Setup
```
Create project "goodlinks-remarkable-sync" with:
- Python 3.11+ with uv for dependency management
- config.yaml for settings
- Basic project structure
- README with setup instructions
```

### Phase 2: GoodLinks Parser
```
Module that:
- Reads GoodLinks export JSON from configurable path
- Extracts URL, title, tags, date added
- Filters to items with specific tag (configurable)
- Tracks sync state in local JSON to avoid duplicates
```

### Phase 3: Article-to-PDF Converter
```
Converter module that:
- Takes URL and title
- Uses percollate (or playwright) for clean PDF
- Outputs to temp directory
- Handles errors gracefully
- Optionally includes metadata (source, date saved)
```

### Phase 4: reMarkable Upload
```
Module wrapping rmapi:
- Checks if rmapi is installed and authenticated
- Creates folder structure (e.g., /GoodLinks/2026-01/)
- Uploads PDF to correct folder
- Returns success/failure status
```

### Phase 5: Main Sync Script
```
Main sync.py that:
- Loads config
- Reads GoodLinks export
- Filters for new items not yet synced
- For each: convert to PDF, upload, update state
- Logs progress and errors
- Runs manually or via cron
```

### Phase 6: Shortcuts Integration
```
Documentation for:
- Shortcut exporting GoodLinks items tagged "rm" to JSON
- Where to save export file
- How to trigger Python script from Shortcuts
- Optional: Shortcuts automation for daily runs
```

## Example Claude Code Prompts

**Initial setup:**
```
I want to build a sync tool that takes articles from GoodLinks 
and sends them to my reMarkable tablet as PDFs.

Flow:
1. GoodLinks exports tagged articles as JSON to ~/Documents/goodlinks-export.json
2. Python script reads JSON, converts each article to PDF
3. Uploads to reMarkable via rmapi CLI
4. Tracks synced items to avoid duplicates

Start by setting up project structure and config system.
```

**Iterative prompts:**
- "Add the GoodLinks JSON parser"
- "Add PDF conversion using percollate"
- "Add rmapi integration for uploads"
- "Add error handling and logging"
- "Create a Shortcut that exports from GoodLinks and triggers this script"

## Config Example

```yaml
goodlinks:
  export_path: ~/Documents/goodlinks-export.json
  sync_tag: "rm"
  
remarkable:
  folder: "/GoodLinks"
  organize_by: "month"  # or "tag" or "flat"
  
converter:
  tool: "percollate"  # or "playwright"
  include_metadata: true
  
state_file: ~/.goodlinks-remarkable/state.json
log_file: ~/.goodlinks-remarkable/sync.log
```

## Future Enhancements
- Two-way sync (highlights back from reMarkable)
- Server deployment for always-on sync
- Email-to-reMarkable fallback (like Kindle)
- Integration with other read-later apps
- EPUB output option for better reMarkable rendering

## Related Resources
- rmapi: github.com/juruen/rmapi
- Aviary: github.com/rmitchellscott/Aviary
- percollate: github.com/danburzo/percollate
- awesome-reMarkable: github.com/reHackable/awesome-reMarkable
- GoodLinks automation: goodlinks.app (Shortcuts actions)
