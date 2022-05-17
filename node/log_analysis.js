const fs = require('fs');

let testFolder = 'logs'

const fromMemo = {}
const errorMemo = {}

const CONST_TYPE = {
	FROM: 1,
	ERR_INFO: 2,
}

let errorTotalCount = 0;

// 에러나는 위치에 대한 카운트를 실시
// 에러나는 에러 메시지

fs.readdirSync(testFolder).forEach(async fileName => {
	// 2022-05-08.error.log
	// 2022-05-09.error.log
	// 2022-05-10.error.log
	// ...

	fs.readFile(`./logs/${fileName}`, 'utf8', (err, data) => {
		let arr = data.split('\n');

		let nextType = -1;
		while(arr.length !== 0) {
			let msg = arr.shift().trim();

			if (nextType !== -1) {
				let obj = nextType === CONST_TYPE.FROM ? fromMemo : errorMemo;

				if (obj[`${msg}`]) {
					obj[`${msg}`] += 1;
				} else {
					obj[`${msg}`] = 1;
				}

				nextType = -1;
			}

			if (msg === 'FROM:') {
				nextType = CONST_TYPE.FROM
				errorTotalCount += 1;
			} else if (msg === 'ERR INFO:') {
				nextType = CONST_TYPE.ERR_INFO
			}
		}
	});
})

setTimeout( () => {
	// console.log(fromMemo);
	// console.log(errorMemo);

	console.table(fromMemo)

	let arrFrom = [];
	for (const [msg, count] of Object.entries(fromMemo)) {
		arrFrom.push({
			msg,
			count,
			percent: Math.floor(count / errorTotalCount * 10000) / 100 + ' %',
		})
	}
	arrFrom.sort( (a, b) => {
		return b.count - a.count;
	})
	arrFrom = arrFrom.filter(fromObj => fromObj.count > 10);


	let arrErrorInfo = [];
	for (const [msg, count] of Object.entries(errorMemo)) {
		arrErrorInfo.push({
			msg,
			count,
			percent: Math.floor(count / errorTotalCount * 10000) / 100 + ' %',
		})
	}
	arrErrorInfo.sort( (a, b) => {
		return b.count - a.count;
	})
	arrErrorInfo = arrErrorInfo.filter(errorInfoObj => errorInfoObj.count > 10);

	console.log('-----------FROM MESSAGE---------------');
	console.table(arrFrom, ['msg', 'count', 'percent'])

	console.log('\n\n-----------ERR_INFO MESSAGE---------------');
	console.table(arrErrorInfo, ['msg', 'count', 'percent'])
	// for (let i = 0; i < arrErrorInfo.length; i++) {
	// 	console.log(`${arrErrorInfo[i].msg}`);
	// 	console.log(`count: ${arrErrorInfo[i].count}, percent: ${Math.floor(arrErrorInfo[i].count / errorTotalCount * 100 * 100) / 100 } %`);
	// }

}, 5000)

