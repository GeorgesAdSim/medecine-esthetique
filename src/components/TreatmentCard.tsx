import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, DivideIcon as LucideIcon } from 'lucide-react';

interface TreatmentCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  duration: string;
  href?: string;
}

const TreatmentCard: React.FC<TreatmentCardProps> = ({
  icon: Icon,
  title,
  description,
  duration,
  href
}) => {
  const cardClasses = `bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 h-full flex flex-col group hover:-translate-y-2`;

  const CardContent = (
    <>
      <div className="flex items-center mb-6">
        <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="font-playfair font-semibold text-xl text-stone-800 group-hover:text-primary-600 transition-colors duration-300">
          {title}
        </h3>
      </div>

      <p className="font-inter text-stone-600 mb-6 leading-relaxed flex-grow">
        {description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
        <div className="flex items-center text-primary-600">
          <Clock className="w-4 h-4 mr-2" />
          <span className="font-inter text-sm font-medium">Durée : {duration}</span>
        </div>
        {href && (
          <span className="font-inter text-sm text-primary-600 group-hover:text-primary-700 font-medium group-hover:translate-x-1 transition-transform duration-300">
            En savoir plus →
          </span>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link to={href} className="block h-full cursor-pointer">
        <div className={cardClasses}>
          {CardContent}
        </div>
      </Link>
    );
  }

  return (
    <div className={cardClasses}>
      {CardContent}
    </div>
  );
};

export default TreatmentCard;