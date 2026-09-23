import React, { useState } from 'react';
import {
  Type, Image as ImageIcon, Quote, CheckSquare, Users, AlertCircle,
  Link2, FileText, Grid, Star, Plus, X, Eye, Code, ChevronUp, ChevronDown,
  GripVertical, Sparkles
} from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import MediaLibrary from './MediaLibrary';

interface Block {
  type: string;
  [key: string]: any;
}

interface VisualBlockEditorProps {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}

const blockTypes = [
  { type: 'hero', label: 'Hero / Bannière', icon: ImageIcon, description: 'Grande section avec titre et image' },
  { type: 'treatments', label: 'Liste de Traitements', icon: Grid, description: 'Grille de traitements médicaux' },
  { type: 'steps', label: 'Étapes / Processus', icon: CheckSquare, description: 'Liste d\'étapes numérotées' },
  { type: 'features', label: 'Caractéristiques', icon: Sparkles, description: 'Liste de caractéristiques avec icônes' },
  { type: 'cards', label: 'Cartes', icon: Grid, description: 'Grille de cartes de contenu' },
  { type: 'text', label: 'Texte', icon: Type, description: 'Paragraphe de texte enrichi' },
  { type: 'faq', label: 'FAQ', icon: AlertCircle, description: 'Questions fréquentes' },
  { type: 'cta', label: 'Appel à l\'action', icon: Plus, description: 'Bouton d\'action' },
  { type: 'iframe', label: 'Iframe / Intégration', icon: Code, description: 'Intégrer vidéos, maps, formulaires' },
  { type: 'gallery', label: 'Galerie', icon: ImageIcon, description: 'Galerie d\'images' },
  { type: 'testimonials', label: 'Témoignages', icon: Users, description: 'Carrousel de témoignages' },
  { type: 'quote', label: 'Citation', icon: Quote, description: 'Citation ou témoignage' },
  { type: 'list', label: 'Liste', icon: CheckSquare, description: 'Liste à puces ou numérotées' },
];

