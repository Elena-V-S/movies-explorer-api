module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-console': 'off',
    'arrow-body-style': 'off',
    'object-curly-newline': 'off',
    'no-unused-vars': ['error', { args: 'none' }],
  },
};
