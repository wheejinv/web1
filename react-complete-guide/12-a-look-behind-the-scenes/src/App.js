import React, {Fragment, useCallback, useState} from 'react';

import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';
import './App.css';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
	const [allowToggle, setAllowToggle] = useState(false);

  console.log('APP RUNNING');

	// 저장하고 싶은 함수를 useCallback 으로 래핑하면 됨.
	// useCallback은 우리가 선택한 함수를 React의 내부 저장소 어딘가에 저장함.
  const toggleParagraphHandler = useCallback(() => {
		if (allowToggle) {
			setShowParagraph((prevShowParagraph) => !prevShowParagraph);
		}

  }, [allowToggle]);

	const allowToggleHandler = () => {
		setAllowToggle(true);
	};

  return (
		<Fragment>
			<div className="app">
				<h1>Hi there!</h1>
				<DemoOutput show={false}/>
				<Button name="allow toggle" onClick={allowToggleHandler}>Allow Toggling</Button>
				<Button name="toggle paragraph" onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
			</div>
			<p>처음 Toogle Paragraph! 을 눌러도 아무것도 실행 안되는 경우</p>
			<ul>
				<li>코드 상으로 보면 App 의 state 에서 상태가 변한게 없으므로 버튼 로그가 나오지 않음.</li>
			</ul>
			<p>Allow Toggling 버튼을 누르고 난 후 동작 설명</p>
			<ul>
				<li>allowToggleHandler 을 onClick 으로 가진 Allow Toggling 버튼의 경우 Toggle Paragraph! 버튼을 누르면 계속 재 실행됨. useCallback 을 안썼으니 이 동작이 맞음.</li>
				<li>useCallback을 사용한 Toggle Paragraph! 버튼은 처음 Allow Toggling 버튼을 누르고 난 후 한번만 실행됨. useCallback dependencies 을 보면 알 수 있음. </li>
			</ul>
		</Fragment>
  );
}

export default App;
