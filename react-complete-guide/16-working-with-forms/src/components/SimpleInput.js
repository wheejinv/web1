import {useRef, useState} from "react";
import classNames from "classnames/bind";

const cn = classNames.bind(classNames);

const SimpleInput = (props) => {
	const [enteredName, setEnteredName] = useState('');
	const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);
	const nameInputRef = useRef();

	const nameInputChangeHandler = (e) => {
		setEnteredName(e.target.value);
	}

	const formSubmissionHandler = e => {
		e.preventDefault();

		// 유효성 검사
		if (enteredName.trim() === '') {
			setEnteredNameIsValid(false);
			return;
		}

		setEnteredNameIsValid(true);
		// setEnteredName('');
	}

	return (
    <form onSubmit={formSubmissionHandler}>
      <div className={cn(
				'form-control',
				{invalid: !enteredNameIsValid}
			)}>
        <label htmlFor='name'>Your Name</label>
        <input
					ref={nameInputRef}
					type='text'
					id='name'
					onChange={nameInputChangeHandler}
					value={enteredName}
				/>
				{!enteredNameIsValid && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
