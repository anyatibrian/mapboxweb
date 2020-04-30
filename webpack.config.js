const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index_bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {

                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                }, {
                    loader: 'less-loader', // compiles Less to CSS
                    options: {
                        modifyVars: {
                            // 'primary-color': '#1DA57A',
                            // 'link-color': '#1DA57A',
                            // 'border-radius-base': '2px',
                            // // or
                            // 'hack': `true; @import "your-less-file-path.less";`, // Override with less file
                        },
                        javascriptEnabled: true,
                    },
                }],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }

        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
            filename: './index.html'
        })]
}