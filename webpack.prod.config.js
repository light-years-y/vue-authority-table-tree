const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'tableTree.min.js',
    library: 'table-tree',
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/, // 排除文件
        loader: 'babel-loader'
      },
      // {
      //   test: /\.(eot|svg|ttf|woff|woff2)\w*/,
      //   loader: 'url-loader',
      //   // options: {
      //   //   limit: 100 * 1024
      //   // }
      // },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};