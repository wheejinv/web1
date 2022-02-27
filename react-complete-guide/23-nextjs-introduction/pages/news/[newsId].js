// 파일이름에 대괄호가 있으면 NextJS 가 이건 동적 페이지라는 걸 안다.

import {useRouter} from "next/router";

function DetailPage(props) {
	const router = useRouter();

	const newsId = router.query.newsId;

	// send a request to the backend API
	// to fetch the news item with newsId

	return (
		<h1>The Detail Page</h1>
	);
}

export default DetailPage;
