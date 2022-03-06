import React, {useRef} from 'react';
import styles from './NewTodo.module.css';

type NewTodoPropsType = {
	onAddTodo: (text: string) => void
}

function NewTodo(props: NewTodoPropsType) {
	// https://stackoverflow.com/questions/33796267/how-to-use-refs-in-react-with-typescript
	const inputRef = useRef<HTMLInputElement>(null);

	// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/
	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// ? 붙이는 이유: input tag의 ref로 연결은 했지만,
		// 타입스크립트는 코드를 분석하지 않아서 current 값이 null 일수도 있다고 생각함.
		// enteredText type: string | undefined
		// const enteredText = inputRef.current?.value;

		// 개발자로서 이 시점에 non-null 값이라는걸 확신한다면 물음표 대신 느낌표를 사용하여
		// 타입스크립트에게 null 일 리 없다고 알려준다.
		// enteredText type: string
		const enteredText = inputRef.current!.value;

		if (enteredText.trim().length === 0) {
			return;
		}

		props.onAddTodo(enteredText);
	}

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<label htmlFor='inputText'>Todo text</label>
			<input
				ref={inputRef}
				type="text"
				id='inputText'
			/>
			<button>Add Todo</button>
		</form>
	);
}

export default NewTodo;
