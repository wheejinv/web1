import ExpenseItem from "./ExpenseItem";
import React from "react";
import './Expenses.scss'

function Expenses(props) {
	const {items} = props;

	return (
		<div className='expenses'>
			{items.map(item => {
				return (
					<ExpenseItem
						key={item.id}
						title={item.title}
						amount={item.amount}
						date={item.date}
					/>
				)
			})}
		</div>
	);
}

export default Expenses;
