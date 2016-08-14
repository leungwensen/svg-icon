const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'dist/index': path.resolve(__dirname, './src/index.js'),
    'spec/index': path.resolve(__dirname, './spec/index.spec.js'),
    'dist/svg-icon-element': path.resolve(__dirname, './src/svg-icon-element.js'),
  },
  output: {
    libraryTarget: 'var',
    library: 'svgIcon',
    path: path.resolve(__dirname),
    publicPath: '/',
    filename: '[name].js'
  },
  alias: {},
  resolveLoader: {},
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        exclude: /locale/,
        query: {
          presets: [
            'es2015'
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
      /* TODO 用svg-icon替代
       {
       test: /\.woff(2)?(\?.+)?$/,
       loader: 'url-loader?limit=10000&minetype=application/font-woff'
       },
       {
       test: /\.(ttf|eot|svg|png)(\?.+)?$/,
       loader: 'file-loader'
       },
       */
      {
        test: /\.tpl$/,
        loader: 'template2module-loader',
        query: {
          // 如果在模版中用了某些渲染时不传入的变量（譬如_, $），需要加上（譬如`['$']`）
          outerScopeVars: [],
          // 如果在模版中用了某些渲染时不传入的变量（譬如_, $），需要加上定义（譬如`var _ = require('underscore');`）
          preOuterScope: ''
        }
      }
    ],
    preLoaders: [
      { // 为模版引擎加上`<import src="./some.tpl"></import>`语法
        test: /\.tpl$/,
        loader: 'template-importing-loader'
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
  },
};
