const WebpackDevServer = require('webpack-dev-server');
const gulp = require('gulp');
const gutil = require('gulp-util');
const open = require('open');
const webpack = require('webpack');
const config = require('./config');
const webpackConf = require('../webpack.config');
const webpackDevConf = require('../webpack-dev.config');

const LOCALHOST = '127.0.0.1';
const devPort = config.ports.dev;

gulp.task('dev', (/** done */) => {
  const compiler = webpack(webpackDevConf);
  const devSvr = new WebpackDevServer(compiler, {
    contentBase: webpackConf.output.path,
    publicPath: webpackDevConf.output.publicPath,
    hot: true,
    stats: webpackDevConf.devServer.stats
  });

  devSvr.listen(devPort, LOCALHOST, (err) => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    const url = `http://${LOCALHOST}:${devPort}/`;
    gutil.log('[webpack-dev-server]', url);
    open(url);
    // keep the devSvr alive
    // done();
  });
});
