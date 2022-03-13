function SelectedLanguage(props) {
	const {$target} = props;

	this.setState = nextState => {
		this.state = nextState;
		this.render();
	}

	this.render = () => {
		const componentDiv = document.createElement('div');
		componentDiv.className = 'SelectedLanguage';
		$target.appendChild(componentDiv);
		componentDiv.innerHTML = `
			<ul>
				<li>JavaScript</li>
				<li>Python</li>
				<li>Java</li>
				<li>PHP</li>
		</ul>
		`;
	}

	this.render();
}

export default SelectedLanguage;
