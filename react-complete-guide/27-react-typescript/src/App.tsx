import './App.scss';
import Todos from "./components/Todos";

function App() {
	return (
		<div>
			<Todos items={['hello']}/>
		</div>
	);
}

export default App;
