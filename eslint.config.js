/**
 * LevelUp ESLint config — tenant safety + design system enforcement.
 *
 * Custom rules are expressed via `no-restricted-imports` / `no-restricted-syntax`
 * AST selectors to avoid requiring a separate ESLint plugin build step.
 */

import tseslint from 'typescript-eslint';

const BUSINESS_IMPORT_GUARDS = [
  {
    group: ['**/system-db*', '**/system.db*'],
    message: 'no-cross-tenant: business packages must not import system-db. Use TenantContext.',
  },
  {
    group: ['node:path', 'node:fs', 'node:fs/promises'],
    message:
      'no-raw-path: do not reach into the filesystem directly from business code. Route through ctx.workspace.* on TenantContext.',
  },
];

const DESIGN_SYSTEM_RULES = [
  {
    selector: 'Literal[value=/^#[0-9a-fA-F]{3,8}$/]',
    message: 'no-hex-color: use CSS variables (--bg-0, --fg-0, --accent…) instead of raw hex.',
  },
  {
    // bold / 700 / 800 / 900 as literal values for fontWeight
    selector:
      "JSXAttribute[name.name='fontWeight'] > Literal[value=/^(bold|bolder|700|800|900)$/]",
    message: 'no-bold-700: cap font-weight at 600. Heavier weights break the product voice.',
  },
  {
    // bold / 700+ as JS object property values (style={{fontWeight: 700}})
    selector:
      "Property[key.name='fontWeight'] > Literal[value=/^(bold|bolder|700|800|900)$/]",
    message: 'no-bold-700: cap font-weight at 600. Heavier weights break the product voice.',
  },
  {
    // Match common emoji ranges in JSX text
    selector:
      'JSXText[value=/[\\u{1F300}-\\u{1FAFF}\\u{2600}-\\u{27BF}\\u{2300}-\\u{23FF}]/u]',
    message: 'no-emoji-in-jsx: no emoji in UI copy. Express state with typography and motion.',
  },
];

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.next/**',
      '**/.smoke-shots/**',
      '**/e2e/results/**',
      '**/e2e/__screenshots__/**',
      '**/playwright-report/**',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  {
    files: ['packages/*/src/**/*.ts', 'packages/*/src/**/*.tsx'],
    rules: {
      'no-restricted-imports': ['error', { patterns: BUSINESS_IMPORT_GUARDS }],
    },
  },
  {
    // Infrastructure packages (tenancy, vector) legitimately own filesystem paths.
    // Carve them out so no-raw-path still fires on every other business package.
    files: ['packages/tenancy/src/**/*.ts', 'packages/vector/src/**/*.ts'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    // Tests need setup hooks that touch the FS directly.
    files: [
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/test/**/*.ts',
    ],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['apps/web/src/**/*.tsx', 'apps/web/src/**/*.ts'],
    rules: {
      'no-restricted-syntax': ['warn', ...DESIGN_SYSTEM_RULES],
    },
  },
);
