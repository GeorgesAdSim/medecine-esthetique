import React from 'react';
import { EN_BREF } from '../contenu/enBref';

/** Encadré « En bref » (src/contenu/enBref.ts), juste sous le haut de page. */
const EnBref: React.FC<{ chemin: string }> = ({ chemin }) => {
  const lignes = EN_BREF[chemin];
  if (!lignes?.length) return null;
  return (
    <section id="en-bref" className="bg-white pt-12 pb-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary-100 bg-primary-50/40 p-6 sm:p-8">
          <h2 className="font-playfair text-2xl font-bold text-neutral-800 mb-4">En bref</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-x-6 gap-y-3 font-inter text-neutral-700">
            {lignes.map(([libelle, valeur]) => (
              <React.Fragment key={libelle}>
                <dt className="font-semibold text-neutral-800">{libelle}</dt>
                <dd className="mb-2 sm:mb-0">{valeur}</dd>
              </React.Fragment>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default EnBref;
