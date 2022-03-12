

// https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword=java

(async ()=>{
	const response = await fetch('https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword=java');
	const json = await response.json();

	console.log(json);
})()
