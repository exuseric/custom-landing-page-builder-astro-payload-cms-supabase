# 🚀 Custom Landing Page Builder

A **self-hosted landing page generator** built with **Payload CMS**, **Supabase**, and **Astro**.  
This project provides a **block-based content builder** for generating fast, branded landing pages with a modern developer workflow.  

Originally inspired by real-world client projects, this is a **generalized version** — safe to demo and extend without any client data.

---

## ✨ Features

- **Composable blocks**: heroes, CTAs, testimonials, contact forms, and more.
- **Self-hosted CMS** (Payload + Supabase): customizable, schema-driven, PostgreSQL backend and S3 storage.
- **Static site rendering** (Astro): SEO-friendly, fast-loading pages with minimal JavaScript.
- **Multi-tenant ready**: supports multiple brands or country-specific sites.
- **Extensible**: framework-agnostic and SaaS-ready.

---

## 📂 Monorepo Layout

- `/payload-cms` Payload CMS backend (content schemas, auth, API, storage).
- `/astro-frontend` Astro frontend (renders and builds landing pages from CMS content).

---

## 🏗 Architecture

1. **CMS**  
   - Define page schemas + reusable block types.  
   - Store content in Supabase (Postgres + S3-compatible storage).  
   - Expose a GraphQL/REST API.  

2. **Frontend**  
   - Fetch structured content from the CMS API.  
   - Render static landing pages using Astro.  
   - Apply themes & styles per tenant.  

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker (optional, for running Supabase locally)

### Setup
```bash
# Clone repo
git clone https://github.com/exuseric/custom-landing-page-builder-astro-payload-cms-supabase.git
cd custom-landing-page-builder

# Install CMS
cd payload-cms
pnpm install
pnpm dev

# Install frontend
cd astro-frontend
pnpm install
pnpm dev
