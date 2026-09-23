import React, { useState, useEffect } from 'react';
import { Upload, X, Trash2, Search, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface MediaFile {
  name: string;
  url: string;
  created_at: string;
  size: number;
}

interface MediaLibraryProps {
  onSelectImage: (url: string) => void;
  onClose: () => void;
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({ onSelectImage, onClose }) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const { data, error } = await supabase.storage.from('media').list('', {
        sortBy: { column: 'created_at', order: 'desc' }
      });

      if (error) throw error;

      if (data) {
        const filesWithUrls = data.map(file => {
          const { data: urlData } = supabase.storage.from('media').getPublicUrl(file.name);
          return {
            name: file.name,
            url: urlData.publicUrl,
            created_at: file.created_at || new Date().toISOString(),
            size: file.metadata?.size || 0
          };
        });
        setFiles(filesWithUrls);
      }
    } catch (error) {
      console.error('Error loading files:', error);
      alert('Erreur lors du chargement des fichiers');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);

    try {
      let lastUploadedUrl: string | null = null;

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];

        if (!file.type.startsWith('image/')) {
          alert(`${file.name} n'est pas une image valide`);
          continue;
        }

        if (file.size > 10485760) {
          alert(`${file.name} est trop volumineux (max 10MB)`);
          continue;
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('media').getPublicUrl(fileName);
        lastUploadedUrl = urlData.publicUrl;
      }

      await loadFiles();

      if (lastUploadedUrl) {
        setSelectedImage(lastUploadedUrl);
      }

      alert('Images téléchargées avec succès !');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Erreur lors du téléchargement des fichiers');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleDeleteFile = async (fileName: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) return;

    try {
      const { error } = await supabase.storage.from('media').remove([fileName]);

      if (error) throw error;

      await loadFiles();
      if (selectedImage === fileName) setSelectedImage(null);
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Erreur lors de la suppression du fichier');
    }
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Bibliothèque Média</h2>
            <p className="text-sm text-gray-600 mt-1">
              {files.length} image{files.length !== 1 ? 's' : ''} disponible{files.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 border-b space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une image..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <label className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors cursor-pointer">
              <Upload className="w-5 h-5" />
              <span>{uploading ? 'Téléchargement...' : 'Télécharger'}</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Formats acceptés :</strong> JPG, PNG, GIF, WebP, SVG
              <br />
              <strong>Taille maximale :</strong> 10 MB par image
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">
                {searchQuery ? 'Aucune image trouvée' : 'Aucune image dans la bibliothèque'}
              </p>
              <label className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors cursor-pointer mt-4">
                <Upload className="w-4 h-4" />
                <span>Télécharger votre première image</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <div
                  key={file.name}
                  className={`group relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedImage === file.url
                      ? 'border-primary-600 shadow-lg'
                      : 'border-gray-200 hover:border-primary-400'
                  }`}
                  onClick={() => setSelectedImage(file.url)}
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {selectedImage === file.url && (
                    <div className="absolute top-2 right-2 bg-primary-600 text-white p-1 rounded-full">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs truncate mb-1">{file.name}</p>
                    <p className="text-white/80 text-xs">{formatFileSize(file.size)}</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFile(file.name);
                    }}
                    className="absolute top-2 left-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              if (selectedImage) {
                onSelectImage(selectedImage);
                onClose();
              }
            }}
            disabled={!selectedImage}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Insérer l'image sélectionnée
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaLibrary;
