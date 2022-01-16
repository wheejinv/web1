// https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery

module.exports = (Text) => {
	// 1단계 소문자로, 2단계 띄어쓰기를 - 로 변환, 3번째 문자 숫자외의 것들 없애기.
	return Text.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '');
}
