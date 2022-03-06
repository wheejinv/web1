// 클래스를 사용하면 좋은게 자료 저장도 되면서 타입으로도 활용 가능.
class Todo {
	// typescript 에서는 프로퍼티를 클저 정의
	id: string;
	text: string;

	constructor(todoText: string) {
		this.id = new Date().toISOString() + Math.random();
		this.text = todoText;
	}
}

export default Todo;
