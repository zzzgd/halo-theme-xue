module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/components/**/*.js', './src/pages/**/*.vue', './src/assets/**/*.js'],
  },
};
