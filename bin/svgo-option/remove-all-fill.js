module.exports = {
  plugins: [
    {
      removeAttrs: {
        attrs: [
          'baseProfile',
          'class',
          'data-name',
          'svg:height',
          'svg:id',
          'svg:viewBox',
          'svg:width',
          // remove all fills
          'fill',
          'fill-rule',
        ]
      }
    },
  ]
};
