import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface SiteCustomization {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  texts: {
    [key: string]: string;
  };
  images: {
    [key: string]: string;
  };
  pages: {
    [key: string]: CustomPage;
  };
  treatments: {
    [key: string]: CustomTreatment;
  };
}

interface CustomTreatment {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  price?: string;
  icon: string;
  category: 'injection' | 'surface' | 'advanced' | 'other';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  content: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    sections: TreatmentSection[];
  };
}

interface TreatmentSection {
  id: string;
  type: 'description' | 'zones' | 'process' | 'advantages' | 'faq' | 'contraindications';
  title: string;
  content: any;
  order: number;
}

interface CustomPage {
  id: string;
  title: string;
  slug: string;
  metaDescription?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  blocks: PageBlock[];
}

interface PageBlock {
  id: string;
  type: 'banner' | 'text' | 'image' | 'button' | 'spacer' | 'grid';
  order: number;
  content: any;
  styles?: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    margin?: string;
    alignment?: 'left' | 'center' | 'right';
  };
}

interface AdminContextType {
  customization: SiteCustomization;
  updateColors: (colors: Partial<SiteCustomization['colors']>) => void;
  updateFonts: (fonts: Partial<SiteCustomization['fonts']>) => void;
  updateText: (key: string, value: string) => void;
  updateImage: (key: string, value: string) => void;
  createPage: (page: Omit<CustomPage, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePage: (pageId: string, updates: Partial<CustomPage>) => void;
  deletePage: (pageId: string) => void;
  addBlock: (pageId: string, block: Omit<PageBlock, 'id' | 'order'>) => void;
  updateBlock: (pageId: string, blockId: string, updates: Partial<PageBlock>) => void;
  deleteBlock: (pageId: string, blockId: string) => void;
  reorderBlocks: (pageId: string, blockIds: string[]) => void;
  createTreatment: (treatment: Omit<CustomTreatment, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTreatment: (treatmentId: string, updates: Partial<CustomTreatment>) => void;
  deleteTreatment: (treatmentId: string) => void;
  addTreatmentSection: (treatmentId: string, section: Omit<TreatmentSection, 'id' | 'order'>) => void;
  updateTreatmentSection: (treatmentId: string, sectionId: string, updates: Partial<TreatmentSection>) => void;
  deleteTreatmentSection: (treatmentId: string, sectionId: string) => void;
  isAdminMode: boolean;
  toggleAdminMode: () => void;
  resetToDefaults: () => void;
}

const defaultCustomization: SiteCustomization = {
  colors: {
    primary: '#ef4444',
    secondary: '#dc2626',
    accent: '#f87171',
    neutral: '#78716c'
  },
  fonts: {
    heading: 'Playfair Display',
    body: 'Inter'
  },
  texts: {
    'hero.title': 'Docteure Jocelyne Fassotte',
    'hero.subtitle': 'Spécialiste en médecine esthétique non invasive',
    'hero.description': 'Révélez votre beauté naturelle grâce à des traitements personnalisés et des techniques douces pour un rajeunissement harmonieux et respectueux de votre identité.',
    'philosophy.title': 'Révélez votre beauté naturelle',
    'philosophy.description': 'Ma philosophie se base sur l\'écoute, la personnalisation des traitements et la recherche de résultats naturels qui respectent votre identité.',
    'treatments.title': 'Les Traitements de Dre Fassotte',
    'treatments.description': 'Des solutions personnalisées pour révéler votre beauté avec des techniques douces et des résultats naturels.',
    'approach.title': 'Une approche personnalisée',
    'cta.title': 'Prêt(e) à révéler votre beauté naturelle ?',
    'cta.description': 'Prenez rendez-vous pour une consultation personnalisée et découvrez comment sublimer votre beauté naturelle.',
    'contact.phone': '+32 495 28 09 76',
    'contact.email': 'doc.jofassotte@proximus.be',
    'contact.address.street': 'Rue Edouard Sarlet 31',
    'contact.address.city': '4051 Vaux-sous-Chèvremont',
    'contact.address.country': 'Liège, Belgique'
  },
  images: {
    'hero.doctor': '/image copy copy copy copy copy copy.png',
    'logo.initials': 'JF'
  },
  pages: {},
  treatments: {}
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [customization, setCustomization] = useState<SiteCustomization>(defaultCustomization);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const { isAuthenticated, hasPermission } = useAuth();

  // Charger les personnalisations depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('siteCustomization');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCustomization({ ...defaultCustomization, ...parsed });
      } catch (error) {
        console.error('Erreur lors du chargement des personnalisations:', error);
      }
    }
  }, []);

  // Sauvegarder les personnalisations dans localStorage
  useEffect(() => {
    localStorage.setItem('siteCustomization', JSON.stringify(customization));
    
    // Appliquer les couleurs CSS
    const root = document.documentElement;
    root.style.setProperty('--color-primary', customization.colors.primary);
    root.style.setProperty('--color-secondary', customization.colors.secondary);
    root.style.setProperty('--color-accent', customization.colors.accent);
    root.style.setProperty('--color-neutral', customization.colors.neutral);
    
    // Appliquer les polices
    root.style.setProperty('--font-heading', customization.fonts.heading);
    root.style.setProperty('--font-body', customization.fonts.body);
  }, [customization]);

  const updateColors = (colors: Partial<SiteCustomization['colors']>) => {
    if (!hasPermission('write')) return;
    setCustomization(prev => ({
      ...prev,
      colors: { ...prev.colors, ...colors }
    }));
  };

  const updateFonts = (fonts: Partial<SiteCustomization['fonts']>) => {
    if (!hasPermission('write')) return;
    setCustomization(prev => ({
      ...prev,
      fonts: { ...prev.fonts, ...fonts }
    }));
  };

  const updateText = (key: string, value: string) => {
    if (!hasPermission('write')) return;
    setCustomization(prev => ({
      ...prev,
      texts: { ...prev.texts, [key]: value }
    }));
  };

  const updateImage = (key: string, value: string) => {
    if (!hasPermission('write')) return;
    setCustomization(prev => ({
      ...prev,
      images: { ...prev.images, [key]: value }
    }));
  };

  const toggleAdminMode = () => {
    if (!isAuthenticated) return false;
    setIsAdminMode(prev => !prev);
    return true;
  };

  const resetToDefaults = () => {
    if (!hasPermission('admin')) {
      console.warn('Permission insuffisante pour réinitialiser');
      return;
    }
    setCustomization(defaultCustomization);
    localStorage.removeItem('siteCustomization');
  };

  const createPage = (page: Omit<CustomPage, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!hasPermission('write')) return;
    const id = Date.now().toString();
    const now = new Date().toISOString();
    const newPage: CustomPage = {
      ...page,
      id,
      createdAt: now,
      updatedAt: now,
      blocks: []
    };
    
    setCustomization(prev => ({
      ...prev,
      pages: {
        ...prev.pages,
        [id]: newPage
      }
    }));
  };

  const updatePage = (pageId: string, updates: Partial<CustomPage>) => {
    if (!hasPermission('write')) return;
    setCustomization(prev => ({
      ...prev,
      pages: {
        ...prev.pages,
        [pageId]: {
          ...prev.pages[pageId],
          ...updates,
          updatedAt: new Date().toISOString()
        }
      }
    }));
  };

  const deletePage = (pageId: string) => {
    if (!hasPermission('admin')) return;
    setCustomization(prev => {
      const newPages = { ...prev.pages };
      delete newPages[pageId];
      return {
        ...prev,
        pages: newPages
      };
    });
  };

  const addBlock = (pageId: string, block: Omit<PageBlock, 'id' | 'order'>) => {
    if (!hasPermission('write')) return;
    const page = customization.pages[pageId];
    if (!page) return;

    const newBlock: PageBlock = {
      ...block,
      id: Date.now().toString(),
      order: page.blocks.length
    };

    updatePage(pageId, {
      blocks: [...page.blocks, newBlock]
    });
  };

  const updateBlock = (pageId: string, blockId: string, updates: Partial<PageBlock>) => {
    if (!hasPermission('write')) return;
    const page = customization.pages[pageId];
    if (!page) return;

    const updatedBlocks = page.blocks.map(block =>
      block.id === blockId ? { ...block, ...updates } : block
    );

    updatePage(pageId, { blocks: updatedBlocks });
  };

  const deleteBlock = (pageId: string, blockId: string) => {
    if (!hasPermission('write')) return;
    const page = customization.pages[pageId];
    if (!page) return;

    const updatedBlocks = page.blocks
      .filter(block => block.id !== blockId)
      .map((block, index) => ({ ...block, order: index }));

    updatePage(pageId, { blocks: updatedBlocks });
  };

  const reorderBlocks = (pageId: string, blockIds: string[]) => {
    if (!hasPermission('write')) return;
    const page = customization.pages[pageId];
    if (!page) return;

    const reorderedBlocks = blockIds.map((blockId, index) => {
      const block = page.blocks.find(b => b.id === blockId);
      return block ? { ...block, order: index } : null;
    }).filter(Boolean) as PageBlock[];

    updatePage(pageId, { blocks: reorderedBlocks });
  };

  const createTreatment = (treatment: Omit<CustomTreatment, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!hasPermission('write')) return;
    const id = Date.now().toString();
    const now = new Date().toISOString();
    const newTreatment: CustomTreatment = {
      ...treatment,
      id,
      createdAt: now,
      updatedAt: now
    };
    
    setCustomization(prev => ({
      ...prev,
      treatments: {
        ...prev.treatments,
        [id]: newTreatment
      }
    }));
  };

  const updateTreatment = (treatmentId: string, updates: Partial<CustomTreatment>) => {
    if (!hasPermission('write')) return;
    setCustomization(prev => ({
      ...prev,
      treatments: {
        ...prev.treatments,
        [treatmentId]: {
          ...prev.treatments[treatmentId],
          ...updates,
          updatedAt: new Date().toISOString()
        }
      }
    }));
  };

  const deleteTreatment = (treatmentId: string) => {
    if (!hasPermission('admin')) return;
    setCustomization(prev => {
      const newTreatments = { ...prev.treatments };
      delete newTreatments[treatmentId];
      return {
        ...prev,
        treatments: newTreatments
      };
    });
  };

  const addTreatmentSection = (treatmentId: string, section: Omit<TreatmentSection, 'id' | 'order'>) => {
    if (!hasPermission('write')) return;
    const treatment = customization.treatments[treatmentId];
    if (!treatment) return;

    const newSection: TreatmentSection = {
      ...section,
      id: Date.now().toString(),
      order: treatment.content.sections.length
    };

    updateTreatment(treatmentId, {
      content: {
        ...treatment.content,
        sections: [...treatment.content.sections, newSection]
      }
    });
  };

  const updateTreatmentSection = (treatmentId: string, sectionId: string, updates: Partial<TreatmentSection>) => {
    if (!hasPermission('write')) return;
    const treatment = customization.treatments[treatmentId];
    if (!treatment) return;

    const updatedSections = treatment.content.sections.map(section =>
      section.id === sectionId ? { ...section, ...updates } : section
    );

    updateTreatment(treatmentId, {
      content: {
        ...treatment.content,
        sections: updatedSections
      }
    });
  };

  const deleteTreatmentSection = (treatmentId: string, sectionId: string) => {
    if (!hasPermission('write')) return;
    const treatment = customization.treatments[treatmentId];
    if (!treatment) return;

    const updatedSections = treatment.content.sections
      .filter(section => section.id !== sectionId)
      .map((section, index) => ({ ...section, order: index }));

    updateTreatment(treatmentId, {
      content: {
        ...treatment.content,
        sections: updatedSections
      }
    });
  };

  return (
    <AdminContext.Provider value={{
      customization,
      updateColors,
      updateFonts,
      updateText,
      updateImage,
      createPage,
      updatePage,
      deletePage,
      addBlock,
      updateBlock,
      deleteBlock,
      reorderBlocks,
      createTreatment,
      updateTreatment,
      deleteTreatment,
      addTreatmentSection,
      updateTreatmentSection,
      deleteTreatmentSection,
      isAdminMode,
      toggleAdminMode,
      resetToDefaults
    }}>
      {children}
    </AdminContext.Provider>
  );
};