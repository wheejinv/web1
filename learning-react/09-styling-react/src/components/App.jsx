import React from 'react';
import styles from './App.css';

function App(props) {
	// CSS Module은 CSS를 모듈화하여 사용하는 방식이다.
	// CSS 클래스를 만들면 자동으로 고유한 클래스네임을 생성하여
	// CSS 클래스가 중복되어 충돌이 일어나는 일을 방지한다.

	console.log(styles);
	// {
	//     "box": "src-components-App__box--TNjnr",
	//     "blue": "src-components-App__blue--TczMs"
	// }

	return (
		<div
			// className={styles.box} // 한개 사용하는 경우
			// 여러개의 class 반영하는 경우.
			className={[styles.box, styles.blue].join(' ')}
		/>
	);
}

export default App;
