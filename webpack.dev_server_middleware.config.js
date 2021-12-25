const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: [
		'./src/indexTs.ts',
		'webpack-hot-middleware/client?reload=true', // webpack5 reload bug - https://github.com/webpack-contrib/webpack-hot-middleware/issues/390
	],
	devtool: 'inline-source-map',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i, // 확장자가 css 인 코드
				use: [
					'style-loader',
					// 순서상 뒤에 로더가 먼저 실행됨.
					'css-loader',
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
};

