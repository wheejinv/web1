import React, {useCallback, useState} from 'react';

import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';
import './App.css';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  console.log('APP RUNNING');

	// 저장하고 싶은 함수를 useCallback 으로 래핑하면 됨.
	// useCallback은 우리가 선택한 함수를 React의 내부 저장소 어딘가에 저장함.
  const toggleParagraphHandler = useCallback(() => {
    setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  }, []);

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={false} />
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
    </div>
  );
}

export default App;
