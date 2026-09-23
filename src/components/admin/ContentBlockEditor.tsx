import React, { useState } from 'react';
import { Type, Image as ImageIcon, Video, Trash2, Plus, Save } from 'lucide-react';
import MediaLibrary from './MediaLibrary';

export interface Block {
  id: string;
  type: 'text' | 'image' | 'video' | 'heading';
  content: string;
  settings?: {
    alignment?: 'left' | 'center' | 'right';
    size?: 'small' | 'medium' | 'large';
    style?: string;
  };
}

interface ContentBlockEditorProps {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}

const ContentBlockEditor: React.FC<ContentBlockEditorProps> = ({ blocks, onChange }) => {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [currentImageBlockId, setCurrentImageBlockId] = useState<string | null>(null);

  const addBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: type === 'heading' ? 'Nouveau titre' : type === 'text' ? 'Nouveau contenu...' : '',
      settings: {
        alignment: 'left',
        size: 'medium'
      }
    };
    onChange([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    onChange(
      blocks.map(block =>
        block.id === id ? { ...block, ...updates } : block
      )
    );
  };

  const deleteBlock = (id: string) => {
    onChange(blocks.filter(block => block.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;

    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    onChange(newBlocks);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Blocs de Contenu</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => addBlock('heading')}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            title="Ajouter un titre"
          >
            <Type className="w-4 h-4" />
            <span>Titre</span>
          </button>
          <button
            onClick={() => addBlock('text')}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            title="Ajouter du texte"
          >
            <Type className="w-4 h-4" />
            <span>Texte</span>
          </button>
          <button
            onClick={() => addBlock('image')}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            title="Ajouter une image"
          >
            <ImageIcon className="w-4 h-4" />
            <span>Image</span>
          </button>
          <button
            onClick={() => addBlock('video')}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            title="Ajouter une vidéo"
          >
            <Video className="w-4 h-4" />
            <span>Vidéo</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {blocks.length === 0 ? (
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
          blocks.map((block, index) => (
            <div
              key={block.id}
              className={`border rounded-lg p-4 transition-all ${
                selectedBlockId === block.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => setSelectedBlockId(block.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="flex flex-col space-y-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveBlock(index, 'up');
                    }}
                    disabled={index === 0}
                    className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs"
                  >
                    ▲
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveBlock(index, 'down');
                    }}
                    disabled={index === blocks.length - 1}
                    className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs"
                  >
                    ▼
                  </button>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      {block.type === 'heading' && 'Titre'}
                      {block.type === 'text' && 'Texte'}
                      {block.type === 'image' && 'Image'}
                      {block.type === 'video' && 'Vidéo'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBlock(block.id);
                      }}
                      className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {block.type === 'heading' && (
                    <input
                      type="text"
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                      className="w-full px-4 py-2 text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Entrez votre titre..."
                    />
                  )}

                  {block.type === 'text' && (
                    <textarea
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-32"
                      placeholder="Entrez votre texte..."
                    />
                  )}

                  {block.type === 'image' && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={block.content}
                          onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="URL de l'image (https://...)"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageBlockId(block.id);
                            setShowMediaLibrary(true);
                          }}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors whitespace-nowrap"
                        >
                          Bibliothèque
                        </button>
                      </div>
                      {block.content && (
                        <img
                          src={block.content}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+non+disponible';
                          }}
                        />
                      )}
                    </div>
                  )}

                  {block.type === 'video' && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="URL de la vidéo YouTube ou Vimeo"
                      />
                      {block.content && (
                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                          <Video className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center space-x-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Alignement
                      </label>
                      <select
                        value={block.settings?.alignment || 'left'}
                        onChange={(e) =>
                          updateBlock(block.id, {
                            settings: {
                              ...block.settings,
                              alignment: e.target.value as any
                            }
                          })
                        }
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="left">Gauche</option>
                        <option value="center">Centre</option>
                        <option value="right">Droite</option>
                      </select>
                    </div>
                    {(block.type === 'text' || block.type === 'heading') && (
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Taille
                        </label>
                        <select
                          value={block.settings?.size || 'medium'}
                          onChange={(e) =>
                            updateBlock(block.id, {
                              settings: {
                                ...block.settings,
                                size: e.target.value as any
                              }
                            })
                          }
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="small">Petit</option>
                          <option value="medium">Moyen</option>
                          <option value="large">Grand</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showMediaLibrary && (
        <MediaLibrary
          onSelectImage={(url) => {
            if (currentImageBlockId) {
              updateBlock(currentImageBlockId, { content: url });
            }
            setShowMediaLibrary(false);
            setCurrentImageBlockId(null);
          }}
          onClose={() => {
            setShowMediaLibrary(false);
            setCurrentImageBlockId(null);
          }}
        />
      )}
    </div>
  );
};

export default ContentBlockEditor;
