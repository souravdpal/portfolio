# Portfolio

My personal portfolio website — built with Next.js, TypeScript, and Tailwind CSS. Showcases my projects, background, and a way to get in touch.

## ✨ Features

- **Hero section** — introduction and quick overview
- **About** — background and skills
- **Projects** — showcase of selected work with project cards
- **Contact form** — reach out directly, backed by an API route
- **Dark / light theme toggle** — with persisted theme context
- **Aurora background** — animated visual accent
- **Social links & footer**

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) (via PostCSS)
- ESLint for linting

## 📁 Project Structure

```
app/
├── api/contact/route.ts     # Contact form API endpoint
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── ProjectCard.tsx
│   ├── projects.tsx
│   ├── contact.tsx
│   ├── contactform.tsx
│   ├── nav.tsx
│   ├── footer.tsx
│   ├── ThemeToggle.tsx
│   ├── context_theme.tsx
│   ├── Aurorabackground.tsx
│   ├── sociallinks.tsx
│   ├── icons.tsx
│   └── sitestyles.tsx
├── globals.css
├── layout.tsx
└── page.tsx
```

## 🚀 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/souravdpal/portfolio.git
cd portfolio
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📦 Build

```bash
npm run build
npm start
```

## 🌐 Deployment

This project is deployed on [Vercel](https://souravdp.vercel.app/). Every push to `main` triggers an automatic deployment.

## 📬 Contact

Feel free to reach out through the contact form on the site, or connect via the social links in the footer.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
