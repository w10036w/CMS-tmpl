const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
// const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const env = process.env.NODE_ENV || 'development'
const isProd = env === 'production'

module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'public': path.resolve(__dirname, '../public'),
      'styl': path.resolve(__dirname, '../src/styl'),
      'styl_var': path.resolve(__dirname, '../src/styl/__var.styl'),
      'styl_mixin': path.resolve(__dirname, '../src/styl/__mixin.styl'),
      'package': path.resolve(__dirname, '../package.json'),
      '@u':path.resolve(__dirname, '../src/utils'),
      '@c': path.resolve(__dirname, '../src/components'),
      '@v': path.resolve(__dirname, '../src/views'),
      '@p': path.resolve(__dirname, '../src/pages'),
      '@a': path.resolve(__dirname, '../src/api'),
      '@m': path.resolve(__dirname, '../src/mixin'),
      '@config': path.resolve(__dirname, '../config/'+env),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              use: 'css-loader?minimize',
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.styl$/,
        use: [
          'css-loader',
          { loader: 'stylus-loader' }
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        // new HTMLPlugin(),
        new ExtractTextPlugin({ filename: 'common.[chunkhash].css' }),
        // new StyleExtHtmlWebpackPlugin({ position: 'head-bottom' })
      ]
    : [
        new FriendlyErrorsPlugin()
      ]
}
