function SearchInput(props) {
	const {$target, onInputText, inputText} = props;

	this.setState = nextState => {
		this.state = nextState;
		this.render();
	}

	this.render = () => {
		const componentForm = document.createElement('form');
		componentForm.className = 'SearchInput';
		componentForm.onsubmit = e => {
			e.preventDefault();
		}

		$target.appendChild(componentForm);

		const inputElement = document.createElement('input');
		inputElement.value = inputText;
		inputElement.autofocus = 'autofocus';
		inputElement.className = 'SearchInput__input';
		inputElement.type = 'text';
		inputElement.placeholder = '프로그램 언어를 입력하세요.';
		inputElement.oninput = e => {
			onInputText(inputElement.value)
		}

		componentForm.appendChild(inputElement);
	}

	this.render();
}

export default SearchInput;
