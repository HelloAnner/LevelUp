'use client';

import { type ReactElement } from 'react';
import type { MockGoal } from '@/lib/mock';
import { useKeyboard } from '@/lib/keyboard';
import { useI18n } from '@/lib/i18n-client';

interface SidebarProps {
  goals?: MockGoal[];
  onGoalClick?: (goalId: string) => void;
}

export default function Sidebar({
  goals = [],
  onGoalClick,
}: SidebarProps): ReactElement {
  const { sidebarCollapsed } = useKeyboard();
  const { messages } = useI18n();
  const t = messages.sidebar;

  if (sidebarCollapsed) {
    return (
      <aside className="sidebar collapsed">
        {goals.map((g) => (
          <div
            key={g.id}
            className={`dot ${g.status}`}
            title={g.title}
            onClick={() => onGoalClick?.(g.id)}
            style={{ cursor: 'pointer' }}
          />
        ))}
        <div style={{ height: 20 }} />
        <span className="sb-add" aria-hidden>
          +
        </span>
      </aside>
    );
  }

  return (
    <aside className="sidebar expanded">
      <div className="sb-label">{t.goals}</div>
      {goals.map((g) => (
        <div
          key={g.id}
          className={`goal-card ${g.current ? 'current' : ''}`}
          onClick={() => onGoalClick?.(g.id)}
          style={{ cursor: 'pointer' }}
        >
          <div className="goal-card-top">
            <div className={`dot ${g.status}`} />
            <span className="goal-card-title">{g.title}</span>
            <span className="goal-card-pct">{g.percent}%</span>
          </div>
          <div className={`goal-card-sub ${g.subAlert ? 'alert' : ''}`}>{g.sub}</div>
          <div className="track">
            <div className="track-fill" style={{ width: `${g.percent}%` }} />
          </div>
        </div>
      ))}
      <div className="new-goal">
        <span className="new-goal-plus">+</span>
        <span className="new-goal-text">{t.newGoal}</span>
      </div>
    </aside>
  );
}
