import React, {useReducer, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// 컴토넌트 함수 밖에서 정의된 이유가 있음.
// 리듀서 함수 안에서는 컴포넌트 함수 안에서 만들어진 데이터는 필요하지 않기 때문
const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.val,
			isValid: action.val.includes('@')
		}
	} else if (action.type === 'INPUT_BLUR') {
		// 새로운 상태 스냅숏을 반환해야 하기 때문에 최싱 상태 스냅숏(state) 을 사용한다.
		return {
			value: state.value,
			isValid: state.value.includes('@')
		}
	}

	return {
		value: '',
		isValid: false
	}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

	// state: 최산 상태 스냅샷
	// dispatchFn: 상태 스냅샷을 업데이트 해주는 함수, 하나의 액션을 디스패치하는데 reducerFn 이 소비하게 됨.
	// reducerFn: (prevState, action) => newState : 새로 업데이트된 상태를 반환
	// initialState: 초기 상태값
	// init: 초기 상태 설정.
	// const [state, dispatch] = useReducer(reducer, initialState, init);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null, // false 값이면 div className 에 invalid 값이 붙게 되어 오류처럼 보임.
	});


	const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
		dispatchEmail({
			type: 'USER_INPUT',
			val: event.target.value
		});

		setFormIsValid(
			// 리액트가 업데이트 하는 방법에 따라서 enteredPassword 가 최신 스냅샷이 아닐수도 있음
			event.target.value.includes('@') && enteredPassword.trim().length > 6
		);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

		setFormIsValid(
			event.target.value.trim().length > 6 && emailState.isValid
		);
  };

  const validateEmailHandler = () => {
		dispatchEmail({
			type: 'INPUT_BLUR', // 인풋이 포커스를 읽어서 흐려졌다(blur)
		})
  };

  const validatePasswordHandler = () => {
		// 다른 상태값(enteredPassword) 을 보고 passwordIsValid 상태를 설정하는 것
		// = 다른 상태에 의존하는 상태를 업데이트하는 경우.
		// => 이 경우 useReducer 가 좋은 선택임.
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
