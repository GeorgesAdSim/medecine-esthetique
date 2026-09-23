import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Move, 
  Eye, 
  EyeOff, 
  Save,
  Type,
  Image as ImageIcon,
  MousePointer,
  Layout,
  Minus,
  Grid3X3,
  ChevronUp,
  ChevronDown,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Clock,
  Users,
  Target,
  X
} from 'lucide-react';

interface TreatmentBuilderProps {
  treatmentId: string;
  onClose: () => void;
}

const TreatmentBuilder: React.FC<TreatmentBuilderProps> = ({ treatmentId, onClose }) => {
  const { 
    customization, 
    updateTreatment, 
    addTreatmentSection, 
    updateTreatmentSection, 
    deleteTreatmentSection 
  } = useAdmin();
  
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  const treatment = customization.treatments[treatmentId];
  if (!treatment) return null;

  const sectionTypes = [
    { type: 'description', label: 'Description', icon: Type },
    { type: 'zones', label: 'Zones de traitement', icon: MapPin },
    { type: 'process', label: 'Déroulement', icon: Clock },
    { type: 'advantages', label: 'Avantages', icon: CheckCircle },
    { type: 'faq', label: 'Questions fréquentes', icon: HelpCircle },
    { type: 'contraindications', label: 'Contre-indications', icon: AlertTriangle }
  ];

  const addNewSection = (type: string) => {
    const defaultContent = {
      description: {
        text: 'Nouvelle description du traitement...',
        highlights: []
      },
      zones: {
        zones: [
          { name: 'Zone 1', description: 'Description de la zone' }
        ]
      },
      process: {
        steps: [
          { step: '1', title: 'Étape 1', description: 'Description de l\'étape' }
        ]
      },
      advantages: {
        advantages: ['Avantage 1', 'Avantage 2']
      },
      faq: {
        questions: [
          { question: 'Question exemple ?', answer: 'Réponse exemple' }
        ]
      },
      contraindications: {
        absolute: ['Contre-indication absolue'],
        relative: ['Contre-indication relative']
      }
    };

    addTreatmentSection(treatmentId, {
      type: type as any,
      title: sectionTypes.find(s => s.type === type)?.label || 'Nouvelle section',
      content: defaultContent[type as keyof typeof defaultContent] || {}
    });
  };

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    const sections = [...treatment.content.sections].sort((a, b) => a.order - b.order);
    const currentIndex = sections.findIndex(s => s.id === sectionId);
    
    if (direction === 'up' && currentIndex > 0) {
      [sections[currentIndex], sections[currentIndex - 1]] = [sections[currentIndex - 1], sections[currentIndex]];
    } else if (direction === 'down' && currentIndex < sections.length - 1) {
      [sections[currentIndex], sections[currentIndex + 1]] = [sections[currentIndex + 1], sections[currentIndex]];
    }

    // Mettre à jour les ordres
    sections.forEach((section, index) => {
      updateTreatmentSection(treatmentId, section.id, { order: index });
    });
  };

  const renderSectionEditor = (section: any) => {
    switch (section.type) {
      case 'description':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Texte de description</label>
              <textarea
                value={section.content.text || ''}
                onChange={(e) => updateTreatmentSection(treatmentId, section.id, {
                  content: { ...section.content, text: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-md"
                rows={6}
                placeholder="Description détaillée du traitement..."
              />
            </div>
          </div>
        );

      case 'zones':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium">Zones de traitement</label>
              <button
                onClick={() => {
                  const newZones = [...(section.content.zones || []), { name: '', description: '' }];
                  updateTreatmentSection(treatmentId, section.id, {
                    content: { ...section.content, zones: newZones }
                  });
                }}
                className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
              >
                + Zone
              </button>
            </div>
            {(section.content.zones || []).map((zone: any, index: number) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Zone {index + 1}</span>
                  <button
                    onClick={() => {
                      const newZones = section.content.zones.filter((_: any, i: number) => i !== index);
                      updateTreatmentSection(treatmentId, section.id, {
                        content: { ...section.content, zones: newZones }
                      });
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={zone.name}
                  onChange={(e) => {
                    const newZones = [...section.content.zones];
                    newZones[index] = { ...zone, name: e.target.value };
                    updateTreatmentSection(treatmentId, section.id, {
                      content: { ...section.content, zones: newZones }
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="Nom de la zone"
                />
                <textarea
                  value={zone.description}
                  onChange={(e) => {
                    const newZones = [...section.content.zones];
                    newZones[index] = { ...zone, description: e.target.value };
                    updateTreatmentSection(treatmentId, section.id, {
                      content: { ...section.content, zones: newZones }
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  rows={2}
                  placeholder="Description de la zone"
                />
              </div>
            ))}
          </div>
        );

      case 'advantages':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium">Avantages</label>
              <button
                onClick={() => {
                  const newAdvantages = [...(section.content.advantages || []), ''];
                  updateTreatmentSection(treatmentId, section.id, {
                    content: { ...section.content, advantages: newAdvantages }
                  });
                }}
                className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
              >
                + Avantage
              </button>
            </div>
            {(section.content.advantages || []).map((advantage: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={advantage}
                  onChange={(e) => {
                    const newAdvantages = [...section.content.advantages];
                    newAdvantages[index] = e.target.value;
                    updateTreatmentSection(treatmentId, section.id, {
                      content: { ...section.content, advantages: newAdvantages }
                    });
                  }}
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                  placeholder="Avantage du traitement"
                />
                <button
                  onClick={() => {
                    const newAdvantages = section.content.advantages.filter((_: any, i: number) => i !== index);
                    updateTreatmentSection(treatmentId, section.id, {
                      content: { ...section.content, advantages: newAdvantages }
                    });
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium">Questions fréquentes</label>
              <button
                onClick={() => {
                  const newQuestions = [...(section.content.questions || []), { question: '', answer: '' }];
                  updateTreatmentSection(treatmentId, section.id, {
                    content: { ...section.content, questions: newQuestions }
                  });
                }}
                className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
              >
                + Question
              </button>
            </div>
            {(section.content.questions || []).map((qa: any, index: number) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Question {index + 1}</span>
                  <button
                    onClick={() => {
                      const newQuestions = section.content.questions.filter((_: any, i: number) => i !== index);
                      updateTreatmentSection(treatmentId, section.id, {
                        content: { ...section.content, questions: newQuestions }
                      });
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={qa.question}
                  onChange={(e) => {
                    const newQuestions = [...section.content.questions];
                    newQuestions[index] = { ...qa, question: e.target.value };
                    updateTreatmentSection(treatmentId, section.id, {
                      content: { ...section.content, questions: newQuestions }
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="Question"
                />
                <textarea
                  value={qa.answer}
                  onChange={(e) => {
                    const newQuestions = [...section.content.questions];
                    newQuestions[index] = { ...qa, answer: e.target.value };
                    updateTreatmentSection(treatmentId, section.id, {
                      content: { ...section.content, questions: newQuestions }
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  rows={3}
                  placeholder="Réponse"
                />
              </div>
            ))}
          </div>
        );

      default:
        return <div>Éditeur pour {section.type}</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white h-full overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Éditeur de traitement</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Treatment Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Nom du traitement</label>
              <input
                type="text"
                value={treatment.name}
                onChange={(e) => updateTreatment(treatmentId, { name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">URL</label>
              <input
                type="text"
                value={treatment.slug}
                onChange={(e) => updateTreatment(treatmentId, { slug: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description courte</label>
              <textarea
                value={treatment.shortDescription}
                onChange={(e) => updateTreatment(treatmentId, { shortDescription: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Add Section */}
        <div className="p-6 border-b">
          <h3 className="font-semibold mb-4">Ajouter une section</h3>
          <div className="grid grid-cols-1 gap-2">
            {sectionTypes.map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                onClick={() => addNewSection(type)}
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 text-left"
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section Editor */}
        {selectedSectionId && (
          <div className="p-6">
            <h3 className="font-semibold mb-4">Éditer la section</h3>
            {renderSectionEditor(treatment.content.sections.find(s => s.id === selectedSectionId))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-lg min-h-screen">
            {/* Hero Section Preview */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-12 text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {treatment.content.heroTitle || treatment.name}
              </h1>
              <p className="text-xl text-blue-600 mb-4">
                {treatment.content.heroSubtitle || treatment.shortDescription}
              </p>
              <p className="text-gray-700 max-w-2xl mx-auto">
                {treatment.content.heroDescription}
              </p>
            </div>

            {/* Sections */}
            {treatment.content.sections
              .sort((a, b) => a.order - b.order)
              .map((section) => (
                <div
                  key={section.id}
                  className={`relative group border-b ${
                    selectedSectionId === section.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedSectionId(section.id)}
                >
                  {/* Section Controls */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex space-x-1 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSection(section.id, 'up');
                      }}
                      className="p-1 bg-white rounded shadow hover:bg-gray-50"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSection(section.id, 'down');
                      }}
                      className="p-1 bg-white rounded shadow hover:bg-gray-50"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTreatmentSection(treatmentId, section.id);
                      }}
                      className="p-1 bg-white rounded shadow hover:bg-red-50 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Section Content Preview */}
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{section.title}</h2>
                    
                    {section.type === 'description' && (
                      <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                          {section.content.text}
                        </p>
                      </div>
                    )}

                    {section.type === 'zones' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(section.content.zones || []).map((zone: any, index: number) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">{zone.name}</h3>
                            <p className="text-gray-600">{zone.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.type === 'advantages' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(section.content.advantages || []).map((advantage: string, index: number) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{advantage}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.type === 'faq' && (
                      <div className="space-y-6">
                        {(section.content.questions || []).map((qa: any, index: number) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-6">
                            <h3 className="font-semibold text-lg text-gray-800 mb-3">
                              {qa.question}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {qa.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

            {treatment.content.sections.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <Layout className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Aucune section ajoutée. Commencez par ajouter du contenu depuis la barre latérale.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentBuilder;