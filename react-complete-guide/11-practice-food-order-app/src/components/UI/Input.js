import React from 'react';
import styles from './Input.module.css'

function Input(props) {
	return (
		<div>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input {...props.input}/*id={props.input.id} 와 동치*//>
		</div>

	);
}

export default Input;
