// our-domain.com/news

// export 되는 이름하고 route 매칭되는거랑 관계 없는듯, 파일이름만 중요.
import {Fragment} from "react";
import Link from 'next/link'

function NewsPage(props) {
	return (
		<Fragment>
			<h1>The News Page</h1>
			<ul>
				<li>
					{/*a 태그를 사용하면 브라우저 새로고침 아이콘이 x 모양으로 바뀌었다가 새로고침 아이콘으로 돌아간다.
					이것은 브라우저가 요청을 보내고 새 HTML 페이지로 돌아온다는 것이다.
					싱글 페이지 앱 SPA 은 여기에 없다는 뜻 -> 페이지 상태가 보존이 안된다는 뜻. */}
					<a href="/news/nextjs-is-a-great-framework">
						NextJS Is A Great Framework
					</a>
				</li>
				<li>
					{
						/* 새로고침이 되지 않고 싱글 페이지 앱을 가능하게 해준다.
						Link라는 특별한 링크 컴포넌트는 앵커 태그를 렌더하지만 앵커 태그 클릭을 관찰한다.
						그리고 클릭하면, 새 HTML 페이지를 얻기 위해 브라우저가 요청 보내는 걸 막고,
						대신 로드된 컴포넌트를 로드하고 URL 을 바꾼다.
						페이지를 바꾼 것처럼 보이지만 사실은 싱글 페이지 앱에 있는 것. */
					}
					<Link href='/news/nextjs-link-blabla'>
						NextJS Link Bla Bla
					</Link>
				</li>
				<li>Something Else</li>
			</ul>

		</Fragment>
	);
}

export default NewsPage;
