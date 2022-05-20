const DB = require('./db_connection').DB;
const DB2 = require('./db_connection').DB2;
const format = require('sql-formatter').format;

const sql = DB2.format(`
	select *
	FROM game
		   WHERE asd = '1';
`);

process.on('unhandledRejection', (reason, promise) => {
	console.log(reason);

	console.log(format(reason.sql));
});

// const sql = DB2.format(`SELECT menu FROM auth;`);
const sql2 = DB2.format(
	`
		SELECT GROUP_CONCAT(name separator '-') task_name
		FROM task
	`);
// DB2.query(sql2, (err, rows) => {
// 	console.log(rows);
// });

// DB.query(sql, (err, rows) => {
// 	console.log(err);
// 	console.log(rows);
// });

(async () => {

	let [result] = await DB2.query(sql);

	// try {
	// 	let [result] = await DB2.query(sql);
	// 	console.log(result);
	// } catch(e) {
	// 	console.log(e);
	// }
})()
