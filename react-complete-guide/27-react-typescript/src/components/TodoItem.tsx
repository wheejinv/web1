import React from 'react';
import Todo from "../models/todos";
import styles from './TodoItem.module.css';

type TodosProps = {
	todo: Todo;
}

function TodoItem({todo}: TodosProps) {
	return (
		<li className={styles.item}>
			{todo.text}
		</li>
	);
}

export default TodoItem;
