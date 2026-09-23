import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, Users, Heart, BookOpen, Palette } from 'lucide-react';
import FloralDecoration from '../components/FloralDecoration';

const About: React.FC = () => {
  const qualifications = [
    {
      icon: GraduationCap,
      title: "Diplôme de spécialiste",
      description: "Collège International de Médecine Esthétique de Paris V (C.I.M.E.)",
      detail: "Seule formation reconnue en Belgique pour la qualification de spécialiste"
    },
    {
      icon: BookOpen,
      title: "Travail de fin d'études",
      description: "Fils tenseurs résorbables à cônes bidirectionnels",
      detail: "Expertise dans les techniques de rajeunissement innovantes"
    },
    {
      icon: Award,
      title: "Formation médicale",
      description: "Médecine, chirurgie et accouchement (ULg)",
      detail: "Base solide en sciences médicales"
    },
    {
      icon: Palette,
      title: "Formation artistique",
      description: "Dessin et sculpture aux Beaux-Arts et Institut Saint-Luc",
      detail: "Sens artistique pour des résultats harmonieux"
    }
  ];

  const memberships = [
    "Société Belge de Médecine Esthétique (SBME)",
    "Association Française de Médecine Esthétique (AFME)",
    "Société Française de Médecine Esthétique (SFME)"
  ];

  const formations = [
    "Congrès internationaux SBME",
    "Congrès AFME et SFME",
    "Instituto Javier de Benito à Barcelone",
    "Diplômes complémentaires en mésothérapie"
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-32 pb-16">
        <FloralDecoration position="top-right" size="large" opacity={0.08} variant="venus" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 mb-4 sm:mb-6">
                Dre Jocelyne Fassotte - Médecin Esthétique Diplômée CIME
              </h1>
              <p className="font-inter text-lg sm:text-xl text-primary-600 mb-4 sm:mb-6 font-medium">
                Spécialiste en Médecine Esthétique Non Chirurgicale à Liège
              </p>
              <p className="font-inter text-base sm:text-lg text-neutral-700 leading-relaxed">
                Spécialiste en médecine esthétique non chirurgicale, alliant expertise
                médicale et sens artistique pour des résultats naturels et harmonieux.
              </p>
            </div>
            <div className="animate-scale-in mt-8 lg:mt-0">
              <div className="relative max-w-md mx-auto lg:max-w-full">
                <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/image copy.png"
                    alt="Docteure Jocelyne Fassotte"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-primary rounded-full opacity-20"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 sm:w-20 sm:h-20 bg-sage-300 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Biography */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="font-inter text-lg text-neutral-700 leading-relaxed mb-6">
              La Dre Jocelyne Fassotte est spécialiste en médecine esthétique non chirurgicale, 
              diplômée du <strong>Collège International de Médecine Esthétique de Paris V (C.I.M.E.)</strong>, 
              seule formation reconnue en Belgique pour la qualification de spécialiste dans ce domaine. 
              Son travail de fin d'études portait sur les fils tenseurs résorbables à cônes bidirectionnels, 
              témoignant de son expertise dans les techniques de rajeunissement innovantes.
            </p>
            
            <p className="font-inter text-lg text-neutral-700 leading-relaxed mb-6">
              Elle continue de se perfectionner en participant régulièrement à des congrès internationaux 
              (SBME, AFME, SFME, Instituto Javier de Benito à Barcelone) et est titulaire de plusieurs 
              diplômes complémentaires, notamment en mésothérapie.
            </p>
            
            <p className="font-inter text-lg text-neutral-700 leading-relaxed mb-6">
              Diplômée en médecine, chirurgie et accouchement (ULg), la Dre Fassotte allie rigueur 
              scientifique et sens artistique, enrichis par sa formation en dessin et sculpture aux 
              Beaux-Arts et à l'Institut Saint-Luc de Liège. Cette double compétence lui permet de 
              proposer des résultats naturels et harmonieux à ses patients.
            </p>
            
            <p className="font-inter text-lg text-neutral-700 leading-relaxed">
              Membre de la Société Belge de Médecine Esthétique et de l'Association Française de 
              Médecine Esthétique, elle s'engage à offrir des traitements sécurisés, personnalisés 
              et conformes aux dernières avancées médicales.
            </p>
          </div>
        </div>
      </section>

      {/* Qualifications Grid */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Formation et expertise
            </h2>
            <p className="font-inter text-lg text-neutral-600 max-w-2xl mx-auto">
              Une formation complète alliant excellence médicale et sensibilité artistique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {qualifications.map((qual, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <qual.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-2">
                      {qual.title}
                    </h3>
                    <p className="font-inter font-medium text-primary-600 mb-2">
                      {qual.description}
                    </p>
                    <p className="font-inter text-neutral-600 text-sm">
                      {qual.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Memberships */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6">
                Affiliations professionnelles
              </h2>
              <div className="space-y-4">
                {memberships.map((membership, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <span className="font-inter text-neutral-700">{membership}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6">
                Formation continue
              </h2>
              <div className="space-y-4">
                {formations.map((formation, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <span className="font-inter text-neutral-700">{formation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
            Philosophie de soins
          </h2>
          <p className="font-inter text-lg text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            La double formation médicale et artistique de la Dre Fassotte lui permet d'aborder
            chaque patient avec une vision globale, alliant sécurité médicale et recherche de
            l'harmonie esthétique. Son objectif est de révéler la beauté naturelle de chacun
            dans le respect de son identité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-gradient-primary text-white px-8 py-4 rounded-full font-inter font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Prendre rendez-vous
            </Link>
            <Link
              to="/traitements"
              className="border-2 border-primary-400 text-primary-600 px-8 py-4 rounded-full font-inter font-semibold hover:bg-primary-50 transition-all duration-300"
            >
              Découvrir nos traitements
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;