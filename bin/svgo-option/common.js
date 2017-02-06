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
          'g:fill',
          'g:fill-rule',
          'svg:fill',
          'svgg:fill-rule',
          // 'fill',
          // 'fill-rule',
        ]
      }
    },
  ]
};

