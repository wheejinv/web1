import React, {useState} from "react";
import './Expenses.scss'
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

function Expenses(props) {
	const {expenses} = props;
	const [filteredYear, setFilteredYear] = useState('2020');

	function filterChangeHandler(selectedYear) {
		setFilteredYear(selectedYear);
	}

	const filteredExpenses = expenses.filter(expense => {
		return expense.date.getFullYear().toString() === filteredYear;
	});

	return (
		// Card 랩퍼 컴포넌트를 사용해서 .card 클래스의 스타일을 적용시켰다. (모서리 둥글게)
		<Card className='expenses'>
			<ExpensesFilter
				onChangeFilter={filterChangeHandler}
				selected={filteredYear}
			/>
			<ExpensesChart expenses={filteredExpenses} />
			<ExpensesList items={filteredExpenses}/>
		</Card>
	);
}

export default Expenses;
