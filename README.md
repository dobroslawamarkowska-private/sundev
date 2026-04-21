# sundev.pl

Source code for [sundev.pl](https://sundev.pl) — a personal-professional micro blog.

Built with [Astro](https://astro.build), deployed as static HTML to Kylos Silver shared hosting via GitHub Actions.

## License

Site code: [MIT](LICENSE)
Content (posts, articles): [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — share with attribution, no commercial use

## Stack

- **Astro 4** — static site generator, Markdown-first
- **Plain CSS** — CSS custom properties, dark mode, no framework
- **GitHub Actions** — builds and deploys on every push to `main`
- **Kylos Silver** — Apache serving static files at sundev.pl

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # build to dist/
npm run preview  # preview the build
```

Requires **Node 20** (matches CI; use `nvm use` or similar if needed).

## Writing Content

**New blog post** — create `src/content/blog/YYYY-MM-DD-slug.md`:

```markdown
---
title: "Post Title"
date: 2026-04-20
description: "One sentence summary."
tags: [tag1, tag2]
draft: false
---

Post body here. No H1 — the title comes from frontmatter.
```

**New article** — create `src/content/articles/slug.md` with the same frontmatter.

Set `draft: true` to keep a post out of the build while working on it.

## Publishing

```bash
git add src/content/blog/my-post.md
git commit -m "post: my post title"
git push origin main
```

GitHub Actions builds the site and deploys `dist/` to Kylos automatically (~1 min).

## Deployment Setup (one-time)

1. In DirectAdmin → **FTP Management** → create a dedicated FTP account scoped to `domains/sundev.pl/public_html`
2. In GitHub: **Settings → Secrets and variables → Actions**, add:

| Secret | Value |
|--------|-------|
| `FTP_HOST` | `mojom.kylos.pl` |
| `FTP_USER` | FTP account username |
| `FTP_PASSWORD` | FTP account password |
| `FTP_PATH` | `/domains/sundev.pl/public_html/` |

3. Enable free SSL for the domain in DirectAdmin (Let's Encrypt).

The deploy pipeline uses `lftp` over FTPS (encrypted) — no third-party actions.
