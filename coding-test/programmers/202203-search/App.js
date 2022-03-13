import SelectedLanguage from "./components/SelectedLanguage.js";
import SearchInput from "./components/SearchInput.js";
import Suggestion from "./components/Suggestion.js";
import {request} from "./api.js";
import {getCache, hasCache, saveCache} from "./cacheUtil.js";

const initialState = {
	selectedList: [],
	inputText: '',
	suggestionList: [],
}

function App({$target}) {
	this.state = {...initialState};

	this.setState = nextState => {
		this.state = nextState;
		this.render();
	}

	this.onInputText = async (text) => {
		this.setState({
			...this.state,
			inputText: text,
			suggestionList: [],
		})

		let suggestionListResponse = [];
		if (hasCache(text)) {
			suggestionListResponse = getCache(text)
		} else {
			suggestionListResponse = await request(text);

			if (Array.isArray(suggestionListResponse)) {
				saveCache(text, suggestionListResponse);
			}
		}

		this.setState({
			...this.state,
			suggestionList: suggestionListResponse
		})
	}

	this.render = () => {
		// 처음에 해주면 state 변경 시 마다 컴포넌트 계속 새로 그려줘야 하는데...
		$target.innerHTML = '';

		const {inputText, suggestionList, selectedList} = this.state;

		if (selectedList.length > 0) {
			new SelectedLanguage({
				$target,
			});
		}

		new SearchInput({
			$target,
			onInputText: this.onInputText,
			inputText: this.state.inputText,
		});

		if (inputText.trim().length !== 0 && suggestionList.length > 0) {
			new Suggestion({
				$target,
			})
		}
	}

	this.render();
}

export default App;
