import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminDashboard from './components/admin/AdminDashboard';
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
import DynamicPage from './pages/DynamicPage';
import NotFound from './pages/NotFound';
import { ALIAS, CHEMINS_TRAITEMENTS, PAGES_FIXES } from './contenu/routes';
import DynamicTreatmentPage from './pages/DynamicTreatmentPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SetupPasswords from './pages/SetupPasswords';
import EditTreatmentPage from './pages/admin/EditTreatmentPage';
import CookieBanner from './components/CookieBanner';
import CanonicalTags from './components/CanonicalTags';

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
          {Object.keys(PAGES_FIXES).filter((c) => c !== '/').map((c) => (
            <Route key={c} path={c} element={<DynamicPage />} />
          ))}
          {CHEMINS_TRAITEMENTS.map((c) => (
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
    return showLogin ? <LoginForm onClose={() => setShowLogin(false)} /> : null;
  }

  return <AdminDashboard />;
};

/** Titre et description par défaut, remplacés par ceux de chaque page. */
const TeteParDefaut: React.FC = () => (
  <Helmet>
    <html lang="fr" />
    <title>Docteure Jocelyne Fassotte - Médecine Esthétique Liège | Spécialiste Anti-Âge</title>
    <meta
      name="description"
      content="Docteure Jocelyne Fassotte - Spécialiste médecine esthétique Liège. Acide hyaluronique, Botox, peelings, fils tenseurs. Cabinet Vaux-sous-Chèvremont."
    />
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
          <CanonicalTags />
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
