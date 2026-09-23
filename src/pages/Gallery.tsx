import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Eye, Camera, Star } from 'lucide-react';
import FloralDecoration from '../components/FloralDecoration';
import { supabase } from '../lib/supabase';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  treatment: string;
  description: string;
  beforeAfter?: {
    before: string;
    after: string;
  };
}

interface DBGalleryImage {
  id: string;
  category: string;
  treatment_name: string;
  image_url: string;
  alt_text: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedImages: GalleryImage[] = (data || []).map((img: DBGalleryImage) => ({
        id: img.id,
        src: img.image_url,
        alt: img.alt_text,
        category: img.category,
        treatment: img.treatment_name,
        description: img.description || img.alt_text
      }));

      setGalleryImages(formattedImages);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'Tous les soins' },
    { id: 'botox', name: 'Toxine botulique' },
    { id: 'hyaluronic', name: 'Acide hyaluronique' },
    { id: 'peeling', name: 'Peelings' },
    { id: 'mesolift', name: 'Mésolift' },
    { id: 'threads', name: 'Fils tenseurs' },
    { id: 'collagen', name: 'Stimulateurs de collagène' },
    { id: 'cabinet', name: 'Cabinet médical' }
  ];

  const fallbackImages: GalleryImage[] = [
    // Toxine botulique
    {
      id: 'botox-1',
      src: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Injection de toxine botulique - Rides du front',
      category: 'botox',
      treatment: 'Toxine botulique',
      description: 'Traitement des rides du front avec résultats naturels',
      beforeAfter: {
        before: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=400',
        after: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    },
    {
      id: 'botox-2',
      src: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Injection toxine botulique - Pattes d\'oie',
      category: 'botox',
      treatment: 'Toxine botulique',
      description: 'Atténuation des rides de la patte d\'oie pour un regard détendu'
    },
    // Acide hyaluronique
    {
      id: 'hyaluronic-1',
      src: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Injection acide hyaluronique - Lèvres',
      category: 'hyaluronic',
      treatment: 'Acide hyaluronique',
      description: 'Augmentation naturelle du volume des lèvres',
      beforeAfter: {
        before: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
        after: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    },
    {
      id: 'hyaluronic-2',
      src: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Injection acide hyaluronique - Pommettes',
      category: 'hyaluronic',
      treatment: 'Acide hyaluronique',
      description: 'Restauration des volumes des pommettes'
    },
    // Peelings
    {
      id: 'peeling-1',
      src: 'https://images.pexels.com/photos/3985327/pexels-photo-3985327.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Peeling chimique - Application',
      category: 'peeling',
      treatment: 'Peeling chimique',
      description: 'Application d\'un peeling pour révéler l\'éclat de la peau'
    },
    {
      id: 'peeling-2',
      src: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Résultat peeling - Peau éclatante',
      category: 'peeling',
      treatment: 'Peeling chimique',
      description: 'Résultat après peeling : peau lisse et éclatante'
    },
    // Mésolift
    {
      id: 'mesolift-1',
      src: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Mésolift - Revitalisation',
      category: 'mesolift',
      treatment: 'Mésolift',
      description: 'Revitalisation de la peau par mésothérapie'
    },
    // Fils tenseurs
    {
      id: 'threads-1',
      src: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Fils tenseurs - Lifting naturel',
      category: 'threads',
      treatment: 'Fils tenseurs',
      description: 'Lifting naturel sans chirurgie'
    },
    // Stimulateurs de collagène
    {
      id: 'collagen-1',
      src: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Stimulateurs de collagène',
      category: 'collagen',
      treatment: 'Stimulateurs de collagène',
      description: 'Stimulation naturelle du collagène'
    },
    // Cabinet médical
    {
      id: 'cabinet-1',
      src: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Cabinet médical - Salle de consultation',
      category: 'cabinet',
      treatment: 'Cabinet médical',
      description: 'Salle de consultation moderne et équipée'
    },
    {
      id: 'cabinet-2',
      src: 'https://images.pexels.com/photos/3985327/pexels-photo-3985327.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Cabinet médical - Équipements',
      category: 'cabinet',
      treatment: 'Cabinet médical',
      description: 'Équipements de pointe pour la médecine esthétique'
    }
  ];

  const displayImages = galleryImages.length > 0 ? galleryImages : fallbackImages;

  const filteredImages = selectedCategory === 'all'
    ? displayImages
    : displayImages.filter(img => img.category === selectedCategory);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-32 pb-16">
        <FloralDecoration position="top-center" size="large" opacity={0.07} variant="shell" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Camera className="w-12 h-12 text-primary-600 mr-4" />
            <h1 className="font-playfair text-5xl font-bold text-neutral-800">
              Galerie Photos
            </h1>
          </div>
          <p className="font-inter text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos réalisations et les résultats de nos traitements esthétiques. 
            Une galerie qui témoigne de notre expertise et de la satisfaction de nos patients.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-primary text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
              <p className="font-inter text-lg text-neutral-600">Chargement des images...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => openModal(image)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white p-4">
                    <Eye className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-inter font-medium text-sm">Voir en grand</p>
                  </div>
                </div>

                {/* Info Card */}
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-primary-500 mr-2" />
                    <span className="font-inter text-sm font-medium text-primary-600">
                      {image.treatment}
                    </span>
                  </div>
                  <p className="font-inter text-neutral-700 text-sm leading-relaxed">
                    {image.description}
                  </p>
                  {image.beforeAfter && (
                    <div className="mt-3 flex items-center text-xs text-neutral-500">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Avant/Après disponible
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredImages.length === 0 && (
              <div className="text-center py-16">
                <Camera className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <p className="font-inter text-lg text-neutral-600">
                  Aucune image disponible pour cette catégorie
                </p>
              </div>
            )}
          </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image Content */}
            <div className="bg-white rounded-2xl overflow-hidden">
              {selectedImage.beforeAfter ? (
                // Before/After Layout
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative">
                    <img
                      src={selectedImage.beforeAfter.before}
                      alt="Avant traitement"
                      className="w-full h-64 md:h-96 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Avant
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={selectedImage.beforeAfter.after}
                      alt="Après traitement"
                      className="w-full h-64 md:h-96 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Après
                    </div>
                  </div>
                </div>
              ) : (
                // Single Image Layout
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-64 md:h-96 object-cover"
                />
              )}

              {/* Image Info */}
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Star className="w-5 h-5 text-primary-500 mr-2" />
                  <span className="font-inter font-semibold text-primary-600">
                    {selectedImage.treatment}
                  </span>
                </div>
                <p className="font-inter text-neutral-700 leading-relaxed">
                  {selectedImage.description}
                </p>
                
                {/* Image Counter */}
                <div className="mt-4 text-center">
                  <span className="font-inter text-sm text-neutral-500">
                    {currentImageIndex + 1} / {filteredImages.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
            Vous souhaitez des résultats similaires ?
          </h2>
          <p className="font-inter text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Prenez rendez-vous pour une consultation personnalisée et découvrez 
            comment nous pouvons vous aider à atteindre vos objectifs esthétiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gradient-primary text-white px-8 py-4 rounded-full font-inter font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Prendre rendez-vous
            </a>
            <a
              href="tel:+32495280976"
              className="border-2 border-primary-400 text-primary-600 px-8 py-4 rounded-full font-inter font-semibold hover:bg-primary-50 transition-all duration-300"
            >
              +32 495 28 09 76
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;