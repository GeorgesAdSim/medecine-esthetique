import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import DynamicPage from './pages/DynamicPage';
import NotFound from './pages/NotFound';
import { ALIAS, PAGES_FIXES, cheminsTraitementsPublies } from './contenu/routes';
import DynamicTreatmentPage from './pages/DynamicTreatmentPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookieBanner from './components/CookieBanner';
import TeteDePage from './seo/TeteDePage';

// Administration : chargée à la demande, hors du JavaScript des pages publiques
// (PageSpeed du 28/09/2026 : 118 Kio de JS inutilisé à l'accueil).
const AdminDashboard = React.lazy(() => import('./components/admin/AdminDashboard'));
const LoginForm = React.lazy(() => import('./components/LoginForm'));
const SetupPasswords = React.lazy(() => import('./pages/SetupPasswords'));
const EditTreatmentPage = React.lazy(() => import('./pages/admin/EditTreatmentPage'));

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
          <Route path="/setup-admin" element={<React.Suspense fallback={null}><SetupPasswords /></React.Suspense>} />
          <Route
            path="/admin/treatments/:id/edit"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={null}>
                  <EditTreatmentPage />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          {Object.keys(PAGES_FIXES).filter((c) => c !== '/').map((c) => (
            <Route key={c} path={c} element={<DynamicPage />} />
          ))}
          {cheminsTraitementsPublies().map((c) => (
            <Route key={c} path={c} element={<DynamicTreatmentPage />} />
          ))}
          <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
          {Object.entries(ALIAS).map(([de, vers]) => (
            <Route key={de} path={de} element={<Navigate to={vers} replace />} />
          ))}
          {/* Pages publiées depuis l'admin (/{slug}) ; inconnue → 404 */}
          <Route path="/:slug" element={<DynamicPage />} />
          <Route path="*" element={<NotFound />} />
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
    return showLogin ? (
      <React.Suspense fallback={null}>
        <LoginForm onClose={() => setShowLogin(false)} />
      </React.Suspense>
    ) : null;
  }

  return (
    <React.Suspense fallback={null}>
      <AdminDashboard />
    </React.Suspense>
  );
};

/** Langue du document ; le reste du <head> vient de TeteDePage. */
const TeteParDefaut: React.FC = () => (
  <Helmet>
    <html lang="fr" />
  </Helmet>
);

/**
 * L'application sans routeur ni HelmetProvider : le navigateur l'enveloppe
 * dans BrowserRouter (main.tsx), le pré-rendu dans StaticRouter
 * (entry-server.tsx).
 */
function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <SiteSettingsProvider>
          <TeteParDefaut />
          <ScrollToTop />
          <TeteDePage />
          <div className="min-h-screen bg-white">
            <AppRoutes />
            <AdminComponent />
            <CookieBanner />
          </div>
        </SiteSettingsProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
