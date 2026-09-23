import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  customItems?: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customItems }) => {
  const location = useLocation();

  const routeNameMap: { [key: string]: string } = {
    '': 'Accueil',
    'docteur-jocelyne-fassotte': 'Docteur Jocelyne Fassotte',
    'traitements': 'Traitements',
    'medecine-esthetique-liege': 'Médecine Esthétique Liège',
    'acide-hyaluronique-liege': 'Acide Hyaluronique',
    'botox-liege': 'Botox',
    'toxine-botulique-liege': 'Toxine Botulique',
    'stimulateurs-collagene': 'Stimulateurs de Collagène',
    'stimulateurs-collagene-liege': 'Stimulateurs de Collagène',
    'peeling-liege': 'Peeling',
    'peelings-chimiques-liege': 'Peelings Chimiques',
    'mesolift-liege': 'Mésolift',
    'mesotherapie-liege': 'Mésothérapie',
    'fils-tenseurs-liege': 'Fils Tenseurs',
    'lifting-fils-tenseurs-liege': 'Lifting Fils Tenseurs',
    'cosmetologie-liege': 'Cosmétologie',
    'cosmetologie-medicale-liege': 'Cosmétologie Médicale',
    'liquid-lift-liege': 'Liquid Lift',
    'rajeunissement-global-liege': 'Rajeunissement Global',
    'contact': 'Contact',
    'prendre-rendez-vous': 'Prendre Rendez-vous',
    'consultation-medecine-esthetique-liege': 'Consultation',
    'galerie': 'Galerie',
    'galerie-photos-avant-apres': 'Photos Avant-Après',
    'resultats-medecine-esthetique': 'Résultats',
    'politique-confidentialite': 'Politique de Confidentialité',
    'protection-donnees-medicales': 'Protection des Données'
  };

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) {
      return [{ label: 'Accueil', path: '/' }, ...customItems];
    }

    const pathnames = location.pathname.split('/').filter(x => x);

    if (pathnames.length === 0) {
      return [{ label: 'Accueil', path: '/' }];
    }

    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Accueil', path: '/' }];

    let currentPath = '';
    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeNameMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      breadcrumbs.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Fil d'Ariane"
      className="bg-neutral-50 border-b border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol
          className="flex items-center space-x-2 text-sm"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li
                key={crumb.path}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="flex items-center"
              >
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-neutral-400 mx-2" />
                )}

                {isLast ? (
                  <span
                    className="text-neutral-600 font-medium flex items-center"
                    itemProp="name"
                    aria-current="page"
                  >
                    {index === 0 && <Home className="w-4 h-4 mr-1" />}
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    title={`Aller vers ${crumb.label}`}
                    className="text-neutral-500 hover:text-primary-600 transition-colors flex items-center"
                    itemProp="item"
                  >
                    {index === 0 && <Home className="w-4 h-4 mr-1" />}
                    <span itemProp="name">{crumb.label}</span>
                  </Link>
                )}

                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
