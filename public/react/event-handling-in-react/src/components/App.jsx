import React, {useState} from "react";

function App() {
	const [isMouseOver, setIsMouseOver] = useState(false);

	function handleMouseOver() {
		setIsMouseOver(true);
	}

	function handleMouseOut() {
		setIsMouseOver(false);
	}

	function onClick() {
		console.log("clicked");
	}

	return (
		<div className="container">
			<h1>Hello</h1>
			<input type="text" placeholder="What's your name?"/>
			<button
				onClick={onClick}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				// style={isMouseOver ? {background: "black"} : {background: "white"}}> Submit
				style={{backgroundColor: isMouseOver ? "black" : "white"}}> Submit
			</button>
		</div>
	);
}

export default App;
