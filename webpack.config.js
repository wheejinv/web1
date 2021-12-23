const path = require('path')

const MODE = {
	none: "none",
	dev: "development",
	prod: "production",
}

module.exports = (env) => {
	console.log(env);

	let mode = MODE.none;

	if (env.production === true) {
		mode = MODE.prod;
	} else if (env.development === true) {
		mode = MODE.dev;
	}

	let result = {
		entry: './src/indexTs.ts',
		mode, // process.env.NODE_ENV 값도 같이 설정됨.
		// mode: "production",
		output: {
			filename: 'main.js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: "/dist",
			// clean: true,
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
			extensions: ['.tsx', '.ts', '.js'],
		}
	}

	if (mode === MODE.dev) {
		result.devtool = "inline-source-map"
		result.devServer = {
			liveReload: false,
			hot: true,
			// https://webpack.kr/configuration/dev-server/#devserverstatic
			static: [
				{
					directory: path.join(__dirname, 'public'),
					publicPath: '/',
				},
				{
					directory: path.join(__dirname, 'dist'),
					publicPath: '/dist',
				},
			],
		}
	} else if (mode === MODE.prod) {

	}

	return result;
}