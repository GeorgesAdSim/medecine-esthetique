import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Lock, User, Eye, EyeOff, Shield, AlertCircle, UserPlus } from 'lucide-react';
import AdminRegistration from './AdminRegistration';

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (attempts >= 3) {
      setError('Trop de tentatives. Veuillez attendre 5 minutes.');
      return;
    }

    const success = await login(formData.email, formData.password);
    
    if (success) {
      onClose();
      setAttempts(0);
    } else {
      setAttempts(prev => prev + 1);
      setError('Email ou mot de passe incorrect');
      
      // Réinitialiser le formulaire après 3 tentatives
      if (attempts >= 2) {
        setTimeout(() => {
          setAttempts(0);
          setError('');
        }, 5 * 60 * 1000); // 5 minutes
      }
    }
  };

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Effacer l'erreur quand l'utilisateur tape
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-primary text-white p-6 text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Administration</h2>
          <p className="text-red-100">Accès sécurisé au panneau d'administration</p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="votre@email.com"
                  disabled={isLoading || attempts >= 3}
                />
              </div>
            </div>

            {/* Password */}
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
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="••••••••"
                  disabled={isLoading || attempts >= 3}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading || attempts >= 3}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                  {attempts > 0 && attempts < 3 && (
                    <p className="text-red-600 text-xs mt-1">
                      Tentative {attempts}/3
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || attempts >= 3 || !formData.email || !formData.password}
              className="w-full bg-gradient-primary text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Connexion...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Se connecter</span>
                </>
              )}
            </button>
          </form>

          {/* Registration Link */}
          <div className="mt-6">
            <button
              onClick={() => setShowRegistration(true)}
              className="w-full p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <UserPlus className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-blue-900">Premier compte ?</h4>
                    <p className="text-blue-700 text-sm">Créez votre compte administrateur</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>

          {/* Help */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Accès autorisé</h4>
            <p className="text-gray-700 text-sm">
              Seules 3 adresses email autorisées peuvent créer un compte administrateur.
            </p>
          </div>

          {/* Cancel */}
          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 text-sm underline transition-colors"
            >
              Retour au site
            </button>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistration && (
        <AdminRegistration
          onClose={() => setShowRegistration(false)}
          onSuccess={() => {
            setShowRegistration(false);
            onClose();
          }}
        />
      )}
    </div>
  );
};

export default LoginForm;