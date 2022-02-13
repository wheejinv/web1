import {useReducer, useState} from "react";

const initialInputState = {
	enteredValue: '',
	isTouched: false,
}

const inputStateReducer = (state, action) => {
	if (action.type === 'INPUT') {
		return {
			...state,
			enteredValue: action.val,
		}
	} else if (action.type === 'BLUR') {
		return {
			...state,
			isTouched: true,
		}
	} else if (action.type === 'RESET') {
		return initialInputState;
	}
}

const useInput = (validateValue) => {
	const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

	const {isTouched, enteredValue} = inputState;

	const valueIsValid = validateValue(enteredValue);
	const hasError = !valueIsValid && isTouched;

	const valueChangeHandler = (e) => {
		dispatch({
			type: 'INPUT',
			val: e.target.value
		});
	}

	const inputBlurHandler = (e) => {
		dispatch({
			type: 'BLUR',
			val: true
		});
	}

	const reset = () => {
		dispatch({
			type: 'RESET'
		})
	}

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		reset,
		valueChangeHandler,
		inputBlurHandler,
	};
}

export default useInput;
