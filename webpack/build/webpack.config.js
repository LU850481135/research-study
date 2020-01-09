const path = require('path')
// 将打包后的js文件引入html文件中
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 将上次打包的文件清除（清空文件夹）
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 拆分css
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 拆分多个css
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let indexLess = new ExtractTextWebpackPlugin('index.less');
let indexCss = new ExtractTextWebpackPlugin('index.css');

module.exports = {
  mode:'development', // 开发模式
  // 单入口
  // entry: path.resolve(__dirname,'../src/main.js'),    // 入口文件
  // 多入口
  entry: {
    main:path.resolve(__dirname,'../src/main.js'),
    header:path.resolve(__dirname,'../src/header.js')
  },
  output: {
    filename: '[name].[hash:8].js',      // 打包后的文件名称
    path: path.resolve(__dirname, '../dist')  // 打包后的目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname, '../public/index.html'),
      filename:'index.html',
      chunks:['main'] // 与入口文件对应的模块名
    }),
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/header.html'),
      filename:'header.html',
      chunks:['header'] // 与入口文件对应的模块名
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
    }),
    indexLess,
    indexCss
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader','css-loader'] // 从右向左解析原则
        // 拆分多个css
        use: indexCss.extract({
          use: ['css-loader']
        })
      },
      {
        test: /\.less$/,
        // use: ['style-loader','css-loader',
        // {
        //   // 为css添加浏览器前缀
        //   loader: 'postcss-loader',
        //   options: {
        //     plugins:[require('autoprefixer')]
        //   }
        // },'less-loader'] // 从右向左解析原则

        // 拆分css
        // use: [
        //   MiniCssExtractPlugin.loader,
        //  'css-loader',
        //  'less-loader'
        //]

        // 拆分多个css
        use: indexLess.extract({
          use: ['css-loader','less-loader']
        })
      },
      // 打包 图片、字体、媒体、等文件
      {
        test: /\.(jpe?g|png|gif)$/i, //图片文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      // 用babel转义js文件
      // babel-loader只会将 ES6/7/8语法转换为ES5语法
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        },
        exclude:/node_modules/
      }
    ]
  }
}
