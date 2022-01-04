var randomNumber1 = 1 + Math.floor(Math.random() * 6);
var randomNumber2 = 1 + Math.floor(Math.random() * 6);

document.querySelector('.img1').setAttribute('src', `./img/dice${randomNumber1}.png`);
document.querySelector('.img2').setAttribute('src', `./img/dice${randomNumber2}.png`);

var head = document.querySelector('.container h1');
if (randomNumber1 > randomNumber2) {
	head.textContent = "🚩 Player 1 Win!";
} else if (randomNumber1 === randomNumber2) {
	head.textContent = "Draw!";
} else {
	head.textContent = "Player 2 Win! 🚩";
}
