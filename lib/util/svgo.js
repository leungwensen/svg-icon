'use strict';
/**
 * svgo module
 * @module svgo
 * @see module:index
 */

const SVGO = require('svgo');
const svgo = new SVGO({
  plugins: [
    {
      removeAttrs: {
        attrs: [
          'class',
          'data-name',
          'fill',
          //'fill-rule',
          'height',
          'id',
          'width',
        ]
      }
    },
    {
      removeEditorsNSData: true
    },
    {
      removeEmptyAttrs: true
    },
    {
      removeEmptyContainers: true
    },
    {
      removeEmptyText: true
    },
    {
      removeHiddenElems: true
    },
    {
      removeStyleElement: true
    },
    {
      removeTitle: true
    },
    {
      removeUselessDefs: true
    },
    {
      sortAttrs: true
    },
  ]
});

module.exports = svgo;
