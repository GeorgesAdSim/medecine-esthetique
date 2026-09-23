import React from 'react';
import { supabase } from '../lib/supabase';
import BlockRenderer from '../components/BlockRenderer';

interface ContentBlock {
  id: string;
  block_type: string;
  content: any;
  block_order: number;
}

const Home: React.FC = () => {
  const [blocks, setBlocks] = React.useState<ContentBlock[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_pages')
        .select('content')
        .eq('slug', 'accueil')
        .maybeSingle();

      if (error) {
        console.error('Error loading home content:', error);
        return;
      }

      if (data?.content) {
        setBlocks(data.content.sort((a: ContentBlock, b: ContentBlock) => a.block_order - b.block_order));
      }
    } catch (error) {
      console.error('Error loading home content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Chargement...</p>
        </div>
      </div>
    );
  }

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
