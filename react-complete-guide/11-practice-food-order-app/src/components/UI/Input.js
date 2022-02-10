import React from 'react';
import styles from './Input.module.css'

const Input = React.forwardRef((props, ref) => {
	return (
		<div>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input
				ref={ref}
				{...props.input}/*id={props.input.id} 와 동치*/
			/>
		</div>

	);
});

export default Input;
