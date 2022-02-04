import './ExpenseDate.scss'

function ExpenseDate(props) {
	const {date} = props;

	let month = date.toLocaleString('en-US', {month: 'long'});
	let day = date.toLocaleString('en-US', {day: '2-digit'});
	let year = date.getFullYear();

	return (
		<div className='expense-date'>
			<div className='expense-date__month'>{month}</div>
			<div className='expense-date__year'>{year}</div>
			<div className='expense-date__day'>{day}</div>
		</div>
	);
}

export default ExpenseDate;
