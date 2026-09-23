import React from 'react';
import { Activity, Clock, Shield, Zap, CheckCircle, AlertCircle, Droplets, Users, Target, Beaker } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloralDecoration from '../components/FloralDecoration';
import TreatmentGallery from '../components/TreatmentGallery';

const Mesolift: React.FC = () => {
  const cocktailTypes = [
    {
      name: "Cocktail hydratant",
      components: [
        "Acide hyaluronique non réticulé (hydratation)",
        "Vitamines du complexe B (métabolisme cellulaire)",
        "Vitamine C (antioxydant, stimulation collagène)",
        "Minéraux et oligo-éléments"
      ]
    },
    {
      name: "Cocktail anti-âge",
      components: [
        "Peptides biomimétiques (stimulation cellulaire)",
        "Acides aminés essentiels",
        "Coenzymes (énergie cellulaire)",
        "Antioxydants (protection radicaux libres)"
      ]
    },
    {
      name: "Cocktail éclaircissant",
      components: [
        "Vitamine C concentrée",
        "Acide kojique (dépigmentant doux)",
        "Arbutine (uniformisation du teint)",
        "Glutathion (détoxification cellulaire)"
      ]
    }
  ];

  const treatmentZones = [
    {
      category: "Visage",
      zones: [
        "Visage complet : Revitalisation globale",
        "Contour des yeux : Hydratation du regard",
        "Joues et pommettes : Restauration de l'éclat",
        "Front : Amélioration de la texture",
        "Cou et décolleté : Extension du soin anti-âge"
      ]
    },
    {
      category: "Indications spécifiques",
      zones: [
        "Peau déshydratée et terne",
        "Premiers signes de l'âge (25-45 ans)",
        "Peau fatiguée et stressée",
        "Teint irrégulier",
        "Texture rugueuse",
        "Pores dilatés"
      ]
    }
  ];

  const advantages = [
    "Hydratation intense et durable de la peau",
    "Amélioration immédiate de l'éclat du teint",
    "Stimulation naturelle des processus de régénération",
    "Traitement préventif du vieillissement cutané",
    "Adapté à tous types de peau et tous phototypes",
    "Aucune éviction sociale - reprise d'activité immédiate",
    "Résultats progressifs et naturels"
  ];

  const processSteps = [
    {
      step: "1",
      title: "Préparation (10 min)",
      description: "Démaquillage, nettoyage et désinfection. Application de crème anesthésiante si nécessaire."
    },
    {
      step: "2",
      title: "Traitement (20-30 min)",
      description: "Préparation du cocktail personnalisé et injections multiples selon technique de nappage."
    },
    {
      step: "3",
      title: "Finalisation (5 min)",
      description: "Application de sérum apaisant, protection solaire et conseils post-traitement."
    }
  ];

  const results = [
    {
      period: "Effets immédiats (J0-J7)",
      benefits: [
        "Éclat retrouvé dès la première séance",
        "Hydratation visible et palpable",
        "Peau plus douce au toucher",
        "Teint plus uniforme"
      ]
    },
    {
      period: "Effets progressifs (2-8 semaines)",
      benefits: [
        "Amélioration de la texture cutanée",
        "Réduction des pores dilatés",
        "Stimulation de la production de collagène",
        "Fermeté accrue de la peau"
      ]
    },
    {
      period: "Effets cumulatifs (après cure complète)",
      benefits: [
        "Rajeunissement global du visage",
        "Prévention du vieillissement cutané",
        "Qualité de peau durablement améliorée",
        "Hydratation optimisée"
      ]
    }
  ];

  const ageGroups = [
    {
      age: "25-35 ans : Prévention",
      protocol: [
        "Hydratation optimale",
        "Prévention des premiers signes",
        "Éclat et vitalité",
        "2-3 séances par an"
      ]
    },
    {
      age: "35-50 ans : Correction",
      protocol: [
        "Amélioration des signes existants",
        "Stimulation collagénique renforcée",
        "Texture et fermeté",
        "3-4 séances puis entretien"
      ]
    },
    {
      age: "50+ ans : Réparation",
      protocol: [
        "Revitalisation profonde",
        "Complément aux autres traitements",
        "Qualité globale de la peau",
        "Cures régulières recommandées"
      ]
    }
  ];

  const contraindications = [
    {
      type: "Absolues",
      items: [
        "Grossesse et allaitement",
        "Maladies auto-immunes évolutives",
        "Infections cutanées actives",
        "Allergies aux composants du cocktail"
      ]
    },
    {
      type: "Relatives",
      items: [
        "Prise d'anticoagulants (évaluation)",
        "Traitements immunosuppresseurs",
        "Herpès récurrent (traitement préventif)",
        "Exposition solaire récente"
      ]
    }
  ];

  const faqItems = [
    {
      question: "Le Mésolift est-il douloureux ?",
      answer: "Inconfort minimal grâce aux aiguilles très fines et à l'anesthésie locale. Sensation de légers picotements bien tolérée."
    },
    {
      question: "Quand voit-on les premiers résultats ?",
      answer: "Dès la première séance pour l'éclat et l'hydratation. Effets cumulatifs après 2-3 séances."
    },
    {
      question: "Combien de séances sont nécessaires ?",
      answer: "3-4 séances pour une cure complète, puis entretien tous les 2-3 mois selon les besoins."
    },
    {
      question: "Peut-on faire du Mésolift toute l'année ?",
      answer: "Oui, c'est même recommandé. Particulièrement bénéfique aux changements de saison."
    },
    {
      question: "Y a-t-il des risques ?",
      answer: "Risques très faibles : micro-hématomes temporaires, rougeurs passagères. Technique très sûre."
    },
    {
      question: "Compatible avec d'autres soins ?",
      answer: "Parfaitement compatible avec la plupart des traitements esthétiques (espacement requis)."
    },
    {
      question: "À partir de quel âge commencer ?",
      answer: "Dès 25 ans en prévention, ou dès l'apparition des premiers signes de déshydratation cutanée."
    }
  ];

  const galleryImages = [
    {
      url: "https://images.pexels.com/photos/3997393/pexels-photo-3997393.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Mésolift hydratation profonde peau Liège",
      caption: "Hydratation intense et éclat retrouvé"
    },
    {
      url: "https://images.pexels.com/photos/4046811/pexels-photo-4046811.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Injection mésolift revitalisation visage",
      caption: "Revitalisation globale du visage"
    },
    {
      url: "https://images.pexels.com/photos/4046818/pexels-photo-4046818.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Mésolift teint terne luminosité",
      caption: "Teint lumineux et coup d'éclat"
    },
    {
      url: "https://images.pexels.com/photos/3997984/pexels-photo-3997984.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Traitement mésolift rides déshydratation",
      caption: "Ridules de déshydratation effacées"
    },
    {
      url: "https://images.pexels.com/photos/4050305/pexels-photo-4050305.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Mésolift cou décolleté rajeunissement",
      caption: "Cou et décolleté rajeuni"
    },
    {
      url: "https://images.pexels.com/photos/4046817/pexels-photo-4046817.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Résultat mésolift peau mature",
      caption: "Peau mature revitalisée naturellement"
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
                Mésolift
              </h1>
              <p className="font-inter text-lg sm:text-xl text-primary-600 mb-4 sm:mb-6 font-medium">
                Revitalisez Votre Peau en Profondeur
              </p>
              <p className="font-inter text-base sm:text-lg text-neutral-700 mb-6 sm:mb-8 leading-relaxed">
                Le Mésolift est une technique de mésothérapie esthétique qui consiste à injecter 
                des micro-doses de substances revitalisantes directement dans le derme superficiel. 
                Cette méthode permet d'apporter à votre peau les nutriments essentiels dont elle 
                a besoin pour retrouver éclat, fermeté et hydratation.
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
                src="/image copy copy copy copy copy copy copy copy copy copy.png"
                alt="Mésolift - Traitement revitalisant pour peau déshydratée et fatiguée"
                className="w-full h-auto rounded-2xl sm:rounded-3xl shadow-2xl object-cover max-w-md mx-auto lg:max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Comment ça fonctionne ?
            </h2>
            <p className="font-inter text-lg text-neutral-600">
              Contrairement aux injections de comblement, le Mésolift agit comme un véritable 
              cocktail de vitamines administré directement là où la peau en a le plus besoin.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-lg text-neutral-800 mb-2">
                Injection superficielle
              </h3>
              <p className="font-inter text-neutral-600 text-sm">
                Dans le derme à 1-4mm de profondeur avec aiguilles très fines
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-lg text-neutral-800 mb-2">
                Apport nutritionnel
              </h3>
              <p className="font-inter text-neutral-600 text-sm">
                Apport direct de nutriments aux cellules cutanées
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-lg text-neutral-800 mb-2">
                Stimulation cellulaire
              </h3>
              <p className="font-inter text-neutral-600 text-sm">
                Activation des fibroblastes pour la production de collagène
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cocktail Compositions */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Composition des cocktails Mésolift
            </h2>
            <p className="font-inter text-lg text-neutral-600">
              Cocktails personnalisés selon vos besoins spécifiques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cocktailTypes.map((cocktail, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
                    <Beaker className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-playfair font-semibold text-xl text-neutral-800">
                    {cocktail.name}
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  {cocktail.components.map((component, componentIndex) => (
                    <li key={componentIndex} className="font-inter text-neutral-700 flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                      {component}
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
              Avantages du Mésolift
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
              Déroulement d'une séance
            </h2>
            <p className="font-inter text-lg text-neutral-600">
              Durée totale : 30-45 minutes
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

          <div className="bg-primary-50 rounded-2xl p-8">
            <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-4 text-center">
              Protocole de traitement
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-inter font-semibold text-neutral-800 mb-3">Première cure</h4>
                <ul className="space-y-2 font-inter text-neutral-700">
                  <li>• <strong>Séances :</strong> 3-4 séances</li>
                  <li>• <strong>Espacement :</strong> Toutes les 2-3 semaines</li>
                  <li>• <strong>Durée :</strong> 30-45 minutes</li>
                  <li>• <strong>Anesthésie :</strong> Crème anesthésiante</li>
                </ul>
              </div>
              <div>
                <h4 className="font-inter font-semibold text-neutral-800 mb-3">Entretien</h4>
                <ul className="space-y-2 font-inter text-neutral-700">
                  <li>• <strong>Fréquence :</strong> 1 séance tous les 2-3 mois</li>
                  <li>• <strong>Saisonnalité :</strong> Idéal aux changements de saison</li>
                  <li>• <strong>Personnalisation :</strong> Selon l'évolution</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Timeline */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Résultats attendus
            </h2>
          </div>

          <div className="space-y-8">
            {results.map((result, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-4">
                  {result.period}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                      <span className="font-inter text-neutral-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Mésolift selon l'âge
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ageGroups.map((group, index) => (
              <div 
                key={index}
                className="bg-neutral-50 rounded-2xl p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
                  {group.age}
                </h3>
                
                <ul className="space-y-3">
                  {group.protocol.map((item, itemIndex) => (
                    <li key={itemIndex} className="font-inter text-neutral-700 flex items-center">
                      <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contraindications */}
      <section className="py-20 bg-neutral-50">
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
                className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up"
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
      <section className="py-20 bg-white">
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
                className="bg-neutral-50 rounded-2xl shadow-lg p-8 animate-slide-up"
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
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              L'expertise Docteure Fassotte
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="font-inter text-neutral-700">Formation spécialisée en mésothérapie esthétique</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="font-inter text-neutral-700">Sélection rigoureuse des produits utilisés</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="font-inter text-neutral-700">Techniques d'injection maîtrisées et indolores</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="font-inter text-neutral-700">Protocoles personnalisés selon vos besoins</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="font-inter text-neutral-700">Suivi attentif de l'évolution des résultats</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TreatmentGallery
        title="Résultats de nos traitements par Mésolift"
        images={galleryImages}
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
            Consultation avec Docteure Fassotte
          </h2>
          <p className="font-inter text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Pour découvrir comment le Mésolift peut revitaliser votre peau et lui redonner tout son éclat. 
            Analyse personnalisée et composition d'un cocktail sur mesure pour des résultats optimaux.
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
            Docteure Fassotte, experte en mésothérapie esthétique, vous propose un Mésolift 
            adapté à vos besoins pour une peau éclatante de santé et de jeunesse.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Mesolift;