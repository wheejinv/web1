//jshint esversion:6
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
	extended: true
}));

const env = process.env;
const url = `mongodb://${env.ID}:${env.PASS}@${env.URL}/${env.DBNAME}?authSource=admin`;

mongoose.connect(url, (err) => {
	if (err)
		console.log(err)
	else
		console.log('success connect');
});

const userSchema = new mongoose.Schema({
	email: String,
	password: String
});

// encryptionKey, signingKey 생성 방식 SOME_32BYTE_BASE64_STRING, 64: openssl rand -base64 32, openssl rand -base64 32;
// secret: 아무말이나 대충 쓴 string
userSchema.plugin(encrypt, {
	secret: env.SECRET,
	encryptedFields: ['password'],
})

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
