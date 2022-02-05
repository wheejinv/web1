import React, {useState} from "react";
import './Expenses.scss'

import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";

function Expenses(props) {
	const {expenses} = props;
	const [filteredYear, setFilteredYear] = useState('2020');

	function filterChangeHandler(selectedYear) {
		setFilteredYear(selectedYear);
	}

	const filteredExpenses = expenses.filter(expense => {
		return expense.date.getFullYear().toString() === filteredYear;
	});

	let expensesContent = <p>No expenses found.</p>;

	if (filteredExpenses.length > 0) {
		expensesContent = filteredExpenses.map(expense => {
			return (
				<ExpenseItem
					key={expense.id}
					title={expense.title}
					amount={expense.amount}
					date={expense.date}
				/>
			)
		})
	}

	return (
		// Card 랩퍼 컴포넌트를 사용해서 .card 클래스의 스타일을 적용시켰다. (모서리 둥글게)
		<Card className='expenses'>
			<ExpensesFilter
				onChangeFilter={filterChangeHandler}
				selected={filteredYear}
			/>
			{expensesContent}
		</Card>
	);
}

export default Expenses;
