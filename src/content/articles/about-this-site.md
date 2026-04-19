---
title: "How This Site Is Built"
date: 2026-04-19
description: "The technical decisions behind sundev.pl — Astro, Markdown, static hosting on Kylos Silver."
tags: [meta, astro, webdev]
draft: false
---

## The Goal

A fast, readable, low-maintenance personal site. No databases, no CMS, no server-side runtime. Just files.

## Stack

- **[Astro](https://astro.build)** — static site generator with first-class Markdown support
- **Plain CSS** — no framework, CSS custom properties for theming
- **GitHub Actions** — CI/CD pipeline that builds and deploys on every push to `main`
- **Kylos Silver** — shared Apache hosting in Poland

## Content Workflow

Posts and articles are Markdown files in `src/content/`. Publishing is a `git push`.

```
write .md → git push main → GitHub Actions builds → rsync to server
```

## Why Astro

Astro outputs zero JavaScript by default. Every page is pre-rendered to static HTML at build time. It handles Markdown content collections, RSS, sitemaps, and image optimization — without a runtime on the server.

For a reading-focused personal site, this is exactly the right trade-off.
