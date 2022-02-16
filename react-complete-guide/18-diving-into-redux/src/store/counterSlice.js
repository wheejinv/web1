import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	counter: 0,
	showCounter: true,
}

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

export const counterActions = counterSlice.actions;
export default counterSlice;
