
### **2. Architecture Overview (`ARCHITECTURE.md`)**

#### **2.1. High-Level Overview**

The Landing Page Generator is a monolithic repository that follows a multi-tenant, static-site generation (SSG) architecture. It uses Astro to compile data and components into distinct, static websites for each client.

The data flow is as follows:
1.  **Data Source (External):** Content (text, images, theme colors) is managed in a headless CMS or a similar API-driven data source.
2.  **Payload Handling (`src/utils/payload`):** During the build process, utility functions fetch and parse this data for a specific client.
3.  **Component Rendering (`src/components`, `src/pages`):** Astro pages and components consume the processed data as props.
4.  **Static Build (`astro build`):** Astro generates the final static HTML, CSS, and JavaScript for each client site into the `build/` directory.

#### **2.2. Styling Philosophy**

The styling strategy is designed for consistency and maintainability.
*   **Foundation:** `src/assets/css/global.css` is the single source of truth for design tokens (colors, fonts, spacing) and global styles. It uses CSS Custom Properties (variables) extensively.
*   **Theming:** Client-specific branding is achieved by setting the `--themeColor` variable at the build stage, which cascades through the entire color system.
*   **Component Styles:** Individual components have their own co-located stylesheets. These styles should **always** use the variables defined in `global.css` and should only contain rules specific to that component's structure.
*   **Utility-First:** Developers should leverage the utility classes (`.text-primary`, `.bg-neutral-200`, etc.) and grid system from `global.css` whenever possible to avoid writing redundant CSS.

#### **2.3. Creating a New Page**

To create a new landing page, a developer would typically:
1.  Add a new Astro file in `src/pages/`.
2.  Compose the page by importing and using the necessary components from `src/components`.
3.  Configure the build process to fetch the appropriate data for that page.
