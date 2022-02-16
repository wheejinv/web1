import classes from './Counter.module.css';

// useSelector: 리액트-리덕스 팀이 만든 커스텀 훅.
// useStore 훅을 사용하면 스토어에 바로 접근이 가능하다.
// 하지만 useSelector 가 더 편리함. 자동으로 상태의 일부를 선택하기 해줌.

// connect:  클래스 컴포넌트에서는 커텍트 함수를 사용할 수도 있음.
import {useSelector, connect, useDispatch} from "react-redux";

const Counter = () => {
	// 함수를 인자로 넘기면 리액트 리덕스가 실행해서 어떤 데이터를 스토어에서 추출할지 결정한다.
	// coluter: 리덕스가 관리하는 카운터 상수
	// useSelector 를 사용할 때 리액트 리덕스가 자동으로 서브스크립션을 설정함.
	// react-redux: 컴포넌트를 위한 리덕스-스토어
	const counter = useSelector(state => state.counter);

	const dispatch = useDispatch();

	const incrementHandler = () => {
		dispatch({
			type: 'increment'
		})
	}

	const decrementHandler = () => {
		dispatch({
			type: 'decrement'
		})
	}

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
			<div>
				<button onClick={incrementHandler}>Increment</button>
				<button onClick={decrementHandler}>Decrement</button>
			</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
