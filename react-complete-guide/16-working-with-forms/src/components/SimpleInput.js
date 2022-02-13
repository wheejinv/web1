import {useEffect, useRef, useState} from "react";
import classNames from "classnames/bind";

const cn = classNames.bind(classNames);

const SimpleInput = (props) => {
	const [enteredName, setEnteredName] = useState('');

	// true 설정부터가 이건 속임수이다. ㅋㅋ 이 상태가 달리 쓸모없음을 알고 있는거랑 마찬가지
	const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
	const [enteredNameTouched, setEnteredNameTouched] = useState(false);
	const nameInputRef = useRef();

	useEffect(() => {
	if (enteredNameIsValid) {
		console.log('Name Input is valid');
	}
	}, [enteredNameIsValid]);


	const nameInputChangeHandler = (e) => {
		setEnteredName(e.target.value);
	}

	const formSubmissionHandler = e => {
		e.preventDefault();

		setEnteredNameTouched(true);

		// 유효성 검사
		if (enteredName.trim() === '') {
			setEnteredNameIsValid(false);
			return;
		}

		setEnteredNameIsValid(true);
		// setEnteredName('');
	}
	const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

	return (
    <form onSubmit={formSubmissionHandler}>
      <div className={cn(
				'form-control',
				{invalid: nameInputIsInvalid}
			)}>
        <label htmlFor='name'>Your Name</label>
        <input
					ref={nameInputRef}
					type='text'
					id='name'
					onChange={nameInputChangeHandler}
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
