import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
	console.log('Button RUNNING');

  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default React.memo(Button);

// 부모 컴포넌트인 App 에서 props.onClick 함수를 인자로 넣어주는데,
// App 컴포넌트가 실행되면서 매번 다른 함수(같은 기능을 하지만) 넣어주기 때문에
// Button 컴포넌트는 React.memo로 사용해도 매번 재실행된다.
