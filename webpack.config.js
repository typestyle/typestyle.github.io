module.exports = {
  entry: {
    app: './src/app.tsx',
    demo: './src/demo.tsx',
  },
  output: {
    path: './public',  
    filename: 'build/[name].js',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  module: {
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { test: /\.md/, loader: 'raw-loader' },
    ]
  }
}
