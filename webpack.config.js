const path = require('path')

module.exports = (env) => {
	console.log(env);

	let mode = env.production ? "production" : "development";

	return {
		entry: './src/index.js',
		mode,
		// mode: "production",
		output: {
			filename: 'main.js',
			path: path.resolve(__dirname, 'dist'),
		},
		module: {
			rules: [
				{
					test: /\.css$/i, // 확장자가 css 인 코드
					use: [
						'style-loader',
						'css-loader', // 순서상 뒤에 로더가 먼저 실행됨.
					],
				}
			],
		}
	}
}