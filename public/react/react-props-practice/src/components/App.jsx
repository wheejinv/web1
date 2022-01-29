import React from "react";
import Card from './Card';
import Contracts from '../contacts'

function App() {
	let arrCard = [];

	for (let i = 0; i < Contracts.length; i++) {
		arrCard.push(<Card info={Contracts[i]}/>);
	}

	return (
		<div>
			<h1 className="heading">My Contacts</h1>
			{arrCard}
		</div>
	);
}

export default App;
