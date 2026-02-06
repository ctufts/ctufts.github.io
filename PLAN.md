# Blog Refactor Plan

## Goals
- Replace Jekyll with a simpler, low-maintenance static framework that works on GitHub Pages (no backend).
- Archive all existing posts (read-only, clearly separated from new content).
- Keep URLs as stable as practical (minimize broken links and preserve SEO).
- Make writing/publishing easy (simple authoring workflow).
- Preserve the `miningthedetails.com` custom domain mapping.

## Non-Goals
- No dynamic backend services.
- No complex build pipeline unless clearly needed.

## Current Site Snapshot (from repo)
- Jekyll site with `_posts`, `_layouts`, `_includes`, `_config.yml`.
- Various sections (`about`, `articles`, `blog`, `tags`, etc.).

## Proposed Phases
1. Requirements definition and framework selection.
2. Content inventory and archive strategy.
3. New site structure and information architecture.
4. Migration plan (content, assets, URLs, redirects).
5. Build/deploy workflow on GitHub Pages.

## Open Questions
- What writing workflow do you want? (Markdown + local preview? editor?)
    - Markdown + local preview is fine
- Do you want to keep the current URL structure or are changes acceptable?
    - changes are acceptable. The main thing to preserve is the `miningthedetails.com` custom domain mapping.
- Should the archive be in the same site under `/archive` or moved to a separate subdomain/repo?
    - `/archive` is fine for now
- Any features you want to keep: tags, search, RSS, categories, code highlighting?
    - Only if they are easy to maintain. Tag filtering is desired.
- Do you want a minimalist theme or a specific visual direction?
    - Minimalist to start. Visual direction should feel pragmatic and grounded (engineer + former mechanic + 20 years BJJ + Philadelphia roots).
- Preferred toolchain: no Node, no Ruby? Or OK with a small build tool?
    - Small build tool is fine. I'd like to avoid Ruby if possible (node is fine).
- Number of new posts per year and size of archive (roughly) to plan build times.
    - archive would be what posts/content are here (and even those will likely get deleted over time)
    - Posts per year will likely be 1-2x's a month realistically.

## Requirements (from answers)
- Markdown authoring with local preview.
- Node-based build acceptable; avoid Ruby.
- Archive under `/archive`.
- Tag filtering preferred if low-maintenance.
- Minimalist, pragmatic visual direction.
- Preserve `miningthedetails.com` custom domain.

## Candidate Frameworks (initial)
- Astro (simple, flexible, static output; uses Node)
- Eleventy (11ty) (simple static; Node)
- Hugo (fast, single binary)
- Zola (single binary)
- Plain Markdown + minimal build (e.g., mdBook or custom)

## Next Step
- Confirm requirements and constraints to pick the framework.

## Decision
- Use Eleventy (11ty).

## Immediate Next Steps
1. Add an Eleventy scaffold and minimal build pipeline.
2. Define new content model (pages, posts, tags, archive).
3. Create archive import plan from `_posts` to `/archive`.
4. Set up GitHub Pages deploy (custom domain kept via `CNAME`).
