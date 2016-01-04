var path = require('path');
var SRC  = path.resolve(__dirname, 'src/main/js');
var DEST = path.resolve(__dirname, 'src/main/resources/static/js');

module.exports = {
  entry: SRC,
  resolve: {
    extensions: ['', '.js', '.jsx' ]
  },
  output: {
    path: DEST,
    filename: 'bundle.js',
    publicPath: '/js/',
    library: 'ReactDemo'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: SRC
      }
    ]
  },
  devServer: {
    port: 9090,
    proxy: {
      '/*': {
        target: 'http://localhost:8080',
        secure: false,
        // node-http-proxy option - don't add /localhost:8080/ to proxied request paths
        prependPath: false
      },
    },
    publicPath: 'http://localhost:9090/js/'
  },
  devtool: 'source-map'
};
