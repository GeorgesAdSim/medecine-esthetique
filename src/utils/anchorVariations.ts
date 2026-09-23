type AnchorType = 'exact' | 'partial' | 'branded' | 'generic' | 'longtail';

interface AnchorVariation {
  text: string;
  type: AnchorType;
  weight: number;
}

const anchorVariations: Record<string, AnchorVariation[]> = {
  'acide-hyaluronique-liege': [
    { text: 'acide hyaluronique Liège', type: 'exact', weight: 0.2 },
    { text: 'injection acide hyaluronique', type: 'exact', weight: 0.2 },
    { text: 'traitement à l\'acide hyaluronique', type: 'partial', weight: 0.3 },
    { text: 'comblement des rides avec acide hyaluronique', type: 'partial', weight: 0.3 },
    { text: 'nos injections d\'acide hyaluronique à Liège', type: 'branded', weight: 0.2 },
    { text: 'en savoir plus sur ce traitement', type: 'generic', weight: 0.2 },
    { text: 'découvrez nos injections', type: 'generic', weight: 0.2 },
    { text: 'traitement de comblement facial', type: 'longtail', weight: 0.1 }
  ],
  'botox-liege': [
    { text: 'botox Liège', type: 'exact', weight: 0.2 },
    { text: 'toxine botulique Liège', type: 'exact', weight: 0.2 },
    { text: 'injections de toxine botulique', type: 'partial', weight: 0.3 },
    { text: 'traitement des rides d\'expression au botox', type: 'partial', weight: 0.3 },
    { text: 'nos traitements à la toxine botulique', type: 'branded', weight: 0.2 },
    { text: 'découvrez le botox', type: 'generic', weight: 0.2 },
    { text: 'traitement antirides efficace', type: 'generic', weight: 0.2 },
    { text: 'réduire les rides du front naturellement', type: 'longtail', weight: 0.1 }
  ],
  'fils-tenseurs-liege': [
    { text: 'fils tenseurs Liège', type: 'exact', weight: 0.2 },
    { text: 'lifting fils tenseurs', type: 'exact', weight: 0.2 },
    { text: 'lifting sans chirurgie par fils tenseurs', type: 'partial', weight: 0.3 },
    { text: 'nos traitements de fils tenseurs à Liège', type: 'partial', weight: 0.3 },
    { text: 'rajeunissement par fils résorbables', type: 'branded', weight: 0.2 },
    { text: 'alternative au lifting chirurgical', type: 'generic', weight: 0.2 },
    { text: 'lifting non invasif', type: 'generic', weight: 0.2 },
    { text: 'redessiner l\'ovale du visage sans chirurgie', type: 'longtail', weight: 0.1 }
  ],
  'liquid-lift-liege': [
    { text: 'liquid lift Liège', type: 'exact', weight: 0.2 },
    { text: 'rajeunissement global', type: 'exact', weight: 0.2 },
    { text: 'protocole de rajeunissement global liquid lift', type: 'partial', weight: 0.3 },
    { text: 'traitement combiné liquid lift', type: 'partial', weight: 0.3 },
    { text: 'notre méthode de liquid lift à Liège', type: 'branded', weight: 0.2 },
    { text: 'rajeunissement du visage complet', type: 'generic', weight: 0.2 },
    { text: 'approche globale', type: 'generic', weight: 0.2 },
    { text: 'rajeunir naturellement sans chirurgie', type: 'longtail', weight: 0.1 }
  ],
  'mesolift-liege': [
    { text: 'mésolift Liège', type: 'exact', weight: 0.2 },
    { text: 'mésothérapie visage', type: 'exact', weight: 0.2 },
    { text: 'traitement de mésolift', type: 'partial', weight: 0.3 },
    { text: 'revitaliser la peau par mésolift', type: 'partial', weight: 0.3 },
    { text: 'nos soins de mésothérapie', type: 'branded', weight: 0.2 },
    { text: 'revitalisation cutanée', type: 'generic', weight: 0.2 },
    { text: 'éclat de la peau', type: 'generic', weight: 0.2 },
    { text: 'traitement pour une peau lumineuse', type: 'longtail', weight: 0.1 }
  ],
  'peeling-liege': [
    { text: 'peeling Liège', type: 'exact', weight: 0.2 },
    { text: 'peelings chimiques', type: 'exact', weight: 0.2 },
    { text: 'traitement par peeling médical', type: 'partial', weight: 0.3 },
    { text: 'exfoliation professionnelle de la peau', type: 'partial', weight: 0.3 },
    { text: 'nos peelings médicaux à Liège', type: 'branded', weight: 0.2 },
    { text: 'renouvellement cutané', type: 'generic', weight: 0.2 },
    { text: 'révéler l\'éclat de votre peau', type: 'generic', weight: 0.2 },
    { text: 'améliorer la texture et la qualité de peau', type: 'longtail', weight: 0.1 }
  ],
  'stimulateurs-collagene-liege': [
    { text: 'stimulateurs de collagène Liège', type: 'exact', weight: 0.2 },
    { text: 'stimulation du collagène', type: 'exact', weight: 0.2 },
    { text: 'traitement aux stimulateurs de collagène', type: 'partial', weight: 0.3 },
    { text: 'régénération naturelle du collagène', type: 'partial', weight: 0.3 },
    { text: 'nos stimulateurs de collagène', type: 'branded', weight: 0.2 },
    { text: 'rajeunissement durable', type: 'generic', weight: 0.2 },
    { text: 'résultats longue durée', type: 'generic', weight: 0.2 },
    { text: 'stimuler la production de collagène naturellement', type: 'longtail', weight: 0.1 }
  ],
  'cosmetologie-liege': [
    { text: 'cosmétologie Liège', type: 'exact', weight: 0.2 },
    { text: 'cosmétologie médicale', type: 'exact', weight: 0.2 },
    { text: 'soins de cosmétologie', type: 'partial', weight: 0.3 },
    { text: 'conseils en cosmétologie médicale', type: 'partial', weight: 0.3 },
    { text: 'notre approche en cosmétologie', type: 'branded', weight: 0.2 },
    { text: 'soins de la peau professionnels', type: 'generic', weight: 0.2 },
    { text: 'protocoles de soins', type: 'generic', weight: 0.2 },
    { text: 'optimiser vos résultats avec des soins adaptés', type: 'longtail', weight: 0.1 }
  ]
};

