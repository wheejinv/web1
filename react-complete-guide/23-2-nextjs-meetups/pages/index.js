import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from "mongodb";

function HomePage(props) {
	return (
		<MeetupList meetups={props.meetups}/>
	);
}

// 예약된 함수 이름
// NextJS가 이 이름을 가진 함수를 발견하면, 프리 렌더링 과정 동안 이 함수를 실행함.
// 비동기를 허용함.
// 보통은 서버에서만 작동하고, 파일 시스템 혹은 DB 에 접근 가능.
// 빌드 과정에만 실행됨.
export async function getStaticProps() {
	// fetch data from an API
	const env = process.env;
	const url = `mongodb://${env.ID}:${env.PASS}@${env.URL}/${env.DBNAME}?authSource=admin`;

	const client = await MongoClient.connect(url);
	const db = client.db();

	const meetupCollection = db.collection('meetups');

	const meetups = await meetupCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map( meetups => {
				let {title, address, image, description} = meetups;
				return {
					id: meetups._id.toString(), // 객체라서 스트링으로 변경.
					image,
					address,
					title,
					description,
				}
			}),

			// Incremental Static Regeneration 이라는 피처 잠금 해제
			// 숫자를 설정하면 빌드 프로세스 중에는 페이지가 만들어지지 않음.
			// 페이지 요청이 있다면 하지만 [3600] 초마다 게속 서버에서 만들어짐.
			revalidate: 3600
		}
	}
}

// 요청이 있을때마다 페이지를 다시 만들어야 할 때가 있음.
// 여기에 쓰이는 코드는 어떤 코드라도 서버에서 실행됨.
// 인증 같은 요청 객체에 접속할 필요가 있는 경우 사용.
// export async function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;
//
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		}
// 	}
// }

export default HomePage;
