import {useEffect, useRef, useState} from "react";
import classNames from "classnames/bind";

const cn = classNames.bind(classNames);

const SimpleInput = (props) => {
	const [enteredName, setEnteredName] = useState('');
	const [enteredNameTouched, setEnteredNameTouched] = useState(false);

	const [enteredEmail, setEnteredEmail] = useState('');
	const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

	const [formIsValid, setFormIsValid] = useState(false);

	const enteredNameIsValid = enteredName.trim() !== '';
	const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

	const enteredEmailIsValid = enteredEmail.includes('@');
	const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

	// 모든 폼의 유효성을 검사.
	useEffect( () => {
		setFormIsValid(enteredNameIsValid && enteredEmailIsValid);
	}, [enteredNameIsValid, enteredEmailIsValid])



	const nameInputChangeHandler = (e) => {
		setEnteredName(e.target.value);
	}

	const formSubmissionHandler = e => {
		e.preventDefault();

		setEnteredNameTouched(true);
		setEnteredEmailTouched(true);

		if (formIsValid === false) {
			return;
		}

		setEnteredName('');
		setEnteredEmail('');
		setEnteredNameTouched(false);
		setEnteredEmailTouched(false);
	}

	const nameInputBlurHandler = (e) => {
		setEnteredNameTouched(true);
	}

	const emailInputChangeHandler = (e) => {
		setEnteredEmail(e.target.value);
	}

	const emailInputBlurHandler = (e) => {
		setEnteredEmailTouched(true);
	}

	return (
    <form onSubmit={formSubmissionHandler}>
      <div className={cn(
				'form-control',
				{invalid: nameInputIsInvalid}
			)}>
        <label htmlFor='name'>Your Name</label>
        <input
					type='text'
					id='name'
					onChange={nameInputChangeHandler}
					onBlur={nameInputBlurHandler}
					value={enteredName}
				/>
				{nameInputIsInvalid && <p className="error-text">Name must not be empty.</p>}
      </div>
			<div className={cn(
				'form-control',
				{invalid: emailInputIsInvalid}
			)}>
				<label htmlFor='email'>Your Email</label>
				<input
					type='email'
					id='email'
					onChange={emailInputChangeHandler}
					onBlur={emailInputBlurHandler}
					value={enteredEmail}
				/>
				{emailInputIsInvalid && <p className="error-text">Email must has '@'</p>}
			</div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
