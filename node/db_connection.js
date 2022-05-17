require('dotenv').config({path: `${__dirname}/dev.env`});
const mysql = require('mysql2');

const {DB_HOST, DB_USER, DB_PASS, DB_SCHEMA} = process.env;
const dbConfig = {
	host: DB_HOST,
	port: 3306,
	user: DB_USER,
	password: DB_PASS,
	database: DB_SCHEMA,
}

const connection = mysql.createConnection(dbConfig)

module.exports = connection


