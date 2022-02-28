import '../styles/globals.css'
import Layout from "../components/layout/Layout";

// 모든 페이지에 영향을 끼치는 컴포넌트나 설정이 있는 경우 _app.js 파일 이용
// 이 특별한 컴포넌트는 NextJS가 렌더할 루트 컴포넌트처럼 작동함.

// Component: 렌더되어야 하는 페이지 콘텐츠, 서버에 요청한 페이지
// pageProps: getInitialProps, getStaticProps, getServerSideProps 중 하나를 통해 페칭한 초기 속성값
function MyApp({ Component, pageProps }) {
  return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp
