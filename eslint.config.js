// eslint.config.js
export default [
    {
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // Define any globals you need (for example, for tests)
        globals: {
          describe: 'readonly',
          it: 'readonly',
          assert: 'readonly',
        },
      },
      // Instead of "extends", add your custom rules directly.
      // (If you want to incorporate the recommended rules,
      //  you can merge them in from "eslint/conf/eslint-recommended" if needed.)
      rules: {
        'no-unused-vars': 'warn',
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
      },
    },
  ];
  