# sundev.pl — Project Instructions

## Project Overview
Personal-professional micro blog hosted at **sundev.pl** on **Kylos Silver** shared hosting (Apache, PHP 5.6–8.1, no persistent Node.js). Content is authored in **Markdown** files and published as clean static HTML via **Astro**.

## Architecture
- **Framework**: Astro (static output mode — `output: 'static'`)
- **Content**: `.md` / `.mdx` files in `src/content/blog/` and `src/content/articles/`
- **Styling**: Plain CSS or Tailwind (TBD)
- **Build**: `npm run build` → `dist/` folder
- **Deploy**: rsync or FTP `dist/` to Kylos document root

## Project Structure
```
sundev/
├── src/
│   ├── content/
│   │   ├── blog/        ← short posts (.md)
│   │   └── articles/    ← long-form articles (.md)
│   ├── pages/
│   │   ├── index.astro
│   │   ├── blog/
│   │   └── articles/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── styles/
├── public/              ← static assets (images, fonts, favicon)
├── dist/                ← build output (deploy this)
├── astro.config.mjs
├── package.json
└── PLAN.md
```

## Coding Standards
- TypeScript strict mode
- Astro components for layouts and UI; plain Markdown for content
- No client-side JS unless absolutely necessary (Astro's `client:` directives are opt-in)
- CSS: scoped component styles preferred; global styles only in `src/styles/global.css`
- Semantic HTML5 — accessibility matters
- Images: use `<Image>` from `astro:assets` for automatic optimization
- All content frontmatter must include: `title`, `date` (ISO 8601), `description`, `draft` (bool)

## Deployment (GitHub Actions → Kylos Silver)
- **Trigger**: push to `main` branch
- **Pipeline**: `.github/workflows/deploy.yml` — build → rsync to Kylos
- **Target**: Kylos Silver SSH, `~/domains/sundev.pl/public_html/`
- **Secrets in GitHub**: `KYLOS_SSH_KEY`, `KYLOS_HOST`, `KYLOS_USER`, `KYLOS_PATH`
- **SSL**: free cert via Kylos panel (Let's Encrypt)
- Never commit `dist/` — CI builds it

## Content Authoring
- Posts go in `src/content/blog/` — filename becomes slug
- Articles go in `src/content/articles/` — filename becomes slug
- Use frontmatter: `title`, `date`, `description`, `tags`, `draft`
- `draft: true` files are excluded from production build

## Git & Publishing Workflow
- `main` branch = production (every push auto-deploys)
- `draft/post-name` branches = work-in-progress posts
- `feature/...` branches = site changes
- Merge to `main` to publish
- `draft: true` in frontmatter also excludes from build

## Do Not
- Add client-side frameworks (React, Vue, Svelte) unless needed
- Commit `dist/` to git — CI builds it
- Add features not in the plan without asking
- Use `any` TypeScript type
