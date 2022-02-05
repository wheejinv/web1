import React from "react";
import './Card.scss'

function Card(props) {
	// 사용자 정의 컴포넌트에서 className은 props에 불과함. 하지만 이를 활용해서 클래스 네임을 덧붙여주었다.
	const classes = 'card ' + props.className;

	return (
		<div className={classes}>{props.children}</div>
	);
}

export default Card;
