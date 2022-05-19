let query = (sql) => {
	return new Promise((resolve, reject) => {
		let err = new Error('query broken!!');
		err.query = sql;
		reject(err)
	})
};

process.on('unhandledRejection', (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});



process.on('uncaughtException', (err) => {
	console.log('uncaughtException', err);
});

(async () => {
	let result = await query('SELECT * FROM auth');

	throw new Error('test error');

	console.log('test');

	// try {
	// 	let result = await query('SELECT * FROM auth');
	// } catch (e) {
	// 	console.log('try-catch', e);
	// }
})()




// try {
// 	try {
// 		throw new Error('asd')
// 	} catch(e) {
// 		throw e;
// 	}
// 	// throw new Error('normal')
//
// } catch(e) {
// 	console.log('outer try-catch', e)
// }
