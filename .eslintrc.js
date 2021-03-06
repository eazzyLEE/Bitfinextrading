module.exports = {
  root: true,
  plugins: ['prettier', 'react-hooks'],
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true,
    esversion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    'class-methods-use-this': 0,
    'no-console': 1,
    'no-underscore-dangle': 0,
    'global-require': 'off',
    camelcase: 0,
    quotes: ['error', 'single'],
    'react/no-unescaped-entities': 0,
    'react/prop-types': 0,
    'no-use-before-define': [
      'error',
      { functions: true, classes: true, variables: false },
    ],
    'import/prefer-default-export': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
