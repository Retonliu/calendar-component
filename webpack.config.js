const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//引入cleanWbpackPlugin改为使用大括号语法因为现在导出的不是default而是export多个了
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        calendar: './src/main.js',
    },
    devtool: 'inline-source-map',
    devServer: { //默认在localhost：8080下建立服务
        contentBase: './dist', //将dist目录下的文件作为可访问文件
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'vue with webpack!'
        }),
        //new webpack.NamedModulesPlugin(),方便查看要修补的依赖,该插件已经删除，现在提供开箱即用体验
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin() //将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，
        //那么它会应用到 .vue 文件里的 <script> 块
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: "development",
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader' //把vue文件转为js文件
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, './src'),
        }
    }
};