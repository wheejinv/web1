const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

// html post 파싱을 위해 bodyParser 가 요구하는 옵션.
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

// 클라가 보내준 데이터의 해석을 위해 body parser 를 설치해야 한다.
app.post('/', (req, res) => {
	console.log(req.body);

	// 객체 Destructuring
	let {num1, num2} = req.body;

	// bodyParser 가 파싱하는 결과는 텍스트로 구문 분석됨.
	let result = parseInt(num1) + parseInt(num2);

	// res.send 는 숫자는 안되네? boolean 은 되고..?
	// https://expressjs.com/en/4x/api.html#res.send
	res.send('The result of the calculation is ' + result);
});

app.listen(port, () => {
	console.log("Calculator started on port 3000!")
})
