import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Syringe, Plus, Edit2, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';

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

const TreatmentManager: React.FC = () => {
  const navigate = useNavigate();
  const [treatments, setTreatments] = useState<CustomTreatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newTreatmentData, setNewTreatmentData] = useState({
    title: '',
    slug: '',
    subtitle: '',
    meta_description: ''
  });

  useEffect(() => {
    loadTreatments();
  }, []);

  const loadTreatments = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_treatments')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      if (data) setTreatments(data);
    } catch (error) {
      console.error('Error loading treatments:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTreatment = async () => {
    if (!newTreatmentData.title || !newTreatmentData.slug) {
      alert('Le titre et le slug sont obligatoires');
      return;
    }

    try {
      const slug = newTreatmentData.slug.startsWith('/')
        ? newTreatmentData.slug
        : `/${newTreatmentData.slug}`;

      const { data, error } = await supabase
        .from('custom_treatments')
        .insert({
          title: newTreatmentData.title,
          slug,
          subtitle: newTreatmentData.subtitle,
          meta_description: newTreatmentData.meta_description,
          content: [],
          is_active: true,
          display_order: treatments.length
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setTreatments([...treatments, data]);
        setNewTreatmentData({ title: '', slug: '', subtitle: '', meta_description: '' });
        setShowNewForm(false);
        alert('Traitement créé avec succès !');
      }
    } catch (error: any) {
      console.error('Error creating treatment:', error);
      alert(`Erreur: ${error.message}`);
    }
  };

  const editTreatment = (treatment: CustomTreatment) => {
    navigate(`/admin/treatments/${treatment.id}/edit`);
  };

  const updateTreatmentMeta = async (id: string, updates: Partial<CustomTreatment>) => {
    try {
      const { error } = await supabase
        .from('custom_treatments')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      loadTreatments();
    } catch (error) {
      console.error('Error updating treatment:', error);
    }
  };

  const deleteTreatment = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce traitement ?')) return;

    try {
      const { error } = await supabase
        .from('custom_treatments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadTreatments();
      alert('Traitement supprimé avec succès');
    } catch (error) {
      console.error('Error deleting treatment:', error);
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Syringe className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Gestion des Traitements</h3>
            <p className="text-sm text-gray-600">{treatments.length} traitements</p>
          </div>
        </div>
        <button
          onClick={() => setShowNewForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau traitement</span>
        </button>
      </div>

      {showNewForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h4 className="font-semibold text-gray-900">Créer un nouveau traitement</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre du traitement
              </label>
              <input
                type="text"
                value={newTreatmentData.title}
                onChange={(e) => setNewTreatmentData({ ...newTreatmentData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Ex: Acide hyaluronique"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug (URL)
              </label>
              <input
                type="text"
                value={newTreatmentData.slug}
                onChange={(e) => setNewTreatmentData({ ...newTreatmentData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="/acide-hyaluronique-liege"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sous-titre
              </label>
              <input
                type="text"
                value={newTreatmentData.subtitle}
                onChange={(e) => setNewTreatmentData({ ...newTreatmentData, subtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Description courte du traitement"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description (SEO)
              </label>
              <textarea
                value={newTreatmentData.meta_description}
                onChange={(e) => setNewTreatmentData({ ...newTreatmentData, meta_description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                rows={3}
                placeholder="Description pour les moteurs de recherche"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={createTreatment}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Créer
            </button>
            <button
              onClick={() => {
                setShowNewForm(false);
                setNewTreatmentData({ title: '', slug: '', subtitle: '', meta_description: '' });
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {treatments.map((treatment) => (
          <div
            key={treatment.id}
            className="bg-white rounded-lg border border-gray-200 p-5 hover:border-primary-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{treatment.title}</h4>
                <p className="text-xs text-gray-500">{treatment.slug}</p>
                {treatment.subtitle && (
                  <p className="text-sm text-gray-600 mt-2">{treatment.subtitle}</p>
                )}
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  treatment.is_active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {treatment.is_active ? 'Actif' : 'Inactif'}
              </span>
            </div>

            <p className="text-xs text-gray-500 mb-3">
              {treatment.content?.length || 0} bloc(s) de contenu
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => editTreatment(treatment)}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors"
              >
                <Edit2 className="w-3 h-3" />
                <span>Éditer</span>
              </button>
              <button
                onClick={() => updateTreatmentMeta(treatment.id, { is_active: !treatment.is_active })}
                className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
                  treatment.is_active
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {treatment.is_active ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>{treatment.is_active ? 'Masquer' : 'Activer'}</span>
              </button>
              <a
                href={treatment.slug}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => deleteTreatment(treatment.id)}
                className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreatmentManager;
