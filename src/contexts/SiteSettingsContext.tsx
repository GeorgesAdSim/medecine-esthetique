import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface SiteSettingsMap {
  [key: string]: string;
}

interface SiteSettingsContextType {
  settings: SiteSettingsMap;
  loading: boolean;
  getSetting: (key: string, defaultValue?: string) => string;
  updateSetting: (key: string, value: string, type?: string) => Promise<boolean>;
  updateMultipleSettings: (updates: Array<{ key: string; value: string; type?: string }>) => Promise<boolean>;
  refresh: () => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettingsMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
    applySettingsToDOM(settings);
  }, []);

  useEffect(() => {
    applySettingsToDOM(settings);
  }, [settings]);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;

      if (data) {
        const settingsMap: SiteSettingsMap = {};
        data.forEach((setting: any) => {
          settingsMap[setting.key] = setting.value;
        });
        setSettings(settingsMap);
      }
    } catch (error) {
      console.error('Error loading site settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const applySettingsToDOM = (settingsMap: SiteSettingsMap) => {
    const root = document.documentElement;

    if (settingsMap.primary_color) {
      root.style.setProperty('--primary-color', settingsMap.primary_color);
    }
    if (settingsMap.secondary_color) {
      root.style.setProperty('--secondary-color', settingsMap.secondary_color);
    }
    if (settingsMap.accent_color) {
      root.style.setProperty('--accent-color', settingsMap.accent_color);
    }
    if (settingsMap.background_color) {
      root.style.setProperty('--background-color', settingsMap.background_color);
    }
    if (settingsMap.text_color) {
      root.style.setProperty('--text-color', settingsMap.text_color);
    }

    if (settingsMap.font_heading) {
      root.style.setProperty('--font-heading', settingsMap.font_heading);
    }
    if (settingsMap.font_body) {
      root.style.setProperty('--font-body', settingsMap.font_body);
    }
  };

  const getSetting = (key: string, defaultValue: string = ''): string => {
    return settings[key] || defaultValue;
  };

  const updateSetting = async (key: string, value: string, type: string = 'text'): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key,
          value,
          type,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setSettings(prev => ({ ...prev, [key]: value }));
      return true;
    } catch (error) {
      console.error('Error updating setting:', error);
      return false;
    }
  };

  const updateMultipleSettings = async (
    updates: Array<{ key: string; value: string; type?: string }>
  ): Promise<boolean> => {
    try {
      const operations = updates.map(({ key, value, type = 'text' }) =>
        supabase
          .from('site_settings')
          .upsert({
            key,
            value,
            type,
            updated_at: new Date().toISOString()
          })
      );

      await Promise.all(operations);

      const newSettings = { ...settings };
      updates.forEach(({ key, value }) => {
        newSettings[key] = value;
      });
      setSettings(newSettings);

      return true;
    } catch (error) {
      console.error('Error updating multiple settings:', error);
      return false;
    }
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        loading,
        getSetting,
        updateSetting,
        updateMultipleSettings,
        refresh: loadSettings
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
