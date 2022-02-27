// 파일이름에 대괄호가 있으면 NextJS 가 이건 동적 페이지라는 걸 안다.

function DetailPage(props) {
	console.log(props)

	return (
		<h1>The Detail Page</h1>
	);
}

export default DetailPage;
