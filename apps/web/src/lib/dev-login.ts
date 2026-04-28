export function coerceDevLoginEmail(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (trimmed.includes('@')) return trimmed;

  const localPart = Array.from(trimmed)
    .map((char) => {
      if (/[a-z0-9._-]/i.test(char)) return char.toLowerCase();
      const encoded = new TextEncoder().encode(char);
      return Array.from(encoded)
        .map((value) => value.toString(16).padStart(2, '0'))
        .join('');
    })
    .join('')
    .replace(/[^a-z0-9._-]/g, '')
    .replace(/[._-]{2,}/g, '-')
    .replace(/^[._-]+|[._-]+$/g, '');

  if (!localPart) return null;
  return `${localPart}@local.dev`;
}
