import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
	{
		id: 'm1',
		image: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbLoX5W%2Fbtqz6W4AmF0%2FrRSQrvEKfa1M8YBLH6KDIK%2Fimg.jpg',
		title: 'A First Meetup',
		address: 'Some address, 1234, city',
		description: 'This is a first meetup'
	},
	{
		id: 'm2',
		image: 'https://t1.daumcdn.net/cfile/tistory/99A7B7365A9F7BA61B',
		title: 'A Second Meetup',
		address: 'nice address, 1234, city',
		description: 'This is a second meetup'
	}
]

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
	return {
		props: {
			meetups: DUMMY_MEETUPS,

			// Incremental Static Regeneration 이라는 피처 잠금 해제
			// 숫자를 설정하면 빌드 프로세스 중에는 페이지가 만들어지지 않음.
			// 페이지 요청이 있다면 하지만 [3600] 초마다 게속 서버에서 만들어짐.
			revalidate: 3600
		}
	}
}

export default HomePage;
