import React, { useState } from 'react';
import {
  Type, Image as ImageIcon, Trash2, Plus, ChevronDown, ChevronUp,
  Save, Check, AlertCircle, Loader, Edit2, X
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ContentBlock {
  id: string;
  type: string;
  order: number;
  content: any;
}

interface EnhancedBlockEditorProps {
  pageId: string;
  blocks: ContentBlock[];
  onBlocksChange: (blocks: ContentBlock[]) => void;
}

const EnhancedBlockEditor: React.FC<EnhancedBlockEditorProps> = ({
  pageId,
  blocks: initialBlocks,
  onBlocksChange
}) => {
  const [blocks, setBlocks] = useState<ContentBlock[]>(initialBlocks);
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set());
  const [savingBlocks, setSavingBlocks] = useState<Set<string>>(new Set());
  const [savedBlocks, setSavedBlocks] = useState<Set<string>>(new Set());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  React.useEffect(() => {
    setBlocks(initialBlocks);
  }, [initialBlocks]);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedBlocks);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedBlocks(newExpanded);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    setBlocks(prev => {
      const newBlocks = prev.map(block =>
        block.id === id ? { ...block, ...updates } : block
      );
      onBlocksChange(newBlocks);
      return newBlocks;
    });
    setHasUnsavedChanges(true);

    const newSaved = new Set(savedBlocks);
    newSaved.delete(id);
    setSavedBlocks(newSaved);
  };

  const saveBlock = async (blockId: string) => {
    if (pageId.startsWith('temp-')) {
      alert('Veuillez d\'abord enregistrer la page avant de sauvegarder les blocs individuellement.');
      return;
    }

    setSavingBlocks(prev => new Set(prev).add(blockId));

    try {
      console.log('Saving blocks to database:', blocks);

      const { data, error } = await supabase
        .from('custom_pages')
        .update({
          content: blocks,
          updated_at: new Date().toISOString()
        })
        .eq('id', pageId)
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Save successful:', data);

      setSavedBlocks(prev => new Set(prev).add(blockId));
      setHasUnsavedChanges(false);

      setTimeout(() => {
        setSavedBlocks(prev => {
          const newSet = new Set(prev);
          newSet.delete(blockId);
          return newSet;
        });
      }, 2000);

      onBlocksChange(blocks);
    } catch (error) {
      console.error('Error saving block:', error);
      alert('Erreur lors de la sauvegarde: ' + (error as Error).message);
    } finally {
      setSavingBlocks(prev => {
        const newSet = new Set(prev);
        newSet.delete(blockId);
        return newSet;
      });
    }
  };

  const deleteBlock = (id: string) => {
    if (!confirm('Supprimer ce bloc ?')) return;
    setBlocks(prev => {
      const newBlocks = prev.filter(block => block.id !== id);
      onBlocksChange(newBlocks);
      return newBlocks;
    });
    setHasUnsavedChanges(true);
  };

  const renderHeroEditor = (block: ContentBlock) => {
    const updateContent = (field: string, value: any) => {
      updateBlock(block.id, {
        content: { ...block.content, [field]: value }
      });
    };

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre principal</label>
          <input
            type="text"
            value={block.content?.title || ''}
            onChange={(e) => updateContent('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="Titre principal..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sous-titre</label>
          <input
            type="text"
            value={block.content?.subtitle || ''}
            onChange={(e) => updateContent('subtitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="Sous-titre..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={block.content?.description || ''}
            onChange={(e) => updateContent('description', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="Description..."
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              value={block.content?.image || ''}
              onChange={(e) => updateContent('image', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="/image.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Texte alternatif</label>
            <input
              type="text"
              value={block.content?.imageAlt || ''}
              onChange={(e) => updateContent('imageAlt', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Description de l'image"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Texte du bouton</label>
            <input
              type="text"
              value={block.content?.ctaText || ''}
              onChange={(e) => updateContent('ctaText', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lien du bouton</label>
            <input
              type="text"
              value={block.content?.ctaLink || ''}
              onChange={(e) => updateContent('ctaLink', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="/contact"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderFAQEditor = (block: ContentBlock) => {
    const questions = block.content?.questions || [];

    const addQuestion = () => {
      updateBlock(block.id, {
        content: {
          ...block.content,
          questions: [...questions, { question: '', answer: '' }]
        }
      });
    };

    const updateQuestion = (index: number, field: 'question' | 'answer', value: string) => {
      const newQuestions = [...questions];
      newQuestions[index] = { ...newQuestions[index], [field]: value };
      updateBlock(block.id, {
        content: { ...block.content, questions: newQuestions }
      });
    };

    const deleteQuestion = (index: number) => {
      if (!confirm('Supprimer cette question ?')) return;
      const newQuestions = questions.filter((_: any, i: number) => i !== index);
      updateBlock(block.id, {
        content: { ...block.content, questions: newQuestions }
      });
    };

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre de la section</label>
          <input
            type="text"
            value={block.content?.title || ''}
            onChange={(e) => updateBlock(block.id, {
              content: { ...block.content, title: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sous-titre</label>
          <input
            type="text"
            value={block.content?.subtitle || ''}
            onChange={(e) => updateBlock(block.id, {
              content: { ...block.content, subtitle: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Questions ({questions.length})</h4>
            <button
              onClick={addQuestion}
              className="flex items-center space-x-1 px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter</span>
            </button>
          </div>

          <div className="space-y-4">
            {questions.map((q: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-gray-500">Question {index + 1}</span>
                  <button
                    onClick={() => deleteQuestion(index)}
                    className="text-red-600 hover:bg-red-50 p-1 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Question</label>
                    <input
                      type="text"
                      value={q.question || ''}
                      onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white"
                      placeholder="Votre question..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Réponse</label>
                    <textarea
                      value={q.answer || ''}
                      onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white"
                      placeholder="Votre réponse..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCardsEditor = (block: ContentBlock) => {
    const cards = block.content?.cards || [];

    const addCard = () => {
      updateBlock(block.id, {
        content: {
          ...block.content,
          cards: [...cards, { title: '', description: '', duration: '', details: [] }]
        }
      });
    };

    const updateCard = (index: number, field: string, value: any) => {
      const newCards = [...cards];
      newCards[index] = { ...newCards[index], [field]: value };
      updateBlock(block.id, {
        content: { ...block.content, cards: newCards }
      });
    };

    const deleteCard = (index: number) => {
      if (!confirm('Supprimer cette carte ?')) return;
      const newCards = cards.filter((_: any, i: number) => i !== index);
      updateBlock(block.id, {
        content: { ...block.content, cards: newCards }
      });
    };

    const addDetail = (cardIndex: number) => {
      const newCards = [...cards];
      newCards[cardIndex].details = [...(newCards[cardIndex].details || []), ''];
      updateBlock(block.id, {
        content: { ...block.content, cards: newCards }
      });
    };

    const updateDetail = (cardIndex: number, detailIndex: number, value: string) => {
      const newCards = [...cards];
      newCards[cardIndex].details[detailIndex] = value;
      updateBlock(block.id, {
        content: { ...block.content, cards: newCards }
      });
    };

    const deleteDetail = (cardIndex: number, detailIndex: number) => {
      const newCards = [...cards];
      newCards[cardIndex].details = newCards[cardIndex].details.filter((_: any, i: number) => i !== detailIndex);
      updateBlock(block.id, {
        content: { ...block.content, cards: newCards }
      });
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">Cartes ({cards.length})</h4>
          <button
            onClick={addCard}
            className="flex items-center space-x-1 px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter une carte</span>
          </button>
        </div>

        <div className="space-y-4">
          {cards.map((card: any, cardIndex: number) => (
            <div key={cardIndex} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-medium text-gray-500">Carte {cardIndex + 1}</span>
                <button
                  onClick={() => deleteCard(cardIndex)}
                  className="text-red-600 hover:bg-red-50 p-1 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Titre</label>
                    <input
                      type="text"
                      value={card.title || ''}
                      onChange={(e) => updateCard(cardIndex, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Durée</label>
                    <input
                      type="text"
                      value={card.duration || ''}
                      onChange={(e) => updateCard(cardIndex, 'duration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white"
                      placeholder="6-12 mois"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={card.description || ''}
                    onChange={(e) => updateCard(cardIndex, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white"
                  />
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-700">Détails</label>
                    <button
                      onClick={() => addDetail(cardIndex)}
                      className="text-xs text-primary-600 hover:text-primary-700"
                    >
                      + Ajouter un détail
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(card.details || []).map((detail: string, detailIndex: number) => (
                      <div key={detailIndex} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={detail}
                          onChange={(e) => updateDetail(cardIndex, detailIndex, e.target.value)}
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 bg-white"
                          placeholder="Détail..."
                        />
                        <button
                          onClick={() => deleteDetail(cardIndex, detailIndex)}
                          className="text-red-600 hover:bg-red-50 p-1 rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBlockEditor = (block: ContentBlock) => {
    switch (block.type) {
      case 'hero':
        return renderHeroEditor(block);
      case 'faq':
        return renderFAQEditor(block);
      case 'cards':
        return renderCardsEditor(block);
      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contenu JSON (mode avancé)
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

  const getBlockTitle = (block: ContentBlock): string => {
    switch (block.type) {
      case 'hero':
        return block.content?.title || 'Hero Banner';
      case 'faq':
        return `FAQ - ${block.content?.questions?.length || 0} questions`;
      case 'cards':
        return `Cartes - ${block.content?.cards?.length || 0} items`;
      default:
        return block.type;
    }
  };

  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {hasUnsavedChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <span className="text-sm text-yellow-800">
            Vous avez des modifications non enregistrées. N'oubliez pas de sauvegarder chaque bloc.
          </span>
        </div>
      )}

      <div className="space-y-3">
        {sortedBlocks.map((block) => {
          const isExpanded = expandedBlocks.has(block.id);
          const isSaving = savingBlocks.has(block.id);
          const isSaved = savedBlocks.has(block.id);

          return (
            <div key={block.id} className="border border-gray-200 rounded-lg bg-white shadow-sm">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleExpand(block.id)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-medium text-gray-500 uppercase bg-gray-100 px-2 py-1 rounded">
                    {block.type}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {getBlockTitle(block)}
                  </span>
                  {isSaved && (
                    <span className="flex items-center space-x-1 text-xs text-green-600">
                      <Check className="w-3 h-3" />
                      <span>Enregistré</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-200 p-4 space-y-4">
                  {renderBlockEditor(block)}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBlock(block.id);
                      }}
                      className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Supprimer le bloc</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        saveBlock(block.id);
                      }}
                      disabled={isSaving}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 text-sm font-medium"
                    >
                      {isSaving ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          <span>Enregistrement...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Enregistrer ce bloc</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnhancedBlockEditor;
