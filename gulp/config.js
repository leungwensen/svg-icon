// ports
module.exports.ports = {
};

// for linting
module.exports.lintingDirs = [
  'gulp',
  'lib'
];

// for jsdoc
module.exports.jsdocDirs = [
  'gulp',
  'lib'
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

