function Suggestion(props) {
	const {$target} = props;

	this.state = {
		suggestionList: [],
	}

	const componentDiv = document.createElement('div');
	componentDiv.className = 'Suggestion';
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
		// this.state = {suggestionList, inputText, currentSuggestionIndex}
		const {suggestionList, inputText, currentSuggestionIndex} = this.state;

		componentDiv.innerHTML = `
			<ul>
			${suggestionList.map(text => {
				let matchText = '';
				let restFirst = '';
				let restLast = '';

				const index = text.toLowerCase().indexOf(inputText);
				matchText = text.substring(index, index + inputText.length);

				restFirst = text.substring(0, index);
				restLast = text.substring(index + inputText.length, text.length);


				if (suggestionList[currentSuggestionIndex] === text) {
					return `<li class="Suggestion__item--selected">${restFirst ? restFirst : ''}<span class="Suggestion__item--matched">${matchText}</span>${restLast ? restLast : ''}</li>`
				} else {
					return `<li>${restFirst ? restFirst : ''}<span class="Suggestion__item--matched">${matchText}</span>${restLast ? restLast : ''}</li>`
				}
			}).join('')}
		</ul>
		`;
	}

	this.render();
}

export default Suggestion;
