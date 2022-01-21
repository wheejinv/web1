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

const userSchema = {
	email: String,
	password: String
}

const User = new mongoose.model('User', userSchema);

app.get('/', function(req, res) {
	res.render('home');
})

app.get('/login', function(req, res) {
	res.render('login');
});

app.post('/login', async function(req, res) {
	const {email, password} = req.body;
	let findUser = await User.findOne({email});
	if (findUser && findUser.password === password) {
		console.log(`로그인 성공, email: ${email}, password: ${password}`)
		res.render('secrets');
	} else {
		console.log('로그인 실패.');
		res.redirect('/login')
	}
});

app.get('/register', function(req, res) {
	res.render('register');
})

app.post('/register', async function(req, res) {
	const {email, password} = req.body;

	const newUser = new User({
		email,
		password
	});

	let findEmail = await User.findOne({email});

	if (findEmail) {
		console.log('이미 가입한 이메일인 경우');
		res.redirect('/register')
	} else {
		let result = await newUser.save();

		if (result) {
			console.log('유저 정보 저장 성공');
			res.render('secrets');
		} else {
			console.log('유저 정보 저장 실패');
			res.redirect('/home');
		}
	}
});

app.listen(3000, function() {
	console.log('Server started on port 3000.');
})
