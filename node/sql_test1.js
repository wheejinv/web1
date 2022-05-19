const DB = require('./db_connection').DB;
const DB2 = require('./db_connection').DB2;

const sql = DB2.format(`SELECT * FROM game WHERE asd = '1';`);
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
	try {
		let [result] = await DB2.query(sql);
		console.log(result);
	} catch(e) {
		console.log(e);
	}
})()
