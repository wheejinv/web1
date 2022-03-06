import './App.scss';
import Todos from "./components/Todos";
import Todo from "./models/todos";
import NewTodo from "./components/NewTodo";

function App() {
	const todos = [
		new Todo('Learn React'),
		new Todo('Learn TypeScript'),
	]

	return (
		<div>
			<Todos items={todos}/>
			<NewTodo/>
		</div>
	);
}

export default App;
