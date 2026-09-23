import React from 'react';
import { Droplets, Syringe, Sparkles, Activity, Zap, Beaker, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloralDecoration from '../components/FloralDecoration';
import TreatmentCard from '../components/TreatmentCard';

const Treatments: React.FC = () => {
  const treatments = [
    {
      icon: Droplets,
      title: "Acide hyaluronique",
      description: "Restauration des volumes, comblement des rides, hydratation profonde",
      duration: "6-18 mois",
      href: "/acide-hyaluronique-liege"
    },
    {
      icon: Syringe,
      title: "Toxine botulique (Botox)",
      description: "Relaxation musculaire pour atténuer les rides d'expression",
      duration: "4-6 mois",
      href: "/toxine-botulique-liege"
    },
    {
      icon: Sparkles,
      title: "Peelings médicaux",
      description: "Exfoliation contrôlée pour renouveler la peau",
      duration: "Variable",
      href: "/peelings-chimiques-liege"
    },
    {
      icon: Activity,
      title: "Mésolift",
      description: "Cocktail de vitamines et acides aminés injectés",
      duration: "3-6 mois",
      href: "/mesotherapie-liege"
    },
    {
      icon: Zap,
      title: "Fils tenseurs",
      description: "Lifting naturel sans chirurgie pour retendre et repositionner les tissus",
      duration: "12-18 mois",
      href: "/lifting-fils-tenseurs-liege"
    },
    {
      icon: Beaker,
      title: "Cosmétologie médicale",
      description: "Conseils personnalisés et soins cosmétiques adaptés à votre type de peau",
      duration: "Permanent",
      href: "/cosmetologie-medicale-liege"
    },
    {
      icon: Activity,
      title: "Stimulateurs de collagène",
      description: "Stimulation naturelle de la production de collagène",
      duration: "18-24 mois",
      href: "/stimulateurs-collagene-liege"
    },
    {
      icon: Droplets,
      title: "Liquid Lift",
      description: "Rajeunissement global par injections stratégiques",
      duration: "12-18 mois",
      href: "/rajeunissement-global-liege"
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-32 pb-16">
        <FloralDecoration position="top-center" size="large" opacity={0.07} variant="shell" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-5xl font-bold text-neutral-800 mb-6">
            Traitements de Médecine Esthétique à Liège
          </h1>
          <p className="font-inter text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            La Dre Fassotte propose une gamme complète de traitements esthétiques non invasifs,
            conçus pour révéler la beauté naturelle de ses patients avec des résultats harmonieux et durables.
          </p>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Nos spécialités
            </h2>
            <p className="font-inter text-lg text-neutral-600 max-w-2xl mx-auto">
              Des solutions personnalisées pour révéler votre beauté avec des techniques douces et des résultats naturels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((treatment, index) => (
              <div key={index} className="animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <TreatmentCard {...treatment} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Déroulement d'une consultation
            </h2>
            <p className="font-inter text-lg text-neutral-600">
              Un processus structuré pour des résultats optimaux
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                Consultation initiale
              </h3>
              <p className="font-inter text-neutral-600 leading-relaxed">
                Analyse de votre visage, écoute de vos attentes et conseil personnalisé 
                pour définir le plan de traitement optimal.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                Traitement
              </h3>
              <p className="font-inter text-neutral-600 leading-relaxed">
                Réalisation du soin dans des conditions optimales de sécurité et de confort, 
                avec techniques douces et précises.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                Suivi post-traitement
              </h3>
              <p className="font-inter text-neutral-600 leading-relaxed">
                Conseils personnalisés et suivi pour optimiser les résultats 
                et s'assurer de votre entière satisfaction.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                Entretien
              </h3>
              <p className="font-inter text-neutral-600 leading-relaxed">
                Planification des séances d'entretien pour maintenir les résultats 
                dans le temps selon vos besoins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Pourquoi choisir Docteure Fassotte ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 rounded-2xl p-8">
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-4">
                Formation spécialisée
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Diplômée du C.I.M.E. Paris V</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Formation continue internationale</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Techniques les plus avancées</span>
                </li>
              </ul>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-8">
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-4">
                Approche personnalisée
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Écoute attentive de vos besoins</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Résultats naturels et harmonieux</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Suivi post-traitement attentif</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
            Prêt(e) pour une consultation ?
          </h2>
          <p className="font-inter text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Découvrez comment nos traitements peuvent révéler votre beauté naturelle. 
            Prenez rendez-vous pour une consultation personnalisée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/prendre-rendez-vous"
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

export default Treatments;