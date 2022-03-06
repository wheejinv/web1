import React from 'react';
import Todo from "../models/todos";
import styles from './TodoItem.module.css';


type TodoItemPropsType = {
	todo: Todo;
	onClick: (id: string) => void
}

function TodoItem(props: TodoItemPropsType) {
	const clickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
		props.onClick(props.todo.id)
	}

	return (
		<li className={styles.item} onClick={clickHandler}>
			{props.todo.text}
		</li>
	);
}

export default TodoItem;
