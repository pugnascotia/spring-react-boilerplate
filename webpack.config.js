const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const TARGET = process.env.npm_lifecycle_event;

const SRC = path.resolve(__dirname, 'src/main/js');
const DEST = path.resolve(__dirname, 'src/main/resources/static/app');

const config = {
  entry: SRC,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: DEST,
    filename: 'bundle.js',
    publicPath: '/app/',
    library: 'ReactDemo'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: SRC
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: SRC
      },
      {
        test: /\.(?:css|less)$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  },
  plugins: [],
  devServer: {
    port: 9090,
    proxy: {
      '/': {
        target: 'http://localhost:8080',
        secure: false,
        // node-http-proxy option - don't add /localhost:8080/ to proxied request paths
        prependPath: false
      }
    },
    publicPath: 'http://localhost:9090/app/'
  },
  devtool: 'source-map'
};

/* Build bundle.css only if we're doing a prod build. This is because the plugin we
 * use breaks hot-reloading.
 */
if (TARGET === 'build' || TARGET === 'debug') {
  config.plugins.push(new ExtractTextPlugin('bundle.css', { allChunks: true }));

  const styleLoader = config.module.loaders.find(each => each.loader === 'style-loader!css-loader!less-loader');
  styleLoader.loader = ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader');
}

if (TARGET === 'build') {
  config.devtool = 'source-map';

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
}

module.exports = config;
