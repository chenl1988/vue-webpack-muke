const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ExtractPlugin = require("extract-text-webpack-plugin");

const isDev = process.env.NODE_ENV === "development"; /* windows */

const config = {
    target: "web",
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        /* 开发环境filename: "bundle.[hash:8].js", 生产环境使用chunkhash*/
        filename: "bundle.[hash:8].js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                    /* 图片转base64 */
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        /* [name]:原文件名 ; [ext]:扩展名*/
                        name: '[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        /* 在webpack编译过程中以及写代码时 判断环境；开发还是生产 */
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

/* 判断是开发还是正式环境 */
/* cross-env: 不同平台执行脚本  */
if (isDev) {
    config.module.rules.push({
        test: /\.styl/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                /* 使用 stylus-loader 会生成sourceMap ，这里postcss-loader就不再生成sourceMap，属性优化 编译会更快*/
                options: {
                    sourceMap: true
                }
            },
            'stylus-loader'
        ]
    });
    /* devTool 帮助在页面上调试代码 sourceMap映射 */
    config.devtool = "#cheap-module-eval-source-map";
    /* webpack2加入的devServer配置 */
    config.devServer = {
        port: 8000,
        /* 可以通过ip访问 */
        host: "0.0.0.0",
        /* 在webpack编译的过程中出现错误显示在网页上面 */
        overlay: {
            errors: true,
        },
        /* 单面应用 前端路由 
        histroyFallback: {

        },*/
        /* 只刷新修改的组件，而不是整个页面  */
        hot: true
            /* 自动打开浏览器 */
            /* open: true */
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        /* 减少不需要的信息展示 */
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    config.entry = {
        /* 下面配置后打包出来的app+hash.js将不再包含vue.js(类库) */
        app: path.join(__dirname, 'src/index.js'),
        /* vue.js将会使用浏览器的缓存 这里可以配置一些引用的稳定的类库 如：vue vue-router vuex*/
        vendor: ['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js';
    config.module.rules.push({
        test: /\.styl/,
        use: ExtractPlugin.extract({
            fallback: "style-loader",
            use: [
                'css-loader',
                {
                    loader: 'postcss-loader',
                    /* 使用 stylus-loader 会生成sourceMap ，这里postcss-loader就不再生成sourceMap，属性优化 编译会更快*/
                    options: {
                        sourceMap: true
                    }
                },
                'stylus-loader'
            ]
        })
    })
    config.plugins.push(
        new ExtractPlugin('style.[contentHash:8].css'),
        /* 单独打包 上面 vendor 中配置的类库*/
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        /* 
            webpack 优化 将webpack生成的js里的webpack这些相关的配置单独打包到一个文件里面
            vendor必须要放到runtime的前面
        */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    )
}
module.exports = config;