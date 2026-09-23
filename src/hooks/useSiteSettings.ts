import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface SiteSettingsMap {
  [key: string]: string;
}

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettingsMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

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

  return {
    settings,
    loading,
    getSetting,
    updateSetting,
    updateMultipleSettings,
    refresh: loadSettings
  };
};
