import React, {useReducer, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// 컴토넌트 함수 밖에서 정의된 이유가 있음.
// 리듀서 함수 안에서는 컴포넌트 함수 안에서 만들어진 데이터는 필요하지 않기 때문
const reducer = (state, action) => {
	if (action.type === 'USER_EMAIL_INPUT') {
		const isValidEmail = action.val.includes('@');

		return {
			...state,
			emailValue: action.val,
			isValidEmail,
			isFormValid: isValidEmail && state.isValidPassword
		}
	} else if (action.type === 'USER_PASSWORD_INPUT') {
		const isValidPassword = action.val.trim().length > 6;

		return {
			...state,
			passwordValue: action.val,
			isValidPassword,
			isFormValid: state.isValidEmail && isValidPassword
		}
	}

	return {
		emailValue: '',
		passwordValue: '',
		isValidEmail: false,
		isValidPassword: false,
		isFormValid: false,
	}
}

const Login = (props) => {
	// state: 최산 상태 스냅샷
	// dispatchFn: 상태 스냅샷을 업데이트 해주는 함수, 하나의 액션을 디스패치하는데 reducerFn 이 소비하게 됨.
	// reducerFn: (prevState, action) => newState : 새로 업데이트된 상태를 반환
	// initialState: 초기 상태값
	// init: 초기 상태 설정.
	// const [state, dispatch] = useReducer(reducer, initialState, init);

	const [state, dispatchInput] = useReducer(reducer, {
		emailValue: '',
		passwordValue: '',
		isValidEmail: null,
		isValidPassword: null,
		isFormValid: false,
	});


	const emailChangeHandler = (event) => {
		dispatchInput({
			type: 'USER_EMAIL_INPUT',
			val: event.target.value
		});
  };

  const passwordChangeHandler = (event) => {
		dispatchInput({
			type: 'USER_PASSWORD_INPUT',
			val: event.target.value
		})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(state.emailValue, state.passwordValue);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            state.isValidEmail === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={state.emailValue}
            onChange={emailChangeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            state.isValidPassword === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={state.passwordValue}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!state.isFormValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
