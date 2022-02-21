import React from 'react';
import styles from './MainHeader.module.css'
import {Link, NavLink} from "react-router-dom";

function MainHeader(props) {
	return (
		<header className={styles.header}>
			<nav>
				<ul>
					<li>
						{/*Link는 클릭을 listen 해서 브라우저 기본값을 막는다.*/}
						{/*대신 수동으로 URL을 업데이트해서 페이지가 전환된 것처럼 보이도록 함.*/}
						<NavLink
							to="/welcome"
							className={({ isActive }) => (isActive ? styles.active : "")}
						>Welcome</NavLink>
					</li>
					<li>
						{/*NavLink는 CSS 스타일을 넣어 줄 수 있음.
						리액트 웹의 현재 URL과 to가 가리키는 링크가 일치할 때, isActive 변수가 true 임. */}
						<NavLink
							to="/products"
							// react-router-dom v5 문법과 v6 문법은 많이 달라졌음.
							// https://reactrouter.com/docs/en/v6/upgrading/v5#rename-navlink-exact-to-navlink-end
							className={({ isActive }) => (isActive ? styles.active : "")}
						>Products</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainHeader;
