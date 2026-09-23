import React, { useState, useEffect } from 'react';
import { Palette, Save, RotateCcw } from 'lucide-react';
import { supabase, SiteSetting } from '../../lib/supabase';

const ColorThemeManager: React.FC = () => {
  const [colors, setColors] = useState({
    primary_color: '#dc2626',
    secondary_color: '#f87171',
    accent_color: '#fca5a5',
    background_color: '#ffffff',
    text_color: '#1f2937'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadColors();
  }, []);

  const loadColors = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('type', 'color');

      if (error) throw error;

      if (data) {
        const colorMap: any = {};
        data.forEach((setting: SiteSetting) => {
          colorMap[setting.key] = setting.value;
        });
        setColors(prev => ({ ...prev, ...colorMap }));
      }
    } catch (error) {
      console.error('Error loading colors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (key: string, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  const saveColors = async () => {
    setSaving(true);
    try {
      const updates = Object.entries(colors).map(([key, value]) =>
        supabase
          .from('site_settings')
          .upsert({
            key,
            value,
            type: 'color',
            updated_at: new Date().toISOString(),
            updated_by: 'Valérie'
          })
      );

      await Promise.all(updates);
      alert('Couleurs enregistrées avec succès !');

      document.documentElement.style.setProperty('--primary-color', colors.primary_color);
      document.documentElement.style.setProperty('--secondary-color', colors.secondary_color);
      document.documentElement.style.setProperty('--accent-color', colors.accent_color);
    } catch (error) {
      console.error('Error saving colors:', error);
      alert('Erreur lors de l\'enregistrement des couleurs');
    } finally {
      setSaving(false);
    }
  };

  const resetToDefaults = () => {
    setColors({
      primary_color: '#dc2626',
      secondary_color: '#f87171',
      accent_color: '#fca5a5',
      background_color: '#ffffff',
      text_color: '#1f2937'
    });
  };

  const colorFields = [
    { key: 'primary_color', label: 'Couleur Principale', description: 'Couleur primaire du site' },
    { key: 'secondary_color', label: 'Couleur Secondaire', description: 'Couleur pour les accents' },
    { key: 'accent_color', label: 'Couleur d\'Accent', description: 'Couleur pour les highlights' },
    { key: 'background_color', label: 'Couleur de Fond', description: 'Couleur de fond principale' },
    { key: 'text_color', label: 'Couleur du Texte', description: 'Couleur du texte principal' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Palette className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Gestion des Couleurs</h3>
            <p className="text-sm text-gray-600">Personnalisez les couleurs de votre site</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={resetToDefaults}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Réinitialiser</span>
          </button>
          <button
            onClick={saveColors}
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {colorFields.map(field => (
          <div key={field.key} className="bg-white border border-gray-200 rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              {field.label}
            </label>
            <p className="text-xs text-gray-600 mb-3">{field.description}</p>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={colors[field.key as keyof typeof colors]}
                onChange={(e) => handleColorChange(field.key, e.target.value)}
                className="w-20 h-20 rounded-lg border-2 border-gray-300 cursor-pointer"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={colors[field.key as keyof typeof colors]}
                  onChange={(e) => handleColorChange(field.key, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Aperçu des couleurs</h4>
        <div className="flex flex-wrap gap-4">
          {Object.entries(colors).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <div
                className="w-10 h-10 rounded-lg border-2 border-gray-300 shadow-sm"
                style={{ backgroundColor: value }}
              ></div>
              <span className="text-sm text-blue-800">{key.replace('_', ' ')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorThemeManager;
