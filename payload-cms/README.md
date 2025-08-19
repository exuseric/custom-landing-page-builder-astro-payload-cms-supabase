# Landing CMS Payload

This project is a Next.js application powered by Payload CMS, utilizing PostgreSQL (via Supabase) for the database and S3-compatible storage (via Supabase) for media. It is designed for deployment on Render.

## Quick Start

This template can be deployed directly to Render. It is configured to use PostgreSQL and S3-compatible storage, typically provided by Supabase.

## Project Architecture

This project is built on a modern web stack designed for flexibility and scalability:

*   **Frontend:** Next.js (React) for server-side rendering and static site generation.
*   **CMS & Backend:** Payload CMS, providing a powerful headless CMS with a built-in admin UI.
*   **Database:** PostgreSQL, managed via Supabase, for robust and scalable data storage.
*   **File Storage:** S3-compatible object storage, also managed via Supabase, for efficient media asset handling.
*   **Hosting:** Deployed on Render, offering continuous deployment and scalable infrastructure.

These components work together to provide a seamless content management and delivery experience.

## Quick Start - Local Setup

To spin up this project locally, follow these steps:

### Development

1.  **Clone the repository:** If you haven't already, clone this repository to your local machine.
2.  **Set up environment variables:** Copy `.env.example` to `.env` (`cp .env.example .env`). You will need to populate the `DATABASE_URI` with your PostgreSQL connection string (e.g., from Supabase) and configure the S3 environment variables (`S3_BUCKET`, `S3_REGION`, `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`).
3.  **Install dependencies and start the dev server:** Run `pnpm install && pnpm dev` to install dependencies and start the development server.
4.  **Access the application:** Open `http://localhost:3000` in your browser.

Changes made in `./src` will be reflected in your application. Follow the on-screen instructions to log in and create your first admin user.

### Docker (Optional)

If you prefer to use Docker for local development, the provided `docker-compose.yml` file can be used to spin up a PostgreSQL database.

To do so, follow these steps:

-   Ensure your `.env` file's `DATABASE_URI` is configured to connect to the Dockerized PostgreSQL instance (e.g., `postgresql://user:password@localhost:5432/database`).
-   Run `docker-compose up` to start the database. You can add `-d` to run it in the background.

## Deployment on Render

This project is configured for deployment on Render. Follow these steps to deploy your application:

1.  **Create a new Web Service on Render:** Connect your GitHub repository.
2.  **Build Command:** `pnpm install && pnpm build`
3.  **Start Command:** `pnpm start`
4.  **Environment Variables:** Configure the following environment variables in Render:
    -   `DATABASE_URI`: Your PostgreSQL connection string (e.g., from Supabase).
    -   `PAYLOAD_SECRET`: A strong, unique secret for Payload CMS.
    -   `S3_BUCKET`: Your S3 bucket name.
    -   `S3_REGION`: Your S3 bucket region.
    -   `S3_ENDPOINT`: Your S3 endpoint (e.g., from Supabase Storage).
    -   `S3_ACCESS_KEY_ID`: Your S3 access key ID.
    -   `S3_SECRET_ACCESS_KEY`: Your S3 secret access key.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

-   #### Users (Authentication)

    Users are auth-enabled collections that have access to the admin panel.

    For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

-   #### Media

    This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

-   #### Pages

    The `Pages` collection is the core content management entity. It utilizes a flexible block-based system, allowing content editors to construct pages using various predefined content sections. Key fields include:
    *   `title`: The main title of the page.
    *   `country`: A select field to specify the target country for the page.
    *   `theme color`: Defines the theme color for the page.
    *   `core values`: Text field for core values.
    *   `url`: Auto-generated URL based on title and country, with a `beforeValidate` hook.
    *   `operating hours`: Rich text field for operating hours.
    *   `SEOField`: Custom field for Search Engine Optimization metadata.
    *   `NavigationField`: Custom field for navigation links.
    *   `hero`: A blocks field for hero sections, limited to one `SimpleHero` block.
    *   `content`: A blocks field for general content, supporting various `ContentBlocks`.
    *   `contact`: A blocks field for contact sections, limited to one `SimpleContact` block.
    *   `social links`: An array field for managing social media links.
    *   `footer style`: Select field for different footer styles.

### Blocks

Blocks are reusable content components that can be added to `Pages`:

*   **Hero Blocks:**
    *   `SimpleHero`: A basic hero section with a title, subtitle, and call to action.
*   **Content Blocks:**
    *   `ContentWithGrid`: Content layout with a grid structure.
    *   `ContentWithMedia`: Content with associated media (images/videos).
    *   `CTA Blocks` (e.g., `ImageGridCTA`, `SimpleCallToAction`, `TwoImageCTA`): Various call-to-action layouts.
    *   `Testimonial Blocks` (e.g., `SimpleTestimonial`): For displaying testimonials.
    *   `WhyChooseUs Blocks` (e.g., `WhyChooseUsColumn`, `WhyChooseUsGrid`, `WhyChooseUsInteractive`): Blocks highlighting reasons to choose a service/product.
*   **Contact Blocks:**
    *   `SimpleContact`: A straightforward contact form or information section.
    *   `MultiLocation`: Contact information for multiple locations.

### Custom Fields & Utilities

*   `NavigationField`: A custom field type for defining navigation menus.
*   `SEOField`: A custom field type for managing SEO-related metadata (title, description, keywords).
*   `generateUrl`: A utility function (`src/utils/generate-url.ts`) used to automatically generate user-friendly URLs based on page title and country.
*   `anchor-id`: A utility function (`src/utils/anchor-id.ts`) for generating unique anchor IDs.
*   `company-info`: A utility function (`src/utils/company-info.ts`) for managing company-related information.

## Common Development Tasks

*   **Install Dependencies:** `pnpm install`
*   **Start Development Server:** `pnpm dev` (runs Next.js and Payload CMS in development mode)
*   **Build for Production:** `pnpm build`
*   **Start Production Server:** `pnpm start`
*   **Generate Payload Types:** `pnpm generate:types` (updates `payload-types.ts` based on your Payload config)
*   **Run Linter:** `pnpm lint`
*   **Payload CLI:** `pnpm payload` (accesses various Payload CMS command-line tools)


