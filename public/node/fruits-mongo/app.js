const mongoose = require('mongoose');

let mongoConfig = require('./mongo_config.json');

// mongoose.connect('mongodb://username:password@host:port/database?options...');
const url = `mongodb://${mongoConfig.id}:${mongoConfig.pass}@${mongoConfig.url}/${mongoConfig.dbName}?authSource=admin`;
console.log(`connection url: ${url}`)

const fruitSchema = new mongoose.Schema({
	name: { // validation name은 값이 꼭 있어야 한다.
		type: String,
		required: [true, "Please enter the fruit name"]
	},
	rating: { // validation rating은 1~10 사이의 값을 가져야 한다.
		type: Number,
		min: 1,
		max: 10
	},
	review: String
});
const Fruit = mongoose.model("Fruit", fruitSchema);

const personSchema = new mongoose.Schema({
	name: String,
	age: Number,
	favoriteFruit: fruitSchema
})
const Person = new mongoose.model("Person", personSchema);

mongoose.connect(url, () => {
	console.log("connected");

	// insertTest();

	// readTest();

	// updateTest();

	// deleteTest();

	relationTest();

	setTimeout( () => {
		// todo insert, read 둘다 끝났을 떄 close 되도록
		mongoose.connection.close();
	}, 1000);
});

function relationTest() {
	const pineapple = new Fruit({
		name: "Pineapple",
		rating: 9,
		review: "Great fruit"
	});

	pineapple.save();

	const person = new Person({
		name: "heejin",
		age: 38,
		favoriteFruit: pineapple
	})

	person.save();
}

function deleteTest() {
	Fruit.deleteOne({
		name: "Peach"
	}, function(err) {
		if(err) {
			console.log(err)
		} else {
			console.log("Successfully deleted")
		}
	})
}

function updateTest() {
	Fruit.updateOne({_id: "61e6686bdfdf908882fdc25c"}, {
		name: "Peach"
	}, function(err) {
		if (err) {
			console.log(err)
		} else {
			console.log("Successfully update")
		}
	})
}

function readTest() {
	Fruit.find(function(err, fruits) {
		if (err) {
			console.log(err);
		} else {
			// console.log(fruits);
			fruits.forEach( (fruit) => {
				console.log(fruit.name);
			})
		}
	})
}

function insertTest() {
	const fruit = new Fruit({
		// name: "Apple",
		rating: 3,
		review: "no name fruit."
	});
	// fruit.save();

	const person = new Person({
		name: "John",
		age: 37,
	});
	// person.save();

	const kiwi = new Fruit({
		name: 'kiwi',
		rating: 10,
		review: "nice for me"
	});
	const banana = new Fruit({
		name: 'banana',
		rating: 4,
		review: "weird texture"
	});

	const orange = new Fruit({
		name: 'orange',
		rating: 7,
		review: "little sour for me"
	});

	// Fruit.insertMany([kiwi, banana, orange], function(err) {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log("Successfully saved all the fruits to fruitsDB")
	// 	}
	// });
}
