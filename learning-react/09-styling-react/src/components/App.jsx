import React from 'react';
import styles from './App.scss';
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

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
			// className={[styles.box, styles.blue].join(' ')}

			// classNames/bind 라이브러리를 활용해서 클래스가 여러개인 경우 처리를 쉽게
			className={cn(
				'box',
				{blue: true}, // true or false 로 조건부 스타일링을 할 때 매우 편리하다.
			)}
			// className={'box blue'}
		>
			{/* .box .box-inside*/}
			<div className='box-inside' />
		</div>
	);
}

export default App;
