import React from 'react';
import { imageDe } from '../contenu/images';

interface Props {
  src: string;
  alt: string;
  className?: string;
  /** Image LCP (hero) : chargée tout de suite et en priorité. Sinon : différée. */
  prioritaire?: boolean;
  /** Largeur affichée, pour que le navigateur choisisse la variante. */
  sizes?: string;
}

/**
 * Image du contenu servie en AVIF/WebP à la bonne taille, avec ses dimensions
 * (pas de décalage de mise en page). Voir scripts/images.mjs.
 */
const ImageOptimisee: React.FC<Props> = ({ src, alt, className, prioritaire = false, sizes = '(min-width: 1024px) 50vw, 100vw' }) => {
  const i = imageDe(src);
  const img = (
    <img
      src={i.src}
      alt={alt}
      className={className}
      width={i.largeur}
      height={i.hauteur}
      loading={prioritaire ? 'eager' : 'lazy'}
      decoding={prioritaire ? 'sync' : 'async'}
      // React 18 ne connaît pas fetchPriority : attribut HTML transmis tel quel.
      {...(prioritaire ? { fetchpriority: 'high' } : {})}
    />
  );
  if (!i.webp) return img;
  return (
    <picture>
      {i.avif && <source type="image/avif" srcSet={i.avif} sizes={sizes} />}
      <source type="image/webp" srcSet={i.webp} sizes={sizes} />
      {img}
    </picture>
  );
};

export default ImageOptimisee;
