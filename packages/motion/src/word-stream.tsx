'use client';

import { useMemo, useRef, type ReactElement } from 'react';
import { useReducedMotion } from './reduced-motion';

interface WordStreamProps {
  text: string;
  startDelay?: number;
  /** Gap between words in ms (default 60) */
  gap?: number;
  /** Extra pause after sentence-ending punctuation (default 240) */
  sentencePause?: number;
  /**
   * When true, only words appended since last render animate in —
   * existing words stay static. Use for live SSE token streams so
   * you don't re-stagger the whole message each token.
   */
  streaming?: boolean;
  className?: string;
}

/**
 * Splits text by words, animating each in with staggered timing.
 * 180ms fade+blur+Y per word, 60ms word gap, 240ms sentence pause.
 * When reduced-motion: renders all at once.
 */
export function WordStream({
  text,
  startDelay = 0,
  gap = 60,
  sentencePause = 240,
  streaming = false,
  className = '',
}: WordStreamProps): ReactElement {
  const reduced = useReducedMotion();
  const parts = useMemo(() => text.split(/(\s+)/), [text]);
  const seenCount = useRef(0);

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const firstNewIndex = streaming ? seenCount.current : 0;
  seenCount.current = parts.length;

  let delay = startDelay;
  return (
    <span className={`word-stream ${className}`}>
      {parts.map((part, i) => {
        if (part.trim() === '') {
          return <span key={i}>{preserveWhitespace(part)}</span>;
        }
        if (streaming && i < firstNewIndex) {
          return <span key={i} style={{ opacity: 1, animation: 'none' }}>{part}</span>;
        }
        const d = delay;
        delay += gap;
        if (/[.!?。！？]$/.test(part)) delay += sentencePause - gap;
        return (
          <span key={i} style={{ animationDelay: `${d}ms` }}>
            {part}
          </span>
        );
      })}
    </span>
  );
}

function preserveWhitespace(part: string): string {
  return part.replace(/ /g, '\u00A0').replace(/\t/g, '\u00A0\u00A0');
}
