let gamePattern = [];
const buttonColours = ['red', 'blue', 'green', 'yellow'];
let isPlaying = false;
let currentLevel = 0;
let level = 0;
let isFirstGame = true;

let nextSequence = () => {
	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColour = buttonColours[randomNumber];
	level += 1;

	setHead(`Level ${level}`);

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

let checkAnswer = (userChosenColour) => {
	if (gamePattern[currentLevel] === userChosenColour) {
		currentLevel++;

		if (level === currentLevel) {
			currentLevel = 0;
			setTimeout( () => {
				nextSequence();
			}, 1000)
		}
	} else {
		gameOver();
	}
}

let gameOver = () => {
	$("body").addClass("game-over");

	setTimeout( () => {
		$("body").removeClass("game-over");
	}, 200);

	playSound("wrong");

	isPlaying = false;
	currentLevel = 0;
	level = 0;
	gamePattern = [];

	setHead("Game Over, Press Any Key to Restart");
}

let playSound = (fileName) => {
	var audio = new Audio(`./sounds/${fileName}.mp3`);
	audio.play();
};

let animatePress = (btn) => {
		btn.classList.add("pressed");

		setTimeout( () => {
			btn.classList.remove("pressed");
		}, 100);
};

let setHead = (text) => {
	$("h1").text(text);
};

$(".btn").on("click", function(event) {
	if (isPlaying === false) {
		return;
	}

	console.log("ad");
	playSound(this.id);
	animatePress(this);
	checkAnswer(this.id);
});

$(document).keypress((event) => {
	if (isFirstGame) {
		if (event.key === "a" && isPlaying === false) {
			isPlaying = true;
			level = 0;
			isFirstGame = false;
			nextSequence();
		}
	} else if (isPlaying === false) {
		isPlaying = true;
		level = 0;
		isFirstGame = false;
		nextSequence();
	}
});



