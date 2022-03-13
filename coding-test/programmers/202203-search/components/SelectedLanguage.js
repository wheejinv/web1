function SelectedLanguage(props) {
	const {$target} = props;

	this.state = {
		selectedList: [],
	}

	const componentDiv = document.createElement('div');
	componentDiv.className = 'SelectedLanguage';
	$target.appendChild(componentDiv);


	this.setState = nextState => {
		this.state = nextState;
		this.render();
	}

	this.show = () => {
		componentDiv.style.display = '';
	}

	this.hide = () => {
		componentDiv.style.display = 'none';
	}

	this.render = () => {
		// this.state = {suggestionList}
		const {selectedList} = this.state;

		componentDiv.innerHTML = `
			<ul>
				${selectedList.map( text => `<li>${text}</li>`).join('')}
		</ul>
		`;
	}

	this.render();
}

export default SelectedLanguage;
