# Prendas Adrián · Personal Portfolio

Personal portfolio website showcasing my work as a software engineer.

## Demo

Live site: [https://prendas-adrian.surge.sh](https://prendas-adrian.surge.sh)

## Features

- Single-page application with tab navigation: About Me, IT Solutions and Contact.
- Animated particles background.

## Tech Stack

- [React 19](https://react.dev)
- [Vite 8](https://vite.dev)
- [oxlint](https://oxc.rs/docs/guide/usage/linter)
- [Lightning CSS](https://lightningcss.dev)
- Custom CSS (no UI frameworks)

## Editing Content

All the website content lives in a single file: `src/data/data.js`. There you can update:

- Personal information (`personalInfo`)
- Social links (`socialLinks`)
- Offered solutions (`solutions`)
- Projects (`projects`)
- Skills (`skills`)
- Navigation tabs (`tabs`)

No component changes are needed to update the content.

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Run the linter
npm run lint
```

## Deployment

Generate the production build:

```bash
npm run build
```

The output is a static site in `dist/`, ready to be served by any static hosting provider.

---

&copy; 2026 Prendas Adrián. All rights reserved.
