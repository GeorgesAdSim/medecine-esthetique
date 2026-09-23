import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, Clock, MapPin, HelpCircle } from 'lucide-react';
import FloralDecoration from './FloralDecoration';

interface CustomTreatment {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  price?: string;
  icon: string;
  category: 'injection' | 'surface' | 'advanced' | 'other';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  content: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    sections: TreatmentSection[];
  };
}

interface TreatmentSection {
  id: string;
  type: 'description' | 'zones' | 'process' | 'advantages' | 'faq' | 'contraindications';
  title: string;
  content: any;
  order: number;
}

interface CustomTreatmentRendererProps {
  treatment: CustomTreatment;
}

const CustomTreatmentRenderer: React.FC<CustomTreatmentRendererProps> = ({ treatment }) => {
  const renderSection = (section: TreatmentSection) => {
    switch (section.type) {
      case 'description':
        return (
          <section key={section.id} className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
                  {section.title}
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="font-inter text-lg text-neutral-700 leading-relaxed">
                  {section.content.text}
                </p>
              </div>
            </div>
          </section>
        );

      case 'zones':
        return (
          <section key={section.id} className="py-20 bg-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
                  {section.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(section.content.zones || []).map((zone: any, index: number) => (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="flex items-center mb-4">
                      <MapPin className="w-6 h-6 text-primary-500 mr-3" />
                      <h3 className="font-playfair font-semibold text-xl text-neutral-800">
                        {zone.name}
                      </h3>
                    </div>
                    <p className="font-inter text-neutral-600 leading-relaxed">
                      {zone.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'advantages':
        return (
          <section key={section.id} className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
                  {section.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(section.content.advantages || []).map((advantage: string, index: number) => (
                  <div 
                    key={index}
                    className="bg-neutral-50 rounded-xl p-6 animate-slide-up"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                      <p className="font-inter text-neutral-700">{advantage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'faq':
        return (
          <section key={section.id} className="py-20 bg-neutral-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
                  {section.title}
                </h2>
              </div>
              <div className="space-y-6">
                {(section.content.questions || []).map((qa: any, index: number) => (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="flex items-start space-x-4">
                      <HelpCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
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

      case 'contraindications':
        return (
          <section key={section.id} className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
                  {section.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {section.content.absolute && (
                  <div className="bg-red-50 rounded-2xl p-8">
                    <h3 className="font-playfair font-semibold text-xl text-red-700 mb-6">
                      Absolues
                    </h3>
                    <ul className="space-y-3">
                      {section.content.absolute.map((item: string, index: number) => (
                        <li key={index} className="font-inter text-neutral-700 flex items-center">
                          <AlertTriangle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {section.content.relative && (
                  <div className="bg-orange-50 rounded-2xl p-8">
                    <h3 className="font-playfair font-semibold text-xl text-orange-700 mb-6">
                      Relatives
                    </h3>
                    <ul className="space-y-3">
                      {section.content.relative.map((item: string, index: number) => (
                        <li key={index} className="font-inter text-neutral-700 flex items-center">
                          <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      default:
        return (
          <section key={section.id} className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
                {section.title}
              </h2>
              <p className="text-gray-600">Section de type {section.type}</p>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="animate-fade-in">
      {/* SEO Meta */}
      <title>{treatment.seo.title}</title>
      <meta name="description" content={treatment.seo.description} />
      <meta name="keywords" content={treatment.seo.keywords.join(', ')} />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-32 pb-16">
        <FloralDecoration position="top-right" size="large" opacity={0.08} variant="venus" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="font-playfair text-5xl font-bold text-neutral-800 mb-6">
                {treatment.content.heroTitle || treatment.name}
              </h1>
              <p className="font-inter text-xl text-primary-600 mb-6 font-medium">
                {treatment.content.heroSubtitle || treatment.shortDescription}
              </p>
              {treatment.content.heroDescription && (
                <p className="font-inter text-lg text-neutral-700 mb-8 leading-relaxed">
                  {treatment.content.heroDescription}
                </p>
              )}
              <Link
                to="/contact"
                className="bg-gradient-primary text-white px-8 py-4 rounded-full font-inter font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 inline-block"
              >
                Prendre rendez-vous
              </Link>
            </div>
            <div className="lg:block hidden animate-scale-in">
              <div className="w-full h-96 bg-neutral-200 rounded-3xl flex items-center justify-center">
                <span className="text-neutral-400 font-inter">{treatment.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Sections */}
      {treatment.content.sections
        .sort((a, b) => a.order - b.order)
        .map(renderSection)}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
            Consultation avec Docteure Fassotte
          </h2>
          <p className="font-inter text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Pour découvrir comment {treatment.name.toLowerCase()} peut répondre à vos objectifs esthétiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-gradient-primary text-white px-8 py-4 rounded-full font-inter font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Prendre rendez-vous
            </Link>
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

export default CustomTreatmentRenderer;