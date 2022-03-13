function SearchInput(props) {
	const {$target, onInputText} = props;


	this.componentForm = document.createElement('form');
	this.componentForm.className = 'SearchInput';
	this.componentForm.onsubmit = e => {
		e.preventDefault();

		if (this.inputElement) {
			this.inputElement.value = '';
		}
	}
	$target.appendChild(this.componentForm);

	this.inputElement = document.createElement('input');
	this.inputElement.autofocus = 'autofocus';
	this.inputElement.className = 'SearchInput__input';
	this.inputElement.type = 'text';
	this.inputElement.placeholder = '프로그램 언어를 입력하세요.';
	this.inputElement.oninput = e => {
		onInputText(this.inputElement.value)
	}
	this.componentForm.appendChild(this.inputElement);

	this.setState = nextState => {
		this.state = nextState;
		this.render();
	}

	this.render = () => {

	}

	this.render();
}

export default SearchInput;
