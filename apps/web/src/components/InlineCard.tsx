'use client';

import type { ReactElement } from 'react';
import type { CardPayload } from '@levelup/shared';
import { CardPush } from '@levelup/motion';
import { useDrawer } from '@/lib/drawer';
import { formatMessage } from '@/lib/i18n';
import { useI18n } from '@/lib/i18n-client';

/* ── Progress (C1) ─────────────────────────────── */

function ProgressCard({ title, percent, nextStep, goalId }: CardPayload & { type: 'progress' }): ReactElement {
  const { open } = useDrawer();
  const { messages } = useI18n();
  const t = messages.inlineCard;
  return (
    <div className="inline-card">
      <div className="inline-card-head">
        <div className="dot active" />
        <span className="inline-card-title">{title}</span>
        <div className="inline-card-spacer" />
        <span className="inline-card-pct">{percent}%</span>
      </div>
      <div className="track">
        <div className="track-fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="inline-card-grid">
        <div className="inline-card-cell">
          <div className="inline-card-label">{t.next}</div>
          <div className="inline-card-value">{nextStep}</div>
        </div>
      </div>
      <div
        className="inline-card-cta"
        onClick={() => open({ type: 'goal', goalId })}
        style={{ cursor: 'pointer' }}
      >
        <span className="inline-card-cta-arrow">→</span>
        <span className="inline-card-cta-text">{t.viewFullPath}</span>
      </div>
    </div>
  );
}

/* ── Locate (C2) ───────────────────────────────── */

function LocateCard({ trail, currentNode }: CardPayload & { type: 'locate' }): ReactElement {
  const { messages } = useI18n();
  const t = messages.inlineCard;
  return (
    <div className="inline-card">
      <div className="inline-card-head">
        <span className="inline-card-label">{t.yourPosition}</span>
      </div>
      <div className="inline-card-trail">
        {trail.map((node, i) => (
          <span key={i} className={node === currentNode ? 'trail-current' : 'trail-dim'}>
            {node}
            {i < trail.length - 1 && <span className="trail-sep"> → </span>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Status (C3) ───────────────────────────────── */

function StatusCard({ title, currentMilestone, recentAction, goalId }: CardPayload & { type: 'status' }): ReactElement {
  const { open } = useDrawer();
  const { messages } = useI18n();
  const t = messages.inlineCard;
  return (
    <div className="inline-card">
      <div className="inline-card-head">
        <div className="dot active" />
        <span className="inline-card-title">{title}</span>
      </div>
      <div className="inline-card-grid">
        <div className="inline-card-cell">
          <div className="inline-card-label">{t.milestone}</div>
          <div className="inline-card-value">{currentMilestone}</div>
        </div>
        <div className="inline-card-cell">
          <div className="inline-card-label">{t.lastAction}</div>
          <div className="inline-card-value dim">{recentAction}</div>
        </div>
      </div>
      <div
        className="inline-card-cta"
        onClick={() => open({ type: 'goal', goalId })}
        style={{ cursor: 'pointer' }}
      >
        <span className="inline-card-cta-arrow">→</span>
        <span className="inline-card-cta-text">{t.viewFullPath}</span>
      </div>
    </div>
  );
}

/* ── Summary (C4) ──────────────────────────────── */

function SummaryCard({ goals }: CardPayload & { type: 'summary' }): ReactElement {
  const { messages } = useI18n();
  const t = messages.inlineCard;
  return (
    <div className="inline-card">
      <div className="inline-card-head">
        <span className="inline-card-label">{t.allActiveGoals}</span>
      </div>
      {goals.map((g) => (
        <div key={g.id} className="inline-card-summary-row">
          <div className={`dot ${g.percent > 80 ? 'active' : g.percent > 0 ? 'idle' : 'stuck'}`} />
          <span className="inline-card-value" style={{ flex: 1 }}>{g.title}</span>
          <span className="inline-card-pct">{g.percent}%</span>
        </div>
      ))}
    </div>
  );
}

/* ── Encourage (C5) ────────────────────────────── */

function EncourageCard({ doneActions, days }: CardPayload & { type: 'encourage' }): ReactElement {
  const { messages } = useI18n();
  const t = messages.inlineCard;
  return (
    <div className="inline-card">
      <div className="inline-card-head">
        <span className="inline-card-label">{formatMessage(t.pastDays, { days })}</span>
      </div>
      <div className="inline-card-encourage">
        {doneActions.map((a, i) => (
          <div key={i} className="inline-card-done-row">
            <span className="inline-card-check">✓</span>
            <span className="inline-card-value">{a.title}</span>
            <span className="inline-card-done-at">{a.at}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Celebrate (C6) ────────────────────────────── */

function CelebrateCard({ milestoneTitle, oneLinerQuote }: CardPayload & { type: 'celebrate' }): ReactElement {
  const { messages } = useI18n();
  const t = messages.inlineCard;
  return (
    <div className="inline-card celebrate">
      <div className="inline-card-head">
        <span className="inline-card-label accent">{t.milestoneComplete}</span>
      </div>
      <div className="inline-card-celebrate-title">{milestoneTitle}</div>
      {oneLinerQuote && (
        <div className="inline-card-quote">{oneLinerQuote}</div>
      )}
    </div>
  );
}

/* ── Router ────────────────────────────────────── */

export default function InlineCard({ card }: { card: CardPayload }): ReactElement {
  return (
    <CardPush>
      {card.type === 'progress' && <ProgressCard {...card} />}
      {card.type === 'locate' && <LocateCard {...card} />}
      {card.type === 'status' && <StatusCard {...card} />}
      {card.type === 'summary' && <SummaryCard {...card} />}
      {card.type === 'encourage' && <EncourageCard {...card} />}
      {card.type === 'celebrate' && <CelebrateCard {...card} />}
    </CardPush>
  );
}
