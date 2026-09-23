import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Trash2, Eye, Download } from 'lucide-react';

interface ImageManagerProps {
  onSelectImage: (imageUrl: string) => void;
  currentImage?: string;
  onClose: () => void;
}

const ImageManager: React.FC<ImageManagerProps> = ({ onSelectImage, currentImage, onClose }) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>(() => {
    const saved = localStorage.getItem('uploadedImages');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedImage, setSelectedImage] = useState<string>(currentImage || '');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sauvegarder les images dans localStorage
  const saveImages = (images: string[]) => {
    setUploadedImages(images);
    localStorage.setItem('uploadedImages', JSON.stringify(images));
  };

  // Gérer le téléchargement de fichiers
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          const newImages = [...uploadedImages, imageUrl];
          saveImages(newImages);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  // Gérer le drag & drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  // Supprimer une image
  const deleteImage = (imageUrl: string) => {
    const newImages = uploadedImages.filter(img => img !== imageUrl);
    saveImages(newImages);
    if (selectedImage === imageUrl) {
      setSelectedImage('');
    }
  };

  // Télécharger une image
  const downloadImage = (imageUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `image-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sélectionner et appliquer une image
  const handleSelectImage = () => {
    if (selectedImage) {
      onSelectImage(selectedImage);
      onClose();
    }
  };

  // Images par défaut disponibles
  const defaultImages = [
    '/image copy.png',
    'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3985327/pexels-photo-3985327.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/6663574/pexels-photo-6663574.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6663578/pexels-photo-6663578.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <ImageIcon className="w-6 h-6 mr-3 text-blue-600" />
            Gestionnaire d'images
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Zone de téléchargement */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Télécharger de nouvelles images</h3>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragOver
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Glissez-déposez vos images ici ou cliquez pour sélectionner
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Choisir des fichiers
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
              <p className="text-sm text-gray-500 mt-2">
                Formats supportés: JPG, PNG, GIF, WebP
              </p>
            </div>
          </div>

          {/* Images par défaut */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              📸 Images par défaut (médecine esthétique)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {defaultImages.map((imageUrl, index) => (
                <div
                  key={`default-${index}`}
                  className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === imageUrl
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedImage(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    alt={`Image par défaut ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {selectedImage === imageUrl && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Images téléchargées */}
          {uploadedImages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                🖼️ Mes images téléchargées ({uploadedImages.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedImages.map((imageUrl, index) => (
                  <div
                    key={`uploaded-${index}`}
                    className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === imageUrl
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedImage(imageUrl)}
                  >
                    <img
                      src={imageUrl}
                      alt={`Image téléchargée ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadImage(imageUrl, index);
                          }}
                          className="p-1 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                          title="Télécharger"
                        >
                          <Download className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteImage(imageUrl);
                          }}
                          className="p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    {selectedImage === imageUrl && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* URL personnalisée */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">🔗 URL personnalisée</h3>
            <div className="flex space-x-3">
              <input
                type="url"
                placeholder="https://images.pexels.com/photos/exemple.jpg"
                value={selectedImage.startsWith('data:') || defaultImages.includes(selectedImage) || uploadedImages.includes(selectedImage) ? '' : selectedImage}
                onChange={(e) => setSelectedImage(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Collez l'URL d'une image depuis Pexels, Unsplash ou autre source
            </p>
          </div>

          {/* Aperçu de l'image sélectionnée */}
          {selectedImage && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Aperçu</h3>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <img
                  src={selectedImage}
                  alt="Aperçu"
                  className="max-w-full max-h-48 mx-auto rounded-lg shadow-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            {selectedImage ? 'Image sélectionnée' : 'Aucune image sélectionnée'}
          </p>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSelectImage}
              disabled={!selectedImage}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Utiliser cette image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageManager;