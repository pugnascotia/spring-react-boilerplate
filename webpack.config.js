var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var TARGET = process.env.npm_lifecycle_event;

var SRC  = path.resolve(__dirname, 'src/main/js');
var DEST = path.resolve(__dirname, 'src/main/resources/static/app');

var config = {
  entry: SRC,
  resolve: {
    extensions: ['', '.js', '.jsx' ]
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
      '/*': {
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
if (TARGET === 'build') {
  config.plugins.push(new ExtractTextPlugin('bundle.css', { allChunks: true }));

  config.module.loaders.find(each => each.loader === 'style-loader!css-loader!less-loader').loader =
    ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader');
}
else {
  // Check the project with flow. Types get stripped regardless due to the
  // babel react preset.
  var FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
  config.plugins.push(new FlowStatusWebpackPlugin());
}

module.exports = config;
