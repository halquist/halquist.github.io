# Jon Halquist Portfolio

Personal portfolio site built with Create React App. The live site is at [halquist.github.io](https://halquist.github.io).

## Development

```bash
cd frontend
npm install
npm start
```

Or from the repo root:

```bash
npm start
```

## Deploy to GitHub Pages

The app deploys to the `gh-pages` branch. From the repo root:

```bash
npm run deploy
```

Or from `frontend/`:

```bash
npm run deploy
```

This runs `npm run build`, then publishes `frontend/build/` to `gh-pages`.

## Project layout

| Path | Purpose |
|------|---------|
| `frontend/` | React app (source of truth for the live site) |
| `backend/` | Legacy Express API (unused by the static site) |

## CI

Pushes to `main` trigger a GitHub Actions workflow that builds and deploys to GitHub Pages automatically.
