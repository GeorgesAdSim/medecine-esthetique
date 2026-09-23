import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Mail, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const SetupPasswords: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const adminEmails = [
    'valeriematrige@gmail.com',
    'valerie@fassotte.be',
    'valerie@adsim.fr',
    'doc.jofassotte@proximus.be'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!adminEmails.includes(email)) {
      setError('Cet email n\'est pas autorisé comme admin');
      return;
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);

    try {
      const { data: existingUser, error: checkError } = await supabase.auth.admin.listUsers();

      if (checkError) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              email_confirmed: true
            }
          }
        });

        if (signUpError) {
          throw signUpError;
        }

        if (data.user) {
          setSuccess(true);
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        }
      } else {
        const userExists = existingUser?.users?.some(u => u.email === email);

        if (userExists) {
          setError('Ce compte existe déjà. Utilisez la fonction "Mot de passe oublié" pour le réinitialiser.');
        } else {
          const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: window.location.origin
            }
          });

          if (signUpError) {
            throw signUpError;
          }

          if (data.user) {
            setSuccess(true);
            setEmail('');
            setPassword('');
            setConfirmPassword('');
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création du compte');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-rose-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Configuration Admin
            </h2>
            <p className="text-gray-600">
              Créez votre mot de passe pour accéder à l'administration
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-green-800 font-medium">Compte créé avec succès!</p>
                <p className="text-green-700 text-sm mt-1">
                  Vous pouvez maintenant vous connecter avec vos identifiants.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email administrateur
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                >
                  <option value="">Sélectionnez votre email</option>
                  {adminEmails.map((adminEmail) => (
                    <option key={adminEmail} value={adminEmail}>
                      {adminEmail}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Minimum 8 caractères"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Retapez votre mot de passe"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Création en cours...' : 'Créer mon compte admin'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Déjà un compte?{' '}
              <a href="/" className="text-rose-600 hover:text-rose-700 font-medium">
                Retour au site
              </a>
            </p>
            <p className="text-center text-xs text-gray-500 mt-2">
              Tapez "admin" sur votre clavier pour vous connecter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupPasswords;
