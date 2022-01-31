import React, {useState} from "react";

function App() {
	const [fullName, setFullName] = useState({
		firstName: '',
		lastName: '',
	});

	function handleChange(event) {
		const {name, value} = event.target;

		// useState 에서 예전 상태값 가져오기, 값 대신 함수를 넣어주면 가능.
		// type SetStateAction<S> = S | ((prevState: S) => S);
		setFullName(prevState => {
			if (name === "fName") {
				return {
					...prevState,
					firstName: value
				}
			} else {
				return {
					...prevState,
					lastName: value
				}
			}
		});
	}

	return (
		<div className="container">
			<h1>Hello {fullName.firstName} {fullName.lastName}</h1>
			<form>
				<input
					onChange={handleChange}
					value={fullName.firstName}
					name="fName"
					placeholder="First Name"
				/>
				<input
					onChange={handleChange}
					value={fullName.lastName}
					name="lName"
					placeholder="Last Name"
				/>
				<button>Submit</button>
			</form>
		</div>
	);
}

export default App;
