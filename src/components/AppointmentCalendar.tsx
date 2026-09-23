import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format, addDays, isWeekend, isBefore, startOfDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Clock, User, Mail, Phone, MessageSquare, Send, Calendar as CalendarIcon, CheckCircle, AlertCircle } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

interface AppointmentData {
  type: 'consultation' | 'treatment';
  date: Date;
  time: string;
  services: string[];
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
  };
}

const AppointmentCalendar: React.FC = () => {
  const [step, setStep] = useState<'type' | 'date' | 'time' | 'services' | 'info' | 'confirmation'>('type');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    type: 'consultation',
    date: new Date(),
    time: '',
    services: [],
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  const availableServices = [
    'Acide hyaluronique',
    'Toxine botulique (Botox)',
    'Fils tenseurs',
    'Peelings médicaux',
    'Mésolift',
    'Skinboosters',
    'Cosmétologie médicale',
    'Stimulateurs de collagène'
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const isDateAvailable = (date: Date) => {
    const today = startOfDay(new Date());

    const unavailableDates = [
      new Date(2025, 9, 7),
      new Date(2025, 9, 8),
      new Date(2025, 9, 9),
      new Date(2025, 9, 10),
      new Date(2025, 9, 13)
    ];

    const isUnavailable = unavailableDates.some(unavailableDate =>
      startOfDay(date).getTime() === startOfDay(unavailableDate).getTime()
    );

    return !isBefore(date, today) && !isWeekend(date) && !isUnavailable;
  };

  const handleServiceToggle = (service: string) => {
    setAppointmentData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handlePersonalInfoChange = (field: keyof AppointmentData['personalInfo'], value: string) => {
    setAppointmentData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formattedDate = format(appointmentData.date, 'EEEE dd MMMM yyyy', { locale: fr });

      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d4a574 0%, #c49563 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .section { margin: 20px 0; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #d4a574; }
            .label { font-weight: bold; color: #c49563; margin-bottom: 5px; }
            .value { color: #333; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nouvelle Demande de Rendez-vous</h1>
            </div>
            <div class="content">
              <div class="section">
                <div class="label">Type de rendez-vous</div>
                <div class="value">${appointmentData.type === 'consultation' ? 'Consultation' : 'Traitement'}</div>
              </div>

              <div class="section">
                <div class="label">Date souhaitée</div>
                <div class="value">${formattedDate}</div>
              </div>

              <div class="section">
                <div class="label">Heure souhaitée</div>
                <div class="value">${appointmentData.time}</div>
              </div>

              ${appointmentData.services.length > 0 ? `
              <div class="section">
                <div class="label">Services demandés</div>
                <div class="value">${appointmentData.services.join(', ')}</div>
              </div>
              ` : ''}

              <div class="section">
                <div class="label">Informations du patient</div>
                <div class="value">
                  <strong>Nom:</strong> ${appointmentData.personalInfo.firstName} ${appointmentData.personalInfo.lastName}<br>
                  <strong>Email:</strong> ${appointmentData.personalInfo.email}<br>
                  <strong>Téléphone:</strong> ${appointmentData.personalInfo.phone}
                </div>
              </div>

              ${appointmentData.personalInfo.message ? `
              <div class="section">
                <div class="label">Message</div>
                <div class="value">${appointmentData.personalInfo.message}</div>
              </div>
              ` : ''}
            </div>
          </div>
        </body>
        </html>
      `;

      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': import.meta.env.VITE_BREVO_API_KEY || ''
        },
        body: JSON.stringify({
          sender: {
            name: 'Site Web Cabinet Fassotte',
            email: 'jocelynefassotte5@gmail.com'
          },
          to: [
            {
              email: 'doc.jofassotte@proximus.be',
              name: 'Dre Jocelyne Fassotte'
            },
            {
              email: 'valeriematrige@gmail.com',
              name: 'Valérie Matrige'
            }
          ],
          subject: `Nouvelle demande de rendez-vous - ${appointmentData.personalInfo.firstName} ${appointmentData.personalInfo.lastName}`,
          htmlContent: emailHtml
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Erreur lors de l\'envoi de l\'email');
      }

      setStep('confirmation');
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setSubmitError('Une erreur est survenue. Veuillez réessayer ou nous contacter directement par téléphone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep('type');
    setAppointmentData({
      type: 'consultation',
      date: new Date(),
      time: '',
      services: [],
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {['Type', 'Date', 'Heure', appointmentData.type === 'treatment' ? 'Services' : 'Info', 'Informations', 'Confirmation'].map((stepName, index) => {
            const stepKeys = ['type', 'date', 'time', appointmentData.type === 'treatment' ? 'services' : 'info', 'info', 'confirmation'];
            const currentIndex = stepKeys.indexOf(step);
            const isActive = index <= currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
              <div key={stepName} className={`flex items-center ${index < 5 ? 'flex-1' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  isCurrent ? 'bg-primary-500 text-white' : 
                  isActive ? 'bg-primary-200 text-primary-700' : 'bg-neutral-200 text-neutral-500'
                }`}>
                  {index + 1}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  isCurrent ? 'text-primary-600' : 
                  isActive ? 'text-neutral-700' : 'text-neutral-400'
                }`}>
                  {stepName}
                </span>
                {index < 5 && <div className={`flex-1 h-0.5 mx-4 ${isActive ? 'bg-primary-200' : 'bg-neutral-200'}`} />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Step 1: Type Selection */}
        {step === 'type' && (
          <div className="text-center">
            <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6">
              Type de rendez-vous
            </h2>
            <p className="font-inter text-neutral-600 mb-8">
              Choisissez le type de consultation qui vous convient
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <button
                onClick={() => {
                  setAppointmentData(prev => ({ ...prev, type: 'consultation' }));
                  setStep('date');
                }}
                className="p-6 border-2 border-primary-200 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all duration-300 text-left"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-2">
                  Première consultation
                </h3>
                <p className="font-inter text-neutral-600 mb-3">
                  Diagnostic personnalisé et conseils adaptés à vos besoins
                </p>
                <div className="flex items-center text-primary-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-inter text-sm font-medium">30 minutes</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setAppointmentData(prev => ({ ...prev, type: 'treatment' }));
                  setStep('date');
                }}
                className="p-6 border-2 border-primary-200 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all duration-300 text-left"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-2">
                  Traitement spécifique
                </h3>
                <p className="font-inter text-neutral-600 mb-3">
                  Rendez-vous pour un ou plusieurs soins esthétiques
                </p>
                <div className="flex items-center text-primary-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-inter text-sm font-medium">Variable selon traitement</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date Selection */}
        {step === 'date' && (
          <div>
            <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6 text-center">
              Choisissez une date
            </h2>
            <div className="flex justify-center mb-6">
              <div className="appointment-calendar">
                <Calendar
                  onChange={(date) => {
                    setAppointmentData(prev => ({ ...prev, date: date as Date }));
                    setStep('time');
                  }}
                  value={appointmentData.date}
                  tileDisabled={({ date }) => !isDateAvailable(date)}
                  locale="fr-FR"
                  minDate={new Date()}
                  maxDate={addDays(new Date(), 90)}
                />
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={() => setStep('type')}
                className="border-2 border-primary-400 text-primary-600 px-6 py-2 rounded-full font-inter font-semibold hover:bg-primary-50 transition-all duration-300"
              >
                Retour
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Time Selection */}
        {step === 'time' && (
          <div>
            <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6 text-center">
              Choisissez un horaire
            </h2>
            <p className="font-inter text-neutral-600 mb-6 text-center">
              {format(appointmentData.date, 'EEEE dd MMMM yyyy', { locale: fr })}
            </p>
            
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-w-2xl mx-auto mb-6">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    setAppointmentData(prev => ({ ...prev, time }));
                    setStep(appointmentData.type === 'treatment' ? 'services' : 'info');
                  }}
                  className="p-3 border-2 border-primary-200 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all duration-300 font-inter font-medium"
                >
                  {time}
                </button>
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={() => setStep('date')}
                className="border-2 border-primary-400 text-primary-600 px-6 py-2 rounded-full font-inter font-semibold hover:bg-primary-50 transition-all duration-300"
              >
                Retour
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Services Selection (only for treatment type) */}
        {step === 'services' && appointmentData.type === 'treatment' && (
          <div>
            <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6 text-center">
              Services souhaités
            </h2>
            <p className="font-inter text-neutral-600 mb-6 text-center">
              Sélectionnez un ou plusieurs traitements qui vous intéressent
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-6">
              {availableServices.map((service) => (
                <label
                  key={service}
                  className="flex items-center p-4 border-2 border-neutral-200 rounded-lg hover:border-primary-300 cursor-pointer transition-all duration-300"
                >
                  <input
                    type="checkbox"
                    checked={appointmentData.services.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    className="w-5 h-5 text-primary-500 border-2 border-neutral-300 rounded focus:ring-primary-400"
                  />
                  <span className="ml-3 font-inter text-neutral-700">{service}</span>
                </label>
              ))}
            </div>
            
            <div className="text-center space-x-4">
              <button
                onClick={() => setStep('time')}
                className="border-2 border-primary-400 text-primary-600 px-6 py-2 rounded-full font-inter font-semibold hover:bg-primary-50 transition-all duration-300"
              >
                Retour
              </button>
              <button
                onClick={() => setStep('info')}
                disabled={appointmentData.services.length === 0}
                className="bg-gradient-primary text-white px-6 py-2 rounded-full font-inter font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Personal Information */}
        {step === 'info' && (
          <div>
            <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6 text-center">
              Vos informations
            </h2>
            
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-inter font-medium text-neutral-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={appointmentData.personalInfo.firstName}
                    onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg font-inter focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label className="block font-inter font-medium text-neutral-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    required
                    value={appointmentData.personalInfo.lastName}
                    onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg font-inter focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
              </div>
              
              <div>
                <label className="block font-inter font-medium text-neutral-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={appointmentData.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg font-inter focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors"
                  placeholder="votre@email.com"
                />
              </div>
              
              <div>
                <label className="block font-inter font-medium text-neutral-700 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  required
                  value={appointmentData.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg font-inter focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors"
                  placeholder="+32 4XX XX XX XX"
                />
              </div>
              
              <div>
                <label className="block font-inter font-medium text-neutral-700 mb-2">
                  Message (optionnel)
                </label>
                <textarea
                  rows={4}
                  value={appointmentData.personalInfo.message}
                  onChange={(e) => handlePersonalInfoChange('message', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg font-inter focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors resize-vertical"
                  placeholder="Informations complémentaires, questions particulières..."
                />
              </div>
            </div>
            
            {submitError && (
              <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-inter text-red-800 font-medium">Erreur d'envoi</p>
                  <p className="font-inter text-red-700 text-sm mt-1">{submitError}</p>
                </div>
              </div>
            )}

            <div className="text-center mt-8 space-x-4">
              <button
                onClick={() => setStep(appointmentData.type === 'treatment' ? 'services' : 'time')}
                className="border-2 border-primary-400 text-primary-600 px-6 py-2 rounded-full font-inter font-semibold hover:bg-primary-50 transition-all duration-300"
                disabled={isSubmitting}
              >
                Retour
              </button>
              <button
                onClick={handleSubmit}
                disabled={!appointmentData.personalInfo.firstName || !appointmentData.personalInfo.lastName || !appointmentData.personalInfo.email || !appointmentData.personalInfo.phone || isSubmitting}
                className="bg-gradient-primary text-white px-8 py-3 rounded-full font-inter font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Envoyer la demande</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Confirmation */}
        {step === 'confirmation' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6">
              Demande envoyée !
            </h2>
            <p className="font-inter text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              Votre demande de rendez-vous a été transmise à la Docteure Fassotte. 
              Vous recevrez une confirmation par email ou téléphone dans les plus brefs délais.
            </p>
            
            <div className="bg-neutral-50 rounded-xl p-6 max-w-2xl mx-auto mb-8">
              <h3 className="font-playfair font-semibold text-xl text-neutral-800 mb-4">
                Récapitulatif de votre demande
              </h3>
              <div className="space-y-2 font-inter text-neutral-700">
                <p><strong>Type :</strong> {appointmentData.type === 'consultation' ? 'Première consultation' : 'Traitement'}</p>
                <p><strong>Date :</strong> {format(appointmentData.date, 'EEEE dd MMMM yyyy', { locale: fr })}</p>
                <p><strong>Heure :</strong> {appointmentData.time}</p>
                {appointmentData.type === 'treatment' && appointmentData.services.length > 0 && (
                  <p><strong>Services :</strong> {appointmentData.services.join(', ')}</p>
                )}
              </div>
            </div>
            
            <button
              onClick={resetForm}
              className="bg-gradient-primary text-white px-8 py-3 rounded-full font-inter font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Nouvelle demande
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCalendar;