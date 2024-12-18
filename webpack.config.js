const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  entry: path.join(APP_DIR, 'system', 'main.jsx'),
  output: {
    publicPath: '',
    path: BUILD_DIR,
    filename: 'main.[contenthash].js',
    chunkFilename: './chunks/[name].[contenthash].chunk.js',
  },
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules'],
    descriptionFiles: ['package.json'],
    alias: {
      Root: path.resolve(APP_DIR),
      Application: path.resolve(APP_DIR, 'application'),
      System: path.resolve(APP_DIR, 'system'),
    },
    extensions: ['.js', '.jsx'],
  },
  infrastructureLogging: {
    level: 'verbose',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
          },
        },
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'www'),
    hot: true,
    liveReload: true,
    watchFiles: ['./src/**/*'],
    historyApiFallback: true,
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      inject: true,
      templateParameters: {
        title: 'Webpack React Application',
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -10,
        },
      },
    },
  },
};
