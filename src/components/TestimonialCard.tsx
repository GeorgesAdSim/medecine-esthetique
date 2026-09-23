import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  rating: number;
  comment: string;
  treatment: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ 
  name, 
  rating, 
  comment, 
  treatment 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
      <div className="flex items-center mb-4">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      <p className="font-inter text-neutral-700 mb-4 italic leading-relaxed">
        "{comment}"
      </p>
      <div className="border-t pt-4">
        <p className="font-inter font-semibold text-neutral-800">{name}</p>
        <p className="font-inter text-sm text-primary-600">{treatment}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;