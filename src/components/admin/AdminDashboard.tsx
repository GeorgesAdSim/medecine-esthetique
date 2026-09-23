import React, { useState } from 'react';
import { Settings, Palette, Menu as MenuIcon, FileText, LogOut, X, Image, Syringe } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ColorThemeManager from './ColorThemeManager';
import MenuEditor from './MenuEditor';
import PageManager from './PageManager';
import GalleryImageManager from './GalleryImageManager';
import TreatmentManager from './TreatmentManager';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<'colors' | 'menu' | 'pages' | 'treatments' | 'gallery'>('colors');
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: 'colors', label: 'Couleurs', icon: Palette },
    { id: 'menu', label: 'Menu', icon: MenuIcon },
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'treatments', label: 'Traitements', icon: Syringe },
    { id: 'gallery', label: 'Galerie Photos', icon: Image }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-xl hover:bg-primary-700 transition-all hover:scale-110 z-50"
        title="Panneau d'administration"
      >
        <Settings className="w-6 h-6" />
      </button>

      <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="font-medium">{user?.name}</span>
        </div>
        <button
          onClick={logout}
          className="hover:bg-green-600 rounded p-1 transition-colors"
          title="Déconnexion"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 w-full md:w-3/4 lg:w-2/3 bg-white shadow-2xl z-50 overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Panneau d'Administration</h2>
                  <p className="text-primary-100 mt-1">Gérez votre site web</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex space-x-2">
                {sections.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      activeSection === id
                        ? 'bg-white text-primary-600 shadow-lg'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {activeSection === 'colors' && <ColorThemeManager />}
              {activeSection === 'menu' && <MenuEditor />}
              {activeSection === 'pages' && <PageManager />}
              {activeSection === 'treatments' && <TreatmentManager />}
              {activeSection === 'gallery' && <GalleryImageManager />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminDashboard;
