const webpack = require("webpack");
const path = require("path");

module.exports = {
	entry: path.resolve(__dirname, "./src/index.js"),
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
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
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
		],
	},
	resolve: {
		extensions: ["*", ".js", ".jsx"],
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "main.bundle.js",
	},
	mode: "development",
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// https://stackoverflow.com/questions/44404730/why-do-you-need-to-import-react-multiple-times-in-parent-and-child-components
		new webpack.ProvidePlugin({
			React: 'react'
		}),
	],
	devtool: "source-map",
	devServer: {
		static: [
			{
				directory: path.resolve(__dirname, "./public")
			},
			{
				directory: path.resolve(__dirname, "./dist")
			}
		],
		hot: true,
		historyApiFallback: true,
	},
};
