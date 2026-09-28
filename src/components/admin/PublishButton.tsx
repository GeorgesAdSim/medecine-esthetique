import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { supabase } from '../../lib/supabase';

/**
 * « Publier le site » : les pages publiques sont pré-rendues au build, une
 * modification faite ici n'y apparaît qu'après publication.
 * Voir netlify/functions/publier.mjs.
 */
const PublishButton: React.FC = () => {
  const [etat, setEtat] = useState<'repos' | 'envoi' | 'ok' | 'erreur'>('repos');
  const [message, setMessage] = useState('');

  const publier = async () => {
    setEtat('envoi');
    setMessage('');
    try {
      const { data } = await supabase.auth.getSession();
      const jeton = data.session?.access_token;
      if (!jeton) throw new Error('Session expirée : reconnectez-vous.');
      const r = await fetch('/.netlify/functions/publier', {
        method: 'POST',
        headers: { Authorization: `Bearer ${jeton}` },
      });
      const corps = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(corps.erreur || `Erreur ${r.status}`);
      setEtat('ok');
      setMessage(corps.message || 'Publication lancée.');
    } catch (e) {
      setEtat('erreur');
      setMessage(e instanceof Error ? e.message : 'Publication impossible.');
    }
  };

  return (
    <div className="flex items-center space-x-3">
      {message && (
        <span className={`text-sm ${etat === 'erreur' ? 'text-red-100' : 'text-primary-100'}`}>{message}</span>
      )}
      <button
        onClick={publier}
        disabled={etat === 'envoi'}
        className="flex items-center space-x-2 bg-white text-primary-700 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors disabled:opacity-60"
        title="Mettre en ligne les modifications"
      >
        <UploadCloud className="w-5 h-5" />
        <span>{etat === 'envoi' ? 'Publication…' : 'Publier le site'}</span>
      </button>
    </div>
  );
};

export default PublishButton;
