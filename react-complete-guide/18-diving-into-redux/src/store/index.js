// export 'default' (imported as 'redux') was not found in 'redux'
// NOT WORKING: import redux from 'redux';
import {createStore} from 'redux';

const initialState = {
	counter: 0,
	showCounter: true,
}

const reducer = (state, action) => {
	if (action.type === 'increment') {
		return {
			...state,
			counter: state.counter + 1,
		}
	} else if (action.type === 'decrement') {
		return {
			...state,
			counter: state.counter - 1,
		}
	} else if (action.type === 'increase') {
		return {
			...state,
			counter: state.counter + action.amount,
		}
	} else if (action.type === 'toggle') {
		return {
			...state,
			showCounter: !state.showCounter
		}
	}

	return state;
}

const store =  createStore(reducer,initialState)

export default store;
