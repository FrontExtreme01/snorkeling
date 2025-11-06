// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://snorkelingadventure.vercel.app',
  adapter: vercel(),
  output: 'server',
  trailingSlash: 'always',
  integrations: [react(), mdx(), sitemap({
    i18n: {
      defaultLocale: 'en',
      locales: {
        en: 'en-US',
        es: 'es-ES',
      }
    },
    filter: (page) =>
      !page.includes('/thanks') &&
      !page.includes('/form-error') &&
      !page.includes('/form-success')
  })],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});