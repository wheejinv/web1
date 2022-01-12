const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/public/signup.html`);
});

app.post('/', (req, res) => {
	console.log(req.body);

	console.log('run before');

	run();

	console.log('run after');
});

// https://mailchimp.com/developer/marketing/api/lists/get-lists-info/
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
	apiKey: "666d3172314bed6b6d0c9470a7985812-us20",
	server: "us20",
});

async function run() {
	const response = await mailchimp.lists.getAllLists();

	console.log('finished run');
	// console.log(response);
}

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
