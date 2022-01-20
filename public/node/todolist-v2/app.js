//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require('lodash');

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

// set default items
const item1 = new Item({
	name: "Welcome to you todolist!"
});
const item2 = new Item({
	name: "Hit the + button to off a new item."
});
const item3 = new Item({
	name: "<-- Hit this to delete an item.>"
});
const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({
	name: String,
	items: [itemSchema]
});

const List = mongoose.model("List", listSchema);

let mongoConfig = require('./mongo_config.json');
const url = `mongodb://${mongoConfig.id}:${mongoConfig.pass}@${mongoConfig.url}/${mongoConfig.dbName}?authSource=admin`;
mongoose.connect(url, () => {
	console.log('success connect');
});

app.get("/", function(req, res) {
	Item.find({}, (err, docs) => {
		if(err) {
			console.log(err);
			// todo 에러 처리는 어떻게 하는지..? 화면에 보여줄 요소를 그려야 하는데?
		} else {
			// 아이템이 없는 경우 만들어서 다시 '/' 로 리다이렉트
			if (docs.length === 0) {
				Item.insertMany(defaultItems, (err) => {
					if(err) {
						console.log(err)
					} else {
						console.log("insert success");
					}
				});
				res.redirect("/");
			} else {
				// console.log(docs);
				res.render("list", {
					listTitle: "Today",
					newListItems: docs
				});
			}
		}
	});
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
	const listName = req.body.list;

	const item = new Item({
		name: itemName
	});

	// root 요청인 경우 '/'
	if (listName === "Today") {
		item.save();
		res.redirect("/");
	} else {
		// 아닌 경우 해당 아이템을 찾아서 items 에 item 을 넣어주고 저장 후 다시 리다이렉트
		List.findOne({name: listName}, function(err, foundList) {
			foundList.items.push(item);
			foundList.save().then( () =>{
				res.redirect("/" + listName);
			})
		})
	}

});

app.post('/delete', function(req, res) {
	let checkedItemID = req.body.checkbox;
	const listName = req.body.listName;

	if (listName === "Today") {
		Item.deleteOne({_id: checkedItemID}, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log('delete success');
				res.redirect("/");
			}
		})
	} else {
		// 배열에서 특정한 얘만 제거 하는 방법
		List.findOneAndUpdate({
			name: listName
		}, {
			// $pull: https://docs.mongodb.com/manual/reference/operator/update/pull/
			$pull: {
				items: {
					_id: checkedItemID
				}
			}
		}, function(err, results) {
			if(!err) {
				res.redirect("/" + listName);
			}
		})
	}
});

app.get("/:customListName", function(req,res){
	let todoName = req.params.customListName;
	todoName = _.capitalize(todoName);

	// 잘못된 크롬 플러그인 때문에 방어 코드. cxMouse
	if (todoName === 'Null') {
		return;
	}

	List.findOne({
		name: todoName
	}, function (err, results) {
		if (err) {
			console.log(err)
		} else if (results) {
			console.log(`results: ${results}`)

			res.render("list", {listTitle: todoName, newListItems: results.items});
		} else {
			const list = new List({
				name: todoName,
				items: defaultItems
			})

			list.save().then( () => {
				res.redirect(`/${todoName}`);
			})
		}
	})
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
