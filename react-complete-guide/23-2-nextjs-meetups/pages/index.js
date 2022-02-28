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

function HomePage() {
	return (
		<MeetupList meetups={DUMMY_MEETUPS}/>
	);
}

export default HomePage;
