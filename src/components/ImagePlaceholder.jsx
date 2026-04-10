import { useState } from 'react';

// Editorial image placeholder for client pitch.
// Renders a real <img> when `src` is provided.
// Falls back to a branded type-on-gradient treatment — not a broken state.
//
// Image folder structure:
//   /public/images/products/   — product photos (chain-01.png, anklet-01.png, etc.)
//   /public/images/gallery/    — lookbook / on-body / lifestyle shots
//   /public/images/studio/     — studio interior, team, weld process, hero
//
// Props:
//   src       — image path. Tries to load; falls back gracefully on error.
//   name      — display name shown in fallback (large serif italic)
//   detail    — secondary line (material, view type, etc.)
//   compact   — if true, shows only the detail line (for thumbnails)
//   dark      — dark gradient variant for espresso-background sections
//   className — passed to outer wrapper
//   style     — passed to outer wrapper

// Gradient variation seeded by name so cards are visually distinct
const GRADIENTS = [
  { angle: 135, from: '#E8E0D4', to: '#C9BDAE' },
  { angle: 150, from: '#E3DAC9', to: '#D4C4AC' },
  { angle: 160, from: '#DDD5C7', to: '#C7BAA8' },
  { angle: 140, from: '#E5DDD0', to: '#CCBFAE' },
  { angle: 125, from: '#E0D8CC', to: '#D0C4B2' },
  { angle: 145, from: '#E6DECE', to: '#C5B8A5' },
  { angle: 155, from: '#E2D9CB', to: '#CBBDA8' },
  { angle: 130, from: '#E7DFD1', to: '#D1C5B3' },
];

function gradientForName(name = '') {
  const seed = name.split('').reduce((sum, c) => sum + c.charCodeAt(0), 0);
  const g = GRADIENTS[seed % GRADIENTS.length];
  return `linear-gradient(${g.angle}deg, ${g.from} 0%, ${g.to} 100%)`;
}

export default function ImagePlaceholder({ src, label, name, detail, compact, className, style, dark }) {
  const [imgFailed, setImgFailed] = useState(false);
  const displayName = name || label || '';
  const showImg = src && !imgFailed;

  const bg = showImg
    ? 'var(--oat)'
    : dark
      ? 'linear-gradient(145deg, #3D3530 0%, #2A1F14 100%)'
      : gradientForName(displayName);

  return (
    <div
      className={`placeholder ${dark ? 'placeholder--dark' : ''} ${compact ? 'placeholder--compact' : ''} ${className || ''}`}
      style={{ ...style, background: bg }}
    >
      {showImg ? (
        <img
          src={src}
          alt={displayName}
          className="placeholder__img"
          onError={() => setImgFailed(true)}
          loading="lazy"
        />
      ) : (
        <div className="placeholder__inner">
          <div className="placeholder__rule" />
          {!compact && displayName && (
            <span className="placeholder__name">{displayName}</span>
          )}
          {detail && (
            <span className="placeholder__detail">{detail}</span>
          )}
          <div className="placeholder__rule" />
        </div>
      )}
    </div>
  );
}
