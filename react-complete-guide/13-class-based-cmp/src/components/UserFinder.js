import {Fragment, useState, useEffect, Component} from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import ErrorBoundary from "./ErrorBoundary";

const DUMMY_USERS = [
	{ id: 'u1', name: 'Max' },
	{ id: 'u2', name: 'Manuel' },
	{ id: 'u3', name: 'Julie' },
];

class UserFinder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filteredUsers: DUMMY_USERS,
			searchTerm: '',
		}
	}

	searchChangeHandler(event) {
		this.setState({
			searchTerm: event.target.value
		})
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevState.searchTerm !== this.state.searchTerm) {
			this.setState({
				filteredUsers: DUMMY_USERS.filter((user) => {
					return user.name.includes(this.state.searchTerm)
				})
			});
		}
	}

	render() {
		return (
			<Fragment>
				<div className={classes.finder}>
					<input type='search' onChange={this.searchChangeHandler.bind(this)}/>
				</div>
				<ErrorBoundary>
					<Users users={this.state.filteredUsers}/>
				</ErrorBoundary>
			</Fragment>
		);
	}
}

export default UserFinder;
