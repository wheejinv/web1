const fs = require('fs');

const getArray = (m, n, arr) => {
	let resultArray = [];
	for (let i = 0; i < n; i++) {
		let rows = arr[i].split(' ').map( tomatoState => parseInt(tomatoState))
		resultArray.push(rows);
	}

	return resultArray;
}

// 종료 조건: 0이 없는 상태.
const checkState = arr => {
	let hasZero = false;
	for (let i = 0; i < arr.length; i++) {
		let array = arr[i];

		for (let j = 0; j < array.length; j++) {
			if (array[j] === 0) {
				hasZero = true;
				break;
			}
		}
	}

	return hasZero;
}

const runDay = (arr, day) => {
	let nextDay = day + 1;

	let shouldRun = checkState(arr);

	let checkList = [];

	if (shouldRun) {
		for (let i = 0; i < arr.length; i++) {
			let rows = arr[i];

			for (let j = 0; j < rows.length; j++) {
				// spreadHarBoiledTomato(arr, i, j);
				if (arr[i][j] === 1) {
					checkList.push({i, j});
				}
			}
		}

		for (const key in checkList) {
			let {i, j} = checkList[key];

			spreadHarBoiledTomato(arr, i, j);
		}

		return runDay(arr, nextDay);
	} else {
		return day;
	}
}

const getValue = (arr, m, n) => {
	return arr[m][n];
}

const spreadHarBoiledTomato = (arr, m, n) => {
	// left
	if (n !== 0 && getValue(arr, m, n-1) !== -1) {
		arr[m][n-1] = 1;
	}

	// right
	if (n !== arr[m].length -1 && getValue(arr, m, n+1) !== -1 ) {
		arr[m][n+1] = 1;
	}

	// top
	if (m !== 0 && getValue(arr, m-1, n) !== -1) {
		arr[m-1][n] = 1;
	}

	// down
	if (m !== arr.length -1 && getValue(arr, m+1, n) !== -1) {
		arr[m+1][n] = 1;
	}

}

const canFinish = arr => {
	// 사방으로 -1 이나 구석이라면 완숙 불가
	let result = true;

	for (let i = 0; i < arr.length; i++) {
		let rows = arr[i];

		for (let j = 0; j < rows.length; j++) {
			if (arr[i][j] === -1) {
				continue;
			}

			let left = true;
			let right = true;
			let top = true;
			let down = true;

			// left
			if (j === 0 || rows[j-1] === -1) {
				left = false;
			}

			// right
			if (j === rows.length-1 || rows[j+1] === -1) {
				right = false;
			}

			// top
			if (i === 0 || getValue(arr, i-1, j) === -1) {
				top = false;
			}

			// down
			if (i === arr.length - 1 || getValue(arr, i+1, j) === -1) {
				down = false;
			}

			if (!left && !right && !top && !down) {
				return false;
			}
		}
	}

	return result;
}

fs.readFile('input3.txt', 'utf8', function(err, data){
	// console.log(data);
	let arr = data.split('\n');
	let mn = arr.shift();
	let [m , n] = mn.split(' ');
	let array = getArray(m, n, arr);

	console.log(`input\n${data}`);

	if (canFinish(array)) {
		let day = runDay(array, 0);
		console.log(`output: ${day}`);
	} else {
		console.log('output: -1');
	}
});
