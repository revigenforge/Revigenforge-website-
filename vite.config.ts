import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Relative base so the build works on a custom domain, a project
  // subpath (GitHub Pages) or a static host without reconfiguration.
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssTarget: 'chrome100',
  },
});
