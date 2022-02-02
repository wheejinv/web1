import React, {useState} from 'react';

function ToDoItem(props) {
	const [checked, setChecked] = useState(false);

	function handleClick(e) {
		let {checked} = e.target;

		setChecked(checked);
	}

	const inputName = `todoCheck${props.id}`;

	return (
		<div>
			<input
				name={inputName}
				type="checkbox"
				onClick={handleClick}
			/>
			<label
				htmlFor={inputName} // for
				// style={ checked ? {textDecoration: 'line-through'} : null} // 스타일 부여
				className={checked ? 'checked' : null} // 클래스 부여해서 처리하는 방법.
			>
				{props.text}
			</label>
		</div>
	);
}

export default ToDoItem;
