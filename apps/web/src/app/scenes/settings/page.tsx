'use client';

import { useEffect, useState, type ReactElement } from 'react';
import TopBar from '@/components/TopBar';
import ThemeToggle from '@/components/ThemeToggle';

interface Profile {
  name?: string;
  city?: string;
  role?: string;
  timezone?: string;
}

interface Persona {
  warmth: number;
  directness: number;
  pacing: number;
}

interface Digest {
  id: string;
  title?: string;
  summary?: string;
  date?: string;
  kind?: string;
  importance?: number;
}

interface McpToken {
  id: string;
  name: string;
  created_at: number;
  last_used_at?: number;
}

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const r = await fetch(url, { credentials: 'include' });
    if (!r.ok) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
}

export default function SettingsScene(): ReactElement {
  const [profile, setProfile] = useState<Profile>({});
  const [persona, setPersona] = useState<Persona>({ warmth: 50, directness: 50, pacing: 50 });
  const [digests, setDigests] = useState<Digest[]>([]);
  const [tokens, setTokens] = useState<McpToken[]>([]);
  const [nameDraft, setNameDraft] = useState('');
  const [savingName, setSavingName] = useState(false);

  useEffect(() => {
    void (async () => {
      const p = await getJson<{ profile: Profile }>('/api/settings/profile');
      if (p?.profile) {
        setProfile(p.profile);
        setNameDraft(p.profile.name ?? '');
      }
      const per = await getJson<{ persona: Persona }>('/api/settings/persona');
      if (per?.persona) setPersona(per.persona);
      const mem = await getJson<{ digests: Digest[] }>('/api/settings/memory');
      if (mem?.digests) setDigests(mem.digests);
      const tok = await getJson<{ tokens: McpToken[] }>('/api/settings/mcp-tokens');
      if (tok?.tokens) setTokens(tok.tokens);
    })();
  }, []);

  async function saveName(): Promise<void> {
    const next = nameDraft.trim();
    if (!next || next === profile.name || savingName) return;
    setSavingName(true);
    const r = await fetch('/api/settings/profile', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name: next }),
    });
    if (r.ok) setProfile((p) => ({ ...p, name: next }));
    setSavingName(false);
  }

  async function updatePersona(patch: Partial<Persona>): Promise<void> {
    const next = { ...persona, ...patch };
    setPersona(next);
    await fetch('/api/settings/persona', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(patch),
    });
  }

  async function forgetDigest(id: string): Promise<void> {
    setDigests((d) => d.filter((x) => x.id !== id));
    await fetch(`/api/settings/memory/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  }

  async function handleExport(): Promise<void> {
    const r = await fetch('/api/settings/export', { credentials: 'include' });
    if (!r.ok) return;
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `levelup-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleDeleteAccount(): Promise<void> {
    if (!window.confirm('Delete your account? Data will be removed in 30 days. This cannot be undone.')) return;
    const r = await fetch('/api/settings/account', {
      method: 'DELETE',
      credentials: 'include',
    });
    if (r.ok) window.location.href = '/';
  }

  return (
    <div className="app">
      <TopBar context="Settings" right="esc" />
      <div className="settings-body">
        <div className="settings-col">
          <div className="settings-head">
            <div className="settings-title">Settings</div>
            <div className="settings-subtitle">
              The product adjusts around you. Everything here is optional.
            </div>
          </div>

          <section className="settings-section">
            <div className="settings-section-label">PROFILE</div>
            <div className="settings-row">
              <span className="settings-row-label">Name</span>
              <input
                className="settings-row-value"
                style={{ textAlign: 'right', border: 'none', background: 'none', outline: 'none', width: 240, color: 'var(--fg-0)' }}
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                onBlur={saveName}
                onKeyDown={(e) => e.key === 'Enter' && saveName()}
                placeholder="Tell me what to call you"
              />
            </div>
            <div className="settings-row">
              <span className="settings-row-label">Timezone</span>
              <span className="settings-row-value">
                {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </span>
            </div>
          </section>

          <section className="settings-section">
            <div className="settings-section-label">TONE</div>
            <div className="settings-section-sub">
              Three dials that shape how I speak. Adjust any time — I&apos;ll learn.
            </div>
            <PersonaSlider label="Warmth" value={persona.warmth} onChange={(v) => updatePersona({ warmth: v })} />
            <PersonaSlider label="Directness" value={persona.directness} onChange={(v) => updatePersona({ directness: v })} />
            <PersonaSlider label="Pacing" value={persona.pacing} onChange={(v) => updatePersona({ pacing: v })} />
          </section>

          <section className="settings-section">
            <div className="settings-section-label">WHAT I REMEMBER</div>
            <div className="settings-section-sub">
              You can delete anything here. Deletions may soften the continuity of our conversation.
            </div>
            {digests.length === 0 ? (
              <div className="mem-card" style={{ color: 'var(--fg-2)', fontSize: 13 }}>
                Nothing remembered yet. Start a conversation.
              </div>
            ) : (
              <div className="mem-card">
                {digests.map((d) => (
                  <div key={d.id} className="mem-row">
                    <div className="mem-row-text">
                      <div className="mem-row-title">{d.title ?? d.summary ?? 'Untitled'}</div>
                      <div className="mem-row-meta">
                        {d.date ?? ''}{d.date && d.kind ? ' · ' : ''}{d.kind?.toUpperCase() ?? ''}
                      </div>
                    </div>
                    <div
                      className="mem-row-x"
                      onClick={() => void forgetDigest(d.id)}
                      role="button"
                      title="Forget"
                    >
                      ×
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="settings-section">
            <div className="settings-section-label">MCP TOKENS</div>
            <div className="settings-section-sub">
              Connect Claude Desktop or any MCP client to read and write your LevelUp state.
            </div>
            {tokens.length === 0 ? (
              <div className="mem-card" style={{ color: 'var(--fg-2)', fontSize: 13 }}>
                No tokens issued.
              </div>
            ) : (
              <div className="mem-card">
                {tokens.map((t) => (
                  <div key={t.id} className="mem-row">
                    <div className="mem-row-text">
                      <div className="mem-row-title">{t.name}</div>
                      <div className="mem-row-meta">
                        CREATED {new Date(t.created_at * 1000).toISOString().slice(0, 10)}
                        {t.last_used_at ? ` · LAST USED ${new Date(t.last_used_at * 1000).toISOString().slice(0, 10)}` : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="settings-section">
            <div className="settings-section-label">APPEARANCE</div>
            <div className="settings-row">
              <span className="settings-row-label">Theme</span>
              <ThemeToggle />
            </div>
          </section>

          <section className="settings-section">
            <div className="settings-section-label">DATA</div>
            <div className="settings-row">
              <span className="settings-row-label">Export everything</span>
              <button className="settings-row-value" onClick={() => void handleExport()}>
                Download →
              </button>
            </div>
            <div className="settings-row">
              <span className="settings-row-label" style={{ color: 'var(--signal)' }}>Delete account</span>
              <button
                className="settings-row-value"
                style={{ color: 'var(--signal)' }}
                onClick={() => void handleDeleteAccount()}
              >
                Delete →
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function PersonaSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}): ReactElement {
  return (
    <div className="settings-row">
      <span className="settings-row-label">{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: 280 }}>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ flex: 1, accentColor: 'var(--accent)' }}
        />
        <span
          className="settings-row-value"
          style={{ width: 32, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
