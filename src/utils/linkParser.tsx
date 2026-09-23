import React from 'react';
import { Link } from 'react-router-dom';

export const parseInternalLinks = (text: string | undefined | null): React.ReactNode[] => {
  if (!text || typeof text !== 'string') {
    return [text || ''];
  }

  const linkPattern = /\[\[([^\|]+)\|([^\]]+)\]\]/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let matchIndex = 0;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const anchorText = match[1];
    const href = match[2];

    parts.push(
      <Link
        key={`link-${matchIndex}`}
        to={href}
        title={anchorText}
        className="text-primary-600 hover:text-primary-700 underline decoration-primary-200 hover:decoration-primary-400 font-medium transition-colors duration-200"
      >
        {anchorText}
      </Link>
    );

    lastIndex = match.index + match[0].length;
    matchIndex++;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
};

export const hasInternalLinks = (text: string | undefined | null): boolean => {
  if (!text || typeof text !== 'string') {
    return false;
  }
  return /\[\[([^\|]+)\|([^\]]+)\]\]/.test(text);
};
