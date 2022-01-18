const mongoose = require('mongoose');

let mongoConfig = require('./mongo_config.json');

// mongoose.connect('mongodb://username:password@host:port/database?options...');
const url = `mongodb://${mongoConfig.id}:${mongoConfig.pass}@${mongoConfig.url}/${mongoConfig.dbName}`;
console.log(`connection url: ${url}`)

const fruitSchema = new mongoose.Schema({
	name: String,
	rating: Number,
	review: String
});

const personSchema = new mongoose.Schema({
	name: String,
	age: Number
})

mongoose.connect(url, () => {
	console.log("connected");

	const Fruit = mongoose.model("Fruit", fruitSchema);

	const fruit = new Fruit({
		name: "Apple",
		rating: 6,
		review: "Pretty solid as a fruit."
	});

	const Person = new mongoose.model("Person", personSchema);
	const person = new Person({
		name: "John",
		age: 37,
	});

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

	Fruit.insertMany([kiwi, banana, orange], function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Successfully saved all the fruits to fruitsDB")
		}
	});

	// person.save();
	// fruit.save();

});
