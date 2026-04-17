import { describe, expect, it } from 'vitest';
import { buildApiTargetUrl, shouldProxyRequestBody } from './api-proxy.js';

describe('api proxy helpers', () => {
  it('builds upstream urls from same-origin api paths', () => {
    expect(
      buildApiTargetUrl('/api/goals/123', '?view=full', 'http://127.0.0.1:4100'),
    ).toBe('http://127.0.0.1:4100/api/goals/123?view=full');
  });

  it('preserves upstream base paths when present', () => {
    expect(
      buildApiTargetUrl('/api/auth/dev-login', '', 'https://example.com/backend'),
    ).toBe('https://example.com/backend/api/auth/dev-login');
  });

  it('skips request bodies for get and head', () => {
    expect(shouldProxyRequestBody('GET')).toBe(false);
    expect(shouldProxyRequestBody('HEAD')).toBe(false);
    expect(shouldProxyRequestBody('POST')).toBe(true);
  });
});
