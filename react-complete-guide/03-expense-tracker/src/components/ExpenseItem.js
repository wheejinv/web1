import './ExpenseItem.scss'
import ExpenseDate from "./ExpenseDate";

function ExpenseItem(props) {
	let {title, date, amount} = props;

	return (
		<div className="expense-item">
			<ExpenseDate date={date}/>
			<div className="expense-item__description">
				<h2>{title}</h2>
				<div className="expense-item__price">${amount}</div>
			</div>
		</div>
	);
}

export default ExpenseItem;
