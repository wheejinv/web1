import React, {useState} from 'react';
import './ExpenseForm.scss'

function ExpenseForm(props) {
	const [input, setInput] = useState({
		title: "",
		amount: "",
		date: "",
	});

	function changeHandler(e) {
		const {name, value} = e.target;
		// console.log(typeof value, value)

		// 동시에 많은 상태 업데이트를 계획한다면 오래되거나 잘못된 상태 snapshot에 의존할 수도 있게 됨.
		// 그래서 이 방법은 추천하지 않음.
		// setInput({
		// 	...input,
		// 	[name]: value
		// })

		// 항상 최신 상태 snapshot에 기반해서 실행한다는 전제를 보장해줌.
		setInput( prevState => {
			return {
				...prevState,
				[name]: value
			}
		})
	}

	function submitHandler(e) {
		const {title, amount, date} = input;
		const expenseData = {
			title,
			amount: parseFloat(amount),
			date: new Date(date)
		}

		console.log(expenseData);

		props.onAddExpense(expenseData);

		setInput({
			title: "",
			amount: "",
			date: "",
		});

		e.preventDefault();
	}

	return (
		<form action="">
			<div className="new-expense__controls">
				<div className="new-expense__control">
					<label>Title</label>
					<input
						name="title"
						type="text"
						onChange={changeHandler}
						value={input.title}
					/>
				</div>
				<div className="new-expense__control">
					<label>Amount</label>
					<input
						name="amount"
						type="number"
						min="0.01"
						step="0.01"
						onChange={changeHandler}
						value={input.amount}
					/>
				</div>
				<div className="new-expense__control">
					<label>Date</label>
					<input
						name="date"
						type="date"
						min="2019-01-01"
						max="2022-12-31"
						onChange={changeHandler}
						value={input.date}
					/>
				</div>
			</div>
			<div className="new-expense__actions">
				<button type="button" onClick={props.onCancel}>Cancel</button>
				<button type="submit" onClick={submitHandler}>Add Expense</button>
			</div>
		</form>
	);
}

export default ExpenseForm;
