import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import { useAdmin } from './contexts/AdminContext';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminDashboard from './components/admin/AdminDashboard';
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
import DynamicPage from './pages/DynamicPage';
import DynamicTreatmentPage from './pages/DynamicTreatmentPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SetupPasswords from './pages/SetupPasswords';
import EditTreatmentPage from './pages/admin/EditTreatmentPage';
import CookieBanner from './components/CookieBanner';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin/');

  return (
    <>
      {!isAdminRoute && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup-admin" element={<SetupPasswords />} />
          <Route
            path="/admin/treatments/:id/edit"
            element={
              <ProtectedRoute>
                <EditTreatmentPage />
              </ProtectedRoute>
            }
          />
      <Route path="/docteur-jocelyne-fassotte" element={<DynamicPage />} />
      <Route path="/traitements" element={<DynamicPage />} />
      <Route path="/medecine-esthetique-liege" element={<DynamicPage />} />
      <Route path="/acide-hyaluronique-liege" element={<DynamicTreatmentPage />} />
      <Route path="/botox-liege" element={<DynamicTreatmentPage />} />
      <Route path="/toxine-botulique-liege" element={<DynamicTreatmentPage />} />
      <Route path="/stimulateurs-collagene" element={<DynamicTreatmentPage />} />
      <Route path="/stimulateurs-collagene-liege" element={<DynamicTreatmentPage />} />
      <Route path="/peeling-liege" element={<DynamicTreatmentPage />} />
      <Route path="/peelings-chimiques-liege" element={<DynamicTreatmentPage />} />
      <Route path="/mesolift-liege" element={<DynamicTreatmentPage />} />
      <Route path="/mesotherapie-liege" element={<DynamicTreatmentPage />} />
      <Route path="/fils-tenseurs-liege" element={<DynamicTreatmentPage />} />
      <Route path="/lifting-fils-tenseurs-liege" element={<DynamicTreatmentPage />} />
      <Route path="/cosmetologie-liege" element={<DynamicTreatmentPage />} />
      <Route path="/cosmetologie-medicale-liege" element={<DynamicTreatmentPage />} />
      <Route path="/liquid-lift-liege" element={<DynamicTreatmentPage />} />
      <Route path="/rajeunissement-global-liege" element={<DynamicTreatmentPage />} />
      <Route path="/contact" element={<DynamicPage />} />
      <Route path="/prendre-rendez-vous" element={<DynamicPage />} />
      <Route path="/consultation-medecine-esthetique-liege" element={<DynamicPage />} />
      <Route path="/galerie" element={<DynamicPage />} />
      <Route path="/galerie-photos-avant-apres" element={<DynamicPage />} />
      <Route path="/resultats-medecine-esthetique" element={<DynamicPage />} />
      <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
      <Route path="/protection-donnees-medicales" element={<PrivacyPolicy />} />
      
      {/* Redirections pour compatibilité */}
      <Route path="/biographie" element={<Navigate to="/docteur-jocelyne-fassotte" replace />} />
      <Route path="/a-propos" element={<Navigate to="/docteur-jocelyne-fassotte" replace />} />
      <Route path="/services" element={<Navigate to="/traitements" replace />} />
      <Route path="/soins" element={<Navigate to="/traitements" replace />} />

          {/* Catch-all route for custom pages from Supabase */}
          <Route path="/:slug" element={<DynamicPage />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
};

const AdminComponent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = React.useState(false);
  const [keySequence, setKeySequence] = React.useState('');

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setKeySequence((prev) => {
        const newSequence = (prev + e.key).slice(-5);
        if (newSequence === 'admin') {
          setShowLogin(true);
          return '';
        }
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isAuthenticated) {
    return showLogin ? <LoginForm onClose={() => setShowLogin(false)} /> : null;
  }

  return <AdminDashboard />;
};

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <AdminProvider>
          <SiteSettingsProvider>
            <Router>
              <ScrollToTop />
              <div className="min-h-screen bg-white">
                <AppRoutes />
                <AdminComponent />
                <CookieBanner />
              </div>
            </Router>
          </SiteSettingsProvider>
        </AdminProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;