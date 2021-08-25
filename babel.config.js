const path = require('path');

module.exports = {
  presets: ['next/babel'],
  plugins: [
    'graphql-tag',
    'inline-react-svg',
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    ['styled-components', { ssr: true, displayName: true, preprocess: false }],
  ],
};
