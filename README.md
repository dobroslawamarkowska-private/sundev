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

Requires Node 18+.

## Writing Content

**New blog post** — create `src/content/blog/YYYY-MM-DD-slug.md`:

```markdown
---
title: "Post Title"
date: 2026-04-19
description: "One sentence summary."
tags: [tag1, tag2]
draft: false
---

Post body here. No H1 — the title comes from frontmatter.
```

**New article** — create `src/content/articles/slug.md` with the same frontmatter.

Set `draft: true` to keep a post out of the build while you're working on it.

## Publishing

```bash
git add src/content/blog/my-post.md
git commit -m "post: my post title"
git push origin main
```

GitHub Actions builds the site and deploys `dist/` to Kylos automatically (~30 seconds).

## Deployment Setup (one-time)

1. Generate a deploy key: `ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/sundev_deploy`
2. Add the **public key** to Kylos panel → SSH Keys
3. Add these secrets to the GitHub repo (Settings → Secrets → Actions):

| Secret | Value |
|--------|-------|
| `KYLOS_SSH_KEY` | Contents of `~/.ssh/sundev_deploy` (private key) |
| `KYLOS_HOST` | SSH hostname from Kylos panel |
| `KYLOS_USER` | SSH username |
| `KYLOS_PATH` | Remote path, e.g. `~/domains/sundev.pl/public_html` |

4. Enable free SSL for sundev.pl in the Kylos panel (Let's Encrypt).
