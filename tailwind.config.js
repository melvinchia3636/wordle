/* eslint-disable global-require */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.tsx',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin'),
  ],
};
