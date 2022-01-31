import React, {useState} from "react";

function App() {
	const [name, setName] = useState('');
	const [submittedText, setSubmittedText] = useState('');

	function handleChange(event) {
		setName(event.target.value);
		// console.log(event.target.value);
	}

	function handleClick(event) {
		setSubmittedText(name);

		// html 에서 a 태그나 submit 태그는 고유의 동작으로 페이지를 이동시키거나
		// form 태그 안에 input 등을 전송하는 동작이 있다.
		// 이번 경우에는 페이지가 리로드 되는 기본 동작을 막기 위해 사용했다고 보면 됨.
		event.preventDefault();
	}

	return (
		<div className="container">
			<h1>Hello {submittedText}</h1>
			<form onSubmit={handleClick}>
				<input
					onChange={handleChange}
					type="text"
					placeholder="What's your name?"
					value={name}
				/>
				{/*버튼 onClick에 handleClick 이벤트를 등록하면 form 태그 안에 있기 때문에 페이지 리로딩됨.
				그래서 결국 onSubmit 에서 클릭에 대한 처리를 하고 이벤트의 기본 동작도 막아주는게 효율적. */}
				<button>
					Submit
				</button>
			</form>
		</div>
	);
}

export default App;
