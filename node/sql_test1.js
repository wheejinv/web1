const DB2 = require('./db_connection');

const sql = DB2.format(`SELECT * from auth`);
DB2.query(sql, (err, rows) => {
	const res= rows;
	const result = JSON.parse(JSON.stringify(rows));

	// console.log(err);
	// console.log(rows);

	console.log(res);
})
