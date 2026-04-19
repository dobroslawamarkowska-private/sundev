# sundev.pl — Implementation Plan

## Goal
A personal-professional micro blog at **sundev.pl** — Markdown-authored content, rendered to clean static HTML, deployed on Kylos Silver shared hosting. No server-side runtime required.

---

## Architecture: Astro (Static) + GitHub Actions CI/CD

```
write .md  →  git push  →  GitHub Actions builds  →  rsync to Kylos
```

- Content and code live in a **GitHub repo** (Cursor ↔ GitHub integrated)
- Every push to `main` triggers a build and auto-deploy
- No manual build or deploy steps
- `draft: true` posts stay unpublished until merged to `main`

### Why Astro
| Option | Pros | Cons |
|--------|------|------|
| **Astro** | Markdown-native, zero JS output, great DX, free | Requires build step (solved by CI) |
| Custom PHP | No build step | Manual parser, poor DX |
| Hugo | No Node.js needed | Go templates, less familiar |
| Eleventy | Very flexible | More manual wiring |

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production — every push deploys to sundev.pl |
| `draft/post-name` | Work-in-progress posts, not yet published |
| `feature/...` | Site changes, design work |

Setting `draft: true` in frontmatter also excludes a post from the build regardless of branch.

---

## Phase 1 — Repository & Project Bootstrap

- [ ] `npm create astro@latest .` — minimal template, TypeScript strict
- [ ] Configure `astro.config.mjs`: `site: 'https://sundev.pl'`, `output: 'static'`
- [ ] `git init`, `git remote add origin git@github.com:USERNAME/sundev.git`
- [ ] `.gitignore`: `dist/`, `node_modules/`, `.env`
- [ ] First commit and push

## Phase 2 — Content Collections

- [ ] `src/content/config.ts` with Zod schemas for `blog` and `articles`
- [ ] Schema: `title`, `date` (ISO 8601), `description`, `tags[]`, `draft` (bool)
- [ ] Sample post: `src/content/blog/2026-01-01-hello-world.md`
- [ ] Sample article: `src/content/articles/about-this-site.md`

## Phase 3 — Core Layout & Pages

- [ ] `src/layouts/BaseLayout.astro` — `<html>`, `<head>` with meta, canonical, `<slot />`
- [ ] `src/pages/index.astro` — homepage with recent posts
- [ ] `src/pages/blog/index.astro` + `[slug].astro`
- [ ] `src/pages/articles/index.astro` + `[slug].astro`
- [ ] `src/pages/about.astro`

## Phase 4 — Design & Styling

- [ ] `src/styles/global.css` — CSS custom properties (colors, typography, spacing)
- [ ] Reading-focused typography, responsive, mobile-first
- [ ] Dark mode via `prefers-color-scheme`
- [ ] No CSS framework — plain CSS only

## Phase 5 — SEO & Feeds

- [ ] Open Graph + Twitter meta tags in BaseLayout
- [ ] `src/pages/rss.xml.ts` — RSS feed
- [ ] `@astrojs/sitemap` integration → auto `sitemap.xml`
- [ ] `public/robots.txt`

## Phase 6 — CI/CD with GitHub Actions

### One-time Setup (manual, ~30 min)

1. **Kylos side:**
   - Log into Kylos panel → SSH keys → add deploy public key
   - Note: `KYLOS_HOST`, `KYLOS_USER`, `KYLOS_PATH` (e.g. `~/domains/sundev.pl/public_html`)

2. **GitHub side:**
   - `Settings → Secrets → Actions` — add:
     - `KYLOS_SSH_KEY` — private deploy key (Ed25519)
     - `KYLOS_HOST` — SSH hostname
     - `KYLOS_USER` — SSH username
     - `KYLOS_PATH` — remote document root path

### `.github/workflows/deploy.yml`

```yaml
name: Build & Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run build

      - name: Deploy to Kylos
        uses: easingthemes/ssh-deploy@main
        with:
          SSH_PRIVATE_KEY: ${{ secrets.KYLOS_SSH_KEY }}
          REMOTE_HOST: ${{ secrets.KYLOS_HOST }}
          REMOTE_USER: ${{ secrets.KYLOS_USER }}
          TARGET: ${{ secrets.KYLOS_PATH }}
          SOURCE: dist/
          ARGS: --delete
```

### `public/.htaccess` (copied to `dist/` at build time)

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Pretty URLs (remove .html extension)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ $1.html [L,QSA]

# Cache static assets 1 year
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|woff2?)$">
  Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>
```

## Phase 7 — Optional Enhancements (later)

- [ ] Pagefind — build-time search, no server needed
- [ ] Giscus — GitHub Discussions based comments (free)
- [ ] Reading time estimate per post
- [ ] Tag pages
- [ ] View transitions (Astro built-in)

---

## Final File Structure

```
sundev/
├── .github/
│   └── workflows/
│       └── deploy.yml        ← CI/CD pipeline
├── .cursor/
│   └── rules/
│       ├── project.mdc
│       ├── content.mdc
│       └── astro-conventions.mdc
├── public/
│   ├── .htaccess
│   ├── robots.txt
│   └── favicon.svg
├── src/
│   ├── assets/               ← images (Astro-optimized)
│   ├── content/
│   │   ├── config.ts         ← Zod schemas
│   │   ├── blog/
│   │   └── articles/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── rss.xml.ts
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── articles/
│   │       ├── index.astro
│   │       └── [slug].astro
│   └── styles/
│       └── global.css
├── .gitignore
├── astro.config.mjs
├── CLAUDE.md
├── package.json
├── PLAN.md
└── tsconfig.json
```

---

## Development Workflow

```bash
# Start dev server (local preview)
npm run dev          # http://localhost:4321

# Write a new post
# → create src/content/blog/2026-04-20-my-post.md
# → set draft: false when ready

# Publish
git add src/content/blog/2026-04-20-my-post.md
git commit -m "post: my post title"
git push origin main
# → GitHub Actions builds and deploys automatically
```
