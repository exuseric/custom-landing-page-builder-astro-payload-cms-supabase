import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import favicons from "astro-favicons";

import { fetchPage } from './src/utils/payload';
import purgecss from 'astro-purgecss';
const { url, title, themeColor } = await fetchPage(['url', 'title', 'themeColor']);
// https://astro.build/config
export default defineConfig({
  output: "static",
  outDir: process.cwd() + '\\build\\' + url.slice(8),
  site: url,
  env: {
    schema: {
      PAGE_ID: envField.string({
        context: 'server',
        description: 'The ID of the page to fetch from Payload CMS',
        default: '1',
        access: 'secret'
      }),
      DATABASE_URL: envField.string({
        context: 'server',
        description: 'The URL of the Payload CMS instance',
        access: 'secret'
      }),
    }
  },
  build: {
    assets: 'assets',
    inlineStylesheets: 'never',
  },
  image: {
    domains: ["127.0.0.1"],
    responsiveStyles: true,
    layout: 'constrained'
  },
  compressHTML: false,
  integrations: [sitemap(), icon(), favicons({
    input: {
      favicons: [
        "public/logoipsum.png"
      ]
    },
    icons: {
      yandex: false,
      windows: false,
      appleStartup: false,
      android: true,
      favicons: true
    },
    themes: [themeColor],
    output: {
      assetsPrefix: "/favicon/",
      html: true,
      images: true
    },
    name: title,
    short_name: title,
  }), purgecss({
    variables: false,
    keyframes: true,
    fontFace: true
  })]
});