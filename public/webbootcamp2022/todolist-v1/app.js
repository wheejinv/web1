const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// 정해져 있는거라 그대로 복붙하는게 신상에 이롭다.
// 렌더에 참조하는 폴더 위치는 views 폴더로 알아서 고정됨.
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];


app.get("/", (req, res) => {
	var today = new Date();

	let options = {
		weekday: "long",
		day: "numeric",
		month: "long",
	}

	// https://www.w3schools.com/jsref/jsref_tolocalestring.asp
	let day = today.toLocaleDateString("en-US", options);

	res.render('list', {
		listTitle: day,
		newListItems: items,
	});
});

app.get("/work", (req, res) => {
	res.render("list", {
		listTitle: "Work",
		newListItems: workItems,
	})
});

app.post("/", (req, res) => {
	let item = req.body.newItem;

	if (req.body.list == "Work") {
		workItems.push(item);
		res.redirect("/work");
	} else {
		items.push(item);
		res.redirect("/");
	}
});

app.get('/about', (req, res) => {
	res.render("about");
})

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
