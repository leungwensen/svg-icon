const lang = require('zero-lang');
const webpackConf = require('./webpack.config');

module.exports = lang.extend({
  devServer: {
    stats: {
      cached: false,
      exclude: [
        /node_modules[\\\/]/
      ],
      colors: true
    }
  },
  devtool: 'source-map'
}, webpackConf);
