import React from 'react';
import { Shield, Eye, Cookie, Database, Lock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloralDecoration from '../components/FloralDecoration';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-32 pb-16">
        <FloralDecoration position="top-center" size="large" opacity={0.07} variant="shell" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-primary-600 mr-4" />
            <h1 className="font-playfair text-5xl font-bold text-neutral-800">
              Politique de Confidentialité
            </h1>
          </div>
          <p className="font-inter text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Nous nous engageons à protéger votre vie privée et vos données personnelles. 
            Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Qui sommes-nous */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <FileText className="w-8 h-8 text-primary-600 mr-4" />
              <h2 className="font-playfair text-3xl font-bold text-neutral-800">
                Qui sommes-nous ?
              </h2>
            </div>
            <p className="font-inter text-lg text-neutral-700 leading-relaxed">
              Ce site web est géré par la Docteure Jocelyne Fassotte, spécialiste en médecine esthétique, 
              située à Liège, Belgique. Nous respectons votre vie privée et nous nous engageons à protéger 
              vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </div>

          {/* Utilisation des données */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <Database className="w-8 h-8 text-primary-600 mr-4" />
              <h2 className="font-playfair text-3xl font-bold text-neutral-800">
                Utilisation des données personnelles collectées
              </h2>
            </div>

            {/* Commentaires */}
            <div className="mb-12">
              <h3 className="font-playfair text-2xl font-semibold text-neutral-800 mb-4">
                Commentaires
              </h3>
              <div className="bg-neutral-50 rounded-2xl p-6 mb-6">
                <p className="font-inter text-neutral-700 leading-relaxed mb-4">
                  Quand vous laissez un commentaire sur notre site web, les données inscrites dans le formulaire 
                  de commentaire, mais aussi votre adresse IP et l'agent utilisateur de votre navigateur sont 
                  collectés pour nous aider à la détection des commentaires indésirables.
                </p>
                <p className="font-inter text-neutral-700 leading-relaxed">
                  Une chaîne anonymisée créée à partir de votre adresse de messagerie (également appelée hash) 
                  peut être envoyée au service Gravatar pour vérifier si vous utilisez ce dernier. Les clauses 
                  de confidentialité du service Gravatar sont disponibles ici : 
                  <a href="https://automattic.com/privacy/" target="_blank" rel="noopener noreferrer" 
                     className="text-primary-600 hover:text-primary-700 underline ml-1">
                    https://automattic.com/privacy/
                  </a>. 
                  Après validation de votre commentaire, votre photo de profil sera visible publiquement 
                  à coté de votre commentaire.
                </p>
              </div>
            </div>

            {/* Médias */}
            <div className="mb-12">
              <h3 className="font-playfair text-2xl font-semibold text-neutral-800 mb-4">
                Médias
              </h3>
              <div className="bg-neutral-50 rounded-2xl p-6">
                <p className="font-inter text-neutral-700 leading-relaxed">
                  Si vous êtes un utilisateur ou une utilisatrice enregistré·e et que vous téléversez des images 
                  sur le site web, nous vous conseillons d'éviter de téléverser des images contenant des données 
                  EXIF de coordonnées GPS. Les visiteurs de votre site web peuvent télécharger et extraire des 
                  données de localisation depuis ces images.
                </p>
              </div>
            </div>

            {/* Formulaires de contact */}
            <div className="mb-12">
              <h3 className="font-playfair text-2xl font-semibold text-neutral-800 mb-4">
                Formulaires de contact
              </h3>
              <div className="bg-neutral-50 rounded-2xl p-6">
                <p className="font-inter text-neutral-700 leading-relaxed">
                  Les informations que vous saisissez dans nos formulaires de contact sont utilisées uniquement 
                  pour répondre à vos demandes et prendre rendez-vous. Ces données ne sont jamais partagées avec 
                  des tiers et sont conservées de manière sécurisée.
                </p>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <Cookie className="w-8 h-8 text-primary-600 mr-4" />
              <h2 className="font-playfair text-3xl font-bold text-neutral-800">
                Cookies
              </h2>
            </div>
            <div className="space-y-6">
              <div className="bg-neutral-50 rounded-2xl p-6">
                <p className="font-inter text-neutral-700 leading-relaxed mb-4">
                  Si vous déposez un commentaire sur notre site, il vous sera proposé d'enregistrer votre nom, 
                  adresse de messagerie et site web dans des cookies. C'est uniquement pour votre confort afin 
                  de ne pas avoir à saisir ces informations si vous déposez un autre commentaire plus tard. 
                  Ces cookies expirent au bout d'un an.
                </p>
                <p className="font-inter text-neutral-700 leading-relaxed mb-4">
                  Si vous avez un compte et que vous vous connectez sur ce site, un cookie temporaire sera créé 
                  afin de déterminer si votre navigateur accepte les cookies. Il ne contient pas de données 
                  personnelles et sera supprimé automatiquement à la fermeture de votre navigateur.
                </p>
                <p className="font-inter text-neutral-700 leading-relaxed mb-4">
                  Lorsque vous vous connecterez, nous mettrons en place un certain nombre de cookies pour 
                  enregistrer vos informations de connexion et vos préférences d'écran. La durée de vie d'un 
                  cookie de connexion est de deux jours, celle d'un cookie d'option d'écran est d'un an. 
                  Si vous cochez « Se souvenir de moi », votre cookie de connexion sera conservé pendant deux 
                  semaines. Si vous vous déconnectez de votre compte, le cookie de connexion sera effacé.
                </p>
                <p className="font-inter text-neutral-700 leading-relaxed">
                  En modifiant ou en publiant un article, un cookie supplémentaire sera enregistré dans votre 
                  navigateur. Ce cookie ne comprend aucune donnée personnelle. Il indique simplement l'identifiant 
                  de l'article que vous venez de modifier. Il expire au bout d'un jour.
                </p>
              </div>
            </div>
          </div>

          {/* Contenu embarqué */}
          <div className="mb-16">
            <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6">
              Contenu embarqué depuis d'autres sites
            </h2>
            <div className="bg-neutral-50 rounded-2xl p-6">
              <p className="font-inter text-neutral-700 leading-relaxed mb-4">
                Les articles de ce site peuvent inclure des contenus intégrés (par exemple des vidéos, images, 
                articles…). Le contenu intégré depuis d'autres sites se comporte de la même manière que si le 
                visiteur se rendait sur cet autre site.
              </p>
              <p className="font-inter text-neutral-700 leading-relaxed">
                Ces sites web pourraient collecter des données sur vous, utiliser des cookies, embarquer des 
                outils de suivis tiers, suivre vos interactions avec ces contenus embarqués si vous disposez 
                d'un compte connecté sur leur site web.
              </p>
            </div>
          </div>

          {/* Statistiques */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <Eye className="w-8 h-8 text-primary-600 mr-4" />
              <h2 className="font-playfair text-3xl font-bold text-neutral-800">
                Statistiques et mesures d'audience
              </h2>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-6">
              <p className="font-inter text-neutral-700 leading-relaxed">
                Nous utilisons des outils d'analyse pour comprendre comment les visiteurs utilisent notre site. 
                Ces données sont anonymisées et utilisées uniquement pour améliorer l'expérience utilisateur 
                et le contenu de notre site.
              </p>
            </div>
          </div>

          {/* Durées de stockage */}
          <div className="mb-16">
            <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6">
              Durées de stockage de vos données
            </h2>
            <div className="bg-neutral-50 rounded-2xl p-6">
              <p className="font-inter text-neutral-700 leading-relaxed mb-4">
                Si vous laissez un commentaire, le commentaire et ses métadonnées sont conservés indéfiniment. 
                Cela permet de reconnaître et approuver automatiquement les commentaires suivants au lieu de 
                les laisser dans la file de modération.
              </p>
              <p className="font-inter text-neutral-700 leading-relaxed">
                Pour les utilisateurs et utilisatrices qui s'enregistrent sur notre site (si cela est possible), 
                nous stockons également les données personnelles indiquées dans leur profil. Tous les utilisateurs 
                et utilisatrices peuvent voir, modifier ou supprimer leurs informations personnelles à tout moment 
                (à l'exception de leur nom d'utilisateur·ice). Les gestionnaires du site peuvent aussi voir et 
                modifier ces informations.
              </p>
            </div>
          </div>

          {/* Droits sur vos données */}
          <div className="mb-16">
            <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6">
              Les droits que vous avez sur vos données
            </h2>
            <div className="bg-neutral-50 rounded-2xl p-6">
              <p className="font-inter text-neutral-700 leading-relaxed">
                Si vous avez un compte ou si vous avez laissé des commentaires sur le site, vous pouvez demander 
                à recevoir un fichier contenant toutes les données personnelles que nous possédons à votre sujet, 
                incluant celles que vous nous avez fournies. Vous pouvez également demander la suppression des 
                données personnelles vous concernant. Cela ne prend pas en compte les données stockées à des fins 
                administratives, légales ou pour des raisons de sécurité.
              </p>
            </div>
          </div>

          {/* Transmission des données */}
          <div className="mb-16">
            <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6">
              Transmission de vos données personnelles
            </h2>
            <div className="bg-neutral-50 rounded-2xl p-6">
              <p className="font-inter text-neutral-700 leading-relaxed">
                Les commentaires des visiteurs peuvent être vérifiés à l'aide d'un service automatisé de 
                détection des commentaires indésirables.
              </p>
            </div>
          </div>

          {/* Protection des données */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <Lock className="w-8 h-8 text-primary-600 mr-4" />
              <h2 className="font-playfair text-3xl font-bold text-neutral-800">
                Comment nous protégeons vos données
              </h2>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-6">
              <p className="font-inter text-neutral-700 leading-relaxed">
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles 
                contre l'accès non autorisé, la modification, la divulgation ou la destruction. Nos serveurs 
                sont sécurisés et nous utilisons des protocoles de chiffrement pour protéger la transmission 
                de vos données.
              </p>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="mb-16">
            <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6">
              Informations de contact
            </h2>
            <div className="bg-primary-50 rounded-2xl p-6">
              <p className="font-inter text-neutral-700 leading-relaxed mb-4">
                Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits 
                sur vos données personnelles, vous pouvez nous contacter :
              </p>
              <div className="space-y-2 font-inter text-neutral-700">
                <p><strong>Docteure Jocelyne Fassotte</strong></p>
                <p>Email : doc.jofassotte@proximus.be</p>
                <p>Téléphone : +32 495 28 09 76</p>
                <p>Adresse : Rue Edouard Sarlet 31, 4051 Vaux-sous-Chèvremont, Liège, Belgique</p>
              </div>
            </div>
          </div>

          {/* Modifications */}
          <div className="mb-16">
            <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6">
              Modifications de cette politique
            </h2>
            <div className="bg-neutral-50 rounded-2xl p-6">
              <p className="font-inter text-neutral-700 leading-relaxed">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                Les modifications seront publiées sur cette page avec la date de dernière mise à jour. 
                Nous vous encourageons à consulter régulièrement cette page pour rester informé de nos 
                pratiques en matière de protection des données.
              </p>
              <p className="font-inter text-sm text-neutral-600 mt-4">
                <strong>Dernière mise à jour :</strong> Janvier 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
            Des questions sur vos données ?
          </h2>
          <p className="font-inter text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            N'hésitez pas à nous contacter si vous avez des questions concernant 
            cette politique de confidentialité ou vos droits sur vos données personnelles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-gradient-primary text-white px-8 py-4 rounded-full font-inter font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Nous contacter
            </Link>
            <a
              href="mailto:doc.jofassotte@proximus.be"
              className="border-2 border-primary-400 text-primary-600 px-8 py-4 rounded-full font-inter font-semibold hover:bg-primary-50 transition-all duration-300"
            >
              Envoyer un email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;