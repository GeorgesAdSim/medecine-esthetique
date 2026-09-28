import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BlockRenderer from '../components/BlockRenderer';
import Breadcrumbs from '../components/Breadcrumbs';
import NotFound from './NotFound';
import RelatedTreatments from '../components/RelatedTreatments';
import AccesCabinet from '../components/AccesCabinet';
import EnBref from '../components/EnBref';
import { ListeSources } from '../components/Sources';
import { appuisParAncre, sourcesDe } from '../contenu/sources';
import { getAllTreatments, getTreatmentRelations } from '../utils/treatmentLinks';
import { NOMS_PILIERS, SOUS_PAGES, normaliser, traitementDe } from '../contenu/routes';
import { LiensDeLaFille, ZonesDuPilier } from '../components/Silo';

/**
 * Traitements complémentaires (relations écrites dans utils/treatmentLinks.ts) :
 * chaque page de traitement lie trois autres, et la page des traitements.
 */
const Complementaires: React.FC<{ chemin: string }> = ({ chemin }) => {
  const relations = getTreatmentRelations(chemin.replace(/^\//, ''));
  if (!relations.length) return null;
  return (
    <>
      <RelatedTreatments currentTreatment="" treatments={relations} />
      <p className="text-center font-inter text-neutral-600 pb-16 bg-neutral-50 px-4 leading-loose">
        <Link to="/medecine-esthetique-liege" className="text-primary-600 underline">
          Voir tous les traitements de médecine esthétique
        </Link>
        {' · '}
        <Link to="/galerie" className="text-primary-600 underline">
          Galerie photos des traitements
        </Link>
        {' · '}
        <Link to="/docteur-jocelyne-fassotte" className="text-primary-600 underline">
          Qui est la Dre Jocelyne Fassotte ?
        </Link>
      </p>
    </>
  );
};

/** Nom du traitement pour les titres de section (liste de treatmentLinks, sinon titre de la page). */
const nomCourt = (chemin: string, repli: string): string =>
  getAllTreatments().find((t) => `/${t.slug}` === chemin)?.title ?? repli;

const DynamicTreatmentPage: React.FC = () => {
  const location = useLocation();
  const chemin = normaliser(location.pathname);
  const trouve = traitementDe(chemin);

  // Même mise en forme qu'avant le pré-rendu : un traitement de
  // custom_treatments expose is_published et meta_title à partir de ses champs.
  const customPage: any = !trouve
    ? null
    : trouve.source === 'traitement'
      ? { ...trouve.donnees, is_published: trouve.donnees.is_active, meta_title: trouve.donnees.meta_title || trouve.donnees.title }
      : trouve.donnees;

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

      const fille = SOUS_PAGES[chemin];
      const nomPilier = fille ? NOMS_PILIERS[fille.parent] ?? '' : '';
      return (
        <>
          <Breadcrumbs customItems={[
            { label: 'Traitements', path: '/medecine-esthetique-liege' },
            ...(fille ? [{ label: nomPilier, path: fille.parent }] : []),
            { label: fille ? fille.nom : customPage.title, path: chemin }
          ]} />
          {/* Haut de page, puis l'encadré « En bref », puis le reste du contenu. */}
          <BlockRenderer blocks={transformedBlocks.slice(0, 1)} />
          <EnBref chemin={chemin} />
          <BlockRenderer blocks={transformedBlocks.slice(1)} appuis={appuisParAncre(chemin)} />
          <ZonesDuPilier pilier={chemin} traitement={NOMS_PILIERS[chemin] ?? customPage.title} />
          {sourcesDe(chemin) && <ListeSources sources={sourcesDe(chemin)!.sources} />}
          <AccesCabinet traitement={fille ? fille.ancreLien.replace(/ à Liège$/, '') : nomCourt(chemin, customPage.title)} />
          {fille ? <LiensDeLaFille chemin={chemin} nomPilier={nomPilier} /> : <Complementaires chemin={chemin} />}
        </>
      );
    }

    // If it's a treatment from custom_treatments table without custom content,
    // render a basic treatment page
    if (customPage.subtitle || customPage.description) {
      return (
        <>
          <Breadcrumbs customItems={[
            { label: 'Traitements', path: '/medecine-esthetique-liege' },
            { label: customPage.title, path: chemin }
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

  return <NotFound />;
};

export default DynamicTreatmentPage;
