const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// 정해져 있는거라 그대로 복붙하는게 신상에 이롭다.
// 렌더에 참조하는 폴더 위치는 views 폴더로 알아서 고정됨.
app.set('view engine', 'ejs');

app.get("/", (req, res) => {

	var today = new Date();
	var currentDay = today.getDay();

	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	res.render('list', {
		kindOfDay: days[currentDay],
	});
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
