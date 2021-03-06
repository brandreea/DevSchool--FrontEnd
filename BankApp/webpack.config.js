const path = require('path');

module.exports = {
  mode: 'development',

  entry: './index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    writeToDisk: true,
    port: 8080,
  },
};
