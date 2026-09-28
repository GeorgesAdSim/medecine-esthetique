import React from 'react';
import { BookOpen } from 'lucide-react';
import { dateLisible, type Appui, type Source } from '../contenu/sources';

/** Sous une section : ce que dit la source, avec le lien et la date de lecture. */
export const NoteSource: React.FC<{ appuis: Array<Appui & { source: Source }>; fond?: string }> = ({ appuis, fond = 'bg-white' }) => (
  <div className={`${fond} pb-12 -mt-8`}>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
      {appuis.map((a) => (
        <p key={a.source.id + a.confirme} className="font-inter text-sm text-neutral-600 italic leading-relaxed">
          {a.confirme}{' '}
          <span className="not-italic">
            Source :{' '}
            <a href={a.source.url} target="_blank" rel="noopener" className="text-primary-600 underline">
              {a.source.titre}
            </a>{' '}
            ({a.source.editeur}, consulté le {dateLisible(a.source.consulteLe)}).
          </span>
        </p>
      ))}
    </div>
  </div>
);

/** En fin de page : la liste des documents cités. */
export const ListeSources: React.FC<{ sources: Source[] }> = ({ sources }) => (
  <section id="sources" className="py-12 bg-neutral-50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="font-playfair text-2xl font-bold text-neutral-800 mb-4 flex items-center">
        <BookOpen className="w-6 h-6 text-primary-600 mr-3" aria-hidden="true" />
        Sources
      </h2>
      <p className="font-inter text-neutral-600 mb-4">
        Les informations médicales de cette page renvoient aux documents officiels ci-dessous. Elles ne remplacent
        pas la consultation, où la Dre Fassotte évalue votre situation.
      </p>
      <ol className="list-decimal pl-6 space-y-2 font-inter text-neutral-700">
        {sources.map((s) => (
          <li key={s.id}>
            <a href={s.url} target="_blank" rel="noopener" className="text-primary-600 underline">
              {s.titre}
            </a>{' '}
            — {s.editeur}, consulté le {dateLisible(s.consulteLe)}.
          </li>
        ))}
      </ol>
    </div>
  </section>
);
