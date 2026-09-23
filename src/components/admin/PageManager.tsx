import React, { useState, useEffect } from 'react';
import { FileText, Plus, CreditCard as Edit2, Trash2, Eye, EyeOff, Save, ArrowLeft, Upload, Layout, ExternalLink } from 'lucide-react';
import { supabase, CustomPage } from '../../lib/supabase';
import VisualBlockEditor from './VisualBlockEditor';
import BlockPreview from './BlockPreview';

const PageManager: React.FC = () => {
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<CustomPage | null>(null);
  const [pageBlocks, setPageBlocks] = useState<any[]>([]);
  const [localStoragePages, setLocalStoragePages] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadPages();
    checkLocalStoragePages();
  }, []);

  const checkLocalStoragePages = () => {
    try {
      const saved = localStorage.getItem('siteCustomization');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.pages && Object.keys(parsed.pages).length > 0) {
          const pagesArray = Object.values(parsed.pages);
          setLocalStoragePages(pagesArray);
        }
      }
    } catch (error) {
      console.error('Error checking localStorage:', error);
    }
  };

  const migrateLocalStoragePages = async () => {
    if (localStoragePages.length === 0) return;

    if (!confirm(`Voulez-vous migrer ${localStoragePages.length} page(s) de localStorage vers Supabase ?`)) {
      return;
    }

    try {
      for (const oldPage of localStoragePages as any[]) {
        const pageData = {
          slug: oldPage.slug,
          title: oldPage.title,
          content: oldPage.blocks || [],
          meta_description: oldPage.metaDescription || '',
          is_published: oldPage.isPublished || false,
          created_by: 'Valérie'
        };

        const { error } = await supabase
          .from('custom_pages')
          .insert(pageData);

        if (error) {
          console.error('Error migrating page:', oldPage.title, error);
        }
      }

      await loadPages();
      setLocalStoragePages([]);
      alert('Migration terminée avec succès !');
    } catch (error) {
      console.error('Error during migration:', error);
      alert('Erreur lors de la migration');
    }
  };

  const loadPages = async () => {
    try {
      console.log('Loading pages from Supabase...');
      const { data, error } = await supabase
        .from('custom_pages')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      if (data) {
        console.log('Pages loaded:', data.length);
        setPages(data);
      }
    } catch (error) {
      console.error('Error loading pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNewPage = () => {
    const newPage: CustomPage = {
      id: `temp-${Date.now()}`,
      slug: 'nouvelle-page',
      title: 'Nouvelle Page',
      content: [],
      meta_description: '',
      is_published: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 'Valérie'
    };
    setEditingPage(newPage);
    setPageBlocks([]);
  };

  const editPage = (page: CustomPage) => {
    setEditingPage(page);
    const content = (page.content as any[]) || [];

    // Trier les blocs par ordre avant de les traiter
    const sortedContent = [...content].sort((a, b) => {
      const orderA = a.order !== undefined ? a.order : 0;
      const orderB = b.order !== undefined ? b.order : 0;
      return orderA - orderB;
    });

    // Les données de Supabase ont déjà la bonne structure {id, type, order, content}
    // Mais VisualBlockEditor attend {type, ...rest} sans la structure imbriquée
    // On doit donc "aplatir" les blocs
    const flattenedBlocks = sortedContent.map((block: any) => {
      if (block.type && block.content && typeof block.content === 'object') {
        // Format Supabase: {id, type, order, content: {...}}
        // Convertir vers: {type, ...content}
        return {
          type: block.type,
          ...block.content
        };
      }
      // Déjà au bon format
      return block;
    });
    setPageBlocks(flattenedBlocks);
  };

  const savePage = async () => {
    if (!editingPage) return;

    try {
      // Restructurer les blocs au format Supabase: {id, type, order, content: {...}}
      const contentToSave = pageBlocks.map((block: any, index: number) => {
        const { type, ...rest } = block;
        return {
          id: `block-${type}-${index}`,
          type: type,
          order: index,
          content: rest
        };
      });

      const pageData = {
        slug: editingPage.slug,
        title: editingPage.title,
        content: contentToSave,
        meta_description: editingPage.meta_description,
        is_published: editingPage.is_published,
        updated_at: new Date().toISOString(),
        created_by: 'Valérie'
      };

      if (editingPage.id.startsWith('temp-')) {
        const { error } = await supabase
          .from('custom_pages')
          .insert(pageData);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('custom_pages')
          .update(pageData)
          .eq('id', editingPage.id);
        if (error) throw error;
      }

      await loadPages();
      setEditingPage(null);
      setPageBlocks([]);
      alert('Page enregistrée avec succès !');
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Erreur lors de l\'enregistrement de la page');
    }
  };

  const deletePage = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette page ?')) return;

    try {
      const { error } = await supabase
        .from('custom_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadPages();
    } catch (error) {
      console.error('Error deleting page:', error);
      alert('Erreur lors de la suppression de la page');
    }
  };

  const togglePublish = async (page: CustomPage) => {
    try {
      const { error } = await supabase
        .from('custom_pages')
        .update({ is_published: !page.is_published })
        .eq('id', page.id);

      if (error) throw error;
      await loadPages();
    } catch (error) {
      console.error('Error updating page:', error);
      alert('Erreur lors de la mise à jour de la page');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (editingPage) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setEditingPage(null);
              setPageBlocks([]);
              setShowPreview(false);
            }}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour aux pages</span>
          </button>
          <div className="flex items-center space-x-3">
            {!editingPage.id.startsWith('temp-') && (
              <a
                href={`/${editingPage.slug}?preview=true`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Voir la page</span>
              </a>
            )}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                showPreview
                  ? 'bg-primary-100 text-primary-700 border-2 border-primary-300'
                  : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>{showPreview ? 'Masquer l\'aperçu' : 'Afficher l\'aperçu'}</span>
            </button>
            <button
              onClick={savePage}
              className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer la page</span>
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Informations de la page</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de la page
                </label>
                <input
                  type="text"
                  value={editingPage.title}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Mon titre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL (slug)
                </label>
                <input
                  type="text"
                  value={editingPage.slug}
                  onChange={(e) =>
                    setEditingPage({
                      ...editingPage,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="mon-url"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (méta)
                </label>
                <textarea
                  value={editingPage.meta_description || ''}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, meta_description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Description pour les moteurs de recherche"
                  rows={2}
                />
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingPage.is_published}
                    onChange={(e) =>
                      setEditingPage({ ...editingPage, is_published: e.target.checked })
                    }
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Page publiée</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className={`grid ${showPreview ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
          <div>
            <VisualBlockEditor
              blocks={pageBlocks}
              onChange={(newBlocks) => setPageBlocks(newBlocks)}
            />
          </div>

          {showPreview && (
            <div className="sticky top-6 h-fit">
              <BlockPreview blocks={pageBlocks} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Gestionnaire de Pages</h3>
            <p className="text-sm text-gray-600">Créez et gérez vos pages personnalisées</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {localStoragePages.length > 0 && (
            <button
              onClick={migrateLocalStoragePages}
              className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              title="Migrer les pages de localStorage vers Supabase"
            >
              <Upload className="w-4 h-4" />
              <span>Migrer {localStoragePages.length} page(s)</span>
            </button>
          )}
          <button
            onClick={createNewPage}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle Page</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.length === 0 ? (
          <div className="col-span-full p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-4">Aucune page personnalisée</p>
            <button
              onClick={createNewPage}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Créer votre première page</span>
            </button>
          </div>
        ) : (
          pages.map(page => (
            <div
              key={page.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{page.title}</h4>
                  <p className="text-sm text-gray-500">/{page.slug}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    page.is_published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {page.is_published ? 'Publié' : 'Brouillon'}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => editPage(page)}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Modifier</span>
                  </button>
                  <button
                    onClick={() => togglePublish(page)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title={page.is_published ? 'Dépublier' : 'Publier'}
                  >
                    {page.is_published ? (
                      <EyeOff className="w-4 h-4 text-gray-600" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                  <button
                    onClick={() => deletePage(page.id)}
                    className="p-2 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                <a
                  href={`/${page.slug}?preview=true`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm w-full"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Voir la page</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PageManager;
