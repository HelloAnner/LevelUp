import { describe, expect, it } from 'vitest';
import { coerceDevLoginEmail } from './dev-login';

describe('coerceDevLoginEmail', () => {
  it('keeps a real email unchanged except trimming', () => {
    expect(coerceDevLoginEmail('  anner@example.com  ')).toBe('anner@example.com');
  });

  it('maps a plain name to a local dev email', () => {
    expect(coerceDevLoginEmail('Anner')).toBe('anner@local.dev');
  });

  it('normalizes unicode names into a stable local dev email', () => {
    expect(coerceDevLoginEmail('安娜')).toBe('e5ae89e5a89c@local.dev');
  });

  it('rejects empty input', () => {
    expect(coerceDevLoginEmail('   ')).toBeNull();
  });
});
