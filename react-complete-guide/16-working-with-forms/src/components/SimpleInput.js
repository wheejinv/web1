import {useEffect, useRef, useState} from "react";
import classNames from "classnames/bind";

const cn = classNames.bind(classNames);

const SimpleInput = (props) => {
	const [enteredName, setEnteredName] = useState('');
	const [enteredNameTouched, setEnteredNameTouched] = useState(false);

	const enteredNameIsValid = enteredName.trim() !== '';
	const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;


	const nameInputChangeHandler = (e) => {
		setEnteredName(e.target.value);
	}

	const formSubmissionHandler = e => {
		e.preventDefault();

		setEnteredNameTouched(true);

		if (enteredNameIsValid === false) {
			return;
		}

		console.log(enteredName);

		setEnteredName('');
		setEnteredNameTouched(false);
	}

	const nameInputBlurHandler = (e) => {
		setEnteredNameTouched(true);
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
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
