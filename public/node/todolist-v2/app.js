//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const workItems = [];

// mongodb, mongoose
const itemSchema = new mongoose.Schema({
	name: String
});
const Item = mongoose.model("Item", itemSchema);

let mongoConfig = require('./mongo_config.json');
const url = `mongodb://${mongoConfig.id}:${mongoConfig.pass}@${mongoConfig.url}/${mongoConfig.dbName}`;
mongoose.connect(url, () => {
	console.log('success connect');

	// set default items
	// const item1 = new Item({
	// 	name: "Welcome to you todolist!"
	// });
	// const item2 = new Item({
	// 	name: "Hit the + button to off a new item."
	// });
	// const item3 = new Item({
	// 	name: "<-- Hit this to delete an item.>"
	// });
	// const defaultItems = [item1, item2, item3];
	// Item.insertMany(defaultItems, (err) => {
	// 	if(err) {
	// 		console.log(err)
	// 	} else {
	// 		console.log("insert success");
	// 	}
	// })
});

app.get("/", function(req, res) {
	Item.find({}, (err, docs) => {
		if(err) {
			console.log(err);
			// todo 에러 처리는 어떻게 하는지..? 화면에 보여줄 요소를 그려야 하는데?
		} else {
			console.log(docs);
			res.render("list", {
				listTitle: "Today",
				newListItems: docs
			});
		}
	});
});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
