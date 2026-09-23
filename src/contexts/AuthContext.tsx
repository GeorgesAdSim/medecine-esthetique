import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  name: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (action: 'read' | 'write' | 'admin') => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier la session Supabase au chargement
  useEffect(() => {
    checkSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUserData(session.user.email!);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await loadUserData(session.user.email!);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de la session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserData = async (email: string) => {
    try {
      const { data: adminData, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;

      if (adminData) {
        setUser({
          id: adminData.id,
          email: adminData.email,
          role: adminData.role === 'super_admin' ? 'admin' : adminData.role,
          name: adminData.name,
          lastLogin: adminData.last_login
        });

        // Update last login
        await supabase
          .from('admin_users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', adminData.id);
      } else {
        // Email not authorized
        await supabase.auth.signOut();
        setUser(null);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données utilisateur:', error);
      setUser(null);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        console.error('Erreur d\'authentification:', authError);
        setIsLoading(false);
        return false;
      }

      if (authData.user) {
        // Check if user is in admin_users table
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', authData.user.email)
          .eq('is_active', true)
          .maybeSingle();

        if (adminError) {
          console.error('Erreur lors de la vérification admin:', adminError);
          await supabase.auth.signOut();
          setIsLoading(false);
          return false;
        }

        if (!adminData) {
          // User authenticated but not authorized as admin
          await supabase.auth.signOut();
          setIsLoading(false);
          return false;
        }

        // User is authenticated and authorized
        setUser({
          id: adminData.id,
          email: adminData.email,
          role: adminData.role === 'super_admin' ? 'admin' : adminData.role,
          name: adminData.name,
          lastLogin: new Date().toISOString()
        });

        // Update last login
        await supabase
          .from('admin_users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', adminData.id);

        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const hasPermission = (action: 'read' | 'write' | 'admin'): boolean => {
    if (!user) return false;
    
    switch (action) {
      case 'read':
        return ['admin', 'editor', 'viewer'].includes(user.role);
      case 'write':
        return ['admin', 'editor'].includes(user.role);
      case 'admin':
        return user.role === 'admin';
      default:
        return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      hasPermission,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};