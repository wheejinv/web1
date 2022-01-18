const mongoose = require('mongoose');

let mongoConfig = require('./mongo_config.json');

// mongoose.connect('mongodb://username:password@host:port/database?options...');
const url = `mongodb://${mongoConfig.id}:${mongoConfig.pass}@${mongoConfig.url}/${mongoConfig.dbName}`;
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
	age: Number
})
const Person = new mongoose.model("Person", personSchema);

mongoose.connect(url, () => {
	console.log("connected");

	insertTest();

	readTest();


});

function readTest() {
	Fruit.find(function(err, fruits) {
		if (err) {
			console.log(err);
		} else {

			mongoose.connection.close();

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
		review: "Pretty solid as a fruit."
	});
	fruit.save();

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
