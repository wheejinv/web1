function SearchInput(props) {
	const {$target} = props;

	this.setState = nextState => {
		this.state = nextState;
		this.render();
	}

	this.render = () => {
		const componentForm = document.createElement('form');
		componentForm.className = 'SearchInput';
		$target.appendChild(componentForm);
		componentForm.innerHTML = `
		<input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요.">
		`;
	}

	this.render();
}

export default SearchInput;
