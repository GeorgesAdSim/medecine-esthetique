import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, HelpCircle, Clock, Phone, Mail, MapPin } from 'lucide-react';
import FloralDecoration from './FloralDecoration';
import Breadcrumbs from './Breadcrumbs';
import InternalLinkCard from './InternalLinkCard';
import AppointmentCalendar from './AppointmentCalendar';
import { parseInternalLinks } from '../utils/linkParser';

interface ContentBlock {
  id: string;
  type?: string;
  block_type?: string;
  order?: number;
  block_order?: number;
  content: any;
}

interface BlockRendererProps {
  blocks?: ContentBlock[];
  block?: ContentBlock;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks, block }) => {
  if (block) {
    return <>{renderBlock(block)}</>;
  }

  if (!blocks || blocks.length === 0) {
    return null;
  }

  const sortedBlocks = [...blocks].sort((a, b) => (a.order || a.block_order || 0) - (b.order || b.block_order || 0));

  return (
    <div className="animate-fade-in">
      {sortedBlocks.map(renderBlock)}
    </div>
  );
};

const renderBlock = (block: ContentBlock) => {
  const blockType = block.type || block.block_type;
  switch (blockType) {
      case 'hero':
        return (
          <section key={block.id} className="bg-gradient-hero pt-32 pb-16">
            <FloralDecoration position="top-right" size="large" opacity={0.09} variant="venus" />
            <FloralDecoration position="top-left" size="small" opacity={0.05} variant="wave" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="animate-slide-up">
                  <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 mb-4 sm:mb-6">
                    {block.content.title}
                  </h1>
                  {block.content.subtitle && (
                    <p className="font-inter text-lg sm:text-xl text-primary-600 mb-4 sm:mb-6 font-medium">
                      {block.content.subtitle}
                    </p>
                  )}
                  {block.content.description && (
                    <p className="font-inter text-base sm:text-lg text-neutral-700 mb-6 sm:mb-8 leading-relaxed">
                      {block.content.description}
                    </p>
                  )}
                  {block.content.ctaText && (
                    <Link
                      to={block.content.ctaLink || '/contact'}
                      className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 text-white font-medium rounded-full hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                    >
                      {block.content.ctaText}
                    </Link>
                  )}
                </div>
                {block.content.image && (
                  <div className="animate-slide-up order-first lg:order-last" style={{ animationDelay: '0.2s' }}>
                    <img
                      src={block.content.image}
                      alt={block.content.imageAlt || ''}
                      className="w-full h-auto rounded-3xl shadow-2xl"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case 'heading':
        const HeadingTag = (block.content.level || 'h2') as keyof JSX.IntrinsicElements;
        return (
          <div key={block.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HeadingTag className={`font-playfair font-bold text-neutral-800 ${
              block.content.level === 'h1' ? 'text-4xl' :
              block.content.level === 'h3' ? 'text-2xl' : 'text-3xl'
            }`}>
              {block.content.text}
            </HeadingTag>
            {block.content.subtitle && (
              <p className="font-inter text-lg text-neutral-600 mt-4">
                {block.content.subtitle}
              </p>
            )}
          </div>
        );

      case 'text':
        return (
          <section key={block.id} className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {block.content.title && (
                <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-8">
                  {block.content.title}
                </h2>
              )}
              <div className="prose prose-lg max-w-none">
                {block.content.content ? (
                  <div
                    className="font-inter text-lg text-neutral-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: block.content.content }}
                  />
                ) : (
                  (block.content.paragraphs || [block.content.text]).map((para: string, index: number) => (
                    <p key={index} className="font-inter text-lg text-neutral-700 leading-relaxed mb-6">
                      {parseInternalLinks(para)}
                    </p>
                  ))
                )}
              </div>
            </div>
          </section>
        );

      case 'image':
        return (
          <div key={block.id} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <img
              src={block.content.url}
              alt={block.content.alt || ''}
              className="w-full h-auto rounded-2xl shadow-lg"
            />
            {block.content.caption && (
              <p className="text-center text-sm text-neutral-600 mt-4">{block.content.caption}</p>
            )}
          </div>
        );

      case 'features':
        return (
          <section key={block.id} className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(block.content.features || []).map((feature: any, index: number) => (
                  <div
                    key={index}
                    className="text-center p-6 rounded-2xl bg-neutral-50 hover:bg-primary-50 transition-colors"
                  >
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="font-playfair text-xl font-semibold text-neutral-800 mb-3">
                      {feature.title}
                    </h3>
                    <p className="font-inter text-neutral-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'cards':
        return (
          <section key={block.id} className="py-16 bg-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {block.content.title && (
                <div className="text-center mb-12">
                  <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-4">
                    {block.content.title}
                  </h2>
                  {block.content.subtitle && (
                    <p className="font-inter text-lg text-neutral-600">
                      {block.content.subtitle}
                    </p>
                  )}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(block.content.cards || []).map((card: any, index: number) => {
                  const CardContent = (
                    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-playfair text-xl font-semibold text-neutral-800">
                          {card.title}
                        </h3>
                        {card.duration && (
                          <span className="flex items-center text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                            <Clock className="w-4 h-4 mr-1" />
                            {card.duration}
                          </span>
                        )}
                      </div>
                      <p className="font-inter text-neutral-600 mb-4">
                        {card.description}
                      </p>
                      {card.details && card.details.length > 0 && (
                        <ul className="space-y-2">
                          {card.details.map((detail: string, detailIndex: number) => (
                            <li key={detailIndex} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="font-inter text-sm text-neutral-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );

                  if (card.href) {
                    return (
                      <Link key={index} to={card.href} className="block h-full cursor-pointer">
                        {CardContent}
                      </Link>
                    );
                  }

                  return <div key={index}>{CardContent}</div>;
                })}
              </div>
            </div>
          </section>
        );

      case 'faq':
        return (
          <section key={block.id} className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-4">
                  {block.content.title || 'Questions fréquentes'}
                </h2>
                {block.content.subtitle && (
                  <p className="font-inter text-lg text-neutral-600">
                    {block.content.subtitle}
                  </p>
                )}
              </div>
              <div className="space-y-6">
                {(block.content.questions || []).map((qa: any, index: number) => (
                  <div
                    key={index}
                    className="bg-neutral-50 rounded-2xl p-6 hover:bg-primary-50 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <HelpCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-playfair font-semibold text-lg text-neutral-800 mb-2">
                          {qa.question}
                        </h3>
                        <p className="font-inter text-neutral-600 leading-relaxed">
                          {qa.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'image-text':
        const isImageRight = block.content.imagePosition === 'right';
        return (
          <section key={block.id} className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isImageRight ? '' : 'lg:grid-flow-dense'}`}>
                <div className={isImageRight ? 'lg:order-1' : 'lg:order-2'}>
                  {block.content.title && (
                    <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6">
                      {block.content.title}
                    </h2>
                  )}
                  {block.content.description && (
                    <p className="font-inter text-lg text-neutral-700 mb-6 leading-relaxed">
                      {block.content.description}
                    </p>
                  )}
                  {block.content.points && block.content.points.length > 0 && (
                    <div className="space-y-4">
                      {block.content.points.map((point: any, index: number) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-inter font-semibold text-neutral-800 mb-1">
                              {point.title}
                            </h3>
                            <p className="font-inter text-neutral-600">
                              {point.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className={isImageRight ? 'lg:order-2' : 'lg:order-1'}>
                  {block.content.image && (
                    <img
                      src={block.content.image}
                      alt={block.content.imageAlt || ''}
                      className="w-full h-auto rounded-2xl shadow-lg"
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        );

      case 'cta':
        return (
          <section key={block.id} className="py-16 bg-gradient-hero">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-4">
                {block.content.title}
              </h2>
              {block.content.description && (
                <p className="font-inter text-lg text-neutral-600 mb-8">
                  {block.content.description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {block.content.primaryButton && (
                  <Link
                    to={block.content.primaryButton.link || '/contact'}
                    className="bg-gradient-primary text-white px-8 py-4 rounded-full font-inter font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    {block.content.primaryButton.text}
                  </Link>
                )}
                {block.content.secondaryButton && (
                  <Link
                    to={block.content.secondaryButton.link || '/contact'}
                    className="border-2 border-primary-400 text-primary-600 px-8 py-4 rounded-full font-inter font-semibold hover:bg-primary-50 transition-all duration-300"
                  >
                    {block.content.secondaryButton.text}
                  </Link>
                )}
              </div>
            </div>
          </section>
        );

      case 'treatments':
        return (
          <section key={block.id} className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {block.content.title && (
                <div className="text-center mb-12">
                  <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-4">
                    {block.content.title}
                  </h2>
                  {block.content.subtitle && (
                    <p className="font-inter text-lg text-neutral-600">
                      {block.content.subtitle}
                    </p>
                  )}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(block.content.treatments || []).map((treatment: any, index: number) => (
                  <Link
                    key={index}
                    to={treatment.href}
                    className="bg-neutral-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-playfair text-xl font-semibold text-neutral-800 mb-3">
                      {treatment.title}
                    </h3>
                    <p className="font-inter text-neutral-600 mb-4">
                      {treatment.description}
                    </p>
                    {treatment.duration && (
                      <div className="flex items-center text-sm text-primary-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {treatment.duration}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );

      case 'steps':
        return (
          <section key={block.id} className="py-16 bg-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {block.content.title && (
                <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-12 text-center">
                  {block.content.title}
                </h2>
              )}
              <div className="space-y-6">
                {(block.content.steps || []).map((step: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="font-inter text-neutral-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'gallery':
        return <GalleryBlock key={block.id} content={block.content} />;

      case 'related-links':
        return (
          <section key={block.id} className="py-16 bg-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {block.content.title && (
                <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-8 text-center">
                  {block.content.title}
                </h2>
              )}
              {block.content.subtitle && (
                <p className="font-inter text-lg text-neutral-600 mb-12 text-center max-w-3xl mx-auto">
                  {block.content.subtitle}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(block.content.links || []).map((link: any, index: number) => (
                  <InternalLinkCard
                    key={index}
                    title={link.title}
                    description={link.description}
                    href={link.href}
                    anchorText={link.anchorText}
                    variant={link.variant || 'primary'}
                  />
                ))}
              </div>
            </div>
          </section>
        );

      case 'calendar':
        return (
          <section key={block.id} className="py-20 bg-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {block.content.title && (
                <div className="text-center mb-16">
                  <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
                    {block.content.title}
                  </h2>
                  {block.content.subtitle && (
                    <p className="font-inter text-lg text-neutral-600 max-w-2xl mx-auto">
                      {block.content.subtitle}
                    </p>
                  )}
                </div>
              )}
              <AppointmentCalendar />
            </div>
          </section>
        );

      case 'contact-info':
        return (
          <section key={block.id} className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {block.content.title && (
                <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-12 text-center">
                  {block.content.title}
                </h2>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {block.content.phone && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                      Téléphone
                    </h3>
                    <a
                      href={`tel:${block.content.phone}`}
                      className="font-inter text-lg text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {block.content.phone}
                    </a>
                  </div>
                )}
                {block.content.email && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                      Email
                    </h3>
                    <a
                      href={`mailto:${block.content.email}`}
                      className="font-inter text-lg text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {block.content.email}
                    </a>
                  </div>
                )}
                {block.content.address && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                      Adresse
                    </h3>
                    <a
                      href={block.content.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(block.content.address.street + ', ' + block.content.address.city + ', ' + block.content.address.region)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-inter text-lg text-primary-600 hover:text-primary-700 transition-colors space-y-1 block"
                    >
                      <p>{block.content.address.street}</p>
                      <p>{block.content.address.city}</p>
                      <p>{block.content.address.region}</p>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case 'map':
        return (
          <section key={block.id} className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {block.content.title && (
                <div className="text-center mb-8">
                  <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-4">
                    {block.content.title}
                  </h2>
                  {block.content.subtitle && (
                    <p className="font-inter text-lg text-neutral-600">
                      {block.content.subtitle}
                    </p>
                  )}
                </div>
              )}
              <div className="bg-neutral-100 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src={block.content.embedUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={block.content.title || 'Carte'}
                />
              </div>
            </div>
          </section>
        );

      case 'iframe':
        const widthClass = {
          full: 'max-w-full',
          large: 'max-w-7xl',
          medium: 'max-w-4xl',
          small: 'max-w-3xl'
        }[block.content.width || 'full'] || 'max-w-full';

        return (
          <section key={block.id} className="py-16 bg-white">
            <div className={`${widthClass} mx-auto px-4 sm:px-6 lg:px-8`}>
              {block.content.title && (
                <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-8 text-center">
                  {block.content.title}
                </h2>
              )}
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-neutral-100">
                {block.content.src ? (
                  <iframe
                    src={block.content.src}
                    width="100%"
                    height={block.content.height || '400'}
                    style={{ border: 0 }}
                    allowFullScreen={block.content.allowFullscreen !== false}
                    loading="lazy"
                    title={block.content.title || 'Contenu intégré'}
                  />
                ) : (
                  <div className="flex items-center justify-center h-64 text-neutral-400">
                    <p>Aucun contenu à afficher</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      default:
        console.warn('Unknown block type:', blockType);
        return null;
    }
};

const GalleryBlock: React.FC<{ content: any }> = ({ content }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const categories = content.categories || [];
  const images = content.images || [];

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter((img: any) => img.category === selectedCategory);

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {content.title && (
            <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-8 text-center">
              {content.title}
            </h2>
          )}

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category: any) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-inter font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image: any) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-playfair text-xl font-semibold text-white mb-2">
                      {image.treatment}
                    </h3>
                    {image.description && (
                      <p className="font-inter text-sm text-white/90">
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-colors"
            >
              ×
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="font-playfair text-2xl font-semibold text-white mb-2">
                {selectedImage.treatment}
              </h3>
              {selectedImage.description && (
                <p className="font-inter text-white/80">
                  {selectedImage.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlockRenderer;
