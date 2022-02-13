import useInput from "../hooks/use-input";
import {useEffect, useState} from "react";
import classNames from "classnames";

const BasicForm = (props) => {
	let firstNameInput = useInput(value => value.trim() !== '');
	let lastNameInput = useInput(value => value.trim() !== '');
	let emailInput = useInput(value => value.includes('@'));

	// firstNameInput.hasError, isValid

	const [formIsValid, setFormIsValid] = useState(false);

	useEffect(() => {
		if (firstNameInput.isValid && lastNameInput.isValid && emailInput.isValid) {
			setFormIsValid(true);
		} else {
			setFormIsValid(false);
		}
	}, [firstNameInput.isValid, lastNameInput.isValid, emailInput.isValid]);


	const submitHandler = (e) => {
		e.preventDefault();

		console.log(firstNameInput.value, lastNameInput.value, emailInput.value)

		firstNameInput.reset();
		lastNameInput.reset();
		emailInput.reset();
	}

  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className={classNames('form-control', {invalid: firstNameInput.hasError})}>
          <label htmlFor='name'>First Name</label>
          <input
						type='text'
						id='name'
						onBlur={firstNameInput.inputBlurHandler}
						onChange={firstNameInput.valueChangeHandler}
						value={firstNameInput.value}
					/>
					{firstNameInput.hasError && <p className="error-text">First Name must not be empty.</p>}
        </div>
				<div className={classNames('form-control', {invalid: lastNameInput.hasError})}>
          <label htmlFor='name'>Last Name</label>
          <input
						type='text'
						id='name'
						onBlur={lastNameInput.inputBlurHandler}
						onChange={lastNameInput.valueChangeHandler}
						value={lastNameInput.value}
					/>
					{lastNameInput.hasError && <p className="error-text">Last Name must not be empty.</p>}
        </div>
      </div>
			<div className={classNames('form-control', {invalid: emailInput.hasError})}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
					type='text'
					id='name'
					onBlur={emailInput.inputBlurHandler}
					onChange={emailInput.valueChangeHandler}
					value={emailInput.value}
				/>
				{emailInput.hasError && <p className="error-text">Email must has '@'</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
