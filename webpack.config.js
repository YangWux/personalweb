const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/personalweb/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './build',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.svg$/,
                loader: 'react-svg-loader'
            },
            {test: /\.(png|jpe?g|gif|pdf)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {},
                  },
                ],}
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./index.html'),
        }),
    ]
}
