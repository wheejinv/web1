const redux = require('redux');

const counterReducer = (state, action) => {
	if (action.type === 'increment') {
		return {
			counter: state.counter + 1,
		}
	} else if (action.type === 'decrement') {
		return {
			counter: state.counter - 1,
		}
	}

	return state;
}

const store = redux.createStore(counterReducer, {
	counter: 0,
});

console.log(store.getState());

const counterSubscriber = () => {
	const latestState = store.getState();
	console.log('a', latestState);
}

store.subscribe(counterSubscriber)

console.log('dispatch before');
store.dispatch({
	type: 'increment',
})
console.log('dispatch after');

store.dispatch({
	type: 'decrement',
})
