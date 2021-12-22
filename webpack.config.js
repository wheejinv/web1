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
		}
	}
}