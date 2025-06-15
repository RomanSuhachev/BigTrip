const path = require('path');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public')
    },
    watchFiles:{
      paths: ['./src/**/*.js', './src/**/*.html', './src/**/*.css', './src/**/*.scss'],
      options: {
        usePolling: false,
      },
    },
    hot: true,
    compress: true,
    port: 9000,
  },
}
