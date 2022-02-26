import {useContext, useRef, useState} from 'react';

import classes from './AuthForm.module.css';
import AuthContext from "../../store/auth-context";
import {useNavigate} from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

	const submitHandler = async (e) => {
		e.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		setIsLoading(true);

		let url;

		if (isLogin) {
			// sign in with email/password
			// https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBB9cTkT4hgho6EG6jS1c5Z5rgn67LB6es';
		} else {
			// sign up with email/password
			// https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBB9cTkT4hgho6EG6jS1c5Z5rgn67LB6es';
		}
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: enteredEmail,
					password: enteredPassword,
					returnSecureToken: true,
				})
			});

			setIsLoading(false);

			const json = await response.json();

			if (response.ok) {
				authCtx.onLogin(json.idToken);
				navigate('/', {replace: true});

			} else {
				console.log(json);
				let errorMessage = 'Authentication failed!';
				if (json && json.error && json.error.message) {
					errorMessage = json.error.message;
					throw new Error(errorMessage);
				}
			}
		} catch (e) {
			alert(e);
		}

	}

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordInputRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
					{!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
					{isLoading && <p>Sending request....</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
