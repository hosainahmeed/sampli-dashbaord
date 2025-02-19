import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        localStorage: 'readonly',
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
<<<<<<< HEAD
];
=======
  {
    rules: {
      'react/prop-types': 'off', // Disable prop validation
    },
  },
]
>>>>>>> b7992ed4008444c03c831fa3636f886913a7b6c9
