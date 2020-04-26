const path = require('path');
// const AsyncAWaitPlugin = require('webpack-async-await');

module.exports = {
  entry: './src/server.ts',
  devtool: 'inline-source-map',
  mode: 'development',
  target: 'node',
  watch: true,
  externals: {
    sqlite3: 'commonjs2 sqlite3'
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'express.tsconfig.json'
          }
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};
