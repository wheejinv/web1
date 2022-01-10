const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

// html post 파싱을 위해 bodyParser 가 요구하는 옵션.
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

app.post('/', (req, res) => {
	let {cityName} = req.body;

	const query = cityName; // 'London';
	const apiKey = '5c374489293af82a1c65b3132f7d44dd';
	const unit = 'metric';
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
	https.get(url, (response) => {
		console.log(response.statusCode);

		// express 환경에서 갑자스럽게 node 용법이.. 문서도 친절하지 않다.
		// 내가 구현해야 했다면 json 파싱하는 부분에서 시간이 많이 걸렸을 듯.
		response.on('data', (data) => {
			const weatherData = JSON.parse(data);
			// console.log(weatherData);
			const temp = weatherData.main.temp;
			const desc = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			res.write(`<h1>The temperature in Seoul is ${temp} degrees Celcius</h1>`);
			res.write(`Theweather is currently ${desc}`);
			res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`);
			res.send();
		});
	});
});

app.listen(3000, () => {
	console.log("Server is running on port 3000.");
});