const VisualBlockEditor: React.FC<VisualBlockEditorProps> = ({ blocks, onChange }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [showJsonMode, setShowJsonMode] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [mediaTargetIndex, setMediaTargetIndex] = useState<number | null>(null);
  const [mediaTargetField, setMediaTargetField] = useState<string>('');

  const addBlock = (type: string) => {
    const defaultBlocks: Record<string, Block> = {
      hero: { type: 'hero', title: 'Titre de la bannière', subtitle: 'Sous-titre', image: '', buttonText: 'En savoir plus', buttonLink: '#' },
      treatments: { type: 'treatments', title: 'Les Traitements', subtitle: 'Description des traitements', treatments: [{ title: 'Traitement', description: 'Description', duration: '6 mois', href: '#' }] },
      steps: { type: 'steps', title: 'Notre processus', steps: [{ title: 'Étape 1', description: 'Description' }] },
      features: { type: 'features', title: 'Nos Avantages', items: [{ icon: 'star', title: 'Avantage 1', description: 'Description' }] },
      cards: { type: 'cards', title: 'Titre de la section', items: [{ title: 'Carte 1', description: 'Description', image: '', link: '#' }] },
      text: { type: 'text', content: '<p>Votre texte ici...</p>' },
      faq: { type: 'faq', title: 'Questions Fréquentes', items: [{ question: 'Question?', answer: 'Réponse' }] },
      cta: { type: 'cta', title: 'Titre', description: 'Description', buttonText: 'Cliquez ici', buttonLink: '#' },
      iframe: { type: 'iframe', title: 'Intégration', src: '', height: '400', allowFullscreen: true },
      gallery: { type: 'gallery', title: 'Galerie Photos', images: [{ src: '', alt: '', caption: '' }] },
      testimonials: { type: 'testimonials', items: [{ text: 'Témoignage', author: 'Nom', rating: 5 }] },
      quote: { type: 'quote', text: 'Citation', author: 'Auteur' },
      list: { type: 'list', items: ['Élément 1', 'Élément 2', 'Élément 3'] },
    };

    const newBlock = defaultBlocks[type] || { type };
    onChange([...blocks, newBlock]);
    setEditingIndex(blocks.length);
    setShowBlockMenu(false);
  };

  const updateBlock = (index: number, updates: Partial<Block>) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], ...updates };
    onChange(newBlocks);
  };

  const deleteBlock = (index: number) => {
    if (confirm('Supprimer ce bloc ?')) {
      onChange(blocks.filter((_, i) => i !== index));
      setEditingIndex(null);
    }
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;

    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    onChange(newBlocks);
    setEditingIndex(newIndex);
  };

  const duplicateBlock = (index: number) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, { ...blocks[index] });
    onChange(newBlocks);
  };

  const openMediaLibrary = (blockIndex: number, field: string) => {
    setMediaTargetIndex(blockIndex);
    setMediaTargetField(field);
    setShowMediaLibrary(true);
  };

  const handleMediaSelect = (url: string) => {
    if (mediaTargetIndex !== null && mediaTargetField) {
      updateBlock(mediaTargetIndex, { [mediaTargetField]: url });
    }
    setShowMediaLibrary(false);
    setMediaTargetIndex(null);
    setMediaTargetField('');
  };

  const switchToJsonMode = () => {
    setJsonText(JSON.stringify(blocks, null, 2));
    setShowJsonMode(true);
  };

  const saveJsonMode = () => {
    try {
      const parsed = JSON.parse(jsonText);
      onChange(parsed);
      setShowJsonMode(false);
    } catch (error) {
      alert('JSON invalide. Veuillez corriger les erreurs.');
    }
  };

  const renderBlockEditor = (block: Block, index: number) => {
    const isEditing = editingIndex === index;

    if (!block || !block.type) {
      return null;
    }

    if (!isEditing) {
      return (
        <div
          key={index}
          className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-all group cursor-pointer"
          onClick={() => setEditingIndex(index)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GripVertical className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-semibold text-gray-900">{(block.type || 'unknown').toUpperCase()}</p>
                <p className="text-sm text-gray-500">{getBlockPreview(block)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => { e.stopPropagation(); moveBlock(index, 'up'); }}
                disabled={index === 0}
                className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); moveBlock(index, 'down'); }}
                disabled={index === blocks.length - 1}
                className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={index} className="bg-white border-2 border-primary-500 rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-gray-900">Éditer: {(block.type || 'unknown').toUpperCase()}</h4>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => duplicateBlock(index)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Dupliquer
            </button>
            <button
              onClick={() => deleteBlock(index)}
              className="px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded transition-colors"
            >
              Supprimer
            </button>
            <button
              onClick={() => setEditingIndex(null)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {renderBlockFields(block, index)}
      </div>
    );
  };

  const getBlockPreview = (block: Block): string => {
    switch (block.type) {
      case 'hero':
        return block.title || 'Hero sans titre';
      case 'treatments':
        return `${block.treatments?.length || 0} traitements`;
      case 'steps':
        return `${block.steps?.length || 0} étapes`;
      case 'features':
        // Gérer features stockées dans block.features ou block.items
        const featuresCount = block.features?.length || block.items?.length || 0;
        return `${featuresCount} caractéristiques`;
      case 'cards':
        // Gérer cards stockées dans block.cards ou block.items
        const cardsCount = block.cards?.length || block.items?.length || 0;
        return `${cardsCount} cartes`;
      case 'text':
        // Gérer deux formats: content (string) ou paragraphs (array)
        const textContent = block.content || (block.paragraphs && block.paragraphs.length > 0 ? block.paragraphs[0] : '');
        const text = textContent?.replace?.(/<[^>]*>/g, '').substring(0, 50);
        return text || 'Texte vide';
      case 'faq':
        return `${block.items?.length || 0} questions`;
      case 'cta':
        return block.title || 'CTA sans titre';
      case 'gallery':
        return `${block.images?.length || 0} images`;
      case 'testimonials':
        return `${block.items?.length || 0} témoignages`;
      case 'quote':
        return `"${block.text?.substring(0, 30)}..." - ${block.author}`;
      case 'list':
        return `${block.items?.length || 0} éléments`;
      case 'iframe':
        return block.src ? `Iframe: ${block.title || 'Sans titre'}` : 'Iframe vide';
      default:
        return 'Cliquez pour éditer';
    }
  };

  const renderBlockFields = (block: Block, index: number) => {
    switch (block.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
              <input
                type="text"
                value={block.title || ''}
                onChange={(e) => updateBlock(index, { title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
              <input
                type="text"
                value={block.subtitle || ''}
                onChange={(e) => updateBlock(index, { subtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={block.image || ''}
                  onChange={(e) => updateBlock(index, { image: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="URL de l'image"
                />
                <button
                  onClick={() => openMediaLibrary(index, 'image')}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
              </div>
              {block.image && (
                <img src={block.image} alt="Preview" className="mt-2 w-full max-w-xs rounded-lg" />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Texte du bouton</label>
                <input
                  type="text"
                  value={block.buttonText || ''}
                  onChange={(e) => updateBlock(index, { buttonText: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lien du bouton</label>
                <input
                  type="text"
                  value={block.buttonLink || ''}
                  onChange={(e) => updateBlock(index, { buttonLink: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        );

      case 'treatments':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre de la section</label>
              <input
                type="text"
                value={block.title || ''}
                onChange={(e) => updateBlock(index, { title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
              <textarea
                value={block.subtitle || ''}
                onChange={(e) => updateBlock(index, { subtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                rows={2}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Traitements</label>
              <button
                onClick={() => updateBlock(index, { treatments: [...(block.treatments || []), { title: 'Nouveau traitement', description: 'Description', duration: '6 mois', href: '#' }] })}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter</span>
              </button>
            </div>
            {(block.treatments || []).map((treatment: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Traitement {i + 1}</span>
                  <button
                    onClick={() => {
                      const newTreatments = (block.treatments || []).filter((_: any, idx: number) => idx !== i);
                      updateBlock(index, { treatments: newTreatments });
                    }}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={treatment.title || ''}
                  onChange={(e) => {
                    const newTreatments = [...(block.treatments || [])];
                    newTreatments[i] = { ...newTreatments[i], title: e.target.value };
                    updateBlock(index, { treatments: newTreatments });
                  }}
                  placeholder="Titre"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
                <textarea
                  value={treatment.description || ''}
                  onChange={(e) => {
                    const newTreatments = [...(block.treatments || [])];
                    newTreatments[i] = { ...newTreatments[i], description: e.target.value };
                    updateBlock(index, { treatments: newTreatments });
                  }}
                  placeholder="Description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  rows={2}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={treatment.duration || ''}
                    onChange={(e) => {
                      const newTreatments = [...(block.treatments || [])];
                      newTreatments[i] = { ...newTreatments[i], duration: e.target.value };
                      updateBlock(index, { treatments: newTreatments });
                    }}
                    placeholder="Durée (ex: 6-18 mois)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    value={treatment.href || ''}
                    onChange={(e) => {
                      const newTreatments = [...(block.treatments || [])];
                      newTreatments[i] = { ...newTreatments[i], href: e.target.value };
                      updateBlock(index, { treatments: newTreatments });
                    }}
                    placeholder="Lien (ex: /traitement)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'steps':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre de la section</label>
              <input
                type="text"
                value={block.title || ''}
                onChange={(e) => updateBlock(index, { title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Étapes</label>
              <button
                onClick={() => updateBlock(index, { steps: [...(block.steps || []), { title: 'Nouvelle étape', description: 'Description' }] })}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter</span>
              </button>
            </div>
            {(block.steps || []).map((step: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Étape {i + 1}</span>
                  <button
                    onClick={() => {
                      const newSteps = (block.steps || []).filter((_: any, idx: number) => idx !== i);
                      updateBlock(index, { steps: newSteps });
                    }}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={step.title || ''}
                  onChange={(e) => {
                    const newSteps = [...(block.steps || [])];
                    newSteps[i] = { ...newSteps[i], title: e.target.value };
                    updateBlock(index, { steps: newSteps });
                  }}
                  placeholder="Titre de l'étape"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
                <textarea
                  value={step.description || ''}
                  onChange={(e) => {
                    const newSteps = [...(block.steps || [])];
                    newSteps[i] = { ...newSteps[i], description: e.target.value };
                    updateBlock(index, { steps: newSteps });
                  }}
                  placeholder="Description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  rows={3}
                />
              </div>
            ))}
          </div>
        );

      case 'text':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
            <RichTextEditor
              value={block.content || ''}
              onChange={(value) => updateBlock(index, { content: value })}
              minHeight="300px"
            />
          </div>
        );

      case 'title':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Texte</label>
              <input
                type="text"
                value={block.text || ''}
                onChange={(e) => updateBlock(index, { text: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
              <select
                value={block.level || 2}
                onChange={(e) => updateBlock(index, { level: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value={1}>H1 - Titre principal</option>
                <option value={2}>H2 - Titre de section</option>
                <option value={3}>H3 - Sous-titre</option>
              </select>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={block.src || ''}
                  onChange={(e) => updateBlock(index, { src: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="URL de l'image"
                />
                <button
                  onClick={() => openMediaLibrary(index, 'src')}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
              </div>
              {block.src && (
                <img src={block.src} alt="Preview" className="mt-2 w-full max-w-md rounded-lg" />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Texte alternatif (SEO)</label>
              <input
                type="text"
                value={block.alt || ''}
                onChange={(e) => updateBlock(index, { alt: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Légende (optionnel)</label>
              <input
                type="text"
                value={block.caption || ''}
                onChange={(e) => updateBlock(index, { caption: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        );

      case 'quote':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Citation</label>
              <textarea
                value={block.text || ''}
                onChange={(e) => updateBlock(index, { text: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Auteur</label>
              <input
                type="text"
                value={block.author || ''}
                onChange={(e) => updateBlock(index, { author: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
              <input
                type="text"
                value={block.title || ''}
                onChange={(e) => updateBlock(index, { title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Caractéristiques</label>
              <button
                onClick={() => updateBlock(index, { features: [...(block.features || []), { icon: 'Star', title: 'Nouvelle caractéristique', description: 'Description' }] })}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter</span>
              </button>
            </div>
            {(block.features || []).map((feature: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Caractéristique {i + 1}</span>
                  <button
                    onClick={() => {
                      const newFeatures = (block.features || []).filter((_: any, idx: number) => idx !== i);
                      updateBlock(index, { features: newFeatures });
                    }}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Icône (Lucide React)</label>
                  <input
                    type="text"
                    value={feature.icon || ''}
                    onChange={(e) => {
                      const newFeatures = [...(block.features || [])];
                      newFeatures[i] = { ...newFeatures[i], icon: e.target.value };
                      updateBlock(index, { features: newFeatures });
                    }}
                    placeholder="ex: Star, Heart, Check"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Titre</label>
                  <input
                    type="text"
                    value={feature.title || ''}
                    onChange={(e) => {
                      const newFeatures = [...(block.features || [])];
                      newFeatures[i] = { ...newFeatures[i], title: e.target.value };
                      updateBlock(index, { features: newFeatures });
                    }}
                    placeholder="Titre"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Description</label>
                  <textarea
                    value={feature.description || ''}
                    onChange={(e) => {
                      const newFeatures = [...(block.features || [])];
                      newFeatures[i] = { ...newFeatures[i], description: e.target.value };
                      updateBlock(index, { features: newFeatures });
                    }}
                    placeholder="Description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'list':
        const isComplexList = block.items && block.items.length > 0 && typeof block.items[0] === 'object';

        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre (optionnel)</label>
              <input
                type="text"
                value={block.title || ''}
                onChange={(e) => updateBlock(index, { title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (optionnel)</label>
              <textarea
                value={block.description || ''}
                onChange={(e) => updateBlock(index, { description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                rows={2}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Éléments</label>
              <button
                onClick={() => {
                  const newItem = isComplexList
                    ? { category: 'Catégorie', description: 'Description', duration: '', details: [] }
                    : 'Nouvel élément';
                  updateBlock(index, { items: [...(block.items || []), newItem] });
                }}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter</span>
              </button>
            </div>
            {(block.items || []).map((item: any, i: number) => (
              <div key={i} className={isComplexList ? "border border-gray-200 rounded-lg p-4 space-y-3" : "flex items-center space-x-2"}>
                {isComplexList ? (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Élément {i + 1}</span>
                      <button
                        onClick={() => {
                          const newItems = (block.items || []).filter((_: any, idx: number) => idx !== i);
                          updateBlock(index, { items: newItems });
                        }}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Catégorie</label>
                        <input
                          type="text"
                          value={item.category || ''}
                          onChange={(e) => {
                            const newItems = [...(block.items || [])];
                            newItems[i] = { ...newItems[i], category: e.target.value };
                            updateBlock(index, { items: newItems });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Durée</label>
                        <input
                          type="text"
                          value={item.duration || ''}
                          onChange={(e) => {
                            const newItems = [...(block.items || [])];
                            newItems[i] = { ...newItems[i], duration: e.target.value };
                            updateBlock(index, { items: newItems });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Description</label>
                      <textarea
                        value={item.description || ''}
                        onChange={(e) => {
                          const newItems = [...(block.items || [])];
                          newItems[i] = { ...newItems[i], description: e.target.value };
                          updateBlock(index, { items: newItems });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Détails (un par ligne)</label>
                      <textarea
                        value={(item.details || []).join('\n')}
                        onChange={(e) => {
                          const newItems = [...(block.items || [])];
                          newItems[i] = { ...newItems[i], details: e.target.value.split('\n').filter(d => d.trim()) };
                          updateBlock(index, { items: newItems });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        rows={3}
                        placeholder="Détail 1&#10;Détail 2&#10;Détail 3"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newItems = [...(block.items || [])];
                        newItems[i] = e.target.value;
                        updateBlock(index, { items: newItems });
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={() => {
                        const newItems = (block.items || []).filter((_: any, idx: number) => idx !== i);
                        updateBlock(index, { items: newItems });
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
              <input
                type="text"
                value={block.title || ''}
                onChange={(e) => updateBlock(index, { title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre (optionnel)</label>
              <input
                type="text"
                value={block.subtitle || ''}
                onChange={(e) => updateBlock(index, { subtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Questions</label>
              <button
                onClick={() => updateBlock(index, { items: [...(block.items || []), { question: 'Nouvelle question', answer: 'Réponse' }] })}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter</span>
              </button>
            </div>
            {(block.items || []).map((item: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Question {i + 1}</span>
                  <button
                    onClick={() => {
                      const newItems = (block.items || []).filter((_: any, idx: number) => idx !== i);
                      updateBlock(index, { items: newItems });
                    }}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Question</label>
                  <input
                    type="text"
                    value={item.question || ''}
                    onChange={(e) => {
                      const newItems = [...(block.items || [])];
                      newItems[i] = { ...newItems[i], question: e.target.value };
                      updateBlock(index, { items: newItems });
                    }}
                    placeholder="Question"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Réponse</label>
                  <textarea
                    value={item.answer || ''}
                    onChange={(e) => {
                      const newItems = [...(block.items || [])];
                      newItems[i] = { ...newItems[i], answer: e.target.value };
                      updateBlock(index, { items: newItems });
                    }}
                    placeholder="Réponse"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
              <input
                type="text"
                value={block.title || ''}
                onChange={(e) => updateBlock(index, { title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={block.description || ''}
                onChange={(e) => updateBlock(index, { description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bouton Principal - Texte</label>
                <input
                  type="text"
                  value={block.primaryButton?.text || block.buttonText || ''}
                  onChange={(e) => updateBlock(index, { primaryButton: { ...block.primaryButton, text: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bouton Principal - Lien</label>
                <input
                  type="text"
                  value={block.primaryButton?.link || block.buttonLink || ''}
                  onChange={(e) => updateBlock(index, { primaryButton: { ...block.primaryButton, link: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bouton Secondaire - Texte (optionnel)</label>
                <input
                  type="text"
                  value={block.secondaryButton?.text || ''}
                  onChange={(e) => updateBlock(index, { secondaryButton: { ...block.secondaryButton, text: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bouton Secondaire - Lien</label>
                <input
                  type="text"
                  value={block.secondaryButton?.link || ''}
                  onChange={(e) => updateBlock(index, { secondaryButton: { ...block.secondaryButton, link: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        );

      case 'iframe':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre (optionnel)</label>
              <input
                type="text"
                value={block.title || ''}
                onChange={(e) => updateBlock(index, { title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="ex: Notre localisation, Vidéo de présentation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL de l'iframe</label>
              <textarea
                value={block.src || ''}
                onChange={(e) => {
                  let value = e.target.value.trim();

                  // Si l'utilisateur colle du code HTML d'iframe, extraire l'URL
                  if (value.includes('<iframe') && value.includes('src=')) {
                    const srcMatch = value.match(/src="([^"]+)"/);
                    if (srcMatch && srcMatch[1]) {
                      value = srcMatch[1];
                    }
                  }

                  updateBlock(index, { src: value });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                rows={3}
                placeholder="https://www.youtube.com/embed/... ou https://www.google.com/maps/embed/..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Pour YouTube: Cliquez sur Partager → Intégrer et copiez l'URL du src (ou collez le code complet, l'URL sera extraite automatiquement)
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hauteur (px)</label>
                <input
                  type="text"
                  value={block.height || '400'}
                  onChange={(e) => updateBlock(index, { height: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Largeur</label>
                <select
                  value={block.width || 'full'}
                  onChange={(e) => updateBlock(index, { width: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="full">Pleine largeur</option>
                  <option value="large">Large (max 1200px)</option>
                  <option value="medium">Moyenne (max 800px)</option>
                  <option value="small">Petite (max 600px)</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`allowFullscreen-${index}`}
                checked={block.allowFullscreen !== false}
                onChange={(e) => updateBlock(index, { allowFullscreen: e.target.checked })}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor={`allowFullscreen-${index}`} className="text-sm text-gray-700">
                Autoriser le plein écran
              </label>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contenu JSON</label>
            <textarea
              value={JSON.stringify(block, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  updateBlock(index, parsed);
                } catch (error) {
                  // Invalid JSON, don't update
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm"
              rows={10}
            />
          </div>
        );
    }
  };

  if (showJsonMode) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Mode JSON Avancé</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={saveJsonMode}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Sauvegarder
            </button>
            <button
              onClick={() => setShowJsonMode(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Annuler
            </button>
          </div>
        </div>
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm"
          rows={30}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Blocs de contenu</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={switchToJsonMode}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Code className="w-4 h-4" />
            <span>Mode JSON</span>
          </button>
          <button
            onClick={() => setShowBlockMenu(!showBlockMenu)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un bloc</span>
          </button>
        </div>
      </div>

      {showBlockMenu && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Choisissez un type de bloc</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {blockTypes.map((blockType) => (
              <button
                key={blockType.type}
                onClick={() => addBlock(blockType.type)}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left"
              >
                <blockType.icon className="w-8 h-8 text-primary-600 mb-2" />
                <span className="font-medium text-gray-900 text-sm">{blockType.label}</span>
                <span className="text-xs text-gray-500 text-center mt-1">{blockType.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {blocks.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <p className="text-gray-600 mb-4">Aucun bloc de contenu. Commencez par en ajouter un!</p>
          <button
            onClick={() => setShowBlockMenu(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter votre premier bloc</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {blocks.filter(block => block && block.type).map((block, index) => renderBlockEditor(block, index))}
        </div>
      )}

      {showMediaLibrary && (
        <MediaLibrary
          onSelectImage={handleMediaSelect}
          onClose={() => setShowMediaLibrary(false)}
        />
      )}
    </div>
  );
};

export default VisualBlockEditor;
