# sundev.pl — Project Instructions

## What This Is
Personal-professional micro blog at **sundev.pl**. Content authored in Markdown, built to static HTML by Astro, deployed to Kylos Silver shared hosting via GitHub Actions.

## Stack
- **Astro 4.x** — static output, TypeScript strict, Node 20
- **Plain CSS** — CSS custom properties in `src/styles/global.css`, no framework
- **Content Collections** — `blog` (short posts) and `articles` (long-form), both in `src/content/`
- **GitHub Actions** — builds on every push to `main`, deploys via FTPS (`lftp`) to Kylos

## How Hosting Works
Kylos Silver runs Apache and serves static files. It has no Node.js runtime. Astro runs only at build time (on GitHub Actions). The `dist/` folder — plain HTML/CSS/JS — is what lands on the server. No build tools on Kylos, ever.

## Project Structure
```
sundev/
├── .github/workflows/deploy.yml  ← CI/CD: push main → build → FTPS to Kylos
├── .cursor/rules/                ← Cursor AI rules
├── public/
│   ├── .htaccess                 ← HTTPS redirect, pretty URLs, cache headers
│   ├── robots.txt
│   └── favicon.svg
├── src/
│   ├── assets/                   ← images (Astro-optimized at build time)
│   ├── content/
│   │   ├── config.ts             ← Zod schemas for blog + articles
│   │   ├── blog/                 ← short posts (.md), filename = slug
│   │   └── articles/             ← long-form (.md), filename = slug
│   ├── layouts/
│   │   └── BaseLayout.astro      ← single layout used by all pages
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── rss.xml.ts
│   │   ├── blog/[slug].astro
│   │   ├── blog/index.astro
│   │   ├── articles/[slug].astro
│   │   └── articles/index.astro
│   └── styles/
│       └── global.css            ← all global styles + CSS custom properties
├── astro.config.mjs
├── package.json
├── PLAN.md
└── tsconfig.json
```

## Content Frontmatter
```yaml
---
title: "Title Here"
date: 2026-04-19        # ISO 8601, required
description: "One sentence for SEO and listing pages"
tags: [tag1, tag2]      # optional array
draft: false            # true = excluded from build
lang: en                # optional, en or pl
---
```

## Coding Standards
- No `any` TypeScript
- No `client:` directives unless truly needed
- No inline styles — use CSS custom properties from `global.css`
- Images: `<Image>` from `astro:assets`, never bare `<img>`
- Semantic HTML5

## Git & Publishing Workflow
- `main` = production — every push triggers deploy
- `draft/post-name` branches = unpublished work in progress
- `feature/...` = site changes
- `draft: true` in frontmatter also excludes from build regardless of branch

## Deployment Secrets (GitHub repo → Settings → Secrets)
`FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`, `FTP_PATH`

## Do Not
- Commit `dist/` — CI builds it
- Add Node/npm to Kylos — it only serves static files
- Install React, Vue, or Svelte unless there's a real need
- Add `any` TypeScript type
