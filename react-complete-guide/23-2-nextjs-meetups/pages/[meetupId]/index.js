import Head from 'next/head'
import {useRouter} from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from "mongodb";
import {Fragment} from "react";

function Index(props) {
	const router = useRouter();

	console.log('asd', router.query.meetupId);

	return (
		<Fragment>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta
					name='description'
					content={props.meetupData.description}
				/>
			</Head>
			<MeetupDetail
				{...props.meetupData}
			/>
		</Fragment>
	);
}

// 동적 페이지이기 때문에 데이터를 패치할 때 ID 같은게 필요함.
// context 매개변수를 이용하면 구할 수 있음.
// https://nextjs.org/docs/api-reference/data-fetching/get-static-props
export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;

	const env = process.env;
	const url = `mongodb://${env.ID}:${env.PASS}@${env.URL}/${env.DBNAME}?authSource=admin`;

	const client = await MongoClient.connect(url);
	const db = client.db();

	const meetupCollection = db.collection('meetups');

	// _id 찾을 때 ObjectId 사용
	const selectedMeetup = await meetupCollection.findOne({
		_id: ObjectId(meetupId)
	});

	// console.log('selected', selectedMeetup)

	const {title, image, address, description} = selectedMeetup;

	client.close();

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title,
				image,
				address,
				description,
			},
		}
	}
}

// 데이터에 기초해서 특정 동적 경로를 사전 렌더하기
// API 등에서 패치하여 동적으로 배열을 만들어야 하겠지만 현재는 하드코딩.
// https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
export async function getStaticPaths() {
	const env = process.env;
	const url = `mongodb://${env.ID}:${env.PASS}@${env.URL}/${env.DBNAME}?authSource=admin`;

	const client = await MongoClient.connect(url);
	const db = client.db();

	const meetupCollection = db.collection('meetups');

	// {_id: 1} -> ID만 포함하고 다른 필드 값은 포함하지 않는다
	const meetups = await meetupCollection.find({}, {_id: 1}).toArray();

	client.close();

	return {
		// NextJS 에게 paths 배열이 모든 지원되는 매개변수를 저장할지 아니면 일부만 저장할지 알려줌.
		// 수백개의 페이지 중에 모든 것을 pre-generate 하지 않고 인기 있는 몇 개만 하고 싶을수도 있음.
		// true, false, 'blocking'
		// 'blocking': 페이지가 미리 생성될 때까지 사용자는 아무것도 볼 수 없고, 완성된 페이지가 제공
		// false: paths 는 모든 meetupId 를 포함해야 함.
		// true: 빈 페이지가 즉시 반환되고, 동적으로 생성된 콘텐츠를 풀다운한다.
		// 			 들어오는 요청에 관해서, 서버에서 meetupId로 동적으로 만듬.
		fallback: 'blocking',
		paths: meetups.map( meetup => {
			return {
				params: {
					meetupId: meetup._id.toString(),
				}
			}
		}),
	}
}

export default Index;
