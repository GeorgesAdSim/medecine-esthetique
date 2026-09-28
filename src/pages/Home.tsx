import React from 'react';
import { Link } from 'react-router-dom';
import BlockRenderer from '../components/BlockRenderer';
import { pageParSlug } from '../contenu';

interface ContentBlock {
  id: string;
  block_type: string;
  content: any;
  block_order: number;
}

const Home: React.FC = () => {
  const blocks: ContentBlock[] = [...((pageParSlug('accueil')?.content as ContentBlock[] | null) ?? [])].sort(
    (a, b) => a.block_order - b.block_order,
  );

  return (
    <div className="animate-fade-in">
      {blocks.length > 0 ? (
        blocks.map(block => (
          <BlockRenderer key={block.id} block={block} />
        ))
      ) : (
        <div className="py-20 text-center">
          <p className="text-neutral-600">Contenu en cours de configuration...</p>
        </div>
      )}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-inter text-neutral-700 leading-relaxed">
          <p>
            Découvrez le parcours de la{' '}
            <Link to="/docteur-jocelyne-fassotte" className="text-primary-600 underline">
              Dre Jocelyne Fassotte, médecin esthétique diplômée du CIME
            </Link>
            , et parcourez la{' '}
            <Link to="/galerie" className="text-primary-600 underline">
              galerie photos du cabinet et des traitements
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
