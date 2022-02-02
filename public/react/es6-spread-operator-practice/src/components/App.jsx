import React, {useState} from "react";

function App() {
	const [input, setInput] = useState({
		todoInput : "",
		todoList: []
	});

	function handleChange(e) {
		let {name, value} = e.target;

		if (name === "todoInput") {
			setInput( prev => {
				return {
					...prev,
					[name]: value
				}
			})
		}
	}

	function handleClick(e) {
		setInput( prev => {
			return {
				todoInput: "",
				todoList: prev.todoList.concat(prev.todoInput)
			}
		})
	}

	return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input
					name="todoInput"
					type="text"
					value={input.todoInput}
					onChange={handleChange}
				/>
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
					{input.todoList.map((todo, index) => <li key={index}>{todo}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
