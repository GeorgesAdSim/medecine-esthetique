import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import BlockRenderer from '../components/BlockRenderer';
import Breadcrumbs from '../components/Breadcrumbs';
import About from './About';
import Treatments from './Treatments';
import Gallery from './Gallery';
import Contact from './Contact';

const staticComponents: Record<string, React.ComponentType> = {
  '/docteur-jocelyne-fassotte': About,
  '/a-propos': About,
  '/traitements': Treatments,
  '/medecine-esthetique-liege': Treatments,
  '/galerie': Gallery,
  '/galerie-photos-avant-apres': Gallery,
  '/resultats-medecine-esthetique': Gallery,
  '/contact': Contact,
  '/consultation-medecine-esthetique-liege': Contact,
};

const slugMapping: Record<string, string> = {
  '/docteur-jocelyne-fassotte': 'a-propos',
  '/a-propos': 'a-propos',
  '/traitements': 'traitements',
  '/medecine-esthetique-liege': 'traitements',
  '/galerie': 'galerie',
  '/galerie-photos-avant-apres': 'galerie',
  '/resultats-medecine-esthetique': 'galerie',
  '/contact': 'contact',
  '/prendre-rendez-vous': 'prendre-rendez-vous',
  '/consultation-medecine-esthetique-liege': 'contact',
};

const DynamicPage: React.FC = () => {
  const location = useLocation();
  const params = useParams<{ slug?: string }>();
  const [customPage, setCustomPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      try {
        const pathname = location.pathname;
        const searchParams = new URLSearchParams(location.search);
        const isPreview = searchParams.get('preview') === 'true';

        // Try to get slug from URL params first (for catch-all route)
        let slugToLoad = params.slug;

        // If no param slug, try the slug mapping for known routes
        if (!slugToLoad) {
          slugToLoad = slugMapping[pathname];
        }

        if (slugToLoad) {
          // Build query - if preview mode, don't filter by is_published
          let query = supabase
            .from('custom_pages')
            .select('*')
            .eq('slug', slugToLoad);

          // Only filter by is_published if not in preview mode
          if (!isPreview) {
            query = query.eq('is_published', true);
          }

          const { data, error } = await query.maybeSingle();

          if (!error && data && data.content && data.content.length > 0) {
            console.log('✅ Found custom page with slug:', slugToLoad, data);
            setCustomPage(data);
          } else {
            console.log('❌ No custom page found or no blocks, using static component');
            setCustomPage(null);
          }
        }
      } catch (error) {
        console.error('Error loading custom page:', error);
        setCustomPage(null);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [location.pathname, location.search, params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
        <Helmet>
          <title>{customPage.title} - Docteure Jocelyne Fassotte</title>
          {customPage.meta_description && (
            <meta name="description" content={customPage.meta_description} />
          )}
        </Helmet>
        <BlockRenderer blocks={blocks} />
      </>
    );
  }

  const StaticComponent = staticComponents[location.pathname];
  if (StaticComponent) {
    return <StaticComponent />;
  }

  return <div>Page non trouvée</div>;
};

export default DynamicPage;
