import SelectedLanguage from "./components/SelectedLanguage.js";
import SearchInput from "./components/SearchInput.js";
import Suggestion from "./components/Suggestion.js";
import {request} from "./api.js";
import {getCache, hasCache, saveCache} from "./cacheUtil.js";
import {addSelected, getSelected} from "./localStore.js";

const initialState = {
	selectedList: getSelected(),
	inputText: '',
	suggestionList: [],
	currentSuggestionIndex: 0,
}

function App({$target}) {
	this.state = {...initialState};

	this.setState = nextState => {
		this.state = nextState;
		this.render();
	}

	let lastInputTimeStamp = Date.now() + 3600 * 1000; // 1 hour
	let timeoutId = -1;

	this.onInputText = async (text) => {
		this.setState({
			...this.state,
			suggestionList: [],
		})

		if (text.trim().length === 0) {
			return;
		}

		this.setState({
			...this.state,
			inputText: text,
		})

		let suggestionListResponse = [];
		if (hasCache(text)) {
			suggestionListResponse = getCache(text);

			this.setState({
				...this.state,
				suggestionList: suggestionListResponse,
				currentSuggestionIndex: 0,
			})
		} else {
			if (timeoutId > 0) {
				clearTimeout(timeoutId);
				timeoutId = -1;
			}

			timeoutId = setTimeout( async () => {
				if (this.state.inputText.trim().length === 0) {
					return;
				}

				suggestionListResponse = await request(text);

				if (Array.isArray(suggestionListResponse)) {
					saveCache(text, suggestionListResponse);
				}

				this.setState({
					...this.state,
					suggestionList: suggestionListResponse,
					currentSuggestionIndex: 0,
				})
			}, 1000);
		}
	}

	document.addEventListener('keydown', e => {
		const {currentSuggestionIndex, suggestionList, selectedList} = this.state;

		if (e.key === 'ArrowDown') {
			this.setState({
				...this.state,
				currentSuggestionIndex: (currentSuggestionIndex + 1 + suggestionList.length) % suggestionList.length,
			})
		} else if (e.key === 'ArrowUp') {
			this.setState({
				...this.state,
				currentSuggestionIndex: (currentSuggestionIndex - 1 + suggestionList.length) % suggestionList.length,
			})
		} else if (e.key === 'Enter') {
			const selectWord = suggestionList[currentSuggestionIndex];

			if (!selectWord) return;

			alert(selectWord);

			addSelected(selectWord);

			this.setState({
				...this.state,
				selectedList: getSelected(),
				suggestionList: [],
				inputText: '',
				currentSuggestionIndex: 0,
			})
		}
	})

	this.selectedLanguage = new SelectedLanguage({
		$target,
	});

	this.searchInput = new SearchInput({
		$target,
		onInputText: this.onInputText,
	});

	this.suggestion =  new Suggestion({
		$target,
	})

	this.render = () => {
		const {inputText, suggestionList, selectedList, currentSuggestionIndex} = this.state;

		if (selectedList.length > 0) {
			this.selectedLanguage.setState({selectedList});
			this.selectedLanguage.show();
		} else {
			this.selectedLanguage.hide();
		}

		if (inputText.trim().length !== 0 && suggestionList.length > 0) {
			this.suggestion.setState({suggestionList, inputText, currentSuggestionIndex});
			this.suggestion.show();
		} else {
			this.suggestion.hide();
		}
	}

	this.render();
}

export default App;
