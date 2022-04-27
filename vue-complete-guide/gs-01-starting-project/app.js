Vue.createApp({
	data() {
		return {
			goals: [],
			enteredValue: ''
		};
	},
	methods: {
		addGoal() {
			this.goals.push(this.enteredValue);
			this.enteredValue = '';
		}
	}
}).mount('#app');

// let goal = document.getElementById('goal');
//
// const buttonElement = document.querySelector('button');
// const inputElement = document.querySelector('input');
// const listElement = document.querySelector('ul');
//
// buttonElement.addEventListener('click', e => {
// 	const enteredValue = inputElement.value;
// 	const listItemElement = document.createElement('li');
// 	listItemElement.textContent = enteredValue;
// 	listElement.appendChild(listItemElement);
// 	inputElement.value = '';
//
// })
