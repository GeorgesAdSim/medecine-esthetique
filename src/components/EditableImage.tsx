import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { useAuth } from '../contexts/AuthContext';
import { Edit3, Image as ImageIcon } from 'lucide-react';
import ImageManager from './ImageManager';

interface EditableImageProps {
  imageKey: string;
  defaultSrc: string;
  alt: string;
  className?: string;
}

const EditableImage: React.FC<EditableImageProps> = ({
  imageKey,
  defaultSrc,
  alt,
  className = ''
}) => {
  const { customization, updateImage, isAdminMode } = useAdmin();
  const { hasPermission, isAuthenticated } = useAuth();
  const [showImageManager, setShowImageManager] = useState(false);

  const currentSrc = customization.images[imageKey] || defaultSrc;

  const handleSelectImage = (imageUrl: string) => {
    if (!isAuthenticated || !hasPermission('write')) return;
    updateImage(imageKey, imageUrl);
  };

  return (
    <>
      <div className="relative group">
        <img
          src={currentSrc}
          alt={alt}
          className={className}
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultSrc;
          }}
        />
        {isAuthenticated && isAdminMode && hasPermission('write') && (
          <button
            onClick={() => setShowImageManager(true)}
            className="absolute top-2 right-2 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            title="Modifier cette image"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {showImageManager && (
        <ImageManager
          currentImage={currentSrc}
          onSelectImage={handleSelectImage}
          onClose={() => setShowImageManager(false)}
        />
      )}
    </>
  );
};

export default EditableImage;