const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: Path.resolve(__dirname, '../src/index.tsx'),
  },
  output: {
    path: Path.resolve(__dirname, '../public'),
    filename: 'index.bundle.js',
  },
  resolve: {
    alias: {
      '@': Path.resolve(__dirname, '../src'),
      '@@': Path.resolve(__dirname, '../public/images'),
    },
    extensions: ['.js', '.ts', '.tsx', 'json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            ['@babel/preset-typescript', { allExtensions: true, isTSX: true }]],
          plugins: [
            '@babel/proposal-class-properties',
            '@babel/proposal-object-rest-spread',
            '@babel/plugin-transform-runtime',
          ],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  devServer: {
    port: 8000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../public/index.html'),
    }),
  ],
};
