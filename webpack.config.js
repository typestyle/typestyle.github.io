var path = require('path')

module.exports = {
  entry: {
    app: './src/app.tsx',
    converter: './src/converter.tsx',
    play: './src/play.tsx'
  },
  output: {
    path: path.join(__dirname,'./public'),  
    filename: 'build/[name].js',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  module: {
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.md/, loader: 'raw-loader' },
      { test: /\.css/, loader: 'raw-loader' },
    ]
  },
  node: {
    fs: "empty"
  }
}
