import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import boundaries from 'eslint-plugin-boundaries';
import eslintPluginImport from 'eslint-plugin-import';
const __dirname = import.meta.dirname;

export default tseslint.config([
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**'],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      '@tanstack/query': tanstackQuery,
      boundaries,
      import: eslintPluginImport,
    },
    rules: {
      ...tanstackQuery.configs.recommended.rules,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...globals.es2020 },
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
    },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'processes', pattern: 'src/processes/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'shared', pattern: 'src/shared/**' },
        { type: 'config', pattern: 'src/config/**' },
        { type: 'api', pattern: 'src/api/**' },
        { type: 'entities', pattern: 'src/entities/**' },
      ],

      'import/resolver': {
        typescript: { project: ['./tsconfig.json'] },
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      },
    },
    rules: {
      // 기본 권장
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,

      'import/no-unresolved': 'error',
      'import/no-cycle': ['error', { maxDepth: 2 }],

      /**
       * ★ 단방향/접근 제어
       * - app → processes → features → entities → shared
       * - config는 읽기 전용으로 어디서든 import 허용 (현실적 편의)
       * - api 접근: services(생성물, src/api/services) & models만 허용, core 직접 import 금지
       */
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: 'app',
              allow: [
                'processes',
                'entities',
                'features',
                'shared',
                'config',
                'api',
              ],
            },
            {
              from: 'processes',
              allow: ['features', 'entities', 'shared', 'config', 'api'],
            },
            {
              from: 'features',
              allow: ['entities', 'shared', 'config', 'api'],
            },

            { from: 'entities', allow: ['shared', 'config', 'api'] },

            { from: 'shared', allow: ['api', 'config'] },

            { from: 'api', allow: ['config'] },
          ],
        },
      ],
      'no-unused-vars': 'off',
      'no-restricted-imports': ['error', { patterns: ['@/*'] }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: [
      '**/*.test.{ts,tsx}',
      '**/*.spec.{ts,tsx}',
      '**/*.stories.{ts,tsx}',
      '**/__tests__/**',
      '**/__mocks__/**',
      '**/mocks/**',
      'src/test/**',
    ],
    rules: {
      'boundaries/element-types': 'off',
      'import/no-cycle': 'off',
    },
  },
]);
