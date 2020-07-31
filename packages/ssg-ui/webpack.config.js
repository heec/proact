const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/admin',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
  devServer: {
    proxy: {
      '/admin/api/': {
        target: 'http://localhost:4567/',
        changeOrigin: true,
      },
    },
    historyApiFallback: {
      index: '/admin/index.html',
    },
  },
}
