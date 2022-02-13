import {useEffect, useRef, useState} from "react";
import classNames from "classnames/bind";
import useInput from "../hooks/use-input";

const cn = classNames.bind(classNames);

const SimpleInput = (props) => {
	let {
		value: enteredName,
		hasError: nameInputHasError,
		isValid: nameIsValid,
		reset: resetNameInput,
		valueChangeHandler: nameChangedHandler,
		inputBlurHandler: nameBlurHandler,
	} = useInput((value) => {
		return value.trim() !== '';
	})

	const [enteredEmail, setEnteredEmail] = useState('');
	const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

	const [formIsValid, setFormIsValid] = useState(false);

	const enteredEmailIsValid = enteredEmail.includes('@');
	const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

	// 모든 폼의 유효성을 검사.
	useEffect( () => {
		setFormIsValid(nameIsValid && enteredEmailIsValid);
	}, [nameIsValid, enteredEmailIsValid])

	const formSubmissionHandler = e => {
		e.preventDefault();

		if (formIsValid === false) {
			return;
		}

		resetNameInput();
		setEnteredEmail('');
		setEnteredEmailTouched(false);
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
				{invalid: nameInputHasError}
			)}>
        <label htmlFor='name'>Your Name</label>
        <input
					type='text'
					id='name'
					onChange={nameChangedHandler}
					onBlur={nameBlurHandler}
					value={enteredName}
				/>
				{nameInputHasError && <p className="error-text">Name must not be empty.</p>}
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
