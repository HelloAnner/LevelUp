import { describe, expect, it } from 'vitest';
import { buildLoggerOptions } from './main.js';

describe('buildLoggerOptions', () => {
  it('falls back to plain pino config when pretty transport is unavailable', async () => {
    const options = await buildLoggerOptions(
      { NODE_ENV: 'development', LOG_LEVEL: 'debug' },
      async () => false,
    );

    expect(options).toEqual({ level: 'debug' });
  });

  it('enables pino-pretty only in development when available', async () => {
    const options = await buildLoggerOptions(
      { NODE_ENV: 'development', LOG_LEVEL: 'info' },
      async () => true,
    );

    expect(options).toMatchObject({
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    });
  });

  it('never enables pretty transport outside development', async () => {
    const options = await buildLoggerOptions(
      { NODE_ENV: 'production', LOG_LEVEL: 'warn' },
      async () => true,
    );

    expect(options).toEqual({ level: 'warn' });
  });
});
