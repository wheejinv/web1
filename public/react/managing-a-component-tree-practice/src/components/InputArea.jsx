import React, {useState} from "react";

function InputArea(props) {
	const {addItem} = props;

	const [inputText, setInputText] = useState('');

	function handleChange(e) {
		let {value} = e.target;

		setInputText(value);
	}

	function handleClick() {
		addItem(inputText);

		setInputText('');
	}

	return (
    <div className="form">
      <input onChange={handleChange} type="text" value={inputText} />
      <button onClick={handleClick}>
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
