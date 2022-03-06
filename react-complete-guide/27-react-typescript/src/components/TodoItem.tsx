import React from 'react';
import Todo from "../models/todos";

type TodosProps = {
	todo: Todo;
}

function TodoItem({todo}: TodosProps) {
	return (
		<li>
			{todo.text}
		</li>
	);
}

export default TodoItem;
