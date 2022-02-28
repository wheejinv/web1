import {useRouter} from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function Index(props) {
	const router = useRouter();

	console.log('asd', router.query.meetupId);

	return (
		<MeetupDetail
			{...props.meetupData}
		/>
	);
}

// 동적 페이지이기 때문에 데이터를 패치할 때 ID 같은게 필요함.
// context 매개변수를 이용하면 구할 수 있음.
// https://nextjs.org/docs/api-reference/data-fetching/get-static-props
export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;

	return {
		props: {
			meetupData: {
				id: meetupId,
				image: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbLoX5W%2Fbtqz6W4AmF0%2FrRSQrvEKfa1M8YBLH6KDIK%2Fimg.jpg',
				title: 'A First Meetup',
				address: 'Some address, 1234, city',
				description: 'This is a first meetup',
			}
		}
	}
}

// 데이터에 기초해서 특정 동적 경로를 사전 렌더하기
// API 등에서 패치하여 동적으로 배열을 만들어야 하겠지만 현재는 하드코딩.
// https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
export async function getStaticPaths() {
	return {
		// NextJS 에게 paths 배열이 모든 지원되는 매개변수를 저장할지 아니면 일부만 저장할지 알려줌.
		// 수백개의 페이지 중에 모든 것을 pre-generate 하지 않고 인기 있는 몇 개만 하고 싶을수도 있음.
		// true, false, 'blocking'
		// false: paths 는 모든 meetupId 를 포함해야 함.
		// true: 들어오는 요청에 관해서, 서버에서 meetupId로 동적으로 만듬.
		fallback: false,
		paths: [
			{
				params: {
					meetupId: 'm1',
				},
			},
			{
				params: {
					meetupId: 'm2',
				},
			},
		]
	}
}

export default Index;
