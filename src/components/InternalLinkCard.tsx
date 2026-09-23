import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface InternalLinkCardProps {
  title: string;
  description: string;
  href: string;
  anchorText: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

const InternalLinkCard: React.FC<InternalLinkCardProps> = ({
  title,
  description,
  href,
  anchorText,
  variant = 'primary'
}) => {
  const variantClasses = {
    primary: 'border-primary-200 hover:border-primary-400 hover:bg-primary-50',
    secondary: 'border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50',
    accent: 'border-rose-200 hover:border-rose-400 hover:bg-rose-50'
  };

  return (
    <Link
      to={href}
      title={`${title} - ${description}`}
      className={`block p-6 rounded-xl border-2 transition-all duration-300 ${variantClasses[variant]} group`}
    >
      <h3 className="font-playfair text-xl font-semibold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      <p className="font-inter text-neutral-600 mb-4">
        {description}
      </p>
      <span className="inline-flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
        {anchorText}
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
};

export default InternalLinkCard;
