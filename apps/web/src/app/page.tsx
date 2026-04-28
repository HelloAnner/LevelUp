'use client';

import { useEffect, useRef, useState, type ReactElement } from 'react';
import TopBar from '@/components/TopBar';
import Sidebar from '@/components/Sidebar';
import InputBar from '@/components/InputBar';
import InlineCard from '@/components/InlineCard';
import HeroBlobs from '@/components/HeroBlobs';
import WordStream from '@/components/WordStream';
import { coerceDevLoginEmail } from '@/lib/dev-login';
import { getMockGoals } from '@/lib/mock';
import { useDrawer } from '@/lib/drawer';
import { useI18n } from '@/lib/i18n-client';

import type { CardPayload } from '@levelup/shared';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  card?: CardPayload | null;
  streaming?: boolean;
}

export default function Home(): ReactElement {
  const { messages: i18nMessages } = useI18n();
  const appText = i18nMessages.app;
  const goals = getMockGoals(i18nMessages);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [convId, setConvId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState(false);
  const streamRef = useRef<HTMLDivElement | null>(null);
  const { open: openDrawer } = useDrawer();

  useEffect(() => {
    void fetch('/api/auth/me', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.user) setLoggedIn(true);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    streamRef.current?.scrollTo({ top: 999999, behavior: 'smooth' });
  }, [chatMessages, pending]);

  async function handleLogin(): Promise<void> {
    const target = coerceDevLoginEmail(email) ?? 'you@local.dev';
    const res = await fetch('/api/auth/dev-login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email: target }),
    });
    if (res.ok) setLoggedIn(true);
  }

  async function ensureConversation(): Promise<string> {
    if (convId) return convId;
    const res = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: '{}',
    });
    const data = (await res.json()) as { id: string };
    setConvId(data.id);
    return data.id;
  }

  async function handleSend(text: string): Promise<void> {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    setPending(true);

    const id = await ensureConversation();
    const userMsgId = `u-${Date.now()}`;
    const assistantId = `a-${Date.now()}`;
    setChatMessages((m) => [
      ...m,
      { id: userMsgId, role: 'user', content: trimmed },
      { id: assistantId, role: 'assistant', content: '', streaming: true },
    ]);

    const res = await fetch(`/api/conversations/${id}/messages`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ content: trimmed }),
    });

    if (!res.body) {
      setPending(false);
      return;
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split('\n\n');
      buffer = events.pop() ?? '';
      for (const block of events) {
        const lines = block.split('\n');
        const eventLine = lines.find((l) => l.startsWith('event:'));
        const dataLine = lines.find((l) => l.startsWith('data:'));
        if (!eventLine || !dataLine) continue;
        const eventName = eventLine.slice('event:'.length).trim();
        const data = JSON.parse(dataLine.slice('data:'.length).trim());
        if (eventName === 'token') {
          setChatMessages((m) =>
            m.map((msg) =>
              msg.id === assistantId
                ? { ...msg, content: msg.content + data.delta }
                : msg,
            ),
          );
        } else if (eventName === 'replace') {
          setChatMessages((m) =>
            m.map((msg) => (msg.id === assistantId ? { ...msg, content: '' } : msg)),
          );
        } else if (eventName === 'card') {
          setChatMessages((m) =>
            m.map((msg) =>
              msg.id === assistantId
                ? { ...msg, card: data as CardPayload }
                : msg,
            ),
          );
        } else if (eventName === 'done' || eventName === 'error') {
          setChatMessages((m) =>
            m.map((msg) =>
              msg.id === assistantId ? { ...msg, streaming: false } : msg,
            ),
          );
          setPending(false);
        }
      }
    }
  }

  if (!loggedIn) {
    return (
      <div className="app">
        <TopBar right="none" />
        <div className="body-center">
          <HeroBlobs />
          <div className="login-stack">
            <div className="login-q">{appText.loginQuestion}</div>
            <div className="login-input-wrap">
              <input
                className="login-input"
                placeholder={appText.loginPlaceholder}
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && void handleLogin()}
                type="text"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <div className="login-input-line" />
            </div>
            <div className="login-hint">{appText.loginHint}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <TopBar context={appText.loginContext} />
      <div className="body">
        <Sidebar
          goals={goals}
          onGoalClick={(id) => openDrawer({ type: 'goal', goalId: id })}
        />
        <main className="main" style={{ position: 'relative' }}>
          {chatMessages.length === 0 && <HeroBlobs />}
          <div className="msg-area" ref={streamRef} style={{ position: 'relative', zIndex: 1 }}>
            <div className="msg-col">
              {chatMessages.length === 0 && (
                <div className="msg-ai" style={{ color: 'var(--fg-1)', textAlign: 'center' }}>
                  {appText.emptyChat}
                </div>
              )}
              {chatMessages.map((m) => {
                if (m.role === 'user') {
                  return (
                    <div key={m.id} className="msg-user">
                      <div className="msg-user-text">{m.content}</div>
                      <div className="msg-user-line" />
                    </div>
                  );
                }
                return (
                  <div key={m.id} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {m.content && (
                      <div className="msg-ai">
                        {m.streaming ? (
                          <WordStream text={m.content} streaming />
                        ) : (
                          m.content
                        )}
                      </div>
                    )}
                    {m.card && <InlineCard card={m.card} />}
                  </div>
                );
              })}
            </div>
          </div>
          <InputBar
            placeholder={appText.inputPlaceholder}
            onSubmit={handleSend}
            disabled={pending}
          />
        </main>
      </div>
    </div>
  );
}
