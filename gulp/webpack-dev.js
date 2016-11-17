const WebpackDevServer = require('webpack-dev-server');
const gulp = require('gulp');
const util = require('gulp-util');
const webpack = require('webpack');
const webpackDevConf = require('../webpack-dev.config');

const LOCALHOST = '0.0.0.0';
const DEV_PORT = 2046;

gulp.task('webpack-dev', () => {
  const compiler = webpack(webpackDevConf);
  const devSvr = new WebpackDevServer(compiler, {
    contentBase: webpackDevConf.output.path,
    hot: true,
    publicPath: webpackDevConf.output.publicPath,
    stats: webpackDevConf.devServer.stats,
    'watch-poll': true, // FIXME this is for working on windows
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000 // is this the same as specifying --watch-poll?
    },
  });

  devSvr.listen(DEV_PORT, LOCALHOST, (err) => {
    if (err) {
      throw new util.PluginError('webpack-dev-server', err);
    }
    const url = `http://${LOCALHOST}:${DEV_PORT}/`;
    util.log('[webpack-dev-server]', url);
    // open(url);
    // keep the devSvr alive
    // done();
  });
});
