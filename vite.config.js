import { defineConfig } from 'vite';

export default defineConfig({
  // Caminhos relativos também funcionam quando o site é publicado em um subdiretório.
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
