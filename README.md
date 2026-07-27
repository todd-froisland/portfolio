# Todd Froisland Portfolio

Personal portfolio website built with React + Vite.

## Tech Stack

- React
- Vite
- CSS
- ESLint

## Features

- Resume-driven portfolio content
- Project links to live sites
- Experience and technical highlights sections
- Resume download link from [src/assets/Resume_2026.pdf](src/assets/Resume_2026.pdf)
- Responsive layout for desktop and mobile

## Project Structure

- [src/App.jsx](src/App.jsx): Main page content and section data
- [src/App.css](src/App.css): Component/page styles
- [src/index.css](src/index.css): Global styles and theme variables
- [src/assets](src/assets): Images and resume PDF

## Getting Started

Install dependencies:

`npm install`

Run development server:

`npm run dev`

Build for production:

`npm run build`

Preview production build:

`npm run preview`

Run lint checks:

`npm run lint`

## Notes

- This repository was migrated from a static HTML portfolio to a React + Vite application.
- Update content primarily in [src/App.jsx](src/App.jsx).

## Deploying to GitHub Pages

This repo now includes a workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml) that builds and deploys on push to `main` or `master`.

One-time setup in GitHub:

1. Open repository **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main`/`master` (or run the workflow manually from **Actions**).

Notes:

- [vite.config.js](vite.config.js) auto-sets `base` during GitHub Actions builds so assets resolve correctly on project pages.
