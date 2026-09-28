/**
 * Ancre d'une section (champ facultatif `ancre` du bloc, ex. « contre-indications »),
 * pour des liens profonds stables vers une section : /botox-liege#contre-indications.
 * Seuls les identifiants sûrs (minuscules, chiffres, tirets) sont retenus.
 */
export const ancreDe = (block: { content?: { ancre?: unknown } }): string | undefined => {
  const a = block.content?.ancre;
  return typeof a === 'string' && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(a) ? a : undefined;
};
