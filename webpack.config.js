'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

/**
 * Generate a config for html webpack plugin
 */
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, './src/index.html'),
  filename: 'index.html',
  inject: 'body'
})

/**
 * Plugins collection for the configuration
 * The plugins will change with the NODE_ENV value
 */
let plugins = [htmlWebpackPlugin]

/**
 * Loaders
 */
let rules = [
  {
    test: /\.js$|\.jsx$/,
    loaders: ['babel-loader'],
    exclude: /node_modules/
  }
]

/**
 * Adding configurations by the NODE_ENV
 */
if (String(process.env.NODE_ENV).toLowerCase().startsWith('dev')) {
  /**
   * Dev plugins
   */
  plugins = plugins.concat([
    // makes it easier to debug while using hot replacement
    new webpack.NamedModulesPlugin(),
    // enables hot replacement for modules
    new webpack.HotModuleReplacementPlugin()
  ])

  rules = rules.concat([
    {
      test: /\.scss$|\.css$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        {
          loader: 'style-loader', // creates style nodes from JS strings
          options: {
            modules: true,
            importLoaders: 1
          }
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          } // translates CSS into CommonJS
        },
        {
          loader: 'sass-loader', options: {
              sourceMap: true
          } // compiles Sass to CSS
        }
      ]
    }
  ])
} else {
  /**
   * Prod plugins
   */
  plugins = plugins.concat([
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    })
  ])
  rules = rules.concat([
    {
      test: /\.scss$|\.css$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'sass-loader'],
        fallback: 'style-loader'
      })
    }
  ])
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  },
  module: {
    rules
  },
  plugins
}
