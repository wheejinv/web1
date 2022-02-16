// export 'default' (imported as 'redux') was not found in 'redux'
// NOT WORKING: import redux from 'redux';
import {createStore} from 'redux';

const reducer = (state, action) => {
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

const store =  createStore(reducer,{
	counter: 0,
})

export default store;
