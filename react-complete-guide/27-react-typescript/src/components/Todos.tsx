import React from "react";
import Todo from "../models/todos";


// FC: Function Component
// 제너릭 유형에 구체적인 값을 꽂아 넣고 있음.
// 이렇게 하는 이유는 타입스크립트가 제너릭 유형을 추론하게 해서는 안된다.
// 왜? 함수를 정의해서 이 함수를 내부적으로 다루는 방법에 대해 타입스크립트에게 알리려고 하고 있기 때문.
// const Todos: React.FC<{items: string[]}> = (props) => {
// 	return (
// 		<ul>
// 			{props.items.map((item, index) => <li key={index}>{item}</li>)}
// 			<li>Learn React</li>
// 			<li>Learn TypeScript</li>
// 		</ul>
// 	);
// }

// 근데 요즘에는 React.FC 를 안쓰고 있는 추세라고 함.
// 이유: https://velog.io/@velopert/create-typescript-react-component

type TodosProps = {
	items: Todo[];
}

function Todos({items}: TodosProps) {
	return (
		<div>
			<ul>
				{items.map((item, index) => <li key={item.id + index}>{item.text}</li>)}
			</ul>
		</div>
	);
}

// React.FC 를 쓰는 경우 파라미터를 안넣으면 IDE 에서는 오류 처리함.
Todos.defaultProps = {
	items: ['hello']
}

export default Todos;
