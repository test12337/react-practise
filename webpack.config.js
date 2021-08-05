var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const currentTask = process.env.npm_lifecycle_event

const config = {
    entry: "./components/index.tsx", // входная точка - исходный файл
    mode: 'production',
    output:{
        path: path.resolve(__dirname, './build'),     // путь к каталогу выходных файлов - папка public
        publicPath: '/build/',
        filename: "bundle.js"       // название создаваемого файла
    },
    devServer: {
        historyApiFallback: true,
        port: 8888,
        open: true
   },
    plugins: [new MiniCssExtractPlugin({
        filename: "style.css",
    })
    ],
    module:{
        rules:[   //загрузчик для jsx
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(js|jsx|tsx|ts)$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:["@babel/preset-env", "@babel/preset-react"]    // используемые плагины
                }
            }
        ],
    },
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.scss']
    }
}
if (currentTask == "build") {
    config.mode = "production"
    config.module.rules[0].use[0] = MiniCssExtractPlugin.loader
    config.plugins.push(new MiniCssExtractPlugin({ filename: "style.css" }))
}
module.exports = config