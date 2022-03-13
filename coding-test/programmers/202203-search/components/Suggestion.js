function Suggestion(props) {
	const {$target} = props;

	this.setState = nextState => {
		this.state = nextState;
		this.render();
	}

	this.render = () => {
		const componentDiv = document.createElement('div');
		componentDiv.className = 'Suggestion';
		$target.appendChild(componentDiv);
		componentDiv.innerHTML = `
			<ul>
			<li class="Suggestion__item--selected">Action<span class="Suggestion__item--matched">Script</span></li>
			<li>Action<span class="Suggestion__item--matched">Script</span></li>
			<li>Action<span class="Suggestion__item--matched">Script</span></li>
			<li>Action<span class="Suggestion__item--matched">Script</span></li>
		</ul>
		`;
	}

	this.render();
}

export default Suggestion;
