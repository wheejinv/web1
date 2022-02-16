// export 'default' (imported as 'redux') was not found in 'redux'
// NOT WORKING: import redux from 'redux';

// @reduxjs/toolkit 에는 redux 가 포함되어 있음.
// 장점: 액션 객체를 생성하는 작업과 고유한 식별자(action.type==='INCREMENT')를 생각해내는 작업과
// 오타에 대해 걱정할 필요가 없어짐.
import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import counterSlice from "./counterSlice";


// Redux toolkit는 내부적으로 immer 라는 다른 패키지를 사용함.
// immer는 이런 코드를 감지하고 자동으로 원래 있는 상태를 복제해서 새로운 상태 객체를 생성함.


// 기본 리덕스에는 combine reducers 라는 함수가 있지만
// reduxjs/toolkit 에서 다른 함수를 가져올 수 있음.
const store = configureStore({
	// reducer: counterSlice.reducer,
	// slice 가 여러개 라면 아래의 문법으로 모든 리듀서를 하나의 큰 리듀서로 병합한다.
	reducer: {
		counter: counterSlice.reducer,
		auth: authSlice.reducer,
	}
})

export default store;
