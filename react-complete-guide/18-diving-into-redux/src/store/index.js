// export 'default' (imported as 'redux') was not found in 'redux'
// NOT WORKING: import redux from 'redux';
import {createStore} from 'redux';

// @reduxjs/toolkit 에는 redux 가 포함되어 있음.
// 장점: 액션 객체를 생성하는 작업과 고유한 식별자(action.type==='INCREMENT')를 생각해내는 작업과
// 오타에 대해 걱정할 필요가 없어짐.
import {createSlice, configureStore} from "@reduxjs/toolkit";

const initialState = {
	counter: 0,
	showCounter: true,
}


// Redux toolkit는 내부적으로 immer 라는 다른 패키지를 사용함.
// immer는 이런 코드를 감지하고 자동으로 원래 있는 상태를 복제해서 새로운 상태 객체를 생성함.
const counterSlice = createSlice({
	name: 'counter', // 모든 슬라이스에는 이름이 있어야 한다.
	initialState,
	reducers: {
		// 여기서 변경한 상태는 이미 복제된 새로운 상태 객체이므로 이런 식의 상태 변경이 허용됨.
		increment(state) {
			state.counter++;
		},
		decrement(state) {
			state.counter--;
		},
		// Redux toolkit 을 사용해도 액션을 listen 하는 리듀서를 가질 수 있음.
		increase(state, action) {
			// 전달하고자 하는 추가 데이터를 가지고 있는 프로퍼티 이름은 payload 로 정해져있음.
			state.counter += action.payload;
		},
		toggleCounter(state) {
			state.showCounter = !state.showCounter;
		},
	}
});

// 기본 리덕스에는 combine reducers 라는 함수가 있지만
// reduxjs/toolkit 에서 다른 함수를 가져올 수 있음.
const store = configureStore({
	reducer: counterSlice.reducer,
	// slice 가 여러개 라면 아래의 문법으로 모든 리듀서를 하나의 큰 리듀서로 병합한다.
	// reducer: {
	// 	counter: counterSlice.reducer
	// }
})
export const counterActions = counterSlice.actions;
export default store;
