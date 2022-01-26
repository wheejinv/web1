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
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

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
	password: String,
	googleId: String,
	secret: String,
});

// 비밀번호를 해시 및 솔트화하고 저장하는데 사용함.
// passportLocalMongoose에게 어떤 field를 username을 email로 하겠다
// https://studyingych.tistory.com/45
userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});
userSchema.plugin(findOrCreate);

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

passport.serializeUser(function(user, done) {
	done(null, user.id);
});
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	})
});

passport.use(new GoogleStrategy({
	clientID: env.CLIENT_ID,
	clientSecret: env.CLIENT_SECRET,
	callbackURL: `${env.HOST_URL}/auth/google/secrets`,
	userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
}, function (accessToken, refreshToken, profile, cb) {
	console.log(`profile: ${JSON.stringify(profile)}`)
	User.findOrCreate({googleId: profile.id}, function (err, user) {
		return cb(err, user)
	})
}))

app.get('/', function(req, res) {
	res.render('home');
})

app.get('/login', function(req, res) {
	res.render('login');
});

app.get('/secrets', function(req, res) {
	// ne: not equall
	User.find({"secret": {$ne: null}}, function(err, foundUsers) {
		if(err) {
			console.log(err);
		} else {
			console.log(`foundUsers: ${foundUsers}`);
			if (foundUsers) {
				res.render("secrets", {
					usersWithSecrets: foundUsers
				})
			}
		}
	})
});

app.get('/submit', function(req, res) {
	if (req.isAuthenticated()) {
		res.render('submit')
	} else {
		res.redirect('/login');
	}
});

app.post('/submit', function(req, res) {
	const submittedSecret = req.body.secret;

	// 현재 유저를 찾아서 secret 을 저장한다.
	// 이메일 패스워드 방식에서는 알 수 있음. 구글 로그인은 안나옴.
	console.log(req.user);

	// req.user.id: 세션에 저장되어 있는 정보임.
	User.findById(req.user.id, function(err, foundUser) {
		if (err) {
			console.log(err)
		} else {
			if (foundUser) {
				foundUser.secret = submittedSecret;
				foundUser.save().then( () => {
					res.redirect('/secrets')
				})
			}
		}
	})
});

app.get('/auth/google',
	passport.authenticate('google', {scope: ['profile']})
);

app.get('/auth/google/secrets',
	passport.authenticate('google', {failureRedirect: '/login'}),
	function (req, res) {
		res.redirect('/secrets')
	}
);

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
