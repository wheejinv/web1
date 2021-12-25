const express = require('express');
const webpack = require('webpack');
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.dev_server_middleware.config.js');

const compiler = webpack(config);

app.use('/', express.static('public'));

// express에서 webpack-dev-middleware와 webpack.config.js를 사용하도록 설정하세요.
// 기본 설정 파일
app.use(
	webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath,
	})
);

app.use(require("webpack-hot-middleware")(compiler));

// 포트 3000에서 파일 제공
app.listen(3000, function () {
	console.log('Example app listening on port 3000!\n');
});