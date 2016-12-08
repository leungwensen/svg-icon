const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

function relative(pathname) {
  return path.resolve(__dirname, pathname);
}

module.exports = {
  entry: {
    'dist/index': relative('./src/index.js'),
    'dist/element/webcomponent': relative('./src/element/webcomponent.js'),
    'dist/element/react': relative('./src/element/react.js'),
  },
  output: {
    libraryTarget: 'var',
    library: 'svgIcon',
    path: relative(''),
    publicPath: '/',
    filename: '[name].js'
  },
  alias: {
    'template2module-loader': relative('./webpack/loader/template2module')
  },
  resolveLoader: {},
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        exclude: /locale/,
        query: {
          presets: [
            'es2015',
            'react',
            'stage-2'
          ]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.tpl$/,
        loader: 'template2module-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ],
  externals: {
    jquery: 'jQuery',
    react: 'React',
  },
};
