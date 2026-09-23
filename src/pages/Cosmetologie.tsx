import React from 'react';
import { Link } from 'react-router-dom';
import { Beaker, Microscope, Heart, CheckCircle, AlertCircle, Clock, Users, Target, Shield, Sparkles, Activity } from 'lucide-react';
import FloralDecoration from '../components/FloralDecoration';

const Cosmetologie: React.FC = () => {
  const ageProtocols = [
    {
      age: "20-30 ans : Prévention",
      objectives: [
        "Protection solaire quotidienne",
        "Hydratation adaptée", 
        "Prévention du photovieillissement",
        "Traitement de l'acné si nécessaire"
      ],
      routine: [
        "Nettoyant doux matin et soir",
        "Sérum antioxydant (vitamine C)",
        "Hydratant selon type de peau",
        "Protection solaire SPF 30-50 quotidienne"
      ]
    },
    {
      age: "30-45 ans : Correction précoce",
      objectives: [
        "Correction des premiers signes",
        "Stimulation du collagène",
        "Amélioration de la texture",
        "Prévention accentuée"
      ],
      routine: [
        "Sérum vitamine C le matin",
        "Rétinol progressif le soir",
        "Hydratant riche en actifs",
        "Protection solaire renforcée"
      ]
    },
    {
      age: "45+ ans : Réparation intensive",
      objectives: [
        "Correction des signes installés",
        "Nutrition intensive",
        "Fermeté et élasticité",
        "Éclat du teint"
      ],
      routine: [
        "Sérums concentrés multi-actifs",
        "Soins nutritifs riches",
        "Masques hebdomadaires",
        "Protection maximale"
      ]
    }
  ];

  const activeIngredients = [
    {
      name: "Vitamine C",
      action: "Antioxydant puissant, éclat"
    },
    {
      name: "Rétinol/Rétinaldéhyde",
      action: "Anti-âge de référence"
    },
    {
      name: "Acides AHA/BHA",
      action: "Exfoliation et renouvellement"
    },
    {
      name: "Niacinamide",
      action: "Régulation sébacée, anti-inflammatoire"
    },
    {
      name: "Peptides",
      action: "Stimulation collagénique"
    },
    {
      name: "Acide hyaluronique",
      action: "Hydratation intense"
    }
  ];

  const advantages = [
    "Approche scientifique - Analyse précise des besoins",
    "Produits pharmaceutiques - Efficacité et sécurité prouvées",
    "Personnalisation complète - Protocole unique à chaque patient",
    "Suivi médical - Ajustements selon l'évolution",
    "Résultats optimisés - Synergie avec traitements esthétiques",
    "Prévention efficace - Anticipation du vieillissement",
    "Sécurité maximale - Évitement des intolérances"
  ];

  const faqItems = [
    {
      question: "Quelle différence avec les cosmétiques classiques ?",
      answer: "Les cosméceutiques contiennent des actifs concentrés à des dosages efficaces, avec études cliniques prouvant leur efficacité."
    },
    {
      question: "Combien de temps pour voir des résultats ?",
      answer: "4-6 semaines minimum pour les premiers effets, 3-6 mois pour des résultats optimaux selon la problématique."
    },
    {
      question: "Peut-on utiliser plusieurs actifs ensemble ?",
      answer: "Oui, mais selon un protocole précis pour éviter interactions et intolérances. D'où l'importance du conseil médical."
    },
    {
      question: "Les soins sont-ils adaptés à tous les âges ?",
      answer: "Absolument, avec des protocoles spécifiques selon l'âge, le type de peau et les besoins individuels."
    },
    {
      question: "Faut-il arrêter ses soins actuels ?",
      answer: "Évaluation au cas par cas. Transition progressive recommandée pour éviter les réactions cutanées."
    },
    {
      question: "Comment savoir si un produit me convient ?",
      answer: "Test de tolérance systématique + évaluation à 2-4 semaines d'utilisation avec ajustements si nécessaire."
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
                Cosmétologie Médicale
              </h1>
              <p className="font-inter text-lg sm:text-xl text-primary-600 mb-4 sm:mb-6 font-medium">
                Optimisez Votre Routine de Soins
              </p>
              <p className="font-inter text-base sm:text-lg text-neutral-700 mb-6 sm:mb-8 leading-relaxed">
                La cosmétologie médicale représente l'alliance entre expertise dermatologique 
                et soins esthétiques avancés. Cette approche scientifique de la beauté permet 
                d'analyser précisément les besoins de votre peau et de vous proposer des 
                protocoles de soins personnalisés avec des produits de qualité pharmaceutique.
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
                <span className="text-neutral-400 font-inter">Cosmétologie médicale</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Medical Cosmetology */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Qu'est-ce que la cosmétologie médicale ?
            </h2>
          </div>
          
          <p className="font-inter text-lg text-neutral-700 leading-relaxed mb-8">
            Docteure Fassotte intègre la cosmétologie médicale dans sa pratique pour optimiser 
            et prolonger les résultats de vos traitements esthétiques, tout en préservant la 
            santé et la beauté de votre peau au quotidien.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
                  <Microscope className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-playfair font-semibold text-xl text-neutral-800">
                  Analyse dermatologique approfondie
                </h3>
              </div>
              <ul className="space-y-3 font-inter text-neutral-700">
                <li>• Examen clinique de la peau au microscope</li>
                <li>• Évaluation du phototype et du type de peau</li>
                <li>• Analyse des problématiques spécifiques (rides, taches, acné)</li>
                <li>• Test de tolérance aux actifs cosmétiques</li>
                <li>• Mesure de l'hydratation et de l'élasticité</li>
              </ul>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-playfair font-semibold text-xl text-neutral-800">
                  Diagnostic personnalisé
                </h3>
              </div>
              <ul className="space-y-3 font-inter text-neutral-700">
                <li>• État actuel de votre peau</li>
                <li>• Facteurs aggravants (environnement, âge, hormones)</li>
                <li>• Besoins prioritaires à traiter</li>
                <li>• Objectifs esthétiques réalisables</li>
                <li>• Contraintes et habitudes de vie</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Domains */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Domaines d'expertise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-playfair font-semibold text-xl text-neutral-800">
                  Anti-âge et prévention
                </h3>
              </div>
              <ul className="space-y-2 font-inter text-neutral-700">
                <li>• Protocoles préventifs dès 25 ans</li>
                <li>• Soins anti-rides ciblés selon les zones</li>
                <li>• Stimulation du collagène par cosmétiques actifs</li>
                <li>• Protection solaire adaptée au quotidien</li>
                <li>• Antioxydants pour lutter contre le stress oxydatif</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-playfair font-semibold text-xl text-neutral-800">
                  Correction des imperfections
                </h3>
              </div>
              <ul className="space-y-2 font-inter text-neutral-700">
                <li>• Traitement de l'acné adulte et juvénile</li>
                <li>• Atténuation des taches pigmentaires</li>
                <li>• Réduction des pores dilatés</li>
                <li>• Amélioration de la texture cutanée</li>
                <li>• Unification du teint</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-playfair font-semibold text-xl text-neutral-800">
                  Hydratation et nutrition
                </h3>
              </div>
              <ul className="space-y-2 font-inter text-neutral-700">
                <li>• Restauration de la barrière cutanée</li>
                <li>• Hydratation profonde selon le type de peau</li>
                <li>• Nutrition cellulaire avec actifs concentrés</li>
                <li>• Réparation des peaux sensibles et réactives</li>
                <li>• Soins spécifiques contour des yeux</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Gammes de produits médicaux
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="font-playfair font-semibold text-2xl text-neutral-800 mb-6">
                Cosméceutiques de pointe
              </h3>
              <p className="font-inter text-neutral-700 mb-6">
                Produits de laboratoires pharmaceutiques exclusivement :
              </p>
              <ul className="space-y-3 font-inter text-neutral-700">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  Formulations dermatologiques avancées
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  Concentrations actives thérapeutiques
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  Tests cliniques d'efficacité prouvée
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  Qualité pharmaceutique garantie
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  Recherche dermatologique de pointe
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-playfair font-semibold text-2xl text-neutral-800 mb-6">
                Actifs concentrés
              </h3>
              <div className="space-y-4">
                {activeIngredients.map((ingredient, index) => (
                  <div key={index} className="bg-neutral-50 rounded-lg p-4">
                    <h4 className="font-inter font-semibold text-neutral-800 mb-1">
                      {ingredient.name}
                    </h4>
                    <p className="font-inter text-neutral-600 text-sm">
                      {ingredient.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Age Protocols */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Protocoles selon l'âge
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ageProtocols.map((protocol, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
                  {protocol.age}
                </h3>
                
                <div className="mb-6">
                  <h4 className="font-inter font-semibold text-neutral-800 mb-3">Objectifs :</h4>
                  <ul className="space-y-2">
                    {protocol.objectives.map((objective, objIndex) => (
                      <li key={objIndex} className="font-inter text-neutral-700 text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></span>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-inter font-semibold text-neutral-800 mb-3">Routine type :</h4>
                  <ul className="space-y-2">
                    {protocol.routine.map((step, stepIndex) => (
                      <li key={stepIndex} className="font-inter text-neutral-700 text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Services de cosmétologie
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-4">
                Consultation dermocosmétique
              </h3>
              <ul className="space-y-2 font-inter text-neutral-700 text-sm">
                <li>• Analyse complète de votre peau (30 min)</li>
                <li>• Diagnostic personnalisé des besoins</li>
                <li>• Sélection des produits adaptés</li>
                <li>• Protocole de soins sur mesure</li>
                <li>• Formation à l'application correcte</li>
              </ul>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-4">
                Suivi et ajustements
              </h3>
              <ul className="space-y-2 font-inter text-neutral-700 text-sm">
                <li>• Contrôle à 4-6 semaines de l'évolution</li>
                <li>• Adaptation des soins selon les résultats</li>
                <li>• Introduction progressive de nouveaux actifs</li>
                <li>• Gestion des intolérances éventuelles</li>
                <li>• Optimisation continue du protocole</li>
              </ul>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-4">
                Préparation et accompagnement
              </h3>
              <ul className="space-y-2 font-inter text-neutral-700 text-sm">
                <li>• Préparation cutanée avant traitements esthétiques</li>
                <li>• Soins post-traitement pour optimiser la cicatrisation</li>
                <li>• Maintenance des résultats obtenus</li>
                <li>• Prévention des récidives (acné, taches)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Avantages de la cosmétologie médicale
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

      {/* Application Tips */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Conseils d'application
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-hero rounded-2xl p-8">
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
                Routine matin
              </h3>
              <ol className="space-y-3 font-inter text-neutral-700">
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  Nettoyage doux à l'eau tiède
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                  Sérum antioxydant (vitamine C)
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  Hydratant adapté au type de peau
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                  Protection solaire SPF 30 minimum
                </li>
              </ol>
            </div>

            <div className="bg-gradient-hero rounded-2xl p-8">
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
                Routine soir
              </h3>
              <ol className="space-y-3 font-inter text-neutral-700">
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  Démaquillage complet
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                  Nettoyage approfondi
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  Sérum actif (rétinol, AHA selon protocole)
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                  Soin nutritif réparateur
                </li>
              </ol>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-2xl p-8">
            <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
              Règles d'or
            </h3>
            <ul className="space-y-3 font-inter text-neutral-700">
              <li className="flex items-center">
                <AlertCircle className="w-5 h-5 text-primary-500 mr-3" />
                Introduction progressive des actifs (1 semaine d'adaptation)
              </li>
              <li className="flex items-center">
                <AlertCircle className="w-5 h-5 text-primary-500 mr-3" />
                Test de tolérance sur petite zone (48h)
              </li>
              <li className="flex items-center">
                <AlertCircle className="w-5 h-5 text-primary-500 mr-3" />
                Protection solaire indispensable avec actifs photosensibilisants
              </li>
              <li className="flex items-center">
                <AlertCircle className="w-5 h-5 text-primary-500 mr-3" />
                Patience : Résultats visibles après 4-6 semaines minimum
              </li>
            </ul>
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

      {/* Follow-up Protocol */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Suivi personnalisé
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 rounded-2xl p-8">
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
                Protocole de suivi
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700"><strong>J+15 :</strong> Premier contrôle et tolérance</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700"><strong>M+1 :</strong> Évaluation des premiers résultats</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700"><strong>M+3 :</strong> Bilan intermédiaire et ajustements</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700"><strong>M+6 :</strong> Bilan complet et évolution du protocole</span>
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-8">
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
                Adaptations saisonnières
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-inter font-semibold text-neutral-800 mb-2">Printemps/Été :</h4>
                  <p className="font-inter text-neutral-700">Protection renforcée, hydratation légère</p>
                </div>
                <div>
                  <h4 className="font-inter font-semibold text-neutral-800 mb-2">Automne/Hiver :</h4>
                  <p className="font-inter text-neutral-700">Réparation intensive, nutrition accrue</p>
                </div>
              </div>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
                Formation spécialisée
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Dermatologie esthétique et cosmétologie avancée</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Formation continue sur les nouveaux actifs</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Partenariats laboratoires pour l'innovation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Veille scientifique permanente</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
                Approche holistique
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Vision globale de la santé cutanée</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Intégration cosmétologie/traitements médicaux</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Respect de l'écosystème cutané</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Résultats durables privilégiés</span>
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
            Consultation cosmétologique
          </h2>
          <p className="font-inter text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Pour découvrir les soins dermocosmétiques adaptés à votre peau et optimiser votre routine beauté. 
            Analyse personnalisée : Diagnostic complet de votre peau et création d'un protocole de soins sur mesure 
            avec les meilleurs cosméceutiques du marché.
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
            Docteure Fassotte, experte en cosmétologie médicale, vous accompagne dans l'optimisation 
            de votre routine de soins pour une peau saine, belle et préservée du vieillissement.
          </p>
          <div className="mt-8 p-4 bg-primary-50 rounded-xl">
            <p className="font-inter text-sm text-neutral-700">
              <strong>Important :</strong> La cosmétologie médicale nécessite un diagnostic personnalisé 
              par un professionnel qualifié pour des résultats optimaux et sécurisés.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cosmetologie;