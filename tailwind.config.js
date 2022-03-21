/* eslint-disable global-require */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.tsx',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      screens: {
        510: '510px',
      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
  ],
};
