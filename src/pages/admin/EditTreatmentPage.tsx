import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import VisualBlockEditor from '../../components/admin/VisualBlockEditor';
import BlockPreview from '../../components/admin/BlockPreview';

interface CustomTreatment {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  duration?: string;
  meta_title?: string;
  meta_description?: string;
  featured_image?: string;
  content: any[];
  gallery_images?: any[];
  related_treatments?: any[];
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const EditTreatmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [treatment, setTreatment] = useState<CustomTreatment | null>(null);
  const [treatmentBlocks, setTreatmentBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTreatment();
  }, [id]);

  const loadTreatment = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('custom_treatments')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setTreatment(data);
        const content = (data.content as any[]) || [];

        const flattenedBlocks = content.map((block: any) => {
          if (block.type && block.data && typeof block.data === 'object') {
            return {
              type: block.type,
              ...block.data
            };
          }
          if (block.type && block.content && typeof block.content === 'object') {
            return {
              type: block.type,
              ...block.content
            };
          }
          return block;
        });
        setTreatmentBlocks(flattenedBlocks);
      }
    } catch (error) {
      console.error('Error loading treatment:', error);
      alert('Erreur lors du chargement du traitement');
    } finally {
      setLoading(false);
    }
  };

  const saveTreatment = async () => {
    if (!treatment) return;

    setSaving(true);
    try {
      const structuredBlocks = treatmentBlocks.map((block) => {
        const { type, ...data } = block;
        return {
          type,
          data
        };
      });

      const { error } = await supabase
        .from('custom_treatments')
        .update({
          content: structuredBlocks,
          updated_at: new Date().toISOString()
        })
        .eq('id', treatment.id);

      if (error) throw error;

      alert('Traitement enregistré avec succès !');
    } catch (error) {
      console.error('Error saving treatment:', error);
      alert('Erreur lors de l\'enregistrement');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!treatment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Traitement non trouvé</h1>
          <button
            onClick={() => navigate('/admin')}
            className="text-primary-600 hover:text-primary-700"
          >
            Retour au dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header fixe */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {treatment.title}
                </h1>
                <p className="text-sm text-gray-600">{treatment.slug}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href={treatment.slug}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Prévisualiser</span>
              </a>
              <button
                onClick={saveTreatment}
                disabled={saving}
                className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-[1920px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Éditeur */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Éditeur de contenu</h2>
              <p className="text-sm text-gray-600 mt-1">
                Modifiez les blocs de contenu de votre traitement
              </p>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
              <VisualBlockEditor blocks={treatmentBlocks} onChange={setTreatmentBlocks} />
            </div>
          </div>

          {/* Aperçu */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Aperçu en temps réel</h2>
              <p className="text-sm text-gray-600 mt-1">
                Visualisez le rendu final de votre page
              </p>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
              <BlockPreview blocks={treatmentBlocks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTreatmentPage;
