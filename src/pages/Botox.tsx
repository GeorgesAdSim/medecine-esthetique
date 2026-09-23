import React from 'react';
import { Syringe, Clock, Shield, Zap, CheckCircle, AlertCircle, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloralDecoration from '../components/FloralDecoration';
import TreatmentGallery from '../components/TreatmentGallery';

const Botox: React.FC = () => {
  const treatmentZones = [
    {
      zone: "Front",
      description: "Rides horizontales du front",
      results: "Effet lifting naturel des sourcils",
      details: ["Rides horizontales du front", "Rides de contrariété entre les sourcils", "Effet lifting naturel des sourcils"]
    },
    {
      zone: "Contour des yeux",
      description: "Rides de la patte d'oie",
      results: "Regard plus ouvert et détendu",
      details: ["Rides de la patte d'oie", "Rides sous les yeux (selon évaluation)", "Regard plus ouvert et détendu"]
    },
    {
      zone: "Zones avancées",
      description: "Rides du lion (inter-sourcilières)",
      results: "Expression plus douce",
      details: ["Rides du lion (inter-sourcilières)", "Correction du sourire gingival", "Rides du cou (bandes platysmales)", "Hyperhidrose (transpiration excessive)"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Préparation",
      description: "Désinfection et marquage des points d'injection"
    },
    {
      step: "2",
      title: "Injections",
      description: "Injections précises dans les muscles ciblés"
    },
    {
      step: "3",
      title: "Contrôle immédiat",
      description: "Vérification et conseils post-traitement"
    }
  ];

  const advantages = [
    "Résultats naturels - Vous restez vous-même, en mieux",
    "Traitement préventif - Empêche l'aggravation des rides",
    "Intervention rapide - 15-30 minutes seulement",
    "Aucune éviction sociale - Reprise d'activité immédiate",
    "Effet progressif - Résultats visibles en 3-7 jours",
    "Réversible - Retour à l'état initial après 4-6 mois"
  ];

  const timeline = [
    {
      period: "J0 - Injection",
      description: "Aucun changement visible immédiat"
    },
    {
      period: "J3-7",
      description: "Début d'action, premiers signes de détente"
    },
    {
      period: "J14",
      description: "Effet optimal atteint"
    },
    {
      period: "J30-45",
      description: "Résultat stable et naturel"
    },
    {
      period: "4-6 mois",
      description: "Retour progressif à l'état initial"
    }
  ];

  const faqItems = [
    {
      question: "L'injection est-elle douloureuse ?",
      answer: "L'inconfort est très léger, comparable à une piqûre de moustique. Aucune anesthésie n'est nécessaire."
    },
    {
      question: "Quand voit-on les premiers résultats ?",
      answer: "L'effet commence à 3-7 jours, avec un résultat optimal à 2 semaines."
    },
    {
      question: "Vais-je avoir l'air figé ?",
      answer: "Non, avec un dosage approprié et une technique experte, vous conservez vos expressions naturelles."
    },
    {
      question: "Puis-je reprendre mes activités normalement ?",
      answer: "Oui immédiatement, en évitant simplement sport intense et position couchée pendant 4h."
    },
    {
      question: "Y a-t-il des risques ?",
      answer: "Les complications sont exceptionnelles avec un médecin expérimenté. Effets secondaires rares et temporaires."
    },
    {
      question: "À quel âge commencer ?",
      answer: "Dès l'apparition des rides dynamiques, généralement vers 25-30 ans en prévention."
    },
    {
      question: "Compatible avec d'autres traitements ?",
      answer: "Parfaitement. Se combine idéalement avec acide hyaluronique et peelings."
    },
    {
      question: "Que se passe-t-il si j'arrête ?",
      answer: "Retour progressif à l'état initial. Aucun effet de rebond ou aggravation des rides."
    }
  ];

  const galleryImages = [
    {
      url: "https://images.pexels.com/photos/4047074/pexels-photo-4047074.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Injection Botox rides front Liège",
      caption: "Rides horizontales du front lissées"
    },
    {
      url: "https://images.pexels.com/photos/4050314/pexels-photo-4050314.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Botox pattes d'oie contour yeux",
      caption: "Atténuation des pattes d'oie"
    },
    {
      url: "https://images.pexels.com/photos/3997392/pexels-photo-3997392.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Traitement Botox rides du lion",
      caption: "Rides inter-sourcilières effacées"
    },
    {
      url: "https://images.pexels.com/photos/5069453/pexels-photo-5069453.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Botox prévention rides visage jeune",
      caption: "Traitement préventif dès 25 ans"
    },
    {
      url: "https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Résultat naturel Botox expressivité",
      caption: "Visage détendu, expressions naturelles"
    },
    {
      url: "https://images.pexels.com/photos/4056462/pexels-photo-4056462.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Botox sourcils lifting effet bonne mine",
      caption: "Lifting des sourcils, regard ouvert"
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-32 pb-16">
        <FloralDecoration position="top-right" size="medium" opacity={0.08} variant="shell" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 mb-4 sm:mb-6">
                Botox Liège - Toxine Botulique
              </h1>
              <p className="font-inter text-lg sm:text-xl text-primary-600 mb-4 sm:mb-6 font-medium">
                Injection de Toxine Botulique (Botox)
              </p>
              <p className="font-inter text-base sm:text-lg text-neutral-700 mb-6 sm:mb-8 leading-relaxed">
                La toxine botulique, plus communément appelée Botox, est une neurotoxine purifiée
                utilisée en médecine esthétique depuis plus de 20 ans. Elle agit en détendant
                temporairement les muscles responsables des rides d'expression, offrant un effet
                lissant naturel sans figer les expressions.
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
                src="/image copy copy copy copy copy copy copy copy.png"
                alt="Zones d'injection Botox - Rides du front, glabelle, rides périoculaires, plis d'amertume"
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
            <p className="font-inter text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              La toxine botulique bloque temporairement la transmission nerveuse au niveau des muscles traités
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                Détente musculaire
              </h3>
              <p className="font-inter text-neutral-600">
                Détente musculaire des zones hyperactives pour un lissage progressif des rides d'expression.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                Effet préventif
              </h3>
              <p className="font-inter text-neutral-600">
                Prévention de l'approfondissement des rides avec un effet naturel sans paralysie complète.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                Durabilité
              </h3>
              <p className="font-inter text-neutral-600">
                Durabilité de 4 à 6 mois avec possibilité de renouvellement selon les besoins.
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
            <p className="font-inter text-lg text-neutral-600 max-w-2xl mx-auto">
              La toxine botulique peut être utilisée sur différentes zones pour 
              traiter rides d'expression et autres indications médicales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatmentZones.map((zone, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                  {zone.zone}
                </h3>
                
                <p className="font-inter text-neutral-600 mb-4">
                  {zone.description}
                </p>
                
                <div className="mb-4">
                  <span className="font-inter font-semibold text-primary-600">
                    Résultat : {zone.results}
                  </span>
                </div>
                
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

      {/* Advantages */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Avantages du Botox
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advantages.map((advantage, index) => (
              <div 
                key={index}
                className="bg-neutral-50 rounded-xl p-6 animate-slide-up"
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
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Déroulement d'une séance
            </h2>
            <p className="font-inter text-lg text-neutral-600">
              Durée totale : 15-30 minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 text-center animate-slide-up"
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
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Le traitement par Docteure Fassotte
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-primary-500 mr-3" />
                <h3 className="font-playfair font-semibold text-xl text-neutral-800">
                  Consultation personnalisée
                </h3>
              </div>
              <ul className="space-y-3 font-inter text-neutral-700">
                <li>• Analyse morphologique de votre visage au repos et en mouvement</li>
                <li>• Évaluation des besoins selon vos expressions habituelles</li>
                <li>• Plan de traitement adapté à vos objectifs</li>
                <li>• Information complète sur le protocole et les résultats attendus</li>
              </ul>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <Syringe className="w-6 h-6 text-primary-500 mr-3" />
                <h3 className="font-playfair font-semibold text-xl text-neutral-800">
                  Technique d'injection
                </h3>
              </div>
              <ul className="space-y-3 font-inter text-neutral-700">
                <li>• Produits certifiés Botox® ou Vistabel® exclusivement</li>
                <li>• Injections précises avec aiguilles ultra-fines</li>
                <li>• Dosage personnalisé selon l'intensité des rides</li>
                <li>• Technique douce pour minimiser l'inconfort</li>
              </ul>
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
              Tout ce que vous devez savoir sur la toxine botulique
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
        title="Résultats de nos traitements au Botox"
        images={galleryImages}
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
            Consultation avec Docteure Fassotte
          </h2>
          <p className="font-inter text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Pour découvrir comment la toxine botulique peut détendre votre regard et prévenir le vieillissement. 
            Consultation personnalisée : Analyse de vos besoins et proposition de traitement sur mesure.
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
    </div>
  );
};

export default Botox;