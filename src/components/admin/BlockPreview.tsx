import React from 'react';
import { Eye } from 'lucide-react';

interface Block {
  type: string;
  [key: string]: any;
}

interface BlockPreviewProps {
  blocks: Block[];
}

const BlockPreview: React.FC<BlockPreviewProps> = ({ blocks = [] }) => {
  const renderBlock = (block: Block, index: number) => {
    if (!block || !block.type) {
      return null;
    }

    switch (block.type) {
      case 'hero':
        return (
          <div key={index} className="relative bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg overflow-hidden min-h-[400px] flex items-center">
            {block.image && (
              <div className="absolute inset-0">
                <img
                  src={block.image}
                  alt={block.title}
                  className="w-full h-full object-cover opacity-30"
                />
              </div>
            )}
            <div className="relative z-10 container mx-auto px-6 py-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {block.title || 'Titre'}
              </h1>
              {block.subtitle && (
                <p className="text-xl text-gray-700 mb-8 max-w-2xl">
                  {block.subtitle}
                </p>
              )}
              {block.buttonText && (
                <a
                  href={block.buttonLink || '#'}
                  className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {block.buttonText}
                </a>
              )}
            </div>
          </div>
        );

      case 'text':
        return (
          <div key={index} className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: block.content || '<p>Texte vide</p>' }} />
          </div>
        );

      case 'title':
        const Tag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
        return (
          <Tag key={index} className="font-bold text-gray-900">
            {block.text || 'Titre'}
          </Tag>
        );

      case 'image':
        return (
          <div key={index} className="rounded-lg overflow-hidden">
            {block.src ? (
              <img
                src={block.src}
                alt={block.alt || ''}
                className="w-full h-auto"
              />
            ) : (
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <p className="text-gray-500">Aucune image</p>
              </div>
            )}
            {block.caption && (
              <p className="text-sm text-gray-600 mt-2 text-center italic">
                {block.caption}
              </p>
            )}
          </div>
        );

      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-primary-500 pl-6 py-4 my-6 bg-gray-50 rounded-r-lg">
            <p className="text-lg text-gray-700 italic mb-2">
              "{block.text || 'Citation'}"
            </p>
            <cite className="text-sm text-gray-600 not-italic">
              — {block.author || 'Auteur'}
            </cite>
          </blockquote>
        );

      case 'features':
        return (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {(block.features || []).map((feature: any, i: number) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold">★</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        );

      case 'faq':
        return (
          <div key={index} className="space-y-4 my-8">
            {block.title && (
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {block.title}
              </h3>
            )}
            {(block.items || []).map((item: any, i: number) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">{item.question}</h4>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        );

      case 'list':
        const isComplexList = block.items && block.items.length > 0 && typeof block.items[0] === 'object';

        if (isComplexList) {
          return (
            <div key={index} className="space-y-4 my-8">
              {block.title && (
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {block.title}
                </h3>
              )}
              {(block.items || []).map((item: any, i: number) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{item.category}</h4>
                    {item.duration && (
                      <span className="text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                        {item.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-3">{item.description}</p>
                  {item.details && item.details.length > 0 && (
                    <ul className="space-y-1">
                      {item.details.map((detail: string, di: number) => (
                        <li key={di} className="text-sm text-gray-600 flex items-start">
                          <span className="text-primary-500 mr-2">✓</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          );
        }

        return (
          <ul key={index} className="space-y-2 my-6">
            {(block.items || []).map((item: string, i: number) => (
              <li key={i} className="flex items-start">
                <span className="text-primary-600 mr-3">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        );

      case 'testimonials':
        return (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
            {(block.items || []).map((testimonial: any, i: number) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  {testimonial.rating && (
                    <div className="flex text-yellow-400">
                      {Array.from({ length: testimonial.rating }, (_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case 'cta':
        return (
          <div key={index} className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg p-12 text-center text-white my-8">
            <h3 className="text-3xl font-bold mb-4">{block.title || 'Titre'}</h3>
            {block.description && (
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                {block.description}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(block.primaryButton?.text || block.buttonText) && (
                <a
                  href={block.primaryButton?.link || block.buttonLink || '#'}
                  className="inline-block px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  {block.primaryButton?.text || block.buttonText}
                </a>
              )}
              {block.secondaryButton?.text && (
                <a
                  href={block.secondaryButton?.link || '#'}
                  className="inline-block px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-semibold"
                >
                  {block.secondaryButton.text}
                </a>
              )}
            </div>
          </div>
        );

      case 'steps':
        return (
          <div key={index} className="my-8">
            {block.title && (
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {block.title}
              </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(block.items || []).map((step: any, i: number) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {i + 1}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'iframe':
        return (
          <div key={index} className="my-8">
            {block.title && (
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {block.title}
              </h3>
            )}
            <div className="relative rounded-lg overflow-hidden shadow-lg bg-gray-100 border-2 border-gray-300">
              {block.src ? (
                <iframe
                  src={block.src}
                  width="100%"
                  height={block.height || '400'}
                  style={{ border: 0 }}
                  allowFullScreen={block.allowFullscreen !== false}
                  loading="lazy"
                  title={block.title || 'Contenu intégré'}
                />
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center text-gray-400">
                    <p className="text-sm font-medium">Aucun contenu iframe</p>
                    <p className="text-xs mt-1">Ajoutez une URL pour afficher le contenu</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div key={index} className="bg-gray-100 border border-gray-300 rounded-lg p-4">
            <p className="text-sm text-gray-600 font-mono">
              Type de bloc: {block.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-8">
      <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-gray-200">
        <Eye className="w-5 h-5 text-primary-600" />
        <h4 className="text-lg font-bold text-gray-900">Aperçu de la page</h4>
      </div>

      {!blocks || blocks.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>Aucun contenu à prévisualiser</p>
          <p className="text-sm mt-2">Ajoutez des blocs pour voir l'aperçu</p>
        </div>
      ) : (
        <div className="space-y-8">
          {blocks.filter(block => block && block.type).map((block, index) => renderBlock(block, index))}
        </div>
      )}
    </div>
  );
};

export default BlockPreview;
