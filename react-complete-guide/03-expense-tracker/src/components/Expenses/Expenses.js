import React, {useState} from "react";
import './Expenses.scss'

import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";

function Expenses(props) {
	const {items} = props;
	const [filteredYear, setFilteredYear] = useState('2020');

	function filterChangeHandler(selectedYear) {
		console.log(selectedYear)
		// setSelectedYear(year);
	}

	return (
		// Card 랩퍼 컴포넌트를 사용해서 .card 클래스의 스타일을 적용시켰다. (모서리 둥글게)
		<Card className='expenses'>
			<ExpensesFilter
				onChangeFilter={filterChangeHandler}
				selected={filteredYear}
			/>
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
		</Card>
	);
}

export default Expenses;
