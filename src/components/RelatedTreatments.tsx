import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getAnchorText } from '../utils/anchorVariations';

interface Treatment {
  title: string;
  description: string;
  href: string;
  category?: string;
  anchorText?: string;
}

interface RelatedTreatmentsProps {
  currentTreatment: string;
  treatments: Treatment[];
  maxItems?: number;
  title?: string;
  subtitle?: string;
}

const RelatedTreatments: React.FC<RelatedTreatmentsProps> = ({
  currentTreatment,
  treatments,
  maxItems = 3,
  title = 'Traitements complémentaires',
  subtitle = 'Découvrez d\'autres solutions qui pourraient vous intéresser'
}) => {
  const filteredTreatments = treatments
    .filter(t => t.title !== currentTreatment)
    .slice(0, maxItems);

  if (filteredTreatments.length === 0) {
    return null;
  }

  return (
    <section className="bg-neutral-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="font-inter text-neutral-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredTreatments.map((treatment, index) => {
            const anchorText = treatment.anchorText || getAnchorText(treatment.href, 'generic');

            return (
              <Link
                key={index}
                to={treatment.href}
                title={`${treatment.title} - ${treatment.description}`}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                rel="related"
              >
                {treatment.category && (
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full mb-4">
                    {treatment.category}
                  </span>
                )}

                <h3 className="font-playfair text-xl font-bold text-neutral-800 mb-3 group-hover:text-primary-600 transition-colors">
                  {treatment.title}
                </h3>

                <p className="font-inter text-neutral-600 text-sm mb-4 line-clamp-2">
                  {treatment.description}
                </p>

                <div className="flex items-center text-primary-600 font-semibold text-sm group-hover:text-primary-700">
                  <span>{anchorText}</span>
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/traitements"
            className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-full hover:bg-primary-600 hover:text-white transition-all duration-300"
            rel="index"
          >
            Voir tous nos traitements
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedTreatments;
