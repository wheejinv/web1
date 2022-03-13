import SelectedLanguage from "./components/SelectedLanguage.js";
import SearchInput from "./components/SearchInput.js";
import Suggestion from "./components/Suggestion.js";

function App({$target}) {

	this.setState = nextState => {
		this.state = nextState;
		this.render();
	}

	this.render = () => {
		$target.innerHTML = '';

		new SelectedLanguage({
			$target,
		});

		new SearchInput({
			$target,
		});

		new Suggestion({
			$target,
		})
	}

	this.render();
}

export default App;
