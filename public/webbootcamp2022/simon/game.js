let gamePattern = [];
let buttonColours = ['red', 'blue', 'green', 'yellow'];

let nextSequence = () => {
	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColour = buttonColours[randomNumber];

	gamePattern.push(randomChosenColour);

	playSound(randomChosenColour);
	$(`#${randomChosenColour}`)
		.animate({
			opacity: 0.2,
		}, 50)
		.animate({
			opacity: 1,
		}, 50);
};

let playSound = (fileName) => {
	var audio = new Audio(`./sounds/${fileName}.mp3`);
	audio.play();
};

$(document).keypress((event) => {
	if (event.key === "a") {
		nextSequence();
	}
})


