import {MongoClient} from 'mongodb';

// /api/new-meetup
// req: 들어오는 요청에 관한 데이터를 포함.
// res: 응답 객체는 응답을 보낼 떄 필요
async function handler(req, res) {
	const env = process.env;
	const url = `mongodb://${env.ID}:${env.PASS}@${env.URL}/${env.DBNAME}?authSource=admin`;

	if (req.method === 'POST') {
		// const {title, image, address, description} = req.body;

		const client = await MongoClient.connect(url);
		const db = client.db();

		const meetupCollection = db.collection('meetups');

		const result = await meetupCollection.insertOne(req.body);

		console.log(result);

		// 응답이 느려지기때문에 await 할 이유는 없는듯
		client.close();

		res.status(200).json({
			message: 'Meetup inserted!'
		})
	}
}

export default handler;
