import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import checkFile from 'eslint-plugin-check-file'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'public', 'node_modules']),

  // 1. 基本設定 (TypeScript & React)
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // 2. アクセシビリティ (a11y)
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // クリック可能な要素 (button, a等) に対するラベル (aria-label 等) の付与を強制
      'jsx-a11y/control-has-associated-label': 'error',
      'jsx-a11y/anchor-has-content': 'error',

      // 装飾目的のGraphicコンポーネントには aria-hidden="true" の付与を推奨・強制
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "JSXOpeningElement[name.name=/Graphic$/]:not(:has(JSXAttribute[name.name='aria-hidden']))",
          message:
            '装飾目的のGraphicコンポーネントには `aria-hidden="true"` を付与してください。',
        },
      ],
    },
  },

  // 3. SVGの直接import禁止 (src/components/ui/ 以外からの直接importを禁止)
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/*.svg', '**/*.svg?*'],
              message:
                'SVGアセットの直接importは禁止されています。src/components/ui/ でコンポーネント化して利用してください。',
            },
          ],
        },
      ],
    },
  },

  // 4. ファイル命名規則 (eslint-plugin-check-file)
  // 非JS/TSファイル（.svg 等）を構文解析エラーなしでLint対象にするためのプロセッサ
  {
    files: ['**/*.svg'],
    processor: 'check-file/eslint-processor-check-file',
  },
  {
    files: ['src/**/*'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          // src/components/ui直下: *Graphic.tsx または *Icon.tsx
          'src/components/ui/*.tsx': '*@(Graphic|Icon)',
          // src/components/section直下: *Section.tsx (および .module.css)
          'src/components/section/*.{tsx,module.css}': '*Section',
          // src/assets/svg直下: パスカルケース (PascalCase)
          'src/assets/svg/*.svg': 'PASCAL_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
    },
  },
])
