import React, {useState, useEffect} from "react";

function App() {
	const [time, setTime] = useState(new Date().toLocaleTimeString());

	function updateTime() {
		setTime(new Date().toLocaleTimeString());
	}

	useEffect(() => {
		let timeoutID = setInterval(() => {
			updateTime();
		}, 1000);

		return () => {
			clearInterval(timeoutID);
		};
	});

	return (
		<div className="container">
			<h1>{time}</h1>
			<button onClick={updateTime}>Get Time</button>
		</div>
	);
}

export default App;
