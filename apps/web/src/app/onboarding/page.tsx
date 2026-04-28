'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import Halo from '@/components/Halo';
import WordStream from '@/components/WordStream';
import { formatMessage } from '@/lib/i18n';
import { useI18n } from '@/lib/i18n-client';

type Scene = 1 | 2 | 3 | 4 | 5;

/**
 * Onboarding 5-step flow (PRD §F2):
 * 1. Silence (theater)
 * 2. Light (halo appears)
 * 3. First question — "What should I call you?"
 * 4. AI introduces itself, asks for goal
 * 5. Goal creation via conversation (streamed from backend)
 */
export default function OnboardingPage(): ReactElement {
  const { messages } = useI18n();
  const t = messages.onboarding;
  const [scene, setScene] = useState<Scene>(1);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [creating, setCreating] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const goalRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (scene === 1) {
      const t = setTimeout(() => setScene(2), 1200);
      return () => clearTimeout(t);
    }
    if (scene === 2) {
      const t = setTimeout(() => setScene(3), 1800);
      return () => clearTimeout(t);
    }
    if (scene === 3) {
      inputRef.current?.focus();
    }
    if (scene === 5) {
      goalRef.current?.focus();
    }
    return undefined;
  }, [scene]);

  function handleNameSubmit(event?: FormEvent<HTMLFormElement>): void {
    event?.preventDefault();
    const trimmed = inputRef.current?.value.trim() ?? name.trim();
    if (!trimmed) return;
    setName(trimmed);
    setScene(4);
  }

  async function handleGoalSubmit(event?: FormEvent<HTMLFormElement>): Promise<void> {
    event?.preventDefault();
    const trimmed = goalRef.current?.value.trim() ?? goal.trim();
    if (!trimmed || creating) return;
    setGoal(trimmed);
    setCreating(true);

    try {
      // Save the user's name to profile (anchor step)
      if (name.trim()) {
        await fetch('/api/settings/profile', {
          method: 'PATCH',
          headers: { 'content-type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ name: name.trim() }),
        });
      }

      // Create goal — the remaining onboarding steps (define-done /
      // milestones / focus / bind intention) happen organically in the
      // conversation flow on the main page, not as explicit form steps
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title: trimmed }),
      });

      if (!res.ok) {
        setCreating(false);
        return;
      }

      // Seed a conversation so the user lands in chat with continuity
      await fetch('/api/conversations', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: '{}',
      });

      router.push('/');
    } catch {
      setCreating(false);
    }
  }

  return (
    <div className="scene">
      <div className="scene-label">
        {scene === 1 ? t.sceneSilence :
         scene === 2 ? t.sceneLight :
         scene === 3 ? t.sceneQuestion :
         scene === 4 ? t.sceneIdentification : t.sceneAnchor}
      </div>

      {scene === 1 && (
        <div className="center-stack">
          <div
            className="scene-mini-dot"
            style={{ background: 'var(--fg-3)', opacity: 0.3 }}
          />
        </div>
      )}

      {scene === 2 && (
        <>
          <Halo size={1400} y="30%" opacity={0.8} />
          <Halo size={760} y="60%" soft opacity={0.45} />
          <div className="center-stack">
            <div className="scene-mini-dot" style={{ background: 'var(--accent)' }} />
          </div>
        </>
      )}

      {scene === 3 && (
        <>
          <Halo size={1000} y="40%" opacity={0.6} />
          <div className="center-stack">
            <div className="scene-question">{t.question}</div>
            <form className="scene-form" onSubmit={handleNameSubmit}>
              <div className="scene-input-row">
                <input
                  ref={inputRef}
                  className="scene-input-text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {name.length === 0 && <div className="scene-cursor" />}
                <div className="scene-input-line" />
              </div>
              <button className="scene-cta" type="submit" disabled={!name.trim()}>
                {t.continue}
              </button>
            </form>
          </div>
          <div className="scene-hint">↵</div>
        </>
      )}

      {scene === 4 && (
        <>
          <Halo size={900} y="60%" opacity={0.45} />
          <div className="center-stack" style={{ alignItems: 'flex-start', paddingLeft: '25%' }}>
            <div className="scene-col">
              <div className="hello">
                <WordStream
                  text={formatMessage(t.hello, { name: name || t.helloFallback })}
                />
              </div>
              <div className="scene-sep" />
              <div className="scene-line">
                <WordStream
                  text={t.line1}
                  startDelay={400}
                />
              </div>
              <div className="scene-line dim">
                <WordStream
                  text={t.line2}
                  startDelay={2400}
                />
              </div>
              <button className="scene-line scene-line-button accent" type="button" onClick={() => setScene(5)}>
                <WordStream
                  text={t.line3}
                  startDelay={4200}
                />
              </button>
            </div>
          </div>
        </>
      )}

      {scene === 5 && (
        <>
          <Halo size={800} y="50%" opacity={0.5} />
          <div className="center-stack">
            <div className="scene-question" style={{ fontSize: 14, color: 'var(--fg-1)', marginBottom: 16 }}>
              {name
                ? formatMessage(t.goalQuestionWithName, { name })
                : t.goalQuestionWithoutName}
            </div>
            <form className="scene-form" onSubmit={(e) => void handleGoalSubmit(e)}>
              <div className="scene-input-row" style={{ maxWidth: 480 }}>
                <input
                  ref={goalRef}
                  className="scene-input-text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  disabled={creating}
                  style={{ fontSize: 18 }}
                />
                {goal.length === 0 && <div className="scene-cursor" />}
                <div className="scene-input-line" />
              </div>
              <button className="scene-cta" type="submit" disabled={creating || !goal.trim()}>
                {creating ? t.creating : t.continue}
              </button>
            </form>
            <div className="scene-hint" style={{ marginTop: 24 }}>
              {creating ? t.creating : '↵'}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
