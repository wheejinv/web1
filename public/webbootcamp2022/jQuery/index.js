// 의문: $는 document.querySelectorAll 같은 의미로 쓰인다고 봐야할까...?

// css 변경 관련
console.log($("h1").css("font-size")); // 32px, css get
$("h1").css("color", "red"); // css set

// 클래스 조작 관련
$("h1").addClass("big-title"); // 2개의 클래스 추가
setTimeout( () => {
	$("h1").removeClass("margin-50");
}, 500)
console.log($("h1").hasClass("margin-50"));

// text, html 조작
$("h1").text("Bye");
$("button").text("Don't Click this!");
setTimeout( () => {
	$("button").html("<em>Hey</em>")
}, 1000)

// 속성 관련
console.log($("img").attr("src"));
$("a").attr("href", "https://yahoo.com");
console.log($("h1").attr("class")); // 클래스 목록 얻기

// event 관련
// $("h1").click(function() {
// 	$("h1").css("color", "purple");
// });
$("h1").on("click", function() {
	$("h1").css("color", "purple");
});
$("button").click(function() {
	$("h1").css("color", "green");
});
$("input").keypress(function(event) {
	$("h1").text(event.key);
});

// add, remove element
$("h1").before("<button>New</button>"); // before, after 태그 바깥쪽에 들어감.
$("h1").append("<button>asd</button>"); // prepend, append는 태그 안쪽에 들어감.
// $("button").remove(); // 그냥 주석 처리

// animation 관련
$("button").click( () => {
	// $("h1").toggle();

	// built-in
	// $("h1").fadeToggle(); // fadeIn, fadeOut
	// $("h1").slideToggle(); // slideUp, slideDown

	// 체이닝 및 애니메이션 기능까지.
	$("h1")
	.slideUp()
	.slideDown()
	.animate({
		opacity: 0.5
	})
});
