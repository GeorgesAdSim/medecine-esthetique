import React from 'react';
import { Droplets, Clock, Shield, Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloralDecoration from '../components/FloralDecoration';
import Breadcrumbs from '../components/Breadcrumbs';
import RelatedTreatments from '../components/RelatedTreatments';
import TreatmentGallery from '../components/TreatmentGallery';

const HyaluronicAcid: React.FC = () => {
  const treatmentZones = [
    {
      zone: "Lèvres",
      description: "Volume naturel et hydratation",
      duration: "6-12 mois",
      details: ["Augmentation subtile du volume", "Redéfinition du contour", "Hydratation intense"]
    },
    {
      zone: "Rides et sillons",
      description: "Comblement des rides marquées",
      duration: "12-18 mois",
      details: ["Rides nasogéniennes", "Sillons d'amertume", "Plis d'amaigrissement"]
    },
    {
      zone: "Volumes faciaux",
      description: "Restauration des volumes perdus",
      duration: "12-18 mois",
      details: ["Pommettes", "Tempes", "Menton", "Mâchoires"]
    },
    {
      zone: "Cernes",
      description: "Correction des cernes creusés",
      duration: "12-15 mois",
      details: ["Technique délicate", "Résultats naturels", "Regard rajeuni"]
    }
  ];

  const faqItems = [
    {
      question: "Le traitement est-il douloureux ?",
      answer: "L'inconfort est minimal grâce à l'utilisation d'une crème anesthésiante et à la technique douce. La plupart des patients décrivent une sensation de légère pression."
    },
    {
      question: "Quels sont les effets secondaires possibles ?",
      answer: "Léger œdème et rougeur transitoires (24-48h). Possibles petits hématomes qui s'estompent en quelques jours. Tous les effets sont temporaires."
    },
    {
      question: "Quand voit-on les résultats ?",
      answer: "Les résultats sont visibles immédiatement et s'améliore dans les 2 semaines suivant l'injection, le temps que l'acide hyaluronique s'intègre naturellement."
    },
    {
      question: "Peut-on reprendre ses activités normalement ?",
      answer: "Oui, la reprise des activités est possible immédiatement. Il est recommandé d'éviter le sport intensif et les massages pendant 24h."
    }
  ];

  const relatedTreatments = [
    {
      title: "Botox",
      description: "Détendez les muscles faciaux pour atténuer les rides d'expression avec subtilité",
      href: "/botox-liege",
      category: "Injections"
    },
    {
      title: "Mésolift",
      description: "Revitalisez votre peau en profondeur avec des cocktails d'actifs personnalisés",
      href: "/mesolift-liege",
      category: "Mésothérapie"
    },
    {
      title: "Fils tenseurs",
      description: "Lifting naturel sans chirurgie pour retendre et repositionner les tissus",
      href: "/fils-tenseurs-liege",
      category: "Lifting"
    }
  ];

  const galleryImages = [
    {
      url: "https://images.pexels.com/photos/3738386/pexels-photo-3738386.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Injection acide hyaluronique lèvres Liège",
      caption: "Volume naturel des lèvres - Résultat subtil"
    },
    {
      url: "https://images.pexels.com/photos/4021883/pexels-photo-4021883.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Comblement rides nasogéniennes acide hyaluronique",
      caption: "Comblement des sillons nasogéniens"
    },
    {
      url: "https://images.pexels.com/photos/3811088/pexels-photo-3811088.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Restauration volumes pommettes acide hyaluronique",
      caption: "Redonner du volume aux pommettes"
    },
    {
      url: "https://images.pexels.com/photos/4024831/pexels-photo-4024831.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Traitement cernes acide hyaluronique Liège",
      caption: "Correction des cernes creux"
    },
    {
      url: "https://images.pexels.com/photos/3812743/pexels-photo-3812743.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Hydratation peau acide hyaluronique",
      caption: "Hydratation profonde de la peau"
    },
    {
      url: "https://images.pexels.com/photos/4473796/pexels-photo-4473796.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Redéfinition ovale visage acide hyaluronique",
      caption: "Redessiner l'ovale du visage"
    }
  ];

  return (
    <div className="animate-fade-in">
      <Breadcrumbs customItems={[
        { label: 'Traitements', path: '/traitements' },
        { label: 'Acide Hyaluronique', path: '/acide-hyaluronique-liege' }
      ]} />

      {/* Hero Section */}
      <section className="bg-gradient-hero pt-32 pb-16">
        <FloralDecoration position="top-right" size="large" opacity={0.09} variant="venus" />
        <FloralDecoration position="top-left" size="small" opacity={0.05} variant="wave" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 mb-4 sm:mb-6">
                Injection Acide Hyaluronique Liège
              </h1>
              <p className="font-inter text-lg sm:text-xl text-primary-600 mb-4 sm:mb-6 font-medium">
                Traitement anti-âge naturel à Liège
              </p>
              <p className="font-inter text-base sm:text-lg text-neutral-700 mb-6 sm:mb-8 leading-relaxed">
                La Dre Fassotte propose des injections d'acide hyaluronique à Liège pour restaurer
                les volumes, combler les rides et redonner éclat et hydratation au visage de façon
                naturelle. Spécialiste qualifiée en médecine esthétique non chirurgicale.
              </p>
              <Link
                to="/contact"
                className="bg-gradient-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-inter font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 inline-block text-sm sm:text-base"
              >
                Prendre rendez-vous
              </Link>
            </div>
            <div className="animate-scale-in mt-8 lg:mt-0">
              <img
                src="/image copy copy copy copy copy.png"
                alt="Zones d'injection acide hyaluronique sur le visage"
                className="w-full h-auto rounded-2xl sm:rounded-3xl shadow-2xl object-cover max-w-md mx-auto lg:max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is Hyaluronic Acid */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Qu'est-ce que l'acide hyaluronique ?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                Substance naturelle
              </h3>
              <p className="font-inter text-neutral-600">
                Présent naturellement dans notre peau, l'acide hyaluronique maintient 
                l'hydratation et le volume des tissus.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                100% biocompatible
              </h3>
              <p className="font-inter text-neutral-600">
                Parfaitement toléré par l'organisme, il ne présente aucun risque 
                allergique et se résorbe naturellement.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                Résultats naturels
              </h3>
              <p className="font-inter text-neutral-600">
                Permet d'obtenir des résultats harmonieux qui respectent 
                la morphologie naturelle de votre visage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Zones */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Zones traitables
            </h2>
            <p className="font-inter text-lg text-neutral-600 max-w-2xl mx-auto">
              L'acide hyaluronique peut être utilisé sur différentes zones du visage 
              pour des résultats personnalisés et naturels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {treatmentZones.map((zone, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-playfair font-semibold text-xl text-neutral-800">
                    {zone.zone}
                  </h3>
                  <div className="flex items-center text-primary-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="font-inter text-sm font-medium">{zone.duration}</span>
                  </div>
                </div>
                
                <p className="font-inter text-neutral-600 mb-4">
                  {zone.description}
                </p>
                
                <ul className="space-y-2">
                  {zone.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="font-inter text-sm text-neutral-700 flex items-center">
                      <CheckCircle className="w-4 h-4 text-primary-500 mr-3 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soft Filling Technique */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
                La technique "Soft Filling"
              </h2>
              <p className="font-inter text-lg text-neutral-600 mb-6 leading-relaxed">
                Ma technique privilégiée consiste en des injections douces et progressives 
                qui respectent l'anatomie naturelle du visage pour des résultats harmonieux 
                et une intégration parfaite.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-inter font-semibold text-neutral-800 block mb-1">
                      Injections micro-dosées
                    </strong>
                    <p className="font-inter text-neutral-600">
                      Technique de petites quantités pour un résultat naturel et progressive.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-inter font-semibold text-neutral-800 block mb-1">
                      Respect de l'anatomie
                    </strong>
                    <p className="font-inter text-neutral-600">
                      Placement précis selon la structure unique de votre visage.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-inter font-semibold text-neutral-800 block mb-1">
                      Confort optimal
                    </strong>
                    <p className="font-inter text-neutral-600">
                      Utilisation de produits avec lidocaïne et techniques douces.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-scale-in mt-8 lg:mt-0">
              <img
                src="/image copy copy copy copy copy copy copy.png"
                alt="Zones d'injection acide hyaluronique - Technique Soft Filling"
                className="w-full h-auto rounded-2xl sm:rounded-3xl shadow-2xl object-cover max-w-md mx-auto lg:max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Questions fréquentes
            </h2>
            <p className="font-inter text-lg text-neutral-600">
              Tout ce que vous devez savoir sur les injections d'acide hyaluronique
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-start space-x-4">
                  <AlertCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                      {item.question}
                    </h3>
                    <p className="font-inter text-neutral-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TreatmentGallery
        title="Résultats de nos traitements à l'acide hyaluronique"
        images={galleryImages}
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
            Prêt(e) pour une consultation ?
          </h2>
          <p className="font-inter text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Découvrez comment l'acide hyaluronique peut révéler votre beauté naturelle. 
            Prenez rendez-vous pour une consultation personnalisée.
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

      <RelatedTreatments
        currentTreatment="Acide Hyaluronique"
        treatments={relatedTreatments}
        maxItems={3}
      />
    </div>
  );
};

export default HyaluronicAcid;