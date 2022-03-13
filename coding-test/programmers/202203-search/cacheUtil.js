const cache = {

}

export function hasCache(text) {
	return cache.hasOwnProperty(text)
}

export function saveCache(text, result) {
	return cache[text] = result;
}

export function getCache(text) {
	console.log('cached run: ', text);

	return cache[text];
}
