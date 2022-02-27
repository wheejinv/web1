// NextJS 프로젝트는 최신 React 설정에 맞춰져서 import를 생략해도 알아서 import 됨.
// import React from 'react';

// index.js -> '/' 경로에 매칭됨.
// index를 제외하고는 이름이 중요함.
function HomePage(props) {
	return (
		<h1>The Home Page</h1>
	);
}


// 컴포넌트를 export 해서 NextJS가 찾을 수 있게 만들어야 함.
export default HomePage;
