import React, {useRef} from 'react';
import styles from './Checkout.module.css'

function Checkout(props) {
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
		const enteredPostal = postalInputRef.current.value;
	}

	return (
		<form onSubmit={submitHandler}>
			<div className={styles.control}>
				<label htmlFor="name">Your Name</label>
				<input ref={nameInputRef} type="text" id="name"/>
			</div>
			<div className={styles.control}>
				<label htmlFor="street">Street</label>
				<input ref={streetInputRef} type="text" id="street"/>
			</div>
			<div className={styles.control}>
				<label htmlFor="postal">Postal</label>
				<input ref={postalInputRef} type="text" id="postal"/>
			</div>
			<div className={styles.control}>
				<label htmlFor="city">City</label>
				<input ref={cityInputRef} type="text" id="city"/>
			</div>
			<button type="button" onClick={props.onCancel}>Cancel</button>
			<button>Confirm</button> {/* 이 버튼만 submit 이 가능함. */}
		</form>
	);
}

export default Checkout;
