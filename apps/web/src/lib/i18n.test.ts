import { describe, expect, it } from 'vitest';
import { formatMessage, resolveLocale } from './i18n';

describe('i18n helpers', () => {
  it('prefers a recognized cookie locale', () => {
    expect(resolveLocale('en-US', 'zh-CN,zh;q=0.9')).toBe('en-US');
  });

  it('falls back to accept-language when no cookie exists', () => {
    expect(resolveLocale(null, 'en-GB,en;q=0.8,zh;q=0.5')).toBe('en-US');
    expect(resolveLocale(undefined, 'zh-CN,zh;q=0.9,en;q=0.5')).toBe('zh-CN');
  });

  it('formats placeholder templates', () => {
    expect(formatMessage('过去 {days} 天', { days: 7 })).toBe('过去 7 天');
  });
});
