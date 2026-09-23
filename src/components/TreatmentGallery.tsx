import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
}

interface TreatmentGalleryProps {
  title?: string;
  images: GalleryImage[];
}

const TreatmentGallery: React.FC<TreatmentGalleryProps> = ({
  title = "Galerie de résultats",
  images
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-4">
            {title}
          </h2>
          <p className="font-inter text-lg text-neutral-600 max-w-2xl mx-auto">
            Découvrez les résultats obtenus grâce à notre expertise en médecine esthétique
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer aspect-square"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                {image.caption && (
                  <p className="text-white font-inter text-sm p-4 w-full">
                    {image.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedImageIndex !== null && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-primary-300 transition-colors z-10"
              aria-label="Fermer"
            >
              <X className="w-8 h-8" />
            </button>

            {selectedImageIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 text-white hover:text-primary-300 transition-colors z-10"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-12 h-12" />
              </button>
            )}

            {selectedImageIndex < images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 text-white hover:text-primary-300 transition-colors z-10"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-12 h-12" />
              </button>
            )}

            <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <img
                src={images[selectedImageIndex].url}
                alt={images[selectedImageIndex].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              {images[selectedImageIndex].caption && (
                <p className="text-white text-center mt-4 font-inter">
                  {images[selectedImageIndex].caption}
                </p>
              )}
              <p className="text-white/60 text-center mt-2 text-sm">
                {selectedImageIndex + 1} / {images.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TreatmentGallery;
