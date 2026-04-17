'use client';

import type { ReactElement } from 'react';

interface HeroBlobsProps {
  variant?: 'chat' | 'compact';
}

export default function HeroBlobs({ variant = 'chat' }: HeroBlobsProps): ReactElement {
  if (variant === 'compact') {
    return (
      <div className="hero-blobs" aria-hidden>
        <div className="hero-blob purple" style={{ left: '20%', top: '18%', width: 320, height: 320 }} />
        <div className="hero-blob blue" style={{ left: '50%', top: '28%', width: 260, height: 260 }} />
        <div className="hero-blob pink" style={{ left: '10%', top: '40%', width: 240, height: 220 }} />
      </div>
    );
  }
  return (
    <div className="chat-hero" aria-hidden>
      <div className="chat-hero-core">
        <div className="hero-blob purple" />
        <div className="hero-blob blue" />
        <div className="hero-blob pink" />
      </div>
    </div>
  );
}
