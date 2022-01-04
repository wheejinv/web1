function handleClick(event) {
	console.log(event);
	console.log('clicked');
	// this.style.color = "white";
	playSound(this.textContent);
	buttonDownAnimation(this.textContent);
}

function handleKeyDown(event) {
	console.log(`keydown: ${event.key}`);
	playSound(event.key);
	buttonDownAnimation(event.key);
}

function buttonDownAnimation(currentKey) {
	var activeButton = document.querySelector("." + currentKey);
	if (activeButton) {
		activeButton.classList.add("pressed");

		setTimeout( () => {
			activeButton.classList.remove("pressed");
		}, 100);
	}
}

var arr = document.querySelectorAll(".drum");

document.addEventListener("keydown", handleKeyDown);

for(let i = 0; i < arr.length; i++) {
	arr[i].addEventListener("click", handleClick);
}

function playSound(key) {

	let fileName = '';
	let shouldPlay = true;
	switch (key) {
		case 'w':
			fileName = "tom-1";
			break;
		case 'a':
			fileName = "tom-2";
			break;
		case 's':
			fileName = "tom-3";
			break;
		case 'd':
			fileName = "tom-4";
			break;
		case 'j':
			fileName = "snare";
			break;
		case 'k':
			fileName = "crash";
			break;
		case 'l':
			fileName = "kick-bass";
			break;
		default:
			shouldPlay = false;
			console.log(`key pressed: ${key}`);
			break;
	}

	if (shouldPlay) {
		var audio = new Audio(`./sounds/${fileName}.mp3`);
		audio.play();
	}
}
