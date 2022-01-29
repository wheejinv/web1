import React from "react";
import ReactDOM from "react-dom";

function Card(props) {

	console.log(`Card props: ${JSON.stringify(props)}`)

	const {name, img, tel, email} = props.userInfo;

	return (
		<div>
			<h2>{name}</h2>
			<img
				src={img}
				alt="avatar_img"
			/>
			<p>{tel}</p>
			<p>{email}</p>
		</div>
	);
}

const beyonceInfo = {
	// 클래스 네임 또한 props로 들어가게 된다. div 같은 속성에서는 className 이 유용하지만 개발자가 정의한 jsx 안에서는 동작하지 않는다.
	// airbnb 가이드에서는 className 같은 DOM component pop name들을 피하라고 가이드한다.
	// 참고: https://github.com/airbnb/javascript/tree/master/react#naming
	className: 'asd',
	name: 'Beyonce',
	img: 'https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg',
	tel: '+123 456 789',
	email: 'b@beyonce.com'
};

const jackInfo = {
	name: 'Jack',
	img: 'https://pbs.twimg.com/profile_images/625247595825246208/X3XLea04_400x400.jpg',
	tel: '+987 654 321',
	email: 'jack@nowhere.com'
};

const chuckInfo = {
	name: 'Chuck Norris',
	img: 'https://i.pinimg.com/originals/e3/94/47/e39447de921955826b1e498ccf9a39af.png',
	tel: '+918 372 574',
	email: 'gmail@chucknorris.com'
}

ReactDOM.render(
  <div>
		<h1>My Contacts</h1>
    <Card userInfo={beyonceInfo} />
		<Card userInfo={jackInfo} />
		<Card userInfo={chuckInfo} />
  </div>,
  document.getElementById("root")
);
