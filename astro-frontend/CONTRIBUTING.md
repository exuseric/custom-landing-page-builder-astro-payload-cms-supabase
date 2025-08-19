
### **3. Contribution Guidelines (`CONTRIBUTING.md`)**

#### **3.1. Getting Started**

1.  **Prerequisites:** Node.js (version specified in `package.json`), npm.
2.  **Installation:** `npm install`
3.  **Development:** `npm run dev` to start the local Astro development server.

#### **3.2. Code Conventions**

*   **Follow Existing Patterns:** Before writing any code, analyze the existing components, utilities, and styles to understand the established conventions.
*   **Styling:**
    *   Do NOT add new colors, fonts, or spacing values directly in component CSS. Add them as variables to `global.css` if they are intended for reuse.
    *   Always use `var(--variable-name)` for styling.
    *   Leverage existing utility classes before writing new CSS rules.
*   **Components:**
    *   Components should be composable and receive all their data via props.
    *   Avoid fetching data directly within a component; data should be passed down from the page level.
*   **Commits:** Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. (e.g., `feat:`, `fix:`, `refactor:`, `docs:`).

#### **3.3. Submitting Changes**

1.  Create a new branch for your feature or fix.
2.  Make your changes, ensuring they adhere to the code conventions.
3.  If you make any changes to the styling system, verify they do not break existing pages.
4.  Submit a pull request with a clear description of the changes and their purpose.
