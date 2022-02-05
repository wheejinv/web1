import React from "react";
import './ExpenseItem.scss'

import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

function ExpenseItem(props) {
	let {title, date, amount} = props;

	return (
		// Card 랩퍼 컴포넌트를 사용해서 .card 클래스의 스타일을 적용시켰다. (모서리 둥글게)
		<Card className="expense-item">
			<ExpenseDate date={date}/>
			<div className="expense-item__description">
				<h2>{title}</h2>
				<div className="expense-item__price">${amount}</div>
			</div>
		</Card>
	);
}

export default ExpenseItem;
