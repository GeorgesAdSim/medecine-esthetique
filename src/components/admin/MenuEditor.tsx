import React, { useState, useEffect } from 'react';
import { Menu, Plus, Trash2, GripVertical, Eye, EyeOff, Save } from 'lucide-react';
import { supabase, MenuItem } from '../../lib/supabase';

const MenuEditor: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      if (data) setMenuItems(data);
    } catch (error) {
      console.error('Error loading menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMenuItem = () => {
    const newItem: MenuItem = {
      id: `temp-${Date.now()}`,
      name: 'Nouveau menu',
      href: '/nouvelle-page',
      order_index: menuItems.length,
      is_visible: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setMenuItems([...menuItems, newItem]);
    setEditingId(newItem.id);
  };

  const updateMenuItem = (id: string, field: keyof MenuItem, value: any) => {
    setMenuItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, [field]: value, updated_at: new Date().toISOString() }
          : item
      )
    );
  };

  const deleteMenuItem = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément du menu ?')) return;

    if (id.startsWith('temp-')) {
      setMenuItems(items => items.filter(item => item.id !== id));
      return;
    }

    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMenuItems(items => items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting menu item:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...menuItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];

    newItems.forEach((item, idx) => {
      item.order_index = idx;
    });

    setMenuItems(newItems);
  };

  const saveAllMenuItems = async () => {
    setSaving(true);
    try {
      const itemsToSave = menuItems.map(item => ({
        id: item.id.startsWith('temp-') ? undefined : item.id,
        name: item.name,
        href: item.href,
        order_index: item.order_index,
        is_visible: item.is_visible,
        parent_id: item.parent_id,
        updated_at: new Date().toISOString()
      }));

      for (const item of itemsToSave) {
        if (item.id) {
          await supabase
            .from('menu_items')
            .update(item)
            .eq('id', item.id);
        } else {
          const { id, ...insertData } = item;
          await supabase
            .from('menu_items')
            .insert(insertData);
        }
      }

      await loadMenuItems();
      alert('Menu enregistré avec succès !');
      setEditingId(null);
    } catch (error) {
      console.error('Error saving menu:', error);
      alert('Erreur lors de l\'enregistrement du menu');
    } finally {
      setSaving(false);
    }
  };

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
            <Menu className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Éditeur de Menu</h3>
            <p className="text-sm text-gray-600">Gérez les éléments de navigation</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={addMenuItem}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter</span>
          </button>
          <button
            onClick={saveAllMenuItems}
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
        {menuItems.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Aucun élément de menu. Cliquez sur "Ajouter" pour commencer.
          </div>
        ) : (
          menuItems.map((item, index) => (
            <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col space-y-1">
                  <button
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <GripVertical className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === menuItems.length - 1}
                    className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <GripVertical className="w-4 h-4 rotate-180" />
                  </button>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateMenuItem(item.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Nom du menu"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">URL</label>
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => updateMenuItem(item.id, 'href', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="/page-url"
                    />
                  </div>
                </div>

                <button
                  onClick={() => updateMenuItem(item.id, 'is_visible', !item.is_visible)}
                  className={`p-2 rounded-lg transition-colors ${
                    item.is_visible
                      ? 'bg-green-100 text-green-600 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                  title={item.is_visible ? 'Visible' : 'Masqué'}
                >
                  {item.is_visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => deleteMenuItem(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Aperçu du menu</h4>
        <div className="flex flex-wrap gap-3">
          {menuItems
            .filter(item => item.is_visible)
            .map(item => (
              <div
                key={item.id}
                className="px-4 py-2 bg-white border border-blue-200 rounded-full text-sm text-blue-800"
              >
                {item.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MenuEditor;
