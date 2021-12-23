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
		entry: './src/index.js',
		mode, // process.env.NODE_ENV 값도 같이 설정됨.
		// mode: "production",
		output: {
			filename: 'main.js',
			path: path.resolve(__dirname, 'dist'),
			clean: true,
		},
		module: {
			rules: [
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
		}
	}

	if (mode === MODE.dev) {
		result.devtool = "source-map"
	} else if (mode === MODE.prod) {

	}

	return result;
}