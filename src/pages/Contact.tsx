import React from 'react';
import { Mail, Phone, MapPin, Clock, Calendar } from 'lucide-react';
import AppointmentCalendar from '../components/AppointmentCalendar';
import FloralDecoration from '../components/FloralDecoration';

const Contact: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-32 pb-16">
        <FloralDecoration position="top-center" size="large" opacity={0.07} variant="shell" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-5xl font-bold text-neutral-800 mb-6">
            Prendre Rendez-vous - Médecine Esthétique Liège
          </h1>
          <p className="font-inter text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Contactez la Dre Jocelyne Fassotte pour une consultation personnalisée
            en médecine esthétique à Liège.
          </p>
        </div>
      </section>

      {/* Appointment Calendar */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-neutral-800 mb-6">
              Réserver votre consultation
            </h2>
            <p className="font-inter text-lg text-neutral-600 max-w-2xl mx-auto">
              Choisissez le type de consultation et la date qui vous conviennent. 
              Votre demande sera traitée dans les plus brefs délais.
            </p>
          </div>
          
          <AppointmentCalendar />
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                Téléphone
              </h3>
              <a
                href="tel:+32495280976"
                className="font-inter text-lg text-primary-600 hover:text-primary-700 transition-colors"
              >
                +32 495 28 09 76
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                Email
              </h3>
              <a 
                href="mailto:doc.jofassotte@proximus.be"
                className="font-inter text-lg text-primary-600 hover:text-primary-700 transition-colors"
              >
                doc.jofassotte@proximus.be
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                Adresse
              </h3>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Rue+Edouard+Sarlet+31,+4051+Vaux-sous-Chèvremont,+Liège,+Belgique"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-lg text-primary-600 hover:text-primary-700 transition-colors space-y-1 block"
              >
                <p>Rue Edouard Sarlet 31</p>
                <p>4051 Vaux-sous-Chèvremont</p>
                <p>Liège, Belgique</p>
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-3">
                Localisation
              </h3>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Rue+Edouard+Sarlet+31,+4051+Vaux-sous-Chèvremont,+Liège,+Belgique"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-lg text-primary-600 hover:text-primary-700 transition-colors underline"
              >
                Voir sur Google Maps
              </a>
            </div>
          </div>

          {/* Map Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-4">
                Nous trouver
              </h2>
              <p className="font-inter text-lg text-neutral-600">
                Cabinet situé à Vaux-sous-Chèvremont, proche de Liège
              </p>
            </div>
            
            <div className="bg-neutral-100 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.8!2d5.6!3d50.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c0f7a5a5a5a5a5%3A0x5a5a5a5a5a5a5a5a!2sRue%20Edouard%20Sarlet%2031%2C%204051%20Vaux-sous-Ch%C3%A8vremont%2C%20Belgium!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cabinet Docteure Jocelyne Fassotte - Rue Edouard Sarlet 31, 4051 Vaux-sous-Chèvremont, Liège"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6">
              Horaires de consultation
            </h2>
          </div>
          
          <div className="bg-neutral-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-primary-500 mr-3" />
                  <h3 className="font-playfair font-semibold text-xl text-neutral-800">
                    Horaires d'ouverture
                  </h3>
                </div>
                <div className="space-y-2 font-inter text-neutral-700">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span>9h00 - 17h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span>Sur rendez-vous</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span>Fermé</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-primary-500 mr-3" />
                  <h3 className="font-playfair font-semibold text-xl text-neutral-800">
                    Informations pratiques
                  </h3>
                </div>
                <div className="space-y-2 font-inter text-neutral-700">
                  <p>• Consultation sur rendez-vous uniquement</p>
                  <p>• Première consultation : 30 minutes</p>
                  <p>• Traitements : durée variable</p>
                  <p>• Possibilité de consultation le samedi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6">
            Contact d'urgence
          </h2>
          <p className="font-inter text-lg text-neutral-600 mb-8">
            En cas de problème suite à un traitement, n'hésitez pas à nous contacter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+32495280976"
              className="bg-gradient-primary text-white px-8 py-4 rounded-full font-inter font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Appeler maintenant
            </a>
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

export default Contact;