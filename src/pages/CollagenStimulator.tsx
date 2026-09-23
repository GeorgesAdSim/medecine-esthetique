import React from 'react';
import { Activity, Clock, Shield, Heart, CheckCircle, AlertCircle, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloralDecoration from '../components/FloralDecoration';
import TreatmentGallery from '../components/TreatmentGallery';

const CollagenStimulator: React.FC = () => {
  const treatmentZones = [
    {
      category: "Visage",
      zones: [
        "Joues et pommettes (restauration des volumes)",
        "Tempes creusées",
        "Redéfinition de l'ovale du visage",
        "Rides nasolabiales et plis d'amertume"
      ]
    },
    {
      category: "Corps",
      zones: [
        "Décolleté (amélioration texture)",
        "Dos des mains (rajeunissement)",
        "Brazilian Butt Lift non-chirurgical"
      ]
    }
  ];

  const products = [
    {
      name: "Sculptra (Acide Poly-L-Lactique)",
      features: [
        "100% résorbable et biocompatible",
        "Stimulation progressive sur 2 ans",
        "Résultats naturels et harmonieux"
      ]
    },
    {
      name: "Radiesse (Hydroxylapatite de Calcium)",
      features: [
        "Double action : effet immédiat + stimulation",
        "Durabilité de 12-18 mois",
        "Excellent pour la restructuration"
      ]
    }
  ];

  const advantages = [
    "Résultats naturels et progressifs (pas d'effet artificiel)",
    "Durabilité exceptionnelle : 18-24 mois",
    "Amélioration globale de la qualité de peau",
    "Biocompatibilité parfaite (aucun risque d'allergie)",
    "Stimulation de la régénération cellulaire",
    "Alternative au lifting chirurgical"
  ];

  const timeline = [
    {
      period: "Semaines 1-4",
      description: "Début de stimulation, léger œdème normal"
    },
    {
      period: "Mois 2-6",
      description: "Production active de collagène, amélioration progressive"
    },
    {
      period: "Mois 6-24",
      description: "Résultats optimaux, peau ferme et tonique"
    }
  ];

  const faqItems = [
    {
      question: "Les résultats sont-ils immédiats ?",
      answer: "Non, l'effet est progressif. Premiers résultats à 6-8 semaines, optimal à 6 mois."
    },
    {
      question: "Est-ce douloureux ?",
      answer: "Inconfort minimal grâce à l'anesthésie locale. Bien toléré par la plupart des patients."
    },
    {
      question: "Combien de temps ça dure ?",
      answer: "18-24 mois en moyenne, parfois plus selon les zones et les patients."
    },
    {
      question: "Compatible avec autres traitements ?",
      answer: "Parfaitement. Se combine idéalement avec Botox, acide hyaluronique, peelings."
    },
    {
      question: "Y a-t-il des risques ?",
      answer: "Très rares avec un praticien expérimenté. Effets secondaires mineurs et temporaires."
    }
  ];

  const galleryImages = [
    {
      url: "https://images.pexels.com/photos/3997395/pexels-photo-3997395.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Stimulateurs collagène rajeunissement visage Liège",
      caption: "Rajeunissement progressif du visage"
    },
    {
      url: "https://images.pexels.com/photos/4046812/pexels-photo-4046812.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Injection stimulateurs collagène volumes pommettes",
      caption: "Restauration naturelle des volumes"
    },
    {
      url: "https://images.pexels.com/photos/4046815/pexels-photo-4046815.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Stimulateurs collagène fermeté peau",
      caption: "Fermeté et élasticité retrouvées"
    },
    {
      url: "https://images.pexels.com/photos/4050308/pexels-photo-4050308.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Traitement collagène effet long terme",
      caption: "Résultats durables jusqu'à 2 ans"
    },
    {
      url: "https://images.pexels.com/photos/5069447/pexels-photo-5069447.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Stimulateurs collagène ovale visage redéfini",
      caption: "Ovale du visage restructuré"
    },
    {
      url: "https://images.pexels.com/photos/4046567/pexels-photo-4046567.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Résultat naturel stimulateurs collagène",
      caption: "Effet anti-âge global et harmonieux"
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-32 pb-16">
        <FloralDecoration position="top-right" size="large" opacity={0.08} variant="venus" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
                Stimulateurs de Collagène
              </h1>
              <p className="font-inter text-lg sm:text-xl text-primary-600 mb-4 sm:mb-6 font-medium">
                Rajeunissement Naturel et Progressif
              </p>
              <p className="font-inter text-base sm:text-lg text-neutral-700 mb-6 sm:mb-8 leading-relaxed">
                Ces traitements agissent en profondeur pour relancer la production naturelle 
                de collagène de votre peau. Une approche révolutionnaire qui inverse le 
                processus de vieillissement naturel.
              </p>
              <Link
                to="/contact"
                className="bg-gradient-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-inter font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 inline-block"
              >
                Consultation personnalisée
              </Link>
            </div>
            <div className="animate-scale-in mt-8 lg:mt-0">
              <div className="w-full h-80 sm:h-96 bg-neutral-200 rounded-2xl sm:rounded-3xl max-w-md mx-auto lg:max-w-full flex items-center justify-center">
                <span className="text-neutral-400 font-inter">Stimulation du collagène</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is it */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Qu'est-ce qu'un stimulateur de collagène ?
            </h2>
          </div>
          
          <div className="prose prose-lg max-w-none mb-12">
            <p className="font-inter text-lg text-neutral-700 leading-relaxed mb-6">
              Les stimulateurs de collagène représentent une approche révolutionnaire en médecine esthétique. 
              Contrairement aux techniques de comblement classiques, ces traitements agissent en profondeur 
              pour relancer la production naturelle de collagène de votre peau.
            </p>
            
            <p className="font-inter text-lg text-neutral-700 leading-relaxed">
              Le collagène diminue naturellement d'environ 1% par an après 25 ans, entraînant rides, 
              relâchement cutané et perte de volume. Les stimulateurs inversent ce processus de vieillissement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-lg text-neutral-800 mb-2">
                Injection
              </h3>
              <p className="font-inter text-neutral-600 text-sm">
                Micro-particules biocompatibles dans les couches profondes
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-lg text-neutral-800 mb-2">
                Stimulation
              </h3>
              <p className="font-inter text-neutral-600 text-sm">
                Activation des fibroblastes productrices de collagène
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-lg text-neutral-800 mb-2">
                Reconstruction
              </h3>
              <p className="font-inter text-neutral-600 text-sm">
                Reconstruction progressive de la matrice dermique
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-lg text-neutral-800 mb-2">
                Amélioration
              </h3>
              <p className="font-inter text-neutral-600 text-sm">
                Fermeté et élasticité durables
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Used */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Produits utilisés par Docteure Fassotte
            </h2>
            <p className="font-inter text-lg text-neutral-600">
              Seuls les produits certifiés CE et de qualité pharmaceutique sont utilisés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
                  {product.name}
                </h3>
                
                <ul className="space-y-3">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="font-inter text-neutral-700 flex items-center">
                      <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Zones */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Zones de traitement
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {treatmentZones.map((category, index) => (
              <div 
                key={index}
                className="bg-neutral-50 rounded-2xl p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <h3 className="font-playfair font-semibold text-2xl text-neutral-800 mb-6">
                  {category.category}
                </h3>
                
                <ul className="space-y-3">
                  {category.zones.map((zone, zoneIndex) => (
                    <li key={zoneIndex} className="font-inter text-neutral-700 flex items-start">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      {zone}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Avantages uniques
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advantages.map((advantage, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg animate-slide-up"
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

      {/* Protocol */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Protocole de traitement
            </h2>
          </div>

          <div className="bg-neutral-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-4">
                  Déroulement
                </h3>
                <ul className="space-y-3 font-inter text-neutral-700">
                  <li className="flex items-center">
                    <Users className="w-5 h-5 text-primary-500 mr-3" />
                    <span><strong>Séances :</strong> 2-3 injections espacées de 4-6 semaines</span>
                  </li>
                  <li className="flex items-center">
                    <Clock className="w-5 h-5 text-primary-500 mr-3" />
                    <span><strong>Durée :</strong> 30-45 minutes par séance</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="w-5 h-5 text-primary-500 mr-3" />
                    <span><strong>Anesthésie :</strong> Locale pour votre confort</span>
                  </li>
                  <li className="flex items-center">
                    <Activity className="w-5 h-5 text-primary-500 mr-3" />
                    <span><strong>Récupération :</strong> Reprise d'activité immédiate</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-4">
                  Évolution des résultats
                </h3>
                <div className="space-y-4">
                  {timeline.map((phase, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-inter font-semibold text-neutral-800">{phase.period}</h4>
                        <p className="font-inter text-neutral-600 text-sm">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

      {/* Expertise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              L'expertise Docteure Fassotte
            </h2>
          </div>

          <div className="bg-gradient-hero rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="font-inter text-neutral-700">Formation spécialisée en techniques d'injection avancées</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="font-inter text-neutral-700">Produits certifiés CE exclusivement</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="font-inter text-neutral-700">Approche personnalisée selon votre morphologie</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="font-inter text-neutral-700">Expérience éprouvée en stimulation collagénique</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TreatmentGallery
        title="Résultats de nos traitements par stimulateurs de collagène"
        images={galleryImages}
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
            Consultation personnalisée
          </h2>
          <p className="font-inter text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Découvrez si les stimulateurs de collagène conviennent à vos objectifs esthétiques 
            lors d'une consultation avec Docteure Fassotte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-gradient-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-inter font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Prendre rendez-vous
            </Link>
            <a
              href="tel:+32495280976"
              className="border-2 border-primary-400 text-primary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-inter font-semibold hover:bg-primary-50 transition-all duration-300"
            >
              +32 495 28 09 76
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollagenStimulator;