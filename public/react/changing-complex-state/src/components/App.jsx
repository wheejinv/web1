import React, {useState} from "react";

function App() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	function updateFirstName(e) {
		setFirstName(e.target.value);
	}

	function updateLastName(e) {
		setLastName(e.target.value);
	}

	return (
    <div className="container">
      <h1>Hello {firstName} {lastName}</h1>
      <form>
        <input
					onChange={updateFirstName}
					value={firstName}
					name="fName"
					placeholder="First Name"
				/>
        <input
					onChange={updateLastName}
					value={lastName}
					name="lName"
					placeholder="Last Name"
				/>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
