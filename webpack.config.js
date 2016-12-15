const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

const SRC = path.resolve(__dirname, 'src/main/js');
const DEST = path.resolve(__dirname, 'src/main/resources/static/app');

const sourcePath = path.resolve(__dirname, 'src/main/js');

const config = {
  entry: './index',
  context: SRC,
  resolve: {
    extensions: ['.js', '.jsx', '.less']
  },
  output: {
    path: DEST,
    filename: 'bundle.js',
    publicPath: '/app/',
    library: 'ReactDemo'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ 'eslint-loader' ],
        enforce: 'pre'
      },
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader' ],
        exclude: /node_modules/
      },
      {
        test: /\.(?:css|less)$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!less-loader'
        })
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
      disabled: TARGET === 'build' || TARGET === 'debug'
    })
  ],
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
  devtool: TARGET === 'build' ? 'source-map' : 'eval'
};

if (TARGET === 'build') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false
      },
      sourceMap: true
    })
  );
}

module.exports = config;
