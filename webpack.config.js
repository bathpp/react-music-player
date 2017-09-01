const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: [
		'react-hot-loader/patch', 'webpack-dev-server/client?http://0.0.0.0:3333', 'webpack/hot/only-dev-server', './app/index.js'
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist/'),
		publicPath: 'dist/'
	},
	devServer: {
		contentBase: './dist',
		hot: true,
		open: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.tpl.html',
			inject: 'body',
			filename: './index.html'
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [{
			test: /\.js$/,
			use: [{
				loader: 'react-hot-loader/webpack'
			}, {
				loader: 'babel-loader'
			}],
			exclude: /node_modules/
		}, {
			test: /\.css/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.less$/,
			use: [{
				loader: "style-loader"
			}, {
				loader: "css-loader"
			}, {
				loader: "less-loader"
			}]
		}]
	}
};