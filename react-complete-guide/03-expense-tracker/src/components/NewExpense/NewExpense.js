import React, {useState} from 'react';
import './NewExpense.scss'
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
	const [isEditing, setIsEditing] = useState(false);

	function startEditingHandler() {
		setIsEditing(true);
	}

	function stopEditingHandler() {
		setIsEditing(false);
	}

	return (
		<div className="new-expense">
			{!isEditing && <button onClick={startEditingHandler}>Add New Expense</button>}
			{isEditing && <ExpenseForm onCancel={stopEditingHandler} onAddExpense={props.onAddExpense} />}
		</div>
	);
}

export default NewExpense;
