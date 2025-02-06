export default [
    {
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
          describe: 'readonly',
          it: 'readonly',
          assert: 'readonly',
        },
      },

      rules: {
        'no-unused-vars': 'warn',
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
      },
    },
  ];
  