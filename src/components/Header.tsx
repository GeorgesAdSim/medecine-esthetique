import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import EditableText from './EditableText';
import { useAdmin } from '../contexts/AdminContext';
import { supabase } from '../lib/supabase';

interface MenuItem {
  id: string;
  name: string;
  href: string;
  parent_id?: string | null;
  order_index: number;
  is_visible: boolean;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navigation, setNavigation] = useState<MenuItem[]>([]);
  const location = useLocation();
  const { customization } = useAdmin();

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_visible', true)
        .is('parent_id', null)
        .order('order_index');

      if (error) throw error;

      if (data) {
        setNavigation(data);
      }
    } catch (error) {
      console.error('Error loading menu items:', error);
      setNavigation([
        { id: '1', name: 'Accueil', href: '/', order_index: 0, is_visible: true },
        { id: '2', name: 'À propos', href: '/docteur-jocelyne-fassotte', order_index: 1, is_visible: true },
        { id: '3', name: 'Traitements', href: '/medecine-esthetique-liege', order_index: 2, is_visible: true },
        { id: '4', name: 'Galerie', href: '/galerie', order_index: 3, is_visible: true },
        { id: '5', name: 'Contact', href: '/prendre-rendez-vous', order_index: 4, is_visible: true },
      ]);
    }
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <EditableText
                textKey="logo.initials"
                defaultText="JF"
                as="span"
                className="text-white font-playfair font-bold text-xl"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-playfair font-bold text-xl text-neutral-800 group-hover:text-primary-600 transition-colors">
                Docteure Jocelyne Fassotte
              </h1>
              <p className="font-inter text-sm text-neutral-600">
                Médecine esthétique
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-inter font-medium text-sm px-3 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
                  isActive(item.href)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <a
              href="tel:+32495280976"
              className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 transition-colors font-inter font-medium text-sm whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span>+32 495 28 09 76</span>
            </a>
            <Link
              to="/prendre-rendez-vous"
              className="bg-gradient-primary text-white px-4 xl:px-6 py-2 xl:py-3 rounded-full font-inter font-semibold text-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
            >
              Rendez-vous
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-neutral-100 bg-white/95 backdrop-blur-md">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-inter font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-neutral-100 space-y-3">
                <a
                  href="tel:+32495280976"
                  className="flex items-center space-x-3 px-4 py-3 text-neutral-700 hover:text-primary-600 transition-colors font-inter font-medium"
                >
                  <Phone className="w-5 h-5" />
                  <span>+32 495 28 09 76</span>
                </a>
                <Link
                  to="/prendre-rendez-vous"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-gradient-primary text-white px-6 py-3 rounded-full font-inter font-semibold text-center hover:shadow-lg transition-all duration-300"
                >
                  Prendre rendez-vous
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;