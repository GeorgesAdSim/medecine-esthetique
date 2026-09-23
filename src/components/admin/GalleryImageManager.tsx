import React, { useState, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Trash2, Eye, EyeOff, Save, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface GalleryImage {
  id: string;
  category: string;
  treatment_name: string;
  image_url: string;
  alt_text: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const categories = [
  { value: 'botox', label: 'Toxine botulique' },
  { value: 'hyaluronic', label: 'Acide hyaluronique' },
  { value: 'peeling', label: 'Peelings médicaux' },
  { value: 'mesolift', label: 'Mésolift' },
  { value: 'threads', label: 'Fils tenseurs' },
  { value: 'collagen', label: 'Stimulateurs de collagène' },
  { value: 'cabinet', label: 'Cabinet médical' }
];

const GalleryImageManager: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newImage, setNewImage] = useState({
    category: 'botox',
    treatment_name: '',
    alt_text: '',
    description: '',
    display_order: 0,
    is_active: true
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    loadImages();
  }, [selectedCategory]);

  const loadImages = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('gallery_images')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error loading images:', error);
      alert('Erreur lors du chargement des images');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Le fichier est trop volumineux. Maximum 5MB.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image');
        return;
      }
      setSelectedFile(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleAddImage = async () => {
    if (!selectedFile) {
      alert('Veuillez sélectionner une image');
      return;
    }

    if (!newImage.treatment_name || !newImage.alt_text) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await uploadImage(selectedFile);

      const { error } = await supabase
        .from('gallery_images')
        .insert([{
          ...newImage,
          image_url: imageUrl
        }]);

      if (error) throw error;

      alert('Image ajoutée avec succès!');
      setShowAddForm(false);
      setNewImage({
        category: 'botox',
        treatment_name: '',
        alt_text: '',
        description: '',
        display_order: 0,
        is_active: true
      });
      setSelectedFile(null);
      loadImages();
    } catch (error) {
      console.error('Error adding image:', error);
      alert('Erreur lors de l\'ajout de l\'image');
    } finally {
      setUploading(false);
    }
  };

  const toggleImageStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      loadImages();
    } catch (error) {
      console.error('Error updating image status:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const deleteImage = async (id: string, imageUrl: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      return;
    }

    try {
      const filePath = imageUrl.split('/media/')[1];
      if (filePath) {
        await supabase.storage.from('media').remove([filePath]);
      }

      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-playfair font-bold text-neutral-800">
          Galerie Photos
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-gradient-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Ajouter une image
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-neutral-200">
          <h3 className="text-xl font-semibold mb-4">Nouvelle image</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Catégorie *
              </label>
              <select
                value={newImage.category}
                onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Nom du traitement *
              </label>
              <input
                type="text"
                value={newImage.treatment_name}
                onChange={(e) => setNewImage({ ...newImage, treatment_name: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: Toxine botulique"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Texte alternatif (SEO) *
              </label>
              <input
                type="text"
                value={newImage.alt_text}
                onChange={(e) => setNewImage({ ...newImage, alt_text: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: Injection Botox rides front Liège"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Ordre d'affichage
              </label>
              <input
                type="number"
                value={newImage.display_order}
                onChange={(e) => setNewImage({ ...newImage, display_order: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Description
            </label>
            <textarea
              value={newImage.description}
              onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Description de l'image"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Image * (max 5MB)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {selectedFile && (
              <p className="text-sm text-green-600 mt-2">
                Fichier sélectionné: {selectedFile.name}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddImage}
              disabled={uploading}
              className="flex items-center gap-2 bg-gradient-primary text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              {uploading ? (
                <>Téléchargement...</>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Enregistrer
                </>
              )}
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-all"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedCategory === 'all'
              ? 'bg-gradient-primary text-white'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          Tous ({images.length})
        </button>
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === cat.value
                ? 'bg-gradient-primary text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {cat.label} ({images.filter(img => img.category === cat.value).length})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="text-center py-12 bg-neutral-50 rounded-lg">
          <ImageIcon className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-600">Aucune image dans cette catégorie</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className={`relative bg-white rounded-lg shadow-md overflow-hidden ${
                !image.is_active ? 'opacity-50' : ''
              }`}
            >
              <img
                src={image.image_url}
                alt={image.alt_text}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <div className="text-sm font-semibold text-primary-600 mb-1">
                  {categories.find(c => c.value === image.category)?.label}
                </div>
                <p className="text-sm text-neutral-700 mb-2 line-clamp-2">
                  {image.description || image.alt_text}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => toggleImageStatus(image.id, image.is_active)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-neutral-100 hover:bg-neutral-200 rounded transition-all"
                    title={image.is_active ? 'Masquer' : 'Afficher'}
                  >
                    {image.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => deleteImage(image.id, image.image_url)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded transition-all"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!image.is_active && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  Masqué
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryImageManager;
