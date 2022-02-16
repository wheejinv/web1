import React, {Component} from 'react';
import classes from './Counter.module.css';
// connect:  클래스 컴포넌트에서는 커텍트 함수를 사용할 수도 있음.
import {connect} from "react-redux";

class CounterClass extends Component {
	constructor(props) {
		super(props);

	}

	toggleCounterHandler = () => {};

	incrementHandler = () => {
		this.props.increment();
	}

	decrementHandler = () => {
		this.props.decrement();
	}

	render() {
		return (
			<main className={classes.counter}>
				<h1>Redux Counter</h1>
				<div className={classes.value}>{this.props.counter}</div>
				<div>
					<button onClick={this.incrementHandler}>Increment</button>
					<button onClick={this.decrementHandler}>Decrement</button>
				</div>
				<button onClick={this.toggleCounterHandler}>Toggle Counter</button>
			</main>
		);
	}
}

const mapStateToProps = state => {
	return {
		// counter가 키값이고, 리덕스 상태에서 카운터 밸류를 counter prop 에 묶는 것.
		counter: state.counter
	}
}

// mapStateToProps 와 메커니즘은 비슷하다.
// 디스패치 함수를 props 에 저장하는 것.
const mapDispatchToProps = dispatch => {
	return {
		increment: () => dispatch({type: 'increment'}),
		decrement: () => dispatch({type: 'decrement'}),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterClass);
