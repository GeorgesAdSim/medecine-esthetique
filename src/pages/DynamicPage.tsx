import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import BlockRenderer from '../components/BlockRenderer';
import { ZonesDuSite } from '../components/Silo';
import Breadcrumbs from '../components/Breadcrumbs';
import About from './About';
import Treatments from './Treatments';
import Gallery from './Gallery';
import NotFound from './NotFound';
import { PAGES_FIXES, normaliser, pageDe } from '../contenu/routes';

const staticComponents: Record<string, React.ComponentType> = {
  '/docteur-jocelyne-fassotte': About,
  '/medecine-esthetique-liege': Treatments,
  '/galerie': Gallery,
};

const DynamicPage: React.FC = () => {
  const location = useLocation();
  const chemin = normaliser(location.pathname);
  const isPreview = new URLSearchParams(location.search).get('preview') === 'true';
  const [pageApercu, setPageApercu] = useState<any>(null);

  // Aperçu depuis l'admin (?preview=true) : lecture directe de Supabase, sans
  // filtre de publication. Le rendu normal, lui, vient du contenu publié.
  useEffect(() => {
    setPageApercu(null);
    if (!isPreview) return;
    const slug = PAGES_FIXES[chemin] ?? chemin.replace(/^\//, '');
    supabase
      .from('custom_pages')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
      .then(({ data }) => {
        if (data && Array.isArray(data.content) && data.content.length > 0) setPageApercu(data);
      });
  }, [chemin, isPreview]);

  const customPage: any = pageApercu ?? pageDe(chemin) ?? null;

  if (customPage && customPage.content && customPage.content.length > 0) {
    // Trier les blocs par ordre avant de les afficher
    const sortedContent = [...customPage.content].sort((a: any, b: any) => {
      const orderA = a.order !== undefined ? a.order : 0;
      const orderB = b.order !== undefined ? b.order : 0;
      return orderA - orderB;
    });

    // Les données de Supabase ont déjà la bonne structure: {id, type, content, order}
    // Assurons-nous juste que chaque bloc a un id et les bonnes propriétés
    const blocks = sortedContent.map((block: any, index: number) => ({
      ...block,
      id: block.id || `block-${index}`,
      block_type: block.type || block.block_type,
      block_order: block.order !== undefined ? block.order : (block.block_order !== undefined ? block.block_order : index)
    }));

    return (
      <>
        <BlockRenderer blocks={blocks} />
        {chemin === '/medecine-esthetique-liege' && <ZonesDuSite />}
      </>
    );
  }

  const StaticComponent = staticComponents[location.pathname];
  if (StaticComponent) {
    return <StaticComponent />;
  }

  return <NotFound />;
};

export default DynamicPage;
