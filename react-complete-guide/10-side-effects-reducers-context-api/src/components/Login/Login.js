import React, {useEffect, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

	// useEffect의 주요 업무는 사이드 이펙트를 처리하는 것이다.
	// HTTP 요청일수도 있고, 이메일이나 비밀번호 등으로 폼 유효성을 확인하고 업데이트하는 것도 사이드 이펙트이다.
	useEffect(() => {
		let timeoutID = setTimeout( () => {
			// 키 입력 후 500 ms 이후 실행. 이 함수를 api 함수라고 하면 네트워크 호출을 많이 줄일 수 있다.
			// 디바운싱 기술이라고 함.
			setFormIsValid(
				enteredEmail.includes('@') && enteredPassword.trim().length > 6
			);
		}, 500)
		// console.log('setTimeout')

		return () => {
			// console.log('clearTimeout')
			clearTimeout(timeoutID);
		}
	}, [enteredEmail, enteredPassword]);


  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
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
