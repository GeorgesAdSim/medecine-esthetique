import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { NOMS_PILIERS, SOUS_PAGES, enfantsDe, sousPagesPubliees } from '../contenu/routes';

/**
 * Maillage en silo, écrit dans le code (pas dans l'admin) pour qu'il ne puisse
 * pas se perdre à l'édition d'une page :
 * - sur un pilier, un lien vers chacune de ses pages filles publiées ;
 * - sur une page fille, le pilier, les pages sœurs et la page des traitements.
 */
export const ZonesDuPilier: React.FC<{ pilier: string; traitement: string }> = ({ pilier, traitement }) => {
  const enfants = enfantsDe(pilier);
  if (!enfants.length) return null;
  return (
    <section id="zones-detail" className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6">{traitement} à Liège : zone par zone</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {enfants.map((c) => (
            <li key={c}>
              <Link to={c} className="flex items-center justify-between p-5 rounded-2xl bg-neutral-50 hover:bg-primary-50 font-inter font-medium text-neutral-800 min-h-[48px]">
                {SOUS_PAGES[c].ancreLien}
                <ArrowRight className="w-5 h-5 text-primary-600 flex-shrink-0 ml-3" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export const LiensDeLaFille: React.FC<{ chemin: string; nomPilier: string }> = ({ chemin, nomPilier }) => {
  const fille = SOUS_PAGES[chemin];
  if (!fille) return null;
  // Pages sœurs : même pilier seulement (le silo ne se mélange pas).
  const soeurs = enfantsDe(fille.parent).filter((c) => c !== chemin);
  return (
    <section id="aller-plus-loin" className="py-12 bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-inter">
        <h2 className="font-playfair text-2xl font-bold text-neutral-800 mb-4">Pour aller plus loin</h2>
        <ul className="space-y-3 text-neutral-700">
          <li>
            <Link to={fille.parent} className="text-primary-600 underline">{nomPilier} à Liège : le traitement en détail</Link>
          </li>
          {soeurs.map((c) => (
            <li key={c}>
              <Link to={c} className="text-primary-600 underline">{SOUS_PAGES[c].ancreLien}</Link>
            </li>
          ))}
          <li>
            <Link to="/medecine-esthetique-liege" className="text-primary-600 underline">Tous les traitements de médecine esthétique</Link>
          </li>
          <li>
            <Link to="/docteur-jocelyne-fassotte" className="text-primary-600 underline">Qui est la Dre Jocelyne Fassotte ?</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

/** Sur la page des traitements (le pilier général) : les pages filles, par zone du visage. */
export const ZonesDuSite: React.FC = () => {
  const filles = sousPagesPubliees();
  if (!filles.length) return null;
  return (
    <section id="zones" className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6">Traitements par zone du visage, à Liège</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filles.map((c) => (
            <li key={c}>
              <Link to={c} className="flex items-center justify-between p-5 rounded-2xl bg-neutral-50 hover:bg-primary-50 font-inter font-medium text-neutral-800 min-h-[48px]">
                <span>
                  {SOUS_PAGES[c].ancreLien}
                  <span className="block text-sm font-normal text-neutral-500">{NOMS_PILIERS[SOUS_PAGES[c].parent]}</span>
                </span>
                <ArrowRight className="w-5 h-5 text-primary-600 flex-shrink-0 ml-3" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
