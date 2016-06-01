const path = require('path');

// ports
module.exports.ports = {
  dev: 1024,
  test: 2048
};

// for linting
module.exports.lintingDirs = [
  'gulp',
  'src'
];

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

