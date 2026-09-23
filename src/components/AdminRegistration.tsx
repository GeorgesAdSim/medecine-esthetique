import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Shield, User, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

interface AdminRegistrationProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AUTHORIZED_EMAILS = [
  'doc.jofassotte@proximus.be',
  'valeriematrige@gmail.com',
  'valerie@fassotte.be'
];

const AdminRegistration: React.FC<AdminRegistrationProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [existingAdmins, setExistingAdmins] = useState<string[]>([]);
  const [availableEmails, setAvailableEmails] = useState<string[]>([]);

  useEffect(() => {
    checkExistingAdmins();
  }, []);

  const checkExistingAdmins = async () => {
    try {
      const { data: admins } = await supabase
        .from('admin_users')
        .select('email');

      const existingEmails = admins?.map(a => a.email) || [];
      setExistingAdmins(existingEmails);

      const available = AUTHORIZED_EMAILS.filter(email => !existingEmails.includes(email));
      setAvailableEmails(available);
    } catch (error) {
      console.error('Erreur lors de la vérification des admins:', error);
    }
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Le mot de passe doit contenir au moins une majuscule';
    }
    if (!/[a-z]/.test(password)) {
      return 'Le mot de passe doit contenir au moins une minuscule';
    }
    if (!/[0-9]/.test(password)) {
      return 'Le mot de passe doit contenir au moins un chiffre';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return 'Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*)';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!AUTHORIZED_EMAILS.includes(formData.email)) {
      setError('Cette adresse email n\'est pas autorisée');
      return;
    }

    if (existingAdmins.includes(formData.email)) {
      setError('Un compte existe déjà pour cette adresse email');
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (!formData.name.trim()) {
      setError('Le nom est requis');
      return;
    }

    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name
          }
        }
      });

      if (authError) {
        throw authError;
      }

      if (authData.user) {
        setSuccess(`Compte créé avec succès pour ${formData.email} !`);

        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription:', error);
      setError(error.message || 'Erreur lors de la création du compte');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  if (availableEmails.length === 0 && !isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tous les comptes sont créés
            </h2>
            <p className="text-gray-600 mb-6">
              Les 3 comptes administrateurs ont déjà été créés.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-gradient-primary text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Retour à la connexion
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full my-8">
        <div className="bg-gradient-primary text-white p-6 text-center rounded-t-2xl">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Création compte administrateur</h2>
          <p className="text-red-100">Configuration initiale sécurisée</p>
        </div>

        <div className="p-6">
          {availableEmails.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Emails autorisés restants</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {availableEmails.map(email => (
                  <li key={email} className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {email}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Votre nom complet"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email autorisée
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <select
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  disabled={isLoading}
                >
                  <option value="">Sélectionnez votre email</option>
                  {availableEmails.map(email => (
                    <option key={email} value={email}>{email}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Mot de passe sécurisé"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Min. 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Confirmez le mot de passe"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !formData.email || !formData.password || !formData.name}
              className="w-full bg-gradient-primary text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Création en cours...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Créer le compte administrateur</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Important</h4>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• Seules 3 adresses email sont autorisées</li>
              <li>• Utilisez un mot de passe très sécurisé</li>
              <li>• Conservez vos identifiants en lieu sûr</li>
            </ul>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 text-sm underline transition-colors"
            >
              Retour à la connexion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegistration;
