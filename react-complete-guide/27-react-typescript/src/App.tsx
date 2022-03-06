import './App.scss';
import Todos from "./components/Todos";
import Todo from "./models/todos";
import NewTodo from "./components/NewTodo";
import {useState} from "react";

function App() {
	// 초기값이 없는 경우 제너릭으로 어떤 값이 들어가주는지 알려줘야 함 -> <Todo[]>
	// const [todos, setTodos] = useState<Todo[]>([]);
	const [todos, setTodos] = useState([
		new Todo('Learn React'),
		new Todo('Learn TypeScript'),
	]);

	const addTodoHandler = (text: string) => {
		setTodos(prevState => ([...prevState, new Todo(text)]));
	}

	return (
		<div>
			<NewTodo onAddTodo={addTodoHandler}/>
			<Todos items={todos}/>
		</div>
	);
}

export default App;
