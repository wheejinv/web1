import React, { Component } from 'react';
import './ValidationSample.scss'

class ValidationSample extends Component {
	// textInput DOM 엘리먼트를 저장하기 위한 ref를 생성합니다.
	textInput = React.createRef();
	state = {
		password: '',
		clicked: false,
		validated: false
	}

	handleChange = e => {
		this.setState({
			password: e.target.value
		});
	}

	handleButtonClick = () => {
		this.setState({
			clicked: true,
			validated: this.state.password === '0000'
		});

		// DOM API를 사용하여 명시적으로 text 타입의 input 엘리먼트를 포커스합니다.
		// 주의: 우리는 지금 DOM 노드를 얻기 위해 "current" 프로퍼티에 접근하고 있습니다.
		this.textInput.current.focus();
	}

	render() {
		// React에게 우리가 text 타입의 input 엘리먼트를
		// 우리가 생성자에서 생성한 `textInput` ref와 연결하고 싶다고 이야기합니다.
		return (
			<div>
				<input
					ref={this.textInput}
					type="password"
					value={this.state.password}
					onChange={this.handleChange}
					className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ''}
				/>
				<button onClick={this.handleButtonClick} >검증하기</button>
			</div>
		)
	}
}

export default ValidationSample;
