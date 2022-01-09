const express = require('express');
const app = express();
const port = 3000;

// 첫번째 파라미터는 라우터
app.get('/', (req, res) => {
	res.send("<h1>Hello, World..</h1>");
});

app.get('/contact', (req, res) => {
	res.send("Contact me at: heejin");
});

app.get('/about', (req, res) => {
	res.send('About Page');
});

app.get('/hobbies', (req, res) => {
	res.send('Hobbie page');
});

app.listen(port, () => {
	console.log("Server started on port 3000!")
})


