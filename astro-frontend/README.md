
# Astro Frontend: Multi-Tenant Landing Page Generator

This project is a high-performance, scalable landing page generator built with [Astro](https://astro.build/). It enables rapid creation and deployment of consistent, on-brand, and SEO-optimized landing pages for multiple clients from a single codebase.

## ✨ What It Does

- **Multi-Client Static Site Generation:** Compiles unique, static landing pages for different clients using shared components and a central design system.
- **Composable Component Library:** Provides a rich set of reusable, themable Astro components (heroes, cards, navigation, footers, etc.) for flexible page assembly.
- **Dynamic Content Sourcing:** Fetches and injects content from an external API or headless CMS at build time, separating content from presentation.
- **Brand Consistency:** Uses a global design system and theming via CSS variables to ensure all pages adhere to modern, professional standards while allowing client-specific branding.
- **Performance & Accessibility:** Delivers excellent Core Web Vitals, semantic HTML, and accessibility features out of the box.
- **Internationalization:** Built-in support for multiple languages.

## 🏗️ How It Works

1. **Content Management:** Content (text, images, theme colors) is managed externally (e.g., headless CMS).
2. **Data Fetching:** During the build, utility functions in `src/utils/payload/` fetch and process this data for each client.
3. **Component Rendering:** Pages in `src/pages/` import and compose components from `src/components/`, passing in the fetched data as props.
4. **Static Build:** Astro generates static HTML, CSS, and JS for each client site, outputting to the `build/` directory.

## 🗂️ Project Structure

```
astro-frontend/
├── public/                # Static assets (images, icons, etc.)
├── src/
│   ├── assets/            # Global CSS, design tokens, and utility classes
│   ├── components/        # Reusable Astro components (heroes, cards, nav, etc.)
│   ├── pages/             # Page entrypoints (one per landing page)
│   └── utils/             # Data fetching, i18n, and helper utilities
├── package.json           # Project metadata and scripts
└── ...
```

## 🚀 Getting Started

1. **Install dependencies:**
	 ```sh
	 npm install
	 # or
	 pnpm install
	 ```
2. **Start the dev server:**
	 ```sh
	 npm run dev
	 ```
3. **Build for production:**
	 ```sh
	 npm run build
	 ```
4. **Preview the build:**
	 ```sh
	 npm run preview
	 ```

## 🧩 Extending & Customizing

- **Add a new landing page:**
	1. Create a new `.astro` file in `src/pages/`.
	2. Compose your page using components from `src/components/`.
	3. Configure data fetching for your page as needed.
- **Create or update components:**
	- Add new components to `src/components/` and follow the established styling and prop-driven data patterns.
- **Theming:**
	- Adjust the `--themeColor` variable or extend the design tokens in `src/assets/css/global.css` for new branding needs.
- **Internationalization:**
	- Add or update language files in `src/utils/lang/`.

## 🛠️ Key Features

- **Astro + TypeScript** for type safety and modern development.
- **Global design system** with CSS variables for easy theming.
- **Utility-first CSS** for rapid, consistent styling.
- **Multiple navigation, hero, card, and footer layouts** out of the box.
- **Dynamic content injection** from external sources.
- **Accessibility and SEO best practices** built in.

## 📚 Learn More

- [Product Requirements](./PRODUCT_REQUIREMENTS.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [Contribution Guidelines](./CONTRIBUTING.md)
- [Astro Documentation](https://docs.astro.build)
