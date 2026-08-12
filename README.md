# Jon Halquist Portfolio

Static React site at [halquist.github.io](https://halquist.github.io).

Single-page layout: hero, work carousels, about, skills, and a Prizma WebGL section.

## Run locally

```bash
cd frontend
npm install
npm start
```

From the repo root, `npm start` / `npm run build` / `npm run deploy` proxy to `frontend/`.

## Deploy

```bash
npm run deploy
```

Builds the app and pushes `frontend/build` to the `gh-pages` branch. Pushes to `main` also deploy via GitHub Actions.

## Layout

```
frontend/src/
  components/   Navigation, work carousels, about/skills, Prizma
  content/      Copy and project data (images loaded per work category)
  images/       WebP assets by project folder
```
