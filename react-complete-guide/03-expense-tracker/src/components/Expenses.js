import ExpenseItem from "./ExpenseItem";
import React from "react";
import './Expenses.scss'
import Card from "./Card";

function Expenses(props) {
	const {items} = props;

	return (
		// Card 랩퍼 컴포넌트를 사용해서 .card 클래스의 스타일을 적용시켰다. (모서리 둥글게)
		<Card className='expenses'>
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
