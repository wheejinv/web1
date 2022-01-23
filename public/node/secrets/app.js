//jshint esversion:6
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
// const md5 = require('md5')
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// 세션 및 쿠키
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const mongoose = require('mongoose');
// const encrypt = require('mongoose-encryption');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
	extended: true
}));

// express-session
app.use(session({
	secret: "Our little secret.", // 환경 변수로 저장되어야 함.
	resave: false,
	saveUninitialized: false,
}));

// http://www.passportjs.org/concepts/authentication/strategies/
app.use(passport.initialize());
app.use(passport.session());

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

// 비밀번호를 해시 및 솔트화하고 저장하는데 사용함.
// passportLocalMongoose에게 어떤 field를 username을 email로 하겠다
// https://studyingych.tistory.com/45
userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

// encryptionKey, signingKey 생성 방식 SOME_32BYTE_BASE64_STRING, 64: openssl rand -base64 32, openssl rand -base64 32;
// secret: 아무말이나 대충 쓴 string
// userSchema.plugin(encrypt, {
// 	secret: env.SECRET,
// 	encryptedFields: ['password'],
// })

const User = new mongoose.model('User', userSchema);

// https://www.npmjs.com/package/passport-local-mongoose
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res) {
	res.render('home');
})

app.get('/login', function(req, res) {
	res.render('login');
});

app.get('/secrets', function(req, res) {
	if (req.isAuthenticated()) {
		res.render('secrets')
	} else {
		res.redirect('/login');
	}
});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.post('/login', async function(req, res) {
	// http://www.passportjs.org/concepts/authentication/login/

	const {email, password} = req.body;
	const user = new User({
		email,
		password
	});

	// passport function
	req.login(user, function(err) {
		if (err) {
			console.log(err);
		} else {
			passport.authenticate('local')(req, res, function() {
				res.redirect('/secrets')
			})
		}
	})

	// const {email, password} = req.body;
	// let findUser = await User.findOne({email});
	//
	// if (findUser && await bcrypt.compare(password, findUser.password)) {
	// 	// 해시함수를 써도 md5 처리 전에 password 접근이 가능한데.. 문제 있는거 아닌가
	// 	// console.log(`로그인 성공, email: ${email}, password: ${password}`)
	// 	console.log('로그인 성공')
	// 	res.render('secrets');
	// } else {
	// 	console.log('로그인 실패.');
	// 	res.redirect('/login')
	// }
});

app.get('/register', function(req, res) {
	res.render('register');
})

app.post('/register', async function(req, res) {
	const {email, password} = req.body;

	User.register({
		email
	}, password, function(err, user) {
		if (err) {
			console.log(err);
			res.redirect("/register")
		} else {
			passport.authenticate('local')(req, res, function() {
				res.redirect('/secrets');
			})
		}
	})

	// const {email, password} = req.body;
	//
	// const newUser = new User({
	// 	email,
	// 	password: await bcrypt.hash(password, saltRounds)
	// });
	//
	// let findEmail = await User.findOne({email});
	//
	// if (findEmail) {
	// 	console.log('이미 가입한 이메일인 경우');
	// 	res.redirect('/register')
	// } else {
	// 	let result = await newUser.save();
	//
	// 	if (result) {
	// 		console.log('유저 정보 저장 성공');
	// 		res.render('secrets');
	// 	} else {
	// 		console.log('유저 정보 저장 실패');
	// 		res.redirect('/home');
	// 	}
	// }
});

app.listen(3000, function() {
	console.log('Server started on port 3000.');
})
