import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Les paquets @adsim/* sont des liens vers ../adsim-core (link:). Vite les
// traite comme du source ; `dedupe` garantit une seule copie de React.
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: { dedupe: ['react', 'react-dom'] },
  ssr: { noExternal: [/^@adsim\//] },
});
