// long: module.exports
// short: exports
module.exports = {
	getDate,
}

function getDate() {
	var today = new Date();

	let options = {
		weekday: "long",
		day: "numeric",
		month: "long",
	}

// https://www.w3schools.com/jsref/jsref_tolocalestring.asp
	let day = today.toLocaleDateString("en-US", options);

	return day;
}


