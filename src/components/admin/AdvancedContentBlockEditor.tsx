import React, { useState } from 'react';
import { Type, Image as ImageIcon, Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';

interface ContentBlock {
  id: string;
  type: string;
  order: number;
  content: any;
}

interface AdvancedContentBlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

const AdvancedContentBlockEditor: React.FC<AdvancedContentBlockEditorProps> = ({ blocks, onChange }) => {
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedBlocks);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedBlocks(newExpanded);
  };

  const addBlock = (type: string) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      order: blocks.length,
      content: getDefaultContent(type)
    };
    onChange([...blocks, newBlock]);
  };

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'heading':
        return { text: 'Nouveau titre', level: 'h2' };
      case 'text':
        return { text: 'Nouveau paragraphe...' };
      case 'image':
        return { url: '', alt: '', caption: '' };
      case 'hero':
        return {
          title: 'Titre principal',
          subtitle: 'Sous-titre',
          description: 'Description...',
          image: '',
          imageAlt: '',
          ctaText: 'En savoir plus',
          ctaLink: ''
        };
      case 'features':
        return {
          features: [
            { icon: 'heart', title: 'Titre', description: 'Description...' }
          ]
        };
      case 'cards':
        return {
          cards: [
            { title: 'Titre', description: 'Description...', details: [] }
          ]
        };
      case 'faq':
        return {
          title: 'Questions fréquentes',
          subtitle: '',
          questions: [
            { question: 'Question ?', answer: 'Réponse...' }
          ]
        };
      case 'cta':
        return {
          title: 'Titre CTA',
          description: 'Description...',
          primaryButton: { text: 'Bouton', link: '' }
        };
      default:
        return {};
    }
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    onChange(
      blocks.map(block =>
        block.id === id ? { ...block, ...updates } : block
      )
    );
  };

  const deleteBlock = (id: string) => {
    onChange(blocks.filter(block => block.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;

    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];

    newBlocks.forEach((block, idx) => {
      block.order = idx;
    });

    onChange(newBlocks);
  };

  const renderBlockEditor = (block: ContentBlock) => {
    const isExpanded = expandedBlocks.has(block.id);

    return (
      <div key={block.id} className="border border-gray-200 rounded-lg bg-white">
        <div
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => toggleExpand(block.id)}
        >
          <div className="flex items-center space-x-3">
            <span className="text-xs font-medium text-gray-500 uppercase bg-gray-100 px-2 py-1 rounded">
              {block.type}
            </span>
            <span className="text-sm text-gray-700">
              {getBlockTitle(block)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteBlock(block.id);
              }}
              className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="p-4 border-t border-gray-200 space-y-4">
            {renderContentEditor(block)}
          </div>
        )}
      </div>
    );
  };

  const getBlockTitle = (block: ContentBlock): string => {
    switch (block.type) {
      case 'heading':
        return block.content?.text || 'Titre';
      case 'text':
        return block.content?.text?.substring(0, 50) || 'Texte';
      case 'hero':
        return block.content?.title || 'Hero';
      case 'features':
        return `${block.content?.features?.length || 0} fonctionnalités`;
      case 'cards':
        return `${block.content?.cards?.length || 0} cartes`;
      case 'faq':
        return block.content?.title || 'FAQ';
      case 'cta':
        return block.content?.title || 'CTA';
      default:
        return block.type;
    }
  };

  const renderContentEditor = (block: ContentBlock) => {
    const updateContent = (path: string, value: any) => {
      const newContent = { ...block.content };
      const keys = path.split('.');
      let current = newContent;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      updateBlock(block.id, { content: newContent });
    };

    switch (block.type) {
      case 'heading':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Texte</label>
              <input
                type="text"
                value={block.content?.text || ''}
                onChange={(e) => updateContent('text', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
              <select
                value={block.content?.level || 'h2'}
                onChange={(e) => updateContent('level', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
              </select>
            </div>
            {block.content?.subtitle !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sous-titre</label>
                <input
                  type="text"
                  value={block.content?.subtitle || ''}
                  onChange={(e) => updateContent('subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            )}
          </div>
        );

      case 'text':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contenu</label>
            <textarea
              value={block.content?.text || ''}
              onChange={(e) => updateContent('text', e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        );

      case 'image':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
              <input
                type="text"
                value={block.content?.url || ''}
                onChange={(e) => updateContent('url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Texte alternatif</label>
              <input
                type="text"
                value={block.content?.alt || ''}
                onChange={(e) => updateContent('alt', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            {block.content?.url && (
              <img
                src={block.content.url}
                alt={block.content.alt || ''}
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>
        );

      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contenu JSON (avancé)
            </label>
            <textarea
              value={JSON.stringify(block.content, null, 2)}
              onChange={(e) => {
                try {
                  const newContent = JSON.parse(e.target.value);
                  updateBlock(block.id, { content: newContent });
                } catch (err) {
                  console.error('Invalid JSON');
                }
              }}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm"
            />
          </div>
        );
    }
  };

  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Blocs de Contenu</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => addBlock('heading')}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <Type className="w-4 h-4" />
            <span>Titre</span>
          </button>
          <button
            onClick={() => addBlock('text')}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <Type className="w-4 h-4" />
            <span>Texte</span>
          </button>
          <button
            onClick={() => addBlock('image')}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <ImageIcon className="w-4 h-4" />
            <span>Image</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {sortedBlocks.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-4">Aucun bloc de contenu</p>
            <button
              onClick={() => addBlock('text')}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter votre premier bloc</span>
            </button>
          </div>
        ) : (
          sortedBlocks.map((block, index) => (
            <div key={block.id} className="flex items-start space-x-2">
              <div className="flex flex-col space-y-1 pt-4">
                <button
                  onClick={() => moveBlock(index, 'up')}
                  disabled={index === 0}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs"
                >
                  ▲
                </button>
                <button
                  onClick={() => moveBlock(index, 'down')}
                  disabled={index === sortedBlocks.length - 1}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs"
                >
                  ▼
                </button>
              </div>
              <div className="flex-1">
                {renderBlockEditor(block)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdvancedContentBlockEditor;
