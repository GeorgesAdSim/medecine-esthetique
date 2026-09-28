// Manifeste des images converties au build (scripts/images.mjs, étape `images`
// de la chaîne, avant le rendu). Fichier généré, non versionné.
import manifeste from '../../data/images.json';
import { resoudre, type ImageResolue, type Manifeste } from './imagesManifeste';

export const imageDe = (src: string): ImageResolue => resoudre(src, manifeste as Manifeste);
