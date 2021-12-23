import hello_word from "./Hello";
import world_word from "./World";
// import "../css/style.css"
import"../css/mainStyle.scss"


let test = function() {
	console.log("clicked, ", hello_word, world_word);
};

// module 안에서 정의된 것은 window 로 접근할 수 없어서 그럼..
window.test = test;