//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const mongoConfig = require('./mongo_config.json');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
	extended: true
}));

const url = `mongodb://${mongoConfig.id}:${mongoConfig.pass}@${mongoConfig.url}/${mongoConfig.dbName}?authSource=admin`;

mongoose.connect(url, (err) => {
	if (err)
		console.log(err)
	else
		console.log('success connect');
});

app.get('/', function(req, res) {
	res.render('home');
})

app.get('/login', function(req, res) {
	res.render('login');
})

app.get('/register', function(req, res) {
	res.render('register');
})

app.listen(3000, function() {
	console.log('Server started on port 3000.');
})
