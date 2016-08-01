const path = require('path');
const lang = require('zero-lang');
const iconsMeta = require('../lib/const/icons-meta');

// ports
module.exports.ports = {
  dev: 2046,
  test: 2048
};

// for linting
module.exports.lintingDirs = [
  'gulp',
  'src'
];

// for svgmin
module.exports.svgminDirs = [
  'zero'
];

// for svgmin
module.exports.svgminRemovingAttrsIgnores = [
  'color',
  'font-color',
  'inner-join',
  'left-join',
  'map-bubble-hover',
  'map-bubble',
  'map-color-hover',
  'map-color',
];

// for template2module
module.exports.templateDirs = [
  'lib',
  'src',
];

// for sync-icons
module.exports.iconNames = lang.map(iconsMeta, (meta) => meta.name);

// for svg-sprite
const iconTypes = lang.map(iconsMeta, (meta) => meta.prefix.replace(/\-$/, ''));
iconTypes.push('zero');
module.exports.svgSpriteDirs = iconTypes;

// for jsdoc
module.exports.jsdocDirs = [
  'gulp',
  'src'
];

// for jsdoc
module.exports.jsdocConfig = {
  tags: {
    allowUnknownTags: true
  },
  source: {
    includePattern: '.+\\.js$',
    excludePattern: '(^|\\/|\\\\)_'
  },
  opts: {
    destination: './doc/jsdoc' // this field is TO BE OVERRIDDEN
  },
  plugins: [
    'plugins/markdown'
  ],
  templates: {
    cleverLinks: true,
    monospaceLinks: true,
    path: 'ink-docstrap',
    theme: 'cerulean',
    navType: 'vertical',
    linenums: true,
    dateFormat: 'YYYY-MM'
  }
};

module.exports.babelTasks = {
  src: {
    src: path.resolve(__dirname, '../src/**/*.js'),
    dest: path.resolve(__dirname, '../')
  }
};

