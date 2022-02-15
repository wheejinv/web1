import React, {useRef, useState} from 'react';
import styles from './Checkout.module.css'

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

function Checkout(props) {
	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		street: true,
		city: true,
		postalCode: true,
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const cityInputRef = useRef();
	const postalInputRef = useRef();

	const submitHandler = e => {
		e.preventDefault();

		// 상태값을 이용하는 방법 또는 이렇게.
		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredCity = cityInputRef.current.value;
		const enteredPostalCode = postalInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

		setFormInputsValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			city: enteredCityIsValid,
			postalCode: enteredPostalCodeIsValid,
		});

		const formIsValid =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredCityIsValid &&
			enteredPostalCodeIsValid;

		if (!formIsValid) {
			return;
		}

		// Submit cart data
	}

	const nameControlClasses = `${styles.control} ${
		formInputsValidity.name ? '' : styles.invalid
	}`;
	const streetControlClasses = `${styles.control} ${
		formInputsValidity.street ? '' : styles.invalid
	}`;
	const postalCodeControlClasses = `${styles.control} ${
		formInputsValidity.postalCode ? '' : styles.invalid
	}`;
	const cityControlClasses = `${styles.control} ${
		formInputsValidity.city ? '' : styles.invalid
	}`;

	return (
		<form onSubmit={submitHandler}>
			<div className={nameControlClasses}>
				<label htmlFor="name">Your Name</label>
				<input ref={nameInputRef} type="text" id="name"/>
				{!formInputsValidity.name && <p>Please enter a valid name!</p>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor="street">Street</label>
				<input ref={streetInputRef} type="text" id="street"/>
				{!formInputsValidity.street && <p>Please enter a valid street!</p>}
			</div>
			<div className={postalCodeControlClasses}>
				<label htmlFor="postal">Postal</label>
				<input ref={postalInputRef} type="text" id="postal"/>
				{!formInputsValidity.postalCode && (
					<p>Please enter a valid postal code (5 characters long)!</p>
				)}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor="city">City</label>
				<input ref={cityInputRef} type="text" id="city"/>
				{!formInputsValidity.city && <p>Please enter a valid city!</p>}
			</div>
			<div className={styles.actions}>
				<button type="button" onClick={props.onCancel}>Cancel</button>
				<button className={styles.submit}>Confirm</button> {/* 이 버튼만 submit 이 가능함. */}
			</div>
		</form>
	);
}

export default Checkout;
