module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    // 'jsx-quotes': ['error', 'prefer-single'],
    'jsx-a11y/alt-text': 0,
    'react/no-array-index-key': 0,
    'no-param-reassign': 0,
    'react-hoos/exhaustive-deps': 0,
    'no-empty': [2, { allowEmptyCatch: true }],
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 0,
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
  },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
};
