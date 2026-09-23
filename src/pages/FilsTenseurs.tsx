import React from 'react';
import { Zap, Clock, Shield, Activity, CheckCircle, AlertCircle, Users, Target, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloralDecoration from '../components/FloralDecoration';
import TreatmentGallery from '../components/TreatmentGallery';

const FilsTenseurs: React.FC = () => {
  const treatmentZones = [
    {
      category: "Tiers supérieur du visage",
      zones: [
        "Lifting des sourcils et ouverture du regard",
        "Correction des tempes creusées",
        "Redéfinition de l'arcade sourcilière"
      ]
    },
    {
      category: "Tiers moyen du visage",
      zones: [
        "Remontée des pommettes (lifting malaire)",
        "Correction des sillons naso-géniens",
        "Restauration du volume jugal",
        "Amélioration de l'ovale"
      ]
    },
    {
      category: "Tiers inférieur du visage",
      zones: [
        "Redéfinition de la mâchoire (jawline)",
        "Lifting cervical (cou)",
        "Correction des bajoues",
        "Amélioration du double menton"
      ]
    },
    {
      category: "Zones spécifiques",
      zones: [
        "Lifting corporel (bras, seins, abdomen)",
        "Fesses (Brazilian Butt Lift non chirurgical)",
        "Cuisses internes"
      ]
    }
  ];

  const filsTypes = [
    {
      name: "Fils mono-cônes",
      description: "1 cône bidirectionnel par fil pour traction simple",
      indications: [
        "Zones délicates : contour des yeux, tempes",
        "Lifting léger et précision maximale"
      ]
    },
    {
      name: "Fils multi-cônes",
      description: "Plusieurs cônes bidirectionnels par fil",
      indications: [
        "Zones étendues : joues, cou, mâchoire",
        "Effet lifting marqué et ancrage renforcé"
      ]
    },
    {
      name: "Fils spécialisés",
      description: "Cônes 4D multidirectionnels",
      indications: [
        "Lifting global du visage",
        "Résultats optimaux pour relâchement modéré à important"
      ]
    }
  ];

  const advantages = [
    "Efficacité maximale - Ancrage optimal des cônes",
    "Résultats immédiats - Effet lifting visible dès la sortie",
    "Durabilité supérieure - 12-18 mois vs 6-12 mois fils lisses",
    "Stimulation renforcée - Néocollagénèse optimisée",
    "Sécurité prouvée - Matériau PDO résorbable",
    "Technique précise - Vecteurs bidirectionnels calculés",
    "Récupération rapide - Reprise d'activité sous 48-72h"
  ];

  const processSteps = [
    {
      step: "1",
      title: "Préparation (15 min)",
      description: "Désinfection et marquage des trajets, anesthésie locale des zones d'insertion, préparation du matériel stérilisé"
    },
    {
      step: "2",
      title: "Insertion des fils (30-60 min)",
      description: "Introduction avec canules fines, positionnement selon vecteurs calculés, ancrage des cônes aux points stratégiques"
    },
    {
      step: "3",
      title: "Finalisation (15 min)",
      description: "Coupe des fils au niveau cutané, massage délicat pour optimisation, vérification du résultat symétrique"
    }
  ];

  const timeline = [
    {
      period: "Immédiat (J0-J7)",
      description: "Lifting visible dès la sortie, œdème modéré normal, repositionnement des volumes"
    },
    {
      period: "Court terme (1-6 semaines)",
      description: "Résorption de l'œdème, intégration des fils, résultat de plus en plus naturel"
    },
    {
      period: "Long terme (2-6 mois)",
      description: "Production de collagène maximale, densification tissulaire, résultats optimaux"
    },
    {
      period: "Durabilité (6-18 mois)",
      description: "Maintien de l'effet lifting, qualité cutanée améliorée, bénéfices résiduels"
    }
  ];

  const contraindications = [
    {
      type: "Absolues",
      items: [
        "Grossesse et allaitement",
        "Maladies auto-immunes actives",
        "Troubles de la coagulation sévères",
        "Infections cutanées locales",
        "Allergie aux composants PDO"
      ]
    },
    {
      type: "Relatives",
      items: [
        "Peau très fine ou fragile",
        "Antécédents de cicatrisation anormale",
        "Attentes irréalistes sur les résultats",
        "Traitements anticoagulants (évaluation)"
      ]
    }
  ];

  const faqItems = [
    {
      question: "Le traitement est-il douloureux ?",
      answer: "Inconfort modéré pendant l'insertion, bien contrôlé par l'anesthésie locale. Sensibilité résiduelle 1-2 semaines, facilement gérée."
    },
    {
      question: "Quand voit-on les résultats définitifs ?",
      answer: "Effet lifting immédiat, résultat optimal à 2-3 mois quand la stimulation collagénique est maximale."
    },
    {
      question: "Les fils sont-ils visibles ou palpables ?",
      answer: "Non, les fils à cônes bidirectionnels sont placés en profondeur. Palpation possible les premiers jours, puis intégration complète."
    },
    {
      question: "Peut-on reprendre ses activités normalement ?",
      answer: "Activités légères dès J+1, sport et efforts intenses après 1 semaine. Vie sociale normale sous 3-5 jours."
    },
    {
      question: "Y a-t-il des risques de complications ?",
      answer: "Risques minimes avec praticien expérimenté : infection exceptionnelle, asymétrie temporaire, granulome très rare."
    },
    {
      question: "Compatible avec d'autres traitements ?",
      answer: "Excellente synergie avec Botox (après 15 jours), acide hyaluronique (complémentaire), soins dermocosmétiques."
    },
    {
      question: "Que se passe-t-il après résorption des fils ?",
      answer: "Maintien partiel des bénéfices grâce au collagène néo-formé. Nouvelle séance possible selon les besoins."
    }
  ];

  const galleryImages = [
    {
      url: "https://images.pexels.com/photos/4046568/pexels-photo-4046568.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Fils tenseurs ovale visage lifting Liège",
      caption: "Redéfinition de l'ovale sans chirurgie"
    },
    {
      url: "https://images.pexels.com/photos/3997388/pexels-photo-3997388.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Lifting joues fils tenseurs résorbables",
      caption: "Joues retendues effet naturel"
    },
    {
      url: "https://images.pexels.com/photos/4046819/pexels-photo-4046819.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Fils tenseurs cou double menton",
      caption: "Cou rafermi, double menton atténué"
    },
    {
      url: "https://images.pexels.com/photos/4050309/pexels-photo-4050309.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Lifting sourcils fils tenseurs regard",
      caption: "Lifting des sourcils, regard ouvert"
    },
    {
      url: "https://images.pexels.com/photos/4046816/pexels-photo-4046816.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Fils tenseurs relâchement cutané visage",
      caption: "Raffermissement global du visage"
    },
    {
      url: "https://images.pexels.com/photos/5069441/pexels-photo-5069441.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Résultat fils tenseurs effet lift naturel",
      caption: "Effet lifting progressif et durable"
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
                Fils Tenseurs à Cônes Bidirectionnels
              </h1>
              <p className="font-inter text-lg sm:text-xl text-primary-600 mb-4 sm:mb-6 font-medium">
                Lifting Non Chirurgical Innovant
              </p>
              <p className="font-inter text-base sm:text-lg text-neutral-700 mb-6 sm:mb-8 leading-relaxed">
                Les fils tenseurs à cônes bidirectionnels représentent l'évolution la plus avancée 
                du lifting non chirurgical. Ces fils résorbables en PDO sont équipés de cônes 
                multidirectionnels qui permettent un ancrage optimal et une traction vectorisée 
                précise dans les deux sens.
              </p>
              <Link
                to="/contact"
                className="bg-gradient-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-inter font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 inline-block"
              >
                Consultation personnalisée
              </Link>
            </div>
            <div className="animate-scale-in mt-8 lg:mt-0">
              <img
                src="/image copy copy copy copy copy copy copy copy copy copy copy.png"
                alt="Fils tenseurs à cônes - Lifting non chirurgical avec vecteurs de traction"
                className="w-full h-auto rounded-2xl sm:rounded-3xl shadow-2xl object-cover max-w-md mx-auto lg:max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Technologie des cônes bidirectionnels
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-lg text-neutral-800 mb-2">
                Ancrage multidirectionnel
              </h3>
              <p className="font-inter text-neutral-600 text-sm">
                Cônes bidirectionnels intégrés pour un ancrage optimal dans les tissus
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-lg text-neutral-800 mb-2">
                Traction optimisée
              </h3>
              <p className="font-inter text-neutral-600 text-sm">
                Traction selon deux vecteurs opposés pour un effet lifting maximal
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-lg text-neutral-800 mb-2">
                Stimulation renforcée
              </h3>
              <p className="font-inter text-neutral-600 text-sm">
                Stimulation collagénique renforcée autour des cônes
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
              Zones de traitement
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {treatmentZones.map((category, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
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

      {/* Types of Threads */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Types de fils utilisés
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filsTypes.map((type, index) => (
              <div 
                key={index}
                className="bg-neutral-50 rounded-2xl p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-playfair font-semibold text-xl text-neutral-800">
                    {type.name}
                  </h3>
                </div>
                
                <p className="font-inter text-neutral-600 mb-4">
                  {type.description}
                </p>
                
                <ul className="space-y-2">
                  {type.indications.map((indication, indicationIndex) => (
                    <li key={indicationIndex} className="font-inter text-sm text-neutral-700 flex items-center">
                      <CheckCircle className="w-4 h-4 text-primary-500 mr-3 flex-shrink-0" />
                      {indication}
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
              Avantages des fils à cônes bidirectionnels
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

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Déroulement de la séance
            </h2>
            <p className="font-inter text-lg text-neutral-600">
              Durée : 45-90 minutes selon l'étendue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className="bg-neutral-50 rounded-2xl p-8 text-center animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                  {step.title}
                </h3>
                <p className="font-inter text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Timeline */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Évolution des résultats
            </h2>
          </div>

          <div className="space-y-6">
            {timeline.map((phase, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                      {phase.period}
                    </h3>
                    <p className="font-inter text-neutral-600 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contraindications */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Contre-indications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contraindications.map((category, index) => (
              <div 
                key={index}
                className="bg-neutral-50 rounded-2xl p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <h3 className={`font-playfair font-semibold text-xl mb-6 ${
                  category.type === 'Absolues' ? 'text-red-700' : 'text-orange-700'
                }`}>
                  {category.type}
                </h3>
                
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="font-inter text-neutral-700 flex items-center">
                      <AlertCircle className={`w-5 h-5 mr-3 flex-shrink-0 ${
                        category.type === 'Absolues' ? 'text-red-500' : 'text-orange-500'
                      }`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
                  <span className="font-inter text-neutral-700">Techniques d'insertion avancées maîtrisées</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="font-inter text-neutral-700">Anatomie faciale : Connaissance précise des plans</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="font-inter text-neutral-700">Calcul vectoriel : Optimisation des trajectoires</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="font-inter text-neutral-700">Fils à cônes bidirectionnels certifiés CE exclusivement</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="font-inter text-neutral-700">Environnement stérilisé selon normes chirurgicales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TreatmentGallery
        title="Résultats de nos traitements par fils tenseurs"
        images={galleryImages}
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
            Consultation avec Docteure Fassotte
          </h2>
          <p className="font-inter text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Pour découvrir si les fils tenseurs à cônes bidirectionnels peuvent répondre 
            à vos objectifs de rajeunissement. Évaluation personnalisée et simulation 
            des résultats possibles.
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
          <p className="font-inter text-sm text-neutral-600 mt-6 italic">
            Docteure Fassotte, experte en fils tenseurs nouvelle génération, vous propose 
            une approche innovante du lifting non chirurgical avec des résultats optimaux et durables.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FilsTenseurs;