import React from 'react';
import { Droplets, Clock, Shield, Zap, CheckCircle, AlertCircle, Activity, Users, Target, Eye, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloralDecoration from '../components/FloralDecoration';

const LiquidLift: React.FC = () => {
  const treatmentZones = [
    {
      category: "Architecture du visage",
      zones: [
        "Tempes : Restauration des volumes perdus",
        "Pommettes : Remontée et redéfinition malaire",
        "Menton : Projection et harmonisation du profil",
        "Mâchoire : Redéfinition de la jawline",
        "Angle mandibulaire : Restructuration de l'ovale"
      ]
    },
    {
      category: "Points de tension stratégiques",
      zones: [
        "Lifting des joues par traction vectorisée",
        "Remontée des commissures labiales",
        "Ouverture du regard par lifting temporal",
        "Correction des bajoues par repositionnement",
        "Amélioration du profil global"
      ]
    }
  ];

  const indications = [
    {
      category: "Rajeunissement global",
      issues: [
        "Visage affaissé par la gravité et l'âge",
        "Perte des volumes jeunes du visage",
        "Relâchement des tissus modéré",
        "Asymétries liées au vieillissement",
        "Manque d'harmonie des proportions"
      ]
    },
    {
      category: "Restructuration faciale",
      issues: [
        "Restauration de l'ovale du visage",
        "Redéfinition des contours perdus",
        "Amélioration du profil en vue de côté",
        "Correction des disproportions naturelles",
        "Optimisation de la beauté naturelle"
      ]
    },
    {
      category: "Harmonisation esthétique",
      issues: [
        "Équilibrage des volumes faciaux",
        "Amélioration des proportions selon le nombre d'or",
        "Correction des asymétries mineures",
        "Sublimation des traits existants",
        "Rajeunissement sans transformation"
      ]
    }
  ];

  const advantages = [
    "Effet lifting immédiat sans chirurgie",
    "Approche globale - Vision d'ensemble du visage",
    "Résultats naturels - Respect de votre identité",
    "Durabilité optimale - 12-18 mois de bénéfices",
    "Récupération immédiate - Pas d'éviction sociale",
    "Technique réversible - Ajustements possibles",
    "Alternative sûre à la chirurgie esthétique"
  ];

  const processSteps = [
    {
      step: "1",
      title: "Préparation (20 min)",
      description: "Marquage des points d'injection stratégiques, anesthésie locale des zones de traitement, préparation des seringues d'acide hyaluronique"
    },
    {
      step: "2",
      title: "Phase d'injection (40-60 min)",
      description: "Injections profondes aux points d'ancrage, repositionnement progressif des volumes, contrôle symétrique constant, ajustements selon l'évolution"
    },
    {
      step: "3",
      title: "Finalisation (10 min)",
      description: "Massage délicat d'homogénéisation, vérification du résultat global, conseils post-traitement"
    }
  ];

  const hyaluronicTypes = [
    {
      name: "Haute densité (G-Prime)",
      zones: "Pommettes, menton, mâchoire",
      action: "Restructuration profonde",
      durability: "15-18 mois"
    },
    {
      name: "Densité moyenne (G-Classic)",
      zones: "Tempes, milieu du visage",
      action: "Volumisation et projection",
      durability: "12-15 mois"
    }
  ];

  const timeline = [
    {
      period: "Immédiat (J0-J7)",
      description: "Effet lifting visible dès la sortie, repositionnement des volumes affaissés, amélioration immédiate du profil, œdème léger normal (24-72h)"
    },
    {
      period: "Optimisation (2-6 semaines)",
      description: "Intégration complète de l'acide hyaluronique, résultat de plus en plus naturel, stimulation collagénique débutante, affinement des contours"
    },
    {
      period: "Stabilisation (2-6 mois)",
      description: "Résultats optimaux atteints, effet lifting pleinement exprimé, amélioration de la qualité cutanée, harmonie parfaite des proportions"
    },
    {
      period: "Durabilité (6-18 mois)",
      description: "Maintien de l'architecture faciale, résultats stables et naturels, vieillissement ralenti, retouches possibles selon évolution"
    }
  ];

  const contraindications = [
    {
      type: "Absolues",
      items: [
        "Grossesse et allaitement",
        "Maladies auto-immunes actives",
        "Allergies à l'acide hyaluronique",
        "Infections cutanées locales",
        "Troubles de la coagulation sévères"
      ]
    },
    {
      type: "Relatives",
      items: [
        "Traitements anticoagulants (évaluation)",
        "Antécédents de granulomes",
        "Attentes irréalistes",
        "Chirurgie esthétique récente (6 mois)"
      ]
    }
  ];

  const faqItems = [
    {
      question: "Le Liquid Lift fait-il mal ?",
      answer: "Inconfort modéré durant l'injection, bien contrôlé par l'anesthésie locale. Sensibilité résiduelle 2-7 jours, facilement supportable."
    },
    {
      question: "Combien de seringues sont nécessaires ?",
      answer: "Variables selon les besoins : 2-6 seringues généralement. Évaluation précise lors de la consultation selon votre morphologie."
    },
    {
      question: "Le résultat paraît-il naturel ?",
      answer: "Parfaitement naturel avec la technique maîtrisée. L'objectif est de restaurer votre architecture faciale jeune, pas de vous transformer."
    },
    {
      question: "Peut-on reprendre ses activités normalement ?",
      answer: "Oui immédiatement. Éviter sport intense et exposition à la chaleur pendant 48h. Vie sociale normale dès le lendemain."
    },
    {
      question: "Y a-t-il des risques ?",
      answer: "Risques très limités avec un médecin expérimenté : œdème temporaire, rares hématomes, granulomes exceptionnels."
    },
    {
      question: "Faut-il renouveler le traitement ?",
      answer: "Selon votre souhait et l'évolution. Retouches possibles à 6-12 mois, nouveau traitement complet après 12-18 mois."
    },
    {
      question: "Compatible avec d'autres traitements ?",
      answer: "Excellente synergie avec Botox (espacer de 15 jours), peelings, soins dermocosmétiques. Planification globale recommandée."
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
                Liquid Lift
              </h1>
              <p className="font-inter text-lg sm:text-xl text-primary-600 mb-4 sm:mb-6 font-medium">
                Rajeunissement Global par Injections Stratégiques
              </p>
              <p className="font-inter text-base sm:text-lg text-neutral-700 mb-6 sm:mb-8 leading-relaxed">
                Le Liquid Lift représente l'évolution la plus sophistiquée des techniques d'injection 
                en médecine esthétique. Cette approche globale et vectorisée utilise des injections 
                stratégiques d'acide hyaluronique pour créer un véritable effet lifting sans chirurgie.
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
                <span className="text-neutral-400 font-inter">Liquid Lift</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Liquid Lift */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Qu'est-ce que le Liquid Lift ?
            </h2>
          </div>
          
          <p className="font-inter text-lg text-neutral-700 leading-relaxed mb-12">
            Docteure Fassotte maîtrise cette technique avancée qui permet de restaurer l'architecture 
            naturelle du visage en repositionnant les volumes affaissés et en redéfinissant les contours, 
            pour un rajeunissement harmonieux et naturel.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-playfair font-semibold text-xl text-neutral-800">
                  Approche vectorielle
                </h3>
              </div>
              <ul className="space-y-3 font-inter text-neutral-700">
                <li>• Analyse 3D de la structure faciale</li>
                <li>• Identification des vecteurs de lifting naturels</li>
                <li>• Points de tension stratégiques pour un effet global</li>
                <li>• Restauration des volumes selon l'anatomie originelle</li>
                <li>• Harmonisation des proportions du visage</li>
              </ul>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-playfair font-semibold text-xl text-neutral-800">
                  Technique innovante
                </h3>
              </div>
              <ul className="space-y-3 font-inter text-neutral-700">
                <li>• Injections profondes aux points d'ancrage anatomiques</li>
                <li>• Repositionnement des tissus affaissés</li>
                <li>• Création de points de soutien naturels</li>
                <li>• Effet cascade sur l'ensemble du visage</li>
                <li>• Résultat lifting immédiat et durable</li>
              </ul>
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

      {/* Advantages */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Avantages du Liquid Lift
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

          <div className="bg-neutral-50 rounded-2xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-4">
                  Consultation spécialisée
                </h3>
                <ul className="space-y-3 font-inter text-neutral-700">
                  <li className="flex items-center">
                    <Eye className="w-5 h-5 text-primary-500 mr-3" />
                    <span>Analyse morphologique approfondie du visage</span>
                  </li>
                  <li className="flex items-center">
                    <Activity className="w-5 h-5 text-primary-500 mr-3" />
                    <span>Photographies sous différents angles</span>
                  </li>
                  <li className="flex items-center">
                    <Target className="w-5 h-5 text-primary-500 mr-3" />
                    <span>Simulation des résultats attendus</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="w-5 h-5 text-primary-500 mr-3" />
                    <span>Planification vectorielle personnalisée</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-4">
                  Planification du traitement
                </h3>
                <ul className="space-y-3 font-inter text-neutral-700">
                  <li className="flex items-center">
                    <Target className="w-5 h-5 text-primary-500 mr-3" />
                    <span>Cartographie précise des zones à traiter</span>
                  </li>
                  <li className="flex items-center">
                    <Droplets className="w-5 h-5 text-primary-500 mr-3" />
                    <span>Calcul des volumes nécessaires par zone</span>
                  </li>
                  <li className="flex items-center">
                    <Activity className="w-5 h-5 text-primary-500 mr-3" />
                    <span>Sélection des densités d'acide hyaluronique</span>
                  </li>
                  <li className="flex items-center">
                    <Clock className="w-5 h-5 text-primary-500 mr-3" />
                    <span>Définition de la séquence d'injections</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="font-playfair font-semibold text-2xl text-neutral-800 mb-2">
              Déroulement de la séance
            </h3>
            <p className="font-inter text-lg text-neutral-600">Durée : 60-90 minutes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Hyaluronic Acid Types */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Types d'acide hyaluronique utilisés
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {hyaluronicTypes.map((type, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-4">
                  {type.name}
                </h3>
                <div className="space-y-3 font-inter text-neutral-700">
                  <p><strong>Zones :</strong> {type.zones}</p>
                  <p><strong>Action :</strong> {type.action}</p>
                  <p><strong>Durabilité :</strong> {type.durability}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary-50 rounded-2xl p-8">
            <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-4">
              Technique multicouches
            </h3>
            <ul className="space-y-2 font-inter text-neutral-700">
              <li>• Injection profonde pour la structure</li>
              <li>• Injection moyenne pour le volume</li>
              <li>• Finitions superficielles pour l'harmonie</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Results Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Évolution des résultats
            </h2>
          </div>

          <div className="space-y-8">
            {timeline.map((phase, index) => (
              <div 
                key={index}
                className="bg-neutral-50 rounded-2xl shadow-lg p-8 animate-slide-up"
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

      {/* Ideal Candidates */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Candidats idéaux
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
                Âge et profil
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Users className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">35-65 ans principalement</span>
                </li>
                <li className="flex items-center">
                  <Activity className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Relâchement modéré des tissus</span>
                </li>
                <li className="flex items-center">
                  <Heart className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Désir de rajeunissement global</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Alternative à la chirurgie recherchée</span>
                </li>
                <li className="flex items-center">
                  <Eye className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Attentes réalistes sur les résultats</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
                Indications optimales
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Target className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Visage rectangulaire ou carré (harmonisation)</span>
                </li>
                <li className="flex items-center">
                  <Activity className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Perte de l'ovale du visage</span>
                </li>
                <li className="flex items-center">
                  <Droplets className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Affaissement des joues et des pommettes</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Manque de projection du menton</span>
                </li>
                <li className="flex items-center">
                  <Eye className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Profil peu défini</span>
                </li>
              </ul>
            </div>
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

      {/* Comparisons */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Comparaison avec autres techniques
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
                Vs Lifting chirurgical
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="font-inter text-neutral-700">Moins invasif : Anesthésie locale uniquement</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="font-inter text-neutral-700">Récupération immédiate : Pas d'arrêt de travail</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="font-inter text-neutral-700">Coût accessible : Investissement moindre</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="font-inter text-neutral-700">Résultats modulables : Ajustements possibles</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="font-inter text-neutral-700">Risques limités : Complications exceptionnelles</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
                Vs Injections classiques
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-primary-500 mr-3" />
                    <span className="font-inter text-neutral-700">Approche globale vs ponctuelle</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-primary-500 mr-3" />
                    <span className="font-inter text-neutral-700">Effet structural vs volumisation simple</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-primary-500 mr-3" />
                    <span className="font-inter text-neutral-700">Vision architecturale vs correction isolée</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-primary-500 mr-3" />
                    <span className="font-inter text-neutral-700">Résultats harmonieux vs amélioration partielle</span>
                  </div>
                </div>
              </div>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
                Formation spécialisée
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Anatomie faciale : Maîtrise des plans et volumes</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Techniques d'injection avancées certifiées</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Vision esthétique : Sens des proportions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Expérience : Centaines de Liquid Lift réalisés</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-6">
                Approche artistique
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Analyse morphologique poussée</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Respect de l'harmonie faciale</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Technique personnalisée selon chaque visage</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="font-inter text-neutral-700">Résultats naturels et élégants garantis</span>
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
            Consultation avec Docteure Fassotte
          </h2>
          <p className="font-inter text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Pour découvrir si le Liquid Lift peut répondre à vos objectifs de rajeunissement global. 
            Évaluation personnalisée : Analyse morphologique complète et simulation des résultats 
            possibles avec la technique du Liquid Lift.
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
            Docteure Fassotte, experte en Liquid Lift, vous propose une approche globale du 
            rajeunissement facial pour restaurer l'architecture naturelle de votre visage avec 
            des résultats harmonieux et durables.
          </p>
          <div className="mt-8 p-4 bg-primary-50 rounded-xl">
            <p className="font-inter text-sm text-neutral-700">
              <strong>Important :</strong> Le Liquid Lift est une technique avancée nécessitant une 
              expertise approfondie en anatomie faciale et en techniques d'injection. Seul un médecin 
              spécialisé peut garantir des résultats optimaux en toute sécurité.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiquidLift;