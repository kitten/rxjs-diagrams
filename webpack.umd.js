var webpack = require('webpack')
var path = require('path')

module.exports = {
  resolve: {
    extensions: [ '.js' ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  output: {
    library: 'RxJSDiagrams',
    libraryTarget: 'umd'
  }
}
