import React from 'react';
import { Sparkles, Clock, Shield, Zap, CheckCircle, AlertCircle, Activity, Users, Target, Beaker } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloralDecoration from '../components/FloralDecoration';
import TreatmentGallery from '../components/TreatmentGallery';

const Peeling: React.FC = () => {
  const peelingTypes = [
    {
      category: "Peelings superficiels",
      duration: "15-30 minutes",
      downtime: "Aucune éviction sociale",
      frequency: "Toutes les 2-4 semaines",
      types: [
        {
          name: "Acide glycolique (20-70%)",
          origin: "Canne à sucre",
          action: "Exfoliation douce, stimulation cellulaire",
          ideal: "Teint terne, pores dilatés, rides superficielles"
        },
        {
          name: "Acide lactique (30-88%)",
          origin: "Fermentation lactique", 
          action: "Exfoliation + hydratation",
          ideal: "Peaux sensibles, phototypes foncés"
        },
        {
          name: "Acide mandélique (25-50%)",
          origin: "Amandes amères",
          action: "Exfoliation très douce, antibactérienne",
          ideal: "Peaux très sensibles, acné légère"
        },
        {
          name: "Acide salicylique (20-30%)",
          origin: "Écorce de saule",
          action: "Pénétration dans les pores, anti-inflammatoire",
          ideal: "Acné, peau grasse, points noirs"
        }
      ]
    },
    {
      category: "Peelings moyens",
      duration: "30-45 minutes",
      downtime: "7-14 jours",
      frequency: "1-2 fois par an",
      types: [
        {
          name: "TCA (Acide Trichloracétique) 15-35%",
          action: "Coagulation protéique, stimulation collagénique intense",
          ideal: "Rides modérées, taches marquées, cicatrices d'acné"
        },
        {
          name: "Solution de Jessner",
          composition: "Acide salicylique + lactique + résorcinol",
          action: "Exfoliation uniforme et contrôlée",
          ideal: "Photovieillissement, hyperpigmentation"
        }
      ]
    }
  ];

  const indications = [
    {
      category: "Problèmes de pigmentation",
      issues: [
        "Taches brunes (lentigos solaires)",
        "Mélasma (masque de grossesse)",
        "Hyperpigmentation post-inflammatoire",
        "Teint irrégulier et terne"
      ]
    },
    {
      category: "Signes de l'âge",
      issues: [
        "Rides superficielles à modérées",
        "Texture rugueuse",
        "Perte d'éclat et de luminosité",
        "Relâchement cutané léger"
      ]
    },
    {
      category: "Problèmes d'acné et séquelles",
      issues: [
        "Cicatrices d'acné superficielles",
        "Pores dilatés",
        "Points noirs (comédons)",
        "Séquelles pigmentaires d'acné"
      ]
    }
  ];

  const treatmentZones = [
    {
      category: "Visage",
      zones: [
        "Visage complet : Amélioration globale de la texture",
        "Front : Lissage des rides horizontales",
        "Contour des yeux : Rides superficielles (avec précautions)",
        "Joues : Taches pigmentaires et uniformisation",
        "Zone T : Pores dilatés et imperfections"
      ]
    },
    {
      category: "Corps",
      zones: [
        "Décolleté : Taches solaires et texture irrégulière",
        "Dos des mains : Rajeunissement et dépigmentation",
        "Dos : Cicatrices d'acné corporelle"
      ]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Préparation (10 min)",
      description: "Démaquillage, nettoyage approfondi et dégraissage avec solution spécialisée"
    },
    {
      step: "2", 
      title: "Application (10-25 min)",
      description: "Application progressive de la solution avec surveillance continue de la réaction"
    },
    {
      step: "3",
      title: "Soins post-application (10 min)",
      description: "Masque apaisant, crème réparatrice et protection solaire"
    }
  ];

  const results = [
    {
      period: "Effets immédiats (1-2 semaines)",
      benefits: [
        "Peau plus lisse et douce",
        "Éclat retrouvé et luminosité",
        "Teint plus uniforme",
        "Pores resserrés"
      ]
    },
    {
      period: "Effets à moyen terme (1-3 mois)",
      benefits: [
        "Atténuation significative des taches pigmentaires",
        "Réduction des rides superficielles",
        "Amélioration de la texture générale",
        "Stimulation du collagène"
      ]
    },
    {
      period: "Effets à long terme (3-6 mois)",
      benefits: [
        "Résultats optimaux atteints",
        "Peau restructurée en profondeur",
        "Prévention du vieillissement accéléré",
        "Amélioration durable de la qualité cutanée"
      ]
    }
  ];

  const contraindications = [
    {
      type: "Absolues",
      items: [
        "Grossesse et allaitement",
        "Infections cutanées actives (herpès, acné inflammatoire)",
        "Prise d'isotrétinoïne (Roaccutane) dans les 6 mois",
        "Troubles de la cicatrisation (chéloïdes)",
        "Allergie aux composants"
      ]
    },
    {
      type: "Relatives",
      items: [
        "Exposition solaire récente ou prévue",
        "Phototype très foncé (évaluation spécialisée)",
        "Antécédents d'hyperpigmentation",
        "Traitement anticoagulant",
        "Dermatite atopique active"
      ]
    }
  ];

  const faqItems = [
    {
      question: "Le peeling est-il douloureux ?",
      answer: "Sensation de picotements et chaleur pendant l'application, bien tolérée. Inconfort léger les premiers jours avec tiraillements normaux."
    },
    {
      question: "Combien de séances sont nécessaires ?",
      answer: "1 à 6 séances selon l'objectif : 1 séance pour l'éclat immédiat, 3-6 pour traiter taches ou rides marquées."
    },
    {
      question: "Peut-on faire un peeling toute l'année ?",
      answer: "Préférable octobre à mars. Protection solaire stricte indispensable. Éviter absolument l'été pour peelings moyens."
    },
    {
      question: "Puis-je me maquiller après ?",
      answer: "Immédiatement pour peelings superficiels, après cicatrisation complète pour peelings moyens (10-14 jours)."
    },
    {
      question: "Y a-t-il des risques de complications ?",
      answer: "Risques limités avec médecin expérimenté : troubles pigmentaires temporaires possibles, infections exceptionnelles avec suivi rigoureux."
    },
    {
      question: "Compatible avec d'autres traitements ?",
      answer: "Excellent complément aux injections (espacement requis). Synergie parfaite avec soins dermocosmétiques adaptés."
    }
  ];

  const galleryImages = [
    {
      url: "https://images.pexels.com/photos/3764010/pexels-photo-3764010.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Peeling superficiel teint lumineux Liège",
      caption: "Teint éclatant après peeling doux"
    },
    {
      url: "https://images.pexels.com/photos/4046566/pexels-photo-4046566.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Traitement peeling taches brunes hyperpigmentation",
      caption: "Taches pigmentaires estompées"
    },
    {
      url: "https://images.pexels.com/photos/4046820/pexels-photo-4046820.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Peeling moyen rides texture peau",
      caption: "Texture de peau affinée, ridules atténuées"
    },
    {
      url: "https://images.pexels.com/photos/4046568/pexels-photo-4046568.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Peeling profond cicatrices acné",
      caption: "Cicatrices d'acné améliorées"
    },
    {
      url: "https://images.pexels.com/photos/3997987/pexels-photo-3997987.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Résultat peeling éclat jeunesse",
      caption: "Peau régénérée et rajeunie"
    },
    {
      url: "https://images.pexels.com/photos/5069409/pexels-photo-5069409.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Peeling chimique pores dilatés",
      caption: "Pores resserrés, grain de peau affiné"
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-32 pb-16">
        <FloralDecoration position="top-right" size="large" opacity={0.08} variant="shell" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
                Peelings Chimiques
              </h1>
              <p className="font-inter text-lg sm:text-xl text-primary-600 mb-4 sm:mb-6 font-medium">
                Révélez l'Éclat de Votre Peau
              </p>
              <p className="font-inter text-base sm:text-lg text-neutral-700 mb-6 sm:mb-8 leading-relaxed">
                Le peeling chimique est un traitement de médecine esthétique qui consiste à appliquer 
                une solution acide contrôlée sur la peau pour éliminer les couches superficielles endommagées. 
                Cette exfoliation stimule le renouvellement cellulaire et révèle une peau plus lisse, 
                lumineuse et uniforme.
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
                src="/image copy copy copy copy copy copy copy copy copy.png"
                alt="Traitement peeling chimique professionnel"
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
              Mécanisme d'action du peeling chimique
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-lg text-neutral-800 mb-2">
                Exfoliation contrôlée
              </h3>
              <p className="font-inter text-neutral-600 text-sm">
                Élimination des couches superficielles endommagées
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-lg text-neutral-800 mb-2">
                Renouvellement cellulaire
              </h3>
              <p className="font-inter text-neutral-600 text-sm">
                Stimulation du renouvellement cellulaire en profondeur
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-lg text-neutral-800 mb-2">
                Stimulation collagène
              </h3>
              <p className="font-inter text-neutral-600 text-sm">
                Activation de la production de collagène et d'élastine
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Peelings */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Types de peelings proposés
            </h2>
          </div>

          {peelingTypes.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <h3 className="font-playfair font-semibold text-2xl text-neutral-800 mb-4">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center justify-center">
                      <Clock className="w-4 h-4 text-primary-500 mr-2" />
                      <span className="font-inter text-neutral-600">{category.duration}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Shield className="w-4 h-4 text-primary-500 mr-2" />
                      <span className="font-inter text-neutral-600">{category.downtime}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary-500 mr-2" />
                      <span className="font-inter text-neutral-600">{category.frequency}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.types.map((type, typeIndex) => (
                    <div key={typeIndex} className="bg-neutral-50 rounded-xl p-6">
                      <h4 className="font-playfair font-semibold text-lg text-neutral-800 mb-3">
                        {type.name}
                      </h4>
                      {type.origin && (
                        <p className="font-inter text-sm text-primary-600 mb-2">
                          <strong>Origine :</strong> {type.origin}
                        </p>
                      )}
                      {type.composition && (
                        <p className="font-inter text-sm text-primary-600 mb-2">
                          <strong>Composition :</strong> {type.composition}
                        </p>
                      )}
                      <p className="font-inter text-sm text-neutral-700 mb-2">
                        <strong>Action :</strong> {type.action}
                      </p>
                      <p className="font-inter text-sm text-neutral-700">
                        <strong>Idéal pour :</strong> {type.ideal}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Indications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Indications principales
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {indications.map((indication, index) => (
              <div 
                key={index}
                className="bg-neutral-50 rounded-2xl p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
                  {indication.category}
                </h3>
                
                <ul className="space-y-3">
                  {indication.issues.map((issue, issueIndex) => (
                    <li key={issueIndex} className="font-inter text-neutral-700 flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Déroulement de la séance
            </h2>
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
                  <span className="font-inter text-neutral-700">Formation spécialisée en dermatologie esthétique</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="font-inter text-neutral-700">Évaluation précise du phototype et des besoins</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="font-inter text-neutral-700">Sélection rigoureuse des protocoles selon votre peau</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="font-inter text-neutral-700">Suivi post-traitement attentif et personnalisé</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="font-inter text-neutral-700">Produits pharmaceutiques certifiés exclusivement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TreatmentGallery
        title="Résultats de nos traitements par peeling"
        images={galleryImages}
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
            Consultation avec Docteure Fassotte
          </h2>
          <p className="font-inter text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Pour déterminer le peeling le plus adapté à votre type de peau et vos objectifs esthétiques. 
            Analyse personnalisée et proposition de protocole sur mesure pour des résultats optimaux en toute sécurité.
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
            Docteure Fassotte, experte en peelings chimiques, vous accompagne dans la révélation 
            de l'éclat naturel de votre peau avec des protocoles adaptés et sécurisés.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Peeling;