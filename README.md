# Mining the Details

This is a static blog built with Eleventy.

## Quick start

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:8081`

## Build

`npm run build`

The production output is written to `dist/`.

## Content

- New posts live in `src/posts/`
- Archive posts live in `src/archive/`
- Pages live in `src/`

Templates are in `src/_includes/`.

## Pipeline overview

1. Content is authored in `src/` as Markdown/Nunjucks.
2. Eleventy loads config from `eleventy.config.js`, builds collections (posts, archive, tagList), and applies layouts from `src/_includes/layouts/`.
3. Static assets are copied through from `src/assets/`, `src/images/`, `src/favicon.ico`, and `src/CNAME`.
4. Output is written to `dist/`.

Dev server: `npm run dev` runs Eleventy in watch/serve mode on port `8081`.  
Production build: `npm run build` outputs a static site to `dist/`.

## Deployment

Deployments are handled by GitHub Actions via `.github/workflows/deploy.yml`.
The workflow runs on `push` to the `main` branch, builds the site, and deploys `dist`
to GitHub Pages. If `main` is protected, deployment happens after a PR merge;
otherwise a direct push to `main` will deploy.
