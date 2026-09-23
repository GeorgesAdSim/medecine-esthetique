import React from 'react';
import EditableImage from './EditableImage';
import EditableText from './EditableText';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <EditableImage
        imageKey="hero.banner"
        defaultSrc="/Image 29-10-25 à 11.45 copy.jpeg"
        alt="Docteure Jocelyne Fassotte - Médecine esthétique à Liège"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <EditableText
              textKey="hero.title"
              defaultText="Médecine esthétique naturelle à Liège"
              as="h1"
              className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight"
            />
            <EditableText
              textKey="hero.subtitle"
              defaultText="Sublimez votre beauté naturelle avec expertise et bienveillance"
              as="p"
              className="font-inter text-lg md:text-xl mb-8 text-white/90"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
