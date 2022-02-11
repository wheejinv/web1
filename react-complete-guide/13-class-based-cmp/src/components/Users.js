import {Component, useState} from 'react';
import User from './User';

import classes from './Users.module.css';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class Users extends Component {
	constructor() {
		super();

		this.state = {
			showUsers: true,
			more: 'TEST',
		};
	}

	toggleUsersHandler() {
		// this.state.showUsers = false; // NOT!

		// 이전의 state를 재정의하지 않고,
		// React가 뒤에서 여기에 전달하는 객체를 기존 state와 병합한다.
		this.setState(prevState => {
			return {
				showUsers: !prevState.showUsers
			}
		});
	}

	render() {
		const usersList = (
			<ul>
				{DUMMY_USERS.map((user) => (
					<User key={user.id} name={user.name} />
				))}
			</ul>
		);

		return (
			<div className={classes.users}>
				<button onClick={this.toggleUsersHandler.bind(this)}>
					{this.state.showUsers ? 'Hide' : 'Show'} Users
				</button>
				{this.state.showUsers && usersList}
			</div>
		);
	}
}

export default Users;