export const getAnchorText = (href: string, preferredType?: AnchorType): string => {
  const variations = anchorVariations[href] || [];

  if (variations.length === 0) {
    return href.split('/').pop()?.replace(/-/g, ' ') || 'En savoir plus';
  }

  if (preferredType) {
    const filtered = variations.filter(v => v.type === preferredType);
    if (filtered.length > 0) {
      return filtered[Math.floor(Math.random() * filtered.length)].text;
    }
  }

  const totalWeight = variations.reduce((sum, v) => sum + v.weight, 0);
  let random = Math.random() * totalWeight;

  for (const variation of variations) {
    random -= variation.weight;
    if (random <= 0) {
      return variation.text;
    }
  }

  return variations[0].text;
};

export const getVariedAnchors = (href: string, count: number = 3): string[] => {
  const variations = anchorVariations[href] || [];
  const selected: string[] = [];
  const typeOrder: AnchorType[] = ['exact', 'partial', 'branded', 'generic', 'longtail'];

  for (const type of typeOrder) {
    const filtered = variations.filter(v => v.type === type && !selected.includes(v.text));
    if (filtered.length > 0 && selected.length < count) {
      selected.push(filtered[Math.floor(Math.random() * filtered.length)].text);
    }
  }

  while (selected.length < count && variations.length > selected.length) {
    const remaining = variations.filter(v => !selected.includes(v.text));
    if (remaining.length > 0) {
      selected.push(remaining[Math.floor(Math.random() * remaining.length)].text);
    } else {
      break;
    }
  }

  return selected;
};

export const addAnchorVariation = (
  href: string,
  text: string,
  type: AnchorType,
  weight: number = 0.2
): void => {
  if (!anchorVariations[href]) {
    anchorVariations[href] = [];
  }

  anchorVariations[href].push({ text, type, weight });
};

export { AnchorType, AnchorVariation };
