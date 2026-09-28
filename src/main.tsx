import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
// Polices hébergées sur le domaine (plus de feuille Google Fonts bloquante).
import '@fontsource-variable/inter';
import '@fontsource-variable/playfair-display';
import './index.css'

// Le client HYDRATE le HTML pré-rendu (même data/contenu.json des deux côtés,
// adsim-core GUIDE § 6.4) au lieu de le reconstruire : l'image LCP et le texte
// restent en place pendant le chargement du JS (PageSpeed du 28/09/2026).
// Page sans pré-rendu (app.html : admin) : racine vide, rendu client classique.
const racine = document.getElementById('root')!;
const application = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
if (racine.hasChildNodes()) ReactDOM.hydrateRoot(racine, application);
else ReactDOM.createRoot(racine).render(application);
