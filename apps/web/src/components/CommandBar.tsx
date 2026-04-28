'use client';

import { useEffect, useRef, type ReactElement } from 'react';
import { Command } from 'cmdk';
import { useKeyboard } from '@/lib/keyboard';
import { CommandBarRise } from '@levelup/motion';
import { getMockGoals } from '@/lib/mock';
import { useI18n } from '@/lib/i18n-client';

interface CommandAction {
  id: string;
  label: string;
  icon: string;
  kbd?: string;
}

export default function CommandBar(): ReactElement {
  const { commandBarOpen, setCommandBarOpen } = useKeyboard();
  const { messages } = useI18n();
  const t = messages.commandBar;
  const goals = getMockGoals(messages);
  const inputRef = useRef<HTMLInputElement>(null);
  const actions: CommandAction[] = [
    { id: 'new-goal', label: t.actions.newGoal, icon: '+', kbd: '⌘N' },
    { id: 'retro', label: t.actions.retro, icon: '↻', kbd: '⌘R' },
    { id: 'roadmap', label: t.actions.roadmap, icon: '→', kbd: '⌘M' },
    { id: 'archive', label: t.actions.archive, icon: '⌫' },
  ];

  useEffect(() => {
    if (commandBarOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [commandBarOpen]);

  function handleSelect(id: string) {
    setCommandBarOpen(false);
    // Actions will be wired to real handlers when backend is connected
    console.log('[CommandBar] selected:', id);
  }

  return (
    <CommandBarRise open={commandBarOpen}>
      <div className="scrim" onClick={() => setCommandBarOpen(false)}>
        <div className="cmdbar" onClick={(e) => e.stopPropagation()}>
          <div className="cmdbar-halo" />
          <Command shouldFilter label={t.label}>
            <div className="cmdbar-search">
              <span className="icon-btn" aria-hidden>⌕</span>
              <Command.Input
                ref={inputRef}
                placeholder=""
                className="cmdbar-input"
              />
              <span className="kbd">ESC</span>
            </div>
            <Command.List>
              <div className="cmdbar-body">
                <Command.Empty>
                  <div className="cmdbar-empty">{t.empty}</div>
                </Command.Empty>

                <Command.Group heading={t.goalsHeading}>
                  {goals.map((g, i) => (
                    <Command.Item
                      key={g.id}
                      value={g.title}
                      onSelect={() => handleSelect(g.id)}
                      className="cmdbar-row"
                    >
                      <span className="cmdbar-row-icon">
                        <span className={`dot ${g.status}`} />
                      </span>
                      <span className="cmdbar-row-text">{g.title}</span>
                      <span className="cmdbar-row-meta">{g.percent}%</span>
                      <span className="kbd kbd-sm">⌘{i + 1}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading={t.actionsHeading}>
                  {actions.map((a) => (
                    <Command.Item
                      key={a.id}
                      value={a.label}
                      onSelect={() => handleSelect(a.id)}
                      className="cmdbar-row"
                    >
                      <span className="cmdbar-row-icon">{a.icon}</span>
                      <span className="cmdbar-row-text">{a.label}</span>
                      {a.kbd && <span className="kbd kbd-sm">{a.kbd}</span>}
                    </Command.Item>
                  ))}
                </Command.Group>
              </div>
            </Command.List>
          </Command>
          <div className="cmdbar-foot">
            <span className="cmdbar-foot-item"><strong>↑↓</strong> {t.footer.navigate}</span>
            <span className="cmdbar-foot-item"><strong>↵</strong> {t.footer.select}</span>
            <span className="cmdbar-foot-item"><strong>ESC</strong> {t.footer.close}</span>
          </div>
        </div>
      </div>
    </CommandBarRise>
  );
}
