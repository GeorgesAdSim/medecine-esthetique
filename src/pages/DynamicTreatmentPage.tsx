import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import BlockRenderer from '../components/BlockRenderer';
import Breadcrumbs from '../components/Breadcrumbs';
import HyaluronicAcid from './HyaluronicAcid';
import Botox from './Botox';
import CollagenStimulator from './CollagenStimulator';
import Peeling from './Peeling';
import Mesolift from './Mesolift';
import FilsTenseurs from './FilsTenseurs';
import Cosmetologie from './Cosmetologie';
import LiquidLift from './LiquidLift';

const staticComponents: Record<string, React.ComponentType> = {
  '/acide-hyaluronique-liege': HyaluronicAcid,
  '/botox-liege': Botox,
  '/stimulateurs-collagene-liege': CollagenStimulator,
  '/peeling-liege': Peeling,
  '/mesolift-liege': Mesolift,
  '/fils-tenseurs-liege': FilsTenseurs,
  '/cosmetologie-liege': Cosmetologie,
  '/liquid-lift-liege': LiquidLift,
};

const DynamicTreatmentPage: React.FC = () => {
  const location = useLocation();
  const [customPage, setCustomPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      try {
        const pathname = location.pathname;
        console.log('Loading treatment page for pathname:', pathname);

        // First, try to find in custom_treatments table
        const { data: treatmentData, error: treatmentError } = await supabase
          .from('custom_treatments')
          .select('*')
          .eq('slug', pathname)
          .eq('is_active', true)
          .maybeSingle();

        if (!treatmentError && treatmentData) {
          console.log('✅ Found custom treatment:', treatmentData);
          setCustomPage({
            ...treatmentData,
            is_published: treatmentData.is_active,
            meta_title: treatmentData.meta_title || treatmentData.title,
          });
          setLoading(false);
          return;
        }

        // If not found in treatments, try custom_pages
        const pathnameClean = pathname.replace(/^\//, '');
        const slugVariants = [
          pathnameClean,
          pathnameClean.replace(/-liege$/, ''),
          pathnameClean.replace(/-bruxelles$/, ''),
        ];

        let customPageData = null;

        for (const slug of slugVariants) {
          console.log('Trying slug variant in custom_pages:', slug);
          const { data, error } = await supabase
            .from('custom_pages')
            .select('*')
            .eq('slug', slug)
            .eq('is_published', true)
            .maybeSingle();

          if (!error && data) {
            console.log('✅ Found custom page with slug:', slug, data);
            customPageData = data;
            break;
          }
        }

        if (customPageData) {
          setCustomPage(customPageData);
        } else {
          console.log('No custom page found, using static component');
          setCustomPage(null);
        }
      } catch (error) {
        console.error('Error loading page:', error);
        setCustomPage(null);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (customPage) {
    // If we have custom content blocks, render them
    if (customPage.content && customPage.content.length > 0) {
      // Trier les blocs par ordre avant de les afficher
      const sortedContent = [...customPage.content].sort((a: any, b: any) => {
        const orderA = a.order !== undefined ? a.order : 0;
        const orderB = b.order !== undefined ? b.order : 0;
        return orderA - orderB;
      });

      const transformedBlocks = sortedContent.map((block: any, index: number) => {
        const blockData = block.data || block.content || {};

        let content = { ...blockData };

        if (block.type === 'faq' && blockData.items) {
          content.questions = blockData.items;
        }

        if (block.type === 'text') {
          if (blockData.features) {
            return {
              id: `block-${index}`,
              type: 'features',
              content: { features: blockData.features, title: blockData.title }
            };
          }
          content.text = blockData.content || blockData.text;
          content.paragraphs = blockData.paragraphs || (blockData.content ? [blockData.content] : []);
        }

        if (block.type === 'list' && blockData.items) {
          const isComplexList = blockData.items.length > 0 && typeof blockData.items[0] === 'object';
          if (isComplexList) {
            return {
              id: `block-${index}`,
              type: 'cards',
              content: {
                title: blockData.title,
                subtitle: blockData.description,
                cards: blockData.items
              }
            };
          }
        }

        if (block.type === 'hero') {
          content.title = blockData.title;
          content.subtitle = blockData.subtitle;
          content.description = blockData.description;
          content.duration = blockData.duration;
          content.image = blockData.image;
          content.ctaText = blockData.buttonText;
          content.ctaLink = blockData.buttonLink;
        }

        return {
          id: `block-${index}`,
          type: block.type,
          order: index,
          content
        };
      });

      return (
        <>
          <Helmet>
            <title>{customPage.meta_title || customPage.title} - Docteure Jocelyne Fassotte</title>
            {customPage.meta_description && (
              <meta name="description" content={customPage.meta_description} />
            )}
          </Helmet>
          <Breadcrumbs customItems={[
            { label: 'Traitements', path: '/traitements' },
            { label: customPage.title, path: customPage.slug }
          ]} />
          <BlockRenderer blocks={transformedBlocks} />
        </>
      );
    }

    // If it's a treatment from custom_treatments table without custom content,
    // render a basic treatment page
    if (customPage.subtitle || customPage.description) {
      return (
        <>
          <Helmet>
            <title>{customPage.meta_title || customPage.title} - Docteure Jocelyne Fassotte</title>
            {customPage.meta_description && (
              <meta name="description" content={customPage.meta_description} />
            )}
          </Helmet>
          <Breadcrumbs customItems={[
            { label: 'Traitements', path: '/traitements' },
            { label: customPage.title, path: customPage.slug }
          ]} />
          <div className="animate-fade-in">
            <section className="bg-gradient-hero pt-32 pb-16">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="font-playfair text-5xl font-bold text-neutral-800 mb-6 text-center">
                  {customPage.title}
                </h1>
                {customPage.subtitle && (
                  <p className="font-inter text-xl text-neutral-600 text-center mb-8">
                    {customPage.subtitle}
                  </p>
                )}
                {customPage.duration && (
                  <p className="font-inter text-lg text-primary-600 text-center">
                    Durée des résultats : {customPage.duration}
                  </p>
                )}
              </div>
            </section>

            {customPage.description && (
              <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <p className="font-inter text-lg text-neutral-700 leading-relaxed">
                    {customPage.description}
                  </p>
                </div>
              </section>
            )}
          </div>
        </>
      );
    }
  }

  // Fallback to static components
  const StaticComponent = staticComponents[location.pathname];
  if (StaticComponent) {
    return <StaticComponent />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-playfair text-4xl font-bold text-neutral-800 mb-4">Page non trouvée</h1>
        <p className="font-inter text-neutral-600">Cette page n'existe pas ou n'est pas encore disponible.</p>
      </div>
    </div>
  );
};

export default DynamicTreatmentPage;
