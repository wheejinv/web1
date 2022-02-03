import React, { Component } from 'react';
class LifeCycleSample extends Component {
	state = {
		number: 0,
		color: null
	};
	myRef = null; // ref를 설정할 부분
	constructor(props) {
		super(props);
		console.log('constructor');
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		// v16.3 이후에 새로 생긴 메서드.
		// props로 받아온 값을 state에 동기화시키는 용도로 사용하며
		// 컴포넌트를 마운트하거나 props를 변경할 떄 호출됨.
		console.log('getDerivedStateFromProps');
		if (nextProps.color !== prevState.color) {
			return { color: nextProps.color };
		}
		return null;
	}
	componentDidMount() {
		// 컴포넌트를 만들고, 첫 렌더링을 다 마친 후 실행함.
		// 여기서 다른 라이브러리 또는 프레임워크 함수를 호출하거나 이벤트 등록,
		// setTimeout, setInterval, 네트워크 요청 등의 비동기 작업을 처리하면 됨.
		console.log('componentDidMount');
	}
	shouldComponentUpdate(nextProps, nextState) {
		// 리렌더링을 시작할지 여부를 지정하는 메서드.
		// 최적화 시 리렌더링을 방지하려고 할 때 사용

		console.log('shouldComponentUpdate', nextProps, nextState);
		// 숫자의 마지막 자리가 4면 리렌더링하지 않습니다.
		return nextState.number % 10 !== 4;
	}
	componentWillUnmount() {
		// 컴포넌트를 DOM에서 제거할 때 실행
		// componentDidMount 에서 등록한 이벤트, 타이머, 직접 생성한 DOM 삭제 등의 작업을 해야 함.
		console.log('componentWillUnmount');
	}
	handleClick = () => {
		this.setState({
			number: this.state.number + 1
		});
	};
	getSnapshotBeforeUpdate(prevProps, prevState) {
		// v16.3 이후 생긴 메서드.
		// render 메서드 호출 후 DOM에 변화를 반영하기 바로 직전에 호출하는 메서드.
		// 주로 업데이트하기 직전의 값을 참고할 일이 있을 떄 활용 (ex. 스크롤바 위치 유지)

		console.log('getSnapshotBeforeUpdate');
		if (prevProps.color !== this.props.color) {
			return this.myRef.style.color;
		}
		return null;
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		// 리렌더링을 완료한 후 실행.
		// 업데이트가 끝난 직후이므로, DOM 관련 처리를 해도 무방.

		console.log('componentDidUpdate', prevProps, prevState);
		if (snapshot) {
			console.log('업데이트되기 직전 색상: ', snapshot);
		}
	}
	render() {
		console.log('render');
		const style = {
			color: this.props.color
		};
		return (
			<div>
				{/* {this.props.missing.value} */}
				<h1 style={style} ref={ref => (this.myRef = ref)}>
					{this.state.number}
				</h1>
				<p>color: {this.state.color}</p>
				<button onClick={this.handleClick}>더하기</button>
			</div>
		);
	}
}
export default LifeCycleSample;
