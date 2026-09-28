import React from 'react';
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
    </div>
  );
};

export default Home;
