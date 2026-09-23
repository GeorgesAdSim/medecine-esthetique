import React from 'react';

interface FloralDecorationProps {
  position?: 'top-left' | 'top-right' | 'top-center';
  size?: 'small' | 'medium' | 'large';
  opacity?: number;
  variant?: 'floral' | 'venus' | 'shell' | 'wave';
}

const FloralDecoration: React.FC<FloralDecorationProps> = ({ 
  position = 'top-right', 
  size = 'medium',
  opacity = 0.1,
  variant = 'floral'
}) => {
  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64'
  };

  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'top-center': 'top-0 left-1/2 transform -translate-x-1/2'
  };

  // Motif Vénus - Silhouette féminine stylisée
  if (variant === 'venus') {
    return (
      <div 
        className={`absolute ${positionClasses[position]} ${sizeClasses[size]} pointer-events-none z-0`}
        style={{ opacity }}
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Silhouette féminine inspirée de Vénus */}
          <path 
            d="M100 40 C85 45, 75 60, 80 80 C85 100, 95 120, 100 140 C105 120, 115 100, 120 80 C125 60, 115 45, 100 40 Z" 
            fill="url(#venusGradient)" 
            opacity="0.6"
          />
          
          {/* Cheveux ondulés */}
          <path 
            d="M85 45 Q70 35, 60 50 Q55 65, 70 70 Q85 65, 90 55" 
            fill="url(#hairGradient)" 
            opacity="0.4"
          />
          <path 
            d="M115 45 Q130 35, 140 50 Q145 65, 130 70 Q115 65, 110 55" 
            fill="url(#hairGradient)" 
            opacity="0.4"
          />
          
          {/* Drapé délicat */}
          <path 
            d="M90 100 Q70 110, 75 130 Q80 150, 100 145 Q120 150, 125 130 Q130 110, 110 100" 
            fill="url(#drapeGradient)" 
            opacity="0.3"
          />

          <defs>
            <linearGradient id="venusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f2b885" />
              <stop offset="50%" stopColor="#e8a05c" />
              <stop offset="100%" stopColor="#d4873f" />
            </linearGradient>
            <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b8692a" />
              <stop offset="100%" stopColor="#9b5422" />
            </linearGradient>
            <linearGradient id="drapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef9f5" />
              <stop offset="100%" stopColor="#fdf4ed" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Motif Coquillage - Inspiré de la coquille de Vénus
  if (variant === 'shell') {
    return (
      <div 
        className={`absolute ${positionClasses[position]} ${sizeClasses[size]} pointer-events-none z-0`}
        style={{ opacity }}
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Coquille principale */}
          <path 
            d="M100 160 L60 100 Q70 80, 100 85 Q130 80, 140 100 L100 160 Z" 
            fill="url(#shellGradient)" 
          />
          
          {/* Nervures de la coquille */}
          <path d="M100 160 L100 85" stroke="url(#shellStroke)" strokeWidth="1" opacity="0.6" />
          <path d="M100 160 L75 95" stroke="url(#shellStroke)" strokeWidth="1" opacity="0.4" />
          <path d="M100 160 L125 95" stroke="url(#shellStroke)" strokeWidth="1" opacity="0.4" />
          <path d="M100 160 L85 100" stroke="url(#shellStroke)" strokeWidth="1" opacity="0.3" />
          <path d="M100 160 L115 100" stroke="url(#shellStroke)" strokeWidth="1" opacity="0.3" />
          
          {/* Perles délicates */}
          <circle cx="90" cy="120" r="3" fill="url(#pearlGradient)" opacity="0.8" />
          <circle cx="110" cy="125" r="2.5" fill="url(#pearlGradient)" opacity="0.7" />
          <circle cx="105" cy="140" r="2" fill="url(#pearlGradient)" opacity="0.6" />

          <defs>
            <linearGradient id="shellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fdf8f6" />
              <stop offset="30%" stopColor="#f3b4b4" />
              <stop offset="70%" stopColor="#e8b4b8" />
              <stop offset="100%" stopColor="#d49497" />
            </linearGradient>
            <linearGradient id="shellStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b87377" />
              <stop offset="100%" stopColor="#9b5f63" />
            </linearGradient>
            <radialGradient id="pearlGradient" cx="50%" cy="30%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f5f0f0" />
              <stop offset="100%" stopColor="#e8b4b8" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Motif Vagues - Inspiré des vagues de la mer de Vénus
  if (variant === 'wave') {
    return (
      <div 
        className={`absolute ${positionClasses[position]} ${sizeClasses[size]} pointer-events-none z-0`}
        style={{ opacity }}
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Vagues fluides */}
          <path 
            d="M0 100 Q50 80, 100 100 T200 100 L200 120 Q150 140, 100 120 T0 120 Z" 
            fill="url(#waveGradient1)" 
            opacity="0.6"
          />
          <path 
            d="M0 130 Q50 110, 100 130 T200 130 L200 150 Q150 170, 100 150 T0 150 Z" 
            fill="url(#waveGradient2)" 
            opacity="0.4"
          />
          <path 
            d="M0 160 Q50 140, 100 160 T200 160 L200 180 Q150 200, 100 180 T0 180 Z" 
            fill="url(#waveGradient3)" 
            opacity="0.3"
          />
          
          {/* Écume délicate */}
          <circle cx="30" cy="105" r="2" fill="#ffffff" opacity="0.8" />
          <circle cx="70" cy="95" r="1.5" fill="#ffffff" opacity="0.6" />
          <circle cx="130" cy="105" r="2.5" fill="#ffffff" opacity="0.7" />
          <circle cx="170" cy="95" r="1.8" fill="#ffffff" opacity="0.5" />

          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8b4b8" />
              <stop offset="100%" stopColor="#d49497" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3b4b4" />
              <stop offset="100%" stopColor="#e8b4b8" />
            </linearGradient>
            <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fdf8f6" />
              <stop offset="100%" stopColor="#f3b4b4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <div 
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} pointer-events-none z-0`}
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Fleur principale */}
        <g transform="translate(100,100)">
          {/* Pétales */}
          <ellipse cx="0" cy="-25" rx="8" ry="20" fill="url(#gradient1)" transform="rotate(0)" />
          <ellipse cx="0" cy="-25" rx="8" ry="20" fill="url(#gradient1)" transform="rotate(45)" />
          <ellipse cx="0" cy="-25" rx="8" ry="20" fill="url(#gradient1)" transform="rotate(90)" />
          <ellipse cx="0" cy="-25" rx="8" ry="20" fill="url(#gradient1)" transform="rotate(135)" />
          <ellipse cx="0" cy="-25" rx="8" ry="20" fill="url(#gradient1)" transform="rotate(180)" />
          <ellipse cx="0" cy="-25" rx="8" ry="20" fill="url(#gradient1)" transform="rotate(225)" />
          <ellipse cx="0" cy="-25" rx="8" ry="20" fill="url(#gradient1)" transform="rotate(270)" />
          <ellipse cx="0" cy="-25" rx="8" ry="20" fill="url(#gradient1)" transform="rotate(315)" />
          
          {/* Centre de la fleur */}
          <circle cx="0" cy="0" r="6" fill="url(#gradient2)" />
        </g>

        {/* Fleurs secondaires */}
        <g transform="translate(60,60)">
          <ellipse cx="0" cy="-15" rx="5" ry="12" fill="url(#gradient1)" transform="rotate(0)" />
          <ellipse cx="0" cy="-15" rx="5" ry="12" fill="url(#gradient1)" transform="rotate(60)" />
          <ellipse cx="0" cy="-15" rx="5" ry="12" fill="url(#gradient1)" transform="rotate(120)" />
          <ellipse cx="0" cy="-15" rx="5" ry="12" fill="url(#gradient1)" transform="rotate(180)" />
          <ellipse cx="0" cy="-15" rx="5" ry="12" fill="url(#gradient1)" transform="rotate(240)" />
          <ellipse cx="0" cy="-15" rx="5" ry="12" fill="url(#gradient1)" transform="rotate(300)" />
          <circle cx="0" cy="0" r="4" fill="url(#gradient2)" />
        </g>

        <g transform="translate(140,140)">
          <ellipse cx="0" cy="-12" rx="4" ry="10" fill="url(#gradient1)" transform="rotate(0)" />
          <ellipse cx="0" cy="-12" rx="4" ry="10" fill="url(#gradient1)" transform="rotate(72)" />
          <ellipse cx="0" cy="-12" rx="4" ry="10" fill="url(#gradient1)" transform="rotate(144)" />
          <ellipse cx="0" cy="-12" rx="4" ry="10" fill="url(#gradient1)" transform="rotate(216)" />
          <ellipse cx="0" cy="-12" rx="4" ry="10" fill="url(#gradient1)" transform="rotate(288)" />
          <circle cx="0" cy="0" r="3" fill="url(#gradient2)" />
        </g>

        {/* Feuilles */}
        <path d="M30 120 Q40 110 50 120 Q40 130 30 120" fill="url(#gradient3)" />
        <path d="M150 80 Q160 70 170 80 Q160 90 150 80" fill="url(#gradient3)" />
        <path d="M80 160 Q90 150 100 160 Q90 170 80 160" fill="url(#gradient3)" />

        {/* Dégradés */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3b4b4" />
            <stop offset="100%" stopColor="#e8b4b8" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d49497" />
            <stop offset="100%" stopColor="#b87377" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cfa8a8" />
            <stop offset="100%" stopColor="#b8888d" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default FloralDecoration;